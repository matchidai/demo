// example/vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'path';
import {nodePolyfills} from "vite-plugin-node-polyfills";

export default defineConfig({
  plugins: [react(), nodePolyfills({
    protocolImports: true,
  }),],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
});
