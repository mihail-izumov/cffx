<template>
  <div class="table-wrapper">
    <table class="responsive-table">
      <colgroup>
        <col class="feature-column" />
        <col class="tariff-column" />
        <col class="tariff-column" />
        <col class="tariff-column" />
      </colgroup>
      <thead>
        <tr>
          <th class="header-cell"></th>
          <th class="header-cell header-tariff">
            <span class="tariff-title">Симулятор</span>
            <span class="tariff-description">Профессиональная аналитика для вашего бизнеса. Без риска.</span>
          </th>
          <th class="header-cell header-tariff">
            <span class="tariff-title">Инсайдер</span>
            <span class="tariff-description">Продвинутые данные и инсайты для рыночного преимущества.</span>
          </th>
          <th class="header-cell header-tariff">
            <span class="tariff-title">Партнёр</span>
            <span class="tariff-description">Максимальная сила влияния для формирования будущего индустрии.</span>
          </th>
        </tr>
      </thead>
      <tbody>
        <!-- Price Row -->
        <tr class="price-row">
          <td class="data-cell"></td>
          <td class="data-cell cell-check"><strong>Бесплатно</strong></td>
          <td class="data-cell cell-check"><strong>&#8381;12000/мес.</strong></td>
          <td class="data-cell cell-check"><strong>&#8381;390000/год</strong></td>
        </tr>
        <!-- Sub-Price Row -->
        <tr class="sub-price-row">
          <td class="data-cell"></td>
          <td class="data-cell cell-check sub-price">Мгновенный доступ</td>
          <td class="data-cell cell-check sub-price">Ежемесячная подписка</td>
          <td class="data-cell cell-check sub-price">Годовой взнос</td>
        </tr>
        <!-- Feature Rows -->
        <tr>
          <td class="data-cell cell-feature">Симулятор города</td>
          <td class="data-cell cell-check"><span class="checkmark">&#10003;</span></td>
          <td class="data-cell cell-check"><span class="checkmark">&#10003;</span></td>
          <td class="data-cell cell-check"><span class="checkmark">&#10003;</span></td>
        </tr>
        <tr>
          <td class="data-cell cell-feature">Тестирование бизнес-моделей</td>
          <td class="data-cell cell-check"><span class="checkmark">&#10003;</span></td>
          <td class="data-cell cell-check"><span class="checkmark">&#10003;</span></td>
          <td class="data-cell cell-check"><span class="checkmark">&#10003;</span></td>
        </tr>
        <tr>
          <td class="data-cell cell-feature">Доступ к Кофейному Протоколу</td>
          <td class="data-cell cell-check"><span class="checkmark">&#10003;</span></td>
          <td class="data-cell cell-check"><span class="checkmark">&#10003;</span></td>
          <td class="data-cell cell-check"><span class="checkmark">&#10003;</span></td>
        </tr>
        <tr>
          <td class="data-cell cell-feature">Поддержка Анны при старте</td>
          <td class="data-cell cell-check"><span class="checkmark">&#10003;</span></td>
          <td class="data-cell cell-check"><span class="checkmark">&#10003;</span></td>
          <td class="data-cell cell-check"><span class="checkmark">&#10003;</span></td>
        </tr>
        <tr>
          <td class="data-cell cell-feature">Ежемесячный обзор рынка</td>
          <td class="data-cell cell-check"></td>
          <td class="data-cell cell-check"><span class="checkmark">&#10003;</span></td>
          <td class="data-cell cell-check"><span class="checkmark">&#10003;</span></td>
        </tr>
        <tr>
          <td class="data-cell cell-feature">Доступ к Индексу Роста</td>
          <td class="data-cell cell-check"></td>
          <td class="data-cell cell-check"><span class="checkmark">&#10003;</span></td>
          <td class="data-cell cell-check"><span class="checkmark">&#10003;</span></td>
        </tr>
        <tr>
          <td class="data-cell cell-feature">Анализ компаний в фокусе</td>
          <td class="data-cell cell-check"></td>
          <td class="data-cell cell-check"><span class="checkmark">&#10003;</span></td>
          <td class="data-cell cell-check"><span class="checkmark">&#10003;</span></td>
        </tr>
        <tr>
          <td class="data-cell cell-feature">Обновления симулятора</td>
          <td class="data-cell cell-check"></td>
          <td class="data-cell cell-check"><span class="checkmark">&#10003;</span></td>
          <td class="data-cell cell-check"><span class="checkmark">&#10003;</span></td>
        </tr>
        <tr>
          <td class="data-cell cell-feature">Персональные рекомендации для пользователей симулятора</td>
          <td class="data-cell cell-check"></td>
          <td class="data-cell cell-check"></td>
          <td class="data-cell cell-check"><span class="checkmark">&#10003;</span></td>
        </tr>
        <tr>
          <td class="data-cell cell-feature">Участие в обратной связи по платформе</td>
          <td class="data-cell cell-check"></td>
          <td class="data-cell cell-check"></td>
          <td class="data-cell cell-check"><span class="checkmark">&#10003;</span></td>
        </tr>
        <tr>
          <td class="data-cell cell-feature">Приоритетный доступ к Чекапам</td>
          <td class="data-cell cell-check"></td>
          <td class="data-cell cell-check"></td>
          <td class="data-cell cell-check"><span class="checkmark">&#10003;</span></td>
        </tr>
        <tr>
          <td class="data-cell cell-feature">Место в совете B-R-E-W</td>
          <td class="data-cell cell-check"></td>
          <td class="data-cell cell-check"></td>
          <td class="data-cell cell-check"><span class="checkmark">&#10003;</span></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.table-wrapper {
  overflow-x: auto;
  border: 2px solid var(--vp-c-divider);
  border-radius: 8px;
}

