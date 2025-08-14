<template>
  <div class="table-wrapper">
    <table class="responsive-table">
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
/* scoped гарантирует, что стили применяются только к этому компоненту */
.table-wrapper {
  overflow-x: auto;
  width: 100%;
}
.responsive-table {
  width: 100%;
  min-width: 600px; /* Защита от сжатия на мобильных */
  border-collapse: collapse;
  border: 2px solid var(--vp-c-divider);
  border-radius: 8px;
  overflow: hidden; /* Прячет фон, вылезающий за рамки */
}
.responsive-table th, .responsive-table td {
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
}
.header-feature {
  background: transparent !important;
  border: none;
}
.header-tariff {
  text-align: center;
  width: 130px; /* Фиксированная ширина для тарифов */
  border-bottom: 2px solid var(--vp-c-divider);
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
  white-space: nowrap; /* Ключевое свойство для гибкого первого столбца */
}
.cell-check {
  text-align: center;
}
.checkmark {
  color: var(--vp-c-brand-2);
  font-weight: bold;
}
.price-row {
  background-color: var(--vp-c-bg-soft);
}
.price-row .cell-check, .sub-price {
  white-space: nowrap;
}
.sub-price {
  font-size: 0.9em;
  opacity: 0.6;
}
</style>
