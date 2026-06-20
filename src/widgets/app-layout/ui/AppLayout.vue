<script setup lang="ts">
import './app-layout.scss'

import { AppSidebar } from '@widgets/app-sidebar'

defineOptions({
  name: 'AppLayout',
})
</script>

<template>
  <div class="app-layout">
    <AppSidebar />
    <main class="app-layout__content">
      <slot />
    </main>
  </div>
</template>
