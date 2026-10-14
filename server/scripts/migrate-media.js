import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { openDatabase } from '../src/db.js';
import { cloudinaryConfig, createCloudinaryClient, createMediaStorage } from '../src/media-storage.js';
import { migrateMedia } from '../src/migrate-media.js';

const config = cloudinaryConfig();
if (!config) throw new Error('Set CLOUDINARY_URL in server/.env before migration');
const root = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const dataDir = process.env.CMS_DATA_DIR || join(root, '.cms');
const db = openDatabase(join(dataDir, 'content.sqlite'));
try {
  const storage = createMediaStorage(db, join(dataDir, 'media'), createCloudinaryClient(config));
  const result = await migrateMedia(db, storage, join(dataDir, 'media'), join(root, 'public/assets'), key => console.log(`Migrated ${key}`));
  console.log(`Cloudinary migration complete: ${result.migrated} migrated, ${result.skipped} already stored. Local files retained.`);
} catch {
  console.error('Cloudinary migration failed. Check credentials, connectivity and local image files. Completed images are safe; rerun to resume.');
  process.exitCode = 1;
} finally { db.close(); }
