<template>
  <div class="signal-demo-wrapper">
    <!-- Переключатель секций - хлебные крошки -->
    <div class="signal-demo__header">
      <div class="signal-demo__breadcrumbs" role="tablist" aria-label="Секции формы">
        <button
          v-for="(section, index) in sections"
          :key="section.id"
          class="signal-breadcrumb"
          :class="[section.id, isActive(section.id) ? 'is-active' : '']"
          type="button"
          role="tab"
          :aria-selected="isActive(section.id)"
          @click="selectedSection = section.id"
        >
          <div class="signal-breadcrumb-circle"></div>
        </button>
      </div>
    </div>

    <!-- Блок с кнопкой информации и переключателем пола в одну строку -->
    <div class="signal-controls-row">
      <!-- Кнопка "Как работает" -->
      <button 
        type="button" 
        class="signal-info-button"
        :class="{ 
          'signal-info-female': selectedGender === 'female',
          'signal-info-male': selectedGender === 'male'
        }"
        aria-haspopup="dialog" 
        aria-controls="signal-dialog" 
        :aria-expanded="showInfoModal ? 'true' : 'false'"
        @click="showInfoModal = true"
      >
        Как работает
      </button>

      <!-- Переключатель пола -->
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

    <!-- Информационное модальное окно -->
    <div v-if="showInfoModal" class="modal-overlay" @click.self="showInfoModal = false">
      <div class="modal" role="dialog" aria-modal="true" id="signal-dialog" aria-label="Информация о Сигнале">
        <div class="modal-header">
          <div class="modal-title">Ваши отзывы меняют всё.</div>
        </div>
        <div class="modal-body">
          Каждый отзыв делает любимую кофейню еще лучше, а Сигнал помогает решить Вашу проблему за 24 часа. Почувствуйте силу настоящих перемен.<br><br>
          <a href="https://cffx.ru/signals.html" target="_blank" class="modal-link no-vitepress-style">Как Работает Сигнал</a>
        </div>
        <div class="modal-footer">
          <button class="modal-ok" type="button" @click="showInfoModal = false">Понятно</button>
        </div>
      </div>
    </div>

    <!-- Контейнер с формой -->
    <div class="signal-demo__form-container">
      <!-- Секция "Поделитесь" -->
      <div v-if="selectedSection === 'share'" class="signal-form-section">
        <div class="signal-question-block" style="--accent-color: #6B7280;">
          <div class="signal-rotating-phrase-container signal-rotating-fixed-height">
            <transition name="fade" mode="out-in">
              <p :key="currentQuestionShare" class="signal-question-label">{{ currentQuestionShare }}</p>
            </transition>
          </div>
          <textarea 
            v-model="form.shareExperience" 
            @focus="startRotation('share')" 
            :rows="isMobile ? 5 : 3"
            placeholder="Поделитесь своим впечатлением...">
          </textarea>
          
          <p class="signal-example-hint">Пример: «Кофе был <b>холодный</b>, а бариста <b>не обратил внимания</b>»</p>
        </div>
      </div>

      <!-- Секция "Эмоции и чувства" -->
      <div v-if="selectedSection === 'emotions'" class="signal-form-section">
        <div class="signal-question-block" style="--accent-color: #A972FF;">
          <div class="signal-rotating-phrase-container signal-rotating-fixed-height">
            <transition name="fade" mode="out-in">
              <p :key="currentQuestion1" class="signal-question-label" ref="questionRef1">{{ currentQuestion1 }}</p>
            </transition>
          </div>
          <textarea 
            v-model="form.emotionalRelease" 
            @focus="startRotation(1)" 
            :rows="isMobile ? 5 : 3"
            :placeholder="selectedGender === 'female' ? 'Разочарована ожиданиями...' : 'Разочарован ожиданиями...'">
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
        </div>
      </div>

      <!-- Секция "Детали проблемы" -->
      <div v-if="selectedSection === 'facts'" class="signal-form-section">
        <div class="signal-question-block" style="--accent-color: #3DDC84;">
          <div class="signal-rotating-phrase-container signal-rotating-fixed-height">
            <transition name="fade" mode="out-in">
              <p :key="currentQuestion2" class="signal-question-label" ref="questionRef2">{{ currentQuestion2 }}</p>
            </transition>
          </div>
          <textarea 
            v-model="form.factualAnalysis" 
            @focus="startRotation(2)" 
            :rows="isMobile ? 5 : 3"
            placeholder="Опишите факты: что, когда и где произошло...">
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
        </div>
      </div>

      <!-- Секция "Предложение решения" -->
      <div v-if="selectedSection === 'solutions'" class="signal-form-section">
        <div class="signal-question-block" style="--accent-color: #FFB800;">
          <div class="signal-rotating-phrase-container signal-rotating-fixed-height">
            <transition name="fade" mode="out-in">
              <p :key="currentQuestion3" class="signal-question-label" ref="questionRef3">{{ currentQuestion3 }}</p>
            </transition>
          </div>
          <textarea 
            v-model="form.constructiveSuggestions" 
            @focus="startRotation(3)" 
            :rows="isMobile ? 5 : 3"
            placeholder="Предложите, как это можно исправить...">
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
        </div>
      </div>

      <!-- Секция "Итого" -->
      <div v-if="selectedSection === 'summary'" class="signal-form-section">
        <div class="signal-question-block" style="--accent-color: #FF6B6B;">
          <p class="signal-direction-label">Умный отзыв</p>
          
          <div class="signal-rotating-phrase-container">
            <p class="signal-question-label">От эмоций до конструктивных предложений</p>
          </div>
          
          <textarea 
            v-model="form.summaryText" 
            :rows="isMobile ? 10 : 8"
            :placeholder="getPlaceholderText()"
          ></textarea>
                    
          <p class="signal-example-hint signal-example-hint-white">Конструктивный отзыв = сумма Ваших эмоций, фактов и решений.</p>
        </div>

        <!-- КНОПКА ОБНОВИТЬ - только в секции Итого -->
        <div class="signal-humanize-button-container">
          <button 
            class="signal-liquid-humanize-btn"
            @click="summarizeAllContent()"
            :disabled="humanizeStatus === 'processing'"
          >
            <span class="signal-liquid-humanize-text">
              {{ 
                humanizeStatus === 'completed' ? 'Готово' : 
                humanizeStatus === 'processing' ? 'Обновление...' : 
                'Обновить'
              }}
            </span>
          </button>
        </div>
      </div>
      
      <!-- Секция "Выбрать локацию" - НОВАЯ -->
      <div v-if="selectedSection === 'location'" class="signal-form-section">
        <div class="signal-question-block" style="--accent-color: #00D9FF;">
          <p class="signal-direction-label">Выбрать локацию</p>
          <div class="signal-rotating-phrase-container">
            <p class="signal-question-label">Выберите сеть и адрес кофейни</p>
          </div>
          <select 
            v-model="form.selectedNetwork" 
            @change="form.selectedBranch = ''"
            class="signal-select"
          >
            <option disabled value="">Выберите сеть</option>
            <option v-for="(cafe, name) in cafes" :key="name" :value="name">
              {{ name }}
            </option>
          </select>
          <select 
            v-model="form.selectedBranch" 
            class="signal-select"
            :disabled="!form.selectedNetwork"
          >
            <option disabled value="">Выберите адрес</option>
            <option 
              v-for="(branch, index) in selectedNetworkBranches" 
              :key="index" 
              :value="branch.address"
            >
              {{ branch.address }}
            </option>
          </select>
        </div>
      </div>

      <!-- Секция "Останемся на связи?" - НОВАЯ -->
      <div v-if="selectedSection === 'contact'" class="signal-form-section">
        <div v-if="!formSubmitted" class="signal-question-block" style="--accent-color: #6B7280;">
            <p class="signal-contact-title">ОСТАНЕМСЯ НА СВЯЗИ?</p>
            <div class="signal-columns">
                <div class="signal-column">
                    <label>Ваше имя</label>
                    <input v-model="form.userName" class="signal-input" placeholder="Как к вам обращаться?" />
                    <p class="signal-input-hint">Для персонального общения с ИИ-ассистентом Анной.</p>
                </div>
                <div class="signal-column">
                    <label>Ваш контакт в Telegram</label>
                    <input v-model="form.telegramContact" class="signal-input" placeholder="+7 (___) ___-__-__" />
                    <p class="signal-input-hint">Чтобы получать обновления и видеть результат.</p>
                </div>
            </div>
            <label class="signal-agreement">
                <input type="checkbox" v-model="form.agreedToTerms" />
                С Условиями использования согласен/на
            </label>
        </div>

        <!-- Сообщение после отправки -->
        <div v-if="formSubmitted" class="signal-success-message">
          <p class="signal-success-title">✓ Ваш Сигнал отправлен!</p>
          <p class="signal-success-text">Анна уже обрабатывает ваш запрос и свяжется с вами в Telegram в течение 24 часов для решения проблемы.</p>
        </div>

        <div v-if="!formSubmitted">
            <button 
              class="signal-submit-button" 
              :disabled="submitStatus === 'processing'" 
              @click="submitForm"
            >
              {{ submitStatus === 'processing' ? 'Отправка...' : 'Отправить Сигнал' }}
            </button>
        </div>
      </div>

      <!-- КНОПКА ДАЛЬШЕ - для всех секций кроме последней -->
      <div v-if="selectedSection !== 'contact'" class="signal-next-button-container">
        <button 
          class="signal-liquid-next-btn"
          :class="[
            selectedSection === 'share' ? 'signal-share-next' : '',
            selectedSection === 'emotions' ? 'signal-emotion-next' : '',
            selectedSection === 'facts' ? 'signal-fact-next' : '',
            selectedSection === 'solutions' ? 'signal-solution-next' : '',
            selectedSection === 'summary' ? 'signal-summary-next' : '',
            selectedSection === 'location' ? 'signal-location-next' : ''
          ]"
          @click="goToNextSection()"
          :disabled="nextStatus === 'processing'"
        >
          <span class="signal-liquid-next-text">Дальше</span>
          <svg class="signal-next-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M9 18l6-6-6-6" stroke="currentColor" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onUnmounted, computed, onMounted } from 'vue';

