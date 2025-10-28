<script setup>
import { ref, computed } from 'vue'

const activeTicket = ref('negative-1')

const tickets = [
  {
    id: 'negative-1',
    emoji: '⚡️',
    title: 'Долгое ожидание',
    category: 'Категория А',
    signal: 'СИГНАЛ 654-867',
    status: '✅ Обработан',
    date: '09.10.2025 16:00',
    location: 'Космическая, Пензенская 101',
    guest: 'Татьяна',
    contact: '@username',
    problem: 'Гостья посетила кофейню и столкнулась с долгим ожиданием при пустой кофейне. Видя отсутствие других посетителей, ситуация вызвала недоумение и расстройство.',
    updates: [
      'UPD 09.10.2025 16:12 — Получены уточнения от гостя:',
      '• Время визита: 09.10.2025 около 14:00',
      '• Длительность ожидания: 10-15 минут',
      '• Заказ: латте среднего объема и пончик',
      '• Обращение к персоналу: не обращалась'
    ],
    emotion: 'Умеренное волнение. Гостья расстроена долгим ожиданием в пустой кофейне, но конструктивна — предлагает решение в виде обучения персонала.',
    guestProposal: 'Обучение персонала',
    sla: '4 часа (дедлайн: 20:00)',
    compensation: 'Извинения + Сертификат 500₽',
    promised: [
      'Информация передана управляющему для разбора ситуации',
      'Гостю предоставлена обратная связь о принятых мерах',
      'Сертификат 500₽ как извинение за неудобство'
    ],
    actions: [
      'Запросить у управляющего объяснение причин задержки',
      'Проверить наличие персонала в смене и распределение обязанностей',
      'Оценить, была ли проблема в приоритизации задач бариста',
      'Провести беседу о важности скорости обслуживания при низкой загрузке',
      'Рассмотреть необходимость дополнительного обучения команды'
    ]
  },
  {
    id: 'negative-2',
    emoji: '⚡️',
    title: 'Холодный капучино',
    category: 'Категория Б',
    signal: 'СИГНАЛ 655-001',
    status: '✅ Обработан',
    date: '10.10.2025 12:30',
    location: 'Молодогвардейская, 151',
    guest: 'Дмитрий',
    contact: '@dmitry_user',
    problem: 'Гость получил холодный капучино. Проблема повторяется уже не первый раз в этой локации.',
    updates: [
      'UPD 10.10.2025 12:45 — Получены уточнения:',
      '• Время визита: 10.10.2025 около 11:00',
      '• Температура напитка: едва теплый',
      '• Заказ: капучино большой',
      '• Обращение к персоналу: пожаловался бариста'
    ],
    emotion: 'Сильное недовольство. Гость разочарован повторяющейся проблемой и потерей доверия к заведению.',
    guestProposal: 'Системный контроль качества напитков',
    sla: '8 часов (дедлайн: 20:30)',
    compensation: 'Переделка напитка + Сертификат 300₽',
    promised: [
      'Напиток переделан немедленно',
      'Проведена проверка оборудования',
      'Сертификат на следующий визит'
    ],
    actions: [
      'Проверить исправность кофемашины и термометров',
      'Убедиться в правильности настроек температуры молока',
      'Провести дополнительное обучение бариста стандартам температуры',
      'Внедрить контрольные точки проверки температуры напитков'
    ]
  },
  {
    id: 'positive-1',
    emoji: '💚',
    title: 'Отличный сервис',
    category: 'Позитивный опыт',
    signal: 'СИГНАЛ 655-102',
    status: '✅ Зафиксирован',
    date: '11.10.2025 15:20',
    location: 'Космическая, Пензенская 101',
    guest: 'Анна',
    contact: '@anna_smile',
    problem: 'Гостья оставила восторженный отзыв о работе бариста Марии. Отметила профессионализм, внимательность и создание уютной атмосферы.',
    updates: [
      'Детали позитивного опыта:',
      '• Бариста запомнила предпочтения гостя',
      '• Порекомендовала новый десерт',
      '• Создала теплую дружескую атмосферу',
      '• Напиток был приготовлен идеально'
    ],
    emotion: 'Восторг и благодарность. Гостья планирует возвращаться именно к этому бариста.',
    guestProposal: 'Благодарность команде',
    sla: 'Без дедлайна',
    compensation: 'Не требуется',
    promised: [
      'Благодарность передана бариста Марии',
      'Отзыв добавлен в портфолио сотрудника',
      'Информация учтена при оценке эффективности'
    ],
    actions: [
      'Поблагодарить Марию за отличную работу',
      'Зафиксировать кейс как best practice',
      'Использовать пример на обучении команды',
      'Рассмотреть возможность поощрения сотрудника'
    ]
  }
]

