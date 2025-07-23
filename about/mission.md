---
title: Мы, Растём
---

<script setup>
import { ref } from 'vue'

/* верхний переключатель */
const worldTab = ref('one')

/* нижний переключатель */
const focusTab = ref('vision')
</script>

# Мы, Растём

## Будущее — в устойчивом развитии

Чтобы создать лучшее будущее, мы делаем устойчивый рост доступным для всех.  
Бизнес, раскрывающий человеческий потенциал, становится сильным, технологичным и безопасным.  
<strong>Устойчивость</strong> — ключ к этому будущему.

## В каком мире мы хотим жить?

<div class="tabs">
  <button :class="{ active: worldTab === 'one' }"   @click="worldTab = 'one'">Один</button>
  <button :class="{ active: worldTab === 'two' }"   @click="worldTab = 'two'">Два</button>
  <button :class="{ active: worldTab === 'three' }" @click="worldTab = 'three'">Три</button>
  <button :class="{ active: worldTab === 'four' }"  @click="worldTab = 'four'">Четыре</button>
  <button :class="{ active: worldTab === 'five' }"  @click="worldTab = 'five'">Пять</button>
</div>

<div class="tab-content">
  <div v-if="worldTab === 'one'">
    <h3>Устойчивое развитие — это ответ</h3>
    <p>Устойчивое развитие откроет новую эру роста бизнеса, где сильные и эмпатичные компании смогут процветать, используя технологии <strong>SMART DATA</strong>, эффективно используя ресурсы и синхронизируя стратегии роста — бизнеса, команд и клиентов.</p>
  </div>
  <div v-else-if="worldTab === 'two'">
    <h3>Экосистема взаимного роста</h3>
    <p>Компании, общества и планета будут развиваться синхронно, формируя устойчивые цепочки ценности — от сырья до конечного пользователя.</p>
  </div>
  <div v-else-if="worldTab === 'three'">
    <h3>Человеческий капитал в центре</h3>
    <p>Инвестиции в талант становятся главным драйвером конкурентоспособности.<br />
    Образование, здоровье и благополучие сотрудников — необходимые условия для роста.</p>
  </div>
  <div v-else-if="worldTab === 'four'">
    <h3>Технологии ради человека</h3>
    <p>Искусственный интеллект и данные помогают прогнозировать риски, открывать новые рынки и создавать продукты, ориентированные на человека.</p>
  </div>
  <div v-else>
    <h3>Безопасность как фундамент</h3>
    <p>Кибер- и экологическая безопасность становятся базовыми требованиями, без которых невозможен долгосрочный успех.</p>
  </div>
</div>

## Устойчивое развитие для каждого

Модуль Роста — единственная компания, которая использует технологии <strong>SMART DATA</strong> для разработки стратегий и персонального трекинга команд любого размера.<br />
В этом наш фокус.

<div class="tabs small">
  <button :class="{ active: focusTab === 'vision' }" @click="focusTab = 'vision'">Видение</button>
  <button :class="{ active: focusTab === 'action' }" @click="focusTab = 'action'">Делаем</button>
  <button :class="{ active: focusTab === 'market' }" @click="focusTab = 'market'">Рынок</button>
  <button :class="{ active: focusTab === 'values' }" @click="focusTab = 'values'">Ценности</button>
</div>

<div class="tab-content">
  <div v-if="focusTab === 'vision'">
    <h4>Видение</h4>
    <p>Инновации возникают там, где есть смелость пробовать новое, а успех приходит к тем, кто создаёт не просто продукты, но уникальные ценности и опыт для людей.<br />
    Да, путь роста полон перемен. Но разве стабильность когда-нибудь вдохновляла?</p>
    <p>Видение большого потенциала баланса технологий и проявления лучших человеческих качеств открывает перед нами будущее сильных и эмоциональных компаний.</p>
  </div>
  <div v-else-if="focusTab === 'action'">
    <h4>Что мы делаем</h4>
    <ul>
      <li>Строим цифровые дорожные карты роста</li>
      <li>Используем SMART DATA-аналитику для приоритетов</li>
      <li>Настраиваем трекеры для команд и руководителей</li>
      <li>Обучаем культуре экспериментирования</li>
    </ul>
  </div>
  <div v-else-if="focusTab === 'market'">
    <h4>Рынок</h4>
    <p>Более <strong>70 %</strong> компаний переходят к модели устойчивого развития в течение ближайших пяти лет.<br />
    Модуль Роста помогает сделать этот переход быстрым и экономичным.</p>
  </div>
  <div v-else>
    <h4>Наши ценности</h4>
    <ol>
      <li><strong>Честность</strong> во всём</li>
      <li><strong>Поддержка</strong> команд на каждом этапе</li>
      <li><strong>Смелость</strong> экспериментировать</li>
      <li><strong>Ответственность</strong> перед обществом и планетой</li>
    </ol>
  </div>
</div>

## Будущее уже здесь

### Помогаем лучше чувствовать бизнес

<div class="cards">
  <div class="card">
    <strong>Чекап для бизнеса</strong><br>
    Находим скрытые разрывы в процессах, которые тормозят рост. Превращаем их в 3 конкретных улучшения за 30 дней. <br><br>
    <a href="/checkup/overview">Больше</a>
  </div>
  <div class="card">
    <strong>Бизнес — это не только цифры, но и эмоции</strong><br>
    Помогаем держать баланс между стратегией, людьми и клиентами; в деталях, чтобы бизнес устойчиво рос. <br><br>
    <a href="/about/balance">Больше</a>
  </div>
  <div class="card">
    <strong>Рост — это не гонка, а приключение</strong><br>
    Каждый бы хотел расти без стрессов и кризисов. Мы создаём сценарии роста, дарящие вдохновение. <br><br>
    <a href="/method/not-a-race">Больше</a>
  </div>
</div>


<style>
.tabs {
  display: flex;
  gap: .75rem;
  margin: 1rem 0 .5rem;
}
.tabs.small { gap: .5rem; }

.tabs button {
  padding: .45rem 1rem;
  background: none;
  border: 1px solid var(--vp-c-border);
  border-radius: 4px;
  cursor: pointer;
  color: var(--vp-c-text);
  transition: background-color .2s, color .2s;
  font-size: .95rem;
}
.tabs.small button {
  padding: .35rem .75rem;
  font-size: .85rem;
}

.tabs button.active {
  background-color: var(--vp-c-brand);
  color: var(--vp-c-brand-emphasis);
  border-color: var(--vp-c-brand);
}

.tabs button:hover {
  background-color: var(--vp-c-bg-emphasis);
}

.tab-content {
  padding: 1rem;
  border: 1px solid var(--vp-c-border);
  border-radius: 4px;
  background-color: var(--vp-c-bg);
}

.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit,minmax(220px,1fr));
  gap: 1rem;
  margin-top: 1rem;
}
.card {
  border: 1px solid var(--vp-c-border);
  border-radius: 6px;
  padding: 1rem;
  background-color: var(--vp-c-bg);
  transition: box-shadow .15s;
}
.card:hover {
  box-shadow: 0 2px 8px rgba(0,0,0,.08);
}
</style>
