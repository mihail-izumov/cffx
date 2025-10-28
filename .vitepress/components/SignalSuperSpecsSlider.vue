<template>
  <div class="sss-slider-wrapper">
    <div class="sss-brands-container" ref="sliderContainer">
      <a
        v-for="(slide, idx) in slides"
        :key="idx"
        class="sss-brand-card sss-step-card"
        :class="{active: activeSlide === idx}"
        @mouseover="activeSlide = idx"
        @mouseleave="activeSlide = null"
        :href="'/pro1'"
        tabindex="0"
        role="link"
      >
        <div class="sss-card-background-icon">
          <template v-if="idx === 0">
            <svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M14 4.1 12 6"/><path d="m5.1 8-2.9-.8"/><path d="m6 12-1.9 2"/><path d="M7.2 2.2 8 5.1"/><path d="M9.037 9.69a.498.498 0 0 1 .653-.653l11 4.5a.5.5 0 0 1-.074.949l-4.349 1.041a1 1 0 0 0-.74.739l-1.04 4.35a.5.5 0 0 1-.95.074z"/>
            </svg>
          </template>
          <template v-else-if="idx === 1">
            <svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect width="18" height="14" x="3" y="5" rx="2" ry="2"/><path d="M7 15h4"/><path d="M15 15h2"/><path d="M7 11h2"/><path d="M13 11h4"/>
            </svg>
          </template>
          <template v-else-if="idx === 2">
            <svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z"/><path d="M7 11h10"/><path d="M7 15h6"/><path d="M7 7h8"/>
            </svg>
          </template>
          <template v-else-if="idx === 3">
            <svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M3 11h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5Zm0 0a9 9 0 1 1 18 0m0 0v5a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3Z"/><path d="M21 16v2a4 4 0 0 1-4 4h-5"/>
            </svg>
          </template>
          <template v-else-if="idx === 4">
            <svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"/><path d="M20 2v4"/><path d="M22 4h-4"/>ircle cx="4" cy="20" r r="2"/>
            </svg>
          </template>
          <template v-else-if="idx === 5">
            <svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M10 5H3"/><path d="M12 19H3"/><path d="M14 3v4"/><path d="M16 17v4"/><path d="M21 12h-9"/><path d="M21 19h-5"/><path d="M21 5h-7"/><path d="M8 10v4"/><path d="M8 12H3"/>
            </svg>
          </template>
          <template v-else-if="idx === 6">
            <svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 16v5"/><path d="M16 14v7"/><path d="M20 10v11"/><path d="m22 3-8.646 8.646a.5.5 0 0 1-.708 0L9.354 8.354a.5.5 0 0 0-.707 0L2 15"/><path d="M4 18v3"/><path d="M8 14v7"/>
            </svg>
          </template>
          <template v-else-if="idx === 7">
            <svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"/><line x1="12" x2="12" y1="22" y2="15.5"/><polyline points="22 8.5 12 15.5 2 8.5"/><polyline points="2 15.5 12 8.5 22 15.5"/><line x1="12" x2="12" y1="2" y2="8.5"/>
            </svg>
          </template>
        </div>
        <h3 class="sss-title">{{ slide.headline }}</h3>
        <p class="sss-step-goals">{{ slide.benefit }}</p>
        <p class="sss-description-secondary">
          <span class="sss-control-label">Ваш контроль:</span>
          <span class="sss-control-highlight">{{ slide.control }}</span>
        </p>
        <p class="sss-description-main">{{ slide.details }}</p>
        <div class="sss-more-link-area">
          <span class="sss-more-link" :class="{active: activeSlide === idx}">
            Узнать больше <span class="sss-arrow" :class="{move: activeSlide === idx}">→</span>
          </span>
        </div>
      </a>
    </div>
    <div class="sss-nav-buttons">
      <button class="sss-nav-btn sss-nav-prev" @click="scrollPrev" aria-label="Предыдущий слайд">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
      </button>
      <button class="sss-nav-btn sss-nav-next" @click="scrollNext" aria-label="Следующий слайд">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const activeSlide = ref(null)
const sliderContainer = ref(null)

