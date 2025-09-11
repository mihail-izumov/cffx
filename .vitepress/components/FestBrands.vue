<template>
  <div class="brands-container">
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
      <p class="description-main">Айтишники кофейного мира с приложением мечты и сырной пенкой, от которой все теряют голову.</p>
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
    <div class="brand-card special-card">
      <h3>Участвуете в фестивале?</h3>
      <p class="description-main"><a href="/fest2025#организатор">Подать заявку на участие →</a></p>
    </div>
  </div>
</template>

<style scoped>
/* Стиль для ссылки в состоянии покоя */
.brand-card .description-main a {
  color: #059669 !important; /* Зеленый цвет для ссылки */
  text-decoration: none;
  font-weight: 600 !important;
  transition: color 0.3s ease;
}

/* Стиль для ссылки при наведении курсора */
.brand-card .description-main a:hover {
  color: #047857 !important; /* Более темный зеленый при наведении */
}
</style>

<style>
/* Контейнер для горизонтальной прокрутки */
.brands-container {
  display: flex !important;
  overflow-x: auto !important;
  gap: 12px !important;
  padding: 4px 0 12px 4px !important;
  margin: 24px 0 !important;
}

/* Стилизация скроллбара */
.brands-container::-webkit-scrollbar {
  height: 6px;
}

.brands-container::-webkit-scrollbar-thumb {
  background-color: var(--vp-c-divider);
  border-radius: 3px;
}

/* --- СТИЛИ КАРТОЧКИ (ВЫВОРОТКА) --- */
.brand-card {
  flex: 0 0 260px;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%) !important; /* Светлый градиент */
  border-radius: 12px !important;
  padding: 20px 16px !important;
  border: 2px solid #10b981 !important; /* Яркая зеленая рамка */
  transition: all 0.3s ease !important;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.15) !important; /* Зеленоватая тень */
  position: relative !important;
  overflow: hidden !important;
}

/* Декоративный элемент */
.brand-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background: linear-gradient(90deg, #10b981, #059669, #047857) !important;
}

/* Эффект hover для карточек */
.brand-card:hover {
  background: linear-gradient(135deg, #ffffff 0%, #f1f5f9 100%) !important;
  border-color: #059669 !important;
  transform: translateY(-4px) !important;
  box-shadow: 0 8px 25px rgba(16, 185, 129, 0.25) !important;
}

/* Специальная карточка для призыва к действию */
.special-card {
  background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%) !important;
  border-color: #059669 !important;
  box-shadow: 0 4px 12px rgba(5, 150, 105, 0.2) !important;
}

.special-card:hover {
  background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%) !important;
  box-shadow: 0 8px 25px rgba(5, 150, 105, 0.3) !important;
}

/* В темной теме делаем более контрастные светлые карточки */
:root.dark .brand-card {
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%) !important;
  border-color: #10b981 !important;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.2) !important;
}

:root.dark .brand-card:hover {
  background: linear-gradient(135deg, #ffffff 0%, #f1f5f9 100%) !important;
  box-shadow: 0 8px 25px rgba(16, 185, 129, 0.3) !important;
}

:root.dark .special-card {
  background: linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%) !important;
}

/* --- СТИЛИ ЗАГОЛОВКА --- */
.brand-card h3 {
  color: #1f2937 !important; /* Темный цвет для контраста на светлом фоне */
  font-size: 16px !important;
  line-height: 1.4 !important;
  margin-top: 0 !important;
  margin-bottom: 8px !important;
  font-weight: 700 !important;
}

/* --- СТИЛИ ТЕКСТА --- */
.description-main {
  color: #374151 !important; /* Темно-серый для основного текста */
  font-size: 14px !important;
  line-height: 1.6 !important;
  margin: 0 !important;
}
</style>
