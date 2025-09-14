<template>
  <DefaultLayout>
    <template #doc-top>
      <div v-if="shouldShowBanner" class="content-notification-banner">
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
/* УБИРАЕМ ВСЕ ПОПЫТКИ ИЗМЕНИТЬ МЕНЮ И САЙДБАР */
/* Никаких изменений VPNav, VPSidebar - оставляем как есть */

/* Баннер ограниченной ширины, как у основного контента */
.content-notification-banner {
  max-width: 720px; /* Ширина основного контента VitePress */
  width: 100%;
  margin: 0 auto 24px auto; /* Центрируем и добавляем отступ снизу */
  border-radius: 5px;
  padding: 12px 24px;
  box-sizing: border-box;
  /* Выравнивается по тому же принципу, что и текст/блоки */
}

/* Отступ сверху для контента */
body.has-banner .VPDoc {
  padding-top: 16px; /* Небольшой отступ от баннера */
}

/* Скругляем основные контейнеры */
.VPDoc,
.VPContent {
  border-radius: 5px;
}

/* Мобильная версия */
@media (max-width: 768px) {
  .content-notification-banner {
    max-width: 100%;
    margin: 0 16px 16px 16px; /* Отступы от краев на мобильных */
    border-radius: 8px;
    padding: 12px 16px;
  }
  
  body.has-banner .VPDoc {
    padding-top: 12px;
  }
}

/* Планшеты */
@media (max-width: 960px) and (min-width: 769px) {
  .content-notification-banner {
    max-width: calc(100% - 48px); /* Учитываем отступы на планшетах */
    margin: 0 24px 20px 24px;
  }
}
</style>
