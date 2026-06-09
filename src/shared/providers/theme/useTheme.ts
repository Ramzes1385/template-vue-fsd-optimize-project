import { inject } from 'vue'

import type { ThemeContext } from './theme.types'

export const THEME_PROVIDER_KEY = Symbol('THEME_PROVIDER_KEY')

export function useTheme() {
  const theme = inject<ThemeContext>(THEME_PROVIDER_KEY)

  if (!theme) {
    throw new Error('useTheme must be used inside ThemeProvider')
  }

  return theme
}
