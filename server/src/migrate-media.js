import { readFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';
import sharp from 'sharp';

// Run with uploads/deletions paused. A completed mapping is the checkpoint;
// reruns skip it. Local files and content/history URLs are preserved.
export async function migrateMedia(db, storage, mediaDir, assetsDir, progress = () => {}) {
  if (!storage.cloud) throw new Error('Configure CLOUDINARY_URL before migrating photographs');
  let migrated = 0;
  let skipped = 0;
  for (const { id } of db.prepare('SELECT id FROM media ORDER BY created_at').all()) {
    const key = `/media/${id}`;
    if (storage.has(key)) { skipped++; continue; }
    const variants = {};
    for (const width of [320, 640, 1280, 1920]) variants[`${width}.webp`] = await readFile(join(mediaDir, id, `${width}.webp`));
    await storage.write(key, variants); migrated++; progress(key);
  }
  for (const folder of ['projects', 'team']) {
    for (const name of await readdir(join(assetsDir, folder))) {
      if (!/\.(jpe?g|png|webp)$/i.test(name)) continue;
      const key = `/assets/${folder}/${name}`;
      if (storage.has(key)) { skipped++; continue; }
      const image = await sharp(join(assetsDir, folder, name), { limitInputPixels: 40000000 }).rotate().resize({ width: 1920, withoutEnlargement: true }).webp({ quality: 82 }).toBuffer();
      await storage.write(key, { original: image }); migrated++; progress(key);
    }
  }
  return { migrated, skipped };
}