const slides = [
  { headline: 'Обратная связь за пару кликов', benefit: 'Гость легко и быстро сообщает о проблеме, а вы получаете все обращения точно и вовремя.', control: 'Виджет работает на сайте, в приложении или в любом формате для сферы услуг.', details: 'Любой клиент фитнеса или гость ресторана оставляет обратную связь за пару кликов — Сигнал или отзыв в Яндекс/2ГИС. Если гость недоволен, Сигнал сразу идёт команде, а не в открытые рейтинги. Положительные отклики легко отправляются на агрегаторы.' },
  { headline: 'Умная форма', benefit: 'Вы получаете готовую форму с цепочками сценариев, согласование — 1 день, без погружения в технологию.', control: 'Настраиваем форму под специфику бизнеса — структуру Сигналов, формулировки, точки напряжения.', details: 'Форма построена на 150+ уникальной цепочке — для каждого случая есть свой сценарий, три уровня детализации и автоматическая маршрутизация. Не отзыв, а Сигнал — 30 секунд, система сама подсказывает сценарий.' },
  { headline: 'Тикеты в Телеграм', benefit: 'Все задачи решаются вовремя, рекомендации работают, ошибки исключены.', control: 'Видите статус, сроки, причину проблемы и итог — система концентрируется на пользу для гостя.', details: 'Каждый Сигнал превращается в тикет с рекомендацией, маршрутом и сроком решения. Тикеты хранят всю историю коммуникации, решение и удовлетворённость гостя. Вместо CRM — удобные тикеты в Телеграм: 1 Сигнал = 1 тикет, всё на своем месте, это комфортно для команды.' },
  { headline: 'Поддержка оператора', benefit: 'Ваша команда не теряет время на рутину — оператор берёт на себя обработку, координацию и контроль, вы фокусируетесь на развитии сервиса.', control: 'Оператор работает по правилам и срокам вашего бизнеса.', details: 'Оператор ведёт каждый Сигнал с самого начала — строит сценарий, контролирует маршрут, следит за сроками, поддерживает ваши стандарты. Режим работы: в будни 9-18 или 24/7, если требуется максимальное покрытие.' },
  { headline: 'ИИ-ассистент Анна', benefit: 'Каждый гость получает заботу и реальное решение, а бизнес — рост лояльности.', control: 'Управляете сценариями и стандартами Анны — она действует строго в рамках ваших правил.', details: 'Анна — не бот, а безупречный ИИ-ассистент, который ведёт индивидуальный диалог с гостем. Она задаёт уточняющие вопросы, разбирается в эмоциях, предлагает решение и сопровождает до результата — без шаблонов и формальных ответов. Анна работает вместе с оператором и обеспечивает персональный подход к каждому клиенту и к каждой ситуации в строгом соответствии со стандартами компании.' },
  { headline: 'Система под ключ', benefit: 'В работе всегда порядок и прозрачность, никакой путаницы или ручных настроек.', control: 'Внедрение за 2 недели, обучение команды, настройка под специфику бизнеса.', details: 'Сигнал строит и управляет всей инфраструктурой работы с обратной связью: виджет, форма, оператор, платформа, аналитика — всё готово под ключ. Система фиксирует причины проблем, выстраивает стандарты, управляет компенсациями и SLA/NPS — всё чётко под ваши стратегические цели.' },
  { headline: 'Аналитика Сигнала', benefit: 'Принимаете уверенные решения на основе проверенных данных.', control: 'Получаете готовые управленческие отчёты с фактами — видите причины проблем, рост качества, зоны для развития.', details: 'Команда аналитиков Сигнала отслеживает время реакции, причины проблем, рост качества сервиса, оценки, NPS, повторные случаи — всё под запрос бизнеса. Мы формируем управленческие отчёты на реальных данных, визуализируем рост и точки развития.' },
  { headline: 'Лучше с каждым Сигналом', benefit: 'Система непрерывно растёт и одновременно адаптируется к изменениям вашего бизнеса.', control: 'Прозрачный процесс на основе данных и вашей обратной связи.', details: 'Все элементы системы — форма, Анна, тикет-система, платформа — постоянно обновляются и улучшаются на основе непрерывной аналитики. Команда Сигнала следит за процессами и результатами, слушает вашу команду и гостей, суммирует опыт и оперативно вносит улучшения. Вы направляете развитие, получаете отчёты об обновлениях и изменениях, команда Сигнала делает систему лучше.' }
]

const scrollNext = () => {
  if (sliderContainer.value) {
    sliderContainer.value.scrollBy({ left: 336, behavior: "smooth" })
  }
}
const scrollPrev = () => {
  if (sliderContainer.value) {
    sliderContainer.value.scrollBy({ left: -336, behavior: "smooth" })
  }
}
</script>
