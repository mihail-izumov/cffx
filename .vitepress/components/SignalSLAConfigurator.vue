<script setup lang="ts">
import { reactive, ref, computed } from 'vue'

/* ===== Локальные константы (без export) ===== */
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

/* NPS: 4 точки ползунка — 60м, 1д, 3д, Другое(-1) */
const NPS_STEPS = [60, 1440, 4320, -1] as const
type NpsStep = typeof NPS_STEPS[number]

/* ===== Состояние ===== */
const state = reactive({
  company: {
    name: '',
    locations_connected: 1, // слайдер 1..30
    retention_pct: 50,
    ltv_tool: '',
    ltv_tool_other: '',
  },
  standards_source: 'internal' as 'internal'|'signal', // по умолчанию Внутренние
  widget: 'cafe' as WidgetKey,

  categories_map: {
    A: { owner: 'team' as 'team'|'manager'|'custom', contact: '', topics: [] as string[] },
    B: { owner: 'manager' as 'team'|'manager'|'custom', contact: '', topics: [] as string[] },
    C: { owner: 'manager' as 'team'|'manager'|'custom', contact: '', topics: [] as string[] },
    D: { owner: 'manager' as 'team'|'manager'|'custom', contact: '', topics: [] as string[] },
  },

  ticket_template: {
    base_fields: BASE_TICKET_FIELDS.map(f => f.key),
    extra_groups_topics: [] as string[], // всегда показываем, но пусто по умолчанию, лимит 3
  },

  nps_step: 60 as NpsStep,
  nps_custom_minutes: 90,

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
    avg_compensation_rub: 500,           // теперь ползунок
    full_close_time_hours: 24,           // теперь ползунок
    resolved_without_escalation_pct: 75,
  }
})

/* ===== Вычисления ===== */
const topics = computed<Topic[]>(() => WIDGETS[state.widget].topics)
const allChosen = computed<string[]>(() => [
  ...state.categories_map.A.topics,
  ...state.categories_map.B.topics,
  ...state.categories_map.C.topics,
  ...state.categories_map.D.topics,
])

function availableFor(cat: 'A'|'B'|'C'|'D') {
  const mine = new Set(state.categories_map[cat].topics)
  return topics.value
    .map(t => t.category)
    .filter(name => mine.has(name) || !allChosen.value.includes(name))
}

