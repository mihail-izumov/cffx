<template>
  <div class="liqbadge-outer-centered">
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
</template>

<style scoped>
.liqbadge-outer-centered {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 12px 36px;
  border-radius: 28px;
  min-width: 0;
  width: max-content;
  margin: 54px auto 0 auto;
  /* Темный fade для контраста */
  background:
    linear-gradient(99deg, #eafce6e8 62%, #e3e8c5fb 90%, #faffeec0 110%),
    radial-gradient(110% 110% at 12% 80%, #fcfff4ff 0%, #eafce6 28%, #91ad6ced 91%),
    linear-gradient(180deg, transparent 75%, #d2e9b033 100%);
  box-shadow:
    0 0 46px 18px #c7ff2833,
    0 0 32px 3px #2929298b,
    0 1.5px 8px 0 #d7e9a044;
  backdrop-filter: blur(11px);
  position: relative;
}

/* Radar block */
.liqbadge-radar {
  position: relative;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.liqbadge-wave {
  position: absolute;
  width: 100%;
  height: 100%;
  border: 2px solid #b5c93e75;
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
  10% { opacity: 0.6; }
  80% { opacity: 0.20; }
  100% { transform: scale(1); opacity: 0; }
}

.liqbadge-center {
  position: absolute;
  left: 50%; top: 50%;
  width: 11px; height: 11px;
  background: radial-gradient(circle, #232723 76%, #94b438 99%, #fff0 100%);
  border-radius: 50%;
  box-shadow: 0 0 8px 2px #c7ff2872;
  transform: translate(-50%, -50%);
  z-index: 3;
}
.liqbadge-glare {
  position: absolute;
  pointer-events: none;
  z-index: 10;
  background: transparent;
}
.liqbadge-glare1 {
  left: 6px; top: 6px;
  width: 34px; height: 15px;
  border-radius: 60% 61% 34% 50%/82% 80% 44% 53%;
  background: linear-gradient(120deg,rgba(255,255,255,0.19) 0%,rgba(255,255,255,0.04) 90%);
  filter: blur(1.1px) brightness(1.08);
  opacity: 0.22;
}
.liqbadge-glare2 {
  right: 2px; bottom: 9px;
  width: 14px; height: 10px;
  border-radius: 60% 48% 38% 30%/70% 70% 49% 55%;
  background: linear-gradient(130deg,rgba(255,255,255,0.11) 30%,rgba(255,255,255,0.01) 80%);
  filter: blur(1.2px) brightness(1);
  opacity: 0.13;
}
/* Текст — четко/ярко белый */
.liqbadge-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}
.liqbadge-label {
  font-size: 14px;
  color: #fff;
  font-weight: 400;
  line-height: 1.2;
  text-shadow: 0 1.5px 2.5px #bfd32b27;
}
.liqbadge-brand {
  font-size: 16px;
  color: #fff;
  font-weight: 700;
  letter-spacing: 0.5px;
  text-shadow: 0 1.2px 4px #c7ff28, 0 1px 2px #fff;
}

@media (max-width: 640px) {
  .liqbadge-outer-centered {
    padding: 10px 12px;
    gap: 12px;
    border-radius: 13px;
    max-width: 95vw;
  }
  .liqbadge-radar { width: 38px; height: 38px;}
  .liqbadge-center { width: 8px; height: 8px;}
  .liqbadge-label { font-size: 12px; }
  .liqbadge-brand { font-size: 14px; }
}
</style>
