<template>
  <a class="signal-badge-fluid-elegant" href="https://runscale.ru" target="_blank" rel="noopener">
    <div class="radar-container-fluid-elegant">
      <div class="radar-center-fluid-elegant"></div>
      <div class="radar-wave-fluid-elegant wave-1"></div>
      <div class="radar-wave-fluid-elegant wave-2"></div>
      <div class="radar-wave-fluid-elegant wave-3"></div>
    </div>
    <div class="badge-text-fluid-elegant">
      <span class="badge-label-fluid-elegant">Репутация под защитой</span>
      <span class="badge-brand-fluid-elegant">Работает Сигнал</span>
    </div>
  </a>
</template>

<style scoped>
.signal-badge-fluid-elegant {
  display: inline-flex;
  align-items: center;
  gap: 16px;
  padding: 12px 22px;
  border-radius: 8px;
  background:
    linear-gradient(112deg, #21261d 65%, #233019 100%),
    radial-gradient(130% 140% at 21% 85%, #dafe73 0%, #80acd9 100%);
  border: 1.1px solid #303b22cc;
  box-shadow: none !important;
  width: max-content;
  margin: 36px auto 0 auto;
  cursor: pointer;
  user-select: none;
  position: relative;
  transition:
    box-shadow 0.22s cubic-bezier(.37,1.1,.45,1),
    transform 0.21s cubic-bezier(.52,1.55,.45,1.1),
    filter 0.17s cubic-bezier(.31,1.38,.44,1.02);
  text-decoration: none;
}
.signal-badge-fluid-elegant:active,
.signal-badge-fluid-elegant:focus {
  outline: none !important;
}
.signal-badge-fluid-elegant:hover,
.signal-badge-fluid-elegant:focus-visible {
  transform: translateY(-3px) scale(1.01);
  box-shadow: 0 2px 12px 2px #72e7be4d, 0 1px 0px 0px #c7ff2887;
  filter: brightness(1.01);
  text-decoration: none;
}
/* Убираем любые артефакты от стилей vitepress на hover */
.signal-badge-fluid-elegant:after, .signal-badge-fluid-elegant:before {
  display: none !important;
  content: none !important;
}

.radar-container-fluid-elegant {
  position: relative;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.radar-center-fluid-elegant {
  position: absolute;
  width: 8px;
  height: 8px;
  background: #C7FF28;
  border-radius: 50%;
  box-shadow: 0 0 12px 2px #C7FF28CC, 0 0 3px 1px #232823CC;
  z-index: 10;
}
.radar-wave-fluid-elegant {
  position: absolute;
  width: 100%;
  height: 100%;
  border: 2px solid #C7FF288d;
  border-radius: 50%;
  animation: radar-pulse-fluid-elegant 4s ease-out infinite;
}
.wave-1 { animation-delay: 0s;}
.wave-2 { animation-delay: 1.3s;}
.wave-3 { animation-delay: 2.6s;}
@keyframes radar-pulse-fluid-elegant {
  0% { transform: scale(0.2); opacity: 0;}
  10% { opacity: 0.50;}
  80% { opacity: 0.19;}
  100% { transform: scale(1); opacity: 0;}
}
.badge-text-fluid-elegant {
  display: flex;
  flex-direction: column;
  gap: 2px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}
.badge-label-fluid-elegant {
  font-size: 14px;
  color: #e0ecd2;
  font-weight: 400;
  line-height: 1.2;
}
.badge-brand-fluid-elegant {
  font-size: 16px;
  color: #C7FF28;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-shadow: 0 1.2px 4px #18191699, 0 2px 8px #c7ff284b;
}
@media (max-width: 640px) {
  .signal-badge-fluid-elegant { padding: 10px 15px; gap: 12px; border-radius: 8px;}
  .radar-container-fluid-elegant { width: 40px; height: 40px;}
  .radar-center-fluid-elegant { width: 6px; height: 6px;}
  .badge-label-fluid-elegant { font-size: 12px; }
  .badge-brand-fluid-elegant { font-size: 14px; }
}
</style>
