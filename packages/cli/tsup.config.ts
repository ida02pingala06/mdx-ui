import { defineConfig } from "tsup"

export default defineConfig({
  entry: ["src/**/*.ts"],
  format: ["esm"],
  dts: true,
  clean: true,
  minify: false,
  target: "node18",
  shims: true,
  splitting: false,
  bundle: false,
})
