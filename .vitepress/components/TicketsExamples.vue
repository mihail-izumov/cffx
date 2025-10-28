<script setup>
import { ref, computed } from 'vue'

const activeTicket = ref('negative-1')
const isMobile = ref(false)

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
      'Гостья посетила кофейню и столкнулась с долгим ожиданием при пустой кофейне. Видя отсутствие других посетителей, ситуация вызвала недоумение и расстройство.',
      { label: 'Тип сигнала:', value: 'КОМПЕНСИРУЕМЫЙ' },
      { label: 'Категория:', value: 'A (Операционная ошибка — ошибка в заказе)' },
      'UPD (27.10.2025 16:35): Выдан сертификат №75303 номиналом 500₽',
      'Финальное сообщение отправлено гостю'
    ],
    actions: [
      'Провести внутреннее расследование: выяснить обстоятельства ошибки, причины и ответственных',
      'Связаться с гостем по Telegram для уточнения деталей',
      'Принять меры для исключения повторения ситуации',
      'Контроль использования сертификата №75303'
    ]
  },
  {
    id: 'quality-violation',
    title: 'Нарушение качества',
    signal: 'СИГНАЛ 476-102',
    status: '⚠️ SLA нарушен',
    date: '21.10.2025 10:56',
    location: 'Космическая, Тверская 101',
    guest: 'Ольга',
    contact: '@username',
    sla: '2 часа (дедлайн: 12:56) — НАРУШЕН',
    compensation: 'Сертификат 1000₽',
    problem: [
      'Гостья получила черствую выпечку. Выразила удивление таким сервисом, отметив, что столкнулась с подобным впервые.',
      { label: 'Тип сигнала:', value: 'КОМПЕНСИРУЕМЫЙ' },
      { label: 'Категория:', value: 'Б (нарушение качества продукта)' }
    ],
    actions: [
      'Провести проверку контроля свежести выпечки в кофейне',
      'Проверить процедуры ротации выпечки и списания несвежих позиций',
      'Рассмотреть компенсацию: сертификат 1000₽ (категория Б — нарушение качества продукта)'
    ]
  }
  // ... остальное тикеты аналогично (добавьте свои по необходимости)
]

const currentTicket = computed(() =>
  tickets.find(t => t.id === activeTicket.value)
)

function handleResize() {
  isMobile.value = window.innerWidth <= 780
}

if (typeof window !== 'undefined') {
  window.addEventListener('resize', handleResize)
  handleResize()
}
</script>

