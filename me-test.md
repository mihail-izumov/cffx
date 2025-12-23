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

<div align="center">

<span class="korzh-badge">Где начинается ваша кофейня</span> <br>

<h1 class="responsive-heading-signal-industries">Корж на связи</h1>

<p>
  <strong>Каждая чашка кофе </strong> делает <br class="mobile-break">Вашу любимую кофейню еще лучше.
</p>

</div>

<style>
/* БАЗОВЫЙ СТИЛЬ (Десктоп) */
.vp-doc h1.responsive-heading-signal-industries {
  font-size: 46px !important;
  line-height: 1.1 !important;
  margin: 0 0 20px 0 !important;
  padding-top: 0 !important;
  font-weight: 700 !important;
}

/* ПЛАНШЕТЫ (от 601px до 768px) 
   Используем min-width, чтобы это правило НЕ касалось телефонов */
@media screen and (min-width: 601px) and (max-width: 768px) {
  .vp-doc h1.responsive-heading-signal-industries {
    font-size: 32px !important;
    line-height: 1.2 !important;
    margin-bottom: 15px !important;
  }
}

/* ТЕЛЕФОНЫ (всё, что меньше 600px)*/
@media screen and (max-width: 600px) {
  .vp-doc h1.responsive-heading-signal-industries {
    font-size: 26px !important;
    line-height: 1.2 !important;
    margin-bottom: 15px !important;
  }
}
</style>


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

<KorzhWidget2/>

<br>

<ShareButton/>

<br>

<div align="center">

# Хотите отправить подарок?

Доставляем подарки команде Коржа. Просто поздравить или сказать "Спасибо".

</div>

<KorzhGiftsSlider/>

<br>

<div align="center">

# Поделитесь настроением

Сделайте фото и добавьте несколько теплых слов. Ваш сториз увидят друзья, а команде будет приятно.

</div>

<KorzhCardsSlider/>

<br>

<div align="center">

# Инвестируйте в новые кофейни

Станьте частью истории успеха.

</div>

<InvestKorzhBanner />

<br>

<SignalWidgetBadge />
