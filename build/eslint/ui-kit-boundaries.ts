import { uiKitImports } from './constants'

export type RestrictedImportPattern = {
  group: string[]
  message: string
}

export const uiKitRestriction: RestrictedImportPattern = {
  group: uiKitImports,
  message:
    'UI kit нельзя импортировать напрямую. Используй shared/ui или shared/providers/* adapter.',
}
