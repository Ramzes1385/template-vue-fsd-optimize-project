<!-- src/shared/providers/suspense-boundary/SuspenseBoundary.vue -->
<script setup lang="ts">
type Props = {
  loadingText?: string
  fullHeight?: boolean
}

withDefaults(defineProps<Props>(), {
  loadingText: 'Loading...',
  fullHeight: false,
})
</script>

<template>
  <Suspense>
    <slot />

    <template #fallback>
      <slot name="fallback">
        <div
          role="status"
          aria-live="polite"
          :class="[
            'suspense-boundary',
            {
              'suspense-boundary--full-height': fullHeight,
            },
          ]"
        >
          <span class="suspense-boundary__text">
            {{ loadingText }}
          </span>
        </div>
      </slot>
    </template>
  </Suspense>
</template>

<style scoped lang="scss">
.suspense-boundary {
  display: grid;
  place-items: center;
  padding: 24px;
}

.suspense-boundary--full-height {
  min-height: 100dvh;
}

.suspense-boundary__text {
  color: var(--color-text-secondary, #6b7280);
}
</style>
