<template>
  <div class="analysis-brands-container">
    <div class="analysis-brand-card analysis-coffee-brand">
      <div class="analysis-brand-content">
        <h3>Skuratov</h3>
        <p class="analysis-description-main">Формула «скорости» и пределы роста для «качества»</p>
        <p class="analysis-description-goals">Формула успеха, Рост без потерь</p>
      </div>
    </div>
    <div class="analysis-brand-card analysis-coffee-brand">
      <div class="analysis-brand-content">
        <h3>Корж</h3>
        <p class="analysis-description-main">Масштабировать уют без потери магии бренда</p>
        <p class="analysis-description-goals">Создать культ бренда, Доминировать по цене</p>
      </div>
    </div>
    <div class="analysis-brand-card analysis-coffee-brand">
      <div class="analysis-brand-content">
        <h3>Surf Coffee</h3>
        <p class="analysis-description-main">Масштабирование на формуле «атмосферы»</p>
        <p class="analysis-description-goals">Ядро бренда, Рост без потерь</p>
      </div>
    </div>
    <div class="analysis-brand-card analysis-coffee-brand">
      <div class="analysis-brand-content">
        <h3>Green House</h3>
        <p class="analysis-description-main">Региональное доминирование и риски экспансии</p>
        <p class="analysis-description-goals">Формула успеха, Ключевые элементы, Адаптация</p>
      </div>
    </div>
    <div class="analysis-brand-card analysis-special-brand">
      <div class="analysis-brand-content">
        <h3>Вашей кофейни здесь нет?</h3>
        <p class="analysis-description-goals"><a href="/invest/smr">Смотреть Индекс Роста →</a></p>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Контейнер для горизонтальной прокрутки */
.analysis-brands-container {
  display: flex !important;
  overflow-x: auto !important;
  gap: 12px !important;
  padding: 4px 0 12px 4px !important;
  margin: 24px 0 !important;
}

/* Стилизация скроллбара */
.analysis-brands-container::-webkit-scrollbar {
  height: 6px;
}

.analysis-brands-container::-webkit-scrollbar-thumb {
  background-color: var(--vp-c-divider);
  border-radius: 3px;
}

/* КАРТОЧКА С ВИДИМОЙ ЗЕЛЕНОЙ ОБВОДКОЙ */
.analysis-brand-card {
  flex: 0 0 260px;
  border-radius: 22px !important;
  overflow: hidden;
  padding: 0 !important;
  background: var(--vp-c-bg-soft) !important;
  /* ВИДИМАЯ ЗЕЛЕНАЯ ОБВОДКА */
  border: 2px solid rgba(16, 185, 129, 0.6) !important;
  box-shadow: 0 0 8px 1px rgba(16, 185, 129, 0.3) !important;
}

/* Цветовые схемы */
.analysis-coffee-brand {
  --analysis-glow-color: rgba(16, 185, 129, 0.25);
  --analysis-border-color: rgba(16, 185, 129, 0.6);
  --analysis-shadow-color: rgba(16, 185, 129, 0.3);
}

.analysis-special-brand {
  --analysis-glow-color: rgba(197, 249, 70, 0.25);
  --analysis-border-color: rgba(197, 249, 70, 0.7);
  --analysis-shadow-color: rgba(197, 249, 70, 0.4);
  border-color: var(--analysis-border-color) !important;
  box-shadow: 0 0 8px 1px var(--analysis-shadow-color) !important;
}

/* ЗЕЛЕНОЕ ПОЛЕ НА ВСЮ КАРТОЧКУ */
.analysis-brand-content {
  background: radial-gradient(circle at 50% 0%, var(--analysis-glow-color) 0%, transparent 70%);
  border-radius: 20px !important;
  padding: 20px 16px !important;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100% !important;
  height: 100% !important;
  min-height: 160px;
  text-align: left;
  box-shadow: 0 10px 25px -10px rgba(0,0,0,0.3) !important;
  position: relative;
  z-index: 2;
  box-sizing: border-box !important;
}

/* --- СТИЛИ ЗАГОЛОВКА --- */
.analysis-brand-card h3 {
  color: #ffffff !important;
  font-size: 16px !important;
  line-height: 1.4 !important;
  margin-top: 0 !important;
  margin-bottom: 8px !important;
  font-weight: 700 !important;
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}

/* --- СТИЛИ ТЕКСТА --- */
.analysis-description-main {
  color: rgba(255, 255, 255, 0.9) !important;
  font-size: 14px !important;
  line-height: 1.6 !important;
  margin: 0 0 4px 0 !important;
}

/* ПРИГЛУШЕННЫЙ ЗЕЛЕНЫЙ ТЕКСТ */
.analysis-description-goals {
  color: #a7f3d0 !important;
  font-size: 13px !important;
  line-height: 1.6 !important;
  margin: 0 !important;
  font-weight: 500 !important;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3) !important;
  letter-spacing: 0.02em !important;
}

.analysis-description-goals strong {
  font-weight: 600;
  color: #86efac !important;
}

/* Стиль для ссылки */
.analysis-brand-card .analysis-description-goals a {
  color: #6ee7b7 !important;
  text-decoration: none;
  font-weight: 600 !important;
  transition: all 0.3s ease;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.4) !important;
}

.analysis-brand-card .analysis-description-goals a:hover {
  color: #34d399 !important;
  text-shadow: 0 0 8px rgba(52, 211, 153, 0.4) !important;
}

/* В темной теме */
:root.dark .analysis-brand-card {
  background: var(--vp-c-bg-soft) !important;
}
</style>
