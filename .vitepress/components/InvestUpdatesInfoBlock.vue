<template>
  <div class="early-access-widget">
    <!-- SVG DEFINITIONS: градиент + фильтры объёма -->
    <svg width="0" height="0" style="position: absolute; pointer-events: none;">
      <defs>
        <!-- Приглушённый фиолетовый градиент (матовый, премиальный) -->
        <linearGradient id="icon-gradient-purple-soft" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"  style="stop-color:#E0D7F8; stop-opacity:1" />
          <stop offset="45%" style="stop-color:#C1B5F0; stop-opacity:1" />
          <stop offset="100%" style="stop-color:#8E7CC3; stop-opacity:1" />
        </linearGradient>

        <!-- Фильтр глубины (обычное состояние) -->
        <filter id="depth-effect">
          <feGaussianBlur in="SourceAlpha" stdDeviation="2" />
          <feOffset dx="0" dy="2" result="offsetblur" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.35" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <!-- Фильтр глубины (hover — тень сильнее) -->
        <filter id="depth-effect-hover">
          <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
          <feOffset dx="0" dy="4" result="offsetblur" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.45" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
    </svg>

    <!-- ЗАГОЛОВОК БЛОКА -->
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
            <!-- Полная иконка list-start с приглушённым фиолетовым градиентом -->
            <svg
              class="icon-3d"
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              stroke="url(#icon-gradient-purple-soft)"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              filter="url(#depth-effect)"
            >
              <path d="M3 5h6" />
              <path d="M3 12h13" />
              <path d="M3 19h13" />
              <path d="m16 8-3-3 3-3" />
              <path d="M21 19V7a2 2 0 0 0-2-2h-6" />
            </svg>
          </div>

          <h3 class="card-title">Front of the queue</h3>
          <p class="card-text">
            With limited numbers of shares or tax relief available, late investors can lose out. Early
            Access ensures you're the first to know the minute the Opportunity is Live
          </p>
        </div>
      </div>

      <!-- КАРТОЧКА 2: Stay in the loop -->
      <div class="glow-card">
        <div class="card-content">
          <div class="icon-wrapper">
            <!-- Иконка heart-handshake в том же стиле -->
            <svg
              class="icon-3d"
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              stroke="url(#icon-gradient-purple-soft)"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              filter="url(#depth-effect)"
            >
              <path
                d="M19.414 14.414C21 12.828 22 11.5 22 9.5a5.5 5.5 0 0 0-9.591-3.676.6.6 0 0 1-.818.001A5.5 5.5 0 0 0 2 9.5c0 2.3 1.5 4 3 5.5l5.535 5.362a2 2 0 0 0 2.879.052 2.12 2.12 0 0 0-.004-3 2.124 2.124 0 1 0 3-3 2.124 2.124 0 0 0 3.004 0 2 2 0 0 0 0-2.828l-1.881-1.882a2.41 2.41 0 0 0-3.409 0l-1.71 1.71a2 2 0 0 1-2.828 0 2 2 0 0 1 0-2.828l2.823-2.762"
              />
            </svg>
          </div>

          <h3 class="card-title">Stay in the loop</h3>
          <p class="card-text">
            Get regular updates directly from the company before their raise goes Live, helping you make
            an investment decision as early as possible.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Сброс для заголовков VitePress */
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
  background-color: #2a2a2a;
  color: #e0e0e0;
  padding: 48px;
  border-radius: 32px;
  box-sizing: border-box;
}

/* Хедер */
.header-section {
  text-align: center;
  margin-bottom: 48px;
}

.widget-title {
  font-size: 32px !important;
  font-weight: 700 !important;
  color: #ffffff !important;
  margin-bottom: 16px !important;
  line-height: 1.2 !important;
  border: none !important;
}

.widget-subtitle {
  font-size: 18px !important;
  color: rgba(255, 255, 255, 0.7) !important;
  margin: 0 auto !important;
  line-height: 1.5 !important;
  max-width: 600px;
}

/* Сетка карточек */
.cards-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

/* Карточки */
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
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.25) 0%,
    rgba(255, 255, 255, 0.05) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
  z-index: -1;
}

.glow-card:hover::before {
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.4) 0%,
    rgba(255, 255, 255, 0.1) 50%,
    rgba(255, 255, 255, 0) 100%
  );
}

.card-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

/* Иконки с объёмом */
.icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
}

.icon-3d {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  /* Матовая тень, без кричащего свечения */
  filter: url(#depth-effect) drop-shadow(0 2px 5px rgba(0, 0, 0, 0.45));
}

/* При hover — чуть сильнее, но всё ещё мягко */
.glow-card:hover .icon-3d {
  filter: url(#depth-effect-hover) drop-shadow(0 6px 14px rgba(80, 70, 120, 0.45));
  transform: translateY(-3px) scale(1.06);
}

/* Тексты внутри карточки */
.card-title {
  font-size: 22px !important;
  font-weight: 700 !important;
  color: #ffffff !important;
  margin: 0 !important;
}

.card-text {
  font-size: 16px !important;
  line-height: 1.6 !important;
  color: rgba(255, 255, 255, 0.75) !important;
  margin: 0 !important;
}

/* Мобильная версия: центрируем заголовок блока по вертикали относительно верхнего паддинга */
@media (max-width: 768px) {
  .early-access-widget {
    padding: 40px 20px 32px;
    margin: 32px 0;
    border-radius: 24px;
  }

  .header-section {
    margin-top: 8px;      /* немного опускаем заголовок вниз */
    margin-bottom: 40px;  /* чуть меньше разрыв до карточек */
  }

  .widget-title {
    font-size: 26px !important;
  }

  .widget-subtitle {
    font-size: 16px !important;
  }

  .cards-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .glow-card {
    padding: 32px 24px;
  }

  /* Внутри карточек слегка центрируем контент по вертикали */
  .card-content {
    gap: 18px;
  }
}
</style>
