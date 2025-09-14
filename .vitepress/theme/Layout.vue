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
/* ПОЗИЦИОНИРОВАНИЕ И ШИРИНА КОНТЕЙНЕРА */
.notification-container {
  max-width: 688px;
  width: 100%;
  margin: 16px auto 40px auto; /* Больше отступ от меню и до заголовка */
  padding: 0;
  box-sizing: border-box;
}

/* Отступ до первого заголовка для правильной иерархии UX */
body.has-banner .VPDoc {
  margin-top: 0;
  padding-top: 8px; /* Дополнительный отступ до заголовка */
}

/* Скругления только для основных контейнеров VitePress */
.VPDoc,
.VPContent {
  border-radius: 5px;
}

/* Мобильная версия - исправления для корректной работы */
@media (max-width: 768px) {
  .notification-container {
    max-width: calc(100% - 32px); /* Отступы от краев экрана */
    margin: 20px 16px 36px 16px; /* Увеличенные отступы */
  }
  
  body.has-banner .VPDoc {
    margin-top: 0;
    padding-top: 12px; /* Больше отступ до заголовка на мобильных */
  }
}

/* Планшеты - промежуточные значения */
@media (max-width: 960px) and (min-width: 769px) {
  .notification-container {
    max-width: calc(100% - 48px);
    margin: 18px 24px 38px 24px;
  }
  
  body.has-banner .VPDoc {
    padding-top: 10px;
  }
}
</style>
