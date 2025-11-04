<script setup lang="ts">
import { reactive, ref, computed, h, watch } from 'vue'

const CloseIcon = () => h('svg',{xmlns:'http://www.w3.org/2000/svg',viewBox:'0 0 24 24',fill:'none',stroke:'currentColor','stroke-width':'2','stroke-linecap':'round','stroke-linejoin':'round',width:'24',height:'24'},[h('line',{x1:'18',y1:'6',x2:'6',y2:'18'}), h('line',{x1:'6',y1:'6',x2:'18',y2:'18'})])

type Topic = { category: string }
type CategoryKey = 'A'|'B'|'C'|'D'
type Owner = 'team'|'manager'|'custom'

const CAFE_TOPICS: Topic[] = [{category:'Вкус'},{category:'Чистота'},{category:'Долгое ожидание'},{category:'Ошибки в заказе'},{category:'Поведение персонала'},{category:'Инородные предметы'},{category:'Очереди'},{category:'Атмосфера'},{category:'Упаковка'},{category:'Коммуникация'},{category:'Цена'},{category:'Профессионализм'},{category:'Дизайн'},{category:'Парковка'}]
const FITNESS_TOPICS: Topic[] = [{category:'Переполненность'},{category:'Чистота'},{category:'Поведение персонала'},{category:'Оборудование'},{category:'Цена'},{category:'Расписание'},{category:'Температура'},{category:'Качество тренировок'},{category:'Опоздание тренера'},{category:'Атмосфера'},{category:'Удобства'},{category:'Договор и отмена'}]

const WIDGETS = {
  cafe: {
    title:'Общепит', icon:'/widget-cafe-icon.svg', topics:CAFE_TOPICS,
    scripts:['Вкус','Долгая подача','Инородный предмет','Поведение персонала','Чистота','Температура'],
    defaultOwners:{A:'team' as Owner,B:'team' as Owner,C:'manager' as Owner,D:'manager' as Owner},
    defaultTopics:{A:['Ошибки в заказе','Коммуникация','Цена','Упаковка'],B:['Долгое ожидание','Вкус','Чистота'],C:['Инородные предметы','Профессионализм','Атмосфера'],D:['Договор и отмена','Поведение персонала']},
    defaultCompany:'СуперФуд', defaultRetention:50, growthMultiplier:0.55
  },
  fitness: {
    title:'Фитнес', icon:'/widget-fitness-icon.svg', topics:FITNESS_TOPICS,
    scripts:['Переполненность/очереди','Чистота раздевалок','Оборудование/ремонт','Поведение персонала','Расписание занятий','Температура/вентиляция'],
    defaultOwners:{A:'team' as Owner,B:'team' as Owner,C:'manager' as Owner,D:'manager' as Owner},
    defaultTopics:{A:['Цена','Расписание','Коммуникация'],B:['Чистота','Переполненность','Температура'],C:['Оборудование','Поведение персонала'],D:['Договор и отмена','Поведение персонала']},
    defaultCompany:'СуперСпорт', defaultRetention:70, growthMultiplier:0.23
  }
} as const

type WidgetKey = keyof typeof WIDGETS

const SLA_READY_ITEMS=[
  {title:'Виджет Сигнала (базовая версия)',desc:'Публичная страница, живой рейтинг, метрики, брендирование, быстрый отзыв в Яндекс/2ГИС, бейдж «Репутация под защитой»'},
  {title:'Умная форма',desc:'150 цепочек с подсказками, рендер вопросов, переключение гендеров'},
  {title:'Анна (базовая версия)',desc:'Адаптация под ваш тон, продукты и особые ситуации из стандартов (если предоставлено)'},
  {title:'Тикет-система',desc:'Настройка шаблонов тикетов, адаптация под стандарты'},
  {title:'Соглашение об уровне обслуживания (SLA)',desc:''}
]
const SLA_READY_SLA=[
  'Общие положения','Клиентское соглашение','Общие принципы','Алгоритм работы ИИ‑ассистента (10 этапов)','Классификация проблем и рекомендации','Шаблоны тикетов','Расширенные фразы‑шаблоны','Метрики успеха','Технические требования','Приложения'
]
const SLA_LATER=[
  'Полные скрипты по категориям','Контакты ответственных','Эскалационная матрица','Примеры и кейсы'
]

