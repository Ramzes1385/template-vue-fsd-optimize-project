<script setup lang="ts">
import { BaseCard } from '@ramzes1385/rise-ui-kit'
import { useI18n } from 'vue-i18n'

import { AuthByEmailForm } from '@features/auth-by-email'

const { t } = useI18n()
</script>

<template>
  <div class="login-page">
    <BaseCard
      :title="t('pages.login.title')"
      :subtitle="t('pages.login.subtitle')"
      variant="shadow"
      :padding="32"
      class="login-page__card"
    >
      <AuthByEmailForm />
    </BaseCard>
  </div>
</template>

<style scoped lang="scss">
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;

  &__card {
    width: 100%;
    max-width: 420px;
  }
}
</style>
