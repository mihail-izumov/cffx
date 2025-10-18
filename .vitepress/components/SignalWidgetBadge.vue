<template>
  <div class="sb2025-badge-liquidv3">
    <div class="sb2025-radar-containerv3">
      <div class="sb2025-radar-centerv3"></div>
      <div class="sb2025-radar-wavev3 sb2025-wavev3-1"></div>
      <div class="sb2025-radar-wavev3 sb2025-wavev3-2"></div>
      <div class="sb2025-radar-wavev3 sb2025-wavev3-3"></div>
    </div>
    <div class="sb2025-badge-textv3">
      <span class="sb2025-badge-labelv3">Репутация под защитой</span>
      <span class="sb2025-badge-brandv3">Работает Сигнал</span>
    </div>
  </div>
</template>

<style scoped>
.sb2025-badge-liquidv3 {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 26px;
  width: 100%;
  max-width: 1100px;
  min-width: 340px;
  min-height: 135px;
  padding: 18px 0;
  margin: 42px auto 38px auto;
  border-radius: 56px;
  /* Liquid glass Apple 2025: светлый, контрастный, плавные переливы! */
  background:
    radial-gradient(110% 110% at 30% 66%, #fffbe9 0%, #e9fdbc 32%, #ebfbce88 59%, #e7ffde 100%),
    linear-gradient(88deg, #fff 87%, #f7fbe2 100%);
  box-shadow:
    0 6px 36px 0 #d8e98433,
    0 1.5px 9px 0 #d7e9a039,
    0 0 44px 0 #f9ffe94d;
  backdrop-filter: blur(15px);
  position: relative;
}

.sb2025-radar-containerv3 {
  position: relative;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.sb2025-radar-centerv3 {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 14px;
  height: 14px;
  background: radial-gradient(circle, #D3FE29 87%, #C7FF2848 100%);
  border-radius: 50%;
  box-shadow: 0 0 14px 6px #C7FF284a, 0 0 9px 2px #DAFE7355, 0 0 0 1px #fff;
  transform: translate(-50%,-50%);
  z-index: 2;
  animation: sb2025-core-pulsev3 2.8s infinite;
}
@keyframes sb2025-core-pulsev3 {
  0%, 100% { box-shadow: 0 0 22px 6px #d1f8735c, 0 0 12px 3px #DAFE7399;}
  55% { box-shadow: 0 0 34px 11px #C7FF2828, 0 0 18px 6px #DAFE732f;}
}

.sb2025-radar-wavev3 {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 100%;
  height: 100%;
  border: 2.1px solid #baf55859;
  border-radius: 50%;
  opacity: 0.44;
  transform: translate(-50%,-50%);
  animation: sb2025-radar-pulse-liquidv3 3.2s cubic-bezier(.23,0,.61,1) infinite;
  filter: blur(0.2px) drop-shadow(0 0 7px #dafe7352);
}

.sb2025-wavev3-1 { animation-delay: 0s;}
.sb2025-wavev3-2 { animation-delay: 1.04s;}
.sb2025-wavev3-3 { animation-delay: 2.06s;}

@keyframes sb2025-radar-pulse-liquidv3 {
  0% {
    transform: translate(-50%,-50%) scale(0.23);
    opacity: 0.10;
    border-color: #C7FF2845;
  }
  22% {
    opacity: 0.55;
    border-color: #baf55899;
  }
  82% {
    opacity: 0.24;
    border-color: #baf55822;
  }
  100% {
    transform: translate(-50%,-50%) scale(1.07);
    opacity: 0;
    border-color: #fff0;
  }
}

/* Тексты бейджа — темные */
.sb2025-badge-textv3 {
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  justify-content: center;
}

.sb2025-badge-labelv3 {
  font-size: 2.05rem;
  color: #332;
  font-weight: 500;
  line-height: 1.18;
  text-shadow: 0 2px 3px #fffce34a;
  letter-spacing: 0.01em;
  margin-left: 14px;
}

.sb2025-badge-brandv3 {
  font-size: 2.5rem;
  color: #292d10;
  font-weight: 700;
  letter-spacing: 1.1px;
  background: linear-gradient(94deg, #94a81a 12%, #c7ff28 98%, #333 150%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-fill-color: transparent;
  filter: drop-shadow(0px 1.2px 13px #c7ff2850);
  margin-left: 14px;
}

/* Адаптивность */
@media (max-width: 800px) {
  .sb2025-badge-liquidv3 {
    min-width: 220px;
    padding: 12px 1vw;
    min-height: 76px;
  }
  .sb2025-badge-labelv3 { font-size: 1.13rem;}
  .sb2025-badge-brandv3 { font-size: 1.21rem;}
  .sb2025-radar-containerv3 { width: 31px; height: 31px;}
  .sb2025-radar-centerv3 { width: 6px; height: 6px;}
}
</style>
