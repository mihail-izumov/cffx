<template>
<div class="signal-product-tabs">
<!-- Блок с кнопками для переключения вкладок -->
<div class="signal-product-tabs__nav">
  <button :class="{ active: activeTab === 'interception' }" @click="activeTab = 'interception'">
    😡 Перехват
  </button>
  <button :class="{ active: activeTab === 'widget' }" @click="activeTab = 'widget'">
    🖼️ Виджет
  </button>
  <button :class="{ active: activeTab === 'form' }" @click="activeTab = 'form'">
    📝 Форма
  </button>
  <button :class="{ active: activeTab === 'stats' }" @click="activeTab = 'stats'">
    📊 Статистика
  </button>
  <button :class="{ active: activeTab === 'base_analytics' }" @click="activeTab = 'base_analytics'">
    💡 Аналитика (базовая)
  </button>
  <button :class="{ active: activeTab === 'adv_analytics' }" @click="activeTab = 'adv_analytics'">
    🔮 Аналитика (расширенная)
  </button>
</div>

<!-- Контент для вкладок -->
<div class="signal-product-tabs__content">
  <!-- Вкладка: Перехват негатива -->
  <div v-show="activeTab === 'interception'" class="signal-product-tabs__panel">
    <h3>Управление оттоком клиентов в реальном времени</h3>
    <div class="signal-product-tabs__grid">
      <div class="signal-product-tabs__card">
        <div class="signal-product-tabs__card-header"><h4>Диалоги с Анной</h4><span class="signal-product-tabs__badge">ИИ-ассистент</span></div>
        <p class="signal-product-tabs__card-description">Персональный ИИ-ассистент снимает первичный негатив, определяет реальную причину недовольства и переводит расплывчатые жалобы в конкретные задачи.</p>
        <div class="signal-product-tabs__card-highlight"><strong>Процесс:</strong> Деэскалация → Трансформация в задачу</div>
      </div>
      <div class="signal-product-tabs__card">
        <div class="signal-product-tabs__card-header"><h4>Умная форма</h4><span class="signal-product-tabs__badge">Без регистрации</span></div>
        <p class="signal-product-tabs__card-description">Трансформация эмоций в конструктивные предложения за 30 секунд. Структурированные подсказки помогают сформулировать проблему.</p>
        <div class="signal-product-tabs__card-highlight"><strong>Результат:</strong> Эмоции → Конструктив</div>
      </div>
      <div class="signal-product-tabs__card">
        <div class="signal-product-tabs__card-header"><h4>Гарантия результата</h4><span class="signal-product-tabs__badge">Цикл «3ч → 24ч»</span></div>
        <p class="signal-product-tabs__card-description">Уточнение деталей за 3 часа, решение проблемы за 24 часа. Сигнал не теряется, мгновенно уходит в работу, ответ обязателен.</p>
        <div class="signal-product-tabs__card-highlight"><strong>Влияние:</strong> Улучшение опыта → Рост Индекса</div>
      </div>
      <div class="signal-product-tabs__card">
        <div class="signal-product-tabs__card-header"><h4>Система мониторинга 24/7</h4><span class="signal-product-tabs__badge">Поддержка 24/7</span></div>
        <p class="signal-product-tabs__card-description">Круглосуточная поддержка без выходных. Персональные диалоги ведутся по SLA: ИИ-ассистент Анна + живой аналитик Сигнала.</p>
        <div class="signal-product-tabs__card-highlight"><strong>Команда:</strong> ИИ-ассистент + Аналитик</div>
      </div>
    </div>
  </div>

  <!-- Вкладка: Виджет -->
  <div v-show="activeTab === 'widget'" class="signal-product-tabs__panel">
    <h3>Адаптивный виджет для сбора обратной связи</h3>
    <div class="signal-product-tabs__grid">
      <div class="signal-product-tabs__card">
        <div class="signal-product-tabs__card-header"><h4>Базовый</h4><span class="signal-product-tabs__badge">Готовое решение</span></div>
        <p class="signal-product-tabs__card-description">Готовый виджет с 3 карточками метрик (кофейни, Индекс Роста, отзывы) и отображением реального времени ответа на обращения.</p>
        <div class="signal-product-tabs__card-highlight"><strong>Интеграция:</strong> 2ГИС/Яндекс в 2 клика</div>
      </div>
      <div class="signal-product-tabs__card">
        <div class="signal-product-tabs__card-header"><h4>Конструктор</h4><span class="signal-product-tabs__badge">Полная кастомизация</span></div>
        <p class="signal-product-tabs__card-description">Персонализация виджета под ваш бренд и KPI: настройка локаций, изменение карточек метрик и редактирование текста подсказок.</p>
        <div class="signal-product-tabs__card-highlight"><strong>Настройки:</strong> Локация • Карточки • Бейдж</div>
      </div>
    </div>
  </div>
  
  <!-- Вкладка: Форма -->
  <div v-show="activeTab === 'form'" class="signal-product-tabs__panel">
    <h3>Настраиваемая форма для получения нужных данных</h3>
    <div class="signal-product-tabs__grid">
      <div class="signal-product-tabs__card">
        <div class="signal-product-tabs__card-header"><h4>Базовая</h4><span class="signal-product-tabs__badge">Стандартная структура</span></div>
        <p class="signal-product-tabs__card-description">Стандартная форма с готовыми полями «Эмоции», «Детали проблемы», «Предложения» и предустановленными вариантами вопросов.</p>
        <div class="signal-product-tabs__card-highlight"><strong>Поля:</strong> Эмоции • Детали • Предложения</div>
      </div>
      <div class="signal-product-tabs__card">
        <div class="signal-product-tabs__card-header"><h4>Конструктор</h4><span class="signal-product-tabs__badge">Под задачи бизнеса</span></div>
        <p class="signal-product-tabs__card-description">Добавляйте новые поля (номер заказа, имя сотрудника), редактируйте вопросы для проверки гипотез и создавайте свои подсказки.</p>
        <div class="signal-product-tabs__card-highlight"><strong>Настройки:</strong> Поля • Вопросы • Подсказки</div>
      </div>
    </div>
  </div>

  <!-- Вкладка: Статистика -->
  <div v-show="activeTab === 'stats'" class="signal-product-tabs__panel">
    <h3>Ежемесячный отчет, который показывает пульс вашего бизнеса</h3>
    <div class="signal-product-tabs__grid">
      <div class="signal-product-tabs__card">
        <div class="signal-product-tabs__card-header"><h4>NPS</h4><span class="signal-product-tabs__badge">Индекс лояльности</span></div>
        <p class="signal-product-tabs__card-description">Единый показатель здоровья отношений с клиентами. Включает график динамики и структуру (Промоутеры, Нейтралы, Критики).</p>
        <div class="signal-product-tabs__card-highlight"><strong>Структура:</strong> Промоутеры • Нейтралы • Критики</div>
      </div>
      <div class="signal-product-tabs__card">
        <div class="signal-product-tabs__card-header"><h4>Рейтинги</h4><span class="signal-product-tabs__badge">ТОП-5</span></div>
        <p class="signal-product-tabs__card-description">Список из ТОП-5 болевых точек вашего сервиса (из негативных отзывов) и ТОП-5 сильных сторон (из позитивных).</p>
        <div class="signal-product-tabs__card-highlight"><strong>Фокус:</strong> Сильные и слабые стороны</div>
      </div>
      <div class="signal-product-tabs__card">
        <div class="signal-product-tabs__card-header"><h4>Рекомендации</h4><span class="signal-product-tabs__badge">Тактические улучшения</span></div>
        <p class="signal-product-tabs__card-description">Общие тактические рекомендации, основанные на самых частотных проблемах и предложениях месяца, для быстрого улучшения сервиса.</p>
        <div class="signal-product-tabs__card-highlight"><strong>Основа:</strong> Данные обратной связи</div>
      </div>
    </div>
  </div>
  
  <!-- Вкладка: Аналитика (базовая) -->
  <div v-show="activeTab === 'base_analytics'" class="signal-product-tabs__panel">
    <h3>От знания «что происходит» к пониманию реальных причин</h3>
    <p class="signal-product-tabs__subtitle"><em>Включает все функции Статистики, плюс:</em></p>
    <div class="signal-product-tabs__grid">
      <div class="signal-product-tabs__card">
        <div class="signal-product-tabs__card-header"><h4>Финансовая цена лояльности</h4><span class="signal-product-tabs__badge">Анализ NPS</span></div>
        <p class="signal-product-tabs__card-description">Расчет среднего чека для Критиков, Нейтралов и Промоутеров, чтобы видеть, сколько денег вы теряете на недовольстве.</p>
        <div class="signal-product-tabs__card-highlight"><strong>Метрика:</strong> ₽ среднего чека по группам NPS</div>
      </div>
      <div class="signal-product-tabs__card">
        <div class="signal-product-tabs__card-header"><h4>Глубинный анализ проблем</h4><span class="signal-product-tabs__badge">Анализ Рейтингов</span></div>
        <p class="signal-product-tabs__card-description">Анализ того, как конкретная проблема (например, "работа персонала") влияет на итоговый показатель NPS и эмоциональный фон.</p>
        <div class="signal-product-tabs__card-highlight"><strong>Связь:</strong> Проблема → Влияние на NPS</div>
      </div>
      <div class="signal-product-tabs__card">
        <div class="signal-product-tabs__card-header"><h4>Персонализация</h4><span class="signal-product-tabs__badge">1 фокус-тема в месяц</span></div>
        <p class="signal-product-tabs__card-description">Вы выбираете одну бизнес-задачу (например, «анализ запуска нового продукта»), и наш аналитик готовит по ней углубленный срез.</p>
        <div class="signal-product-tabs__card-highlight"><strong>Результат:</strong> Углубленный срез по вашей задаче</div>
      </div>
    </div>
  </div>

  <!-- Вкладка: Аналитика (расширенная) -->
  <div v-show="activeTab === 'adv_analytics'" class="signal-product-tabs__panel">
    <h3>От реакции на прошлое к управлению будущим</h3>
    <p class="signal-product-tabs__subtitle"><em>Включает все функции Статистики и базовой Аналитики, плюс:</em></p>
    <div class="signal-product-tabs__grid">
      <div class="signal-product-tabs__card">
        <div class="signal-product-tabs__card-header"><h4>Предиктивная аналитика оттока</h4><span class="signal-product-tabs__badge">Прогноз</span></div>
        <p class="signal-product-tabs__card-description">Идентификация «скрытых критиков», которые ставят нейтральные оценки, но готовы уйти. Прогноз потерь в % и деньгах на 30-60 дней.</p>
        <div class="signal-product-tabs__card-highlight"><strong>Результат:</strong> Прогноз % оттока • Прогноз потерь в ₽</div>
      </div>
      <div class="signal-product-tabs__card">
        <div class="signal-product-tabs__card-header"><h4>RFM-сегменты и портреты</h4><span class="signal-product-tabs__badge">Аудитория</span></div>
        <p class="signal-product-tabs__card-description">Разделение базы на сегменты по их ценности (VIP, Ценные, Новички) с расчетом NPS и прогноза оттока для каждого.</p>
        <div class="signal-product-tabs__card-highlight"><strong>Сегменты:</strong> VIP • Ценные • Новички</div>
      </div>
      <div class="signal-product-tabs__card">
        <div class="signal-product-tabs__card-header"><h4>Моделирование «Что, если?»</h4><span class="signal-product-tabs__badge">Стратегия</span></div>
        <p class="signal-product-tabs__card-description">Получите от аналитика прогнозный сценарий на ваш вопрос. Например: «Как изменится отток VIP-сегмента, если мы решим проблему X?»</p>
        <div class="signal-product-tabs__card-highlight"><strong>Возможность:</strong> Персональный прогноз</div>
      </div>
    </div>
  </div>
