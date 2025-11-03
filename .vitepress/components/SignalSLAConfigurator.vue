<script setup lang="ts">
import { reactive, ref, computed } from 'vue'

/* ===== Локальные константы (без export), тёмная тема и никакой синхронизации ===== */
type Topic = { category: string; percent: number }

const CAFE_CATEGORIES: Topic[] = [
  { category: 'Качество блюд/напитков', percent: 13.3 },
  { category: 'Чистота зала/посуды/уборной', percent: 10.8 },
  { category: 'Долгое ожидание заказа', percent: 18.3 },
  { category: 'Ошибки в заказе', percent: 12.5 },
  { category: 'Грубость и невнимательность персонала', percent: 10.0 },
  { category: 'Антисанитария/инородные предметы', percent: 6.7 },
  { category: 'Проблемы с очередями и обслуживанием', percent: 5.8 },
  { category: 'Неуютная атмосфера/музыка/запах', percent: 5.0 },
  { category: 'Упаковка и напитки на вынос', percent: 4.2 },
  { category: 'Отсутствие внимания/коммуникации', percent: 4.2 },
  { category: 'Цена/акции/выгода', percent: 3.3 },
  { category: 'Профессионализм персонала', percent: 2.5 },
  { category: 'Дизайн и интерьер', percent: 1.7 },
  { category: 'Парковка и доступность', percent: 1.7 },
]

const FITNESS_CATEGORIES: Topic[] = [
  { category: 'Переполненность зала/очереди на тренажёры', percent: 22.0 },
  { category: 'Чистота раздевалок/душевых', percent: 16.0 },
  { category: 'Грубость и непрофессионализм персонала', percent: 14.0 },
  { category: 'Проблемы с оборудованием', percent: 12.0 },
  { category: 'Цена/ошибки в оплате абонемента', percent: 11.0 },
  { category: 'Неудобное расписание занятий', percent: 8.0 },
  { category: 'Температура и вентиляция в зале', percent: 6.0 },
  { category: 'Качество и уровень тренировок', percent: 4.0 },
  { category: 'Опоздание/отсутствие тренера', percent: 3.0 },
  { category: 'Дискомфорт и токсичная атмосфера', percent: 2.0 },
  { category: 'Отсутствие удобств (Wi‑Fi, парковка)', percent: 1.5 },
  { category: 'Проблемы с договором и отменой', percent: 0.5 },
]

const WIDGETS = {
  cafe: {
    title: 'Общепит',
    topics: CAFE_CATEGORIES,
    scripts: [
      'Жалоба на вкус',
      'Жалоба на долгую подачу',
      'Инородный предмет в блюде',
      'Жалоба на поведение персонала',
      'Проблемы с чистотой',
      'Жалоба на температуру и проч.',
    ],
    benefits: [
      'Готовый словарь жалоб по кофейням',
      'Подсказки умной формы',
      'Стандартные компенсации',
    ],
  },
  fitness: {
    title: 'Фитнес',
    topics: FITNESS_CATEGORIES,
    scripts: [
      'Переполненность/очереди',
      'Чистота раздевалок/душевых',
      'Оборудование/ремонт',
      'Поведение/профессионализм персонала',
      'Расписание занятий',
      'Температура/вентиляция',
    ],
    benefits: [
      'Словарь жалоб по фитнес‑сетям',
      'Подсказки умной формы',
      'Стандартные эскалации',
    ],
  },
} as const

type WidgetKey = keyof typeof WIDGETS

/* ===== Базовые поля тикета из SLA (русские метки) ===== */
const BASE_TICKET_FIELDS = [
  { key: 'code', label: 'Код тикета' },
  { key: 'datetime', label: 'Дата и время' },
  { key: 'guest', label: 'Имя гостя' },
  { key: 'contact', label: 'Контакт' },
  { key: 'location', label: 'Локация' },
  { key: 'category', label: 'Категория' },
  { key: 'problem', label: 'Описание проблемы' },
  { key: 'recommendation', label: 'Рекомендуемое решение' },
] as const

const ESCALATION_CODES = [
  { code: 'health_threat', label: 'Угроза здоровью' },
  { code: 'foreign_object', label: 'Инородные предметы' },
  { code: 'staff_aggression', label: 'Агрессивное поведение персонала' },
  { code: 'mass_complaints', label: 'Массовые жалобы' },
] as const

