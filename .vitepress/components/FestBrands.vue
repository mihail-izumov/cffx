<template>
  <div class="festival-brands-container">
    <div class="festival-brand-card festival-coffee-brand">
      <div class="festival-brand-content">
        <h3>Mosaic</h3>
        <p class="festival-description-main">Складывают кофейную мозаику из лучших зерен планеты — каждая чашка как маленький шедевр Гауди.</p>
      </div>
    </div>
    <div class="festival-brand-card festival-coffee-brand">
      <div class="festival-brand-content">
        <h3>Surf Coffee</h3>
        <p class="festival-description-main">Ловят волны вкуса и подают их с пенкой — серферы от кофе, которые знают толк в правильном чиле на Волге.</p>
      </div>
    </div>
    <div class="festival-brand-card festival-coffee-brand">
      <div class="festival-brand-content">
        <h3>Дринкит</h3>
        <p class="festival-description-main">Айтишники кофейного мира с приложением мечты и сырной пенкой, от которой все теряют голову.</p>
      </div>
    </div>
    <div class="festival-brand-card festival-coffee-brand">
      <div class="festival-brand-content">
        <h3>White Cup</h3>
        <p class="festival-description-main">Минималисты-максималисты — доказывают, что белая чашка может вместить целую вселенную вкуса.</p>
      </div>
    </div>
    <div class="festival-brand-card festival-coffee-brand">
      <div class="festival-brand-content">
        <h3>Толстой</h3>
        <p class="festival-description-main">Винтажная машина времени с пластинками и завтраками — Лев Николаевич бы точно стал завсегдатаем.</p>
      </div>
    </div>
    <div class="festival-brand-card festival-coffee-brand">
      <div class="festival-brand-content">
        <h3>На краю земли</h3>
        <p class="festival-description-main">Романтики, которые нашли край земли прямо в Самаре (и там оказался восхитительный кофе!).</p>
      </div>
    </div>
    <div class="festival-brand-card festival-coffee-brand">
      <div class="festival-brand-content">
        <h3>Юни</h3>
        <p class="festival-description-main">Молодежная тусовка с лофтом и завтраками — место, где даже понедельник кажется пятницей.</p>
      </div>
    </div>
    <div class="festival-brand-card festival-coffee-brand">
      <div class="festival-brand-content">
        <h3>Эспрессо бар</h3>
        <p class="festival-description-main">Итальянские корни в российской почве — делают кофе быстрее АвтоВАЗа и вкуснее пиццы в Риме.</p>
      </div>
    </div>
    <div class="festival-brand-card festival-coffee-brand">
      <div class="festival-brand-content">
        <h3>Элитория</h3>
        <p class="festival-description-main">Кофейная аристократия с 15-летним стажем — здесь даже сахар чувствует себя VIP-персоной.</p>
      </div>
    </div>
    <div class="festival-brand-card festival-coffee-brand">
      <div class="festival-brand-content">
        <h3>Аромэ</h3>
        <p class="festival-description-main">Создатели кофейных духов — их зерна пахнут так, что соседи завидуют еще до дегустации.</p>
      </div>
    </div>
    <div class="festival-brand-card festival-coffee-brand">
      <div class="festival-brand-content">
        <h3>Кофеваркин</h3>
        <p class="festival-description-main">Семейное кофейное хозяйство, где каждое зернышко получает персональную заботу и ласку.</p>
      </div>
    </div>
    <div class="festival-brand-card festival-coffee-brand">
      <div class="festival-brand-content">
        <h3>Твинс</h3>
        <p class="festival-description-main">Близнецы кофейного счастья — двойная доза уюта и безграничной любви к капучино.</p>
      </div>
    </div>
    <div class="festival-brand-card festival-coffee-brand">
      <div class="festival-brand-content">
        <h3>Мува</h3>
        <p class="festival-description-main">Кофейное движение молодых и дерзких — тут даже бабушки становятся хипстерами после первого глотка.</p>
      </div>
    </div>
    <div class="festival-brand-card festival-special-brand">
      <div class="festival-brand-content">
        <h3>Участвуете в фестивале?</h3>
        <p class="festival-description-main"><a href="/fest#организатор">Подать заявку на участие →</a></p>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* ВСЕ СТИЛИ ПОЛНОСТЬЮ ИЗОЛИРОВАНЫ С УНИКАЛЬНЫМИ КЛАССАМИ */

