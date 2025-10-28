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
    problem: 'Гостья посетила кофейню и столкнулась с долгим ожиданием при пустой кофейне. Видя отсутствие других посетителей, ситуация вызвала недоумение и расстройство.',
    updates: [
      { label: 'Тип сигнала:', value: 'КОМПЕНСИРУЕМЫЙ' },
      { label: 'Категория:', value: 'А (Операционная ошибка — ошибка в заказе)' },
      { label: 'UPD (27.10.2025 16:35):', value: 'Выдан сертификат №75303 номиналом 500₽' },
      { label: '', value: 'Финальное сообщение отправлено гостю' }
    ],
    emotion: 'Умеренное волнение. Гостья расстроена долгим ожиданием в пустой кофейне, но конструктивна — предлагает решение в виде обучения персонала.',
    guestProposal: 'Обучение персонала',
    promised: [
      'Информация передана управляющему для разбора ситуации',
      'Гостю сообщат результат после получения ответа от управляющего',
      'Предложение по обучению персонала включено в отчёт'
    ],
    actions: [
      'Связаться с Татьяной и принести искренние извинения за ожидание 10-15 минут в пустой кофейне',
      'Предложить компенсацию (сертификат 500₽ по категории А)',
      'Провести разбор с персоналом: почему 09.10 около 14:00 в пустой кофейне гость ждал 10-15 минут латте и пончик',
      'Выяснить, кто был на смене в это время и почему не обслужил гостя оперативно'
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
      { label: 'Тип сигнала:', value: 'КОМПЕНСИРУЕМЫЙ' },
      { label: 'Категория:', value: 'А (Операционная ошибка — ошибка в заказе)' },
      { label: 'UPD (27.10.2025 16:35):', value: 'Выдан сертификат №75303 номиналом 500₽' },
      { label: '', value: 'Финальное сообщение отправлено гостю' }
    ],
    emotion: 'Расстроена (разочарована) — требуется проявление эмпатии и конкретные действия для восстановления доверия',
    guestProposal: 'Исключить повторение ошибок в заказах',
    promised: [
      'Отправлено приветствие с благодарностью за обратную связь',
      'Выражена эмпатия и признание недопустимости ситуации',
      'Заданы уточняющие вопросы о деталях',
      'Отправлен сертификат 500₽ (№75303)',
      'Сообщены условия использования: в любой кофейне «Космическая», без ограничений по сроку',
      'Через 3 дня (30.10.2025) будет сделан запрос о факте использования сертификата'
    ],
    actions: [
      'Провести внутреннее расследование: выяснить обстоятельства ошибки, причины и ответственных',
      'Связаться с гостем по Telegram для уточнения деталей',
      'Принять меры для исключения повторения ситуации',
      'Контроль использования сертификата №75303'
    ]
  }
  // Добавь остальные тикеты по образцу выше...
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

const windowWidth = ref(window.innerWidth)
window.addEventListener('resize', () => windowWidth.value = window.innerWidth)
const isMobile = computed(() => windowWidth.value <= 768)
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
    <div v-else class="tkt-mobile-select-wrapper">
      <select v-model="activeTicket" class="tkt-mobile-select">
        <option v-for="ticket in tickets" :key="ticket.id" :value="ticket.id">{{ ticket.title }}</option>
      </select>
    </div>
    <!-- Основной контент -->
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
        <!-- Аккордеоны -->
        <div class="tkt-sections">
          <details
            class="tkt-section"
            :ref="el => { if (el) detailsRefs[0] = el }"
            @toggle="handleToggle(0)"
            open
          >
            <summary class="tkt-section-header">
              <h3 class="tkt-section-title">Суть проблемы</h3>
              <span class="tkt-arrow">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
              </span>
            </summary>
            <div class="tkt-section-content">
              <p>{{ currentTicket.problem }}</p>
              <div v-if="currentTicket.updates && currentTicket.updates.length">
                <div v-for="(upd, idx) in currentTicket.updates" :key="idx" class="tkt-update-row">
                  <span v-if="upd.label" class="tkt-update-label">{{ upd.label }}</span>
                  <span class="tkt-update-value">{{ upd.value }}</span>
                </div>
              </div>
            </div>
          </details>
          <details
            class="tkt-section"
            :ref="el => { if (el) detailsRefs[1] = el }"
            @toggle="handleToggle(1)"
          >
            <summary class="tkt-section-header">
              <h3 class="tkt-section-title">Эмоциональное состояние</h3>
              <span class="tkt-arrow">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
              </span>
            </summary>
            <div class="tkt-section-content">
              <p>{{ currentTicket.emotion }}</p>
              <div class="tkt-proposal">
                <span class="tkt-update-label">Предложение гостя:</span> {{ currentTicket.guestProposal }}
              </div>
            </div>
          </details>
          <details
            class="tkt-section"
            :ref="el => { if (el) detailsRefs[2] = el }"
            @toggle="handleToggle(2)"
          >
            <summary class="tkt-section-header">
              <h3 class="tkt-section-title">Что обещано гостю</h3>
              <span class="tkt-arrow">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
              </span>
            </summary>
            <div class="tkt-section-content">
              <ul class="tkt-list">
                <li v-for="(item, idx) in currentTicket.promised" :key="idx">{{ item }}</li>
              </ul>
            </div>
          </details>
          <details
            class="tkt-section"
            :ref="el => { if (el) detailsRefs[3] = el }"
            @toggle="handleToggle(3)"
          >
            <summary class="tkt-section-header">
              <h3 class="tkt-section-title">Рекомендации для команды</h3>
              <span class="tkt-arrow">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
              </span>
            </summary>
            <div class="tkt-section-content">
              <ol v-if="currentTicket.actions && currentTicket.actions.length" class="tkt-actions-list">
                <li v-for="(action, idx) in currentTicket.actions" :key="idx">{{ action }}</li>
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
  grid-template-columns: 200px 1fr;
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
}

