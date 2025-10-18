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

/* Бейдж: очень тёмный фон и обводка */
.sp-signal-badge {
  display: inline-flex;
  align-items: center;
  gap: 18px;
  padding: 13px 22px;
  background: rgba(10, 10, 16, 0.82);
  border: 1.5px solid rgba(30, 30, 36, 0.74);
  border-radius: 12px;
  backdrop-filter: blur(10px);
  cursor: pointer;
  transition: none;
}

/* Радар слева */
.sp-radar-container {
  position: relative;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

/* Внутри справа — текст блок с выравниванием по правому краю */
.sp-badge-text {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 2px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  min-width: 180px;
}

/* Название и субтитр: цвета примечательно темнее */
.sp-badge-label {
  font-size: 14px;
  color: #3e3e48;
  font-weight: 400;
  line-height: 1.2;
  transition: color 0.2s;
}
.sp-badge-brand {
  font-size: 16px;
  color: #6e6e7b;
  font-weight: 600;
  letter-spacing: 0.5px;
  transition: color 0.2s;
}

/* Наведение: только цвета текста */
.sp-signal-badge-link:hover .sp-badge-brand,
.sp-signal-badge-link:focus .sp-badge-brand {
  color: #fff;
}
.sp-signal-badge-link:hover .sp-badge-label,
.sp-signal-badge-link:focus .sp-badge-label {
  color: #747485;
}

/* Радар анимация — без изменений */
.sp-radar-center {
  position: absolute;
  width: 8px;
  height: 8px;
  background: #33353a;
  border-radius: 50%;
  box-shadow: 0 0 12px rgba(56, 56, 64, 0.5);
  z-index: 10;
}

.sp-radar-wave {
  position: absolute;
  width: 100%;
  height: 100%;
  border: 2px solid rgba(56, 56, 64, 0.29);
  border-radius: 50%;
  animation: sp-radar-pulse 4s ease-out infinite;
}
.sp-wave-1 { animation-delay: 0s; }
.sp-wave-2 { animation-delay: 1.3s; }
.sp-wave-3 { animation-delay: 2.6s; }

@keyframes sp-radar-pulse {
  0%   { transform: scale(0.2); opacity: 0;}
  10%  { opacity: 0.65;}
  80%  { opacity: 0.13;}
  100% { transform: scale(1); opacity: 0;}
}

/* Адаптивность */
@media (max-width: 640px) {
  .sp-badge-wrapper-outer {
    padding: 16px 8px;
  }
  .sp-signal-badge {
    padding: 9px 10px;
    gap: 10px;
  }
  .sp-radar-container {
    width: 36px;
    height: 36px;
  }
  .sp-radar-center {
    width: 6px;
    height: 6px;
  }
  .sp-badge-text {
    min-width: 110px;
  }
  .sp-badge-label {
    font-size: 12px;
  }
  .sp-badge-brand {
    font-size: 14px;
  }
}
</style>
