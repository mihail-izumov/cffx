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
    benefits:['Словарь жалоб','Умная форма','Компенсации'],
    scripts:['Вкус','Долгая подача','Инородный предмет','Поведение персонала','Чистота','Температура'],
    defaultOwners:{A:'team',B:'team',C:'manager',D:'manager'} as Record<CategoryKey,Owner>,
    defaultTopics:{A:['Ошибки в заказе','Коммуникация','Цена','Упаковка'],B:['Долгое ожидание','Вкус','Чистота'],C:['Инородные предметы','Профессионализм','Атмосфера'],D:['Договор и отмена','Поведение персонала']} as Record<CategoryKey,string[]>,
    defaultCompany:'СуперФуд', defaultRetention:50, plannedActualPct:55
  },
  fitness: {
    title:'Фитнес', icon:'/widget-fitness-icon.svg', topics:FITNESS_TOPICS,
    benefits:['Словарь жалоб','Умная форма','Эскалации'],
    scripts:['Переполненность/очереди','Чистота раздевалок','Оборудование/ремонт','Поведение персонала','Расписание занятий','Температура/вентиляция'],
    defaultOwners:{A:'team',B:'team',C:'manager',D:'manager'} as Record<CategoryKey,Owner>,
    defaultTopics:{A:['Цена','Расписание','Коммуникация'],B:['Чистота','Переполненность','Температура'],C:['Оборудование','Поведение персонала'],D:['Договор и отмена','Поведение персонала']} as Record<CategoryKey,string[]>,
    defaultCompany:'СуперСпорт', defaultRetention:70, plannedActualPct:23
  }
} as const
type WidgetKey = keyof typeof WIDGETS

const SLA_READY=['Общие положения','Клиентское соглашение','Общие принципы','Алгоритм работы ИИ‑ассистента (10 этапов)','Классификация проблем и рекомендации','Шаблоны тикетов','Расширенные фразы‑шаблоны','Метрики успеха','Технические требования','Приложения']
const SLA_LATER=['Полные скрипты по категориям','Контакты ответственных','Эскалационная матрица','Примеры и кейсы']

const state = reactive({
  widget:'cafe' as WidgetKey,
  company:{name:'',locations:2,guests_or_clients:3000,avg_check_or_subscription:550,retention_pct:50,ltv_cards:[] as string[],ltv_tool_other:''},
  standards_source:'internal' as 'internal'|'signal',
  has_full_classification:false,
  client_scripts:[] as string[],
  categories_map:{A:{owner:'team' as Owner,contact:'',topics:[] as string[]},B:{owner:'team' as Owner,contact:'',topics:[] as string[]},C:{owner:'manager' as Owner,contact:'',topics:[] as string[]},D:{owner:'manager' as Owner,contact:'',topics:[] as string[]}},
  ticket_template:{base_fields_ru:['Код тикета','Дата и время','Имя гостя','Контакт','Локация','Категория','Описание проблемы','Рекомендуемое решение','UPD после рекомендации'],extra_fields:[] as string[]},
  goals:{full_close_time_hours:18,resolved_without_escalation_pct:75,reco_accuracy_pct:80,nps_collected_pct:95,nps_avg:8,returns_after_complaint_pct:70,avg_compensation_rub:500},
  nps:{step:60 as 60|1440|4320|-1,custom_hours:2},
  work_hours:{mode:'wk_9_18' as 'wk_9_18'|'wk_9_18_we'|'extended',weekdays:{from:'09:00',to:'18:00'},weekends:{from:'10:00',to:'17:00'}},
  contact:{name:'',phone:''}
})

const isCafe=computed(()=>state.widget==='cafe')
const sliderGuestsMin=computed(()=>isCafe.value?500:200)
const sliderGuestsMax=computed(()=>5000)
const sliderGuestsStep=computed(()=>isCafe.value?500:200)
const sliderMoneyMin=computed(()=>isCafe.value?250:1000)
const sliderMoneyMax=computed(()=>isCafe.value?5000:15000)
const sliderMoneyStep=computed(()=>isCafe.value?50:1000)
const ltvOptions=['CRM','BI/Дашборды','Google Sheets','Другое']
const npsCards=[{label:'60м',value:60},{label:'1д',value:1440},{label:'3д',value:4320},{label:'Другое',value:-1}]
const plannedText=computed(()=>`Плановый рост с Сигналом · актуальный показатель ${WIDGETS[state.widget].plannedActualPct}%`)
const slaTitle=computed(()=>`SLA Сигнала для ${state.company.name||'компании'}`)
const availableScripts=computed(()=>WIDGETS[state.widget].scripts)
const currentTopics=computed(()=>WIDGETS[state.widget].topics.map(t=>t.category))

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
function submitForm(){console.log('SLA build request',JSON.parse(JSON.stringify(state)))}

