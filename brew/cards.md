<div class="brands-container">
  <div class="brand-card">
    <h3>Green House</h3>
    <p>Региональное доминирование и риски экспансии.<br><strong>Цели:</strong> Формула успеха, Ключевые элементы, Адаптация.</p>
  </div>
  <div class="brand-card">
    <h3>Skuratov Coffee</h3>
    <p>Формула «скорости» и пределы роста для «качества».<br><strong>Цели:</strong> Формула успеха, Рост без потерь.</p>
  </div>
  <div class="brand-card">
    <h3>Surf Coffee</h3>
    <p>Формула «атмосферы» и возможность её масштабирования.<br><strong>Цель:</strong> Ядро бренда, Рост без потерь.</p>
  </div>
  <div class="brand-card">
    <h3>Корж</h3>
    <p>Масштабировать уют, не потеряв магию бренда.<br><strong>Цель:</strong> Масштабировать «уют», Создать культ бренда, Доминировать по цене.</p>
  </div>
</div>

<style>
/* Контейнер для горизонтальной прокрутки */
.brands-container {
  display: flex !important;
  overflow-x: auto !important; /* Включаем горизонтальную прокрутку */
  gap: 16px !important;
  padding: 4px 0 16px 4px !important; /* Добавим отступ снизу для тени скроллбара */
  margin: 32px 0 !important;
  /* Стилизация скроллбара для Webkit-браузеров (Chrome, Safari) */
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
  flex: 0 0 260px; /* Карточки не сжимаются и имеют фиксированную ширину */
  background-color: #2c2c2e !important; /* Тёмно-серый фон, хорошо читается на обеих темах */
  border: 1px solid var(--vp-c-bg-soft);
  border-radius: 12px !important;
  padding: 24px 20px !important;
  height: 100% !important;
  transition: border-color 0.25s;
}
.brand-card:hover {
  border-color: var(--vp-c-brand-1);
}

/* --- СТИЛИ ЗАГОЛОВКА --- */
.brand-card h3 {
  color: #1e1e20 !important; /* Черный цвет для светлой темы */
  font-size: 16px !important;
  line-height: 1.4 !important;
  margin-top: 0 !important;
  margin-bottom: 12px !important;
  font-weight: 700 !important;
}

/* Цвет заголовка для ТЁМНОЙ темы */
:root.dark .brand-card h3 {
  color: #EAEAEB !important; /* Почти белый для лучшего контраста на тёмном фоне */
}

/* Стили текста */
.brand-card p {
  color: #c7c7c7 !important; /* Светло-серый текст, хорошо читается на тёмном фоне карточки */
  font-size: 13px !important;
  line-height: 1.6 !important;
  margin: 0 !important;
}

.brand-card p strong {
    color: #e0e0e0; /* Делаем "Цели" немного ярче */
}

/* Удаляем медиа-запрос, так как слайдер адаптируется сам */
</style>
