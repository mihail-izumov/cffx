<script setup>
import DefaultTheme from 'vitepress/theme'
import { useData } from 'vitepress'
import NotificationSlider from './NotificationSlider.vue'
import GeneralNotification from './GeneralNotification.vue'

const { Layout } = DefaultTheme
const { frontmatter } = useData()
</script>

<template>
  <Layout>
    <template #doc-before>
      <!-- Рендерим нужный баннер на основе frontmatter -->
      <NotificationSlider v-if="frontmatter.notification === 'brew'" />
      <GeneralNotification v-else-if="frontmatter.notification === 'general'" />
    </template>
  </Layout>
</template>
