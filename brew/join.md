---
outline: false
---

# Подключитесь к Умной Кофейне

<div style="text-align: center; margin: 2rem 0;">
  <img 
    src="/join-now_ban.webp" 
    alt="BREW intro"
    style="
      width: 100%;
      max-width: 800px;
      height: auto;
      border-radius: max(12px, min(24px, 3vw));
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s ease;
    "
    onmouseover="this.style.transform='scale(1.02)'"
    onmouseout="this.style.transform='scale(1)'"
  />
</div>

## Два способа начать игру по своим правилам

<MembershipCards />

### Что внутри

<TariffFeatures />

## Для новых лидеров рынка

<style>
.simple-table {
  width: 100%;
  border-collapse: separate;      /* отдельные бордеры */
  border-spacing: 0;              /* без отступов */
  border: 2px solid var(--vp-c-divider,#444);
  border-radius: 10px;            /* скругление внешней рамки */
  overflow: hidden;
}

.simple-table th,
.simple-table td {
  height: 48px;
  padding: 0 16px;
  vertical-align: middle;
}

/* заголовок */
.simple-table thead th {
  background: #1b1b1b;
  color: #fff;
  font-weight: 600;
  font-size: 16px;
  border-bottom: 1px solid var(--vp-c-divider,#444);
}

/* цена */
.simple-table thead th.price {
  color: #9aff00;
  text-align: center;
  white-space: nowrap;
}

/* строки данных */
.simple-table tbody td {
  border-top: 1px solid var(--vp-c-divider,#444);
  font: 14px/1.3 var(--vp-font-family-base,sans-serif);
  color: var(--vp-c-text-1,#333);
}

/* галочки */
.simple-table td.check {
  text-align: center;
  color: #9aff00;
  font-size: 18px;
  font-weight: 600;
}

/* силаст отключаем зебру */
.simple-table tbody tr:nth-child(even) {
  background: transparent !important;
}
</style>


<table class="simple-table">
  <thead>
    <tr>
      <th>Преимущества</th>
      <th class="price">₽390000/год</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Все, что в Симуляторе и Инсайдере, плюс:</td>
      <td class="check">✓</td>
    </tr>
    <tr>
      <td>Персональные рекомендации для пользователей симулятора</td>
      <td class="check">✓</td>
    </tr>
    <tr>
      <td>Участие в обратной связи по платформе</td>
      <td class="check">✓</td>
    </tr>
    <tr>
      <td>Приоритетный доступ к Чекапам</td>
      <td class="check">✓</td>
    </tr>
    <tr>
      <td>Место в совете BREW</td>
      <td class="check">✓</td>
    </tr>
  </tbody>
</table>



<div class="start-button-container">
  <a href="/brew/join/partner" class="btn btn-primary" rel="noopener noreferrer">Получить приглашение →</a>
</div>

<style>
/* --- ОБЩИЕ СТИЛИ ДЛЯ ВСЕХ КНОПОК --- */
.btn {
  display: inline-block;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 700;
  font-size: 16px;
  text-align: center;
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: pointer;
  border: none;
  margin: 10px 0;
}

.btn:hover {
  transform: translateY(-2px);
  text-decoration: none !important;
}

/* --- СТИЛЬ ОСНОВНОЙ КНОПКИ (ЯРКАЯ) --- */
.btn-primary {
  background-color: #C5F946; /* Яркий лаймовый */
  color: #000 !important;
}

.btn-primary:hover {
  background-color: #347b6c; /* Темный при наведении */
  color: white !important;
}

/* --- Контейнер для отдельной кнопки --- */
.start-button-container {
  margin: 20px 0;
  text-align: left;
}

.start-button-container .btn {
  display: inline-block;
  margin: 0;
}
</style>
