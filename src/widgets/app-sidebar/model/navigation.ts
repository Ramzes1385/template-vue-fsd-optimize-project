import type { SideBarItem } from '@ramzes1385/rise-ui-kit'

import { AppRoutePath } from '@shared/config/routes'

export const sidebarItems: SideBarItem[] = [
  {
    key: 'home',
    label: 'Home',
    icon: 'home',
    to: AppRoutePath.home,
  },
  {
    key: 'profile',
    label: 'Profile',
    icon: 'user',
    to: AppRoutePath.profile,
  },
  {
    key: 'login',
    label: 'Login',
    icon: 'arrow-right',
    to: AppRoutePath.login,
  },
]
