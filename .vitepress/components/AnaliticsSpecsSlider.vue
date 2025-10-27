<template>
  <div class="ass-slider-wrapper">
    <div class="ass-brands-container" ref="sliderContainer">
      <!-- СЛАЙД 1 -->
      <div class="ass-brand-card ass-step-card">
        <div class="ass-card-background-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="M6 8h.01"/><path d="M10 8h.01"/><path d="M14 8h.01"/></svg>
        </div>
        <h3 class="ass-title">Глубокая аналитика качества обслуживания</h3>
        <p class="ass-description-main">Аналитика Сигнала превращает каждый тикет в данные для управления скоростью, точностью и удовлетворённостью клиентов. Система автоматически фиксирует каждый шаг: от получения обращения до оценки опыта, показывая скорость реакции команды, дисциплину сроков, типы обращений и удовлетворённость результатом.</p>
        <p class="ass-description-secondary"><span class="ass-control-label">Ваш контроль:</span> <span class="ass-control-highlight">Реальные данные для управления качеством, а не ощущения. Честная картина того, как работает команда, где узкие места и что улучшать.</span></p>
        <p class="ass-description-goals ass-step-goals">Прозрачность процессов и контроль качества на основе фактов.</p>
      </div>

      <!-- СЛАЙД 2 -->
      <div class="ass-brand-card ass-step-card">
        <div class="ass-card-background-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="M6 8h.01"/><path d="M10 8h.01"/><path d="M14 8h.01"/></svg>
        </div>
        <h3 class="ass-title">Ключевые метрики и нормативы</h3>
        <p class="ass-description-main">Время «обращение → тикет» (норматив ≤ 15 минут), время «тикет → ответ команды» (по категории А–Г), доля просрочек ответа (≤ 5%), доля реальных изменений vs компенсаций (≥ 60% системных), средняя оценка опыта (≥ 8 из 10) и доля повторных обращений (≤ 3%).</p>
        <p class="ass-description-secondary"><span class="ass-control-label">Ваш контроль:</span> <span class="ass-control-highlight">Понятные ориентиры для команды, видно, где держится норматив, а где требуется коррекция процесса.</span></p>
        <p class="ass-description-goals ass-step-goals">Нормативы делают качество измеримым, а не субъективным.</p>
      </div>

      <!-- СЛАЙД 3 -->
      <div class="ass-brand-card ass-step-card">
        <div class="ass-card-background-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="M6 8h.01"/><path d="M10 8h.01"/><path d="M14 8h.01"/></svg>
        </div>
        <h3 class="ass-title">Ежедневная аналитика</h3>
        <p class="ass-description-main">Утренний обзор тикетов, контроль окна 15 минут, просмотр эмоциональной окраски, проверка дедлайнов на сегодня и финальный обзор вечером. Это помогает держать команду в тонусе, распределять приоритеты дня и не пропускать критичные отклонения.</p>
        <p class="ass-description-secondary"><span class="ass-control-label">Ваш контроль:</span> <span class="ass-control-highlight">Быстрая реакция на текущие проблемы без задержек, команда видит приоритеты и не теряет фокус.</span></p>
        <p class="ass-description-goals ass-step-goals">Каждый день начинается с ясной картины, заканчивается зафиксированными итогами.</p>
      </div>

      <!-- СЛАЙД 4 -->
      <div class="ass-brand-card ass-step-card">
        <div class="ass-card-background-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="M6 8h.01"/><path d="M10 8h.01"/><path d="M14 8h.01"/></svg>
        </div>
        <h3 class="ass-title">Еженедельная аналитика</h3>
        <p class="ass-description-main">Обзор среднего времени реакции, анализ превышений 15 минут, распределение по категориям А–Г, соотношение компенсируемых и системных решений, обзор оценок опыта и план улучшений на следующую неделю. Выявляются тренды за короткий горизонт.</p>
        <p class="ass-description-secondary"><span class="ass-control-label">Ваш контроль:</span> <span class="ass-control-highlight">Непрерывное улучшение без застоя, паттерны становятся видны, а одна измеримая цель на неделю фокусирует усилия.</span></p>
        <p class="ass-description-goals ass-step-goals">Короткие циклы обратной связи ускоряют рост качества.</p>
      </div>

      <!-- СЛАЙД 5 -->
      <div class="ass-brand-card ass-step-card">
        <div class="ass-card-background-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="M6 8h.01"/><path d="M10 8h.01"/><path d="M14 8h.01"/></svg>
        </div>
        <h3 class="ass-title">Ежемесячная аналитика</h3>
        <p class="ass-description-main">Динамика скорости за 3 месяца, топ‑5 повторяющихся проблем, эффективность компенсаций, анализ повторных обращений, удовлетворённость по категориям, нагрузка на команду, аудит качества диалогов Анны и стратегические улучшения на следующий квартал.</p>
        <p class="ass-description-secondary"><span class="ass-control-label">Ваш контроль:</span> <span class="ass-control-highlight">Стратегический взгляд: куда движется качество, где системные сбои и что автоматизировать. Рост масштаба без хаоса.</span></p>
        <p class="ass-description-goals ass-step-goals">Месяц данных превращается в решение: автоматизация, новый протокол, изменение нормативов.</p>
      </div>

      <!-- СЛАЙД 6 -->
      <div class="ass-brand-card ass-step-card">
        <div class="ass-card-background-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="M6 8h.01"/><path d="M10 8h.01"/><path d="M14 8h.01"/></svg>
        </div>
        <h3 class="ass-title">Синхронизация с Анной и тикет‑системой</h3>
        <p class="ass-description-main">Тикет‑система автоматически собирает временные метки каждого шага, Анна фиксирует эмоциональную окраску и тип обращения, а аналитика превращает эти данные в отчёты без ручного ввода. Единый поток данных от получения обращения до оценки опыта.</p>
        <p class="ass-description-secondary"><span class="ass-control-label">Ваш контроль:</span> <span class="ass-control-highlight">Не нужно вручную сводить отчёты из разных систем. Полная прозрачность пути клиента от обращения до результата.</span></p>
        <p class="ass-description-goals ass-step-goals">Автоматический сбор, нет искажений, честная картина скорости.</p>
      </div>

      <!-- СЛАЙД 7 -->
      <div class="ass-brand-card ass-step-card">
        <div class="ass-card-background-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="M6 8h.01"/><path d="M10 8h.01"/><path d="M14 8h.01"/></svg>
        </div>
        <h3 class="ass-title">Отчёты по запросу</h3>
        <p class="ass-description-main">Детализированные отчёты для глубокого анализа конкретных периодов, тем или ситуаций. Регулярность подготовки сводных отчётов — раз в 2 недели с динамикой метрик, предложениями по улучшению процессов и выводами о тренде качества работы.</p>
        <p class="ass-description-secondary"><span class="ass-control-label">Ваш контроль:</span> <span class="ass-control-highlight">Гибкий доступ к данным: сегодня, эта неделя, этот месяц, команда. Понятные сводки для планирования и балансировки нагрузки.</span></p>
        <p class="ass-description-goals ass-step-goals">Видите нужное «здесь и сейчас», принимаете решения на основе фактов.</p>
      </div>

      <!-- СЛАЙД 8 -->
      <div class="ass-brand-card ass-step-card">
        <div class="ass-card-background-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="M6 8h.01"/><path d="M10 8h.01"/><path d="M14 8h.01"/></svg>
        </div>
        <h3 class="ass-title">Глубокий разбор при отклонениях</h3>
        <p class="ass-description-main">При резком увеличении просрочек, повторяющихся жалобах на одну тему или аномально долгом времени ответа проводится детальный разбор каждого проблемного тикета с полной историей. Даются конкретные рекомендации: добавить вторую смену, настроить дублирующие уведомления, изменить процесс обработки.</p>
        <p class="ass-description-secondary"><span class="ass-control-label">Ваш контроль:</span> <span class="ass-control-highlight">Не поиск виноватого, а улучшение процесса на всех уровнях: система, оператор, команда. Непрерывное улучшение без повторения ошибок.</span></p>
        <p class="ass-description-goals ass-step-goals">Отклонения становятся источником роста, а не поводом для паники.</p>
      </div>

      <!-- СЛАЙД 9 -->
      <div class="ass-brand-card ass-step-card">
        <div class="ass-card-background-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="M6 8h.01"/><path d="M10 8h.01"/><path d="M14 8h.01"/></svg>
        </div>
        <h3 class="ass-title">Типология обращений и повторяющиеся проблемы</h3>
        <p class="ass-description-main">Распределение по категориям А–Г и темам показывает, какие проблемы приходят чаще всего. Если много категории Б по одной теме — время системного исправления, чтобы вкладывать ресурсы туда, где максимальная отдача.</p>
        <p class="ass-description-secondary"><span class="ass-control-label">Ваш контроль:</span> <span class="ass-control-highlight">Находите паттерны и запускаете системные улучшения: обучение команды, изменения в операциях, коммуникация с клиентами.</span></p>
        <p class="ass-description-goals ass-step-goals">Видите не отдельные жалобы, а системные причины.</p>
      </div>

      <!-- СЛАЙД 10 -->
      <div class="ass-brand-card ass-step-card">
        <div class="ass-card-background-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="M6 8h.01"/><path d="M10 8h.01"/><path d="M14 8h.01"/></svg>
        </div>
        <h3 class="ass-title">Соотношение решений: системные изменения vs компенсации</h3>
        <p class="ass-description-main">Доля тикетов, решённых реальными изменениями, компенсацией или альтернативой, показывает, устраняете ли вы причины или «покупаете лояльность» сертификатами. Норматив — ≥ 60% системных решений.</p>
        <p class="ass-description-secondary"><span class="ass-control-label">Ваш контроль:</span> <span class="ass-control-highlight">Оценка эффективности компенсаций, снижение количества повторных обращений и укрепление лояльности через реальные улучшения.</span></p>
        <p class="ass-description-goals ass-step-goals">Решаете проблемы навсегда, а не откладываете на потом.</p>
      </div>

      <!-- СЛАЙД 11 -->
      <div class="ass-brand-card ass-step-card">
        <div class="ass-card-background-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="M6 8h.01"/><path d="M10 8h.01"/><path d="M14 8h.01"/></svg>
        </div>
        <h3 class="ass-title">Удовлетворённость клиентов и повторные обращения</h3>
        <p class="ass-description-main">Средний NPS и корреляция с типами решений показывают, довольны ли клиенты результатом, а не только фактом ответа. Доля повторных обращений (≤ 3%) оценивает качество решения: если высокая — решения не устраняют корень.</p>
        <p class="ass-description-secondary"><span class="ass-control-label">Ваш контроль:</span> <span class="ass-control-highlight">Управление репутацией, предотвращение негативных отзывов и контроль качества закрытия тикетов.</span></p>
        <p class="ass-description-goals ass-step-goals">Клиенты оценивают результат, вы видите, где недоволен даже после ответа.</p>
      </div>

      <!-- СЛАЙД 12 -->
      <div class="ass-brand-card ass-step-card">
        <div class="ass-card-background-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="M6 8h.01"/><path d="M10 8h.01"/><path d="M14 8h.01"/></svg>
        </div>
        <h3 class="ass-title">Контроль окна 15 минут и дисциплина дедлайнов</h3>
        <p class="ass-description-main">Показатель баланса качества и скорости сбора фактов: доля превышений окна ≤ 10%. Доля соблюдения сроков ответа по категориям контролирует дисциплину команды и прозрачность выполнения обещаний.</p>
        <p class="ass-description-secondary"><span class="ass-control-label">Ваш контроль:</span> <span class="ass-control-highlight">Быстрее запуск работ без потери полноты информации, честные ожидания клиентов и предсказуемость реакции.</span></p>
        <p class="ass-description-goals ass-step-goals">Команда держит баланс скорости и качества, клиент получает честные сроки.</p>
      </div>
    </div>
    <!-- Кнопки навигации внизу справа -->
    <div class="ass-nav-buttons">
      <button class="ass-nav-btn ass-nav-prev" @click="scrollPrev" aria-label="Предыдущий слайд">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
      </button>
      <button class="ass-nav-btn ass-nav-next" @click="scrollNext" aria-label="Следующий слайд">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const sliderContainer = ref(null)

