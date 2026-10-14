import { v2 as cloudinary } from 'cloudinary';
import { createHash, randomUUID } from 'node:crypto';
import { mkdir, readFile, writeFile, rm } from 'node:fs/promises';
import { join } from 'node:path';

export function cloudinaryConfig(value = process.env.CLOUDINARY_URL) {
  if (!value) return null;
  let url;
  try { url = new URL(value); } catch { throw new Error('CLOUDINARY_URL must be a valid Cloudinary URL'); }
  if (url.protocol !== 'cloudinary:' || !url.hostname || !url.username || !url.password || url.pathname || url.search || url.hash) {
    throw new Error('CLOUDINARY_URL must contain the cloud name, API key and API secret');
  }
  return { cloud_name: url.hostname, api_key: decodeURIComponent(url.username), api_secret: decodeURIComponent(url.password), secure: true };
}

export function createCloudinaryClient(config) {
  return {
    upload(buffer, publicId) {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream({ ...config, public_id: publicId, resource_type: 'image', type: 'authenticated', overwrite: false, timeout: 30000 }, (err, result) => {
          if (err) reject(new Error('Cloudinary upload failed'));
          else resolve({ publicId: result.public_id, format: result.format, bytes: result.bytes });
        });
        stream.on('error', () => reject(new Error('Cloudinary upload failed')));
        stream.end(buffer);
      });
    },
    async read(asset) {
      const url = cloudinary.utils.private_download_url(asset.publicId, asset.format, { ...config, resource_type: 'image', type: 'authenticated', expires_at: Math.floor(Date.now() / 1000) + 60, attachment: false });
      const response = await fetch(url, { signal: AbortSignal.timeout(20000) });
      if (!response.ok) throw new Error('Cloudinary image is unavailable');
      return Buffer.from(await response.arrayBuffer());
    },
    async destroy(asset) {
      const result = await cloudinary.uploader.destroy(asset.publicId, { ...config, resource_type: 'image', type: 'authenticated', invalidate: true, timeout: 30000 });
      if (!['ok', 'not found'].includes(result.result)) throw new Error('Cloudinary deletion failed');
    }
  };
}

// Stable application URLs retain draft access control and publication references.
// Cloudinary identifiers and signed download URLs never enter content documents.
export function createMediaStorage(db, mediaDir, client) {
  const mapping = key => db.prepare('SELECT variants FROM cloud_media WHERE key=?').get(key);
  const localPath = (key, variant) => join(mediaDir, key.slice('/media/'.length), variant);
  return {
    cloud: !!client,
    has: key => !!mapping(key),
    async write(key, variants) {
      if (!client) {
        try {
          await mkdir(localPath(key, ''), { recursive: true });
          for (const [variant, buffer] of Object.entries(variants)) await writeFile(localPath(key, variant), buffer);
        } catch (err) {
          await rm(localPath(key, ''), { recursive: true, force: true });
          throw err;
        }
        return Object.values(variants).reduce((sum, buffer) => sum + buffer.length, 0);
      }
      const assets = {};
      const prefix = `blueprint/${createHash('sha256').update(key).digest('hex').slice(0, 24)}/${randomUUID()}`;
      try {
        for (const [variant, buffer] of Object.entries(variants)) assets[variant] = await client.upload(buffer, `${prefix}/${variant.replace(/\.[^.]+$/, '')}`);
        db.prepare('INSERT INTO cloud_media(key,variants) VALUES(?,?)').run(key, JSON.stringify(assets));
        return Object.values(assets).reduce((sum, asset) => sum + asset.bytes, 0);
      } catch (err) {
        const cleanup = await Promise.allSettled(Object.values(assets).map(asset => client.destroy(asset)));
        if (cleanup.some(result => result.status === 'rejected')) throw new Error('Cloudinary upload failed; some partial assets require cleanup in Cloudinary');
        throw err;
      }
    },
    async read(key, variant, fallback) {
      const row = mapping(key);
      if (!row) return readFile(fallback || localPath(key, variant));
      if (!client) throw Object.assign(new Error('Configure Cloudinary to read this image'), { statusCode: 503 });
      const asset = JSON.parse(row.variants)[variant];
      if (!asset) throw Object.assign(new Error('Image not found'), { statusCode: 404 });
      try { return await client.read(asset); }
      catch { throw Object.assign(new Error('Cloudinary image is temporarily unavailable'), { statusCode: 502 }); }
    },
    async delete(key) {
      const row = mapping(key);
      if (row) {
        if (!client) throw Object.assign(new Error('Configure Cloudinary to delete this image'), { statusCode: 503 });
        for (const asset of Object.values(JSON.parse(row.variants))) await client.destroy(asset);
        db.prepare('DELETE FROM cloud_media WHERE key=?').run(key);
      } else await rm(localPath(key, ''), { recursive: true, force: true });
    }
  };
}
