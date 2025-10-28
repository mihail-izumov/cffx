<script setup>
import { ref, computed } from 'vue'

const activeTicket = ref('negative-1')
const isMobile = ref(false)

// Следим за шириной экрана для переключения режима
function updateMedia() {
  isMobile.value = window.innerWidth < 769
}
onMounted(() => {
  updateMedia()
  window.addEventListener('resize', updateMedia)
})
onUnmounted(() => {
  window.removeEventListener('resize', updateMedia)
})

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
    problem: 'Гостья посетила кофейню и столкнулась с долгим ожиданием при пустой кофейне. Видя отсутствие других посетителей, ситуация вызвала недоумение и расстройство.',
    updates: [
      '<span class="tkt-grey">Тип сигнала:</span> <span class="tkt-bold">КОМПЕНСИРУЕМЫЙ</span>',
      '<span class="tkt-grey">Категория:</span> <span class="tkt-bold">А</span> (негативный опыт обслуживания — долгое ожидание при низкой загрузке)',
      '<span class="tkt-grey">UPD (09.10.2025 16:12):</span> Получены уточнения от гостя: время визита, длительность ожидания, заказ, обращение к персоналу',
    ],
    emotion: 'Умеренное волнение. Гостья расстроена долгим ожиданием в пустой кофейне, но конструктивна — предлагает решение в виде обучения персонала.',
    guestProposal: 'Обучение персонала',
    promised: [
      'Информация передана управляющему для разбора ситуации',
      'Гостю сообщат результат после получения ответа от управляющего',
      'Предложение по обучению персонала включено в отчёт'
    ],
    actions: [
      'Связаться с Татьяной и принести извинения',
      'Провести разбор с персоналом: почему ожидание 10-15 минут в пустой кофейне',
      'Проверить, кто был на смене и почему не обслужил гостя оперативно',
      'Усилить контроль за временем обслуживания'
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
    problem: 'Гость расстроена из-за ошибки в заказе. Обратилась 27 октября 2025 года в 12:49. Детали уточняются у гостя: точная дата и время заказа, характер ошибки (что именно было не так), формат заказа (на месте/с собой).',
    updates: [
      '<span class="tkt-grey">Тип сигнала:</span> <span class="tkt-bold">КОМПЕНСИРУЕМЫЙ</span>',
      '<span class="tkt-grey">Категория:</span> <span class="tkt-bold">А</span> (Операционная ошибка — ошибка в заказе)',
      '<span class="tkt-grey">UPD (27.10.2025 16:35):</span> Выдан сертификат №75303 номиналом 500₽',
      'Финальное сообщение отправлено гостю'
    ],
    emotion: 'Расстроена (разочарована) — требуется эмпатия и конкретные действия для восстановления доверия.',
    guestProposal: 'Исключить повторение ошибок в заказах',
    promised: [
      'Отправлено приветствие с благодарностью за обратную связь',
      'Выражена эмпатия и признание недопустимости ситуации',
      'Заданы уточняющие вопросы о деталях',
      'Отправлен сертификат 500₽',
      'Через 3 дня будет сделан запрос о факте использования сертификата'
    ],
    actions: [
      'Провести внутреннее расследование: выяснить обстоятельства ошибки, причины и ответственных',
      'Связаться с гостем по Telegram для уточнения деталей',
      'Принять меры для исключения повторения ситуации',
      'Контроль использования сертификата №75303'
    ]
  }
  // ... добавьте остальные типы тикетов согласно вашей структуре
]

const currentTicket = computed(() => 
  tickets.find(t => t.id === activeTicket.value)
)

const detailsRefs = ref([])
const handleToggle = index => {
  const currentDetails = detailsRefs.value[index]
  if (currentDetails && currentDetails.open) {
    detailsRefs.value.forEach((details, i) => {
      if (i !== index && details && details.open) details.open = false
    })
  }
}

// Helper: определяем компактность списка в зависимости от типа данных
function isOrdered(arr) {
  return arr.length > 0 && arr.every(s => /^[0-9]/.test(s) === false)
}
</script>

