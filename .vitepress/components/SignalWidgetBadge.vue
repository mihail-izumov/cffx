<template>
  <div class="liqglass-badge-center">
    <div class="liqglass-badge">
      <div class="liqglass-radar">
        <div class="liqglass-radar-center"></div>
        <div class="liqglass-radar-wave w1"></div>
        <div class="liqglass-radar-wave w2"></div>
        <div class="liqglass-radar-wave w3"></div>
      </div>
      <div class="liqglass-text">
        <span class="liqglass-label">Репутация под защитой</span>
        <span class="liqglass-brand">Работает Сигнал</span>
      </div>
      <!-- liquid glass highlight, поверх всего бейджа, периметр -->
      <div class="liqglass-highlight"></div>
    </div>
  </div>
</template>

<style scoped>
.liqglass-badge-center {
  /* Центрирование на экране */
  width: 100vw;
  min-height: 100vh;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 60px;
}

.liqglass-badge {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 16px;
  padding: 12px 20px;
  border-radius: 12px;
  width: max-content;
  background:
    /* главный стеклянный "жидкий" градиент */
    linear-gradient(109deg, #fafdff 30%, #e9fddc 65%, #e4ffe5 110%),
    linear-gradient(6deg, #d7f6f7cc 15%, #d6f0d0bb 45%, #c8edd299 85%, #fafcff 100%);
  box-shadow: 0 2px 40px 0 #dde3ccb7, 0 0 2px 0 #b4d9b466;
  border: none;
  backdrop-filter: blur(12px);
  z-index: 1;
  overflow: visible;
}
.liqglass-highlight {
  /* Блик по периметру: мягко, как у apple-liquid, поверх */
  pointer-events: none;
  position: absolute;
  inset: -2px;
  border-radius: 15px;
  background:
    linear-gradient(117deg,
      rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.11) 13%, rgba(255,255,255,0.03) 33%, 
      rgba(255,255,255,0.14) 63%, rgba(255,255,255,0.40) 100%);
  box-shadow:
    0 1px 30px 14px #f5ffe4b2,
    0 0px 2.5px 2px #e6ffe1a0;
  z-index: 38;
  pointer-events: none;
  mix-blend-mode: lighten;
}
.liqglass-radar {
  position: relative;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 4;
}
.liqglass-radar-center {
  position: absolute;
  width: 8px;
  height: 8px;
  background: #aadc21;
  border-radius: 50%;
  box-shadow: 0 0 12px 4px #e5ff9f;
  z-index: 12;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
/* Волны радар */
.liqglass-radar-wave {
  position: absolute;
  width: 100%;
  height: 100%;
  border: 2px solid #b8f95534;
  border-radius: 50%;
  animation: liqglass-pulse 4s ease-out infinite;
  z-index: 10;
  background: transparent;
  filter: blur(0.5px);
}
.w1 { animation-delay: 0s;}
.w2 { animation-delay: 1.3s;}
.w3 { animation-delay: 2.6s;}
@keyframes liqglass-pulse {
  0% { transform: scale(0.15); opacity: 0; }
  10% { opacity: 0.55; }
  80% { opacity: 0.18; }
  100% { transform: scale(1); opacity: 0; }
}
/* Текст */
/* Цвета строго светлые — читаемо на glass! */
.liqglass-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  z-index: 5;
  position: relative;
}
.liqglass-label {
  font-size: 14px;
  color: #a0b78a;
  font-weight: 400;
  line-height: 1.18;
}
.liqglass-brand {
  font-size: 16px;
  color: #4e6e1b;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-shadow: 0 1.2px 4px #fff6, 0 1px 2px #deffd0ba;
  background: linear-gradient(90deg, #aadc21 0%, #b9d966 90%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
          background-clip: text;
          text-fill-color: transparent;
}
@media (max-width: 640px) {
  .liqglass-badge { padding: 10px 16px; gap: 12px; border-radius: 12px;}
  .liqglass-radar { width: 40px; height: 40px;}
  .liqglass-radar-center { width: 6px; height: 6px;}
  .liqglass-label { font-size: 12px; }
  .liqglass-brand { font-size: 14px; }
}
</style>
