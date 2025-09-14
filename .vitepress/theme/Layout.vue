<template>
  <!-- Баннер поверх всего -->
  <div v-if="shouldShowBanner" class="notification-banner">
    <NotificationSlider v-if="frontmatter.notification === 'brew'" />
    <GeneralNotification v-else />
  </div>
  
  <!-- Стандартный Layout VitePress -->
  <DefaultLayout />
</template>

<script setup>
import { computed, watch } from 'vue'
import { useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import NotificationSlider from './NotificationSlider.vue'
import GeneralNotification from './GeneralNotification.vue'

const DefaultLayout = DefaultTheme.Layout
const { frontmatter } = useData()

const shouldShowBanner = computed(() => 
  frontmatter.value?.notification === 'brew' || frontmatter.value?.notification === 'general'
)

watch(shouldShowBanner, (newVal) => {
  if (typeof document !== 'undefined') {
    if (newVal) {
      document.body.classList.add('has-banner')
    } else {
      document.body.classList.remove('has-banner')
    }
  }
}, { immediate: true })
</script>

<style>
/* Единственное изменение - фиксированный баннер */
.notification-banner {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10000;
  height: 44px;
}

/* Минимальный сдвиг контента */
body.has-banner .VPDoc {
  margin-top: 44px;
}

/* НЕ трогаем навигацию и сайдбар - пусть работают как задумано в VitePress */
</style>
