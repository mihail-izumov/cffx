<template>
  <div class="steps-brands-container">
    <!-- ШАГ 1 -->
    <div class="steps-brand-card steps-simulator-card">
      <div class="steps-tariff-badge steps-simulator">ШАГ 1</div>
      <h3 class="steps-title">Отправьте Сигнал</h3>
      <p class="steps-description-main">Наша продуманная форма поможет вам четко изложить свои мысли и предложения.</p>
      <p class="steps-description-goals">Ничего лишнего — только суть.</p>
    </div>
    
    <!-- ШАГ 2 -->
    <div class="steps-brand-card steps-simulator-card">
      <div class="steps-tariff-badge steps-simulator">ШАГ 2</div>
      <h3 class="steps-title">Получите поддержку Анны</h3>
      <p class="steps-description-main">ИИ-ассистент Анна поможет сформировать запрос, так чтобы он был гарантированно услышан кофейней.</p>
      <p class="steps-description-goals">Точные действия – гарантия результата.</p>
    </div>
    
    <!-- ШАГ 3 -->
    <div class="steps-brand-card steps-simulator-card">
      <div class="steps-tariff-badge steps-simulator">ШАГ 3</div>
      <h3 class="steps-title">Запустите Процесс</h3>
      <p class="steps-description-main">Ваш сигнал немедленно поступает в работу менеджеру нужной кофейни.</p>
      <p class="steps-description-goals">Мы гарантируем, что вы получите ответ.</p>
    </div>
    
    <!-- ШАГ 4 -->
    <div class="steps-brand-card steps-simulator-card">
      <div class="steps-tariff-badge steps-simulator">ШАГ 4</div>
      <h3 class="steps-title">Получите Результат</h3>
      <p class="steps-description-main">Следите за статусом сигнала в реальном времени в Индексе Роста. Анна отправит вам результат, когда разбор будет закончен.</p>
      <p class="steps-description-goals">Ваш вклад — нагляден и измерим.</p>
    </div>
  </div>
</template>

<style scoped>
/* ВСЕ СТИЛИ ПОЛНОСТЬЮ ИЗОЛИРОВАНЫ С УНИКАЛЬНЫМИ КЛАССАМИ */

/* Контейнер для горизонтальной прокрутки */
.steps-brands-container {
  display: flex !important;
  overflow-x: auto !important;
  gap: 16px !important;
  padding: 4px 0 12px 4px !important;
  margin: 24px 0 !important;
}

/* Стилизация скроллбара */
.steps-brands-container::-webkit-scrollbar {
  height: 6px;
}

.steps-brands-container::-webkit-scrollbar-thumb {
  background-color: var(--vp-c-divider);
  border-radius: 3px;
}

.steps-brand-card {
  flex: 0 0 300px !important; /* Фиксированная ширина для скролла */
  border-radius: 12px !important;
  padding: 20px 16px !important;
  display: flex !important;
  flex-direction: column !important;
  border-style: solid !important;
  border-width: 1px !important;
  border-top-width: 4px !important;
  position: relative !important;
  min-height: 180px !important;
}

/* СВЕТЛАЯ ТЕМА - карточки светлые */
.steps-simulator-card {
  background-color: #f9f8f6 !important;
  border-color: #e5e2dd !important;
  border-top-color: #7fb842 !important; /* ЗЕЛЕНЫЙ вместо желтого */
}

/* ТЕМНАЯ ТЕМА - карточки темные */
:root.dark .steps-simulator-card {
  background-color: #2B2A27 !important;
  border-color: #383633 !important;
  border-top-color: #c8ff5a !important; /* ЯРКО-ЗЕЛЕНЫЙ для темной темы */
}

/* Стили для бейджей тарифов */
.steps-tariff-badge {
  display: inline-block !important;
  padding: 1px 6px !important;
  border-radius: 4px !important;
  font-size: 9px !important;
  font-weight: 600 !important;
  text-transform: uppercase !important;
  letter-spacing: 0.3px !important;
  margin-bottom: 6px !important;
  width: fit-content !important;
  border: none !important;
}

.steps-simulator {
  background-color: rgba(127, 184, 66, 0.25) !important; /* ЗЕЛЕНЫЙ фон */
  color: #5a7c3a !important; /* ЗЕЛЕНЫЙ текст */
}

:root.dark .steps-simulator {
  background-color: rgba(200, 255, 90, 0.15) !important;
  color: #c8ff5a !important;
}

/* Заголовки */
.steps-title {
  font-size: 15px !important;
  line-height: 1.4 !important;
  margin-top: 0 !important;
  margin-bottom: 8px !important;
  font-weight: 700 !important;
  border: none !important;
  padding: 0 !important;
  color: #2c3e2c !important;
}

:root.dark .steps-title {
  color: #ffffff !important;
}

.steps-description-main {
  color: #4a5a4a !important;
  font-size: 15px !important;
  line-height: 1.6 !important;
  margin: 0 0 4px 0 !important;
  flex-grow: 1 !important;
}

:root.dark .steps-description-main {
  color: #f0f0f0 !important;
}

.steps-description-goals {
  color: #5a7c3a !important; /* ЗЕЛЕНЫЙ */
  font-size: 14px !important; /* Увеличил с 12px до 14px */
  font-weight: 500 !important; /* Добавил среднюю жирность */
  line-height: 1.6 !important;
  margin: 0 !important;
}

:root.dark .steps-description-goals {
  color: #a8d472 !important; /* ПРИГЛУШЕННЫЙ ЗЕЛЕНЫЙ */
}
</style>
