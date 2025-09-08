import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { basePath } from "./app/config";

export default defineConfig({
  base: basePath,
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
});
