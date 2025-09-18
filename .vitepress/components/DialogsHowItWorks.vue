<script setup>
import { ref } from 'vue'

// Устанавливаем первую вкладку активной по умолчанию
const activeTab = ref('step-1')
</script>

<template>
  <div class="tabs-mr">
    <button :class="{ active: activeTab === 'step-1' }" @click="activeTab = 'step-1'">
      ШАГ 1
    </button>
    <button :class="{ active: activeTab === 'step-2' }" @click="activeTab = 'step-2'">
      ШАГ 2
    </button>
    <button :class="{ active: activeTab === 'step-3' }" @click="activeTab = 'step-3'">
      ШАГ 3
    </button>
    <button :class="{ active: activeTab === 'step-4' }" @click="activeTab = 'step-4'">
      ШАГ 4
    </button>
    <button :class="{ active: activeTab === 'result' }" @click="activeTab = 'result'">
      Результат
    </button>
  </div>

  <div class="panel-mr">
    <!-- Вкладка: ШАГ 1 -->
    <div v-show="activeTab === 'step-1'" class="content-mr">
      <h3>Шаг 1 – Находятся ваши настоящие конкуренты</h3>
      <p class="intro-p">
        Забудьте о списке «из головы»: анализируются тысячи отзывов, чтобы понять, с кем клиентов действительно сталкивает выбор в реальности, а не в гипотезах.
        Часто главный конкурент оказывается в другом районе или с иной концепцией.
      </p>
      <div class="result-block">
        <p><strong>Результат –</strong> список из 9 компаний, разделенных на три группы (лидеры, средний уровень, аутсайдеры): ваше реальное конкурентное поле.</p>
      </div>
    </div>

    <!-- Вкладка: ШАГ 2 -->
    <div v-show="activeTab === 'step-2'" class="content-mr">
      <h3>Шаг 2 – Изучается «голос клиента»</h3>
      <p class="intro-p">
        Собираются и изучаются все отзывы о вас и конкурентах с ключевых площадок: Яндекс.Карты, 2ГИС, Google Maps и других.
        Отсеиваются заказные отзывы, дубликаты и бессодержательные комментарии, чтобы оставить проверенные факты.
      </p>
      <div class="result-block">
        <p><strong>Результат –</strong> база из сотен реальных, верифицированных отзывов, отражающая подлинное мнение клиентов.</p>
      </div>
    </div>

    <!-- Вкладка: ШАГ 3 -->
    <div v-show="activeTab === 'step-3'" class="content-mr">
      <h3>Шаг 3 – Выделяются 10 критериев выбора</h3>
      <p class="intro-p">
        Без шаблонов вроде «цена/качество»: анализируется, о чём конкретно говорят клиенты о вас и конкурентах, чтобы выделить 10 факторов реального выбора.
        Формулировки даются языком клиентов, например: «можно спокойно посидеть с ноутбуком, никто не торопит», а не абстрактная «атмосфера».
      </p>
      <div class="result-block">
        <p><strong>Результат –</strong> 10 точных критериев с примерами формулировок, как их понимают клиенты.</p>
      </div>
    </div>

    <!-- Вкладка: ШАГ 4 -->
    <div v-show="activeTab === 'step-4'" class="content-mr">
      <h3>Шаг 4 – Ставятся честные оценки</h3>
      <p class="intro-p">
        На основе проверенных отзывов выставляются оценки от 1 до 10 по каждому из 10 критериев всем компаниям, включая вас.
        Никаких украшательств: только факты из «голоса клиента» и объективная шкала.
      </p>
      <div class="result-block">
        <p><strong>Результат –</strong> отчёт-сравнение: где вы лидируете, где отстаёте и какие исправления дадут максимальный эффект в первую очередь.</p>
      </div>
    </div>

    <!-- Вкладка: Результат -->
    <div v-show="activeTab === 'result'" class="content-mr">
      <h3>Что получите на выходе</h3>
      <ul>
        <li>Реальную карту конкурентов: 9 компаний в трёх лигах и понимание, с кем вас сравнивают при выборе.</li>
        <li>Очищенную базу отзывов и «голос клиента» без шумов, пригодную для регламентов и обучения команды.</li>
        <li>10 клиентских критериев выбора с примерами формулировок и привязкой к операционным действиям.</li>
        <li>Честные оценки 1–10 по каждому критерию, приоритеты улучшений и понятная точка роста.</li>
      </ul>
      <div class="result-block">
        <p><strong>Готовы обсудить пример для вашей сети?</strong></p>
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
