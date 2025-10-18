<template>
  <div class="sb2025-badge-liquidv2">
    <div class="sb2025-radar-containerv2">
      <div class="sb2025-radar-centerv2"></div>
      <div class="sb2025-radar-wavev2 sb2025-wavev2-1"></div>
      <div class="sb2025-radar-wavev2 sb2025-wavev2-2"></div>
      <div class="sb2025-radar-wavev2 sb2025-wavev2-3"></div>
    </div>
    <div class="sb2025-badge-textv2">
      <span class="sb2025-badge-labelv2">Репутация под защитой</span>
      <span class="sb2025-badge-brandv2">Работает Сигнал</span>
    </div>
  </div>
</template>

<style scoped>
.sb2025-badge-liquidv2 {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  width: 100%;
  max-width: 1100px;
  min-width: 340px;
  min-height: 135px;
  padding: 18px 0;
  margin: 42px auto 38px auto;
  border-radius: 56px;
  /* liquid glass Apple 2025 style */
  background: 
    radial-gradient(140% 120% at 75% 40%, rgba(196,255,24,0.055) 0%, rgba(67,81,18,0.037) 30%, rgba(39,44,26,0.23) 100%),
    linear-gradient(110deg, rgba(33,35,27,0.93) 58%, rgba(196,255,24,0.07) 105%);
  box-shadow:
    0 2px 18px 0 rgba(196,255,24,0.07),
    0 13px 35px 0 rgba(27,38,21,0.21),
    0 0 54px 0 rgba(196,255,24,0.04);
  backdrop-filter: blur(13px);
  position: relative;
}

/* Радар */
.sb2025-radar-containerv2 {
  position: relative;
  width: 65px;
  height: 65px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

/* Ядро-точка */
.sb2025-radar-centerv2 {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 18px;
  height: 18px;
  background: radial-gradient(circle, #D3FE29 88%, #C7FF2848 100%);
  border-radius: 50%;
  box-shadow:
    0 0 19px 8px #C7FF2859,
    0 0 17px 6px #DAFE7355,
    0 0 0 3px #C7FF2844;
  transform: translate(-50%,-50%);
  z-index: 2;
  animation: sb2025-core-pulsev2 2.7s infinite;
}
@keyframes sb2025-core-pulsev2 {
  0%, 100% { box-shadow: 0 0 24px 7px #C7FF2871, 0 0 16px 3px #DAFE7371;}
  55% { box-shadow: 0 0 38px 13px #C7FF282d, 0 0 30px 6px #DAFE7381;}
}

/* Волны радара — liquid glass, лишь яркость лайма */
.sb2025-radar-wavev2 {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 100%;
  height: 100%;
  border: 2.8px solid #C7FF2833;
  border-radius: 50%;
  opacity: 0.57;
  transform: translate(-50%,-50%);
  animation: sb2025-radar-pulse-liquidv2 3.2s cubic-bezier(.23,0,.61,1) infinite;
  filter: blur(0.5px) drop-shadow(0 0 10px #dafe7355);
}

.sb2025-wavev2-1 { animation-delay: 0s;}
.sb2025-wavev2-2 { animation-delay: 1.02s;}
.sb2025-wavev2-3 { animation-delay: 2.08s;}

@keyframes sb2025-radar-pulse-liquidv2 {
  0% {
    transform: translate(-50%,-50%) scale(0.24);
    opacity: 0.11;
    border-color: #C7FF2845;
  }
  18% {
    opacity: 0.82;
    border-color: #C7FF2844;
  }
  82% {
    opacity: 0.19;
    border-color: #C7FF2822;
  }
  100% {
    transform: translate(-50%,-50%) scale(1.09);
    opacity: 0;
    border-color: #C7FF2800;
  }
}

/* Тексты бейджа – Apple glass, бренд лаймовый */
.sb2025-badge-textv2 {
  display: flex;
  flex-direction: column;
  gap: 7px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  justify-content: center;
}

.sb2025-badge-labelv2 {
  font-size: 2.2rem;
  color: #C7FF28ca;
  font-weight: 400;
  line-height: 1.22;
  text-shadow:
    0 2px 8px #dafe7366,
    0 1.5px 4px #b3d93f22;
  letter-spacing: 0.01em;
  margin-left: 14px;
}

.sb2025-badge-brandv2 {
  font-size: 2.9rem;
  color: #C7FF28;
  font-weight: 700;
  letter-spacing: 1.2px;
  background: linear-gradient(92deg, #C7FF28 42%, #dafe73 85%, #fff 115%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-fill-color: transparent;
  filter: drop-shadow(0px 2px 15px #C7FF2838);
  margin-left: 14px;
}

/* Адаптивность/размеры */
@media (max-width: 800px) {
  .sb2025-badge-liquidv2 {
    min-width: 220px;
    padding: 12px 1vw;
  }
  .sb2025-badge-labelv2 { font-size: 1.1rem;}
  .sb2025-badge-brandv2 { font-size: 1.32rem;}
  .sb2025-radar-containerv2 { width: 38px; height: 38px;}
  .sb2025-radar-centerv2 { width: 9px; height: 9px;}
}
</style>
