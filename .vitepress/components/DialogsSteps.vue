<template>
  <div class="anna-brands-container">
    <!-- ЭТАП 1 -->
    <div class="anna-brand-card anna-step-card">
      <div class="anna-tariff-badge anna-step">ЭТАП 1</div>
      <h3 class="anna-title">Гость жалуется</h3>
      <p class="anna-description-main">Гость сканирует QR-код. Умная форма «Опишите проблему» → Анна уточняет детали.</p>
      <p class="anna-description-goals anna-step-goals">Чёткая причина жалобы</p>
    </div>
    
    <!-- ЭТАП 2 -->
    <div class="anna-brand-card anna-step-card">
      <div class="anna-tariff-badge anna-step">ЭТАП 2</div>
      <h3 class="anna-title">Поиск решения</h3>
      <p class="anna-description-main">Анна принимает негатив, уточняет детали и формирует подготовленный тикет. На базе регламента предлагает лучшее решение → Отправляет тикет в Телеграм менеджеру.</p>
      <p class="anna-description-goals anna-step-goals">Лучшее решение вместо бонуса или подарка</p>
    </div>
    
    <!-- ЭТАП 3 -->
    <div class="anna-brand-card anna-step-card">
      <div class="anna-tariff-badge anna-step">ЭТАП 3</div>
      <h3 class="anna-title">Доставка результата</h3>
      <p class="anna-description-main">Push-уведомление от Анны: «Проблема решена, получите результат, оцените пользу». Фиксирует контекст обратной связи, закрывает тикет, ведет статистику.</p>
      <p class="anna-description-goals anna-step-goals">Метрики Сигнала + NPS</p>
    </div>
    
    <!-- ЭТАП 4 -->
    <div class="anna-brand-card anna-step-card">
      <div class="anna-tariff-badge anna-step">ЭТАП 4</div>
      <h3 class="anna-title">Гость возвращается</h3>
      <p class="anna-description-main">Больше Сигналов каждый следующий визит. Предложения и конструктив вместо стандартного негатива.</p>
      <p class="anna-description-goals anna-step-goals">Рост LTV и среднего чека</p>
    </div>
  </div>
</template>

<style scoped>
/* ВСЕ СТИЛИ ПОЛНОСТЬЮ ИЗОЛИРОВАНЫ С УНИКАЛЬНЫМИ КЛАССАМИ */
/* Контейнер для горизонтальной прокрутки */
.anna-brands-container {
  display: flex !important;
  overflow-x: auto !important;
  gap: 16px !important;
  padding: 4px 0 12px 4px !important;
  margin: 24px 0 !important;
}

/* Стилизация скроллбара */
.anna-brands-container::-webkit-scrollbar {
  height: 6px;
}

.anna-brands-container::-webkit-scrollbar-thumb {
  background-color: var(--vp-c-divider);
  border-radius: 3px;
}

.anna-brand-card {
  flex: 0 0 320px !important; /* Увеличена ширина для длинного текста */
  border-radius: 12px !important;
  padding: 20px 16px !important;
  display: flex !important;
  flex-direction: column !important;
  border-style: solid !important;
  border-width: 1px !important;
  border-top-width: 4px !important;
  position: relative !important;
  min-height: 200px !important; /* Увеличена высота */
}

/* СВЕТЛАЯ ТЕМА - все карточки одинаковые с лаймовым акцентом */
.anna-step-card {
  background-color: #f8faf6 !important;
  border-color: #e0e5dd !important;
  border-top-color: #C5F946 !important;
}

/* ТЕМНАЯ ТЕМА - все карточки одинаковые с лаймовым акцентом */
:root.dark .anna-step-card {
  background-color: #272B27 !important;
  border-color: #333833 !important;
  border-top-color: #C5F946 !important;
}

/* Стили для бейджей */
.anna-tariff-badge {
  display: inline-block !important;
  padding: 2px 8px !important;
  border-radius: 4px !important;
  font-size: 10px !important;
  font-weight: 600 !important;
  text-transform: uppercase !important;
  letter-spacing: 0.3px !important;
  margin-bottom: 8px !important;
  width: fit-content !important;
  border: none !important;
}

.anna-step {
  background-color: rgba(197, 249, 70, 0.25) !important;
  color: #347b6c !important;
}

/* Заголовки */
.anna-title {
  font-size: 16px !important;
  line-height: 1.4 !important;
  margin-top: 0 !important;
  margin-bottom: 10px !important;
  font-weight: 700 !important;
  border: none !important;
  padding: 0 !important;
  color: #2c3e2c !important;
}

:root.dark .anna-title {
  color: #C5F946 !important;
}

.anna-description-main {
  color: #4a5a4a !important;
  font-size: 14px !important;
  line-height: 1.6 !important;
  margin: 0 0 6px 0 !important;
  flex-grow: 1 !important;
}

:root.dark .anna-description-main {
  color: #e0e0e0 !important;
}

/* Цели с лаймовым акцентом */
.anna-step-goals {
  color: #347b6c !important;
  font-size: 13px !important;
  font-weight: 600 !important;
  line-height: 1.6 !important;
  margin: 0 !important;
  padding-top: 4px !important;
  border-top: 1px solid rgba(197, 249, 70, 0.3) !important;
}

/* ТЕМНАЯ ТЕМА - цели */
:root.dark .anna-step-goals {
  color: #C5F946 !important;
  border-top-color: rgba(197, 249, 70, 0.3) !important;
}
</style>
