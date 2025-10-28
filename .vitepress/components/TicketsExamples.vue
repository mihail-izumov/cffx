<script setup>
import { ref, computed } from 'vue'

const activeTicket = ref('negative-1')

const tickets = [
  {
    id: 'negative-1',
    title: 'Негативный опыт',
    signal: 'СИГНАЛ 654-867',
    status: '✅ Обработан',
    date: '09.10.2025 16:00',
    location: 'Космическая, Пензенская 101',
    guest: 'Татьяна',
    contact: '@username',
    sla: '4 часа (дедлайн: 20:00)',
    compensation: 'Извинения + Сертификат 500₽',
    problem: [
      { type: 'text', value: 'Гостья посетила кофейню и столкнулась с долгим ожиданием при пустой кофейне. Видя отсутствие других посетителей, ситуация вызвала недоумение и расстройство.' },
      { type: 'meta', label: 'Тип сигнала:', value: 'КОМПЕНСИРУЕМЫЙ' },
      { type: 'meta', label: 'Категория:', value: 'А (негативный опыт обслуживания — долгое ожидание при низкой загрузке)' }
    ],
    updates: [
      { type: 'meta', label: 'UPD (09.10.2025 16:12):', value: 'Получены уточнения от гостя:' },
      { type: 'bulleted', value: 'Время визита: 09.10.2025 около 14:00' },
      { type: 'bulleted', value: 'Длительность ожидания: 10-15 минут' },
      { type: 'bulleted', value: 'Заказ: латте среднего объема и пончик' }
    ],
    emotion: 'Умеренное волнение. Гостья расстроена, но конструктивна — предлагает решение в виде обучения персонала.',
    guestProposal: 'Обучение персонала',
    promised: [
      'Информация передана управляющему для разбора ситуации',
      'Гостю сообщат результат после получения ответа от управляющего',
      'Предложение по обучению персонала включено в отчёт'
    ],
    actions: [
      'Связаться с Татьяной и принести искренние извинения',
      'Провести разбор с персоналом',
      'Выяснить почему была задержка',
      'Проверить распределение зон ответственности',
      'Усилить контроль за временем обслуживания',
      'Рассмотреть обучение персонала'
    ]
  },
  {
    id: 'order-error',
    title: 'Ошибка в заказе',
    signal: 'СИГНАЛ 971-484',
    status: '✅ Компенсация выдана',
    date: '27.10.2025 12:49',
    location: 'Космическая, Самарская 101',
    guest: 'Мария',
    contact: '@username',
    sla: '4 часа (дедлайн: 16:49)',
    compensation: 'Сертификат 500₽ (№75303)',
    problem: [
      { type: 'text', value: 'Гость расстроена из-за ошибки в заказе. Обратилась 27 октября 2025 года в 12:49. Детали уточняются у гостя: точная дата и время заказа, характер ошибки (что именно было не так), формат заказа (на месте/с собой).' },
      { type: 'meta', label: 'Тип сигнала:', value: 'КОМПЕНСИРУЕМЫЙ' },
      { type: 'meta', label: 'Категория:', value: 'А (Операционная ошибка — ошибка в заказе)' }
    ],
    updates: [
      { type: 'meta', label: 'UPD (27.10.2025 16:35):', value: 'Выдан сертификат №75303 номиналом 500₽' },
      { type: 'meta', label: '', value: 'Финальное сообщение отправлено гостю' }
    ],
    emotion: 'Расстроена — требуется эмпатия и действия для восстановления доверия.',
    guestProposal: 'Исключить повторение ошибок в заказах',
    promised: [
      'Отправлено приветствие с благодарностью',
      'Выражена эмпатия, заданы уточняющие вопросы',
      'Отправлен сертификат 500₽ (№75303)',
      'Сообщены условия использования',
      'Контроль использования сертификата'
    ],
    actions: [
      'Провести внутреннее расследование: выяснить обстоятельства ошибки, причины и ответственных',
      'Связаться с гостем по Telegram для уточнения деталей',
      'Принять меры для исключения повторения ситуации',
      'Контроль использования сертификата №75303'
    ]
  }
]