<template>
  <div class="tkt-root">
    <!-- Мобильный dropdown -->
    <div v-if="isMobile" class="tkt-mobile-select">
      <select v-model="activeTicket">
        <option v-for="ticket in tickets" :value="ticket.id">{{ ticket.title }}</option>
      </select>
    </div>

    <!-- Desktop sidebar -->
    <div v-if="!isMobile" class="tkt-sidebar">
      <nav class="tkt-nav" role="tablist">
        <button
          v-for="ticket in tickets"
          :key="ticket.id"
          :class="['tkt-nav-item', { active: activeTicket === ticket.id }]"
          @click="activeTicket = ticket.id"
          role="tab"
        >
          <span class="tkt-title">{{ ticket.title }}</span>
        </button>
      </nav>
    </div>

    <!-- Основной контент -->
    <div class="tkt-content" role="tabpanel">
      <div v-if="currentTicket" class="tkt-details">
        <div class="tkt-header">
          <span class="tkt-signal">{{ currentTicket.signal }}</span>
          <span class="tkt-status">{{ currentTicket.status }}</span>
        </div>
        <div class="tkt-summary">
          <div>
            <span class="tkt-label">ДАТА:</span>
            <span class="tkt-value">{{ currentTicket.date }}</span>
          </div>
          <div>
            <span class="tkt-label">КОФЕЙНЯ:</span>
            <span class="tkt-value">{{ currentTicket.location }}</span>
          </div>
          <div>
            <span class="tkt-label">ГОСТЬ:</span>
            <span class="tkt-value">{{ currentTicket.guest }}</span>
          </div>
          <div>
            <span class="tkt-label">КОНТАКТ:</span>
            <span class="tkt-value">{{ currentTicket.contact }}</span>
          </div>
          <div>
            <span class="tkt-label">SLA:</span>
            <span class="tkt-value">{{ currentTicket.sla }}</span>
          </div>
          <div>
            <span class="tkt-label">КОМПЕНСАЦИЯ:</span>
            <span class="tkt-value">{{ currentTicket.compensation }}</span>
          </div>
        </div>

        <div class="tkt-sections">
          <!-- Аккордеон 1 -->
          <details class="tkt-section" open>
            <summary class="tkt-section-header">
              <span class="tkt-section-title">Суть проблемы</span>
              <span class="tkt-arrow">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
              </span>
            </summary>
            <div class="tkt-section-content">
              <template v-for="(item, idx) in currentTicket.problem" :key="idx">
                <div v-if="typeof item === 'string'" class="tkt-text-row">{{ item }}</div>
                <div v-else class="tkt-bold-row">
                  <span class="tkt-bold-label">{{ item.label }}</span> <span>{{ item.value }}</span>
                </div>
              </template>
            </div>
          </details>

          <!-- Аккордеон 2 -->
          <details class="tkt-section">
            <summary class="tkt-section-header">
              <span class="tkt-section-title">Рекомендации для команды</span>
              <span class="tkt-arrow">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
              </span>
            </summary>
            <div class="tkt-section-content">
              <ol class="tkt-list" v-if="currentTicket.actions.length">
                <li v-for="(action, idx) in currentTicket.actions" :key="idx">
                  {{ action }}
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
  grid-template-columns: 170px 1fr;
  border-radius: 14px;
  overflow: hidden;
  border: 1px solid rgba(255,255,255,0.07);
  background: #17181c;
}
.tkt-mobile-select {
  padding: 16px 16px 0 16px;
  background: #17181c;
}
.tkt-mobile-select select {
  width: 100%;
  padding: 9px 12px;
  font-size: 15px;
  border-radius: 10px;
  border: 1px solid rgba(255,255,255,0.10);
  background: #232329;
  color: #fafafa;
  margin-bottom: 2px;
}
.tkt-sidebar {
  background: #17181c;
  border-right: 1px solid rgba(255,255,255,0.07);
  min-width: 170px;
  max-width: 170px;
  padding-top: 0;
}
.tkt-nav {
  padding: 0;
  margin: 0;
}
.tkt-nav-item {
  display: block;
  width: 100%;
  padding: 12px 16px 8px 16px;
  font-size: 15px;
  border: none;
  background: transparent;
  text-align: left;
  cursor: pointer;
  border-left: 3px solid transparent;
  color: #fafafa;
  font-weight: 500;
  line-height: 1.2;
  transition: background 0.2s, border-left-color 0.2s, color 0.2s;
}
.tkt-nav-item:hover {
  background: #232329;
}
.tkt-nav-item.active {
  background: #232329;
  border-left-color: #c8ff5a;
  color: #c8ff5a;
}
.tkt-title {
  font-size: 15px;
  font-weight: 500;
  color: inherit;
  display: block;
  line-height: 1.22;
}
.tkt-content {
  padding: 24px 24px 32px 24px;
  overflow-y: auto;
}
.tkt-details {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.tkt-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 7px;
  border-bottom: 1px solid rgba(255,255,255,0.07);
  margin-bottom: 12px;
}
.tkt-signal {
  font-family: 'SF Mono', Monaco, 'Courier New', monospace;
  font-size: 15px;
  font-weight: 500;
  color: #c8ff5a;
  letter-spacing: 0.01em;
}
.tkt-status {
  font-size: 13px;
  color: #c2c2cb;
  font-weight: 500;
}
.tkt-summary {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 7px;
  padding: 12px 10px 8px 10px;
  background: #222229;
  border-radius: 8px;
  margin-bottom: 10px;
  font-size: 14px;
  line-height: 1.2;
}
.tkt-label {
  font-size: 11px;
  font-weight: 600;
  color: #a0a0aa;
  margin-bottom: 1px;
  letter-spacing: 0.04em;
}
.tkt-value {
  font-size: 14px;
  color: #f7f7f7;
  font-weight: 500;
}
.tkt-sections {
  display: flex;
  flex-direction: column;
  gap: 7px;
  margin-top: 0;
}
.tkt-section {
  background: #222229;
  border-radius: 12px;
  border: none;
  margin-bottom: 0;
  box-shadow: none;
  transition: background 0.2s;
}
.tkt-section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  list-style: none;
  user-select: none;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 18px 24px 7px 21px;
  margin-bottom: 0;
}
.tkt-section-title {
  font-size: 16px;
  font-weight: 600;
  color: #fff;
  margin: 0;
}
.tkt-arrow {
  display: flex;
  align-items: center;
  margin-left: 18px;
  color: #7e818c;
  transition: transform 0.3s;
}
.tkt-section[open] .tkt-arrow {
  transform: rotate(180deg);
}
.tkt-section-content {
  padding: 16px 21px 13px 21px;
  color: #f7f7f7;
  font-size: 14px;
  line-height: 1.32;
}
.tkt-text-row {
  margin-bottom: 7px;
}
.tkt-bold-row {
  margin-bottom: 7px;
  font-weight: 500;
  color: #fafafa;
}
.tkt-bold-label {
  font-weight: 600;
  color: #e3e3e5;
  margin-right: 5px;
}
.tkt-list {
  margin: 0;
  padding-left: 24px;
  font-size: 14px;
}
.tkt-list li {
  margin-bottom: 7px;
  line-height: 1.35;
  color: #fafafa;
  font-weight: 400;
  padding-left: 0;
}

/* MOBILE STYLES */
@media (max-width: 780px) {
  .tkt-root {
    grid-template-columns: 1fr;
  }
  .tkt-content {
    padding: 14px 7px 24px 7px;
  }
  .tkt-summary {
    grid-template-columns: 1fr;
    gap: 5px;
    padding: 10px 6px 6px 6px;
    font-size: 13px;
  }
  .tkt-header {
    padding-bottom: 7px;
    margin-bottom: 10px;
  }
  .tkt-section-header {
    padding: 14px 12px 5px 12px;
  }
  .tkt-section-content {
    padding: 12px 12px 7px 12px;
  }
}
</style>
