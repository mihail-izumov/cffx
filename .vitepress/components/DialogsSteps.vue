<template>
  <div class="anna-brands-container">
    <!-- ЭТАП 1 -->
    <div class="anna-brand-card anna-step-card">
      <div class="anna-tariff-badge anna-step">ЖАЛОБА</div>
      <h3 class="anna-title">Гость жалуется</h3>
      <p class="anna-description-main">Гость сканирует QR-код. Умная форма «Опишите проблему» → Анна уточняет детали.</p>
      <p class="anna-description-goals anna-step-goals">Чёткая причина жалобы</p>
    </div>
    
    <!-- ЭТАП 2 -->
    <div class="anna-brand-card anna-step-card">
      <div class="anna-tariff-badge anna-step">РЕШЕНИЕ</div>
      <h3 class="anna-title">Поиск лучшего решения</h3>
      <p class="anna-description-main">Анна принимает негатив, уточняет детали, формирует подготовленный тикет и отправляет в Телеграм менеджеру.</p>
      <p class="anna-description-goals anna-step-goals">Вместо бонуса или подарка</p>
    </div>
    
    <!-- ЭТАП 3 -->
    <div class="anna-brand-card anna-step-card">
      <div class="anna-tariff-badge anna-step">РЕЗУЛЬТАТ</div>
      <h3 class="anna-title">Доставка результата</h3>
      <p class="anna-description-main">Push-уведомление от Анны: «Проблема решена, получите результат, оцените пользу». Фиксирует контекст обратной связи, закрывает тикет.</p>
      <p class="anna-description-goals anna-step-goals">Метрики Сигнала + NPS</p>
    </div>
    
    <!-- ЭТАП 4 -->
    <div class="anna-brand-card anna-step-card">
      <div class="anna-tariff-badge anna-step">ВОЗВРАТ</div>
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
  flex: 0 0 300px !important;
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

/* Стили для бейджей - ЛАЙМОВЫЙ ФОН */
.anna-tariff-badge {
  display: inline-block !important;
  padding: 2px 8px !important;
  border-radius: 4px !important;
  font-size: 9px !important;
  font-weight: 600 !important;
  text-transform: uppercase !important;
  letter-spacing: 0.3px !important;
  margin-bottom: 6px !important;
  width: fit-content !important;
  border: none !important;
}

.anna-step {
  background-color: #C5F946 !important; /* Лаймовый фон */
  color: #2d3d2d !important; /* Темно-зеленый текст */
}

/* Заголовки */
.anna-title {
  font-size: 15px !important;
  line-height: 1.4 !important;
  margin-top: 0 !important;
  margin-bottom: 8px !important;
  font-weight: 700 !important;
  border: none !important;
  padding: 0 !important;
  color: #2c3e2c !important;
}

:root.dark .anna-title {
  color: #ffffff !important;
}

.anna-description-main {
  color: #4a5a4a !important;
  font-size: 15px !important;
  line-height: 1.6 !important;
  margin: 0 0 4px 0 !important;
  flex-grow: 1 !important;
}

:root.dark .anna-description-main {
  color: #f0f0f0 !important;
}

/* Цели с увеличенным размером и средней жирностью */
.anna-step-goals {
  color: #347b6c !important;
  font-size: 14px !important;
  font-weight: 500 !important;
  line-height: 1.6 !important;
  margin: 0 !important;
}

/* ТЕМНАЯ ТЕМА - цели */
:root.dark .anna-step-goals {
  color: #C5F946 !important;
}
</style>
