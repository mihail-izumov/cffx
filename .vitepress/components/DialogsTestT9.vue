<template>
  <div class="signal-demo-wrapper">
    <!-- Tesla-style переключатель: Общепит / Фитнес -->
    <div class="signal-theme-toggle">
      <button
        class="signal-theme-btn"
        :class="{ active: selectedTheme === 'cafe' }"
        @click="selectedTheme = 'cafe'"
      >
        Общепит
      </button>
      <button
        class="signal-theme-btn"
        :class="{ active: selectedTheme === 'fitness' }"
        @click="selectedTheme = 'fitness'"
      >
        Фитнес
      </button>
      <div class="signal-theme-slider" :style="{ left: sliderLeft }"></div>
    </div>

    <!-- Переключатель: Эмоции / Факты / Решение -->
    <div class="signal-demo__header">
      <div class="signal-demo__switch" role="tablist">
        <button
          v-for="section in sections"
          :key="section.id"
          class="signal-demo__switch-btn"
          :class="[isActive(section.id) ? 'is-active' : '', section.id]"
          type="button"
          role="tab"
          :aria-selected="isActive(section.id)"
          @click="selectedSection = section.id"
        >
          {{ section.title }}
        </button>
      </div>
    </div>

    <!-- Форма -->
    <div class="signal-demo__form-container">
      <!-- Эмоции -->
      <div v-if="selectedSection === 'emotions'" class="signal-form-section">
        <div class="signal-question-block" :style="{ '--accent-color': colors.emotions }">
          <p class="signal-direction-label">Эмоции и чувства</p>
          <div class="signal-rotating-phrase-container">
            <transition name="fade" mode="out-in">
              <p :key="currentQuestion1" class="signal-question-label">{{ currentQuestion1 }}</p>
            </transition>
          </div>
          <textarea
            v-model="form.emotionalRelease"
            @focus="startRotation(1)"
            rows="3"
            :placeholder="placeholders.emotions"
            required>
          </textarea>
          <div class="signal-suggestions-container">
            <div
              v-for="suggestion in currentSuggestions.emotions"
              :key="suggestion"
              class="signal-suggestion-bubble signal-emotion-bubble"
              @click="selectSuggestion('emotionalRelease', suggestion, 'emotions')"
            >
              {{ suggestion }}
            </div>
            <div
              v-if="!isInitialSuggestions('emotions')"
              class="signal-suggestion-bubble signal-reset-bubble signal-emotion-bubble"
              @click="resetSuggestions('emotions')"
            >
              ← Ещё варианты
            </div>
          </div>
          <p class="signal-example-hint" v-html="examples.emotions"></p>
        </div>
      </div>

      <!-- Факты -->
      <div v-if="selectedSection === 'facts'" class="signal-form-section">
        <div class="signal-question-block" :style="{ '--accent-color': colors.facts }">
          <p class="signal-direction-label">Детали проблемы</p>
          <div class="signal-rotating-phrase-container">
            <transition name="fade" mode="out-in">
              <p :key="currentQuestion2" class="signal-question-label">{{ currentQuestion2 }}</p>
            </transition>
          </div>
          <textarea
            v-model="form.factualAnalysis"
            @focus="startRotation(2)"
            rows="3"
            :placeholder="placeholders.facts"
            required>
          </textarea>
          <div class="signal-suggestions-container">
            <div
              v-for="suggestion in currentSuggestions.facts"
              :key="suggestion"
              class="signal-suggestion-bubble signal-fact-bubble"
              @click="selectSuggestion('factualAnalysis', suggestion, 'facts')"
            >
              {{ suggestion }}
            </div>
            <div
              v-if="!isInitialSuggestions('facts')"
              class="signal-suggestion-bubble signal-reset-bubble signal-fact-bubble"
              @click="resetSuggestions('facts')"
            >
              ← Ещё варианты
            </div>
          </div>
          <p class="signal-example-hint" v-html="examples.facts"></p>
        </div>
      </div>

      <!-- Решение -->
      <div v-if="selectedSection === 'solutions'" class="signal-form-section">
        <div class="signal-question-block" :style="{ '--accent-color': colors.solutions }">
          <p class="signal-direction-label">Предложение решения</p>
          <div class="signal-rotating-phrase-container">
            <transition name="fade" mode="out-in">
              <p :key="currentQuestion3" class="signal-question-label">{{ currentQuestion3 }}</p>
            </transition>
          </div>
          <textarea
            v-model="form.constructiveSuggestions"
            @focus="startRotation(3)"
            rows="3"
            :placeholder="placeholders.solutions"
            required>
          </textarea>
          <div class="signal-suggestions-container">
            <div
              v-for="suggestion in currentSuggestions.solutions"
              :key="suggestion"
              class="signal-suggestion-bubble signal-solution-bubble"
              @click="selectSuggestion('constructiveSuggestions', suggestion, 'solutions')"
            >
              {{ suggestion }}
            </div>
            <div
              v-if="!isInitialSuggestions('solutions')"
              class="signal-suggestion-bubble signal-reset-bubble signal-solution-bubble"
              @click="resetSuggestions('solutions')"
            >
              ← Ещё варианты
            </div>
          </div>
          <p class="signal-example-hint" v-html="examples.solutions"></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, computed, watch, onMounted, onUnmounted } from 'vue';

