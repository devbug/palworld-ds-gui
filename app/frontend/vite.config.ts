import { readFileSync } from 'node:fs';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import viteCompression from 'vite-plugin-compression';

// vite 4의 esbuild는 import attributes(with { type: 'json' })를
// 지원하지 않으므로 직접 읽는다.
const wails = JSON.parse(
  readFileSync(new URL('../wails.json', import.meta.url), 'utf-8')
);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), viteCompression()],
  server: {
    port: 34115,
    hmr: {
      host: 'localhost',
      port: 34115,
      protocol: 'ws'
    }
  },
  define: {
    APP_VERSION: JSON.stringify(wails.info.productVersion)
  }
});
