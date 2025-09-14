<template>
  <Layout>
    <template #doc-top>
      <div v-if="shouldShowBanner" class="content-notification-banner">
        <NotificationSlider v-if="frontmatter.notification === 'brew'" />
        <GeneralNotification v-else />
      </div>
    </template>
  </Layout>
</template>

<script setup>
import { computed, watch } from 'vue'
import { useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import NotificationSlider from './NotificationSlider.vue'
import GeneralNotification from './GeneralNotification.vue'

const { Layout } = DefaultTheme
const { frontmatter } = useData()

const shouldShowBanner = computed(() => 
  frontmatter.value?.notification === 'brew' || frontmatter.value?.notification === 'general'
)

// Добавляем класс для управления стилями
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
/* Баннер липкий ВНУТРИ области контента */
.content-notification-banner {
  position: sticky;
  top: 0;
  z-index: 10;
  margin: -24px -24px 16px -24px; /* Компенсируем отступы контента */
}

/* ИСПРАВЛЕНИЕ ЗАЗОРОВ - растягиваем элементы на полную ширину */
body.has-banner .VPNav {
  width: 100% !important;
  margin: 0 !important;
  left: 0;
  right: 0;
  box-sizing: border-box;
}

body.has-banner .VPSidebar {
  margin: 0 !important;
  box-sizing: border-box;
}

/* На мобильных устройствах корректируем отступы и используем 100vw */
@media (max-width: 768px) {
  .content-notification-banner {
    margin: -16px -16px 12px -16px;
  }
  
  /* На мобильных используем 100vw для навигации */
  body.has-banner .VPNav {
    width: 100vw !important;
    margin: 0 !important;
    padding-left: 0;
    padding-right: 0;
  }
}
</style>
