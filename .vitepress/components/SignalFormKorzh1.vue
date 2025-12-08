<template>
  <div class="signal-form-wrapper">
    
    <!-- 1. ЭКРАН УСПЕХА (внутри wrapper) -->
    <div v-if="formSubmitted" class="signal-success-message">
      <div class="signal-success-text">
        <h3>Сигнал отправлен ⚡</h3>
        <p>Отправьте тикет Анне, чтобы получить результат в Телеграм.</p>
        
        <!-- Кнопка в Telegram -->
        <a :href="`https://t.me/Anna_Signal?text=Сигнал%20${rawTicketNumber}`" target="_blank" class="signal-telegram-button">Получить ответ</a>
        
        <!-- Кнопка Поделиться в сторис -->
        <button @click="handleShareClick" class="signal-share-btn">
          Поделиться в Истории
        </button>

        <!-- Ссылка на информацию -->
        <a href="/signals#знакомьтесь-–-анна" target="_blank" class="signal-secondary-link">Кто Анна и как работает</a>
      </div>
    </div>

    <!-- 2. ФОРМА (внутри wrapper) -->
    <form v-else @submit.prevent="submitForm">
      <div class="signal-form-header">
        <div class="signal-form-title">Новый Сигнал</div>
        <div class="signal-tech-info">
          <span class="signal-info-item">{{ currentDate }}</span>
          <span class="signal-info-item signal-ticket-display">{{ formattedTicketNumber }}</span>
        </div>
      </div>

      <!-- Секция выбора кофейни -->
      <div class="signal-form-section">
        <div class="signal-question-block signal-compact">
          <label class="signal-question-label">Ваша кофейня "Корж"</label>
          <p class="signal-question-help">В какой кофейне произошла ситуация?</p>
          <select v-model="form.coffeeShopAddress" class="signal-address-select" required>
            <option value="">Выбрать локацию</option>
            <option value="Куйбышева, 103">Куйбышева, 103</option>
            <option value="Льва Толстого, 30Б">Льва Толстого, 30Б</option>
            <option value="Революционная, 101В" disabled>Революционная, 101В</option>
            <option value="9 просека 5-я малая линия,3б" disabled>9 просека 5-я малая линия, 3б</option>
            <option value="Самарская, 270" disabled>Самарская, 270</option>
            <option value="Дачная, 2к2" disabled>Дачная, 2к2</option>
            <option value="Ульяновская, 19" disabled>Ульяновская, 19</option>
            <option value="Ново-Садовая, 106Б" disabled>Ново-Садовая, 106Б</option>
          </select>
        </div>
      </div>

      <div class="signal-separator-line"></div>

      <!-- Кнопка "Как работает" и переключатель пола -->
      <div class="signal-controls-row">
        <button 
          type="button"
          class="signal-info-button"
          :class="{ 
            'signal-info-female': selectedGender === 'female',
            'signal-info-male': selectedGender === 'male'
          }"
          @click="showInfoModal = true"
        >
          Как работает
        </button>
        <div class="signal-gender-switch">
          <div class="signal-gender-container">
            <div 
              class="signal-gender-btn signal-gender-female"
              :class="{ 'is-active': selectedGender === 'female' }"
              @click="onGenderClick('female')"
            ></div>
            <div 
              class="signal-gender-btn signal-gender-male"
              :class="{ 'is-active': selectedGender === 'male' }"
              @click="onGenderClick('male')"
            ></div>
          </div>
        </div>
      </div>

      <!-- Модальное окно -->
      <div v-if="showInfoModal" class="modal-overlay" @click.self="showInfoModal = false">
        <div class="modal">
          <div class="modal-title">Ваши отзывы меняют всё.</div>
          <div class="modal-body">
            Каждый отзыв делает любимую кофейню еще лучше, а Сигнал помогает решить Вашу проблему за 24 часа. Почувствуйте силу настоящих перемен.<br><br>
            <a href="https://cffx.ru/signals.html" target="_blank" class="modal-link">Как Работает Сигнал</a>
          </div>
          <div class="modal-footer">
            <button type="button" class="modal-ok" @click="showInfoModal = false">Понятно</button>
          </div>
        </div>
      </div>

      <!-- Секция с вопросами и подсказками -->
      <div class="signal-form-section">
        <div class="signal-question-block" :class="genderClass" style="--accent-color: #A972FF;">
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
            placeholder="Опишите свои чувства и впечатления..."
          ></textarea>
          
          <!-- Подсказки-баблы для эмоций -->
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
          
          <p class="signal-example-hint" v-html="'Пример: «Кофе был <b>холодный</b>, а бариста <b>не обратил внимания</b>»'"></p>
        </div>
        
        <div class="signal-question-block" :class="genderClass" style="--accent-color: #3DDC84;">
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
            placeholder="Опишите факты: что, когда и где произошло..."
          ></textarea>
          
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
          
          <p class="signal-example-hint" v-html="'Пример: «Заказ на два капучино <b>ждал 22 минуты</b>, хотя в кафе был почти один»'"></p>
        </div>
        
        <div class="signal-question-block" :class="genderClass" style="--accent-color: #FFB800;">
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
            placeholder="Предложите, как это можно исправить..."
          ></textarea>
          
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
          
          <p class="signal-example-hint" v-html="'Пример: «Добавить на кассе <b>таймер</b>, чтобы бариста видел <b>время ожидания</b>»'"></p>
        </div>
      </div>
      
      <div class="signal-section-divider"><span>Останемся на связи?</span></div>
      
      <div class="signal-form-section signal-personal-data-section">
        <div class="signal-question-block signal-compact">
          <label class="signal-question-label">Ваше имя</label>
          <p class="signal-question-help">Для персонального разбора с ИИ-ассистентом Анной</p>
          <input type="text" id="name" v-model="form.name" @focus="stopRotation()" placeholder="Как к вам обращаться?" required>
        </div>
        <div class="signal-question-block signal-compact">
          <label class="signal-question-label">Ваш контакт в Telegram</label>
          <p class="signal-question-help">Чтобы получать обновления и видеть результат</p>
          <input type="text" id="telegramPhone" v-model="form.telegramPhone" placeholder="Ник или Номер телефона" required>
        </div>
      </div>
      
      <div class="signal-form-footer">
        <div class="signal-terms-section">
          <div class="signal-checkbox-group">
            <input type="checkbox" id="consent" v-model="form.consent" required>
            <label for="consent">
              Подтверждаю согласие с <a href="/terms" target="_blank" class="signal-policy-link">Условиями использования</a>
            </label>
          </div>
        </div>
        <div class="signal-button-section">
          <button type="submit" class="signal-submit-btn" :disabled="!isFormValid || isSubmitting">
            {{ isSubmitting ? 'Отправка...' : 'Отправить Сигнал' }}
          </button>
        </div>
      </div>
    </form>

    <!-- 3. КОМПОНЕНТ СТОРИС (внутри wrapper) -->
