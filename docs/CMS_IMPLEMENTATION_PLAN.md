# Blueprint CMS implementation plan

Prepared 10 October 2026 for `feature/CMS`, commit `4ca643b8dd5d95f9a147ad644f7c6c681e14d038`.

**Updated owner constraints:** The website is not hosted and no photography is approved. Use the existing site photographs as mockups and preserve the exact existing copy, project records, visible team count, featured selection and filter choices on initial import. Do not add sample marketing content or automatically normalize categories. Begin with local persistent storage; select hosting and external storage later. See `CMS_IMPLEMENTATION_STATUS.md` for the current local implementation and remaining production roadmap. The architecture below describes the complete target, not a claim that every production feature is already built.

## 1. Outcome and implementation decisions

Build a CMS that lets an authenticated administrator edit every existing page's text and photographs, manage shared branding and navigation, and create, edit, reorder, publish, unpublish, and archive projects. Project galleries, drawings, renders, and story entries must accept variable item counts. Changes should reach the website after publication without editing code or rebuilding the website.

The admin frontend and CMS backend will have independent source folders, builds, and development commands. The existing website remains a third application. They share a versioned content contract, not private database access or administrator credentials.

Recommended first production architecture:

- Public website: retain its current vanilla JavaScript and Vite implementation and visual design.
- Admin frontend: React, TypeScript, Vite, lightweight custom CSS, structured forms, a small router, and a shared media picker. Only the admin downloads React.
- Backend: Node.js on a supported LTS release, TypeScript, Fastify, server-owned JSON schemas, SQL migrations, and a SQLite driver such as `better-sqlite3`, validated against the selected runtime during setup.
- Database: SQLite on local persistent storage, WAL mode, foreign keys, short transactions, and a busy timeout. Run one backend instance initially.
- Media: S3-compatible object storage, with Cloudflare R2 as the default candidate; private originals/draft derivatives and public published derivatives. Develop against a local storage adapter.
- Processing: Sharp in one bounded worker, with durable job records in SQLite. No external queue service initially.
- Deployment: one small persistent Node host, a TLS reverse proxy, separately built public/admin static files, and external object storage. Serve `/`, `/admin`, and `/api/v1` on the same origin to simplify session security.

Separate applications do not require three paid servers. Static hosting can be moved to a CDN later without changing the backend contract. The initial application is deliberately a modular monolith rather than multiple network services.

Scope includes all existing pages and new project detail pages. Adding a completely new kind of page or redesigning the site's layout is a separate capability; it is not necessary for complete content editing. Existing content sections can be hidden and repeatable entries added or removed. Implement a small set of approved section types, not an arbitrary HTML/CSS page builder.

## 2. Verified branch map

The working tree was clean before this planning document. No `AGENTS.md`, backend, tests, CI workflow, deployment instructions, or environment configuration were present in the tracked branch. The current Vite build succeeds. This audit reads the source and build output; it is not a browser visual QA pass.

