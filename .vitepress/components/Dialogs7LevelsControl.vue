<template>
  <div class="feature-selector-container" :style="{ minHeight: containerHeight + 'px' }">
    
    <!-- Кнопка "Закрыть всё" -->
    <transition name="fade">
      <button v-if="activeIndex !== null" class="close-all-btn" @click="closeAll">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </transition>

    <!-- ДЕСКТОП -->
    <div class="content-wrapper-desktop">
      <!-- Стрелки слева, по центру -->
      <div class="nav-placeholder">
        <transition name="slide-in">
          <div v-if="activeIndex !== null" class="nav-arrows">
            <button class="arrow-button" @click="navigate(-1)" :disabled="activeIndex === 0">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M18 15L12 9L6 15" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
            <button class="arrow-button" @click="navigate(1)" :disabled="activeIndex === items.length - 1">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M6 9L12 15L18 9" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
        </transition>
      </div>

      <!-- Список -->
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
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M8 12h8"/>
                  <path d="M12 8v8"/>
                </svg>
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

      <!-- Чашка справа -->
      <div class="image-placeholder"></div>
    </div>

    <!-- МОБИЛЬНАЯ -->
    <div class="content-wrapper-mobile">
      <!-- Стрелки сверху -->
      <transition name="slide-in">
        <div v-if="activeIndex !== null" class="nav-arrows-mobile">
          <button class="arrow-button" @click="navigate(-1)" :disabled="activeIndex === 0">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M18 15L12 9L6 15" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          <button class="arrow-button" @click="navigate(1)" :disabled="activeIndex === items.length - 1">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M6 9L12 15L18 9" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
      </transition>

      <!-- Список -->
      <div class="feature-list-mobile">
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
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M8 12h8"/>
                  <path d="M12 8v8"/>
                </svg>
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

      <!-- ЧАШКА ПО ЦЕНТРУ ВНИЗУ -->
      <div class="image-mobile">
        <img src="/cffx-cup.png" alt="Чашка" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue';

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

watch(activeIndex, async () => {
  await nextTick();
  let total = 80;
  const gap = 12;
  itemRefs.value.forEach((el, i) => {
    if (el) {
      total += el.offsetHeight;
      if (i < itemRefs.value.length - 1) total += gap;
    }
  });
  containerHeight.value = Math.max(650, total);
}, { immediate: true });

function setActive(i) { activeIndex.value = i; }
function navigate(dir) {
  if (activeIndex.value === null) return;
  const n = activeIndex.value + dir;
  if (n >= 0 && n < items.value.length) activeIndex.value = n;
}
function closeAll() { activeIndex.value = null; }
</script>

<style scoped>
/* === КОНТЕЙНЕР === */
.feature-selector-container {
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  overflow: hidden;
  transition: min-height 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
}

/* === ДЕСКТОП === */
.content-wrapper-desktop {
  display: flex;
  align-items: flex-start;
  width: 100%;
  padding: 40px 0;
  box-sizing: border-box;
}

.nav-placeholder {
  width: 52px;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 0;
}

.feature-list {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 500px;
  padding-right: 40px;
}

.feature-item-wrapper {
  width: max-content;
  max-width: 100%;
}

.image-placeholder {
  flex: 1;
  background: url('/cffx-cup.png') right center / auto 65% no-repeat;
  min-height: 100%;
}

/* === МОБИЛЬНАЯ === */
.content-wrapper-mobile {
  display: none;
  flex-direction: column;
  padding: 20px 16px;
  gap: 12px;
}

.nav-arrows-mobile {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-bottom: 8px;
}

.feature-list-mobile {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.image-mobile {
  margin-top: 32px;
  text-align: center;
}
.image-mobile img {
  max-width: 70%;
  height: auto;
}

/* === ПЕРЕКЛЮЧЕНИЕ === */
@media (max-width: 768px) {
  .content-wrapper-desktop { display: none; }
  .content-wrapper-mobile { display: flex; }
  .feature-item-wrapper { width: 100%; }
}

/* === ПИЛЮЛЯ === */
.pill-button {
  display: flex;
  align-items: center;
  gap: 12px;
  background: #000;
  border: none;
  border-radius: 24px;
  padding: 14px 20px;
  width: 100%;
  text-align: left;
  cursor: pointer;
  transition: background 0.2s;
  box-sizing: border-box;
}
.pill-button:hover { background: #111; }

.pill-icon-wrapper { color: #8A8A8E; flex-shrink: 0; }
.pill-icon-wrapper svg { width: 24px; height: 24px; }
.pill-title { color: #F2F2F7; font-size: 17px; font-weight: 600; white-space: nowrap; }

/* === КОНТЕНТ === */
.content-box {
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  border-radius: 24px;
  padding: 22px 28px;
  border: 1px solid rgba(255,255,255,0.1);
  color: #EAEAEB;
  font-size: 17px;
  line-height: 1.5;
  font-weight: 500;
  width: 100%;
  box-sizing: border-box;
}
:deep(.content-box strong) { font-weight: 700; color: #fff; }

/* === СТРЕЛКИ === */
.nav-arrows, .nav-arrows-mobile {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.nav-arrows-mobile { flex-direction: row; }

.arrow-button {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: #000;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
}
.arrow-button svg { pointer-events: none; }
.arrow-button:hover:not(:disabled) { background: #1a1a1a; }
.arrow-button:disabled { background: #000; opacity: 0.6; cursor: not-allowed; }

/* === КНОПКА ЗАКРЫТИЯ === */
.close-all-btn {
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 100;
  background: rgba(0, 0, 0, 0.7);
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
  transition: all 0.2s;
}
.close-all-btn:hover { background: #111; color: #fff; }

/* === АНИМАЦИИ === */
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

.slide-in-enter-active { transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1); }
.slide-in-leave-active { transition: all 0.3s cubic-bezier(0.5, 0, 0.75, 0); }
.slide-in-enter-from, .slide-in-leave-to { opacity: 0; transform: translateX(-20px); }

.item-swap-enter-active, .item-swap-leave-active { transition: all 0.3s ease-in-out; }
.item-swap-enter-from, .item-swap-leave-to { opacity: 0; transform: scale(0.95); }
</style>