<KorzhStoryGenerator 
  ref="storyGeneratorRef"
  :ticket="formattedTicketNumber"
  :date="currentDate.split(' ')[0]"
  :address="form.coffeeShopAddress"
  :details="form.emotionalRelease + ' ' + form.factualAnalysis + ' ' + form.constructiveSuggestions"
  :emotion="form.emotionalRelease"
/>


  </div> <!-- Закрытие signal-form-wrapper -->
</template>


<script setup>
import { reactive, ref, computed, onMounted, onUnmounted, watch } from 'vue';
import KorzhStoryGenerator from './KorzhStoryGenerator.vue';

const form = reactive({ 
  coffeeShopAddress: '',
  emotionalRelease: '', 
  factualAnalysis: '', 
  constructiveSuggestions: '', 
  name: '', 
  telegramPhone: '', 
  consent: false 
});

const isSubmitting = ref(false);
const submittedTime = ref('');
const formSubmitted = ref(false);
const rawTicketNumber = ref(null);
const formattedTicketNumber = ref(null);
const currentDate = ref('');
const activeRotator = ref(0);
const selectedGender = ref('female');
const showInfoModal = ref(false);
// Вычисляемое свойство для гендерного класса
const genderClass = computed(() => {
  return selectedGender.value === 'female' ? 'gender-female' : 'gender-male';
});


