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
              Поддержка оператора <br>(будни, 9-18)
            </button>
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
            <button class="feature-link" @click="openModal('max', 'annaWidget')">
              Анна и Виджет (продвинутая настройка)
            </button>
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
            <div class="modal-body" v-html="currentModal.content"></div>
            <a v-if="currentModal.link" :href="currentModal.link" class="modal-link">
              Подробнее <ArrowIcon />
            </a>
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

const ArrowIcon = () =>
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
      width: '16',
      height: '16'
    },
    [
      h('polyline', { points: '9 18 15 12 9 6' })
    ]
  )

/* Состояние модального окна */
const isModalOpen = ref(false)
const currentTariff = ref('')
const currentFeature = ref('')

/* Данные для модальных окон */
const modalData = {
  dialogs: {
    tariff: 'ТАРИФ "ДИАЛОГИ"',
    ticketing: {
      title: 'Тикет-система',
      content: `
        <div class="modal-point">
          <div class="modal-point-title">✓ Приём обращений 24/7</div>
          <div class="modal-point-text">Клиенты отправляют сигналы в любое время через виджет. Система присваивает номер, фиксирует время и передаёт оператору в рабочие часы.</div>
        </div>
        <div class="modal-point">
          <div class="modal-point-title">✓ Преднастроенная система для оператора</div>
          <div class="modal-point-text">Вы не получаете доступ к SaaS-платформе. Оператор Сигнала работает в настроенной тикет-системе за вас. Вы видите только результат: тикеты и уведомления в Telegram-чате вашей команды.</div>
        </div>
        <div class="modal-point">
          <div class="modal-point-title">✓ Контроль сроков и напоминания</div>
          <div class="modal-point-text">Автоматические уведомления команде: за 30 минут до срока и при просрочке. Ни один тикет не теряется.</div>
        </div>
        <div class="modal-point">
          <div class="modal-point-title">✓ Полная история обращений</div>
          <div class="modal-point-text">Каждый тикет хранит всю переписку и изменения. Любой исполнитель входит в контекст за секунды.</div>
        </div>
      `
    },
    anna: {
      title: 'Анна (базовая версия)',
      content: `
        <div class="modal-point">
          <div class="modal-point-title">✓ Стандартные сценарии для вашей ниши</div>
          <div class="modal-point-text">Анна ведёт диалог с клиентом, собирает факты и передаёт готовое задание команде. Работает сразу после подключения.</div>
        </div>
        <div class="modal-point">
          <div class="modal-point-title">✓ Работает сразу после подключения</div>
          <div class="modal-point-text">Универсальные настройки под гостиницы, рестораны, фитнес-клубы. Не требует дополнительной настройки.</div>
        </div>
        <div class="modal-point">
          <div class="modal-point-title">⚙ Персональная настройка — за доп. плату (4 недели, от ₽150,000)</div>
          <div class="modal-point-text">Адаптируем Анну под ваш тон, продукты и особые ситуации. Это глубокая интеграция в ваш бизнес, а не просто изменение текста в чат-боте.</div>
        </div>
      `
    },
    support: {
      title: 'Поддержка оператора (будни, 9-18)',
      content: `
        <div class="modal-point">
          <div class="modal-point-title">✓ Аналитик Сигнала обрабатывает каждый сигнал</div>
          <div class="modal-point-text">Не бот, а профессиональный оператор. Каждое обращение проходит через руки человека — проверка фактов, контроль качества, координация команды.</div>
        </div>
        <div class="modal-point">
          <div class="modal-point-title">✓ Сигналы принимаются 24/7 через виджет</div>
          <div class="modal-point-text">Клиенты отправляют сигналы круглосуточно. Оператор обрабатывает их в рабочее время — так вы получаете решение, а не автоответ.</div>
        </div>
        <div class="modal-point">
          <div class="modal-point-title">✓ Гарантия решения за 24 часа</div>
          <div class="modal-point-text">Мы не гонимся за скоростью ответа. Мы гарантируем качество закрытия: решение за 24 часа, без исключений.</div>
        </div>
      `
    },
    widget: {
      title: 'Виджет',
      content: `
        <div class="modal-point">
          <div class="modal-point-title">✓ Публичная страница для каждой локации</div>
          <div class="modal-point-text">Клиенты видят рейтинг, отзывы и могут отправить сигнал прямо с вашего сайта. Брендирование под ваш бизнес: логотип, цвета, название.</div>
        </div>
        <div class="modal-point">
          <div class="modal-point-title">✓ Быстрый отзыв в Яндекс/2ГИС (2 клика)</div>
          <div class="modal-point-text">Клиенту не нужно искать вашу локацию на картах и переходить во вкладку отзывов. Прямо из виджета — выбрал платформу, оставил оценку, готово.</div>
        </div>
        <div class="modal-point">
          <div class="modal-point-title">✓ Бейдж "Репутация под защитой"</div>
          <div class="modal-point-text">Статус, который видят все: "Сигнал работает" = ваша репутация под контролем.</div>
        </div>
      `
    },
    stats: {
      title: 'Ежемесячная статистика',
      content: `
        <div class="modal-point">
          <div class="modal-point-title">✓ Автоматическая сводка за месяц</div>
          <div class="modal-point-text">Система формирует отчёт: сколько сигналов принято, сколько закрыто, средняя скорость реакции, распределение по категориям А–Г.</div>
        </div>
        <div class="modal-point">
          <div class="modal-point-title">✓ Метрики качества работы системы</div>
          <div class="modal-point-text">Время от обращения до тикета (норматив ≤ 15 мин), доля просрочек (≤ 5%), средняя оценка опыта (≥ 8 из 10), доля повторных обращений (≤ 3%).</div>
        </div>
        <div class="modal-point">
          <div class="modal-point-title">✓ Без глубокой аналитики</div>
          <div class="modal-point-text">Вы видите цифры и тренды, но не получаете рекомендаций по улучшению процессов. Это чистая статистика, без стратегического разбора.</div>
        </div>
      `
    }
  },
  max: {
    tariff: 'ТАРИФ "МАКС"',
    analytics: {
      title: 'Аналитика 360° и еженедельные отчёты',
      content: `
        <div class="modal-point">
          <div class="modal-point-title">✓ Ежемесячная статистика + стратегический разбор</div>
          <div class="modal-point-text">Не просто цифры (как в тарифе Диалоги), а детальная аналитика: динамика качества за 3 месяца, топ-5 повторяющихся проблем, эффективность компенсаций, анализ повторных обращений.</div>
        </div>
        <div class="modal-point">
          <div class="modal-point-title">✓ Глубокий разбор при отклонениях</div>
          <div class="modal-point-text">Резкий рост просрочек? Повторяющиеся жалобы на одну тему? Мы проводим детальный разбор каждого проблемного тикета и даём рекомендации: добавить смену, изменить процесс, обучить команду.</div>
        </div>
        <div class="modal-point">
          <div class="modal-point-title">✓ Еженедельные сводные отчёты (каждые 2 недели)</div>
          <div class="modal-point-text">Динамика метрик, предложения по улучшению процессов, выводы о тренде качества. Решения принимаются на основе фактов, а не ощущений.</div>
        </div>
        <div class="modal-point">
          <div class="modal-point-title">✓ Метрики качества с нормативами</div>
          <div class="modal-point-text">Время «обращение → тикет» (≤ 15 мин), время «тикет → ответ команды» (по категории А–Г), доля просрочек (≤ 5%), средняя оценка опыта (≥ 8 из 10), доля повторных обращений (≤ 3%).</div>
        </div>
      `
    },
    annaWidget: {
      title: 'Анна (продвинутая настройка)',
      content: `
        <div class="modal-point">
          <div class="modal-point-title">✓ Всё из базовой + персональная адаптация включена</div>
          <div class="modal-point-text">Анна говорит вашими словами, знает ваши продукты, меню, услуги. Настройка занимает 4 недели — это часть тарифа.</div>
        </div>
        <div class="modal-point">
          <div class="modal-point-title">✓ Анна знает ваш тон, продукты, особые ситуации</div>
          <div class="modal-point-text">Не универсальные шаблоны, а глубокая интеграция в ваш бизнес. Анна — ваш виртуальный сотрудник, а не чат-бот.</div>
        </div>
        <div class="modal-point">
          <div class="modal-point-title">✓ Постоянная калибровка под изменения в бизнесе</div>
          <div class="modal-point-text">Меню изменилось? Новая услуга? Мы обновляем Анну без дополнительной платы. Система растёт вместе с вами.</div>
        </div>
        <div class="modal-divider"></div>
        <h3 class="modal-subtitle">Виджет (расширенная версия)</h3>
        <div class="modal-point">
          <div class="modal-point-title">✓ Всё из тарифа Диалоги</div>
          <div class="modal-point-text">Публичная страница, брендирование, быстрый отзыв в Яндекс/2ГИС (2 клика), бейдж "Репутация под защитой".</div>
        </div>
        <div class="modal-point">
          <div class="modal-point-title">✓ Мультилокационность</div>
          <div class="modal-point-text">Отдельные виджеты для каждой точки сети. Клиенты видят оценки конкретного ресторана или клуба, а не усреднённый рейтинг по сети.</div>
        </div>
        <div class="modal-point">
          <div class="modal-point-title">✓ Расширенная аналитика публичной страницы</div>
          <div class="modal-point-text">Сколько людей видели виджет, сколько оставили сигналы, какая конверсия. Контроль репутации в реальном времени.</div>
        </div>
      `
    },
    priority: {
      title: 'Приоритетная поддержка',
      content: `
        <div class="modal-point">
          <div class="modal-point-title">✓ Выделенный оператор для ваших локаций</div>
          <div class="modal-point-text">Не общий пул операторов — персональный специалист, который знает вашу сеть, ваши стандарты, вашу команду.</div>
        </div>
        <div class="modal-point">
          <div class="modal-point-title">✓ Расширенный график (опция 24/7 для сетей)</div>
          <div class="modal-point-text">Для сетей с высокой нагрузкой мы можем выделить команду операторов и обеспечить обработку сигналов круглосуточно. Стоимость рассчитывается индивидуально.</div>
        </div>
        <div class="modal-point">
          <div class="modal-point-title">✓ Гарантия решения за 12 часов</div>
          <div class="modal-point-text">Приоритетная обработка = в 2 раза быстрее. Критичные сигналы решаются ещё быстрее (категория Г — первое обновление за 15 минут).</div>
        </div>
      `
    },
    analyst: {
      title: 'Персональный аналитик и стратегические сессии',
      content: `
        <div class="modal-point">
          <div class="modal-point-title">✓ Аналитик Сигнала на связи</div>
          <div class="modal-point-text">Не просто отчёты — специалист, который разбирает ваши данные, видит тренды и предлагает решения.</div>
        </div>
        <div class="modal-point">
          <div class="modal-point-title">✓ Стратегические сессии (90 минут, раз в 2 недели)</div>
          <div class="modal-point-text">Разбор метрик, обсуждение узких мест, план улучшений на следующие 2 недели. Непрерывный рост качества без застоя.</div>
        </div>
        <div class="modal-point">
          <div class="modal-point-title">✓ Рекомендации по системным изменениям</div>
          <div class="modal-point-text">Много обращений по одной теме? Аналитик предложит: изменить процесс, автоматизировать, обучить команду. Не тушение пожаров, а устранение причин.</div>
        </div>
      `
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
  isModalOpen.value = true
  document.body.style.overflow = 'hidden'
}

const closeModal = () => {
  isModalOpen.value = false
  document.body.style.overflow = ''
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

/* ССЫЛКИ ФУНКЦИЙ С ПУНКТИРОМ ---------------------------------------------- */
.feature-link {
  background: none;
  border: none;
  padding: 0;
  font: inherit;
  color: #e0e0e0;
  cursor: pointer;
  text-decoration: underline;
  text-decoration-style: dotted;
  text-decoration-color: #c5f946;
  text-underline-offset: 3px;
  transition: all 0.2s ease;
  text-align: left;
}

.feature-link:hover {
  color: #c5f946;
  text-decoration-style: solid;
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
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  padding: 20px;
  overflow-y: auto;
}

.modal-content {
  background: #f5f5f7;
  border-radius: 28px;
  max-width: 920px;
  width: 100%;
  padding: 60px 80px;
  position: relative;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
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
}

.modal-close:hover {
  background: #2d2d2f;
  transform: scale(1.05);
}

.modal-header {
  font-size: 0.875rem;
  color: #6e6e73;
  margin-bottom: 12px;
  font-weight: 500;
  letter-spacing: 0.08em;
}

.modal-title {
  font-size: 2.5rem;
  font-weight: 600;
  color: #1d1d1f;
  margin: 0 0 32px 0;
  line-height: 1.1;
}

.modal-body {
  color: #1d1d1f;
  line-height: 1.6;
}

.modal-point {
  margin-bottom: 24px;
}

.modal-point-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1d1d1f;
  margin-bottom: 8px;
}

.modal-point-text {
  font-size: 1rem;
  color: #6e6e73;
  line-height: 1.6;
}

.modal-divider {
  height: 1px;
  background: #d2d2d7;
  margin: 32px 0;
}

.modal-subtitle {
  font-size: 1.75rem;
  font-weight: 600;
  color: #1d1d1f;
  margin: 0 0 24px 0;
}

.modal-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: #0066cc;
  font-size: 1.0625rem;
  text-decoration: none;
  margin-top: 24px;
  transition: all 0.2s ease;
}

.modal-link:hover {
  color: #0077ed;
  text-decoration: underline;
}

/* АНИМАЦИЯ МОДАЛЬНОГО ОКНА ------------------------------------------------ */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .modal-content,
.modal-leave-active .modal-content {
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
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
    padding: 40px 24px;
    border-radius: 20px;
    margin: 20px 0;
  }

  .modal-title {
    font-size: 1.75rem;
  }

  .modal-subtitle {
    font-size: 1.375rem;
  }

  .modal-point-title {
    font-size: 1rem;
  }

  .modal-point-text {
    font-size: 0.9375rem;
  }

  .modal-overlay {
    align-items: flex-start;
    padding: 0;
  }
}

@media (max-width: 480px) {
  .feature-item {
    font-size: 1.075rem !important;
    line-height: 1.35 !important;
  }

  .modal-content {
    padding: 32px 20px;
  }

  .modal-title {
    font-size: 1.5rem;
  }
}
</style>
