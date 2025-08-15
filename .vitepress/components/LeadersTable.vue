<!-- .vitepress/components/LeadersTable.vue -->
<template>
  <div class="pricing-block">
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
/* Внешняя «рамка» — один-единственный слой с радиусом */
.pricing-block{
  margin:32px 0;
  border:2px solid #404040;
  border-radius:16px;
  background:#2a2a2a;
  overflow:hidden;            /* обрезает вложенные элементы по радиусу */
}

/* Если VitePress завернёт таблицу в .vp-table / .table-wrapper */
.pricing-block :is(.vp-table, .table-wrapper){
  background:transparent;
  border:none;
}

/* Сама таблица */
.pricing-table{
  width:100%;
  border-collapse:collapse;
  background:transparent;
}

/* Заголовок */
.pricing-table thead th{
  padding:16px 20px;
  font:600 16px/1.4 var(--vp-font-family-base, sans-serif);
  color:#fff;
  background:#1a1a1a;
  text-align:left;
  border:none;
}
.pricing-table thead th:last-child{
  color:#9aff00;
  text-align:center;
  white-space:nowrap;
}

/* Данные */
.pricing-table td{
  padding:16px 20px;
  font:14px/1.4 var(--vp-font-family-base, sans-serif);
  color:#e0e0e0;
  background:transparent;
  border-top:1px solid #333;
}
.pricing-table td:last-child{
  color:#9aff00;
  font-size:18px;
  font-weight:600;
  text-align:center;
}

/* Кнопка */
.partner-btn{
  width:100%;
  margin-top:24px;
  padding:14px 20px;
  font:600 16px/1 var(--vp-font-family-base, sans-serif);
  border:2px solid #9aff00;
  border-radius:8px;
  background:transparent;
  color:#9aff00;
  cursor:pointer;
  transition:.2s;
}
.partner-btn:hover{
  background:#9aff00;
  color:#1a1a1a;
}
</style>
