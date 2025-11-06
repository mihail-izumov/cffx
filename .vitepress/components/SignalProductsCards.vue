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
        <strong>₽65,500/мес</strong>
        <div class="payment-type">Окупается с первых Сигналов</div>
      </div>
      <ul class="feature-list">
        <li class="feature-item">
          <CheckIcon />
          <span>
            <button class="feature-link" @click="openModal('dialogs', 'ticketing')">
              Тикет-система
            </button>
          </span>
        </li>
        <li class="feature-item">
          <CheckIcon />
          <span>
            <button class="feature-link" @click="openModal('dialogs', 'anna')">
              Анна (базовая версия)
            </button>
          </span>
        </li>
        <li class="feature-item">
          <CheckIcon />
          <span>
            <button class="feature-link" @click="openModal('dialogs', 'support')">
              Поддержка оператора
            </button> <br>(будни, 9-18)
          </span>
        </li>
        <li class="feature-item">
          <CheckIcon />
          <span>
            <button class="feature-link" @click="openModal('dialogs', 'widget')">
              Виджет и Умная форма
            </button>
          </span>
        </li>
        <li class="feature-item">
          <CheckIcon />
          <span>
            <button class="feature-link" @click="openModal('dialogs', 'stats')">
              Базовая статистика
            </button>
          </span>
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
        <strong>от ₽247,500/мес</strong>
        <div class="payment-type">Превращаем данные в рост</div>
      </div>
      <p class="includes-all">Всё из Диалогов, плюс:</p>
      <ul class="feature-list">
        <li class="feature-item">
          <CheckIcon />
          <span>
            <button class="feature-link" @click="openModal('max', 'analytics')">
              Аналитика 360° и еженедельные отчеты
            </button>
          </span>
        </li>
        <li class="feature-item">
          <CheckIcon />
          <span>
            <button class="feature-link" @click="openModal('max', 'annaMax')">
              Анна
            </button> и 
            <button class="feature-link" @click="openModal('max', 'widgetMax')">
              Виджет
            </button>
            (продвинутая настройка)
          </span>
        </li>
        <li class="feature-item">
          <CheckIcon />
          <span>
            <button class="feature-link" @click="openModal('max', 'priority')">
              Приоритетная поддержка
            </button>
          </span>
        </li>
        <li class="feature-item">
          <CheckIcon />
          <span>
            <button class="feature-link" @click="openModal('max', 'analyst')">
              Персональный аналитик и стратегические сессии
            </button>
          </span>
        </li>
      </ul>
      <a href="/pro/max" class="card-button">Подключить Макс</a>
    </div>

    <!-- МОДАЛЬНОЕ ОКНО -->
    <Teleport to="body">
      <Transition name="pricing-modal">
        <div v-if="isModalOpen" class="pricing-modal-overlay" @click="closeModal">
          <div class="pricing-modal-window" @click.stop>
            <button class="pricing-modal-close" @click="closeModal" aria-label="Закрыть">
              <CloseIcon />
            </button>
            <div class="pricing-modal-header">{{ currentModal.tariff }}</div>
            <h2 class="pricing-modal-title">{{ currentModal.title }}</h2>
            <div class="pricing-modal-body">
              <div 
                v-for="(point, index) in currentModal.points" 
                :key="index" 
                class="pricing-accordion-item"
              >
                <button 
                  class="pricing-accordion-header" 
                  @click="toggleAccordion(index)"
                  :class="{ 'is-open': openAccordions.includes(index) }"
                >
                  <span class="pricing-accordion-icon">
                    <CheckLineIcon />
                  </span>
                  <span class="pricing-accordion-title">{{ point.title }}</span>
                  <ChevronIcon :class="{ 'is-rotated': openAccordions.includes(index) }" />
                </button>
                <div 
                  v-if="openAccordions.includes(index)" 
                  class="pricing-accordion-content"
                >
                  {{ point.text }}
                </div>
              </div>
              <a :href="currentModal.link" class="pricing-modal-link">
                Узнать Больше
                <ArrowRightIcon />
              </a>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
