<script setup lang="ts">
import './app-layout.scss'

defineOptions({
  name: 'AppLayout',
})
</script>

<template>
  <div class="app-layout">
    <main class="app-layout__content">
      <slot />
    </main>
  </div>
</template>
