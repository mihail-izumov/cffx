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
/* Контейнер точно такой же ширины как основной контент */
.notification-container {
  max-width: 688px;
  width: 100%;
  margin: 16px auto 48px auto; /* УВЕЛИЧЕН отступ до заголовка: было 32px, стало 48px */
  padding: 0;
  box-sizing: border-box;
}

/* УВЕЛИЧЕН отступ до заголовка для правильной UX иерархии */
body.has-banner .VPDoc {
  margin-top: 0;
  padding-top: 16px; /* УВЕЛИЧЕН: было 8px, стало 16px */
}

/* Скругления для VitePress контейнеров */
.VPDoc,
.VPContent {
  border-radius: 5px;
}

/* Мобильная версия - баннер остается в рамках контента */
@media (max-width: 768px) {
  .notification-container {
    max-width: 100%;
    margin: 12px 0 36px 0; /* УВЕЛИЧЕН: было 24px, стало 36px */
    padding: 0;
  }
  
  body.has-banner .VPDoc {
    padding-top: 20px; /* УВЕЛИЧЕН: было 6px, стало 20px */
  }
}

/* Планшеты */
@media (max-width: 960px) and (min-width: 769px) {
  .notification-container {
    max-width: calc(100% - 24px);
    margin: 14px 12px 42px 12px; /* УВЕЛИЧЕН: было 28px, стало 42px */
  }
  
  body.has-banner .VPDoc {
    padding-top: 18px; /* УВЕЛИЧЕН: было 7px, стало 18px */
  }
}
</style>