const form = reactive({ 
  shareExperience: '',
  emotionalRelease: '',
  factualAnalysis: '',
  constructiveSuggestions: '',
  summaryText: '',
  selectedNetwork: '',
  selectedBranch: '',
  userName: '',
  telegramContact: '',
  agreedToTerms: false
});

const isMobile = ref(false);
const questionRef1 = ref(null);
const questionRef2 = ref(null);
const questionRef3 = ref(null);
const selectedGender = ref('female');
const humanizeStatus = ref('idle');
const nextStatus = ref('idle');
const showInfoModal = ref(false);
const submitStatus = ref('idle');
const formSubmitted = ref(false);

const cafes = {
  'Корж': {
    name: 'Корж',
    yandex2gis: 51,
    yandex2gisPercent: 94,
    smartReviews: 0,
    smartReviewsPercent: 0,
    signals: '2',
    signalsPercent: 100,
    isConnected: true,
    branches: [
      { address: 'Куйбышева, 103', gisUrl: 'https://2gis.ru/samara/firm/70000001100403006/tab/reviews', yandexUrl: 'https://yandex.ru/maps/org/korzh/217541675197/reviews' },
      { address: 'Революционная, 101В', gisUrl: 'https://2gis.ru/samara/firm/70000001079219341/tab/reviews', yandexUrl: 'https://yandex.ru/maps/org/korzh/53721116858//reviews' },
      { address: '9 просека 5-я малая линия, 3б', gisUrl: 'https://2gis.ru/samara/firm/70000001074923618/tab/reviews', yandexUrl: 'https://yandex.ru/maps/org/korzh/152008652145/reviews' },
      { address: 'Льва Толстого, 30Б', gisUrl: 'https://2gis.ru/samara/firm/70000001052357057/tab/reviews', yandexUrl: 'https://yandex.ru/maps/org/korzh/39953057475/reviews' },
      { address: 'Самарская, 270', gisUrl: 'https://2gis.ru/samara/firm/70000001043471927/tab/reviews', yandexUrl: 'https://yandex.ru/maps/org/korzh/58375020263/reviews' },
      { address: 'Дачная, 2к2', gisUrl: 'https://2gis.ru/samara/firm/70000001045453045/tab/reviews', yandexUrl: 'https://yandex.ru/maps/org/korzh/144063441903/reviews' },
      { address: 'Ульяновская, 19', gisUrl: 'https://2gis.ru/samara/firm/70000001033411071/tab/reviews', yandexUrl: 'https://yandex.ru/maps/org/korzh/102178077269/reviews' },
      { address: 'Ново-Садовая, 106б', gisUrl: 'https://2gis.ru/samara/firm/70000001027391770/tab/reviews', yandexUrl: 'https://yandex.ru/maps/org/korzh/95875749858/reviews' }
    ]
  },
  'MOSAIC': {
    name: 'MOSAIC',
    yandex2gis: 194,
    yandex2gisPercent: 42,
    smartReviews: 0,
    smartReviewsPercent: 0,
    signals: '0',
    signalsPercent: 0,
    isConnected: false,
    branches: [
      { address: 'Бывшая гостиница "Националь" ', gisUrl: 'https://2gis.ru/samara/firm/70000001077330664/tab/reviews', yandexUrl: 'https://yandex.ru/maps/org/mosaic_coffee_tea/151180373582/reviews/' },
      { address: 'Волжский просп., 50', gisUrl: 'https://2gis.ru/samara/firm/70000001074565560/tab/reviews', yandexUrl: 'https://yandex.ru/maps/org/mosaic_coffee_tea/241776381665/reviews/' },
      { address: 'Речной вокзал', gisUrl: 'https://2gis.ru/samara/firm/70000001074565559/tab/reviews', yandexUrl: 'https://yandex.ru/maps/org/mosaic_coffee_tea/26968768492/reviews/' },
      { address: 'Максима Горького, 82', gisUrl: 'https://2gis.ru/samara/firm/70000001065476074/tab/reviews', yandexUrl: 'https://yandex.ru/maps/org/mosaic_coffee_tea/130707944684/reviews/' },
      { address: 'Волжский просп., 40', gisUrl: 'https://2gis.ru/samara/firm/70000001052939655/tab/reviews', yandexUrl: 'https://yandex.ru/maps/org/mosaic_coffee_tea/26968768492/reviews/' },
      { address: 'ЖК Ботанический', gisUrl: 'https://2gis.ru/samara/firm/70000001035366800/tab/reviews', yandexUrl: 'https://yandex.ru/maps/org/mosaic_coffee_tea/186171163289/reviews/' },
      { address: 'ТЦ Аквариум ', gisUrl: 'https://2gis.ru/samara/firm/70000001034344804/tab/reviews', yandexUrl: 'https://yandex.ru/maps/org/mosaic_coffee_tea/40452073764/reviews/' },
      { address: 'ТЦ Аврора', gisUrl: 'https://2gis.ru/samara/firm/70000001046644341/tab/reviews', yandexUrl: 'https://yandex.ru/maps/org/mosaic_coffee_tea/121248491329/reviews/' },
      { address: 'ТЦ Самолет', gisUrl: 'https://2gis.ru/samara/firm/70000001027292047/tab/reviews', yandexUrl: 'https://yandex.ru/maps/org/mosaic_coffee_tea/241817444822/reviews/' },
      { address: 'Волгина, 127А', gisUrl: 'https://2gis.ru/samara/firm/70000001026465823/tab/reviews', yandexUrl: 'https://yandex.ru/maps/org/mosaic_coffee_tea/189131333340/reviews/' },
      { address: 'БЦ ЗИМ', gisUrl: 'https://2gis.ru/samara/firm/70000001027292024/tab/reviews', yandexUrl: 'https://yandex.ru/maps/org/mosaic_coffee_tea/131060566066/reviews/' },
      { address: '5-я просека', gisUrl: 'https://2gis.ru/samara/firm/70000001037266527/tab/reviews', yandexUrl: 'https://yandex.ru/maps/org/mosaic_coffee_tea/59004397239/reviews/' },
      { address: 'Красноармейский спуск', gisUrl: 'https://2gis.ru/samara/firm/70000001074565722/tab/reviews', yandexUrl: 'https://yandex.ru/maps/org/mosaic_coffee_tea/87795478653/reviews/' },
      { address: 'Напротив ЦСКА', gisUrl: 'https://2gis.ru/samara/firm/70000001088760179/tab/reviews', yandexUrl: 'https://yandex.ru/maps/org/mosaic_coffee_tea/62781566656/reviews/' }
    ]
  },
  'Skuratov': {
    name: 'Skuratov',
    yandex2gis: 44,
    yandex2gisPercent: 89,
    smartReviews: 0,
    smartReviewsPercent: 0,
    signals: '0',
    signalsPercent: 0,
    isConnected: false,
    branches: [
      { address: 'Самарская, 190', gisUrl: 'https://2gis.ru/samara/firm/70000001062410566/tab/reviews', yandexUrl: 'https://yandex.ru/maps/org/skuratov/150151107830/reviews/' },
      { address: 'Молодогвардейская, 80', gisUrl: 'https://2gis.ru/samara/firm/70000001063379108/tab/reviews', yandexUrl: 'https://yandex.ru/maps/org/skuratov_coffee/112256596811/reviews/' },
      { address: 'Максима Горького, 129', gisUrl: 'https://2gis.ru/samara/firm/70000001094239079/tab/reviews', yandexUrl: 'https://yandex.ru/maps/org/skuratov_coffee/222229699719/reviews/' },
      { address: 'Красноармейская, 133', gisUrl: 'https://2gis.ru/samara/firm/70000001052366972/tab/reviews', yandexUrl: 'https://yandex.ru/maps/org/skuratov_coffee/9331047841/reviews/' },
      { address: 'Первомайская, 29', gisUrl: 'https://2gis.ru/samara/firm/70000001043589620/tab/reviews', yandexUrl: 'https://yandex.ru/maps/org/skuratov_coffee/64247746809/reviews/' },
      { address: 'Куйбышева, 68/70', gisUrl: 'https://2gis.ru/samara/firm/70000001036538224/tab/reviews', yandexUrl: 'https://yandex.ru/maps/org/skuratov_coffee/203299963607/reviews/' }
    ]
  },
  'Surf': {
    name: 'Surf',
    yandex2gis: 12,
    yandex2gisPercent: 100,
    smartReviews: 0,
    smartReviewsPercent: 0,
    signals: '0',
    signalsPercent: 0,
    isConnected: false,
    branches: [
      { address: 'Некрасовская, 57', gisUrl: 'https://2gis.ru/samara/firm/70000001036632385/tab/reviews', yandexUrl: 'https://yandex.ru/maps/org/surf_coffee/130764135504/reviews/' },
      { address: 'Полевая, 54', gisUrl: 'https://2gis.ru/samara/firm/70000001047142182/tab/reviews', yandexUrl: 'https://yandex.ru/maps/org/surf_coffee_x_pool/179188509748/reviews/' },
      { address: 'Куйбышева, 100', gisUrl: 'https://2gis.ru/samara/firm/70000001082424572/tab/reviews', yandexUrl: 'https://yandex.ru/maps/org/surf_coffee/13215597722/reviews/' }
    ]
  },
  'Белотурка': {
    name: 'Белотурка',
    yandex2gis: 135,
    yandex2gisPercent: 1,
    smartReviews: 0,
    smartReviewsPercent: 0,
    signals: '0',
    signalsPercent: 0,
    isConnected: false,
    branches: [
      { address: 'Куйбышева, 99', gisUrl: 'https://2gis.ru/samara/firm/70000001075213346/tab/reviews', yandexUrl: 'https://yandex.ru/maps/org/beloturka/21345450545/reviews/' },
      { address: 'Молодогвардейская, 153', gisUrl: 'https://2gis.ru/samara/firm/70000001094600683/tab/reviews', yandexUrl: 'https://yandex.ru/maps/org/beloturка/71041285330/reviews/' },
      { address: 'Ново-Садовая, 106', gisUrl: 'https://2gis.ru/samara/firm/70000001095659001/tab/reviews', yandexUrl: 'https://yandex.ru/maps/org/beloturка/56246021902/reviews/' },
      { address: 'Московское шоссе, 41 (РДЦ)', gisUrl: 'https://2gis.ru/samara/firm/70000001090546275/tab/reviews', yandexUrl: 'https://yandex.ru/maps/org/beloturка/34710016395/reviews/' },
      { address: 'Московское шоссе, 81Б (Парк Хаус)', gisUrl: 'https://2gis.ru/samara/firm/70000001100074136/tab/reviews', yandexUrl: 'https://yandex.ru/maps/org/beloturка/90354199231/reviews/' }
    ]
  },
  'Кэрри': {
    name: 'Кэрри',
    yandex2gis: 101,
    yandex2gisPercent: 97,
    smartReviews: 0,
    smartReviewsPercent: 0,
    signals: '0',
    signalsPercent: 0,
    isConnected: false,
    branches: [
      { address: 'Ново-Садовая ул., 160М', gisUrl: 'https://2gis.ru/samara/firm/70000001070543566/tab/reviews', yandexUrl: 'https://yandex.ru/maps/org/kerri/202386458956/reviews/' },
      { address: 'Московское шоссе, 252', gisUrl: 'https://2gis.ru/samara/firm/70000001028380476/tab/reviews', yandexUrl: 'https://yandex.ru/maps/org/kerri/158033026774/reviews/' },
      { address: 'Дачная ул., 2, корп. 1', gisUrl: 'https://2gis.ru/samara/firm/70000001020794652/tab/reviews', yandexUrl: 'https://yandex.ru/maps/org/kerri/75305070589/reviews/' },
      { address: 'Дыбенко, 30 (Космопорт)', gisUrl: 'https://2gis.ru/samara/firm/70000001027327015/tab/reviews', yandexUrl: 'https://yandex.ru/maps/org/kerri/25856651419/reviews/' }
    ]
  }
};

