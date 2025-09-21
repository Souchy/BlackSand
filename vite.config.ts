import { defineConfig } from 'vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import aurelia from '@aurelia/vite-plugin';

export default defineConfig({
  define: {
    'import.meta.env.VITE_IS_TAURI': JSON.stringify(!!process.env.TAURI_ENV_PLATFORM),
    'import.meta.env.VITE_PLATFORM': JSON.stringify(process.env.TAURI_ENV_PLATFORM || 'web'),
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  server: {
    open: !process.env.CI,
    port: 9000,
  },
  esbuild: {
    target: 'es2022'
  },
  plugins: [
    aurelia({
      useDev: true,
    }),
    nodePolyfills(),
  ],
});
