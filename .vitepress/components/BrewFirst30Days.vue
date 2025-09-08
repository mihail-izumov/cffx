<script setup>
import { ref } from 'vue'
// Устанавливаем первую вкладку активной по умолчанию
const activeTab = ref('day-1')
</script>
<template>
  <div class="tabs-mr">
    <button :class="{ active: activeTab === 'day-1' }" @click="activeTab = 'day-1'">
      ДЕНЬ 1
    </button>
    <button :class="{ active: activeTab === 'day-7' }" @click="activeTab = 'day-7'">
      ДЕНЬ 7
    </button>
    <button :class="{ active: activeTab === 'day-14' }" @click="activeTab = 'day-14'">
      ДЕНЬ 14
    </button>
    <button :class="{ active: activeTab === 'day-21' }" @click="activeTab = 'day-21'">
      ДЕНЬ 21
    </button>
    <button :class="{ active: activeTab === 'day-30' }" @click="activeTab = 'day-30'">
      ДЕНЬ 30+
    </button>
    <button :class="{ active: activeTab === 'result' }" @click="activeTab = 'result'">
      Результат
    </button>
  </div>
  <div class="panel-mr">
    <!-- Вкладка: ДЕНЬ 1 -->
    <div v-show="activeTab === 'day-1'" class="content-mr">
      <h3>ДЕНЬ 1 – Установите базовую линию</h3>
      <h4>Погружение в Диалоги с данными Самары</h4>
      <p class="intro-p">Вы получаете доступ к цифровой копии кофейного рынка, построенной на <strong>29,600+ уникальных отзывах</strong>. Первые 24 часа — это ваша <strong>диагностика реальности</strong>: вы задаете любые вопросы о кофе, меню, выручке, качестве, ценах и локациях.</p>
      <h4>Что происходит:</h4>
      <ul>
        <li><strong>Первые инсайты –</strong> Вы мгновенно видите свою позицию на рынке</li>
        <li><strong>Поддержка ИИ-ассистента Анна –</strong> Она подскажет, как работать с симулятором эффективнее и получить максимум</li>
        <li><strong>Готовые сценарии для анализа –</strong> Вы сразу можете исследовать:
          <ul class="nested-list">
            <li><strong>Критические слабости –</strong> Проблемы, из-за которых бизнес теряет клиентов (например, 31% жалоб на скорость)</li>
            <li><strong>Суперсилы лидеров –</strong> Декомпозиция того, как Корж масштабирует уют или как Skuratov строит систему</li>
            <li><strong>Конкурентная карта –</strong> Объективное сравнение игроков по 10 критериям</li>
          </ul>
        </li>
      </ul>
      <div class="result-block">
        <p><strong>Результат –</strong> Вместо интуиции — <strong>точные данные</strong> о том, где вы находитесь</p>
      </div>
    </div>
    <!-- Вкладка: ДЕНЬ 7 -->
    <div v-show="activeTab === 'day-7'" class="content-mr">
      <h3>ДЕНЬ 7 – Получите карту битвы</h3>
      <h4>Первый отчет Сигнала — Как победить кофейню через дорогу</h4>
      <p class="intro-p">Система анализирует вашу кофейню и 3 ближайших конкурентов в реальном времени, предоставляя детальное сравнение по 10 критериям на основе отзывов реальных гостей.</p>
      <h4>Что вы узнаете:</h4>
      <ul>
        <li><strong>Почему уходят клиенты –</strong> Конкретные причины — долгое обслуживание, плохой эспрессо, неудобные стулья, плохой плейлист</li>
        <li><strong>Слабости конкурентов –</strong> Что не нравится гостям ваших конкурентов и как это использовать в своих интересах</li>
        <li><strong>План Контратаки –</strong> 3 конкретных, выполнимых действия на ближайшую неделю</li>
      </ul>
      <div class="result-block">
        <p><strong>Результат –</strong> У вас на руках <strong>точный план по захвату 15% клиентов</strong> у конкурентов в течение месяца</p>
      </div>
    </div>
    <!-- Вкладка: ДЕНЬ 14 -->
    <div v-show="activeTab === 'day-14'" class="content-mr">
      <h3>ДЕНЬ 14 – Превратите данные в стратегию</h3>
      <h4>Персональная 90-минутная сессия с аналитиком Сигнала</h4>
      <p class="intro-p">Это не общие советы, а <strong>живая расшифровка вашего отчета Сигнала</strong> с профессиональным аналитиком для создания конкретных решений под вашу ситуацию.</p>
      <h4>Фокус сессии:</h4>
      <ul>
        <li><strong>Превратить жалобы</strong> клиентов в точки кратного роста</li>
        <li><strong>Деконструировать успехи</strong> конкурентов и адаптировать их для вашего бизнеса</li>
        <li><strong>Найти новые источники дохода</strong> без лишних трат</li>
      </ul>
      <div class="result-block">
        <p><strong>Результат –</strong> Вы переходите от хаоса данных к <strong>четкому плану действий</strong> с задачами и приоритетами</p>
      </div>
    </div>
    <!-- Вкладка: ДЕНЬ 21 -->
    <div v-show="activeTab === 'day-21'" class="content-mr">
      <h3>ДЕНЬ 21 – Запустите систему роста</h3>
      <h4>3 быстрых действия для закрепления преимущества</h4>
      <p class="intro-p">Теперь вы знаете свои уникальные суперсилы и критические слабости. Время действовать.</p>
      <h4>Ваш план:</h4>
      <ol>
        <li><strong>Усильте лучшее –</strong> Найдите критерий, где вы лидер, и начните говорить об этом громче</li>
        <li><strong>Атакуйте слабости –</strong> Для каждой проблемы найдите корневую причину, используя метод 5 почему</li>
        <li><strong>Используйте голос клиента –</strong> Превратите цитаты из отзывов в готовый материал для рекламы, обучения персонала и исправления проблем</li>
      </ol>
      <div class="result-block">
        <p><strong>Результат –</strong> Вы внедряете <strong>конкретные изменения, которые клиенты заметят</strong> уже на этой неделе</p>
      </div>
    </div>
    <!-- Вкладка: ДЕНЬ 30+ -->
    <div v-show="activeTab === 'day-30'" class="content-mr">
      <h3>ДЕНЬ 30+ Зафиксируйте и масштабируйте</h3>
      <h4>Подготовка к следующему циклу роста</h4>
      <p class="intro-p">Первый месяц показал, что работает. Теперь время <strong>системно наращивать преимущество</strong> и готовиться к новым вызовам рынка.</p>
      <h4>Что дальше:</h4>
      <ul>
        <li><strong>Второй отчет Сигнала</strong> для отслеживания динамики</li>
        <li><strong>Новые, более глубокие вопросы</strong> для симулятора на основе полученного опыта</li>
        <li><strong>Следующая персональная сессия</strong> для планирования масштабирования</li>
      </ul>
      <div class="result-block">
        <p><strong>Результат –</strong> Вы создаете <strong>устойчивую систему роста</strong>, которая работает быстрее и точнее конкурентов</p>
      </div>
    </div>
    <!-- Вкладка: Результат -->
    <div v-show="activeTab === 'result'" class="content-mr">
        <h3>↑ 17–26% выручки [Вашей Кофейни] за 30 дней</h3>
        <div class="transformation-item">
            <p>Думали, что проблема в кофе</p>
            <span class="arrow">→</span>
            <p><strong>Узнали –</strong> реальная проблема в скорости обслуживания (31% жалоб)</p>
        </div>
        <div class="transformation-item">
            <p>Копировали конкурентов вслепую</p>
            <span class="arrow">→</span>
            <p><strong>Получили –</strong> точный план того, что у них работает и как это применить</p>
        </div>
        <div class="transformation-item">
            <p>Принимали решения на эмоциях</p>
            <span class="arrow">→</span>
            <p><strong>Имеете –</strong> решения, основанные на данных реальных клиентов для каждого шага</p>
        </div>
        
        <div class="result-block">
            <p><strong>Сколько забрать у конкурентов через дорогу?</strong></p>
            <a href="/invest/calc" class="calc-button">Прогноз дохода</a>
        </div>
    </div>
  </div>
