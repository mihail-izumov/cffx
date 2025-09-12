<!-- .vitepress/theme/CustomLayout.vue -->
<script setup>
import DefaultTheme from 'vitepress/theme'
import { useData } from 'vitepress'
import NotificationSlider from './NotificationSlider.vue'
import GeneralNotification from './GeneralNotification.vue'

const { Layout } = DefaultTheme
const { route } = useData()
</script>

<template>
  <Layout>
    <template #layout-top>
      <!-- ИЗМЕНЕНИЕ: Используем .includes() вместо .startsWith() для надежности -->
      <NotificationSlider v-if="route?.path.includes('/brew/')" />
      <GeneralNotification v-else />
    </template>
  </Layout>
</template>
