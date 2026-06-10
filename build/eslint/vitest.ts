import pluginVitest from '@vitest/eslint-plugin'

import { testFiles } from './constants'

export const vitestConfig = {
  ...pluginVitest.configs.recommended,
  files: testFiles,
}
