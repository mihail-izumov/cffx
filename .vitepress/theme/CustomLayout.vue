<script setup>
import { ref, onMounted, watch } from 'vue'
import DefaultTheme from 'vitepress/theme'
import { useData } from 'vitepress'
import NotificationSlider from './NotificationSlider.vue'
import GeneralNotification from './GeneralNotification.vue'

const { Layout } = DefaultTheme
const { frontmatter, route } = useData()

// Ref для элемента-обертки баннера
const notificationRef = ref(null)

// Функция для обновления отступа
const updatePadding = () => {
  if (notificationRef.value) {
    const height = notificationRef.value.offsetHeight
    document.documentElement.style.setProperty('--vp-layout-top-height', `${height}px`)
  } else {
    document.documentElement.style.setProperty('--vp-layout-top-height', '0px')
  }
}

// Вызываем функцию при монтировании и при смене страницы
onMounted(updatePadding)
watch(() => route.path, updatePadding)
</script>

<template>
  <Layout>
    <template #layout-top>
      <div ref="notificationRef">
        <NotificationSlider v-if="frontmatter.notification === 'brew'" />
        <GeneralNotification v-else-if="frontmatter.notification === 'general'" />
      </div>
    </template>
  </Layout>
</template>