const selectedNetworkBranches = computed(() => {
  if (!form.selectedNetwork) return [];
  return cafes[form.selectedNetwork]?.branches || [];
});

const onKeydown = (e) => {
  if (e.key === 'Escape') {
    showInfoModal.value = false;
  }
};

onMounted(() => {
  const checkMobile = () => {
    isMobile.value = window.innerWidth <= 768;
  };
  checkMobile();
  window.addEventListener('resize', checkMobile);
  window.addEventListener('keydown', onKeydown);
  updateSuggestionsForGender();
});

onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown);
});

const sections = [
  { id: 'share', title: 'Поделитесь' },
  { id: 'emotions', title: 'Эмоции' },
  { id: 'facts', title: 'Факты' },
  { id: 'solutions', title: 'Решение' },
  { id: 'summary', title: 'Итого' },
  { id: 'location', title: 'Локация' },
  { id: 'contact', title: 'Связь' }
];

const selectedSection = ref('share');
const isActive = (id) => id === selectedSection.value;


const getPlaceholderText = () => {
  return "Здесь появится Ваш Умный Отзыв ...";
};

// Переход к следующей секции БЕЗ ИСКУССТВЕННЫХ ЗАДЕРЖЕК
const goToNextSection = async () => {
  const currentIndex = sections.findIndex(s => s.id === selectedSection.value);
  
  if (selectedSection.value === 'solutions') {
    // Быстро запускаем суммирование без задержек
    nextStatus.value = 'processing';
    summarizeAllContent();
    nextStatus.value = 'idle';
  }
  
  if (currentIndex < sections.length - 1) {
    selectedSection.value = sections[currentIndex + 1].id;
  }
};

