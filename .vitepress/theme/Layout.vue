<template>
  <!-- Баннер с уведомлениями -->
  <div v-if="shouldShowBanner" class="notification-banner">
    <NotificationSlider v-if="frontmatter.notification === 'brew'" />
    <GeneralNotification v-else />
  </div>

  <!-- Стандартный layout VitePress -->
  <DefaultLayout />
</template>

<script setup>
import { computed, watch, nextTick } from 'vue'
import { useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import NotificationSlider from './NotificationSlider.vue'
import GeneralNotification from './GeneralNotification.vue'

const DefaultLayout = DefaultTheme.Layout
const { frontmatter } = useData()

const shouldShowBanner = computed(() => 
  frontmatter.value?.notification === 'brew' || frontmatter.value?.notification === 'general'
)

// Динамически измеряем высоту баннера и обновляем CSS переменную
const updateBannerHeight = async () => {
  if (typeof document !== 'undefined') {
    await nextTick()
    const banner = document.querySelector('.notification-banner')
    if (banner) {
      const height = banner.offsetHeight
      document.documentElement.style.setProperty('--banner-height', `${height}px`)
    } else {
      document.documentElement.style.setProperty('--banner-height', '0px')
    }
  }
}

watch(shouldShowBanner, async (newVal) => {
  if (typeof document !== 'undefined') {
    if (newVal) {
      document.body.classList.add('has-banner')
      await updateBannerHeight()
    } else {
      document.body.classList.remove('has-banner')
      document.documentElement.style.setProperty('--banner-height', '0px')
    }
  }
}, { immediate: true })
</script>

<style>
:root {
  --banner-height: 0px;
}

/* Баннер всегда поверх всего */
.notification-banner {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10000; /* Увеличиваем для поиска */
}

/* Сдвигаем навигацию на высоту баннера */
body.has-banner .VPNav {
  top: var(--banner-height);
  z-index: 1100;
}

/* Поисковое окно должно быть выше баннера */
body.has-banner .VPLocalSearchBox {
  z-index: 10001 !important;
}

/* Контент получает отступ */
body.has-banner .VPDoc {
  margin-top: var(--banner-height);
}

/* Сайдбар правильно позиционируется */
body.has-banner .VPSidebar {
  top: calc(var(--vp-nav-height) + var(--banner-height));
  max-height: calc(100vh - var(--vp-nav-height) - var(--banner-height));
  z-index: 1000;
}

/* Мобильная версия */
@media (max-width: 768px) {
  body.has-banner .VPNavScreen {
    top: calc(var(--vp-nav-height) + var(--banner-height));
  }
}
</style>
