<script setup>
import { ref } from 'vue'

const features = ref([
  { name: 'Симулятор города', included: [true, true, true] },
  { name: 'Тестирование бизнес-моделей', included: [true, true, true] },
  { name: 'Доступ к Кофейному Протоколу', included: [true, true, true] },
  { name: 'Поддержка Анны при старте', included: [true, true, true] },
  { name: 'Ежемесячный обзор рынка', included: [false, true, true] },
  { name: 'Доступ к Индексу Роста', included: [false, true, true] },
  { name: 'Анализ компаний в фокусе', included: [false, true, true] },
  { name: 'Обновления симулятора', included: [false, true, true] },
  { name: 'Персональные рекомендации для пользователей симулятора', included: [false, false, true] },
  { name: 'Участие в обратной связи по платформе', included: [false, false, true] },
  { name: 'Приоритетный доступ к Чекапам', included: [false, false, true] },
  { name: 'Место в совете B-R-E-W', included: [false, false, true] }
])
</script>

<template>
  <div class="table-wrapper">
    <div class="pricing-grid">
      <!-- Header Row -->
      <div class="grid-cell header-feature"></div>
      <div class="grid-cell grid-header">
        <span class="tariff-title">Симулятор</span>
        <span class="tariff-description">Профессиональная аналитика для вашего бизнеса. Без риска.</span>
      </div>
      <div class="grid-cell grid-header">
        <span class="tariff-title">Инсайдер</span>
        <span class="tariff-description">Продвинутые данные и инсайты для рыночного преимущества.</span>
      </div>
      <div class="grid-cell grid-header">
        <span class="tariff-title">Партнёр</span>
        <span class="tariff-description">Максимальная сила влияния для формирования будущего индустрии.</span>
      </div>

      <!-- Feature Rows -->
      <template v-for="feature in features" :key="feature.name">
        <div class="grid-cell cell-feature">{{ feature.name }}</div>
        <div v-for="(isIncluded, index) in feature.included" :key="index" class="grid-cell cell-check">
          <span v-if="isIncluded" class="checkmark">&#10003;</span>
        </div>
      </template>
      
      <!-- Price Row -->
      <div class="grid-cell cell-feature price-row"></div>
      <div class="grid-cell cell-check price-row"><strong>Бесплатно</strong></div>
      <div class="grid-cell cell-check price-row"><strong>&#8381;12000/мес.</strong></div>
      <div class="grid-cell cell-check price-row"><strong>&#8381;390000/год</strong></div>

      <!-- Sub-Price Row -->
      <div class="grid-cell cell-feature"></div>
      <div class="grid-cell cell-check sub-price">Мгновенный доступ</div>
      <div class="grid-cell cell-check sub-price">Ежемесячная подписка</div>
      <div class="grid-cell cell-check sub-price">Годовой взнос</div>
    </div>
  </div>
</template>

<style scoped>
.table-wrapper {
  overflow-x: auto;
  border: 2px solid var(--vp-c-divider);
  border-radius: 8px;
}

.pricing-grid {
  display: grid;
  grid-template-columns: 1fr repeat(3, 140px); /* ГЛАВНОЕ ПРАВИЛО: Гибкая + 3 фиксированных колонки */
  min-width: 650px; /* Заставляет грид быть широким на мобильных */
}

.grid-cell {
  padding: 8px 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-bottom: 1px solid var(--vp-c-divider);
}

.grid-header {
  vertical-align: top;
  padding-top: 12px;
  padding-bottom: 12px;
  border-bottom: 2px solid var(--vp-c-divider);
  background-color: var(--vp-c-bg-soft);
  text-align: center;
}
.header-feature {
  border-bottom: 2px solid var(--vp-c-divider);
  background-color: var(--vp-c-bg-soft);
}
.tariff-title {
  text-transform: uppercase;
  color: var(--vp-c-text-1);
}
.tariff-description {
  margin-top: 4px;
  font-size: 0.85em;
  font-weight: normal;
  opacity: 0.7;
  text-transform: none;
  line-height: 1.2;
}

.cell-feature {
  justify-content: flex-start;
  white-space: nowrap;
}

.cell-check {
  text-align: center;
  align-items: center;
  white-space: nowrap;
}
.checkmark {
  color: var(--vp-c-brand-2);
  font-weight: bold;
  font-size: 1.2em;
}

.price-row {
  background-color: var(--vp-c-bg-soft);
}
.sub-price {
  font-size: 0.9em;
  opacity: 0.6;
}

/* Убираем последнюю нижнюю рамку у всех ячеек в последнем ряду */
.pricing-grid > .grid-cell:nth-last-child(-n+4) {
    border-bottom: none;
}
</style>
