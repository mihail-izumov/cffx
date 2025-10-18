<template>
  <a class="signal-badge-fluid-liquid" href="https://runscale.ru" target="_blank" rel="noopener">
    <div class="radar-container-fluid-liquid">
      <div class="radar-center-fluid-liquid"></div>
      <div class="radar-wave-fluid-liquid wave-1"></div>
      <div class="radar-wave-fluid-liquid wave-2"></div>
      <div class="radar-wave-fluid-liquid wave-3"></div>
    </div>
    <div class="badge-text-fluid-liquid">
      <span class="badge-label-fluid-liquid">Репутация под защитой</span>
      <span class="badge-brand-fluid-liquid">Работает Сигнал</span>
    </div>
  </a>
</template>

<style scoped>
.signal-badge-fluid-liquid {
  display: inline-flex;
  align-items: center;
  gap: 16px;
  padding: 12px 24px;
  border-radius: 9999px;
  background:
    linear-gradient(110deg, #181916 62%, #1e241a 100%),
    radial-gradient(100% 140% at 8% 93%, #dafe73 0%, #232823aa 100%);
  border: 1.7px solid #1b2320cc;
  box-shadow: none;
  backdrop-filter: blur(9px);
  width: max-content;
  margin: 36px auto 0 auto;
  transition:
    box-shadow 0.19s cubic-bezier(.21,1.5,.45,1),
    transform 0.17s cubic-bezier(.21,1.6,.45,1.18);
  cursor: pointer;
  text-decoration: none;
  user-select: none;
}
/* Ховер: чуть приподнят + еле заметное свечение лаймовое */
.signal-badge-fluid-liquid:hover,
.signal-badge-fluid-liquid:focus-visible {
  transform: translateY(-5px) scale(1.015);
  box-shadow: 0 2px 20px 5px #c7ff2828;
  text-decoration: none;
}

.radar-container-fluid-liquid {
  position: relative;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.radar-center-fluid-liquid {
  position: absolute;
  width: 8px;
  height: 8px;
  background: #C7FF28;
  border-radius: 50%;
  box-shadow: 0 0 12px 2px #C7FF28CC, 0 0 3px 1px #232823CC;
  z-index: 10;
}
.radar-wave-fluid-liquid {
  position: absolute;
  width: 100%;
  height: 100%;
  border: 2px solid #C7FF2877;
  border-radius: 50%;
  animation: radar-pulse-fluid-liquid 4s ease-out infinite;
}
.wave-1 { animation-delay: 0s;}
.wave-2 { animation-delay: 1.3s;}
.wave-3 { animation-delay: 2.6s;}
@keyframes radar-pulse-fluid-liquid {
  0% { transform: scale(0.2); opacity: 0;}
  10% { opacity: 0.52;}
  80% { opacity: 0.22;}
  100% { transform: scale(1); opacity: 0;}
}
.badge-text-fluid-liquid {
  display: flex;
  flex-direction: column;
  gap: 2px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}
.badge-label-fluid-liquid {
  font-size: 14px;
  color: #cfdab2;
  font-weight: 400;
  line-height: 1.2;
}
.badge-brand-fluid-liquid {
  font-size: 16px;
  color: #C7FF28;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-shadow: 0 1.2px 4px #232823, 0 2px 8px #c7ff2844;
}
@media (max-width: 640px) {
  .signal-badge-fluid-liquid { padding: 10px 16px; gap: 12px; border-radius: 9999px;}
  .radar-container-fluid-liquid { width: 40px; height: 40px;}
  .radar-center-fluid-liquid { width: 6px; height: 6px;}
  .badge-label-fluid-liquid { font-size: 12px; }
  .badge-brand-fluid-liquid { font-size: 14px; }
}
</style>
