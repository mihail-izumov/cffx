<template>
  <DefaultLayout>
    <template #doc-before>
      <div v-if="shouldShowBanner" class="notification-container">
        <NotificationSlider v-if="frontmatter.notification === 'brew'" />
        <GeneralNotification v-else />
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
/* Контейнер точно такой же ширины как основной контент */
.notification-container {
  max-width: 688px;
  width: 100%;
  margin: 16px auto 32px auto; /* Отступ от меню и до заголовка */
  padding: 0;
  box-sizing: border-box;
}

/* Простой отступ до заголовка для правильной UX иерархии */
body.has-banner .VPDoc {
  margin-top: 0;
  padding-top: 8px; /* Небольшой отступ для визуального разделения */
}

/* Скругления для VitePress контейнеров */
.VPDoc,
.VPContent {
  border-radius: 5px;
}

/* Мобильная версия - баннер остается в рамках контента */
@media (max-width: 768px) {
  .notification-container {
    max-width: 100%; /* Не выходим за рамки основного контента */
    margin: 12px 0 24px 0; /* Простые отступы */
    padding: 0;
  }
  
  body.has-banner .VPDoc {
    padding-top: 6px; /* Меньше отступ на мобильных */
  }
}

/* Планшеты */
@media (max-width: 960px) and (min-width: 769px) {
  .notification-container {
    max-width: calc(100% - 24px);
    margin: 14px 12px 28px 12px;
  }
  
  body.has-banner .VPDoc {
    padding-top: 7px;
  }
}
</style>
