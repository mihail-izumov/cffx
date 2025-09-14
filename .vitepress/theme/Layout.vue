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
const { frontmatter, route } = useData()
const bannerRef = ref(null)

const shouldShowBanner = computed(() => 
  frontmatter.value?.notification === 'brew' || frontmatter.value?.notification === 'general'
)

// Динамически измеряем высоту баннера
const updateBannerHeight = async () => {
  if (typeof document !== 'undefined') {
    await nextTick()
    const banner = bannerRef.value
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
watch(() => [shouldShowBanner.value, route.path], async ([newVal]) => {
  if (typeof document !== 'undefined') {
    if (newVal) {
      document.body.classList.add('has-banner')
    } else {
      document.body.classList.remove('has-banner')
    }
    // Обновляем высоту на каждой смене страницы
    await updateBannerHeight()
  }
}, { immediate: true, deep: true })

// Слушатели событий
onMounted(() => {
  window.addEventListener('resize', handleResize)
  // Дополнительная проверка через небольшое время
  setTimeout(updateBannerHeight, 300)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<style>
:root {
  --banner-height: 0px;
}

/* --- Баннер --- */
.notification-banner {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100; /* Выше всего */
}

/* --- Навигация --- */
body.has-banner .VPNav {
  position: sticky;
  top: var(--banner-height);
}

/* --- Поиск --- */
body.has-banner .VPLocalSearchBox {
  z-index: 101 !important; /* Чуть выше навигации */
}

/* --- Сайдбар (самое важное!) --- */
body.has-banner .VPSidebar {
  /* Говорим сайдбару прилипать ниже навигации, которая уже сдвинута */
  top: calc(var(--vp-nav-height) + var(--banner-height)) !important;
  /* Уменьшаем его максимальную высоту на высоту баннера */
  max-height: calc(100vh - var(--vp-nav-height) - var(--banner-height));
}

/* --- Мобильная версия --- */
@media (max-width: 768px) {
  /* Восстанавливаем кнопку меню */
  body.has-banner .VPNavBarHamburger {
    z-index: 102;
  }
  
  /* Сдвигаем открытое мобильное меню */
  body.has-banner .VPNavScreen {
    top: calc(var(--vp-nav-height) + var(--banner-height));
  }
}
</style>
