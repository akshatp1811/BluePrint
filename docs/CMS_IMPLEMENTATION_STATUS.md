# CMS implementation status

## Owner constraints

- Nothing is currently hosted.
- No photography is approved yet. Reuse the existing 42 files as mockups; do not invent additional images, projects, biographies, or marketing copy.
- Initial visible content must match the current site. Keep the seven existing projects, first three featured projects, four visible team members, and existing archive filter labels. Categories are editable; do not normalize/change them automatically on import.
- The owner can replace all visible copy/photos and add/remove project and repeatable content entries later through the CMS.

## Implemented local application

- Separate React/Vite admin and Fastify backend, wired to the existing vanilla JS website.
- Idempotent import of original data and explicit transcription of previously hardcoded view/component text.
- One-owner local account setup, password hashing, opaque expiring sessions, password changes, CSRF/origin checks, rate limits and production security headers.
- Structured editors for each page, settings, all shared headings/labels, team, projects and categories.
- Project creation/duplication/order/hiding/removal, optional comparisons, empty photo collections and variable gallery/drawing/render/story counts.
- Existing-image library, sequential batch upload, image validation/pixel/size/quota limits, four WebP variants, private draft access and dependency-aware deletion.
- SQLite drafts with optimistic concurrency; atomic whole-site publications; history and restore-to-draft; old project slug redirects.
- Published-only public endpoints; project detail fetched separately; refresh/navigation obtains current publication; public ETags.
- Safe HTML text/attribute escaping; optional-section rendering; progressive image reveal for long galleries; cleanup of global navbar/comparison listeners.
- Functional persisted contact form, admin enquiry inbox, optional SMTP outbox with retries (disabled without real configuration).
- Route-specific direct-load metadata and missing-project status, sitemap configuration, combined local hosting, example environment configuration and backup utility.
- Backend integration tests and manual browser verification of sign-in, edit/save, draft preview, publication and original public page content.

## Intentional first-release boundaries

- Publication is explicitly whole-site: all saved draft changes publish together. Per-entity publication and editor roles remain in the roadmap.
- Local persistent media storage is implemented. S3/R2 storage, a private original archive, and a durable background image-job queue are not yet implemented. Upload processing is bounded to one request at a time; interrupted/failed uploads can be retried.
- Admin frontend/backend use JavaScript with runtime validation; the TypeScript/shared-contract extraction in the architecture plan remains future work.
- The public archive and project gallery metadata are not server-paginated yet. Images below the fold are lazy/progressively loaded. The 4 MB content request limit protects the initial deployment; paginate metadata before very large collections. There is no fixed photo-count limit.
- This is not an arbitrary page-layout builder. All current visible text/images are editable, and new projects use the existing detail template. Stored services/process/social data remain inactive until a corresponding design section is added.
- One owner account is supported. MFA, multi-user permissions, email password recovery, automated off-host backup scheduling, enquiry retention, revision pruning, and CI/browser regression automation require completion before adopting the full production plan.
- SEO metadata is served for direct routes; complete server-rendered page bodies are not implemented.

The implementation can run and be reviewed locally now. Hosting, approved assets and final production hardening remain separate milestones.
