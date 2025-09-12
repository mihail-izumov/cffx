<template>
  <!-- 1. Баннер в самом верху -->
  <div v-if="shouldShowBanner" class="notification-banner">
    <NotificationSlider v-if="frontmatter.notification === 'brew'" />
    <GeneralNotification v-else />
  </div>
  
  <!-- 2. Стандартный Layout VitePress -->
  <div class="vp-layout-wrapper" :class="{ 'has-banner': shouldShowBanner }">
    <DefaultLayout />
  </div>
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
  z-index: 1000;
  height: 44px;
}

/* Сдвигаем всю структуру VitePress вниз */
.vp-layout-wrapper.has-banner {
  margin-top: 44px;
}

/* Дополнительные исправления для навигации */
.has-banner .VPNav {
  position: sticky;
  top: 0; /* Теперь прилипает к верху обёртки, а не к верху окна */
}

/* Исправление для мобильной версии */
@media (max-width: 768px) {
  .has-banner .VPNavScreen {
    top: 0; /* Мобильное меню также должно быть относительно обёртки */
  }
}
</style>
