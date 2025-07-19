import {defineConfig} from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src"), // 新增这一段
        },
    },
    server: {
        proxy: {
            '/dev-api': {
                target: 'http://127.0.0.1:8080',
                changeOrigin: true,
                rewrite: path => path.replace(/^\/dev-api/, '')
            }

        }
    }
});
