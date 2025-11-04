<script setup lang="ts">
import { reactive, ref, computed, h, watch } from 'vue'
import { Teleport, Transition } from 'vue'

// Иконки
const CloseIcon = () => h('svg', {
  xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 24 24', fill: 'none',
  stroke: 'currentColor', 'stroke-width': '2', width: '24', height: '24'
}, [
  h('line', { x1: '18', y1: '6', x2: '6', y2: '18' }),
  h('line', { x1: '6', y1: '6', x2: '18', y2: '18' })
])

type CategoryKey = 'A'|'B'|'C'|'D'
type Owner = 'team'|'manager'|'custom'

const WIDGETS = {
  cafe: {
    title: 'Общепит', icon: '/widget-cafe-icon.svg',
    benefits: ['Словарь жалоб','Умная форма','Компенсации'],
    defaultCompany: 'СуперФуд', defaultRetention: 50, currentRetention: 55,
    defaultTopics: {
      A: ['Ошибки в заказе','Коммуникация','Цена','Упаковка'],
      B: ['Долгое ожидание','Вкус','Чистота'],
      C: ['Инородные предметы','Профессионализм','Атмосфера'],
      D: ['Угроза здоровью','Скандал','Физическая травма','Договор и отмена','Поведение персонала']
    } as Record<CategoryKey,string[]>,
    defaultOwners: { A:'team', B:'team', C:'manager', D:'manager' } as Record<CategoryKey,Owner>,
  },
  fitness: {
    title: 'Фитнес', icon: '/widget-fitness-icon.svg',
    benefits: ['Словарь жалоб','Умная форма','Эскалации'],
    defaultCompany: 'СуперСпорт', defaultRetention: 70, currentRetention: 23,
    defaultTopics: {
      A: ['Цена','Расписание','Коммуникация'],
      B: ['Чистота','Переполненность','Температура'],
      C: ['Оборудование','Поведение персонала'],
      D: ['Травма клиента','Угроза здоровью','Договор и отмена','Поведение персонала']
    } as Record<CategoryKey,string[]>,
    defaultOwners: { A:'team', B:'team', C:'manager', D:'manager' } as Record<CategoryKey,Owner>,
  }
} as const
type WidgetKey = keyof typeof WIDGETS

const SLA_READY = ['Общие положения','Клиентское соглашение','Общие принципы','Алгоритм работы ИИ‑ассистента (10 этапов)','Классификация проблем и рекомендации','Шаблоны тикетов','Расширенные фразы‑шаблоны','Метрики успеха','Технические требования','Приложения']
const SLA_LATER = ['Полные скрипты по категориям','Контакты ответственных','Эскалационная матрица','Примеры и кейсы']

const state = reactive({
  widget: 'cafe' as WidgetKey,
  company: {
    name: '', locations_str: '2', guests_or_clients: 3000, avg_check_or_subscription: 550,
    retention_pct: 50, ltv_cards: [] as string[], ltv_tool_other: '',
  },
  categories_map: {
    A: { owner:'team' as Owner, contact:'', topics:[] as string[] },
    B: { owner:'team' as Owner, contact:'', topics:[] as string[] },
    C: { owner:'manager' as Owner, contact:'', topics:[] as string[] },
    D: { owner:'manager' as Owner, contact:'', topics:[] as string[] },
  },
  ticket_template: {
    base_fields_ru: ['Код тикета','Дата и время','Имя гостя','Контакт','Локация','Категория','Описание проблемы','Рекомендуемое решение','UPD после рекомендации'],
    extra_fields: ['', ''] as string[],
  },
  goals: { full_close_time_hours:18, resolved_without_escalation_pct:75, reco_accuracy_pct:80, nps_collected_pct:95, nps_avg:8, returns_after_complaint_pct:70, avg_compensation_rub:500 },
  nps: { step: 60 as 60|1440|4320|-1, custom_hours: 2 },
  work_hours: { mode: 'wk_9_18' as 'wk_9_18'|'wk_9_18_we'|'extended', weekdays:{from:'09:00',to:'18:00'}, weekends:{from:'10:00',to:'17:00'} },
  contact: { name:'', phone:'' },
})

