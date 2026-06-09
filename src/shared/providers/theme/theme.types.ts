import type { ComputedRef, DeepReadonly, Ref } from 'vue';

export type ThemeMode = 'light' | 'dark' | 'system';
export type ResolvedTheme = 'light' | 'dark';

export type ThemeContext = {
  themeMode: DeepReadonly<Ref<ThemeMode>>;
  resolvedTheme: ComputedRef<ResolvedTheme>;
  setThemeMode: (theme: ThemeMode) => void;
};
