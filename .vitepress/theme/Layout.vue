<template>
  <!-- 1. Баннер в самом верху -->
  <div v-if="shouldShowBanner" class="notification-banner">
    <NotificationSlider v-if="frontmatter.notification === 'brew'" />
    <GeneralNotification v-else />
  </div>
  
  <!-- 2. Стандартный Layout VitePress БЕЗ обёртки -->
  <DefaultLayout />
</template>

<script setup>
import { computed, watch } from 'vue'
import { useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import NotificationSlider from './NotificationSlider.vue'
import GeneralNotification from './GeneralNotification.vue'

const DefaultLayout = DefaultTheme.Layout
const { frontmatter, route } = useData()

const shouldShowBanner = computed(() => 
  frontmatter.value.notification === 'brew' || frontmatter.value.notification === 'general'
)

// Добавляем/убираем класс на body для условного CSS
watch(shouldShowBanner, (newValue) => {
  if (typeof document !== 'undefined') {
    if (newValue) {
      document.body.classList.add('has-notification-banner')
    } else {
      document.body.classList.remove('has-notification-banner')
    }
  }
}, { immediate: true })
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

/* Сдвигаем только главный контейнер VitePress */
body.has-notification-banner .VPApp {
  padding-top: 44px;
}

/* Исправляем навигацию - она должна быть sticky от начала VPApp */
body.has-notification-banner .VPNav {
  position: sticky;
  top: 0; /* Относительно VPApp, который уже сдвинут */
}

/* Исправляем сайдбар */
body.has-notification-banner .VPSidebar {
  top: var(--vp-nav-height); /* Под навигацией */
  max-height: calc(100vh - var(--vp-nav-height) - 44px);
}

/* Мобильная версия */
@media (max-width: 768px) {
  body.has-notification-banner .VPNavScreen {
    top: var(--vp-nav-height);
  }
}
</style>