/* ===================== Улучшенная гендерная коррекция ===================== */
const CYR = 'А-Яа-яЁё';
const beforeBoundary = `(^|[^${CYR}])`;
const afterBoundary = `(?=[^${CYR}]|$)`;
const escape = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const capitalizeLike = (src, target) => {
  if (!src) return target;
  const isUpper = src[0] === src[0].toUpperCase();
  return isUpper ? target[0].toUpperCase() + target.slice(1) : target;
};

const genderMap = {
  female: [
    ['разочарован', 'разочарована'],
    ['недоволен', 'недовольна'],
    ['расстроен', 'расстроена'],
    ['огорчён', 'огорчена'], ['огорчен', 'огорчена'],
    ['возмущён', 'возмущена'], ['возмущен', 'возмущена'],
    ['удивлён', 'удивлена'], ['удивлен', 'удивлена'],
    ['доволен', 'довольна'],
    ['восхищён', 'восхищена'], ['восхищен', 'восхищена'],
    ['благодарен', 'благодарна'],
    ['был', 'была'],
    ['заказал', 'заказала'],
    ['ожидал', 'ожидала'],
    ['засекал', 'засекала']
  ],
  male: [
    ['разочарована', 'разочарован'],
    ['недовольна', 'недоволен'],
    ['расстроена', 'расстроен'],
    ['огорчена', 'огорчён'], ['огорчена', 'огорчен'],
    ['возмущена', 'возмущён'], ['возмущена', 'возмущен'],
    ['удивлена', 'удивлён'], ['удивлена', 'удивлен'],
    ['довольна', 'доволен'],
    ['восхищена', 'восхищён'], ['восхищена', 'восхищен'],
    ['благодарна', 'благодарен'],
    ['была', 'был'],
    ['заказала', 'заказал'],
    ['ожидала', 'ожидал'],
    ['засекала', 'засекал']
  ]
};

function applyGenderCorrection(text, gender) {
  if (!text) return text;
  const rules = gender === 'male' ? genderMap.male : genderMap.female;
  const sorted = [...rules].sort((a, b) => b[0].length - a[0].length);

  let out = text;
  for (const [fromRaw, toRaw] of sorted) {
    const pat = new RegExp(`${beforeBoundary}(${escape(fromRaw)})${afterBoundary}`, 'gi');
    out = out.replace(pat, (m, p1, p2) => `${p1}${capitalizeLike(p2, toRaw)}`);
  }
  return out;
}

// Функция для удаления дублей
function removeDuplicates(text) {
  const sentences = text.split(/[.!?]+/).map(s => s.trim()).filter(s => s.length > 3);
  const uniqueSentences = [];
  const seen = new Set();
  
  sentences.forEach(sentence => {
    const normalized = sentence.toLowerCase().replace(/\s+/g, ' ');
    if (!seen.has(normalized) && normalized.length > 5) {
      seen.add(normalized);
      uniqueSentences.push(sentence);
    }
  });
  
  return uniqueSentences.join('. ') + (uniqueSentences.length > 0 ? '.' : '');
}

// ИСПРАВЛЕННАЯ функция структурирования с разделителем "---"
function structureAndCleanText(shareText, emotionalText, factualText, solutionsText, gender) {
  let result = '';
  
  // 1. Сначала текст из "Поделитесь" С ГЕНДЕРНОЙ КОРРЕКЦИЕЙ
  if (shareText.trim()) {
    let userText = applyGenderCorrection(shareText.trim(), gender);
    // Добавляем точку в конце если её нет
    if (!userText.match(/[.!?]$/)) {
      userText += '.';
    }
    result += `МОЙ ОТЗЫВ СЕЙЧАС: ${userText.charAt(0).toUpperCase() + userText.slice(1)}`;
  } else {
    result += `МОЙ ОТЗЫВ СЕЙЧАС: (можно дополнить)`;
  }
  
  // Заголовок для улучшений с разделителем "---"
  if (emotionalText || factualText || solutionsText) {
    if (result) result += '\n\n';
    result += '---\nМожно улучшить:\n---';
  }
  
  // 2. Эмоциональная часть
  if (emotionalText) {
    const emotions = applyGenderCorrection(emotionalText.trim(), gender);
    const sentences = emotions.split(/[.!]/).map(s => s.trim()).filter(s => s);
    
    const positiveEmotions = [];
    const neutralEmotions = [];
    const negativeEmotions = [];
    
    sentences.forEach(sentence => {
      const lower = sentence.toLowerCase();
      if (lower.includes('доволь') || lower.includes('восхищ') || lower.includes('благодар')) {
        // Добавляем тире для положительных эмоций
        const parts = sentence.split(' ');
        if (parts.length > 3) {
          const formatted = parts.slice(0, 3).join(' ') + ' – ' + parts.slice(3).join(' ');
          positiveEmotions.push(formatted);
        } else {
          positiveEmotions.push(sentence);
        }
      } else if (lower.includes('удивл')) {
        neutralEmotions.push(sentence);
      } else {
        // Добавляем тире для негативных эмоций 
        const parts = sentence.split(' ');
        if (parts.length > 3) {
          const formatted = parts.slice(0, 3).join(' ') + ' – ' + parts.slice(3).join(' ');
          negativeEmotions.push(formatted);
        } else {
          negativeEmotions.push(sentence);
        }
      }
    });
    
    let emotionText = '';
    if (positiveEmotions.length > 0) emotionText += positiveEmotions.join('. ') + '. ';
    if (neutralEmotions.length > 0) emotionText += neutralEmotions.join('. ') + '. ';
    if (negativeEmotions.length > 0) emotionText += negativeEmotions.join('. ') + '.';
    
    emotionText = removeDuplicates(emotionText);
    if (result) result += '\n\n';
    result += `ВПЕЧАТЛЕНИЯ\n${emotionText}`;
  } else {
    if (result) result += '\n\n';
    result += `ВПЕЧАТЛЕНИЯ\n(можно дополнить)`;
  }
  
  // 3. Фактологическая часть с правильным форматированием "Категория: детали"
  if (factualText) {
    if (result) result += '\n\n';
    
    const facts = factualText.trim();
    const sentences = facts.split(/[.!]/).map(s => s.trim()).filter(s => s);
    const factGroups = {};
    
    sentences.forEach(sentence => {
      // Определяем категорию по первым 2-3 словам
      let category = '';
      
      if (sentence.toLowerCase().includes('ожидан') || sentence.toLowerCase().includes('ждал')) {
        category = 'Ожидание';
      } else if (sentence.toLowerCase().includes('заказ') || sentence.toLowerCase().includes('доложи')) {
        category = 'Ошибка в заказе';
      } else if (sentence.toLowerCase().includes('качество') || sentence.toLowerCase().includes('кофе') || sentence.toLowerCase().includes('еда')) {
        category = 'Качество блюд';
      } else if (sentence.toLowerCase().includes('чист') || sentence.toLowerCase().includes('посуда')) {
        category = 'Чистота';
      } else if (sentence.toLowerCase().includes('персонал') || sentence.toLowerCase().includes('сотрудн')) {
        category = 'Персонал';
      } else {
        const words = sentence.split(' ');
        category = words.slice(0, 2).join(' ');
      }
      
      if (!factGroups[category]) factGroups[category] = [];
      
      // Извлекаем детали (убираем категорию из начала)
      let details = sentence;
      if (sentence.toLowerCase().startsWith(category.toLowerCase())) {
        details = sentence.substring(category.length).replace(/^[\s:,-]+/, '');
      }
      
      if (details && details.length > 3) {
        factGroups[category].push(details);
      }
    });
    
    let factText = '';
    Object.keys(factGroups).forEach(category => {
      if (factGroups[category].length > 0) {
        const uniqueDetails = [...new Set(factGroups[category])];
        factText += `${category}: ${uniqueDetails.join(', ')}. `;
      }
    });
    
    factText = removeDuplicates(factText);
    result += `ПРОБЛЕМЫ\n${factText}`;
  } else {
    if (result) result += '\n\n';
    result += `ПРОБЛЕМЫ\n(можно дополнить)`;
  }
  
  // 4. Парсинг решений с форматированием "Направление: конкретные меры"
  if (solutionsText) {
    if (result) result += '\n\n';
    
    const solutions = solutionsText.trim();
    const sentences = solutions.split(/[.!]/).map(s => s.trim()).filter(s => s);
    const solutionGroups = {};
    
    sentences.forEach(sentence => {
      let category = '';
      
      if (sentence.toLowerCase().includes('таймер') || sentence.toLowerCase().includes('контроль времени')) {
        category = 'Таймер ожидания';
      } else if (sentence.toLowerCase().includes('обучение')) {
        category = 'Обучение персонала';
      } else if (sentence.toLowerCase().includes('контроль качества')) {
        category = 'Контроль качества';
      } else if (sentence.toLowerCase().includes('проверк')) {
        category = 'Система проверки';
      } else if (sentence.toLowerCase().includes('стандарт')) {
        category = 'Стандарты сервиса';
      } else {
        const words = sentence.split(' ');
        category = words.slice(0, 2).join(' ');
      }
      
      if (!solutionGroups[category]) solutionGroups[category] = [];
      
      let details = sentence;
      if (sentence.toLowerCase().startsWith(category.toLowerCase())) {
        details = sentence.substring(category.length).replace(/^[\s:,-]+/, '');
      }
      
      if (details && details.length > 3) {
        solutionGroups[category].push(details);
      }
    });
    
    let solutionText = '';
    Object.keys(solutionGroups).forEach(category => {
      if (solutionGroups[category].length > 0) {
        const uniqueDetails = [...new Set(solutionGroups[category])];
        solutionText += `${category}: ${uniqueDetails.join(', ')}. `;
      }
    });
    
    solutionText = removeDuplicates(solutionText);
    result += `ПРЕДЛОЖЕНИЯ\n${solutionText}`;
  } else {
    if (result) result += '\n\n';
    result += `ПРЕДЛОЖЕНИЯ\n(можно дополнить)`;
  }
  
  return result;
}