import { h, ref, computed } from 'vue'

/* SVG иконки */
// СТАРАЯ ИКОНКА ДЛЯ КАРТОЧЕК (круглая галочка)
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

// НОВАЯ ИКОНКА ДЛЯ МОДАЛЬНОГО ОКНА (галочка с линиями)
const CheckLineIcon = () =>
  h(
    'svg',
    {
      class: 'checkline-icon',
      xmlns: 'http://www.w3.org/2000/svg',
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      'stroke-width': '2',
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round',
      width: '20',
      height: '20'
    },
    [
      h('path', { d: 'M20 4L9 15' }),
      h('path', { d: 'M21 19L3 19' }),
      h('path', { d: 'M9 15L4 10' })
    ]
  )

const CloseIcon = () =>
  h(
    'svg',
    {
      xmlns: 'http://www.w3.org/2000/svg',
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      'stroke-width': '2',
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round',
      width: '24',
      height: '24'
    },
    [
      h('line', { x1: '18', y1: '6', x2: '6', y2: '18' }),
      h('line', { x1: '6', y1: '6', x2: '18', y2: '18' })
    ]
  )

const ChevronIcon = () =>
  h(
    'svg',
    {
      class: 'chevron-icon',
      xmlns: 'http://www.w3.org/2000/svg',
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      'stroke-width': '2',
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round',
      width: '20',
      height: '20'
    },
    [
      h('polyline', { points: '6 9 12 15 18 9' })
    ]
  )

const ArrowRightIcon = () =>
  h(
    'svg',
    {
      class: 'arrow-right-icon',
      xmlns: 'http://www.w3.org/2000/svg',
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      'stroke-width': '2',
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round',
      width: '18',
      height: '18'
    },
    [
      h('line', { x1: '5', y1: '12', x2: '19', y2: '12' }),
      h('polyline', { points: '12 5 19 12 12 19' })
    ]
  )

/* Состояние модального окна */
const isModalOpen = ref(false)
const currentTariff = ref('')
const currentFeature = ref('')
const openAccordions = ref([])