const state = reactive({
  widget:'cafe' as WidgetKey,
  company:{name:'',locations:2,guests_or_clients:3000,avg_check_or_subscription:550,retention_pct:50,ltv_cards:[] as string[],ltv_tool_other:''},
  standards_source:'internal' as 'internal'|'signal',
  has_full_classification:false,
  client_scripts:[] as string[],
  categories_map:{A:{owner:'team' as Owner,contact:'',topics:[] as string[]},B:{owner:'team' as Owner,contact:'',topics:[] as string[]},C:{owner:'manager' as Owner,contact:'',topics:[] as string[]},D:{owner:'manager' as Owner,contact:'',topics:[] as string[]}},
  ticket_template:{base_fields_ru:['Код тикета','Дата и время','Имя гостя','Контакт','Локация','Категория','Описание проблемы','Рекомендуемое решение','UPD после доставки Сигнала'],extra_fields:[] as string[]},
  goals:{full_close_time_hours:18,resolved_without_escalation_pct:75,reco_accuracy_pct:80,nps_collected_pct:95,nps_avg:8,returns_after_complaint_pct:70,avg_compensation_rub:500},
  nps:{step:60 as 60|1440|4320|-1,custom_hours:2},
  work_hours:{mode:'wk_9_18' as 'wk_9_18'|'wk_9_18_we'|'extended',weekdays:{from:'09:00',to:'18:00'},weekends:{from:'10:00',to:'17:00'}},
  contact:{name:'',phone:''},
  terms_accepted:false
})

const isCafe=computed(()=>state.widget==='cafe')
const sliderGuestsMin=computed(()=>isCafe.value?500:200)
const sliderGuestsMax=computed(()=>5000)
const sliderGuestsStep=computed(()=>isCafe.value?500:200)
const sliderMoneyMin=computed(()=>isCafe.value?250:1000)
const sliderMoneyMax=computed(()=>isCafe.value?5000:15000)
const sliderMoneyStep=computed(()=>isCafe.value?50:1000)
const ltvOptions=['CRM','BI/Дашборды','Google Sheets','Другое']
const npsCards=[{label:'60 мин.',value:60},{label:'1 день',value:1440},{label:'3 дня',value:4320},{label:'Другое',value:-1}]
const plannedRetentionText=computed(()=>{
  const current=state.company.retention_pct
  const mult=WIDGETS[state.widget].growthMultiplier
  const planned=Math.round(current*(1+mult))
  return `Плановый рост с Сигналом: ${current} × ${Math.round(mult*100)}% = ${planned}%`
})
const slaTitle=computed(()=>`Сборка Сигнала для ${state.company.name||'компании'}`)
const testDate=computed(()=>{
  const d=new Date()
  d.setDate(d.getDate()+4)
  return d.toLocaleDateString('ru-RU',{day:'2-digit',month:'2-digit',year:'numeric'})
})
const availableScripts=computed(()=>WIDGETS[state.widget].scripts)
const currentTopics=computed(()=>WIDGETS[state.widget].topics.map(t=>t.category))
const allSelectedTopics=computed(()=>{
  const all:string[]=[]
  ;(['A','B','C','D'] as CategoryKey[]).forEach(k=>all.push(...state.categories_map[k].topics))
  return all
})

function getCategoryData(k:string){return state.categories_map[k as CategoryKey]}
function setCategoryOwner(k:string,val:Owner){state.categories_map[k as CategoryKey].owner=val}
function setCategoryContact(k:string,val:string){state.categories_map[k as CategoryKey].contact=val}
function getCategoryTopics(k:string):string[]{return state.categories_map[k as CategoryKey].topics}
function isTopicAvailable(k:string,name:string){
  const current=state.categories_map[k as CategoryKey].topics
  if(current.includes(name))return true
  return!allSelectedTopics.value.includes(name)
}
function toggleCategoryTopic(k:string,name:string){
  const arr=state.categories_map[k as CategoryKey].topics
  const i=arr.indexOf(name)
  if(i>=0)arr.splice(i,1);else arr.push(name)
}

function applyWidgetDefaults(){const w=WIDGETS[state.widget];state.company.name=w.defaultCompany;state.company.retention_pct=w.defaultRetention;(['A','B','C','D'] as CategoryKey[]).forEach(k=>{state.categories_map[k].owner=w.defaultOwners[k];state.categories_map[k].topics=[...w.defaultTopics[k]]});state.client_scripts=[]}
applyWidgetDefaults()