// ИСПРАВЛЕННАЯ функция суммирования БЕЗ задержек и с гендерной коррекцией
function summarizeAllContent() {
  humanizeStatus.value = 'processing';
  
  try {
    // Генерируем структурированный текст с учетом ТЕКУЩЕГО пола
    const structuredText = structureAndCleanText(
      form.shareExperience.trim(),
      form.emotionalRelease.trim(),
      form.factualAnalysis.trim(),
      form.constructiveSuggestions.trim(),
      selectedGender.value // используем текущий выбранный пол
    );
    
    // Применяем гендерную коррекцию ко ВСЕМУ тексту в итоге
    form.summaryText = applyGenderCorrection(structuredText, selectedGender.value);
    
    humanizeStatus.value = 'completed';
    
    setTimeout(() => {
      humanizeStatus.value = 'idle';
    }, 2000);
    
  } catch (error) {
    console.error('Ошибка суммирования:', error);
    humanizeStatus.value = 'idle';
  }
}

// ИСПРАВЛЕН: Обработчик клика по гендерным кнопкам - ВСЕГДА полный пересчет
function onGenderClick(gender) {
  selectedGender.value = gender;
  updateSuggestionsForGender();
  
  // ВСЕГДА полный пересчет если есть данные для пересчета
  if (selectedSection.value === 'summary') {
    summarizeAllContent(); // пересобираем весь итог с учётом пола, включая "МОЙ ОТЗЫВ СЕЙЧАС"
  }
}

function submitForm() {
  if (!form.userName || !form.telegramContact || !form.agreedToTerms) {
    // Можно добавить уведомление пользователю
    return;
  }
  submitStatus.value = 'processing';
  // Здесь будет логика отправки данных на сервер
  console.log('Отправка формы:', form);
  setTimeout(() => {
    submitStatus.value = 'idle';
    formSubmitted.value = true;
  }, 1500);
}


