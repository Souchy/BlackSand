import { defineConfig } from 'vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import aurelia from '@aurelia/vite-plugin';

const host = process.env.TAURI_DEV_HOST;
const os = process.env.TAURI_ENV_PLATFORM || 'web';
const platformMap: Record<string,string> = {
  common: 'common',
  web: 'web',
  desktop: 'desktop',
  windows: 'desktop',
  macos: 'desktop',
  linux: 'desktop',
  mobile: 'mobile',
  android: 'mobile',
  ios: 'mobile',
};
const resolvedPlatform = platformMap[os] || 'web';

export default defineConfig({
  envPrefix: ['VITE_', 'TAURI_ENV_*'],
  define: {
    'import.meta.env.VITE_IS_TAURI': JSON.stringify(!!process.env.TAURI_ENV_PLATFORM),
    'import.meta.env.VITE_IS_DEBUG': JSON.stringify(!!process.env.TAURI_ENV_DEBUG || false),
    'import.meta.env.VITE_PLATFORM': JSON.stringify(resolvedPlatform),
  },
  resolve: {
    alias: {
      '@': '/src',
      '@base': '/src/platforms/common',
      '@platform': `/src/platforms/${resolvedPlatform}`,
    },
  },
  // prevent vite from obscuring rust errors
  clearScreen: false,
  server: {
    open: !process.env.CI,
    port: 9876,
    // Tauri expects a fixed port, fail if that port is not available
    strictPort: true,
    // if the host Tauri is expecting is set, use it
    host: host || false,
    hmr: host
      ? {
        protocol: 'ws',
        host,
        port: 1421,
      }
      : undefined,
    watch: {
      // tell vite to ignore watching `src-tauri`
      ignored: ['**/src-tauri/**'],
    },
  },
  esbuild: {
    target: 'es2022'
  },
  build: {
    // target: 'es2022', // or 'esnext'
    target:
      process.env.TAURI_ENV_PLATFORM == 'windows'
        ? 'chrome105'
        : 'safari13',
    // don't minify for debug builds
    minify: !process.env.TAURI_ENV_DEBUG ? 'esbuild' : false,
    // produce sourcemaps for debug builds
    sourcemap: !!process.env.TAURI_ENV_DEBUG,
  },
  plugins: [
    aurelia({
      useDev: false,
      include: ['src/**/*.ts', 'src/**/*.html'],
    }) as any,
    nodePolyfills(),
  ],
});
