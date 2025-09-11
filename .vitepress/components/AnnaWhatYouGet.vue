<template>
  <div class="benefits-brands-container">    
    <!-- НИКАКИХ КОНФЛИКТОВ -->
    <div class="benefits-brand-card benefits-diplomatic-card">
      <div class="benefits-emoji">💬</div>
      <h3 class="benefits-title">Никаких конфликтов</h3>
      <p class="benefits-description-main">Переводит эмоции в конструктивные предложения</p>
      <p class="benefits-description-goals benefits-diplomatic-goals">Только факты и решения</p>
    </div>
    
    <!-- БЫСТРЫЙ РЕЗУЛЬТАТ -->
    <div class="benefits-brand-card benefits-speed-card">
      <div class="benefits-emoji">⚡</div>
      <h3 class="benefits-title">Быстрый результат</h3>
      <p class="benefits-description-main">24 часа от Сигнала до реальных изменений</p>
      <p class="benefits-description-goals benefits-speed-goals">Прямая линия с ответственным менеджерам</p>
    </div>
    
    <!-- ВИДИТЕ ВЛИЯНИЕ -->
    <div class="benefits-brand-card benefits-impact-card">
      <div class="benefits-emoji">👀</div>
      <h3 class="benefits-title">Видите влияние</h3>
      <p class="benefits-description-main">В Индексе Роста отображается, как ваши слова меняют место к лучшему</p>
      <p class="benefits-description-goals benefits-impact-goals">Публичная метрика в реальном времени</p>
    </div>
    
    <!-- СТАНОВИТЕСЬ ПАРТНЁРОМ -->
    <div class="benefits-brand-card benefits-partner-card">
      <div class="benefits-emoji">🏆</div>
      <h3 class="benefits-title">Становитесь партнёром</h3>
      <p class="benefits-description-main">Кофейни благодарят вас за помощь — вы больше не просто гость, а соавтор улучшений</p>
      <p class="benefits-description-goals benefits-partner-goals">Совместное развитие благодаря Сигналу</p>
    </div>
  </div>
</template>

<style scoped>
/* ВСЕ СТИЛИ ПОЛНОСТЬЮ ИЗОЛИРОВАНЫ С УНИКАЛЬНЫМИ КЛАССАМИ */

/* Контейнер для горизонтальной прокрутки */
.benefits-brands-container {
  display: flex !important;
  overflow-x: auto !important;
  gap: 16px !important;
  padding: 4px 0 12px 4px !important;
  margin: 24px 0 !important;
}

/* Стилизация скроллбара */
.benefits-brands-container::-webkit-scrollbar {
  height: 6px;
}

.benefits-brands-container::-webkit-scrollbar-thumb {
  background-color: var(--vp-c-divider);
  border-radius: 3px;
}

.benefits-brand-card {
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

/* СВЕТЛАЯ ТЕМА - приглушенные цвета в стиле страницы */
.benefits-diplomatic-card {
  background-color: #f0f9ff !important; /* Голубой фон */
  border-color: #dbeafe !important;
  border-top-color: #3b82f6 !important; /* Синий */
}

.benefits-speed-card {
  background-color: #f9f8f6 !important; /* Приглушенный бежевый */
  border-color: #e5e2dd !important;
  border-top-color: #92400e !important; /* Приглушенный коричневый */
}

.benefits-impact-card {
  background-color: #f8f6f9 !important; /* Приглушенный сиреневый */
  border-color: #e0dde5 !important;
  border-top-color: #7c3aed !important; /* Приглушенный фиолетовый */
}

.benefits-partner-card {
  background-color: #f6f9f8 !important; /* Приглушенный зеленоватый */
  border-color: #dde5e0 !important;
  border-top-color: #059669 !important; /* Приглушенный зеленый */
}

/* ТЕМНАЯ ТЕМА - карточки темные */
:root.dark .benefits-diplomatic-card {
  background-color: #1e293b !important; /* Темно-голубой */
  border-color: #334155 !important;
  border-top-color: #60a5fa !important; /* Светло-синий */
}

:root.dark .benefits-speed-card {
  background-color: #2B2A27 !important;
  border-color: #383633 !important;
  border-top-color: #d97706 !important;
}

:root.dark .benefits-impact-card {
  background-color: #2B272B !important;
  border-color: #383336 !important;
  border-top-color: #a78bfa !important;
}

:root.dark .benefits-partner-card {
  background-color: #272B2A !important;
  border-color: #333836 !important;
  border-top-color: #10b981 !important;
}

/* Стили для эмодзи вместо бейджей */
.benefits-emoji {
  font-size: 24px !important;
  margin-bottom: 8px !important;
  display: inline-block !important;
}

/* Заголовки */
.benefits-title {
  font-size: 15px !important;
  line-height: 1.4 !important;
  margin-top: 0 !important;
  margin-bottom: 8px !important;
  font-weight: 700 !important;
  border: none !important;
  padding: 0 !important;
  color: #2c3e2c !important;
}

:root.dark .benefits-title {
  color: #ffffff !important;
}

.benefits-description-main {
  color: #4a5a4a !important;
  font-size: 15px !important;
  line-height: 1.6 !important;
  margin: 0 0 4px 0 !important;
  flex-grow: 1 !important;
}

:root.dark .benefits-description-main {
  color: #f0f0f0 !important;
}

/* Цветные подписи - приглушенные цвета */
.benefits-diplomatic-goals {
  color: #1d4ed8 !important; /* Синий */
  font-size: 14px !important;
  font-weight: 500 !important;
  line-height: 1.6 !important;
  margin: 0 !important;
}

.benefits-speed-goals {
  color: #92400e !important; /* Приглушенный коричневый */
  font-size: 14px !important;
  font-weight: 500 !important;
  line-height: 1.6 !important;
  margin: 0 !important;
}

.benefits-impact-goals {
  color: #6d28d9 !important; /* Приглушенный фиолетовый */
  font-size: 14px !important;
  font-weight: 500 !important;
  line-height: 1.6 !important;
  margin: 0 !important;
}

.benefits-partner-goals {
  color: #047857 !important; /* Приглушенный зеленый */
  font-size: 14px !important;
  font-weight: 500 !important;
  line-height: 1.6 !important;
  margin: 0 !important;
}

/* ТЕМНАЯ ТЕМА - цветные подписи */
:root.dark .benefits-diplomatic-goals {
  color: #93c5fd !important; /* Светло-синий */
}

:root.dark .benefits-speed-goals {
  color: #fbbf24 !important; /* Светло-коричневый */
}

:root.dark .benefits-impact-goals {
  color: #c4b5fd !important; /* Светло-фиолетовый */
}

:root.dark .benefits-partner-goals {
  color: #6ee7b7 !important; /* Светло-зеленый */
}
</style>