/* --- Режим "Десктоп" (по умолчанию) --- */
.responsive-table {
  width: 100%;
  table-layout: fixed; /* ГЛАВНОЕ ПРАВИЛО для десктопа */
  border-collapse: collapse;
  border-spacing: 0;
}
.tariff-column {
  width: 150px;
}

.header-cell, .data-cell {
  padding: 8px 12px;
  vertical-align: middle;
  border-right: 1px solid var(--vp-c-divider);
}
.header-cell:last-child, .data-cell:last-child {
  border-right: none;
}
.header-cell {
  vertical-align: top;
  padding-top: 12px;
  padding-bottom: 12px;
  border-bottom: 2px solid var(--vp-c-divider);
  background-color: var(--vp-c-bg-soft);
}
.data-cell {
  border-bottom: 1px solid var(--vp-c-divider);
}
tbody tr:last-child .data-cell {
  border-bottom: none;
}
.header-tariff {
  text-align: center;
}
.tariff-title {
  text-transform: uppercase;
  font-weight: bold;
}
.tariff-description {
  margin-top: 4px;
  font-size: 0.85em;
  font-weight: normal;
  opacity: 0.7;
  line-height: 1.2;
}

.price-row .data-cell {
  background-color: var(--vp-c-bg-soft);
  font-weight: bold;
}
.sub-price-row .data-cell {
  border-bottom: 2px solid var(--vp-c-divider);
}
.sub-price {
  font-size: 0.9em;
  opacity: 0.6;
  font-weight: normal;
}
.cell-feature {
  font-size: 0.9em;
  line-height: 1.3;
}
.cell-check {
  text-align: center;
}
.checkmark {
  color: var(--vp-c-brand-2);
  font-weight: normal;
  font-size: 1.2em;
}

/* --- Режим "Мобильный / Скролл" --- */
@media (max-width: 768px) {
  .responsive-table {
    table-layout: auto; /* ГЛАВНОЕ ПРАВИЛО для мобильных */
  }
  .cell-feature,
  .tariff-description,
  .cell-check {
    white-space: nowrap; /* Запрещаем любой перенос текста для чистого скролла */
  }
}
</style>
