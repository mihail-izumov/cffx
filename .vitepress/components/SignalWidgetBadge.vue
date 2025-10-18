<template>
  <div class="liqbadge-container">
    <div class="liqbadge-outer">
      <div class="liqbadge-radar">
        <div class="liqbadge-center"></div>
        <div class="liqbadge-wave liqbadge-wave1"></div>
        <div class="liqbadge-wave liqbadge-wave2"></div>
        <div class="liqbadge-wave liqbadge-wave3"></div>
        <!-- Блики под иконкой -->
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
.liqbadge-container {
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
}
.liqbadge-outer {
  display: inline-flex;
  align-items: center;
  gap: 16px;
  padding: 12px 20px;
  border-radius: 27px;
  min-width: 340px;
  max-width: 600px;
  background:
    linear-gradient(123deg, #eaffd6 25%, #faffef 87%, #e9ffcf 100%),
    radial-gradient(75% 100% at 15% 80%, #edfcae 0%, #fff8 40%, #fff0 75%),
    linear-gradient(108deg, rgba(255,255,255,0.52) 80%, rgba(227,255,208,0.11) 120%);
  position: relative;
  box-shadow:
    0 3px 18px 0 #d8fcaebd,
    0 1.5px 9px 0 #d7e9a039,
    0 0 24px 0 #fdfffd38;
  backdrop-filter: blur(13px);
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
  border: 2px solid #a5c33e96;
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
  0% { transform: scale(0.2); opacity: 0;}
  10% { opacity: 0.55;}
  80% { opacity: 0.21;}
  100%{ transform: scale(1); opacity: 0;}
}
.liqbadge-center {
  position: absolute;
  left: 50%; top: 50%;
  width: 13px; height: 13px;
  background: radial-gradient(circle, #263e18 73%, #b5fa49 95%, #fff0 100%);
  border-radius: 50%;
  box-shadow: 0 0 13px 3px #215e17d0, 0 0 8px 2px #8dc74188;
  transform: translate(-50%, -50%);
  z-index: 3;
}
/* glare = под, не перекрывает текст */
.liqbadge-glare {
  position: absolute;
  pointer-events: none;
  z-index: 1;
  background: transparent;
}
.liqbadge-glare1 {
  left: 4px; top: 4px;
  width: 38px; height: 17px;
  border-radius: 65% 60% 38% 80%/90% 80% 44% 53%;
  background: linear-gradient(120deg,rgba(255,255,255,0.28) 0%,rgba(255,255,255,0.07) 85%);
  filter: blur(2.6px) brightness(1.13);
}
.liqbadge-glare2 {
  right: 1.5px; bottom: 6px;
  width: 19px; height: 10px;
  border-radius: 70% 48% 48% 44%/80% 70% 49% 50%;
  background: linear-gradient(130deg,rgba(255,255,255,0.19) 30%,rgba(255,255,255,0.03) 80%);
  filter: blur(1.7px) brightness(1.12);
}

/* Текст */
.liqbadge-text {
  display: flex;
  flex-direction: column;
  gap: 3px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}
.liqbadge-label {
  font-size: 18px;
  color: #fff;
  font-weight: 400;
  line-height: 1.22;
  text-shadow: 0 1.5px 4px #fff7, 0 1.5px 1.5px #eafba5cc;
}
.liqbadge-brand {
  font-size: 22px;
  color: #fff;
  font-weight: 700;
  letter-spacing: 1px;
  text-shadow: 0 4px 16px #afec53, 0 1.2px 2.7px #faff, 0 1.2px 4px #c7ff28;
  background: linear-gradient(90deg, #fff 31%, #eaffba 98%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
          background-clip: text;
          text-fill-color: transparent;
}
@media (max-width: 640px) {
  .liqbadge-outer { padding: 10px 16px; gap: 12px; border-radius: 13px;}
  .liqbadge-radar { width: 38px; height: 38px;}
  .liqbadge-center { width: 8px; height: 8px;}
  .liqbadge-label { font-size: 13px;}
  .liqbadge-brand { font-size: 15px;}
}
</style>
