<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { RouterView, useRoute } from 'vue-router'

import { AppLayout } from '@widgets/app-layout'

import { ErrorBoundary } from '@shared/providers/error-boundary'
import { SuspenseBoundary } from '@shared/providers/suspense-boundary'
import { ThemeProvider } from '@shared/providers/theme'
import { ToastProvider } from '@shared/providers/toast'
import { UiKitProvider } from '@shared/providers/ui-kit'

const route = useRoute()
const { t } = useI18n()

const errorBoundaryResetKey = computed(() => route.fullPath)
const isEmptyLayout = computed(() => route.meta.layout === 'empty')
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
          <RouterView v-slot="{ Component }">
            <SuspenseBoundary :loading-text="t('common.loading')" full-height>
              <component
                v-if="isEmptyLayout"
                :is="Component"
              />

              <AppLayout v-else>
                <component :is="Component" />
              </AppLayout>
            </SuspenseBoundary>
          </RouterView>
        </ErrorBoundary>
      </ToastProvider>
    </UiKitProvider>
  </ThemeProvider>
</template>
