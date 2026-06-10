import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import skipFormatting from 'eslint-config-prettier/flat'
import pluginOxlint from 'eslint-plugin-oxlint'
import pluginVue from 'eslint-plugin-vue'
import { globalIgnores } from 'eslint/config'

import { appFiles, ignoredFiles } from './constants'
import { fsdBoundaryConfigs } from './fsd-boundaries'
import { publicApiBoundaryConfigs } from './public-api-boundaries'
import { vitestConfig } from './vitest'

export default defineConfigWithVueTs(
  {
    name: 'app/files-to-lint',
    files: appFiles,
  },

  globalIgnores(ignoredFiles),

  ...pluginVue.configs['flat/essential'],

  vueTsConfigs.recommended,

  vitestConfig,

  ...pluginOxlint.buildFromOxlintConfigFile('.oxlintrc.json'),

  ...fsdBoundaryConfigs,

  ...publicApiBoundaryConfigs,

  skipFormatting,
)
