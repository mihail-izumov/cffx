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
      { label: 'Категория:', value: 'А (негативный опыт обслуживания — долгое ожидание при низкой загрузке)' },
      { label: 'UPD (09.10.2025 16:12):', value: 'Получены уточнения от гостя...' }
    ],
    emotion: [
      'Умеренное волнение. Гостья расстроена долгим ожиданием в пустой кофейне, но конструктивна — предлагает решение в виде обучения персонала.',
      { label: 'Предложение гостя:', value: 'Обучение персонала' }
    ],
    promised: [
      'Информация передана управляющему для разбора ситуации',
      'Гостю сообщат результат после получения ответа от управляющего',
      'Предложение по обучению персонала включено в отчёт'
    ],
    actions: [
      'Связаться с Татьяной и принести искренние извинения за ожидание',
      'Предложить компенсацию (сертификат 500₽ по категории А)',
      'Провести разбор с персоналом',
      'Выяснить, кто был на смене',
      'Проверить распределение зон ответственности',
      'Усилить контроль за временем обслуживания',
      'Проверить процесс встречи гостей при входе',
      'Рассмотреть предложение по обучению персонала',
      'Тон ответа: искренние извинения + благодарность'
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
      'Гость расстроена из-за ошибки в заказе. Обратилась 27 октября 2025 года в 12:49. Детали уточняются: дата и время заказа, характер ошибки, формат заказа.',
      { label: 'Тип сигнала:', value: 'КОМПЕНСИРУЕМЫЙ' },
      { label: 'Категория:', value: 'А (Операционная ошибка — ошибка в заказе)' },
      { label: 'UPD (27.10.2025 16:35):', value: 'Выдан сертификат №75303 номиналом 500₽' },
      'Финальное сообщение отправлено гостю'
    ],
    emotion: [
      'Расстроена (разочарована) — требуется проявление эмпатии и действия для восстановления доверия',
      { label: 'Предложение гостя:', value: 'Исключить повторение ошибок в заказах' }
    ],
    promised: [
      'Отправлено приветствие с благодарностью за обратную связь',
      'Выражена эмпатия',
      'Заданы уточняющие вопросы',
      'Отправлен сертификат 500₽ (№75303)',
      'Сообщены условия использования',
      'Запрос о факте использования сертификата через 3 дня'
    ],
    actions: [
      'Провести внутреннее расследование: выяснить обстоятельства ошибки',
      'Связаться с гостем по Telegram для уточнения деталей',
      'Принять меры для исключения повторения ситуации',
      'Контроль использования сертификата №75303'
    ]
  }
  // Другие тикеты добавь по аналогии
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

// Мобильный детект (можно улучшить)
if (typeof window !== 'undefined') {
  isMobile.value = window.innerWidth <= 768
  window.addEventListener('resize', () => {
    isMobile.value = window.innerWidth <= 768
  })
}
</script>

