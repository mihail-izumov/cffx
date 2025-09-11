<template>
  <div class="benefits-brands-container">
    <!-- ВАС ПОНИМАЮТ -->
    <div class="benefits-brand-card benefits-understanding-card">
      <div class="benefits-emoji">🎯</div>
      <h3 class="benefits-title">Вас понимают</h3>
      <p class="benefits-description-main">Не нужно объяснять очевидные вещи — Анна схватывает с полуслова</p>
      <p class="benefits-description-goals benefits-understanding-goals">Схватывает с полуслова</p>
    </div>
    
    <!-- НИКАКИХ КОНФЛИКТОВ -->
    <div class="benefits-brand-card benefits-diplomatic-card">
      <div class="benefits-emoji">💬</div>
      <h3 class="benefits-title">Никаких конфликтов</h3>
      <p class="benefits-description-main">Анна общается с кофейнями дипломатично — только факты и решения</p>
      <p class="benefits-description-goals benefits-diplomatic-goals">Только факты и решения</p>
    </div>
    
    <!-- БЫСТРЫЙ РЕЗУЛЬТАТ -->
    <div class="benefits-brand-card benefits-speed-card">
      <div class="benefits-emoji">⚡</div>
      <h3 class="benefits-title">Быстрый результат</h3>
      <p class="benefits-description-main">24 часа от разговора с Анной до реальных изменений</p>
      <p class="benefits-description-goals benefits-speed-goals">24 часа до изменений</p>
    </div>
    
    <!-- ВИДИТЕ ВЛИЯНИЕ -->
    <div class="benefits-brand-card benefits-impact-card">
      <div class="benefits-emoji">👀</div>
      <h3 class="benefits-title">Видите влияние</h3>
      <p class="benefits-description-main">В Индексе Роста отображается, как ваши слова меняют место к лучшему</p>
      <p class="benefits-description-goals benefits-impact-goals">Ваши слова меняют место</p>
    </div>
    
    <!-- СТАНОВИТЕСЬ ПАРТНЁРОМ -->
    <div class="benefits-brand-card benefits-partner-card">
      <div class="benefits-emoji">🏆</div>
      <h3 class="benefits-title">Становитесь партнёром</h3>
      <p class="benefits-description-main">Кофейни благодарят вас за помощь — вы больше не просто гость, а соавтор улучшений</p>
      <p class="benefits-description-goals benefits-partner-goals">Вы больше не просто гость</p>
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

/* СВЕТЛАЯ ТЕМА - карточки с новыми цветами */
.benefits-understanding-card {
  background-color: #fdf7f0 !important; /* Оранжевый фон */
  border-color: #f4e6d7 !important;
  border-top-color: #f97316 !important; /* Оранжевый */
}

.benefits-diplomatic-card {
  background-color: #f0f9ff !important; /* Голубой фон */
  border-color: #e0f2fe !important;
  border-top-color: #0ea5e9 !important; /* Голубой */
}

.benefits-speed-card {
  background-color: #fefce8 !important; /* Желтый фон */
  border-color: #fef3c7 !important;
  border-top-color: #eab308 !important; /* Желтый */
}

.benefits-impact-card {
  background-color: #fdf2f8 !important; /* Розовый фон */
  border-color: #fce7f3 !important;
  border-top-color: #ec4899 !important; /* Розовый */
}

.benefits-partner-card {
  background-color: #fffbeb !important; /* Золотой фон */
  border-color: #fef3c7 !important;
  border-top-color: #f59e0b !important; /* Золотой */
}

/* ТЕМНАЯ ТЕМА - карточки темные */
:root.dark .benefits-understanding-card {
  background-color: #2c1810 !important;
  border-color: #3c2415 !important;
  border-top-color: #f97316 !important;
}

:root.dark .benefits-diplomatic-card {
  background-color: #0c1629 !important;
  border-color: #1e293b !important;
  border-top-color: #0ea5e9 !important;
}

:root.dark .benefits-speed-card {
  background-color: #2a2817 !important;
  border-color: #3f3f1e !important;
  border-top-color: #eab308 !important;
}

:root.dark .benefits-impact-card {
  background-color: #2d1b2e !important;
  border-color: #3f2844 !important;
  border-top-color: #ec4899 !important;
}

:root.dark .benefits-partner-card {
  background-color: #2c2312 !important;
  border-color: #3c321a !important;
  border-top-color: #f59e0b !important;
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

/* Цветные подписи с увеличенным размером и средней жирностью */
.benefits-understanding-goals {
  color: #c2410c !important; /* Темно-оранжевый */
  font-size: 14px !important;
  font-weight: 500 !important;
  line-height: 1.6 !important;
  margin: 0 !important;
}

.benefits-diplomatic-goals {
  color: #0369a1 !important; /* Темно-голубой */
  font-size: 14px !important;
  font-weight: 500 !important;
  line-height: 1.6 !important;
  margin: 0 !important;
}

.benefits-speed-goals {
  color: #a16207 !important; /* Темно-желтый */
  font-size: 14px !important;
  font-weight: 500 !important;
  line-height: 1.6 !important;
  margin: 0 !important;
}

.benefits-impact-goals {
  color: #be185d !important; /* Темно-розовый */
  font-size: 14px !important;
  font-weight: 500 !important;
  line-height: 1.6 !important;
  margin: 0 !important;
}

.benefits-partner-goals {
  color: #d97706 !important; /* Темно-золотой */
  font-size: 14px !important;
  font-weight: 500 !important;
  line-height: 1.6 !important;
  margin: 0 !important;
}

/* ТЕМНАЯ ТЕМА - цветные подписи */
:root.dark .benefits-understanding-goals {
  color: #fb923c !important; /* Светло-оранжевый */
}

:root.dark .benefits-diplomatic-goals {
  color: #38bdf8 !important; /* Светло-голубой */
}

:root.dark .benefits-speed-goals {
  color: #facc15 !important; /* Светло-желтый */
}

:root.dark .benefits-impact-goals {
  color: #f472b6 !important; /* Светло-розовый */
}

:root.dark .benefits-partner-goals {
  color: #fbbf24 !important; /* Светло-золотой */
}
</style>