/* ===== Состояние ===== */
const state = reactive({
  company: {
    name: '',
    locations_connected: 1,
    retention_pct: 50,
    ltv_tool: '',
    ltv_tool_other: '',
  },
  standards_source: 'signal' as 'internal'|'signal',
  widget: 'cafe' as WidgetKey,

  // назначения тем в категориях
  categories_map: {
    A: { owner: 'team' as 'team'|'manager'|'custom', contact: '', notes: '', topics: [] as string[] },
    B: { owner: 'manager' as 'team'|'manager'|'custom', contact: '', notes: '', topics: [] as string[] },
    C: { owner: 'manager' as 'team'|'manager'|'custom', contact: '', notes: '', topics: [] as string[] },
    D: { owner: 'manager' as 'team'|'manager'|'custom', contact: '', notes: '', topics: [] as string[] },
  },

  ticket_template: {
    base_fields: BASE_TICKET_FIELDS.map(f => f.key),
    extra_groups_enabled: false,
    extra_groups_topics: [] as string[],
  },

  // NPS таймер как ползунок в минутах (60, 1440, 4320 или любое)
  nps_minutes: 60,

  work_hours: {
    mode: 'wk_9_18' as 'wk_9_18'|'wk_9_18_we'|'extended',
    weekdays: { from: '09:00', to: '18:00' },
    weekends: { from: '10:00', to: '17:00' },
  },

  client_scripts: {
    has: [] as string[],
  },

  has_full_classification: false,

  escalation_immediate: [] as string[],
  escalation_other: '',

  metrics_targets: {
    tickets_accepted_pct: 90,
    reco_alignment_pct: 80,
    nps_collected_pct: 95,
    nps_avg: 8,
    returns_after_complaint_pct: 70,
    avg_compensation_rub: 500,
    full_close_time_hours: 24,
    resolved_without_escalation_pct: 75,
  }
})

/* ===== Вычисления ===== */
const topics = computed<Topic[]>(() => WIDGETS[state.widget].topics)
const chosen = computed<string[]>(() => [
  ...state.categories_map.A.topics,
  ...state.categories_map.B.topics,
  ...state.categories_map.C.topics,
  ...state.categories_map.D.topics,
])

function availableFor(cat: 'A'|'B'|'C'|'D') {
  // доступные = все темы минус выбранные в других категориях, плюс уже выбранные в текущей
  const mine = new Set(state.categories_map[cat].topics)
  return topics.value
    .map(t => t.category)
    .filter(name => mine.has(name) || !chosen.value.includes(name))
}

function toggleTopic(cat: 'A'|'B'|'C'|'D', name: string) {
  const arr = state.categories_map[cat].topics
  const idx = arr.indexOf(name)
  if (idx >= 0) {
    arr.splice(idx, 1)
  } else {
    if (arr.length >= 4) return
    // убрать тему из других категорий, чтобы не дублировалась
    ;(['A','B','C','D'] as const).forEach(k => {
      if (k !== cat) {
        const i = state.categories_map[k].topics.indexOf(name)
        if (i >= 0) state.categories_map[k].topics.splice(i, 1)
      }
    })
    arr.push(name)
  }
}

const availableScripts = computed<string[]>(() => WIDGETS[state.widget].scripts)
const widgetBenefits = computed<string[]>(() => WIDGETS[state.widget].benefits)

/* ===== Валидация ===== */
const errors = ref<string[]>([])

function validate(): boolean {
  errors.value = []
  if (!state.company.name.trim()) errors.value.push('Укажите название компании')
  if (!state.company.locations_connected || state.company.locations_connected < 1)
    errors.value.push('Укажите количество локаций (минимум 1)')
  ;(['A','B','C','D'] as const).forEach(k => {
    const c = state.categories_map[k]
    if (c.owner === 'custom' && !c.contact.trim()) errors.value.push(`Категория ${k}: укажите контакт для пользовательской роли`)
    if (c.topics.length > 4) errors.value.push(`Категория ${k}: выбрано больше 4 тем`)
  })
  if (state.work_hours.mode === 'extended') {
    const {from: wf, to: wt} = state.work_hours.weekdays
    const {from: sf, to: st} = state.work_hours.weekends
    if (wf >= wt) errors.value.push('Будни: «от» меньше «до»')
    if (sf >= st) errors.value.push('Выходные: «от» меньше «до»')
  }
  return errors.value.length === 0
}