<template>
  <div class="tkt-root">
    <!-- Моб. версия: выпадающий список -->
    <div v-if="isMobile" class="tkt-dropdown-mobile">
      <select v-model="activeTicket" class="tkt-select-mobile">
        <option v-for="ticket in tickets" :key="ticket.id" :value="ticket.id">{{ ticket.title }}</option>
      </select>
    </div>
    <!-- Десктоп навигация -->
    <div v-else class="tkt-sidebar">
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

    <!-- Контент -->
    <div class="tkt-content" role="tabpanel">
      <div v-if="currentTicket" class="tkt-details">
        <!-- Заголовок -->
        <div class="tkt-header">
          <span class="tkt-signal">{{ currentTicket.signal }}</span>
          <span class="tkt-status">{{ currentTicket.status }}</span>
        </div>

        <!-- Краткая сводка -->
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
          <!-- Суть проблемы -->
          <details
            class="tkt-section"
            :ref="el => { if (el) detailsRefs[0] = el }"
            @toggle="handleToggle(0)"
            open
          >
            <summary class="tkt-section-header">
              <span class="tkt-section-title">Суть проблемы</span>
              <span class="tkt-arrow">
                <svg width="20" height="20" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>
              </span>
            </summary>
            <div class="tkt-section-content">
              <template v-for="item in currentTicket.problem">
                <p v-if="typeof item === 'string'" class="tkt-p">
                  {{ item }}
                </p>
                <p v-else class="tkt-p">
                  <span class="tkt-em-label">{{ item.label }}</span>
                  {{ item.value }}
                </p>
              </template>
            </div>
          </details>

          <!-- Эмоциональное состояние -->
          <details
            class="tkt-section"
            :ref="el => { if (el) detailsRefs[1] = el }"
            @toggle="handleToggle(1)"
          >
            <summary class="tkt-section-header">
              <span class="tkt-section-title">Эмоциональное состояние</span>
              <span class="tkt-arrow">
                <svg width="20" height="20" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>
              </span>
            </summary>
            <div class="tkt-section-content">
              <template v-for="item in currentTicket.emotion">
                <p v-if="typeof item === 'string'" class="tkt-p">{{ item }}</p>
                <p v-else class="tkt-p">
                  <span class="tkt-em-label">{{ item.label }}</span>
                  {{ item.value }}
                </p>
              </template>
            </div>
          </details>

          <!-- Что обещано гостю -->
          <details
            class="tkt-section"
            :ref="el => { if (el) detailsRefs[2] = el }"
            @toggle="handleToggle(2)"
          >
            <summary class="tkt-section-header">
              <span class="tkt-section-title">Что обещано гостю</span>
              <span class="tkt-arrow">
                <svg width="20" height="20" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>
              </span>
            </summary>
            <div class="tkt-section-content">
              <ul class="tkt-list checker" v-if="!isMobile">
                <li v-for="item in currentTicket.promised" class="tkt-list-chek">{{ item }}</li>
              </ul>
              <ul class="tkt-list dot" v-if="isMobile">
                <li v-for="item in currentTicket.promised">{{ item }}</li>
              </ul>
            </div>
          </details>

          <!-- Рекомендации для команды -->
          <details
            class="tkt-section"
            :ref="el => { if (el) detailsRefs[3] = el }"
            @toggle="handleToggle(3)"
          >
            <summary class="tkt-section-header">
              <span class="tkt-section-title">Рекомендации для команды</span>
              <span class="tkt-arrow">
                <svg width="20" height="20" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>
              </span>
            </summary>
            <div class="tkt-section-content">
              <ol class="tkt-list numbered">
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