.tkt-nav {
  padding: 0;
  margin: 0;
}

.tkt-nav-item {
  width: 100%;
  padding: 12px 14px;
  border: none;
  background: transparent;
  text-align: left;
  cursor: pointer;
  transition: all 0.2s ease;
  display: block;
  border-left: 3px solid transparent;
  font-size: 13px;
}

.tkt-nav-item:hover {
  background: rgba(255,255,255,0.06);
}

.tkt-nav-item.active {
  background: rgba(200,255,90,0.08);
  border-left-color: #c8ff5a;
}

.tkt-title {
  font-size: 13px;
  font-weight: 600;
  color: rgba(255,255,255,0.90);
  line-height: 1.2;
  display: block;
}

.tkt-nav-item.active .tkt-title {
  color: #c8ff5a;
}

.tkt-mobile-select-wrapper {
  padding: 8px 12px;
  background: rgba(255,255,255,0.03);
  border-bottom: 1px solid rgba(255,255,255,0.08);
}

.tkt-mobile-select {
  width: 100%;
  padding: 8px 12px;
  font-size: 15px;
  border-radius: 8px;
  border: 1px solid rgba(200,255,90,0.18);
  background: rgba(255,255,255,0.04);
  color: #fff;
}

.tkt-content {
  padding: 20px;
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
  letter-spacing: 0.02em;
}

.tkt-status {
  font-size: 12px;
  color: rgba(255,255,255,0.6);
  font-weight: 600;
}

.tkt-summary {
  display: flex;
  flex-direction: column;
  gap: 7px;
  padding: 14px;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 10px;
}

.tkt-summary-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.tkt-summary-item {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.tkt-label {
  font-size: 11px;
  font-weight: 700;
  color: rgba(255,255,255,0.45);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  line-height: 1.1;
}

.tkt-value {
  font-size: 13px;
  color: rgba(255,255,255,0.92);
  font-weight: 500;
  line-height: 1.2;
}

.tkt-sections {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.tkt-section {
  background: rgba(255, 255, 255, 0.03);
  border: none;
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.tkt-section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 13px 16px 13px 16px;
  cursor: pointer;
  list-style: none;
  user-select: none;
  background: transparent;
  margin: 0;
}

.tkt-section-header::-webkit-details-marker,
.tkt-section-header::marker {
  display: none !important;
}

.tkt-section-title {
  margin: 0;
  padding: 0;
  font-size: 15px;
  font-weight: 600;
  color: #fff;
  border: none;
  line-height: 1.3;
}

.tkt-arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  color: #9ca3af;
  margin-left: 12px;
}

.tkt-arrow svg {
  display: block;
  width: 18px;
  height: 18px;
}

.tkt-section[open] .tkt-arrow {
  transform: rotate(180deg);
}

.tkt-section-content {
  padding: 16px 16px 10px 16px;
  color: #fff;
  line-height: 1.5;
  font-size: 13px;
  animation: slideDown 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.tkt-section-content p {
  margin: 0 0 9px 0;
  line-height: 1.5;
  font-size: 13px;
}

.tkt-update-row {
  margin-bottom: 5px;
  line-height: 1.4;
  word-break: break-word;
  display: flex;
  gap: 7px;
}

.tkt-update-label {
  font-size: 13px;
  font-weight: 500;
  color: #c8ff5a;
  margin-right: 6px;
  letter-spacing: 0.05em;
}

.tkt-update-value {
  font-size: 13px;
  color: #fff;
  font-weight: 400;
}

.tkt-proposal {
  margin-top: 8px;
  padding: 8px 10px;
  background: rgba(200,255,90,0.06);
  border-left: 3px solid #c8ff5a;
  border-radius: 6px;
  font-size: 13px;
  color: rgba(255,255,255,0.88);
  display: flex;
  align-items: center;
  gap: 6px;
}

.tkt-list, .tkt-actions-list {
  margin: 0;
  padding-left: 22px;
  list-style-position: outside;
}

.tkt-list li, .tkt-actions-list li {
  margin-bottom: 3px;
  line-height: 1.45;
  color: #fff;
  font-size: 13px;
  font-weight: 400;
  position: relative;
  background: none;
  border: none;
}

/* Compact mode for mobile */
@media (max-width: 768px) {
  .tkt-root {
    grid-template-columns: 1fr;
  }
  .tkt-sidebar {
    display: none;
  }
  .tkt-content {
    max-height: none;
    padding: 10px;
  }
  .tkt-summary-row {
    grid-template-columns: 1fr;
    gap: 7px;
  }
}

.tkt-sidebar::-webkit-scrollbar,
.tkt-content::-webkit-scrollbar {
  width: 6px;
}
.tkt-sidebar::-webkit-scrollbar-track,
.tkt-content::-webkit-scrollbar-track {
  background: rgba(255,255,255,0.02);
}
.tkt-sidebar::-webkit-scrollbar-thumb,
.tkt-content::-webkit-scrollbar-thumb {
  background: rgba(255,255,255,0.1);
  border-radius: 3px;
}
.tkt-sidebar::-webkit-scrollbar-thumb:hover,
.tkt-content::-webkit-scrollbar-thumb:hover {
  background: rgba(255,255,255,0.15);
}
</style>
