<template>
  <div class="table-wrapper">
    <table class="responsive-table">
      <colgroup>
        <col /> <!-- Гибкий столбец для десктопа -->
        <col class="tariff-column" />
        <col class="tariff-column" />
        <col class="tariff-column" />
      </colgroup>
      <thead>
        <tr>
          <th class="header-feature"></th>
          <th class="header-tariff">
            <span class="tariff-title">Симулятор</span>
            <span class="tariff-description">Профессиональная аналитика для вашего бизнеса. Без риска.</span>
          </th>
          <th class="header-tariff">
            <span class="tariff-title">Инсайдер</span>
            <span class="tariff-description">Продвинутые данные и инсайты для рыночного преимущества.</span>
          </th>
          <th class="header-tariff">
            <span class="tariff-title">Партнёр</span>
            <span class="tariff-description">Максимальная сила влияния для формирования будущего индустрии.</span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="cell-feature">Симулятор города</td>
          <td class="cell-check"><span class="checkmark">&#10003;</span></td>
          <td class="cell-check"><span class="checkmark">&#10003;</span></td>
          <td class="cell-check"><span class="checkmark">&#10003;</span></td>
        </tr>
        <tr>
          <td class="cell-feature">Тестирование бизнес-моделей</td>
          <td class="cell-check"><span class="checkmark">&#10003;</span></td>
          <td class="cell-check"><span class="checkmark">&#10003;</span></td>
          <td class="cell-check"><span class="checkmark">&#10003;</span></td>
        </tr>
        <tr>
          <td class="cell-feature">Доступ к Кофейному Протоколу</td>
          <td class="cell-check"><span class="checkmark">&#10003;</span></td>
          <td class="cell-check"><span class="checkmark">&#10003;</span></td>
          <td class="cell-check"><span class="checkmark">&#10003;</span></td>
        </tr>
        <tr>
          <td class="cell-feature">Поддержка Анны при старте</td>
          <td class="cell-check"><span class="checkmark">&#10003;</span></td>
          <td class="cell-check"><span class="checkmark">&#10003;</span></td>
          <td class="cell-check"><span class="checkmark">&#10003;</span></td>
        </tr>
        <tr>
          <td class="cell-feature">Ежемесячный обзор рынка</td>
          <td class="cell-check"></td>
          <td class="cell-check"><span class="checkmark">&#10003;</span></td>
          <td class="cell-check"><span class="checkmark">&#10003;</span></td>
        </tr>
        <tr>
          <td class="cell-feature">Доступ к Индексу Роста</td>
          <td class="cell-check"></td>
          <td class="cell-check"><span class="checkmark">&#10003;</span></td>
          <td class="cell-check"><span class="checkmark">&#10003;</span></td>
        </tr>
        <tr>
          <td class="cell-feature">Анализ компаний в фокусе</td>
          <td class="cell-check"></td>
          <td class="cell-check"><span class="checkmark">&#10003;</span></td>
          <td class="cell-check"><span class="checkmark">&#10003;</span></td>
        </tr>
        <tr>
          <td class="cell-feature">Обновления симулятора</td>
          <td class="cell-check"></td>
          <td class="cell-check"><span class="checkmark">&#10003;</span></td>
          <td class="cell-check"><span class="checkmark">&#10003;</span></td>
        </tr>
        <tr>
          <td class="cell-feature">Персональные рекомендации для пользователей симулятора</td>
          <td class="cell-check"></td>
          <td class="cell-check"></td>
          <td class="cell-check"><span class="checkmark">&#10003;</span></td>
        </tr>
        <tr>
          <td class="cell-feature">Участие в обратной связи по платформе</td>
          <td class="cell-check"></td>
          <td class="cell-check"></td>
          <td class="cell-check"><span class="checkmark">&#10003;</span></td>
        </tr>
        <tr>
          <td class="cell-feature">Приоритетный доступ к Чекапам</td>
          <td class="cell-check"></td>
          <td class="cell-check"></td>
          <td class="cell-check"><span class="checkmark">&#10003;</span></td>
        </tr>
        <tr>
          <td class="cell-feature">Место в совете B-R-E-W</td>
          <td class="cell-check"></td>
          <td class="cell-check"></td>
          <td class="cell-check"><span class="checkmark">&#10003;</span></td>
        </tr>
        <tr class="price-row">
          <td class="cell-feature"></td>
          <td class="cell-check"><strong>Бесплатно</strong></td>
          <td class="cell-check"><strong>&#8381;12000/мес.</strong></td>
          <td class="cell-check"><strong>&#8381;390000/год</strong></td>
        </tr>
        <tr>
          <td class="cell-feature"></td>
          <td class="cell-check sub-price">Мгновенный доступ</td>
          <td class="cell-check sub-price">Ежемесячная подписка</td>
          <td class="cell-check sub-price">Годовой взнос</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.table-wrapper {
  overflow-x: auto;
}
/* Стили для десктопа по умолчанию */
.responsive-table {
  width: 100%;
  table-layout: fixed; /* Режим для гибкого первого столбца */
  border-collapse: collapse;
  border-spacing: 0;
  border: 2px solid var(--vp-c-divider);
  border-radius: 8px;
  overflow: hidden;
}
.tariff-column {
  width: 140px; /* Стандартная ширина для тарифов */
}
.responsive-table th, 
.responsive-table td {
  padding: 8px 12px;
  vertical-align: middle;
}
.responsive-table thead tr {
  background-color: var(--vp-c-bg-soft);
}
.responsive-table th {
  vertical-align: top;
  padding-top: 12px;
  padding-bottom: 12px;
  border-bottom: 2px solid var(--vp-c-divider);
}
.header-feature {
  border-bottom-color: transparent;
}
.header-tariff {
  text-align: center;
}
.tariff-title {
  text-transform: uppercase;
  color: var(--vp-c-text-1);
}
.tariff-description {
  display: block;
  margin-top: 4px;
  font-size: 0.85em;
  font-weight: normal;
  opacity: 0.7;
  text-transform: none;
  line-height: 1.2;
}
.cell-feature {
  /* На десктопе текст может переноситься, столбец гибкий */
}
.cell-check {
  text-align: center;
  white-space: nowrap;
}
.checkmark {
  color: var(--vp-c-brand-2);
  font-weight: bold;
}
.price-row {
  background-color: var(--vp-c-bg-soft);
}
.sub-price {
  font-size: 0.9em;
  opacity: 0.6;
}

/* Ключевой режим для планшетов и мобильных */
@media (max-width: 768px) {
  .responsive-table {
    table-layout: auto; /* Режим для скролла, ширина по контенту */
  }
  .responsive-table .cell-feature {
    white-space: nowrap; /* Запрещаем перенос для чистого скролла */
  }
}

/* Дополнительная адаптация для самых узких экранов */
@media (max-width: 480px) {
  .tariff-column {
    width: 120px; /* Уменьшаем ширину столбцов тарифов */
  }
}
</style>
