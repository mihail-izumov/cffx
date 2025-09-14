<template>
  <!-- 1. Баннер поверх всего -->
  <div v-if="shouldShowBanner" class="notification-banner" ref="bannerRef">
    <NotificationSlider v-if="frontmatter.notification === 'brew'" />
    <GeneralNotification v-else />
  </div>
  
  <!-- 2. Стандартный Layout без изменений -->
  <DefaultLayout />
</template>

<script setup>
import { computed, watch, nextTick, ref, onMounted, onBeforeUnmount } from 'vue'
import { useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import NotificationSlider from './NotificationSlider.vue'
import GeneralNotification from './GeneralNotification.vue'

const DefaultLayout = DefaultTheme.Layout
const { frontmatter } = useData()
const bannerRef = ref(null)

const shouldShowBanner = computed(() => 
  frontmatter.value?.notification === 'brew' || frontmatter.value?.notification === 'general'
)

// Динамически измеряем высоту баннера
const updateBannerHeight = async () => {
  if (typeof document !== 'undefined') {
    await nextTick()
    const banner = bannerRef.value || document.querySelector('.notification-banner')
    if (banner) {
      const height = banner.offsetHeight
      document.documentElement.style.setProperty('--banner-height', `${height}px`)
    } else {
      document.documentElement.style.setProperty('--banner-height', '0px')
    }
  }
}

// Обработчик изменения размера окна
const handleResize = () => {
  setTimeout(updateBannerHeight, 100)
}

// Наблюдение за изменением баннера
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

// Слушатели событий
onMounted(() => {
  window.addEventListener('resize', handleResize)
  setTimeout(updateBannerHeight, 500)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<style>
:root {
  --banner-height: 0px;
}

/* Баннер поверх всего */
.notification-banner {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9999;
}

/* Навигация сдвигается на высоту баннера */
body.has-banner .VPNav {
  top: var(--banner-height) !important;
  z-index: 1100;
}

/* Поисковое окно */
body.has-banner .VPLocalSearchBox {
  z-index: 10001 !important;
}

/* Контент получает отступ сверху */
body.has-banner .VPDoc {
  margin-top: var(--banner-height);
}

/* САЙДБАР: ТОЛЬКО добавляем высоту баннера к стандартному top */
body.has-banner .VPSidebar {
  top: calc(var(--vp-nav-height, 60px) + var(--banner-height)) !important;
}

/* Мобильная версия - НЕ трогаем стандартные механизмы VitePress */
@media (max-width: 768px) {
  body.has-banner .VPDoc {
    margin-top: var(--banner-height);
    padding-top: 0;
  }
  
  /* Мобильное меню при открытии */
  body.has-banner .VPNavScreen {
    top: calc(var(--vp-nav-height, 60px) + var(--banner-height));
  }
}
</style>
