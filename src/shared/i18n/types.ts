export type AppLocale = 'ru' | 'en'

export type LocaleDirection = 'ltr' | 'rtl'

export type LocaleConfig = {
  code: AppLocale
  label: string
  direction: LocaleDirection
}