// ПОЛНАЯ 3-УРОВНЕВАЯ система подсказок с гендерными вариантами
const baseSuggestions = {
  female: {
    emotions: {
      initial: ['довольна', 'восхищена', 'благодарна', 'удивлена', 'расстроена', 'разочарована', 'недовольна', 'возмущена'],
      'довольна': ['качеством кофе', 'скоростью обслуживания', 'вежливостью персонала', 'атмосферой заведения', 'чистотой помещения'],
      'восхищена': ['мастерством бариста', 'качеством десертов', 'дизайном интерьера', 'музыкальным сопровождением', 'ароматом кофе'],
      'благодарна': ['за внимание к деталям', 'за решение проблемы', 'за рекомендацию напитка', 'за уютную обстановку', 'за профессионализм'],
      'удивлена': ['таким сервисом', 'проблемами', 'невниманием', 'беспорядком', 'отношением'],
      'расстроена': ['долго ждала', 'грязная посуда', 'холодный кофе', 'грубый персонал', 'забыли заказ'],
      'разочарована': ['качеством', 'сервисом', 'ожиданиями', 'атмосферой', 'чистотой'],
      'недовольна': ['обслуживанием', 'очередью', 'ошибкой в заказе', 'температурой блюд', 'упаковкой'],
      'возмущена': ['антисанитарией', 'хамством', 'обманом', 'некачественной едой', 'инородными предметами']
    }
  },
  male: {
    emotions: {
      initial: ['доволен', 'восхищён', 'благодарен', 'удивлён', 'расстроен', 'разочарован', 'недоволен', 'возмущён'],
      'доволен': ['качеством кофе', 'скоростью обслуживания', 'вежливостью персонала', 'атмосферой заведения', 'чистотой помещения'],
      'восхищён': ['мастерством бариста', 'качеством десертов', 'дизайном интерьера', 'музыкальным сопровождением', 'ароматом кофе'],
      'благодарен': ['за внимание к деталям', 'за решение проблемы', 'за рекомендацию напитка', 'за уютную обстановку', 'за профессионализм'],
      'удивлён': ['таким сервисом', 'проблемами', 'невниманием', 'беспорядком', 'отношением'],
      'расстроен': ['долго ждал', 'грязная посуда', 'холодный кофе', 'грубый персонал', 'забыли заказ'],
      'разочарован': ['качеством', 'сервисом', 'ожиданиями', 'атмосферой', 'чистотой'],
      'недоволен': ['обслуживанием', 'очередью', 'ошибкой в заказе', 'температурой блюд', 'упаковкой'],
      'возмущён': ['антисанитарией', 'хамством', 'обманом', 'некачественной едой', 'инородными предметами']
    }
  },
  // Гендерно-нейтральные подсказки (общие для всех)
  common: {
    emotions: {
      'долго ждал': ['20 минут', '30 минут', 'более часа', 'без объяснений', 'видя пустую кофейню'],
      'долго ждала': ['20 минут', '30 минут', 'более часа', 'без объяснений', 'видя пустую кофейню'],
      'грязная посуда': ['следы помады', 'остатки еды', 'жирные пятна', 'засохший кофе', 'странный запах'],
      'холодный кофе': ['едва теплый', 'совсем остыл', 'подали холодным', 'температура комнатная'],
      'грубый персонал': ['не поздоровались', 'хамили', 'игнорировали', 'были раздражены', 'повысили голос'],
      'забыли заказ': ['через 40 минут', 'не записали', 'потеряли чек', 'не передали на кухню'],
      'качеством': ['хуже чем обычно', 'не соответствует цене', 'испортилось за месяц', 'как в фастфуде', 'совсем не то'],
      'сервисом': ['медленный', 'невнимательный', 'равнодушный', 'непрофессиональный', 'хаотичный'],
      'ожиданиями': ['по отзывам лучше', 'раньше было вкуснее', 'не оправдал репутацию'],
      'атмосферой': ['шумно и грязно', 'неуютно', 'холодно', 'плохая музыка', 'неприятные запахи'],
      'чистотой': ['грязные столы', 'липкий пол', 'немытая посуда', 'пыль везде', 'антисанитария'],
      'обслуживанием': ['долгое ожидание', 'путаница в заказах', 'невежливость', 'игнорирование', 'ошибки кассира'],
      'очередью': ['не двигалась', 'час ожидания', 'нет системы', 'хаос', 'всех пропускают'],
      'ошибкой в заказе': ['не тот напиток', 'забыли позицию', 'неправильный размер', 'другой сироп', 'перепутали'],
      'температурой блюд': ['холодные', 'остывшие', 'чуть теплые', 'не разогрели', 'ледяные'],
      'упаковкой': ['протекающие крышки', 'слабые пакеты', 'разорвалась', 'неудобная', 'грязная'],
      'антисанитарией': ['грязные руки', 'упал и подали', 'на полу готовят', 'мухи', 'тараканы'],
      'хамством': ['нагрубили', 'оскорбили', 'накричали', 'показали характер', 'послали'],
      'обманом': ['не тот объем', 'обвесили', 'скрыли стоимость', 'навязали', 'обсчитали'],
      'некачественной едой': ['испорченная', 'несвежая', 'странный вкус', 'горькая', 'кислая'],
      'инородными предметами': ['волосы в еде', 'пластик в круассане', 'проволока', 'нитки', 'жук'],
      'таким сервисом': ['впервые такое', 'шокирован', 'не верю', 'ужасно'],
      'проблемами': ['постоянные', 'одни и те же', 'системные', 'не решаются', 'игнорируются'],
      'невниманием': ['не слушают', 'не реагируют', 'все равно', 'безразличие', 'не заботятся'],
      'беспорядком': ['хаос', 'непорядок', 'бардак', 'неорганизованность', 'суета'],
      'отношением': ['пренебрежение', 'высокомерие', 'равнодушие', 'неуважение', 'хамство'],
      'качеством кофе': ['идеальная температура', 'богатый аромат', 'сбалансированный вкус', 'красивая подача', 'свежая обжарка'],
      'скоростью обслуживания': ['заказ за 3 минуты', 'мгновенная подача', 'нет очередей', 'четкая организация', 'быстрая оплата'],
      'вежливостью персонала': ['улыбчивые сотрудники', 'внимательное отношение', 'помощь в выборе', 'вежливое общение', 'профессионализм'],
      'атмосферой заведения': ['уютный интерьер', 'приятная музыка', 'комфортные места', 'теплое освещение', 'спокойная обстановка'],
      'чистотой помещения': ['сверкающая посуда', 'чистые столы', 'порядок везде', 'свежий воздух', 'аккуратность'],
      'мастерством бариста': ['красивый латте-арт', 'точные пропорции', 'умение готовить', 'знание рецептов', 'творческий подход'],
      'качеством десертов': ['свежая выпечка', 'идеальный вкус', 'красивая презентация', 'домашний вкус', 'качественные ингредиенты'],
      'дизайном интерьера': ['стильное оформление', 'продуманные детали', 'современный дизайн', 'удобная мебель', 'гармоничные цвета'],
      'музыкальным сопровождением': ['приятная фоновая музыка', 'подходящий плейлист', 'комфортная громкость', 'качественный звук', 'атмосферные композиции'],
      'ароматом кофе': ['насыщенный запах', 'свежемолотые зерна', 'манящий аромат', 'качественные сорта', 'профессиональная обжарка'],
      'за внимание к деталям': ['запомнили предпочтения', 'учли пожелания', 'индивидуальный подход', 'забота о госте', 'персональный сервис'],
      'за решение проблемы': ['быстро исправили ошибку', 'заменили напиток', 'извинились за неудобство', 'предложили компенсацию', 'проявили понимание'],
      'за рекомендацию напитка': ['подобрали по вкусу', 'посоветовали новинку', 'объяснили особенности', 'учли предпочтения', 'помогли выбрать'],
      'за уютную обстановку': ['домашняя атмосфера', 'теплый прием', 'комфортные условия', 'располагающая обстановка', 'приятное времяпрепровождение'],
      'за профессионализм': ['высокий уровень сервиса', 'компетентность', 'качественная работа', 'внимание к деталям', 'превосходное обслуживание']
    },
    facts: {
      initial: ['ожидание', 'ошибка в заказе', 'качество блюд', 'чистота', 'персонал'],
      'ожидание': ['20 минут', '30 минут', 'более часа', 'забыли заказ', 'очередь не двигалась'],
      'ошибка в заказе': ['не тот напиток', 'не доложили позицию', 'неправильный соус', 'перепутали объём', 'другое молоко'],
      'качество блюд': ['холодный кофе', 'невкусная еда', 'недоваренный рис', 'комочки в матче', 'чёрствая выпечка'],
      'чистота': ['грязная посуда', 'волосы в еде', 'грязная уборная', 'насекомые', 'пластик в круассане'],
      'персонал': ['грубость', 'невнимательность', 'некомпетентность', 'трогали еду руками', 'не извинились'],
      '20 минут': ['засекал по часам', 'спросил у соседнего стола', 'заказал в 14:30, получил в 14:50', 'долгое ожидание для простого заказа', 'других обслужили быстрее'],
      '30 минут': ['полчаса точно', 'с 15:00 до 15:30', 'дважды подходил узнать', 'время на телефоне показало', 'успел прочитать новости'],
      'более часа': ['час и 10 минут', 'полтора часа ждал', 'с 12:00 до 13:15', 'весь обед потратил', 'опоздал на встречу'],
      'забыли заказ': ['не записали', 'потеряли чек', 'не передали на кухню', 'перепутали с другим', 'готовили не то'],
      'очередь не двигалась': ['стоял полчаса', 'один кассир на всех', 'касса сломалась', 'менялись местами', 'хаос'],
      'не тот напиток': ['заказал латте, принесли капучино', 'просил без сахара, был сладкий', 'хотел большой, дали маленький', 'другой сироп добавили', 'обычное молоко вместо овсяного'],
      'не доложили позицию': ['забыли десерт', 'нет половины заказа', 'пропали сэндвичи', 'только кофе принесли', 'блинчики не было'],
      'неправильный соус': ['положили не тот соус к тыквенным панкейкам', 'острый вместо сладкого', 'майонез вместо сметаны', 'кетчуп забыли', 'соус отдельно не дали'],
      'перепутали объём': ['несоответствие объема напитков', 'маленький вместо большого', 'дали меньше чем заказал', 'размер не тот', 'обманули с порцией'],
      'другое молоко': ['обычное вместо овсяного', 'соевое вместо миндального', 'с лактозой дали', 'не предупредили', 'аллергия может быть'],
      'холодный кофе': ['градусов 40-50', 'можно было пить сразу', 'не обжигал язык', 'как будто стоял долго', 'температура комнатная'],
      'невкусная еда': ['пересоленная', 'недосоленная', 'горькая', 'кислая', 'странный вкус'],
      'недоваренный рис': ['недоваренный рис, не свежий лайм и черный волос в редисе', 'жесткий', 'сырой', 'хрустит на зубах', 'не доварили'],
      'комочки в матче': ['комочки в матче', 'не размешали', 'порошок не растворился', 'комки муки', 'неоднородная масса'],
      'чёрствая выпечка': ['как камень', 'вчерашняя', 'сухая', 'твердая', 'невозможно откусить'],
      'грязная посуда': ['на чашке помада', 'жирные разводы на тарелке', 'крошки от предыдущих гостей', 'капли кофе на блюдце', 'следы от губной помады'],
      'волосы в еде': ['черный волос в редисе', 'длинный волос в салате', 'волосы на булочке', 'в супе волос', 'противно есть'],
      'грязная уборная': ['не убирали', 'бумаги нет', 'воняет', 'лужи на полу', 'грязь везде'],
      'насекомые': ['тараканы бегают', 'муха в кофе', 'жук в салате', 'паук на стене', 'противно смотреть'],
      'пластик в круассане': ['кусочек пластика в круассане', 'твердый кусок', 'чуть не сломал зуб', 'опасно', 'мог подавиться'],
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
      'двойная проверка': ['готовящий и подающий', 'кассир и бариста', 'менеджер и персонал', 'фото готового блюда', 'подпись ответственного'],
      'контроль чистоты': ['каждый час', 'чек-лист уборки', 'дезинфекция', 'мытье рук', 'чистая форма'],
      'стандарты подачи': ['правильная посуда', 'украшение блюд', 'салфетки и приборы', 'температура подачи', 'презентация'],
      'фото блюд': ['перед подачей', 'контроль качества', 'обучение персонала', 'соцсети', 'архив образцов'],
      'вежливость': ['приветствие с улыбкой', 'благодарность гостю', 'извинения за ошибки', 'помощь в выборе', 'прощание'],
      'скорость': ['стандарт 10 минут', 'быстрое принятие заказа', 'оперативная готовка', 'мгновенная подача', 'ускоренная оплата'],
      'точность': ['записывать заказы', 'повторять вслух', 'проверять чек', 'уточнять детали', 'контроль состава'],
      'чистота': ['мытье рук каждые 30 мин', 'чистая форма', 'дезинфекция поверхностей', 'порядок на рабочем месте', 'свежая посуда'],
      'профессионализм': ['знание меню', 'умение готовить', 'решение проблем', 'работа в команде', 'развитие навыков']
    }
  }
};

