<script setup lang="ts">
import { provide } from 'vue'

import { createDefaultToastAdapter } from './adapters/default-toast.adapter'
import { TOAST_PROVIDER_KEY } from './useToast'

const toast = createDefaultToastAdapter()
// const toast = /createUiKitToastAdapter()

provide(TOAST_PROVIDER_KEY, toast)
</script>

<template>
  <slot />
</template>
