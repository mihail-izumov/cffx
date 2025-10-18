<template>
  <div class="sp-badge-wrapper-outer">
    <a
      class="sp-signal-badge-link"
      href="https://runscale.ru"
      target="_blank"
      rel="noopener"
      aria-label="Перейти на Runscale"
    >
      <div class="sp-signal-badge">
        <div class="sp-radar-container">
          <div class="sp-radar-center"></div>
          <div class="sp-radar-wave sp-wave-1"></div>
          <div class="sp-radar-wave sp-wave-2"></div>
          <div class="sp-radar-wave sp-wave-3"></div>
        </div>
        <div class="sp-badge-text">
          <span class="sp-badge-label">Репутация под защитой</span>
          <span class="sp-badge-brand">Работает Сигнал</span>
        </div>
      </div>
    </a>
  </div>
</template>

<style scoped>
.sp-badge-wrapper-outer {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 16px;
  background: transparent;
}

.sp-signal-badge-link {
  display: inline-flex;
  text-decoration: none;
}

/* Черный фон, прозрачность 80%, темная градиентная обводка */
.sp-signal-badge {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px 20px;
  background: rgba(0, 0, 0, 0.80);
  border-radius: 12px;
  border: 1.5px solid;
  border-image: linear-gradient(135deg, #101014 40%, #2a2a2e 100%) 1;
  backdrop-filter: blur(10px);
  box-sizing: border-box;
  transition: background 0.3s, border 0.5s;
}

/* Радиолокация остаётся яркой на тёмном */
.sp-radar-container {
  position: relative;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.sp-radar-center {
  position: absolute;
  width: 8px;
  height: 8px;
  background: #aed0fd;
  border-radius: 50%;
  box-shadow: 0 0 14px rgba(120,180,255,0.8);
  z-index: 10;
}

.sp-radar-wave {
  position: absolute;
  width: 100%;
  height: 100%;
  border: 2px solid rgba(120,180,255,0.17);
  border-radius: 50%;
  animation: sp-radar-pulse 7s cubic-bezier(0.23,1,0.32,1) infinite;
  transition: border-color 0.5s;
}

.sp-wave-1 { animation-delay: 0s; }
.sp-wave-2 { animation-delay: 2.33s; }
.sp-wave-3 { animation-delay: 4.66s; }

@keyframes sp-radar-pulse {
  0%   {transform: scale(0.2); opacity: 0;}
  10%  {opacity: 0.5;}
  40%  {opacity: 0.22;}
  100% {transform: scale(1); opacity: 0;}
}

/* Текст всегда по левой стороне */
.sp-badge-text {
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  align-items: flex-start;
}

.sp-badge-label {
  font-size: 14px;
  color: #3f414b;
  font-weight: 400;
  line-height: 1.2;
  transition: color 0.4s;
}

.sp-badge-brand {
  font-size: 16px;
  color: #4b4d56;
  font-weight: 600;
  letter-spacing: 0.5px;
  transition: color 0.4s;
}

/* На hover меняется только цвет текста, все остальное без эффектов! */
.sp-signal-badge-link:hover .sp-badge-brand,
.sp-signal-badge-link:focus .sp-badge-brand {
  color: #fff;
}

.sp-signal-badge-link:hover .sp-badge-label,
.sp-signal-badge-link:focus .sp-badge-label {
  color: #98a3be;
}

/* Адаптивность */
@media (max-width: 640px) {
  .sp-badge-wrapper-outer { padding: 16px 8px; }
  .sp-signal-badge { padding: 10px 12px; gap: 12px; }
  .sp-radar-container { width: 40px; height: 40px; }
  .sp-radar-center { width: 6px; height: 6px; }
  .sp-badge-label { font-size: 12px; }
  .sp-badge-brand { font-size: 13px; }
}
</style>