const currentTicket = computed(() => 
  tickets.find(t => t.id === activeTicket.value)
)
</script>

<template>
  <div class="tkt-root" data-component="tickets-showcase">
    <!-- Боковая навигация -->
    <div class="tkt-sidebar">
      <div class="tkt-sidebar-header">
        <h3>Примеры тикетов</h3>
      </div>
      <nav class="tkt-nav" role="tablist" aria-label="Список тикетов">
        <button
          v-for="ticket in tickets"
          :key="ticket.id"
          :class="['tkt-nav-item', { active: activeTicket === ticket.id }]"
          @click="activeTicket = ticket.id"
          role="tab"
          :aria-selected="activeTicket === ticket.id"
        >
          <span class="tkt-emoji">{{ ticket.emoji }}</span>
          <span class="tkt-title">{{ ticket.title }}</span>
          <span class="tkt-category">{{ ticket.category }}</span>
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

        <!-- Краткая сводка (всегда видна) -->
        <div class="tkt-summary">
          <div class="tkt-summary-item">
            <span class="tkt-label">Дата:</span>
            <span class="tkt-value">{{ currentTicket.date }}</span>
          </div>
          <div class="tkt-summary-item">
            <span class="tkt-label">Кофейня:</span>
            <span class="tkt-value">{{ currentTicket.location }}</span>
          </div>
          <div class="tkt-summary-item">
            <span class="tkt-label">Гость:</span>
            <span class="tkt-value">{{ currentTicket.guest }}</span>
          </div>
          <div class="tkt-summary-item">
            <span class="tkt-label">Контакт:</span>
            <span class="tkt-value">{{ currentTicket.contact }}</span>
          </div>
          <div class="tkt-summary-item">
            <span class="tkt-label">SLA:</span>
            <span class="tkt-value">{{ currentTicket.sla }}</span>
          </div>
          <div class="tkt-summary-item">
            <span class="tkt-label">Компенсация:</span>
            <span class="tkt-value">{{ currentTicket.compensation }}</span>
          </div>
        </div>

        <!-- Раскрывающиеся секции -->
        <div class="tkt-sections">
          <details class="tkt-section" open>
            <summary class="tkt-section-header">Суть проблемы</summary>
            <div class="tkt-section-content">
              <p>{{ currentTicket.problem }}</p>
              <div v-if="currentTicket.updates" class="tkt-updates">
                <p v-for="(update, idx) in currentTicket.updates" :key="idx">{{ update }}</p>
              </div>
            </div>
          </details>

          <details class="tkt-section">
            <summary class="tkt-section-header">Эмоциональное состояние</summary>
            <div class="tkt-section-content">
              <p>{{ currentTicket.emotion }}</p>
              <div class="tkt-proposal">
                <strong>Предложение гостя:</strong> {{ currentTicket.guestProposal }}
              </div>
            </div>
          </details>

          <details class="tkt-section">
            <summary class="tkt-section-header">Что обещано гостю</summary>
            <div class="tkt-section-content">
              <ul class="tkt-list">
                <li v-for="(item, idx) in currentTicket.promised" :key="idx">{{ item }}</li>
              </ul>
            </div>
          </details>

          <details class="tkt-section">
            <summary class="tkt-section-header">Рекомендации для команды</summary>
            <div class="tkt-section-content">
              <ol class="tkt-list">
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
/* Корневой контейнер */
.tkt-root {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 0;
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 12px;
  overflow: hidden;
  background: rgba(255,255,255,0.02);
  margin: 24px 0;
}

/* Боковая панель навигации */
.tkt-sidebar {
  background: rgba(255,255,255,0.03);
  border-right: 1px solid rgba(255,255,255,0.08);
  overflow-y: auto;
  max-height: 600px;
}

.tkt-sidebar-header {
  padding: 20px 16px 16px;
  border-bottom: 1px solid rgba(255,255,255,0.08);
  position: sticky;
  top: 0;
  background: rgba(255,255,255,0.03);
  backdrop-filter: blur(8px);
  z-index: 10;
}

