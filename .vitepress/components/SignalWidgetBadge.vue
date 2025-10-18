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
  text-decoration: none !important;
  outline: none !important;
  border: none !important;
  position: relative;
}

.sp-signal-badge-link:focus,
.sp-signal-badge-link:active,
.sp-signal-badge-link:hover {
  outline: none !important;
  border: none !important;
  text-decoration: none !important;
  box-shadow: none !important;
}

.sp-signal-badge {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 16px;
  padding: 12px 20px;
  background: rgba(0, 0, 0, 0.65);
  border-radius: 12px;
  backdrop-filter: blur(10px);
  cursor: pointer;
  box-shadow: 0 0 40px rgba(255, 255, 255, 0.1);
  z-index: 1;
}

/* Базовый градиент обводки */
.sp-signal-badge::before {
  content: '';
  position: absolute;
  top: -1px;
  left: -1px;
  right: -1px;
  bottom: -1px;
  border-radius: 13px;
  padding: 2px;
  background: 
    conic-gradient(
      from 135deg at 50% 50%,
      rgba(45, 45, 45, 0.65),
      rgba(80, 80, 80, 0.85) 50%,
      rgba(45, 45, 45, 0.65)
    );
  -webkit-mask: 
    linear-gradient(#fff 0 0) content-box, 
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
  z-index: -1;
  opacity: 1;
  transition: opacity 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

/* Смещенный градиент (при наведении) */
.sp-signal-badge::after {
  content: '';
  position: absolute;
  top: -1px;
  left: -1px;
  right: -1px;
  bottom: -1px;
  border-radius: 13px;
  padding: 2px;
  background: 
    conic-gradient(
      from 215deg at 50% 50%,
      rgba(65, 65, 65, 0.75),
      rgba(110, 110, 110, 0.95) 50%,
      rgba(65, 65, 65, 0.75)
    );
  -webkit-mask: 
    linear-gradient(#fff 0 0) content-box, 
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
  z-index: -1;
  opacity: 0;
  transition: opacity 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

/* При наведении скрываем первый градиент и показываем второй */
.sp-signal-badge-link:hover .sp-signal-badge::before {
  opacity: 0;
}

.sp-signal-badge-link:hover .sp-signal-badge::after {
  opacity: 1;
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
  background: rgba(200, 200, 200, 0.95);
  border-radius: 50%;
  box-shadow: 0 0 16px rgba(200, 200, 200, 0.8);
  z-index: 10;
  transition: background 0.6s ease, box-shadow 0.6s ease;
}

.sp-signal-badge-link:hover .sp-radar-center {
  background: rgba(255, 255, 255, 1);
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.9);
}

.sp-radar-wave {
  position: absolute;
  width: 100%;
  height: 100%;
  border: 2px solid rgba(180, 180, 180, 0.65);
  border-radius: 50%;
  animation: sp-radar-pulse 4s ease-out infinite;
  transition: border-color 0.6s ease;
}

.sp-signal-badge-link:hover .sp-radar-wave {
  border-color: rgba(220, 220, 220, 0.8);
}

.sp-wave-1 {
  animation-delay: 0s;
}

.sp-wave-2 {
  animation-delay: 1.3s;
}

.sp-wave-3 {
  animation-delay: 2.6s;
}

@keyframes sp-radar-pulse {
  0% {
    transform: scale(0.2);
    opacity: 0;
  }
  10% {
    opacity: 0.7;
  }
  80% {
    opacity: 0.3;
  }
  100% {
    transform: scale(1);
    opacity: 0;
  }
}

.sp-badge-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
  align-items: flex-start;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.sp-badge-label {
  font-size: 14px;
  color: rgba(120, 120, 120, 0.9);
  font-weight: 400;
  line-height: 1.2;
  transition: color 0.6s ease;
}

.sp-badge-brand {
  font-size: 16px;
  color: rgba(140, 140, 140, 0.95);
  font-weight: 600;
  letter-spacing: 0.5px;
  transition: color 0.6s ease;
}

.sp-signal-badge-link:hover .sp-badge-label {
  color: rgba(180, 180, 180, 0.95);
}

.sp-signal-badge-link:hover .sp-badge-brand {
  color: rgba(255, 255, 255, 1);
}

@media (max-width: 640px) {
  .sp-badge-wrapper-outer {
    padding: 16px 12px;
  }
  
  .sp-signal-badge {
    padding: 10px 16px;
    gap: 12px;
  }
  
  .sp-radar-container {
    width: 40px;
    height: 40px;
  }
  
  .sp-radar-center {
    width: 6px;
    height: 6px;
  }
  
  .sp-badge-label {
    font-size: 12px;
  }
  
  .sp-badge-brand {
    font-size: 14px;
  }
}
</style>
