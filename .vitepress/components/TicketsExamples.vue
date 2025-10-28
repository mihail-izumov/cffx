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
      '<span class="tkt-bold">Тип сигнала:</span> КОМПЕНСИРУЕМЫЙ',
      '<span class="tkt-bold">Категория:</span> А (Операционная ошибка — ошибка в заказе)',
      'UPD (27.10.2025 16:35): Выдан сертификат №75303 номиналом 500₽',
      'Финальное сообщение отправлено гостю'
    ],
    emotion: 'Умеренное волнение. Гостья расстроена долгим ожиданием в пустой кофейне, но конструктивна — предлагает решение в виде обучения персонала.',
    guestProposal: 'Обучение персонала',
    promised: [
      'Информация передана управляющему для разбора ситуации',
      'Гостю сообщат результат после получения ответа от управляющего',
      'Предложение по обучению персонала включено в отчёт'
    ],
    actions: [
      'Провести внутреннее расследование: выяснить обстоятельства ошибки, причины и ответственных',
      'Связаться с гостем по Telegram для уточнения деталей',
      'Принять меры для исключения повторения ситуации',
      'Контроль использования сертификата №75303'
    ]
  },
  {
    id: 'educational',
    title: 'Образовательный',
    signal: 'СИГНАЛ 876-456',
    status: '✅ Передано команде',
    date: '21.10.2025 17:13',
    location: 'Космическая, Самарская 101',
    guest: 'Елена',
    contact: '@username',
    sla: 'Не применимо',
    compensation: 'Не требуется',
    problem: 'Гость сообщил, что кофе был слишком горячим.',
    updates: [
      '<span class="tkt-bold">Тип сигнала:</span> ОБРАЗОВАТЕЛЬНЫЙ',
      '<span class="tkt-bold">Категория:</span> Не применимо (образовательный момент)',
      'Компенсация НЕ требуется: ситуация не относится к категории Б'
    ],
    emotion: 'Спокойный (конструктивная обратная связь).',
    guestProposal: 'Информирование о возможности настройки температуры',
    promised: [
      'Чат запущен (✅)',
      'Ответ Анны отправлен через оператора: гостю объяснена возможность попросить лёд или охлаждение напитка',
      'Запрошено уточнение даты и времени визита для передачи обратной связи команде кофейни'
    ],
    actions: [
      'Провести инструктаж с командой бариста о важности проактивного предложения льда или охлаждения напитка гостям',
      'Рассмотреть возможность добавления информации о настройке температуры напитков в меню или на стойке',
      'Передать команде обратную связь: гость не был осведомлён о возможности скорректировать температуру'
    ]
  },
  {
    id: 'chat-not-started',
    title: 'Чат не запущен',
    signal: 'СИГНАЛ 787-294',
    status: '❌ Чат не запущен',
    date: '09.10.2025 19:04',
    location: 'Космическая, Самарская 101',
    guest: 'Лиза',
    contact: '@username',
    sla: '2 часа',
    compensation: 'Сертификат 500₽',
    problem: 'Гостю не доложили один сырник в заказе. Расстроена.',
    updates: [
      '<span class="tkt-bold">Категория:</span> Б (Существенная)',
      '<span class="tkt-bold">Эмоциональное состояние:</span> Разочарование/расстройство',
      'Важно: Так как чат Telegram не запущен гостем, прямой ответ невозможен'
    ],
    emotion: 'Разочарование/расстройство',
    guestProposal: 'Контроль комплектности заказов',
    promised: [
      'Компенсацию можно предложить при следующем визите',
      'Альтернативный канал связи при возможности'
    ],
    actions: [
      'Уточнить количество: сколько сырников было заказано и сколько получено',
      'Уточнить время визита',
      'Выяснить, обращался ли гость к персоналу на месте',
      'Разобрать ситуацию с бариста/поваром',
      'Усилить контроль качества при сборке заказов',
      'Проверить комплектность блюд перед выдачей'
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
    problem: 'Гостья получила черствую выпечку. Выразила удивление таким сервисом, отметив, что столкнулась с подобным впервые.',
    updates: [
      '<span class="tkt-bold">Тип сигнала:</span> КОМПЕНСИРУЕМЫЙ',
      '<span class="tkt-bold">Категория:</span> Б (нарушение качества продукта)',
      'Время реакции: 2 часа 30 минут от первого обращения',
      'Гость не ответил на запрос уточнений'
    ],
    emotion: 'Разочарованный (мягкий негатив, без агрессии)',
    guestProposal: 'Контроль качества и свежести продуктов',
    promised: [
      'Выражена эмпатия, признание недопустимости ситуации',
      'Запрошены уточнения о дате и времени визита',
      'Обещано связаться после получения ответа от директ-менеджера',
      'Уведомление о начале проверки директ-менеджером'
    ],
    actions: [
      'Провести проверку контроля свежести выпечки в кофейне',
      'Проверить процедуры ротации выпечки и списания несвежих позиций',
      'Рассмотреть компенсацию: сертификат 1000₽ (категория Б — нарушение качества продукта)'
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
      '<span class="tkt-bold">Тип сигнала:</span> КОМПЕНСИРУЕМЫЙ',
      '<span class="tkt-bold">Категория:</span> А (Операционная ошибка — ошибка в заказе)',
      'UPD (27.10.2025 16:35): Выдан сертификат №75303 номиналом 500₽',
      'Финальное сообщение отправлено гостю'
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

// Определить мобильный режим (до 768px)
const isMobile = ref(false)
if (typeof window !== 'undefined') {
  const checkMobile = () => isMobile.value = window.innerWidth <= 768
  checkMobile()
  window.addEventListener('resize', checkMobile)
}
</script>

<template>
  <div class="tkt-root">
    <!-- Мобильный выпадающий список -->
    <div class="tkt-mobile-select" v-if="isMobile">
      <select v-model="activeTicket" class="tkt-select">
        <option v-for="ticket in tickets" :key="ticket.id" :value="ticket.id">{{ ticket.title }}</option>
      </select>
    </div>
    <!-- Боковая навигация на десктопе -->
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

    <!-- Основной контент -->
    <div class="tkt-content" role="tabpanel">
      <div v-if="currentTicket" class="tkt-details">
        <!-- Заголовок тикета -->
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
          <details 
            class="tkt-section"
            :ref="el => { if (el) detailsRefs[0] = el }"
            @toggle="handleToggle(0)"
            open
          >
            <summary class="tkt-section-header">
              <h3 class="tkt-section-title">Суть проблемы</h3>
              <span class="tkt-arrow">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
              </span>
            </summary>
            <div class="tkt-section-content">
              <p>{{ currentTicket.problem }}</p>
              <div v-if="currentTicket.updates" class="tkt-updates">
                <p v-for="(update, idx) in currentTicket.updates" :key="idx" v-html="update"></p>
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
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
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
              <h3 class="tkt-section-title">Что обещано гостю</h3>
              <span class="tkt-arrow">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
              </span>
            </summary>
            <div class="tkt-section-content">
              <ul v-if="!currentTicket.actions[0].startsWith('1.')" class="tkt-list tkt-check-list">
                <li v-for="(item, idx) in currentTicket.promised" :key="idx">
                  <span class="tkt-check"></span>{{ item }}
                </li>
              </ul>
              <ol v-else class="tkt-list tkt-num-list">
                <li v-for="(item, idx) in currentTicket.promised" :key="idx">{{ item }}</li>
              </ol>
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
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
              </span>
            </summary>
            <div class="tkt-section-content">
              <ol v-if="currentTicket.actions.length && currentTicket.actions.length <= 8" class="tkt-list tkt-num-list">
                <li v-for="(item, idx) in currentTicket.actions" :key="idx">{{ item }}</li>
              </ol>
              <ul v-else class="tkt-list tkt-check-list">
                <li v-for="(item, idx) in currentTicket.actions" :key="idx">
                  <span class="tkt-check"></span>{{ item }}
                </li>
              </ul>
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
  padding: 13px 14px 11px 18px;
  border: none;
  background: transparent;
  text-align: left;
  cursor: pointer;
  transition: all 0.2s ease;
  display: block;
  border-left: 3px solid transparent;
  line-height: 1.07;
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
  color: rgba(255,255,255,0.89);
  display: block;
}
.tkt-nav-item.active .tkt-title {
  color: #c8ff5a;
}
.tkt-mobile-select {
  padding: 12px 12px 4px 12px;
  background: rgba(255,255,255,0.025);
  border-radius: 12px;
  margin-bottom: 10px;
}
.tkt-select {
  width: 100%;
  padding: 10px 16px;
  font-size: 15px;
  border-radius: 8px;
  background: #262626;
  color: #fff;
  border: 1px solid rgba(255,255,255,0.16);
  outline: none;
  font-weight: 500;
}
.tkt-content {
  padding: 19px;
  overflow-y: auto;
  max-height: 600px;
}

.tkt-details {
  display: flex;
  flex-direction: column;
  gap: 11px;
}

.tkt-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 8px;
  border-bottom: 1px solid rgba(255,255,255,0.08);
  margin-bottom: 2px;
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
  color: rgba(255,255,
