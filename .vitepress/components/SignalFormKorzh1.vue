<template>
  <div class="signal-form-wrapper">
    <!-- Экран успешной отправки -->
    <div v-if="formSubmitted" class="signal-success-message">
      <div class="signal-success-text">
        <h3>Все готово!</h3>
        <p>Нажмите на кнопку ниже, чтобы отправить ваш уникальный код ассистенту Анне и активировать ваш запрос.</p>
        <a :href="`https://t.me/Anna_Signal?text=Сигнал%20${rawTicketNumber}`" target="_blank" class="signal-telegram-button">Активировать Сигнал в Telegram</a>
        <a href="/signals#знакомьтесь-–-анна" target="_blank" class="signal-secondary-link">Кто Анна и как работает</a>
      </div>
    </div>

    <!-- Основная форма -->
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
          <p class="signal-question-help">Выберите адрес, где произошла ситуация</p>
          <select v-model="form.coffeeShopAddress" class="signal-address-select" required>
            <option value="">Выберите адрес</option>
            <option value="Куйбышева, 103">Куйбышева, 103</option>
            <option value="Революционная, 101В" disabled>Революционная, 101В</option>
            <option value="9 просека 5-я малая линия,3б" disabled>9 просека 5-я малая линия, 3б</option>
            <option value="Льва Толстого, 30Б" disabled>Льва Толстого, 30Б</option>
            <option value="Самарская, 270" disabled>Самарская, 270</option>
            <option value="Дачная, 2к2" disabled>Дачная, 2к2</option>
            <option value="Ульяновская, 19" disabled>Ульяновская, 19</option>
            <option value="Ново-Садовая, 106Б" disabled>Ново-Садовая, 106Б</option>
          </select>
        </div>
      </div>

      <div class="signal-separator-line"></div>

      <!-- Секция с вопросами и подсказками -->
      <div class="signal-form-section">
        <div class="signal-question-block" style="--accent-color: #A972FF;">
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
            required>
          </textarea>
          
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
            <!-- Кнопка возврата к начальным вариантам -->
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
        
        <div class="signal-question-block" style="--accent-color: #3DDC84;">
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
            required>
          </textarea>
          
          <!-- Подсказки-баблы для деталей -->
          <div class="signal-suggestions-container">
            <div 
              v-for="suggestion in currentSuggestions.facts" 
              :key="suggestion"
              class="signal-suggestion-bubble signal-fact-bubble"
              @click="selectSuggestion('factualAnalysis', suggestion, 'facts')"
            >
              {{ suggestion }}
            </div>
            <!-- Кнопка возврата к начальным вариантам -->
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
        
        <div class="signal-question-block" style="--accent-color: #FFB800;">
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
            required>
          </textarea>
          
          <!-- Подсказки-баблы для решений -->
          <div class="signal-suggestions-container">
            <div 
              v-for="suggestion in currentSuggestions.solutions" 
              :key="suggestion"
              class="signal-suggestion-bubble signal-solution-bubble"
              @click="selectSuggestion('constructiveSuggestions', suggestion, 'solutions')"
            >
              {{ suggestion }}
            </div>
            <!-- Кнопка возврата к начальным вариантам -->
            <div 
              v-if="!isInitialSuggestions('solutions')"
              class="signal-suggestion-bubble signal-reset-bubble signal-solution-bubble"
              @click="resetSuggestions('solutions')"
            >
              ← Ещё варианты
            </div>
          </div>
          
          <p class="signal-example-hint" v-html="'Пример: «Добавить на кассу <b>таймер</b>, чтобы бариста видел <b>время ожидания</b>»'"></p>
        </div>
      </div>
      
      <div class="signal-section-divider"><span>Останемся на связи?</span></div>
      
      <div class="signal-form-section signal-personal-data-section">
        <div class="signal-question-block signal-compact">
          <label class="signal-question-label">Ваше имя</label>
          <p class="signal-question-help">Для персонального общения с ИИ-ассистентом Анной.</p>
          <input type="text" id="name" v-model="form.name" @focus="stopRotation()" placeholder="Как к вам обращаться?" required>
        </div>
        <div class="signal-question-block signal-compact">
          <label class="signal-question-label">Ваш контакт в Telegram</label>
          <p class="signal-question-help">Чтобы получать обновления и видеть результат.</p>
          <input type="tel" id="telegramPhone" v-model="form.telegramPhone" @focus="stopRotation()" placeholder="+7 (___) ___-__-__" required>
        </div>
      </div>
      
      <!-- РАДИКАЛЬНО ИСПРАВЛЕННЫЙ ПОДВАЛ С GRID ЛЕЙАУТОМ -->
      <div class="signal-form-footer">
        <div class="signal-terms-section">
          <div class="signal-checkbox-group">
            <input type="checkbox" id="consent" v-model="form.consent" required>
            <label for="consent">
              С <a href="/terms" target="_blank" class="signal-policy-link">Условиями использования</a> согласен/на
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
  </div>
