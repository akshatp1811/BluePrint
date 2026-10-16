# Demo administrator

Deploy the updated backend and rebuild both frontends with `npm run build`.
Start with `npm start` against the existing persistent `CMS_DATA_DIR`.
The server applies the username migration and one-time demo seed before listening:

- Username: `admin`
- Password: `admin@123`

The seed reuses the existing owner (preserving their email and ID), sets the demo
password as a salted scrypt hash, and revokes that owner's existing sessions.
On an empty database it creates an owner with an internal `.invalid` email.
CMS content and media are preserved. Back up the production database before deployment.
The deployed origin `https://deepskyblue-okapi-398996.hostingersite.com` is
explicitly permitted for login and CMS writes. Additional trusted origins come
from `CMS_ORIGINS` (comma-separated) and `CMS_PUBLIC_URL`; spaces, trailing slashes
and URL paths in these settings are normalized to their origin. Keep
`CMS_PUBLIC_URL` configured for features that generate absolute public URLs.
The `demoAdminSeedV1` settings marker prevents subsequent restarts from resetting
the password. Password changes still require at least 12 characters.
Set `CMS_SEED_DEMO_ADMIN=false` after the demo; this disables bootstrap for future
new/restored databases without disabling username login.

## Future forgot-password implementation

Username is a separate, case-insensitive unique field; keep it as `admin`.
The existing email field remains available for a verified recovery address.
Before enabling recovery, replace the internal placeholder with a verified address.
Add a reset-token table keyed by `users.id`, storing only hashed random tokens,
expiry and consumption time. Use rate-limited request/confirmation routes, generic
request responses, and the existing server-side mail configuration to deliver
expiring single-use links. On confirmation, hash the new password with
`hashPassword`, consume the token and revoke all sessions in one transaction,
as the existing password-change route already does. Never rerun the demo seed
as a recovery mechanism. No forgot-password route or button is enabled yet.
