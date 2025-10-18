<template>
  <div class="signal-badge-glass liquid-glass-center">
    <div class="liquid-glass-perimeter"></div>
    <div class="radar-container-glass">
      <div class="radar-center-glass"></div>
      <div class="radar-wave-glass wave-1"></div>
      <div class="radar-wave-glass wave-2"></div>
      <div class="radar-wave-glass wave-3"></div>
      <div class="radar-glare-glass glare-1"></div>
      <div class="radar-glare-glass glare-2"></div>
    </div>
    <div class="badge-text-glass">
      <span class="badge-label-glass">Репутация под защитой</span>
      <span class="badge-brand-glass">Работает Сигнал</span>
    </div>
  </div>
</template>

<style scoped>
/* Центрирование по верху и центру – только для главного бейджа */
.liquid-glass-center {
  display: block;
  margin: 36px auto 0 auto !important;
}

.signal-badge-glass {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 16px;
  padding: 12px 20px;
  border-radius: 12px;
  background: 
    linear-gradient(120deg, rgba(16, 20, 17, 0.67) 72%, #212823 100%),
    radial-gradient(99% 120% at 5% 90%, #becf6b15 0%, #cee9a012 43%, #1a1d1b88 100%);
  backdrop-filter: blur(10px);
  width: max-content;
  /* обводка для градиентного эффекта, прозрачная и не мешает highlight */
  z-index: 1;
  box-shadow: none;
}

/* glass highlight по периметру, НЕ перекрывает текст и контент */
.liquid-glass-perimeter {
  pointer-events: none;
  content: '';
  position: absolute;
  inset: 0;
  z-index: 8;
  border-radius: 12px;
  /* Очень тонкая double "световая" линия и кольцевой жидкий gradient */
  border: 1.7px solid;
  border-image: linear-gradient(95deg, #edffe8 17%, #b0c46d 40%, #e4fa8a 70%, #ffffff 100%) 1;
  /* Полупрозрачный светлый halo-overlay только по границе */
  box-shadow:
    0 0 18px 2px #e5fdfff2 inset,
    0 0 32px 5px #e7ffe075 inset;
  /* Liquid glass ring: белёсые световые разводы чуть внутри бейджа */
  background: 
    linear-gradient(120deg,rgba(255,255,255,0.18) 4%,rgba(228,248,187,0.07) 48%,rgba(255,255,255,0.21) 98%);
  mix-blend-mode: lighten;
}

/* Radar и текст – всё как в вашей версии */
.radar-container-glass {
  position: relative;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.radar-center-glass {
  position: absolute;
  width: 8px;
  height: 8px;
  background: #d7f259;
  border-radius: 50%;
  box-shadow: 0 0 14px 4px #c7ff2866;
  z-index: 12;
  left: 50%; top: 50%;
  transform: translate(-50%, -50%);
}
.radar-wave-glass {
  position: absolute;
  width: 100%;
  height: 100%;
  border: 2px solid rgba(220, 251, 138, 0.23);
  border-radius: 50%;
  animation: radar-pulse-glass 4s ease-out infinite;
  z-index: 10;
  background: transparent;
}
.wave-1 { animation-delay: 0s;}
.wave-2 { animation-delay: 1.3s;}
.wave-3 { animation-delay: 2.6s;}
@keyframes radar-pulse-glass {
  0% { transform: scale(0.2); opacity: 0; }
  10% { opacity: 0.7; }
  80% { opacity: 0.22; }
  100% { transform: scale(1); opacity: 0; }
}
/* Блики liquid glass внутри radar*/
.radar-glare-glass {
  position: absolute;
  pointer-events: none;
  z-index: 20;
}
.glare-1 {
  left: 1.2px; top: 2.2px;
  width: 35px; height: 11px;
  border-radius: 70% 44% 38% 80%/90% 80% 44% 53%;
  background: linear-gradient(110deg,
   rgba(255,255,255,0.27) 18%, rgba(255,255,255,0.03) 60%);
  filter: blur(1px);
  opacity: 0.42;
}
.glare-2 {
  left: 13px; bottom: 2px;
  width: 22px; height: 8px;
  border-radius: 55% 44% 38% 21%/90% 80% 44% 53%;
  background: linear-gradient(112deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.02) 89%);
  filter: blur(0.8px);
  opacity: 0.19;
}
/* Текст бейджа */
.badge-text-glass {
  display: flex;
  flex-direction: column;
  gap: 2px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}
.badge-label-glass {
  font-size: 14px;
  color: #e5ecd1;
  font-weight: 400;
  line-height: 1.2;
}
.badge-brand-glass {
  font-size: 16px;
  color: #f7ffdb;
  font-weight: 600;
  letter-spacing: 0.5px;
}
/* Адаптивность */
@media (max-width: 640px) {
  .signal-badge-glass {
    padding: 10px 16px;
    gap: 12px;
    border-radius: 12px;
  }
  .radar-container-glass {
    width: 40px;
    height: 40px;
  }
  .radar-center-glass {
    width: 6px;
    height: 6px;
  }
  .badge-label-glass {
    font-size: 12px;
  }
  .badge-brand-glass {
    font-size: 14px;
  }
  .liquid-glass-perimeter { border-radius: 12px; }
}
</style>
