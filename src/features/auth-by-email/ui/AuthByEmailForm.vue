<script setup lang="ts">
import { BaseAlert, BaseButton, BaseInput } from '@ramzes1385/rise-ui-kit'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

import { AppRoutePath } from '@shared/config/routes'

defineOptions({
  name: 'AuthByEmailForm',
})

const { t } = useI18n()
const router = useRouter()

const email = ref('')
const password = ref('')
const error = ref('')
const isLoading = ref(false)

async function handleSubmit() {
  error.value = ''
  isLoading.value = true

  try {
    await new Promise((resolve) => setTimeout(resolve, 800))

    if (!email.value || !password.value) {
      error.value = t('pages.login.error_invalid')
      return
    }

    localStorage.setItem('app-token', 'demo-token')
    router.push(AppRoutePath.home)
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <form class="auth-form" @submit.prevent="handleSubmit">
    <BaseAlert
      v-if="error"
      type="error"
      :description="error"
      variant="soft"
      :is-closable="true"
      @close="error = ''"
    />

    <BaseInput
      v-model="email"
      :label="t('common.email')"
      type="email"
      placeholder="user@example.com"
      variant="outline"
      :is-required="true"
    />

    <BaseInput
      v-model="password"
      :label="t('common.password')"
      type="password"
      placeholder="••••••••"
      variant="outline"
      :is-required="true"
    />

    <BaseButton
      type="submit"
      :is-loading="isLoading"
      :is-disabled="isLoading"
    >
      {{ t('common.submit') }}
    </BaseButton>
  </form>
</template>

<style scoped lang="scss">
.auth-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
}
</style>
