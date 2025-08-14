<template>
  <div class="brands-container">
    <!-- ТАРИФ: Наблюдатель (Золотистый оттенок) -->
    <div class="brand-card" style="background-color: #2B2A27 !important; border-color: #383633 !important; border-top-color: #A98E60 !important;">
      <h3>Симулятор города</h3>
      <p class="description-main">Тестируйте гипотезы, анализируйте форматы и делайте прогнозы выручки без финансовых рисков.</p>
      <p class="description-goals" style="color: #BDB095 !important;">Цифровая копия реального города с точными данными о локациях, конкурентах и проходимости.</p>
    </div>
    <div class="brand-card" style="background-color: #2B2A27 !important; border-color: #383633 !important; border-top-color: #A98E60 !important;">
      <h3>Тестирование бизнес-моделей</h3>
      <p class="description-main">Оценивайте, какая модель принесет максимальную прибыль в конкретной локации.</p>
      <p class="description-goals" style="color: #BDB095 !important;">Проверка различных концепций: от классической кофейни до коворкинга с кофе.</p>
    </div>
    <!-- ... и другие карточки "Наблюдатель" ... -->

    <!-- ТАРИФ: Инсайдер (Стальной синий оттенок) -->
    <div class="brand-card" style="background-color: #272A2B !important; border-color: #333638 !important; border-top-color: #608DA9 !important;">
      <h3>Ежемесячный обзор рынка</h3>
      <p class="description-main">Стратегическая информация для точных решений.</p>
      <p class="description-goals" style="color: #95B2BD !important;">Глубокий отчет о ключевых трендах, изменениях в поведении потребителей и сдвигах в отрасли.</p>
    </div>
    <div class="brand-card" style="background-color: #272A2B !important; border-color: #333638 !important; border-top-color: #608DA9 !important;">
      <h3>Доступ к Индексу Роста</h3>
      <p class="description-main">Отслеживайте динамику конкурентов и проверяйте бенчмарки по рынку.</p>
      <p class="description-goals" style="color: #95B2BD !important;">Объективная оценка эффективности кофейных компаний на основе 15 ключевых метрик.</p>
    </div>
    <!-- ... и другие карточки "Инсайдер" ... -->

    <!-- ТАРИФ: Партнёр (Глубокий зелёный оттенок) -->
    <div class="brand-card" style="background-color: #272B2A !important; border-color: #333836 !important; border-top-color: #60A994 !important;">
      <h3>Участие в обратной связи</h3>
      <p class="description-main">Ваш опыт помогает улучшать платформу для всех участников.</p>
      <p class="description-goals" style="color: #95BDB3 !important;">Предлагайте новые функции и влияйте на приоритеты разработки.</p>
    </div>
    <div class="brand-card" style="background-color: #272B2A !important; border-color: #333836 !important; border-top-color: #60A994 !important;">
      <h3>Приоритетный доступ к Чекапам</h3>
      <p class="description-main">Глубокий анализ с персональными рекомендациями по оптимизации и масштабированию.</p>
      <p class="description-goals" style="color: #95BDB3 !important;">Первоочередная запись на комплексную диагностику бизнеса от команды B-R-E-W.</p>
    </div>
    <!-- ... и другие карточки "Партнёр" ... -->
  </div>
</template>

<style scoped>
/* Стили отвечают только за структуру, все цвета вынесены в HTML */
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
  /* Базовые стили для этого текста. Цвет переопределяется в HTML. */
  font-size: 12px;
  line-height: 1.6;
  margin: 0;
}
</style>