// ПОЛНАЯ система подсказок - все 3 уровня + положительные эмоции
const baseSuggestions = {
  emotions: {
    // Уровень 1: все эмоции включая 3 положительные
    initial: ['расстроена', 'разочарована', 'недовольна', 'возмущена', 'удивлена', 'довольна', 'восхищена', 'благодарна'],
    
    // НЕГАТИВНЫЕ эмоции - уровень 2
    'расстроена': ['долго ждала', 'грязная посуда', 'холодный кофе', 'грубый персонал', 'забыли заказ'],
    'разочарована': ['качеством', 'сервисом', 'ожиданиями', 'атмосферой', 'чистотой'],
    'недовольна': ['обслуживанием', 'очередью', 'ошибкой в заказе', 'температурой блюд', 'упаковкой'],
    'возмущена': ['антисанитарией', 'хамством', 'обманом', 'некачественной едой', 'инородными предметами'],
    'удивлена': ['таким сервисом', 'проблемами', 'невниманием', 'беспорядком', 'отношением'],
    
    // ПОЛОЖИТЕЛЬНЫЕ эмоции - уровень 2
    'довольна': ['качеством кофе', 'скоростью обслуживания', 'вежливостью персонала', 'атмосферой заведения', 'чистотой помещения'],
    'восхищена': ['мастерством бариста', 'качеством десертов', 'дизайном интерьера', 'музыкальным сопровождением', 'ароматом кофе'],
    'благодарна': ['за внимание к деталям', 'за решение проблемы', 'за рекомендацию напитка', 'за уютную обстановку', 'за профессионализм'],
    
    // УРОВЕНЬ 3 для негативных эмоций (полный список)
    'долго ждала': ['20 минут', '30 минут', 'более часа', 'без объяснений', 'видя пустую кофейню'],
    'грязная посуда': ['следы помады', 'остатки еды', 'жирные пятна', 'засохший кофе', 'странный запах'],
    'холодный кофе': ['едва теплый', 'совсем остыл', 'подали холодным', 'остыл пока ждала', 'температура комнатная'],
    'грубый персонал': ['не поздоровались', 'хамили', 'игнорировали', 'были раздражены', 'повысили голос'],
    'забыли заказ': ['через 40 минут', 'не записали', 'потеряли чек', 'не передали на кухню', 'сидела и ждала'],
    'качеством': ['хуже чем обычно', 'не соответствует цене', 'испортилось за месяц', 'как в фастфуде', 'совсем не то'],
    'сервисом': ['медленный', 'невнимательный', 'равнодушный', 'непрофессиональный', 'хаотичный'],
    'ожиданиями': ['ждала большего', 'по отзывам лучше', 'раньше было вкуснее', 'не оправдал репутацию', 'переоценила место'],
    'атмосферой': ['шумно и грязно', 'неуютно', 'холодно', 'плохая музыка', 'неприятные запахи'],
    'чистотой': ['грязные столы', 'липкий пол', 'немытая посуда', 'пыль везде', 'антисанитария'],
    'обслуживанием': ['долгое ожидание', 'путаница в заказах', 'невежливость', 'игнорирование', 'ошибки кассира'],
    'очередью': ['не двигалась', 'час стояла', 'нет системы', 'хаос', 'всех пропускают'],
    'ошибкой в заказе': ['не тот напиток', 'забыли позицию', 'неправильный размер', 'другой сироп', 'перепутали'],
    'температурой блюд': ['холодные', 'остывшие', 'чуть теплые', 'не разогрели', 'ледяные'],
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
    'отношением': ['пренебрежение', 'высокомерие', 'равнодушие', 'неуважение', 'хамство'],
    
    // УРОВЕНЬ 3 для положительных эмоций
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
    
    // ПОЛНЫЙ УРОВЕНЬ 3
    '20 минут': ['засекала по часам', 'спросила у соседнего стола', 'заказала в 14:30, получила в 14:50', 'долгое ожидание для простого заказа', 'других обслужили быстрее'],
    '30 минут': ['полчаса точно', 'с 15:00 до 15:30', 'дважды подходила узнать', 'время на телефоне показало', 'успела прочитать новости'],
    'более часа': ['час и 10 минут', 'полтора часа ждала', 'с 12:00 до 13:15', 'весь обед потратила', 'опоздала на встречу'],
    'забыли заказ': ['не записали', 'потеряли чек', 'не передали на кухню', 'перепутали с другим', 'готовили не то'],
    'очередь не двигалась': ['стояла полчаса', 'один кассир на всех', 'касса сломалась', 'менялись местами', 'хаос'],
    'не тот напиток': ['заказала латте, принесли капучино', 'просила без сахара, был сладкий', 'хотела большой, дали маленький', 'другой сироп добавили', 'обычное молоко вместо овсяного'],
    'не доложили позицию': ['забыли десерт', 'нет половины заказа', 'пропали сэндвичи', 'только кофе принесли', 'блинчики не было'],
    'неправильный соус': ['положили не тот соус к тыквенным панкейкам', 'острый вместо сладкого', 'майонез вместо сметаны', 'кетчуп забыли', 'соус отдельно не дали'],
    'перепутали объём': ['несоответствие объема напитков', 'маленький вместо большого', 'дали меньше чем заказала', 'размер не тот', 'обманули с порцией'],
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
    'пластик в круассане': ['кусочек пластика в круассане', 'твердый кусок', 'чуть не сломала зуб', 'опасно', 'могла подавиться'],
    'грубость': ['не поздоровались', 'ответили резко', 'закатили глаза', 'проигнорировали вопрос', 'были явно недовольны'],
    'невнимательность': ['не слушали', 'переспрашивали', 'отвлекались', 'забыли просьбу', 'записали неправильно'],
    'некомпетентность': ['не знали меню', 'не умели готовить', 'путались в кнопках', 'долго соображали', 'спрашивали у коллег'],
    'трогали еду руками': ['трогали трубочку грязными руками', 'лапали булочки', 'без перчаток', 'грязными руками', 'неаккуратно'],
    'не извинились': ['даже не извинились', 'было все равно', 'сделали вид что нормально', 'проигнорировали', 'сказали что так и надо']
  },
  
  solutions: {
    initial: ['таймер ожидания', 'обучение персонала', 'контроль качества', 'система проверки', 'стандарты сервиса'],
    
    'таймер ожидания': ['визуальный контроль бариста', 'с номерами заказов', 'видимый гостям', 'контроль времени', 'сигналы на баре', 'обратная связь от гостей'],
    'обучение персонала': ['по сервису', 'по санитарии', 'по качеству', 'по коммуникации', 'регулярные тренинги'],
    'контроль качества': ['проверка блюд', 'температурный контроль', 'свежесть продуктов', 'упаковка', 'дегустация'],
    'система проверки': ['чек-лист качества', 'двойная проверка', 'контроль чистоты', 'стандарты подачи', 'фото блюд'],
    'стандарты сервиса': ['вежливость', 'скорость', 'точность', 'чистота', 'профессионализм'],
    
    // ПОЛНЫЙ УРОВЕНЬ 3
    'визуальный контроль бариста': ['песочные часы на стойке', 'отчёты по среднему времени заказа', 'замеры скорости обслуживания менеджером', 'сравнение с нормой', 'обсуждение на пятиминутке'],
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
};

const currentSuggestions = reactive({
  emotions: [...baseSuggestions.emotions.initial],
  facts: [...baseSuggestions.facts.initial],
  solutions: [...baseSuggestions.solutions.initial]
});

const selectedFirstLevelSuggestions = reactive({
  emotions: [],
  facts: [],
  solutions: []
});

const updateSuggestionsForGender = () => {
  if (selectedGender.value === 'male') {
    currentSuggestions.emotions = ['расстроен', 'разочарован', 'недоволен', 'возмущён', 'удивлён', 'доволен', 'восхищён', 'благодарен'].filter(
      item => !selectedFirstLevelSuggestions.emotions.includes(item.replace('ен', 'ена').replace('н', 'на'))
    );
  } else {
    currentSuggestions.emotions = baseSuggestions.emotions.initial.filter(
      item => !selectedFirstLevelSuggestions.emotions.includes(item)
    );
  }
};

// Фразы для ротатора вопросов
const phrasesForShare = [
  'Что вызвало улыбку или напряжение?',
  'Какой момент хотелось бы изменить?', 
  'Что дало ощущение уюта/суеты?',
  'Одно слово, которое осталось после визита?'
];

const phrasesForQuestion1 = [
  'Что почувствовали в эту минуту?',
  'Что вас расстроило сегодня?', 
  'Какое впечатление осталось?', 
  'Оправдались ли ожидания?'
];

const phrasesForQuestion2 = ['Что конкретно пошло не так?', 'Опишите факты происшедшего', 'Кто был вовлечен?'];
const phrasesForQuestion3 = ['Как это исправить?', 'Что предотвратит проблему?', 'Ваши предложения?'];

const currentQuestionShare = ref(phrasesForShare[0]);
const currentQuestion1 = ref(phrasesForQuestion1[0]);
const currentQuestion2 = ref(phrasesForQuestion2[0]);
const currentQuestion3 = ref(phrasesForQuestion3[0]);

let rotationInterval = null;

function isInitialSuggestions(suggestionType) {
  const initialSuggs = suggestionType === 'emotions' && selectedGender.value === 'male' 
    ? ['расстроен', 'разочарован', 'недоволен', 'возмущён', 'удивлён', 'доволен', 'восхищён', 'благодарен']
    : baseSuggestions[suggestionType].initial;
  return JSON.stringify(currentSuggestions[suggestionType]) === JSON.stringify(initialSuggs.filter(
    item => !selectedFirstLevelSuggestions[suggestionType].includes(item)
  ));
}

function resetSuggestions(suggestionType) {
  selectedFirstLevelSuggestions[suggestionType] = [];
  
  if (suggestionType === 'emotions' && selectedGender.value === 'male') {
    currentSuggestions.emotions = ['расстроен', 'разочарован', 'недоволен', 'возмущён', 'удивлён', 'доволен', 'восхищён', 'благодарен'];
  } else {
    currentSuggestions[suggestionType] = [...baseSuggestions[suggestionType].initial];
  }
}

function selectSuggestion(fieldName, suggestion, suggestionType) {
  const currentText = form[fieldName].trim();
  const isNewBranch = isInitialSuggestions(suggestionType);
  
  if (currentText) {
    if (isNewBranch) {
      form[fieldName] = currentText + '. ' + suggestion.charAt(0).toUpperCase() + suggestion.slice(1);
    } else {
      form[fieldName] = currentText + ' ' + suggestion;
    }
  } else {
    form[fieldName] = suggestion.charAt(0).toUpperCase() + suggestion.slice(1);
  }
  
  if (baseSuggestions[suggestionType].initial.includes(suggestion) || 
     (suggestionType === 'emotions' && ['расстроен', 'разочарован', 'недоволен', 'возмущён', 'удивлён', 'доволен', 'восхищён', 'благодарен'].includes(suggestion))) {
    if (!selectedFirstLevelSuggestions[suggestionType].includes(suggestion)) {
      selectedFirstLevelSuggestions[suggestionType].push(suggestion);
    }
  }
  
  updateSuggestions(suggestionType, suggestion);
}

function updateSuggestions(suggestionType, selectedWord) {
  const nextSuggestions = baseSuggestions[suggestionType][selectedWord];
  
  if (nextSuggestions && nextSuggestions.length > 0) {
    currentSuggestions[suggestionType] = [...nextSuggestions];
  } else {
    if (suggestionType === 'emotions' && selectedGender.value === 'male') {
      const maleEmotions = ['расстроен', 'разочарован', 'недоволен', 'возмущён', 'удивлён', 'доволен', 'восхищён', 'благодарен'];
      const remaining = maleEmotions.filter(item => !selectedFirstLevelSuggestions.emotions.includes(item));
      
      if (remaining.length === 0) {
        selectedFirstLevelSuggestions.emotions = [];
        currentSuggestions.emotions = [...maleEmotions];
      } else {
        currentSuggestions.emotions = remaining;
      }
    } else {
      const remaining = baseSuggestions[suggestionType].initial.filter(
        item => !selectedFirstLevelSuggestions[suggestionType].includes(item)
      );
      
      if (remaining.length === 0) {
        selectedFirstLevelSuggestions[suggestionType] = [];
        currentSuggestions[suggestionType] = [...baseSuggestions[suggestionType].initial];
      } else {
        currentSuggestions[suggestionType] = remaining;
      }
    }
  }
}

function startRotation(questionNum) {
  clearInterval(rotationInterval);
  rotationInterval = setInterval(() => {
    if (questionNum === 'share') {
      const index = phrasesForShare.indexOf(currentQuestionShare.value);
      const nextIndex = (index + 1) % phrasesForShare.length;
      currentQuestionShare.value = phrasesForShare[nextIndex];
    } else if (questionNum === 1) {
      const index = phrasesForQuestion1.indexOf(currentQuestion1.value);
      const nextIndex = (index + 1) % phrasesForQuestion1.length;
      currentQuestion1.value = phrasesForQuestion1[nextIndex];
    } else if (questionNum === 2) {
      const index = phrasesForQuestion2.indexOf(currentQuestion2.value);
      const nextIndex = (index + 1) % phrasesForQuestion2.length;
      currentQuestion2.value = phrasesForQuestion2[nextIndex];
    } else if (questionNum === 3) {
      const index = phrasesForQuestion3.indexOf(currentQuestion3.value);
      const nextIndex = (index + 1) % phrasesForQuestion3.length;
      currentQuestion3.value = phrasesForQuestion3[nextIndex];
    }
  }, 3000);
}
</script>

<style scoped>
:root {
  --signal-font-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
}

.signal-demo-wrapper {
  font-family: var(--signal-font-sans);
  width: 100%;
  max-width: none;
  margin: 0;
}

.signal-demo__header {
  display: flex;
  justify-content: center;
  margin-bottom: 24px;
}

/* Хлебные крошки как в квизах */
.signal-demo__breadcrumbs {
  display: flex;
  gap: 12px;
  align-items: center;
}

.signal-breadcrumb {
  appearance: none;
  border: none;
  background: transparent;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  transition: all 0.3s ease;
}

.signal-breadcrumb-circle {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #444;
  transition: all 0.3s ease;
}

/* Активная вкладка - скругленная черта */
.signal-breadcrumb.is-active .signal-breadcrumb-circle {
  width: 24px;
  height: 8px;
  border-radius: 4px;
}

/* Цвета для разных секций */
.signal-breadcrumb.share.is-active .signal-breadcrumb-circle {
  background: #6B7280;
}

.signal-breadcrumb.emotions.is-active .signal-breadcrumb-circle {
  background: #A972FF;
}

.signal-breadcrumb.facts.is-active .signal-breadcrumb-circle {
  background: #3DDC84;
}

.signal-breadcrumb.solutions.is-active .signal-breadcrumb-circle {
  background: #FFB800;
}

.signal-breadcrumb.summary.is-active .signal-breadcrumb-circle {
  background: #FF6B6B;
}

.signal-breadcrumb.location.is-active .signal-breadcrumb-circle {
  background: #00D9FF;
}

.signal-breadcrumb.contact.is-active .signal-breadcrumb-circle {
  background: #6B7280; /* Как у первой вкладки */
}


/* Блок с кнопкой информации и переключателем пола в одну строку */
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
  font-family: var(--signal-font-sans);
  height: 32px;
  display: flex;
  align-items: center;
}

