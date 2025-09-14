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
/* ТОЛЬКО ПОЗИЦИОНИРОВАНИЕ И ШИРИНА */
.notification-container {
  /* Точная ширина как у блоков "ИНСАЙДЕР" и "НОВЫЙ ЛИДЕР" */
  max-width: 688px;
  width: 100%;
  margin: 8px auto 32px auto; /* Центрируем и задаем отступы */
  padding: 0;
  box-sizing: border-box;
}

/* Убираем лишние отступы */
body.has-banner .VPDoc {
  margin-top: 0;
  padding-top: 0;
}

/* Скругления только для основных контейнеров VitePress */
.VPDoc,
.VPContent {
  border-radius: 5px;
}

/* Мобильная версия */
@media (max-width: 768px) {
  .notification-container {
    max-width: 100%;
    margin: 4px 16px 24px 16px; /* Отступы от краев */
  }
}

/* Планшеты */
@media (max-width: 960px) and (min-width: 769px) {
  .notification-container {
    max-width: calc(100% - 48px);
    margin: 6px 24px 28px 24px;
  }
}
</style>
