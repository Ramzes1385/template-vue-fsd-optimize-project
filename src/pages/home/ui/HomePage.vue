<script setup lang="ts">
import {
  BaseAlert,
  BaseAvatar,
  BaseBadge,
  BaseButton,
  BaseCard,
  BaseChip,
  BaseInput,
  BaseModal,
  BaseProgress,
  BaseRating,
  BaseSwitch,
  BaseTabs,
  BaseTooltip,
} from '@ramzes1385/rise-ui-kit'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const inputValue = ref('')
const isModalOpen = ref(false)
const switchValue = ref(false)
const activeTab = ref('general')
const ratingValue = ref(3)

const tabItems = [
  { id: 'general', label: 'General' },
  { id: 'profile', label: 'Profile' },
  { id: 'settings', label: 'Settings' },
]
</script>

<template>
  <main class="home-page">
    <h1>{{ t('pages.home.title') }}</h1>

    <section class="home-page__section">
      <h2>Alerts</h2>
      <BaseAlert
        type="info"
        title="Information"
        description="This is an informational alert from Rise-UI-KIT."
      />
      <BaseAlert
        type="success"
        title="Success"
        description="Operation completed successfully."
        variant="soft"
      />
      <BaseAlert
        type="warning"
        title="Warning"
        variant="outline"
      >
        Please review your settings.
      </BaseAlert>
    </section>

    <section class="home-page__section">
      <h2>Buttons</h2>
      <div class="home-page__row">
        <BaseButton>Default</BaseButton>
        <BaseButton variant="outline">Outline</BaseButton>
        <BaseButton variant="ghost">Ghost</BaseButton>
        <BaseButton variant="soft">Soft</BaseButton>
        <BaseButton variant="shadow">Shadow</BaseButton>
        <BaseButton is-disabled>Disabled</BaseButton>
        <BaseButton is-loading>Loading</BaseButton>
      </div>
    </section>

    <section class="home-page__section">
      <h2>Cards</h2>
      <div class="home-page__row">
        <BaseCard title="Default Card" subtitle="Card subtitle">
          <p>Card content with Rise-UI-KIT components.</p>
        </BaseCard>
        <BaseCard title="Hoverable" variant="outline" :is-hoverable="true">
          <p>This card has hover effect.</p>
        </BaseCard>
        <BaseCard title="Shadow" variant="shadow">
          <p>Card with shadow variant.</p>
        </BaseCard>
      </div>
    </section>

    <section class="home-page__section">
      <h2>Avatars & Badges</h2>
      <div class="home-page__row">
        <BaseAvatar name="John Doe" />
        <BaseAvatar name="Jane Smith" shape="square" />
        <BaseAvatar name="AB" :is-online="true" />
        <BaseBadge label="New" />
        <BaseBadge label="v1.2.3" variant="outline" />
        <BaseBadge label="Beta" variant="soft" />
      </div>
    </section>

    <section class="home-page__section">
      <h2>Chips</h2>
      <div class="home-page__row">
        <BaseChip label="Vue" />
        <BaseChip label="TypeScript" variant="outline" />
        <BaseChip label="Rise UI" variant="soft" />
      </div>
    </section>

    <section class="home-page__section">
      <h2>Input</h2>
      <BaseInput
        v-model="inputValue"
        label="Search"
        placeholder="Type something..."
        variant="outline"
      />
    </section>

    <section class="home-page__section">
      <h2>Tabs</h2>
      <BaseTabs
        v-model="activeTab"
        :items="tabItems"
        variant="pills"
      />
      <p>Active tab: {{ activeTab }}</p>
    </section>

    <section class="home-page__section">
      <h2>Switch & Rating</h2>
      <div class="home-page__row">
        <BaseSwitch v-model="switchValue" />
        <span>Switch: {{ switchValue ? 'On' : 'Off' }}</span>
      </div>
      <div class="home-page__row">
        <BaseRating v-model="ratingValue" />
        <span>Rating: {{ ratingValue }}</span>
      </div>
    </section>

    <section class="home-page__section">
      <h2>Progress</h2>
      <BaseProgress :value="65" :max="100" />
    </section>

    <section class="home-page__section">
      <h2>Tooltip</h2>
      <BaseTooltip text="This is a tooltip">
        <BaseButton variant="outline">Hover me</BaseButton>
      </BaseTooltip>
    </section>

    <section class="home-page__section">
      <h2>Modal</h2>
      <BaseButton @click="isModalOpen = true">Open Modal</BaseButton>
      <BaseModal
        v-model:is-open="isModalOpen"
        title="Example Modal"
      >
        <p>Modal content from Rise-UI-KIT.</p>
        <template #footer>
          <BaseButton variant="ghost" @click="isModalOpen = false">
            Close
          </BaseButton>
          <BaseButton @click="isModalOpen = false">
            Confirm
          </BaseButton>
        </template>
      </BaseModal>
    </section>
  </main>
</template>

<style scoped lang="scss">
.home-page {
  display: flex;
  flex-direction: column;
  gap: 32px;

  &__section {
    display: flex;
    flex-direction: column;
    gap: 12px;

    h2 {
      font-size: 1.25rem;
      font-weight: 600;
    }
  }

  &__row {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 12px;
  }
}
</style>
