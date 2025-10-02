<template>
  <DefaultLayout>
    <template #doc-before>
      <div v-if="shouldShowBanner" class="notification-container">
        <NotificationSlider v-if="frontmatter.notification === 'brew'" />
        <GeneralNotification v-else />
      </div>
    </template>
  </DefaultLayout>
  
  <!-- Добавляем модальное окно вне Layout -->
  <SignalModalWrapper />
</template>

<script setup>
import { computed, watch } from 'vue'
import { useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import NotificationSlider from './NotificationSlider.vue'
import GeneralNotification from './GeneralNotification.vue'
import SignalModalWrapper from '../components/SignalModalWrapper.vue'

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
/* ФИКСИРОВАННАЯ ВЫСОТА - ключ к решению проблемы прыжков */
.notification-container {
  max-width: 688px;
  width: 100%;
  margin: 16px auto 48px auto;
  padding: 0;
  box-sizing: border-box;
  
  /* ФИКСИРОВАННАЯ ВЫСОТА равная максимальной высоте всех слайдов */
  height: 44px; /* Фиксированная высота вместо min-height */
  overflow: hidden; /* Скрываем переполнение */
}

/* Контейнер внутри баннера тоже с фиксированной высотой */
.notification-container > * {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Отступ до заголовка */
body.has-banner .VPDoc {
  margin-top: 0;
  padding-top: 16px;
}

/* Скругления */
.VPDoc,
.VPContent {
  border-radius: 5px;
}

/* Мобильная версия - большая фиксированная высота */
@media (max-width: 768px) {
  .notification-container {
    max-width: 100%;
    margin: 12px 0 36px 0;
    height: 72px; /* Больше высота для мобильных слайдов */
  }
  
  body.has-banner .VPDoc {
    padding-top: 20px;
  }
}

/* Планшеты */
@media (max-width: 960px) and (min-width: 769px) {
  .notification-container {
    max-width: calc(100% - 24px);
    margin: 14px 12px 42px 12px;
    height: 58px; /* Промежуточная высота */
  }
  
  body.has-banner .VPDoc {
    padding-top: 18px;
  }
}
</style>
