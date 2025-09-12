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
    // Устанавливаем CSS переменную, которую VitePress использует для сдвига макета
    document.documentElement.style.setProperty('--vp-layout-top-height', `${height}px`)
  } else {
    document.documentElement.style.setProperty('--vp-layout-top-height', '0px')
  }
}

// Вызываем функцию при монтировании и при каждой смене страницы
onMounted(updatePadding)
watch(() => route.path, updatePadding)
</script>

<template>
  <Layout>
    <template #layout-top>
      <!-- Оборачиваем баннеры в div с ref для измерения высоты -->
      <div ref="notificationRef">
        <NotificationSlider v-if="frontmatter.notification === 'brew'" />
        <GeneralNotification v-else-if="frontmatter.notification === 'general'" />
      </div>
    </template>
  </Layout>
</template>
