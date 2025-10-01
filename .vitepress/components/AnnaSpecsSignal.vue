<template>
  <div class="anna-brands-container">
    <!-- ХАРАКТЕР -->
    <div class="anna-brand-card anna-step-card">
      <h3 class="anna-title">Понимает с полуслова</h3>
      <p class="anna-description-main">Не судит и не критикует. Скажите «здесь паршиво» — она поймёт, что именно вас беспокоит</p>
      <p class="anna-description-goals anna-step-goals">Не требует больших объяснений</p>
    </div>
    
    <!-- НАВЫКИ -->
    <div class="anna-brand-card anna-step-card">
      <h3 class="anna-title">Говорит языком решений</h3>
      <p class="anna-description-main">Ваше «бесит медленное обслуживание» Анна переводит в «оптимизировать время подачи заказов»</p>
      <p class="anna-description-goals anna-step-goals">Кофейни слушают Анну</p>
    </div>
    
    <!-- СВЯЗИ -->
    <div class="anna-brand-card anna-step-card">
      <h3 class="anna-title">Знает, к кому обратиться</h3>
      <p class="anna-description-main">Доставляет ваш Сигнал именно тому, кто может всё изменить</p>
      <p class="anna-description-goals anna-step-goals">Прямая линия с каждым управляющим</p>
    </div>
    
    <!-- ПАМЯТЬ -->
    <div class="anna-brand-card anna-step-card">
      <h3 class="anna-title">Следит за результатом</h3>
      <p class="anna-description-main">Помнит каждый ваш сигнал и отслеживает, что с ним происходит</p>
      <p class="anna-description-goals anna-step-goals">Присылает уведомления, когда всё готово</p>
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

/* Основной текст */
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
