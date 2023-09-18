import * as esbuild from "esbuild";
import * as fs from "fs/promises";
import sveltePlugin from "esbuild-svelte";
import sveltePreprocess from "svelte-preprocess";

/** @type {boolean} */
const dev = process.argv.includes("--dev");

/** @type {esbuild.BuildOptions} */
const config = {
  entryPoints: {
    "app": "src/app.ts",
    "service-worker": "src/service-worker.ts",
  },
  format: "esm",
  mainFields: ["svelte", "browser", "module", "main"],
  conditions: ["svelte", "browser"],
  bundle: true,
  outdir: "dist",
  plugins: [
    sveltePlugin({
      preprocess: sveltePreprocess({
        replace: [
          // https://github.com/sveltejs/svelte/issues/189
          [/\s+<!--nobr-->\s+/gm, ""],
        ],
      }),
    }),
  ],

  loader: {
    ".rawproto": "file",
  },

  minify: !dev,
  sourcemap: dev ? "linked" : false,

  define: {
    DEV: `${dev}`,
  },
  publicPath: dev ? "/" : undefined,
};

if (dev) {
  const context = await esbuild.context(config);

  await context.watch();
  await context.serve({
    port: 1234,
    servedir: "dist",
    fallback: "dist/index.html",
  });
} else {
  await esbuild.build(config);
  await fs.copyFile("dist/index.html", "dist/404.html");
}
