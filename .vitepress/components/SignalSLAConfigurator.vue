<script setup lang="ts">
import { reactive, ref, computed, h } from 'vue'
import { Teleport, Transition } from 'vue'

/* Иконки для ссылок в модалках (стили см. ниже) */
const ChevronIcon = () =>
  h('svg',{class:'chevron-icon',xmlns:'http://www.w3.org/2000/svg',viewBox:'0 0 24 24',fill:'none',stroke:'currentColor','stroke-width':'2','stroke-linecap':'round','stroke-linejoin':'round',width:'20',height:'20'},[
    h('polyline',{points:'6 9 12 15 18 9'})
  ])
const CloseIcon = () =>
  h('svg',{xmlns:'http://www.w3.org/2000/svg',viewBox:'0 0 24 24',fill:'none',stroke:'currentColor','stroke-width':'2','stroke-linecap':'round','stroke-linejoin':'round',width:'24',height:'24'},[
    h('line',{x1:'18',y1:'6',x2:'6',y2:'18'}),
    h('line',{x1:'6',y1:'6',x2:'18',y2:'18'})
  ])

/* Типы */
type Topic = { category: string; percent?: number }
type CategoryKey = 'A'|'B'|'C'|'D'
type Owner = 'team'|'manager'|'custom'

/* Данные (предзаполненные) */
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

const WIDGETS = {
  cafe: {
    title: 'Общепит',
    topics: CAFE_TOPICS,
    defaultOwners: { A:'team', B:'team', C:'manager', D:'manager' } as Record<CategoryKey,Owner>,
    defaultTopics: {
      A:['Ошибки в заказе','Коммуникация','Цена','Упаковка'],
      B:['Долгое ожидание','Вкус','Чистота'],
      C:['Инородные предметы','Профессионализм','Атмосфера'],
      D:['Угроза здоровью','Скандал','Физическая травма'].filter(Boolean) // подсказочные ярлыки
    } as Record<CategoryKey,string[]>,
    scripts:['Вкус','Долгую подачу','Инородный предмет','Поведение персонала','Чистоту','Температуру'],
  },
  fitness: {
    title: 'Фитнес',
    topics: FITNESS_TOPICS,
    defaultOwners: { A:'team', B:'team', C:'manager', D:'manager' } as Record<CategoryKey,Owner>,
    defaultTopics: {
      A:['Цена','Расписание','Коммуникация'].filter(Boolean),
      B:['Чистота','Переполненность','Температура'],
      C:['Оборудование','Поведение персонала'],
      D:['Травма клиента','Угроза здоровью'].filter(Boolean)
    } as Record<CategoryKey,string[]>,
    scripts:['Переполненность/очереди','Чистоту раздевалок','Оборудование/ремонт','Поведение персонала','Расписание занятий','Температуру/вентиляцию'],
  }
} as const
type WidgetKey = keyof typeof WIDGETS

/* Обзор SLA (карточки в саммари, модалка для подробностей) */
type OverviewItem = { title: string; note: string }
const SLA_OVERVIEW: OverviewItem[] = [
  { title:'Общие положения', note:'Структура документа, термины и стороны; как читать SLA.' },
  { title:'Клиентское SLA', note:'Границы сервиса и формат взаимодействия.' },
  { title:'Общие принципы', note:'Принципы качества и принятия решений.' },
  { title:'Алгоритм работы ИИ‑ассистента (10 этапов)', note:'Путь от приёма до NPS.' },
  { title:'Полные скрипты по категориям', note:'Фразы для типовых ситуаций.' },
  { title:'Классификация проблем и рекомендации', note:'Справочник типов и действия.' },
  { title:'Шаблоны тикетов', note:'Базовый и спец. шаблоны.' },
  { title:'Расширенные фразы‑шаблоны', note:'Приветствие, сбор фактов, эмпатия, завершение.' },
  { title:'Контакты ответственных', note:'Матрица ролей и каналы связи.' },
  { title:'Эскалационная матрица', note:'Немедленная/стандартная/плановая.' },
  { title:'Примеры и кейсы', note:'Сертификаты и комплексные разборы.' },
  { title:'Метрики успеха', note:'Операционные, качественные и бизнес‑метрики.' },
  { title:'Технические требования и SLA', note:'Режимы и временные рамки.' },
  { title:'Приложения', note:'Справочники и зоны ответственности.' },
]