function toggleTopic(cat: 'A'|'B'|'C'|'D', name: string) {
  const arr = state.categories_map[cat].topics
  const idx = arr.indexOf(name)
  if (idx >= 0) {
    arr.splice(idx, 1)
  } else {
    if (arr.length >= 4) return
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

/* Доп. группы — лимит 3 шт. */
function toggleExtra(name: string, checked: boolean) {
  const arr = state.ticket_template.extra_groups_topics
  if (checked) {
    if (arr.includes(name)) return
    if (arr.length >= 3) return
    arr.push(name)
  } else {
    const i = arr.indexOf(name)
    if (i >= 0) arr.splice(i, 1)
  }
}

/* ===== Валидация ===== */
const errors = ref<string[]>([])

function validate(): boolean {
  errors.value = []
  if (!state.company.name.trim()) errors.value.push('Укажите название компании')
  if (state.company.locations_connected < 1) errors.value.push('Минимум 1 локация')
  ;(['A','B','C','D'] as const).forEach(k => {
    const c = state.categories_map[k]
    if (c.owner === 'custom' && !c.contact.trim()) errors.value.push(`Категория ${k}: укажите контакт роли`)
    if (c.topics.length > 4) errors.value.push(`Категория ${k}: больше 4 тем`)
  })
  if (state.work_hours.mode === 'extended') {
    const {from: wf, to: wt} = state.work_hours.weekdays
    const {from: sf, to: st} = state.work_hours.weekends
    if (wf >= wt) errors.value.push('Будни: «от» меньше «до»')
    if (sf >= st) errors.value.push('Выходные: «от» меньше «до»')
  }
  return errors.value.length === 0
}

/* ===== Отправка ===== */
const submitted = ref(false)
async function onSubmit() {
  if (!validate()) return
  // в v1 просто лог (интеграцию добавите здесь)
  console.log('SLA configurator payload (v1, no JSON block):', {
    ...state,
    // отправляйте только нужные поля на backend
  })
  submitted.value = true
}

/* ===== Утилиты ===== */
function npsValueMinutes(): number {
  return state.nps_step === -1 ? state.nps_custom_minutes : state.nps_step
}
function npsLabel(): string {
  const mins = npsValueMinutes()
  if (mins === 60) return '60 минут'
  if (mins === 1440) return '1 день'
  if (mins === 4320) return '3 дня'
  return `${mins} минут (другое)`
}
</script>

<template>
  <section class="signal-sla dark compact">
    <h2>Конфигуратор Сигнала</h2>
    <p class="subtitle">
      После отправки — черновик вашего SLA в тот же день, на согласование без звонков.
    </p>

    <!-- 0. Сведения -->
    <div class="card">
      <h3>О компании</h3>
      <div class="grid2">
        <label class="row">
          <input style="display:none" />
          <span>Название компании</span>
          <input v-model="state.company.name" type="text" placeholder="ООО Пример" />
        </label>
        <label class="row">
          <input style="display:none" />
          <span>Локаций к подключению: <strong>{{ state.company.locations_connected }}</strong></span>
          <input class="range long" v-model.number="state.company.locations_connected" type="range" min="1" max="30" step="1" />
        </label>
      </div>
      <div class="grid2">
        <label class="row">
          <input style="display:none" />
          <span>Текущий retention: <strong>{{ state.company.retention_pct }}%</strong></span>
          <input class="range long" v-model.number="state.company.retention_pct" type="range" min="50" max="100" step="5" />
        </label>
        <label class="row">
          <input style="display:none" />
          <span>Инструмент контроля LTV</span>
          <select v-model="state.company.ltv_tool">
            <option value="">Выберите…</option>
            <option>CRM</option>
            <option>BI/Дашборды</option>
            <option>1C</option>
            <option>Google Sheets</option>
            <option value="other">Другое</option>
          </select>
          <input v-if="state.company.ltv_tool==='other'" v-model="state.company.ltv_tool_other" type="text" placeholder="Опишите инструмент" />
        </label>
      </div>
    </div>

    <!-- 1. Виджеты -->
    <div class="card">
      <h3>Выберите виджет</h3>
      <div class="widgets">
        <div class="widget-card" :class="{ active: state.widget==='cafe' }" @click="state.widget='cafe'">
          <div class="w-title">Общепит</div>
          <ul v-if="state.widget==='cafe'" class="checks">
            <li v-for="b in widgetBenefits" :key="'cafe-'+b"><input type="checkbox" checked disabled /><span>{{ b }}</span></li>
          </ul>
        </div>
        <div class="widget-card" :class="{ active: state.widget==='fitness' }" @click="state.widget='fitness'">
          <div class="w-title">Фитнес</div>
          <ul v-if="state.widget==='fitness'" class="checks">
            <li v-for="b in widgetBenefits" :key="'fit-'+b"><input type="checkbox" checked disabled /><span>{{ b }}</span></li>
          </ul>
        </div>
      </div>
      <p class="hint">Справочники жалоб, скрипты и эскалации подстроятся под выбранный виджет автоматически.</p>
    </div>

    <!-- 2. Категории A–Г (по одной карточке в строке) -->
    <div class="card">
      <h3>Категории A–Г</h3>
      <div class="hint">Сроки ответа фиксированы: A — 4ч, Б — 2ч, В — 1ч, Г — 15м.</div>

      <div class="owners owners-1col">
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
            <label class="row">
              <input type="radio" style="display:none" />
              <span>Ответственный</span>
              <select v-model="(state.categories_map as any)[k].owner">
                <option value="team">Команда</option>
                <option value="manager">Управляющий</option>
                <option value="custom">Другое</option>
              </select>
            </label>
            <label v-if="(state.categories_map as any)[k].owner === 'custom'" class="row">
              <input style="display:none" />
              <span>Контакт роли</span>
              <input v-model="(state.categories_map as any)[k].contact" type="text" placeholder="@handle или телефон" />
            </label>
          </div>

          <div class="topics-grid compact3">
            <button
              v-for="name in availableFor(k as any)"
              :key="name"
              type="button"
              class="topic-card small"
              :class="{ selected: (state.categories_map as any)[k].topics.includes(name) }"
              @click="toggleTopic(k as any, name)"
            >
              <input type="checkbox" :checked="(state.categories_map as any)[k].topics.includes(name)" />
              <span class="t-name">{{ name }}</span>
            </button>
          </div>
          <div class="hint small">До 4 тем в каждой категории; выбранные темы автоматически скрываются в других категориях.</div>
        </div>
      </div>
    </div>

    <!-- 3. Немедленная эскалация (перенесено рядом с A–Г) -->
    <div class="card">
      <h3>Критерии немедленной эскалации (до 30 минут)</h3>
      <div class="checks-grid">
        <label v-for="e in ESCALATION_CODES" :key="e.code" class="row">
          <input type="checkbox" :value="e.code" v-model="state.escalation_immediate" />
          <span>{{ e.label }}</span>
        </label>
        <label class="row">
          <input style="display:none" />
          <span>Другое</span>
          <input v-model="state.escalation_other" type="text" placeholder="Коротко опишите" />
        </label>
      </div>
    </div>

    <!-- 4. Тикет: слева базовые, справа доп. группы (лимит 3) -->
    <div class="card">
      <h3>Шаблон тикета</h3>
      <div class="grid2">
        <div>
          <h4>Базовые поля</h4>
          <div class="checks-grid">
            <label v-for="f in BASE_TICKET_FIELDS" :key="f.key" class="row disabled">
              <input type="checkbox" :checked="true" disabled />
              <span>{{ f.label }}</span>
            </label>
          </div>
        </div>
        <div>
          <h4>Дополнительные группы (до 3)</h4>
          <div class="checks-grid">
            <label v-for="t in topics" :key="t.category" class="row">
              <input
                type="checkbox"
                :checked="state.ticket_template.extra_groups_topics.includes(t.category)"
                @change="toggleExtra(t.category, ($event.target as HTMLInputElement).checked)"
              />
              <span>{{ t.category }}</span>
            </label>
          </div>
        </div>
      </div>
    </div>

    <!-- 5. Таймер NPS: 4 точки ползунка -->
    <div class="card">
      <h3>Таймер запроса NPS</h3>
      <label class="row">
        <input style="display:none" />
        <span>Интервал после сообщения гостю: <strong>{{ npsLabel() }}</strong></span>
        <input
          class="range long"
          type="range"
          :min="0" :max="3" step="1"
          :value="NPS_STEPS.indexOf(state.nps_step)"
          @input="(e:any)=>{ const idx=Number(e.target.value); state.nps_step=NPS_STEPS[idx] }"
        />
      </label>
      <div v-if="state.nps_step === -1" class="grid2">
        <label class="row">
          <input style="display:none" />
          <span>Свое значение (в минутах)</span>
          <input type="number" min="30" step="15" v-model.number="state.nps_custom_minutes" />
        </label>
      </div>
      <div class="ticks">
        <span>60м</span><span>1д</span><span>3д</span><span>Другое</span>
      </div>
    </div>

    <!-- 6. Режим работы -->
    <div class="card">
      <h3>Режим работы</h3>
      <div class="radio-left grid3">
        <label class="row"><input type="radio" value="wk_9_18" v-model="state.work_hours.mode" /><span>Будни 9–18 МСК</span></label>
        <label class="row"><input type="radio" value="wk_9_18_we" v-model="state.work_hours.mode" /><span>9–18 МСК + выходные</span></label>
        <label class="row"><input type="radio" value="extended" v-model="state.work_hours.mode" /><span>Расширенный</span></label>
      </div>
      <div v-if="state.work_hours.mode === 'extended'" class="grid4">
        <label class="row"> <input style="display:none" /> <span>Будни от</span> <input v-model="state.work_hours.weekdays.from" type="time" /> </label>
        <label class="row"> <input style="display:none" /> <span>Будни до</span> <input v-model="state.work_hours.weekdays.to" type="time" /> </label>
        <label class="row"> <input style="display:none" /> <span>Выходные от</span> <input v-model="state.work_hours.weekends.from" type="time" /> </label>
        <label class="row"> <input style="display:none" /> <span>Выходные до</span> <input v-model="state.work_hours.weekends.to" type="time" /> </label>
      </div>
    </div>

    <!-- 7. Источник + Скрипты + Классификация (в одном блоке) -->
    <div class="card">
      <h3>Стандарты и материалы</h3>
      <div class="grid2">
        <div>
          <h4>Источник стандартов</h4>
          <div class="radio-left">
            <label class="row"><input type="radio" value="internal" v-model="state.standards_source" /><span>Внутренние стандарты</span></label>
            <label class="row"><input type="radio" value="signal" v-model="state.standards_source" /><span>Стандарты Сигнала</span></label>
          </div>
        </div>
        <div>
          <h4>Скрипты клиента (есть и можем предоставить)</h4>
          <div class="checks-grid">
            <label v-for="s in availableScripts" :key="s" class="row"><input type="checkbox" :value="s" v-model="state.client_scripts.has" /><span>{{ s }}</span></label>
          </div>
          <label class="row">
            <input type="checkbox" v-model="state.has_full_classification" />
            <span>Есть собственная полная классификация</span>
          </label>
        </div>
      </div>
    </div>

    <!-- 8. Метрики (все ползунки длиннее) -->
    <div class="card">
      <h3>Цели метрик</h3>
      <div class="metrics">
        <div class="metric">
          <label class="row"><input style="display:none" /><span>Принятие тикетов без доработки: <strong>{{ state.metrics_targets.tickets_accepted_pct }}%</strong></span></label>
          <input class="range long" type="range" min="0" max="100" v-model.number="state.metrics_targets.tickets_accepted_pct" />
        </div>
        <div class="metric">
          <label class="row"><input style="display:none" /><span>Соответствие рекомендаций решениям: <strong>{{ state.metrics_targets.reco_alignment_pct }}%</strong></span></label>
          <input class="range long" type="range" min="0" max="100" v-model.number="state.metrics_targets.reco_alignment_pct" />
        </div>
        <div class="metric">
          <label class="row"><input style="display:none" /><span>Получение NPS оценки: <strong>{{ state.metrics_targets.nps_collected_pct }}%</strong></span></label>
          <input class="range long" type="range" min="0" max="100" v-model.number="state.metrics_targets.nps_collected_pct" />
        </div>
        <div class="metric">
          <label class="row"><input style="display:none" /><span>Средний NPS: <strong>{{ state.metrics_targets.nps_avg }}</strong></span></label>
          <input class="range long" type="range" min="1" max="10" step="1" v-model.number="state.metrics_targets.nps_avg" />
        </div>
        <div class="metric">
          <label class="row"><input style="display:none" /><span>Возврат гостей после жалобы: <strong>{{ state.metrics_targets.returns_after_complaint_pct }}%</strong></span></label>
          <input class="range long" type="range" min="0" max="100" v-model.number="state.metrics_targets.returns_after_complaint_pct" />
        </div>
        <div class="metric">
          <label class="row"><input style="display:none" /><span>Средняя стоимость компенсации (₽): <strong>{{ state.metrics_targets.avg_compensation_rub }}</strong></span></label>
          <input class="range long" type="range" min="0" max="5000" step="10" v-model.number="state.metrics_targets.avg_compensation_rub" />
        </div>
        <div class="metric">
          <label class="row"><input style="display:none" /><span>Время полного закрытия (часы): <strong>{{ state.metrics_targets.full_close_time_hours }}</strong></span></label>
          <input class="range long" type="range" min="0" max="168" step="1" v-model.number="state.metrics_targets.full_close_time_hours" />
        </div>
        <div class="metric">
          <label class="row"><input style="display:none" /><span>Решены без эскалации: <strong>{{ state.metrics_targets.resolved_without_escalation_pct }}%</strong></span></label>
          <input class="range long" type="range" min="0" max="100" v-model.number="state.metrics_targets.resolved_without_escalation_pct" />
        </div>
      </div>
    </div>

    <!-- Саммари с чек‑списком SLA -->
    <div class="card summary">
      <h3>Саммари: стартовая конфигурация</h3>
      <div class="grid2">
        <div>
          <h4>О компании</h4>
          <ul class="ul">
            <li>Название: {{ state.company.name || '—' }}</li>
            <li>Локаций к подключению: {{ state.company.locations_connected }}</li>
            <li>Retention: {{ state.company.retention_pct }}%</li>
            <li>LTV tool: {{ state.company.ltv_tool === 'other' ? state.company.ltv_tool_other : state.company.ltv_tool || '—' }}</li>
          </ul>

          <h4>Категории и роли</h4>
          <ul class="ul">
            <li>A — роль: {{ state.categories_map.A.owner }}, темы: {{ state.categories_map.A.topics.join(', ') || '—' }}</li>
            <li>Б — роль: {{ state.categories_map.B.owner }}, темы: {{ state.categories_map.B.topics.join(', ') || '—' }}</li>
            <li>В — роль: {{ state.categories_map.C.owner }}, темы: {{ state.categories_map.C.topics.join(', ') || '—' }}</li>
            <li>Г — роль: {{ state.categories_map.D.owner }}, темы: {{ state.categories_map.D.topics.join(', ') || '—' }}</li>
          </ul>

          <h4>Операции</h4>
          <ul class="ul">
            <li>Виджет: {{ WIDGETS[state.widget].title }}</li>
            <li>NPS таймер: {{ npsLabel() }}</li>
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
          <ul class="ul">
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

          <h4>Что включит ваш SLA</h4>
          <ul class="checks ul">
            <li><input type="checkbox" checked disabled /><span>Матрица ролей A–Г</span></li>
            <li><input type="checkbox" checked disabled /><span>Карта проблем по A–Г</span></li>
            <li><input type="checkbox" checked disabled /><span>Шаблон тикета и доп. группы</span></li>
            <li><input type="checkbox" checked disabled /><span>Политика NPS</span></li>
            <li><input type="checkbox" checked disabled /><span>Режим работы</span></li>
            <li><input type="checkbox" checked disabled /><span>Источник стандартов</span></li>
            <li><input type="checkbox" checked disabled /><span>Список ваших скриптов</span></li>
            <li><input type="checkbox" checked disabled /><span>Флаг полной классификации</span></li>
            <li><input type="checkbox" checked disabled /><span>Критерии немедленной эскалации</span></li>
            <li><input type="checkbox" checked disabled /><span>Цели метрик</span></li>
          </ul>
        </div>
      </div>

      <div v-if="errors.length" class="errors">
        <div v-for="e in errors" :key="e" class="error">{{ e }}</div>
      </div>

      <button class="primary full" @click="onSubmit">Отправить заявку</button>
      <p class="after" v-if="submitted">
        Спасибо! Мы выпустим черновик вашего SLA в тот же день и пришлём на согласование.
      </p>
    </div>
  </section>
</template>

<style scoped>
/* Тёмная тема в духе Tesla, компактные шрифты */
.signal-sla.dark { 
  --bg:#0e0f10; --card:#151719; --muted:#9aa3ad; --text:#e8eaed; --line:#2a2d31; --accent:#e6e6e6; 
  background: var(--bg); color: var(--text); padding-bottom: 20px; user-select: text; font-size: 14px;
}
.compact { font-size: 14px; }
h2 { font-size: 22px; margin: 0 0 6px; }
h3 { font-size: 16px; margin: 0 0 8px; }
h4 { font-size: 14px; margin: 0 0 6px; }
.subtitle { margin-top:-6px; color: var(--muted); }

.card { background: var(--card); border:1px solid var(--line); border-radius: 12px; padding: 16px 14px; margin: 12px 0; }
.grid2 { display:grid; grid-template-columns: 1fr 1fr; gap: 10px; }
.grid3 { display:grid; grid-template-columns: repeat(3,1fr); gap: 10px; }
.grid4 { display:grid; grid-template-columns: repeat(4,1fr); gap: 10px; }

.row { display:flex; align-items:center; gap:10px; justify-content:flex-start; }
.row span { min-width: max-content; }
input[type="text"], input[type="number"], input[type="time"], select { padding: 8px 10px; border-radius: 10px; background:#0b0c0e; color:var(--text); border:1px solid var(--line); }
.range { width: 100%; }
.range.long { width: 100%; }

.widgets { display:grid; grid-template-columns: 1fr 1fr; gap:12px; }
.widget-card { border:1px solid var(--line); border-radius:12px; padding:12px; cursor:pointer; transition: border-color .2s, background .2s; }
.widget-card.active { border-color:#fff; background:#1a1d20; }
.w-title { font-weight:600; margin-bottom:4px; }
.checks { list-style:none; padding:0; margin:0; }
.checks li { display:flex; align-items:center; gap:8px; margin:4px 0; }
.checks input { pointer-events:none; }

.owners-1col { display:grid; grid-template-columns: 1fr; gap:10px; }
.owner-col { border:1px dashed var(--line); border-radius:12px; padding:12px; }
.header-row { display:flex; align-items:center; justify-content:space-between; }
.sla-label { color: var(--muted); font-size: 12px; }

/* Темы внутри карточки — компактно, 3 на строку, меньший шрифт */
.topics-grid.compact3 { display:grid; grid-template-columns: repeat(3, 1fr); gap:8px; margin-top:8px; }
.topic-card { display:flex; align-items:center; gap:8px; padding:8px; border:1px solid var(--line); border-radius:10px; background:#0d0f12; color:var(--text); text-align:left; }
.topic-card.small { padding:6px 8px; }
.topic-card.selected { border-color:#8fe38f; background:#102114; }
.topic-card .t-name { font-size: 12px; line-height: 1.2; white-space: normal; }

.hint { color: var(--muted); font-size: 12px; }
.hint.small { font-size: 11px; }

.checks-grid { display:grid; grid-template-columns: repeat(3, 1fr); gap:6px 10px; }
.checks-grid .row { align-items:center; }
.disabled { opacity:.8; cursor:not-allowed; }

.metrics .metric { margin: 8px 0; }
.ticks { display:flex; justify-content:space-between; color:var(--muted); font-size: 12px; margin-top: 4px; }

.ul { list-style: none; padding-left: 0; }
.ul li { margin: 4px 0; display:flex; align-items:center; gap:8px; }

.errors { margin-top:10px; }
.error { background:#2a1212; color:#ffb3b3; padding:8px; border-radius:8px; margin-bottom:6px; border:1px solid #472222; }

button.primary { margin-top: 12px; padding: 12px 16px; border-radius: 12px; background:#ffffff; color:#111; border:1px solid #fff; cursor:pointer; }
button.full { width: 100%; }

@media (max-width: 1024px) {
  .grid2, .grid3, .grid4, .widgets { grid-template-columns: 1fr; }
  .topics-grid.compact3 { grid-template-columns: repeat(2, 1fr); }
  .checks-grid { grid-template-columns: 1fr 1fr; }
}
</style>
