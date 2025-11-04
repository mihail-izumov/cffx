<script setup lang="ts">
import { reactive, ref, computed, h, watch } from 'vue'
import { Teleport, Transition } from 'vue'

/* Иконки для модалок */
const ChevronIcon = () =>
  h('svg',{class:'chevron-icon',xmlns:'http://www.w3.org/2000/svg',viewBox:'0 0 24 24',fill:'none',stroke:'currentColor','stroke-width':'2','stroke-linecap':'round','stroke-linejoin':'round',width:'20',height:'20'},[
    h('polyline',{points:'6 9 12 15 18 9'})
  ])
const CloseIcon = () =>
  h('svg',{xmlns:'http://www.w3.org/2000/svg',viewBox:'0 0 24 24',fill:'none',stroke:'currentColor','stroke-width':'2','stroke-linecap':'round','stroke-linejoin':'round',width:'24',height:'24'},[
    h('line',{x1:'18',y1:'6',x2:'6',y2:'18'}), h('line',{x1:'6',y1:'6',x2:'18',y2:'18'})
  ])

type Topic = { category: string }
type CategoryKey = 'A'|'B'|'C'|'D'
type Owner = 'team'|'manager'|'custom'

/* Темы (упрощённые, из v3 классификации) */
const CAFE_TOPICS: Topic[] = [
  { category:'Вкус' },{ category:'Чистота' },{ category:'Долгое ожидание' },{ category:'Ошибки в заказе' },
  { category:'Поведение персонала' },{ category:'Инородные предметы' },{ category:'Очереди' },
  { category:'Атмосфера' },{ category:'Упаковка' },{ category:'Коммуникация' },{ category:'Цена' },
  { category:'Профессионализм' },{ category:'Дизайн' },{ category:'Парковка' },
]
const FITNESS_TOPICS: Topic[] = [
  { category:'Переполненность' },{ category:'Чистота' },{ category:'Поведение персонала' },{ category:'Оборудование' },
  { category:'Цена' },{ category:'Расписание' },{ category:'Температура' },{ category:'Качество тренировок' },
  { category:'Опоздание тренера' },{ category:'Атмосфера' },{ category:'Удобства' },{ category:'Договор и отмена' },
]

/* Виджеты, бенефиты и скрипты */
const WIDGETS = {
  cafe: {
    title: 'Общепит',
    icon: '/widget-cafe-icon.svg',
    topics: CAFE_TOPICS,
    benefits: ['Словарь жалоб','Умная форма','Компенсации'],
    scripts: ['Вкус','Долгую подачу','Инородный предмет','Поведение персонала','Чистоту','Температуру'],
    defaultOwners: { A:'team', B:'team', C:'manager', D:'manager' } as Record<CategoryKey,Owner>,
    defaultTopics: {
      A:['Ошибки в заказе','Коммуникация','Цена','Упаковка'],
      B:['Долгое ожидание','Вкус','Чистота'],
      C:['Инородные предметы','Профессионализм','Атмосфера'],
      D:['Угроза здоровью','Скандал','Физическая травма']
    } as Record<CategoryKey,string[]>,
    defaultCompany: 'СуперФуд',
    defaultRetention: 50,
    plannedText: 'Плановый рост с Сигналом (актуальный показатель 55%)',
  },
  fitness: {
    title: 'Фитнес',
    icon: '/widget-fitness-icon.svg',
    topics: FITNESS_TOPICS,
    benefits: ['Словарь жалоб','Умная форма','Эскалации'],
    scripts: ['Переполненность/очереди','Чистоту раздевалок','Оборудование/ремонт','Поведение персонала','Расписание занятий','Температуру/вентиляцию'],
    defaultOwners: { A:'team', B:'team', C:'manager', D:'manager' } as Record<CategoryKey,Owner>,
    defaultTopics: {
      A:['Цена','Расписание','Коммуникация'],
      B:['Чистота','Переполненность','Температура'],
      C:['Оборудование','Поведение персонала'],
      D:['Травма клиента','Угроза здоровью']
    } as Record<CategoryKey,string[]>,
    defaultCompany: 'СуперСпорт',
    defaultRetention: 70,
    plannedText: 'Плановый рост с Сигналом (актуальный показатель 23%)',
  }
} as const
type WidgetKey = keyof typeof WIDGETS

