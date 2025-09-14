<template>
  <DefaultLayout>
    <template #doc-before>
      <div v-if="shouldShowBanner" class="notification-wrapper">
        <div class="content-notification-banner">
          <NotificationSlider v-if="frontmatter.notification === 'brew'" />
          <GeneralNotification v-else />
        </div>
      </div>
    </template>
  </DefaultLayout>
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

watch(shouldShowBanner, (newVal) => {
  if (typeof document !== 'undefined') {
    if (newVal) {
      document.body.classList.add('has-banner')
    } else {
      document.body.classList.remove('has-banner')
    }
  }
}, { immediate: true })
</script>

<style>
/* Обертка для правильного позиционирования */
.notification-wrapper {
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 8px 0 24px 0; /* Ближе к меню, больше во-здуха до заголовка */
}

/* Баннер точно такой же ширины, как основной контент */
.content-notification-banner {
  max-width: 688px; /* Точная ширина VitePress контента */
  width: 100%;
  padding: 10px 20px;
  border-radius: 5px;
  box-sizing: border-box;
  min-height: 44px; /* Фиксированная высота предотвращает прыжки */
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease; /* Плавные изменения высоты */
}

/* Убираем отступы, баннер сам создает нужное расстояние */
body.has-banner .VPDoc {
  margin-top: 0;
  padding-top: 0;
}

/* Скругления для основных контейнеров */
.VPDoc,
.VPContent,
.content-notification-banner {
  border-radius: 5px;
}

/* Мобильная версия */
@media (max-width: 768px) {
  .notification-wrapper {
    margin: 4px 16px 20px 16px; /* Отступы от краев */
  }
  
  .content-notification-banner {
    max-width: 100%;
    padding: 8px 16px;
    border-radius: 8px;
    min-height: 40px;
  }
}

/* Планшеты */
@media (max-width: 960px) and (min-width: 769px) {
  .notification-wrapper {
    margin: 6px 24px 22px 24px;
  }
  
  .content-notification-banner {
    max-width: calc(100% - 48px);
    padding: 9px 18px;
  }
}
</style>