/* ===== Payload (исправлен: widget вместо industry, nps_minutes вместо строк) ===== */
const payload = computed(() => {
  const escalation = [
    ...state.escalation_immediate,
    ...(state.escalation_other.trim() ? ['other'] : []),
  ]
  return {
    company: {
      name: state.company.name,
      locations_connected: state.company.locations_connected,
      retention_pct: state.company.retention_pct,
      ltv_tool: state.company.ltv_tool === 'other'
        ? `Other: ${state.company.ltv_tool_other}`
        : state.company.ltv_tool,
    },
    standards_source: state.standards_source, // 'signal' | 'internal'
    widget: state.widget,                      // 'cafe' | 'fitness'
    categories_map: {
      A: { ...state.categories_map.A },
      B: { ...state.categories_map.B },
      C: { ...state.categories_map.C },
      D: { ...state.categories_map.D },
    },
    ticket_template: {
      base_fields: state.ticket_template.base_fields,
      extra_groups_enabled: state.ticket_template.extra_groups_enabled,
      extra_groups_topics: state.ticket_template.extra_groups_topics,
    },
    nps_minutes: state.nps_minutes,            // целое число минут
    work_hours: {
      mode: state.work_hours.mode,
      weekdays: state.work_hours.weekdays,
      weekends: state.work_hours.weekends,
    },
    client_scripts: { has: state.client_scripts.has },
    has_full_classification: state.has_full_classification,
    escalation_immediate: escalation,
    metrics_targets: { ...state.metrics_targets },
  }
})

/* ===== Отправка ===== */
const submitted = ref(false)
async function onSubmit() {
  if (!validate()) return
  // здесь интеграция с backend/email; в v1 просто лог
  console.log('SLA configurator payload:', JSON.stringify(payload.value, null, 2))
  submitted.value = true
}

/* ===== Утилиты отображения ===== */
function npsLabel(mins: number) {
  if (mins < 120) return `${mins} минут`
  const days = Math.round(mins / 1440)
  if (days < 1) return `${Math.round(mins/60)} часов`
  return `${days} дн.`
}

</script>

