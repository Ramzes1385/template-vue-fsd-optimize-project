import { createApp } from 'vue'

import App from './App.vue'

import { initApi } from '@/app/providers/api'
import { initErrorProvider } from '@/app/providers/error'
import { i18n } from '@/app/providers/i18n'
import { router } from '@/app/providers/router'
import { pinia } from '@/app/providers/store'

import '@shared/styles/index.scss'

const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(i18n)

initErrorProvider({
  app,
  router,
})

initApi()

app.mount('#app')