/* Состояние (предзаполнено) */
const state = reactive({
  widget: 'cafe' as WidgetKey,

  company: {
    name: '',
    locations_str: '2',
    guests_or_clients: '3000',
    avg_check_or_subscription: '550',
    retention_pct: 50,
    ltv_tool: '',
    ltv_tool_other: '',
  },

  standards_source: 'internal' as 'internal'|'signal',
  has_full_classification: false,
  client_scripts: [] as string[],

  categories_map: {
    A: { owner: 'team' as Owner, contact: '', topics: [] as string[] },
    B: { owner: 'team' as Owner, contact: '', topics: [] as string[] },
    C: { owner: 'manager' as Owner, contact: '', topics: [] as string[] },
    D: { owner: 'manager' as Owner, contact: '', topics: [] as string[] },
  },

  ticket_template: {
    base_fields: ['code','datetime','guest','contact','location','category','problem','recommendation'],
    extra_groups: ['', '', ''] as string[],
  },

  // Цели (по умолчанию, слайдеры в модалке)
  goals: {
    // операционные
    full_close_time_hours: 18, // 1..24
    resolved_without_escalation_pct: 75,
    // качество
    reco_accuracy_pct: 80,
    nps_collected_pct: 95,
    nps_avg: 8,
    // бизнес
    returns_after_complaint_pct: 70,
    avg_compensation_rub: 500,
  },

  // Таймер NPS
  nps: { step: 60 as 60|1440|4320|-1, custom_hours: 2 },

  // Режим работы
  work_hours: {
    mode: 'wk_9_18' as 'wk_9_18'|'wk_9_18_we'|'extended',
    weekdays: { from: '09:00', to: '18:00' },
    weekends: { from: '10:00', to: '17:00' },
  },

  // Контакты
  contact: { name:'', phone:'' },
})

/* Применить пресеты для выбранного виджета */
function applyWidgetDefaults() {
  const w = WIDGETS[state.widget]
  // Название по умолчанию
  if (state.widget === 'cafe' && !state.company.name) state.company.name = 'СуперФуд'
  if (state.widget === 'fitness' && !state.company.name) state.company.name = 'SuperFitness'
  // Роли
  ;(['A','B','C','D'] as CategoryKey[]).forEach(k => {
    state.categories_map[k].owner = w.defaultOwners[k]
  })
  // Темы (без лимита)
  ;(['A','B','C','D'] as CategoryKey[]).forEach(k => {
    state.categories_map[k].topics = [...(w.defaultTopics[k] || [])]
  })
  // Скрипты
  state.client_scripts = []
}
applyWidgetDefaults()

/* Доступные темы (для селектов доп. групп) */
const currentTopics = computed<string[]>(() => WIDGETS[state.widget].topics.map(t=>t.category))
function availableExtraFor(index:number): string[] {
  const chosen = state.ticket_template.extra_groups.filter((v,i)=>i!==index && v)
  return currentTopics.value.filter(x=>!chosen.includes(x))
}

/* Модалки */
const isModalOpen = ref(false)
const modalKind = ref<'categories'|'ticket'|'goals'|'sla'>('categories')
function openModal(kind: typeof modalKind.value){ modalKind.value = kind; isModalOpen.value = true; document.body.style.overflow='hidden' }
function closeModal(){ isModalOpen.value=false; document.body.style.overflow='' }

/* Хелперы UI */
function npsLabel(): string {
  const mins = state.nps.step === -1 ? state.nps.custom_hours*60 : state.nps.step
  if (mins===60) return '60 минут'
  if (mins===1440) return '1 день'
  if (mins===4320) return '3 дня'
  return `${state.nps.custom_hours} ч (своё)`
}

const summarySla = [
  { k:'A', sla:'4 часа' },
  { k:'Б', sla:'2 часа' },
  { k:'В', sla:'1 час' },
  { k:'Г', sla:'15 минут' },
]

function onWidgetChange(k:WidgetKey){
  state.widget = k
  applyWidgetDefaults()
}

function submitForm(){
  // интеграция с бекендом здесь
  console.log('submit', JSON.parse(JSON.stringify(state)))
}
</script>