<template>
  <section class="signal-sla dark">
    <h2>Конфигуратор Сигнала</h2>
    <p class="subtitle">
      После отправки мы выпустим черновик вашего SLA в тот же день и пришлём на согласование.
    </p>

    <!-- 0. Сведения -->
    <div class="card">
      <h3>О компании</h3>
      <div class="grid2">
        <label class="left">
          <span>Название компании</span>
          <input v-model="state.company.name" type="text" placeholder="ООО Пример" />
        </label>
        <label class="left">
          <span>Локаций к подключению</span>
          <input v-model.number="state.company.locations_connected" type="number" min="1" />
        </label>
      </div>
      <div class="grid2">
        <label class="left">
          <span>Текущий retention: {{ state.company.retention_pct }}%</span>
          <input v-model.number="state.company.retention_pct" type="range" min="50" max="100" step="5" />
        </label>
        <label class="left">
          <span>Инструмент контроля LTV</span>
          <select v-model="state.company.ltv_tool">
            <option value="">Выберите…</option>
            <option>CRM</option>
            <option>BI/Дашборды</option>
            <option>1C</option>
            <option>Google Sheets</option>
            <option value="other">Другое</option>
          </select>
        </label>
      </div>
      <div v-if="state.company.ltv_tool === 'other'">
        <input v-model="state.company.ltv_tool_other" type="text" placeholder="Опишите инструмент" />
      </div>
    </div>

    <!-- 1. Источник стандартов -->
    <div class="card">
      <h3>Источник стандартов</h3>
      <div class="grid2 radio-left">
        <label class="left"><input type="radio" value="signal" v-model="state.standards_source" /> Стандарты Сигнала</label>
        <label class="left"><input type="radio" value="internal" v-model="state.standards_source" /> Внутренние стандарты</label>
      </div>
    </div>

    <!-- 2. Виджеты (кликабельные карточки вместо радио) -->
    <div class="card">
      <h3>Выберите виджет</h3>
      <div class="widgets">
        <div
          class="widget-card"
          :class="{ active: state.widget === 'cafe' }"
          @click="state.widget = 'cafe'"
          tabindex="0"
        >
          <div class="w-title">Общепит</div>
          <ul class="checks">
            <li v-for="b in WIDGETS.cafe.benefits" :key="b"><span class="check">✔</span><span>{{ b }}</span></li>
          </ul>
        </div>
        <div
          class="widget-card"
          :class="{ active: state.widget === 'fitness' }"
          @click="state.widget = 'fitness'"
          tabindex="0"
        >
          <div class="w-title">Фитнес</div>
          <ul class="checks">
            <li v-for="b in WIDGETS.fitness.benefits" :key="b"><span class="check">✔</span><span>{{ b }}</span></li>
          </ul>
        </div>
      </div>
      <p class="hint">Справочники жалоб, скрипты и эскалации подстроятся под ваш виджет автоматически.</p>
    </div>

    <!-- 3. Категории A–Г (две колонки; внутри карточки выбор тем, сетка 3 на строку) -->
    <div class="card">
      <h3>Категории A–Г</h3>
      <div class="hint">Сроки ответа фиксированы: A — 4ч, Б — 2ч, В — 1ч, Г — 15м.</div>

      <div class="owners owners-2col">
        <div class="owner-col" v-for="k in ['A','B','C','D']" :key="k">
          <div class="header-row">
            <h4>Категория {{ k }}</h4>
            <div class="sla-label">
              <span v-if="k==='A'">4 часа</span>
              <span v-else-if="k==='B'">2 часа</span>
              <span v-else-if="k==='C'">1 час</span>
              <span v-else>15 минут</span>
            </div>
          </div>

          <div class="grid2">
            <label class="left">
              <span>Ответственный</span>
              <select v-model="(state.categories_map as any)[k].owner">
                <option value="team">Команда</option>
                <option value="manager">Управляющий</option>
                <option value="custom">Другое</option>
              </select>
            </label>
            <label v-if="(state.categories_map as any)[k].owner === 'custom'" class="left">
              <span>Контакт роли</span>
              <input v-model="(state.categories_map as any)[k].contact" type="text" placeholder="@handle или телефон" />
            </label>
          </div>

          <label class="left">
            <span>Комментарий (границы)</span>
            <input v-model="(state.categories_map as any)[k].notes" type="text" maxlength="200" placeholder="Коротко: чем эта категория отличается" />
          </label>

          <div class="topics-grid">
            <button
              v-for="name in availableFor(k as any)"
              :key="name"
              type="button"
              class="topic-card"
              :class="{ selected: (state.categories_map as any)[k].topics.includes(name) }"
              @click="toggleTopic(k as any, name)"
            >
              <span class="check">{{ (state.categories_map as any)[k].topics.includes(name) ? '✔' : '' }}</span>
              <span class="t-name">{{ name }}</span>
            </button>
          </div>

          <div class="hint small">До 4 тем в каждой категории; выбранные темы автоматически скрываются в других категориях.</div>
        </div>
      </div>
    </div>

    <!-- 4. Базовый тикет (русские метки), чеклисты компактно в несколько колонок -->
    <div class="card">
      <h3>Базовый шаблон тикета</h3>
      <div class="checks-grid">
        <label v-for="f in BASE_TICKET_FIELDS" :key="f.key" class="left disabled">
          <input type="checkbox" :checked="true" disabled />
          <span>{{ f.label }}</span>
        </label>
      </div>

      <div class="extras">
        <label class="left">
          <span>Добавить дополнительные группы?</span>
          <select v-model="state.ticket_template.extra_groups_enabled">
            <option :value="false">Нет</option>
            <option :value="true">Да</option>
          </select>
        </label>

        <div v-if="state.ticket_template.extra_groups_enabled">
          <p class="hint">Выберите темы, для которых при внедрении добавим специальные поля тикета.</p>
          <div class="checks-grid">
            <label v-for="t in topics" :key="t.category" class="left">
              <input type="checkbox"
                     :value="t.category"
                     v-model="state.ticket_template.extra_groups_topics" />
              <span>{{ t.category }}</span>
            </label>
          </div>
        </div>
      </div>
    </div>

    <!-- 5. Таймер NPS (ползунок) -->
    <div class="card">
      <h3>Таймер запроса NPS</h3>
      <label class="left">
        <span>Интервал после сообщения гостю: {{ npsLabel(state.nps_minutes) }}</span>
        <input type="range" min="60" max="4320" step="30" v-model.number="state.nps_minutes" />
      </label>
      <div class="hint">Диапазон 60 минут — 3 дня, шаг 30 минут.</div>
    </div>

    <!-- 6. Режим работы -->
    <div class="card">
      <h3>Режим работы</h3>
      <div class="radio-left grid3">
        <label class="left"><input type="radio" value="wk_9_18" v-model="state.work_hours.mode" /> Будни 9–18 МСК</label>
        <label class="left"><input type="radio" value="wk_9_18_we" v-model="state.work_hours.mode" /> 9–18 МСК + выходные</label>
        <label class="left"><input type="radio" value="extended" v-model="state.work_hours.mode" /> Расширенный</label>
      </div>

      <div v-if="state.work_hours.mode === 'extended'" class="grid4">
        <label class="left">Будни от <input v-model="state.work_hours.weekdays.from" type="time" /></label>
        <label class="left">Будни до <input v-model="state.work_hours.weekdays.to" type="time" /></label>
        <label class="left">Выходные от <input v-model="state.work_hours.weekends.from" type="time" /></label>
        <label class="left">Выходные до <input v-model="state.work_hours.weekends.to" type="time" /></label>
      </div>
    </div>

    <!-- 7. Скрипты клиента -->
    <div class="card">
      <h3>Скрипты клиента (есть и можем предоставить)</h3>
      <div class="checks-grid">
        <label v-for="s in availableScripts" :key="s" class="left">
          <input type="checkbox" :value="s" v-model="state.client_scripts.has" />
          <span>{{ s }}</span>
        </label>
      </div>
    </div>

    <!-- 8. Полная классификация -->
    <div class="card">
      <h3>Полная классификация проблем</h3>
      <label class="left"><input type="checkbox" v-model="state.has_full_classification" /> <span>Есть собственная полная классификация</span></label>
    </div>

    <!-- 9. Немедленная эскалация -->
    <div class="card">
      <h3>Критерии немедленной эскалации (до 30 минут)</h3>
      <div class="checks-grid">
        <label v-for="e in ESCALATION_CODES" :key="e.code" class="left">
          <input type="checkbox" :value="e.code" v-model="state.escalation_immediate" />
          <span>{{ e.label }}</span>
        </label>
        <label class="left row">
          <span>Другое</span>
          <input v-model="state.escalation_other" type="text" placeholder="Коротко опишите" />
        </label>
      </div>
    </div>

    <!-- 10. Метрики -->
    <div class="card">
      <h3>Цели метрик</h3>
      <div class="metrics">
        <div class="metric">
          <label class="left">Принятие тикетов без доработки: {{ state.metrics_targets.tickets_accepted_pct }}%</label>
          <input type="range" min="0" max="100" v-model.number="state.metrics_targets.tickets_accepted_pct" />
        </div>
        <div class="metric">
          <label class="left">Соответствие рекомендаций решениям: {{ state.metrics_targets.reco_alignment_pct }}%</label>
          <input type="range" min="0" max="100" v-model.number="state.metrics_targets.reco_alignment_pct" />
        </div>
        <div class="metric">
          <label class="left">Получение NPS оценки: {{ state.metrics_targets.nps_collected_pct }}%</label>
          <input type="range" min="0" max="100" v-model.number="state.metrics_targets.nps_collected_pct" />
        </div>
        <div class="metric">
          <label class="left">Средний NPS: {{ state.metrics_targets.nps_avg }}</label>
          <input type="range" min="1" max="10" v-model.number="state.metrics_targets.nps_avg" />
        </div>
        <div class="metric">
          <label class="left">Возврат гостей после жалобы: {{ state.metrics_targets.returns_after_complaint_pct }}%</label>
          <input type="range" min="0" max="100" v-model.number="state.metrics_targets.returns_after_complaint_pct" />
        </div>
        <div class="metric">
          <label class="left">Средняя стоимость компенсации (₽): {{ state.metrics_targets.avg_compensation_rub }}</label>
          <input type="number" min="0" step="10" v-model.number="state.metrics_targets.avg_compensation_rub" />
        </div>
        <div class="metric">
          <label class="left">Время полного закрытия (часы): {{ state.metrics_targets.full_close_time_hours }}</label>
          <input type="number" min="0" step="1" v-model.number="state.metrics_targets.full_close_time_hours" />
        </div>
        <div class="metric">
          <label class="left">Решены без эскалации: {{ state.metrics_targets.resolved_without_escalation_pct }}%</label>
          <input type="range" min="0" max="100" v-model.number="state.metrics_targets.resolved_without_escalation_pct" />
        </div>
      </div>
    </div>

    <!-- Саммари -->
    <div class="card summary">
      <h3>Саммари: стартовая конфигурация</h3>
      <p class="hint">
        После отправки мы оформим черновик SLA с разделами: матрица ролей A–Г, карта проблем по A–Г,
        шаблон тикета и доп. группы, политика NPS, режим работы, источник стандартов, ваш список скриптов,
        флаг полной классификации, критерии немедленной эскалации и цели метрик.
      </p>

      <div class="summary-cols">
        <div>
          <h4>О компании</h4>
          <ul>
            <li>Название: {{ state.company.name || '—' }}</li>
            <li>Локаций: {{ state.company.locations_connected }}</li>
            <li>Retention: {{ state.company.retention_pct }}%</li>
            <li>LTV tool: {{ state.company.ltv_tool === 'other' ? state.company.ltv_tool_other : state.company.ltv_tool || '—' }}</li>
          </ul>

          <h4>Операции</h4>
          <ul>
            <li>Виджет: {{ WIDGETS[state.widget].title }}</li>
            <li>A: {{ state.categories_map.A.topics.join(', ') || '—' }} · роль: {{ state.categories_map.A.owner }} · контакт: {{ state.categories_map.A.contact || '—' }}</li>
            <li>Б: {{ state.categories_map.B.topics.join(', ') || '—' }} · роль: {{ state.categories_map.B.owner }} · контакт: {{ state.categories_map.B.contact || '—' }}</li>
            <li>В: {{ state.categories_map.C.topics.join(', ') || '—' }} · роль: {{ state.categories_map.C.owner }} · контакт: {{ state.categories_map.C.contact || '—' }}</li>
            <li>Г: {{ state.categories_map.D.topics.join(', ') || '—' }} · роль: {{ state.categories_map.D.owner }} · контакт: {{ state.categories_map.D.contact || '—' }}</li>
            <li>NPS таймер: {{ npsLabel(state.nps_minutes) }}</li>
            <li>Режим: {{
              state.work_hours.mode === 'wk_9_18'
                ? 'Будни 9–18'
                : state.work_hours.mode === 'wk_9_18_we'
                  ? '9–18 + выходные'
                  : `Будни ${state.work_hours.weekdays.from}-${state.work_hours.weekdays.to}; Выходные ${state.work_hours.weekends.from}-${state.work_hours.weekends.to}`
            }}</li>
          </ul>
        </div>

        <div>
          <h4>Контроль</h4>
          <ul>
            <li>Источник стандартов: {{ state.standards_source === 'signal' ? 'Стандарты Сигнала' : 'Внутренние' }}</li>
            <li>Скрипты клиента: {{ state.client_scripts.has.join(', ') || '—' }}</li>
            <li>Полная классификация: {{ state.has_full_classification ? 'Да' : 'Нет' }}</li>
            <li>Эскалация (30м): {{
              [
                ...state.escalation_immediate,
                ...(state.escalation_other.trim() ? ['other'] : [])
              ].join(', ') || '—'
            }}</li>
          </ul>

          <h4>JSON payload</h4>
          <textarea class="payload" readonly rows="18">{{ JSON.stringify(payload, null, 2) }}</textarea>
        </div>
      </div>

      <div v-if="errors.length" class="errors">
        <div v-for="e in errors" :key="e" class="error">{{ e }}</div>
      </div>

      <button class="primary" @click="onSubmit">Отправить заявку</button>
      <p class="after" v-if="submitted">
        Спасибо! Мы выпустим черновик вашего SLA в тот же день и пришлём на согласование.
      </p>
    </div>
  </section>
