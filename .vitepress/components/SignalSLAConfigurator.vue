<script setup lang="ts">
import { reactive, ref, computed } from 'vue'
import { Teleport } from 'vue'

type Widget = 'cafe' | 'fitness'
type Owner = 'team' | 'manager' | 'custom'

const state = reactive({
  widget: 'cafe' as Widget,
  company: { name: '', locations: 2, guests: 3000, check: 550, retention: 50, ltv: [] as string[], other: '' },
  nps: 60 as 60 | 1440 | 4320 | -1,
  customHours: 2,
  workMode: 'wk_9_18' as 'wk_9_18' | 'wk_9_18_we' | 'extended',
  hours: { week: { from: '09:00', to: '18:00' }, weekend: { from: '10:00', to: '17:00' } },
  categories: { A: 'team', B: 'team', C: 'manager', D: 'manager' } as Record<'A'|'B'|'C'|'D', Owner>,
  extraFields: ['', ''] as string[],
  contact: { name: '', phone: '' },
})

const widgetData = {
  cafe: { icon: 'cafe', name: 'СуперФуд', retentionNow: 55, topics: ['Ошибки в заказе','Чистота','Долгое ожидание','Вкус'] },
  fitness: { icon: 'fitness', name: 'СуперСпорт', retentionNow: 23, topics: ['Чистота','Переполненность','Оборудование','Поведение персонала'] },
}

const allTopics = computed(() => state.widget === 'cafe'
  ? ['Вкус','Чистота','Долгое ожидание','Ошибки в заказе','Поведение персонала','Инородные предметы','Очереди','Атмосфера','Упаковка','Коммуникация','Цена','Профессионализм','Дизайн','Парковка']
  : ['Переполненность','Чистота','Поведение персонала','Оборудование','Цена','Расписание','Температура','Качество тренировок','Опоздание тренера','Атмосфера','Удобства','Договор и отмена']
)

const availableTopics = computed(() => allTopics.value.filter(t => !state.extraFields.includes(t)))

const modal = ref<null | 'categories' | 'ticket' | 'nps' | 'work' | 'goals' | 'sla_ready' | 'sla_later'>(null)
const open = (m: typeof modal.value) => { modal.value = m; document.body.style.overflow = 'hidden' }
const close = () => { modal.value = null; document.body.style.overflow = '' }

const toggleLtv = (v: string) => {
  const i = state.company.ltv.indexOf(v)
  i === -1 ? state.company.ltv.push(v) : state.company.ltv.splice(i, 1)
}

const submit = () => console.log('SLA:', JSON.parse(JSON.stringify(state)))
</script>

