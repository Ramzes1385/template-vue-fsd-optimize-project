import type { AppLocale, LocaleConfig } from './types'

export const DEFAULT_LOCALE: AppLocale = 'ru'
export const FALLBACK_LOCALE: AppLocale = 'en'

export const LOCALE_STORAGE_KEY = 'app-locale'

export const SUPPORTED_LOCALES: LocaleConfig[] = [
  {
    code: 'ru',
    label: 'Русский',
    direction: 'ltr',
  },
  {
    code: 'en',
    label: 'English',
    direction: 'ltr',
  },
]

export function isAppLocale(value: unknown): value is AppLocale {
  return SUPPORTED_LOCALES.some((locale) => locale.code === value)
}