const scrollNext = () => {
  if (sliderContainer.value) {
    sliderContainer.value.scrollBy({ left: 336, behavior: 'smooth' })
  }
}

const scrollPrev = () => {
  if (sliderContainer.value) {
    sliderContainer.value.scrollBy({ left: -336, behavior: 'smooth' })
  }
}
</script>

<style scoped>
.ass-slider-wrapper {
  position: relative !important;
  margin: 24px 0 !important;
}

.ass-brands-container {
  display: flex !important;
  overflow-x: auto !important;
  gap: 16px !important;
  padding: 4px 0 12px 4px !important;
  scroll-behavior: smooth !important;
  scrollbar-width: none !important;
  -ms-overflow-style: none !important;
  margin-bottom: 16px !important;
}

.ass-brands-container::-webkit-scrollbar {
  display: none !important;
}

.ass-brand-card {
  flex: 0 0 320px !important;
  border-radius: 12px !important;
  padding: 48px 24px !important;
  display: flex !important;
  flex-direction: column !important;
  gap: 16px !important;
  border-style: solid !important;
  border-width: 1px !important;
  border-top-width: 4px !important;
  position: relative !important;
  min-height: 360px !important;
  overflow: hidden !important;
  transition: border-top-color 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important;
}

.ass-step-card {
  background-color: #39434d !important;
  border-color: #57677a !important;
  border-top-color: rgba(117, 205, 255, 0.3) !important;
}

