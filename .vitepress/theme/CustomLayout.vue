<!-- .vitepress/theme/CustomLayout.vue -->
<script setup>
import { h } from 'vue'
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
      <!-- 
        ИЗМЕНЕНИЕ ЗДЕСЬ: Добавлен '?' для безопасной проверки.
        Это предотвратит ошибку, если 'route' будет временнно 'undefined'.
      -->
      <NotificationSlider v-if="route?.path.startsWith('/brew/')" />
      <GeneralNotification v-else />
    </template>
  </Layout>
</template>
