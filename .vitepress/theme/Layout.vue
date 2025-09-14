<template>
  <DefaultLayout>
    <template #doc-before>
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
/* Баннер ограниченной ширины, как у основного контента */
.content-notification-banner {
  max-width: 720px;
  width: 100%;
  margin: 0 auto 24px auto;
  border-radius: 5px;
  padding: 12px 24px;
  box-sizing: border-box;
}

/* НЕ ТРОГАЕМ меню и сайдбар - убираем все попытки их изменить */

/* Скругляем основные контейнеры */
.VPDoc,
.VPContent {
  border-radius: 5px;
}

/* Мобильная версия */
@media (max-width: 768px) {
  .content-notification-banner {
    max-width: 100%;
    margin: 0 16px 16px 16px;
    border-radius: 8px;
    padding: 12px 16px;
  }
}
</style>
