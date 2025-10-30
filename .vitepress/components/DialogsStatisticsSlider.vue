<template>
  <div class="signal-report-container">
    <!-- КАРТОЧКА 1: NPS -->
    <div class="signal-report-card">
      <div class="signal-report-badge">NPS</div>
      <h3 class="signal-report-title">Индекс лояльности</h3>
      <p class="signal-report-description">Единый показатель здоровья отношений с клиентами. Включает график динамики и структуру.</p>
      <p class="signal-report-goals">Структура: Промоутеры • Нейтралы • Критики</p>
    </div>
    
    <!-- КАРТОЧКА 2: ТОП-5 -->
    <div class="signal-report-card">
      <div class="signal-report-badge">ТОП-5</div>
      <h3 class="signal-report-title">Рейтинги</h3>
      <p class="signal-report-description">Список из ТОП-5 болевых точек вашего сервиса (из негативных отзывов) и ТОП-5 сильных сторон (из позитивных).</p>
      <p class="signal-report-goals">Фокус: Сильные и слабые стороны</p>
    </div>
    
    <!-- КАРТОЧКА 3: РЕКОМЕНДАЦИИ -->
    <div class="signal-report-card">
      <div class="signal-report-badge">Рекомендации</div>
      <h3 class="signal-report-title">Улучшения сервиса и продукта</h3>
      <p class="signal-report-description">Общие тактические рекомендации, основанные на самых частотных проблемах и предложениях месяца, для быстрого улучшения сервиса.</p>
      <p class="signal-report-goals">Основа: Данные обратной связи</p>
    </div>
    
    <!-- КАРТОЧКА 4: ИССЛЕДОВАНИЯ -->
    <div class="signal-report-card">
      <div class="signal-report-badge">Исследования</div>
      <h3 class="signal-report-title">1 фокус-тема в месяц</h3>
      <p class="signal-report-description">Вы выбираете одну бизнес-задачу (например, «анализ запуска нового продукта»), и наш аналитик готовит по ней углубленный срез.</p>
      <p class="signal-report-goals">Результат: Углубленный срез по актуальной задаче</p>
    </div>
  </div>
</template>

<style scoped>
/* Уникальные классы для избежания конфликтов */

/* Контейнер для горизонтальной прокрутки */
.signal-report-container {
  display: flex !important;
  overflow-x: auto !important;
  gap: 16px !important;
  padding: 4px 0 12px 4px !important;
  margin: 24px 0 !important;
}

/* Стилизация скроллбара */
.signal-report-container::-webkit-scrollbar {
  height: 6px;
}

.signal-report-container::-webkit-scrollbar-thumb {
  background-color: var(--vp-c-divider);
  border-radius: 3px;
}

/* Карточка отчета */
.signal-report-card {
  flex: 0 0 320px !important;
  border-radius: 12px !important;
  padding: 24px 18px !important;
  display: flex !important;
  flex-direction: column !important;
  border: 1px solid #e0e5dd !important;
  border-top: 4px solid #C5F946 !important;
  position: relative !important;
  min-height: 250px !important; /* Скорректирована высота */
  background-color: #f8faf6 !important;
}

/* Темная тема для карточки */
:root.dark .signal-report-card {
  background-color: #272B27 !important;
  border-color: #333833 !important;
  border-top-color: #C5F946 !important;
}

/* Бейдж */
.signal-report-badge {
  display: inline-block !important;
  padding: 2px 8px !important;
  border-radius: 4px !important;
  font-size: 9px !important;
  font-weight: 600 !important;
  text-transform: uppercase !important;
  letter-spacing: 0.3px !important;
  margin-bottom: 8px !important;
  width: fit-content !important;
  background-color: #506933 !important;
  color: #B4D053 !important;
}

/* Заголовок */
.signal-report-title {
  font-size: 16px !important;
  line-height: 1.4 !important;
  margin-top: 0 !important;
  margin-bottom: 10px !important;
  font-weight: 700 !important;
  border: none !important;
  padding: 0 !important;
  color: #2c3e2c !important;
}

:root.dark .signal-report-title {
  color: #ffffff !important;
}

/* Основное описание */
.signal-report-description {
  color: #4a5a4a !important;
  font-size: 14px !important;
  line-height: 1.65 !important;
  margin: 0 0 10px 0 !important;
  flex-grow: 1 !important; /* Растягивает блок, чтобы прижать футер к низу */
}

:root.dark .signal-report-description {
  color: #f0f0f0 !important;
}

/* Цели (футер карточки) */
.signal-report-goals {
  color: #347b6c !important;
  font-size: 14px !important;
  font-weight: 500 !important;
  line-height: 1.65 !important;
  margin: 0 !important;
  padding-top: 4px !important;
}

:root.dark .signal-report-goals {
  color: #C5F946 !important;
}
</style>
