<script setup>
import { onMounted, watch } from 'vue';
import { useRoute } from 'vitepress';

const YANDEX_METRIKA_ID = 104275636;
const route = useRoute();

// Инициализируем dataLayer для ecommerce, если его еще нет
if (typeof window !== 'undefined') {
  window.dataLayer = window.dataLayer || [];
}

function sendHit(path, referer = document.referrer) {
  if (typeof window.ym === 'function') {
    window.ym(YANDEX_METRIKA_ID, 'hit', path, {
      title: document.title,
      referer
    });
  }
}

onMounted(() => {
  if (import.meta.env.PROD) {
    // Загружаем скрипт Метрики
    (function(m,e,t,r,i,k,a){
      m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
      m[i].l=1*new Date();
      for (var j = 0; j < document.scripts.length; j++) {
        if (document.scripts[j].src === r) { return; }
      }
      k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
    })(window, document, 'script', 'https://mc.yandex.ru/metrika/tag.js', 'ym');

    // Инициализируем счетчик
    window.ym(YANDEX_METRIKA_ID, 'init', {
      ssr: true,
      webvisor: true,
      clickmap: true,
      ecommerce: "dataLayer",
      accurateTrackBounce: true,
      trackLinks: true,
      defer: true
    });

    // Дожидаемся загрузки скрипта, чтобы гарантировать отправку первого хита
    let check = setInterval(() => {
      if (typeof window.ym === 'function') {
        sendHit(route.path);
        clearInterval(check);
      }
    }, 200);
    setTimeout(() => clearInterval(check), 5000); // Безопасный таймер: не дольше 5 секунд
  }
});

// Когда меняется путь — отправляем переход (после первого вызова!)
watch(
  () => route.path,
  (newPath, oldPath) => {
    if (
      import.meta.env.PROD &&
      typeof window.ym === 'function' &&
      newPath !== oldPath
    ) {
      sendHit(newPath, window.location.origin + oldPath);
    }
  }
);
</script>

<template>
  <div style="display: none;" />
</template>