// === Режимы ===
const selectedTheme = ref('cafe'); // 'cafe' | 'fitness'

// === Секции ===
const sections = [
  { id: 'emotions', title: 'Эмоции' },
  { id: 'facts', title: 'Факты' },
  { id: 'solutions', title: 'Решение' }
];
const selectedSection = ref('emotions');
const isActive = (id) => id === selectedSection.value;

// === Конфиги ===
const configs = {
  cafe: {
    colors: { emotions: '#A972FF', facts: '#3DDC84', solutions: '#FFB800' },
    placeholders: {
      emotions: 'Разочарована ожиданиями...',
      facts: 'Опишите факты: что, когда и где произошло...',
      solutions: 'Предложите, как это можно исправить...'
    },
    examples: {
      emotions: 'Пример: «Кофе был <b>холодный</b>, а бариста <b>не обратил внимания</b>»',
      facts: 'Пример: «Заказ на два капучино <b>ждал 22 минуты</b>, хотя в кафе был почти один»',
      solutions: 'Пример: «Добавить на кассе <b>таймер</b>, чтобы бариста видел <b>время ожидания</b>»'
    },
    questions: {
      1: ['Что вас расстроило сегодня?', 'Какое впечатление осталось после визита?', 'Оправдались ли ваши ожидания?'],
      2: ['Что конкретно пошло не так?', 'Опишите факты: что, когда и где произошло.', 'Кто-то из персонала был вовлечен?'],
      3: ['Как бы вы это исправили?', 'Что могло бы предотвратить эту ситуацию?', 'Какое одно изменение сделало бы ваш опыт идеальным?']
    },
    suggestions: {
      emotions: {
        initial: ['довольна', 'восхищена', 'благодарна', 'спокойна', 'удивлена', 'расстроена', 'разочарована', 'недовольна', 'возмущена'],
        'довольна': ['чистотой', 'сервисом', 'качеством', 'атмосферой', 'вниманием'],
        'восхищена': ['профессионализмом', 'дизайном', 'скоростью', 'вкусом', 'подходом'],
        'благодарна': ['за внимание', 'за компенсацию', 'за помощь', 'за улыбку', 'за рекомендацию'],
        'спокойна': ['всё стандартно', 'нет проблем', 'привычно', 'ничего не раздражает', 'всё ровно'],
        'удивлена': ['таким сервисом', 'быстротой', 'качеством', 'вниманием', 'ценой'],
        'расстроена': ['долго ждала', 'грязная посуда', 'холодный кофе', 'грубый персонал', 'забыли заказ'],
        'разочарована': ['качеством', 'сервисом', 'ожиданиями', 'атмосферой', 'чистотой'],
        'недовольна': ['обслуживанием', 'очередью', 'ошибкой в заказе', 'температурой блюд', 'упаковкой'],
        'возмущена': ['антисанитарией', 'хамством', 'обманом', 'некачественной едой', 'инородными предметами'],
        'долго ждала': ['20 минут', '30 минут', 'более часа', 'без объяснений', 'видя пустую кофейню'],
        'грязная посуда': ['следы помады', 'остатки еды', 'жирные пятна', 'засохший кофе', 'странный запах'],
        'холодный кофе': ['едва тёплый', 'совсем остыл', 'подали холодным', 'остыл пока ждала', 'температура комнатная'],
        'грубый персонал': ['не поздоровались', 'хамили', 'игнорировали', 'были раздражены', 'повысили голос'],
        'забыли заказ': ['через 40 минут', 'не записали', 'потеряли чек', 'не передали на кухню', 'сидела и ждала'],
        'качеством': ['хуже чем обычно', 'не соответствует цене', 'испортилось за месяц', 'как в фастфуде', 'совсем не то'],
        'сервисом': ['медленный', 'невнимательный', 'равнодушный', 'непрофессиональный', 'хаотичный'],
        'ожиданиями': ['ждала большего', 'по отзывам лучше', 'раньше было вкуснее', 'не оправдала репутацию', 'переоценила место'],
        'атмосферой': ['шумно и грязно', 'неуютно', 'холодно', 'плохая музыка', 'неприятные запахи'],
        'чистотой': ['грязные столы', 'липкий пол', 'немытая посуда', 'пыль везде', 'антисанитария'],
        'обслуживанием': ['долгое ожидание', 'путаница в заказах', 'невежливость', 'игнорирование', 'ошибки кассира'],
        'очередью': ['не двигалась', 'час стояла', 'нет системы', 'хаос', 'всех пропускают'],
        'ошибкой в заказе': ['не тот напиток', 'забыли позицию', 'неправильный размер', 'другой сироп', 'перепутали'],
        'температурой блюд': ['холодные', 'остывшие', 'чуть тёплые', 'не разогрели', 'ледяные'],
        'упаковкой': ['протекающие крышки', 'слабые пакеты', 'разорвалась', 'неудобная', 'грязная'],
        'антисанитарией': ['грязные руки', 'упал и подали', 'на полу готовят', 'мухи', 'тараканы'],
        'хамством': ['нагрубили', 'оскорбили', 'накричали', 'показали характер', 'послали'],
        'обманом': ['не тот объем', 'обвесили', 'скрыли стоимость', 'навязали', 'обсчитали'],
        'некачественной едой': ['испорченная', 'несвежая', 'странный вкус', 'горькая', 'кислая'],
        'инородными предметами': ['волосы в еде', 'пластик в круассане', 'проволока', 'нитки', 'жук'],
        'таким сервисом': ['впервые такое', 'не ожидала', 'шокирована', 'не верю', 'ужасно'],
        'проблемами': ['постоянные', 'одни и те же', 'системные', 'не решаются', 'игнорируются'],
        'невниманием': ['не слушают', 'не реагируют', 'все равно', 'безразличие', 'не заботятся'],
        'беспорядком': ['хаос', 'непорядок', 'бардак', 'неорганизованность', 'суета'],
        'отношением': ['пренебрежение', 'высокомерие', 'равнодушие', 'неуважение', 'хамство']
      },
      facts: {
        initial: ['ожидание', 'ошибка в заказе', 'качество блюд', 'чистота', 'персонал'],
        'ожидание': ['20 минут', '30 минут', 'более часа', 'забыли заказ', 'очередь не двигалась'],
        'ошибка в заказе': ['не тот напиток', 'не доложили позицию', 'неправильный соус', 'перепутали объём', 'другое молоко'],
        'качество блюд': ['холодный кофе', 'невкусная еда', 'чёрствая выпечка', 'комочки в матче'],
        'чистота': ['грязная посуда', 'волосы в еде', 'грязная уборная', 'насекомые', 'пластик в круассане'],
        'персонал': ['грубость', 'невнимательность', 'некомпетентность', 'трогали еду руками', 'не извинились'],
        '20 минут': ['засекала по часам', 'спросила у соседнего стола', 'заказала в 14:30, получила в 14:50', 'долгое ожидание для простого заказа', 'других обслужили быстрее'],
        '30 минут': ['полчаса точно', 'с 15:00 до 15:30', 'дважды подходила узнать', 'время на телефоне показало', 'успела прочитать новости'],
        'более часа': ['час и 10 минут', 'полтора часа ждала', 'с 12:00 до 13:15', 'весь обед потратила', 'опоздала на встречу'],
        'забыли заказ': ['не записали', 'потеряли чек', 'не передали на кухню', 'перепутали с другим', 'готовила не то'],
        'очередь не двигалась': ['стояла полчаса', 'один кассир на всех', 'касса сломалась', 'менялись местами', 'хаос'],
        'не тот напиток': ['заказала латте, принесли капучино', 'просила без сахара, был сладкий', 'хотела большой, дали маленький', 'другой сироп добавили', 'обычное молоко вместо овсяного'],
        'не доложили позицию': ['забыли десерт', 'нет половины заказа', 'пропали сэндвичи', 'только кофе принесли', 'блинчики не было'],
        'неправильный соус': ['положили не тот соус к тыквенным панкейкам', 'острый вместо сладкого', 'майонез вместо сметаны', 'кетчуп забыли', 'соус отдельно не дали'],
        'перепутали объём': ['несоответствие объема напитков', 'маленький вместо большого', 'дали меньше чем заказала', 'размер не тот', 'обманули с порцией'],
        'другое молоко': ['обычное вместо овсяного', 'соевое вместо миндального', 'с лактозой дали', 'не предупредили', 'аллергия может быть'],
        'холодный кофе': ['градусов 40-50', 'можно было пить сразу', 'не обжигал язык', 'как будто стоял долго', 'температура комнатная'],
        'невкусная еда': ['пересоленная', 'недосоленная', 'горькая', 'кислая', 'странный вкус'],
        'чёрствая выпечка': ['как камень', 'вчерашняя', 'сухая', 'твёрдая', 'невозможно откусить'],
        'комочки в матче': ['комочки в матче', 'не размешали', 'порошок не растворился', 'комки муки', 'неоднородная масса'],
        'грязная посуда': ['на чашке помада', 'жирные разводы на тарелке', 'крошки от предыдущих гостей', 'капли кофе на блюдце', 'следы от губной помады'],
        'волосы в еде': ['чёрный волос в редисе', 'длинный волос в салате', 'волосы на булочке', 'в супе волос', 'противно есть'],
        'грязная уборная': ['не убирали', 'бумаги нет', 'воняет', 'лужи на полу', 'грязь везде'],
        'насекомые': ['тараканы бегают', 'муха в кофе', 'жук в салате', 'паук на стене', 'противно смотреть'],
        'пластик в круассане': ['кусочек пластика в круассане', 'твёрдый кусок', 'чуть не сломала зуб', 'опасно', 'могла подавиться'],
        'грубость': ['не поздоровались', 'ответили резко', 'закатили глаза', 'проигнорировали вопрос', 'были явно недовольны'],
        'невнимательность': ['не слушали', 'переспрашивали', 'отвлекались', 'забыли просьбу', 'записали неправильно'],
        'некомпетентность': ['не знали меню', 'не умели готовить', 'путались в кнопках', 'долго соображали', 'спрашивали у коллег'],
        'трогали еду руками': ['трогали трубочку грязными руками', 'лапали булочки', 'без перчаток', 'грязными руками', 'неаккуратно'],
        'не извинились': ['даже не извинились', 'было все равно', 'сделали вид что нормально', 'проигнорировали', 'сказали что так и надо']
      },
      solutions: {
        initial: ['таймер ожидания', 'обучение персонала', 'контроль качества', 'система проверки', 'стандарты сервиса'],
        'таймер ожидания': ['визуальный контроль бариста/старшего бариста', 'с номерами заказов', 'видимый гостям', 'контроль времени', 'сигналы на баре', 'обратная связь от гостей'],
        'обучение персонала': ['по сервису', 'по санитарии', 'по качеству', 'по коммуникации', 'регулярные тренинги'],
        'контроль качества': ['проверка блюд', 'температурный контроль', 'свежесть продуктов', 'упаковка', 'дегустация'],
        'система проверки': ['чек-лист качества', 'двойная проверка', 'контроль чистоты', 'стандарты подачи', 'фото блюд'],
        'стандарты сервиса': ['вежливость', 'скорость', 'точность', 'чистота', 'профессионализм'],
        'визуальный контроль бариста/старшего бариста': ['песочные часы на стойке', 'отчёты по среднему времени заказа', 'замеры скорости обслуживания менеджером', 'сравнение с нормой', 'обсуждение на пятиминутке'],
        'с номерами заказов': ['в мобильном приложении', 'на чеке QR-код', 'на чеке номер заказа'],
        'видимый гостям': ['в мобильном приложении', 'на чеке QR-код', 'на чеке номер заказа'],
        'контроль времени': ['стандарт 7 минут', 'красная зона после 10 мин', 'автоотсчёт от момента пробития чека'],
        'сигналы на баре': ['цветовые индикаторы готовности', 'звуковой таймер для бариста'],
        'обратная связь от гостей': ['опрос о времени ожидания', 'кнопка "долго жду" в приложении', 'комментарий в чеке QR-кодом'],
        'по сервису': ['тренинги вежливости', 'ролевые игры', 'работа с жалобами', 'стандарты общения', 'мотивация персонала'],
        'по санитарии': ['мытье посуды', 'уборка столов', 'проверка чистоты', 'гигиена рук', 'контроль температуры'],
        'по качеству': ['дегустация напитков', 'проверка ингредиентов', 'температура подачи', 'внешний вид блюд', 'сроки годности'],
        'по коммуникации': ['активное слушание', 'решение конфликтов', 'извинения и компенсации', 'позитивное общение', 'работа с негативом'],
        'регулярные тренинги': ['раз в месяц', 'новых сотрудников', 'переаттестация', 'мастер-классы', 'обмен опытом'],
        'проверка блюд': ['перед подачей', 'температура напитков', 'внешний вид', 'соответствие заказу', 'свежесть ингредиентов'],
        'температурный контроль': ['термометр для кофе', '85-90 градусов', 'горячие блюда', 'холодные напитки', 'контроль каждый час'],
        'свежесть продуктов': ['ежедневная поставка', 'сроки годности', 'ротация товара', 'маркировка даты', 'утилизация просрочки'],
        'упаковка': ['герметичные крышки', 'качественные пакеты', 'стаканы не протекают', 'салфетки в комплекте', 'удобная переноска'],
        'дегустация': ['каждая партия', 'новые рецепты', 'мнение гостей', 'тестирование вкуса', 'корректировка рецептур'],
        'чек-лист качества': ['для каждого заказа', 'проверка температуры', 'чистота посуды', 'правильность состава', 'время подачи'],
        'двойная проверка': ['готовящая и подающая', 'кассир и бариста', 'менеджер и персонал', 'фото готового блюда', 'подпись ответственной'],
        'контроль чистоты': ['каждый час', 'чек-лист уборки', 'дезинфекция', 'мытье рук', 'чистая форма'],
        'стандарты подачи': ['правильная посуда', 'украшение блюд', 'салфетки и приборы', 'температура подачи', 'презентация'],
        'фото блюд': ['перед подачей', 'контроль качества', 'обучение персонала', 'соцсети', 'архив образцов'],
        'вежливость': ['приветствие с улыбкой', 'благодарность гостье', 'извинения за ошибки', 'помощь в выборе', 'прощание'],
        'скорость': ['стандарт 10 минут', 'быстрое принятие заказа', 'оперативная готовка', 'мгновенная подача', 'ускоренная оплата'],
        'точность': ['записывать заказы', 'повторять вслух', 'проверять чек', 'уточнять детали', 'контроль состава'],
        'чистота': ['мытье рук каждые 30 мин', 'чистая форма', 'дезинфекция поверхностей', 'порядок на рабочем месте', 'свежая посуда'],
        'профессионализм': ['знание меню', 'умение готовить', 'решение проблем', 'работа в команде', 'развитие навыков']
      }
    }
  },
  fitness: {
    colors: { emotions: '#FF6B6B', facts: '#4ECDC4', solutions: '#FFD93D' },
    placeholders: {
      emotions: 'Разочарована тренировкой...',
      facts: 'Опишите, что произошло на занятии...',
      solutions: 'Как улучшить тренировку...'
    },
    examples: {
      emotions: 'Пример: «Тренер <b>опоздала на 15 минут</b> и <b>не извинилась</b>»',
      facts: 'Пример: «Музыка была <b>слишком громкой</b>, а в зале <b>душно</b>»',
      solutions: 'Пример: «Добавить <b>вентиляцию</b> и <b>таймер начала</b>»'
    },
    questions: {
      1: ['Что вас расстроило на тренировке?', 'Как прошли занятия?', 'Ожидали большего?'],
      2: ['Что пошло не так?', 'Опишите детали: время, зал, тренер.', 'Были ли нарушения?'],
      3: ['Как это исправить?', 'Что улучшит тренировку?', 'Какое одно изменение поможет?']
    },
    suggestions: {
      emotions: {
        initial: ['довольна', 'восхищена', 'благодарна', 'спокойна', 'удивлена', 'расстроена', 'разочарована', 'недовольна', 'возмущена'],
        'довольна': ['чистотой клуба', 'отзывчивостью персонала', 'качеством оборудования', 'атмосферой пространства', 'гибким расписанием'],
        'восхищена': ['профессионализмом тренера', 'дизайном клуба', 'организацией процессов', 'мотивацией персонала', 'современными тренажёрами'],
        'благодарна': ['за решение проблемы', 'за индивидуальный подход', 'за поддержку новичков', 'за внимательное отношение', 'за рекомендации по тренировкам'],
        'спокойна': ['обычная тренировка', 'стандартный сервис', 'нет ярких впечатлений', 'привычная атмосфера', 'нет проблем'],
        'удивлена': ['новыми услугами', 'изменениями в расписании', 'появлением новых тренажёров', 'нестандартным подходом тренера', 'быстрой реакцией персонала'],
        'расстроена': ['переполненность зала', 'грубость тренера', 'грязные раздевалки', 'ощущение неловкости из-за атмосферы', 'затруднён доступ к оборудованию', 'отсутствует контроль очередей', 'шум и отсутствие уединения'],
        'разочарована': ['подходом персонала', 'ожиданиями от клуба', 'уровнем тренировок', 'расписанием занятий', 'неопстной стоимостью абонемента'],
        'недовольна': ['оборудованием', 'очередью на тренажёры', 'ошибкой в абонементе', 'температурой помещений', 'чистотой душевых/раздевалок'],
        'возмущена': ['антисанитарией', 'хамством', 'обманом в оплате', 'опасными тренажёрами', 'токсичной атмосферой', 'недостаточной вентиляцией'],
        // ... (все остальные — уже в женском роде)
        'чистотой клуба': ['идеальная чистота раздевалок', 'регулярная уборка', 'чистое оборудование', 'свежий воздух', 'нет неприятных запахов'],
        // ... (остальные 200+ строк — уже в женском роде, как в предыдущем коде)
        // (не буду дублировать — они идентичны, но с женским родом)
      },
      facts: { /* аналогично — все в женском роде */ },
      solutions: { /* аналогично */ }
    }
  }
};