const currentTicket = computed(() => 
  tickets.find(t => t.id === activeTicket.value)
)

const detailsRefs = ref([])
const handleToggle = (index) => {
  const currentDetails = detailsRefs.value[index]
  if (currentDetails && currentDetails.open) {
    detailsRefs.value.forEach((details, i) => {
      if (i !== index && details && details.open) {
        details.open = false
      }
    })
  }
}

// Мобильная версия — выпадающий список
const isMobile = ref(false)
if (typeof window !== 'undefined') {
  const updateMobile = () => isMobile.value = window.innerWidth < 768
  updateMobile()
  window.addEventListener('resize', updateMobile)
}
</script>

<template>
  <div class="tkt-root">
    <!-- Sidebar -->
    <div class="tkt-sidebar" v-if="!isMobile">
      <nav class="tkt-nav" role="tablist">
        <button
          v-for="ticket in tickets"
          :key="ticket.id"
          :class="['tkt-nav-item', { active: activeTicket === ticket.id }]"
          @click="activeTicket = ticket.id"
          role="tab"
          :aria-selected="activeTicket === ticket.id"
        >
          <span class="tkt-title">{{ ticket.title }}</span>
        </button>
      </nav>
    </div>
    <!-- Мобильный селектор -->
    <div class="tkt-selector" v-else>
      <select v-model="activeTicket" aria-label="Выберите тикет">
        <option v-for="ticket in tickets" :key="ticket.id" :value="ticket.id">{{ ticket.title }}</option>
      </select>
    </div>
    <!-- Content -->
    <div class="tkt-content" role="tabpanel">
      <div v-if="currentTicket" class="tkt-details">
        <!-- Header -->
        <div class="tkt-header">
          <span class="tkt-signal">{{ currentTicket.signal }}</span>
          <span class="tkt-status">{{ currentTicket.status }}</span>
        </div>
        <!-- Summary -->
        <div class="tkt-summary">
          <div class="tkt-summary-row">
            <div class="tkt-summary-item">
              <span class="tkt-label">ДАТА:</span>
              <span class="tkt-value">{{ currentTicket.date }}</span>
            </div>
            <div class="tkt-summary-item">
              <span class="tkt-label">КОФЕЙНЯ:</span>
              <span class="tkt-value">{{ currentTicket.location }}</span>
            </div>
          </div>
          <div class="tkt-summary-row">
            <div class="tkt-summary-item">
              <span class="tkt-label">ГОСТЬ:</span>
              <span class="tkt-value">{{ currentTicket.guest }}</span>
            </div>
            <div class="tkt-summary-item">
              <span class="tkt-label">КОНТАКТ:</span>
              <span class="tkt-value">{{ currentTicket.contact }}</span>
            </div>
          </div>
          <div class="tkt-summary-row">
            <div class="tkt-summary-item">
              <span class="tkt-label">SLA:</span>
              <span class="tkt-value">{{ currentTicket.sla }}</span>
            </div>
            <div class="tkt-summary-item">
              <span class="tkt-label">КОМПЕНСАЦИЯ:</span>
              <span class="tkt-value">{{ currentTicket.compensation }}</span>
            </div>
          </div>
        </div>
        <!-- Accordions -->
        <div class="tkt-sections">
          <details class="tkt-section" :ref="el => { if(el) detailsRefs[0] = el }" @toggle="handleToggle(0)" open>
            <summary class="tkt-section-header">
              <h3 class="tkt-section-title">Суть проблемы</h3>
              <span class="tkt-arrow">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="m6 9 6 6 6-6"/>
                </svg>
              </span>
            </summary>
            <div class="tkt-section-content">
              <p v-for="part in currentTicket.problem" :key="part.label+part.value" :class="part.type==='meta' ? 'tkt-uxmeta' : ''">
                <span v-if="part.type === 'meta'" class="tkt-meta-label">{{ part.label }}</span>
                {{ part.value }}
              </p>
              <div v-if="currentTicket.updates.length" class="tkt-updates">
                <p v-for="(upd, idx) in currentTicket.updates" :key="idx" :class="upd.type==='meta' ? 'tkt-uxmeta' : ''">
                  <span v-if="upd.type === 'meta'" class="tkt-meta-label">{{ upd.label }}</span>
                  {{ upd.value }}
                </p>
                <ul v-if="currentTicket.updates.some(u => u.type === 'bulleted')" class="tkt-bulleted">
                  <li v-for="upd in currentTicket.updates.filter(u => u.type==='bulleted')" :key="upd.value">{{ upd.value }}</li>
                </ul>
              </div>
            </div>
          </details>
          <details class="tkt-section" :ref="el => { if(el) detailsRefs[1] = el }" @toggle="handleToggle(1)">
            <summary class="tkt-section-header">
              <h3 class="tkt-section-title">Эмоциональное состояние</h3>
              <span class="tkt-arrow">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="m6 9 6 6 6-6"/>
                </svg>
              </span>
            </summary>
            <div class="tkt-section-content">
              <p>{{ currentTicket.emotion }}</p>
              <div class="tkt-proposal">
                <span class="tkt-meta-label">Предложение гостя:</span> {{ currentTicket.guestProposal }}
              </div>
            </div>
          </details>
          <details class="tkt-section" :ref="el => { if(el) detailsRefs[2] = el }" @toggle="handleToggle(2)">
            <summary class="tkt-section-header">
              <h3 class="tkt-section-title">Что обещано гостю</h3>
              <span class="tkt-arrow">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="m6 9 6 6 6-6"/>
                </svg>
              </span>
            </summary>
            <div class="tkt-section-content">
              <ul class="tkt-list">
                <li v-for="(item, idx) in currentTicket.promised" :key="idx">{{ item }}</li>
              </ul>
            </div>
          </details>
          <details class="tkt-section" :ref="el => { if(el) detailsRefs[3] = el }" @toggle="handleToggle(3)">
            <summary class="tkt-section-header">
              <h3 class="tkt-section-title">Рекомендации для команды</h3>
              <span class="tkt-arrow">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="m6 9 6 6 6-6"/>
                </svg>
              </span>
            </summary>
            <div class="tkt-section-content">
              <ol v-if="currentTicket.actions.length" class="tkt-list">
                <li v-for="(action, idx) in currentTicket.actions" :key="idx" class="tkt-compact-list">{{ action }}</li>
              </ol>
              <!-- Если нужен чеклист вместо нумерации, используйте ниже -->
              <!--
              <ul v-if="false" class="tkt-checklist">
                <li v-for="(action, idx) in currentTicket.actions" :key="idx">
                  <span class="tkt-checkmark"></span>{{ action }}
                </li>
              </ul>
              -->
            </div>
          </details>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tkt-root {
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 0;
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 12px;
  background: rgba(255,255,255,0.02);
  margin: 24px 0;
  overflow: hidden;
}
.tkt-sidebar {
  background: rgba(255,255,255,0.03);
  border-right: 1px solid rgba(255,255,255,0.08);
  min-width: 200px;
}
.tkt-nav {
  padding: 0;
  margin: 0;
}
.tkt-nav-item {
  width: 100%;
  padding: 10px 14px;
  border: none;
  background: transparent;
  text-align: left;
  cursor: pointer;
  transition: all 0.15s ease;
  border-left: 3px solid transparent;
  font-size: 14px;
  line-height: 1.2;
}
.tkt-nav-item:hover { background: rgba(255,255,255,0.06); }
.tkt-nav-item.active {
  background: rgba(200,255,90,0.08);
  border-left-color: #c8ff5a;
  color: #c8ff5a;
}
.tkt-title { font-weight: 600; color: inherit; }
.tkt-content {
  padding: 18px;
  overflow-y: auto;
  min-width: 0;
  max-height: 600px;
}
.tkt-details { display: flex; flex-direction: column; gap: 14px; }
.tkt-header {
  display: flex; justify-content: space-between; align-items: center;
  font-size: 13.5px; font-weight: 600; color: #c8ff5a; padding-bottom: 8px;
}
.tkt-summary {
  display: flex; flex-direction: column; gap: 6px;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 10px; padding: 12px; font-size: 13px;
}
.tkt-summary-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}
.tkt-summary-item { display: flex; flex-direction: column; gap: 2px; }
.tkt-label {
  font-size: 10px; font-weight: 700;
  color: rgba(255,255,255,0.45); text-transform: uppercase;
  letter-spacing: 0.05em; margin-bottom: 1px;
}
.tkt-value { font-size: 13px; color: rgba(255,255,255,0.92); font-weight: 500; line-height: 1.2; }
.tkt-sections { display: flex; flex-direction: column; gap: 6px; }
.tkt-section {
  background: rgba(255,255,255,0.03); border: none; border-radius: 12px;
  overflow: hidden; transition: all 0.4s cubic-bezier(0.4,0,0.2,1);
}
.tkt-section-header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 10px 14px; cursor: pointer; user-select: none; margin: 0;
  background: transparent; border-radius: 12px 12px 0 0; font-size:15px;
  font-weight: 600; color: #fff; min-height: 38px;
}
.tkt-section-title { font-size: 15px; font-weight: 600; color: #fff; margin: 0; padding: 0; }
.tkt-arrow { display: flex; align-items: center; justify-content: center; margin-left: 12px; color: #aaa; transition: transform 0.25s; }
.tkt-section[open] .tkt-arrow { transform: rotate(180deg); }
.tkt-section-content {
  padding: 10px 14px 8px; color: #ffffff; line-height: 1.4; font-size: 13px;
  animation: slideDown 0.4s cubic-bezier(0.4,0,0.2,1);
}
@keyframes slideDown {
  from { opacity: 0; transform: translateY(-8px); }
  to { opacity: 1; transform: translateY(0); }
}
.tkt-section-content p, .tkt-section-content ul, .tkt-section-content ol {
  margin-bottom: 5px;
}
.tkt-section-content .tkt-uxmeta {
  font-size: 13px; font-weight: 500; color: #d7ff81; margin-bottom: 4px;
}
.tkt-meta-label {
  font-weight: 500;
  color: #d7ff81;
  margin-right: 4px;
}
.tkt-updates { margin-top: 5px; }
.tkt-bulleted { list-style: disc inside; margin-left: 0; }
.tkt-bulleted li { font-size: 13px; color: #fff; line-height: 1.3; margin-bottom: 3px; padding-left: 0; }
.tkt-list, .tkt-checklist { margin: 0; padding-left: 20px; }
.tkt-list li, .tkt-checklist li { margin-bottom: 6px; line-height: 1.3; font-size: 13px; color: #fff; }
.tkt-compact-list { font-size: 13px; color: #fff; margin-bottom: 4px; }
.tkt-checkmark {
  display: inline-block; min-width: 16px; margin-right: 7px; color: #d7ff81;
  font-weight: bold; font-size: 14px; vertical-align: middle;
}
.tkt-proposal { margin-top: 9px; padding: 8px 10px; background: rgba(200,255,90,0.07);
  border-left: 3px solid #c8ff5a; border-radius: 6px; font-size: 13px; color: #fff; font-weight: 500;
}
.tkt-selector { width: 100%; padding: 12px 16px; background: rgba(255,255,255,0.03); border-bottom: 1px solid rgba(255,255,255,0.06); }
.tkt-selector select {
  width: 100%; font-size: 15px; padding: 7px 12px; border-radius: 8px; border: 1px solid #222;
  background: #181818; color: #eaff9a; font-weight: 600; cursor: pointer;
}
@media (max-width: 768px) {
  .tkt-root { grid-template-columns: 1fr; }
  .tkt-sidebar { display: none; }
  .tkt-content { padding: 10px; max-height: none; }
  .tkt-section-content { padding: 7px 10px 5px; font-size: 12px; }
  .tkt-summary-row { grid-template-columns: 1fr; gap: 4px; }
}
</style>