</template>

<script setup>
import { reactive, ref, computed, onMounted, onUnmounted } from 'vue';

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
const formSubmitted = ref(false);
const rawTicketNumber = ref(null);
const formattedTicketNumber = ref(null);
const currentDate = ref('');
const activeRotator = ref(0);

// РАСШИРЕННАЯ 3-УРОВНЕВАЯ система подсказок
const suggestions = reactive({
  emotions: {
    initial: ['расстроен', 'разочарован', 'недоволен', 'возмущён', 'удивлён'],
    'расстроен': ['долго ждал', 'грязная посуда', 'холодный кофе', 'грубый персонал', 'забыли заказ'],
    'разочарован': ['качеством', 'сервисом', 'ожиданиями', 'атмосферой', 'чистотой'],
    'недоволен': ['обслуживанием', 'очередью', 'ошибкой в заказе', 'температурой блюд', 'упаковкой'],
    'возмущён': ['антисанитарией', 'хамством', 'обманом', 'некачественной едой'],
    'удивлён': ['таким сервисом', 'проблемами', 'невниманием', 'беспорядком'],
    // УРОВЕНЬ 3 для эмоций
    'долго ждал': ['20 минут', '30 минут', 'более часа', 'без объяснений', 'видя пустую кофейню'],
    'грязная посуда': ['следы помады', 'остатки еды', 'жирные пятна', 'засохший кофе', 'странный запах'],
    'холодный кофе': ['едва теплый', 'совсем остыл', 'подали холодным', 'остыл пока ждал', 'температура комнатная'],
    'грубый персонал': ['не поздоровались', 'хамили', 'игнорировали', 'были раздражены', 'повысили голос'],
    'качеством': ['хуже чем обычно', 'не соответствует цене', 'испортилось за месяц', 'как в фастфуде', 'совсем не то'],
    'сервисом': ['медленный', 'невнимательный', 'равнодушный', 'непрофессиональный', 'хаотичный'],
    'обслуживанием': ['долгое ожидание', 'путаница в заказах', 'невежливость', 'игнорирование', 'ошибки кассира']
  },
  facts: {
    initial: ['ожидание', 'ошибка в заказе', 'качество блюд', 'чистота', 'персонал'],
    'ожидание': ['20 минут', '30 минут', 'более часа', 'забыли заказ', 'очередь не двигалась'],
    'ошибка в заказе': ['не тот напиток', 'не доложили позицию', 'неправильный соус', 'перепутали объём'],
    'качество блюд': ['холодный кофе', 'невкусная еда', 'недоваренный рис', 'комочки в матче', 'чёрствая выпечка'],
    'чистота': ['грязная посуда', 'волосы в еде', 'грязная уборная', 'насекомые', 'пластик в круассане'],
    'персонал': ['грубость', 'невнимательность', 'некомпетентность', 'трогали еду руками', 'не извинились'],
    // УРОВЕНЬ 3 для фактов
    '20 минут': ['засекал по часам', 'спросил у соседнего стола', 'заказал в 14:30, получил в 14:50', 'долгое ожидание для простого заказа', 'других обслужили быстрее'],
    '30 минут': ['полчаса точно', 'с 15:00 до 15:30', 'дважды подходил узнать', 'время на телефоне показало', 'успел прочитать новости'],
    'холодный кофе': ['градусов 40-50', 'можно было пить сразу', 'не обжигал язык', 'как будто стоял долго', 'температура комнатная'],
    'грязная посуда': ['на чашке помада', 'жирные разводы на тарелке', 'крошки от предыдущих гостей', 'капли кофе на блюдце', 'следы от губной помады'],
    'не тот напиток': ['заказал латте, принесли капучино', 'просил без сахара, был сладкий', 'хотел большой, дали маленький', 'другой сироп', 'обычное молоко вместо овсяного'],
    'грубость': ['не поздоровались', 'ответили резко', 'закатили глаза', 'проигнорировали вопрос', 'были явно недовольны']
  },
  solutions: {
    initial: ['таймер ожидания', 'обучение персонала', 'контроль качества', 'система проверки', 'стандарты'],
    'таймер ожидания': ['на кассе', 'видимый гостям', 'с уведомлениями', 'контроль времени'],
    'обучение персонала': ['по сервису', 'по санитарии', 'по качеству', 'по коммуникации'],
    'контроль качества': ['проверка блюд', 'температурный контроль', 'свежесть продуктов', 'упаковка'],
    'система проверки': ['чек-лист качества', 'двойная проверка', 'контроль чистоты', 'стандарты подачи'],
    'стандарты': ['чистоты', 'сервиса', 'времени подачи', 'качества продуктов'],
    // УРОВЕНЬ 3 для решений
    'на кассе': ['большой дисплей', 'видимый всем', 'с номерами заказов', 'обновляется в реальном времени', 'со звуковым сигналом'],
    'видимый гостям': ['на стене', 'над барной стойкой', 'в мобильном приложении', 'на столике с номером', 'на чеке QR-код'],
    'по сервису': ['тренинги вежливости', 'ролевые игры', 'работа с жалобами', 'стандарты общения', 'мотивация персонала'],
    'по санитарии': ['мытье посуды', 'уборка столов', 'проверка чистоты', 'гигиена рук', 'контроль температуры'],
    'проверка блюд': ['перед подачей', 'температура напитков', 'внешний вид', 'соответствие заказу', 'свежесть ингредиентов'],
    'чек-лист качества': ['для каждого заказа', 'проверка температуры', 'чистота посуды', 'правильность состава', 'время подачи']
  }
});