</div>
</div>
</template>

<script setup>
import { ref } from 'vue'
const activeTab = ref('interception')
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
  padding: 8px 14px;
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
  margin-bottom: 0.5rem;
  color: var(--vp-c-text-1);
  font-weight: 600;
}
.signal-product-tabs__subtitle {
  font-size: 0.95rem;
  color: var(--vp-c-text-3);
  margin: 0.5rem 0 1.5rem 0;
  font-weight: 500;
}

/* Grid and cards */
.signal-product-tabs__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1rem;
}
.signal-product-tabs__card {
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 1.25rem;
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
  margin-bottom: 0.75rem;
}
.signal-product-tabs__card-header h4 {
  margin: 0 0 0.5rem 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  line-height: 1.3;
}

/* Badge styling */
.signal-product-tabs__badge {
  display: inline-block;
  background-color: #4ade80;
  color: #000;
  padding: 3px 10px;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 600;
  line-height: 1.4;
}

.signal-product-tabs__card-description {
  color: var(--vp-c-text-2);
  line-height: 1.6;
  font-size: 0.9rem;
  flex-grow: 1;
  margin-bottom: 1rem;
}
.signal-product-tabs__card-highlight {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 0.75rem;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  margin-top: auto;
}
.signal-product-tabs__card-highlight strong {
  color: var(--vp-c-text-1);
  font-weight: 600;
}
</style>