/* SLA-обзор для карточек и группировки в саммари */
const SLA_READY = [
  'Общие положения',
  'Клиентское соглашение',
  'Общие принципы',
  'Алгоритм работы ИИ‑ассистента (10 этапов)',
  'Классификация проблем и рекомендации',
  'Шаблоны тикетов',
  'Расширенные фразы‑шаблоны',
  'Метрики успеха',
  'Технические требования', // убрано «и SLA»
  'Приложения',
]
const SLA_LATER = [
  'Полные скрипты по категориям',
  'Контакты ответственных',
  'Эскалационная матрица',
  'Примеры и кейсы',
]

/* Состояние */
const state = reactive({
  widget: 'cafe' as WidgetKey,

  company: {
    name: '',
    locations_str: '2',
    guests_or_clients: 3000,
    avg_check_or_subscription: 550,
    retention_pct: 50,
    ltv_cards: [] as string[],
    ltv_tool_other: '',
  },

  standards_source: 'internal' as 'internal'|'signal',
  has_full_classification: false,
  client_scripts: [] as string[],

  categories_map: {
    A: { owner:'team' as Owner, contact:'', topics:[] as string[] },
    B: { owner:'team' as Owner, contact:'', topics:[] as string[] },
    C: { owner:'manager' as Owner, contact:'', topics:[] as string[] },
    D: { owner:'manager' as Owner, contact:'', topics:[] as string[] },
  },

  ticket_template: {
    base_fields_ru: ['Код тикета','Дата и время','Имя гостя','Контакт','Локация','Категория','Описание проблемы','Рекомендуемое решение'],
    extra_groups: ['', '', ''] as string[],
  },

  goals: {
    full_close_time_hours: 18,               // 1..24
    resolved_without_escalation_pct: 75,     // операционные
    reco_accuracy_pct: 80,                   // качество
    nps_collected_pct: 95,
    nps_avg: 8,
    returns_after_complaint_pct: 70,         // бизнес
    avg_compensation_rub: 500,
  },

  nps: { step: 60 as 60|1440|4320|-1, custom_hours: 2 },

  work_hours: {
    mode: 'wk_9_18' as 'wk_9_18'|'wk_9_18_we'|'extended',
    weekdays: { from: '09:00', to: '18:00' },
    weekends: { from: '10:00', to: '17:00' },
  },

  contact: { name:'', phone:'' },
})

/* Инициализация и переключение виджета */
function applyWidgetDefaults() {
  const w = WIDGETS[state.widget]
  if (!state.company.name) state.company.name = w.defaultCompany
  state.company.retention_pct = w.defaultRetention
  ;(['A','B','C','D'] as CategoryKey[]).forEach(k => state.categories_map[k].owner = w.defaultOwners[k])
  ;(['A','B','C','D'] as CategoryKey[]).forEach(k => state.categories_map[k].topics = [...w.defaultTopics[k]])
  state.client_scripts = []
}
applyWidgetDefaults()

function onWidgetChange(key: WidgetKey) {
  state.widget = key
  const w = WIDGETS[key]
  state.company.name = w.defaultCompany
  state.company.retention_pct = w.defaultRetention
  applyWidgetDefaults()
}

/* Доступные темы для селектов доп. групп */
const currentTopics = computed<string[]>(() => WIDGETS[state.widget].topics.map(t=>t.category))
function availableExtraFor(index:number): string[] {
  const chosen = state.ticket_template.extra_groups.filter((v,i)=>i!==index && v)
  return currentTopics.value.filter(x=>!chosen.includes(x))
}

/* Модалки */
const isModalOpen = ref(false)
const modalKind = ref<'categories'|'ticket'|'goals_ops'|'goals_quality'|'goals_business'|'sla'|'workhours'>('categories')
function openModal(kind: typeof modalKind.value){ modalKind.value = kind; isModalOpen.value = true; document.body.style.overflow='hidden' }
function closeModal(){ isModalOpen.value=false; document.body.style.overflow='' }

