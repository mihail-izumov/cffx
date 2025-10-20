<template>
  <div class="feature-selector-wrapper">
    <!-- Блок с контентом активного элемента -->
    <transition name="content-swap" mode="out-in">
      <div :key="activeIndex" class="active-content-box">
        <p class="content-text">{{ activeItem.content }}</p>
      </div>
    </transition>

    <div class="controls-and-pills">
      <!-- Вертикальные стрелки навигации -->
      <div class="nav-arrows">
        <button 
          class="arrow-button" 
          @click="navigate(-1)" 
          :disabled="activeIndex === 0"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
            <path d="M18 15L12 9L6 15" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <button 
          class="arrow-button" 
          @click="navigate(1)" 
          :disabled="activeIndex === items.length - 1"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
            <path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>

      <!-- Список неактивных элементов в виде «пилюль» -->
      <div class="pills-list">
        <transition-group name="pills-swap">
          <button 
            v-for="item in inactiveItems" 
            :key="item.id" 
            class="pill-button" 
            @click="setActive(item.id)"
          >
            <div class="pill-icon-wrapper">
              <span class="pill-icon">+</span>
            </div>
            <span class="pill-title">{{ item.title }}</span>
          </button>
        </transition-group>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const items = ref([
  {
    id: 1,
    title: '1. Архитектура Проблем',
    content: 'Система автоматически распознаёт и классифицирует каждую проблему — от чистоты в зале до тона голоса сотрудника. Вы видите не хаос мнений, а ясную архитектуру боли и радости ваших клиентов. Это позволяет мгновенно отличать критические сбои от мелких недочетов.'
  },
  {
    id: 2,
    title: '2. Протокол «Анна»',
    content: 'Наш ИИ-ассистент Анна работает по 10-этапному протоколу эмпатичного общения. Она не просто собирает факты — она гасит негатив, проявляет заботу и превращает разгневанного клиента в лояльного союзника. Вы можете адаптировать её тон голоса, чтобы он на 100% соответствовал вашему бренду.'
  },
  {
    id: 3,
    title: '3. Матрица Эскалации',
    content: 'Вы сами решаете, кто и когда получает сигнал. Пролитый кофе — сообщение дежурному тренеру. Серьёзная угроза репутации — мгновенное уведомление лично вам. Это ваш пульт управления вниманием: вы фокусируетесь только на том, что действительно важно, и никогда не упускаете критических моментов.'
  },
  {
    id: 4,
    title: '4. Система Тикетов',
    content: 'Каждая проблема автоматически превращается в тикет с уникальным номером, категорией и ответственным. Вы видите весь жизненный цикл проблемы: от первого сигнала до финального «спасибо» от клиента. Это полная прозрачность и гарантия того, что ни одна жалоба не будет забыта.'
  },
  {
    id: 5,
    title: '5. Полномочия Системы',
    content: 'Вы проводите черту, где заканчивается автоматизация и начинается ваше человеческое решение. Анна может самостоятельно предлагать стандартные компенсации, но решения о крупных выплатах или нестандартных ситуациях всегда остаются за вами. Это автономность без потери контроля.'
  },
  {
    id: 6,
    title: '6. Протоколы Компенсаций',
    content: 'Настройте логику выдачи бонусов за разные типы сбоев. Система сама предложит гостю сертификат или скидку в точном соответствии с вашими правилами. Это превращает любой сбой из проблемы в возможность продемонстрировать исключительный сервис.'
  },
  {
    id: 7,
    title: '7. Метрики Успеха',
    content: 'Вы получаете доступ к дашборду, где в реальном времени отслеживаются ключевые показатели: среднее время решения проблемы, уровень удовлетворённости (NPS) после диалога, самые частые типы проблем. Вы управляете репутацией на основе данных, а не интуиции.'
  }
])

const activeIndex = ref(0)

const activeItem = computed(() => items.value[activeIndex.value])

const inactiveItems = computed(() => items.value.filter((_, index) => index !== activeIndex.value))

function navigate(direction) {
  const newIndex = activeIndex.value + direction
  if (newIndex >= 0 && newIndex < items.value.length) {
    activeIndex.value = newIndex
  }
}

function setActive(id) {
  const newActiveIndex = items.value.findIndex(item => item.id === id)
  if (newActiveIndex !== -1) {
    activeIndex.value = newActiveIndex
  }
}
</script>

<style scoped>
/* Общий контейнер */
.feature-selector-wrapper {
  background-color: #000;
  padding: 20px;
  max-width: 600px;
  margin: auto;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}

/* Блок с контентом активного элемента */
.active-content-box {
  background-color: #1C1C1E;
  border-radius: 24px;
  padding: 24px;
  margin-bottom: 16px;
  min-height: 120px;
}

.content-text {
  color: #EAEAEB;
  font-size: 17px;
  line-height: 1.5;
  font-weight: 500;
  margin: 0;
}

/* Контейнер для стрелок и кнопок */
.controls-and-pills {
  display: flex;
  align-items: flex-start;
  gap: 16px;
}

/* Навигационные стрелки */
.nav-arrows {
  display: flex;
  flex-direction: column;
  gap: 8px;
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

/* Список кнопок-«пилюль» */
.pills-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1;
}

.pill-button {
  display: flex;
  align-items: center;
  gap: 12px;
  background-color: #1C1C1E;
  border: none;
  border-radius: 20px;
  padding: 10px 16px;
  width: 100%;
  text-align: left;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.pill-button:hover {
  background-color: #2C2C2E;
}

.pill-icon-wrapper {
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: rgba(120, 120, 128, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
}

.pill-icon {
  color: #8A8A8E;
  font-size: 18px;
  font-weight: 500;
  line-height: 1;
}

.pill-title {
  color: #F2F2F7;
  font-size: 16px;
  font-weight: 600;
}

/* Анимации */
.content-swap-enter-active,
.content-swap-leave-active {
  transition: all 0.3s ease-in-out;
}
.content-swap-enter-from,
.content-swap-leave-to {
  opacity: 0;
  transform: translateY(15px);
}

.pills-swap-enter-active,
.pills-swap-leave-active {
  transition: all 0.3s ease-in-out;
}
.pills-swap-enter-from,
.pills-swap-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>
