<template>
  <div class="liquid-glass-center">
    <div class="signal-badge-glass">
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
  </div>
</template>

<style scoped>
.liquid-glass-center {
  position: relative;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin-top: 42px;
}

.signal-badge-glass {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 16px;
  padding: 12px 20px;
  border-radius: 12px;
  background: 
    linear-gradient(120deg, #e8fae1 31%, #f5fefc 95%, #ddeee2 100%),
    linear-gradient(8deg, #edf5eb 24%, #e6f7de 45%, #b1eeab 60%, #eafce2 82%);
  box-shadow: none;
  width: max-content;
  z-index: 1;
  backdrop-filter: blur(12px);
  /* для contrast */
}
.liquid-glass-perimeter {
  /* Блик Apple-liquid по периметру с градиентной обводкой */
  pointer-events: none;
  position: absolute;
  inset: 0;
  border-radius: 12px;
  mix-blend-mode: lighten;
  z-index: 8;
  border: 1.5px solid;
  border-image: linear-gradient(95deg,#fff 22%,#9bc97a 54%,#e4fa8a 70%,#ffffff 100%) 1;
  /* Liquid Glass световой ободок */
  box-shadow:
    0 0 14px 3px #c6ffcdcc,
    0 0 44px 10px #e2ffe7b1;
  background: 
    linear-gradient(120deg,rgba(255,255,255,.18) 5%,rgba(228,248,187,0.11) 56%,rgba(255,255,255,0.21) 98%);
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
  left: 50%; top: 50%;
  background: #d7f259;
  border-radius: 50%;
  box-shadow: 0 0 14px 4px #c7ff2866;
  z-index: 12;
  transform: translate(-50%, -50%);
}
/* Волны радар */
.radar-wave-glass {
  position: absolute;
  width: 100%;
  height: 100%;
  border: 2px solid rgba(156, 209, 108, 0.23);
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
  background: linear-gradient(110deg, rgba(255,255,255,0.32) 18%, rgba(255,255,255,0.07) 60%);
  filter: blur(0.9px);
  opacity: 0.36;
}
.glare-2 {
  left: 13px; bottom: 2px;
  width: 22px; height: 8px;
  border-radius: 55% 44% 38% 21%/90% 80% 44% 53%;
  background: linear-gradient(112deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.02) 89%);
  filter: blur(0.8px);
  opacity: 0.20;
}
/* Текст бейджа */
.badge-text-glass {
  display: flex;
  flex-direction: column;
  gap: 2px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}
.badge-label-glass, .badge-brand-glass {
  color: #2d401a;
  text-shadow: 0 2px 8px #fff, 0 1px 2px #eafba5cc;
}
.badge-label-glass {
  font-size: 14px;
  font-weight: 400;
  line-height: 1.2;
}
.badge-brand-glass {
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.5px;
  background: linear-gradient(94deg,#aadc21 26%,#cad45a 58%,#f7ffdb 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
          background-clip: text;
          text-fill-color: transparent;
}

/* Адаптивность */
@media (max-width: 640px) {
  .liquid-glass-center { margin-top: 18px; }
  .signal-badge-glass {
    padding: 10px 16px; gap: 12px; border-radius: 12px;
  }
  .radar-container-glass { width: 40px; height: 40px; }
  .radar-center-glass { width: 6px; height: 6px; }
  .badge-label-glass { font-size: 12px; }
  .badge-brand-glass { font-size: 14px; }
  .liquid-glass-perimeter { border-radius: 12px; }
}
</style>
