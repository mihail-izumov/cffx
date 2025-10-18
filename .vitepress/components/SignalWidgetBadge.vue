<template>
  <div class="signal-badge-glass">
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
.signal-badge-glass {
  display: inline-flex;
  align-items: center;
  gap: 16px;
  padding: 12px 20px;
  /* liquid glass: темный фон + светлые блики сверху и внутри */
  background: 
    linear-gradient(120deg, rgba(16, 20, 17, 0.67) 72%, #212823 100%),
    radial-gradient(99% 120% at 5% 90%, #becf6b15 0%, #cee9a012 43%, #1a1d1b88 100%);
  border-radius: 12px;
  backdrop-filter: blur(10px);
  position: relative;
  width: max-content;
  margin: 36px auto;
}

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
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
/* Волны радар */
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

/* Блики — по верхней и боковой части */
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
   rgba(255,255,255,0.27) 18%,
   rgba(255,255,255,0.03) 60%);
  filter: blur(1px);
  opacity: 0.42;
}
.glare-2 {
  left: 13px; bottom: 2px;
  width: 22px; height: 8px;
  border-radius: 55% 44% 38% 21%/90% 80% 44% 53%;
  background: linear-gradient(112deg,
   rgba(255,255,255,0.18) 0%,
   rgba(255,255,255,0.02) 89%);
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
}
</style>