// Объединяем подсказки с учетом гендера
const suggestions = computed(() => {
  const gender = selectedGender.value;
  return {
    emotions: { ...baseSuggestions[gender].emotions, ...baseSuggestions.common.emotions },
    facts: baseSuggestions.common.facts,
    solutions: baseSuggestions.common.solutions
  };
});

// Текущие подсказки для каждого поля
const currentSuggestions = reactive({
  emotions: [],
  facts: [],
  solutions: []
});

// Выбранные подсказки (для построения цепочек)
const selectedSuggestions = reactive({
  emotions: [],
  facts: [],
  solutions: []
});

// Счетчики веток для улучшенного разделения текста
const branchCounters = reactive({
  emotions: 0,
  facts: 0,
  solutions: 0
});

const phrasesForQuestion1 = ['Что вас расстроило сегодня?', 'Какое впечатление осталось после визита?', 'Оправдались ли ваши ожидания?'];
const phrasesForQuestion2 = ['Что конкретно пошло не так?', 'Опишите факты: что, когда и где произошло.', 'Кто-то из персонала был вовлечен?'];
const phrasesForQuestion3 = ['Как бы вы это исправили?', 'Что могло бы предотвратить эту ситуацию?', 'Какое одно изменение сделало бы ваш опыт идеальным?'];

const currentQuestion1 = ref(phrasesForQuestion1[0]);
const currentQuestion2 = ref(phrasesForQuestion2[0]);
const currentQuestion3 = ref(phrasesForQuestion3[0]);

let rotationInterval = null;
let currentQuestionIndex1 = 0;
let currentQuestionIndex2 = 0;
let currentQuestionIndex3 = 0;

// Инициализация подсказок при загрузке
function initializeSuggestions() {
  currentSuggestions.emotions = [...suggestions.value.emotions.initial];
  currentSuggestions.facts = [...suggestions.value.facts.initial];
  currentSuggestions.solutions = [...suggestions.value.solutions.initial];
}

// Обработчик переключения пола
function onGenderClick(gender) {
  selectedGender.value = gender;
  // Сбрасываем только подсказки эмоций
  currentSuggestions.emotions = [...suggestions.value.emotions.initial];
  selectedSuggestions.emotions = [];
  branchCounters.emotions = 0;
}

// Проверка, являются ли текущие подсказки начальными
function isInitialSuggestions(suggestionType) {
  return JSON.stringify(currentSuggestions[suggestionType]) === JSON.stringify(suggestions.value[suggestionType].initial);
}

// Сброс подсказок к начальным вариантам
function resetSuggestions(suggestionType) {
  currentSuggestions[suggestionType] = [...suggestions.value[suggestionType].initial];
}

// УЛУЧШЕННАЯ функция выбора подсказки с разделением веток
function selectSuggestion(fieldName, suggestion, suggestionType) {
  const currentText = form[fieldName].trim();
  
  // Определяем, начинается ли новая ветка
  const isNewBranch = isInitialSuggestions(suggestionType);
  
  if (currentText) {
    if (isNewBranch) {
      // Новая ветка - добавляем с точкой и заглавной буквы
      form[fieldName] = currentText + '. ' + suggestion.charAt(0).toUpperCase() + suggestion.slice(1);
      branchCounters[suggestionType]++;
    } else {
      // Продолжение ветки - добавляем через пробел
      form[fieldName] = currentText + ' ' + suggestion;
    }
  } else {
    // Первый выбор
    form[fieldName] = suggestion.charAt(0).toUpperCase() + suggestion.slice(1);
    branchCounters[suggestionType] = 1;
  }
  
  // Сохраняем выбранную подсказку
  selectedSuggestions[suggestionType].push(suggestion);
  
  // Обновляем доступные подсказки на основе выбора
  updateSuggestions(suggestionType, suggestion);
}

