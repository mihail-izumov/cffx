<template>
  <div class="sp-badge-wrapper-outer">
    <a
      class="sp-signal-badge-link"
      href="https://runscale.ru"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Перейти на Runscale"
    >
      <div class="sp-signal-badge">
        <div class="sp-radar-container">
          <!-- Центральная точка радара -->
          <div class="sp-radar-center"></div>
          
          <!-- Анимированные волны -->
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
/* Внешний контейнер для центрирования */
.sp-badge-wrapper-outer {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 16px;
  background: transparent;
}

/* Ссылка, оборачивающая бейдж */
.sp-signal-badge-link {
  display: inline-flex;
  text-decoration: none;
  border-radius: 12px; /* Для скругления фокуса */
}

/* Основной стиль бейджа */
.sp-signal-badge {
  display: inline-flex;
  align-items: center;
  gap: 16px;
  padding: 12px 20px;
  /* Темный фон с прозрачностью */
  background: rgba(15, 15, 15, 0.8);
  border: 1px solid;
  /* Градиентная обводка */
  border-image-source: linear-gradient(to bottom, rgba(80, 80, 80, 0.5), rgba(40, 40, 40, 0.5));
  border-image-slice: 1;
  border-radius: 12px;
  backdrop-filter: blur(10px);
  cursor: pointer;
  transition: background 0.5s ease;
}

/* --- Стили радара --- */
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
  /* Цвет центра, видимый на темном фоне */
  background: #999;
  border-radius: 50%;
  box-shadow: 0 0 12px rgba(153, 153, 153, 0.6);
  z-index: 10;
}

.sp-radar-wave {
  position: absolute;
  width: 100%;
  height: 100%;
  /* Цвет волн, видимый на темном фоне */
  border: 2px solid rgba(153, 153, 153, 0.4);
  border-radius: 50%;
  animation: sp-radar-pulse 4s ease-out infinite;
}

.sp-wave-1 { animation-delay: 0s; }
.sp-wave-2 { animation-delay: 1.3s; }
.sp-wave-3 { animation-delay: 2.6s; }

@keyframes sp-radar-pulse {
  0% { transform: scale(0.2); opacity: 0; }
  10% { opacity: 0.7; }
  80% { opacity: 0.3; }
  100% { transform: scale(1); opacity: 0; }
}

/* --- Стили текста --- */
.sp-badge-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
  /* Текст выравнивается по левому краю внутри этого блока */
  text-align: left; 
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.sp-badge-label {
  font-size: 14px;
  /* Затемненный цвет текста */
  color: #777;
  font-weight: 400;
  line-height: 1.2;
  /* Плавный переход цвета */
  transition: color 0.5s ease;
}

.sp-badge-brand {
  font-size: 16px;
  /* Затемненный цвет текста */
  color: #999;
  font-weight: 600;
  letter-spacing: 0.5px;
  /* Плавный переход цвета */
  transition: color 0.5s ease;
}

/* --- Эффекты при наведении --- */
.sp-signal-badge-link:hover .sp-badge-label {
  /* Текст становится ярче */
  color: #aaa;
}

.sp-signal-badge-link:hover .sp-badge-brand {
  /* Текст становится белым */
  color: #fff;
}

/* --- Адаптивность --- */
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
