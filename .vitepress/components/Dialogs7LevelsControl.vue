<template>
  <div class="feature-selector-container" :style="{ height: containerHeight + 'px' }">
    
    <!-- Close Button -->
    <transition name="fade">
      <button v-if="activeIndex !== null" class="close-all-btn" @click="closeAll" aria-label="Close">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </transition>

    <!-- Main Content Wrapper with Background Image -->
    <div 
      class="content-wrapper" 
      :style="{ backgroundImage: `url('/cffx-cup.png')` }"
    >
      <!-- Navigation Arrows Placeholder -->
      <div class="nav-placeholder">
        <transition name="slide-in">
          <div v-if="activeIndex !== null" class="nav-arrows">
            <button
              class="arrow-button"
              @click="navigate(-1)"
              :disabled="activeIndex === 0"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" transform="rotate(180)">
                <path d="M6 9L12 15L18 9" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
            <button
              class="arrow-button"
              @click="navigate(1)"
              :disabled="activeIndex === items.length - 1"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M6 9L12 15L18 9" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
        </transition>
      </div>
      
      <!-- Features List -->
      <div class="feature-list" ref="featureListRef">
        <div 
          v-for="(item, index) in items" 
          :key="item.id" 
          class="feature-item-wrapper"
          ref="el => itemRefs[index] = el"
        >
          <transition name="item-swap" mode="out-in">
            <!-- Collapsed State: Pill Button -->
            <button
              v-if="activeIndex !== index"
              class="pill-button"
              @click="setActive(index)"
            >
              <div class="pill-icon-wrapper">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M8 12h8"></path><path d="M12 8v8"></path>
                </svg>
              </div>
              <span class="pill-title">{{ item.title }}</span>
            </button>

            <!-- Expanded State: Content Box -->
            <div
              v-else
              class="content-box"
              v-html="item.content"
            ></div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, nextTick, onMounted, onBeforeUpdate } from 'vue';

const activeIndex = ref(null);
const containerHeight = ref(650); // A default minimum height
const itemRefs = ref([]);
const featureListRef = ref(null);

const items = ref([
  { id: 1, title: '1. Архитектура Проблем', content: '<strong>Архитектура Проблем.</strong> Система автоматически распознаёт и классифицирует каждую проблему — от чистоты в зале до тона голоса сотрудника. Вы видите не хаос мнений, а ясную архитектуру боли и радости ваших клиентов. Это позволяет мгновенно отличать критические сбои от мелких недочетов.' },
  { id: 2, title: '2. Протокол «Анна»', content: '<strong>Протокол «Анна».</strong> Наш ИИ-ассистент Анна работает по 10-этапному протоколу эмпатичного общения. Она не просто собирает факты — она гасит негатив, проявляет заботу и превращает разгневанного клиента в лояльного союзника. Вы можете адаптировать её тон голоса, чтобы он на 100% соответствовал вашему бренду.' },
  { id: 3, title: '3. Матрица Эскалации', content: '<strong>Матрица Эскалации.</strong> Вы сами решаете, кто и когда получает сигнал. Пролитый кофе — сообщение дежурному тренеру. Серьёзная угроза репутации — мгновенное уведомление лично вам. Это ваш пульт управления вниманием: вы фокусируетесь только на том, что действительно важно, и никогда не упускаете критических моментов.' },
  { id: 4, title: '4. Система Тикетов', content: '<strong>Система Тикетов.</strong> Каждая проблема автоматически превращается в тикет с уникальным номером, категорией и ответственным. Вы видите весь жизненный цикл проблемы: от первого сигнала до финального «спасибо» от клиента. Это полная прозрачность и гарантия того, что ни одна жалоба не будет забыта.' },
  { id: 5, title: '5. Полномочия Системы', content: '<strong>Полномочия Системы.</strong> Вы проводите черту, где заканчивается автоматизация и начинается ваше человеческое решение. Анна может самостоятельно предлагать стандартные компенсации, но решения о крупных выплатах или нестандартных ситуациях всегда остаются за вами. Это автономность без потери контроля.' },
  { id: 6, title: '6. Протоколы Компенсаций', content: '<strong>Протоколы Компенсаций.</strong> Настройте логику выдачи бонусов за разные типы сбоев. Система сама предложит гостю сертификат или скидку в точном соответствии с вашими правилами. Это превращает любой сбой из проблемы в возможность продемонстрировать исключительный сервис.' },
  { id: 7, title: '7. Метрики Успеха', content: '<strong>Метрики Успеха.</strong> Вы получаете доступ к дашборду, где в реальном времени отслеживаются ключевые показатели: среднее время решения проблемы, уровень удовлетворённости (NPS) после диалога, самые частые типы проблем. Вы управляете репутацией на основе данных, а не интуиции.' }
]);