| File or directory | Current responsibility | CMS implementation change |
| --- | --- | --- |
| `package.json`, `package-lock.json` | Vite-only application; dev/build/preview scripts | Add workspace scripts for independent public, admin, API, contracts, migration, seed, and verification tasks |
| `vite.config.js` | Public dev server on port 3000; production source maps enabled | API proxy for development, environment configuration, explicit production source-map policy |
| `index.html` | Mount points, fixed title/description, external Google fonts | Default metadata, favicon/brand assets, boot loading/error state; server-generated route metadata |
| `src/app.js` | Five route patterns and SPA bootstrap; scroll reveal observer | Initialize content client, global settings, localized UI copy, error handling, and view cleanup |
| `src/router.js` | History routing, transitions, shared header/footer rendering, fixed titles | Content loading and metadata, valid error/404 routes, route cancellation, redirects, lifecycle cleanup |
| `src/data/content.js` | Six exports: studio info, comparison, services, process, team, projects | One-time migration seed; cease using this as production source of truth |
| `src/views/HomeView.js` | Hero, first three projects, shared comparison, testimonial | Editable hero and CTAs, selected project references, ordering/count, visibility, editable quote and comparison |
| `src/views/ProjectsView.js` | Project archive, fixed filters, cards, shared comparison | Editable headings/filter labels, managed categories, paginated summaries, empty/loading/error copy |
| `src/views/ProjectDetailView.js` | Slug-like `id` lookup, specs, hero, stories, gallery, drawings, renders, optional comparison | Fetch one project, configurable section copy, optional sections, variable media counts, redirects and published-only resolution |
| `src/views/AboutView.js` | Intro, first four team members, studio narrative, CTA | Editable narrative/CTA and team section, arbitrary visible team count, ordering and section visibility |
| `src/views/ContactView.js` | Contact information and simulated enquiry submission | Editable content, field labels/options/messages; actual validated enquiry endpoint |
| `src/components/Navbar.js` | Fixed wordmark, route labels, desktop/mobile menus, CTA | Shared branding, logo alternative, menu labels/order/visibility, CTA and accessible menu label |
| `src/components/Footer.js` | Fixed studio name/location, dynamic email | Shared studio values, editable footer copy/links and optional social links |
| `src/components/Lightbox.js` | Image array, keyboard navigation, captions, counter | Editable accessible/UI labels, explicit alt text, optimized full-image variant, optional long-gallery paging |
| `src/components/ImageComparisonSlider.js` | Before/after images, labels, caption, pointer/keyboard controls | Typed content contract; remove content-bearing defaults; configurable accessible label; event cleanup |
| `src/styles/main.css` | Tokens, typography, global styles, reduced motion | Preserve design; optional approved brand token fields only if needed |
| `src/styles/components.css` | Header/footer, forms, lightbox, comparison and other component styles | Responsive logo/media changes, loading/error states, focus styles, remove unused styles after visual review |
| `src/styles/views.css` | All view layouts, responsive grids and project detail styles | Variable-count layouts, text-only story rows, empty section handling, image focal points |
| `src/styles/transitions.css` | Page transitions | Preserve; ensure API failures cannot leave overlay covering the page |
| `public/assets/projects` | 36 JPEG project/content assets | Import referenced media, optimize variants, record unused assets, deduplicate by checksum |
| `public/assets/team` | Six JPEG portraits | Import to media library and attach to team records |
| tracked `dist/` | Committed generated website despite `.gitignore` ignoring dist | Stop treating it as source; generate release assets in CI; remove tracked generated files during implementation |
| `.gitignore` | Ignores node_modules, dist, OS/log files | Ignore secrets, database/WAL files, private uploads, backups, and per-app outputs |

### Content and behavior findings

- Routes are `/`, `/projects`, `/project/:id`, `/about`, and `/contact`. New projects can use the existing detail template; they do not need new code or router entries.
- Seven projects and six team members exist in the seed data. About displays only four members through `slice(0, 4)`. Home displays the first three projects through `slice(0, 3)` rather than explicit featured selections.
- Categories in project data are `Interiors`, `Commercial`, `Architecture`, `Residential`, and `Interior`. The archive exposes only All, Interiors, Architecture, and Commercial. Residential and Interior therefore have no dedicated filter. Preserve these exact initial values under the owner's constraint; allow explicit category management rather than automatically merging/adding visible labels.
- `studioInfo.headline` is not used for the home headline. Navbar/footer/contact contain fixed studio branding. Several centralized about fields are unused. Services, process steps, and social data have no visible consumers in the current views. Preserve them during import, but distinguish stored inactive content from sections visible today.
- Home has no photo hero today. It does have project photographs and comparison images. Do not invent a mandatory hero image.
- Detail galleries already map arrays, so they do not inherently require exactly three pictures. However, arrays are assumed to exist, sections render even when empty, and eager image loading makes large galleries expensive.
- Detail markup assigns `col-8`, `col-4`, `col-12`, and `col-6` classes, but no corresponding span rules were found in the styles; the actual gallery uses a three-column grid. Preserve the actual layout first and explicitly implement/test any improved collage behavior.
- Comparison appears on Home and Projects from one shared object, and optionally on individual projects. Keep a shared default with page-level enable/override controls.
- The contact form never sends or stores its values. Its success message is simulated. The visitor's name is inserted into `innerHTML` without escaping.
- Website views interpolate content directly into HTML templates. Trusted literals become an injection risk once content is editable. Escaping and URL validation are prerequisites for CMS integration.
- Navbar scroll listeners and comparison window listeners accumulate across route renders; views have no teardown. Add cleanup during integration.
- Unknown routes fall back to Home, and missing projects show an in-page message without an HTTP 404. Correct both.
- The SPA title is always a fixed route title followed by BLUE PRINT. Initial HTML description is fixed. CMS metadata must update both direct-load HTML and in-app navigation.
- 42 JPEG files total 37,771,552 bytes, approximately 37.8 MB decimal. Several files are reused across projects; exact duplicate detection is part of migration.
- Baseline output: JavaScript 52.01 kB / 13.42 kB gzip; CSS 35.04 kB / 6.77 kB gzip. Images dominate the asset footprint. Build completed against a separate temporary output directory, leaving tracked `dist/` unchanged.
- Tracked `dist/` does not contain the two construction comparison images present under `public/`. Treat committed build artifacts as potentially stale and deploy fresh builds.

