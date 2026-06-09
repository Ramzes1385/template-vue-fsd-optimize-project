export const AppRoutes = {
  home: '/',
  login: '/login',
  profile: '/profile',
} as const

export type AppRouteName = keyof typeof AppRoutes
export type AppRoutePath = (typeof AppRoutes)[AppRouteName]
