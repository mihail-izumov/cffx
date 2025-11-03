<script setup lang="ts">
import { reactive, ref, computed } from 'vue'

/* ===== Константы отраслей (без desc), локально, без синхронизаций ===== */
type Topic = { category: string; percent: number }

export const CAFE_CATEGORIES: Topic[] = [
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

export const FITNESS_CATEGORIES: Topic[] = [
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

const INDUSTRY_PRESETS = {
  cafe: {
    topics: CAFE_CATEGORIES,
    scripts: [
      'Жалоба на вкус',
      'Жалоба на долгую подачу',
      'Инородный предмет в блюде',
      'Жалоба на поведение персонала',
      'Проблемы с чистотой',
      'Жалоба на температуру и проч.',
    ],
  },
  fitness: {
    topics: FITNESS_CATEGORIES,
    scripts: [
      'Переполненность/очереди',
      'Чистота раздевалок/душевых',
      'Оборудование/ремонт',
      'Поведение/профессионализм персонала',
      'Расписание занятий',
      'Температура/вентиляция',
    ],
  },
} as const

type IndustryKey = keyof typeof INDUSTRY_PRESETS

/* ===== Справочники UI ===== */
const BASE_TICKET_FIELDS = [
  'code', 'datetime', 'guest', 'contact', 'location', 'category', 'problem', 'recommendation'
] as const

const NPS_OPTIONS = ['60m','1d','3d','custom'] as const

const ESCALATION_CODES = [
  { code: 'health_threat', label: 'Угроза здоровью' },
  { code: 'foreign_object', label: 'Инородные предметы' },
  { code: 'staff_aggression', label: 'Агрессивное поведение персонала' },
  { code: 'mass_complaints', label: 'Массовые жалобы' },
] as const

/* ===== Состояние формы ===== */
const state = reactive({
  company: {
    name: '',
    locations_connected: 1,
    retention_pct: 50,
    ltv_tool: '',
    ltv_tool_other: '',
  },
  standards_source: 'signal' as 'internal'|'signal',
  industry: 'cafe' as IndustryKey,

  // Назначения тем в категории A–D (по 4 макс)
  topicAssignments: {} as Record<string, 'A'|'B'|'C'|'D'|''>,

  categories_map: {
    A: { owner: 'team' as 'team'|'manager'|'custom', contact: '', notes: '' },
    B: { owner: 'manager' as 'team'|'manager'|'custom', contact: '', notes: '' },
    C: { owner: 'manager' as 'team'|'manager'|'custom', contact: '', notes: '' },
    D: { owner: 'manager' as 'team'|'manager'|'custom', contact: '', notes: '' },
  },

  ticket_template: {
    base_fields: [...BASE_TICKET_FIELDS],
    extra_groups_enabled: false,
    extra_groups_topics: [] as string[],
  },

  nps_timer: '60m' as typeof NPS_OPTIONS[number],
  nps_timer_custom: '',

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
const topics = computed<Topic[]>(() => INDUSTRY_PRESETS[state.industry].topics)
const unassignedTopics = computed(() =>
  topics.value.map(t => t.category).filter(name => (state.topicAssignments[name] ?? '') === '')
)

function categoryTopics(key: 'A'|'B'|'C'|'D') {
  return topics.value.map(t => t.category).filter(name => state.topicAssignments[name] === key)
}

function canAssignTo(cat: 'A'|'B'|'C'|'D') {
  return categoryTopics(cat).length < 4
}

function assignTopic(name: string, cat: 'A'|'B'|'C'|'D') {
  if (!canAssignTo(cat)) return
  // снять предыдущую категорию
  const prev = state.topicAssignments[name]
  if (prev) state.topicAssignments[name] = ''
  // не давать теме быть в двух категориях
  state.topicAssignments[name] = cat
}

function removeFrom(cat: 'A'|'B'|'C'|'D', name: string) {
  if (state.topicAssignments[name] === cat) state.topicAssignments[name] = ''
}

const availableScripts = computed<string[]>(() => INDUSTRY_PRESETS[state.industry].scripts)

/* ===== Валидация простая ===== */
const errors = ref<string[]>([])

function validate(): boolean {
  errors.value = []
  if (!state.company.name.trim()) errors.value.push('Укажите название компании')
  if (!state.company.locations_connected || state.company.locations_connected < 1)
    errors.value.push('Укажите количество локаций (минимум 1)')
  ;(['A','B','C','D'] as const).forEach(k => {
    const c = state.categories_map[k]
    if (c.owner === 'custom' && !c.contact.trim()) errors.value.push(`Категория ${k}: укажите контакт для пользовательской роли`)
  })
  if (state.work_hours.mode === 'extended') {
    const {from: wf, to: wt} = state.work_hours.weekdays
    const {from: sf, to: st} = state.work_hours.weekends
    if (wf >= wt) errors.value.push('Будни: время "от" должно быть меньше "до"')
    if (sf >= st) errors.value.push('Выходные: время "от" должно быть меньше "до"')
  }
  return errors.value.length === 0
}

/* ===== Формирование payload ===== */
const payload = computed(() => {
  const categories_map = {
    A: { ...state.categories_map.A, topics: categoryTopics('A') },
    B: { ...state.categories_map.B, topics: categoryTopics('B') },
    C: { ...state.categories_map.C, topics: categoryTopics('C') },
    D: { ...state.categories_map.D, topics: categoryTopics('D') },
  }

  const nps_timer =
    state.nps_timer === 'custom' && state.nps_timer_custom.trim()
      ? `custom:${state.nps_timer_custom}`
      : state.nps_timer

  const work_hours = {
    mode: state.work_hours.mode,
    weekdays: state.work_hours.weekdays,
    weekends: state.work_hours.weekends,
  }

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
    standards_source: state.standards_source,
    industry: state.industry,
    categories_map,
    ticket_template: {
      base_fields: BASE_TICKET_FIELDS,
      extra_groups_enabled: state.ticket_template.extra_groups_enabled,
      extra_groups_topics: state.ticket_template.extra_groups_topics,
    },
    nps_timer,
    work_hours,
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
  // Здесь можно отправить payload на бэкенд; в v1 просто выводим в консоль
  console.log('SLA configurator payload:', JSON.stringify(payload.value, null, 2))
  submitted.value = true
}
</script>

<template>
  <section class="signal-sla">
    <h2>Конфигуратор Сигнала</h2>
    <p class="subtitle">
      После отправки мы выпустим черновик вашего SLA в тот же день и пришлём на согласование.
    </p>

    <!-- 0. Сведения -->
    <div class="card">
      <h3>О компании</h3>
      <div class="grid2">
        <label>
          Название компании
          <input v-model="state.company.name" type="text" placeholder="ООО Пример" />
        </label>
        <label>
          Локаций к подключению
          <input v-model.number="state.company.locations_connected" type="number" min="1" />
        </label>
      </div>
      <div class="grid2">
        <label>
          Текущий retention: {{ state.company.retention_pct }}%
          <input v-model.number="state.company.retention_pct" type="range" min="50" max="100" step="5" />
        </label>
        <label>
          Инструмент контроля LTV
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
      <label><input type="radio" value="signal" v-model="state.standards_source" /> Стандарты Сигнала</label>
      <label><input type="radio" value="internal" v-model="state.standards_source" /> Внутренние стандарты</label>
    </div>

    <!-- 2. Отрасль -->
    <div class="card">
      <h3>Отрасль</h3>
      <label><input type="radio" value="cafe" v-model="state.industry" /> Общепит</label>
      <label><input type="radio" value="fitness" v-model="state.industry" /> Фитнес</label>
      <p class="hint">Справочники жалоб и подсказок формы подстроятся автоматически.</p>
    </div>

    <!-- 3. Категории A–Г -->
    <div class="card">
      <h3>Категории A–Г</h3>
      <div class="hint">Сроки ответа фиксированы: A — 4ч, Б — 2ч, В — 1ч, Г — 15м; редактирование в форме отключено.</div>

      <div class="owners">
        <div class="owner-col" v-for="k in ['A','B','C','D']" :key="k">
          <h4>Категория {{ k }}</h4>
          <div class="sla-label">
            <span v-if="k==='A'">4 часа</span>
            <span v-else-if="k==='B'">2 часа</span>
            <span v-else-if="k==='C'">1 час</span>
            <span v-else>15 минут</span>
          </div>
          <label>
            Ответственный
            <select v-model="(state.categories_map as any)[k].owner">
              <option value="team">Команда</option>
              <option value="manager">Управляющий</option>
              <option value="custom">Другое</option>
            </select>
          </label>
          <label v-if="(state.categories_map as any)[k].owner === 'custom'">
            Контакт роли
            <input v-model="(state.categories_map as any)[k].contact" type="text" placeholder="@handle или телефон" />
          </label>
          <label>
            Комментарий (границы)
            <input v-model="(state.categories_map as any)[k].notes" type="text" maxlength="200" placeholder="Коротко: чем эта категория отличается" />
          </label>

          <div class="chips">
            <div class="chip" v-for="t in categoryTopics(k as any)" :key="t">
              <span>{{ t }}</span>
              <button type="button" @click="removeFrom(k as any, t)">×</button>
            </div>
          </div>
          <div class="hint small">До 4 тем на категорию.</div>
        </div>
      </div>

      <div class="topics-pool">
        <h4>Список проблем (перетащите в A–Г)</h4>
        <div class="chips">
          <div class="chip pool" v-for="name in unassignedTopics" :key="name">
            <span>{{ name }}</span>
            <div class="assigners">
              <button type="button" :disabled="!canAssignTo('A')" @click="assignTopic(name,'A')">A</button>
              <button type="button" :disabled="!canAssignTo('B')" @click="assignTopic(name,'B')">Б</button>
              <button type="button" :disabled="!canAssignTo('C')" @click="assignTopic(name,'C')">В</button>
              <button type="button" :disabled="!canAssignTo('D')" @click="assignTopic(name,'D')">Г</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 4. Базовый тикет -->
    <div class="card">
      <h3>Базовый шаблон тикета</h3>
      <div class="grid4">
        <label v-for="f in BASE_TICKET_FIELDS" :key="f" class="disabled">
          <input type="checkbox" :checked="true" disabled /> {{ f }}
        </label>
      </div>
      <div class="extras">
        <label>
          Добавить дополнительные группы?
          <select v-model="state.ticket_template.extra_groups_enabled">
            <option :value="false">Нет</option>
            <option :value="true">Да</option>
          </select>
        </label>
        <div v-if="state.ticket_template.extra_groups_enabled">
          <p class="hint">Выберите темы, для которых при внедрении добавим специальные поля тикета.</p>
          <div class="grid3">
            <label v-for="t in topics" :key="t.category">
              <input type="checkbox"
                     :value="t.category"
                     v-model="state.ticket_template.extra_groups_topics" />
              {{ t.category }}
            </label>
          </div>
        </div>
      </div>
    </div>

    <!-- 5. Таймер NPS -->
    <div class="card">
      <h3>Таймер запроса NPS</h3>
      <div class="grid4">
        <label><input type="radio" value="60m" v-model="state.nps_timer" /> 60 минут</label>
        <label><input type="radio" value="1d" v-model="state.nps_timer" /> 1 день</label>
        <label><input type="radio" value="3d" v-model="state.nps_timer" /> 3 дня</label>
        <label><input type="radio" value="custom" v-model="state.nps_timer" /> Другое</label>
      </div>
      <div v-if="state.nps_timer === 'custom'">
        <input v-model="state.nps_timer_custom" type="text" placeholder="например 90m или 2d" />
      </div>
    </div>

    <!-- 6. Режим работы -->
    <div class="card">
      <h3>Режим работы</h3>
      <label><input type="radio" value="wk_9_18" v-model="state.work_hours.mode" /> Будни 9–18 МСК</label>
      <label><input type="radio" value="wk_9_18_we" v-model="state.work_hours.mode" /> 9–18 МСК + выходные</label>
      <label><input type="radio" value="extended" v-model="state.work_hours.mode" /> Расширенный</label>

      <div v-if="state.work_hours.mode === 'extended'" class="grid4">
        <label>Будни от <input v-model="state.work_hours.weekdays.from" type="time" /></label>
        <label>Будни до <input v-model="state.work_hours.weekdays.to" type="time" /></label>
        <label>Выходные от <input v-model="state.work_hours.weekends.from" type="time" /></label>
        <label>Выходные до <input v-model="state.work_hours.weekends.to" type="time" /></label>
      </div>
    </div>

    <!-- 7. Скрипты клиента -->
    <div class="card">
      <h3>Скрипты клиента (есть и можем предоставить)</h3>
      <div class="grid3">
        <label v-for="s in availableScripts" :key="s">
          <input type="checkbox" :value="s" v-model="state.client_scripts.has" /> {{ s }}
        </label>
      </div>
    </div>

    <!-- 8. Полная классификация -->
    <div class="card">
      <h3>Полная классификация проблем</h3>
      <label><input type="checkbox" v-model="state.has_full_classification" /> Есть собственная полная классификация</label>
    </div>

    <!-- 9. Немедленная эскалация -->
    <div class="card">
      <h3>Критерии немедленной эскалации (до 30 минут)</h3>
      <div class="grid3">
        <label v-for="e in ESCALATION_CODES" :key="e.code">
          <input type="checkbox" :value="e.code" v-model="state.escalation_immediate" /> {{ e.label }}
        </label>
        <label class="row">
          Другое
          <input v-model="state.escalation_other" type="text" placeholder="Коротко опишите" />
        </label>
      </div>
    </div>

    <!-- 10. Метрики -->
    <div class="card">
      <h3>Цели метрик</h3>
      <div class="metrics">
        <div class="metric">
          <label>Принятие тикетов без доработки: {{ state.metrics_targets.tickets_accepted_pct }}%</label>
          <input type="range" min="0" max="100" v-model.number="state.metrics_targets.tickets_accepted_pct" />
        </div>
        <div class="metric">
          <label>Соответствие рекомендаций решениям: {{ state.metrics_targets.reco_alignment_pct }}%</label>
          <input type="range" min="0" max="100" v-model.number="state.metrics_targets.reco_alignment_pct" />
        </div>
        <div class="metric">
          <label>Получение NPS оценки: {{ state.metrics_targets.nps_collected_pct }}%</label>
          <input type="range" min="0" max="100" v-model.number="state.metrics_targets.nps_collected_pct" />
        </div>
        <div class="metric">
          <label>Средний NPS: {{ state.metrics_targets.nps_avg }}</label>
          <input type="range" min="1" max="10" v-model.number="state.metrics_targets.nps_avg" />
        </div>
        <div class="metric">
          <label>Возврат гостей после жалобы: {{ state.metrics_targets.returns_after_complaint_pct }}%</label>
          <input type="range" min="0" max="100" v-model.number="state.metrics_targets.returns_after_complaint_pct" />
        </div>
        <div class="metric">
          <label>Средняя стоимость компенсации (₽): {{ state.metrics_targets.avg_compensation_rub }}</label>
          <input type="number" min="0" step="10" v-model.number="state.metrics_targets.avg_compensation_rub" />
        </div>
        <div class="metric">
          <label>Время полного закрытия (часы): {{ state.metrics_targets.full_close_time_hours }}</label>
          <input type="number" min="0" step="1" v-model.number="state.metrics_targets.full_close_time_hours" />
        </div>
        <div class="metric">
          <label>Решены без эскалации: {{ state.metrics_targets.resolved_without_escalation_pct }}%</label>
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
            <li>Отрасль: {{ state.industry === 'cafe' ? 'Общепит' : 'Фитнес' }}</li>
            <li>A: {{ categoryTopics('A').join(', ') || '—' }} · роль: {{ state.categories_map.A.owner }} · контакт: {{ state.categories_map.A.contact || '—' }}</li>
            <li>Б: {{ categoryTopics('B').join(', ') || '—' }} · роль: {{ state.categories_map.B.owner }} · контакт: {{ state.categories_map.B.contact || '—' }}</li>
            <li>В: {{ categoryTopics('C').join(', ') || '—' }} · роль: {{ state.categories_map.C.owner }} · контакт: {{ state.categories_map.C.contact || '—' }}</li>
            <li>Г: {{ categoryTopics('D').join(', ') || '—' }} · роль: {{ state.categories_map.D.owner }} · контакт: {{ state.categories_map.D.contact || '—' }}</li>
            <li>NPS таймер: {{ state.nps_timer === 'custom' ? state.nps_timer_custom : state.nps_timer }}</li>
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

          <h4>Метрики (цели)</h4>
          <ul>
            <li>Принятие без доработки: {{ state.metrics_targets.tickets_accepted_pct }}%</li>
            <li>Соответствие рекомендаций: {{ state.metrics_targets.reco_alignment_pct }}%</li>
            <li>Доля полученных NPS: {{ state.metrics_targets.nps_collected_pct }}%</li>
            <li>Средний NPS: {{ state.metrics_targets.nps_avg }}</li>
            <li>Возврат после жалобы: {{ state.metrics_targets.returns_after_complaint_pct }}%</li>
            <li>Средняя компенсация: {{ state.metrics_targets.avg_compensation_rub }} ₽</li>
            <li>Полное закрытие: {{ state.metrics_targets.full_close_time_hours }} ч</li>
            <li>Без эскалации: {{ state.metrics_targets.resolved_without_escalation_pct }}%</li>
          </ul>
        </div>
      </div>

      <details>
        <summary>JSON payload</summary>
        <pre>{{ JSON.stringify(payload, null, 2) }}</pre>
      </details>

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
.signal-sla { max-width: 980px; margin: 0 auto; }
.subtitle { margin-top: -6px; color: #666; }
.card { background: #fff; border: 1px solid #eee; border-radius: 10px; padding: 18px 16px; margin: 14px 0; }
.grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.grid3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }
.grid4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; }
label { display: flex; flex-direction: column; gap: 6px; font-size: 14px; }
input[type="text"], input[type="number"], input[type="time"], select { padding: 8px; border: 1px solid #ddd; border-radius: 6px; }
.hint { color: #666; font-size: 13px; }
.hint.small { font-size: 12px; }
.disabled { opacity: .7; cursor: not-allowed; }
.owners { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; }
.owner-col { border: 1px dashed #e6e6e6; border-radius: 8px; padding: 10px; }
.sla-label { color: #555; font-size: 12px; margin-bottom: 6px; }
.chips { display: flex; flex-wrap: wrap; gap: 6px; }
.chip { display: inline-flex; align-items: center; gap: 6px; padding: 6px 8px; background: #f4f6f8; border-radius: 14px; }
.chip.pool { background: #eef6ff; }
.chip button { border: none; background: transparent; cursor: pointer; font-size: 14px; }
.assigners button { margin-left: 4px; padding: 2px 6px; border: 1px solid #cfe3ff; border-radius: 6px; background: #fff; }
.topics-pool { margin-top: 10px; }
.extras { margin-top: 8px; }
.metrics .metric { margin: 8px 0; }
.summary-cols { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.errors { margin-top: 10px; }
.error { background: #fff4f4; color: #b30000; padding: 8px; border-radius: 6px; margin-bottom: 6px; }
button.primary { margin-top: 10px; padding: 10px 14px; border-radius: 8px; background: #1a73e8; color: #fff; border: none; cursor: pointer; }
.after { color: #2c7a2c; margin-top: 8px; }
@media (max-width: 960px) {
  .grid2, .grid3, .grid4, .owners, .summary-cols { grid-template-columns: 1fr; }
}
</style>
