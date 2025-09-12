<template>
  <!-- 1. Баннер в самом верху -->
  <div v-if="shouldShowBanner" class="notification-banner">
    <NotificationSlider v-if="frontmatter.notification === 'brew'" />
    <GeneralNotification v-else />
  </div>
  
  <!-- 2. Стандартный Layout VitePress -->
  <DefaultLayout />
</template>

<script setup>
import { computed } from 'vue'
import { useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import NotificationSlider from './NotificationSlider.vue'
import GeneralNotification from './GeneralNotification.vue'

const DefaultLayout = DefaultTheme.Layout
const { frontmatter } = useData()

const shouldShowBanner = computed(() => 
  frontmatter.value.notification === 'brew' || frontmatter.value.notification === 'general'
)
</script>

<style>
.notification-banner {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 60;
  height: 44px;
}

/* Сдвигаем весь VitePress вниз когда есть баннер */
body:has(.notification-banner) .VPApp {
  margin-top: 44px;
}
</style>
