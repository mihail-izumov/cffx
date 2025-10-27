<template>
  <div class="tss-slider-wrapper">
    <div class="tss-brands-container" ref="sliderContainer">
      <!-- СЛАЙД 1 -->
      <div class="tss-brand-card tss-step-card">
        <div class="tss-card-background-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="M6 8h.01"/><path d="M10 8h.01"/><path d="M14 8h.01"/></svg>
        </div>
        <h3 class="tss-title">Живой поток работы с обращениями</h3>
        <p class="tss-description-main">Анна ведёт переписку с клиентом, собирает факты и передаёт готовое задание команде. Тикет‑система контролирует сроки, напоминает команде и фиксирует ответы. Оператор направляет поток, а система синхронизирует все процессы.</p>
        <p class="tss-description-secondary"><span class="tss-control-label">Как это работает:</span> <span class="tss-control-highlight">Полная координация между диалогом с клиентом и внутренней работой команды. Клиент видит заботу, команда — ясные задания.</span></p>
        <p class="tss-description-goals tss-step-goals">Команда видит только готовые тикеты, клиент чувствует движение к результату.</p>
      </div>
      
      <!-- СЛАЙД 2 -->
      <div class="tss-brand-card tss-step-card">
        <div class="tss-card-background-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="M6 8h.01"/><path d="M10 8h.01"/><path d="M14 8h.01"/></svg>
        </div>
        <h3 class="tss-title">Рекомендации к действию и система двойной проверки</h3>
        <p class="tss-description-main">Каждый тикет содержит точные рекомендации из ваших стандартов — команде не нужно держать их в памяти. Система двойной проверки почти полностью исключает ошибки в реакции на запрос и поиске правильного решения.</p>
        <p class="tss-description-secondary"><span class="tss-control-label">Что это даёт:</span> <span class="tss-control-highlight">Команда работает быстрее и точнее. Стандарты становятся живыми, а не забытыми правилами в документах.</span></p>
        <p class="tss-description-goals tss-step-goals">Рекомендации упрощают работу и делают стандарты реальностью.</p>
      </div>
      
      <!-- СЛАЙД 3 -->
      <div class="tss-brand-card tss-step-card">
        <div class="tss-card-background-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="M6 8h.01"/><path d="M10 8h.01"/><path d="M14 8h.01"/></svg>
        </div>
        <h3 class="tss-title">Приём обращений 24/5</h3>
        <p class="tss-description-main">Тикет‑система принимает обращения пять дней в неделю, присваивает номер и фиксирует время получения. Обработка в рабочие дни даёт команде время подготовить качественный ответ, а клиент получает уверенность, что его запрос зафиксирован и не потеряется.</p>
        <p class="tss-description-secondary"><span class="tss-control-label">Как это работает:</span> <span class="tss-control-highlight">Круглосуточный приём включён в стандартный тариф — вы даёте клиентам доступ к обращениям в удобное для них время, а команда работает эффективно в рабочие часы.</span></p>
        <p class="tss-description-goals tss-step-goals">Ни одно обращение не теряется, качество ответов сохраняется.</p>
      </div>
      
      <!-- СЛАЙД 4 -->
      <div class="tss-brand-card tss-step-card">
        <div class="tss-card-background-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="M6 8h.01"/><path d="M10 8h.01"/><path d="M14 8h.01"/></svg>
        </div>
        <h3 class="tss-title">Сбор фактов перед тикетом</h3>
        <p class="tss-description-main">Анна собирает детали в коротком диалоге с клиентом, чтобы тикет команде был точным и полным с первого раза.</p>
        <p class="tss-description-secondary"><span class="tss-control-label">Что входит:</span> <span class="tss-control-highlight">Суть проблемы, локация, время события, эмоция клиента и история переписки.</span></p>
        <p class="tss-description-goals tss-step-goals">Тикеты приходят точными, команда решает без возвратов на уточнение.</p>
      </div>
      
      <!-- СЛАЙД 5 -->
      <div class="tss-brand-card tss-step-card">
        <div class="tss-card-background-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="M6 8h.01"/><path d="M10 8h.01"/><path d="M14 8h.01"/></svg>
        </div>
        <h3 class="tss-title">Формат тикета</h3>
        <p class="tss-description-main">Готовое задание с сутью, локацией, временем, эмоцией клиента, рекомендациями к действию, сроком ответа и историей переписки.</p>
        <p class="tss-description-secondary"><span class="tss-control-label">Что это даёт:</span> <span class="tss-control-highlight">Любой исполнитель входит в контекст за секунды и видит, что делать дальше.</span></p>
        <p class="tss-description-goals tss-step-goals">Быстрый старт работ и прозрачность для команды.</p>
      </div>
      
      <!-- СЛАЙД 6 -->
      <div class="tss-brand-card tss-step-card">
        <div class="tss-card-background-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="M6 8h.01"/><path d="M10 8h.01"/><path d="M14 8h.01"/></svg>
        </div>
        <h3 class="tss-title">Контроль времени и автоматические уведомления</h3>
        <p class="tss-description-main">Система считает время от отправки тикета до ответа команды, отслеживает приближение срока и просрочки. Напоминания приходят вовремя и без повторов: за 30 минут до срока «скоро время ответа», при просрочке «ответ просрочен».</p>
        <p class="tss-description-secondary"><span class="tss-control-label">Что это даёт:</span> <span class="tss-control-highlight">Команда реагирует вовремя, клиент получает честные сроки и предсказуемость ответа.</span></p>
        <p class="tss-description-goals tss-step-goals">Команда не пропускает важные сроки, забытых тикетов нет.</p>
      </div>
      
      <!-- СЛАЙД 7 -->
      <div class="tss-brand-card tss-step-card">
        <div class="tss-card-background-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="M6 8h.01"/><path d="M10 8h.01"/><path d="M14 8h.01"/></svg>
        </div>
        <h3 class="tss-title">Контроль процессов и аналитика</h3>
        <p class="tss-description-main">Система автоматически отслеживает время реакции, помогает выявлять узкие места и контролировать нагрузку команды. Статистика показывает, где процесс замедляется и как улучшить скорость.</p>
        <p class="tss-description-secondary"><span class="tss-control-label">Что это даёт:</span> <span class="tss-control-highlight">Честное понимание того, как работает команда, и возможность управлять качеством без догадок.</span></p>
        <p class="tss-description-goals tss-step-goals">Больше прозрачности и скорости, меньше задержек.</p>
      </div>
      
      <!-- СЛАЙД 8 -->
      <div class="tss-brand-card tss-step-card">
        <div class="tss-card-background-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="M6 8h.01"/><path d="M10 8h.01"/><path d="M14 8h.01"/></svg>
        </div>
        <h3 class="tss-title">Тикеты без диалога и полная история</h3>
        <p class="tss-description-main">Если клиент не отвечает, тикет можно отправить команде без диалога. В карточке хранится вся история переписки и изменений, чтобы новый исполнитель быстро входил в контекст.</p>
        <p class="tss-description-secondary"><span class="tss-control-label">Что это даёт:</span> <span class="tss-control-highlight">Решение приходит даже при молчании клиента, а время не тратится на повторения одного и того же.</span></p>
        <p class="tss-description-goals tss-step-goals">Результат без задержек, контекст всегда под рукой.</p>
      </div>
    </div>
    
    <!-- Кнопки навигации внизу справа -->
    <div class="tss-nav-buttons">
      <button class="tss-nav-btn tss-nav-prev" @click="scrollPrev" aria-label="Предыдущий слайд">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
      </button>
      <button class="tss-nav-btn tss-nav-next" @click="scrollNext" aria-label="Следующий слайд">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const sliderContainer = ref(null)

