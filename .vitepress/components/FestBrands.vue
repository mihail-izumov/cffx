<template>
  <div class="brands-container">
    <div class="brand-card">
      <h3>Корж</h3>
      <p class="description-main">Покорители сердец всей Самары — превратили город в одну большую кофейную семью.</p>
    </div>
<div class="brand-card">
      <h3>Mosaic</h3>
      <p class="description-main">Складывают кофейную мозаику из лучших зерен планеты — каждая чашка как маленький шедевр Гауди.</p>
    </div>
    <div class="brand-card">
      <h3>Surf Coffee</h3>
      <p class="description-main">Ловят волны вкуса и подают их с пенкой — серферы от кофе, которые знают толк в правильном чиле на Волге.</p>
    </div>
    <div class="brand-card">
      <h3>Дринкит</h3>
      <p class="description-main">Айтишники кофейного мира с приложением мечты и сырной пенкой, от которой все теряют голову (буквально).</p>
    </div>
    <div class="brand-card">
      <h3>White Cup</h3>
      <p class="description-main">Минималисты-максималисты — доказывают, что белая чашка может вместить целую вселенную вкуса.</p>
    </div>
    <div class="brand-card">
      <h3>Толстой</h3>
      <p class="description-main">Винтажная машина времени с пластинками и завтраками — Лев Николаевич бы точно стал завсегдатаем.</p>
    </div>
    <div class="brand-card">
      <h3>На краю земли</h3>
      <p class="description-main">Романтики, которые нашли край земли прямо в Самаре (и там оказался восхитительный кофе!).</p>
    </div>
    <div class="brand-card">
      <h3>Юни</h3>
      <p class="description-main">Молодежная тусовка с лофтом и завтраками — место, где даже понедельник кажется пятницей.</p>
    </div>
    <div class="brand-card">
      <h3>Эспрессо бар</h3>
      <p class="description-main">Итальянские корни в российской почве — делают кофе быстрее АвтоВАЗа и вкуснее пиццы в Риме.</p>
    </div>
    <div class="brand-card">
      <h3>Элитория</h3>
      <p class="description-main">Кофейная аристократия с 15-летним стажем — здесь даже сахар чувствует себя VIP-персоной.</p>
    </div>
    <div class="brand-card">
      <h3>Аромэ</h3>
      <p class="description-main">Создатели кофейных духов — их зерна пахнут так, что соседи завидуют еще до дегустации.</p>
    </div>
    <div class="brand-card">
      <h3>Кофеваркин</h3>
      <p class="description-main">Семейное кофейное хозяйство, где каждое зернышко получает персональную заботу и ласку.</p>
    </div>
    <div class="brand-card">
      <h3>Твинс</h3>
      <p class="description-main">Близнецы кофейного счастья — двойная доза уюта и безграничной любви к капучино.</p>
    </div>
    <div class="brand-card">
      <h3>Мува</h3>
      <p class="description-main">Кофейное движение молодых и дерзких — тут даже бабушки становятся хипстерами после первого глотка.</p>
    </div>
    <div class="brand-card">
      <h3>Участвуете в фестивале?</h3>
      <p class="description-main"><a href="/fest2025#организатор">Подать заявку на участие →</a></p>
    </div>
  </div>
</template>

<style scoped>
/* Стиль для ссылки в состоянии покоя */
.brand-card .description-main a {
  color: #555555; /* Темно-серый цвет */
  text-decoration: none; /* Убираем подчеркивание */
  transition: color 0.3s ease; /* Плавный переход цвета */
}
/* Стиль для ссылки при наведении курсора */
.brand-card .description-main a:hover {
  color: #000000; /* Черный цвет */
}
</style>

<style>
/* Контейнер для горизонтальной прокрутки */
.brands-container {
  display: flex !important;
  overflow-x: auto !important;
  gap: 12px !important; /* Уменьшен отступ между карточками */
  padding: 4px 0 12px 4px !important;
  margin: 24px 0 !important; /* Уменьшен вертикальный отступ всего блока */
}

/* Стилизация скроллбара */
.brands-container::-webkit-scrollbar {
  height: 6px;
}
.brands-container::-webkit-scrollbar-thumb {
  background-color: var(--vp-c-divider);
  border-radius: 3px;
}

/* --- СТИЛИ КАРТОЧКИ --- */
.brand-card {
  flex: 0 0 260px; /* Фиксированная ширина карточки */
  background-color: #f5f5f7 !important;
  border-radius: 12px !important;
  padding: 20px 16px !important; /* Уменьшены внутренние отступы */
  border: none !important;
}

/* В тёмной теме фон карточки можно сделать чуть темнее для лучшей интеграции */
:root.dark .brand-card {
    background-color: #eaeaef !important;
}

/* --- СТИЛИ ЗАГОЛОВКА --- */
.brand-card h3 {
  color: #1a1a1a !important;
  font-size: 16px !important;
  line-height: 1.4 !important;
  margin-top: 0 !important;
  margin-bottom: 8px !important; /* Уменьшен отступ под заголовком */
  font-weight: 700 !important;
}

/* --- СТИЛИ ТЕКСТА --- */
/* Описание - чёрный */
.description-main {
  color: #1a1a1a !important;
  font-size: 14px !important;
  line-height: 1.6 !important;
  margin: 0 !important;
}
</style>
