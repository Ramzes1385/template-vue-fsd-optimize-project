export const AppRoutePath = {
  home: '/',
  login: '/login',
  profile: '/profile',
} as const

export type AppRouteName = keyof typeof AppRoutePath
export type AppRoutePathValue = (typeof AppRoutePath)[AppRouteName]
