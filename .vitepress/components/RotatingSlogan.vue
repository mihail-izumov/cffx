<template>
  <div class="rotating-text-container">
    <span>[translate:Где Начинается]</span>
    <span class="rotating-word-wrapper">
      <transition name="fade" mode="out-in">
        <span :key="currentPhrase" class="rotating-word">{{ currentPhrase }}</span>
      </transition>
    </span>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const phrases = ['[translate:Ваша Кофейня]', '[translate:Ваш Фитнес-клуб]', '[translate:Ваш Отель]'];
const currentPhraseIndex = ref(0);
const currentPhrase = ref(phrases[0]);
let intervalId = null;

onMounted(() => {
  intervalId = setInterval(() => {
    currentPhraseIndex.value = (currentPhraseIndex.value + 1) % phrases.length;
    currentPhrase.value = phrases[currentPhraseIndex.value];
  }, 3000);
});

onUnmounted(() => {
  clearInterval(intervalId);
});
</script>

<style scoped>
.rotating-text-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
  color: white;
  font-size: 14px;
}

.rotating-word-wrapper {
  display: inline-block;
  width: 145px; /* Фиксированная ширина для предотвращения смещения */
  text-align: left;
}

.rotating-word {
  display: inline-block;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
