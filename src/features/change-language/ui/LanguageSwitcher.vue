<script setup lang="ts">
import { BaseButton, BaseDropdown } from '@ramzes1385/rise-ui-kit'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

import { SUPPORTED_LOCALES } from '@shared/i18n/config'
import type { AppLocale } from '@shared/i18n/types'

defineOptions({
  name: 'LanguageSwitcher',
})

const { locale } = useI18n()
const isOpen = ref(false)

const currentLabel = computed(() => {
  const found = SUPPORTED_LOCALES.find((l) => l.code === locale.value)
  return found?.label ?? locale.value
})

function setLocale(code: AppLocale) {
  locale.value = code
  localStorage.setItem('app-locale', code)
  isOpen.value = false
}
</script>

<template>
  <BaseDropdown v-model:is-open="isOpen" position="bottom-end">
    <BaseButton variant="ghost" size-scale="90">
      {{ currentLabel }}
    </BaseButton>

    <template #dropdown>
      <div class="language-switcher__list">
        <button
          v-for="loc in SUPPORTED_LOCALES"
          :key="loc.code"
          class="language-switcher__item"
          :class="{ 'language-switcher__item--active': loc.code === locale }"
          @click="setLocale(loc.code)"
        >
          {{ loc.label }}
        </button>
      </div>
    </template>
  </BaseDropdown>
</template>

<style scoped lang="scss">
.language-switcher {
  &__list {
    display: flex;
    flex-direction: column;
    min-width: 120px;
  }

  &__item {
    padding: 8px 12px;
    border: none;
    background: none;
    cursor: pointer;
    text-align: left;
    font-size: 14px;
    color: var(--color-text);
    border-radius: var(--border-radius-sm);
    transition: background-color 0.15s;

    &:hover {
      background: var(--color-bg-secondary);
    }

    &--active {
      font-weight: 600;
      color: var(--color-accent);
    }
  }
}
</style>
