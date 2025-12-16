---
outline: false
prev: false
next: false
title: Отправьте Сигнал в Корж
description: Где Начинается Ваша Кофейня
head:
  - - meta
    - property: "og:image"
      content: "https://cffx.ru/korzh_og_card.jpg"
---

</div>

<div align="center">

<span class="korzh-badge">Где начинается ваша кофейня</span> <br>

<h1>
  <span>Отправьте Сигнал</span><br class="mobile-break"> <span>в Корж</span>
</h1>

<p>
  <strong>Каждая чашка кофе</strong> делает <br class="mobile-break">Вашу любимую кофейню еще лучше.
</p>

<style>
/* По умолчанию скрываем тег <br> с классом .mobile-break */
.mobile-break {
  display: none;
}

/* Показываем <br> только на мобильных устройствах (экраны до 767px включительно) */
@media (max-width: 767px) {
  .mobile-break {
    display: inline;
  }
}

/* НОВОЕ: Убираем ограничение ширины VitePress для виджета */
.vp-doc {
  max-width: 100% !important;
}

.vp-doc .content-container,
.vp-doc .container {
  max-width: 100% !important;
}
</style>

<KorzhWidget />
<br>
<SignalWidgetBadge />

<br>

<InvestKorzhBanner />
