<template>
  <div class="steps-brands-container">
    <!-- ШАГ 1 -->
    <div class="steps-brand-card steps-step1-card">
      <div class="steps-tariff-badge steps-step1">ШАГ 1</div>
      <h3 class="steps-title">Отправьте Сигнал</h3>
      <p class="steps-description-main">Наша умная форма поможет за 30 секунд изложить свои мысли и предложения</p>
      <p class="steps-description-goals steps-step1-goals">Ничего лишнего — только суть</p>
    </div>
    
    <!-- ШАГ 2 -->
    <div class="steps-brand-card steps-step2-card">
      <div class="steps-tariff-badge steps-step2">ШАГ 2</div>
      <h3 class="steps-title">Получите поддержку</h3>
      <p class="steps-description-main">ИИ-ассистент Анна поможет сформировать запрос, так чтобы он был гарантированно услышан кофейней</p>
      <p class="steps-description-goals steps-step2-goals">Превращает ваши эмоции в действия</p>
    </div>
    
    <!-- ШАГ 3 -->
    <div class="steps-brand-card steps-step3-card">
      <div class="steps-tariff-badge steps-step3">ШАГ 3</div>
      <h3 class="steps-title">Запустите Процесс</h3>
      <p class="steps-description-main">Ваш Сигнал немедленно поступает в работу менеджеру нужной кофейни</p>
      <p class="steps-description-goals steps-step3-goals">Мы гарантируем, что вы получите ответ</p>
    </div>
    
    <!-- ШАГ 4 -->
    <div class="steps-brand-card steps-step4-card">
      <div class="steps-tariff-badge steps-step4">ШАГ 4</div>
      <h3 class="steps-title">Получите Результат</h3>
      <p class="steps-description-main">Анна отправит вам результат в Телеграм-чат, когда разбор будет закончен</p>
      <p class="steps-description-goals steps-step4-goals">Не просто ответ, а результат</p>
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
.steps-step1-card {
  background-color: #f8f6f9 !important;
  border-color: #e0dde5 !important;
  border-top-color: #9A60A9 !important;
}

.steps-step2-card {
  background-color: #f6f9f8 !important;
  border-color: #dde5e0 !important;
  border-top-color: #60A994 !important;
}

.steps-step3-card {
  background-color: #f9f8f6 !important;
  border-color: #e5e2dd !important;
  border-top-color: #A98E60 !important;
}

.steps-step4-card {
  background-color: #f6f8fa !important;
  border-color: #dde3e8 !important;
  border-top-color: #4A72A0 !important;
}

/* ТЕМНАЯ ТЕМА - карточки темные */
:root.dark .steps-step1-card {
  background-color: #2B272B !important;
  border-color: #383336 !important;
  border-top-color: #9A60A9 !important;
}

:root.dark .steps-step2-card {
  background-color: #272B2A !important;
  border-color: #333836 !important;
  border-top-color: #60A994 !important;
}

:root.dark .steps-step3-card {
  background-color: #2B2A27 !important;
  border-color: #383633 !important;
  border-top-color: #A98E60 !important;
}

:root.dark .steps-step4-card {
  background-color: #252830 !important;
  border-color: #323544 !important;
  border-top-color: #4A72A0 !important;
}

/* Стили для бейджей */
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

.steps-step1 {
  background-color: rgba(154, 96, 169, 0.25) !important;
  color: #9A60A9 !important;
}

.steps-step2 {
  background-color: rgba(96, 169, 148, 0.25) !important;
  color: #60A994 !important;
}

.steps-step3 {
  background-color: rgba(169, 142, 96, 0.25) !important;
  color: #8b7348 !important;
}

.steps-step4 {
  background-color: rgba(74, 114, 160, 0.25) !important;
  color: #4A72A0 !important;
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

/* Цели с увеличенным размером и средней жирностью */
.steps-step1-goals {
  color: #7a5a9a !important;
  font-size: 14px !important; /* Увеличен размер */
  font-weight: 500 !important; /* Средняя жирность */
  line-height: 1.6 !important;
  margin: 0 !important;
}

.steps-step2-goals {
  color: #5a7a6a !important;
  font-size: 14px !important; /* Увеличен размер */
  font-weight: 500 !important; /* Средняя жирность */
  line-height: 1.6 !important;
  margin: 0 !important;
}

.steps-step3-goals {
  color: #7a6e5a !important;
  font-size: 14px !important; /* Увеличен размер */
  font-weight: 500 !important; /* Средняя жирность */
  line-height: 1.6 !important;
  margin: 0 !important;
}

.steps-step4-goals {
  color: #5a6a9a !important;
  font-size: 14px !important; /* Увеличен размер */
  font-weight: 500 !important; /* Средняя жирность */
  line-height: 1.6 !important;
  margin: 0 !important;
}

/* ТЕМНАЯ ТЕМА - цели */
:root.dark .steps-step1-goals {
  color: #BD95BD !important;
}

:root.dark .steps-step2-goals {
  color: #95BDB3 !important;
}

:root.dark .steps-step3-goals {
  color: #BDB095 !important;
}

:root.dark .steps-step4-goals {
  color: #95a9bd !important;
}
</style>
