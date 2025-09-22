<template>
<div class="signal-product-tabs">
<!-- Блок с кнопками для переключения вкладок -->
<div class="signal-product-tabs__nav">
  <button :class="{ active: activeTab === 'reviews' }" @click="activeTab = 'reviews'">
    📍 2ГИС/Яндекс отзывы
  </button>
  <button :class="{ active: activeTab === 'basic_analytics' }" @click="activeTab = 'basic_analytics'">
    💡 Аналитика (базовая)
  </button>
  <button :class="{ active: activeTab === 'advanced_analytics' }" @click="activeTab = 'advanced_analytics'">
    🔮 Аналитика (расширенная)
  </button>
</div>

<!-- Контент для вкладок -->
<div class="signal-product-tabs__content">
  <!-- Вкладка: 2ГИС/Яндекс отзывы -->
  <div v-show="activeTab === 'reviews'" class="signal-product-tabs__panel">
    <h3>Голос клиентов из геосервисов — ваша карта роста</h3>
    <div class="signal-product-tabs__grid">
      <div class="signal-product-tabs__card">
        <div class="signal-product-tabs__card-header"><h4>Голос клиента</h4><span class="signal-product-tabs__badge">Анализ за месяц</span></div>
        <p class="signal-product-tabs__card-description">Очищенная база отзывов из 2ГИС и Яндекс Карт показывает истинное мнение гостей о вас и конкурентах — от Skuratov Coffee до местных авторских кофеен.</p>
        <div class="signal-product-tabs__card-highlight"><strong>Результат:</strong> Превращает хаос мнений в четкую карту действий</div>
      </div>
      <div class="signal-product-tabs__card">
        <div class="signal-product-tabs__card-header"><h4>Реальная карта конкурентов</h4><span class="signal-product-tabs__badge">15 кофеен × 3 сегмента</span></div>
        <p class="signal-product-tabs__card-description">Точно понимаете, с кем вас сравнивают гости при выборе: премиальные (White Cup, Mosaic Coffee), сетевые (Coffee Bean, Корж) и локальные игроки.</p>
        <div class="signal-product-tabs__card-highlight"><strong>Позиционирование:</strong> От атмосферы и сервиса до скорости и качества</div>
      </div>
    </div>
  </div>

  <!-- Вкладка: Аналитика (базовая) -->
  <div v-show="activeTab === 'basic_analytics'" class="signal-product-tabs__panel">
    <h3>От эмоций гостей к конкретным действиям</h3>
    <div class="signal-product-tabs__grid">
      <div class="signal-product-tabs__card">
        <div class="signal-product-tabs__card-header"><h4>Ежемесячная диагностика</h4><span class="signal-product-tabs__badge">Комплексная оценка</span></div>
        <p class="signal-product-tabs__card-description">Выделяем именно те 10 факторов, которые влияют на решение гостей прийти к вам или к конкуренту: от скорости обслуживания до уютности атмосферы.</p>
        <div class="signal-product-tabs__card-highlight"><strong>Детали:</strong> О чем конкретно говорят ваши клиенты — 10 критериев с примерами</div>
      </div>
      <div class="signal-product-tabs__card">
        <div class="signal-product-tabs__card-header"><h4>Честные оценки</h4><span class="signal-product-tabs__badge">Факты из отзывов</span></div>
        <p class="signal-product-tabs__card-description">Отчет показывает, где вы лидируете, где отстаете, и что нужно исправить в первую очередь для роста выручки и посещаемости.</p>
        <div class="signal-product-tabs__card-highlight"><strong>Шкала:</strong> От 1 до 10 по каждому из 10 критериев</div>
      </div>
      <div class="signal-product-tabs__card">
        <div class="signal-product-tabs__card-header"><h4>Жалобы</h4><span class="signal-product-tabs__badge">Возможности роста</span></div>
        <p class="signal-product-tabs__card-description">Сравнение с конкурентами с примерами формулировок и привязкой к операционным действиям — что исправить завтра для результата через неделю.</p>
        <div class="signal-product-tabs__card-highlight"><strong>Эффект:</strong> Точки кратного роста за счет слабостей конкурентов</div>
      </div>
      <div class="signal-product-tabs__card">
        <div class="signal-product-tabs__card-header"><h4>Сильные стороны</h4><span class="signal-product-tabs__badge">Приоритеты улучшений</span></div>
        <p class="signal-product-tabs__card-description">Точное понимание ваших уникальных сильных сторон и план, как использовать их для роста выручки и привлечения новых гостей.</p>
        <div class="signal-product-tabs__card-highlight"><strong>Стратегия:</strong> Профессиональные рекомендации по росту от аналитиков Сигнала</div>
      </div>
    </div>
  </div>

  <!-- Вкладка: Аналитика (расширенная) -->
  <div v-show="activeTab === 'advanced_analytics'" class="signal-product-tabs__panel">
    <h3>Глубинная аналитика для стратегических решений</h3>
    <div class="signal-product-tabs__grid">
      <div class="signal-product-tabs__card">
        <div class="signal-product-tabs__card-header"><h4>Персональные сессии</h4><span class="signal-product-tabs__badge">90 мин./мес.</span></div>
        <p class="signal-product-tabs__card-description">Отслеживайте прогресс на стратегических сессиях с аналитиком Сигнала — разбираем каждую метрику и находим скрытые возможности роста.</p>
        <div class="signal-product-tabs__card-highlight"><strong>Фокус:</strong> Оценка метрик • Точки роста • Сигналы коррекции</div>
      </div>
      <div class="signal-product-tabs__card">
        <div class="signal-product-tabs__card-header"><h4>Ретроспектива</h4><span class="signal-product-tabs__badge">90 дней</span></div>
        <p class="signal-product-tabs__card-description">Сводный отчет с динамикой изменений ключевых параметров, важных для роста выручки — видите тренды и результаты ваших изменений.</p>
        <div class="signal-product-tabs__card-highlight"><strong>Анализ:</strong> Сводная аналитика по каждому из 10 критериев</div>
      </div>
      <div class="signal-product-tabs__card">
        <div class="signal-product-tabs__card-header"><h4>Темный Режим</h4><span class="signal-product-tabs__badge">Глубокие инсайты</span></div>
        <p class="signal-product-tabs__card-description">Скрытые срезы данных: паттерны и тренды, невидимые для рынка в контексте именно вашей кофейни — конкурентное преимущество в данных.</p>
        <div class="signal-product-tabs__card-highlight"><strong>Преимущество:</strong> Находите то, что упускают 90% игроков</div>
      </div>
      <div class="signal-product-tabs__card">
        <div class="signal-product-tabs__card-header"><h4>Сигналы изменений</h4><span class="signal-product-tabs__badge">Индекс Роста</span></div>
        <p class="signal-product-tabs__card-description">Получайте уведомления о движениях кофейного рынка Самары — от трендов в меню до изменений в потребительском поведении гостей.</p>
        <div class="signal-product-tabs__card-highlight"><strong>Мониторинг:</strong> Тренды • Сдвиги в поведении гостей • Новые возможности</div>
      </div>
      <div class="signal-product-tabs__card">
        <div class="signal-product-tabs__card-header"><h4>-20% на Чекап всего бизнеса</h4><span class="signal-product-tabs__badge">Модуль Роста®</span></div>
        <p class="signal-product-tabs__card-description">Найти скрытые разрывы в процессах, которые тормозят рост — от операций до маркетинга, интеграция с платформой Runscale для комплексного анализа.</p>
        <div class="signal-product-tabs__card-highlight"><strong>Гарантия:</strong> 3 конкретных улучшения за 30 дней</div>
      </div>
    </div>
  </div>
