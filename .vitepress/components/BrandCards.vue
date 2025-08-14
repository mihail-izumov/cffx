<template>
  <div class="brands-container">
    <div class="brand-card">
      <h3>Green House</h3>
      <p class="description-main">Региональное доминирование и риски экспансии</p>
      <p class="description-goals">Формула успеха, Ключевые элементы, Адаптация</p>
    </div>
    <div class="brand-card">
      <h3>Skuratov Coffee</h3>
      <p class="description-main">Формула «скорости» и пределы роста для «качества»</p>
      <p class="description-goals">Формула успеха, Рост без потерь</p>
    </div>
    <div class="brand-card">
      <h3>Surf Coffee</h3>
      <p class="description-main">Масштабирование на формуле «атмосферы»</p>
      <p class="description-goals">Ядро бренда, Рост без потерь</p>
    </div>
    <div class="brand-card">
      <h3>Корж</h3>
      <p class="description-main">Масштабировать уют без потери магии бренда</p>
      <p class="description-goals">Создать культ бренда, Доминировать по цене</p>
    </div>
    <div class="brand-card">
      <h3>Корж</h3>
      <p class="description-main">Вашей кофейни здесь нет?</p>
      <p class="description-goals"><a href="/radar/overview">Рассчитать Индекс Роста →</a></p>
    </div>
  </div>
</template>

<style>
/* Контейнер для горизонтальной прокрутки */
.brands-container {
  display: flex !important;
  overflow-x: auto !important;
  gap: 12px !important; /* Уменьшен отступ между карточками */
  padding: 4px 0 12px 4px !important;
  margin: 24px 0 !important; /* Уменьшен вертикальный отступ всего блока */
}

/* Стилизация скроллбара */
.brands-container::-webkit-scrollbar {
  height: 6px;
}
.brands-container::-webkit-scrollbar-thumb {
  background-color: var(--vp-c-divider);
  border-radius: 3px;
}

/* --- СТИЛИ КАРТОЧКИ --- */
.brand-card {
  flex: 0 0 260px; /* Фиксированная ширина карточки */
  background-color: #f5f5f7 !important;
  border-radius: 12px !important;
  padding: 20px 16px !important; /* Уменьшены внутренние отступы */
  border: none !important;
}

/* В тёмной теме фон карточки можно сделать чуть темнее для лучшей интеграции */
:root.dark .brand-card {
    background-color: #eaeaef !important;
}

/* --- СТИЛИ ЗАГОЛОВКА --- */
.brand-card h3 {
  color: #1a1a1a !important;
  font-size: 16px !important;
  line-height: 1.4 !important;
  margin-top: 0 !important;
  margin-bottom: 8px !important; /* Уменьшен отступ под заголовком */
  font-weight: 700 !important;
}

/* --- СТИЛИ ТЕКСТА --- */
/* Первая строка описания - чёрная */
.description-main {
  color: #1a1a1a !important;
  font-size: 14px !important;
  line-height: 1.6 !important;
  margin: 0 0 4px 0 !important; /* Уменьшен отступ ~ в полстроки */
}

/* Текст с целями - серый */
.description-goals {
  color: #6b7280 !important;
  font-size: 13px !important;
  line-height: 1.6 !important;
  margin: 0 !important;
}

/* Стиль для слова "Цели" */
.description-goals strong {
  font-weight: 600;
  color: inherit !important;
}
</style>
