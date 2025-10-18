import { fileURLToPath, URL } from 'node:url';
import { resolve } from 'node:path';
import { dirname } from 'node:path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import svgicon from 'vite-plugin-svgicon';
import { viteMockServe } from 'vite-plugin-mock';

const __dirname = dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    svgicon({
      include: ['**/icons/svg/**/*.svg'],
      svgFilePath: resolve(__dirname, 'src/icons/svg'),
    }),
    viteMockServe({
      mockPath: 'mock',
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  server: {
    port: 3000,
  },
})