</div>
</div>
</template>

<script setup>
import { ref } from 'vue'
const activeTab = ref('reviews')
</script>

<style scoped>
/* Main container for style isolation */
.signal-product-tabs {
  margin: 2rem 0;
  font-family: var(--vp-font-family-base);
}

/* Tab navigation */
.signal-product-tabs__nav {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-bottom: 1.5rem;
  background: #202020; /* Darker background */
  border-radius: 10px;
  padding: 4px;
}
.signal-product-tabs__nav button {
  padding: 10px 16px;
  border: none;
  background: #3a3a3a; /* Default grey background */
  color: #9ca3af;
  cursor: pointer;
  border-radius: 6px;
  font-weight: 500;
  transition: all 0.2s ease;
  font-size: 0.9rem;
  white-space: nowrap;
}
.signal-product-tabs__nav button:not(.active):hover {
  background: #4a4a4a; /* Lighter grey on hover for passive tabs */
  color: #ffffff;
}
.signal-product-tabs__nav button.active {
  background: #a3e635; /* Lime green for active tab */
  color: #000000;
  font-weight: 600;
}
.signal-product-tabs__nav button.active:hover {
  background: #a3e635; /* Keep lime green on hover for active tab */
  color: #000000;
}

/* Tab content */
.signal-product-tabs__panel {
  animation: fadeIn 0.3s ease-in-out;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}
.signal-product-tabs__panel h3 {
  font-size: 1.4rem;
  margin-bottom: 1rem;
  color: var(--vp-c-text-1);
  font-weight: 600;
}

/* Grid and cards */
.signal-product-tabs__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.2rem;
}
.signal-product-tabs__card {
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid var(--vp-c-divider);
  transition: all 0.2s ease;
  display: flex;
  flex-direction: column;
}
.signal-product-tabs__card:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.07);
  border-color: var(--vp-c-brand-soft);
}
.signal-product-tabs__card-header {
  margin-bottom: 1rem;
}
.signal-product-tabs__card-header h4 {
  margin: 0 0 0.5rem 0;
  font-size: 1.15rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  line-height: 1.3;
}

/* Badge styling */
.signal-product-tabs__badge {
  display: inline-block;
  background-color: #4ade80;
  color: #000;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 600;
  line-height: 1.4;
}

.signal-product-tabs__card-description {
  color: var(--vp-c-text-2);
  line-height: 1.6;
  font-size: 0.95rem;
  flex-grow: 1;
  margin-bottom: 1rem;
}
.signal-product-tabs__card-highlight {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 0.85rem;
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  margin-top: auto;
}
.signal-product-tabs__card-highlight strong {
  color: var(--vp-c-text-1);
  font-weight: 600;
}
</style>
