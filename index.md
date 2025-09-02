---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "Ваша Умная Кофейня"
  text: "Начинается Здесь."
  tagline: "Получайте не отзывы, а энергию для роста. Управляйте лояльностью гостей на основе данных."
  image:
    src: /cffx-cup.png
    alt: Модуль Роста®
  actions:
    - theme: brand
      text: Подключить Кофейню
      link: /brew/membership

features:
  - title: Самара
    details: Найдите Умные Кофейни в Самаре 🚀 рядом c вами
    link: /smr
    linkText: Смотреть Сигналы
  - title: В каждой Умной Кофейне
    details: Технологии, которые становятся стандартом.
    link: /brew/run
    linkText: Как работают Сигналы
  - title: Мы – Умная Кофейня
    details: Открытая платформа, чтобы масштабировать ваш кофейный бизнес. Бесплатно и навсегда.
    link: /brew/run
    linkText: Пройти Чекап
---

<style>
.VPHome {
  background-image: url('/main-ban.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
}

/* Добавляем полупрозрачный оверлей для лучшей читаемости текста */
.VPHome::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 1;
}

/* Делаем контент поверх оверлея */
.VPHome .VPHero {
  position: relative;
  z-index: 2;
}
</style>
