<template>
  <!-- Важно: этот div оборачивает в markdown как <div class="vp-full-width"><Dialogs7LevelsControl /></div> -->
  <div class="feature-selector-container">
    <transition name="fade">
      <button v-if="activeIndex !== null" class="close-all-btn" @click="closeAll">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </transition>

    <!-- основной flex-контент -->
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
            <div
              v-else
              class="content-box"
              v-html="item.content"
            ></div>
          </transition>
        </div>
      </div>
      <!-- Абсолютная чашка справа, только десктоп -->
      <div class="cup-image cup-image-desktop"></div>
    </div>
    <!-- Чашка снизу, только мобильная -->
    <div class="cup-image cup-image-mobile"></div>
  </div>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue';

const activeIndex = ref(null);
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

// Динамический расчёт НЕ требуется: высота авто по содержимому, max-width управляет только шириной контента.
</script>

<style scoped>
/* --- Глобальное решение для всей ширины (vp-full-width) --- */
.feature-selector-container {
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  width: 100vw;
  max-width: 100vw;
  box-sizing: border-box;
  background: none;
  overflow: visible;
  padding: 0;
}

/* --- Основной flex-контейнер --- */
.content-wrapper {
  display: flex;
  align-items: flex-start;
  gap: 0;
  width: 100%;
  padding: 40px 0;
  min-height: 0;
  position: relative;
  box-sizing: border-box;
}

/* --- Левый блок: стрелки без отступа --- */
.nav-placeholder {
  position: relative;
  width: 52px;
  min-width: 52px;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 3;
}

.nav-arrows {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.arrow-button {
  width: 44px; height: 44px;
  border-radius: 50%; background: #000;
  border: none; display: flex; align-items: center; justify-content: center;
  cursor: pointer; transition: background 0.2s;
}
.arrow-button svg { pointer-events: none; }
.arrow-button:disabled { opacity: 0.4; cursor: not-allowed;}
.arrow-button:hover:not(:disabled) { background: #1a1a1a; }

/* --- Контент без отступа слева --- */
.feature-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: auto;
  z-index: 3;
}
.feature-item-wrapper {
  max-width: 450px;
  width: 100%;
}
.pill-button {
  display: flex; align-items: center; gap: 12px;
  background: #000; border: none; border-radius: 24px; padding: 14px 20px;
  width: 100%; text-align: left; cursor: pointer;
  transition: background 0.2s;
}
.pill-button:hover { background: #111; }
.pill-icon-wrapper { color: #8A8A8E; flex-shrink: 0;}
.pill-icon-wrapper svg { width: 24px; height: 24px; }
.pill-title { color: #F2F2F7; font-size: 17px; font-weight: 600; white-space: nowrap;}

.content-box {
  background: rgba(0,0,0,0.7); backdrop-filter: blur(15px); -webkit-backdrop-filter: blur(15px);
  border-radius: 24px; padding: 22px 28px; border: 1px solid rgba(255,255,255,0.1);
  color: #EAEAEB; font-size: 17px; line-height: 1.5; font-weight: 500;
}
:deep(.content-box strong) { font-weight: 700; color: #fff; }

/* --- Кнопка закрытия --- */
.close-all-btn {
  position: absolute; top: 20px; right: 20px; z-index: 100;
  background: rgba(0, 0, 0, 0.7); backdrop-filter: blur(10px);
  border: none; border-radius: 50%; width: 36px; height: 36px;
  display: flex; align-items: center; justify-content: center;
  color: #8A8A8E; cursor: pointer; transition: all 0.2s;
}
.close-all-btn:hover { background: #111; color: #fff; }

/* --- Абсолютная чашка ДЕСКТОП --- */
.cup-image-desktop {
  display: block;
  position: absolute;
  top: 0; right: 0; bottom: 0;
  width: 52vw;
  min-width: 350px;
  height: 100%;
  background-image: url('/cffx-cup.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: right center;
  z-index: 1;
  pointer-events: none;
}

/* --- Мобильная чашка только снизу, не внутри flex --- */
.cup-image-mobile { display: none; }

/* --- Анимации --- */
.fade-enter-active, .fade-leave-active {transition: opacity 0.3s;}
.fade-enter-from, .fade-leave-to {opacity: 0;}
.slide-in-enter-active {transition: all 0.4s cubic-bezier(0.25,1,0.5,1);}
.slide-in-leave-active {transition: all 0.3s cubic-bezier(0.5,0,0.75,0);}
.slide-in-enter-from, .slide-in-leave-to {opacity: 0; transform: translateX(-20px);}
.item-swap-enter-active, .item-swap-leave-active {transition: all 0.3s;}
.item-swap-enter-from, .item-swap-leave-to { opacity: 0; transform: scale(0.95); }

/* ===== Мобильная адаптация ===== */
@media (max-width: 768px) {
  .feature-selector-container {
    padding-top: 0 !important;
    padding-left: 0 !important;
    padding-right: 0 !important;
    min-width: 0;
  }
  .content-wrapper {
    flex-direction: column;
    align-items: stretch;
    padding: 32px 7vw 0 7vw;
    min-height: 0;
    height: auto;
  }
  .nav-placeholder { width: 52px; min-width: 52px; margin-bottom: 8px; }
  .feature-list { gap: 12px; }
  .feature-item-wrapper { max-width: 100vw; width: 100%; }
  
  .cup-image-desktop { display: none !important; }
  .cup-image-mobile {
    display: block;
    position: relative;
    width: 92vw;
    max-width: 320px;
    margin: 24px auto 10px auto;
    height: 120px;
    background-image: url('/cffx-cup.png');
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    z-index: 2;
    pointer-events: none;
  }
}
</style>