## 3. Content coverage: what the admin can change

Maintain a content registry listing each visible text/image, its key, render consumer, admin editor, defaults, and validation rule. This registry is the acceptance checklist: centralizing only `content.js` is insufficient.

| Editor | Editable content |
| --- | --- |
| Site settings | Studio name, two-part text wordmark or image logo, logo alt text, favicon, location lines, contact address/phone/email/hours, appointment note, social links, default metadata and social preview image |
| Header and footer | All menu/CTA labels and destinations, item order/visibility, mobile menu accessible label, footer studio/location/link copy; default references to shared studio data |
| Home | Location pill, structured headline segments and emphasis, supporting copy, both CTA labels/links, Selected Work title/link, explicit featured project selection/order, comparison title/description/images/alts/labels/caption, testimonial and attribution |
| Projects archive | Eyebrow, title, introduction, category labels/order/visibility, All label, no-results/loading/error/pagination copy, card media alt/focal point, transformation section controls |
| About | Eyebrow/title/subtitle, team eyebrow/heading/intro, members' names/roles/portraits/alts/order/visibility, studio headline and repeatable paragraphs, closing CTA heading/body/buttons |
| Contact | Hero eyebrow/title/introduction, studio/enquiry/hours labels, email/phone label text, appointment text, form heading, all labels/placeholders, discipline options, submit/pending copy, validation/failure/success messages, follow-up link and response-time statement |
| Project detail defaults | Client/location/year/area/type/status labels, brief heading, story label template, gallery/drawings/renders/comparison eyebrows/headings/descriptions, missing-project copy and back link |
| Each project | Title, slug, tagline, category, location, year, client, area, completion status, description, optional specs, cover photo/alt/focal point, ordered gallery entries/captions/alts, drawings/renders names and media, story heading/text/optional image, comparison photos/labels/caption, section visibility, metadata, order and homepage feature selection |
| Shared interaction copy | Lightbox close/previous/next labels, image-counter format, comparison accessible label, navigation accessibility text, not-found/loading/offline/error messages |

Use structured plain text with paragraph arrays and approved emphasis segments. Avoid arbitrary HTML, CSS, and JavaScript. CTA destinations use validated route/link fields. Form identifiers and validation behavior remain code, while their presentation text is editable. Dynamic values use approved tokens such as `{projectTitle}`, `{name}`, `{current}`, and `{total}`, rendered safely.

Project detail sections inherit global defaults, with optional per-project text overrides. This allows one wording change everywhere or different wording on an individual project. Hidden sections retain their saved content.

## 4. Projects and any number of photographs

The project editor has tabs for Overview, Photographs, Story, Drawings, Renders, Before/After, SEO, and Preview/Publish.

Required workflow:

1. Add a project and save a draft with incomplete fields.
2. Enter title, unique URL slug, description, category, and desired metadata.
3. Select a cover photograph or keep the project text-only. Text-only cards have a designed non-image fallback; a cover is recommended, not a publishing requirement.
4. Upload multiple files, reuse existing media, or add more later. Display per-file progress, errors, and retry controls.
5. Reorder through drag-and-drop and keyboard controls; edit captions, alt text, and crop focal point per placement.
6. Preview the real website template at mobile and desktop widths.
7. Publish. The archive, category filters, project detail route, and sitemap reflect the project; Home changes only if the project is selected as featured.

Photo count is a database collection, not fixed photo slots. Support zero, one, two, and many images. Empty galleries/drawings/renders/stories are omitted. A before/after comparison is optional but requires both images if enabled. Story rows can be text-only.

There is no hard-coded total photograph count per project. Finite storage quota, file size, pixel dimensions, batch size, and request limits still apply. These controls protect deployment capacity without restricting the editorial design to an arbitrary number of photos. Initial defaults can be 15 MB per input image, 40 megapixels, and 20 files per upload batch, adjusted after testing real photography.

