<template>
  <Layout>
    <!-- Размещаем баннер в слоте doc-top -->
    <template #doc-top>
      <div v-if="shouldShowBanner" class="content-notification-banner">
        <NotificationSlider v-if="frontmatter.notification === 'brew'" />
        <GeneralNotification v-else />
      </div>
    </template>
  </Layout>
</template>

<script setup>
import { computed } from 'vue'
import { useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import NotificationSlider from './NotificationSlider.vue'
import GeneralNotification from './GeneralNotification.vue'

const { Layout } = DefaultTheme
const { frontmatter } = useData()

const shouldShowBanner = computed(() => 
  frontmatter.value?.notification === 'brew' || frontmatter.value?.notification === 'general'
)
</script>

<style>
/* Баннер внутри контента - липкий к верху области контента */
.content-notification-banner {
  position: sticky;
  top: 0;
  z-index: 10;
  margin: -24px -24px 16px -24px; /* Компенсируем отступы контента */
}

/* На мобильных устройствах убираем отрицательные отступы */
@media (max-width: 768px) {
  .content-notification-banner {
    margin: -16px -16px 12px -16px;
  }
}
</style>
