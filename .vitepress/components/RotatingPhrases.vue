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
  background-color: var(--vp-c-bg-soft); /* Чуть более светлый фон */
  border: 1px solid var(--vp-c-border);   /* Тонкая рамка */
  border-radius: 12px;                    /* Скругленные углы */
  padding: 1rem 1.5rem;                   /* Внутренние отступы */
  margin: 1rem 0;                         /* Внешние отступы для отделения от другого контента */
  min-height: 100px;                      /* Высота, чтобы блок не "прыгал" */
  display: flex;
  align-items: center;                    /* Вертикальное выравнивание по центру */
  text-align: left;                       /* Выравнивание текста по левому краю */
}

/* Стили для самого текста фразы */
.rotating-phrase {
  font-size: 1rem;                      /* Уменьшенный размер шрифта (стандартно 16px) */
  font-weight: 500;
  color: var(--vp-c-text-2);            /* Слегка приглушенный цвет текста */
  line-height: 1.6;
  margin: 0;
  padding: 0;
  width: 100%;                          /* Занимает всю ширину контейнера */
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
  /* Убираем 'left' и 'right' и задаем 'width', чтобы избежать проблем с выравниванием */
  width: calc(100% - 3rem); /* Ширина контейнера минус паддинги */
}
</style>
