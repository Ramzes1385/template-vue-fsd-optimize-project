<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'

import { ErrorBoundary } from '@shared/providers/error-boundary'
import { SuspenseBoundary } from '@shared/providers/suspense-boundary'
import { ThemeProvider } from '@shared/providers/theme'
import { ToastProvider } from '@shared/providers/toast'
import { UiKitProvider } from '@shared/providers/ui-kit'

const route = useRoute()
const { t } = useI18n()

const errorBoundaryResetKey = computed(() => route.fullPath)
</script>

<template>
  <ThemeProvider>
    <UiKitProvider>
      <ToastProvider>
        <ErrorBoundary
          :title="t('errors.app.title')"
          :description="t('errors.app.description')"
          :retry-text="t('errors.app.retry')"
          :reset-key="errorBoundaryResetKey"
        >
          <SuspenseBoundary :loading-text="t('common.loading')" full-height>
            <slot />
          </SuspenseBoundary>
        </ErrorBoundary>
      </ToastProvider>
    </UiKitProvider>
  </ThemeProvider>
</template>