function applyDefaults() {
  const w = WIDGETS[state.widget]
  if (!state.company.name) state.company.name = w.defaultCompany
  state.company.retention_pct = w.defaultRetention
  ;(['A','B','C','D'] as CategoryKey[]).forEach(k => {
    state.categories_map[k].owner = w.defaultOwners[k]
    state.categories_map[k].topics = [...w.defaultTopics[k]]
  })
}
applyDefaults()

function switchWidget(key: WidgetKey) {
  state.widget = key
  applyDefaults()
}

const topics = computed(() => WIDGETS[state.widget].topics.map(t => t.category))
const availableExtra = computed(() => topics.value.filter(t => !state.ticket_template.extra_fields.includes(t)))

const modal = ref(false)
const modalType = ref<'categories'|'ticket'|'goals_ops'|'goals_quality'|'goals_business'|'sla_ready'|'sla_later'|'workhours'>('categories')
function open(type: typeof modalType.value) { modalType.value = type; modal.value = true; document.body.style.overflow = 'hidden' }
function close() { modal.value = false; document.body.style.overflow = '' }

const ltvOptions = ['CRM','BI/Дашборды','Google Sheets','Другое']
function toggleLtv(name: string) {
  const i = state.company.ltv_cards.indexOf(name)
  i >= 0 ? state.company.ltv_cards.splice(i,1) : state.company.ltv_cards.push(name)
}

function submit() { console.log('SLA:', JSON.parse(JSON.stringify(state))) }
</script>

