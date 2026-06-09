// build/testing/vitest.ts
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vitest/config'

import { aliases } from '../aliases'
import { coverageConfig } from './coverage'

export const vitestConfig = defineConfig({
  plugins: [vue()],
  resolve: {
    alias: aliases,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./build/testing/setup.ts'],
    include: ['src/**/*.{test,spec}.{ts,tsx}', 'src/**/*.{test,spec}.vue'],
    exclude: ['node_modules', 'dist', 'reports', 'tests/e2e'],
    passWithNoTests: true,
    coverage: coverageConfig,
    clearMocks: true,
    mockReset: true,
    restoreMocks: true,
  },
})
