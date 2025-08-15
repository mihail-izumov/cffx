<template>
  <div class="table-wrapper">
    <table class="responsive-table">
      <thead>
        <tr>
          <!-- 1. Гибкий столбец (без заданной ширины) -->
          <th class="header-feature"></th>
          <!-- 2. Три столбца с фиксированной шириной -->
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
        <!-- Содержимое таблицы -->
        <tr>
          <td class="cell-feature">Симулятор города</td>
          <td class="cell-check"><span class="checkmark">✓</span></td>
          <td class="cell-check"><span class="checkmark">✓</span></td>
          <td class="cell-check"><span class="checkmark">✓</span></td>
        </tr>
        <tr>
          <td class="cell-feature">Тестирование бизнес-моделей</td>
          <td class="cell-check"><span class="checkmark">✓</span></td>
          <td class="cell-check"><span class="checkmark">✓</span></td>
          <td class="cell-check"><span class="checkmark">✓</span></td>
        </tr>
        <tr>
          <td class="cell-feature">Доступ к Кофейному Протоколу</td>
          <td class="cell-check"><span class="checkmark">✓</span></td>
          <td class="cell-check"><span class="checkmark">✓</span></td>
          <td class="cell-check"><span class="checkmark">✓</span></td>
        </tr>
        <tr>
          <td class="cell-feature">Поддержка Анны при старте</td>
          <td class="cell-check"><span class="checkmark">✓</span></td>
          <td class="cell-check"><span class="checkmark">✓</span></td>
          <td class="cell-check"><span class="checkmark">✓</span></td>
        </tr>
        <tr>
          <td class="cell-feature">Ежемесячный обзор рынка</td>
          <td class="cell-check"></td>
          <td class="cell-check"><span class="checkmark">✓</span></td>
          <td class="cell-check"><span class="checkmark">✓</span></td>
        </tr>
        <tr>
          <td class="cell-feature">Доступ к Индексу Роста</td>
          <td class="cell-check"></td>
          <td class="cell-check"><span class="checkmark">✓</span></td>
          <td class="cell-check"><span class="checkmark">✓</span></td>
        </tr>
        <tr>
          <td class="cell-feature">Анализ компаний в фокусе</td>
          <td class="cell-check"></td>
          <td class="cell-check"><span class="checkmark">✓</span></td>
          <td class="cell-check"><span class="checkmark">✓</span></td>
        </tr>
        <tr>
          <td class="cell-feature">Обновления симулятора</td>
          <td class="cell-check"></td>
          <td class="cell-check"><span class="checkmark">✓</span></td>
          <td class="cell-check"><span class="checkmark">✓</span></td>
        </tr>
        <tr>
          <td class="cell-feature">Персональные рекомендации для пользователей симулятора</td>
          <td class="cell-check"></td>
          <td class="cell-check"></td>
          <td class="cell-check"><span class="checkmark">✓</span></td>
        </tr>
        <tr>
          <td class="cell-feature">Участие в обратной связи по платформе</td>
          <td class="cell-check"></td>
          <td class="cell-check"></td>
          <td class="cell-check"><span class="checkmark">✓</span></td>
        </tr>
        <tr>
          <td class="cell-feature">Приоритетный доступ к Чекапам</td>
          <td class="cell-check"></td>
          <td class="cell-check"></td>
          <td class="cell-check"><span class="checkmark">✓</span></td>
        </tr>
        <tr>
          <td class="cell-feature">Место в совете B-R-E-W</td>
          <td class="cell-check"></td>
          <td class="cell-check"></td>
          <td class="cell-check"><span class="checkmark">✓</span></td>
        </tr>
        <tr class="price-row">
          <td class="cell-feature"></td>
          <td class="cell-check"><strong>Бесплатно</strong></td>
          <td class="cell-check"><strong>₽12000/мес.</strong></td>
          <td class="cell-check"><strong>₽390000/год</strong></td>
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
.responsive-table {
  width: 100%; /* По умолчанию таблица растягивается на всю ширину контейнера */
  border-collapse: collapse;
  border-spacing: 0;
}
.responsive-table th, 
.responsive-table td {
  padding: 8px 12px;
  vertical-align: middle;
  border-bottom: 1px solid var(--vp-c-divider);
}
.responsive-table tr:last-child td {
  border-bottom: none;
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
  width: 140px; /* Фиксированная ширина для тарифов */
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
  /* На десктопе у этого столбца НЕТ white-space: nowrap, он гибкий */
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

/* КЛЮЧЕВЫЕ ИЗМЕНЕНИЯ ДЛЯ МОБИЛЬНЫХ */
@media (max-width: 768px) {
  .responsive-table {
    width: auto; /* Позволяем таблице самой определять свою ширину по контенту */
  }
  .responsive-table .cell-feature {
    white-space: nowrap; /* Запрещаем перенос для чистого скролла */
  }
}
</style>