.ass-step-card:hover {
  border-top-color: #75CDFF !important;
}

.ass-card-background-icon {
  position: absolute !important;
  bottom: -90px !important;
  right: -90px !important;
  width: 300px !important;
  height: 300px !important;
  opacity: 0.04 !important;
  pointer-events: none !important;
  z-index: 0 !important;
}

.ass-card-background-icon svg {
  width: 100% !important;
  height: 100% !important;
  stroke: currentColor !important;
}

.ass-step-card .ass-card-background-icon {
  color: #ffffff !important;
}

:root.dark .ass-step-card {
  background-color: #26313a !important;
  border-color: #39434d !important;
  border-top-color: rgba(117, 205, 255, 0.3) !important;
}

:root.dark .ass-step-card:hover {
  border-top-color: #75CDFF !important;
}

:root.dark .ass-step-card .ass-card-background-icon {
  color: #cccccc !important;
  opacity: 0.03 !important;
}

.ass-title {
  font-size: 16px !important;
  line-height: 1.4 !important;
  margin: 0 !important;
  font-weight: 700 !important;
  border: none !important;
  padding: 0 !important;
  color: #ffffff !important;
  position: relative !important;
  z-index: 1 !important;
}

:root.dark .ass-title {
  color: #ffffff !important;
}