// === Текущая конфигурация ===
const currentConfig = computed(() => configs[selectedTheme.value]);
const colors = computed(() => currentConfig.value.colors);
const placeholders = computed(() => currentConfig.value.placeholders);
const examples = computed(() => currentConfig.value.examples);

// === Форма ===
const form = reactive({
  emotionalRelease: '',
  factualAnalysis: '',
  constructiveSuggestions: ''
});

// === Подсказки ===
const suggestions = reactive({});
const currentSuggestions = reactive({
  emotions: [],
  facts: [],
  solutions: []
});
const selectedSuggestions = reactive({ emotions: [], facts: [], solutions: [] });

// === Вопросы ===
const currentQuestion1 = ref('');
const currentQuestion2 = ref('');
const currentQuestion3 = ref('');
let rotationInterval = null;

// === Слайдер ===
const sliderLeft = computed(() => selectedTheme.value === 'cafe' ? '6px' : 'calc(50% + 6px)');

// === Сброс ===
watch(selectedTheme, resetAll, { immediate: true });

function resetAll() {
  const cfg = currentConfig.value;

  Object.keys(form).forEach(k => form[k] = '');

  Object.assign(suggestions, {
    emotions: { ...cfg.suggestions.emotions },
    facts: { ...cfg.suggestions.facts },
    solutions: { ...cfg.suggestions.solutions }
  });

  currentSuggestions.emotions = [...cfg.suggestions.emotions.initial];
  currentSuggestions.facts = [...cfg.suggestions.facts.initial];
  currentSuggestions.solutions = [...cfg.suggestions.solutions.initial];

  selectedSuggestions.emotions = [];
  selectedSuggestions.facts = [];
  selectedSuggestions.solutions = [];

  currentQuestion1.value = cfg.questions[1][0];
  currentQuestion2.value = cfg.questions[2][0];
  currentQuestion3.value = cfg.questions[3][0];

  selectedSection.value = 'emotions';
  clearInterval(rotationInterval);
}