// Обновление подсказок на основе выбора
function updateSuggestions(suggestionType, selectedWord) {
  const nextSuggestions = suggestions.value[suggestionType][selectedWord];
  if (nextSuggestions && nextSuggestions.length > 0) {
    currentSuggestions[suggestionType] = [...nextSuggestions];
  } else {
    // Если нет продолжения цепочки, показываем начальные подсказки
    currentSuggestions[suggestionType] = [...suggestions.value[suggestionType].initial];
  }
}

function startRotation(questionNum) {
  stopRotation();
  activeRotator.value = questionNum;
  rotationInterval = setInterval(() => {
    if (questionNum === 1) {
      currentQuestionIndex1 = (currentQuestionIndex1 + 1) % phrasesForQuestion1.length;
      currentQuestion1.value = phrasesForQuestion1[currentQuestionIndex1];
    } else if (questionNum === 2) {
      currentQuestionIndex2 = (currentQuestionIndex2 + 1) % phrasesForQuestion2.length;
      currentQuestion2.value = phrasesForQuestion2[currentQuestionIndex2];
    } else if (questionNum === 3) {
      currentQuestionIndex3 = (currentQuestionIndex3 + 1) % phrasesForQuestion3.length;
      currentQuestion3.value = phrasesForQuestion3[currentQuestionIndex3];
    }
  }, 3000);
}

function stopRotation() {
  clearInterval(rotationInterval);
  activeRotator.value = 0;
}

// ИЗМЕНЕННОЕ УСЛОВИЕ ВАЛИДАЦИИ ФОРМЫ
const isFormValid = computed(() => 
  form.coffeeShopAddress.trim() && 
  (form.emotionalRelease.trim() || form.factualAnalysis.trim() || form.constructiveSuggestions.trim()) && 
  form.name.trim() && 
  form.telegramPhone.trim() && 
  form.consent
);

async function submitForm() {
  if (!isFormValid.value) return;
  
  isSubmitting.value = true;
  
  const now = new Date();
  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const year = now.getFullYear();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  submittedTime.value = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  
  // Генерируем уникальный ID клиента (для rate limiting)
  let clientId = localStorage.getItem('signal_client_id');
  if (!clientId) {
    clientId = 'client_' + Math.random().toString(36).substring(2, 15) + Date.now();
    localStorage.setItem('signal_client_id', clientId);
  }
  
  const API_ENDPOINT = 'https://script.google.com/macros/s/AKfycbyO-bEv334omRz4i9Dsa4QRMQqx5Wj-67nIbEtLT6suK6MJu7myE1gpjGl7Gc7w0IeeNg/exec';
  
  const formData = new FormData();
  formData.append('referer', window.location.origin);
  formData.append('clientId', clientId);
  formData.append('ticketNumber', formattedTicketNumber.value);
  formData.append('date', currentDate.value);
  formData.append('submitted', submittedTime.value);
  formData.append('coffeehouse', `Корж, ${form.coffeeShopAddress}`);
  formData.append('name', form.name);
  formData.append('telegram', form.telegramPhone);
  formData.append('emotionalRelease', form.emotionalRelease);
  formData.append('factualAnalysis', form.factualAnalysis);
  formData.append('constructiveSuggestions', form.constructiveSuggestions);
  
  try {
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      body: formData
    });
    
    const result = await response.json();
    
    if (result.status === 'success' && result.processed) {
      console.log('✅ Отзыв успешно отправлен');
      formSubmitted.value = true;
    } else {
      throw new Error(result.message || 'Ошибка обработки данных');
    }
  } catch (error) {
    console.error('❌ Ошибка отправки:', error);
    
    if (error.message && error.message.includes('много запросов')) {
      alert('Вы отправили слишком много отзывов. Пожалуйста, подождите минуту.');
    } else {
      alert('Не удалось отправить отзыв. Пожалуйста, попробуйте через минуту.');
    }
  } finally {
    isSubmitting.value = false;
  }
}

onMounted(() => {
rawTicketNumber.value = String(Math.floor(Math.random() * 900000) + 100000);
formattedTicketNumber.value = `${rawTicketNumber.value.slice(0, 3)}-${rawTicketNumber.value.slice(3)}`;
  
  const now = new Date();
  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const year = now.getFullYear();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  
  currentDate.value = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  
  initializeSuggestions();
});

onUnmounted(() => {
  stopRotation();
});

  // Механика для сториз
const storyGeneratorRef = ref(null);

const allStoryTags = computed(() => {
  let tags = [
    ...(selectedSuggestions.emotions || []),
    ...(selectedSuggestions.facts || [])
  ];
  tags = [...new Set(tags.filter(t => t))];
  
  if (tags.length === 0) {
    const manualText = form.emotionalRelease || form.factualAnalysis;
    return manualText ? [manualText.slice(0, 50) + '...'] : ['Сигнал'];
  }
  return tags.slice(0, 15).map(tag => tag.charAt(0).toUpperCase() + tag.slice(1));
});

const handleShareClick = () => {
  if (storyGeneratorRef.value) {
    storyGeneratorRef.value.generateAndShare();
  }
};

</script>


<style scoped>
:root { 
  --signal-font-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; 
  --signal-font-mono: 'SF Mono', 'Monaco', 'Inconsolata', 'Fira Code', 'Droid Sans Mono', 'Source Code Pro', monospace; 
}

.signal-form-wrapper { 
  font-family: var(--signal-font-sans); 
  max-width: 640px; 
  margin: 40px auto; 
  background-color: #1E1E20; 
  border-radius: 24px; 
  padding: 2rem; 
  color: #f0f0f0; 
  border: 1px solid #2c2c2f; 
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2); 
}