</template>
<style scoped>
.tabs-mr {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 14px;
}
.tabs-mr button {
  appearance: none;
  border: 1px solid rgba(255,255,255,0.12);
  background: rgba(255,255,255,0.04);
  color: rgba(255,255,255,0.92);
  padding: 8px 14px;
  border-radius: 10px;
  font-weight: 600;
  font-size: 13px;
  line-height: 1;
  cursor: pointer;
  transition: all .2s ease;
}
.tabs-mr button:hover {
  background: rgba(255,255,255,0.08);
  border-color: rgba(255,255,255,0.18);
}
.tabs-mr button.active {
  color: #0a0a0a;
  background: #c8ff5a;
  border-color: #c8ff5a;
  box-shadow: 0 0 0 2px rgba(200,255,90,0.25) inset;
}
.panel-mr {
  border: 1px solid rgba(255,255,255,0.08);
  background: rgba(255,255,255,0.03);
  border-radius: 12px;
  padding: 15px 16px;
}
.content-mr {
  color: rgba(255,255,255,0.92);
  font-size: 13px;
  line-height: 1.46;
}
.content-mr p {
  margin: 0;
  font-size: 13px;
  color: rgba(255,255,255,0.88);
  line-height: 1.46;
}
.content-mr p:not(.intro-p):not(:last-child) {
  margin-bottom: 12px;
}
.content-mr .intro-p {
    font-size: 16px;
    line-height: 1.5;
    margin-bottom: 14px;
}
.content-mr h3 {
  margin: 0 0 12px;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 0.01em;
  color: rgba(255,255,255,0.9);
}
.content-mr h4 {
  margin: 13px 0 8px;
  font-size: 13px;
  text-transform: uppercase;
  color: rgba(255,255,255,0.7);
  letter-spacing: 0.04em;
  font-weight: 600;
}
.content-mr strong {
  font-weight: 600;
  color: #fff;
}
.content-mr ul, .content-mr ol {
  list-style: none;
  padding: 0;
  margin: 0 0 10px 0;
}
.content-mr ul:not(:last-child),
.content-mr ol:not(:last-child) {
    margin-bottom: 15px;
}
.content-mr li {
  position: relative;
  padding-left: 16px;
  margin-bottom: 8px;
}
.content-mr ul > li::before {
  content: '•';
  position: absolute;
  left: 0;
  color: rgba(200,255,90,0.7);
}
.content-mr ol {
  padding-left: 18px;
  list-style: decimal;
}
.content-mr ol li {
    padding-left: 5px;
}
.nested-list {
  padding-left: 20px;
  margin-top: 8px !important;
}
.nested-list li::before {
    content: '–';
}
.result-block {
    background-color: rgba(0, 0, 0, 0.15);
    border: 1px solid rgba(255, 255, 255, 0.1);
    padding: 12px 14px;
    border-radius: 8px;
    margin-top: 20px;
}
.result-block p {
    margin: 0;
    line-height: 1.5;
}
.calc-button {
    display: inline-block;
    background: #c8ff5a;
    color: #0a0a0a;
    padding: 6px 12px;
    border-radius: 6px;
    text-decoration: none;
    font-size: 13px;
    font-weight: 600;
    margin-top: 8px;
    transition: all .2s ease;
}
.calc-button:hover {
    background: #b8ef4a;
    transform: translateY(-1px);
}
.transformation-item {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    gap: 15px;
    align-items: center;
    border-bottom: 1px solid rgba(255,255,255,0.08);
    padding-bottom: 12px;
    margin-bottom: 12px;
}
.transformation-item:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
}
.transformation-item p {
    margin: 0;
    line-height: 1.5;
}
.transformation-item p:first-child {
    color: rgba(255,255,255,0.6);
}
.arrow {
    color: #c8ff5a;
    font-size: 20px;
    font-weight: bold;
}
</style>
