import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/main.ts'],
  splitting: false,
  format: ['cjs'],
  outDir: 'build',
  sourcemap: true,
  clean: true,
  target: 'es2022',
  dts: true,
  minify: false,
  esbuildOptions(options) {
    options.alias = {
      '@': './src',
    };
  },
});
