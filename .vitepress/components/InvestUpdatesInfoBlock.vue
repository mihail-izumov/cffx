<template>
  <div class="early-access-widget">
    
    <!-- 
      SVG ФИЛЬТРЫ ДЛЯ ОБЪЕМА 
      Мы оставляем их в HTML, чтобы ссылаться на них через CSS filter: url(#...)
    -->
    <svg width="0" height="0" style="position: absolute; pointer-events: none;">
      <defs>
        <!-- Фильтр глубины (обычное состояние) -->
        <filter id="depth-effect">
          <feGaussianBlur in="SourceAlpha" stdDeviation="2"/>
          <feOffset dx="0" dy="2" result="offsetblur"/>
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.4"/>
          </feComponentTransfer>
          <feMerge>
            <feMergeNode/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>

        <!-- Фильтр глубины (hover состояние - тень сильнее) -->
        <filter id="depth-effect-hover">
          <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
          <feOffset dx="0" dy="4" result="offsetblur"/>
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.5"/>
          </feComponentTransfer>
          <feMerge>
            <feMergeNode/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
    </svg>

    <!-- ЗАГОЛОВОК -->
    <div class="header-section">
      <h2 class="widget-title">What's Early Access?</h2>
      <p class="widget-subtitle">
        Gains App will be Live soon, but with Early Access you'll get...
      </p>
    </div>

    <!-- СЕТКА КАРТОЧЕК -->
    <div class="cards-grid">
      
      <!-- КАРТОЧКА 1: Front of the queue -->
      <div class="glow-card">
        <div class="card-content">
          <div class="icon-wrapper">
            <!-- ИКОНКА ЧЕРЕЗ МАСКУ -->
            <!-- Использует файл /list-start-icon.svg -->
            <div class="masked-icon icon-list"></div>
          </div>
          
          <h3 class="card-title">Front of the queue</h3>
          <p class="card-text">
            With limited numbers of shares or tax relief available, late investors can lose out. Early Access ensures you're the first to know the minute the Opportunity is Live
          </p>
        </div>
      </div>

      <!-- КАРТОЧКА 2: Stay in the loop -->
      <div class="glow-card">
        <div class="card-content">
          <div class="icon-wrapper">
            <!-- ИКОНКА ЧЕРЕЗ МАСКУ -->
            <!-- Использует файл /heart-handshake-icon.svg -->
            <div class="masked-icon icon-heart"></div>
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
/* СБРОС СТИЛЕЙ VITEPRESS */
.early-access-widget :deep(h2) {
  border: none !important;
  margin: 0 !important;
  padding: 0 !important;
}

.early-access-widget {
  width: 100%;
  max-width: 100%;
  margin: 48px 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  /* Темный фон всего блока */
  background-color: #2a2a2a; 
  color: #e0e0e0;
  padding: 48px;
  border-radius: 32px;
  box-sizing: border-box;
}

/* --- ХЕДЕР --- */
.header-section {
  text-align: center;
  margin-bottom: 48px;
}

.widget-title {
  font-size: 32px !important;
  font-weight: 700 !important;
  color: #fff !important;
  margin-bottom: 16px !important;
  line-height: 1.2 !important;
  border: none !important;
}

.widget-subtitle {
  font-size: 18px !important;
  color: rgba(255, 255, 255, 0.6) !important;
  margin: 0 auto !important;
  line-height: 1.5 !important;
  max-width: 600px;
}

/* --- СЕТКА --- */
.cards-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

/* --- КАРТОЧКА --- */
.glow-card {
  position: relative;
  background: #1f1f1f;
  border-radius: 24px;
  padding: 40px 32px;
  border: none;
  box-shadow: inset 0 0 0 1px transparent;
  z-index: 1;
  background-clip: padding-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  height: 100%;
  transition: transform 0.3s ease;
}

.glow-card:hover {
  transform: translateY(-4px);
}

/* Градиентная рамка */
.glow-card::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 24px;
  padding: 1px; 
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.05) 50%, rgba(255, 255, 255, 0) 100%);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
  z-index: -1;
}

.glow-card:hover::before {
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.1) 50%, rgba(255, 255, 255, 0) 100%);
}

.card-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

/* --- 3D ИКОНКИ (CSS MASK + GRADIENT) --- */
.icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
}

/* Общий класс для иконок-масок */
.masked-icon {
  width: 64px;
  height: 64px;
  
  /* 1. Задаем ФИОЛЕТОВЫЙ ГРАДИЕНТ как фон */
  background: linear-gradient(180deg, #E9D5FF 0%, #C084FC 50%, #9333EA 100%);
  
  /* 2. Настраиваем маску */
  -webkit-mask-size: contain;
  -webkit-mask-repeat: no-repeat;
  -webkit-mask-position: center;
  mask-size: contain;
  mask-repeat: no-repeat;
  mask-position: center;
  
  /* 3. Применяем SVG фильтр для объема */
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  filter: url(#depth-effect) drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
}

/* Указываем конкретные файлы иконок */
.icon-list {
  -webkit-mask-image: url(/list-start-icon.svg);
  mask-image: url(/list-start-icon.svg);
}

.icon-heart {
  -webkit-mask-image: url(/heart-handshake-icon.svg);
  mask-image: url(/heart-handshake-icon.svg);
}

/* Hover эффекты */
.glow-card:hover .masked-icon {
  filter: url(#depth-effect-hover) drop-shadow(0 6px 12px rgba(168, 85, 247, 0.3));
  transform: translateY(-4px) scale(1.1);
}

/* --- ТЕКСТЫ --- */
.card-title {
  font-size: 22px !important;
  font-weight: 700 !important;
  color: #fff !important;
  margin: 0 !important;
}

.card-text {
  font-size: 16px !important;
  line-height: 1.6 !important;
  color: rgba(255, 255, 255, 0.7) !important;
  margin: 0 !important;
}

/* --- МОБИЛЬНАЯ ВЕРСИЯ --- */
@media (max-width: 768px) {
  .early-access-widget {
    padding: 32px 20px;
    margin: 32px 0;
    border-radius: 24px;
  }
  .widget-title { font-size: 26px !important; }
  .cards-grid { grid-template-columns: 1fr; }
}
</style>