/* Данные для модальных окон */
const modalData = {
  dialogs: {
    tariff: 'СИГНАЛ ДИАЛОГИ',
    ticketing: {
      title: 'Тикет-система',
      link: '/pro/tickets',
      points: [
        {
          icon: '✓',
          title: 'Приём обращений 24/7',
          text: 'Клиенты отправляют сигналы в любое время через виджет. Система присваивает номер, фиксирует время и передаёт оператору в рабочие часы.'
        },
        {
          icon: '✓',
          title: 'Преднастроенная система для оператора',
          text: 'Вы не получаете доступ к SaaS-платформе. Оператор Сигнала работает в настроенной тикет-системе за вас. Вы видите только результат: тикеты и уведомления в Telegram-чате вашей команды.'
        },
        {
          icon: '✓',
          title: 'Контроль сроков и напоминания',
          text: 'Автоматические уведомления команде: за 30 минут до срока и при просрочке. Ни один тикет не теряется.'
        },
        {
          icon: '✓',
          title: 'Полная история обращений',
          text: 'Каждый тикет хранит всю переписку и изменения. Любой исполнитель входит в контекст за секунды.'
        }
      ]
    },
    anna: {
      title: 'Анна (базовая версия)',
      link: '/pro/anna',
      points: [
        {
          icon: '✓',
          title: 'Стандартные сценарии для вашей ниши',
          text: 'Анна ведёт диалог с клиентом, собирает факты и передаёт готовое задание команде. Работает сразу после подключения.'
        },
        {
          icon: '✓',
          title: 'Работает сразу после подключения',
          text: 'Универсальные настройки под гостиницы, рестораны, фитнес-клубы. Не требует дополнительной настройки.'
        },
        {
          icon: '⚙',
          title: 'Персональная настройка — за доп. плату (4 недели, от ₽150,000)',
          text: 'Адаптируем Анну под ваш тон, продукты и особые ситуации. Это глубокая интеграция в ваш бизнес, а не просто изменение текста в чат-боте.'
        }
      ]
    },
    support: {
      title: 'Поддержка оператора (будни, 9-18)',
      link: '/pro/dialogs',
      points: [
        {
          icon: '✓',
          title: 'Аналитик Сигнала обрабатывает каждый сигнал',
          text: 'Не бот, а профессиональный оператор. Каждое обращение проходит через руки человека — проверка фактов, контроль качества, координация команды.'
        },
        {
          icon: '✓',
          title: 'Сигналы принимаются 24/7 через виджет',
          text: 'Клиенты отправляют сигналы круглосуточно. Оператор обрабатывает их в рабочее время — так вы получаете решение, а не автоответ.'
        },
        {
          icon: '✓',
          title: 'Гарантия решения за 24 часа',
          text: 'Мы не гонимся за скоростью ответа. Мы гарантируем качество закрытия: решение за 24 часа, без исключений.'
        }
      ]
    },
    widget: {
      title: 'Виджет',
      link: '/pro/dialogs',
      points: [
        {
          icon: '✓',
          title: 'Публичная страница для каждой локации',
          text: 'Клиенты видят рейтинг, отзывы и могут отправить сигнал прямо с вашего сайта. Брендирование под ваш бизнес: логотип, цвета, название.'
        },
        {
          icon: '✓',
          title: 'Быстрый отзыв в Яндекс/2ГИС (2 клика)',
          text: 'Клиенту не нужно искать вашу локацию на картах и переходить во вкладку отзывов. Прямо из виджета — выбрал платформу, оставил оценку, готово.'
        },
        {
          icon: '✓',
          title: 'Бейдж "Репутация под защитой"',
          text: 'Статус, который видят все: "Сигнал работает" = ваша репутация под контролем.'
        }
      ]
    },
    stats: {
      title: 'Ежемесячная статистика',
      link: '/pro/dialogs',
      points: [
        {
          icon: '✓',
          title: 'Автоматическая сводка за месяц',
          text: 'Система формирует отчёт: сколько сигналов принято, сколько закрыто, средняя скорость реакции, распределение по категориям А–Г.'
        },
        {
          icon: '✓',
          title: 'Метрики качества работы системы',
          text: 'Время от обращения до тикета (норматив ≤ 15 мин), доля просрочек (≤ 5%), средняя оценка опыта (≥ 8 из 10), доля повторных обращений (≤ 3%).'
        },
        {
          icon: '✓',
          title: 'Без глубокой аналитики',
          text: 'Вы видите цифры и тренды, но не получаете рекомендаций по улучшению процессов. Это чистая статистика, без стратегического разбора.'
        }
      ]
    }
  },
  max: {
    tariff: 'СИГНАЛ МАКС',
    analytics: {
      title: 'Аналитика 360° и еженедельные отчёты',
      link: '/pro/max',
      points: [
        {
          icon: '✓',
          title: 'Ежемесячная статистика + стратегический разбор',
          text: 'Не просто цифры (как в тарифе Диалоги), а детальная аналитика: динамика качества за 3 месяца, топ-5 повторяющихся проблем, эффективность компенсаций, анализ повторных обращений.'
        },
        {
          icon: '✓',
          title: 'Глубокий разбор при отклонениях',
          text: 'Резкий рост просрочек? Повторяющиеся жалобы на одну тему? Мы проводим детальный разбор каждого проблемного тикета и даём рекомендации: добавить смену, изменить процесс, обучить команду.'
        },
        {
          icon: '✓',
          title: 'Еженедельные сводные отчёты (каждые 2 недели)',
          text: 'Динамика метрик, предложения по улучшению процессов, выводы о тренде качества. Решения принимаются на основе фактов, а не ощущений.'
        },
        {
          icon: '✓',
          title: 'Метрики качества с нормативами',
          text: 'Время «обращение → тикет» (≤ 15 мин), время «тикет → ответ команды» (по категории А–Г), доля просрочек (≤ 5%), средняя оценка опыта (≥ 8 из 10), доля повторных обращений (≤ 3%).'
        }
      ]
    },
    annaMax: {
      title: 'Анна (продвинутая настройка)',
      link: '/pro/anna',
      points: [
        {
          icon: '✓',
          title: 'Всё из базовой + персональная адаптация включена',
          text: 'Анна говорит вашими словами, знает ваши продукты, меню, услуги. Настройка занимает 4 недели — это часть тарифа.'
        },
        {
          icon: '✓',
          title: 'Анна знает ваш тон, продукты, особые ситуации',
          text: 'Не универсальные шаблоны, а глубокая интеграция в ваш бизнес. Анна — ваш виртуальный сотрудник, а не чат-бот.'
        },
        {
          icon: '✓',
          title: 'Постоянная калибровка под изменения в бизнесе',
          text: 'Меню изменилось? Новая услуга? Мы обновляем Анну без дополнительной платы. Система растёт вместе с вами.'
        }
      ]
    },
    widgetMax: {
      title: 'Виджет (расширенная версия)',
      link: '/pro/max',
      points: [
        {
          icon: '✓',
          title: 'Всё из тарифа Диалоги',
          text: 'Публичная страница, брендирование, быстрый отзыв в Яндекс/2ГИС (2 клика), бейдж "Репутация под защитой".'
        },
        {
          icon: '✓',
          title: 'Мультилокационность',
          text: 'Отдельные виджеты для каждой точки сети. Клиенты видят оценки конкретного ресторана или клуба, а не усреднённый рейтинг по сети.'
        },
        {
          icon: '✓',
          title: 'Расширенная аналитика публичной страницы',
          text: 'Сколько людей видели виджет, сколько оставили сигналы, какая конверсия. Контроль репутации в реальном времени.'
        }
      ]
    },
    priority: {
      title: 'Приоритетная поддержка',
      link: '/pro/max',
      points: [
        {
          icon: '✓',
          title: 'Выделенный оператор для ваших локаций',
          text: 'Не общий пул операторов — персональный специалист, который знает вашу сеть, ваши стандарты, вашу команду.'
        },
        {
          icon: '✓',
          title: 'Расширенный график (опция 24/7 для сетей)',
          text: 'Для сетей с высокой нагрузкой мы можем выделить команду операторов и обеспечить обработку сигналов круглосуточно. Стоимость рассчитывается индивидуально.'
        },
        {
          icon: '✓',
          title: 'Гарантия решения за 12 часов',
          text: 'Приоритетная обработка = в 2 раза быстрее. Критичные сигналы решаются ещё быстрее (категория Г — первое обновление за 15 минут).'
        }
      ]
    },
    analyst: {
      title: 'Персональный аналитик и стратегические сессии',
      link: '/pro/max',
      points: [
        {
          icon: '✓',
          title: 'Аналитик Сигнала на связи',
          text: 'Не просто отчёты — специалист, который разбирает ваши данные, видит тренды и предлагает решения.'
        },
        {
          icon: '✓',
          title: 'Стратегические сессии (90 минут, раз в 2 недели)',
          text: 'Разбор метрик, обсуждение узких мест, план улучшений на следующие 2 недели. Непрерывный рост качества без застоя.'
        },
        {
          icon: '✓',
          title: 'Рекомендации по системным изменениям',
          text: 'Много обращений по одной теме? Аналитик предложит: изменить процесс, автоматизировать, обучить команду. Не тушение пожаров, а устранение причин.'
        }
      ]
    }
  }
}

