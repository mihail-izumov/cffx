<template>
  <div class="table-wrapper">
    <table class="responsive-table">
      <colgroup>
        <col /> <!-- Гибкий столбец для десктопа -->
        <col /> <!-- Столбцы тарифов теперь тоже гибкие -->
        <col />
        <col />
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
/* Мы больше НЕ задаем фиксированную ширину столбцам */
