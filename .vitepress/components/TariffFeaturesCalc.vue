<template>
  <div class="brands-container">
    <!-- ФУНКЦИИ ТАРИФА: Новый Лидер -->
    
    <div class="brand-card leader-card">
      <div class="tariff-badge leader">Новый Лидер</div>
      <h3>Персональные сессии с аналитиком BREW</h3>
      <p class="description-main">Отслеживайте прогресс на 90 мин./мес. стратегических сессиях</p>
      <p class="description-goals">Оценка метрик, точки роста, сигналы коррекции</p>
    </div>
    
    <div class="brand-card leader-card">
      <div class="tariff-badge leader">Новый Лидер</div>
      <h3>Темный Режим</h3>
      <p class="description-main">Находите то, что упускают 90% игроков</p>
      <p class="description-goals">Скрытые срезы: паттерны и тренды, невидимые для рынка</p>
    </div>

    <!-- ФУНКЦИИ ТАРИФА: Инсайдер -->
    <div class="brand-card insider-card">
      <div class="tariff-badge insider">Инсайдер</div>
      <h3>Ваша кофейня VS Рынок в реальном времени</h3>
      <p class="description-main">Отследить, где конкуренты зарабатывают ваши деньги</p>
      <p class="description-goals">1 раз/мес. анализ отзывов и сравнение с конкурентами</p>
    </div>
    
    <div class="brand-card insider-card">
      <div class="tariff-badge insider">Инсайдер</div>
      <h3><a href="/radar/overview" target="_blank">Индекс Роста</a>: сигналы изменений</h3>
      <p class="description-main">Получайте уведомления о движениях рынка</p>
      <p class="description-goals">Тренды, сдвиги в поведении гостей, новые возможности</p>
    </div>

    <!-- ФУНКЦИИ ТАРИФА: Симулятор -->
    <div class="brand-card simulator-card">
      <div class="tariff-badge simulator">Симулятор</div>
      <h3>Аналитика и разборы</h3>
      <p class="description-main">Используйте опыт тысяч кофеен для роста без потерь</p>
      <p class="description-goals">Цифровая копия кофейного рынка РФ</p>
    </div>
    
    <div class="brand-card simulator-card">
      <div class="tariff-badge simulator">Симулятор</div>
      <h3>Готовые диалоги для быстрого старта</h3>
      <p class="description-main">Начинайте работу с проверенными сценариями</p>
      <p class="description-goals">Базовые диалоги для анализа конкретных задач</p>
    </div>
    
    <div class="brand-card simulator-card">
      <div class="tariff-badge simulator">Симулятор</div>
      <h3>Клонировать успех лидеров рынка</h3>
      <p class="description-main">Применяйте лучший опыт для своего роста</p>
      <p class="description-goals">Формулы успеха: культ бренда, ценовое доминирование</p>
    </div>
    
    <div class="brand-card simulator-card">
      <div class="tariff-badge simulator">Симулятор</div>
      <h3>ИИ-ассистент <a href="/radar/who-is-anna" target="_blank">Анна</a></h3>
      <p class="description-main">Персональный навигатор по платформе</p>
      <p class="description-goals">Базовые рекомендации для работы с BREW</p>
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
}

/* СВЕТЛАЯ ТЕМА - карточки светлые */
.insider-card {
  background-color: #f8f9f8 !important;
  border-color: #e0e5e0 !important;
  border-top-color: #60A994 !important;
}

.simulator-card {
  background-color: #f9f8f6 !important;
  border-color: #e5e2dd !important;
  border-top-color: #A98E60 !important;
}

.leader-card {
  background-color: #f6f8fa !important;
  border-color: #dde3e8 !important;
  border-top-color: #4A72A0 !important;
}

/* ТЕМНАЯ ТЕМА - карточки темные */
.dark .insider-card {
  background-color: #272B2A !important;
  border-color: #333836 !important;
  border-top-color: #60A994 !important;
}

.dark .simulator-card {
  background-color: #2B2A27 !important;
  border-color: #383633 !important;
  border-top-color: #A98E60 !important;
}

.dark .leader-card {
  background-color: #252830 !important;
  border-color: #323544 !important;
  border-top-color: #4A72A0 !important;
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

.tariff-badge.insider {
  background-color: rgba(197, 249, 70, 0.18);
  color: #8db038;
}

.tariff-badge.simulator {
  background-color: rgba(169, 142, 96, 0.25);
  color: #8b7348;
}

.tariff-badge.leader {
  background-color: rgba(100, 149, 237, 0.25);
  color: #4169E1;
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

.insider-card .description-goals {
  color: #5a7a6a !important;
  font-size: 12px;
  line-height: 1.6;
  margin: 0;
}

.simulator-card .description-goals {
  color: #7a6e5a !important;
  font-size: 12px;
  line-height: 1.6;
  margin: 0;
}

.leader-card .description-goals {
  color: #5a6a9a !important;
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

.dark .insider-card .description-goals {
  color: #95BDB3 !important;
}

.dark .simulator-card .description-goals {
  color: #BDB095 !important;
}

.dark .leader-card .description-goals {
  color: #95a9bd !important;
}
</style>
