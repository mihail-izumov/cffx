<template>
  <div class="feature-selector-container">
    
    <!-- Кнопка "Закрыть всё" (появляется при выборе элемента) -->
    <transition name="fade">
      <button v-if="activeIndex !== null" class="close-all-btn" @click="closeAll">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </transition>

    <!-- Основной контейнер с фоном и элементами -->
    <div 
      class="content-wrapper" 
      :style="{ backgroundImage: 'url(https://www.apple.com/v/apple-watch-ultra-2/c/images/overview/design/design_display__dd6c6c52n5ya_large.jpg)' }"
    >
      <!-- Навигационные стрелки (появляются при выборе элемента) -->
      <transition name="slide-in">
        <div 
          v-if="activeIndex !== null" 
          class="nav-arrows"
          @touchstart.passive="handleTouchStart"
          @touchend.passive="handleTouchEnd"
        >
          <button class="arrow-button" @click="navigate(-1)" :disabled="activeIndex === 0">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M18 15L12 9L6 15" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </button>
          <button class="arrow-button" @click="navigate(1)" :disabled="activeIndex === items.length - 1">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </button>
        </div>
      </transition>
      
      <!-- Список элементов -->
      <div class="feature-list">
        <div 
          v-for="(item, index) in items" 
          :key="item.id" 
          class="feature-item-wrapper"
        >
          <transition name="item-swap" mode="out-in">
            <!-- Кнопка-пилюля (видима, если элемент не активен) -->
            <button
              v-if="activeIndex !== index"
              class="pill-button"
              @click="setActive(index)"
            >
              <div class="pill-icon-wrapper">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 12h8"/><path d="M12 8v8"/></svg>
              </div>
              <span class="pill-title">{{ item.title }}</span>
            </button>

            <!-- Блок с контентом (виден, если элемент активен) -->
            <div
              v-else
              class="content-box"
            >
              <p class="content-text">{{ item.content }}</p>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const activeIndex = ref(null);
let touchStartX = 0;

const items = ref([
  { id: 1, title: 'Архитектура Проблем', content: 'Система автоматически распознаёт и классифицирует каждую проблему — от чистоты в зале до тона голоса сотрудника. Вы видите не хаос мнений, а ясную архитектуру боли и радости ваших клиентов.' },
  { id: 2, title: 'Протокол «Анна»', content: 'Наш ИИ-ассистент Анна работает по 10-этапному протоколу эмпатичного общения. Она не просто собирает факты — она гасит негатив, проявляет заботу и превращает разгневанного клиента в лояльного союзника.' },
  { id: 3, title: 'Матрица Эскалации', content: 'Вы сами решаете, кто и когда получает сигнал. Пролитый кофе — сообщение дежурному тренеру. Серьёзная угроза репутации — мгновенное уведомление лично вам. Это ваш пульт управления вниманием.' },
  { id: 4, title: 'Система Тикетов', content: 'Каждая проблема автоматически превращается в тикет с уникальным номером, категорией и ответственным. Вы видите весь жизненный цикл проблемы: от первого сигнала до финального «спасибо» от клиента.' },
  { id: 5, title: 'Полномочия Системы', content: 'Вы проводите черту, где заканчивается автоматизация и начинается ваше человеческое решение. Анна может самостоятельно предлагать стандартные компенсации, но решения о крупных выплатах всегда остаются за вами.' },
]);

function setActive(index) {
  activeIndex.value = index;
}

function navigate(direction) {
  if (activeIndex.value === null) return;
  const newIndex = activeIndex.value + direction;
  if (newIndex >= 0 && newIndex < items.value.length) {
    activeIndex.value = newIndex;
  }
}

function closeAll() {
  activeIndex.value = null;
}

function handleTouchStart(e) {
  touchStartX = e.touches[0].clientX;
}

function handleTouchEnd(e) {
  const touchEndX = e.changedTouches[0].clientX;
  if (touchStartX - touchEndX > 50) { // Свайп влево
    closeAll();
  }
}
</script>

<style scoped>
/* Главный контейнер на всю ширину */
.feature-selector-container {
  position: relative;
  width: 100%;
  background-color: #000;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}

/* Контейнер с фоновым изображением и элементами */
.content-wrapper {
  display: flex;
  align-items: flex-start;
  min-height: 500px;
  padding: 40px 20px;
  background-size: auto 100%;
  background-position: right center;
  background-repeat: no-repeat;
}

/* Кнопка "Закрыть всё" */
.close-all-btn {
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 100;
  background-color: rgba(28, 28, 30, 0.8);
  backdrop-filter: blur(10px);
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #8A8A8E;
  cursor: pointer;
  transition: all 0.2s ease;
}
.close-all-btn:hover {
  background-color: #2C2C2E;
  color: #fff;
}

/* Навигационные стрелки */
.nav-arrows {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-right: 16px;
  padding-top: 5px; /* Синхронизация по высоте с первым элементом */
}
.arrow-button {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #1C1C1E;
  border: none;
  color: #8A8A8E;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s ease;
}
.arrow-button:hover:not(:disabled) {
  background-color: #2C2C2E;
}
.arrow-button:disabled {
  color: #4A4A4C;
  cursor: not-allowed;
}

/* Список элементов */
.feature-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.feature-item-wrapper {
  width: max-content; /* Ширина по контенту */
  max-width: 450px; /* Ограничение, чтобы текст не был слишком длинным */
}

/* Стили кнопки-пилюли */
.pill-button {
  display: flex;
  align-items: center;
  gap: 12px;
  background-color: #1C1C1E;
  border: none;
  border-radius: 24px;
  padding: 14px 20px; /* Увеличена высота на ~15% */
  width: 100%;
  text-align: left;
  cursor: pointer;
  transition: background-color 0.2s ease;
}
.pill-button:hover {
  background-color: #2C2C2E;
}
.pill-icon-wrapper {
  color: #8A8A8E;
  flex-shrink: 0;
}
.pill-icon-wrapper svg {
  width: 24px;
  height: 24px;
}
.pill-title {
  color: #F2F2F7;
  font-size: 17px;
  font-weight: 600;
  white-space: nowrap;
}

/* Стили блока с контентом */
.content-box {
  background-color: rgba(28, 28, 30, 0.8);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  border-radius: 24px;
  padding: 22px 28px;
  border: 1px solid rgba(255,255,255,0.1);
}
.content-text {
  margin: 0;
  color: #EAEAEB;
  font-size: 17px;
  line-height: 1.5;
  font-weight: 500;
}

/* Анимации */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.slide-in-enter-active {
  transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
}
.slide-in-leave-active {
  transition: all 0.3s cubic-bezier(0.5, 0, 0.75, 0);
}
.slide-in-enter-from, .slide-in-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

.item-swap-enter-active, .item-swap-leave-active {
  transition: all 0.3s ease-in-out;
}
.item-swap-enter-from, .item-swap-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>
