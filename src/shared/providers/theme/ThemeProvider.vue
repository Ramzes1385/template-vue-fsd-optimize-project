<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, provide, readonly, ref, watch } from 'vue';

import type { ResolvedTheme, ThemeMode } from './theme.types';
import { THEME_PROVIDER_KEY } from './useTheme';

const STORAGE_KEY = 'app-theme';

const themeMode = ref<ThemeMode>('system');
const systemTheme = ref<ResolvedTheme>('light');

const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

const resolvedTheme = computed<ResolvedTheme>(() => {
  if (themeMode.value === 'system') {
    return systemTheme.value;
  }

  return themeMode.value;
});

function getSystemTheme(): ResolvedTheme {
  return mediaQuery.matches ? 'dark' : 'light';
}

function applyTheme(theme: ResolvedTheme) {
  document.documentElement.dataset.theme = theme;
}

function setThemeMode(theme: ThemeMode) {
  themeMode.value = theme;
  localStorage.setItem(STORAGE_KEY, theme);
}

function handleSystemThemeChange() {
  systemTheme.value = getSystemTheme();
}

onMounted(() => {
  const savedTheme = localStorage.getItem(STORAGE_KEY);

  if (savedTheme === 'light' || savedTheme === 'dark' || savedTheme === 'system') {
    themeMode.value = savedTheme;
  }

  systemTheme.value = getSystemTheme();

  mediaQuery.addEventListener('change', handleSystemThemeChange);
});

onBeforeUnmount(() => {
  mediaQuery.removeEventListener('change', handleSystemThemeChange);
});

watch(
  resolvedTheme,
  (theme) => {
    applyTheme(theme);
  },
  {
    immediate: true,
  },
);

provide(THEME_PROVIDER_KEY, {
  themeMode: readonly(themeMode),
  resolvedTheme,
  setThemeMode,
});
</script>

<template>
  <slot />
</template>