// Методы для работы с категориями (без "as any" в шаблоне)
function getCategoryOwner(k:string){return state.categories_map[k as CategoryKey].owner}
function setCategoryOwner(k:string,val:Owner){state.categories_map[k as CategoryKey].owner=val}
function getCategoryContact(k:string){return state.categories_map[k as CategoryKey].contact}
function setCategoryContact(k:string,val:string){state.categories_map[k as CategoryKey].contact=val}
function getCategoryTopics(k:string){return state.categories_map[k as CategoryKey].topics}
function toggleCategoryTopic(k:string,name:string){const arr=state.categories_map[k as CategoryKey].topics,i=arr.indexOf(name);if(i>=0)arr.splice(i,1);else arr.push(name)}
function isCategoryTopicSelected(k:string,name:string){return state.categories_map[k as CategoryKey].topics.includes(name)}

watch(()=>state.work_hours.mode,(m)=>{if(m==='extended')openModal('workhours')})
</script>

<style scoped>
.signal-sla.dark{--bg:transparent;--card:#151719;--muted:#9aa3ad;--text:#e8eaed;--line:#2a2d31;--green:#4ade80;--green-10:rgba(77,222,128,0.05);--lime:#c5f946;background:var(--bg);color:var(--text);padding-bottom:20px;font-size:14px;max-width:980px;margin:0 auto;overflow-wrap:anywhere}
h2,h3,h4{margin:0 0 6px}h2{font-size:22px}h3{font-size:16px}h4{font-size:14px}
.card{background:var(--card);border:1px solid var(--line);border-radius:12px;padding:16px 14px;margin:12px 0}
.grid1{display:grid;grid-template-columns:1fr;gap:10px}.grid2{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.row{display:flex;align-items:center;gap:10px}.row span{min-width:max-content}
input[type="text"],input[type="number"],input[type="time"],select{padding:8px 10px;border-radius:10px;background:#0b0c0e;color:var(--text);border:1px solid var(--line);font-size:14px}
.select-arrow{appearance:auto}.company.big{font-size:18px}.fullwidth{width:100%}
.range.white{width:100%;-webkit-appearance:none;background:transparent;height:24px}
.range.white::-webkit-slider-runnable-track{height:4px;background:#fff;border-radius:999px}
.range.white::-moz-range-track{height:4px;background:#fff;border-radius:999px}
.range.white::-webkit-slider-thumb{-webkit-appearance:none;width:18px;height:18px;border-radius:50%;background:#fff;margin-top:-7px;border:none}
.range.white::-moz-range-thumb{width:18px;height:18px;border-radius:50%;background:#fff;border:none}
.inline-value{color:#fff;font-size:13px;min-width:40px;text-align:right}
.widget-row{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:14px}
.widget-card{border:1px solid var(--line);border-radius:12px;padding:12px;background:#0d0f12;text-align:left;cursor:pointer}
.widget-card.active{border-color:#fff;background:#1a1d20}
.widget-head{display:flex;gap:12px;align-items:flex-start}
.widget-icon{width:56px;height:56px;object-fit:contain;flex-shrink:0}
.w-title{font-weight:700;margin:0 0 4px}
.checks{list-style:none;padding:0;margin:0}.checks li{display:flex;align-items:center;gap:8px;margin:2px 0}
.checks input{pointer-events:none;accent-color:var(--green);width:16px;height:16px}
.checks span{font-size:13px;color:#e0e0e0}
.company-fields{display:grid;grid-template-columns:1fr;gap:10px}
.ltv-ret-block{display:grid;grid-template-columns:1fr;gap:16px;margin-top:6px}
.ltv-title{font-weight:600;margin-bottom:6px}
.ltv-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:10px}
.ltv-card{border:1px solid var(--line);border-radius:12px;padding:10px 12px;background:#0d0f12;text-align:left;cursor:pointer}
.ltv-card.active{border-color:#fff;background:#1a1d20}
.ltv-other{margin-top:10px}
.linklike{background:transparent;border:none;color:#fff;text-decoration:underline;text-decoration-style:dashed;cursor:pointer;padding:0}
.linklike.same{font-size:13px}
.hint{color:var(--muted);font-size:12px}.divider{height:1px;background:var(--line);margin:10px 0}
.goal-title{font-weight:700;color:#fff;font-size:14px;margin-bottom:2px}
.goal-line{font-size:13px;color:#c0c0c0}
.goals-row{display:flex;align-items:center;justify-content:space-between;padding:10px 0;border-top:1px solid var(--line)}
.goals-row:first-of-type{border-top:none}
.nps-cards{display:flex;gap:8px;flex-wrap:wrap}
.nps-card{border:1px solid var(--line);border-radius:12px;padding:8px 12px;background:#0d0f12;color:#e8eaed;cursor:pointer}
.nps-card.active{border-color:#fff;background:#1a1d20}
.mini-ag{display:flex;gap:8px;flex-wrap:wrap}
.mini-badge{background:#0b0c0e;border:1px solid var(--line);border-radius:12px;padding:8px 10px;font-size:12px}
.mini-sub{color:#9aa3ad;font-size:11px;margin-top:2px}
.lime{color:var(--lime)}
.lime-outline{border-color:var(--lime)!important;background:var(--green-10)}
.sla-title{margin:0 0 6px}.price{margin:0;color:#fff}.price-note{color:#c0c0c0;font-size:16px;margin-bottom:8px}
.sla-groups{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:6px}
.sla-group{background:rgba(12,12,14,0.7);border:1px solid var(--line);border-radius:12px;padding:12px}
.sla-group-title{font-weight:700;margin-bottom:6px}
.no-checks .sla-text{font-size:13px;color:#e0e0e0}
button.primary{padding:14px 16px;border-radius:12px;border:1px solid #fff;cursor:pointer}
button.full{width:100%}button.strong{font-weight:700;font-size:18px}
.lime-btn{background:var(--lime);color:#000;border-color:var(--lime)}
.white-btn{background:#fff;color:#000;border-color:#fff}
.cta-row{display:grid;grid-template-columns:1fr;gap:8px;margin-top:10px}
.pricing-modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.75);backdrop-filter:blur(10px);display:flex;align-items:center;justify-content:center;z-index:10000;padding:20px}
.pricing-modal-window{background:#f5f5f7;border-radius:28px;width:880px;max-width:100%;max-height:90vh;box-shadow:0 20px 60px rgba(0,0,0,0.5);display:flex;flex-direction:column;overflow:hidden}
.pricing-modal-close{position:absolute;top:20px;right:20px;width:44px;height:44px;border-radius:50%;background:#1d1d1f;border:none;color:#f5f5f7;cursor:pointer}
.pricing-modal-header{font-size:1rem;color:#6e6e73;margin:60px 80px 12px 80px;font-weight:500;letter-spacing:0.08em}
.pricing-modal-title{font-size:2.135rem;font-weight:600;color:#1d1d1f;margin:0 80px 24px 80px}
.pricing-modal-body{padding:0 80px 60px;overflow-y:auto}
.surface{background:#edeef0;border-radius:12px;padding:8px 10px}
.pad{padding:14px 12px}.black{color:#1d1d1f!important}
.owner-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px}
.owner-grid.spaced{gap:24px}
.owner-col{display:grid;gap:10px}
.cat-h2,.section-h2{font-size:19px;font-weight:600;color:#1d1d1f;margin:0 0 10px 0}
.hint.small.black{color:#6e6e73}
.topics-grid.compact3{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-top:8px}
.topic-card{display:flex;align-items:center;gap:8px;padding:8px;border:1px solid #d2d3d6;border-radius:10px;background:#f1f2f4}
.topic-card.small{padding:6px 8px}
.topic-card.selected{border-color:#86efac;background:#e7f7ee}
.topic-card input[type="checkbox"]{accent-color:var(--green);width:16px;height:16px}
.extras-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}
.extra-card{border:1px solid #d2d3d6;border-radius:10px;padding:10px;background:#f1f2f4;color:#1d1d1f;cursor:pointer;text-align:center}
.extra-card.active{border-color:#16a34a;background:#dcfce7}
.spaced-large{display:grid;grid-template-columns:1fr;gap:18px}
.radio-left .row,.radio-left{display:flex;align-items:center;gap:12px}
.radio-left input[type="radio"],.radio-big{accent-color:var(--green);width:16px;height:16px}
@media(max-width:1024px){
  .widget-row,.sla-groups,.owner-grid,.ltv-grid,.nps-cards{grid-template-columns:1fr}
  .pricing-modal-header,.pricing-modal-title,.pricing-modal-body{margin-left:24px;margin-right:24px;padding-left:0;padding-right:0}
  .extras-grid,.topics-grid.compact3{grid-template-columns:1fr 1fr}
}
</style>