.signal-form-header { 
  display: flex; 
  justify-content: space-between; 
  align-items: center; 
  margin-bottom: 2rem; 
  padding-bottom: 1rem; 
  border-bottom: 1px solid #2c2c2f; 
}

.signal-form-title { 
  font-size: 1.5rem; 
  font-weight: 600; 
  color: #fff; 
  margin: 0; 
}

.signal-tech-info { 
  display: flex; 
  align-items: center; 
  gap: 1rem; 
  font-family: var(--signal-font-mono); 
  font-size: 0.9rem; 
  color: #888; 
}

.signal-ticket-display { 
  background-color: #2a2a2e; 
  color: #9b7fb7; 
  font-weight: 700; 
  padding: 0.5rem 1rem; 
  border-radius: 12px; 
  letter-spacing: 1px; 
  font-family: var(--signal-font-mono); 
}

.signal-form-section { 
  display: flex; 
  flex-direction: column; 
  gap: 1.5rem; 
}

.signal-personal-data-section { 
  display: grid; 
  grid-template-columns: 1fr 1fr; 
  gap: 1rem; 
}

.signal-question-block { 
  background-color: #2a2a2e; 
  border-radius: 16px; 
  padding: 1.25rem; 
  border: 1px solid #3a3a3e; 
  border-left: 4px solid var(--accent-color, #444); 
}

.signal-question-block.signal-compact { 
  padding: 1rem; 
  border-left-width: 0; 
  display: flex; 
  flex-direction: column; 
  justify-content: space-between; 
}

.signal-direction-label { 
  font-weight: 600; 
  font-size: 0.75rem; 
  color: #888; 
  text-transform: uppercase; 
  letter-spacing: 0.05em; 
  margin-bottom: 0.5rem; 
  display: block; 
}

.signal-question-help { 
  font-size: 0.8rem; 
  color: #888; 
  margin-bottom: 0.75rem; 
  line-height: 1.4; 
}

.signal-rotating-phrase-container { 
  height: 52px; 
  margin-bottom: 0.75rem;
  display: flex;
  align-items: flex-start; 
  overflow: hidden; 
}

.signal-question-label { 
  font-weight: 500; 
  font-size: 1rem; 
  margin: 0; 
  color: #f0f0f0;
  line-height: 1.3; 
  width: 100%;
}

.fade-enter-active, .fade-leave-active { transition: opacity 0.5s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

.signal-address-select { 
  width: 100%; 
  background-color: #242426; 
  border: 1px solid #444; 
  border-radius: 10px; 
  padding: 0.75rem 1rem; 
  font-size: 0.95rem; 
  color: #f0f0f0; 
  transition: all 0.3s ease; 
  font-family: var(--signal-font-sans); 
}

.signal-address-select:focus { 
  outline: none; 
  border-color: #B39DC8; 
  background-color: #2a2a2e; 
  box-shadow: 0 0 0 3px rgba(179, 157, 200, 0.2); 
}

.signal-address-select option { 
  background-color: #2a2a2e; 
  color: #f0f0f0; 
}

.signal-address-select option:disabled { color: #666; }

.signal-separator-line { 
  height: 1px; 
  background: linear-gradient(90deg, transparent, #2c2c2f 20%, #2c2c2f 80%, transparent); 
  margin: 2rem 0 1.5rem 0; 
}

/* ===============================
   КНОПКА "КАК РАБОТАЕТ" И ПЕРЕКЛЮЧАТЕЛЬ ПОЛА
   =============================== */
.signal-controls-row {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
}

.signal-info-button {
  background: rgba(135, 206, 235, 0.1);
  border: 1px solid rgba(135, 206, 235, 0.3);
  color: #87ceeb;
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  height: 32px;
  display: inline-flex;
  align-items: center;
  width: auto;
}

.signal-info-button.signal-info-female {
  background: rgba(255, 105, 180, 0.1);
  border-color: rgba(255, 105, 180, 0.3);
  color: #ff69b4;
}

.signal-info-button.signal-info-female:hover {
  background: rgba(255, 105, 180, 0.2);
  border-color: rgba(255, 105, 180, 0.5);
}

.signal-info-button.signal-info-male {
  background: rgba(135, 206, 235, 0.1);
  border-color: rgba(135, 206, 235, 0.3);
  color: #87ceeb;
}

.signal-info-button.signal-info-male:hover {
  background: rgba(135, 206, 235, 0.2);
  border-color: rgba(135, 206, 235, 0.5);
}

.signal-gender-switch {
  display: flex;
  justify-content: center;
}

.signal-gender-container {
  display: flex;
  background: #2a2a2e;
  border-radius: 20px;
  padding: 4px;
  border: 1px solid #444;
  height: 32px;
  align-items: center;
}

.signal-gender-btn {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
  margin: 0 2px;
}

.signal-gender-female {
  background: rgba(255, 105, 180, 0.3);
}

.signal-gender-female.is-active {
  background: #ff69b4;
  box-shadow: 0 0 12px rgba(255, 105, 180, 0.5);
}

.signal-gender-male {
  background: rgba(135, 206, 235, 0.3);
}

.signal-gender-male.is-active {
  background: #87ceeb;
  box-shadow: 0 0 12px rgba(135, 206, 235, 0.5);
}

.signal-gender-btn:hover {
  opacity: 0.7;
  transform: scale(1.05);
}

/* ===============================
   ГЕНДЕРНЫЕ ЦВЕТА ДЛЯ БЛОКОВ
   =============================== */

/* Женские цвета для блоков */
.signal-question-block.gender-female {
  border-left-color: #ff69b4 !important;
}

.signal-question-block.gender-female .signal-emotion-bubble {
  background: rgba(255, 105, 180, 0.1);
  border-color: rgba(255, 105, 180, 0.3);
  color: #ff69b4;
}

.signal-question-block.gender-female .signal-emotion-bubble:hover {
  background: #ff69b4;
  color: #fff;
}

.signal-question-block.gender-female .signal-fact-bubble {
  background: rgba(255, 105, 180, 0.1);
  border-color: rgba(255, 105, 180, 0.3);
  color: #ff69b4;
}

.signal-question-block.gender-female .signal-fact-bubble:hover {
  background: #ff69b4;
  color: #fff;
}

.signal-question-block.gender-female .signal-solution-bubble {
  background: rgba(255, 105, 180, 0.1);
  border-color: rgba(255, 105, 180, 0.3);
  color: #ff69b4;
}

.signal-question-block.gender-female .signal-solution-bubble:hover {
  background: #ff69b4;
  color: #fff;
}

/* Мужские цвета для блоков */
.signal-question-block.gender-male {
  border-left-color: #87ceeb !important;
}

.signal-question-block.gender-male .signal-emotion-bubble {
  background: rgba(135, 206, 235, 0.1);
  border-color: rgba(135, 206, 235, 0.3);
  color: #87ceeb;
}

.signal-question-block.gender-male .signal-emotion-bubble:hover {
  background: #87ceeb;
  color: #000;
}

/* Гендерная подсветка для textarea */
.signal-question-block.gender-female textarea:focus {
  border-color: #ff69b4 !important;
  box-shadow: 0 0 0 3px rgba(255, 105, 180, 0.2) !important;
}

.signal-question-block.gender-male textarea:focus {
  border-color: #87ceeb !important;
  box-shadow: 0 0 0 3px rgba(135, 206, 235, 0.2) !important;
}

.signal-question-block.gender-male .signal-fact-bubble {
  background: rgba(135, 206, 235, 0.1);
  border-color: rgba(135, 206, 235, 0.3);
  color: #87ceeb;
}

.signal-question-block.gender-male .signal-fact-bubble:hover {
  background: #87ceeb;
  color: #000;
}

.signal-question-block.gender-male .signal-solution-bubble {
  background: rgba(135, 206, 235, 0.1);
  border-color: rgba(135, 206, 235, 0.3);
  color: #87ceeb;
}

.signal-question-block.gender-male .signal-solution-bubble:hover {
  background: #87ceeb;
  color: #000;
}

/* ===============================
   МОДАЛЬНОЕ ОКНО
   =============================== */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.75);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  backdrop-filter: blur(4px);
}

.modal {
  background-color: #1E1E20;
  border: 1px solid #2c2c2f;
  border-radius: 20px;
  padding: 2rem;
  max-width: 500px;
  width: 90%;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  animation: modalFadeIn 0.3s ease-out;
}

@keyframes modalFadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.modal-title {
  font-size: 1.4rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 1rem;
  text-align: center;
}

.modal-body {
  font-size: 0.95rem;
  line-height: 1.6;
  color: #b0b0b0;
  margin-bottom: 1.5rem;
  text-align: center;
}

.modal-link {
  color: #B39DC8;
  text-decoration: none;
  font-weight: 600;
  border-bottom: 1px solid transparent;
  transition: all 0.3s ease;
}

.modal-link:hover {
  color: #C5B3D9;
  border-bottom-color: #C5B3D9;
}

.modal-footer {
  display: flex;
  justify-content: center;
}

.modal-ok {
  background: linear-gradient(90deg, #9B7FB7 0%, #B39DC8 50%, #C5B3D9 100%);
  color: #fff;
  font-weight: 600;
  font-size: 0.95rem;
  border: none;
  border-radius: 10px;
  padding: 0.75rem 2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  background-size: 200% auto;
  background-position: 25% 50%;
}

.modal-ok:hover {
  background-position: 75% 50%;
  transform: scale(1.05);
  box-shadow: 0 8px 20px rgba(155, 127, 183, 0.4);
}

/* ===============================
   ОСТАЛЬНЫЕ СТИЛИ
   =============================== */

textarea, input { 
  width: 100%; 
  background-color: #242426; 
  border: 1px solid #444; 
  border-radius: 10px; 
  padding: 0.75rem 1rem; 
  font-size: 0.95rem; 
  color: #f0f0f0; 
  transition: all 0.3s ease; 
  font-family: var(--signal-font-sans); 
}

textarea:focus, input:focus { 
  outline: none; 
  border-color: var(--accent-color); 
  background-color: #2a2a2e; 
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent-color) 20%, transparent); 
}

/* Сиреневая подсветка для имени и телефона */
input#name:focus, 
input#telegramPhone:focus {
  border-color: #B39DC8 !important;
  box-shadow: 0 0 0 3px rgba(179, 157, 200, 0.2) !important;
}

