import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    coverage: {
      reporter: ['html', 'clover'],
      lines: 80,
      functions: 80,
      branches: 80,
      statements: 80,
      exclude: ['**/__tests__/**/*'],
    },
    reporters: ['verbose', 'junit'],
    outputFile: 'test-results.xml',
  }
});
