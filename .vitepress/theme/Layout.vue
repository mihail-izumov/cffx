<template>
  <DefaultLayout>
    <template #doc-before>
      <div v-if="shouldShowBanner" class="notification-container">
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
/* Контейнер баннера: ограниченная ширина и центрирование */
.notification-container {
  max-width: 688px;
  width: 100%;
  margin: 16px auto 32px auto; /* Отступы от меню и до заголовка */
  box-sizing: border-box;
  
  /* РЕШЕНИЕ ПРОБЛЕМЫ С ПРЫЖКАМИ: */
  /* Обертка для баннера, которая будет занимать место в потоке */
  min-height: 44px; /* Минимальная высота, равная высоте самого низкого слайда */
  transition: min-height 0.3s ease; /* Плавное изменение высоты, если нужно */
}

/* Отступ до заголовка для правильной иерархии */
body.has-banner .VPDoc {
  margin-top: 0;
  padding-top: 16px;
}

/* Скругления для контейнеров */
.VPDoc,
.VPContent {
  border-radius: 5px;
}

/* Мобильная версия - баннер остается в рамках контента */
@media (max-width: 768px) {
  .notification-container {
    max-width: 100%;
    margin: 12px 0 24px 0;
    min-height: 60px; /* Минимальная высота для мобильных */
  }
  
  body.has-banner .VPDoc {
    padding-top: 12px;
  }
}

/* Планшеты */
@media (max-width: 960px) and (min-width: 769px) {
  .notification-container {
    max-width: calc(100% - 24px);
    margin: 14px 12px 28px 12px;
  }
  
  body.has-banner .VPDoc {
    padding-top: 14px;
  }
}
</style>
