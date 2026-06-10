export const coverageConfig = {
  provider: 'v8' as const,

  reporter: ['text', 'json', 'html'],

  reportsDirectory: './reports/coverage',

  exclude: [
    'src/**/*.d.ts',
    'src/**/index.ts',
    'src/app/entrypoint/main.ts',
    'src/**/__mocks__/**',
    'src/**/types.ts',
    'src/**/types/**',
  ],
}
