<script setup>
import { ref } from 'vue'
const activeTab = ref('competitors')
</script>

<template>
  <div class="how-it-works-widget">
    
    <!-- Заголовок секции -->
    <div class="widget-header">
      <h2 class="widget-title">Как использовать Индекс Роста</h2>
      <p class="widget-subtitle">
        5 инструментов для кратного роста вашего бизнеса
      </p>
    </div>

    <!-- Навигация (Табы) -->
    <div class="tabs-container">
      <button 
        v-for="tab in [
          { id: 'competitors', label: 'Карта конкурентов' },
          { id: 'positioning', label: 'Таблица позиций' },
          { id: 'five-whys', label: 'Анализ «5 почему»' },
          { id: 'quotes', label: 'Цитаты клиентов' },
          { id: 'next-steps', label: 'Следующий шаг' }
        ]" 
        :key="tab.id"
        :class="['tab-button', { active: activeTab === tab.id }]" 
        @click="activeTab = tab.id"
      >
        {{ tab.label }}
      </button>
    </div>

    <!-- Панель контента -->
    <div class="content-panel">
      
      <!-- Вкладка: Карта конкурентов -->
      <div v-show="activeTab === 'competitors'" class="tab-content">
        <h3>Карта конкурентов</h3>
        <p>Изучите, кто ваши реальные конкуренты и за что их хвалят клиенты:</p>
        <ul>
          <li><strong>Лидер рынка 👑 (80-100 баллов)</strong> — учитесь у них, адаптируйте их лучшие практики.</li>
          <li><strong>Сильный 💪 (60-79 баллов)</strong> — ваши прямые конкуренты, отслеживайте их действия.</li>
          <li><strong>Растущий 📈 (40-59 баллов)</strong> — поймите их ошибки, чтобы не повторять.</li>
        </ul>
      </div>

      <!-- Вкладка: Таблица позиционирования -->
      <div v-show="activeTab === 'positioning'" class="tab-content">
        <h3>Таблица реального позиционирования</h3>
        <p>Индекс Роста Самары – это ваша стратегическая карта. Смотрите на строку с вашей кофейней:</p>
        <ul>
          <li><strong>Высокая оценка</strong> — ваши сильные стороны. Говорите о них громче, используйте в рекламе.</li>
          <li><strong>Средняя оценка</strong> — норма рынка. Здесь вы не выделяетесь, но и не проигрываете.</li>
          <li><strong>Низкая оценка</strong> — критические проблемы. Начинайте исправлять с них.</li>
        </ul>
        <h4>Конкретный пример</h4>
        <p>Если у вас «скорость обслуживания — «Средняя», а у лидера рынка «Высокая», значит, именно здесь вы теряете клиентов. Первым делом оптимизируйте процессы.</p>
      </div>

      <!-- Вкладка: Анализ «5 почему» -->
      <div v-show="activeTab === 'five-whys'" class="tab-content">
        <h3>Анализ методом «5 почему»</h3>
        <p>Каждая низкая оценка — это не приговор, а задача для решения. Для каждой проблемы задавайте вопрос «почему?» пять раз подряд, чтобы добраться до корня:</p>
        <ul>
          <li><strong>Почему</strong> у нас низкая оценка по скорости? → Клиенты жалуются на очереди.</li>
          <li><strong>Почему</strong> образуются очереди? → В час пик не хватает персонала.</li>
          <li><strong>Почему</strong> не хватает персонала? → Нет четкого графика работы.</li>
          <li><strong>Почему</strong> нет четкого графика? → Не анализировались пиковые часы.</li>
          <li><strong>Почему</strong> не анализировались? → Не было данных о загрузке.</li>
        </ul>
        <h4>Результат</h4>
        <p>Вместо поверхностного «нужно работать быстрее» вы получаете конкретное решение — «внедрить систему учета загрузки и оптимизировать графики».</p>
      </div>
      
      <!-- Вкладка: Цитаты реальных клиентов -->
      <div v-show="activeTab === 'quotes'" class="tab-content">
        <h3>Цитаты реальных клиентов</h3>
        <p>Это готовый материал для:</p>
        <ul>
          <li><strong>Рекламы</strong> — используйте положительные цитаты в соцсетях и на сайте.</li>
          <li><strong>Обучения персонала</strong> — покажите сотрудникам, что конкретно ценят клиенты.</li>
          <li><strong>Исправления проблем</strong> — негативные цитаты точно указывают, что исправить.</li>
        </ul>
      </div>

      <!-- Вкладка: Следующий шаг -->
      <div v-show="activeTab === 'next-steps'" class="tab-content">
          <h3>Три безупречных действия для роста выручки за 30 дней</h3>
          
          <div class="step-block">
            <h4>Действие 1: Найдите свою «суперсилу» (15 минут)</h4>
            <p>Посмотрите на Индекс и найдите критерий, где у вас максимальная оценка, а у конкурентов меньше. Это ваше уникальное преимущество. Завтра же начните рассказывать о нем всем клиентам.</p>
          </div>

          <div class="step-block">
            <h4>Действие 2: Устраните ключевой баг в системе (1 неделя)</h4>
            <p>Найдите критерий с самой низкой оценкой — это то, из-за чего вы теряете клиентов прямо сейчас. Примените метод «5 почему» и устраните корневую причину.</p>
          </div>

          <div class="step-block">
            <h4>Действие 3: Скопируйте лучшую практику (1 месяц)</h4>
            <p>Посмотрите, какой конкурент лидирует по критерию, важному для ваших гостей. <a href="/radar/signal/coffee-points-smr-2025/dashboard" target="_blank" rel="noopener noreferrer">Откройте Симулятор Самары</a>, изучите что говорят гости о нем и о вас, попросите Анну создать план быстрых изменений.</p>
          </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Сброс стилей для VitePress */
