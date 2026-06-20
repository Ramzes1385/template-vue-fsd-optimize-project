<script setup lang="ts">
import {
  BaseAvatar,
  BaseBadge,
  BaseButton,
  BaseCard,
  BaseInput,
  BaseSeparator,
  BaseSwitch,
  BaseTabs,
} from '@ramzes1385/rise-ui-kit'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

import { LanguageSwitcher } from '@features/change-language'
import { LogoutButton } from '@features/logout'
import { useTheme } from '@shared/providers/theme/useTheme'

const { t } = useI18n()
const { themeMode, setThemeMode } = useTheme()

const activeTab = ref('general')
const name = ref('John Doe')
const email = ref('john@example.com')
const isDark = ref(themeMode.value === 'dark')

const tabItems = [
  { id: 'general', label: t('pages.profile.tab_general') },
  { id: 'settings', label: t('pages.profile.tab_settings') },
]

function toggleTheme() {
  isDark.value = !isDark.value
  setThemeMode(isDark.value ? 'dark' : 'light')
}
</script>

<template>
  <div class="profile-page">
    <BaseCard variant="shadow" :padding="32" class="profile-page__header">
      <div class="profile-page__header-content">
        <BaseAvatar name="John Doe" :size-scale="150" />
        <div class="profile-page__info">
          <h1>{{ t('pages.profile.title') }}</h1>
          <div class="profile-page__badges">
            <BaseBadge label="Pro" variant="soft" />
            <BaseBadge :label="t('common.online')" variant="outline" />
          </div>
        </div>
        <div class="profile-page__actions">
          <LanguageSwitcher />
          <LogoutButton />
        </div>
      </div>
    </BaseCard>

    <BaseTabs
      v-model="activeTab"
      :items="tabItems"
      variant="pills"
    />

    <BaseCard v-if="activeTab === 'general'" :title="t('pages.profile.tab_general')" variant="default">
      <div class="profile-page__form">
        <BaseInput
          v-model="name"
          :label="t('common.email').replace('Email', 'Name')"
          variant="outline"
        />
        <BaseInput
          v-model="email"
          :label="t('common.email')"
          type="email"
          variant="outline"
        />
        <BaseSeparator />
        <div class="profile-page__form-actions">
          <BaseButton>{{ t('common.save') }}</BaseButton>
          <BaseButton variant="ghost">{{ t('common.cancel') }}</BaseButton>
        </div>
      </div>
    </BaseCard>

    <BaseCard v-if="activeTab === 'settings'" :title="t('pages.profile.tab_settings')" variant="default">
      <div class="profile-page__settings">
        <div class="profile-page__setting-row">
          <span>{{ t('common.theme') }}: {{ isDark ? t('common.dark') : t('common.light') }}</span>
          <BaseSwitch v-model="isDark" @update:model-value="toggleTheme" />
        </div>
        <BaseSeparator />
        <div class="profile-page__setting-row">
          <span>{{ t('common.language') }}</span>
          <LanguageSwitcher />
        </div>
      </div>
    </BaseCard>
  </div>
</template>

<style scoped lang="scss">
.profile-page {
  display: flex;
  flex-direction: column;
  gap: 24px;

  &__header-content {
    display: flex;
    align-items: center;
    gap: 20px;
    flex-wrap: wrap;
  }

  &__info {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 8px;

    h1 {
      margin: 0;
      font-size: 1.5rem;
      font-weight: 700;
    }
  }

  &__badges {
    display: flex;
    gap: 8px;
  }

  &__actions {
    display: flex;
    gap: 8px;
    align-items: center;
  }

  &__form,
  &__settings {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  &__form-actions {
    display: flex;
    gap: 12px;
  }

  &__setting-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 0;
  }
}
</style>