function onWidgetChange(key:WidgetKey){state.widget=key;applyWidgetDefaults()}
function toggleLtvCard(name:string){const i=state.company.ltv_cards.indexOf(name);if(i>=0)state.company.ltv_cards.splice(i,1);else state.company.ltv_cards.push(name)}
function availableExtraFields():string[]{return WIDGETS[state.widget].topics.map(t=>t.category)}
function toggleExtraField(name:string){const arr=state.ticket_template.extra_fields,i=arr.indexOf(name);if(i>=0)arr.splice(i,1);else if(arr.length<2)arr.push(name)}
function selectNps(v:number){state.nps.step=v as any}
const isModalOpen=ref(false)
const modalKind=ref<'categories'|'ticket'|'goals_ops'|'goals_quality'|'goals_business'|'sla_ready'|'sla_later'|'workhours'>('categories')
function openModal(kind:typeof modalKind.value){modalKind.value=kind;isModalOpen.value=true;if(typeof document!=='undefined')document.body.style.overflow='hidden'}
function closeModal(){isModalOpen.value=false;if(typeof document!=='undefined')document.body.style.overflow=''}
function ownerLabel(o:Owner){return o==='team'?'Команда':o==='manager'?'Управляющий':'Другое'}
function submitForm(){if(!state.terms_accepted){alert('Подтвердите согласие с Условиями использования');return}console.log('SLA build request',JSON.parse(JSON.stringify(state)))}
watch(()=>state.work_hours.mode,(m)=>{if(m==='extended')openModal('workhours')})
</script>

