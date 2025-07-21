import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/main.ts'],
  splitting: false,
  format: ['cjs'],
  outDir: 'build',
  sourcemap: true,
  clean: true,
  target: 'node18',
  dts: true,
  esbuildOptions(options) {
    options.alias = {
      '@': './src',
    };
  },
});