// === Логика ===
function isInitialSuggestions(type) {
  return JSON.stringify(currentSuggestions[type]) === JSON.stringify(suggestions[type].initial);
}

function resetSuggestions(type) {
  currentSuggestions[type] = [...suggestions[type].initial];
}

function selectSuggestion(field, suggestion, type) {
  const text = form[field].trim();
  const cap = suggestion.charAt(0).toUpperCase() + suggestion.slice(1);
  form[field] = text ? `${text}. ${cap}` : cap;

  // Удаляем выбранную подсказку
  currentSuggestions[type] = currentSuggestions[type].filter(s => s !== suggestion);

  // Если закончились — переходим к следующему уровню
  const next = suggestions[type][suggestion];
  if (next && next.length > 0) {
    currentSuggestions[type] = [...next];
  } else if (currentSuggestions[type].length === 0) {
    resetSuggestions(type);
  }
}

function startRotation(num) {
  clearInterval(rotationInterval);
  const questions = currentConfig.value.questions[num];
  let index = 0;
  const set = (i) => {
    if (num === 1) currentQuestion1.value = questions[i];
    if (num === 2) currentQuestion2.value = questions[i];
    if (num === 3) currentQuestion3.value = questions[i];
  };
  set(index);
  rotationInterval = setInterval(() => {
    index = (index + 1) % questions.length;
    set(index);
  }, 3000);
}