const scrollNext = () => {
  if (sliderContainer.value) {
    sliderContainer.value.scrollBy({ left: 336, behavior: 'smooth' })
  }
}

const scrollPrev = () => {
  if (sliderContainer.value) {
    sliderContainer.value.scrollBy({ left: -336, behavior: 'smooth' })
  }
}
</script>

<style scoped>
/* ВСЕ СТИЛИ ПОЛНОСТЬЮ ИЗОЛИРОВАНЫ С УНИКАЛЬНЫМИ КЛАССАМИ */
/* Обёртка для слайдера и кнопок */
.tss-slider-wrapper {
  position: relative !important;
  margin: 24px 0 !important;
}

/* Контейнер для горизонтальной прокрутки */
.tss-brands-container {
  display: flex !important;
  overflow-x: auto !important;
  gap: 16px !important;
  padding: 4px 0 12px 4px !important;
  scroll-behavior: smooth !important;
  scrollbar-width: none !important;
  -ms-overflow-style: none !important;
  margin-bottom: 16px !important;
}

/* Скрываем скроллбар */
.tss-brands-container::-webkit-scrollbar {
  display: none !important;
}

.tss-brand-card {
  flex: 0 0 320px !important;
  border-radius: 12px !important;
  padding: 48px 24px !important;
  display: flex !important;
  flex-direction: column !important;
  gap: 16px !important;
  border-style: solid !important;
  border-width: 1px !important;
  border-top-width: 4px !important;
  position: relative !important;
  min-height: 360px !important;
  overflow: hidden !important;
  transition: border-top-color 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important;
}

/* Приглушённая лаймовая полоска по умолчанию */
.tss-step-card {
  background-color: #4a4a4a !important;
  border-color: #555 !important;
  border-top-color: rgba(197, 249, 70, 0.3) !important;
}

/* Яркая лаймовая полоска при наведении */
.tss-step-card:hover {
  border-top-color: #C5F946 !important;
}

/* Фоновая иконка - сильно приглушённая */
.tss-card-background-icon {
  position: absolute !important;
  bottom: -90px !important;
  right: -90px !important;
  width: 300px !important;
  height: 300px !important;
  opacity: 0.04 !important;
  pointer-events: none !important;
  z-index: 0 !important;
}

.tss-card-background-icon svg {
  width: 100% !important;
  height: 100% !important;
  stroke: currentColor !important;
}

