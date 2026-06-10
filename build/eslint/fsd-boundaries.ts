import type { Linter } from 'eslint'

import { type RestrictedImportPattern, uiKitRestriction } from './ui-kit-boundaries'

const ruleOff: Linter.RuleEntry = 'off'

const createRestrictedImportsRule = (patterns: RestrictedImportPattern[]): Linter.RuleEntry => [
  'error',
  {
    patterns,
  },
]

const layerRestrictions = {
  shared: {
    group: ['@/app/**', '@/pages/**', '@/widgets/**', '@/features/**', '@/entities/**'],
    message: 'shared не должен импортировать app/pages/widgets/features/entities',
  },

  entities: {
    group: ['@/app/**', '@/pages/**', '@/widgets/**', '@/features/**'],
    message: 'entities может импортировать только shared',
  },

  features: {
    group: ['@/app/**', '@/pages/**', '@/widgets/**'],
    message: 'features может импортировать только entities/shared',
  },

  widgets: {
    group: ['@/app/**', '@/pages/**'],
    message: 'widgets может импортировать только features/entities/shared',
  },

  pages: {
    group: ['@/app/**'],
    message: 'pages не должен импортировать app',
  },
} satisfies Record<string, RestrictedImportPattern>

export const fsdBoundaryConfigs: Linter.Config[] = [
  {
    files: ['src/shared/**/*.{vue,ts,mts,tsx}'],
    ignores: [
      'src/shared/ui/**/*',
      'src/shared/providers/ui-kit/**/*',
      'src/shared/providers/toast/adapters/**/*',
      'src/shared/styles/vendors/**/*',
    ],
    rules: {
      'no-restricted-imports': ruleOff,
      '@typescript-eslint/no-restricted-imports': createRestrictedImportsRule([
        layerRestrictions.shared,
        uiKitRestriction,
      ]),
    },
  },

  {
    files: [
      'src/shared/ui/**/*.{vue,ts,mts,tsx}',
      'src/shared/providers/ui-kit/**/*.{vue,ts,mts,tsx}',
      'src/shared/providers/toast/adapters/**/*.{vue,ts,mts,tsx}',
      'src/shared/styles/vendors/**/*.{vue,ts,mts,tsx}',
    ],
    rules: {
      'no-restricted-imports': ruleOff,
      '@typescript-eslint/no-restricted-imports': createRestrictedImportsRule([
        layerRestrictions.shared,
      ]),
    },
  },

  {
    files: ['src/entities/**/*.{vue,ts,mts,tsx}'],
    rules: {
      'no-restricted-imports': ruleOff,
      '@typescript-eslint/no-restricted-imports': createRestrictedImportsRule([
        layerRestrictions.entities,
        uiKitRestriction,
      ]),
    },
  },

  {
    files: ['src/features/**/*.{vue,ts,mts,tsx}'],
    rules: {
      'no-restricted-imports': ruleOff,
      '@typescript-eslint/no-restricted-imports': createRestrictedImportsRule([
        layerRestrictions.features,
        uiKitRestriction,
      ]),
    },
  },

  {
    files: ['src/widgets/**/*.{vue,ts,mts,tsx}'],
    rules: {
      'no-restricted-imports': ruleOff,
      '@typescript-eslint/no-restricted-imports': createRestrictedImportsRule([
        layerRestrictions.widgets,
        uiKitRestriction,
      ]),
    },
  },

  {
    files: ['src/pages/**/*.{vue,ts,mts,tsx}'],
    rules: {
      'no-restricted-imports': ruleOff,
      '@typescript-eslint/no-restricted-imports': createRestrictedImportsRule([
        layerRestrictions.pages,
        uiKitRestriction,
      ]),
    },
  },

  {
    files: ['src/app/**/*.{vue,ts,mts,tsx}'],
    rules: {
      'no-restricted-imports': ruleOff,
      '@typescript-eslint/no-restricted-imports': createRestrictedImportsRule([uiKitRestriction]),
    },
  },
]
