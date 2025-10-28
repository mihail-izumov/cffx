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
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect width="20" height="16" x="2" y="4" rx="2"/>
            <path d="M6 8h.01"/><path d="M10 8h.01"/><path d="M14 8h.01"/>
          </svg>
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
  {
    headline: 'Обратная связь за пару кликов',
    benefit: 'Гость легко и быстро сообщает о проблеме, а вы получаете все обращения точно и вовремя.',
    control: 'Виджет работает на сайте, в приложении или в любом формате для сферы услуг.',
    details: 'Любой клиент фитнеса или гость ресторана оставляет обратную связь за пару кликов — Сигнал или отзыв в Яндекс/2ГИС. Если гость недоволен, Сигнал сразу идёт команде, а не в открытые рейтинги. Положительные отклики легко отправляются на агрегаторы.'
  },
  {
    headline: 'Умная форма',
    benefit: 'Вы получаете готовую форму с цепочками сценариев, согласование — 1 день, без погружения в технологию.',
    control: 'Настраиваем форму под специфику бизнеса — структуру Сигналов, формулировки, точки напряжения.',
    details: 'Форма построена на 150+ уникальной цепочке — для каждого случая есть свой сценарий, три уровня детализации и автоматическая маршрутизация. Не отзыв, а Сигнал — 30 секунд, система сама подсказывает сценарий.'
  },
  {
    headline: 'Тикеты в Телеграм',
    benefit: 'Все задачи решаются вовремя, рекомендации работают, ошибки исключены.',
    control: 'Видите статус, сроки, причину проблемы и итог — система концентрируется на пользу для гостя.',
    details: 'Каждый Сигнал превращается в тикет с рекомендацией, маршрутом и сроком решения. Тикеты хранят всю историю коммуникации, решение и удовлетворённость гостя. Вместо CRM — удобные тикеты в Телеграм: 1 Сигнал = 1 тикет, всё на своем месте, это комфортно для команды.'
  },
  {
    headline: 'Поддержка оператора',
    benefit: 'Ваша команда не теряет время на рутину — оператор берёт на себя обработку, координацию и контроль, вы фокусируетесь на развитии сервиса.',
    control: 'Оператор работает по правилам и срокам вашего бизнеса.',
    details: 'Оператор ведёт каждый Сигнал с самого начала — строит сценарий, контролирует маршрут, следит за сроками, поддерживает ваши стандарты. Режим работы: в будни 9-18 или 24/7, если требуется максимальное покрытие.'
  },
  {
    headline: 'ИИ-ассистент Анна',
    benefit: 'Каждый гость получает заботу и реальное решение, а бизнес — рост лояльности.',
    control: 'Управляете сценариями и стандартами Анны — она действует строго в рамках ваших правил.',
    details: 'Анна — не бот, а безупречный ИИ-ассистент, который ведёт индивидуальный диалог с гостем. Она задаёт уточняющие вопросы, разбирается в эмоциях, предлагает решение и сопровождает до результата — без шаблонов и формальных ответов. Анна работает вместе с оператором и обеспечивает персональный подход к каждому клиенту и к каждой ситуации в строгом соответствии со стандартами компании.'
  },
  {
    headline: 'Система под ключ',
    benefit: 'В работе всегда порядок и прозрачность, никакой путаницы или ручных настроек.',
    control: 'Внедрение за 2 недели, обучение команды, настройка под специфику бизнеса.',
    details: 'Сигнал строит и управляет всей инфраструктурой работы с обратной связью: виджет, форма, оператор, платформа, аналитика — всё готово под ключ. Система фиксирует причины проблем, выстраивает стандарты, управляет компенсациями и SLA/NPS — всё чётко под ваши стратегические цели.'
  },
  {
    headline: 'Аналитика Сигнала',
    benefit: 'Принимаете уверенные решения на основе проверенных данных.',
    control: 'Получаете готовые управленческие отчёты с фактами — видите причины проблем, рост качества, зоны для развития.',
    details: 'Команда аналитиков Сигнала отслеживает время реакции, причины проблем, рост качества сервиса, оценки, NPS, повторные случаи — всё под запрос бизнеса. Мы формируем управленческие отчёты на реальных данных, визуализируем рост и точки развития.'
  },
  {
    headline: 'Лучше с каждым Сигналом',
    benefit: 'Система непрерывно растёт и одновременно адаптируется к изменениям вашего бизнеса.',
    control: 'Прозрачный процесс на основе данных и вашей обратной связи.',
    details: 'Все элементы системы — форма, Анна, тикет-система, платформа — постоянно обновляются и улучшаются на основе непрерывной аналитики. Команда Сигнала следит за процессами и результатами, слушает вашу команду и гостей, суммирует опыт и оперативно вносит улучшения. Вы направляете развитие, получаете отчёты об обновлениях и изменениях, команда Сигнала делает систему лучше.'
  }
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

