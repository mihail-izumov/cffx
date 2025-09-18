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
    <button :class="{ active: activeTab === 'day-2' }" @click="activeTab = 'day-2'">
      ДЕНЬ 2
    </button>
    <button :class="{ active: activeTab === 'day-3' }" @click="activeTab = 'day-3'">
      ДЕНЬ 3
    </button>
    <button :class="{ active: activeTab === 'day-4' }" @click="activeTab = 'day-4'">
      ДЕНЬ 4
    </button>
    <button :class="{ active: activeTab === 'day-5' }" @click="activeTab = 'day-5'">
      ДЕНЬ 5
    </button>
    <button :class="{ active: activeTab === 'result' }" @click="activeTab = 'result'">
      Результат
    </button>
  </div>
  <div class="panel-mr">
    <!-- Вкладка: ДЕНЬ 1 -->
    <div v-show="activeTab === 'day-1'" class="content-mr">
      <h3>ДЕНЬ 1 – Аналитика обратной связи</h3>
      <h4>Погружение в исходные данные и проблематику</h4>
      <p class="intro-p">Изучаются жалобы и отзывы, формируются проблемные категории, выявляются паттерны и первичные гипотезы улучшений. Подготавливается сводка причин недовольства, витрина кейсов и цитат гостей, запрашиваются недостающие операционные отчеты за последние месяцы.</p>
      <h4>Что происходит:</h4>
      <ul>
        <li><strong>Аудит обратной связи –</strong> Сбор и структурирование фактов, причин и последствий. Выделяются ключевые темы, такие как долгое ожидание, качество продукта, сервис и чистота.</li>
        <li><strong>Гипотезы улучшений –</strong> Формирование приоритетов и быстрых побед. Анализируется влияние каждой проблемы на удержание клиентов и выручку.</li>
        <li><strong>Запрос данных –</strong> Уточнение показателей по продажам, трафику и лояльности для верификации. Это позволяет связать жалобы с реальными бизнес-метриками.</li>
      </ul>
      <div class="result-block">
        <p><strong>Результат –</strong> Готовый аналитический бриф с приоритетами проблем и списком недостающих данных.</p>
      </div>
    </div>
    <!-- Вкладка: ДЕНЬ 2 -->
    <div v-show="activeTab === 'day-2'" class="content-mr">
      <h3>ДЕНЬ 2 – Карта процессов</h3>
      <h4>Проектирование маршрутов и ролей</h4>
      <p class="intro-p">Создается черновик карты процессов с ролями, триггерами, каналами входа, маршрутами тикетов, точками контроля и эскалации. Определяются статусы, границы ответственности, шаблоны уведомлений и контуры отчётности.</p>
      <h4>Что происходит:</h4>
      <ul>
        <li><strong>Путь обращения –</strong> От приема до закрытия с обратной связью гостю. Прописывается каждый шаг: от фиксации жалобы до контроля исполнения решения.</li>
        <li><strong>Ответственности –</strong> Кто, когда и как принимает решения. Четко распределяются роли между сотрудниками на местах, менеджерами и руководством.</li>
        <li><strong>Интеграции –</strong> Готовность рабочих каналов и чатов для оперативной коммуникации. Определяются инструменты для мгновенной передачи тикетов.</li>
      </ul>
      <div class="result-block">
        <p><strong>Результат –</strong> Версия карты процессов, готовая к презентации и уточнению.</p>
      </div>
    </div>
    <!-- Вкладка: ДЕНЬ 3 -->
    <div v-show="activeTab === 'day-3'" class="content-mr">
      <h3>ДЕНЬ 3 – Презентация и согласование</h3>
      <h4>Презентация команде и встречи с ЛПР</h4>
      <p class="intro-p">Показывается путь обращения, роли, метрики и дорожная карта. Подтверждаются результаты аналитики и сценарии карты процессов, фиксируются риски и вопросы.</p>
      <h4>Фокус встреч:</h4>
      <ul>
        <li><strong>Согласовать результаты аналитики –</strong> Подтвердить проблемные зоны и приоритеты, опираясь на реальные цитаты клиентов.</li>
        <li><strong>Уточнить границы внедрения –</strong> Что стартует сейчас, что уходит в бэклог, и какие ресурсы требуются от команды.</li>
        <li><strong>Зафиксировать правки –</strong> Сформировать список изменений к регламенту обслуживания на основе обратной связи от команды.</li>
      </ul>
      <div class="result-block">
        <p><strong>Результат –</strong> Согласованные аналитика и карта процессов, зафиксированные решения и правки к регламенту.</p>
      </div>
    </div>
    <!-- Вкладка: ДЕНЬ 4 -->
    <div v-show="activeTab === 'day-4'" class="content-mr">
      <h3>ДЕНЬ 4 – Согласование регламента обслуживания</h3>
      <h4>Стандарты времени и качества</h4>
      <p class="intro-p">Согласовываются цели обслуживания, категории инцидентов, целевые времена реакции и разрешения, политика компенсаций и матрица эскалации. Утверждаются стандарты коммуникации, контроль качества ответов и правила закрытия тикетов.</p>
      <h4>Что происходит:</h4>
      <ul>
        <li><strong>Метрики сервиса –</strong> Своевременность, точность классификации, удовлетворенность гостей, повторные обращения. Вводится 10-этапный алгоритм обработки жалоб.</li>
        <li><strong>Контуры контроля –</strong> Периодичность отчетности и формат разбора инцидентов. Определяются полномочия и ограничения ИИ-ассистента.</li>
        <li><strong>Единый стандарт –</strong> Сквозной регламент для команды и ИИ-ассистента, включая детальные скрипты для каждой категории проблем.</li>
      </ul>
      <div class="result-block">
        <p><strong>Результат –</strong> Подписанный регламент обслуживания, который замыкает аналитику и карту процессов в единый стандарт работы Диалогов.</p>
      </div>
    </div>
    <!-- Вкладка: ДЕНЬ 5 -->
    <div v-show="activeTab === 'day-5'" class="content-mr">
      <h3>ДЕНЬ 5 – Подключение и старт</h3>
      <h4>Запуск операционного контура</h4>
      <p class="intro-p">Подтверждаются каналы коммуникации, финализируются материалы с QR-кодом, места размещения и дата старта. Публикуется виджет, размещаются материалы в точках контакта, организуется рабочий чат и маршрутизация для эскалаций.</p>
      <h4>Что происходит:</h4>
      <ul>
        <li><strong>Прием обращений –</strong> Запуск тикетов и уведомлений по ролям. ИИ-ассистент начинает классифицировать обращения и передавать их ответственным.</li>
        <li><strong>Контроль качества –</strong> Ежедневная проверка выполнения и корректности решений, согласно утвержденным бизнес-показателям.</li>
        <li><strong>Отчетность –</strong> Сбор базы для первого регулярного отчета, который покажет динамику и узкие места.</li>
      </ul>
      <div class="result-block">
        <p><strong>Результат –</strong> Диалоги запущены по согласованным аналитике, карте процессов и регламенту, с готовностью к регулярной отчетности и улучшениям.</p>
      </div>
    </div>
    <!-- Вкладка: Результат -->
    <div v-show="activeTab === 'result'" class="content-mr">
        <h3>Сокращение времени на обработку жалоб</h3>
        <div class="transformation-item">
            <p>Хаотичная обработка в чатах</p>
            <span class="arrow">→</span>
            <p><strong>Стало –</strong> структурированная система тикетов с прозрачным маршрутом и эскалацией.</p>
        </div>
        <div class="transformation-item">
            <p>Неполная фиксация обращений</p>
            <span class="arrow">→</span>
            <p><strong>Стало –</strong> сквозной учет всех обращений и контроль сроков исполнения.</p>
        </div>
        <div class="transformation-item">
            <p>Ручная и разрозненная работа</p>
            <span class="arrow">→</span>
            <p><strong>Стало –</strong> ИИ-ассистент с алгоритмизированной коммуникацией и регулярной отчетностью.</p>
        </div>
        <div class="result-block">
            <p><strong>Узнайте, как это сработает для вашего бизнеса</strong></p>
            <a href="/invest/calc" class="calc-button">Запросить демонстрацию</a>
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
    margin: 0 0 12px 0;
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
    margin-top: 0;
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
.transformation-item:last-of-type {
    border-bottom: none;
    margin-bottom: 20px;
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
