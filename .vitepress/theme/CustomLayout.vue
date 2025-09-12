<script setup>
import { computed, watch } from 'vue'
import DefaultTheme from 'vitepress/theme'
import { useData } from 'vitepress'
import NotificationSlider from './NotificationSlider.vue'
import GeneralNotification from './GeneralNotification.vue'

const { Layout } = DefaultTheme
const { frontmatter, route } = useData()

// Вычисляемое свойство, чтобы определить, нужно ли показывать баннер
const shouldShowBanner = computed(() => {
  return frontmatter.value.notification === 'brew' || frontmatter.value.notification === 'general'
})

// Функция для обновления класса на <html>
const updateHtmlClass = () => {
  if (typeof document !== 'undefined') {
    if (shouldShowBanner.value) {
      document.documentElement.classList.add('has-notification-banner')
    } else {
      document.documentElement.classList.remove('has-notification-banner')
    }
  }
}

// Следим за изменением пути и немедленно вызываем функцию.
// { immediate: true } гарантирует, что класс будет установлен/удален при первой же загрузке компонента,
// решая проблему "дырки" при навигации.
watch(() => route.path, updateHtmlClass, { immediate: true })
</script>

<template>
  <Layout>
    <template #layout-top>
      <NotificationSlider v-if="frontmatter.notification === 'brew'" />
      <GeneralNotification v-else-if="frontmatter.notification === 'general'" />
    </template>
  </Layout>
</template>
