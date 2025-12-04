<template>
  <div class="signal-treemap-reset">
    <!-- Ряд 1: 2 крупные -->
    <div class="row row-2">
      <div
        v-for="(cat, i) in categories.slice(0, 2)"
        :key="cat.category"
        class="card card-large"
        @click="toggle(i)"
        tabindex="0"
        role="button"
        :aria-label="`${cat.category}: ${cat.percent}%`"
        @keydown.enter.prevent="toggle(i)"
        @keydown.space.prevent="toggle(i)"
      >
        <div class="card-inner">
          <span class="card-problem">{{ cat.category }}</span>
          <span class="card-percent">{{ cat.percent }}%</span>
        </div>
        <div v-if="activeIdx === i" class="card-tooltip">
          <div class="tooltip-text">{{ cat.desc }}</div>
        </div>
      </div>
    </div>

    <!-- Ряд 2: 2 крупные -->
    <div class="row row-2">
      <div
        v-for="(cat, i) in categories.slice(2, 4)"
        :key="cat.category"
        class="card card-large"
        @click="toggle(i + 2)"
        tabindex="0"
        role="button"
        :aria-label="`${cat.category}: ${cat.percent}%`"
        @keydown.enter.prevent="toggle(i + 2)"
        @keydown.space.prevent="toggle(i + 2)"
      >
        <div class="card-inner">
          <span class="card-problem">{{ cat.category }}</span>
          <span class="card-percent">{{ cat.percent }}%</span>
        </div>
        <div v-if="activeIdx === i + 2" class="card-tooltip">
          <div class="tooltip-text">{{ cat.desc }}</div>
        </div>
      </div>
    </div>

    <!-- Ряд 3: 3 средние -->
    <div class="row row-3">
      <div
        v-for="(cat, i) in categories.slice(4, 7)"
        :key="cat.category"
        class="card card-mid"
        @click="toggle(i + 4)"
        tabindex="0"
        role="button"
        :aria-label="`${cat.category}: ${cat.percent}%`"
        @keydown.enter.prevent="toggle(i + 4)"
        @keydown.space.prevent="toggle(i + 4)"
      >
        <div class="card-inner">
          <span class="card-problem">{{ cat.category }}</span>
          <span class="card-percent">{{ cat.percent }}%</span>
        </div>
        <div v-if="activeIdx === i + 4" class="card-tooltip">
          <div class="tooltip-text">{{ cat.desc }}</div>
        </div>
      </div>
    </div>

    <!-- Ряд 4: 3 средние -->
    <div class="row row-3">
      <div
        v-for="(cat, i) in categories.slice(7, 10)"
        :key="cat.category"
        class="card card-mid"
        @click="toggle(i + 7)"
        tabindex="0"
        role="button"
        :aria-label="`${cat.category}: ${cat.percent}%`"
        @keydown.enter.prevent="toggle(i + 7)"
        @keydown.space.prevent="toggle(i + 7)"
      >
        <div class="card-inner">
          <span class="card-problem">{{ cat.category }}</span>
          <span class="card-percent">{{ cat.percent }}%</span>
        </div>
        <div v-if="activeIdx === i + 7" class="card-tooltip">
          <div class="tooltip-text">{{ cat.desc }}</div>
        </div>
      </div>
    </div>

    <!-- Нижние 2 карточки — компактные -->
    <div class="column-center">
      <div
        v-for="(cat, i) in categories.slice(10)"
        :key="cat.category"
        class="card card-wide"
        @click="toggle(i + 10)"
        tabindex="0"
        role="button"
        :aria-label="`${cat.category}: ${cat.percent}%`"
        @keydown.enter.prevent="toggle(i + 10)"
        @keydown.space.prevent="toggle(i + 10)"
      >
        <div class="card-inner">
          <span class="card-problem">{{ cat.category }}</span>
          <span class="card-percent">{{ cat.percent }}%</span>
        </div>
        <div v-if="activeIdx === i + 10" class="card-tooltip">
          <div class="tooltip-text">{{ cat.desc }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const activeIdx = ref(-1)

const toggle = (index) => {
  if (activeIdx.value === index) {
    activeIdx.value = -1
  } else {
    activeIdx.value = index
  }
}

const categories = [
  // 1 строка
  { category: 'Переполненность зала/очереди на тренажёры', percent: 22.0, desc: 'Слишком много людей, негде встать, очереди на беговые дорожки и тренажёры, нет свободных гантелей, ждала 15–20 минут.' },
  { category: 'Чистота раздевалок/душевых', percent: 16.0, desc: 'Грязные раздевалки, волосы в душе, вода на полу, плесень, грязные шкафчики, нет туалетной бумаги, неприятный запах.' },

  // 2 строка
  { category: 'Грубость и непрофессионализм персонала', percent: 14.0, desc: 'Тренер грубит или кричит, администратор хамит, персонал не помогает, не здоровается, игнорирует просьбы, унижает новичков.' },
  { category: 'Проблемы с оборудованием', percent: 12.0, desc: 'Сломанные или устаревшие тренажёры, дисплеи не работают, скрипят, ржавеют, порванные тросы, опасно заниматься.' },

  // 3 строка
  { category: 'Цена/ошибки в оплате абонемента', percent: 11.0, desc: 'Дорого, не оправдывает ожиданий, списали дважды, скрытые платежи, ошибка в абонементе, не вернули деньги, навязали допы.' },
  { category: 'Неудобное расписание занятий', percent: 8.0, desc: 'Неудобное время групповых занятий, мало вечерних групп, всё занято, нет йоги или любимых направлений, пересекается с работой.' },
  { category: 'Температура и вентиляция в зале', percent: 6.0, desc: 'Слишком жарко или холодно, душно, нет свежего воздуха, кондиционер не работает, плохая вентиляция, тяжело дышать.' },

  // 4 строка
  { category: 'Качество и уровень тренировок', percent: 4.0, desc: 'Тренировки слишком лёгкие или сложные, не по уровню, одно и то же каждый раз, нет прогресса, тренер не мотивирует.' },
  { category: 'Опоздание/отсутствие тренера', percent: 3.0, desc: 'Тренер опоздал на 10–20 минут, не пришёл совсем, не предупредил, группа ждала, занятие отменили без замены.' },
  { category: 'Дискомфорт и токсичная атмосфера', percent: 2.0, desc: 'Ощущение неловкости, все смотрят и судят, токсичная атмосфера соревнования, тренер орёт, нет поддержки, хвастаются.' },

  // Нижние (2 шт.)
  { category: 'Отсутствие удобств (Wi-Fi, парковка)', percent: 1.5, desc: 'Нет парковки, плохой Wi-Fi, нет воды или полотенец, отсутствуют удобства типа сауны или массажа.' },
  { category: 'Проблемы с договором и отменой', percent: 0.5, desc: 'Сложно отменить абонемент, скрытые условия договора, не вернули деньги при отмене, штрафы, непонятные правила.' },
]
</script>

<style scoped>
/* === Контейнер === */
.signal-treemap-reset {
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 0 4px;
  box-sizing: border-box;
  font-family: inherit;
}

/* === Ряды === */
.row,
.row-2,
.row-3 {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  gap: 6px;
  margin: 0;
}

.column-center {
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
}

/* === Карточки === */
.card {
  background: #232427;
  color: #eaeaea;
  border-radius: 11px;
  box-shadow: 0 1px 3px rgba(24, 24, 26, 0.1);
  cursor: pointer;
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
  transition: transform 0.14s ease, box-shadow 0.14s ease;
  outline: none;
}

.card:hover,
.card:focus {
  transform: translateY(-1px);
  box-shadow: 0 3px 8px rgba(24, 24, 26, 0.18);
}

/* 2 крупные карточки */
.card-large {
  flex: 1 1 calc(50% - 3px);
  min-width: 0;
  min-height: 130px; 
  height: auto;
  font-size: clamp(0.92rem, 1.75vw, 1.12rem);
}

/* 3 средние карточки */
.card-mid {
  flex: 1 1 calc(33.333% - 4px);
  min-width: 0;
  min-height: 130px; 
  height: auto;
  font-size: clamp(0.78rem, 1.5vw, 0.92rem);
}

/* Нижние */
.card-wide {
  flex: 1 1 100%;
  min-width: 0;
  min-height: 60px;
  height: auto;
  font-size: clamp(0.76rem, 1.45vw, 0.90rem);
}

/* === ВНУТРЕННОСТИ КАРТОЧКИ === */
.card-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px; 
  gap: 6px;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}

