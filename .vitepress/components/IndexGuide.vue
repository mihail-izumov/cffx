<script setup>
import { ref } from 'vue'
// Устанавливаем первую вкладку активной по умолчанию
const activeTab = ref('positioning')
</script>

<template>
  <div class="tabs-mr">
    <button :class="{ active: activeTab === 'positioning' }" @click="activeTab = 'positioning'">
      Таблица позиций
    </button>
    <button :class="{ active: activeTab === 'five-whys' }" @click="activeTab = 'five-whys'">
      Анализ «5 почему»
    </button>
    <button :class="{ active: activeTab === 'competitors' }" @click="activeTab = 'competitors'">
      Карта конкурентов
    </button>
    <button :class="{ active: activeTab === 'quotes' }" @click="activeTab = 'quotes'">
      Цитаты клиентов
    </button>
    <button :class="{ active: activeTab === 'next-steps' }" @click="activeTab = 'next-steps'">
      Следующий шаг
    </button>
  </div>
  <div class="panel-mr">
    <!-- Вкладка: Таблица позиционирования -->
    <div v-show="activeTab === 'positioning'" class="content-mr">
      <h3>1. Таблица реального позиционирования</h3>
      <p>Это ваша стратегическая карта. Смотрите на столбец с вашей компанией:</p>
      <ul>
        <li><strong>9-10 баллов</strong> — ваши сильные стороны. Говорите о них громче, используйте в рекламе.</li>
        <li><strong>7-8 баллов</strong> — норма рынка. Здесь вы не выделяетесь, но и не проигрываете.</li>
        <li><strong>6 и ниже</strong> — критические проблемы. Начинайте исправлять с них.</li>
      </ul>
      <h4>Конкретный пример</h4>
      <p>Если у вас «скорость обслуживания — 6», а у лидера рынка «8», значит, именно здесь вы теряете клиентов. Первым делом оптимизируйте процессы.</p>
    </div>

    <!-- Вкладка: Анализ «5 почему» -->
    <div v-show="activeTab === 'five-whys'" class="content-mr">
      <h3>2. Анализ методом «5 почему»</h3>
      <p>Каждая низкая оценка — это не приговор, а задача для решения. Для каждой проблемы задавайте вопрос «почему?» пять раз подряд, чтобы добраться до корня:</p>
      <ul>
        <li><strong>Почему</strong> у нас низкая оценка по скорости? → Клиенты жалуются на очереди.</li>
        <li><strong>Почему</strong> образуются очереди? → В час пик не хватает персонала.</li>
        <li><strong>Почему</strong> не хватает персонала? → Нет четкого графика работы.</li>
        <li><strong>Почему</strong> нет четкого графика? → Не анализировались пиковые часы.</li>
        <li><strong>Почему</strong> не анализировались? → Не было данных о загрузке.</li>
      </ul>
      <h4>Результат</h4>
      <p>Вместо поверхностного «нужно работать быстрее» вы получаете конкретное решение — «внедрить систему учета загрузки и оптимизировать графики».</p>
    </div>
    
    <!-- Вкладка: Карта конкурентов -->
    <div v-show="activeTab === 'competitors'" class="content-mr">
      <h3>3. Карта конкурентов</h3>
      <p>Изучите, кто ваши реальные конкуренты и за что их хвалят клиенты:</p>
      <ul>
        <li><strong>Лидеры рынка</strong> — учитесь у них, адаптируйте их лучшие практики.</li>
        <li><strong>Середняки</strong> — ваши прямые конкуренты, отслеживайте их действия.</li>
        <li><strong>Аутсайдеры</strong> — поймите их ошибки, чтобы не повторять.</li>
      </ul>
    </div>
    
    <!-- Вкладка: Цитаты реальных клиентов -->
    <div v-show="activeTab === 'quotes'" class="content-mr">
      <h3>4. Цитаты реальных клиентов</h3>
      <p>Это готовый материал для:</p>
      <ul>
        <li><strong>Рекламы</strong> — используйте положительные цитаты в соцсетях и на сайте.</li>
        <li><strong>Обучения персонала</strong> — покажите сотрудникам, что конкретно ценят клиенты.</li>
        <li><strong>Исправления проблем</strong> — негативные цитаты точно указывают, что исправить.</li>
      </ul>
    </div>

    <!-- Вкладка: Следующий шаг -->
    <div v-show="activeTab === 'next-steps'" class="content-mr">
        <h3>После получения отчета</h3>
        <h4>Действие 1: Найдите свою «суперсилу» (15 минут)</h4>
        <p>Посмотрите на таблицу и найдите критерий, где у вас 9-10 баллов, а у конкурентов меньше. Это ваше уникальное преимущество. Завтра же начните рассказывать о нем всем клиентам.</p>
        <h4>Действие 2: Устраните ключевой баг в системе (1 неделя)</h4>
        <p>Найдите критерий с самой низкой оценкой — это то, из-за чего вы теряете клиентов прямо сейчас. Примените метод «5 почему» и устраните корневую причину.</p>
        <h4>Действие 3: Скопируйте лучшую практику (1 месяц)</h4>
        <p>Посмотрите, какой конкурент лидирует по критерию, важному для ваших клиентов. Сходите к нему как клиент, изучите его подход и адаптируйте под себя.</p>
        <hr>
        <h3>Следующий шаг: от анализа к результату</h3>
        <p>Сигнал Радара покажет вам <strong>что</strong> происходит с вашим бизнесом в глазах клиентов. Это точный диагноз текущей ситуации. Но чтобы превратить найденные проблемы в план роста, нужно понять <strong>почему</strong> это происходит и <strong>как</strong> это исправить.</p>
        <p>Именно для этого существует <strong>Чекап Модуля Роста®</strong> — системная работа, где данные «Сигнала» становятся отправной точкой для глубокого анализа и разработки конкретного плана с тремя измеримыми улучшениями, которые вы внедрите за 30 дней.</p>
        <p>
            Данные показывают проблему. <br>
            План показывает решение. <br>
            Результат — рост, который увидят все.
        </p>
        <div class="specs-button">
            <a href="/apply">Чекап →</a>
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
.content-mr p:not(:last-child) {
  margin-bottom: 12px;
}
.content-mr p {
  margin: 0;
  font-size: 13px;
  color: rgba(255,255,255,0.88);
  line-height: 1.46;
}
.content-mr h3 {
  margin: 0 0 12px;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 0.01em;
  color: rgba(255,255,255,0.9);
}
.content-mr h4 {
  margin: 13px 0 5px;
  font-size: 13px;
  text-transform: uppercase;
  color: rgba(255,255,255,0.6);
  letter-spacing: 0.04em;
}
.content-mr strong {
  font-weight: 600;
  color: #fff;
}
.content-mr ul {
  list-style: none;
  padding: 0;
  margin: 0 0 10px 0;
}
.content-mr ul:not(:last-child) {
    margin-bottom: 15px;
}
.content-mr li {
  position: relative;
  padding-left: 16px;
  margin-bottom: 8px;
}
.content-mr li::before {
  content: '•';
  position: absolute;
  left: 0;
  color: rgba(200,255,90,0.7);
}
.content-mr hr {
    border: none;
    height: 1px;
    background-color: rgba(255,255,255,0.1);
    margin: 20px 0;
}
.specs-button {
    margin-top: 16px;
}
.specs-button a {
  display: inline-block;
  padding: 8px 16px;
  background-color: #c8ff5a;
  color: #0a0a0a !important;
  text-decoration: none !important;
  border-radius: 8px;
  font-family: inherit;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: background 0.2s;
  -webkit-user-select: none;
  user-select: none;
  line-height: 1.5;
}
.specs-button a:hover {
    background-color: #d2ff7c;
}
</style>
