<script setup lang="ts">
import { BaseSideBar } from '@ramzes1385/rise-ui-kit'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { sidebarItems } from '../model/navigation'
import './app-sidebar.scss'

defineOptions({
  name: 'AppSidebar',
})

const route = useRoute()
const isCollapsed = ref(false)
</script>

<template>
  <BaseSideBar
    v-model:is-collapsed="isCollapsed"
    title="Rise UI"
    :items="sidebarItems"
    :active-path="route.path"
    active-match="exact"
    link-component="RouterLink"
    :is-collapsible="true"
    class="app-sidebar"
    :custom-class="{
      header: 'app-sidebar__header',
    }"
  />
</template>