<template>
  <section class="signal-sla dark compact">
    <div class="card">
      <div class="widget-row">
        <button class="widget-card" :class="{active:state.widget==='cafe'}" @click="onWidgetChange('cafe')">
          <img :src="WIDGETS.cafe.icon" alt="Общепит" class="widget-icon"/>
          <div class="w-title">Общепит</div>
        </button>
        <button class="widget-card" :class="{active:state.widget==='fitness'}" @click="onWidgetChange('fitness')">
          <img :src="WIDGETS.fitness.icon" alt="Фитнес" class="widget-icon"/>
          <div class="w-title">Фитнес</div>
        </button>
      </div>

      <div class="company-fields">
        <label class="row big-input"><input style="display:none"/><span>Название компании</span></label>
        <input class="company big" v-model="state.company.name" type="text" :placeholder="WIDGETS[state.widget].defaultCompany"/>

        <label class="row"><input style="display:none"/><span>Кол-во локаций</span>
          <input class="range long white" type="range" min="1" max="50" step="1" v-model.number="state.company.locations"/>
          <span class="inline-value">{{state.company.locations}}</span>
        </label>

        <label class="row"><input style="display:none"/>
          <span v-if="isCafe">Гости/мес</span><span v-else>Клиенты/мес</span>
          <input class="range long white" type="range" :min="sliderGuestsMin" :max="sliderGuestsMax" :step="sliderGuestsStep" v-model.number="state.company.guests_or_clients"/>
          <span class="inline-value">{{state.company.guests_or_clients}}</span>
        </label>

        <label class="row"><input style="display:none"/>
          <span v-if="isCafe">Средний чек (₽)</span><span v-else>Абонемент/мес (₽)</span>
          <input class="range long white" type="range" :min="sliderMoneyMin" :max="sliderMoneyMax" :step="sliderMoneyStep" v-model.number="state.company.avg_check_or_subscription"/>
          <span class="inline-value">{{state.company.avg_check_or_subscription}} ₽</span>
        </label>

        <div class="retention-block">
          <label class="row"><input style="display:none"/><span>Retention</span>
            <input class="range long white" type="range" min="0" max="100" v-model.number="state.company.retention_pct"/>
            <span class="inline-value">{{state.company.retention_pct}}%</span>
          </label>
          <div class="hint small">{{plannedRetentionText}} <a class="linklike same" href="/pro/ltvcalc" target="_blank" rel="noopener">(как считаем)</a></div>
        </div>

        <div class="ltv-block">
          <div class="ltv-title">Инструмент контроля LTV</div>
          <div class="ltv-grid">
            <button v-for="opt in ltvOptions" :key="opt" class="ltv-card" :class="{active:state.company.ltv_cards.includes(opt)}" type="button" @click="toggleLtvCard(opt)">{{opt}}</button>
          </div>
          <input v-if="state.company.ltv_cards.includes('Другое')" v-model="state.company.ltv_tool_other" type="text" class="fullwidth ltv-other" placeholder="Как контролируете LTV?"/>
        </div>
      </div>
    </div>

    <div class="card">
      <h3>Источники стандартов для Сигнала</h3>
      <div class="radio-left">
        <label class="row"><input type="radio" value="internal" v-model="state.standards_source"/><span>Внутренние стандарты</span></label>
        <label class="row"><input type="radio" value="signal" v-model="state.standards_source"/><span>Стандарты Сигнала</span></label>
      </div>
      <div class="divider"></div>
      <label class="row"><input type="radio" :checked="state.has_full_classification" @click="state.has_full_classification=!state.has_full_classification"/><span>Собственная классификация: скрипты</span></label>
      <div v-if="state.has_full_classification" class="checks-grid-2col">
        <label v-for="s in availableScripts" :key="s" class="row">
          <input type="checkbox" :value="s" v-model="state.client_scripts"/><span>{{s}}</span>
        </label>
      </div>
    </div>

    <div class="card">
      <h3>Цели</h3>
      <div class="goals-row"><div><div class="goal-title">Операционные</div>
        <div class="goal-line">Полное закрытие: {{state.goals.full_close_time_hours}} ч; Без эскалации: {{state.goals.resolved_without_escalation_pct}}%</div></div>
        <button class="linklike same" @click="openModal('goals_ops')">Изменить</button></div>
      <div class="goals-row"><div><div class="goal-title">Качество</div>
        <div class="goal-line">Точность: {{state.goals.reco_accuracy_pct}}%; Получение NPS: {{state.goals.nps_collected_pct}}%; NPS: {{state.goals.nps_avg}}</div></div>
        <button class="linklike same" @click="openModal('goals_quality')">Изменить</button></div>
      <div class="goals-row"><div><div class="goal-title">Бизнес</div>
        <div class="goal-line">Возврат: {{state.goals.returns_after_complaint_pct}}%; Компенсация: {{state.goals.avg_compensation_rub}} ₽</div></div>
        <button class="linklike same" @click="openModal('goals_business')">Изменить</button></div>
    </div>

    <div class="card">
      <h3>Таймер запроса NPS</h3>
      <div class="nps-cards">
        <button v-for="c in npsCards" :key="c.value" class="nps-card" :class="{active:state.nps.step===c.value}" @click="selectNps(c.value)">{{c.label}}</button>
      </div>
      <div v-if="state.nps.step===-1" class="grid1" style="margin-top:12px">
        <label class="row"><input style="display:none"/><span>Своё (ч)</span><input type="number" min="1" step="1" v-model.number="state.nps.custom_hours"/></label>
      </div>
    </div>

    <div class="card">
      <h3>Режим работы</h3>
      <div class="radio-left grid2">
        <div class="row"><input type="radio" value="wk_9_18" v-model="state.work_hours.mode"/><span>Будни 9–18 МСК</span></div>
        <div class="row"><input type="radio" value="wk_9_18_we" v-model="state.work_hours.mode"/><span>9–18 МСК + выходные</span></div>
      </div>
      <div class="row" style="margin-top:8px;">
        <input class="radio-big" type="radio" value="extended" v-model="state.work_hours.mode"/>
        <span>Расширенный режим — <button class="linklike same" type="button" @click="openModal('workhours')">Настроить</button></span>
      </div>
    </div>

    <div class="card">
      <h3>Категории A–Г</h3>
      <div class="mini-ag">
        <div class="mini-badge">Кат. А — 4 часа<div class="mini-sub">{{ownerLabel(getCategoryData('A').owner)}}</div></div>
        <div class="mini-badge">Кат. Б — 2 часа<div class="mini-sub">{{ownerLabel(getCategoryData('B').owner)}}</div></div>
        <div class="mini-badge">Кат. В — 1 час<div class="mini-sub">{{ownerLabel(getCategoryData('C').owner)}}</div></div>
        <div class="mini-badge">Кат. Г — 15 минут<div class="mini-sub">{{ownerLabel(getCategoryData('D').owner)}}</div></div>
      </div>
      <button class="linklike same" @click="openModal('categories')">Изменить роли и темы</button>
    </div>

    <div class="card">
      <h3>Шаблон тикета</h3>
      <div class="goal-line">Базовые поля: {{state.ticket_template.base_fields_ru.join(', ')}}</div>
      <div class="goal-line">Дополнительные поля: {{state.ticket_template.extra_fields.join(', ')||'не выбрано'}}</div>
      <button class="linklike same" @click="openModal('ticket')">Изменить шаблон</button>
    </div>

    <div class="card summary onecol lime-outline">
      <h2 class="sla-title lime">{{slaTitle}}</h2>
      <h2 class="price">₽50.000</h2>
      <div class="price-note">Плановый тест системы {{state.company.name||'[название компании]'}}: {{testDate}}</div>

      <div class="sla-cards">
        <div v-for="(item,i) in SLA_READY_ITEMS" :key="i" class="sla-card">
          <h3 class="sla-card-title">{{item.title}}</h3>
          <div v-if="item.desc" class="sla-card-desc">{{item.desc}}</div>
          <template v-if="item.title.includes('SLA')">
            <div class="sla-subgroup">
              <div class="sla-subgroup-title">Почти готово</div>
              <button class="linklike same" @click="openModal('sla_ready')">Детали</button>
            </div>
            <div class="sla-subgroup">
              <div class="sla-subgroup-title">Доработать и согласовать</div>
              <button class="linklike same" @click="openModal('sla_later')">Детали</button>
            </div>
          </template>
        </div>
      </div>

      <div class="card contact-in-summary">
        <h3>Контактные данные</h3>
        <div class="contact-grid">
          <label class="row"><input style="display:none"/><span>Имя</span><input v-model="state.contact.name" type="text" placeholder="Иван Петров"/></label>
          <label class="row"><input style="display:none"/><span>Телефон</span><input v-model="state.contact.phone" type="text" placeholder="+7 (999) 123-45-67"/></label>
        </div>
      </div>

      <label class="terms-row"><input type="checkbox" v-model="state.terms_accepted"/><span>Подтверждаю согласие с <a href="/terms" target="_blank" rel="noopener">Условиями использования</a></span></label>

      <div class="cta-row">
        <button class="primary full strong lime-btn" @click="submitForm">Отправить на сборку</button>
        <button class="primary full strong white-btn" type="button">Save for later</button>
      </div>
    </div>

    <Teleport to="body">
      <Transition name="pricing-modal">
        <div v-if="isModalOpen" class="pricing-modal-overlay" @click="closeModal">
          <div class="pricing-modal-window" @click.stop>
            <button class="pricing-modal-close" @click="closeModal" aria-label="Закрыть"><CloseIcon/></button>

            <template v-if="modalKind==='categories'">
              <div class="pricing-modal-header">НАСТРОЙКИ</div>
              <h2 class="pricing-modal-title">Категории А/Б/В/Г</h2>
              <div class="pricing-modal-body">
                <div class="owner-col-single">
                  <div v-for="k in ['A','B','C','D']" :key="k" class="owner-block surface">
                    <h2 class="cat-h2">Категория {{k==='A'?'А':k==='B'?'Б':k==='C'?'В':'Г'}}</h2>
                    <label class="row surface"><input style="display:none"/><span class="black">Ответственный</span>
                      <select :value="getCategoryData(k).owner" @input="(e:any)=>setCategoryOwner(k,e.target.value)" class="select-arrow">
                        <option value="team">Команда</option><option value="manager">Управляющий</option><option value="custom">Другое</option>
                      </select>
                    </label>
                    <label v-if="getCategoryData(k).owner==='custom'" class="row surface"><input style="display:none"/><span class="black">Контакт</span>
                      <input :value="getCategoryData(k).contact" @input="(e:any)=>setCategoryContact(k,e.target.value)" type="text" placeholder="@handle или телефон"/>
                    </label>
                    <div class="topics-grid compact3">
                      <button v-for="name in currentTopics" :key="name" type="button" class="topic-card small" :class="{selected:getCategoryTopics(k).includes(name)}" :disabled="!isTopicAvailable(k,name)" @click="toggleCategoryTopic(k,name)">
                        <input type="checkbox" :checked="getCategoryTopics(k).includes(name)"/><span class="t-name black">{{name}}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </template>

            <template v-else-if="modalKind==='ticket'">
              <div class="pricing-modal-header">ШАБЛОН</div><h2 class="pricing-modal-title">Тикет</h2>
              <div class="pricing-modal-body">
                <h2 class="section-h2">Базовые поля</h2>
                <div class="surface pad black">{{state.ticket_template.base_fields_ru.join(', ')}}</div>
                <h2 class="section-h2" style="margin-top:16px;">Дополнительные поля</h2>
                <div class="extras-grid">
                  <button v-for="f in availableExtraFields()" :key="f" type="button" class="extra-card" :class="{active:state.ticket_template.extra_fields.includes(f)}" @click="toggleExtraField(f)">{{f}}</button>
                </div>
                <div class="hint small black">Можно выбрать не более 2 полей</div>
              </div>
            </template>

            <template v-else-if="modalKind==='goals_ops'">
              <div class="pricing-modal-header">ЦЕЛИ</div><h2 class="pricing-modal-title">Операционные</h2>
              <div class="pricing-modal-body spaced-large">
                <div class="goal-block surface black"><label class="row surface"><input style="display:none"/><span>Полное закрытие (ч): <strong>{{state.goals.full_close_time_hours}}</strong></span></label><input class="range long gray" type="range" min="1" max="24" v-model.number="state.goals.full_close_time_hours"/></div>
                <div class="goal-block surface black"><label class="row surface"><input style="display:none"/><span>Без эскалации: <strong>{{state.goals.resolved_without_escalation_pct}}%</strong></span></label><input class="range long gray" type="range" min="0" max="100" v-model.number="state.goals.resolved_without_escalation_pct"/></div>
              </div>
            </template>

            <template v-else-if="modalKind==='goals_quality'">
              <div class="pricing-modal-header">ЦЕЛИ</div><h2 class="pricing-modal-title">Качество</h2>
              <div class="pricing-modal-body spaced-large">
                <div class="goal-block surface black"><label class="row surface"><input style="display:none"/><span>Точность рекомендаций: <strong>{{state.goals.reco_accuracy_pct}}%</strong></span></label><input class="range long gray" type="range" min="0" max="100" v-model.number="state.goals.reco_accuracy_pct"/></div>
                <div class="goal-block surface black"><label class="row surface"><input style="display:none"/><span>Получение NPS: <strong>{{state.goals.nps_collected_pct}}%</strong></span></label><input class="range long gray" type="range" min="0" max="100" v-model.number="state.goals.nps_collected_pct"/></div>
                <div class="goal-block surface black"><label class="row surface"><input style="display:none"/><span>Средний NPS: <strong>{{state.goals.nps_avg}}</strong></span></label><input class="range long gray" type="range" min="1" max="10" v-model.number="state.goals.nps_avg"/></div>
              </div>
            </template>

            <template v-else-if="modalKind==='goals_business'">
              <div class="pricing-modal-header">ЦЕЛИ</div><h2 class="pricing-modal-title">Бизнес</h2>
              <div class="pricing-modal-body spaced-large">
                <div class="goal-block surface black"><label class="row surface"><input style="display:none"/><span>Возврат после жалобы: <strong>{{state.goals.returns_after_complaint_pct}}%</strong></span></label><input class="range long gray" type="range" min="0" max="100" v-model.number="state.goals.returns_after_complaint_pct"/></div>
                <div class="goal-block surface black"><label class="row surface"><input style="display:none"/><span>Средняя компенсация (₽): <strong>{{state.goals.avg_compensation_rub}}</strong></span></label><input class="range long gray" type="range" min="0" max="5000" step="10" v-model.number="state.goals.avg_compensation_rub"/></div>
              </div>
            </template>

            <template v-else-if="modalKind==='sla_ready'"><div class="pricing-modal-header">ДЕТАЛИ</div><h2 class="pricing-modal-title">Почти готово</h2>
              <div class="pricing-modal-body"><div class="sla-detail-cards">
                <div v-for="(item,i) in SLA_READY_SLA" :key="i" class="sla-detail-card">{{item}}</div>
              </div></div>
            </template>

            <template v-else-if="modalKind==='sla_later'"><div class="pricing-modal-header">ДЕТАЛИ</div><h2 class="pricing-modal-title">Доработать и согласовать</h2>
              <div class="pricing-modal-body"><div class="sla-detail-cards">
                <div v-for="(item,i) in SLA_LATER" :key="i" class="sla-detail-card">{{item}}</div>
              </div></div>
            </template>

            <template v-else>
              <div class="pricing-modal-header">ГРАФИК</div><h2 class="pricing-modal-title">Расширенный режим</h2>
              <div class="pricing-modal-body spaced-large">
                <div class="grid2">
                  <div class="surface pad black"><h4>Будни</h4><label class="row surface"><input style="display:none"/><span>От</span><input v-model="state.work_hours.weekdays.from" type="time" class="time-white"/></label><label class="row surface"><input style="display:none"/><span>До</span><input v-model="state.work_hours.weekdays.to" type="time" class="time-white"/></label></div>
                  <div class="surface pad black"><h4>Выходные</h4><label class="row surface"><input style="display:none"/><span>От</span><input v-model="state.work_hours.weekends.from" type="time" class="time-white"/></label><label class="row surface"><input style="display:none"/><span>До</span><input v-model="state.work_hours.weekends.to" type="time" class="time-white"/></label></div>
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
.signal-sla.dark{--bg:transparent;--card:#151719;--muted:#9aa3ad;--text:#e8eaed;--line:#2a2d31;--green:#4ade80;--green-10:rgba(77,222,128,0.05);--lime:#c5f946;background:var(--bg);color:var(--text);padding-bottom:20px;font-size:14px;max-width:980px;margin:0 auto;overflow-wrap:anywhere}
h2,h3,h4{margin:0 0 6px}h2{font-size:22px}h3{font-size:16px}h4{font-size:14px}
.card{background:var(--card);border:1px solid var(--line);border-radius:12px;padding:16px 14px;margin:12px 0}
.grid1{display:grid;grid-template-columns:1fr;gap:10px}.grid2{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.row{display:flex;align-items:center;gap:10px}.row span{min-width:max-content}
input[type="text"],input[type="number"],input[type="time"],select{padding:8px 10px;border-radius:10px;background:#0b0c0e;color:var(--text);border:1px solid var(--line);font-size:14px}
.time-white{color:#fff !important}
.select-arrow{appearance:auto;padding-right:24px !important}
.company.big{font-size:18px}.fullwidth{width:100%}
.range.white{width:100%;-webkit-appearance:none;background:transparent;height:24px}
.range.white::-webkit-slider-runnable-track{height:4px;background:#fff;border-radius:999px}
.range.white::-moz-range-track{height:4px;background:#fff;border-radius:999px}
.range.white::-webkit-slider-thumb{-webkit-appearance:none;width:18px;height:18px;border-radius:50%;background:#fff;margin-top:-7px;border:none}
.range.white::-moz-range-thumb{width:18px;height:18px;border-radius:50%;background:#fff;border:none}
.range.gray{width:100%;-webkit-appearance:none;background:transparent;height:24px}
.range.gray::-webkit-slider-runnable-track{height:4px;background:#888;border-radius:999px}
.range.gray::-moz-range-track{height:4px;background:#888;border-radius:999px}
.range.gray::-webkit-slider-thumb{-webkit-appearance:none;width:18px;height:18px;border-radius:50%;background:#666;margin-top:-7px;border:none}
.range.gray::-moz-range-thumb{width:18px;height:18px;border-radius:50%;background:#666;border:none}
.inline-value{color:#fff;font-size:13px;min-width:40px;text-align:right}
.widget-row{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:14px}
.widget-card{border:1px solid var(--line);border-radius:12px;padding:12px;background:#0d0f12;text-align:left;cursor:pointer;display:flex;align-items:center;gap:12px}
.widget-card.active{border-color:var(--lime);background:#1a1d20}
.widget-icon{width:56px;height:56px;object-fit:contain;flex-shrink:0}
.w-title{font-weight:700}
.company-fields{display:grid;grid-template-columns:1fr;gap:10px}
.retention-block{display:grid;gap:4px}
.ltv-block{margin-top:6px}
.ltv-title{font-weight:600;margin-bottom:6px}
.ltv-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:10px}
.ltv-card{border:1px solid var(--line);border-radius:12px;padding:10px 12px;background:#0d0f12;text-align:left;cursor:pointer}
.ltv-card.active{border-color:var(--lime);background:#1a1d20}
.ltv-other{margin-top:10px}
.linklike{background:transparent;border:none;color:#fff;text-decoration:underline;text-decoration-style:dashed;cursor:pointer;padding:0}
.linklike.same{font-size:13px}
.hint{color:var(--muted);font-size:12px}.divider{height:1px;background:var(--line);margin:10px 0}
.goal-title{font-weight:700;color:#fff;font-size:14px;margin-bottom:2px}
.goal-line{font-size:13px;color:#c0c0c0}
.goals-row{display:flex;align-items:center;justify-content:space-between;padding:10px 0;border-top:1px solid var(--line)}
.goals-row:first-of-type{border-top:none}
.nps-cards{display:flex;gap:8px}
.nps-card{border:1px solid var(--line);border-radius:12px;padding:10px 16px;background:#0d0f12;color:#e8eaed;cursor:pointer;flex:1;text-align:center}
.nps-card.active{border-color:var(--lime);background:#1a1d20}
.mini-ag{display:flex;gap:8px;flex-wrap:wrap}
.mini-badge{background:#0b0c0e;border:1px solid var(--line);border-radius:12px;padding:8px 10px;font-size:12px}
.mini-sub{color:#9aa3ad;font-size:11px;margin-top:2px}
.lime{color:var(--lime)}
.lime-outline{border-color:var(--lime)!important;background:var(--green-10)}
.sla-title{margin:0 0 6px}.price{margin:0;color:#fff}.price-note{color:#c0c0c0;font-size:14px;margin-bottom:16px}
.sla-cards{display:grid;gap:12px;margin-top:12px}
.sla-card{background:rgba(12,12,14,0.7);border:1px solid var(--line);border-radius:12px;padding:14px}
.sla-card-title{font-size:16px;font-weight:700;margin:0 0 6px}
.sla-card-desc{font-size:12px;color:rgba(255,255,255,0.7);line-height:1.4}
.sla-subgroup{display:flex;justify-content:space-between;align-items:center;margin-top:8px;padding-top:8px;border-top:1px solid var(--line)}
.sla-subgroup-title{font-weight:600;font-size:13px}
.contact-in-summary{background:rgba(12,12,14,0.7);border:1px solid var(--line);margin:16px 0 12px}
.contact-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.terms-row{display:flex;align-items:center;gap:8px;margin-bottom:12px;font-size:13px}
.terms-row input[type="checkbox"]{accent-color:var(--green);width:18px;height:18px}
.terms-row a{color:var(--lime);text-decoration:underline}
button.primary{padding:14px 16px;border-radius:12px;border:1px solid #fff;cursor:pointer}
button.full{width:100%}button.strong{font-weight:700;font-size:18px}
.lime-btn{background:var(--lime);color:#000;border-color:var(--lime)}
.white-btn{background:#fff;color:#000;border-color:#fff}
.cta-row{display:grid;grid-template-columns:1fr;gap:8px;margin-top:10px}
.pricing-modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.75);backdrop-filter:blur(10px);display:flex;align-items:center;justify-content:center;z-index:10000;padding:20px}
.pricing-modal-window{background:#f5f5f7;border-radius:28px;width:880px;max-width:100%;max-height:90vh;box-shadow:0 20px 60px rgba(0,0,0,0.5);display:flex;flex-direction:column;overflow:hidden;position:relative}
.pricing-modal-close{position:absolute;top:20px;right:20px;width:44px;height:44px;border-radius:50%;background:#1d1d1f;border:none;color:#f5f5f7;cursor:pointer;z-index:11;display:flex;align-items:center;justify-content:center}
.pricing-modal-header{font-size:1rem;color:#6e6e73;margin:60px 80px 12px 80px;font-weight:500;letter-spacing:0.08em}
.pricing-modal-title{font-size:2.135rem;font-weight:600;color:#1d1d1f;margin:0 80px 24px 80px}
.pricing-modal-body{padding:0 80px 60px;overflow-y:auto;max-height:calc(90vh - 200px)}
.surface{background:#edeef0;border-radius:12px;padding:8px 10px}
.pad{padding:14px 12px}.black{color:#1d1d1f!important}
.owner-col-single{display:grid;gap:20px}
.owner-block{padding:16px}
.cat-h2,.section-h2{font-size:19px;font-weight:600;color:#1d1d1f;margin:0 0 10px 0}
.topics-grid.compact3{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-top:12px}
.topic-card{display:flex;align-items:center;gap:8px;padding:8px;border:1px solid #d2d3d6;border-radius:10px;background:#f1f2f4;cursor:pointer}
.topic-card.small{padding:6px 8px}
.topic-card.selected{border-color:var(--lime);background:#e7f7ee}
.topic-card:disabled{opacity:0.4;cursor:not-allowed}
.topic-card input[type="checkbox"]{accent-color:var(--green);width:16px;height:16px;pointer-events:none}
.extras-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}
.extra-card{border:1px solid #d2d3d6;border-radius:10px;padding:10px;background:#f1f2f4;color:#1d1d1f;cursor:pointer;text-align:center}
.extra-card.active{border-color:var(--lime);background:#dcfce7}
.spaced-large{display:grid;grid-template-columns:1fr;gap:18px}
.radio-left .row,.radio-left{display:flex;align-items:center;gap:12px}
.radio-left input[type="radio"],.radio-big{accent-color:var(--green);width:18px;height:18px;border-radius:50%}
.checks-grid-2col{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:8px}
.checks-grid-2col input[type="checkbox"]{accent-color:var(--lime)}
.sla-detail-cards{display:grid;gap:10px}
.sla-detail-card{background:#edeef0;border-radius:10px;padding:12px;color:#1d1d1f;font-size:13px}
@media(max-width:1024px){
  .widget-row,.ltv-grid,.nps-cards{grid-template-columns:1fr}
  .contact-grid{grid-template-columns:1fr}
  .pricing-modal-header,.pricing-modal-title,.pricing-modal-body{margin-left:24px;margin-right:24px;padding-left:0;padding-right:0}
  .extras-grid,.topics-grid.compact3{grid-template-columns:1fr 1fr}
}
</style>
