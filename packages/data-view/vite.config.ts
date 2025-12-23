import { qwikVite } from '@builder.io/qwik/optimizer';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vite';

export default defineConfig({
  cacheDir: '../../node_modules/.vite/packages/data-view',
  plugins: [qwikVite(), tsconfigPaths({ root: '../../' })],
  build: {
    outDir: '../../dist/packages/data-view',
    target: 'es2020',
    lib: {
      entry: './src/index.ts',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format === 'es' ? 'mjs' : 'cjs'}`,
      name: 'data-view'
    },
    rollupOptions: {
      external: [] // Web Components usually bundle their dependencies or use a shared runtime
    }
  },
  test: {
    globals: true,
    cache: {
      dir: '../../node_modules/.vitest',
    },
    environment: 'node',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    reporters: ['default'],
    coverage: {
      reportsDirectory: '../../coverage/packages/data-view',
    },
  },
});