<template>
  <div class="configurator">

    <!-- Виджеты -->
    <div class="widgets">
      <button @click="state.widget='cafe'" :class="{active: state.widget==='cafe'}" class="card">
        <div class="icon">Cafe</div>
        <div class="title">Общепит</div>
        <div class="checks">
          <div v-for="b in ['Словарь жалоб','Умная форма','Компенсации']" :key="b" class="check">Check {{ b }}</div>
        </div>
      </button>
      <button @click="state.widget='fitness'" :class="{active: state.widget==='fitness'}" class="card">
        <div class="icon">Fitness</div>
        <div class="title">Фитнес</div>
        <div class="checks">
          <div v-for="b in ['Словарь жалоб','Умная форма','Эскалации']" :key="b" class="check">Check {{ b }}</div>
        </div>
      </button>
    </div>

    <!-- Компания -->
    <div class="section">
      <h2>Компания</h2>
      <input v-model="state.company.name" :placeholder="widgetData[state.widget].name" class="title-input" />
      <div class="grid">
        <div class="field">
          <label>Локаций</label>
          <input type="range" v-model.number="state.company.locations" min="1" max="50" />
          <span>{{ state.company.locations }}</span>
        </div>
        <div class="field">
          <label>{{ state.widget === 'cafe' ? 'Гости/мес' : 'Клиенты/мес' }}</label>
          <input type="range" :min="state.widget==='cafe'?500:200" :max="5000" :step="state.widget==='cafe'?500:200" v-model.number="state.company.guests" />
          <span>{{ state.company.guests }}</span>
        </div>
        <div class="field">
          <label>{{ state.widget === 'cafe' ? 'Средний чек' : 'Абонемент' }} ₽</label>
          <input type="range" :min="state.widget==='cafe'?250:1000" :max="state.widget==='cafe'?5000:15000" :step="state.widget==='cafe'?50:1000" v-model.number="state.company.check" />
          <span>{{ state.company.check }} ₽</span>
        </div>
        <div class="field full">
          <label>Retention</label>
          <input type="range" v-model.number="state.company.retention" min="0" max="100" />
          <span>{{ state.company.retention }}%</span>
          <div class="hint">Плановый рост с Сигналом ({{ widgetData[state.widget].retentionNow }}%)</div>
        </div>
      </div>

      <div class="ltv">
        <h3>LTV‑инструмент</h3>
        <div class="chips">
          <button v-for="o in ['CRM','BI/Дашборды','Google Sheets','Другое']" @click="toggleLtv(o)" :class="{on: state.company.ltv.includes(o)}">{{ o }}</button>
        </div>
        <input v-if="state.company.ltv.includes('Другое')" v-model="state.company.other" placeholder="Опишите" class="other" />
      </div>
    </div>

    <!-- Цели -->
    <div class="section">
      <h2>Цели</h2>
      <div class="goal" @click="open('goals')">
        <div>Операционные: 18 ч, 75 % без эскалации</div>
        <div>Изменить</div>
      </div>
      <div class="goal" @click="open('goals')">
        <div>Качество: 80 % точность, NPS 8</div>
        <div>Изменить</div>
      </div>
      <div class="goal" @click="open('goals')">
        <div>Бизнес: 70 % возврат, 500 ₽ компенсация</div>
        <div>Изменить</div>
      </div>
    </div>

    <!-- NPS -->
    <div class="section">
      <h2>Таймер NPS</h2>
      <div class="nps">
        <button v-for="{v,l} in [{v:60,l:'60 мин'},{v:1440,l:'1 день'},{v:4320,l:'3 дня'},{v:-1,l:'Другое'}]" @click="state.nps=v" :class="{on: state.nps===v}">{{ l }}</button>
      </div>
      <input v-if="state.nps===-1" v-model.number="state.customHours" type="number" min="1" placeholder="Часы" class="small" />
    </div>

    <!-- Режим -->
    <div class="section">
      <h2>Режим работы</h2>
      <div class="radio">
        <label><input type="radio" v-model="state.workMode" value="wk_9_18"> Будни 9–18 МСК</label>
        <label><input type="radio" v-model="state.workMode" value="wk_9_18_we"> + выходные</label>
        <label><input type="radio" v-model="state.workMode" value="extended"> Расширенный (<a @click.prevent="open('work')">Настроить</a>)</label>
      </div>
    </div>

    <!-- Категории -->
    <div class="section">
      <h2>Категории A–Г</h2>
      <div class="badges">
        <div v-for="k in ['A','B','C','D']" class="badge">
          <div>Кат. {{ k==='A'?'А':k==='B'?'Б':k==='C'?'В':'Г' }}</div>
          <div>{{ k==='A'?'4 ч':k==='B'?'2 ч':k==='C'?'1 ч':'15 мин' }}</div>
          <div class="owner">{{ state.categories[k] === 'team' ? 'Команда' : 'Управляющий' }}</div>
        </div>
      </div>
      <button @click="open('categories')" class="link">Изменить</button>
    </div>

    <!-- Тикет -->
    <div class="section">
      <h2>Шаблон тикета</h2>
      <div class="text">Базовые: Код тикета, Дата и время, Имя гостя, Контакт, Локация, Категория, Описание проблемы, Рекомендуемое решение, UPD после рекомендации</div>
      <div class="text">Доп. поля: {{ state.extraFields.filter(Boolean).join(', ') || '—' }}</div>
      <button @click="open('ticket')" class="link">Изменить</button>
    </div>

    <!-- Контакт -->
    <div class="section">
      <h2>Контакт</h2>
      <input v-model="state.contact.name" placeholder="Иван" />
      <input v-model="state.contact.phone" placeholder="+7 (999) 123-45-67" />
    </div>

    <!-- SLA -->
    <div class="sla">
      <h1>SLA Сигнала для {{ state.company.name || 'компании' }}</h1>
      <div class="price">₽30.000</div>
      <div class="note">One‑time payment</div>

      <div class="blocks">
        <div class="block">
          <h3>Почти готово</h3>
          <div class="list">Общие положения, Клиентское соглашение, Общие принципы, Алгоритм работы ИИ‑ассистента (10 этапов), Классификация проблем и рекомендации, Шаблоны тикетов, Расширенные фразы‑шаблоны, Метрики успеха, Технические требования, Приложения</div>
          <button @click="open('sla_ready')" class="link">Почти готово</button>
        </div>
        <div class="block">
          <h3>Потом</h3>
          <div class="list">Полные скрипты по категориям, Контакты ответственных, Эскалационная матрица, Примеры и кейсы</div>
          <button @click="open('sla_later')" class="link">Доработать</button>
        </div>
      </div>

      <div class="actions">
        <button @click="submit" class="primary">Отправить на сборку</button>
        <button class="secondary">Save for later</button>
      </div>
    </div>

    <!-- МОДАЛКИ — Apple Style -->
    <Teleport to="body">
      <div v-if="modal" class="modal-overlay" @click="close">
        <div class="modal" @click.stop>
          <button class="close" @click="close">Close</button>
          <div class="modal-content">

            <!-- Категории -->
            <template v-if="modal==='categories'">
              <h2>Категории A–Г</h2>
              <div class="modal-grid">
                <div v-for="k in ['A','B','C','D']" class="cat">
                  <h3>Кат. {{ k==='A'?'А':k==='B'?'Б':k==='C'?'В':'Г' }}</h3>
                  <div class="time">{{ k==='A'?'4 ч':k==='B'?'2 ч':k==='C'?'1 ч':'15 мин' }}</div>
                  <select v-model="state.categories[k]">
                    <option value="team">Команда</option>
                    <option value="manager">Управляющий</option>
                  </select>
                  <div class="topics">
                    <button v-for="t in allTopics" @click="console.log(t)" class="topic">{{ t }}</button>
                  </div>
                </div>
              </div>
            </template>

            <!-- Остальные модалки -->
            <template v-else-if="modal==='ticket'">
              <h2>Дополнительные поля (макс. 2)</h2>
              <div class="topics">
                <button v-for="t in availableTopics" @click="state.extraFields.length<2 && !state.extraFields.includes(t) && state.extraFields.push(t); state.extraFields.length>2 && state.extraFields.splice(0,1)"
                        :class="{on: state.extraFields.includes(t), disabled: state.extraFields.length>=2 && !state.extraFields.includes(t)}">{{ t }}</button>
              </div>
            </template>

            <template v-else>
              <h2>{{ modal === 'sla_ready' ? 'Почти готово' : 'Доработать позже' }}</h2>
              <div class="list">...</div>
            </template>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<style scoped>
