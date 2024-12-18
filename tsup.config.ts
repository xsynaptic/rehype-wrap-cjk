import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/*.ts'],
  format: ['esm', 'cjs'],
  target: 'esnext',
  outDir: 'dist',
  clean: true,
  dts: true,
  sourcemap: true,
  minify: true,
  treeshake: true,
});
