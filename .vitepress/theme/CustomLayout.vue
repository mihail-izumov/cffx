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
    <template #layout-top>
      <!-- Условный рендеринг в самом верхнем слоте -->
      <NotificationSlider v-if="frontmatter.notification === 'brew'" />
      <GeneralNotification v-else-if="frontmatter.notification === 'general'" />
    </template>
  </Layout>
</template>
