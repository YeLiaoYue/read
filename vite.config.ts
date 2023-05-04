import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';
import path from 'node:path';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/abc': {
        target: 'https://apis.netstart.cn/yunyuedu', // 自己请求地址, 注意要换哦
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/abc/, '') // 接口以abc开头开始,真正的接口是不需要api的
      }
    }
  },
  plugins: [vue(),
  Components({
    resolvers: [VantResolver()],
  }),],
  resolve: {
    alias: { '@': path.resolve(__dirname, 'src') },

    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json']
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "./src/css/vars.scss";
        `
      }
    }
  }

})
