import type { Config } from "@react-router/dev/config";
import { basePath } from "./app/config";

export default {
  // Config options...
  // Server-side render by default, to enable SPA mode set this to `false`
  ssr: false,
  basename: basePath,
} satisfies Config;
