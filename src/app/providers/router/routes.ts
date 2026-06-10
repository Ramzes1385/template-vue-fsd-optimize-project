import type { RouteRecordRaw } from 'vue-router'

import { AppRoutePath } from '@shared/config/routes'

export const routes: RouteRecordRaw[] = [
  {
    path: AppRoutePath.home,
    name: 'home',
    component: () => import('@pages/home').then((module) => module.HomePage),
  },
  {
    path: AppRoutePath.login,
    name: 'login',
    component: () => import('@pages/login').then((module) => module.LoginPage),
  },
  {
    path: AppRoutePath.profile,
    name: 'profile',
    component: () => import('@pages/profile').then((module) => module.ProfilePage),
  },
]
