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
/* Стиль для ссылки в состоянии покоя */
.brand-card .description-main a {
  color: #10b981 !important;
  text-decoration: none;
  font-weight: 600 !important;
  transition: all 0.3s ease;
}

/* Стиль для ссылки при наведении курсора */
.brand-card .description-main a:hover {
  color: #34d399 !important;
  text-shadow: 0 0 10px rgba(52, 211, 153, 0.5);
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

/* --- ОСНОВНЫЕ СТИЛИ КАРТОЧЕК --- */
.brand-card {
  flex: 0 0 260px;
  position: relative;
  border-radius: 22px !important;
  transition: transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1) !important;
  overflow: hidden;
  background: var(--vp-c-bg-soft) !important;
  border: 2px solid transparent !important;
}

.brand-card:hover {
  transform: translateY(-8px) !important;
}

/* Рамка точно по периметру карточки */
.brand-card::before {
  content: '';
  position: absolute;
  inset: -2px; /* Убираем padding, делаем рамку точно по границе */
  border-radius: 22px;
  background: var(--border-gradient);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  transition: filter 0.4s ease;
  z-index: 1;
}

.brand-card:hover::before {
  filter: brightness(2) saturate(1.5);
}

/* Стили для обычных кофейных карточек - ЗЕЛЕНАЯ ГАММА */
.coffee-brand-card {
  --border-gradient: linear-gradient(135deg, #059669, #10b981, #34d399);
  --glow-color: rgba(16, 185, 129, 0.25);
  --glow-hover-color: rgba(16, 185, 129, 0.6);
}

/* Стили для специальной карточки - ЯРКИЙ ЗЕЛЕНЫЙ */
.special-brand-card {
  --border-gradient: linear-gradient(135deg, #4d7c0f, #a3e635, #C5F946);
  --glow-color: rgba(197, 249, 70, 0.25);
  --glow-hover-color: rgba(197, 249, 70, 0.6);
}

/* Контент карточки */
.brand-content {
  background: radial-gradient(circle at 50% 0%, var(--glow-color) 0%, transparent 70%);
  border-radius: 20px;
  padding: 20px 16px !important;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  text-align: left;
  box-shadow: 0 10px 25px -10px rgba(0,0,0,0.3);
  transition: all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
  position: relative;
  z-index: 2;
}

.brand-card:hover .brand-content {
  background: radial-gradient(circle at 50% 0%, var(--glow-hover-color) 0%, transparent 70%);
  box-shadow: 0 25px 50px -10px rgba(0,0,0,0.4);
}

/* --- СТИЛИ ЗАГОЛОВКА --- */
.brand-card h3 {
  color: #ffffff !important;
  font-size: 16px !important;
  line-height: 1.4 !important;
  margin-top: 0 !important;
  margin-bottom: 8px !important;
  font-weight: 700 !important;
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  transition: transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
}

.brand-card:hover h3 {
  transform: scale(1.05);
  text-shadow: 0 0 20px rgba(0, 0, 0, 0.7);
}

/* --- СТИЛИ ТЕКСТА --- */
.description-main {
  color: rgba(255, 255, 255, 0.9) !important;
  font-size: 14px !important;
  line-height: 1.6 !important;
  margin: 0 !important;
  transition: transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
}

.brand-card:hover .description-main {
  transform: scale(1.02);
}

/* В темной теме сохраняем тот же эффект */
:root.dark .brand-card {
  background: var(--vp-c-bg-soft) !important;
}

/* Адаптивность */
@media (max-width: 768px) {
  .brand-card {
    transition: none !important;
  }
  
  .brand-card:hover {
    transform: none !important;
  }
  
  .brand-content {
    box-shadow: 0 4px 12px -4px rgba(0,0,0,0.2) !important;
  }
  
  .brand-card:hover .brand-content {
    box-shadow: 0 4px 12px -4px rgba(0,0,0,0.2) !important;
  }
  
  .brand-card:hover h3,
  .brand-card:hover .description-main {
    transform: none !important;
  }
}
</style>