::placeholder { color: #666; }

/* Стили для подсказок-баблов */
.signal-suggestions-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.75rem;
  margin-bottom: 0.5rem;
}

.signal-suggestion-bubble {
  padding: 0.35rem 0.85rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid transparent;
  user-select: none;
}

.signal-emotion-bubble {
  background: rgba(169, 114, 255, 0.1);
  border-color: rgba(169, 114, 255, 0.3);
  color: #A972FF;
}

.signal-emotion-bubble:hover {
  background: #A972FF;
  color: #000;
  transform: scale(1.05);
}

.signal-fact-bubble {
  background: rgba(61, 220, 132, 0.1);
  border-color: rgba(61, 220, 132, 0.3);
  color: #3DDC84;
}

.signal-fact-bubble:hover {
  background: #3DDC84;
  color: #000;
  transform: scale(1.05);
}

.signal-solution-bubble {
  background: rgba(255, 184, 0, 0.1);
  border-color: rgba(255, 184, 0, 0.3);
  color: #FFB800;
}

.signal-solution-bubble:hover {
  background: #FFB800;
  color: #000;
  transform: scale(1.05);
}

/* Кнопка сброса к начальным вариантам */
.signal-reset-bubble {
  font-weight: 600;
  opacity: 0.8;
  font-size: 0.75rem;
  border-style: dashed !important;
}

.signal-reset-bubble:hover {
  opacity: 1;
}

.signal-example-hint { 
  font-size: 0.8rem; 
  color: #777; 
  margin: 0.5rem 0 0 0.25rem; 
}

.signal-example-hint b { 
  color: #aaa; 
  font-weight: 600; 
}

.signal-section-divider { 
  margin: 2.5rem 0; 
  text-align: center; 
  position: relative; 
  color: #888; 
  font-weight: 500; 
  font-size: 0.8rem; 
  text-transform: uppercase; 
  letter-spacing: 0.1em; 
}

.signal-section-divider::before, .signal-section-divider::after { 
  content: ''; 
  position: absolute; 
  top: 50%; 
  width: calc(50% - 90px); 
  height: 1px; 
  background: #2c2c2f; 
}