.tkt-sidebar { background: rgba(255,255,255,0.03); border-right: 1px solid rgba(255,255,255,0.08); overflow-y: auto; max-height: 600px; }
.tkt-nav { padding: 0; margin: 0; }
.tkt-nav-item { width: 100%; padding: 12px 14px; border: none; background: transparent; text-align: left; cursor: pointer; transition: all 0.2s; display: block; border-left: 3px solid transparent; font-size: 14px; font-weight: 500; }
.tkt-nav-item:hover { background: rgba(255,255,255,0.06); }
.tkt-nav-item.active { background: rgba(200,255,90,0.08); border-left-color: #c8ff5a; }
.tkt-title { font-size: 14px; font-weight: 600; color: rgba(255,255,255,0.92); display: block; line-height: 1.3; }
.tkt-nav-item.active .tkt-title { color: #c8ff5a; }

.tkt-dropdown-mobile { width: 100%; padding: 12px 10px 8px 10px; background: rgba(255,255,255,0.03); }
.tkt-select-mobile { width: 100%; padding: 9px 12px; font-size: 15px; border-radius: 9px; border: 1px solid rgba(255,255,255,0.1); background: rgba(255,255,255,0.04); color: #fff; font-weight: 500; }

.tkt-content { padding: 16px; overflow-y: auto; max-height: 600px; }
.tkt-details { display: flex; flex-direction: column; gap: 12px; }

.tkt-header { display: flex; justify-content: space-between; align-items: center; padding-bottom: 8px; border-bottom: 1px solid rgba(255,255,255,0.08); }
.tkt-signal { font-family: 'SF Mono', Monaco, 'Courier New', monospace; font-size: 15px; font-weight: 700; color: #c8ff5a; letter-spacing: 0.02em; }
.tkt-status { font-size: 13px; color: rgba(255,255,255,0.55); font-weight: 600; }

.tkt-summary { display: flex; flex-direction: column; gap: 5px; padding: 12px; background: rgba(255,255,255,0.035); border: 1px solid rgba(255,255,255,0.075); border-radius: 10px; margin-bottom: 0; }
.tkt-summary-row { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
.tkt-summary-item { display: flex; flex-direction: column; gap: 2px; }
.tkt-label { font-size: 11px; font-weight: 700; color: rgba(255,255,255,0.41); text-transform: uppercase; letter-spacing: 0.05em; }
.tkt-value { font-size: 13.5px; color: rgba(255,255,255,0.92); font-weight: 500; line-height: 1.3; }

.tkt-sections { display: flex; flex-direction: column; gap: 6px; }

.tkt-section { background: rgba(255,255,255,0.03); border: none; border-radius: 12px; overflow: hidden; transition: all 0.4s; }
.tkt-section-header { display: flex; align-items: center; justify-content: space-between; padding: 15px 18px; cursor: pointer; list-style: none; user-select: none; background: transparent; margin: 0; }
.tkt-section-title { font-size: 15px; font-weight: 600; color: #ffffff; }
.tkt-arrow { display: flex; align-items: center; justify-content: center; flex-shrink: 0; transition: transform 0.4s; color: #9ca3af; }
.tkt-arrow svg { width: 18px; height: 18px; }
.tkt-section[open] .tkt-arrow { transform: rotate(180deg); }
.tkt-section-content { padding: 10px 18px 6px 18px; color: #fff; line-height: 1.45; margin-top: 6px; }

.tkt-p { margin: 0 0 3px !important; font-size: 13.5px; color: #fff; line-height: 1.45; }
.tkt-em-label { font-weight: 500; color: #c8ff5a; margin-right: 5px; }
.tkt-proposal { margin-top: 11px; padding: 8px 10px; background: rgba(200,255,90,0.07); border-left: 3px solid #c8ff5a; border-radius: 6px; font-size: 13px; color: rgba(255,255,255,0.88); }

.tkt-list { margin: 0; list-style-position: outside; padding-left: 22px; }
.tkt-list.dot li { list-style-type: disc; font-size: 13px; margin-bottom: 3px; }
.tkt-list.numbered li { list-style-type: decimal; font-size: 13px; margin-bottom: 3px; }

.tkt-list.checker { list-style: none; padding: 0; }
.tkt-list-chek { font-size: 13px; color: #fff; margin-bottom: 3px; position: relative; padding-left: 18px; }
.tkt-list-chek:before { content: ''; display: inline-block; position: absolute; left: 0; top: 3px; width: 10px; height: 10px; background: #c8ff5a; border-radius: 50%; }

.tkt-list-dot { margin-bottom: 0; }

@media (max-width: 768px) {
  .tkt-root { grid-template-columns: 1fr; }
  .tkt-sidebar { display: none; }
  .tkt-content { max-height: none; padding: 10px; }
  .tkt-summary-row { grid-template-columns: 1fr; gap: 5px; }
  .tkt-section-header { font-size: 14px; padding: 14px 12px; }
  .tkt-section-content { padding: 8px 11px 4px 11px; font-size: 13px; }
}

/* Видимая стрелка только справа, без повторов */
.tkt-section-header::marker, .tkt-section-header::-webkit-details-marker { display: none; }
</style>