For large galleries, load metadata in pages and render an initial group followed by Load More. The lightbox navigates through paged metadata and fetches full display images only when opened; it must not download every full-size photograph upfront. Preserve stable ordering while loading subsequent pages. Archive APIs return project summaries rather than every project's full gallery and stories.

Use stable media attachment IDs so editing captions/order does not depend on shifting array indexes. Removing an attachment does not delete its shared media asset.

## 5. Source layout and boundaries

```text
src/                         Existing public website; keep current paths initially
public/                      Public bootstrap assets during migration
admin/
  src/pages/                 Login, overview, page editors, projects, media, enquiries
  src/components/            Field controls, repeatable lists, upload/media picker
  src/api/                   Authenticated API client
  vite.config.ts
  package.json
server/
  src/routes/public/         Published reads, contact form, sitemap/metadata
  src/routes/admin/          Authentication, content, uploads, publish, audit
  src/services/              Publication, revisions, storage, image processing
  src/db/                    SQL repositories and transaction helpers
  migrations/
  scripts/                   Seed, account bootstrap, backup/restore
  package.json
packages/content-contract/
  schemas/                   Server-owned schemas and frontend field definitions
  types/                     Content and API types
docs/                        Content inventory, setup, deployment and runbook
```

Use npm workspaces rather than a heavy build orchestration platform. Builds and environment files remain independent. Provide root commands for public/admin/API development, build, schema validation, migrations, seed import, and tests. No database, storage secret, or email credential is exposed through Vite variables.

## 6. Database and publication model

Start with these tables, with indexed keys, foreign-key rules, and explicit schema versions:

| Table | Purpose |
| --- | --- |
| `admin_users` | Accounts, roles, password hashes, MFA enrollment and account state |
| `sessions`, `password_reset_tokens` | Hashed session/reset tokens, expiry and revocation |
| `content_documents` | Draft site settings, page documents, shared labels and inactive service/process content |
| `projects` | Stable UUID, draft slug/category/order/status, typed document and edit version |
| `categories` | Stable IDs, editable labels, ordering and archive/contact availability |
| `team_members` | Stable member IDs, profile, portrait reference and visible order |
| `media_assets`, `media_variants` | Object keys, checksums, dimensions, MIME type, processing/access state |
| `media_attachments` | Asset references, owning document/project, role, per-use caption/alt/focal point and position |
| `content_revisions` | Immutable snapshots of edits/publications with actor and timestamp |
| `publications` | Immutable complete public content manifests; active published version |
| `published_projects` | Version-specific project summaries/detail documents for public reads |
| `slug_redirects` | Old-to-current published slug mapping |
| `audit_logs` | Authentication, account, content, publication and media actions |
| `enquiries`, `notification_jobs`, `media_jobs` | Durable submissions, email retry state and bounded image jobs |

Keep related metadata relational; page copy can be validated JSON because the site has a small fixed page set. Do not put image bytes or arbitrary unvalidated HTML into the database.

Distinguish editorial state (`draft`, `published`, `archived`) from the architectural project status (`Completed`, `In Progress`, etc.). A published project can have new draft edits while its previous version remains public.

Publication sequence:

1. Save the draft with an edit version. Reject stale writes with a 409 conflict and let the editor reload or resolve differences.
2. Validate required copy, unique slugs, URLs, references, enabled comparison pairs, and processed media.
3. Prepare immutable public media derivatives outside the database transaction. Draft originals remain private. Preparation failures leave the old publication active.
4. In one short database transaction, create the consistent publication manifest, project documents, redirect changes and audit record, then switch the active version.
5. Invalidate relevant public caches only after commit. Return the active version and publication time to the admin.

Page/project publishing carries forward other entities' current published versions; it must not accidentally publish their unsaved or pending draft edits. Support a coordinated Publish Changes action for intentionally publishing a related group.

For a lightweight first release, reconstruct version-specific public documents on publish rather than calculate them on every visit. Public endpoints read the same active version for a session's initial content loads. Rollback selects a validated earlier publication and republishes it; it does not erase edit history.

Unpublishing removes a project from public listings and returns a proper public 404/410 according to policy. Remove its featured reference in the same publication. Prevent retiring categories or media still referenced by active publications. Slug changes create permanent redirects, retaining the current route shape `/project/:slug`.

## 7. API contract

All endpoints live under `/api/v1`. Generate the OpenAPI specification from the same server-owned schemas used for validation.

