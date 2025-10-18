<template>
  <div class="signal-badge-fluid">
    <div class="radar-container-fluid">
      <div class="radar-center-fluid"></div>
      <div class="radar-wave-fluid wave-1"></div>
      <div class="radar-wave-fluid wave-2"></div>
      <div class="radar-wave-fluid wave-3"></div>
    </div>
    <div class="badge-text-fluid">
      <span class="badge-label-fluid">Репутация под защитой</span>
      <span class="badge-brand-fluid">Работает Сигнал</span>
    </div>
  </div>
</template>

<style scoped>
.signal-badge-fluid {
  display: inline-flex;
  align-items: center;
  gap: 16px;
  padding: 12px 20px;
  border-radius: 12px;
  background:
    linear-gradient(110deg, #181916 65%, #232823 100%),
    radial-gradient(100% 140% at 10% 90%, #dafe73 0%, #23282398 100%);
  border: 1.5px solid;
  border-image: linear-gradient(95deg, #99b522 14%, #C7FF28 50%, #77d159 80%, #232823 100%) 1;
  box-shadow: 0 0 0px 0 #23282333;
  backdrop-filter: blur(10px);
  width: max-content;
  margin: 36px auto 0 auto;
}

/* Контейнер радар */
.radar-container-fluid {
  position: relative;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
}
/* Центральная точка — лаймовый фирменный */
.radar-center-fluid {
  position: absolute;
  width: 8px;
  height: 8px;
  background: #C7FF28;
  border-radius: 50%;
  box-shadow: 0 0 12px 2px #C7FF28CC, 0 0 3px 1px #232823CC;
  z-index: 10;
}

/* Волны — лаймовый светящийся градиент */
.radar-wave-fluid {
  position: absolute;
  width: 100%;
  height: 100%;
  border: 2px solid #C7FF2877;
  border-radius: 50%;
  animation: radar-pulse-fluid 4s ease-out infinite;
}
.wave-1 { animation-delay: 0s;}
.wave-2 { animation-delay: 1.3s;}
.wave-3 { animation-delay: 2.6s;}
@keyframes radar-pulse-fluid {
  0% { transform: scale(0.2); opacity: 0;}
  10% { opacity: 0.52;}
  80% { opacity: 0.22;}
  100% { transform: scale(1); opacity: 0;}
}

/* Текст — современный контраст */
.badge-text-fluid {
  display: flex;
  flex-direction: column;
  gap: 2px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}
.badge-label-fluid {
  font-size: 14px;
  color: #cfdab2;
  font-weight: 400;
  line-height: 1.2;
}
.badge-brand-fluid {
  font-size: 16px;
  color: #C7FF28;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-shadow: 0 1.2px 4px #232823, 0 2px 8px #c7ff2844;
}

/* Адаптивность */
@media (max-width: 640px) {
  .signal-badge-fluid { padding: 10px 16px; gap: 12px; border-radius: 12px;}
  .radar-container-fluid { width: 40px; height: 40px; }
  .radar-center-fluid { width: 6px; height: 6px; }
  .badge-label-fluid { font-size: 12px; }
  .badge-brand-fluid { font-size: 14px; }
}
</style>