/* UI helpers */
const ltvOptions = ['CRM','BI/Дашборды','Google Sheets','Другое']
function toggleLtvCard(name:string){
  const idx = state.company.ltv_cards.indexOf(name)
  if (idx>=0) state.company.ltv_cards.splice(idx,1)
  else state.company.ltv_cards.push(name)
}
function npsLabel(){
  const mins = state.nps.step===-1 ? state.nps.custom_hours*60 : state.nps.step
  if (mins===60) return '60 минут'
  if (mins===1440) return '1 день'
  if (mins===4320) return '3 дня'
  return `${state.nps.custom_hours} ч (своё)`
}

/* Слежение за режимом «Расширенный» для открытия модалки часов */
watch(()=>state.work_hours.mode,(m)=>{
  if (m==='extended') openModal('workhours')
})

function submitForm(){
  console.log('SLA submit', JSON.parse(JSON.stringify(state)))
}
</script>

<template>
  <section class="signal-sla dark compact">
    <!-- ВИДЖЕТЫ с иконками и чекмарками -->
    <div class="card">
      <div class="widget-row">
        <button class="widget-card" :class="{ active: state.widget==='cafe' }" @click="onWidgetChange('cafe')">
          <div class="widget-head">
            <img :src="WIDGETS.cafe.icon" alt="Общепит" class="widget-icon" />
            <div class="w-title">Общепит</div>
          </div>
          <ul class="checks">
            <li v-for="b in WIDGETS.cafe.benefits" :key="'c'+b">
              <input type="checkbox" checked disabled />
              <span>{{ b }}</span>
            </li>
          </ul>
        </button>

        <button class="widget-card" :class="{ active: state.widget==='fitness' }" @click="onWidgetChange('fitness')">
          <div class="widget-head">
            <img :src="WIDGETS.fitness.icon" alt="Фитнес" class="widget-icon" />
            <div class="w-title">Фитнес</div>
          </div>
          <ul class="checks">
            <li v-for="b in WIDGETS.fitness.benefits" :key="'f'+b">
              <input type="checkbox" checked disabled />
              <span>{{ b }}</span>
            </li>
          </ul>
        </button>
      </div>
    </div>

    <!-- О КОМПАНИИ: 2 колонки desktop / 1 колонка mobile -->
    <div class="card">
      <h3>О компании</h3>
      <div class="grid2 responsive">
        <div class="col">
          <label class="row big-input"><input style="display:none" /><span>Название компании</span></label>
          <input class="company big" v-model="state.company.name" type="text" :placeholder="WIDGETS[state.widget].defaultCompany" />

          <label class="row">
            <input style="display:none" />
            <span>Кол-во локаций</span>
            <input v-model="state.company.locations_str" type="text" placeholder="2" />
          </label>

          <label class="row">
            <input style="display:none" />
            <span v-if="state.widget==='cafe'">Гости/мес</span><span v-else>Клиенты/мес</span>
            <input class="range long" type="range" min="0" max="100000" step="100" v-model.number="state.company.guests_or_clients" />
            <span class="inline-value">{{ state.company.guests_or_clients }}</span>
          </label>

          <label class="row">
            <input style="display:none" />
            <span v-if="state.widget==='cafe'">Средний чек (₽)</span><span v-else>Абонемент/мес (₽)</span>
            <input class="range long" type="range" min="0" max="50000" step="50" v-model.number="state.company.avg_check_or_subscription" />
            <span class="inline-value">{{ state.company.avg_check_or_subscription }} ₽</span>
          </label>
        </div>

        <div class="col">
          <div class="row ltv-ret">
            <div class="ret-block">
              <label class="row">
                <input style="display:none" />
                <span>Текущий retention: <strong>{{ state.company.retention_pct }}%</strong></span>
              </label>
              <input class="range long" type="range" min="0" max="100" v-model.number="state.company.retention_pct" />
              <div class="hint small">{{ WIDGETS[state.widget].plannedText }}</div>
              <a class="linklike small" href="/pro/ltvcalc" target="_blank" rel="noopener">Как считаем</a>
            </div>

            <div class="ltv-block">
              <div class="ltv-title">Инструмент контроля LTV</div>
              <div class="ltv-grid">
                <button v-for="opt in ltvOptions" :key="opt"
                        class="ltv-card" :class="{active: state.company.ltv_cards.includes(opt)}"
                        type="button" @click="toggleLtvCard(opt)">
                  <span>{{ opt }}</span>
                </button>
              </div>
              <input v-if="state.company.ltv_cards.includes('Другое')" v-model="state.company.ltv_tool_other" type="text" class="fullwidth" placeholder="Опишите инструмент" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Источники стандартов -->
    <div class="card">
      <h3>Источники стандартов для Сигнала</h3>
      <div class="radio-left">
        <label class="row"><input type="radio" value="internal" v-model="state.standards_source" /><span>Внутренние стандарты</span></label>
        <label class="row"><input type="radio" value="signal" v-model="state.standards_source" /><span>Стандарты Сигнала</span></label>
      </div>

      <div class="divider"></div>

      <label class="row">
        <input type="checkbox" v-model="state.has_full_classification" />
        <span>Собственная классификация: скрипты</span>
      </label>

      <div v-if="state.has_full_classification" class="checks-grid-2col">
        <label v-for="s in (WIDGETS as any)[state.widget].scripts" :key="s" class="row">
          <input type="checkbox" :value="s" v-model="state.client_scripts" />
          <span>{{ s }}</span>
        </label>
      </div>
    </div>

    <!-- Цели (три кнопки + заголовок внутри) -->
    <div class="card goals-card">
      <h3>Цели</h3>

      <div class="goals-row">
        <div>
          <div class="goal-title">Операционные</div>
          <div class="goal-line">Полное закрытие: {{ state.goals.full_close_time_hours }} ч; Без эскалации: {{ state.goals.resolved_without_escalation_pct }}%</div>
        </div>
        <button class="linklike" @click="openModal('goals_ops')">Изменить</button>
      </div>

      <div class="goals-row">
        <div>
          <div class="goal-title">Качество</div>
          <div class="goal-line">Точность: {{ state.goals.reco_accuracy_pct }}%; Получение NPS: {{ state.goals.nps_collected_pct }}%; NPS: {{ state.goals.nps_avg }}</div>
        </div>
        <button class="linklike" @click="openModal('goals_quality')">Изменить</button>
      </div>

      <div class="goals-row">
        <div>
          <div class="goal-title">Бизнес</div>
          <div class="goal-line">Возврат: {{ state.goals.returns_after_complaint_pct }}%; Компенсация: {{ state.goals.avg_compensation_rub }} ₽</div>
        </div>
        <button class="linklike" @click="openModal('goals_business')">Изменить</button>
      </div>
    </div>

    <!-- Таймер NPS -->
    <div class="card">
      <h3>Таймер запроса NPS</h3>
      <label class="row"><input style="display:none" /><span>Интервал: <strong>{{ npsLabel() }}</strong></span></label>
      <input class="range long" type="range" :min="0" :max="3" step="1"
             :value="[60,1440,4320,-1].indexOf(state.nps.step)"
             @input="(e:any)=>{ const i=Number(e.target.value); state.nps.step=[60,1440,4320,-1][i] }" />
      <div class="ticks spaced"><span>60м</span><span>1д</span><span>3д</span><span>Другое</span></div>
      <div v-if="state.nps.step===-1" class="grid1">
        <label class="row"><input style="display:none" /><span>Своё (ч)</span><input type="number" min="1" step="1" v-model.number="state.nps.custom_hours" /></label>
      </div>
    </div>

    <!-- Режим работы -->
    <div class="card">
      <h3>Режим работы</h3>
      <div class="radio-left grid2">
        <div class="row"><input type="radio" value="wk_9_18" v-model="state.work_hours.mode" /><span>Будни 9–18 МСК</span></div>
        <div class="row"><input type="radio" value="wk_9_18_we" v-model="state.work_hours.mode" /><span>9–18 МСК + выходные</span></div>
      </div>
      <div class="row" style="margin-top:8px;">
        <input class="radio-big" type="radio" value="extended" v-model="state.work_hours.mode" />
        <span>Расширенный режим (настроить)</span>
      </div>
    </div>

    <!-- Категории A–Г (кратко) -->
    <div class="card">
      <h3>Категории A–Г</h3>
      <div class="mini-ag">
        <div class="mini-badge">Кат. А — 4 часа</div>
        <div class="mini-badge">Кат. Б — 2 часа</div>
        <div class="mini-badge">Кат. В — 1 час</div>
        <div class="mini-badge">Кат. Г — 15 минут</div>
      </div>
      <button class="linklike" @click="openModal('categories')">Изменить роли и темы</button>
    </div>

    <!-- Шаблон тикета (коротко) -->
    <div class="card">
      <h3>Шаблон тикета</h3>
      <div class="goal-line">Базовые поля — UPD после рекомендации</div>
      <div class="goal-line">Доп. группы: {{ state.ticket_template.extra_groups.filter(Boolean).join(', ') || 'не выбрано' }}</div>
      <button class="linklike" @click="openModal('ticket')">Изменить шаблон</button>
    </div>

    <!-- Контакты -->
    <div class="card">
      <h3>Контактные данные</h3>
      <div class="grid2">
        <label class="row"><input style="display:none" /><span>Имя</span><input v-model="state.contact.name" type="text" placeholder="Иван Петров" /></label>
        <label class="row"><input style="display:none" /><span>Телефон</span><input v-model="state.contact.phone" type="text" placeholder="+7 (999) 123-45-67" /></label>
      </div>
    </div>

    <!-- Саммари: SLA (компании) -->
    <div class="card summary onecol">
      <h3>SLA ({{ state.company.name || 'компании' }})</h3>

      <div class="sla-groups">
        <div class="sla-group">
          <div class="sla-group-title">Почти готово</div>
          <ul class="checks">
            <li v-for="t in SLA_READY" :key="'r-'+t"><input type="checkbox" checked disabled /><span>{{ t }}</span></li>
          </ul>
          <button class="linklike small" @click="openModal('sla')">Детали</button>
        </div>

        <div class="sla-group">
          <div class="sla-group-title">Доработать и согласовать позже</div>
          <ul class="checks">
            <li v-for="t in SLA_LATER" :key="'l-'+t"><input type="checkbox" disabled /><span>{{ t }}</span></li>
          </ul>
          <button class="linklike small" @click="openModal('sla')">Детали</button>
        </div>
      </div>

      <div class="cta-row">
        <button class="primary full strong" @click="submitForm">Отправить заявку</button>
      </div>
    </div>

    <!-- МОДАЛКИ -->
    <Teleport to="body">
      <Transition name="pricing-modal">
        <div v-if="isModalOpen" class="pricing-modal-overlay" @click="closeModal">
          <div class="pricing-modal-window" @click.stop>
            <button class="pricing-modal-close" @click="closeModal" aria-label="Закрыть"><CloseIcon /></button>

            <!-- Категории -->
            <template v-if="modalKind==='categories'">
              <div class="pricing-modal-header">НАСТРОЙКИ</div>
              <h2 class="pricing-modal-title">Категории А/Б/В/Г</h2>
              <div class="pricing-modal-body">
                <div class="owner-grid">
                  <div v-for="k in ['A','B','C','D']" :key="k" class="owner-col surface">
                    <h2 class="cat-h2">Категория {{ k==='A'?'А':k==='B'?'Б':k==='C'?'В':'Г' }}</h2>
                    <div class="badge">
                      <span v-if="k==='A'">4 часа</span>
                      <span v-else-if="k==='B'">2 часа</span>
                      <span v-else-if="k==='C'">1 час</span>
                      <span v-else>15 минут</span>
                    </div>

                    <label class="row">
                      <input style="display:none" />
                      <span>Ответственный</span>
                      <select v-model="(state.categories_map as any)[k].owner" class="select-arrow">
                        <option value="team">Команда</option>
                        <option value="manager">Управляющий</option>
                        <option value="custom">Другое</option>
                      </select>
                    </label>
                    <label v-if="(state.categories_map as any)[k].owner==='custom'" class="row">
                      <input style="display:none" />
                      <span>Контакт</span>
                      <input v-model="(state.categories_map as any)[k].contact" type="text" placeholder="@handle или телефон" />
                    </label>

                    <div class="hint small">Темы (без ограничений)</div>
                    <div class="topics-grid compact3">
                      <button
                        v-for="name in (WIDGETS as any)[state.widget].topics.map((t:any)=>t.category)"
                        :key="name"
                        type="button"
                        class="topic-card small"
                        :class="{ selected: (state.categories_map as any)[k].topics.includes(name) }"
                        @click="(() => {
                          const arr = (state.categories_map as any)[k].topics as string[]
                          const i = arr.indexOf(name); if(i>=0){arr.splice(i,1)} else {arr.push(name)}
                        })()"
                      >
                        <input type="checkbox" :checked="(state.categories_map as any)[k].topics.includes(name)" />
                        <span class="t-name">{{ name }}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </template>

            <!-- Шаблон тикета -->
            <template v-else-if="modalKind==='ticket'">
              <div class="pricing-modal-header">ШАБЛОН</div>
              <h2 class="pricing-modal-title">Тикет</h2>
              <div class="pricing-modal-body">
                <h2 class="section-h2">Базовые поля</h2>
                <div class="checks-grid-2col">
                  <label v-for="f in state.ticket_template.base_fields_ru" :key="f" class="row disabled surface">
                    <input type="checkbox" :checked="true" disabled /><span>{{ f }}</span>
                  </label>
                </div>

                <h2 class="section-h2" style="margin-top:14px;">Дополнительные группы</h2>
                <div class="grid1">
                  <div v-for="(_, idx) in 3" :key="'extra-'+idx" class="select-wrapper">
                    <label class="row surface">
                      <input style="display:none" />
                      <span>Группа {{ idx + 1 }}</span>
                      <select v-model="state.ticket_template.extra_groups[idx]" class="select-arrow">
                        <option value="">Не выбрано</option>
                        <option v-for="grp in availableExtraFor(idx)" :key="grp" :value="grp">{{ grp }}</option>
                      </select>
                    </label>
                  </div>
                </div>
              </div>
            </template>

            <!-- Операционные цели -->
            <template v-else-if="modalKind==='goals_ops'">
              <div class="pricing-modal-header">ЦЕЛИ</div>
              <h2 class="pricing-modal-title">Операционные</h2>
              <div class="pricing-modal-body">
                <div class="goal-block surface">
                  <label class="row"><input style="display:none" /><span>Полное закрытие (ч): <strong>{{ state.goals.full_close_time_hours }}</strong></span></label>
                  <input class="range long" type="range" min="1" max="24" v-model.number="state.goals.full_close_time_hours" />
                </div>
                <div class="goal-block surface">
                  <label class="row"><input style="display:none" /><span>Без эскалации: <strong>{{ state.goals.resolved_without_escalation_pct }}%</strong></span></label>
                  <input class="range long" type="range" min="0" max="100" v-model.number="state.goals.resolved_without_escalation_pct" />
                </div>
              </div>
            </template>

            <!-- Цели качества -->
            <template v-else-if="modalKind==='goals_quality'">
              <div class="pricing-modal-header">ЦЕЛИ</div>
              <h2 class="pricing-modal-title">Качество</h2>
              <div class="pricing-modal-body">
                <div class="goal-block surface">
                  <label class="row"><input style="display:none" /><span>Точность рекомендаций: <strong>{{ state.goals.reco_accuracy_pct }}%</strong></span></label>
                  <input class="range long" type="range" min="0" max="100" v-model.number="state.goals.reco_accuracy_pct" />
                </div>
                <div class="goal-block surface">
                  <label class="row"><input style="display:none" /><span>Получение NPS: <strong>{{ state.goals.nps_collected_pct }}%</strong></span></label>
                  <input class="range long" type="range" min="0" max="100" v-model.number="state.goals.nps_collected_pct" />
                </div>
                <div class="goal-block surface">
                  <label class="row"><input style="display:none" /><span>Средний NPS: <strong>{{ state.goals.nps_avg }}</strong></span></label>
                  <input class="range long" type="range" min="1" max="10" v-model.number="state.goals.nps_avg" />
                </div>
              </div>
            </template>

            <!-- Бизнес-цели -->
            <template v-else-if="modalKind==='goals_business'">
              <div class="pricing-modal-header">ЦЕЛИ</div>
              <h2 class="pricing-modal-title">Бизнес</h2>
              <div class="pricing-modal-body">
                <div class="goal-block surface">
                  <label class="row"><input style="display:none" /><span>Возврат после жалобы: <strong>{{ state.goals.returns_after_complaint_pct }}%</strong></span></label>
                  <input class="range long" type="range" min="0" max="100" v-model.number="state.goals.returns_after_complaint_pct" />
                </div>
                <div class="goal-block surface">
                  <label class="row"><input style="display:none" /><span>Средняя компенсация (₽): <strong>{{ state.goals.avg_compensation_rub }}</strong></span></label>
                  <input class="range long" type="range" min="0" max="5000" step="10" v-model.number="state.goals.avg_compensation_rub" />
                </div>
              </div>
            </template>

            <!-- SLA подробности -->
            <template v-else-if="modalKind==='sla'">
              <div class="pricing-modal-header">СТРУКТУРА</div>
              <h2 class="pricing-modal-title">Что включит ваш SLA</h2>
              <div class="pricing-modal-body">
                <div class="sla-cards">
                  <div v-for="t in SLA_READY" :key="'rr-'+t" class="sla-card surface">
                    <div class="sla-title">{{ t }}</div>
                    <div class="sla-note">Раздел включён в черновик</div>
                  </div>
                  <div v-for="t in SLA_LATER" :key="'ll-'+t" class="sla-card surface">
                    <div class="sla-title">{{ t }}</div>
                    <div class="sla-note">Требует согласования</div>
                  </div>
                </div>
              </div>
            </template>

            <style scoped>
