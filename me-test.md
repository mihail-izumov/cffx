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

<div class="hero-header">
  <span class="korzh-badge">Где начинается ваша кофейня</span>
  <h1 class="responsive-heading-signal-industries">Корж на связи</h1>
</div>

<style>
.hero-header {
  text-align: center;
}

.hero-header .korzh-badge {
  display: block;
  margin-bottom: 20px;  /* ← Пространство вместо <br> */
}

.vp-doc h1.responsive-heading-signal-industries {
  font-size: 46px !important;
  line-height: 1.1 !important;
  margin: 0 0 20px 0 !important;  /* Убираем top */
  font-weight: 700 !important;
}

/* Мобильные — только размер */
@media (max-width: 768px) {
  .hero-header .korzh-badge {
    margin-bottom: 16px;  /* Меньше на мобиле */
  }
  .vp-doc h1.responsive-heading-signal-industries {
    font-size: 32px !important;
    line-height: 1.3 !important;
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