/* Computed свойство для текущего модального окна */
const currentModal = computed(() => {
  if (!isModalOpen.value) return {}
  const tariffData = modalData[currentTariff.value]
  const featureData = tariffData[currentFeature.value]
  return {
    tariff: tariffData.tariff,
    ...featureData
  }
})

/* Методы управления модальным окном */
const openModal = (tariff, feature) => {
  currentTariff.value = tariff
  currentFeature.value = feature
  openAccordions.value = [0]
  isModalOpen.value = true
  document.body.style.overflow = 'hidden'
}

const closeModal = () => {
  isModalOpen.value = false
  openAccordions.value = []
  document.body.style.overflow = ''
}

const toggleAccordion = (index) => {
  if (openAccordions.value.includes(index)) {
    openAccordions.value = []
  } else {
    openAccordions.value = [index]
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
}

.checkmark-icon {
  width: 18px;
  height: 18px;
  color: #c5f946;
  flex-shrink: 0;
}

/* ССЫЛКИ ФУНКЦИЙ С ДЕФИСНЫМ ПОДЧЕРКИВАНИЕМ -------------------------------- */
.feature-link {
  background: none;
  border: none;
  padding: 0;
  font: inherit;
  color: #e0e0e0;
  cursor: pointer;
  text-decoration: underline;
  text-decoration-style: dashed;
  text-decoration-color: #e0e0e0;
  text-underline-offset: 3px;
  text-decoration-thickness: 1px;
  transition: none;
  text-align: left;
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

.card-button--secondary {
  background: transparent;
  color: #c5f946;
}

.card-button--secondary:hover {
  background: #c5f946;
  color: #000;
}

/* МОДАЛЬНОЕ ОКНО С УНИКАЛЬНЫМИ КЛАССАМИ ----------------------------------- */
.pricing-modal-overlay {
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  right: 0 !important;
  bottom: 0 !important;
  background: rgba(0, 0, 0, 0.75) !important;
  backdrop-filter: blur(10px) !important;
  -webkit-backdrop-filter: blur(10px) !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  z-index: 10000 !important;
  padding: 20px !important;
}

.pricing-modal-window {
  background: #f5f5f7 !important;
  border-radius: 28px !important;
  width: 920px !important;
  height: 720px !important;
  max-width: 100% !important;
  max-height: 90vh !important;
  position: relative !important;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5) !important;
  display: flex !important;
  flex-direction: column !important;
  overflow: hidden !important;
}

.pricing-modal-close {
  position: absolute !important;
  top: 20px !important;
  right: 20px !important;
  width: 44px !important;
  height: 44px !important;
  border-radius: 50% !important;
  background: #1d1d1f !important;
  border: none !important;
  cursor: pointer !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  transition: all 0.2s ease !important;
  color: #f5f5f7 !important;
  z-index: 10 !important;
}

.pricing-modal-close:hover {
  background: #2d2d2f !important;
  transform: scale(1.05) !important;
}

.pricing-modal-header {
  font-size: 1rem !important;
  color: #6e6e73 !important;
  margin-bottom: 12px !important;
  font-weight: 500 !important;
  letter-spacing: 0.08em !important;
  padding: 60px 80px 0 !important;
  flex-shrink: 0 !important;
}

.pricing-modal-title {
  font-size: 2.75rem !important;
  font-weight: 600 !important;
  color: #1d1d1f !important;
  margin: 0 0 32px 0 !important;
  line-height: 1.1 !important;
  padding: 0 80px !important;
  flex-shrink: 0 !important;
}

.pricing-modal-body {
  padding: 0 80px 60px !important;
  overflow-y: auto !important;
  flex: 1 !important;
  min-height: 0 !important;
}

/* АККОРДЕОН --------------------------------------------------------------- */
.pricing-accordion-item {
  margin-bottom: 12px !important;
  background: #e8e8ed !important;
  border-radius: 12px !important;
  overflow: hidden !important;
}

.pricing-accordion-header {
  width: 100% !important;
  display: flex !important;
  align-items: center !important;
  gap: 12px !important;
  padding: 18px 20px !important;
  background: transparent !important;
  border: none !important;
  cursor: pointer !important;
  text-align: left !important;
  transition: none !important;
}

.pricing-accordion-icon {
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  flex-shrink: 0 !important;
}

.checkline-icon {
  width: 20px !important;
  height: 20px !important;
  color: #1d1d1f !important;
  flex-shrink: 0 !important;
}

.pricing-accordion-title {
  flex: 1 !important;
  font-size: 1.2rem !important;
  font-weight: 550 !important;
  color: #1d1d1f !important;
  line-height: 1.4 !important;
}

.chevron-icon {
  flex-shrink: 0 !important;
  transition: transform 0.3s ease !important;
  color: #6e6e73 !important;
}

.chevron-icon.is-rotated {
  transform: rotate(180deg) !important;
}

.pricing-accordion-content {
  padding: 0 20px 20px 20px !important;
  font-size: 1.125rem !important;
  color: #6e6e73 !important;
  line-height: 1.65 !important;
  animation: slideDown 0.3s ease !important;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ССЫЛКА "УЗНАТЬ БОЛЬШЕ" -------------------------------------------------- */
.pricing-modal-link {
  display: inline-flex !important;
  align-items: center !important;
  gap: 8px !important;
  color: #1d1d1f !important;
  font-size: 1.125rem !important;
  font-weight: 500 !important;
  text-decoration: none !important;
  margin-top: 32px !important;
  transition: color 0.2s ease !important;
}

.pricing-modal-link:hover {
  color: #6e6e73 !important;
}

.pricing-modal-link:hover .arrow-right-icon {
  transform: translateX(6px) !important;
}

.arrow-right-icon {
  flex-shrink: 0 !important;
  transition: transform 0.3s ease !important;
}

/* КАСТОМНЫЙ СКРОЛЛБАР ------------------------------------------------------ */
.pricing-modal-body::-webkit-scrollbar {
  width: 8px !important;
}

.pricing-modal-body::-webkit-scrollbar-track {
  background: transparent !important;
}

.pricing-modal-body::-webkit-scrollbar-thumb {
  background: #d1d1d6 !important;
  border-radius: 4px !important;
}

.pricing-modal-body::-webkit-scrollbar-thumb:hover {
  background: #b8b8bd !important;
}

/* АНИМАЦИЯ МОДАЛЬНОГО ОКНА ------------------------------------------------ */
.pricing-modal-enter-active {
  transition: opacity 0.5s ease !important;
}

.pricing-modal-leave-active {
  transition: opacity 0.5s ease !important;
}

.pricing-modal-enter-from {
  opacity: 0 !important;
}

.pricing-modal-leave-to {
  opacity: 0 !important;
}

.pricing-modal-enter-active .pricing-modal-window {
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1) !important;
}

.pricing-modal-leave-active .pricing-modal-window {
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1) !important;
}

