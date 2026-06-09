import type { RouteRecordRaw } from 'vue-router';

import { AppRoutes } from '@shared/config/routes';

export const routes: RouteRecordRaw[] = [
  {
    path: AppRoutes.home,
    name: 'home',
    component: () => import('@pages/home/ui/HomePage.vue'),
  },
  {
    path: AppRoutes.login,
    name: 'login',
    component: () => import('@pages/login/ui/LoginPage.vue'),
  },
  {
    path: AppRoutes.profile,
    name: 'profile',
    component: () => import('@pages/profile/ui/ProfilePage.vue'),
  },
];
