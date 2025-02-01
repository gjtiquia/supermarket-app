import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import deno from "@deno/vite-plugin";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        deno(),
        tailwindcss(),
    ],
    server: {
        proxy: {
            "/api": {
                target: "http://localhost:3000",
                changeOrigin: true,
            }
        }
    }
});