.how-it-works-widget :deep(h2),
.how-it-works-widget :deep(h3),
.how-it-works-widget :deep(h4),
.how-it-works-widget :deep(p),
.how-it-works-widget :deep(ul),
.how-it-works-widget :deep(li) {
  margin: 0;
  padding: 0;
  border: none;
}

/* Основной контейнер */
.how-it-works-widget {
  width: 100%;
  max-width: 100%;
  margin: 48px 0;
  background-color: #2a2a2a;
  color: #e0e0e0;
  padding: 48px;
  border-radius: 32px;
  box-sizing: border-box;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}

/* Header */
.widget-header {
  text-align: center;
  margin-bottom: 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.widget-title {
  font-size: 32px !important;
  font-weight: 700 !important;
  color: #ffffff !important;
  line-height: 1.2 !important;
}

.widget-subtitle {
  font-size: 18px !important;
  color: rgba(255, 255, 255, 0.6) !important;
  line-height: 1.5 !important;
  max-width: 600px;
}

/* Табы */
.tabs-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 24px;
  justify-content: center;
}

.tab-button {
  appearance: none;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.05);
  color: rgba(255, 255, 255, 0.7);
  padding: 10px 18px;
  border-radius: 14px;
  font-weight: 500;
  font-size: 14px;
  line-height: 1.4;
  cursor: pointer;
  transition: all 0.3s ease;
}

.tab-button:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  transform: translateY(-1px);
}

.tab-button.active {
  color: #fff;
  background: rgba(142, 124, 195, 0.2); /* Фиолетовый фон */
  border-color: #8E7CC3; /* Фиолетовая обводка */
  box-shadow: 0 0 12px rgba(142, 124, 195, 0.25);
}

/* Панель контента */
.content-panel {
  background: #1f1f1f;
  border-radius: 24px;
  padding: 32px;
  position: relative;
  border: none;
  /* Мягкая внутренняя граница через inset shadow */
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.05); 
}

/* Эффект "свечения" сверху панели */
.content-panel::before {
  content: '';
  position: absolute;
  top: 0;
  left: 24px;
  right: 24px;
  height: 1px;
  background: linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.15) 50%, transparent 100%);
}

.tab-content h3 {
  font-size: 20px;
  font-weight: 700;
  color: #fff;
  margin-bottom: 16px !important;
  letter-spacing: -0.01em;
}

.tab-content h4 {
  font-size: 13px;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.5);
  letter-spacing: 0.05em;
  margin: 24px 0 12px !important;
  font-weight: 600;
}

.tab-content p {
  font-size: 16px;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 16px !important;
}

.tab-content p:last-child {
  margin-bottom: 0 !important;
}

.tab-content strong {
  color: #fff;
  font-weight: 600;
}

/* Списки */
.tab-content ul {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px !important;
}

.tab-content li {
  position: relative;
  padding-left: 20px;
  font-size: 16px;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.8);
}

.tab-content li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 10px; /* По центру первой строки */
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: #C1B5F0; /* Фиолетовый маркер */
  box-shadow: 0 0 6px rgba(193, 181, 240, 0.4);
}

/* Ссылки */
.tab-content a {
  color: #C1B5F0;
  text-decoration: none;
  border-bottom: 1px dashed rgba(193, 181, 240, 0.5);
  transition: all 0.2s ease;
  padding-bottom: 1px;
}

.tab-content a:hover {
  color: #fff;
  border-color: #fff;
}

/* Блоки шагов (для последней вкладки) */
.step-block {
  margin-bottom: 24px;
  padding-bottom: 24px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.step-block:last-child {
  margin-bottom: 0;
  padding-bottom: 0;
  border-bottom: none;
}

.step-block h4 {
  margin-top: 0 !important;
}

/* Мобильная адаптация */
@media (max-width: 768px) {
  .how-it-works-widget {
    padding: 40px 20px;
    border-radius: 24px;
  }
  
  .widget-title {
    font-size: 26px !important;
  }
  
  .widget-subtitle {
    font-size: 16px !important;
  }
  
  .tabs-container {
    justify-content: flex-start;
    overflow-x: auto;
    padding-bottom: 8px;
    flex-wrap: nowrap;
    margin-right: -20px; /* Компенсация паддинга контейнера */
    padding-right: 20px;
    -webkit-overflow-scrolling: touch;
  }
  
  .tab-button {
    white-space: nowrap;
    flex-shrink: 0;
  }
  
  .content-panel {
    padding: 24px;
    border-radius: 20px;
  }
  
  .tab-content h3 {
    font-size: 18px;
  }
  
  .tab-content p, 
  .tab-content li {
    font-size: 15px;
  }
}
</style>
