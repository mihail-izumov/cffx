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
      <div class="grid-cell grid-header header-feature"></div>
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

      <!-- Price Row (Moved Up) -->
      <div class="grid-cell cell-feature price-row"></div>
      <div class="grid-cell cell-check price-row"><strong>Бесплатно</strong></div>
      <div class="grid-cell cell-check price-row"><strong>&#8381;12000/мес.</strong></div>
      <div class="grid-cell cell-check price-row"><strong>&#8381;390000/год</strong></div>

      <!-- Sub-Price Row (Moved Up) -->
      <div class="grid-cell cell-feature sub-price-separator"></div>
      <div class="grid-cell cell-check sub-price sub-price-separator">Мгновенный доступ</div>
      <div class="grid-cell cell-check sub-price sub-price-separator">Ежемесячная подписка</div>
      <div class="grid-cell cell-check sub-price sub-price-separator">Годовой взнос</div>
      
      <!-- Feature Rows -->
      <template v-for="(feature, featureIndex) in features" :key="feature.name">
        <div 
          class="grid-cell cell-feature"
          :class="{ 'last-row-cell': featureIndex === features.length - 1 }"
        >{{ feature.name }}</div>
        <div 
          v-for="(isIncluded, checkIndex) in feature.included" :key="checkIndex" 
          class="grid-cell cell-check"
          :class="{ 'last-row-cell': featureIndex === features.length - 1 }"
        >
          <span v-if="isIncluded" class="checkmark">&#10003;</span>
        </div>
      </template>

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
  grid-template-columns: 1fr repeat(3, auto); 
  align-items: center;
}

.grid-cell {
  padding: 8px 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-bottom: 1px solid var(--vp-c-divider);
  border-right: 1px solid var(--vp-c-divider); /* Вертикальные разделители */
  height: 100%;
}

/* Убираем правый бордер у последней колонки */
.pricing-grid > .grid-cell:nth-child(4n) {
  border-right: none;
}

.grid-header {
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
  font-size: 0.9em; /* Текст на 2 кегля меньше */
}

.cell-check {
  text-align: center;
  align-items: center;
  white-space: nowrap;
}
.checkmark {
  color: var(--vp-c-brand-2);
  font-weight: normal; /* Убираем жирность */
  font-size: 1.2em;
}

.price-row {
  background-color: var(--vp-c-bg-soft);
}
.sub-price {
  font-size: 0.9em;
  opacity: 0.6;
}
.sub-price-separator {
  border-bottom: 2px solid var(--vp-c-divider); /* Толстая линия под подписями */
}

.last-row-cell {
  border-bottom: none; /* Убираем последнюю нижнюю рамку */
}
</style>
