// build/testing/coverage.ts
import type { CoverageV8Options } from 'vitest/node'

export const coverageConfig: CoverageV8Options = {
  provider: 'v8',
  reporter: ['text', 'json', 'html'],
  reportsDirectory: './reports/coverage',

  include: ['src/**/*.{ts,vue}'],

  exclude: [
    'src/**/*.d.ts',
    'src/**/index.ts',
    'src/app/entrypoint/main.ts',
    'src/**/__mocks__/**',
    'src/**/types.ts',
    'src/**/types/**',
  ],

  thresholds: {
    lines: 80,
    functions: 80,
    branches: 70,
    statements: 80,
  },
}
