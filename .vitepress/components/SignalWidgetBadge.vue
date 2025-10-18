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
  outline: none;
}

.sp-signal-badge-link:focus {
  outline: none;
}

.sp-signal-badge {
  display: inline-flex;
  align-items: center;
  gap: 16px;
  padding: 12px 20px;
  background: rgba(0, 0, 0, 0.8);
  border: 1px solid rgba(50, 50, 50, 0.7);
  border-radius: 12px;
  backdrop-filter: blur(10px);
  cursor: pointer;
  box-shadow: 0 0 40px rgba(255, 255, 255, 0.1);
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
  background: rgba(180, 180, 180, 0.9);
  border-radius: 50%;
  box-shadow: 0 0 12px rgba(180, 180, 180, 0.7);
  z-index: 10;
  transition: background 0.6s ease, box-shadow 0.6s ease;
}

.sp-signal-badge-link:hover .sp-radar-center {
  background: rgba(200, 200, 200, 0.95);
  box-shadow: 0 0 14px rgba(200, 200, 200, 0.8);
}

.sp-radar-wave {
  position: absolute;
  width: 100%;
  height: 100%;
  border: 2px solid rgba(160, 160, 160, 0.5);
  border-radius: 50%;
  animation: sp-radar-pulse 4s ease-out infinite;
  transition: border-color 0.6s ease;
}

.sp-signal-badge-link:hover .sp-radar-wave {
  border-color: rgba(180, 180, 180, 0.6);
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
