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

<h1 class="korzh-heading">Корж на связи</h1>

<p>
<strong>Каждая чашка кофе </strong> делает <br class="mobile-break">Вашу любимую кофейню еще лучше.
</p>

</div>

<style>
/* FIX #1: возвращаем пространство между бейджем и H1 (не трогая разметку) */
.korzh-badge {
  display: inline-block;
  margin-bottom: 14px;
}

/* Доп. фикс: делаем <br> после бейджа “высотой в зазор” */
.korzh-badge + br {
  display: block;
  line-height: 14px;
}

/* ваш код как был */
.vp-doc h1.korzh-heading {
  font-size: 52px !important;
  line-height: 1.1 !important;
  margin: 0 0 20px 0 !important;
  padding-top: 0 !important;
  font-weight: 600 !important;
}

/* ПЛАНШЕТЫ (от 601px до 768px)
Используем min-width, чтобы это правило НЕ касалось телефонов */
@media screen and (min-width: 601px) and (max-width: 768px) {
  .vp-doc h1.korzh-heading {
    font-size: 42px !important;
    line-height: 1.2 !important;
    margin-bottom: 15px !important;
  }
}

@media screen and (max-width: 600px) {
  .vp-doc h1.korzh-heading {
    font-size: 38px !important;
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

<br><br>

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