.ass-description-main {
  color: #e0e0e0 !important;
  font-size: 16px !important;
  font-weight: 400 !important;
  line-height: 1.65 !important;
  margin: 0 !important;
  position: relative !important;
  z-index: 1 !important;
}

:root.dark .ass-description-main {
  color: #d0d0d0 !important;
}

.ass-description-secondary {
  color: #b0b0b0 !important;
  font-size: 13px !important;
  line-height: 1.6 !important;
  margin: 0 !important;
  flex-grow: 1 !important;
  position: relative !important;
  z-index: 1 !important;
}

:root.dark .ass-description-secondary {
  color: #a0a0a0 !important;
}

.ass-control-label {
  color: #ffffff !important;
  font-weight: 700 !important;
}

:root.dark .ass-control-label {
  color: #ffffff !important;
}

.ass-control-highlight {
  background: linear-gradient(to right, #75CDFF 0%, #75CDFF 50%, rgba(117, 205, 255, 0.1) 50%) !important;
  background-size: 200% 100% !important;
  background-position: 100% 0 !important;
  background-color: rgba(117, 205, 255, 0.1) !important;
  color: #ffffff !important;
  padding: 1px 5px !important;
  margin: 0 !important;
  border-radius: 1px !important;
  transition: background-position 0.6s cubic-bezier(0.4, 0, 0.2, 1), color 0.3s ease !important;
  position: relative !important;
  display: inline !important;
  z-index: 1 !important;
  box-decoration-break: clone !important;
  -webkit-box-decoration-break: clone !important;
  line-height: 1.5 !important;
  vertical-align: baseline !important;
}

.ass-step-card:hover .ass-control-highlight {
  background-position: 0 0 !important;
  color: #23272c !important;
}

:root.dark .ass-control-highlight {
  background-color: rgba(117, 205, 255, 0.15) !important;
  color: #ffffff !important;
}

:root.dark .ass-step-card:hover .ass-control-highlight {
  background-position: 0 0 !important;
  color: #23272c !important;
}

.ass-step-goals {
  color: #75CDFF !important;
  font-size: 14px !important;
  font-weight: 500 !important;
  line-height: 1.65 !important;
  margin: 0 !important;
  position: relative !important;
  z-index: 1 !important;
}

:root.dark .ass-step-goals {
  color: #75CDFF !important;
}

.ass-nav-buttons {
  display: flex !important;
  gap: 8px !important;
  justify-content: flex-end !important;
  margin-right: 0 !important;
  padding-right: 4px !important;
}

.ass-nav-btn {
  width: 40px !important;
  height: 40px !important;
  border-radius: 50% !important;
  border: none !important;
  cursor: pointer !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  transition: all 0.3s ease !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15) !important;
}

.ass-nav-prev {
  background-color: #e8e8e8 !important;
  color: #39434d !important;
}

.ass-nav-prev:hover {
  background-color: #d0d0d0 !important;
  transform: scale(1.05) !important;
}

.ass-nav-next {
  background-color: #ffffff !important;
  color: #26313a !important;
}

.ass-nav-next:hover {
  background-color: #f5f5f5 !important;
  transform: scale(1.05) !important;
}

:root.dark .ass-nav-prev {
  background-color: #26313a !important;
  color: #e0e0e0 !important;
}

:root.dark .ass-nav-prev:hover {
  background-color: #39434d !important;
}

:root.dark .ass-nav-next {
  background-color: #ffffff !important;
  color: #26313a !important;
}

:root.dark .ass-nav-next:hover {
  background-color: #f0f0f0 !important;
}
</style>
