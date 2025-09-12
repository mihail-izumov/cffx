<template>
  <!-- 1. Баннер поверх всего -->
  <div v-if="shouldShowBanner" class="notification-banner">
    <NotificationSlider v-if="frontmatter.notification === 'brew'" />
    <GeneralNotification v-else />
  </div>
  
  <!-- 2. Стандартный Layout без изменений -->
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

// Добавляем класс на body для условного CSS
watch(shouldShowBanner, (newValue) => {
  if (typeof document !== 'undefined') {
    if (newValue) {
      document.body.classList.add('has-banner')
    } else {
      document.body.classList.remove('has-banner')
    }
  }
}, { immediate: true })
</script>

<style>
/* Баннер всегда поверх всего */
.notification-banner {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9999;
  height: 44px;
}

/* Исправленные стили */
body.has-banner .VPNav {
  top: 44px;
  z-index: 1100;
}

/* Используем margin вместо padding */
body.has-banner .VPDoc {
  margin-top: 44px;
}

/* Более точное позиционирование сайдбара */
body.has-banner .VPSidebar {
  top: calc(var(--vp-nav-height) + 44px);
  max-height: calc(100vh - var(--vp-nav-height) - 44px);
  z-index: 1000;
}

/* Мобильная версия */
@media (max-width: 768px) {
  body.has-banner .VPNav {
    top: 44px;
  }
  body.has-banner .VPSidebar {
    top: calc(var(--vp-nav-height) + 44px);
  }
  body.has-banner .VPDoc {
    margin-top: calc(var(--vp-nav-height) + 44px);
  }
}
</style>
