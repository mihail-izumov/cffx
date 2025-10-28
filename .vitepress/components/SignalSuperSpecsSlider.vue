<template>
  <div class="sss-slider-wrapper">
    <div class="sss-brands-container" ref="sliderContainer">
      <div
        v-for="(slide, idx) in slides"
        :key="idx"
        class="sss-brand-card sss-step-card"
        :class="{ active: activeSlide === idx }"
        @mouseover="activeSlide = idx"
        @mouseleave="activeSlide = null"
        @click="onMoreClick(slide)"
        tabindex="0"
        role="button"
      >
        <!-- Иконка заднего фона -->
        <div class="sss-card-background-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect width="20" height="16" x="2" y="4" rx="2"/>
            <path d="M6 8h.01"/><path d="M10 8h.01"/><path d="M14 8h.01"/>
          </svg>
        </div>
        <!-- Заголовок -->
        <h3 class="sss-title">{{ slide.headline }}</h3>
        <!-- Акцентная выгода (лаймовый цвет, жирно) -->
        <div class="sss-main-benefit">{{ slide.benefit }}</div>
        <!-- "Ваш контроль" -->
        <div class="sss-control-block">
          <span class="sss-control-label">Ваш контроль:</span>
          <span
            class="sss-control-highlight"
            :class="{ animated: activeSlide === idx }"
          >{{ slide.control }}</span>
        </div>
        <!-- Подробности (внизу, приглушённо, меньше) -->
        <div class="sss-description-details">{{ slide.details }}</div>
        <!-- Кнопка "Узнать больше" -->
        <div class="sss-more-link-area">
          <span
            class="sss-more-link"
            :class="{ active: activeSlide === idx }"
          >
            Узнать больше <span class="sss-arrow" :class="{ move: activeSlide === idx }">→</span>
          </span>
        </div>
      </div>
    </div>
    <div class="sss-nav-buttons">
      <button class="sss-nav-btn sss-nav-prev" @click="scrollPrev" aria-label="Предыдущий слайд">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>
      <button class="sss-nav-btn sss-nav-next" @click="scrollNext" aria-label="Следующий слайд">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
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
    sliderContainer.value.scrollBy({ left: 336, behavior: 'smooth' })
  }
}
const scrollPrev = () => {
  if (sliderContainer.value) {
    sliderContainer.value.scrollBy({ left: -336, behavior: 'smooth' })
  }
}
const onMoreClick = (slide) => {
  // Логика перехода к подробной странице или всплывающей информации
}
</script>

<style scoped>
.sss-slider-wrapper { position: relative; margin: 24px 0; }
.sss-brands-container { display: flex; overflow-x: auto; gap: 16px; padding: 4px 0 12px 4px; scroll-behavior: smooth; margin-bottom: 16px; }
.sss-brands-container::-webkit-scrollbar { display: none; }
.sss-brand-card {
  flex: 0 0 320px;
  border-radius: 12px;
  padding: 48px 24px;
  display: flex; flex-direction: column;
  gap: 16px;
  border-style: solid;
  border-width: 1px; border-top-width: 4px;
  position: relative; min-height: 360px; overflow: hidden;
  transition: border-top-color 0.4s cubic-bezier(0.4,0,0.2,1),
              box-shadow 0.3s;
  background-color: #4a4a4a;
  border-color: #555; border-top-color: rgba(197,249,70,0.3);
  outline: none;
  cursor: pointer;
}
.sss-brand-card:focus, .sss-brand-card.active {
  border-top-color: #C5F946;
  box-shadow: 0 0 24px 0 rgba(197,249,70,0.13);
}

.sss-card-background-icon {
  position: absolute;
  bottom: -90px;
  right: -90px;
  width: 300px; height: 300px;
  opacity: 0.04;
  pointer-events: none;
  z-index: 0;
}
.sss-card-background-icon svg {
  width: 100%; height: 100%; stroke: currentColor;
}
.sss-step-card .sss-card-background-icon { color: #fff; }

.sss-title { font-size: 16px; font-weight: 700; color: #fff; margin-bottom: 0; }
.sss-main-benefit {
  color: #C5F946; font-size: 16px; font-weight: 500; margin-bottom: 0; margin-top: 0;
}
.sss-control-block { display: flex; align-items: center; gap: 8px; }
.sss-control-label { color: #fff; font-weight: 700; font-size: 16px; }
.sss-control-highlight {
  background: linear-gradient(to right, #C5F946 0%, #C5F946 50%, rgba(197,249,70,0.08) 50%);
  background-size: 200% 100%; background-position: 100% 0; background-color: rgba(197,249,70,0.08);
  color: #fff; padding: 1px 5px; border-radius: 1px;
  transition: background-position 0.4s, color 0.3s;
  font-size: 16px; font-weight: 500; line-height: 1.55;
}
.sss-control-highlight.animated { background-position: 0 0; color: #1a1a1a; }

.sss-description-details {
  color: #b0b0b0; font-size: 13px; line-height: 1.6;
  margin-top: auto; margin-bottom: 8px;
}

.sss-more-link-area {
  margin-bottom: 2px;
  margin-top: 8px;
  display: flex; justify-content: flex-start;
}
.sss-more-link {
  font-size: 14px; color: #b0b0b0; font-weight: 500; border: none; outline: none;
  background: none; cursor: pointer; text-decoration: none;
  display: flex; align-items: center; gap: 6px; transition: color 0.3s;
}
.sss-more-link.active { color: #C5F946; }
.sss-arrow {
  font-size: 18px; transition: transform 0.25s;
  margin-left: 2px;
}
.sss-arrow.move { transform: translateX(8px); }

.sss-nav-buttons { display: flex; gap: 8px; justify-content: flex-end; margin-right: 0; padding-right: 4px; }
.sss-nav-btn { width: 40px; height: 40px; border-radius: 50%; border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.3s; box-shadow: 0 2px 8px rgba(0,0,0,0.15); }
.sss-nav-prev { background-color: #e8e8e8; color: #4a4a4a; }
.sss-nav-prev:hover { background-color: #d0d0d0; transform: scale(1.05); }
.sss-nav-next { background-color: #fff; color: #2a2a2a; }
.sss-nav-next:hover { background-color: #f5f5f5; transform: scale(1.05); }
</style>
