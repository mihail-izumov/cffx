<template>
  <div class="signal-badge">
    <div class="radar-container">
      <!-- Центральная точка (сердце системы) -->
      <div class="radar-center"></div>
      
      <!-- Три волны, которые расходятся с задержкой -->
      <div class="radar-wave wave-1"></div>
      <div class="radar-wave wave-2"></div>
      <div class="radar-wave wave-3"></div>
    </div>
    
    <div class="badge-text">
      <span class="badge-label">Репутация под защитой</span>
      <span class="badge-brand">Сигнал</span>
    </div>
  </div>
</template>

<style scoped>
.signal-badge {
  display: inline-flex;
  align-items: center;
  gap: 16px;
  padding: 12px 20px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  backdrop-filter: blur(10px);
}

/* Контейнер радара */
.radar-container {
  position: relative;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Центральная точка (всегда светится) */
.radar-center {
  position: absolute;
  width: 8px;
  height: 8px;
  background: #888;
  border-radius: 50%;
  box-shadow: 0 0 12px rgba(136, 136, 136, 0.6);
  z-index: 10;
}

/* Волны радара */
.radar-wave {
  position: absolute;
  width: 100%;
  height: 100%;
  border: 2px solid rgba(136, 136, 136, 0.4);
  border-radius: 50%;
  animation: radar-pulse 4s ease-out infinite;
}

/* Задержка для каждой волны (создаёт эффект постоянного сканирования) */
.wave-1 {
  animation-delay: 0s;
}

.wave-2 {
  animation-delay: 1.3s;
}

.wave-3 {
  animation-delay: 2.6s;
}

/* Анимация: волна расширяется от центра и растворяется */
@keyframes radar-pulse {
  0% {
    transform: scale(0.2);
    opacity: 0;
  }
  10% {
    opacity: 0.6;
  }
  80% {
    opacity: 0.2;
  }
  100% {
    transform: scale(1);
    opacity: 0;
  }
}

/* Текст бейджа */
.badge-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.badge-label {
  font-size: 14px;
  color: #aaa;
  font-weight: 400;
  line-height: 1.2;
}

.badge-brand {
  font-size: 16px;
  color: #ddd;
  font-weight: 600;
  letter-spacing: 0.5px;
}

/* Адаптивность */
@media (max-width: 640px) {
  .signal-badge {
    padding: 10px 16px;
    gap: 12px;
  }
  
  .radar-container {
    width: 40px;
    height: 40px;
  }
  
  .radar-center {
    width: 6px;
    height: 6px;
  }
  
  .badge-label {
    font-size: 12px;
  }
  
  .badge-brand {
    font-size: 14px;
  }
}
</style>