<template>
  <div class="tkt-root">
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
    <div class="tkt-sidebar tkt-select-mob" v-else>
      <select v-model="activeTicket" class="tkt-mobile-select">
        <option v-for="ticket in tickets" :key="ticket.id" :value="ticket.id">
          {{ ticket.title }}
        </option>
      </select>
    </div>

    <div class="tkt-content" role="tabpanel">
      <div v-if="currentTicket" class="tkt-details">
        <div class="tkt-header">
          <span class="tkt-signal">{{ currentTicket.signal }}</span>
          <span class="tkt-status">{{ currentTicket.status }}</span>
        </div>
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

        <!-- АККОРДЕОНЫ -->
        <div class="tkt-sections">
          <details 
            class="tkt-section" 
            :ref="el => { if (el) detailsRefs[0] = el }"
            @toggle="handleToggle(0)"
            open
          >
            <summary class="tkt-section-header">
              <span class="tkt-section-title">Суть проблемы</span>
              <span class="tkt-arrow">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
              </span>
            </summary>
            <div class="tkt-section-content">
              <p>{{ currentTicket.problem }}</p>
              <div v-if="currentTicket.updates" class="tkt-updates tkt-compact">
                <template v-for="(update, idx) in currentTicket.updates" :key="idx">
                  <p v-html="update"></p>
                </template>
              </div>
            </div>
          </details>

          <details 
            class="tkt-section"
            :ref="el => { if (el) detailsRefs[1] = el }"
            @toggle="handleToggle(1)"
          >
            <summary class="tkt-section-header">
              <span class="tkt-section-title">Эмоциональное состояние</span>
              <span class="tkt-arrow">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
              </span>
            </summary>
            <div class="tkt-section-content">
              <p>{{ currentTicket.emotion }}</p>
              <div class="tkt-proposal">
                <span class="tkt-bold">Предложение гостя:</span> {{ currentTicket.guestProposal }}
              </div>
            </div>
          </details>

          <details 
            class="tkt-section"
            :ref="el => { if (el) detailsRefs[2] = el }"
            @toggle="handleToggle(2)"
          >
            <summary class="tkt-section-header">
              <span class="tkt-section-title">Что обещано гостю</span>
              <span class="tkt-arrow">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
              </span>
            </summary>
            <div class="tkt-section-content tkt-gap-small">
              <ul v-if="!isOrdered(currentTicket.promised)" class="tkt-list tkt-list-mark">
                <li v-for="(item, idx) in currentTicket.promised" :key="idx">
                  <span class="tkt-dot"></span>{{ item }}
                </li>
              </ul>
              <ol v-else class="tkt-list tkt-list-ol">
                <li v-for="(item, idx) in currentTicket.promised" :key="idx">
                  {{ item }}
                </li>
              </ol>
            </div>
          </details>

          <details 
            class="tkt-section"
            :ref="el => { if (el) detailsRefs[3] = el }"
            @toggle="handleToggle(3)"
          >
            <summary class="tkt-section-header">
              <span class="tkt-section-title">Рекомендации для команды</span>
              <span class="tkt-arrow">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
              </span>
            </summary>
            <div class="tkt-section-content tkt-gap-small">
              <ul v-if="!isOrdered(currentTicket.actions)" class="tkt-list tkt-list-mark">
                <li v-for="(item, idx) in currentTicket.actions" :key="idx">
                  <span class="tkt-dot"></span>{{ item }}
                </li>
              </ul>
              <ol v-else class="tkt-list tkt-list-ol">
                <li v-for="(item, idx) in currentTicket.actions" :key="idx">
                  {{ item }}
                </li>
              </ol>
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
  grid-template-columns: 180px 1fr;
  gap: 0;
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 12px;
  overflow: hidden;
  background: rgba(255,255,255,0.02);
  margin: 24px 0;
}
.tkt-sidebar {
  background: rgba(255,255,255,0.03);
  border-right: 1px solid rgba(255,255,255,0.08);
  overflow-y: auto;
  max-height: 600px;
  padding: 0;
}
.tkt-select-mob {
  width: 100%;
  min-width: 0;
  border: none;
  border-radius: 0;
  background: transparent;
  box-shadow: none;
}
.tkt-mobile-select {
  width: 100%;
  padding: 11px 12px 11px 8px;
  font-size: 15px;
  font-weight: 600;
  border-radius: 0;
  border: none;
  outline: none;
  background: rgba(255,255,255,0.07);
  color: #fff;
  margin: 0;
  appearance: none;
}
.tkt-nav {
  padding: 0;
  margin: 0;
}
.tkt-nav-item {
  width: 100%;
  padding: 12px 10px 12px 16px;
  border: none;
  background: transparent;
  text-align: left;
  cursor: pointer;
  transition: all 0.2s ease;
  display: block;
  border-left: 3px solid transparent;
  font-size: 14px;
  line-height: 1.2;
  letter-spacing: 0.01em;
}
.tkt-nav-item:hover {
  background: rgba(255,255,255,0.06);
}
.tkt-nav-item.active {
  background: rgba(200,255,90,0.08);
  border-left-color: #c8ff5a;
}
.tkt-title {
  font-size: 14px;
  font-weight: 600;
  color: rgba(255,255,255,0.93);
  line-height: 1.2;
  display: block;
}
.tkt-nav-item.active .tkt-title {
  color: #c8ff5a;
}
.tkt-content {
  padding: 22px 18px 22px 24px;
  overflow-y: auto;
  max-height: 600px;
}
.tkt-details {
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.tkt-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(255,255,255,0.08);
}
.tkt-signal {
  font-family: 'SF Mono', Monaco, 'Courier New', monospace;
  font-size: 15px;
  font-weight: 700;
  color: #c8ff5a;
  letter-spacing: 0.01em;
}
.tkt-status {
  font-size: 13px;
  color: rgba(255,255,255,0.6);
  font-weight: 600;
}
.tkt-summary {
  display: flex;
  flex-direction: column;
  gap: 3px;
  padding: 13px;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 8px;
}
.tkt-summary-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6px;
  margin: 0;
}
.tkt-summary-item {
  display: flex;
  flex-direction: column;
  gap: 1px;
}
.tkt-label {
  font-size: 11px;
  font-weight: 500;
  color: rgba(255,255,255,0.45);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 1px;
}
.tkt-value {
  font-size: 13.5px;
  color: rgba(255,255,255,0.92);
  font-weight: 500;
  line-height: 1.3;
}
.tkt-sections { display: flex; flex-direction: column; gap: 4px; }
.tkt-section {
  background: rgba(255, 255, 255, 0.03);
  border: none;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 0 !important;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
.tkt-section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 22px 15px 20px;
  cursor: pointer;
  user-select: none;
  list-style: none;
  background: transparent;
  font-size: 15px;
  font-weight: 600;
  margin: 0;
  line-height: 1.2;
}
.tkt-section-header::-webkit-details-marker,
.tkt-section-header::marker { display: none !important; }
.tkt-section-title { margin: 0; padding: 0; font-size: 15px; font-weight: 600; color: #fff; }
.tkt-arrow { display: flex; align-items: center; justify-content: center; flex-shrink: 0; transition: transform .4s; margin-left: 12px; }
.tkt-arrow svg { width: 16px; height: 16px; }
.tkt-section[open] .tkt-arrow { transform: rotate(180deg); }
.tkt-section-content {
  padding: 10px 22px 15px 22px;
  color: #fff;
  line-height: 1.55;
  font-size: 14px;
  margin-top: 1.5px;
}
.tkt-section-content p { margin: 0 0 7px 0; color: #fff; font-size: 14px; line-height: 1.55; }
.tkt-updates { margin: 12px 0 0 0; padding: 0; border: none; }
.tkt-updates p { font-size: 13px; color: #c5c5c5; margin: 0 0 3px 0; line-height: 1.45; }
.tkt-proposal { margin-top: 9px; padding: 7px 0 0 0; font-size: 13px; color: rgba(255,255,255,0.93); }
.tkt-gap-small { margin-top: -4px; }
.tkt-list { margin: 0; padding: 0 0 0 24px; }
.tkt-list-mark { list-style: none; padding-left: 0; }
.tkt-list-mark li { display: flex; align-items: flex-start; gap: 7px; min-height: 21px; margin-bottom: 3px; line-height: 1.45; font-size: 14px; color: #fff; }
.tkt-dot { width: 7px; height: 7px; border-radius: 50%; background: #c8ff5a; margin-top: 7px; flex-shrink: 0; display: inline-block; }
.tkt-list-ol { padding-left: 24px; }
.tkt-list-ol li { margin-bottom: 2px; line-height: 1.5; font-size: 14px; color: #fff; }
.tkt-bold { font-weight: 600; color: #fff; }
.tkt-grey { color: #dedede; font-weight: 500; }
.tkt-compact p, .tkt-list li, .tkt-list-ol li { line-height: 1.38; }
@media (max-width: 768px) {
  .tkt-root { grid-template-columns: 1fr; }
  .tkt-sidebar { border-right: none; border-bottom: 1px solid rgba(255,255,255,0.08); max-height: none; }
  .tkt-content { max-height: none; padding: 14px 8px 16px 8px; }
  .tkt-summary { padding: 10px 7px; }
  .tkt-summary-row { grid-template-columns: 1fr; gap: 2px; }
  .tkt-section-header, .tkt-section-content { padding-left: 12px; padding-right: 12px; }
}
</style>
