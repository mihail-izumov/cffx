<div class="brands-container">
  <div class="brand-card">
    <h3>Green House</h3>
    <p class="description-main">Региональное доминирование и риски экспансии.</p>
    <p class="description-goals"><strong>Цели:</strong> Формула успеха, Ключевые элементы, Адаптация.</p>
  </div>
  <div class="brand-card">
    <h3>Skuratov Coffee</h3>
    <p class="description-main">Формула «скорости» и пределы роста для «качества».</p>
    <p class="description-goals"><strong>Цели:</strong> Формула успеха, Рост без потерь.</p>
  </div>
  <div class="brand-card">
    <h3>Surf Coffee</h3>
    <p class="description-main">Формула «атмосферы» и возможность её масштабирования.</p>
    <p class="description-goals"><strong>Цель:</strong> Ядро бренда, Рост без потерь.</p>
  </div>
  <div class="brand-card">
    <h3>Корж</h3>
    <p class="description-main">Масштабировать уют, не потеряв магию бренда.</p>
    <p class="description-goals"><strong>Цель:</strong> Масштабировать «уют», Создать культ бренда, Доминировать по цене.</p>
  </div>
</div>

<style>
/* Контейнер для горизонтальной прокрутки */
.brands-container {
  display: flex !important;
  overflow-x: auto !important;
  gap: 16px !important;
  padding: 4px 0 16px 4px !important;
  margin: 32px 0 !important;
  /* Стилизация скроллбара */
  &::-webkit-scrollbar {
    height: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: var(--vp-c-divider);
    border-radius: 3px;
  }
}

/* --- СТИЛИ КАРТОЧКИ --- */
.brand-card {
  flex: 0 0 260px; /* Фиксированная ширина карточки */
  background-color: #f5f5f7 !important; /* Светло-серый фон, одинаковый для обеих тем */
  border-radius: 12px !important;
  padding: 24px 20px !important;
  border: none !important; /* Убираем обводку */
}

/* В тёмной теме фон карточки можно сделать чуть темнее для лучшей интеграции */
:root.dark .brand-card {
    background-color: #eaeaef !important;
}

/* --- СТИЛИ ЗАГОЛОВКА --- */
.brand-card h3 {
  color: #1a1a1a !important; /* Чёрный цвет */
  font-size: 16px !important;
  line-height: 1.4 !important;
  margin-top: 0 !important;
  margin-bottom: 12px !important;
  font-weight: 700 !important;
}

/* --- СТИЛИ ТЕКСТА --- */
/* Первая строка описания - чёрная */
.description-main {
  color: #1a1a1a !important; /* Чёрный цвет */
  font-size: 14px !important;
  line-height: 1.6 !important;
  margin: 0 0 6px 0 !important; /* Отступ ~ в полстроки */
}

/* Текст с целями - серый */
.description-goals {
  color: #6b7280 !important; /* Серый цвет для второстепенного текста */
  font-size: 13px !important;
  line-height: 1.6 !important;
  margin: 0 !important;
}

/* Стиль для слова "Цели" */
.description-goals strong {
  font-weight: 600; /* Немного выделить жирностью */
  color: inherit !important; /* Наследовать серый цвет родителя */
}
</style>
