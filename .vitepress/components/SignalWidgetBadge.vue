<template>
  <div class="sb2025-badge-liquid">
    <div class="sb2025-radar-container">
      <div class="sb2025-radar-center"></div>
      <div class="sb2025-radar-wave sb2025-wave-1"></div>
      <div class="sb2025-radar-wave sb2025-wave-2"></div>
      <div class="sb2025-radar-wave sb2025-wave-3"></div>
    </div>
    <div class="sb2025-badge-text">
      <span class="sb2025-badge-label">Репутация под защитой</span>
      <span class="sb2025-badge-brand">Работает Сигнал</span>
    </div>
  </div>
</template>

<style scoped>
.sb2025-badge-liquid {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
  padding: 18px 36px;
  margin: 0 auto 22px auto;
  background: linear-gradient(133deg, rgba(34,35,27,0.94) 60%, rgba(199,255,40,0.04) 100%);
  border: 2.7px solid #C7FF28;
  box-shadow: 0 9px 32px 0 #c7ff284d, 0 1.5px 22px 0 #c7ff283d, 0 0 0 1px rgba(255,255,255,0.02);
  border-radius: 39px;
  backdrop-filter: blur(16px);
  position: relative;
  transition: background 0.23s, box-shadow 0.18s;
  min-width: 270px;
  max-width: 90vw;
}

.sb2025-badge-liquid:hover {
  background: linear-gradient(133deg, rgba(87,95,29,0.988) 55%, rgba(199,255,40,0.08) 100%);
  box-shadow: 0 12px 38px 0 #c7ff2898, 0 1.5px 22px 0 #c7ff2844, 0 0 0 1px #dafe73;
}

.sb2025-badge-liquid {
  margin-left: auto !important;
  margin-right: auto !important;
}

/* Радар */
.sb2025-radar-container {
  position: relative;
  width: 54px;
  height: 54px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.sb2025-radar-center {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 13px;
  height: 13px;
  background: radial-gradient(circle, #C7FF28 72%, #fff40026 100%);
  border-radius: 50%;
  box-shadow: 0 0 24px 7px #C7FF2859, 0 0 15px 3px #C7FF28c6;
  transform: translate(-50%,-50%);
  z-index: 2;
  animation: sb2025-core-pulse 2.9s infinite;
}

@keyframes sb2025-core-pulse {
  0%, 100% { box-shadow: 0 0 22px 7px #C7FF2866, 0 0 15px 3px #C7FF28a3;}
  50% { box-shadow: 0 0 38px 11px #C7FF283d, 0 0 20px 6px #C7FF286e;}
}

.sb2025-radar-wave {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 100%;
  height: 100%;
  border: 2.3px solid #C7FF2855;
  border-radius: 50%;
  opacity: 0.77;
  transform: translate(-50%,-50%);
  animation: sb2025-radar-pulse-liquid 3.2s cubic-bezier(.31,0,.61,1) infinite;
  filter: drop-shadow(0 0 18px #dafe7377);
}

.sb2025-wave-1 { animation-delay: 0s;}
.sb2025-wave-2 { animation-delay: 1.02s;}
.sb2025-wave-3 { animation-delay: 2.06s;}

@keyframes sb2025-radar-pulse-liquid {
  0% {
    transform: translate(-50%,-50%) scale(0.42);
    opacity: 0.13;
    border-color: #C7FF2845;
    filter: drop-shadow(0 0 0px #dafe73);
  }
  18% {
    opacity: 0.8;
    border-color: #C7FF2844;
    filter: drop-shadow(0 0 14px #dafe7344);
  }
  82% {
    opacity: 0.19;
    border-color: #C7FF2822;
    filter: drop-shadow(0 0 24px #dafe736c);
  }
  100% {
    transform: translate(-50%,-50%) scale(1.02);
    opacity: 0;
    border-color: #C7FF2800;
    filter: drop-shadow(0 0 33px #dafe7322);
  }
}

.sb2025-badge-text {
  display: flex;
  flex-direction: column;
  gap: 1.5px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  justify-content: center;
}

.sb2025-badge-label {
  font-size: 14px;
  color: #C7FF28d6;
  font-weight: 400;
  line-height: 1.16;
  text-shadow: 0 1.5px 3px #b3d93f22;
  letter-spacing: 0.01em;
}

.sb2025-badge-brand {
  font-size: 17px;
  color: #fff;
  font-weight: 600;
  letter-spacing: 0.6px;
  background: linear-gradient(94deg, #C7FF28 42%, #fff 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-fill-color: transparent;
  filter: drop-shadow(0px 1.5px 10px #C7FF2833);
}

@media (max-width: 640px) {
  .sb2025-badge-liquid {
    padding: 10px 9vw;
    gap: 11px;
    border-radius: 19px;
    min-width: 160px;
  }
  .sb2025-radar-container {
    width: 35px;
    height: 35px;
  }
  .sb2025-radar-center {
    width: 8px;
    height: 8px;
  }
  .sb2025-badge-label {
    font-size: 11px;
  }
  .sb2025-badge-brand {
    font-size: 13.5px;
  }
}
</style>
