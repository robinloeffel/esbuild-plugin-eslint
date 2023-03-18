import esbuild from "esbuild";
import eslint from "../dist/index.js";

const absolute = relative => new URL(relative, import.meta.url).pathname;

await esbuild.build({
  entryPoints: [ absolute("cases") ],
  plugins: [ eslint({ throwOnError: true }) ],
  bundle: true
});