.signal-info-button.signal-info-female {
  background: rgba(255, 105, 180, 0.1);
  border-color: rgba(255, 105, 180, 0.3);
  color: #ff69b4;
}

.signal-info-button.signal-info-female:hover {
  background: rgba(255, 105, 180, 0.2);
  border-color: rgba(255, 105, 180, 0.5);
  color: #ff1493;
}

.signal-info-button.signal-info-male {
  background: rgba(135, 206, 235, 0.1);
  border-color: rgba(135, 206, 235, 0.3);
  color: #87ceeb;
}

.signal-info-button.signal-info-male:hover {
  background: rgba(135, 206, 235, 0.2);
  border-color: rgba(135, 206, 235, 0.5);
  color: #4682b4;
}

/* Переключатель пола */
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
  border: 2px solid transparent;
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

/* Модальное окно */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal {
  background: #111;
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 12px;
  width: min(520px, 96vw);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
  padding: 32px;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 12px;
}

.modal-title {
  font-weight: 700;
  font-size: 16px;
}

.modal-body {
  margin-top: 16px;
  font-size: 14px;
  color: #fff;
  line-height: 1.5;
}

.modal-link {
  color: #a3e635;
  text-decoration: underline;
  text-decoration-color: #a3e635 !important;
  font-weight: 600;
  transition: all 0.3s ease;
  cursor: pointer;
}

.modal-link:hover {
  color: #c5f946;
  text-decoration: underline;
  text-decoration-color: #c5f946 !important;
}

.no-vitepress-style {
  text-decoration: underline !important;
  text-decoration-color: #a3e635 !important;
  border-bottom: none !important;
  background: none !important;
}

.no-vitepress-style:hover {
  text-decoration: underline !important;
  text-decoration-color: #c5f946 !important;
  border-bottom: none !important;
  background: none !important;
}

.modal-footer {
  margin-top: 24px;
  display: flex;
  justify-content: flex-end;
}

.modal-ok {
  background: #222;
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: #fff;
  border-radius: 8px;
  padding: 10px 16px;
  cursor: pointer;
  font-weight: 500;
}

.modal-ok:hover {
  background: #333;
}

.signal-demo__form-container {
  background-color: #1E1E20;
  border-radius: 24px;
  padding: 2rem;
  color: #f0f0f0;
  border: 1px solid #2c2c2f;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
}