// Ensure refs array is clean before each update
onBeforeUpdate(() => {
  itemRefs.value = [];
});

const calculateHeight = async () => {
  await nextTick(); // Wait for DOM to update
  if (featureListRef.value) {
    const totalHeight = featureListRef.value.scrollHeight + 80; // 40px top + 40px bottom padding
    containerHeight.value = Math.max(650, totalHeight); // Ensure minimum height
  }
};

onMounted(() => {
  calculateHeight(); // Calculate initial height
});

watch(activeIndex, () => {
  calculateHeight(); // Recalculate on index change
});

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
</script>

<style scoped>
.feature-selector-container {
  position: relative;
  width: 100%;
  background-color: transparent;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  transition: height 0.4s cubic-bezier(0.2, 0, 0.2, 1);
}

.content-wrapper {
  position: relative;
  display: flex;
  align-items: flex-start;
  height: 100%;
  padding: 40px 0; /* No horizontal padding to allow full left alignment */
  background-size: 40% auto; /* Image takes 40% of container width */
  background-position: right center;
  background-repeat: no-repeat;
  background-attachment: fixed; /* Fixes the background image */
}

/* 1. Close Button (Top Right) */
.close-all-btn {
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 100;
  background-color: rgba(28, 28, 30, 0.7);
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

/* 2. Navigation Arrows Placeholder & Styles */
.nav-placeholder {
  position: sticky; /* Make it sticky to stay in place */
  top: 50%;
  transform: translateY(-50%); /* Center it vertically */
  width: 72px; /* Fixed width for arrows + padding */
  flex-shrink: 0;
  align-self: center;
  z-index: 10;
}

.nav-arrows {
  display: flex;
  flex-direction: column;
  gap: 24px; /* Increased gap */
}

.arrow-button {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background-color: #000000;
  border: 1px solid rgba(255,255,255,0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s ease;
}
.arrow-button svg {
  pointer-events: none;
  width: 24px;
  height: 24px;
}
.arrow-button:not(:disabled):hover {
  background-color: #282828; /* Darker than default, lighter than black */
}
.arrow-button:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

/* 3. Feature List & Items */
.feature-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.feature-item-wrapper {
  width: max-content; /* Width based on content */
  max-width: 480px; /* Max width for readability */
}

/* 4. Pill Button (Collapsed State) */
.pill-button {
  display: flex;
  align-items: center;
  gap: 12px;
  background-color: #000000;
  border: none;
  border-radius: 24px;
  padding: 18px 24px; /* Increased height */
  width: 100%;
  text-align: left;
  cursor: pointer;
  transition: background-color 0.2s ease;
  box-shadow: 0 4px 15px rgba(0,0,0,0.2);
}
.pill-button:hover {
  background-color: #1a1a1a;
}
.pill-icon-wrapper {
  color: #8A8A8E;
  flex-shrink: 0;
  transition: transform 0.3s ease;
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

/* 5. Content Box (Expanded State) */
.content-box {
  background-color: rgba(28, 28, 30, 0.75); /* Semi-transparent */
  backdrop-filter: blur(15px); /* Frosted glass effect */
  -webkit-backdrop-filter: blur(15px);
  border-radius: 24px;
  padding: 22px 28px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #EAEAEB;
  font-size: 17px;
  line-height: 1.6;
  font-weight: 400;
  min-height: 57px; /* Matches pill height + padding */
}
/* Style the <strong> tag inside the v-html */
:deep(.content-box strong) {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #fff;
}

/* 6. Animations */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.slide-in-enter-active, .slide-in-leave-active {
  transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
}
.slide-in-enter-from, .slide-in-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

.item-swap-enter-active, .item-swap-leave-active {
  transition: all 0.3s ease-in-out;
}
.item-swap-enter-from, .item-swap-leave-to {
  opacity: 0;
  transform: scale(0.98);
}
</style>
