import path from 'path';
import { defineConfig } from 'vite';
import { readFileSync } from 'node:fs';

export default defineConfig(() => {
    const { version } = JSON.parse(readFileSync(new URL('./package.json', import.meta.url), 'utf8'));
    return {
      base: '/',
      define: {
        __APP_VERSION__: JSON.stringify(version)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