<template>
  <section class="signal-sla dark compact">
    <h2>Конфигуратор Сигнала</h2>
    <p class="subtitle big">Черновик SLA в тот же день — можно оставить как есть или нажать «Изменить» и настроить под себя.</p>

    <!-- ВИДЖЕТ -->
    <div class="card">
      <h3>Выберите виджет</h3>
      <div class="widgets">
        <button class="widget-card" :class="{ active: state.widget==='cafe' }" @click="onWidgetChange('cafe')">
          <div class="w-title">Общепит</div>
          <div class="w-note">Справочники, скрипты и роли для кафе/ресторанов</div>
        </button>
        <button class="widget-card" :class="{ active: state.widget==='fitness' }" @click="onWidgetChange('fitness')">
          <div class="w-title">Фитнес</div>
          <div class="w-note">Справочники, скрипты и роли для фитнес‑клубов</div>
        </button>
      </div>
    </div>

    <!-- САМЫЕ ВАЖНЫЕ ПОЛЯ (КОМПАНИЯ) -->
    <div class="card">
      <h3>О компании</h3>
      <div class="grid1">
        <label class="row big-input">
          <input style="display:none" />
          <span>Название компании</span>
        </label>
        <input class="company big" v-model="state.company.name" type="text" :placeholder="state.widget==='cafe' ? 'СуперФуд' : 'SuperFitness'" />

        <label class="row">
          <input style="display:none" />
          <span>Локаций к подключению</span>
          <input v-model="state.company.locations_str" type="text" placeholder="2" />
        </label>

        <label class="row">
          <input style="display:none" />
          <span v-if="state.widget==='cafe'">Гости/мес</span><span v-else>Клиенты/мес</span>
          <input v-model="state.company.guests_or_clients" type="text" placeholder="3000" />
        </label>

        <label class="row">
          <input style="display:none" />
          <span v-if="state.widget==='cafe'">Средний чек (₽)</span><span v-else>Абонемент/мес (₽)</span>
          <input v-model="state.company.avg_check_or_subscription" type="text" placeholder="550" />
        </label>

        <label class="row">
          <input style="display:none" />
          <span>Текущий retention: <strong>{{ state.company.retention_pct }}%</strong></span>
          <input class="range long" type="range" min="0" max="100" v-model.number="state.company.retention_pct" />
        </label>

        <label class="row">
          <input style="display:none" />
          <span>Инструмент контроля LTV</span>
          <select v-model="state.company.ltv_tool" class="select-arrow">
            <option value="">Выберите…</option>
            <option>CRM</option>
            <option>BI/Дашборды</option>
            <option>Google Sheets</option>
            <option value="other">Другое</option>
          </select>
        </label>
        <input v-if="state.company.ltv_tool==='other'" v-model="state.company.ltv_tool_other" type="text" class="fullwidth" placeholder="Опишите инструмент (поле на всю ширину)" />
      </div>
    </div>

    <!-- СТАНДАРТЫ И МАТЕРИАЛЫ -->
    <div class="card">
      <h3>Стандарты и материалы</h3>
      <div>
        <h4>Источник стандартов</h4>
        <div class="radio-left">
          <label class="row"><input type="radio" value="internal" v-model="state.standards_source" /><span>Внутренние стандарты</span></label>
          <label class="row"><input type="radio" value="signal" v-model="state.standards_source" /><span>Стандарты Сигнала</span></label>
        </div>

        <h4 style="margin-top:12px;">Скрипты</h4>
        <p class="hint sub">Да = есть и можем предоставить</p>

        <label class="row">
          <input type="checkbox" v-model="state.has_full_classification" />
          <span>Есть собственная полная классификация</span>
        </label>

        <div v-if="state.has_full_classification" class="checks-grid-2col">
          <label v-for="s in (WIDGETS as any)[state.widget].scripts" :key="s" class="row">
            <input type="checkbox" :value="s" v-model="state.client_scripts" />
            <span>{{ s }}</span>
          </label>
        </div>
      </div>
    </div>

    <!-- ЦЕЛИ: КАРТОЧКИ С КНОПКОЙ ИЗМЕНИТЬ -->
    <div class="card">
      <h3>Цели</h3>
    </div>

    <div class="card goals-card">
      <div class="goals-row">
        <div>
          <div class="goal-title">Операционные</div>
          <div class="goal-line">Полное закрытие: {{ state.goals.full_close_time_hours }} ч; Без эскалации: {{ state.goals.resolved_without_escalation_pct }}%</div>
        </div>
        <button class="linklike" @click="openModal('goals')">Изменить</button>
      </div>
      <div class="goals-row">
        <div>
          <div class="goal-title">Качество</div>
          <div class="goal-line">Точность: {{ state.goals.reco_accuracy_pct }}%; Получение NPS: {{ state.goals.nps_collected_pct }}%; NPS: {{ state.goals.nps_avg }}</div>
        </div>
        <button class="linklike" @click="openModal('goals')">Изменить</button>
      </div>
      <div class="goals-row">
        <div>
          <div class="goal-title">Бизнес</div>
          <div class="goal-line">Возврат: {{ state.goals.returns_after_complaint_pct }}%; Компенсация: {{ state.goals.avg_compensation_rub }} ₽</div>
        </div>
        <button class="linklike" @click="openModal('goals')">Изменить</button>
      </div>
    </div>

    <!-- ТАЙМЕР NPS -->
    <div class="card">
      <h3>Таймер запроса NPS</h3>
      <label class="row">
        <input style="display:none" />
        <span>Интервал после сообщения гостю: <strong>{{ npsLabel() }}</strong></span>
      </label>
      <input class="range long" type="range" :min="0" :max="3" step="1"
             :value="[60,1440,4320,-1].indexOf(state.nps.step)"
             @input="(e:any)=>{ const idx=Number(e.target.value); state.nps.step=[60,1440,4320,-1][idx] }" />
      <div class="ticks spaced"><span>60м</span><span>1д</span><span>3д</span><span>Другое</span></div>
      <div v-if="state.nps.step===-1" class="grid1">
        <label class="row"><input style="display:none" /><span>Своё (ч)</span><input type="number" min="1" step="1" v-model.number="state.nps.custom_hours" /></label>
      </div>
    </div>

    <!-- РЕЖИМ РАБОТЫ (полный) -->
    <div class="card">
      <h3>Режим работы</h3>
      <div class="radio-left grid2">
        <div class="row"><input type="radio" value="wk_9_18" v-model="state.work_hours.mode" /><span>Будни 9–18 МСК</span></div>
        <div class="row"><input type="radio" value="wk_9_18_we" v-model="state.work_hours.mode" /><span>9–18 МСК + выходные</span></div>
      </div>
      <div class="row" style="margin-top:8px;">
        <input type="radio" value="extended" v-model="state.work_hours.mode" />
        <span>Расширенный режим</span>
      </div>
      <div v-if="state.work_hours.mode==='extended'" class="grid4">
        <label class="row"><input style="display:none" /><span>Будни от</span><input v-model="state.work_hours.weekdays.from" type="time" /></label>
        <label class="row"><input style="display:none" /><span>Будни до</span><input v-model="state.work_hours.weekdays.to" type="time" /></label>
        <label class="row"><input style="display:none" /><span>Выходные от</span><input v-model="state.work_hours.weekends.from" type="time" /></label>
        <label class="row"><input style="display:none" /><span>Выходные до</span><input v-model="state.work_hours.weekends.to" type="time" /></label>
      </div>
    </div>

    <!-- КОРОТКИЕ КАРТОЧКИ A–Г + КНОПКА НАСТРОЙКИ -->
    <div class="card">
      <h3>Категории A–Г</h3>
      <div class="mini-ag">
        <div v-for="it in summarySla" :key="it.k" class="mini-badge">Кат. {{ it.k }} — {{ it.sla }}</div>
      </div>
      <button class="linklike" @click="openModal('categories')">Изменить роли и темы</button>
    </div>

    <!-- ШАБЛОН ТИКЕТА — ССЫЛКА В МОДАЛКУ -->
    <div class="card">
      <h3>Шаблон тикета</h3>
      <div class="goal-line">Базовые поля: код, дата/время, гость, контакт, локация, категория, проблема, рекомендация</div>
      <div class="goal-line">Доп. группы: {{ state.ticket_template.extra_groups.filter(Boolean).join(', ') || 'не выбрано' }}</div>
      <button class="linklike" @click="openModal('ticket')">Изменить</button>
    </div>

    <!-- КОНТАКТЫ -->
    <div class="card">
      <h3>Контактные данные</h3>
      <div class="grid2">
        <label class="row"><input style="display:none" /><span>Имя</span><input v-model="state.contact.name" type="text" placeholder="Иван Петров" /></label>
        <label class="row"><input style="display:none" /><span>Телефон</span><input v-model="state.contact.phone" type="text" placeholder="+7 (999) 123-45-67" /></label>
      </div>
    </div>

    <!-- САММАРИ — карточки SLA + кнопка подробнее (модалка) -->
    <div class="card summary onecol">
      <h3>Почти готово: ваш SLA</h3>

      <div class="sla-cards">
        <div v-for="it in SLA_OVERVIEW" :key="it.title" class="sla-card">
          <div class="sla-title">{{ it.title }}</div>
          <div class="sla-note">{{ it.note }}</div>
        </div>
      </div>

      <div class="cta-row">
        <button class="linklike" @click="openModal('sla')">Показать подробности SLA</button>
        <button class="primary full strong" @click="submitForm">Отправить заявку</button>
      </div>
    </div>

    <!-- МОДАЛКИ -->
    <Teleport to="body">
      <Transition name="pricing-modal">
        <div v-if="isModalOpen" class="pricing-modal-overlay" @click="closeModal">
          <div class="pricing-modal-window" @click.stop>
            <button class="pricing-modal-close" @click="closeModal" aria-label="Закрыть"><CloseIcon /></button>

            <!-- CATEGORIES MODAL -->
            <template v-if="modalKind==='categories'">
              <div class="pricing-modal-header">НАСТРОЙКИ</div>
              <h2 class="pricing-modal-title">Категории A–Г</h2>
              <div class="pricing-modal-body">
                <p class="hint">Роли и темы предзаполнены для «{{ (WIDGETS as any)[state.widget].title }}»; лимитов на темы нет.</p>
                <div class="owner-grid">
                  <div v-for="k in ['A','B','C','D']" :key="k" class="owner-col">
                    <div class="owner-head">
                      <div class="owner-title">Категория {{ k }}</div>
                      <div class="badge">
                        <span v-if="k==='A'">4 часа</span>
                        <span v-else-if="k==='B'">2 часа</span>
                        <span v-else-if="k==='C'">1 час</span>
                        <span v-else>15 минут</span>
                      </div>
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

                    <div class="hint small">Темы</div>
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

            <!-- TICKET MODAL -->
            <template v-else-if="modalKind==='ticket'">
              <div class="pricing-modal-header">НАСТРОЙКИ</div>
              <h2 class="pricing-modal-title">Шаблон тикета</h2>
              <div class="pricing-modal-body">
                <h4>Базовые поля</h4>
                <div class="checks-grid-2col">
                  <label v-for="f in state.ticket_template.base_fields" :key="f" class="row disabled">
                    <input type="checkbox" :checked="true" disabled /><span>{{ f }}</span>
                  </label>
                </div>

                <h4 style="margin-top:14px;">Дополнительные группы (до 3)</h4>
                <div class="grid1">
                  <div v-for="(_, idx) in 3" :key="'extra-'+idx" class="select-wrapper">
                    <label class="row">
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

            <!-- GOALS MODAL -->
            <template v-else-if="modalKind==='goals'">
              <div class="pricing-modal-header">ЦЕЛИ</div>
              <h2 class="pricing-modal-title">Три блока целей</h2>
              <div class="pricing-modal-body">
                <div class="goal-block">
                  <h4>Операционные</h4>
                  <label class="row"><input style="display:none" /><span>Полное закрытие (ч): <strong>{{ state.goals.full_close_time_hours }}</strong></span></label>
                  <input class="range long" type="range" min="1" max="24" v-model.number="state.goals.full_close_time_hours" />
                  <label class="row"><input style="display:none" /><span>Без эскалации: <strong>{{ state.goals.resolved_without_escalation_pct }}%</strong></span></label>
                  <input class="range long" type="range" min="0" max="100" v-model.number="state.goals.resolved_without_escalation_pct" />
                </div>

                <div class="goal-block">
                  <h4>Качество</h4>
                  <label class="row"><input style="display:none" /><span>Точность рекомендаций: <strong>{{ state.goals.reco_accuracy_pct }}%</strong></span></label>
                  <input class="range long" type="range" min="0" max="100" v-model.number="state.goals.reco_accuracy_pct" />
                  <label class="row"><input style="display:none" /><span>Получение NPS: <strong>{{ state.goals.nps_collected_pct }}%</strong></span></label>
                  <input class="range long" type="range" min="0" max="100" v-model.number="state.goals.nps_collected_pct" />
                  <label class="row"><input style="display:none" /><span>Средний NPS: <strong>{{ state.goals.nps_avg }}</strong></span></label>
                  <input class="range long" type="range" min="1" max="10" v-model.number="state.goals.nps_avg" />
                </div>

                <div class="goal-block">
                  <h4>Бизнес</h4>
                  <label class="row"><input style="display:none" /><span>Возврат после жалобы: <strong>{{ state.goals.returns_after_complaint_pct }}%</strong></span></label>
                  <input class="range long" type="range" min="0" max="100" v-model.number="state.goals.returns_after_complaint_pct" />
                  <label class="row"><input style="display:none" /><span>Средняя компенсация (₽): <strong>{{ state.goals.avg_compensation_rub }}</strong></span></label>
                  <input class="range long" type="range" min="0" max="5000" step="10" v-model.number="state.goals.avg_compensation_rub" />
                </div>
              </div>
            </template>

            <!-- SLA MODAL -->
            <template v-else>
              <div class="pricing-modal-header">СТРУКТУРА</div>
              <h2 class="pricing-modal-title">Что включит ваш SLA</h2>
              <div class="pricing-modal-body">
                <div class="sla-cards">
                  <div v-for="it in SLA_OVERVIEW" :key="it.title" class="sla-card">
                    <div class="sla-title">{{ it.title }}</div>
                    <div class="sla-note">{{ it.note }}</div>
                  </div>
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
.signal-sla.dark {
  --bg: transparent; --card: #151719; --muted: #9aa3ad; --text: #e8eaed; --line: #2a2d31;
  --green: #4ade80;
  background: var(--bg); color: var(--text); padding-bottom: 20px; font-size: 14px;
  max-width: 980px; margin: 0 auto; overflow-wrap: anywhere; word-break: normal;
}
h2 { font-size: 22px; margin: 0 0 6px; }
h3 { font-size: 16px; margin: 0 0 8px; }
h4 { font-size: 14px; margin: 0 0 6px; }
.subtitle { margin-top: -6px; color: var(--muted); }
.subtitle.big { font-size: 14px; }
.card { background: var(--card); border: 1px solid var(--line); border-radius: 12px; padding: 16px 14px; margin: 12px 0; }
.grid1 { display: grid; grid-template-columns: 1fr; gap: 10px; }
.grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
.grid4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; }
.row { display: flex; align-items: center; gap: 10px; justify-content: flex-start; }
.row span { min-width: max-content; }
input[type="text"], input[type="number"], input[type="time"], select {
  padding: 8px 10px; border-radius: 10px; background: #0b0c0e; color: var(--text); border: 1px solid var(--line); font-size: 14px;
}
.select-arrow { appearance: auto; }
.company.big { font-size: 18px; padding: 12px 14px; border-radius: 12px; }
.big-input span { font-size: 13px; color: var(--muted); }
.fullwidth { width: 100%; }

