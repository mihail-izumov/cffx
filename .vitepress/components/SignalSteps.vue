<template>
  <div class="brands-container">
    <!-- ШАГ 1 -->
    <div class="brand-card simulator-card">
      <div class="tariff-badge simulator">ШАГ 1</div>
      <h3>Отправьте Сигнал</h3>
      <p class="description-main">Наша продуманная форма поможет вам четко изложить свои мысли и предложения.</p>
      <p class="description-goals">Ничего лишнего — только суть.</p>
    </div>
    
    <!-- ШАГ 2 -->
    <div class="brand-card simulator-card">
      <div class="tariff-badge simulator">ШАГ 2</div>
      <h3>Получите поддержку Анны</h3>
      <p class="description-main">ИИ-ассистент Анна поможет сформировать запрос, так чтобы он был гарантированно услышан кофейней.</p>
      <p class="description-goals">Точные действия – гарантия результата.</p>
    </div>
    
    <!-- ШАГ 3 -->
    <div class="brand-card simulator-card">
      <div class="tariff-badge simulator">ШАГ 3</div>
      <h3>Запустите Процесс</h3>
      <p class="description-main">Ваш сигнал немедленно поступает в работу менеджеру нужной кофейни.</p>
      <p class="description-goals">Мы гарантируем, что вы получите ответ.</p>
    </div>
    
    <!-- ШАГ 4 -->
    <div class="brand-card simulator-card">
      <div class="tariff-badge simulator">ШАГ 4</div>
      <h3>Получите Результат</h3>
      <p class="description-main">Следите за статусом сигнала в реальном времени в Индексе Роста. Анна отправит вам результат, когда разбор будет закончен.</p>
      <p class="description-goals">Ваш вклад — нагляден и измерим.</p>
    </div>
  </div>
</template>
<style scoped>
.brands-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  padding: 4px 0 12px 0;
  margin: 24px 0;
}
/* Мобильная адаптивность - на узких экранах делаем 1 колонку */
@media (max-width: 768px) {
  .brands-container {
    grid-template-columns: 1fr;
  }
}
.brand-card {
  border-radius: 12px;
  padding: 20px 16px;
  display: flex;
  flex-direction: column;
  border-style: solid;
  border-width: 1px;
  border-top-width: 4px;
  position: relative;
  /* Убрали все анимации и hover эффекты */
}

/* СВЕТЛАЯ ТЕМА - карточки светлые */
.simulator-card {
  background-color: #f9f8f6 !important;
  border-color: #e5e2dd !important;
  border-top-color: #7fb842 !important; /* Зеленый вместо желтого */
}
/* ТЕМНАЯ ТЕМА - карточки темные */
.dark .simulator-card {
  background-color: #2B2A27 !important;
  border-color: #383633 !important;
  border-top-color: #c8ff5a !important; /* Ярко-зеленый вместо желтого */
}
/* Стили для бейджей тарифов */
.tariff-badge {
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
.tariff-badge.simulator {
  background-color: rgba(200, 255, 90, 0.25); /* Зеленый фон */
  color: #5a7c3a; /* Зеленый текст */
}

.dark .tariff-badge.simulator {
  background-color: rgba(200, 255, 90, 0.15);
  color: #c8ff5a;
}

/* Заголовки */
.brand-card h3 {
  font-size: 15px;
  line-height: 1.4;
  margin-top: 0;
  margin-bottom: 8px;
  font-weight: 700;
  border: none;
  padding: 0;
}
/* СВЕТЛАЯ ТЕМА - текст темный */
.brand-card h3 {
  color: #2c3e2c !important;
}
.description-main {
  color: #4a5a4a !important;
  font-size: 15px !important;
  line-height: 1.6;
  margin: 0 0 4px 0;
  flex-grow: 1;
}
.simulator-card .description-goals {
  color: #5a7c3a !important; /* Зеленый вместо коричневого */
  font-size: 12px;
  line-height: 1.6;
  margin: 0;
}
/* ТЕМНАЯ ТЕМА - текст светлый */
.dark .brand-card h3 {
  color: #ffffff !important;
}
.dark .description-main {
  color: #f0f0f0 !important;
}
.dark .simulator-card .description-goals {
  color: #a8d472 !important; /* Приглушенный зеленый */
}
</style>
