<template>
  <div class="liqbadge-outer">
    <div class="liqbadge-radar">
      <div class="liqbadge-center"></div>
      <div class="liqbadge-wave liqbadge-wave1"></div>
      <div class="liqbadge-wave liqbadge-wave2"></div>
      <div class="liqbadge-wave liqbadge-wave3"></div>
      <!-- Блики прямо поверх иконки radar -->
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
.liqbadge-outer {
  display: inline-flex;
  align-items: center;
  gap: 16px;
  padding: 12px 20px;
  border-radius: 17px;
  min-width: 0;
  background:
    /* Главный светлый бурлящий слой */
    linear-gradient(123deg, #f6ffd9 25%, #faffef 87%, #e9ffcf 100%),
    /* Легкая зеленая подсветка и туманность */
    radial-gradient(110% 80% at 5% 80%, #e7ffc6 0%, #e9ffd944 25%, #fff0 75%),
    /* Белый глянец */
    linear-gradient(108deg, rgba(255,255,255,0.52) 80%, rgba(227,255,208,0.13) 120%);
  position: relative;
  box-shadow:
    0 1.5px 19px 0 #cfedbb59,
    0 1.5px 9px 0 #d7e9a039,
    0 0 20px 0 #fdfffd38;
  backdrop-filter: blur(14px);
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
/* Radar animated waves */
.liqbadge-wave {
  position: absolute;
  width: 100%;
  height: 100%;
  border: 2px solid #a5c33e88;
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
  0% {
    transform: scale(0.2);
    opacity: 0;
  }
  10% {
    opacity: 0.6;
  }
  80% {
    opacity: 0.22;
  }
  100% {
    transform: scale(1);
    opacity: 0;
  }
}

/* Radar center, теперь темный для контраста с бликами */
.liqbadge-center {
  position: absolute;
  left: 50%; top: 50%;
  width: 12px; height: 12px;
  background: radial-gradient(circle, #263e18 73%, #b5fa49 95%, #fff0 100%);
  border-radius: 50%;
  box-shadow: 0 0 13px 3px #405e1780, 0 0 8px 2px #8dc74188;
  transform: translate(-50%, -50%);
  z-index: 3;
}

/* Блики как у apple glass: слева и справа, поверх иконки */
.liqbadge-glare {
  position: absolute;
  pointer-events: none;
  z-index: 10;
  background: transparent;
}
.liqbadge-glare1 {
  left: 5px; top: 4px;
  width: 38px; height: 19px;
  border-radius: 55% 60% 38% 80%/90% 80% 44% 53%;
  background: linear-gradient(120deg,rgba(255,255,255,0.50) 0%,rgba(255,255,255,0.07) 85%);
  filter: blur(2.8px) brightness(1.52);
  opacity: 0.71;
}
.liqbadge-glare2 {
  right: 1.5px; bottom: 5.5px;
  width: 21px; height: 13px;
  border-radius: 60% 48% 38% 30%/70% 70% 49% 55%;
  background: linear-gradient(130deg,rgba(255,255,255,0.42) 30%,rgba(255,255,255,0.03) 80%);
  filter: blur(2.3px) brightness(1.3);
  opacity: 0.42;
}

/* Текст бейджа */
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
  text-shadow: 0 1.5px 7px #fff8, 0 1.5px 1.5px #eafba5cc;
}

.liqbadge-brand {
  font-size: 16px;
  color: #fff;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-shadow: 0 4px 18px #afec53, 0 1.2px 2.7px #faff, 0 1.2px 4px #c7ff28;
  background: linear-gradient(95deg, #fff 35%, #eaffba 120%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
          background-clip: text;
          text-fill-color: transparent;
}

/* Адаптивность */
@media (max-width: 640px) {
  .liqbadge-outer {
    padding: 10px 16px;
    gap: 12px;
    border-radius: 12px;
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
