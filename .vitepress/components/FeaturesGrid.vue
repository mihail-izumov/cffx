<template>
  <div id="tariff-feature-cards" class="brands-container">
    <!-- ТАРИФ: Наблюдатель -->
    <div class="brand-card card-observer">
      <h3>Симулятор города</h3>
      <p class="description-main">Тестируйте гипотезы, анализируйте форматы и делайте прогнозы выручки без финансовых рисков.</p>
      <p class="description-goals">Цифровая копия реального города с точными данными о локациях, конкурентах и проходимости.</p>
    </div>
    <div class="brand-card card-observer">
      <h3>Тестирование бизнес-моделей</h3>
      <p class="description-main">Оценивайте, какая модель принесет максимальную прибыль в конкретной локации.</p>
      <p class="description-goals">Проверка различных концепций: от классической кофейни до коворкинга с кофе.</p>
    </div>
    <div class="brand-card card-observer">
      <h3>Доступ к Кофейному Протоколу</h3>
      <p class="description-main">Коллективный опыт сотен кофеен, структурированный для немедленного применения.</p>
      <p class="description-goals">Открытая живая база знаний с проверенными практиками: оборудование, поставщики, персонал, маркетинг.</p>
    </div>
    <div class="brand-card card-observer">
      <h3>Поддержка Анны при старте</h3>
      <p class="description-main">Рекомендации по действиям для максимально эффективного старта.</p>
      <p class="description-goals">Персональная помощь ИИ-ассистента Анны по методологии B-R-E-W.</p>
    </div>

    <!-- ТАРИФ: Инсайдер -->
    <div class="brand-card card-insider">
      <h3>Ежемесячный обзор рынка</h3>
      <p class="description-main">Стратегическая информация для точных решений.</p>
      <p class="description-goals">Глубокий отчет о ключевых трендах, изменениях в поведении потребителей и сдвигах в отрасли.</p>
    </div>
    <div class="brand-card card-insider">
      <h3>Доступ к Индексу Роста</h3>
      <p class="description-main">Отслеживайте динамику конкурентов и проверяйте бенчмарки по рынку.</p>
      <p class="description-goals">Объективная оценка эффективности кофейных компаний на основе 15 ключевых метрик.</p>
    </div>
    <div class="brand-card card-insider">
      <h3>Анализ компаний в фокусе</h3>
      <p class="description-main">Возможность учиться на чужом опыте и избегать типичных ловушек.</p>
      <p class="description-goals">Подробные кейсы успешных и провальных проектов с анализом ключевых факторов.</p>
    </div>
    <div class="brand-card card-insider">
      <h3>Обновления симулятора</h3>
      <p class="description-main">Первый доступ к новым версиям и участие в тестировании новых возможностей.</p>
      <p class="description-goals">Регулярное добавление новых городов, локаций и функций.</p>
    </div>

    <!-- ТАРИФ: Партнёр -->
    <div class="brand-card card-partner">
      <h3>Участие в обратной связи</h3>
      <p class="description-main">Ваш опыт помогает улучшать платформу для всех участников.</p>
      <p class="description-goals">Предлагайте новые функции и влияйте на приоритеты разработки через опросы и интервью.</p>
    </div>
    <div class="brand-card card-partner">
      <h3>Приоритетный доступ к Чекапам</h3>
      <p class="description-main">Глубокий анализ с персональными рекомендациями по оптимизации и масштабированию.</p>
      <p class="description-goals">Первоочередная запись на комплексную диагностику бизнеса от команды B-R-E-W.</p>
    </div>
    <div class="brand-card card-partner">
      <h3>Место в совете B-R-E-W</h3>
      <p class="description-main">Статус сооснователя и право формировать правила игры для всей отрасли.</p>
      <p class="description-goals">Участие в стратегических решениях платформы, влияние на выбор партнеров и направления исследований.</p>
    </div>
  </div>
</template>

<style>
/* Контейнер для сетки (стили теперь привязаны к ID) */
#tariff-feature-cards {
  display: grid !important;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 16px !important;
  padding: 4px 0 12px 0 !important;
  margin: 24px 0 !important;
}

/* Общий стиль карточки */
#tariff-feature-cards .brand-card {
  border-radius: 12px !important;
  padding: 20px 16px !important;
  display: flex;
  flex-direction: column;
  border: 1px solid;
  border-top-width: 4px;
  transition: all 0.25s ease;
}

/* --- СТИЛИ ДЛЯ СВЕТЛОЙ ТЕМЫ --- */
#tariff-feature-cards .card-observer {
  background-color: #f9fafb !important;
  border-color: #e5e7eb !important;
}
#tariff-feature-cards .card-insider {
  background-color: #ffffff !important;
  border-color: #e5e7eb !important;
  border-top-color: #347b6c !important; /* Бирюзовый */
}
#tariff-feature-cards .card-partner {
  background-color: #ffffff !important;
  border-color: #e5e7eb !important;
  border-top-color: #C5F946 !important; /* Лаймовый */
}

/* --- СТИЛИ ДЛЯ ТЁМНОЙ ТЕМЫ --- */
:root.dark #tariff-feature-cards .card-observer {
  background-color: #2d2d30 !important;
  border-color: #444444 !important;
}
:root.dark #tariff-feature-cards .card-insider {
  background-color: #242427 !important;
  border-color: #444444 !important;
  border-top-color: #347b6c !important; /* Бирюзовый */
}
:root.dark #tariff-feature-cards .card-partner {
  background-color: #1e1e20 !important;
  border-color: #444444 !important;
  border-top-color: #C5F946 !important; /* Лаймовый */
}

/* Эффект при наведении */
#tariff-feature-cards .brand-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
}

/* --- СТИЛИ ТЕКСТА --- */
#tariff-feature-cards .brand-card h3 {
  color: #1a1a1a !important;
}
:root.dark #tariff-feature-cards .brand-card h3 {
  color: #ffffff !important;
}
#tariff-feature-cards .description-main {
  color: #1a1a1a !important;
  flex-grow: 1;
}
:root.dark #tariff-feature-cards .description-main {
  color: #f0f0f0 !important;
}
#tariff-feature-cards .description-goals {
  color: #6b7280 !important;
}
:root.dark #tariff-feature-cards .description-goals {
  color: #8e8e93 !important;
}

/* Общие стили текста, которые были в прошлых версиях */
#tariff-feature-cards .brand-card h3 {
  font-size: 15px !important;
  line-height: 1.4 !important;
  margin-top: 0 !important;
  margin-bottom: 8px !important;
  font-weight: 700 !important;
  border: none !important;
  padding: 0 !important;
}
#tariff-feature-cards .description-main {
  font-size: 13px !important;
  line-height: 1.6 !important;
  margin: 0 0 4px 0 !important;
}
#tariff-feature-cards .description-goals {
  font-size: 12px !important;
  line-height: 1.6 !important;
  margin: 0 !important;
}
</style>
