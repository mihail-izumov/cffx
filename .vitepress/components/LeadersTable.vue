<template>
  <div class="wrapper">
    <table class="pricing-table">
      <thead>
        <tr>
          <th>Преимущества</th>
          <th>₽390000/год</th>
        </tr>
      </thead>

      <tbody>
        <tr><td>Все, что в Симуляторе и&nbsp;Инсайдере, плюс:</td><td>✓</td></tr>
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
.wrapper{
  margin:32px 0;
}

/* таблица */
.pricing-table{
  width:100%;
  border-collapse:collapse;
  background:#2a2a2a;
  border:2px solid #404040;
  border-radius:16px;
  overflow:hidden;
}

/* заголовок */
.pricing-table thead th{
  padding:16px 20px;
  font:600 16px/1.4 var(--vp-font-family-base, sans-serif);
  background:#1a1a1a;
  color:#fff;
  text-align:left;
  border:none;
}
.pricing-table thead th:last-child{
  color:#9aff00;
  text-align:center;
  white-space:nowrap;
}

/* ячейки данных */
.pricing-table td{
  padding:16px 20px;
  font:14px/1.4 var(--vp-font-family-base, sans-serif);
  color:#e0e0e0;
  background:#2a2a2a;
  border-top:1px solid #333;
}
.pricing-table td:last-child{
  color:#9aff00;
  font-size:18px;
  font-weight:600;
  text-align:center;
}

/* кнопка */
.partner-btn{
  width:100%;
  margin-top:24px;
  padding:14px 20px;
  font:600 16px/1 var(--vp-font-family-base, sans-serif);
  border-radius:8px;
  border:2px solid #9aff00;
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
