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

/* Десктопные стили */
body.has-banner .VPNav {
  top: 44px;
  z-index: 1100;
}

body.has-banner .VPDoc {
  margin-top: 44px;
}

body.has-banner .VPSidebar {
  top: calc(var(--vp-nav-height) + 44px);
  max-height: calc(100vh - var(--vp-nav-height) - 44px);
  z-index: 1000;
}

/* Мобильная версия - исправленные стили */
@media (max-width: 768px) {
  /* Баннер остается на месте */
  .notification-banner {
    z-index: 10000; /* Увеличиваем z-index для мобильных */
  }
  
  /* Навигация сдвигается под баннер */
  body.has-banner .VPNav {
    top: 44px;
    z-index: 1100;
  }
  
  /* Контент получает минимальный отступ - как на обычных страницах */
  body.has-banner .VPDoc {
    margin-top: 44px; /* Только высота баннера, без добавления высоты меню */
    padding-top: 0; /* Убираем дополнительный padding */
  }
  
  /* Сайдбар (если есть) правильно позиционируется */
  body.has-banner .VPSidebar {
    top: calc(var(--vp-nav-height) + 44px);
    height: calc(100vh - var(--vp-nav-height) - 44px);
    overflow-y: auto;
  }
  
  /* Мобильное меню */
  body.has-banner .VPNavScreen {
    top: calc(var(--vp-nav-height) + 44px);
  }
}
</style>
