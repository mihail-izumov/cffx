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
**Устойчивость** — ключ к этому будущему.

## В каком мире мы хотим жить?

<div class="tabs">
  <button :class="{ active: worldTab === 'one' }"   @click="worldTab = 'one'">Один</button>
  <button :class="{ active: worldTab === 'two' }"   @click="worldTab = 'two'">Два</button>
  <button :class="{ active: worldTab === 'three' }" @click="worldTab = 'three'">Три</button>
  <button :class="{ active: worldTab === 'four' }"  @click="worldTab = 'four'">Четыре</button>
  <button :class="{ active: worldTab === 'five' }"  @click="worldTab = 'five'">Пять</button>
</div>

<div class="tab-content">
  <template v-if="worldTab === 'one'">
### Устойчивое развитие — это ответ

Устойчивое развитие откроет новую эру роста бизнеса, где сильные и эмпатичные компании смогут процветать, используя технологии **SMART DATA**, эффективно используя ресурсы и синхронизируя стратегии роста — бизнеса, команд и клиентов.
  </template>
  <template v-else-if="worldTab === 'two'">
### Экосистема взаимного роста

Компании, общества и планета будут развиваться синхронно, формируя устойчивые цепочки ценности — от сырья до конечного пользователя.
  </template>
  <template v-else-if="worldTab === 'three'">
### Человеческий капитал в центре

Инвестиции в талант становятся главным драйвером конкурентоспособности.  
Образование, здоровье и благополучие сотрудников — необходимые условия для роста.
  </template>
  <template v-else-if="worldTab === 'four'">
### Технологии ради человека

Искусственный интеллект и данные помогают прогнозировать риски, открывать новые рынки и создавать продукты, ориентированные на человека.
  </template>
  <template v-else>
### Безопасность как фундамент

Кибер- и экологическая безопасность становятся базовыми требованиями, без которых невозможен долгосрочный успех.
  </template>
</div>

## Устойчивое развитие для каждого

Модуль Роста — единственная компания, которая использует технологии **SMART DATA** для разработки стратегий и персонального трекинга команд любого размера.  
В этом наш фокус.

<div class="tabs small">
  <button :class="{ active: focusTab === 'vision' }" @click="focusTab = 'vision'">Видение</button>
  <button :class="{ active: focusTab === 'action' }" @click="focusTab = 'action'">Делаем</button>
  <button :class="{ active: focusTab === 'market' }" @click="focusTab = 'market'">Рынок</button>
  <button :class="{ active: focusTab === 'values' }" @click="focusTab = 'values'">Ценности</button>
</div>

<div class="tab-content">
  <template v-if="focusTab === 'vision'">
#### Видение

Инновации возникают там, где есть смелость пробовать новое, а успех приходит к тем, кто создаёт не просто продукты, но уникальные ценности и опыт для людей.  
Да, путь роста полон перемен. Но разве стабильность когда-нибудь вдохновляла?  

Видение большого потенциала баланса технологий и проявления лучших человеческих качеств открывает перед нами будущее сильных и эмоциональных компаний.
  </template>
  <template v-else-if="focusTab === 'action'">
#### Что мы делаем

* Строим цифровые дорожные карты роста  
* Используем SMART DATA-аналитику для приоритетов  
* Настраиваем трекеры для команд и руководителей  
* Обучаем культуре экспериментирования
  </template>
  <template v-else-if="focusTab === 'market'">
#### Рынок

Более **70 %** компаний переходят к модели устойчивого развития в течение ближайших пяти лет.  
Модуль Роста помогает сделать этот переход быстрым и экономичным.
  </template>
  <template v-else>
#### Наши ценности

1. **Честность** во всём  
2. **Поддержка** команд на каждом этапе  
3. **Смелость** экспериментировать  
4. **Ответственность** перед обществом и планетой
  </template>
</div>

## Будущее уже здесь

### Помогаем лучше чувствовать бизнес

<div class="cards">
  <div class="card">
    <strong>Чекплан для бизнеса</strong><br>
    Чёткая карта всех рисков, устойчивого роста без стресса, новых возможностей и ещё больше.
  </div>
  <div class="card">
    <strong>Бизнес — это не только цифры, но и эмоции</strong><br>
    Помогаем держать баланс между стратегией, людьми и клиентами; в деталях, чтобы бизнес устойчиво рос.
  </div>
  <div class="card">
    <strong>Рост — это не гонка, а приключение</strong><br>
    Каждый бы хотел расти без стрессов и кризисов. Мы создаём сценарии роста, дарящие вдохновение.
  </div>
  <div class="card">
    <strong>12 Историй</strong><br>
    Собрали лучшие устойчивые истории роста бизнеса и подготовили короткое руководство по выводам.
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
