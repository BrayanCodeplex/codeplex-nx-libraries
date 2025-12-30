/// <reference types='vitest' />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import * as path from 'path';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';

export default defineConfig({
    root: __dirname,
    cacheDir: '../../node_modules/.vite/packages/date-pickers',

    plugins: [
        react(),
        nxViteTsPaths(),
        dts({
            entryRoot: 'src',
            tsconfigPath: path.join(__dirname, 'tsconfig.lib.json'),
        }),
    ],

    build: {
        outDir: '../../dist/packages/date-pickers',
        reportCompressedSize: true,
        commonjsOptions: {
            transformMixedEsModules: true,
        },
        lib: {
            entry: 'src/index.ts',
            name: 'date-pickers',
            fileName: 'index',
            formats: ['es', 'cjs'],
        },
        rollupOptions: {
            external: ['react', 'react-dom', 'react/jsx-runtime', '@mui/material', '@mui/x-date-pickers', '@mui/x-date-pickers-pro', 'dayjs'],
        },
    },
});
