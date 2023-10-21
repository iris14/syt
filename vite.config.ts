import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
   alias: {
    "@": path.resolve(__dirname, 'src')
   }
  },
  server:{
    proxy:{
      '/api':{
        target: 'http://syt.atguigu.cn',
        changeOrigin: true,
      },
      '/admin':{
        target: 'http://139.198.34.216:8202',
        changeOrigin: true,
      },
    }
  }
 })