.range { width: 100%; }
.range.long { width: 100%; }

.widgets { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.widget-card {
  border: 1px solid var(--line); border-radius: 12px; padding: 12px; cursor: pointer; background: #0d0f12; text-align: left;
}
.widget-card.active { border-color: #fff; background: #1a1d20; }
.w-title { font-weight: 600; margin-bottom: 2px; }
.w-note { color: var(--muted); font-size: 12px; }

.linklike { background: transparent; border: none; color: #fff; text-decoration: underline; text-decoration-style: dashed; cursor: pointer; }

/* Мини-карточки SLA A–Г */
.mini-ag { display: flex; gap: 8px; flex-wrap: wrap; }
.mini-badge { background: #0b0c0e; border: 1px solid var(--line); border-radius: 999px; padding: 6px 10px; font-size: 12px; }

/* Темы (в модалке Categories) */
.topics-grid.compact3 { display: grid; grid-template-columns: repeat(3,1fr); gap:8px; margin-top:8px; }
.topic-card { display: flex; align-items: center; gap: 8px; padding: 8px; border: 1px solid var(--line); border-radius: 10px; background: #0d0f12; }
.topic-card.small { padding: 6px 8px; }
.topic-card.selected { border-color: var(--green); background: #102114; }
.topic-card input[type="checkbox"] { accent-color: var(--green); width: 14px; height: 14px; }
.t-name { font-size: 12px; line-height: 1.2; }

.checks-grid-2col { display: grid; grid-template-columns: repeat(2, 1fr); gap: 6px 10px; }
.checks-grid-2col .row { align-items: center; }
.checks-grid-2col input[type="checkbox"] { accent-color: var(--green); width: 16px; height: 16px; }
.disabled input[type="checkbox"] { accent-color: #e2e8f0; }

.hint, .hint.small, .hint.sub { color: var(--muted); font-size: 12px; }
.hint.sub { font-size: 11px; margin-top: -4px; margin-bottom: 4px; }
.hint.bigger { font-size: 15px; }

.owner-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.owner-col { border: 1px dashed var(--line); border-radius: 12px; padding: 12px; }
.owner-head { display: flex; align-items: center; justify-content: space-between; }
.owner-title { font-weight: 500; font-size: 14px; }
.badge { background: #0b0c0e; border: 1px solid var(--line); border-radius: 999px; padding: 6px 10px; font-weight:600; font-size:12px; margin-left: 8px;}

.goal-title { font-weight:600; color:#fff; font-size:14px; margin-bottom:4px; }
.goal-line { font-size:13px; color:#c0c0c0; margin-bottom:4px; }
.goals-card { background: #212325; }
.goals-row { display: flex; align-items: center; justify-content: space-between; padding-bottom:8px; }

/* Слайдеры, селекты */
.select-wrapper { display: grid; grid-template-columns: 1fr; gap:10px; }

.radio-left .row, .radio-left { display: flex; align-items: center; gap: 12px; }
.radio-left input[type="radio"] { accent-color: var(--green); width: 16px; height: 16px; }

.sla-cards { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; margin-top:10px; }
.sla-card { background: #0d0f12; border: 1px solid var(--line); border-radius: 10px; padding: 12px; }
.sla-title { color: #fff; font-weight: 500; font-size: 13px; margin-bottom: 4px; }
.sla-note { color: rgba(255,255,255,0.5); font-size: 11px; line-height: 1.3; }

.cta-row { display: flex; gap:12px; align-items:center; margin-top:10px; }
button.primary { padding: 14px 16px; border-radius: 12px; background: #ffffff; color: #111; border: 1px solid #fff; cursor: pointer; }
button.full { width: 100%; }
button.strong { font-weight: 700; font-size: 18px; }
button.linklike { background: none; color: var(--green); font-weight:600; font-size:13px; }

/* Модалка (Apple-style), by pricing-grid */
.pricing-modal-overlay {
  position: fixed !important; top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.75) !important; backdrop-filter: blur(10px) !important; display: flex !important; align-items: center !important; justify-content: center !important; z-index: 10000 !important; padding:20px !important;
}
.pricing-modal-window {
  background: #f5f5f7 !important; border-radius: 28px !important; width: 820px !important; height: 680px !important; max-width: 100% !important; max-height: 90vh !important;
  position: relative !important; box-shadow: 0 20px 60px rgba(0,0,0,0.5) !important; display: flex !important; flex-direction: column !important; overflow: hidden !important;
}
.pricing-modal-close {
  position: absolute; top: 20px; right: 20px; width: 44px; height: 44px; border-radius: 50%; background: #1d1d1f; border:none; cursor:pointer; display: flex; align-items:center; justify-content:center; transition: all 0.2s ease; color: #f5f5f7; z-index:10;
}
.pricing-modal-close:hover { background: #2d2d2f; transform: scale(1.05); }
.pricing-modal-header { font-size: 1rem; color: #6e6e73; margin-bottom: 12px; font-weight: 500; letter-spacing: 0.08em; padding: 60px 80px 0; flex-shrink:0; }
.pricing-modal-title { font-size: 2.135rem; font-weight: 600; color: #1d1d1f; margin: 0 0 32px 0; line-height:1.14; padding: 0 80px; flex-shrink:0; }
.pricing-modal-body { padding: 0 80px 60px; overflow-y: auto; flex:1; min-height:0;}

@media (max-width:1024px){
  .sla-cards { grid-template-columns: 1fr; }
  .owner-grid { grid-template-columns: 1fr; }
  .pricing-modal-window { width: 100vw !important; max-width: none !important; height: auto !important;}
  .pricing-modal-header, .pricing-modal-title, .pricing-modal-body { padding: 20px !important } 
}
</style>
