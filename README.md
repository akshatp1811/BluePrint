# Blueprint website and local CMS

The public website, admin frontend, and backend are separate applications in one npm workspace. This version runs locally; there is no hosting or approved photography configured.

## Start locally

Use Node.js 22.16 or newer within the supported Node 22 LTS line (or a compatible supported newer LTS), and npm.

```powershell
cd C:\Users\KIIT0001\Documents\BluePrint
npm install
npm run dev
```

- Website: http://127.0.0.1:3000
- Admin: http://127.0.0.1:3000/admin/ (proxied to the separate frontend on http://127.0.0.1:3001/admin/)
- Backend: http://127.0.0.1:4000

The root `npm run dev` starts all three servers together. Keep that terminal open. Do not start a second copy while those ports are occupied; use Ctrl+C to stop the first copy. `npm run dev:site` starts only the website, so the admin frontend and API still need their own commands if you choose separate terminals:

```powershell
# Terminal 1, from the repository root
npm run dev:site

# Terminal 2, from the repository root
npm run dev:admin

# Terminal 3, from the repository root
npm run dev:api
```

Choose the combined command or the separate-terminal commands, not both. `npm run preview` previews the public build only; use `npm run build` followed by `npm start` for the complete built website and CMS on port 4000.

Open the admin and create your owner account once. Choose your own password of at least 12 characters. There is no default account or password. First-owner web setup is allowed only on loopback in development; production disables it.

The database is created on the first backend start, with the current website's exact seed content. Seven projects, six stored team members, four visible members, three featured projects, original filter choices, and current photographs are preserved. No extra sample projects are added. The photographs are existing mockups until you replace them.

## Edit your content

1. Edit page copy through Home, Projects page, About, and Contact.
2. Use Site settings for shared studio details, branding, navigation labels, footer, categories, accessibility labels, and default project section copy.
3. Use Projects to create, duplicate, reorder, hide, remove, and edit projects. Open gallery/story/drawings/renders controls to add or remove entries. Photo collections can be empty. Before/after comparisons require both pictures when present.
4. Use Choose photograph to reuse a current mockup or upload JPEG/PNG/WebP files. Uploads are limited to 15 MB and 40 megapixels per image; there is no fixed number of photo slots. The default overall media quota is 2 GB. Large galleries reveal images in groups of 12; the lightbox loads full display images as needed.
5. Save Draft, then Preview to see the real site. Publication is an explicit action for **all saved draft changes across pages/projects**. Publishing does not deploy anything externally; it updates the local public API. Refresh the website to see the current publication.
6. Publication history restores an earlier publication into the draft. Review it, then publish it to make it active. Retained publications protect referenced photographs from permanent deletion.

Website content is loaded at runtime. Changing content does not require a website build. Slug changes redirect existing project URLs after publication. Hidden/removed projects are absent from public endpoints. Galleries with no items and absent drawings/renders/story sections are omitted.

The enquiry form stores submissions in the admin inbox. Optional real email notifications are disabled until SMTP sender/recipient configuration is supplied; no messages are sent to seed email addresses automatically.

## Build and run the combined local preview

```powershell
npm run build
npm start
```

Open http://127.0.0.1:4000/ and http://127.0.0.1:4000/admin/. This host serves both independently built frontends and the API. `npm run dev:site`, `npm run dev:admin`, and `npm run dev:api` are also available separately.

Source locations:

- `src/`: existing public website and runtime content client.
- `src/data/seed.js`: exact original seed data; imported by the server only.
- `admin/`: React admin frontend and its independent build.
- `server/`: Fastify API, SQLite, sessions, validation, media processing, enquiry notification worker, and backups.
- `docs/CMS_IMPLEMENTATION_PLAN.md`: full architecture and production roadmap.
- `docs/CMS_IMPLEMENTATION_STATUS.md`: implemented scope and remaining production work.

## Configuration and data

Copy `server/.env.example` to `server/.env` if you need overrides. Vite variables do not contain secrets. Data defaults to the ignored `.cms/` directory at the repository root:

```text
.cms/content.sqlite     SQLite content, accounts, sessions, publications and enquiries
.cms/media/             Uploaded optimized image variants
.cms/backups/           Local backup bundles
```

Seed import runs only when the database has no draft. Restarting or rebuilding does not reset your edits. Never delete `.cms/` to troubleshoot an application issue unless you intentionally want to discard its data.

The current media implementation uses a persistent local directory, so it works without paid accounts. Original seed photos remain under `public/assets/`. Uploads are normalized to WebP display variants and EXIF is stripped. This first implementation does not archive uploaded originals. If preserving original photography is required, add a private original archive/object-storage adapter before importing final assets.

## Verify and back up

```powershell
npm test
npm audit
npm run backup
```

Tests use isolated temporary databases and do not edit your local content. They cover seed preservation, authentication/CSRF, validation, version conflicts, draft/public separation, galleries, media privacy, restoration, redirects and persisted enquiries.

The backup command uses SQLite's online backup operation and copies media into a timestamped bundle. Run it while media upload/deletion and publication are idle so the file copy and database snapshot describe a consistent collection. Copy finished bundles off the computer; an on-disk copy alone does not protect against disk loss.

To restore: stop the backend, preserve the current `.cms/` directory, copy a selected bundle's `content.sqlite` and `media/` to a new empty persistent directory, set the absolute `CMS_DATA_DIR` to it, then start the backend and verify content/media. Do not merge a backup database into a directory containing old SQLite WAL/SHM files. Revoke restored sessions before reusing a backup on a different host:

```powershell
node --input-type=module -e "import {openDatabase} from './server/src/db.js'; import {join} from 'node:path'; const db=openDatabase(join(process.env.CMS_DATA_DIR,'content.sqlite')); db.prepare('DELETE FROM sessions').run(); db.close();"
```

## Before public deployment

Select a Node host with persistent local storage and HTTPS. Set `NODE_ENV=production`, explicit permitted `CMS_ORIGINS`, `CMS_PUBLIC_URL`, a persistent absolute `CMS_DATA_DIR`, and suitable storage quota. Initialize the owner locally first; production never opens a registration form. Bind `HOST` according to the deployment's reverse-proxy/container arrangement. Production cookies require HTTPS.

Confirm real copy/photography, email sender/recipient, retention policy and resource capacity. Add automated off-host backups and a restore drill. The current release is one owner and one backend instance; multiple editors/roles, MFA/recovery, object-storage integration, automatic retention and full CI are tracked in the production roadmap, not claimed as implemented.