/* Контейнер для горизонтальной прокрутки */
.festival-brands-container {
  display: flex !important;
  overflow-x: auto !important;
  gap: 12px !important;
  padding: 4px 0 12px 4px !important;
  margin: 24px 0 !important;
}

/* Стилизация скроллбара */
.festival-brands-container::-webkit-scrollbar {
  height: 6px;
}

.festival-brands-container::-webkit-scrollbar-thumb {
  background-color: var(--vp-c-divider);
  border-radius: 3px;
}

/* КАРТОЧКА С ВИДИМОЙ ЗЕЛЕНОЙ ОБВОДКОЙ */
.festival-brand-card {
  flex: 0 0 260px;
  border-radius: 22px !important;
  overflow: hidden;
  padding: 0 !important;
  background: var(--vp-c-bg-soft) !important;
  /* ВИДИМАЯ ЗЕЛЕНАЯ ОБВОДКА */
  border: 2px solid rgba(16, 185, 129, 0.6) !important;
  box-shadow: 0 0 8px 1px rgba(16, 185, 129, 0.3) !important;
}

/* Цветовые схемы */
.festival-coffee-brand {
  --festival-glow-color: rgba(16, 185, 129, 0.25);
  --festival-border-color: rgba(16, 185, 129, 0.6);
  --festival-shadow-color: rgba(16, 185, 129, 0.3);
}

.festival-special-brand {
  --festival-glow-color: rgba(197, 249, 70, 0.25);
  --festival-border-color: rgba(197, 249, 70, 0.7);
  --festival-shadow-color: rgba(197, 249, 70, 0.4);
  border-color: var(--festival-border-color) !important;
  box-shadow: 0 0 8px 1px var(--festival-shadow-color) !important;
}

/* ЗЕЛЕНОЕ ПОЛЕ НА ВСЮ КАРТОЧКУ */
.festival-brand-content {
  background: radial-gradient(circle at 50% 0%, var(--festival-glow-color) 0%, transparent 70%);
  border-radius: 20px !important;
  padding: 20px 16px !important;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100% !important;
  height: 100% !important;
  min-height: 160px;
  text-align: left;
  box-shadow: 0 10px 25px -10px rgba(0,0,0,0.3) !important;
  position: relative;
  z-index: 2;
  box-sizing: border-box !important;
}

/* --- СТИЛИ ЗАГОЛОВКА --- */
.festival-brand-card h3 {
  color: #ffffff !important;
  font-size: 16px !important;
  line-height: 1.4 !important;
  margin-top: 0 !important;
  margin-bottom: 8px !important;
  font-weight: 700 !important;
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}

/* --- СТИЛИ ТЕКСТА --- */
.festival-description-main {
  color: rgba(255, 255, 255, 0.9) !important;
  font-size: 14px !important;
  line-height: 1.6 !important;
  margin: 0 !important;
}

/* Стиль для ссылки в состоянии покоя */
.festival-brand-card .festival-description-main a {
  color: #10b981 !important;
  text-decoration: none;
  font-weight: 600 !important;
  transition: color 0.3s ease;
}

/* Стиль для ссылки при наведении курсора */
.festival-brand-card .festival-description-main a:hover {
  color: #34d399 !important;
  text-shadow: 0 0 8px rgba(52, 211, 153, 0.4) !important;
}

/* В темной теме */
:root.dark .festival-brand-card {
  background: var(--vp-c-bg-soft) !important;
}
</style>
