<template>
  <!-- Баннер с уведомлениями -->
  <div v-if="shouldShowBanner" class="notification-banner" ref="bannerRef">
    <NotificationSlider v-if="frontmatter.notification === 'brew'" />
    <GeneralNotification v-else />
  </div>

  <!-- Стандартный layout VitePress -->
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

// Функция обновления высоты баннера
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

/* ИСПРАВЛЕНИЕ САЙДБАРА - добавляем небольшой отступ от навигации */
body.has-banner .VPSidebar {
  top: calc(var(--vp-nav-height, 60px) + var(--banner-height) + 16px) !important;
  max-height: calc(100vh - var(--vp-nav-height, 60px) - var(--banner-height) - 16px) !important;
  position: sticky !important;
  z-index: 1000 !important;
}

/* Мобильная версия - восстанавливаем стандартное поведение */
@media (max-width: 768px) {
  body.has-banner .VPDoc {
    margin-top: var(--banner-height);
    padding-top: 0;
  }
  
  /* Мобильное меню (гамбургер) */
  body.has-banner .VPNavScreen {
    top: calc(var(--vp-nav-height, 60px) + var(--banner-height)) !important;
  }
  
  /* Мобильный сайдбар (когда открыт) */
  body.has-banner .VPNavScreenMenuGroup {
    margin-top: 0 !important;
  }
}
</style>