| Endpoint group | Contract |
| --- | --- |
| `GET /public/site` | Published global settings, navigation/footer, page copy, category definitions, featured summaries and version; no full-project payloads |
| `GET /public/projects` | Published summaries, validated category filter, stable pagination and publication version |
| `GET /public/projects/:slug` | One published detail document and first media page |
| `GET /public/projects/:slug/media` | Gallery/drawing/render metadata pages for that publication |
| `GET /public/version` | Cheap cache/version check; no heavy polling required |
| `POST /public/enquiries` | Validated form submission, anti-spam controls and durable receipt |
| `/admin/auth/*` | Login/logout/me, change password, account recovery, MFA challenge/enrollment |
| `/admin/documents/*` | Load/update structured page/settings drafts with edit versions |
| `/admin/projects/*` | Create/update/duplicate/archive/reorder drafts; publish/unpublish and revision actions |
| `/admin/categories/*`, `/admin/team/*` | Managed collections with dependency validation |
| `/admin/media/*` | Upload, processing status, search, metadata, usage lookup and safe deletion |
| `/admin/preview/*` | Authenticated, uncached draft content matching public view contracts |
| `/admin/publications/*` | Publish selected changes, inspect history and restore a prior publication |
| `/admin/enquiries/*` | List/read/status changes, restricted export and retention controls |
| `/admin/users/*`, `/admin/audit/*` | Administrator-only account management and audit access |
| `/health/live`, `/health/ready` | Process and dependency readiness; do not expose internal details |

Use explicit response schemas to prevent private properties leaking through public serializers. Validate filters, slugs, pagination, input lengths, ownership, and permissions on the backend. Caches apply only to public GETs. All private/draft endpoints return `Cache-Control: no-store`.

## 8. Public website integration

Implement a small `src/services/contentClient.js` and read-only store. Replace direct data imports in views/components with typed public content access. Global settings and page documents load once initially; archive/detail data load on demand.

- Render loading, unavailable, and retry states rather than a blank page.
- Cache successful published responses using HTTP ETags and version keys; revalidate on fresh navigation/focus with a short freshness interval. No WebSocket dependency is needed.
- Define propagation: after publishing, a fresh uncached request sees the new version; ordinarily refreshed/new visits see it within the configured cache window, targeting at most 60 seconds. Open tabs update on their next revalidation, not by magic.
- Retain only a last-known published fallback. Never fall back to the bundled seed after an explicit removal or unpublication, and never store draft responses in public caches. Respect invalidation/removal rules; a degraded status is visible if content is stale.
- Escape template text and attributes consistently, prefer `textContent` for user-derived strings, and validate image/link URLs against allowed destinations. Template token replacement does not produce HTML.
- Use width/height, `srcset`, `sizes`, lazy loading below the fold, and optimized variants. Use `object-fit: contain` for drawings where cropping would hide information.
- Add `destroy()`/cleanup hooks for observers and window listeners; call them before changing views. Cancel superseded route requests and ignore stale responses.
- Make project cards normal accessible links while retaining SPA navigation and animations.
- Update metadata and canonical URLs on SPA navigation. For direct loads, the Node host serves route-specific title/description/Open Graph/canonical HTML from published data and correct HTTP status codes.
- Generate a sitemap and robots rules from published routes. Admin/preview routes are excluded and noindexed.
- Preserve section order and styling from this branch, except deliberate fixes for empty/large collections.

Route-specific metadata injection is lightweight but does not fully server-render page bodies. If search visibility requires fully rendered content, add publication-triggered prerendering as a separate measured enhancement; do not silently promise full SSR from client-side metadata alone.

## 9. Media pipeline and lifecycle

Initial supported uploads: JPEG, PNG, and WebP raster images. AVIF input support can be enabled after runtime validation. Reject executable files and unrestricted SVG. Existing drawings/renders are images; PDF document support is a later explicit feature.

1. Authenticate uploads, enforce per-file/batch/storage quotas, stream to temporary/private storage, verify signatures and decoded type, and validate dimensions/pixel count.
2. Create an asset/job record and return upload/processing state. Limit image processing concurrency and memory; one worker initially, not one worker per upload.
3. Correct orientation, strip location-sensitive EXIF, retain a private original, and generate thumbnail/card/detail derivatives. Initial candidate widths: 320, 640, 1280, 1920; do not upscale smaller inputs. JPEG/PNG originals remain available privately where needed.
4. Store checksums, dimensions, variant sizes and job outcome. Surface retryable failures in the editor. Only `ready` assets can be published.
5. Serve published immutable variants through a CDN/object storage domain with long-lived caching. Authenticated previews use short-lived access to private variants.
6. Record every usage. Detaching a photo does not delete it. Asset deletion checks drafts, active publications, and retained revisions.
7. Garbage collection uses a grace period and marks pending deletion first. Retained rollback versions pin their assets. Backup retention and media retention must agree.