.configurator { max-width: 960px; margin: auto; padding: 2rem; font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif; background: #000; color: #fff; }
h1, h2, h3 { font-weight: 600; margin: 0; }
h1 { font-size: 2.5rem; color: #a3e9b8; }
h2 { font-size: 1.8rem; margin: 2rem 0 1rem; }
h3 { font-size: 1.1rem; }

.widgets { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-bottom: 3rem; }
.card { background: #111; border-radius: 1.5rem; padding: 1.5rem; text-align: center; cursor: pointer; transition: all .3s; }
.card.active { background: #1a1a1a; box-shadow: 0 0 30px rgba(163,233,184,.3); }
.icon { font-size: 3rem; margin-bottom: .5rem; }
.title { font-size: 1.3rem; font-weight: 600; margin-bottom: 1rem; }
.checks { display: flex; flex-direction: column; gap: .5rem; }
.check { font-size: .9rem; opacity: .8; }

.title-input { font-size: 2rem; background: transparent; border: none; color: #fff; width: 100%; padding: .5rem 0; border-bottom: 2px solid #333; }

.grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; }
.field { display: flex; flex-direction: column; }
.field label { font-size: .9rem; opacity: .7; margin-bottom: .5rem; }
.field input[type=range] { -webkit-appearance: none; height: 8px; background: #333; border-radius: 4px; }
.field input[type=range]::-webkit-slider-thumb { -webkit-appearance: none; width: 28px; height: 28px; background: #fff; border-radius: 50%; }
.field span { align-self: flex-end; font-size: 1.5rem; font-weight: 600; margin-top: .5rem; }
.full { grid-column: span 2; }

.hint { font-size: .85rem; opacity: .7; margin-top: .5rem; }

.ltv h3 { margin: 2rem 0 1rem; }
.chips { display: flex; flex-wrap: wrap; gap: .75rem; }
.chips button { padding: .75rem 1.2rem; background: #222; border-radius: 2rem; font-size: .9rem; }
.chips button.on { background: #a3e9b8; color: #000; }
.other { margin-top: 1rem; padding: 1rem; background: #111; border-radius: 1rem; width: 100%; }

.goal { display: flex; justify-content: space-between; align-items: center; padding: 1rem 0; border-bottom: 1px solid #222; cursor: pointer; }
.goal:last-child { border: none; }

.nps { display: flex; gap: 1rem; flex-wrap: wrap; }
.nps button { padding: .75rem 1.5rem; background: #111; border-radius: 2rem; }
.nps button.on { background: #a3e9b8; color: #000; }

.radio label { display: block; margin: 1rem 0; }
.radio a { color: #a3e9b8; text-decoration: underline; cursor: pointer; }

.badges { display: flex; flex-wrap: wrap; gap: 1rem; margin: 1rem 0; }
.badge { background: #111; padding: 1rem; border-radius: 1.5rem; text-align: center; min-width: 120px; }
.badge .owner { font-size: .8rem; opacity: .7; margin-top: .5rem; }

.link { color: #a3e9b8; text-decoration: underline; font-size: .9rem; cursor: pointer; }

.sla { background: linear-gradient(135deg, #0a0a0a, #111); border: 2px solid #a3e9b8; border-radius: 2rem; padding: 3rem; text-align: center; margin-top: 4rem; }
.price { font-size: 4rem; font-weight: 700; margin: 1rem 0; }
.note { font-size: 1.1rem; opacity: .8; }
.blocks { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin: 3rem 0; }
.block { background: #000; padding: 2rem; border-radius: 1.5rem; }
.block h3 { color: #a3e9b8; margin-bottom: 1rem; }
.list { font-size: .9rem; line-height: 1.6; opacity: .8; }

.actions { display: flex; flex-direction: column; gap: 1rem; margin-top: 2rem; }
.primary { background: #a3e9b8; color: #000; padding: 1.2rem; border-radius: 2rem; font-size: 1.3rem; font-weight: 600; }
.secondary { background: #fff; color: #000; padding: 1.2rem; border-radius: 2rem; }

/* МОДАЛКИ — Apple */
.modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,.8); backdrop-filter: blur(20px); display: flex; align-items: center; justify-content: center; z-index: 9999; }
.modal { background: #f5f5f7; color: #000; border-radius: 2rem; width: 90%; max-width: 800px; max-height: 90vh; overflow: hidden; position: relative; box-shadow: 0 20px 60px rgba(0,0,0,.5); }
.close { position: absolute; top: 1.5rem; right: 1.5rem; width: 44px; height: 44px; background: #000; color: #fff; border-radius: 50%; font-size: 1.5rem; }
.modal-content { padding: 4rem 3rem 3rem; overflow-y: auto; }
.modal-content h2 { font-size: 2.2rem; margin-bottom: 2rem; text-align: center; }
.modal-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 2rem; }
.cat { background: #e5e5ea; padding: 1.5rem; border-radius: 1.5rem; }
.time { background: #000; color: #fff; padding: .5rem 1rem; border-radius: 1rem; font-size: .8rem; width: fit-content; margin: 1rem 0; }
select { width: 100%; padding: 1rem; border-radius: 1rem; margin: 1rem 0; }
.topics { display: grid; grid-template-columns: 1fr 1fr; gap: .75rem; }
.topic { padding: .75rem; background: #fff; border-radius: 1rem; font-size: .9rem; }
.topic.on { background: #000; color: #fff; }

@media (max-width: 768px) {
  .widgets, .grid, .blocks { grid-template-columns: 1fr; }
  .modal-content { padding: 2rem; }
}
</style>
