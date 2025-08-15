<template>
  <div class="brands-container">
    <!-- ФУНКЦИИ ТАРИФА: Инсайдер -->
    <div class="brand-card" style="background-color: #272A2B !important; border-color: #333638 !important; border-top-color: #608DA9 !important;">
      <div class="tariff-badge insider">Инсайдер</div>
      <h3>Ежемесячный обзор рынка</h3>
      <p class="description-main">Стратегическая информация для точных решений.</p>
      <p class="description-goals" style="color: #95B2BD !important;">Глубокий отчет о ключевых трендах, изменениях в поведении потребителей и сдвигах в отрасли.</p>
    </div>
    
    <div class="brand-card" style="background-color: #272A2B !important; border-color: #333638 !important; border-top-color: #608DA9 !important;">
      <div class="tariff-badge insider">Инсайдер</div>
      <h3>Доступ к Индексу Роста</h3>
      <p class="description-main">Отслеживайте динамику конкурентов и проверяйте бенчмарки по рынку.</p>
      <p class="description-goals" style="color: #95B2BD !important;">Объективная оценка эффективности кофейных компаний на основе 15 ключевых метрик на базе сотен тысяч очищенных отзывов.</p>
    </div>
    
    <div class="brand-card" style="background-color: #272A2B !important; border-color: #333638 !important; border-top-color: #608DA9 !important;">
      <div class="tariff-badge insider">Инсайдер</div>
      <h3>Анализ компаний в фокусе</h3>
      <p class="description-main">Возможность учиться на чужом опыте и избегать типичных ловушек.</p>
      <p class="description-goals" style="color: #95B2BD !important;">Подробные кейсы успешных и провальных проектов с анализом ключевых факторов роста или падения.</p>
    </div>
    
    <div class="brand-card" style="background-color: #272A2B !important; border-color: #333638 !important; border-top-color: #608DA9 !important;">
      <div class="tariff-badge insider">Инсайдер</div>
      <h3>Обновления симулятора</h3>
      <p class="description-main">Первый доступ к новым версиям и участие в тестировании новых возможностей.</p>
      <p class="description-goals" style="color: #95B2BD !important;">Регулярное добавление новых городов, локаций и функций.</p>
    </div>

    <!-- ФУНКЦИИ ТАРИФА: Симулятор -->
    <div class="brand-card" style="background-color: #2B2A27 !important; border-color: #383633 !important; border-top-color: #A98E60 !important;">
      <div class="tariff-badge simulator">Симулятор</div>
      <h3>Симулятор города</h3>
      <p class="description-main">Тестируйте гипотезы, анализируйте форматы и делайте прогнозы выручки без финансовых рисков.</p>
      <p class="description-goals" style="color: #BDB095 !important;">Цифровая копия реального города с точными данными о локациях, конкурентах и проходимости.</p>
    </div>
    
    <div class="brand-card" style="background-color: #2B2A27 !important; border-color: #383633 !important; border-top-color: #A98E60 !important;">
      <div class="tariff-badge simulator">Симулятор</div>
      <h3>Тестирование бизнес-моделей</h3>
      <p class="description-main">Оценивайте, какая модель принесет максимальную прибыль в конкретной локации.</p>
      <p class="description-goals" style="color: #BDB095 !important;">Проверка различных концепций: от классической кофейни до коворкинга с кофе.</p>
    </div>
    
    <div class="brand-card" style="background-color: #2B2A27 !important; border-color: #383633 !important; border-top-color: #A98E60 !important;">
      <div class="tariff-badge simulator">Симулятор</div>
      <h3>Доступ к Кофейному Протоколу</h3>
      <p class="description-main">Коллективный опыт сотен кофеен, структурированный для немедленного применения.</p>
      <p class="description-goals" style="color: #BDB095 !important;">Открытая живая база знаний с проверенными практиками: оборудование, поставщики, персонал, маркетинг.</p>
    </div>
    
    <div class="brand-card" style="background-color: #2B2A27 !important; border-color: #383633 !important; border-top-color: #A98E60 !important;">
      <div class="tariff-badge simulator">Симулятор</div>
      <h3>Поддержка Анны при старте</h3>
      <p class="description-main">Рекомендации по действиям для максимально эффективного старта.</p>
      <p class="description-goals" style="color: #BDB095 !important;">Персональная помощь ИИ-ассистента Анны по методологии B-R-E-W-</p>
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

/* Стили для бейджей тарифов */
.tariff-badge {
  display: inline-block;
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
  width: fit-content;
}

.tariff-badge.insider {
  background-color: #608DA9;
  color: #ffffff;
}

.tariff-badge.simulator {
  background-color: #A98E60;
  color: #ffffff;
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

.description-goals {
  font-size: 12px;
  line-height: 1.6;
  margin: 0;
}
</style>