.signal-form-section {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.signal-question-block {
  background-color: #2a2a2e;
  border-radius: 16px;
  padding: 1.25rem;
  border: 1px solid #3a3a3e;
  border-left: 4px solid var(--accent-color, #444);
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

/* Фиксированная высота для ротатора вопросов */
.signal-rotating-phrase-container {
  min-height: 1.3em;
  margin-bottom: 0.6rem;
  display: flex;
  align-items: flex-start;
  overflow: hidden;
}

.signal-rotating-fixed-height {
  min-height: 2.6em; /* Зафиксировали высоту для 2 строк на мобильных */
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

textarea, .signal-select {
  width: 100%;
  background-color: #242426;
  border: 1px solid #444;
  border-radius: 10px;
  padding: 0.75rem 1rem;
  font-size: 0.95rem;
  color: #f0f0f0;
  transition: all 0.3s ease;
  font-family: var(--signal-font-sans);
  resize: vertical;
}

textarea:focus, .signal-select:focus {
  outline: none;
  border-color: var(--accent-color);
  background-color: #2a2a2e;
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent-color) 20%, transparent);
}

.signal-select {
  margin-bottom: 0.75rem;
}

::placeholder { color: #666; }

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
}

.signal-fact-bubble {
  background: rgba(61, 220, 132, 0.1);
  border-color: rgba(61, 220, 132, 0.3);
  color: #3DDC84;
}

.signal-fact-bubble:hover {
  background: #3DDC84;
  color: #000;
}

.signal-solution-bubble {
  background: rgba(255, 184, 0, 0.1);
  border-color: rgba(255, 184, 0, 0.3);
  color: #FFB800;
}

.signal-solution-bubble:hover {
  background: #FFB800;
  color: #000;
}

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
  line-height: 1.15;
}

/* Белый цвет для нижней подсказки */
.signal-example-hint-white {
  color: #f0f0f0 !important;
  margin: 0.5rem 0 0 0rem !important; /* Выровнено влево как hint-text */
}

.signal-example-hint b {
  color: #aaa;
  font-weight: 600;
}


/* КНОПКА ОБНОВИТЬ - уменьшено расстояние */
.signal-humanize-button-container {
  margin-top: -0.5rem; 
}

.signal-liquid-humanize-btn {
  position: relative;
  width: 100%;
  height: 56px;
  border-radius: 18px;
  border: 2px solid #444;
  background: #2a2a2e;
  color: #888;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  font-family: var(--signal-font-sans);
  white-space: nowrap;
}

.signal-liquid-humanize-btn:not(:disabled):hover {
  border-color: #666;
  color: #bbb;
  background: #333;
}

.signal-liquid-humanize-btn:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.signal-liquid-humanize-text {
  position: relative;
  z-index: 3;
  font-size: 16px;
  font-weight: 600;
  transition: color 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}


/* КНОПКА ДАЛЬШЕ - сексуальная и заметная */
.signal-next-button-container {
  margin-top: 1rem;
}

.signal-liquid-next-btn {
  position: relative;
  width: 100%;
  height: 56px;
  border-radius: 20px;
  border: none;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px; /* Увеличено расстояние между текстом и стрелкой */
  font-family: var(--signal-font-sans);
  white-space: nowrap;
}

.signal-liquid-next-btn::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 20px;
  padding: 2px;
  background: linear-gradient(135deg, var(--accent-color), rgba(255, 255, 255, 0.2));
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  transition: filter 0.4s ease;
  z-index: 1;
}

.signal-liquid-next-btn::after {
  content: '';
  position: absolute;
  inset: 2px;
  border-radius: 18px;
  background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.12) 0%, transparent 70%),
              #2a2a2e;
  z-index: 2;
  transition: all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
}

.signal-next-icon {
  position: relative;
  z-index: 3;
  transition: transform 0.3s ease;
  flex-shrink: 0;
}

.signal-liquid-next-text {
  position: relative;
  z-index: 3;
  font-size: 16px;
  font-weight: 600;
  transition: color 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* Цвета для разных секций */
.signal-share-next {
  --accent-color: #6B7280;
  color: #6B7280;
}
.signal-emotion-next {
  --accent-color: #A972FF;
  color: #A972FF;
}
.signal-fact-next {
  --accent-color: #3DDC84;
  color: #3DDC84;
}
.signal-solution-next {
  --accent-color: #FFB800;
  color: #FFB800;
}
.signal-summary-next {
  --accent-color: #FF6B6B;
  color: #FF6B6B;
}
.signal-location-next {
  --accent-color: #00D9FF;
  color: #00D9FF;
}

.signal-liquid-next-btn .signal-next-icon,
.signal-liquid-next-btn .signal-liquid-next-text {
  color: var(--accent-color);
}


/* --- Стили для новой вкладки "Останемся на связи?" --- */
.signal-contact-title {
    text-align: center;
    font-size: 1.1rem;
    font-weight: 600;
    color: #f0f0f0;
    letter-spacing: 0.05em;
    margin-bottom: 2rem;
}

.signal-columns {
    display: flex;
    gap: 1.5rem;
    margin-bottom: 1.5rem;
}

.signal-column {
    flex: 1;
}

.signal-column label {
    display: block;
    font-size: 0.9rem;
    font-weight: 500;
    color: #aaa;
    margin-bottom: 0.5rem;
}

.signal-input {
    width: 100%;
    background-color: #242426;
    border: 1px solid #444;
    border-radius: 10px;
    padding: 0.75rem 1rem;
    font-size: 0.95rem;
    color: #f0f0f0;
    transition: all 0.3s ease;
}

.signal-input:focus {
  outline: none;
  border-color: #6B7280;
  background-color: #2a2a2e;
  box-shadow: 0 0 0 3px color-mix(in srgb, #6B7280 20%, transparent);
}

.signal-input-hint {
    font-size: 0.75rem;
    color: #777;
    margin-top: 0.5rem;
}

.signal-agreement {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-size: 0.9rem;
    color: #ccc;
    cursor: pointer;
}

.signal-agreement input[type="checkbox"] {
    width: 20px;
    height: 20px;
    accent-color: #6B7280;
    cursor: pointer;
}

.signal-submit-button {
  width: 100%;
  height: 56px;
  border-radius: 20px;
  border: none;
  background: linear-gradient(135deg, #6B7280, #4B5563);
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  cursor: pointer;
  transition: all 0.3s ease;
}

.signal-submit-button:hover:not(:disabled) {
  background: linear-gradient(135deg, #7c8694, #5c6778);
  box-shadow: 0 0 15px rgba(107, 114, 128, 0.4);
}

.signal-submit-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.signal-success-message {
  padding: 1.5rem;
  background: rgba(61, 220, 132, 0.1);
  border: 1px solid rgba(61, 220, 132, 0.3);
  border-radius: 16px;
  text-align: center;
  margin-top: 1rem;
}

.signal-success-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: #3DDC84;
  margin: 0 0 0.5rem 0;
}

.signal-success-text {
  font-size: 0.95rem;
  color: #ccc;
  margin: 0;
  line-height: 1.5;
}


@media (max-width: 768px) {
  .signal-controls-row {
    flex-direction: column;
    gap: 12px;
  }
  
  .signal-demo__form-container {
    padding: 1.5rem;
  }
  
  .signal-breadcrumb-circle {
    width: 10px;
    height: 10px;
  }
  
  .signal-breadcrumb.is-active .signal-breadcrumb-circle {
    width: 20px;
    height: 6px;
    border-radius: 3px;
  }
  
  .signal-liquid-next-btn {
    gap: 12px; /* Меньший gap на мобильных */
  }
  
  .signal-next-icon {
    width: 16px;
    height: 16px;
  }
  
  /* Фиксированная высота вопросов на мобильных */
  .signal-rotating-fixed-height {
    min-height: 2.8em; /* Немного больше на мобильных для двух строк */
  }
  
  .signal-question-label {
    font-size: 0.95rem;
    line-height: 1.4; /* Лучшая читаемость на мобильных */
  }

  .signal-columns {
    flex-direction: column;
    gap: 1rem;
  }
}
</style>
