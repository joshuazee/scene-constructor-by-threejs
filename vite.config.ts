import { fileURLToPath, URL } from 'node:url';
import { resolve } from 'path';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

import commonjs from 'vite-plugin-commonjs';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    commonjs({
      filter(id) {
        // 默认会排除 `node_modules`，所以必须显式的包含它explicitly
        // https://github.com/vite-plugin/vite-plugin-commonjs/blob/v0.7.0/src/index.ts#L125-L127
        if (id.includes('node_modules/xxx')) {
          return true;
        }
      }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      pkg: fileURLToPath(new URL('./package', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        additionalData: `@import "${resolve(__dirname, 'src/styles/global.less')}";`
      }
    }
  }
});