<template>
  <section class="sla-config dark">

    <!-- 1. Виджеты + компания -->
    <div class="card">
      <div class="widgets">
        <button @click="switchWidget('cafe')" :class="{active: state.widget==='cafe'}" class="widget">
          <img :src="WIDGETS.cafe.icon" class="icon" />
          <div class="title">Общепит</div>
          <ul class="checks" v-if="state.widget==='cafe'">
            <li v-for="b in WIDGETS.cafe.benefits" :key="b"><input type="checkbox" checked disabled><span>{{b}}</span></li>
          </ul>
        </button>
        <button @click="switchWidget('fitness')" :class="{active: state.widget==='fitness'}" class="widget">
          <img :src="WIDGETS.fitness.icon" class="icon" />
          <div class="title">Фитнес</div>
          <ul class="checks" v-if="state.widget==='fitness'">
            <li v-for="b in WIDGETS.fitness.benefits" :key="b"><input type="checkbox" checked disabled><span>{{b}}</span></li>
          </ul>
        </button>
      </div>

      <div class="company">
        <label><span>Компания</span><input v-model="state.company.name" :placeholder="WIDGETS[state.widget].defaultCompany" class="big"></label>

        <label><span>Локаций</span>
          <input type="range" v-model.number="state.company.locations_str" min="1" max="50" class="range">
          <b>{{ state.company.locations_str }}</b>
        </label>

        <label><span>{{ state.widget==='cafe'?'Гости/мес':'Клиенты/мес' }}</span>
          <input type="range" class="range" :min="state.widget==='cafe'?500:200" :max="5000" :step="state.widget==='cafe'?500:200" v-model.number="state.company.guests_or_clients">
          <b>{{ state.company.guests_or_clients }}</b>
        </label>

        <label><span>{{ state.widget==='cafe'?'Средний чек':'Абонемент' }} ₽</span>
          <input type="range" class="range" :min="state.widget==='cafe'?250:1000" :max="state.widget==='cafe'?5000:15000" :step="state.widget==='cafe'?50:1000" v-model.number="state.company.avg_check_or_subscription">
          <b>{{ state.company.avg_check_or_subscription }} ₽</b>
        </label>

        <div class="retention">
          <label><span>Retention <b>{{ state.company.retention_pct }}%</b></span>
            <input type="range" class="range" min="0" max="100" v-model.number="state.company.retention_pct">
          </label>
          <div class="hint">Плановый рост с Сигналом ({{ WIDGETS[state.widget].currentRetention }}%)</div>
        </div>

        <div class="ltv">
          <div class="title">LTV‑инструмент</div>
          <div class="cards">
            <button v-for="o in ltvOptions" :key="o" @click="toggleLtv(o)" :class="{on: state.company.ltv_cards.includes(o)}">{{o}}</button>
          </div>
          <input v-if="state.company.ltv_cards.includes('Другое')" v-model="state.company.ltv_tool_other" placeholder="Опишите" class="other">
        </div>
      </div>
    </div>

    <!-- 2. Цели -->
    <div class="card goals">
      <h3>Цели</h3>
      <div class="row"><div>Операционные: {{state.goals.full_close_time_hours}} ч, {{state.goals.resolved_without_escalation_pct}}% без эскалации</div><button @click="open('goals_ops')" class="link">Изменить</button></div>
      <div class="row"><div>Качество: {{state.goals.reco_accuracy_pct}}% точность, NPS {{state.goals.nps_avg}}</div><button @click="open('goals_quality')" class="link">Изменить</button></div>
      <div class="row"><div>Бизнес: {{state.goals.returns_after_complaint_pct}}% возврат, {{state.goals.avg_compensation_rub}} ₽ компенсация</div><button @click="open('goals_business')" class="link">Изменить</button></div>
    </div>

    <!-- 3. NPS таймер -->
    <div class="card">
      <h3>Таймер NPS</h3>
      <div class="nps-cards">
        <button v-for="{v,l} in [{v:60,l:'60 мин'},{v:1440,l:'1 день'},{v:4320,l:'3 дня'},{v:-1,l:'Другое'}]" :key="v" @click="state.nps.step=v" :class="{on: state.nps.step===v}">{{l}}</button>
      </div>
      <label v-if="state.nps.step===-1"><span>Часы</span><input type="number" min="1" v-model.number="state.nps.custom_hours"></label>
    </div>

    <!-- 4. Режим работы -->
    <div class="card">
      <h3>Режим работы</h3>
      <label><input type="radio" value="wk_9_18" v-model="state.work_hours.mode"> Будни 9–18 МСК</label>
      <label><input type="radio" value="wk_9_18_we" v-model="state.work_hours.mode"> + выходные</label>
      <label><input type="radio" value="extended" v-model="state.work_hours.mode"> Расширенный (<a @click="open('workhours')" class="link">Настроить</a>)</label>
    </div>

    <!-- 5. Категории A–Г -->
    <div class="card">
      <h3>Категории A–Г</h3>
      <div class="badges">
        <div v-for="k in ['A','B','C','D']" :key="k" class="badge">
          <div>Кат. {{k==='A'?'А':k==='B'?'Б':k==='C'?'В':'Г'}} — {{k==='A'?'4 ч':k==='B'?'2 ч':k==='C'?'1 ч':'15 мин'}}</div>
          <div class="owner">{{ state.categories_map[k as CategoryKey].owner==='team'?'Команда':'Управляющий' }}</div>
        </div>
      </div>
      <button @click="open('categories')" class="link">Изменить</button>
    </div>

    <!-- 6. Тикет -->
    <div class="card">
      <h3>Шаблон тикета</h3>
      <div>Базовые: {{ state.ticket_template.base_fields_ru.join(', ') }}</div>
      <div>Доп. поля: {{ state.ticket_template.extra_fields.filter(Boolean).join(', ') || '—' }}</div>
      <button @click="open('ticket')" class="link">Изменить</button>
    </div>

    <!-- 7. Контакты -->
    <div class="card">
      <h3>Контакт</h3>
      <label><span>Имя</span><input v-model="state.contact.name" placeholder="Иван"></label>
      <label><span>Телефон</span><input v-model="state.contact.phone" placeholder="+7 (999) 123-45-67"></label>
    </div>

    <!-- 8. SLA Саммари -->
    <div class="card summary">
      <h2 class="lime">SLA Сигнала для {{ state.company.name||'компании' }}</h2>
      <h2 class="price">₽30.000</h2>
      <div class="note">One-time payment</div>

      <div class="groups">
        <div class="group">
          <div class="title">Почти готово</div>
          <div class="list">{{ SLA_READY.join(', ') }}</div>
          <button @click="open('sla_ready')" class="link">Почти готово</button>
        </div>
        <div class="group">
          <div class="title">Потом</div>
          <div class="list">{{ SLA_LATER.join(', ') }}</div>
          <button @click="open('sla_later')" class="link">Доработать</button>
        </div>
      </div>

      <div class="actions">
        <button @click="submit" class="primary">Отправить на сборку</button>
        <button class="secondary">Save for later</button>
      </div>
    </div>

    <!-- МОДАЛКИ -->
    <Teleport to="body">
      <Transition name="modal">
        <div v-if="modal" class="overlay" @click="close">
          <div class="window" @click.stop>
            <button class="close" @click="close"><CloseIcon/></button>

            <!-- Категории -->
            <template v-if="modalType==='categories'">
              <h2>Категории А/Б/В/Г</h2>
              <div class="grid">
                <div v-for="k in ['A','B','C','D']" :key="k" class="col">
                  <h3>Кат. {{k==='A'?'А':k==='B'?'Б':k==='C'?'В':'Г'}}</h3>
                  <div class="time">{{k==='A'?'4 ч':k==='B'?'2 ч':k==='C'?'1 ч':'15 мин'}}</div>
                  <select v-model="state.categories_map[k as CategoryKey].owner">
                    <option value="team">Команда</option>
                    <option value="manager">Управляющий</option>
                    <option value="custom">Другое</option>
                  </select>
                  <div class="topics">
                    <button v-for="t in topics" :key="t" @click="state.categories_map[k as CategoryKey].topics.includes(t)?state.categories_map[k as CategoryKey].topics.splice(state.categories_map[k as CategoryKey].topics.indexOf(t),1):state.categories_map[k as CategoryKey].topics.push(t)"
                            :class="{on: state.categories_map[k as CategoryKey].topics.includes(t)}">{{t}}</button>
                  </div>
                </div>
              </div>
            </template>

            <!-- Тикет -->
            <template v-else-if="modalType==='ticket'">
              <h2>Шаблон тикета</h2>
              <h4>Базовые поля</h4>
              <div class="list">{{ state.ticket_template.base_fields_ru.join(', ') }}</div>
              <h4>Дополнительные поля (макс. 2)</h4>
              <div class="extra">
                <button v-for="t in availableExtra" :key="t" @click="state.ticket_template.extra_fields.includes(t)?state.ticket_template.extra_fields.splice(state.ticket_template.extra_fields.indexOf(t),1):state.ticket_template.extra_fields.length<2&&state.ticket_template.extra_fields.push(t)"
                        :class="{on: state.ticket_template.extra_fields.includes(t), disabled: !state.ticket_template.extra_fields.includes(t)&&state.ticket_template.extra_fields.length>=2}">{{t}}</button>
              </div>
            </template>

            <!-- SLA готово / потом -->
            <template v-else-if="modalType==='sla_ready'">
              <h2>Почти готово</h2>
              <div class="list big">{{ SLA_READY.join(', ') }}</div>
            </template>
            <template v-else-if="modalType==='sla_later'">
              <h2>Доработать позже</h2>
              <div class="list big">{{ SLA_LATER.join(', ') }}</div>
            </template>

            <!-- Цели -->
            <template v-else-if="/^goals_/.test(modalType)">
              <h2>{{ modalType==='goals_ops'?'Операционные':modalType==='goals_quality'?'Качество':'Бизнес' }}</h2>
              <div class="sliders">
                <template v-if="modalType==='goals_ops'">
                  <label>Закрытие: {{state.goals.full_close_time_hours}} ч<input type="range" min="1" max="24" v-model.number="state.goals.full_close_time_hours"></label>
                  <label>Без эскалации: {{state.goals.resolved_without_escalation_pct}}%<input type="range" min="0" max="100" v-model.number="state.goals.resolved_without_escalation_pct"></label>
                </template>
                <template v-else-if="modalType==='goals_quality'">
                  <label>Точность: {{state.goals.reco_accuracy_pct}}%<input type="range" min="0" max="100" v-model.number="state.goals.reco_accuracy_pct"></label>
                  <label>NPS: {{state.goals.nps_avg}}<input type="range" min="1" max="10" v-model.number="state.goals.nps_avg"></label>
                </template>
                <template v-else>
                  <label>Возврат: {{state.goals.returns_after_complaint_pct}}%<input type="range" min="0" max="100" v-model.number="state.goals.returns_after_complaint_pct"></label>
                  <label>Компенсация: {{state.goals.avg_compensation_rub}} ₽<input type="range" min="0" max="5000" step="50" v-model.number="state.goals.avg_compensation_rub"></label>
                </template>
              </div>
            </template>

            <!-- Рабочие часы -->
            <template v-else-if="modalType==='workhours'">
              <h2>Расширенный график</h2>
              <div class="grid">
                <div>
                  <h4>Будни</h4>
                  <label>От <input type="time" v-model="state.work_hours.weekdays.from"></label>
                  <label>До <input type="time" v-model="state.work_hours.weekdays.to"></label>
                </div>
                <div>
                  <h4>Выходные</h4>
                  <label>От <input type="time" v-model="state.work_hours.weekends.from"></label>
                  <label>До <input type="time" v-model="state.work_hours.weekends.to"></label>
                </div>
              </div>
            </template>
          </div>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>