.signal-sla.dark { --bg:transparent; --card:#151719; --surface:#f0f2f5; --pad:#e5e7eb; --muted:#9aa3ad; --text:#e8eaed; --line:#2a2d31; --green:#4ade80;
  background: var(--bg); color: var(--text); max-width:980px; margin:0 auto; padding-bottom:20px;
}
h2,h3,h4{margin:0 0 10px}
.card{background:var(--card);border:1px solid var(--line);border-radius:12px;padding:16px 14px;margin:12px 0}
.grid2.responsive { display:grid; grid-template-columns:1fr 1fr; gap:16px;}
.col{display:flex;flex-direction:column;gap:12px}

@media (max-width:900px){ .grid2.responsive{grid-template-columns:1fr} }

.widget-row{display:flex;gap:24px;align-items:flex-start;}
.widget-card{border:1px solid var(--line);border-radius:12px;padding:12px;cursor:pointer;background:#0d0f12;flex:1}
.widget-card.active{border-color:#fff;background:#1a1d20;}
.widget-head{display:flex;align-items:center;gap:8px;}
.widget-icon{width:32px;height:32px;display:inline-block;}
.w-title{font-weight:600;font-size:15px;}
.checks{list-style:none;padding-left:0;}
.checks li{display:flex;align-items:center;gap:8px;margin:2px 0;}
.checks input[type="checkbox"]{accent-color:var(--green);width:16px;height:16px;}
.inline-value{margin-left:8px;color:#fff;font-weight:600;}

.ltv-ret{display:flex;gap:24px;}
.ret-block{flex:1}
.ltv-block{flex:1;}
.ltv-title{font-weight:600;font-size:13px;margin-bottom:6px;}
.ltv-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px;}
.ltv-card{border:1px solid var(--line);padding:12px;border-radius:10px;background:var(--pad);cursor:pointer;}
.ltv-card.active{background:var(--green);color:#222;border-color:var(--green);}
.fullwidth{width:100%;}
.hint.small{color:var(--muted);font-size:12px;margin-bottom:2px;}
.linklike{background:none;border:none;padding:0;color:var(--green);text-decoration:underline;cursor:pointer;}

.divider{width:100%;height:1px;background:var(--pad);margin:16px 0;}
.goals-card{background:#212325;}.goals-row{display:flex;align-items:center;justify-content:space-between;padding-bottom:8px;}
.goal-title{font-weight:600;color:#fff;font-size:14px;margin-bottom:4px;}
.goal-line{font-size:13px;color:#c0c0c0;margin-bottom:4px;}
.ticks.spaced{display:flex;justify-content:space-between;color:var(--muted);font-size:12px;margin-top:6px;margin-bottom:-8px;}
.ticks.spaced span{flex:1;text-align:center;}
.radio-big{accent-color:var(--green);width:24px;height:24px;margin-right:6px;}

.mini-ag{display:flex;gap:8px;flex-wrap:wrap;}
.mini-badge{background:#0b0c0e;border:1.3px solid var(--line);border-radius:999px;padding:5px 10px;font-size:12px;}

.sla-groups{display:grid;grid-template-columns:1fr 1fr;gap:32px;}
@media(max-width:900px){.sla-groups{grid-template-columns:1fr}}
.sla-group-title{font-weight:600;font-size:14px;margin-bottom:8px;}
.sla-group ul{margin:0;padding:0;}
.cta-row{display:flex;gap:12px;margin-top:16px;}
button.primary{padding:14px 16px;border-radius:12px;background:#fff;color:#111;border:1px solid #fff;cursor:pointer;}
button.full{width:100%;}
button.strong{font-weight:700;font-size:18px;}

.pricing-modal-overlay{position:fixed !important;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.75)!important;backdrop-filter:blur(10px)!important;display:flex!important;align-items:center!important;justify-content:center!important;z-index:10000!important;padding:20px!important;}
.pricing-modal-window{background:var(--surface)!important;border-radius:28px!important;width:820px!important;height:680px!important;max-width:100%!important;max-height:90vh!important;position:relative!important;box-shadow:0 20px 60px rgba(0,0,0,0.5)!important;display:flex!important;flex-direction:column!important;overflow:hidden!important;}
.pricing-modal-header{font-size:1rem!important;color:#6e6e73!important;margin-bottom:12px!important;font-weight:500!important;letter-spacing:0.08em!important;padding:60px 80px 0!important;flex-shrink:0!important;}
.pricing-modal-title{font-size:2.135rem!important;font-weight:600!important;color:#1d1d1f!important;margin:0 0 32px 0!important;line-height:1.14!important;padding:0 80px!important;flex-shrink:0!important;}
.pricing-modal-body{padding:0 80px 60px!important;overflow-y:auto!important;flex:1!important;min-height:0!important;}
.pricing-modal-close{position:absolute;top:20px;right:20px;width:44px;height:44px;border-radius:50%;background:#1d1d1f;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all 0.2s ease;color:#f5f5f7;z-index:10;}
.pricing-modal-close:hover{background:#2d2d2f;transform:scale(1.05);}
.surface{background:var(--pad);border-radius:10px;padding:10px;margin-bottom:10px;}
.pad{padding:12px 0;}
.checks-grid-2col{display:grid;grid-template-columns:repeat(2,1fr);gap:6px 10px;}
.row{display:flex;align-items:center;gap:10px;}
.cat-h2{font-size:17px;font-weight:700;margin-bottom:6px;}
.section-h2{font-size:17px;font-weight:700;margin:14px 0 8px;}
.sla-cards{display:grid;grid-template-columns:1fr 1fr;gap:10px;}
.sla-card.surface{background:var(--pad)!important;}
.sla-title{color:#222;font-weight:600;font-size:14px;}
.sla-note{color:#6e6e73;font-size:11px;line-height:1.3;}
.topic-card input[type="checkbox"],.checks input[type="checkbox"]{accent-color:var(--green);width:16px;height:16px;}
@media(max-width:1024px){
  .grid2.responsive{grid-template-columns:1fr}
  .surface{padding:10px 5px;}
  .pricing-modal-window,.pricing-modal-header,.pricing-modal-title,.pricing-modal-body{padding:20px!important}
  .sla-cards{grid-template-columns:1fr}
}
</style>
