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
      
      // Принудительно обновляем стили сайдбара
      forceSidebarUpdate()
    } else {
      document.documentElement.style.setProperty('--banner-height', '0px')
    }
  }
}

// Принудительное обновление позиции сайдбара
const forceSidebarUpdate = () => {
  const sidebar = document.querySelector('.VPSidebar')
  if (sidebar) {
    // Сбрасываем позицию и восстанавливаем
    sidebar.style.position = 'static'
    requestAnimationFrame(() => {
      sidebar.style.position = 'sticky'
    })
  }
}

// Обработчик изменения размера окна
const handleResize = () => {
  setTimeout(updateBannerHeight, 100) // Небольшая задержка для корректного измерения
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

// Слушатели событий для resize
onMounted(() => {
  window.addEventListener('resize', handleResize)
  // Дополнительное обновление через небольшое время для инициализации
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

/* Навигация */
body.has-banner .VPNav {
  top: var(--banner-height) !important;
  z-index: 1100;
}

/* Поисковое окно */
body.has-banner .VPLocalSearchBox {
  z-index: 10001 !important;
}

/* Контент */
body.has-banner .VPDoc {
  margin-top: var(--banner-height);
}

/* АГРЕССИВНЫЕ СТИЛИ ДЛЯ САЙДБАРА */
.VPSidebar {
  position: sticky !important;
  top: var(--vp-nav-height, 60px) !important;
  z-index: 1000 !important;
}

body.has-banner .VPSidebar {
  position: sticky !important;
  top: calc(var(--vp-nav-height, 60px) + var(--banner-height)) !important;
  max-height: calc(100vh - var(--vp-nav-height, 60px) - var(--banner-height)) !important;
  z-index: 1000 !important;
  overflow-y: auto !important;
}

/* Убираем возможные overflow: hidden на родителях сайдбара */
.VPLayout, .VPAside {
  overflow: visible !important;
}

/* Принудительно исправляем контейнер сайдбара */
.VPAside {
  position: relative !important;
  overflow: visible !important;
  height: auto !important;
}

/* Мобильная версия */
@media (max-width: 768px) {
  body.has-banner .VPDoc {
    margin-top: var(--banner-height);
    padding-top: 0;
  }
  
  body.has-banner .VPNavScreen {
    top: calc(var(--vp-nav-height, 60px) + var(--banner-height));
  }
}
</style>
