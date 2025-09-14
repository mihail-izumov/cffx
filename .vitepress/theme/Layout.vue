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
import { Layout } from 'vitepress/theme'
import NotificationSlider from './NotificationSlider.vue'
import GeneralNotification from './GeneralNotification.vue'

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
/* Простой баннер сверху контента - НЕ sticky, НЕ fixed */
.content-notification-banner {
  margin: -24px -24px 24px -24px; /* Убираем отступы контента и добавляем снизу */
  border-radius: 5px;
  overflow: hidden;
}

/* ИСПРАВЛЕНИЕ ДЫРКИ В МЕНЮ - растягиваем на всю ширину */
body.has-banner .VPNav {
  width: 100vw !important;
  margin-left: calc(-50vw + 50%) !important;
  margin-right: calc(-50vw + 50%) !important;
  border-radius: 5px;
}

body.has-banner .VPSidebar {
  border-radius: 5px;
}

/* Скругляем все контейнеры */
.VPDoc,
.VPContent, 
.content,
.vp-doc {
  border-radius: 5px;
}

/* Мобильная версия */
@media (max-width: 768px) {
  .content-notification-banner {
    margin: -16px -16px 16px -16px;
    border-radius: 0; /* На мобильных без скругления */
  }
  
  body.has-banner .VPNav {
    width: 100vw !important;
    margin-left: calc(-50vw + 50%) !important;
    margin-right: calc(-50vw + 50%) !important;
    border-radius: 0;
  }
}
</style>
