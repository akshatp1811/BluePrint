import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 3000,
    open: false,
    strictPort: true,
    fs: { deny: ['.env', '.env.*', '*.{crt,pem}', '**/.git/**', '**/.cms/**', '**/*.sqlite*'] },
    proxy: {
      '/admin': { target: 'http://127.0.0.1:3001', ws: true },
      '/api': 'http://127.0.0.1:4000',
      '/media': 'http://127.0.0.1:4000'
    }
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false
  }
});
