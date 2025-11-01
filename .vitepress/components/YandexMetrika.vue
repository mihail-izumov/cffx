<script setup>
import { onMounted, watch } from 'vue';
import { useData } from 'vitepress';

// ID вашего счетчика
const YANDEX_METRIKA_ID = 104275636;

// Получаем доступ к роутеру VitePress
const { route } = useData();

// Инициализируем dataLayer для ecommerce, если его еще нет
if (typeof window !== 'undefined') {
  window.dataLayer = window.dataLayer || [];
}

// Эта функция будет вызываться только на стороне клиента
onMounted(() => {
  // Проверяем, что мы в продакшн-режиме
  if (import.meta.env.PROD) {
    // Инициализация счетчика
    (function(m,e,t,r,i,k,a){
      m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
      m[i].l=1*new Date();
      for (var j = 0; j < document.scripts.length; j++) {
        if (document.scripts[j].src === r) { return; }
      }
      k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
    })(window, document, 'script', 'https://mc.yandex.ru/metrika/tag.js', 'ym');

    // Инициализируем сам счетчик с вашими параметрами
    window.ym(YANDEX_METRIKA_ID, 'init', {
      ssr: true,
      webvisor: true,
      clickmap: true,
      ecommerce: "dataLayer",
      accurateTrackBounce: true,
      trackLinks: true,
      // defer: true нужен для ручного управления просмотрами страниц в SPA
      defer: true
    });
  }
});

// Отслеживаем изменения пути и отправляем данные в Метрику
watch(
  () => route.path,
  (newPath, oldPath) => {
    // Проверяем, что мы в продакшн, ym доступен, и пути действительно изменились
    if (import.meta.env.PROD && typeof window.ym === 'function' && newPath !== oldPath) {
      // Отправляем просмотр страницы
      window.ym(YANDEX_METRIKA_ID, 'hit', newPath, {
        title: document.title,
        referer: oldPath ? window.location.origin + oldPath : document.referrer
      });
    }
  },
  { immediate: true } // Срабатывает при первой загрузке
);
</script>

<!-- Компонент не имеет видимого содержимого -->
<template>
  <div style="display: none;" />
</template>
