<script setup lang="ts">
import { BaseButton } from '@ramzes1385/rise-ui-kit'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

import { AppRoutePath } from '@shared/config/routes'

defineOptions({
  name: 'LogoutButton',
})

const { t } = useI18n()
const router = useRouter()

function handleLogout() {
  localStorage.removeItem('app-token')
  router.push(AppRoutePath.login)
}
</script>

<template>
  <BaseButton variant="ghost" @click="handleLogout">
    {{ t('common.logout') }}
  </BaseButton>
</template>
