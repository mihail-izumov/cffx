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
  border-collapse: collapse;
}

/* Заголовок */
.simple-table thead th {
  padding: 10px 16px;
  height: 48px;
  line-height: 48px;                      /* центр по вертикали */
  background: #1b1b1b;
  color: #ffffff;
  font-weight: 600;
  font-size: 16px;
  text-align: left;
  border: none;
  border-bottom: 2px solid #404040;       /* чёткая обводка под шапкой */
}

/* Цена в шапке */
.simple-table thead th.price {
  text-align: center;
  color: #9aff00;
  white-space: nowrap;
}

/* Данные */
.simple-table tbody td {
  padding: 10px 16px;
  height: 48px;
  line-height: 48px;                      /* центр по вертикали */
  text-align: left;
  font-size: 14px;
  color: var(--vp-c-text-1, #333333);
  border-top: 1px solid var(--vp-c-divider, #cccccc);
  background: transparent;                /* убираем «зебру» */
}

/* Галочка */
.simple-table td.check {
  text-align: center;
  color: #9aff00;
  font-size: 18px;
  font-weight: 600;
}

/* Если VitePress добавляет «зебру» */
.simple-table tbody tr:nth-child(even),
.simple-table tbody tr:nth-child(odd) {
  background: transparent !important;
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
