// @ts-check
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

export default defineConfig({
  site: "https://tu-usuario.github.io",
  base: "/acratos/",
  integrations: [tailwind()],
  output: "static"
});
