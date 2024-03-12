import { build } from "esbuild";
import eslint from "../dist/esm/index.js";

const absolute = relative => new URL(relative, import.meta.url).pathname;

await build({
  entryPoints: [
    absolute("./cases")
  ],
  plugins: [
    eslint()
  ],
  bundle: true,
  write: false
});
