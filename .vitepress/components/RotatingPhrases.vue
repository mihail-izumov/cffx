<template>
  <div class="rotating-phrase-container">
    <transition name="fade">
      <p :key="currentPhraseIndex" class="rotating-phrase">
        {{ phrases[currentPhraseIndex] }}
      </p>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

// --- НАСТРОЙКИ АНИМАЦИИ ---
const ROTATION_INTERVAL_MS = 7000;
const FADE_DURATION_MS = 1000;

// Фразы для ротации
const phrases = ref([
  '«Опять какой-то гость написал в 2ГИС, и я узнаю об этом последним».',
  '«Мы вроде всё делаем правильно, но гости уходят — почему?»',
  '«У меня нет времени читать все эти отзывы, а SMM-щик просто постит котиков».',
]);

const currentPhraseIndex = ref(0);
let intervalId = null;

const cyclePhrases = () => {
  currentPhraseIndex.value = (currentPhraseIndex.value + 1) % phrases.value.length;
};

onMounted(() => {
  intervalId = setInterval(cyclePhrases, ROTATION_INTERVAL_MS);
});

onUnmounted(() => {
  clearInterval(intervalId);
});
</script>

<style scoped>
/* 
  Контейнер, который теперь является блоком 
  в стиле интерфейсов Perplexity/ChatGPT.
*/
.rotating-phrase-container {
  background-color: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-border);
  border-radius: 12px;
  padding: 0 1.5rem;                      /* Убираем вертикальный padding, чтобы управлять высотой через min-height */
  margin: 1rem 0;
  min-height: 70px;                       /* Уменьшенная высота блока */
  display: flex;
  align-items: center;
  text-align: left;
}

/* Стили для самого текста фразы */
.rotating-phrase {
  font-size: 0.9rem;                      /* Уменьшенный размер шрифта */
  font-weight: 600;                       /* Увеличенная жирность (полужирный) */
  color: var(--vp-c-text-2);
  line-height: 1.5;                       /* Слегка уменьшенная высота строки для компактности */
  margin: 0;
  padding: 0;
  width: 100%;
}

/* Анимация затухания */
.fade-enter-active,
.fade-leave-active {
  transition: opacity v-bind("`${FADE_DURATION_MS / 1000}s`") ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-leave-active {
  position: absolute;
  width: calc(100% - 3rem);
}
</style>