<style scoped>
.sla-config { --lime:#a3e9b8; --green:#4ade80; --bg:#000; --card:#151719; --text:#e8eaed; --line:#2a2d31; font-family:system-ui; max-width:980px; margin:auto; padding:20px; color:var(--text); }
.card { background:var(--card); border:1px solid var(--line); border-radius:12px; padding:20px; margin:16px 0; }
h2 { font-size:28px; margin:0; color:var(--lime); }
h3 { font-size:18px; margin:0 0 12px; }
.widgets { display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-bottom:24px; }
.widget { border:1px solid var(--line); border-radius:12px; padding:16px; background:#0d0f12; text-align:left; cursor:pointer; }
.widget.active { border-color:white; background:#1a1d20; }
.icon { width:48px; height:48px; }
.title { font-weight:600; font-size:17px; margin:8px 0; }
.checks { margin:8px 0 0; padding:0; list-style:none; }
.checks li { display:flex; gap:8px; align-items:center; font-size:13px; margin:4px 0; }
.checks input { accent-color:var(--green); }

.company > label { display:grid; grid-template-columns:140px 1fr auto; gap:12px; align-items:center; margin:12px 0; }
.company .big { font-size:18px; padding:12px; }
.range { -webkit-appearance:none; height:6px; background:#333; border-radius:3px; }
.range::-webkit-slider-thumb { -webkit-appearance:none; width:20px; height:20px; background:white; border-radius:50%; cursor:pointer; }
b { font-weight:600; color:white; }

.retention .hint { font-size:13px; color:#94a3b8; margin-top:4px; }
.ltv .title { font-weight:600; margin-bottom:8px; }
.ltv .cards { display:grid; grid-template-columns:1fr 1fr; gap:10px; }
.ltv button { padding:12px; border:1px solid var(--line); border-radius:10px; background:#0d0f12; cursor:pointer; }
.ltv button.on { border-color:var(--lime); background:#102114; color:var(--lime); }
.other { margin-top:12px; width:100%; }

.goals .row { display:flex; justify-content:space-between; align-items:center; padding:8px 0; font-size:14px; }
.link { color:var(--lime); text-decoration:underline; font-size:13px; background:none; border:none; cursor:pointer; }

.nps-cards { display:grid; grid-template-columns:repeat(4,1fr); gap:10px; }
.nps-cards button { padding:12px; border:1px solid var(--line); border-radius:10px; background:#0d0f12; cursor:pointer; }
.nps-cards button.on { border-color:var(--lime); background:#102114; color:var(--lime); }

.badges { display:flex; flex-wrap:wrap; gap:12px; margin:12px 0; }
.badge { background:#0b0c0e; border:1px solid var(--line); border-radius:99px; padding:8px 12px; text-align:center; font-size:13px; }
.owner { font-size:11px; color:#94a3b8; margin-top:4px; }

.summary { border:2px solid var(--lime); background:rgba(163,233,184,.05); }
.price { color:white; font-size:28px; margin:8px 0; }
.note { font-size:16px; color:#94a3b8; }
.groups { display:grid; grid-template-columns:1fr 1fr; gap:20px; margin:20px 0; }
.group { background:#0d0f12; border:1px solid var(--line); border-radius:12px; padding:16px; }
.group .title { font-weight:600; margin-bottom:8px; }
.list { font-size:13px; line-height:1.5; color:#e0e0e0; }
.list.big { font-size:14px; }

.actions { display:flex; flex-direction:column; gap:12px; margin-top:24px; }
.primary { background:var(--lime); color:#111; padding:16px; border-radius:12px; font-weight:700; font-size:18px; cursor:pointer; }
.secondary { background:white; color:#111; padding:16px; border-radius:12px; font-weight:600; cursor:pointer; }

/* Модалка */
.overlay { position:fixed; inset:0; background:rgba(0,0,0,.75); backdrop-filter:blur(10px); display:flex; align-items:center; justify-content:center; z-index:9999; padding:20px; }
.window { background:#f5f5f7; border-radius:28px; width:860px; max-width:100%; max-height:90vh; overflow:auto; position:relative; box-shadow:0 20px 60px rgba(0,0,0,.5); color:#1d1d1f; }
.close { position:absolute; top:20px; right:20px; background:#1d1d1f; color:#f5f5f7; width:44px; height:44px; border-radius:50%; display:flex; align-items:center; justify-content:center; cursor:pointer; }
.window > h2 { padding:60px 80px 0; font-size:32px; margin:0; }
.grid { display:grid; grid-template-columns:repeat(4,1fr); gap:20px; padding:0 80px 60px; }
.col { background:#e8e8ed; border-radius:12px; padding:16px; }
.col h3 { margin:0 0 8px; font-size:18px; }
.time { background:#0b0c0e; color:white; padding:4px 8px; border-radius:6px; font-size:12px; width:fit-content; margin-bottom:12px; }
select { width:100%; padding:10px; border-radius:10px; margin-bottom:12px; }
.topics { display:grid; grid-template-columns:1fr 1fr; gap:8px; }
.topics button { padding:8px; border:1px solid #ccc; border-radius:8px; background:white; font-size:13px; }
.topics button.on { border-color:var(--green); background:#102114; color:white; }

.sliders label { display:flex; justify-content:space-between; align-items:center; background:#e8e8ed; padding:12px 16px; border-radius:12px; margin:12px 0; font-size:15px; }
.sliders input[type=range] { width:120px; }

.extra { display:grid; grid-template-columns:repeat(3,1fr); gap:10px; padding:20px 80px 60px; }
.extra button { padding:10px; border:1px solid #ccc; border-radius:10px; background:white; font-size:13px; }
.extra button.on { border-color:var(--green); background:#102114; color:white; }
.extra button.disabled { opacity:0.5; cursor:not-allowed; }

@media (max-width:768px) {
  .widgets,.groups,.nps-cards,.grid { grid-template-columns:1fr; }
  .window > h2,.grid,.extra { padding:20px !important; }
}
</style>
