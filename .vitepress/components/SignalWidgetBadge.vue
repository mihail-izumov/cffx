<template>
  <div class="liqbadge-center-wrap">
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
  </div>
</template>

<style scoped>
.liqbadge-center-wrap {
  width: 100vw;
  min-height: 240px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* сам бейдж */
.signal-badge-glass {
  display: inline-flex;
  align-items: center;
  gap: 16px;
  padding: 12px 20px;
  width: max-content;
  border-radius: 12px;
  background:
    /* liquid glass объём — слоистый, НЕ прозрачный */
    linear-gradient(111deg, #263127 38%, #f8ffe7 95%, #d6facf 100%),
    radial-gradient(100% 125% at 10% 80%, #e8fdbe44 0%, #fff6 43%, #232823fa 100%);
  backdrop-filter: blur(10px);
  box-shadow: 0 0 0 0 transparent;
  border: none;
  position: relative;
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
  box-shadow: 0 0 14px 4px #c7ff2869;
  z-index: 12;
  left: 50%; top: 50%;
  transform: translate(-50%, -50%);
}
.radar-wave-glass {
  position: absolute;
  width: 100%;
  height: 100%;
  border: 2px solid rgba(220, 251, 138, 0.24);
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

/* Яркие блики поверх :-) */
.radar-glare-glass {
  position: absolute;
  pointer-events: none;
  z-index: 20;
}
.glare-1 {
  left: 1px; top: 3.3px;
  width: 36px; height: 12px;
  border-radius: 72% 36% 38% 80%/90% 80% 44% 53%;
  background: linear-gradient(110deg,
   rgba(255,255,255,0.52) 25%,
   rgba(255,255,255,0.09) 90%);
  filter: blur(0.8px);
  opacity: 0.69;
}
.glare-2 {
  left: 12px; bottom: 2.2px;
  width: 18px; height: 8px;
  border-radius: 48% 44% 48% 21%/90% 75% 34% 53%;
  background: linear-gradient(112deg,
   rgba(255,255,255,0.26) 0%,
   rgba(255,255,255,0.02) 89%);
  filter: blur(0.8px);
  opacity: 0.35;
}
/* Текст */
.badge-text-glass {
  display: flex;
  flex-direction: column;
  gap: 2px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}
.badge-label-glass {
  font-size: 14px;
  color: #f6fff2;
  font-weight: 400;
  line-height: 1.2;
  text-shadow: 0 1.5px 1.5px #ddeebb50;
}
.badge-brand-glass {
  font-size: 16px;
  color: #fffffc;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-shadow: 0 1.2px 4px #deffcc, 0 1px 2px #fff;
}
/* Адаптивность */
@media (max-width: 640px) {
  .signal-badge-glass { padding: 10px 16px; gap: 12px; border-radius: 12px;}
  .radar-container-glass { width: 40px; height: 40px;}
  .radar-center-glass { width: 6px; height: 6px;}
  .badge-label-glass { font-size: 12px; }
  .badge-brand-glass { font-size: 14px; }
}
</style>