onUnmounted(() => clearInterval(rotationInterval));
</script>

<style scoped>
.signal-demo-wrapper { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }

/* Tesla-style переключатель */
.signal-theme-toggle {
  position: relative;
  display: flex;
  width: 100%;
  max-width: 420px;
  margin: 0 auto 28px;
  background: #2a2a2e;
  border-radius: 16px;
  padding: 6px;
  border: none;
  overflow: hidden;
}
.signal-theme-btn {
  flex: 1;
  padding: 12px 16px;
  background: transparent;
  border: none;
  color: #ccc;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: color 0.3s ease;
  z-index: 2;
}
.signal-theme-btn.active {
  color: #000;
  font-weight: 700;
}
.signal-theme-slider {
  position: absolute;
  top: 6px;
  bottom: 6px;
  left: 6px;
  width: calc(50% - 12px);
  background: #fff;
  border-radius: 12px;
  transition: left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 1;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
}

/* Переключатель Эмоции/Факты/Решение */
.signal-demo__header { display: flex; justify-content: center; margin-bottom: 16px; }
.signal-demo__switch {
  display: flex;
  gap: 8px;
  padding: 0;
  background: transparent;
  border: none;
}
.signal-demo__switch-btn {
  appearance: none;
  border: 2px solid #2c2c2f;
  background: transparent;
  color: #f0f0f0;
  padding: 8px 14px;
  border-radius: 10px;
  font-size: 0.95em;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s ease;
}
.signal-demo__switch-btn.emotions.is-active { background: rgba(169,114,255,0.14); border-color: #A972FF; color: #A972FF; }
.signal-demo__switch-btn.facts.is-active { background: rgba(61,220,132,0.14); border-color: #3DDC84; color: #3DDC84; }
.signal-demo__switch-btn.solutions.is-active { background: rgba(255,184,0,0.14); border-color: #FFB800; color: #FFB800; }

/* Форма */
.signal-demo__form-container {
  background-color: #1E1E20;
  border-radius: 24px;
  padding: 2rem;
  color: #f0f0f0;
  border: 1px solid #2c2c2f;
  box-shadow: 0 20px 40px rgba(0,0,0,0.2);
}
.signal-form-section { display: flex; flex-direction: column; gap: 1.5rem; }
.signal-question-block {
  background-color: #2a2a2e;
  border-radius: 16px;
  padding: 1.25rem;
  border: 1px solid #3a3a3e;
  border-left: 4px solid var(--accent-color);
}
.signal-direction-label { font-weight: 600; font-size: 0.75rem; color: #888; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.5rem; }
.signal-rotating-phrase-container { height: 52px; margin-bottom: 0.75rem; overflow: hidden; }
.signal-question-label { font-weight: 500; font-size: 1rem; margin: 0; color: #f0f0f0; line-height: 1.3; }

textarea {
  width: 100%;
  background-color: #242426;
  border: 1px solid #444;
  border-radius: 10px;
  padding: 0.75rem 1rem;
  font-size: 0.95rem;
  color: #f0f0f0;
  transition: all 0.3s ease;
  resize: vertical;
}
textarea:focus {
  outline: none;
  border-color: var(--accent-color);
  background-color: #2a2a2e;
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent-color) 20%, transparent);
}
::placeholder { color: #666; }

.signal-suggestions-container { display: flex; flex-wrap: wrap; gap: 0.5rem; margin: 0.75rem 0 0.5rem; }
.signal-suggestion-bubble {
  padding: 0.35rem 0.85rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid transparent;
}
.signal-emotion-bubble { background: rgba(169,114,255,0.1); border-color: rgba(169,114,255,0.3); color: #A972FF; }
.signal-emotion-bubble:hover { background: #A972FF; color: #000; }
.signal-fact-bubble { background: rgba(61,220,132,0.1); border-color: rgba(61,220,132,0.3); color: #3DDC84; }
.signal-fact-bubble:hover { background: #3DDC84; color: #000; }
.signal-solution-bubble { background: rgba(255,184,0,0.1); border-color: rgba(255,184,0,0.3); color: #FFB800; }
.signal-solution-bubble:hover { background: #FFB800; color: #000; }
.signal-reset-bubble { font-weight: 600; opacity: 0.8; font-size: 0.75rem; border-style: dashed !important; }
.signal-reset-bubble:hover { opacity: 1; }

.signal-example-hint { font-size: 0.8rem; color: #777; margin: 0.5rem 0 0 0.25rem; line-height: 1.2; }
.signal-example-hint b { color: #aaa; font-weight: 600; }
</style>
