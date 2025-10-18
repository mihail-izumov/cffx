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

/* Темные фон и обводка */
.sp-signal-badge {
  display: inline-flex;
  align-items: center;
  gap: 16px;
  padding: 12px 20px;
  background: rgba(20, 20, 30, 0.85);
  border: 1.5px solid rgba(50, 50, 60, 0.8);
  border-radius: 12px;
  backdrop-filter: blur(10px);
  cursor: pointer;
}

/* Контейнер радара */
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
  background: #444;
  border-radius: 50%;
  box-shadow: 0 0 12px rgba(40, 40, 40, 0.5);
  z-index: 10;
}

.sp-radar-wave {
  position: absolute;
  width: 100%;
  height: 100%;
  border: 2px solid rgba(70, 70, 80, 0.42);
  border-radius: 50%;
  animation: sp-radar-pulse 4s ease-out infinite;
}

.sp-wave-1 { animation-delay: 0s; }
.sp-wave-2 { animation-delay: 1.3s; }
.sp-wave-3 { animation-delay: 2.6s; }

@keyframes sp-radar-pulse {
  0%   { transform: scale(0.2); opacity: 0; }
  10%  { opacity: 0.5; }
  80%  { opacity: 0.18; }
  100% { transform: scale(1); opacity: 0; }
}

/* Текст по правой стороне бейджа */
.sp-badge-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
  align-items: flex-end;
  text-align: right;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

/* Еще темнее */
.sp-badge-label {
  font-size: 14px;
  color: #51515a;
  font-weight: 400;
  line-height: 1.2;
  transition: color 0.18s;
}

.sp-badge-brand {
  font-size: 16px;
  color: #bbbbbe;
  font-weight: 600;
  letter-spacing: 0.5px;
  margin-top: 2px;
  transition: color 0.18s;
}

/* Только изменение цвета текста при наведении */
.sp-signal-badge-link:hover .sp-badge-brand,
.sp-signal-badge-link:focus .sp-badge-brand {
  color: #fff;
}

.sp-signal-badge-link:hover .sp-badge-label,
.sp-signal-badge-link:focus .sp-badge-label {
  color: #a0a0ad;
}

@media (max-width: 640px) {
  .sp-badge-wrapper-outer { padding: 16px 12px; }
  .sp-signal-badge { padding: 10px 16px; gap: 12px; }
  .sp-radar-container { width: 40px; height: 40px; }
  .sp-radar-center { width: 6px; height: 6px; }
  .sp-badge-label { font-size: 12px; }
  .sp-badge-brand { font-size: 14px; }
}
</style>