.tss-step-card .tss-card-background-icon {
  color: #ffffff !important;
}

/* ТЕМНАЯ ТЕМА */
:root.dark .tss-step-card {
  background-color: #2a2a2a !important;
  border-color: #3a3a3a !important;
  border-top-color: rgba(197, 249, 70, 0.3) !important;
}

:root.dark .tss-step-card:hover {
  border-top-color: #C5F946 !important;
}

:root.dark .tss-step-card .tss-card-background-icon {
  color: #cccccc !important;
  opacity: 0.03 !important;
}

/* Заголовки */
.tss-title {
  font-size: 16px !important;
  line-height: 1.4 !important;
  margin: 0 !important;
  font-weight: 700 !important;
  border: none !important;
  padding: 0 !important;
  color: #ffffff !important;
  position: relative !important;
  z-index: 1 !important;
}

:root.dark .tss-title {
  color: #ffffff !important;
}

/* Основной текст */
.tss-description-main {
  color: #e0e0e0 !important;
  font-size: 16px !important;
  font-weight: 400 !important;
  line-height: 1.65 !important;
  margin: 0 !important;
  position: relative !important;
  z-index: 1 !important;
}

:root.dark .tss-description-main {
  color: #d0d0d0 !important;
}

/* Дополнительный текст */
.tss-description-secondary {
  color: #b0b0b0 !important;
  font-size: 13px !important;
  line-height: 1.6 !important;
  margin: 0 !important;
  flex-grow: 1 !important;
  position: relative !important;
  z-index: 1 !important;
}

:root.dark .tss-description-secondary {
  color: #a0a0a0 !important;
}

/* "Ваш контроль:" белым цветом */
.tss-control-label {
  color: #ffffff !important;
  font-weight: 700 !important;
}

:root.dark .tss-control-label {
  color: #ffffff !important;
}

/* Выделение маркером с минимальным скруглением, меньшей высотой и приглушённым цветом */
.tss-control-highlight {
  background: linear-gradient(to right, #C5F946 0%, #C5F946 50%, rgba(197, 249, 70, 0.08) 50%) !important;
  background-size: 200% 100% !important;
  background-position: 100% 0 !important;
  background-color: rgba(197, 249, 70, 0.08) !important;
  color: #ffffff !important;
  padding: 1px 5px !important;
  margin: 0 !important;
  border-radius: 1px !important;
  transition: background-position 0.6s cubic-bezier(0.4, 0, 0.2, 1), color 0.3s ease !important;
  position: relative !important;
  display: inline !important;
  z-index: 1 !important;
  box-decoration-break: clone !important;
  -webkit-box-decoration-break: clone !important;
  line-height: 1.5 !important;
  vertical-align: baseline !important;
}

/* При наведении - заполнение лаймовым слева направо с тёмным текстом */
.tss-step-card:hover .tss-control-highlight {
  background-position: 0 0 !important;
  color: #1a1a1a !important;
}

:root.dark .tss-control-highlight {
  background-color: rgba(197, 249, 70, 0.1) !important;
  color: #ffffff !important;
}

:root.dark .tss-step-card:hover .tss-control-highlight {
  background-position: 0 0 !important;
  color: #1a1a1a !important;
}

/* Цели */
.tss-step-goals {
  color: #C5F946 !important;
  font-size: 14px !important;
  font-weight: 500 !important;
  line-height: 1.65 !important;
  margin: 0 !important;
  position: relative !important;
  z-index: 1 !important;
}

:root.dark .tss-step-goals {
  color: #C5F946 !important;
}

/* Кнопки навигации внизу справа */
.tss-nav-buttons {
  display: flex !important;
  gap: 8px !important;
  justify-content: flex-end !important;
  margin-right: 0 !important;
  padding-right: 4px !important;
}

.tss-nav-btn {
  width: 40px !important;
  height: 40px !important;
  border-radius: 50% !important;
  border: none !important;
  cursor: pointer !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  transition: all 0.3s ease !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15) !important;
}

/* Кнопка "Назад" */
.tss-nav-prev {
  background-color: #e8e8e8 !important;
  color: #4a4a4a !important;
}

.tss-nav-prev:hover {
  background-color: #d0d0d0 !important;
  transform: scale(1.05) !important;
}

/* Кнопка "Вперёд" - белый фон */
.tss-nav-next {
  background-color: #ffffff !important;
  color: #2a2a2a !important;
}

.tss-nav-next:hover {
  background-color: #f5f5f5 !important;
  transform: scale(1.05) !important;
}

/* ТЕМНАЯ ТЕМА для кнопок */
:root.dark .tss-nav-prev {
  background-color: #3a3a3a !important;
  color: #e0e0e0 !important;
}

:root.dark .tss-nav-prev:hover {
  background-color: #4a4a4a !important;
}

:root.dark .tss-nav-next {
  background-color: #ffffff !important;
  color: #2a2a2a !important;
}

:root.dark .tss-nav-next:hover {
  background-color: #f0f0f0 !important;
}
</style>
