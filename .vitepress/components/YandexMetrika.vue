<script setup>
import { onMounted, watch } from 'vue'
import { useRoute } from 'vitepress'

const YANDEX_METRIKA_ID = 104275636
const route = useRoute()
const TAG_URL = 'https://mc.yandex.ru/metrika/tag.js'

// Поддержка ecommerce (dataLayer)
if (typeof window !== 'undefined') {
  window.dataLayer = window.dataLayer || []
}

// Помощник для отправки хита
function sendHit(path, referer = document.referrer) {
  if (typeof window.ym === 'function') {
    window.ym(YANDEX_METRIKA_ID, 'hit', path, {
      title: document.title,
      referer
    })
    console.log('[YandexMetrika] Hit sent:', path, referer)
  }
}

// Гарантировано подключить скрипт только один раз
function addScriptOnce() {
  if ([...document.scripts].some(s => s.src === TAG_URL)) return
  const k = document.createElement('script')
  k.async = true
  k.src = TAG_URL
  document.head.appendChild(k)
}

onMounted(() => {
  if (import.meta.env.PROD) {
    console.log('[YandexMetrika] Mounted on prod, Init!')
    addScriptOnce()

    // "shim" для ym до загрузки настоящего
    window.ym = window.ym || function() {(window.ym.a = window.ym.a || []).push(arguments)}
    window.ym.l = 1 * new Date()

    // Инициализация счетчика
    window.ym(YANDEX_METRIKA_ID, 'init', {
      ssr: true,
      webvisor: true,
      clickmap: true,
      ecommerce: 'dataLayer',
      accurateTrackBounce: true,
      trackLinks: true,
      defer: true
    })

    // Ждем реальную загрузку tag.js, затем отправляем первый хит
    const check = setInterval(() => {
      if (
        typeof window.ym === 'function' &&
        window.ym !== window.ym.a // это гарантирует, что tag.js уже загружен
      ) {
        sendHit(route.path)
        clearInterval(check)
        console.log('[YandexMetrika] First hit sent!')
      }
    }, 300)
    setTimeout(() => clearInterval(check), 7000) // Не более 7 сек
  }
})

// Слежение за переходами, отправка хитов
watch(
  () => route.path,
  (newPath, oldPath) => {
    if (
      import.meta.env.PROD &&
      typeof window.ym === 'function' &&
      window.ym !== window.ym.a &&
      newPath !== oldPath
    ) {
      sendHit(newPath, oldPath || document.referrer)
      console.log('[YandexMetrika] SPA hit sent:', newPath, oldPath)
    }
  }
)
</script>

<template>
  <div style="display: none;" />
</template>
