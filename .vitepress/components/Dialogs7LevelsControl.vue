<template>
  <div class="feature-selector-container" :style="{ height: containerHeight + 'px' }">
    <!-- Кнопка "Закрыть всё" -->
    <transition name="fade">
      <button v-if="activeIndex !== null" class="close-all-btn" @click="closeAll">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </transition>
    <!-- Десктоп: основной flex-контейнер -->
    <div class="content-wrapper">
      <div class="nav-placeholder">
        <transition name="slide-in">
          <div v-if="activeIndex !== null" class="nav-arrows">
            <button class="arrow-button" @click="navigate(-1)" :disabled="activeIndex === 0">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M18 15L12 9L6 15" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </button>
            <button class="arrow-button" @click="navigate(1)" :disabled="activeIndex === items.length - 1">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M6 9L12 15L18 9" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </button>
          </div>
        </transition>
      </div>
      <div class="feature-list">
        <div
          v-for="(item, index) in items"
          :key="item.id"
          class="feature-item-wrapper"
          ref="itemRefs"
        >
          <transition name="item-swap" mode="out-in">
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
            <div v-else class="content-box" v-html="item.content"></div>
          </transition>
        </div>
      </div>
      <!-- Десктоп: чашка fixed справа -->
      <div class="cup-image" aria-hidden="true"></div>
    </div>
    <!-- Мобильная версия: картинка под переключателями -->
    <div class="cup-image-mobile" aria-hidden="true"></div>
  </div>
</template>

<script setup>
import { ref, watch, nextTick, onMounted } from 'vue'

const activeIndex = ref(null);
const containerHeight = ref(650);
const itemRefs = ref([]);

const items = ref([
  { id: 1, title: 'Архитектура Проблем', content: '<strong>Архитектура Проблем.</strong> Система автоматически распознаёт и классифицирует каждую проблему — от чистоты в зале до тона голоса сотрудника. Вы видите не хаос мнений, а ясную архитектуру боли и радости ваших клиентов. Это позволяет мгновенно отличать критические сбои от мелких недочетов.' },
  { id: 2, title: 'Протокол Анны', content: '<strong>Протокол Анны.</strong> Наш ИИ-ассистент Анна работает по 10-этапному протоколу эмпатичного общения. Она не просто собирает факты — она гасит негатив, проявляет заботу и превращает разгневанного клиента в лояльного союзника. Вы можете адаптировать её тон голоса, чтобы он на 100% соответствовал вашему бренду.' },
  { id: 3, title: 'Матрица Эскалации', content: '<strong>Матрица Эскалации.</strong> Вы сами решаете, кто и когда получает сигнал. Пролитый кофе — сообщение дежурному тренеру. Серьёзная угроза репутации — мгновенное уведомление лично вам. Это ваш пульт управления вниманием: вы фокусируетесь только на том, что действительно важно, и никогда не упускаете критических моментов.' },
  { id: 4, title: 'Система Тикетов', content: '<strong>Система Тикетов.</strong> Каждая проблема автоматически превращается в тикет с уникальным номером, категорией и ответственным. Вы видите весь жизненный цикл проблемы: от первого сигнала до финального «спасибо» от клиента. Это полная прозрачность и гарантия того, что ни одна жалоба не будет забыта.' },
  { id: 5, title: 'Полномочия Системы', content: '<strong>Полномочия Системы.</strong> Вы проводите черту, где заканчивается автоматизация и начинается ваше человеческое решение. Анна может самостоятельно предлагать стандартные компенсации, но решения о крупных выплатах или нестандартных ситуациях всегда остаются за вами. Это автономность без потери контроля.' },
  { id: 6, title: 'Протоколы Компенсаций', content: '<strong>Протоколы Компенсаций.</strong> Настройте логику выдачи бонусов за разные типы сбоев. Система сама предложит гостю сертификат или скидку в точном соответствии с вашими правилами. Это превращает любой сбой из проблемы в возможность продемонстрировать исключительный сервис.' },
  { id: 7, title: 'Метрики Успеха', content: '<strong>Метрики Успеха.</strong> Вы получаете доступ к дашборду, где в реальном времени отслеживаются ключевые показатели: среднее время решения проблемы, уровень удовлетворённости (NPS) после диалога, самые частые типы проблем. Вы управляете репутацией на основе данных, а не интуиции.' }
]);