Start with authenticated backend uploads for simplicity. If photo volume/upload latency justifies it, use server-issued short-lived presigned uploads into a private staging prefix, with independent validation and processing before publication. A browser upload succeeding is not sufficient validation.

Storage/CDN credentials stay server-side. Bucket CORS, permitted object prefixes, HTTPS media URLs, private previews, orphan cleanup, quota alerts and a record of uploaded original ownership are part of deployment.

## 10. Admin experience

Navigation: Overview, Pages, Projects, Team, Categories, Media Library, Site Settings, Enquiries, Publication History, and Account/Security.

- Page editors mirror website sections with explicit field descriptions and visibility controls.
- Shared fields show where they appear; changes to shared comparison/settings explain which pages are affected.
- Reusable ordered-list controls manage paragraphs, team entries, story sections, gallery attachments, navigation and featured projects.
- Save Draft and Publish are separate; preview clearly identifies draft state.
- Form validation shows field-specific errors. Unsaved changes trigger a navigation guard. Initial explicit saving is reliable; debounced autosave is added only after version conflict handling works.
- Shared media picker supports search, thumbnail preview, dimensions, usages and replace actions.
- Replacing one placement creates/uses a new asset reference; replacing all uses is an explicit operation with a usage preview.
- Preview runs the real website views against authenticated draft endpoints. Use a same-origin iframe and safe messaging for viewport controls. No public draft tokens are exposed through query strings.
- Review/publish displays changed entities, invalid media, missing accessibility descriptions and the resulting publication version.
- Restore and archive are reversible actions. Permanent deletion explains dependencies and requires a deliberate confirmation in the admin interface.
- Provide keyboard access, labels, focus visibility, responsive layouts and usable upload feedback. Mobile can handle essential edits even if bulk photography work is better on desktop.

## 11. Security, reliability, and enquiry delivery

Security baseline:

- No public registration. Bootstrap the owner account through a one-time CLI or deployment secret flow; never commit a default password.
- Use a reviewed password hashing library, secure random opaque session tokens, hashed tokens in the database, HttpOnly/Secure/SameSite cookies, bounded expiry and logout/recovery revocation.
- Provide owner MFA enrollment and recovery codes for production. Owner/editor roles are simple: editors manage drafts; owners manage accounts and publication. Backend checks every privileged action.
- Cookie-authenticated writes require CSRF protection and origin checks. SameSite alone is not the entire defense. External deployment origins require explicit CORS and cookie configuration.
- Rate-limit login, recovery, uploads and public enquiries; cap request body sizes. Validate content schemas on the server, use parameterized SQL, escape rendering and restrict URLs.
- Set security headers and a realistic CSP compatible with the site's styles/fonts. Redact credentials, reset tokens and enquiry details from logs. Admin response bundles do not contain secrets.
- Provide one-time expiring password recovery via configured email, plus a documented secure owner recovery command if email is unavailable.
- Review dependencies and runtime support before implementation, lock versions, and address reachable high-severity issues before launch.

Reliability baseline:

- Persistent database volume; graceful shutdown; process restart policy; transaction-safe publishing; optimistic concurrency; durable upload/email jobs with bounded retries.
- Structured logs with request IDs; health checks; notifications for backend failure, repeated publication/media errors, backup failure and disk/quota limits.
- Automated SQLite backups through the driver backup API or `VACUUM INTO`, stored off-host and encrypted. Do not copy only a live database file while WAL writes are active.
- Initial recovery targets: daily recoverable backup, recovery-point target at most 24 hours, and restore-time target within two hours. These are proposed operating targets, verified through a restore drill before launch, not guaranteed host capabilities.
- Keep 14 daily and four weekly backup points initially; align media retention with referenced publications. Owner can trigger a backup before a large content change.
- Deployment migrations run once with a backup first. Code rollback must account for database schema compatibility. Seed import is idempotent and never runs destructively on every boot.

Enquiries:

- Public submission validates fields, category, limits, honeypot and rate limits. Add CAPTCHA only if abuse warrants it.
- Store the enquiry before acknowledging receipt. A database failure returns a clear error and retains the visitor's form values.
- Persist an email notification job in the same transaction. Notification failure does not lose the enquiry; retry and show status in the admin inbox.
- Configure a verified transactional email sender, recipient, reply-to rules and DNS records. Escape all submitted text in notifications.
- Include a privacy notice, restricted access and configurable retention/deletion, with an initial suggested 90-day retention pending business policy. An enquiry inbox is operational data and is never sent by public content endpoints.

## 12. Deployment and resource budget

Recommended layout:

```text
Browser
  /                 -> public static assets + route metadata responses
  /admin/           -> independent admin static build
  /api/v1/          -> one Node/Fastify application
                             -> SQLite on persistent local volume
                             -> private/public object storage
                             -> transactional email provider
                             -> one bounded image worker
```

Begin testing on approximately 1 vCPU and 1 GB RAM, with a 2 GB RAM option if large image processing needs it. These are starting capacity targets to measure, not a universal resource guarantee. Put private database/backups outside the publicly served directories. Do not use network-mounted SQLite or an ephemeral/serverless filesystem.

Resource controls: one image worker, bounded upload batches, paginated archive/admin lists/galleries, short database transactions, immutable CDN media, metadata-only database rows, pruned logs/jobs/sessions/revisions, and explicit cache headers. Public assets never import the admin bundle.

For the first release, no Kubernetes, Redis, Elasticsearch, separate microservices, full-page rich-text builder, or continuously running rebuild service. React only affects the separate admin. Media processing is done at upload, not during public page requests.

If hosting must be stateless/serverless or multiple API replicas become necessary, use managed PostgreSQL and a proper job service/worker deployment instead of local SQLite. Repository interfaces and SQL migrations should make that transition possible, but it is not part of the initial minimum deployment.

If the website is currently hosted as static files, the CMS still needs a backend host; static hosting alone cannot persist edits or run secure administrator operations. Confirm the real hosting arrangement rather than assuming it from committed `dist/` or past CNAME commits.

## 13. Implementation sequence and completion gates

| Phase | Work | Completion gate |
| --- | --- | --- |
| 1. Contracts and migration inventory | Capture branch baseline, register all text/image consumers, define schemas and media reference rules, create workspace/build scripts | Every current visible field maps to an editor and a public consumer; no fixed project photo slots |
| 2. Backend foundation | API config, migrations, SQLite repositories, secure account/session/CSRF/MFA, owner bootstrap, health/logging, roles | Authorized operations work; anonymous writes and draft reads are rejected; data survives restart |
| 3. Content import | Idempotent migration of all seven projects, six team members, shared copy and hardcoded view labels; preserve initial category labels/filter choices; import/deduplicate assets | Initial publication reproduces current visible content and retains inactive seed records without exposing them accidentally |
| 4. Media service | Storage adapters, validation, variants, durable processing, usages and deletion rules | Batch upload/retry works; oversized/bad files fail safely; ready-only publish; previews remain private |
| 5. Draft/publication API | Editors' draft endpoints, immutable public snapshots, versions, conflicts, redirects, revisions and restore | Editing a published entity does not change public content until publish; publication failure keeps previous version active |
| 6. Admin frontend | Login, settings/page editors, projects/team/categories, media picker, featured selections, preview and publish review | Administrator can change every mapped field and create/edit a complete project without code access |
| 7. Public wiring | Content client/store, all view/component refactors, dynamic categories and collections, lazy images, lifecycle cleanup, direct-route metadata and errors | Website reads only published content; direct refresh/navigation work; all current interactions remain usable |
| 8. Contact delivery | Persisted enquiry endpoint, admin inbox, notification retry, editable form copy and privacy notice | Success appears only after storage; email failure is tracked and retryable; submissions never leak publicly |
| 9. Production hardening | CI, dependency review, HTTPS/headers, resource tests, backups/restore, deployment runbook and owner handover | All acceptance checks pass on staging, fresh deployment and restart retain data, restore drill completes |

Build order prioritizes the data contract and secure backend before large admin UI work, then media/publication safety before public integration. Each phase should be a reviewable increment on `feature/CMS`. Do not deploy a partially editable CMS as the completed product.

## 14. Verification and release acceptance

Use meaningful backend integration tests, frontend workflow tests and visual comparison; do not merely assert implementation details.