.card-problem {
  font-weight: 500;
  font-size: 1em;
  line-height: 1.18;
  white-space: normal;
  overflow-wrap: anywhere;
  flex: 1;
  text-align: left;
}

.card-percent {
  font-weight: 400;
  font-size: 0.86em;
  color: #eaeaea;
  opacity: 0.58;
  white-space: nowrap;
  min-width: 34px;
  text-align: right;
}

/* === ТУЛТИП === */
.card-tooltip {
  position: absolute;
  inset: 0;
  background: #161719;
  color: #ededed;
  border-radius: 11px;
  z-index: 10;
  padding: 10px 16px; 
  display: flex;
  align-items: flex-start;
  box-shadow: 0 3px 10px rgba(22, 23, 25, 0.32);
  overflow-y: auto;
}

.tooltip-text {
  font-size: 0.84rem;
  font-weight: 400;
  line-height: 1.32;
  white-space: normal;
  overflow-wrap: anywhere;
  max-width: 100%;
}

/* === Адаптивность === */
@media (max-width: 720px) {
  .signal-treemap-reset { padding: 0 3px; }
  
  .card-large { 
    flex: 1 1 calc(50% - 3px); 
    min-height: 110px; 
  }
  .card-mid { 
    flex: 1 1 calc(50% - 3px); 
    min-height: 110px; 
  }
  
  .card-inner { padding: 8px 10px; }
  .card-tooltip { padding: 8px 10px; }
}

@media (max-width: 480px) {
  /* ВСЕ карточки теперь имеют высоту 90px */
  .card-large,
  .card-mid,
  .card-wide {
    flex: 1 1 100%;
    min-height: 90px; 
    font-size: clamp(0.78rem, 2.1vw, 0.88rem);
  }
  
  .card-inner { padding: 8px 10px; gap: 5px; }
  .card-tooltip { padding: 8px 10px; }
  
  .card-percent { font-size: 0.80em; min-width: 30px; }
  .tooltip-text { font-size: 0.80rem; }
}
</style>