// Динамический расчет высоты только по содержимому переключателей
watch(activeIndex, async () => {
  await nextTick()
  let totalHeight = 80;
  const gap = 12;
  if (itemRefs.value.length > 0) {
    itemRefs.value.forEach((el, index) => {
      if (el) {
        totalHeight += el.offsetHeight;
        if (index < itemRefs.value.length - 1) {
          totalHeight += gap;
        }
      }
    })
  }
  containerHeight.value = Math.max(650, totalHeight);
})

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
  overflow: hidden;
  transition: height 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Основной flex-контейнер. На десктопе — слева элементы, справа чашка */
.content-wrapper {
  position: relative;
  display: flex;
  align-items: flex-start;
  height: 100%;
  z-index: 1;
  padding: 40px 0;
}

.nav-placeholder {
  position: relative;
  width: 52px;
  height: 100%;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
}
.nav-arrows {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.arrow-button {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background-color: #000;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s ease;
}
.arrow-button svg { pointer-events: none; }
.arrow-button:hover:not(:disabled) { background-color: #1a1a1a; }
.arrow-button:disabled { opacity: 0.4; cursor: not-allowed; }

.feature-list {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 12px;
  z-index: 2;
}
.feature-item-wrapper {
  width: max-content;
  max-width: 450px;
}
.pill-button {
  display: flex;
  align-items: center;
  gap: 12px;
  background-color: #000;
  border: none;
  border-radius: 24px;
  padding: 14px 20px;
  width: 100%;
  text-align: left;
  cursor: pointer;
  transition: background-color 0.2s ease;
}
.pill-button:hover { background-color: #111; }
.pill-icon-wrapper { color: #8A8A8E; flex-shrink: 0; }
.pill-icon-wrapper svg { width: 24px; height: 24px; }
.pill-title { color: #F2F2F7; font-size: 17px; font-weight: 600; white-space: nowrap; }

.content-box {
  background-color: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  border-radius: 24px;
  padding: 22px 28px;
  border: 1px solid rgba(255,255,255,0.1);
  color: #EAEAEB;
  font-size: 17px;
  line-height: 1.5;
  font-weight: 500;
}
:deep(.content-box strong) { font-weight: 700; color: #fff; }

.close-all-btn {
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.7);
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
.close-all-btn:hover { background-color: #111; color: #fff; }

/* Десктоп: чашка фиксирована справа вне контента */
.cup-image {
  display: block;
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 50%;
  height: 70%;
  min-width: 260px;
  max-width: 520px;
  min-height: 220px;
  max-height: 540px;
  background-image: url('/cffx-cup.png');
  background-size: contain;
  background-position: right center;
  background-repeat: no-repeat;
  pointer-events: none;
  z-index: 0;
}

/* Мобильная версия: чашка под блоком переключателей, всегда по центру */
.cup-image-mobile {
  display: none;
}

/* Анимации */
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
.slide-in-enter-active { transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1); }
.slide-in-leave-active { transition: all 0.3s cubic-bezier(0.5, 0, 0.75, 0); }
.slide-in-enter-from, .slide-in-leave-to { opacity: 0; transform: translateX(-20px); }
.item-swap-enter-active, .item-swap-leave-active { transition: all 0.3s ease-in-out; }
.item-swap-enter-from, .item-swap-leave-to { opacity: 0; transform: scale(0.95); }

/* Мобильные стили */
@media (max-width: 768px) {
  .content-wrapper {
    flex-direction: column;
    padding: 40px 8px 0 8px;
    align-items: flex-start;
  }
  .cup-image {
    display: none;
  }
  .cup-image-mobile {
    display: block;
    margin: 28px auto 0 auto;
    width: 85vw;
    max-width: 380px;
    min-width: 180px;
    height: 28vw;
    max-height: 220px;
    min-height: 88px;
    background-image: url('/cffx-cup.png');
    background-size: contain;
    background-position: center center;
    background-repeat: no-repeat;
    pointer-events: none;
    z-index: 11;
  }
  .feature-item-wrapper {
    max-width: 100%;
  }
}
</style>
