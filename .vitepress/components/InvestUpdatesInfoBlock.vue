<template>
  <div class="widget-container">
    
    <!-- ЗАГОЛОВОК БЛОКА -->
    <div class="header-section">
      <h2 class="main-title">What's Early Access?</h2>
      <p class="subtitle">
        Gains App will be Live soon, but with Early Access you'll get...
      </p>
    </div>

    <!-- СЕТКА КАРТОЧЕК -->
    <div class="cards-grid">
      
      <!-- КАРТОЧКА 1 -->
      <div class="glow-card">
        <div class="card-content">
          <!-- Иконка: Front of the queue (People) -->
          <div class="icon-wrapper orange">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>ircle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          </div>
          
          <h3 class="card-title">Front of the queue</h3>
          
          <p class="card-text">
            With limited numbers of shares or tax relief available, late investors can lose out. Early Access ensures you're the first to know the minute the Opportunity is Live
          </p>
        </div>
      </div>

      <!-- КАРТОЧКА 2 -->
      <div class="glow-card">
        <div class="card-content">
          <!-- Иконка: Stay in the loop (Megaphone) -->
          <div class="icon-wrapper orange">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 11 18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/></svg>
          </div>

          <h3 class="card-title">Stay in the loop</h3>

          <p class="card-text">
            Get regular updates directly from the company before their raise goes Live, helping you make an investment decision as early as possible.
          </p>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
.widget-container {
  width: 100%;
  max-width: 100%;
  margin: 48px 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  /* Фон основного контейнера (как в примере) */
  background-color: #1a1a1a; 
  color: #e0e0e0;
  padding: 40px;
  border-radius: 32px; /* Скругляем и сам контейнер тоже */
}

/* --- ЗАГОЛОВКИ --- */
.header-section {
  text-align: center;
  margin-bottom: 40px;
}

.main-title {
  font-size: 32px;
  font-weight: 700;
  color: #fff;
  margin: 0 0 16px 0;
  line-height: 1.2;
}

.subtitle {
  font-size: 18px;
  color: rgba(255, 255, 255, 0.6);
  margin: 0;
  line-height: 1.5;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

/* --- СЕТКА --- */
.cards-grid {
  display: grid;
  grid-template-columns: 1fr 1fr; /* Две колонки */
  gap: 24px;
}

/* --- КАРТОЧКА С МАГИЧЕСКОЙ ОБВОДКОЙ (glow-card) --- */
/* Стили скопированы из .wide-card и адаптированы */
.glow-card {
  position: relative;
  background: #2a2a2a;
  border-radius: 24px;
  padding: 32px;
  border: none;
  box-shadow: inset 0 0 0 1px transparent;
  z-index: 1;
  background-clip: padding-box;
  
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  height: 100%; /* Чтобы карточки были одинаковой высоты */
}

/* Псевдо-элемент для ГРАДИЕНТНОЙ РАМКИ */
.glow-card::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 24px;
  padding: 1px; 
  /* Градиент: Белый сверху -> Прозрачный снизу */
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.1) 50%, rgba(255, 255, 255, 0) 100%);
  
  -webkit-mask: 
     linear-gradient(#fff 0 0) content-box, 
     linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  
  pointer-events: none;
  z-index: -1;
}

/* Ховер эффект для рамки */
.glow-card:hover::before {
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.2) 50%, rgba(255, 255, 255, 0) 100%);
}

.card-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

/* ИКОНКИ */
.icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  margin-bottom: 8px;
}

/* Делаем иконки оранжевыми, как на скриншоте, чтобы был акцент */
.icon-wrapper.orange {
  color: #FF5722; /* Оранжевый цвет (можно заменить на белый, если нужно строго ч/б) */
}

.icon-wrapper svg {
  width: 100%;
  height: 100%;
}

.card-title {
  font-size: 22px;
  font-weight: 700;
  color: #fff;
  margin: 0;
}

.card-text {
  font-size: 16px;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
}

/* --- МОБИЛЬНАЯ ВЕРСИЯ --- */
@media (max-width: 768px) {
  .widget-container {
    padding: 24px;
    margin: 32px 0;
  }

  .main-title {
    font-size: 24px;
  }
  
  .subtitle {
    font-size: 16px;
  }

  .cards-grid {
    grid-template-columns: 1fr; /* Одна колонка */
    gap: 16px;
  }

  .glow-card {
    padding: 24px;
  }
}
</style>
