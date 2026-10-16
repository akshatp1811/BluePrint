import { createApp } from './app.js';
import { startNotifications } from './notifications.js';

export async function startServer() {
  const app = await createApp({ logger: true });
  startNotifications(app);

  const rawPort = process.env.PORT || 4000;
  const isNamedPipeOrSocket = typeof rawPort === 'string' && isNaN(Number(rawPort));
  const listenOptions = isNamedPipeOrSocket
    ? { path: rawPort }
    : { port: Number(rawPort), host: process.env.HOST || '0.0.0.0' };

  try {
    await app.listen(listenOptions);
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }

  for (const signal of ['SIGINT', 'SIGTERM']) {
    process.on(signal, async () => {
      await app.close();
      process.exit(0);
    });
  }

  return app;
}

startServer().catch((error) => {
  console.error('Fatal error starting server:', error);
  process.exit(1);
});
