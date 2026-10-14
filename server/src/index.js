import { createApp } from './app.js';
import { startNotifications } from './notifications.js';
const app = await createApp({ logger: true });
startNotifications(app);
try { await app.listen({ port: Number(process.env.PORT || 4000), host: process.env.HOST || '127.0.0.1' }); }
catch (error) { app.log.error(error); process.exit(1); }
for (const signal of ['SIGINT', 'SIGTERM']) process.on(signal, async () => { await app.close(); process.exit(0); });
