<!-- .vitepress/theme/CustomLayout.vue -->
<script setup>
import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import { useData } from 'vitepress'
import NotificationSlider from './NotificationSlider.vue'
import GeneralNotification from './GeneralNotification.vue' // Предполагается, что этот файл создан

const { Layout } = DefaultTheme
const { route } = useData()
</script>

<template>
  <Layout>
    <template #layout-top>
      <!-- Если путь начинается с /brew/, показываем слайдер для BREW -->
      <NotificationSlider v-if="route.path.startsWith('/brew/')" />
      <!-- Для всех остальных страниц показываем общее уведомление -->
      <GeneralNotification v-else />
    </template>
  </Layout>
</template>
