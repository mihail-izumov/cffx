<template>
  <div class="pricing-grid">
    <!-- КАРТОЧКА: ДИАЛОГИ -->
    <div class="pricing-card">
      <h3 class="card-title card-title--simulator">ДИАЛОГИ</h3>
      <p class="card-subtitle">Для старта (1-3 точки)</p>
      <div class="card-image-wrapper">
        <img
          src="/simulator-ban.svg"
          alt="Диалоги"
          class="card-image"
        />
      </div>
      <div class="card-price">
        <strong>₽64,000/мес</strong>
        <div class="payment-type">Окупается с первых Сигналов</div>
      </div>
      <ul class="feature-list">
        <li class="feature-item" :data-tooltip="tooltips.dialogs.ticketing">
          <CheckIcon /><span>Тикет-система</span>
        </li>
        <li class="feature-item" :data-tooltip="tooltips.dialogs.anna">
          <CheckIcon /><span>Анна (базовая версия)</span>
        </li>
        <li class="feature-item" :data-tooltip="tooltips.dialogs.support">
          <CheckIcon /><span>Поддержка оператора <br>(будни, 9-18)</span>
        </li>
        <li class="feature-item" :data-tooltip="tooltips.dialogs.widget">
          <CheckIcon /><span>Виджет и Умная форма</span>
        </li>
        <li class="feature-item" :data-tooltip="tooltips.dialogs.stats">
          <CheckIcon /><span>Базовая статистика</span>
        </li>
      </ul>
      <a href="/pro/dialogs" class="card-button card-button--secondary">
        Запустить Диалоги
      </a>
    </div>
    <!-- КАРТОЧКА: МАКС -->
    <div class="pricing-card pricing-card--featured">
      <h3 class="card-title card-title--insider">МАКС</h3>
      <p class="card-subtitle">Для сетей (4+ точки)</p>
      <div class="card-image-wrapper">
        <img
          src="/insider-ban.svg"
          alt="Система"
          class="card-image"
        />
      </div>
      <div class="card-price">
        <strong>от ₽225,000/мес</strong>
        <div class="payment-type">Превращаем данные в рост</div>
      </div>
      <p class="includes-all">Всё из Диалогов, плюс:</p>
      <ul class="feature-list">
        <li class="feature-item" :data-tooltip="tooltips.max.analytics">
          <CheckIcon /><span>Аналитика 360° и еженедельные отчеты</span>
        </li>
        <li class="feature-item" :data-tooltip="tooltips.max.annaWidget">
          <CheckIcon /><span>Анна и Виджет (продвинутая настройка)</span>
        </li>
        <li class="feature-item" :data-tooltip="tooltips.max.priority">
          <CheckIcon /><span>Приоритетная поддержка</span>
        </li>
        <li class="feature-item" :data-tooltip="tooltips.max.analyst">
          <CheckIcon /><span>Персональный аналитик и стратегические сессии</span>
        </li>
      </ul>
      <a href="/pro/sistema" class="card-button">Подключить Макс</a>
    </div>
  </div>
</template>

<script setup>
import { h } from 'vue'

/* Простая SVG-галочка */
const CheckIcon = () =>
  h(
    'svg',
    {
      class: 'checkmark-icon',
      xmlns: 'http://www.w3.org/2000/svg',
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      'stroke-width': '2.5',
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round'
    },
    [
      h('path', { d: 'M22 11.08V12a10 10 0 1 1-5.93-9.14' }),
      h('polyline', { points: '22 4 12 14.01 9 11.01' })
    ]
  )

/* Тултипы для функций */
const tooltips = {
  dialogs: {
    ticketing: 'Приём обращений 24/7 • Преднастроенная система для оператора • Контроль сроков и напоминания • Полная история обращений',
    anna: 'Стандартные сценарии для вашей ниши • Работает сразу после подключения • Персональная настройка — за доп. плату (4 недели, от ₽150,000)',
    support: 'Аналитик Сигнала обрабатывает каждый сигнал • Сигналы принимаются 24/7 через виджет • Гарантия решения за 24 часа',
    widget: 'Публичная страница для каждой локации • Быстрый отзыв в Яндекс/2ГИС (2 клика) • Бейдж "Репутация под защитой"',
    stats: 'Автоматическая сводка за месяц • Метрики качества работы системы • Без глубокой аналитики'
  },
  max: {
    analytics: 'Ежемесячная статистика + стратегический разбор • Глубокий разбор при отклонениях • Еженедельные сводные отчёты (каждые 2 недели) • Метрики качества с нормативами',
    annaWidget: 'Анна: всё из базовой + персональная адаптация включена • Постоянная калибровка под изменения в бизнесе • Виджет: мультилокационность • Расширенная аналитика публичной страницы',
    priority: 'Выделенный оператор для ваших локаций • Расширенный график (опция 24/7 для сетей) • Гарантия решения за 12 часов',
    analyst: 'Аналитик Сигнала на связи • Стратегические сессии (90 минут, раз в 2 недели) • Рекомендации по системным изменениям'
  }
}
</script>

<style scoped>
/* СЕТКА ------------------------------------------------------------------- */
.pricing-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

/* КАРТОЧКИ ---------------------------------------------------------------- */
.pricing-card {
  background: #2d2d30;
  border: 2px solid #444;
  border-radius: 18px;
  padding: 48px 24px;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
}

