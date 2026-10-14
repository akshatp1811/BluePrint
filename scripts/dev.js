import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
const root = fileURLToPath(new URL('../', import.meta.url));
const commands = [
  ['node_modules/vite/bin/vite.js', '--host', '127.0.0.1'],
  ['node_modules/vite/bin/vite.js', '--host', '127.0.0.1', '--config', 'admin/vite.config.js', 'admin'],
  ['--env-file-if-exists=server/.env', '--watch', 'server/src/index.js']
];
console.log('\nStarting Blueprint website, admin frontend, and CMS backend…');
console.log('Website: http://127.0.0.1:3000/');
console.log('Admin:   http://127.0.0.1:3000/admin/ (also http://127.0.0.1:3001/admin/)');
console.log('API:     http://127.0.0.1:4000/health/ready');
console.log('Keep this terminal open. Press Ctrl+C to stop all three servers.\n');
const children = commands.map(args => spawn(process.execPath, args, { cwd: root, stdio: 'inherit', env: process.env }));
const stop = () => children.forEach(child => child.kill());
process.on('SIGINT', stop); process.on('SIGTERM', stop);
children.forEach(child => {
  child.on('error', error => { console.error(`Could not start a server: ${error.message}`); stop(); process.exitCode = 1; });
  child.on('exit', code => { if (code) { console.error('A server failed to start or stopped. Check the error above; ports 3000, 3001, and 4000 must be available.'); stop(); process.exitCode = code; } });
});
