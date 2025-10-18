<template>
  <div class="liqbadge-outer-strict">
    <div class="liqbadge-glass-core">
      <div class="liqbadge-radar">
        <div class="liqbadge-center"></div>
        <div class="liqbadge-wave liqbadge-wave1"></div>
        <div class="liqbadge-wave liqbadge-wave2"></div>
        <div class="liqbadge-wave liqbadge-wave3"></div>
        <div class="liqbadge-glare liqbadge-glare1"></div>
        <div class="liqbadge-glare liqbadge-glare2"></div>
      </div>
      <div class="liqbadge-text">
        <span class="liqbadge-label">Репутация под защитой</span>
        <span class="liqbadge-brand">Работает Сигнал</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.liqbadge-outer-strict {
  width: 100%;
  max-width: 670px;
  min-width: 320px;
  margin: 54px auto 0 auto;
  display: flex;
  justify-content: center;
  /* Темный блюр подложка - только по краям */
  position: relative;
}
.liqbadge-outer-strict::before {
  content: '';
  position: absolute;
  left: 0; top: 0; right: 0; bottom: 0;
  z-index: 1;
  border-radius: 36px;
  background: radial-gradient(circle at 50% 60%, #252726e0 55%, #252726f7 100%);
  filter: blur(18px) opacity(0.80);
  pointer-events: none;
}
/* Бейдж в центре — не тянется на всю ширину, а строго центровка */
.liqbadge-glass-core {
  position: relative;
  z-index: 2;
  width: 100%;
  border-radius: 36px;
  min-height: 92px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 18px;
  background: 
    linear-gradient(127deg, #f9ffe7 75%, #effee8 98%),
    linear-gradient(110deg, #ddeebb33 25%, #eafff977 90%, #d9fbcf75 100%);
  box-shadow: 0 0 24px #f1ffd6b0, 0 1px 8px #242f153c;
  padding: 18px 30px;
}

/* Radar block — размеры исходного бейджа */
.liqbadge-radar {
  position: relative;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
}
/* Radar animated waves */
.liqbadge-wave {
  position: absolute;
  width: 100%; height: 100%;
  border: 2px solid #a5c33e66;
  border-radius: 50%;
  animation: liq-radar-pulse 4s ease-out infinite;
  background: transparent;
  z-index: 2;
  box-sizing: border-box;
}
.liqbadge-wave1 { animation-delay: 0s;}
.liqbadge-wave2 { animation-delay: 1.3s;}
.liqbadge-wave3 { animation-delay: 2.6s;}
@keyframes liq-radar-pulse {
  0% { transform: scale(0.2); opacity: 0; }
  10% { opacity: 0.43; }
  80% { opacity: 0.18; }
  100% { transform: scale(1); opacity: 0; }
}

/* Radar center */
.liqbadge-center {
  position: absolute;
  left: 50%; top: 50%;
  width: 11px; height: 11px;
  background: radial-gradient(circle, #2C322D 69%, #b1fd49 97%, #fff0 100%);
  border-radius: 50%;
  box-shadow: 0 0 7px 1.2px #496c1b22;
  transform: translate(-50%, -50%);
  z-index: 3;
}
/* Блики осторожно ложатся только на radar */
.liqbadge-glare {
  position: absolute;
  pointer-events: none;
  z-index: 10;
  background: transparent;
}
.liqbadge-glare1 {
  left: 8px; top: 8px;
  width: 27px; height: 11px;
  border-radius: 70% 60% 38% 80%/90% 80% 44% 53%;
  background: linear-gradient(120deg,rgba(255,255,255,0.22) 0%,rgba(255,255,255,0.06) 90%);
  filter: blur(1.2px) brightness(1.1);
  opacity: 0.36;
}
.liqbadge-glare2 {
  right: 2px; bottom: 8px;
  width: 12px; height: 6px;
  border-radius: 60% 48% 38% 30%/70% 70% 49% 55%;
  background: linear-gradient(130deg,rgba(255,255,255,0.13) 30%,rgba(255,255,255,0.01) 85%);
  filter: blur(0.9px) brightness(1.08);
  opacity: 0.15;
}

/* Текст бейджа */
.liqbadge-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}
.liqbadge-label {
  font-size: 15px;
  color: #fff;
  font-weight: 600;
  line-height: 1.22;
  text-shadow: 0 1.5px 2.5px #fff, 0 2px 1px #eafba5b4;
}
.liqbadge-brand {
  font-size: 18px;
  color: #fff;
  font-weight: 700;
  letter-spacing: 0.6px;
  text-shadow: 0 1.2px 4px #c7ff2860, 0 1px 2px #fff;
  background: none;
  -webkit-background-clip: initial;
  -webkit-text-fill-color: initial;
  background-clip: initial;
  text-fill-color: initial;
}
/* Adaptivity */
@media (max-width: 720px) {
  .liqbadge-outer-strict {
    max-width: 99vw;
  }
  .liqbadge-glass-core {
    padding: 13px 8vw;
  }
  .liqbadge-label { font-size: 12px;}
  .liqbadge-brand { font-size: 14px;}
  .liqbadge-radar { width: 34px; height: 34px; }
  .liqbadge-center { width: 7px; height: 7px; }
}
</style>