.tkt-sidebar-header h3 {
  margin: 0;
  font-size: 15px;
  font-weight: 700;
  color: rgba(255,255,255,0.92);
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.tkt-nav {
  padding: 4px 0;
}

.tkt-nav-item {
  width: 100%;
  padding: 14px 16px;
  border: none;
  background: transparent;
  text-align: left;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  flex-direction: column;
  gap: 6px;
  border-left: 3px solid transparent;
}

.tkt-nav-item:hover {
  background: rgba(255,255,255,0.06);
}

.tkt-nav-item.active {
  background: rgba(200,255,90,0.08);
  border-left-color: #c8ff5a;
}

.tkt-emoji {
  font-size: 18px;
  line-height: 1;
}

.tkt-title {
  font-size: 14px;
  font-weight: 600;
  color: rgba(255,255,255,0.92);
  line-height: 1.3;
}

.tkt-nav-item.active .tkt-title {
  color: #c8ff5a;
}

.tkt-category {
  font-size: 12px;
  color: rgba(255,255,255,0.5);
  font-weight: 500;
}

/* Основной контент */
.tkt-content {
  padding: 24px;
  overflow-y: auto;
  max-height: 600px;
}

.tkt-details {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* Заголовок тикета */
.tkt-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 16px;
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
  font-size: 13px;
  color: rgba(255,255,255,0.6);
  font-weight: 600;
}

/* Краткая сводка */
.tkt-summary {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 12px;
  padding: 18px;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 10px;
}

.tkt-summary-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.tkt-label {
  font-size: 12px;
  font-weight: 700;
  color: rgba(255,255,255,0.5);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.tkt-value {
  font-size: 14px;
  color: rgba(255,255,255,0.88);
  font-weight: 500;
}

/* Раскрывающиеся секции */
.tkt-sections {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.tkt-section {
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 10px;
  overflow: hidden;
  background: rgba(255,255,255,0.02);
  transition: all 0.2s ease;
}

.tkt-section:hover {
  border-color: rgba(255,255,255,0.12);
}

.tkt-section[open] {
  background: rgba(255,255,255,0.04);
}

.tkt-section-header {
  padding: 14px 18px;
  background: rgba(255,255,255,0.04);
  cursor: pointer;
  font-size: 14px;
  font-weight: 700;
  color: rgba(255,255,255,0.92);
  list-style: none;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 10px;
}

.tkt-section-header::-webkit-details-marker {
  display: none;
}

.tkt-section-header::before {
  content: "▶";
  font-size: 11px;
  color: rgba(255,255,255,0.5);
  transition: transform 0.2s ease;
  flex-shrink: 0;
}

.tkt-section[open] .tkt-section-header::before {
  transform: rotate(90deg);
  color: #c8ff5a;
}

.tkt-section-header:hover {
  background: rgba(255,255,255,0.06);
  color: #c8ff5a;
}

.tkt-section-content {
  padding: 18px;
  border-top: 1px solid rgba(255,255,255,0.06);
}

.tkt-section-content p {
  margin: 0 0 12px 0;
  line-height: 1.6;
  color: rgba(255,255,255,0.88);
  font-size: 14px;
}

.tkt-section-content p:last-child {
  margin-bottom: 0;
}

.tkt-updates {
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid rgba(255,255,255,0.06);
}

.tkt-updates p {
  font-size: 13px;
  color: rgba(255,255,255,0.75);
  margin-bottom: 6px;
}

.tkt-proposal {
  margin-top: 12px;
  padding: 12px;
  background: rgba(200,255,90,0.06);
  border-left: 3px solid #c8ff5a;
  border-radius: 6px;
  font-size: 13px;
  color: rgba(255,255,255,0.88);
}

.tkt-proposal strong {
  color: #c8ff5a;
  font-weight: 700;
}

.tkt-list {
  margin: 0;
  padding-left: 20px;
  list-style-position: outside;
}

.tkt-list li {
  margin-bottom: 10px;
  line-height: 1.6;
  color: rgba(255,255,255,0.88);
  font-size: 14px;
}

.tkt-list li:last-child {
  margin-bottom: 0;
}

/* Мобильная адаптация */
@media (max-width: 768px) {
  .tkt-root {
    grid-template-columns: 1fr;
    max-height: none;
  }
  
  .tkt-sidebar {
    border-right: none;
    border-bottom: 1px solid rgba(255,255,255,0.08);
    max-height: none;
  }
  
  .tkt-nav {
    display: flex;
    overflow-x: auto;
    gap: 8px;
    padding: 8px;
    scrollbar-width: thin;
  }
  
  .tkt-nav::-webkit-scrollbar {
    height: 4px;
  }
  
  .tkt-nav::-webkit-scrollbar-thumb {
    background: rgba(255,255,255,0.2);
    border-radius: 2px;
  }
  
  .tkt-nav-item {
    flex: 0 0 auto;
    min-width: 160px;
    border-radius: 10px;
    border-left: none;
    border-bottom: 3px solid transparent;
  }
  
  .tkt-nav-item.active {
    border-left: none;
    border-bottom-color: #c8ff5a;
  }
  
  .tkt-content {
    max-height: none;
  }
  
  .tkt-summary {
    grid-template-columns: 1fr;
  }
}

/* Скроллбар для десктопа */
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