.pricing-modal-enter-from .pricing-modal-window {
  transform: scale(0.95) translateY(20px) !important;
}

.pricing-modal-leave-to .pricing-modal-window {
  transform: scale(0.95) translateY(20px) !important;
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

  .pricing-modal-window {
    width: 100% !important;
    height: auto !important;
    max-height: 90vh !important;
    border-radius: 20px !important;
  }

  .pricing-modal-header {
    padding: 40px 24px 0 !important;
    font-size: 0.875rem !important;
  }

  .pricing-modal-title {
    font-size: 2rem !important;
    padding: 0 24px !important;
  }

  .pricing-modal-body {
    padding: 0 24px 40px !important;
  }

  .pricing-accordion-title {
    font-size: 1.0625rem !important;
  }

  .pricing-accordion-content {
    font-size: 1rem !important;
  }

  .pricing-modal-link {
    font-size: 1rem !important;
  }
}

@media (max-width: 480px) {
  .feature-item {
    font-size: 1.075rem !important;
    line-height: 1.35 !important;
  }

  .pricing-modal-window {
    height: auto !important;
    max-height: 95vh !important;
  }

  .pricing-modal-title {
    font-size: 1.75rem !important;
  }

  .pricing-accordion-title {
    font-size: 1rem !important;
  }

  .pricing-accordion-content {
    font-size: 0.9375rem !important;
  }
}
</style>
