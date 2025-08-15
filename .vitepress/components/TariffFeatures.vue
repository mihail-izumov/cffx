<template>
  <div class="brands-container">
    <!-- ФУНКЦИИ ТАРИФА: Инсайдер -->
    <div class="brand-card insider-card">
      <div class="tariff-badge insider">Инсайдер</div>
      <h3>Ежемесячный обзор рынка</h3>
      <p class="description-main">Стратегическая информация для точных решений.</p>
      <p class="description-goals">Глубокий отчет о ключевых трендах, изменениях в поведении потребителей и сдвигах в отрасли.</p>
    </div>
    
    <div class="brand-card insider-card">
      <div class="tariff-badge insider">Инсайдер</div>
      <h3>Доступ к Индексу Роста</h3>
      <p class="description-main">Отслеживайте динамику конкурентов и проверяйте бенчмарки по рынку.</p>
      <p class="description-goals">Объективная оценка эффективности кофейных компаний на основе 15 ключевых метрик на базе сотен тысяч очищенных отзывов.</p>
    </div>
    
    <div class="brand-card insider-card">
      <div class="tariff-badge insider">Инсайдер</div>
      <h3>Анализ компаний в фокусе</h3>
      <p class="description-main">Возможность учиться на чужом опыте и избегать типичных ловушек.</p>
      <p class="description-goals">Подробные кейсы успешных и провальных проектов с анализом ключевых факторов роста или падения.</p>
    </div>
    
    <div class="brand-card insider-card">
      <div class="tariff-badge insider">Инсайдер</div>
      <h3>Обновления симулятора</h3>
      <p class="description-main">Первый доступ к новым версиям и участие в тестировании новых возможностей.</p>
      <p class="description-goals">Регулярное добавление новых городов, локаций и функций.</p>
    </div>

    <!-- ФУНКЦИИ ТАРИФА: Симулятор -->
    <div class="brand-card simulator-card">
      <div class="tariff-badge simulator">Симулятор</div>
      <h3>Симулятор города</h3>
      <p class="description-main">Тестируйте гипотезы, анализируйте форматы и делайте прогнозы выручки без финансовых рисков.</p>
      <p class="description-goals">Цифровая копия реального города с точными данными о локациях, конкурентах и проходимости.</p>
    </div>
    
    <div class="brand-card simulator-card">
      <div class="tariff-badge simulator">Симулятор</div>
      <h3>Тестирование бизнес-моделей</h3>
      <p class="description-main">Оценивайте, какая модель принесет максимальную прибыль в конкретной локации.</p>
      <p class="description-goals">Проверка различных концепций: от классической кофейни до коворкинга с кофе.</p>
    </div>
    
    <div class="brand-card simulator-card">
      <div class="tariff-badge simulator">Симулятор</div>
      <h3>Доступ к Кофейному Протоколу</h3>
      <p class="description-main">Коллективный опыт сотен кофеен, структурированный для немедленного применения.</p>
      <p class="description-goals">Открытая живая база знаний с проверенными практиками: оборудование, поставщики, персонал, маркетинг.</p>
    </div>
    
    <div class="brand-card simulator-card">
      <div class="tariff-badge simulator">Симулятор</div>
      <h3>Поддержка Анны при старте</h3>
      <p class="description-main">Рекомендации по действиям для максимально эффективного старта.</p>
      <p class="description-goals">Персональная помощь ИИ-ассистента Анны по методологии B-R-E-W-</p>
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

/* Карточки Инсайдер - темно-зеленый стиль как на верхних карточках */
.insider-card {
  background-color: #272B2A !important;
  border-color: #333836 !important;
  border-top-color: #60A994 !important;
}

/* Карточки Симулятор - золотистый стиль */
.simulator-card {
  background-color: #2B2A27 !important;
  border-color: #383633 !important;
  border-top-color: #A98E60 !important;
}

/* Стили для бейджей тарифов */
.tariff-badge {
  display: inline-block;
  padding: 1px 6px; /* уменьшенные отступы сверху и снизу */
  border-radius: 4px;
  font-size: 9px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  margin-bottom: 6px;
  width: fit-content;
  border: none; /* убираем обводку */
}

.tariff-badge.insider {
  background-color: rgba(197, 249, 70, 0.18);
  color: #8db038;
}

.tariff-badge.simulator {
  background-color: rgba(169, 142, 96, 0.25);
  color: #8b7348;
}

.brand-card h3 {
  color: #ffffff !important;
  font-size: 15px;
  line-height: 1.4;
  margin-top: 0;
  margin-bottom: 8px;
  font-weight: 700;
  border: none;
  padding: 0;
}

.description-main {
  color: #f0f0f0 !important;
  font-size: 13px;
  line-height: 1.6;
  margin: 0 0 4px 0;
  flex-grow: 1;
}

/* Цвета текста description-goals для каждого типа карточки */
.insider-card .description-goals {
  color: #95BDB3 !important;
  font-size: 12px;
  line-height: 1.6;
  margin: 0;
}

.simulator-card .description-goals {
  color: #BDB095 !important;
  font-size: 12px;
  line-height: 1.6;
  margin: 0;
}
</style>
