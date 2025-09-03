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
// Интервал смены фразы в миллисекундах
const ROTATION_INTERVAL_MS = 7000;
// Длительность анимации затухания и появления в миллисекундах
const FADE_DURATION_MS = 1000;

// Фразы для ротации
const phrases = ref([
  '«Опять какой-то гость написал в 2ГИС, и я узнаю об этом последним».',
  '«Мы вроде всё делаем правильно, но гости уходят — почему?»',
  '«У меня нет времени читать все эти отзывы, а SMM-щик просто постит котиков».',
]);

const currentPhraseIndex = ref(0);
let intervalId = null;

// Функция для смены фразы
const cyclePhrases = () => {
  currentPhraseIndex.value = (currentPhraseIndex.value + 1) % phrases.value.length;
};

// Запускаем интервал при монтировании компонента
onMounted(() => {
  intervalId = setInterval(cyclePhrases, ROTATION_INTERVAL_MS);
});

// Очищаем интервал при размонтировании, чтобы избежать утечек памяти
onUnmounted(() => {
  clearInterval(intervalId);
});
</script>

<style scoped>
.rotating-phrase-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 80px; /* Задайте высоту, чтобы контейнер не "прыгал" при смене фраз */
  text-align: center;
}

.rotating-phrase {
  font-size: 1.2rem;
  font-weight: 500;
  color: var(--vp-c-text-2);
  margin: 0;
  padding: 0 1rem;
  line-height: 1.6;
}

/* 
  Анимация перехода с использованием <transition>
  Длительность соответствует FADE_DURATION_MS
*/
.fade-enter-active,
.fade-leave-active {
  transition: opacity v-bind("`${FADE_DURATION_MS / 1000}s`") ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-leave-active {
  position: absolute; /* Предотвращает "прыжок" текста при смене */
}
</style>
