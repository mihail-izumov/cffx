<template>
  <DefaultLayout>
    <template #doc-before>
      <div v-if="shouldShowBanner" class="notification-container">
        <div ref="bannerRef" class="banner-wrapper">
          <NotificationSlider v-if="frontmatter.notification === 'brew'" />
          <GeneralNotification v-else />
        </div>
      </div>
    </template>
  </DefaultLayout>
</template>

<script setup>
import { computed, watch, ref, onMounted, onUnmounted, nextTick } from 'vue'
import { useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import NotificationSlider from './NotificationSlider.vue'
import GeneralNotification from './GeneralNotification.vue'

const DefaultLayout = DefaultTheme.Layout
const { frontmatter } = useData()
const bannerRef = ref(null)
let resizeObserver = null

const shouldShowBanner = computed(() => 
  frontmatter.value?.notification === 'brew' || frontmatter.value?.notification === 'general'
)

// Функция обновления отступа контента при изменении высоты баннера
const updateContentOffset = () => {
  if (bannerRef.value) {
    const height = bannerRef.value.offsetHeight
    document.documentElement.style.setProperty('--banner-actual-height', `${height}px`)
  } else {
    document.documentElement.style.setProperty('--banner-actual-height', '0px')
  }
}

watch(shouldShowBanner, (newVal) => {
  if (typeof document !== 'undefined') {
    if (newVal) {
      document.body.classList.add('has-banner')
      nextTick(() => {
        updateContentOffset()
        // Устанавливаем наблюдение за изменением размера баннера
        if (bannerRef.value && window.ResizeObserver) {
          resizeObserver = new ResizeObserver(updateContentOffset)
          resizeObserver.observe(bannerRef.value)
        }
      })
    } else {
      document.body.classList.remove('has-banner')
      document.documentElement.style.setProperty('--banner-actual-height', '0px')
      if (resizeObserver) {
        resizeObserver.disconnect()
        resizeObserver = null
      }
    }
  }
}, { immediate: true })

onMounted(() => {
  if (shouldShowBanner.value) {
    updateContentOffset()
  }
})

onUnmounted(() => {
  if (resizeObserver) {
    resizeObserver.disconnect()
  }
})
</script>

<style>
:root {
  --banner-actual-height: 0px;
}

/* ПОЗИЦИОНИРОВАНИЕ КОНТЕЙНЕРА */
.notification-container {
  max-width: 688px;
  width: 100%;
  margin: 16px auto 0 auto; /* Убираем нижний отступ */
  padding: 0;
  box-sizing: border-box;
}

.banner-wrapper {
  width: 100%;
}

/* ФИКСИРОВАННЫЙ ОТСТУП КОНТЕНТА равный реальной высоте баннера */
body.has-banner .VPDoc {
  margin-top: var(--banner-actual-height) !important;
  padding-top: 24px !important; /* Дополнительный отступ до заголовка */
  transition: margin-top 0.3s ease !important; /* Плавный переход при изменении высоты */
}

/* Скругления */
.VPDoc,
.VPContent {
  border-radius: 5px;
}

/* Мобильная версия - баннер на всю ширину экрана */
@media (max-width: 768px) {
  .notification-container {
    width: 100vw !important;
    max-width: none !important;
    margin-left: calc(-50vw + 50%) !important;
    margin-right: calc(-50vw + 50%) !important;
    margin-top: 12px !important;
    margin-bottom: 0 !important;
    padding: 0 !important;
  }
  
  body.has-banner .VPDoc {
    padding-top: 20px !important; /* Меньше отступ на мобильных */
  }
}

/* Планшеты */
@media (max-width: 960px) and (min-width: 769px) {
  .notification-container {
    max-width: calc(100% - 48px);
    margin: 14px 24px 0 24px;
  }
  
  body.has-banner .VPDoc {
    padding-top: 22px !important;
  }
}
</style>
