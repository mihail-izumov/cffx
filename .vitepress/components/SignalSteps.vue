<template>
  <div class="steps-brands-container">
    <!-- ШАГ 1 -->
    <div class="steps-card steps-simulator-card">
      <div class="steps-tariff-badge steps-simulator">ШАГ 1</div>
      <h3 class="steps-title">Отправьте Сигнал</h3>
      <p class="steps-description-main">Наша продуманная форма поможет вам четко изложить свои мысли и предложения.</p>
      <p class="steps-description-goals">Ничего лишнего — только суть.</p>
    </div>
    
    <!-- ШАГ 2 -->
    <div class="steps-card steps-simulator-card">
      <div class="steps-tariff-badge steps-simulator">ШАГ 2</div>
      <h3 class="steps-title">Получите поддержку Анны</h3>
      <p class="steps-description-main">ИИ-ассистент Анна поможет сформировать запрос, так чтобы он был гарантированно услышан кофейней.</p>
      <p class="steps-description-goals">Точные действия – гарантия результата.</p>
    </div>
    
    <!-- ШАГ 3 -->
    <div class="steps-card steps-simulator-card">
      <div class="steps-tariff-badge steps-simulator">ШАГ 3</div>
      <h3 class="steps-title">Запустите Процесс</h3>
      <p class="steps-description-main">Ваш сигнал немедленно поступает в работу менеджеру нужной кофейни.</p>
      <p class="steps-description-goals">Мы гарантируем, что вы получите ответ.</p>
    </div>
    
    <!-- ШАГ 4 -->
    <div class="steps-card steps-simulator-card">
      <div class="steps-tariff-badge steps-simulator">ШАГ 4</div>
      <h3 class="steps-title">Получите Результат</h3>
      <p class="steps-description-main">Следите за статусом сигнала в реальном времени в Индексе Роста. Анна отправит вам результат, когда разбор будет закончен.</p>
      <p class="steps-description-goals">Ваш вклад — нагляден и измерим.</p>
    </div>
  </div>
</template>
<style scoped>
/* CSS переменные для цветов */
:root {
  --steps-green-light: #7fb842;
  --steps-green-bright: #c8ff5a;
  --steps-green-text: #5a7c3a;
  --steps-green-muted: #a8d472;
  --steps-green-bg: rgba(200, 255, 90, 0.25);
  --steps-green-bg-dark: rgba(200, 255, 90, 0.15);
}

.steps-brands-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  padding: 4px 0 12px 0;
  margin: 24px 0;
}

/* Мобильная адаптивность */
@media (max-width: 768px) {
  .steps-brands-container {
    grid-template-columns: 1fr;
  }
}

.steps-card {
  border-radius: 12px;
  padding: 20px 16px;
  display: flex;
  flex-direction: column;
  border-style: solid;
  border-width: 1px;
  border-top-width: 4px;
  position: relative;
}

/* СВЕТЛАЯ ТЕМА */
.steps-simulator-card {
  background-color: #f9f8f6;
  border-color: #e5e2dd;
  border-top-color: var(--steps-green-light);
}

/* ТЕМНАЯ ТЕМА */
.dark .steps-simulator-card {
  background-color: #2B2A27;
  border-color: #383633;
  border-top-color: var(--steps-green-bright);
}

/* Бейджи */
.steps-tariff-badge {
  display: inline-block;
  padding: 1px 6px;
  border-radius: 4px;
  font-size: 9px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  margin-bottom: 6px;
  width: fit-content;
  border: none;
}

.steps-simulator {
  background-color: var(--steps-green-bg);
  color: var(--steps-green-text);
}

.dark .steps-simulator {
  background-color: var(--steps-green-bg-dark);
  color: var(--steps-green-bright);
}

/* Заголовки */
.steps-title {
  font-size: 15px;
  line-height: 1.4;
  margin-top: 0;
  margin-bottom: 8px;
  font-weight: 700;
  border: none;
  padding: 0;
  color: #2c3e2c;
}

.dark .steps-title {
  color: #ffffff;
}

/* Основное описание */
.steps-description-main {
  color: #4a5a4a;
  font-size: 15px;
  line-height: 1.6;
  margin: 0 0 4px 0;
  flex-grow: 1;
}

.dark .steps-description-main {
  color: #f0f0f0;
}

/* Цели */
.steps-description-goals {
  color: var(--steps-green-text);
  font-size: 12px;
  line-height: 1.6;
  margin: 0;
}

.dark .steps-description-goals {
  color: var(--steps-green-muted);
}
</style>