</template>

<style scoped>
/* ===== Тёмная тема в духе Tesla ===== */
.signal-sla.dark { 
  --bg:#0e0f10; --card:#151719; --muted:#9aa3ad; --text:#e8eaed; --line:#2a2d31; --accent:#e6e6e6; --primary:#e3e6eb; 
  background: var(--bg); color: var(--text); padding-bottom: 20px; user-select: text;
}
.signal-sla.dark input, .signal-sla.dark select, .signal-sla.dark textarea { background:#0d0f12; color:var(--text); border:1px solid var(--line); }
.signal-sla.dark .primary { background:#ffffff; color:#111; border:1px solid #fff; }
.subtitle { margin-top:-6px; color: var(--muted); }

.card { background: var(--card); border:1px solid var(--line); border-radius: 12px; padding: 18px 16px; margin: 14px 0; }
h3 { margin: 0 0 8px; }
.grid2 { display:grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.grid3 { display:grid; grid-template-columns: repeat(3,1fr); gap: 10px; }
.grid4 { display:grid; grid-template-columns: repeat(4,1fr); gap: 10px; }

.left { display:flex; flex-direction:column; align-items:flex-start; }
label.left input[type="checkbox"] { margin-right: 8px; }
.radio-left label { display:flex; align-items:center; gap:8px; justify-content:flex-start; }

input[type="text"], input[type="number"], input[type="time"], select, textarea { padding: 10px 12px; border-radius: 10px; }
textarea.payload { width:100%; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace; font-size:12px; border-radius:10px; background:#0b0c0e; }

.disabled { opacity:.8; cursor:not-allowed; }

/* Виджеты */
.widgets { display:grid; grid-template-columns: 1fr 1fr; gap:12px; }
.widget-card { border:1px solid var(--line); border-radius:12px; padding:14px; cursor:pointer; transition: border-color .2s, background .2s; }
.widget-card.active { border-color:#fff; background:#1a1d20; }
.w-title { font-weight:600; margin-bottom:8px; }
.checks { list-style:none; padding:0; margin:0; }
.checks li { display:flex; align-items:center; gap:8px; margin:4px 0; }
.check { color:#8fe38f; }

/* Категории */
.owners-2col { display:grid; grid-template-columns: 1fr 1fr; gap:12px; }
.owner-col { border:1px dashed var(--line); border-radius:12px; padding:12px; }
.header-row { display:flex; align-items:center; justify-content:space-between; margin-bottom:6px; }
.sla-label { color: var(--muted); font-size: 12px; }

/* Темы внутри карточки: 3 на строку */
.topics-grid { display:grid; grid-template-columns: repeat(3, 1fr); gap:8px; margin-top:8px; }
.topic-card { display:flex; align-items:center; gap:8px; padding:10px; border:1px solid var(--line); border-radius:10px; background:#0d0f12; color:var(--text); text-align:left; }
.topic-card.selected { border-color:#8fe38f; background:#102114; }
.topic-card .check { width:14px; }

.hint { color: var(--muted); font-size: 13px; }
.hint.small { font-size: 12px; }

/* Чеклисты компактно: несколько колонок */
.checks-grid { display:grid; grid-template-columns: repeat(3, 1fr); gap:8px; }
.checks-grid label { display:flex; align-items:center; gap:8px; }

/* Метрики */
.metrics .metric { margin: 10px 0; }

/* Саммари */
.summary-cols { display:grid; grid-template-columns: 1fr 1fr; gap:12px; }
.errors { margin-top:10px; }
.error { background:#2a1212; color:#ffb3b3; padding:8px; border-radius:8px; margin-bottom:6px; border:1px solid #472222; }
button.primary { margin-top: 12px; padding: 12px 16px; border-radius: 12px; border:none; cursor:pointer; }
@media (max-width: 1024px) {
  .grid2, .grid3, .grid4, .owners-2col, .summary-cols, .widgets, .topics-grid, .checks-grid { grid-template-columns: 1fr; }
}
</style>
