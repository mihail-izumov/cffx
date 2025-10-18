<template>
  <div class="liqbadge-outer-centered">
    <div class="liqbadge-radar">
      <div class="liqbadge-center"></div>
      <div class="liqbadge-wave liqbadge-wave1"></div>
      <div class="liqbadge-wave liqbadge-wave2"></div>
      <div class="liqbadge-wave liqbadge-wave3"></div>
      <!-- Блики поверх radar -->
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
  padding: 12px 20px;
  border-radius: 17px;
  min-width: 0;
  max-width: 520px;
  margin: 48px auto 0 auto;
  background:
    linear-gradient(121deg, #f7ffe3 25%, #faffef 87%, #d9fbcf 110%),
    radial-gradient(110% 80% at 5% 80%, #e7ffc6 0%, #e9ffd917 32%, #fff0 75%);
  box-shadow:
    0 2px 28px 0 #eaffcf62,
    0 1.5px 9px 0 #eafea039,
    0 0 22px 0 #f9ffe9cf;
  backdrop-filter: blur(9px);
  position: relative;
}

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
  width: 100%;
  height: 100%;
  border: 2px solid #b5c93e58;
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
  10% { opacity: 0.55; }
  80% { opacity: 0.20; }
  100% { transform: scale(1); opacity: 0; }
}

/* Radar center, темный на светлом */
.liqbadge-center {
  position: absolute;
  left: 50%; top: 50%;
  width: 11px; height: 11px;
  background: radial-gradient(circle, #202625 63%, #7FC83F 95%, #fff0 100%);
  border-radius: 50%;
  box-shadow: 0 0 8px 2px #7fc83f99;
  transform: translate(-50%, -50%);
  z-index: 3;
}

/* Блики мягче, не перекрывают текст */
.liqbadge-glare {
  position: absolute;
  pointer-events: none;
  z-index: 10;
  background: transparent;
}
.liqbadge-glare1 {
  left: 6px; top: 5px;
  width: 34px; height: 15px;
  border-radius: 70% 60% 38% 80%/90% 80% 44% 53%;
  background: linear-gradient(120deg,rgba(255,255,255,0.33) 0%,rgba(255,255,255,0.06) 90%);
  filter: blur(1.8px) brightness(1.28);
  opacity: 0.42;
}
.liqbadge-glare2 {
  right: 2px; bottom: 8px;
  width: 14px; height: 10px;
  border-radius: 60% 48% 38% 30%/70% 70% 49% 55%;
  background: linear-gradient(130deg,rgba(255,255,255,0.27) 30%,rgba(255,255,255,0.02) 85%);
  filter: blur(1.5px) brightness(1.1);
  opacity: 0.19;
}

/* Текст бейджа — белый и четкий */
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
  text-shadow: 0 1.5px 3px #bfd32b44;
}
.liqbadge-brand {
  font-size: 16px;
  color: #fff;
  font-weight: 700;
  letter-spacing: 0.5px;
  text-shadow: 0 1.2px 4px #c7ff28, 0 1px 2px #fff;
  background: none;
  -webkit-background-clip: initial;
  -webkit-text-fill-color: initial;
  background-clip: initial;
  text-fill-color: initial;
}

/* Адаптивность */
@media (max-width: 640px) {
  .liqbadge-outer-centered {
    padding: 10px 16px;
    gap: 12px;
    border-radius: 12px;
    max-width: 98vw;
  }
  .liqbadge-radar {
    width: 40px;
    height: 40px;
  }
  .liqbadge-center {
    width: 8px; height: 8px;
  }
  .liqbadge-label {
    font-size: 12px;
  }
  .liqbadge-brand {
    font-size: 14px;
  }
}
</style>
