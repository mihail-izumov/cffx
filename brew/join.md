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
/* базовая таблица */
.simple-table{
  width:100%;
  border-collapse:collapse;
}

/* строка-заголовок (чёрный фон, белый текст) */
.simple-table thead th{
  padding:10px 16px;
  height:48px;                 /* ниже — одинаковая высота всех строк */
  background:#1b1b1b;
  color:#ffffff;
  font:600 16px/1.2 var(--vp-font-family-base,sans-serif);
  text-align:left;
  border:none;
}

/* ячейка с ценой */
.simple-table thead th.price{
  color:#9aff00;
  text-align:center;
  white-space:nowrap;
}

/* обычные ячейки данных */
.simple-table tbody td{
  padding:10px 16px;
  height:48px;
  vertical-align:middle;       /* жёсткое центрирование по вертикали */
  border-top:1px solid var(--vp-c-divider,#cfcfcf);
  background:transparent;      /* убираем «зебру» */
  color:var(--vp-c-text-1,#333);
  font:14px/1.3 var(--vp-font-family-base,sans-serif);
}

/* зелёные галочки */
.simple-table td.check{
  text-align:center;
  color:#9aff00;
  font-size:18px;
  font-weight:600;
}

/* на всякий случай блокируем возможное поло­са­тие VitePress */
.simple-table tbody tr:nth-child(even){
  background:transparent !important;
}
</style>

## Для новых лидеров рынка

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
  <a href="/brew/koin/partner" class="btn btn-primary" rel="noopener noreferrer">Получить приглашение →</a>
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