1. Change each field in the coverage registry, publish, and verify its intended website occurrence. Search source for remaining content-bearing literals and classify any intentional static symbols.
2. Create projects with 0, 1, 2, 3, 10 and at least 100 gallery photos; test paging, order, captions, alt text, removal, lightbox navigation and mobile layouts. Zero-image projects must render without broken images.
3. Test empty/missing drawings, renders, stories, featured selections and team lists. Optional comparisons require two valid images. Long headings and multiline descriptions remain usable.
4. Draft edits and draft photos do not appear in public APIs, indexes or caches. Editors cannot publish or manage owner accounts. Test session expiry, logout, reset, MFA and CSRF.
5. Publish a project without publishing another project's pending changes. Simulate invalid media, failed storage preparation and database errors; the active version remains consistent.
6. Test concurrent editing conflicts, duplicate slugs, category changes, slug redirects, unpublication, asset dependency guards and rollback.
7. Verify cache propagation and removal: refreshing after publish shows the new version within the configured window; fallback content does not resurrect unpublished projects.
8. Verify direct requests and SPA navigation for every route, correct missing-route/project status, metadata, sitemap and excluded admin/preview pages.
9. Verify enquiries are saved, notification failures retry, server failures preserve form input, spam limits work, and text resembling HTML never executes.
10. Compare the migrated Home/About/Projects/Contact and all seven detail pages at mobile/tablet/desktop widths; retain current visual design and interactions.
11. Measure image bandwidth, initial public bundle, API latency, memory during concurrent public reads and a full upload batch. Confirm admin code is absent from public imports. Set final capacity/cache limits using measurements.
12. Restart the production-shaped deployment, redeploy without reseeding, and restore database plus referenced media to a clean staging instance.

CI gates: install from lockfile, type/schema checks, public/admin/API builds, API integration tests with temporary database/storage, and browser tests for core editing/publication workflows. Run security and dependency checks appropriate to the implemented stack. Disable or retain production source maps according to the final monitoring policy.

## 15. What is needed from the owner before production

Local development and migration can proceed without deployment credentials. These are the decisions/access required before a live release:

| Need | Why it is needed |
| --- | --- |
| Current hosting provider and deployment access | Confirm whether persistent Node hosting can be added; choose same-host or CDN/API layout |
| Domain/DNS access | Configure TLS, website/admin routing, media domain and email verification |
| Hosting/storage spending limit | Choose sustainable persistent hosting, storage quota and backup capacity; verify current prices when selecting providers |
| Object-storage account/bucket access | Store original and optimized media outside deploy artifacts; configure private/public access and backup policy |
| Owner email and intended additional administrators | Bootstrap ownership, account recovery and editor permissions; password entered securely, not pasted into repository files |
| Verified sender, enquiry recipient and email provider | Send real enquiry notifications and recovery messages |
| Approved real text, project data and image rights | Several names/phone/client records may be sample data; validate before publication |
| Expected photograph sizes and likely collection size | Finalize upload/pixel quotas and image processing memory tests |
| Privacy, enquiry retention and restore expectations | Finalize retention, backup frequency and business recovery targets |
| Whether new non-project page types are required | Establish any scope beyond editing current pages and adding project pages |

Suggested default assumptions for development: one owner, optional editors, existing page design, single language, current route patterns, one backend instance, external media storage, and no hard-coded limit on project/gallery item counts.

## 16. Technical references supporting the architecture

These are vendor/primary references checked during planning. Exact dependency versions and hosting prices will be verified during implementation and deployment selection.

- [SQLite appropriate uses](https://www.sqlite.org/whentouse.html): supports the choice for a modest single-server application; deployment topology and write concurrency determine suitability.
- [SQLite WAL](https://www.sqlite.org/wal.html): read/write behavior and local-file constraints underlying the single-instance persistent-volume recommendation.
- [SQLite backup API](https://www.sqlite.org/backup.html): consistent live backups and `VACUUM INTO` as an alternative.
- [Fastify validation and serialization](https://fastify.dev/docs/latest/Reference/Validation-and-Serialization/): server-owned request/response schemas; do not accept user-supplied executable schemas.
- [Sharp output options](https://sharp.pixelplumbing.com/api-output/) and [resize](https://sharp.pixelplumbing.com/api-resize/): image variant generation and output formats.
- [R2 object uploads](https://developers.cloudflare.com/r2/objects/upload-objects/) and [presigned URLs](https://developers.cloudflare.com/r2/api/s3/presigned-urls/): storage integration and optional direct staging uploads.

The complete first release is the editable site, separate working admin and API, safe publication/media workflows, real enquiry delivery, and tested deployment/recovery instructions. This document is the implementation plan; it does not claim those features have already been built.