<style scoped>
.sss-slider-wrapper { position: relative !important; margin: 24px 0 !important; }
.sss-brands-container { display: flex !important; overflow-x: auto !important; gap: 16px !important; padding: 4px 0 12px 4px !important; scroll-behavior: smooth !important; scrollbar-width: none !important; -ms-overflow-style: none !important; margin-bottom: 16px !important; }
.sss-brands-container::-webkit-scrollbar { display: none !important; }
.sss-brand-card {
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
  background-color: #4a4a4a !important;
  border-color: #555 !important;
  border-top-color: rgba(197, 249, 70, 0.3) !important;
  text-decoration: none !important;
  cursor: pointer !important;
}
.sss-step-card:hover, .sss-brand-card.active {
  border-top-color: #C5F946 !important;
}
.sss-card-background-icon { position: absolute !important; bottom: -90px !important; right: -90px !important; width: 300px !important; height: 300px !important; opacity: 0.04 !important; pointer-events: none !important; z-index: 0 !important;}
.sss-card-background-icon svg { width: 100% !important; height: 100% !important; stroke: currentColor !important;}
.sss-step-card .sss-card-background-icon { color: #ffffff !important;}
.sss-title { font-size: 28px !important; line-height: 1.2 !important; margin: 0 !important; font-weight: 700 !important; border: none !important; padding: 0 !important; color: #ffffff !important; position: relative !important; z-index: 1 !important;}
.sss-step-goals { color: #C5F946 !important; font-size: 16px !important; font-weight: 500 !important; line-height: 1.65 !important; margin: 0 !important; position: relative !important; z-index: 1 !important; }
.sss-description-secondary { color: #b0b0b0 !important; font-size: 16px !important; line-height: 1.6 !important; margin: 0 !important; flex-grow: 1 !important; position: relative !important; z-index: 1 !important;}
.sss-control-label { color: #ffffff !important; font-weight: 700 !important; font-size: 16px !important; }
.sss-control-highlight { background: linear-gradient(to right, #C5F946 0%, #C5F946 50%, rgba(197, 249, 70, 0.08) 50%) !important; background-size: 200% 100% !important; background-position: 100% 0 !important; background-color: rgba(197, 249, 70, 0.08) !important; color: #ffffff !important; padding: 1px 5px !important; margin: 0 !important; border-radius: 1px !important; transition: background-position 0.6s cubic-bezier(0.4, 0, 0.2, 1), color 0.3s ease !important; position: relative !important; display: inline !important; z-index: 1 !important; box-decoration-break: clone !important; -webkit-box-decoration-break: clone !important; line-height: 1.5 !important; vertical-align: baseline !important; font-size: 16px !important;}
.sss-step-card:hover .sss-control-highlight, .sss-brand-card.active .sss-control-highlight { background-position: 0 0 !important; color: #1a1a1a !important;}
.sss-description-main { color: #e0e0e0 !important; font-size: 16px !important; font-weight: 400 !important; line-height: 1.65 !important; margin: 0 !important; position: relative !important; z-index: 1 !important;}
.sss-more-link-area { margin-top: 16px; margin-bottom: 4px; }
.sss-more-link { font-size: 15px !important; color: #b0b0b0 !important; font-weight: 500 !important; background: none !important; cursor: pointer !important; text-decoration: none !important; display: flex !important; align-items: center !important; gap: 6px !important; transition: color 0.3s !important;}
.sss-more-link:hover, .sss-brand-card.active .sss-more-link { color: #C5F946 !important;}
.sss-arrow { font-size: 19px !important; margin-left: 2px !important; transition: transform 0.25s !important;}
.sss-brand-card.active .sss-arrow, .sss-more-link:hover .sss-arrow { transform: translateX(9px) !important;}
.sss-nav-buttons { display: flex !important; gap: 8px !important; justify-content: flex-end !important; margin-right: 0 !important; padding-right: 4px !important;}
.sss-nav-btn { width: 40px !important; height: 40px !important; border-radius: 50% !important; border: none !important; cursor: pointer !important; display: flex !important; align-items: center !important; justify-content: center !important; transition: all 0.3s ease !important; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15) !important;}
.sss-nav-prev { background-color: #e8e8e8 !important; color: #4a4a4a !important;}
.sss-nav-prev:hover { background-color: #d0d0d0 !important; transform: scale(1.05) !important;}
.sss-nav-next { background-color: #ffffff !important; color: #2a2a2a !important;}
.sss-nav-next:hover { background-color: #f5f5f5 !important; transform: scale(1.05) !important;}
</style>
