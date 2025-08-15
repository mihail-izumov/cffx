<!-- .vitepress/components/LeadersTable.vue -->
<template>
  <div class="pricing-block">
    <!-- Обёртка гарантирует единое скругление и фон -->
    <table class="pricing-table">
      <thead>
        <tr>
          <th>Преимущества</th>
          <th>₽390000/год</th>
        </tr>
      </thead>
      <tbody>
        <tr><td>Все, что в Симуляторе и Инсайдере, плюс:</td><td>✓</td></tr>
        <tr><td>Персональные рекомендации для пользователей симулятора</td><td>✓</td></tr>
        <tr><td>Участие в обратной связи по платформе</td><td>✓</td></tr>
        <tr><td>Приоритетный доступ к Чекапам</td><td>✓</td></tr>
        <tr><td>Место в совете BREW</td><td>✓</td></tr>
      </tbody>
    </table>
    <button class="partner-btn">Приглашение для партнёра</button>
  </div>
</template>

<style scoped>
/* 1. Внешний контейнер с единым скруглением */
.pricing-block {
  margin: 32px 0;
  border: 2px solid #404040;
  border-radius: 16px;
  background: #2a2a2a;
  overflow: hidden;
}

/* 2. Обнуление обёрток VitePress */
:deep(.vp-table),
:deep(.table-wrapper) {
  background: transparent !important;
  border: none !important;
  border-radius: 0 !important;
}

/* 3. Убрать шахматную заливку и вертикальные линии внутри обёртки */
:deep(.vp-table tr),
:deep(.vp-table tbody tr:nth-child(2n)),
:deep(.table-wrapper tr),
:deep(.table-wrapper tr:nth-child(2n)) {
  background: transparent !important;
}
:deep(.vp-table th),
:deep(.vp-table td),
:deep(.table-wrapper th),
:deep(.table-wrapper td) {
  border-right: none !important;
}

/* 4. Сами стили таблицы */
.pricing-table {
  width: 100%;
  border-collapse: collapse;
  background: transparent;
}

.pricing-table thead th {
  padding: 16px 20px;
  font: 600 16px/1.4 var(--vp-font-family-base, sans-serif);
  color: #fff;
  background: #1a1a1a;
  text-align: left;
  border: none;
}

.pricing-table thead th:last-child {
  color: #9aff00;
  text-align: center;
  white-space: nowrap;
}

.pricing-table td {
  padding: 16px 20px;
  font: 14px/1.4 var(--vp-font-family-base, sans-serif);
  color: #e0e0e0;
  background: transparent;
  border-top: 1px solid #333;
  vertical-align: middle;
}

.pricing-table td:last-child {
  color: #9aff00;
  font-size: 18px;
  font-weight: 600;
  text-align: center;
}

/* 5. Кнопка */
.partner-btn {
  width: 100%;
  margin-top: 24px;
  padding: 14px 20px;
  font: 600 16px/1 var(--vp-font-family-base, sans-serif);
  border: 2px solid #9aff00;
  border-radius: 8px;
  background: transparent;
  color: #9aff00;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}

.partner-btn:hover {
  background: #9aff00;
  color: #1a1a1a;
}
</style>
