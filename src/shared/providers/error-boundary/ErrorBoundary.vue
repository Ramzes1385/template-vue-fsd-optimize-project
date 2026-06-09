<!-- src/shared/providers/error-boundary/ErrorBoundary.vue -->
<script setup lang="ts">
import { onErrorCaptured, ref, watch } from 'vue';

import { normalizeError, reportError } from '@shared/lib/error';

type Props = {
  title?: string;
  description?: string;
  retryText?: string;
  resetKey?: string | number;
  stopPropagation?: boolean;
  showRetry?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
  title: 'Something went wrong',
  description: 'Please try again later.',
  retryText: 'Try again',
  resetKey: undefined,
  stopPropagation: false,
  showRetry: true,
});

const emit = defineEmits<{
  error: [error: unknown];
  reset: [];
}>();

const hasError = ref(false);

function resetError() {
  hasError.value = false;
  emit('reset');
}

watch(
  () => props.resetKey,
  () => {
    if (hasError.value) {
      resetError();
    }
  },
);

onErrorCaptured((error) => {
  hasError.value = true;

  reportError(
    normalizeError(error, {
      source: 'vue',
    }),
  );

  emit('error', error);

  if (props.stopPropagation) {
    return false;
  }

  return undefined;
});

defineExpose({
  resetError,
});
</script>

<template>
  <slot v-if="!hasError" />

  <slot
    v-else
    name="fallback"
    :reset-error="resetError"
    :error="hasError"
  >
    <main
      role="alert"
      class="error-boundary"
    >
      <h1 class="error-boundary__title">
        {{ title }}
      </h1>

      <p class="error-boundary__description">
        {{ description }}
      </p>

      <button
        v-if="showRetry"
        type="button"
        class="error-boundary__button"
        @click="resetError"
      >
        {{ retryText }}
      </button>
    </main>
  </slot>
</template>

<style scoped lang="scss">
.error-boundary {
  display: grid;
  place-content: center;
  gap: 16px;
  min-height: 100dvh;
  padding: 24px;
  text-align: center;
}

.error-boundary__title {
  margin: 0;
  font-size: 24px;
  line-height: 1.2;
}

.error-boundary__description {
  max-width: 480px;
  margin: 0;
  color: #6b7280;
}

.error-boundary__button {
  width: fit-content;
  margin: 0 auto;
  cursor: pointer;
}
</style>