.signal-section-divider::before { left: 0; } 
.signal-section-divider::after { right: 0; }

/* ОКОНЧАТЕЛЬНО ИСПРАВЛЕННЫЙ ПОДВАЛ С GRID */
.signal-form-footer { 
  margin-top: 2rem; 
  padding-top: 1.5rem;
  border-top: 1px solid #2c2c2f;
  display: grid;
  grid-template-areas: 
    "terms"
    "button";
  gap: 1.5rem;
  width: 100%;
}

.signal-terms-section {
  grid-area: terms;
  width: 100%;
}

.signal-button-section {
  grid-area: button;
  width: 100%;
}

.signal-checkbox-group { 
  display: flex; 
  align-items: center;
  gap: 0.75rem;
  width: 100%;
}

.signal-checkbox-group input { 
  accent-color: #B39DC8;
  flex-shrink: 0; 
  width: 18px;
  height: 18px;
}

.signal-checkbox-group label { 
  font-size: 0.85rem; 
  color: #999; 
  line-height: 1.4; 
  flex: 1;
  word-wrap: break-word;
  overflow-wrap: break-word;
}

/* ИСПРАВЛЕННЫЕ СТИЛИ ССЫЛКИ - УБРАНО ПОДЧЕРКИВАНИЕ */
.signal-policy-link { 
  color: #b0b0b0; 
  text-decoration: none !important; 
  border-bottom: none !important;
  outline: none !important;
  box-shadow: none !important;
} 

.signal-policy-link:hover { 
  text-decoration: underline !important; 
  border-bottom: none !important;
  color: #C5F946;
}

.signal-policy-link:focus {
  text-decoration: none !important;
  border-bottom: none !important;
  outline: none !important;
  box-shadow: none !important;
}

.signal-policy-link:visited {
  color: #b0b0b0;
  text-decoration: none !important;
  border-bottom: none !important;
}

.signal-policy-link:active {
  text-decoration: none !important;
  border-bottom: none !important;
}

/* Дополнительное переопределение для VitePress */
.signal-checkbox-group a {
  text-decoration: none !important;
  border-bottom: none !important;
  box-shadow: none !important;
  outline: none !important;
}

.signal-checkbox-group a:hover {
  text-decoration: underline !important;
  border-bottom: none !important;
}

.signal-submit-btn { 
  background: linear-gradient(90deg, #9B7FB7 0%, #B39DC8 50%, #C5B3D9 100%); 
  color: #fff; 
  font-weight: 600; 
  font-size: 1rem; 
  border: none; 
  border-radius: 12px; 
  padding: 0.9rem 2rem; 
  cursor: pointer; 
  transition: all 0.4s ease-out; 
  background-size: 200% auto; 
  background-position: 25% 50%; 
  width: 100%;
  display: block;
}

.signal-submit-btn:hover:not(:disabled) { 
  background-position: 75% 50%; 
  transform: scale(1.02); 
  box-shadow: 0 10px 20px -5px rgba(155, 127, 183, 0.4); 
}

.signal-submit-btn:disabled { 
  opacity: 0.5; 
  cursor: not-allowed; 
}

.signal-success-message { 
  display: flex; 
  flex-direction: column; 
  align-items: center; 
  text-align: center; 
  padding: 4rem 2rem 2rem 2rem; 
  animation: fadeIn 0.5s ease-out; 
}

.signal-success-text h3 { 
  font-size: 1.5rem; 
  font-weight: 600; 
  color: #fff; 
  margin: 0 0 0.5rem 0; 
}

.signal-success-text p { 
  color: #b0b0b0; 
  line-height: 1.6; 
  margin: 0; 
}

.signal-telegram-button { 
  display: inline-block; 
  background-color: #9b7fb7; 
  color: #000000; 
  text-decoration: none; 
  padding: 0.8rem 1.5rem; 
  border-radius: 12px; 
  font-weight: 600; 
  margin-top: 1.5rem; 
  transition: all 0.3s ease; 
}

.signal-telegram-button:hover { 
  background-color: #b399c8; 
  color: #ffffff;  /* ← добавили белый цвет текста */
  transform: scale(1.05); 
}

.signal-secondary-link { 
  display: block; 
  margin-top: 1.5rem; 
  font-size: 0.85rem; 
  color: #888; 
  text-decoration: none; 
  border-bottom: none !important; 
  transition: color 0.3s; 
}

.signal-secondary-link:hover { 
  color: #B39DC8;  /* ← изменили с #C5F946 на #B39DC8 */
  text-decoration: underline !important; 
  border-bottom: none !important; 
}

@keyframes fadeIn { 
  from { 
    opacity: 0; 
    transform: translateY(10px); 
  } 
  to { 
    opacity: 1; 
    transform: translateY(0); 
  } 
}

@media (max-width: 768px) { 
  .signal-form-wrapper { 
    padding: 1.5rem; 
  } 
  
  .signal-personal-data-section { 
    grid-template-columns: 1fr; 
  } 
  
  .signal-form-header { 
    flex-direction: column; 
    align-items: center;     /* ← изменили с flex-start на center */
    text-align: center;      /* ← добавили центрирование текста */
    gap: 0.5rem; 
  }
  
  .signal-form-title {
    text-align: center;      /* ← центрируем заголовок */
  }
  
  .signal-tech-info {
    justify-content: center; /* ← центрируем дату и тикет */
  }
  
  .signal-rotating-phrase-container {
    height: 65px; 
  }
  
  .signal-question-label {
    font-size: 0.95rem;
  }

  .signal-suggestions-container {
    gap: 0.4rem;
  }
  
  .signal-suggestion-bubble {
    font-size: 0.75rem;
    padding: 0.3rem 0.7rem;
  }

  .signal-controls-row {
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
  }

  .signal-gender-switch {
    justify-content: center;
  }

  /* Мобильный подвал остается таким же */
  .signal-checkbox-group {
    gap: 0.5rem;
  }

  .signal-checkbox-group input {
    width: 16px;
    height: 16px;
  }

  .signal-checkbox-group label {
    font-size: 0.8rem;
  }
}

.signal-share-btn {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #fff;
  padding: 12px 24px;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  margin: 1rem 0; /* Отступ сверху и снизу */
  transition: all 0.3s ease;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.signal-share-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}

</style>
