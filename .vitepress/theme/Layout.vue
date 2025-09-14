<template>
  <!-- Баннер зафиксирован поверх всего -->
  <div v-if="shouldShowBanner" class="notification-banner" ref="bannerRef">
    <NotificationSlider v-if="frontmatter.notification === 'brew'" />
    <GeneralNotification v-else />
  </div>
  
  <!-- Стандартный Layout VitePress -->
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

/* Баннер зафиксирован поверх всего */
.notification-banner {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9999;
  width: 100%;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Навигация прилипает под баннером */
body.has-banner .VPNav {
  position: sticky;
  top: var(--banner-height);
  z-index: 1100;
  margin: 0;
  width: 100%;
  left: 0;
  right: 0;
}

/* Сайдбар правильно позиционируется */
body.has-banner .VPSidebar {
  position: sticky;
  top: calc(var(--vp-nav-height, 60px) + var(--banner-height));
  max-height: calc(100vh - var(--vp-nav-height, 60px) - var(--banner-height));
  z-index: 1000;
}

/* Контент получает отступ сверху равный высоте баннера */
body.has-banner .VPDoc {
  margin-top: var(--banner-height);
  padding-top: 0;
}

/* Поисковое окно */
body.has-banner .VPLocalSearchBox {
  z-index: 10001 !important;
}

/* Убираем дырки - растягиваем элементы на полную ширину */
body.has-banner .VPNav,
body.has-banner .VPSidebar {
  box-sizing: border-box;
  margin-left: 0;
  margin-right: 0;
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
  
  /* На мобильных убираем любые отступы, которые могут создавать щели */
  body.has-banner .VPNav {
    width: 100vw;
    margin: 0;
    padding-left: 0;
    padding-right: 0;
  }
}
</style>
