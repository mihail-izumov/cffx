<template>
  <div class="brands-container">
    <!-- ТАРИФ: Наблюдатель -->
    <div class="brand-card" style="background-color: #2d2d30 !important; border-color: #444444 !important;">
      <h3>Симулятор города</h3>
      <p class="description-main">Тестируйте гипотезы, анализируйте форматы и делайте прогнозы выручки без финансовых рисков.</p>
      <p class="description-goals">Цифровая копия реального города с точными данными о локациях, конкурентах и проходимости.</p>
    </div>
    <div class="brand-card" style="background-color: #2d2d30 !important; border-color: #444444 !important;">
      <h3>Тестирование бизнес-моделей</h3>
      <p class="description-main">Оценивайте, какая модель принесет максимальную прибыль в конкретной локации.</p>
      <p class="description-goals">Проверка различных концепций: от классической кофейни до коворкинга с кофе.</p>
    </div>
    <div class="brand-card" style="background-color: #2d2d30 !important; border-color: #444444 !important;">
      <h3>Доступ к Кофейному Протоколу</h3>
      <p class="description-main">Коллективный опыт сотен кофеен, структурированный для немедленного применения.</p>
      <p class="description-goals">Открытая живая база знаний с проверенными практиками.</p>
    </div>
    <div class="brand-card" style="background-color: #2d2d30 !important; border-color: #444444 !important;">
      <h3>Поддержка Анны при старте</h3>
      <p class="description-main">Рекомендации по действиям для максимально эффективного старта.</p>
      <p class="description-goals">Персональная помощь ИИ-ассистента Анны по методологии B-R-E-W.</p>
    </div>

    <!-- ТАРИФ: Инсайдер -->
    <div class="brand-card" style="background-color: #242427 !important; border-color: #444444 !important; border-top-color: #347b6c !important;">
      <h3>Ежемесячный обзор рынка</h3>
      <p class="description-main">Стратегическая информация для точных решений.</p>
      <p class="description-goals">Глубокий отчет о ключевых трендах, изменениях в поведении потребителей и сдвигах в отрасли.</p>
    </div>
    <div class="brand-card" style="background-color: #242427 !important; border-color: #444444 !important; border-top-color: #347b6c !important;">
      <h3>Доступ к Индексу Роста</h3>
      <p class="description-main">Отслеживайте динамику конкурентов и проверяйте бенчмарки по рынку.</p>
      <p class="description-goals">Объективная оценка эффективности кофейных компаний на основе 15 ключевых метрик.</p>
    </div>
    <div class="brand-card" style="background-color: #242427 !important; border-color: #444444 !important; border-top-color: #347b6c !important;">
      <h3>Анализ компаний в фокусе</h3>
      <p class="description-main">Возможность учиться на чужом опыте и избегать типичных ловушек.</p>
      <p class="description-goals">Подробные кейсы успешных и провальных проектов с анализом ключевых факторов.</p>
    </div>
    <div class="brand-card" style="background-color: #242427 !important; border-color: #444444 !important; border-top-color: #347b6c !important;">
      <h3>Обновления симулятора</h3>
      <p class="description-main">Первый доступ к новым версиям и участие в тестировании новых возможностей.</p>
      <p class="description-goals">Регулярное добавление новых городов, локаций и функций.</p>
    </div>

    <!-- ТАРИФ: Партнёр -->
    <div class="brand-card" style="background-color: #1e1e20 !important; border-color: #444444 !important; border-top-color: #C5F946 !important;">
      <h3>Участие в обратной связи</h3>
      <p class="description-main">Ваш опыт помогает улучшать платформу для всех участников.</p>
      <p class="description-goals">Предлагайте новые функции и влияйте на приоритеты разработки.</p>
    </div>
    <div class="brand-card" style="background-color: #1e1e20 !important; border-color: #444444 !important; border-top-color: #C5F946 !important;">
      <h3>Приоритетный доступ к Чекапам</h3>
      <p class="description-main">Глубокий анализ с персональными рекомендациями по оптимизации и масштабированию.</p>
      <p class="description-goals">Первоочередная запись на комплексную диагностику бизнеса от команды B-R-E-W.</p>
    </div>
    <div class="brand-card" style="background-color: #1e1e20 !important; border-color: #444444 !important; border-top-color: #C5F946 !important;">
      <h3>Место в совете B-R-E-W</h3>
      <p class="description-main">Статус сооснователя и право формировать правила игры для всей отрасли.</p>
      <p class="description-goals">Участие в стратегических решениях платформы, влияние на выбор партнеров.</p>
    </div>
  </div>
</template>

<style scoped>
/* В стилях теперь только то, что не конфликтует: лэйаут, паддинги, шрифты */
.brands-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 16px;
  padding: 4px 0 12px 0;
  margin: 24px 0;
}

.brand-card {
  border-radius: 12px;
  padding: 20px 16px;
  display: flex;
  flex-direction: column;
  border-style: solid;
  border-width: 1px;
  border-top-width: 4px;
  transition: none;
  transform: none;
}

.brand-card:hover {
  transform: none;
  box-shadow: none;
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
  color: #8e8e93 !important;
  font-size: 12px;
  line-height: 1.6;
  margin: 0;
}
</style>
