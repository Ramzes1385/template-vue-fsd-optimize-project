// build/eslint/public-api-boundaries.ts

import type { Linter } from 'eslint'

import type { RestrictedImportPattern } from './ui-kit-boundaries'

const ruleOff: Linter.RuleEntry = 'off'

const createRestrictedImportsRule = (
  patterns: RestrictedImportPattern[],
): Linter.RuleEntry => [
  'error',
  {
    patterns,
  },
]

const publicApiRestriction: RestrictedImportPattern = {
  group: [
    '@/pages/*/**',
    '@/widgets/*/**',
    '@/features/*/**',
    '@/entities/*/**',
  ],
  message:
    'Запрещён deep import из FSD slice. Импортируй через public API: "@/entities/user", "@/features/auth" и т.д.',
}

export const publicApiBoundaryConfigs: Linter.Config[] = [
  {
    files: ['src/**/*.{vue,ts,mts,tsx}'],
    rules: {
      'no-restricted-imports': ruleOff,
      '@typescript-eslint/no-restricted-imports': createRestrictedImportsRule([
        publicApiRestriction,
      ]),
    },
  },
]
