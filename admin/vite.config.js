import { defineConfig } from 'vite';
export default defineConfig({
  base: '/admin/',
  server: { port: 3001, strictPort: true, fs: { deny: ['.env', '.env.*', '*.{crt,pem}', '**/.git/**', '**/.cms/**', '**/*.sqlite*'] }, proxy: { '/api': 'http://127.0.0.1:4000', '/media': 'http://127.0.0.1:4000', '/assets': 'http://127.0.0.1:3000' } },
  build: { outDir: 'dist', sourcemap: false }
});
