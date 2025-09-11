<template>
  <div class="brands-container">
    <div class="brand-card coffee-brand-card">
      <div class="brand-content">
        <h3>Корж</h3>
        <p class="description-main">Покорители сердец всей Самары — превратили город в одну большую кофейную семью.</p>
      </div>
    </div>
    <div class="brand-card coffee-brand-card">
      <div class="brand-content">
        <h3>Mosaic</h3>
        <p class="description-main">Складывают кофейную мозаику из лучших зерен планеты — каждая чашка как маленький шедевр Гауди.</p>
      </div>
    </div>
    <div class="brand-card coffee-brand-card">
      <div class="brand-content">
        <h3>Surf Coffee</h3>
        <p class="description-main">Ловят волны вкуса и подают их с пенкой — серферы от кофе, которые знают толк в правильном чиле на Волге.</p>
      </div>
    </div>
    <div class="brand-card coffee-brand-card">
      <div class="brand-content">
        <h3>Дринкит</h3>
        <p class="description-main">Айтишники кофейного мира с приложением мечты и сырной пенкой, от которой все теряют голову.</p>
      </div>
    </div>
    <div class="brand-card coffee-brand-card">
      <div class="brand-content">
        <h3>White Cup</h3>
        <p class="description-main">Минималисты-максималисты — доказывают, что белая чашка может вместить целую вселенную вкуса.</p>
      </div>
    </div>
    <div class="brand-card coffee-brand-card">
      <div class="brand-content">
        <h3>Толстой</h3>
        <p class="description-main">Винтажная машина времени с пластинками и завтраками — Лев Николаевич бы точно стал завсегдатаем.</p>
      </div>
    </div>
    <div class="brand-card coffee-brand-card">
      <div class="brand-content">
        <h3>На краю земли</h3>
        <p class="description-main">Романтики, которые нашли край земли прямо в Самаре (и там оказался восхитительный кофе!).</p>
      </div>
    </div>
    <div class="brand-card coffee-brand-card">
      <div class="brand-content">
        <h3>Юни</h3>
        <p class="description-main">Молодежная тусовка с лофтом и завтраками — место, где даже понедельник кажется пятницей.</p>
      </div>
    </div>
    <div class="brand-card coffee-brand-card">
      <div class="brand-content">
        <h3>Эспрессо бар</h3>
        <p class="description-main">Итальянские корни в российской почве — делают кофе быстрее АвтоВАЗа и вкуснее пиццы в Риме.</p>
      </div>
    </div>
    <div class="brand-card coffee-brand-card">
      <div class="brand-content">
        <h3>Элитория</h3>
        <p class="description-main">Кофейная аристократия с 15-летним стажем — здесь даже сахар чувствует себя VIP-персоной.</p>
      </div>
    </div>
    <div class="brand-card coffee-brand-card">
      <div class="brand-content">
        <h3>Аромэ</h3>
        <p class="description-main">Создатели кофейных духов — их зерна пахнут так, что соседи завидуют еще до дегустации.</p>
      </div>
    </div>
    <div class="brand-card coffee-brand-card">
      <div class="brand-content">
        <h3>Кофеваркин</h3>
        <p class="description-main">Семейное кофейное хозяйство, где каждое зернышко получает персональную заботу и ласку.</p>
      </div>
    </div>
    <div class="brand-card coffee-brand-card">
      <div class="brand-content">
        <h3>Твинс</h3>
        <p class="description-main">Близнецы кофейного счастья — двойная доза уюта и безграничной любви к капучино.</p>
      </div>
    </div>
    <div class="brand-card coffee-brand-card">
      <div class="brand-content">
        <h3>Мува</h3>
        <p class="description-main">Кофейное движение молодых и дерзких — тут даже бабушки становятся хипстерами после первого глотка.</p>
      </div>
    </div>
    <div class="brand-card special-brand-card">
      <div class="brand-content">
        <h3>Участвуете в фестивале?</h3>
        <p class="description-main"><a href="/fest2025#организатор">Подать заявку на участие →</a></p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.brand-card .description-main a {
  color: #10b981 !important;
  text-decoration: none;
  font-weight: 600 !important;
  transition: color 0.3s ease;
}

.brand-card .description-main a:hover {
  color: #34d399 !important;
}
</style>

<style>
.brands-container {
  display: flex !important;
  overflow-x: auto !important;
  gap: 12px !important;
  padding: 4px 0 12px 4px !important;
  margin: 24px 0 !important;
}

.brands-container::-webkit-scrollbar {
  height: 6px;
}

.brands-container::-webkit-scrollbar-thumb {
  background-color: var(--vp-c-divider);
  border-radius: 3px;
}

/* КАРТОЧКА БЕЗ ВНУТРЕННИХ ОТСТУПОВ */
.brand-card {
  flex: 0 0 260px;
  border-radius: 22px !important;
  overflow: hidden;
  padding: 0 !important; /* Убираем все отступы */
  border: none !important;
  background: transparent !important; /* Убираем фон карточки */
}

.coffee-brand-card {
  --glow-color: rgba(16, 185, 129, 0.25);
}

.special-brand-card {
  --glow-color: rgba(197, 249, 70, 0.25);
}

/* ЗЕЛЕНОЕ ПОЛЕ НА ВСЮ КАРТОЧКУ */
.brand-content {
  background: radial-gradient(circle at 50% 0%, var(--glow-color) 0%, transparent 70%);
  border-radius: 22px !important; /* Такой же радиус как у карточки */
  padding: 20px 16px !important;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100% !important;
  height: 100% !important;
  min-height: 160px; /* Минимальная высота */
  text-align: left;
  box-shadow: 0 10px 25px -10px rgba(0,0,0,0.3);
  position: relative;
  box-sizing: border-box !important;
}

.brand-card h3 {
  color: #ffffff !important;
  font-size: 16px !important;
  line-height: 1.4 !important;
  margin-top: 0 !important;
  margin-bottom: 8px !important;
  font-weight: 700 !important;
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}

.description-main {
  color: rgba(255, 255, 255, 0.9) !important;
  font-size: 14px !important;
  line-height: 1.6 !important;
  margin: 0 !important;
}

:root.dark .brand-card {
  background: transparent !important;
}
</style>
