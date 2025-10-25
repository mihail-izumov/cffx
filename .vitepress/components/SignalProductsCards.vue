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
            </button> (будни, 9-18)
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
        <strong>от ₽225,000/мес</strong>
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
      <a href="/pro/sistema" class="card-button">Подключить Макс</a>
    </div>

    <!-- МОДАЛЬНОЕ ОКНО -->
    <Teleport to="body">
      <Transition name="modal">
        <div v-if="isModalOpen" class="modal-overlay" @click="closeModal">
          <div class="modal-content" @click.stop>
            <button class="modal-close" @click="closeModal" aria-label="Закрыть">
              <CloseIcon />
            </button>
            <div class="modal-header">{{ currentModal.tariff }}</div>
            <h2 class="modal-title">{{ currentModal.title }}</h2>
            <div class="modal-body">
              <div 
                v-for="(point, index) in currentModal.points" 
                :key="index" 
                class="modal-accordion-item"
              >
                <button 
                  class="modal-accordion-header" 
                  @click="toggleAccordion(index)"
                  :class="{ 'is-open': openAccordions.includes(index) }"
                >
                  <span class="accordion-icon">{{ point.icon }}</span>
                  <span class="accordion-title">{{ point.title }}</span>
                  <ChevronIcon :class="{ 'is-rotated': openAccordions.includes(index) }" />
                </button>
                <div 
                  v-if="openAccordions.includes(index)" 
                  class="modal-accordion-content"
                >
                  {{ point.text }}
                </div>
              </div>
              <a :href="currentModal.link" class="modal-learn-more">
                Узнать больше
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
      link: '/pro1',
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
      link: '/pro1',
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
      link: '/pro1',
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
      link: '/pro1',
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
      link: '/pro1',
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
      link: '/pro1',
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
      link: '/pro1',
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
      link: '/pro1',
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
      link: '/pro1',
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
      link: '/pro1',
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
  openAccordions.value = [0] // Открываем первый пункт по умолчанию
  isModalOpen.value = true
  document.body.style.overflow = 'hidden'
}

const closeModal = () => {
  isModalOpen.value = false
  openAccordions.value = []
  document.body.style.overflow = ''
}

const toggleAccordion = (index) => {
  // Закрываем все остальные аккордеоны, открываем только выбранный
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

/* МОДАЛЬНОЕ ОКНО ---------------------------------------------------------- */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0);
  backdrop-filter: blur(0px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  padding: 20px;
  transition: background 0.5s ease, backdrop-filter 0.5s ease;
}

.modal-overlay.modal-enter-active,
.modal-overlay.modal-leave-active {
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(10px);
}

.modal-content {
  background: #f5f5f7;
  border-radius: 28px;
  width: 920px;
  height: 720px;
  position: relative;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.modal-close {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: #1d1d1f;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  color: #f5f5f7;
  z-index: 10;
}

.modal-close:hover {
  background: #2d2d2f;
  transform: scale(1.05);
}

.modal-header {
  font-size: 1rem;
  color: #6e6e73;
  margin-bottom: 12px;
  font-weight: 500;
  letter-spacing: 0.08em;
  padding: 60px 80px 0;
}

.modal-title {
  font-size: 2.75rem;
  font-weight: 600;
  color: #1d1d1f;
  margin: 0 0 32px 0;
  line-height: 1.1;
  padding: 0 80px;
}

.modal-body {
  padding: 0 80px 60px;
  overflow-y: auto;
  flex: 1;
}

/* АККОРДЕОН --------------------------------------------------------------- */
.modal-accordion-item {
  margin-bottom: 12px;
  background: #e8e8ed;
  border-radius: 12px;
  overflow: hidden;
}

.modal-accordion-header {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 18px 20px;
  background: transparent;
  border: none;
  cursor: pointer;
  text-align: left;
  transition: none;
}

.accordion-icon {
  font-size: 1.25rem;
  color: #1d1d1f;
  flex-shrink: 0;
}

.accordion-title {
  flex: 1;
  font-size: 1.2rem;
  font-weight: 550;
  color: #1d1d1f;
  line-height: 1.4;
}

.chevron-icon {
  flex-shrink: 0;
  transition: transform 0.3s ease;
  color: #6e6e73;
}

.chevron-icon.is-rotated {
  transform: rotate(180deg);
}

.modal-accordion-content {
  padding: 0 20px 20px 20px;
  font-size: 1.125rem;
  color: #6e6e73;
  line-height: 1.65;
  animation: slideDown 0.3s ease;
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
.modal-learn-more {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #0066cc;
  font-size: 1.125rem;
  font-weight: 500;
  text-decoration: none;
  margin-top: 32px;
  transition: color 0.2s ease;
}

.modal-learn-more:hover {
  color: #0077ed;
}

.modal-learn-more:hover .arrow-right-icon {
  animation: arrowSlide 0.6s ease;
}

@keyframes arrowSlide {
  0%, 100% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(6px);
  }
}

.arrow-right-icon {
  flex-shrink: 0;
}

/* КАСТОМНЫЙ СКРОЛЛБАР ------------------------------------------------------ */
.modal-body::-webkit-scrollbar {
  width: 8px;
}

.modal-body::-webkit-scrollbar-track {
  background: transparent;
}

.modal-body::-webkit-scrollbar-thumb {
  background: #d1d1d6;
  border-radius: 4px;
}

.modal-body::-webkit-scrollbar-thumb:hover {
  background: #b8b8bd;
}

/* АНИМАЦИЯ МОДАЛЬНОГО ОКНА ------------------------------------------------ */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.5s ease, backdrop-filter 0.5s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  backdrop-filter: blur(0px);
}

.modal-enter-active .modal-content,
.modal-leave-active .modal-content {
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.modal-enter-from .modal-content {
  transform: scale(0.95) translateY(20px);
}

.modal-leave-to .modal-content {
  transform: scale(0.95) translateY(20px);
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

  .modal-content {
    width: 100%;
    height: 90vh;
    border-radius: 20px;
  }

  .modal-header {
    padding: 40px 24px 0;
    font-size: 0.875rem;
  }

  .modal-title {
    font-size: 2rem;
    padding: 0 24px;
  }

  .modal-body {
    padding: 0 24px 40px;
  }

  .accordion-title {
    font-size: 1.0625rem;
  }

  .modal-accordion-content {
    font-size: 1rem;
  }

  .modal-learn-more {
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .feature-item {
    font-size: 1.075rem !important;
    line-height: 1.35 !important;
  }

  .modal-content {
    height: 95vh;
  }

  .modal-title {
    font-size: 1.75rem;
  }

  .accordion-title {
    font-size: 1rem;
  }

  .modal-accordion-content {
    font-size: 0.9375rem;
  }
}
</style>
