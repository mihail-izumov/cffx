---
outline: false
prev: false
next: false
pageClass: centered-page
title: Отправьте Сигнал – Корж, Skuratov, Surf, Mosaic, Белотурка, Кэрри
description: Сигнал – тому кто решает
---
<SignalProductsSlider />

<div align="center">

<BadgeCounter />

<h1 class="responsive-heading">Ваш Сигнал — тому,<br>кто решает.</h1>

<div style="height: 25px;"></div>

<p>
  Без регистрации.<br class="mobile-break"> <strong>Результат — в течение дня.</strong>
</p>

<DividerCustom />

<div style="border-top: 1px solid rgba(255, 255, 255, 0.15); margin-top: 50px; margin-bottom: 60px;"></div>

</div>

<MainSignalWidgetsCoffee />


<style>
/* По умолчанию скрываем тег <br> с классом .mobile-break */
.mobile-break {
  display: none;
}

/* Показываем <br> только на мобильных устройствах (экраны до 767px  включительно) */
@media (max-width: 767px) {
  .mobile-break {
    display: inline;
  }
}
</style>

<style>
.responsive-heading {
  font-size: 80px !important;
  line-height: 0.9 !important;
}

@media screen and (max-width: 768px) {
  .responsive-heading {
    font-size: 32px !important;
    line-height: 1.1 !important;
  }
}

@media screen and (max-width: 480px) {
  .responsive-heading {
    font-size: 22px !important;
    line-height: 1.1 !important;
  }
}
</style>