.pricing-card:hover {
  transform: translateY(-6px);
  border-color: #c5f946;
  box-shadow: 0 12px 35px rgba(197, 249, 70, 0.15);
  background: #353538;
}

/* Выделяем СИСТЕМА зелёной рамкой */
.pricing-card--featured {
  border-color: #c5f946;
}

/* ЗАГОЛОВКИ --------------------------------------------------------------- */
.card-title {
  font-weight: 600;
  text-align: center;
  letter-spacing: 0.25em;
  margin: 0 0 8px 0;
  color: #fff;
  border: none;
  text-transform: uppercase;
}

.card-title--insider { font-size: 1.625rem; }
.card-title--simulator { font-size: 1.375rem; }

/* ПОДЗАГОЛОВОК ------------------------------------------------------------ */
.card-subtitle {
  font-size: 1.125rem;
  color: #c0c0c0;
  text-align: center;
  margin: 0 0 32px 0;
  line-height: 1.4;
  font-weight: 400;
  max-width: 280px;
  margin-left: auto;
  margin-right: auto;
}

/* ИЗОБРАЖЕНИЕ ------------------------------------------------------------- */
.card-image-wrapper {
  width: 100%;
  aspect-ratio: 16/9;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 22px;
}

.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* ЦЕНА -------------------------------------------------------------------- */
.card-price {
  text-align: center;
  margin-bottom: 24px;
}

.card-price strong {
  font-weight: 600;
  font-size: 1.425rem;
  color: #fff;
  display: block;
}

.payment-type {
  font-size: 0.925rem;
  color: #a8a8a8;
  margin-top: 4px;
}

/* ДОПОЛНИТЕЛЬНЫЙ ТЕКСТ ---------------------------------------------------- */
.includes-all {
  font-size: 1.025rem;
  color: #a8a8a8;
  margin: 0 0 16px 4px;
}

/* СПИСОК ------------------------------------------------------------------ */
.feature-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex-grow: 1;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 0.938rem;
  line-height: 1.2;
  color: #e0e0e0;
  position: relative;
  cursor: help;
  transition: color 0.2s ease;
}

.feature-item:hover {
  color: #c5f946;
}

.checkmark-icon {
  width: 18px;
  height: 18px;
  color: #c5f946;
  flex-shrink: 0;
}

/* ТУЛТИПЫ ----------------------------------------------------------------- */
.feature-item::after {
  content: attr(data-tooltip);
  position: absolute;
  left: 0;
  top: calc(100% + 12px);
  background: #1a1a1c;
  color: #e0e0e0;
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 0.825rem;
  line-height: 1.5;
  width: max-content;
  max-width: 320px;
  white-space: pre-line;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease, transform 0.3s ease;
  transform: translateY(-8px);
  z-index: 1000;
  border: 1px solid #444;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
}

.feature-item:hover::after {
  opacity: 1;
  transform: translateY(0);
}

/* Стрелка тултипа */
.feature-item::before {
  content: '';
  position: absolute;
  left: 20px;
  top: calc(100% + 4px);
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-bottom: 6px solid #444;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
  z-index: 1001;
}

.feature-item:hover::before {
  opacity: 1;
}

/* ССЫЛКИ В СПИСКЕ ФУНКЦИЙ ------------------------------------------------- */
.feature-link {
  color: #c5f946;
  text-decoration: none;
  transition: all 0.2s ease;
}

.feature-link:hover {
  color: #fff;
  text-decoration: underline;
}

/* КНОПКИ ------------------------------------------------------------------ */
.card-button {
  margin-top: 48px;
  display: block;
  padding: 14px 18px;
  border-radius: 12px;
  font-size: 1.065rem;
  font-weight: 700;
  text-align: center;
  text-decoration: none;
  transition: all 0.25s ease;
  border: 2px solid #c5f946;
  box-sizing: border-box;
}

.card-button {
  background: #c5f946;
  color: #000;
}

.card-button:hover {
  background: #fff;
  border-color: #fff;
  color: #000;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(255, 255, 255, 0.2);
}

/* «ДИАЛОГИ» — вторичная кнопка */
.card-button--secondary {
  background: transparent;
  color: #c5f946;
}

.card-button--secondary:hover {
  background: #c5f946;
  color: #000;
}

/* МОБИЛЬНАЯ ВЕРСИЯ -------------------------------------------------------- */
@media (max-width: 768px) {
  .feature-item {
    font-size: 1.125rem !important;
    line-height: 1.4 !important;
  }
  
  .checkmark-icon {
    width: 20px !important;
    height: 20px !important;
  }
  
  .pricing-card {
    padding: 32px 20px !important;
  }
  
  .card-subtitle {
    font-size: 1.125rem !important;
    max-width: none !important;
  }

  /* Тултипы на мобильных - показываем по тапу */
  .feature-item::after {
    max-width: calc(100vw - 48px);
    left: 50%;
    transform: translateX(-50%) translateY(-8px);
  }

  .feature-item:hover::after {
    transform: translateX(-50%) translateY(0);
  }

  .feature-item::before {
    left: 50%;
    transform: translateX(-50%);
  }
}

@media (max-width: 480px) {
  .feature-item {
    font-size: 1.075rem !important;
    line-height: 1.35 !important;
  }

  .feature-item::after {
    font-size: 0.775rem;
    padding: 10px 14px;
  }
}
</style>