// Текущие подсказки для каждого поля
const currentSuggestions = reactive({
  emotions: [...suggestions.emotions.initial],
  facts: [...suggestions.facts.initial],
  solutions: [...suggestions.solutions.initial]
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

// Проверка, являются ли текущие подсказки начальными
function isInitialSuggestions(suggestionType) {
  return JSON.stringify(currentSuggestions[suggestionType]) === JSON.stringify(suggestions[suggestionType].initial);
}

// Сброс подсказок к начальным вариантам
function resetSuggestions(suggestionType) {
  currentSuggestions[suggestionType] = [...suggestions[suggestionType].initial];
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
  const nextSuggestions = suggestions[suggestionType][selectedWord];
  if (nextSuggestions && nextSuggestions.length > 0) {
    currentSuggestions[suggestionType] = [...nextSuggestions];
  } else {
    // Если нет продолжения цепочки, показываем начальные подсказки
    currentSuggestions[suggestionType] = [...suggestions[suggestionType].initial];
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

onMounted(() => {
  rawTicketNumber.value = String(Date.now()).slice(-6);
  formattedTicketNumber.value = `${rawTicketNumber.value.slice(0, 3)}-${rawTicketNumber.value.slice(3, 6)}`;
  const now = new Date();
  const options = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' };
  currentDate.value = now.toLocaleString('ru-RU', options).replace(',', '');
});

onUnmounted(() => {
  stopRotation();
});

const isFormValid = computed(() => 
  form.coffeeShopAddress.trim() && 
  form.emotionalRelease.trim() && 
  form.factualAnalysis.trim() && 
  form.constructiveSuggestions.trim() && 
  form.name.trim() && 
  form.telegramPhone.trim() && 
  form.consent
);

async function submitForm() {
  if (!isFormValid.value) return;
  isSubmitting.value = true;
  const formData = { 
    _subject: `Новый Сигнал ${formattedTicketNumber.value} от ${form.name} (Корж, ${form.coffeeShopAddress})`, 
    "Код тикета": rawTicketNumber.value, 
    "Дата": currentDate.value, 
    "Кофейня": `Корж, ${form.coffeeShopAddress}`,
    "Имя": form.name, 
    "1. Эмоции": form.emotionalRelease, 
    "2. Детали": form.factualAnalysis, 
    "3. Решение": form.constructiveSuggestions, 
    "Контакт в Telegram": form.telegramPhone 
  };
  try {
    const response = await fetch('https://formspree.io/f/mdkzjopz', { 
      method: 'POST', 
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }, 
      body: JSON.stringify(formData) 
    });
    if (!response.ok) throw new Error('Ошибка сервера');
    formSubmitted.value = true;
  } catch (error) {
    console.error('Ошибка отправки:', error);
    alert('Не удалось отправить отзыв. Попробуйте позже.');
  } finally { 
    isSubmitting.value = false; 
  }
}
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
  color: #C5F946; 
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
  border-color: #C5F946; 
  background-color: #2a2a2e; 
  box-shadow: 0 0 0 3px rgba(197, 249, 70, 0.2); 
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
  align-items: flex-start; 
  gap: 0.75rem;
  width: 100%;
}

.signal-checkbox-group input { 
  accent-color: #00C2FF; 
  flex-shrink: 0; 
  margin-top: 0.15rem;
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

.signal-policy-link { 
  color: #b0b0b0; 
  text-decoration: none; 
} 

.signal-policy-link:hover { 
  text-decoration: underline; 
}

.signal-submit-btn { 
  background: linear-gradient(90deg, #A972FF 0%, #00C2FF 50%, #FFB800 100%); 
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
  box-shadow: 0 10px 20px -5px rgba(0, 0, 0, 0.3); 
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
  background-color: #C5F946; 
  color: #000000; 
  text-decoration: none; 
  padding: 0.8rem 1.5rem; 
  border-radius: 12px; 
  font-weight: 600; 
  margin-top: 1.5rem; 
  transition: background-color 0.3s, transform 0.3s; 
}

.signal-telegram-button:hover { 
  background-color: #d6ff6a; 
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
  color: #C5F946; 
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
    align-items: flex-start; 
    gap: 0.5rem; 
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
</style>
