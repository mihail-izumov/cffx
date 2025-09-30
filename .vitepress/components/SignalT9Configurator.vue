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

      <!-- Секция "Итого" - ИЗМЕНЕНО -->
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

        <!-- КНОПКА ОБНОВИТЬ - без проверки заполненности -->
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
            <p class="signal-question-label">Выберите сеть и адрес</p>
          </div>

          <!-- Выбор сети -->
          <select 
            v-model="form.selectedNetwork" 
            @change="form.selectedBranch = ''"
            class="signal-select"
          >
            <option value="">Выберите сеть</option>
            <option v-for="(cafe, name) in cafes" :key="name" :value="name">
              {{ name }}
            </option>
          </select>

          <!-- Выбор локации -->
          <select 
            v-model="form.selectedBranch" 
            class="signal-select"
            :disabled="!form.selectedNetwork"
          >
            <option value="">Выберите адрес</option>
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
        <div class="signal-question-block" style="--accent-color: #6B7280;">
          <div class="signal-contact-header">
            <p class="signal-contact-title">ОСТАНЕМСЯ НА СВЯЗИ?</p>
          </div>

          <!-- Поле имени -->
          <div class="signal-input-group">
            <label class="signal-label">Ваше имя</label>
            <input 
              v-model="form.userName" 
              type="text"
              class="signal-input"
              placeholder="Как к вам обращаться?"
            />
            <p class="signal-input-hint">Для персонального общения с ИИ-ассистентом Анной.</p>
          </div>

          <!-- Поле Telegram -->
          <div class="signal-input-group">
            <label class="signal-label">Ваш контакт в Telegram</label>
            <input 
              v-model="form.telegramContact" 
              type="text"
              class="signal-input"
              placeholder="+7 (___) ___-__-__"
            />
            <p class="signal-input-hint">Чтобы получать обновления и видеть результат.</p>
          </div>

          <!-- Чекбокс согласия -->
          <div class="signal-checkbox-group">
            <label class="signal-checkbox-label">
              <input 
                v-model="form.agreedToTerms" 
                type="checkbox"
                class="signal-checkbox"
              />
              <span>С Условиями использования согласен/на</span>
            </label>
          </div>
        </div>

        <!-- Кнопка отправки -->
        <div class="signal-submit-button-container">
          <button 
            class="signal-liquid-submit-btn"
            @click="submitForm()"
            :disabled="submitStatus === 'processing' || formSubmitted"
          >
            <span class="signal-liquid-submit-text">
              {{ 
                formSubmitted ? 'Отправлено' :
                submitStatus === 'processing' ? 'Отправка...' : 
                'Отправить Сигнал'
              }}
            </span>
          </button>
        </div>

        <!-- Сообщение после отправки -->
        <div v-if="formSubmitted" class="signal-success-message">
          <p class="signal-success-title">✓ Ваш сигнал отправлен!</p>
          <p class="signal-success-text">Анна свяжется с вами в течение 24 часов.</p>
        </div>
      </div>

      <!-- КНОПКА ДАЛЬШЕ - для всех секций кроме contact -->
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
const submitStatus = ref('idle');
const showInfoModal = ref(false);
const formSubmitted = ref(false);

// Данные о кофейнях
const cafes = {
  'Корж': {
    name: 'Корж',
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
    branches: [
      { address: 'Некрасовская, 57', gisUrl: 'https://2gis.ru/samara/firm/70000001036632385/tab/reviews', yandexUrl: 'https://yandex.ru/maps/org/surf_coffee/130764135504/reviews/' },
      { address: 'Полевая, 54', gisUrl: 'https://2gis.ru/samara/firm/70000001047142182/tab/reviews', yandexUrl: 'https://yandex.ru/maps/org/surf_coffee_x_pool/179188509748/reviews/' },
      { address: 'Куйбышева, 100', gisUrl: 'https://2gis.ru/samara/firm/70000001082424572/tab/reviews', yandexUrl: 'https://yandex.ru/maps/org/surf_coffee/13215597722/reviews/' }
    ]
  },
  'Белотурка': {
    name: 'Белотурка',
    branches: [
      { address: 'Куйбышева, 99', gisUrl: 'https://2gis.ru/samara/firm/70000001075213346/tab/reviews', yandexUrl: 'https://yandex.ru/maps/org/beloturka/21345450545/reviews/' },
      { address: 'Молодогвардейская, 153', gisUrl: 'https://2gis.ru/samara/firm/70000001094600683/tab/reviews', yandexUrl: 'https://yandex.ru/maps/org/beloturka/71041285330/reviews/' },
      { address: 'Ново-Садовая, 106', gisUrl: 'https://2gis.ru/samara/firm/70000001095659001/tab/reviews', yandexUrl: 'https://yandex.ru/maps/org/beloturka/56246021902/reviews/' },
      { address: 'Московское шоссе, 41 (РДЦ)', gisUrl: 'https://2gis.ru/samara/firm/70000001090546275/tab/reviews', yandexUrl: 'https://yandex.ru/maps/org/beloturka/34710016395/reviews/' },
      { address: 'Московское шоссе, 81Б (Парк Хаус)', gisUrl: 'https://2gis.ru/samara/firm/70000001100074136/tab/reviews', yandexUrl: 'https://yandex.ru/maps/org/beloturka/90354199231/reviews/' }
    ]
  },
  'Кэрри': {
    name: 'Кэрри',
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
  { id: 'contact', title: 'Контакт' }
];

const selectedSection = ref('share');
const isActive = (id) => id === selectedSection.value;

const getPlaceholderText = () => {
  return "Здесь появится Ваш Умный Отзыв ...";
};

// Переход к следующей секции БЕЗ проверок заполненности
const goToNextSection = async () => {
  const currentIndex = sections.findIndex(s => s.id === selectedSection.value);

  if (selectedSection.value === 'solutions') {
    nextStatus.value = 'processing';
    summarizeAllContent();
    nextStatus.value = 'idle';
  }

  if (currentIndex < sections.length - 1) {
    selectedSection.value = sections[currentIndex + 1].id;
  }
};

/* ===================== Гендерная коррекция ===================== */
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

function structureAndCleanText(shareText, emotionalText, factualText, solutionsText, gender) {
  let result = '';

  if (shareText.trim()) {
    let userText = applyGenderCorrection(shareText.trim(), gender);
    if (!userText.match(/[.!?]$/)) {
      userText += '.';
    }
    result += `МОЙ ОТЗЫВ СЕЙЧАС: ${userText.charAt(0).toUpperCase() + userText.slice(1)}`;
  } else {
    result += `МОЙ ОТЗЫВ СЕЙЧАС: (можно дополнить)`;
  }

  if (emotionalText || factualText || solutionsText) {
    if (result) result += '\n\n';
    result += '---\nМожно улучшить:\n---';
  }

  if (emotionalText) {
    const emotions = applyGenderCorrection(emotionalText.trim(), gender);
    const sentences = emotions.split(/[.!]/).map(s => s.trim()).filter(s => s);

    const positiveEmotions = [];
    const neutralEmotions = [];
    const negativeEmotions = [];

    sentences.forEach(sentence => {
      const lower = sentence.toLowerCase();
      if (lower.includes('доволь') || lower.includes('восхищ') || lower.includes('благодар')) {
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

  if (factualText) {
    if (result) result += '\n\n';

    const facts = factualText.trim();
    const sentences = facts.split(/[.!]/).map(s => s.trim()).filter(s => s);
    const factGroups = {};

    sentences.forEach(sentence => {
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

function summarizeAllContent() {
  humanizeStatus.value = 'processing';

  try {
    const structuredText = structureAndCleanText(
      form.shareExperience.trim(),
      form.emotionalRelease.trim(),
      form.factualAnalysis.trim(),
      form.constructiveSuggestions.trim(),
      selectedGender.value
    );

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

function onGenderClick(gender) {
  selectedGender.value = gender;
  updateSuggestionsForGender();

  if (selectedSection.value === 'summary') {
    summarizeAllContent();
  }
}

// Функция отправки формы
function submitForm() {
  submitStatus.value = 'processing';

  // Симуляция отправки
  setTimeout(() => {
    submitStatus.value = 'idle';
    formSubmitted.value = true;
  }, 1500);
}

/* ===================== Система подсказок ===================== */
const baseSuggestions = {
  emotions: {
    initial: ['расстроена', 'разочарована', 'недовольна', 'возмущена', 'удивлена', 'довольна', 'восхищена', 'благодарна'],
    'расстроена': ['долго ждала', 'грязная посуда', 'холодный кофе', 'грубый персонал', 'забыли заказ'],
    'разочарована': ['качеством', 'сервисом', 'ожиданиями', 'атмосферой', 'чистотой'],
    'недовольна': ['обслуживанием', 'очередью', 'ошибкой в заказе', 'температурой блюд', 'упаковкой'],
    'возмущена': ['антисанитарией', 'хамством', 'обманом', 'некачественной едой', 'инородными предметами'],
    'удивлена': ['таким сервисом', 'проблемами', 'невниманием', 'беспорядком', 'отношением'],
    'довольна': ['качеством кофе', 'скоростью обслуживания', 'вежливостью персонала', 'атмосферой заведения', 'чистотой помещения'],
    'восхищена': ['мастерством бариста', 'качеством десертов', 'дизайном интерьера', 'музыкальным сопровождением', 'ароматом кофе'],
    'благодарна': ['за внимание к деталям', 'за решение проблемы', 'за рекомендацию напитка', 'за уютную обстановку', 'за профессионализм']
  },
  facts: {
    initial: ['ожидание', 'качество', 'заказ', 'чистота', 'персонал'],
    'ожидание': ['20 минут', '30 минут', 'более часа', 'без объяснений', 'пустая кофейня'],
    'качество': ['холодный кофе', 'пережаренные зерна', 'водянистый напиток', 'горький вкус', 'несвежая выпечка'],
    'заказ': ['неправильный напиток', 'забыли позицию', 'другой размер', 'не тот сироп', 'перепутали'],
    'чистота': ['грязные столы', 'немытая посуда', 'липкий пол', 'пыль на полках', 'мусор у входа'],
    'персонал': ['грубость', 'игнорирование', 'невнимательность', 'раздражение', 'хамство']
  },
  solutions: {
    initial: ['таймер ожидания', 'контроль качества', 'обучение персонала', 'система проверки', 'стандарты сервиса'],
    'таймер ожидания': ['видимый счетчик', 'уведомления о готовности', 'бонус за ожидание', 'прозрачность процесса'],
    'контроль качества': ['проверка температуры', 'дегустация бариста', 'свежесть продуктов', 'стандарты приготовления'],
    'обучение персонала': ['тренинги по сервису', 'работа с жалобами', 'стандарты общения', 'мотивация команды'],
    'система проверки': ['чек-листы чистоты', 'mystery shopper', 'обратная связь', 'контроль менеджера'],
    'стандарты сервиса': ['протоколы приготовления', 'правила общения', 'SOP процедуры', 'корпоративная культура']
  }
};

const currentSuggestions = reactive({
  emotions: baseSuggestions.emotions.initial,
  facts: baseSuggestions.facts.initial,
  solutions: baseSuggestions.solutions.initial
});

function selectSuggestion(field, suggestion, category) {
  const currentText = form[field].trim();
  const newText = currentText ? `${currentText}. ${suggestion}` : suggestion;
  form[field] = newText;

  const nextLevel = baseSuggestions[category][suggestion];
  if (nextLevel) {
    currentSuggestions[category] = nextLevel;
  }
}

function isInitialSuggestions(category) {
  return currentSuggestions[category] === baseSuggestions[category].initial;
}

function resetSuggestions(category) {
  currentSuggestions[category] = baseSuggestions[category].initial;
}

function updateSuggestionsForGender() {
  if (selectedGender.value === 'male') {
    currentSuggestions.emotions = ['расстроен', 'разочарован', 'недоволен', 'возмущён', 'удивлён', 'доволен', 'восхищён', 'благодарен'];
  } else {
    currentSuggestions.emotions = baseSuggestions.emotions.initial;
  }
}

/* ===================== Ротация вопросов ===================== */
const questionsShare = [
  'Что произошло?',
  'Расскажите о ситуации',
  'Опишите вашу проблему'
];

const questions1 = {
  female: [
    'Что вы почувствовали?',
    'Какие эмоции испытали?',
    'Что вас расстроило?'
  ],
  male: [
    'Что вы почувствовали?',
    'Какие эмоции испытали?',
    'Что вас расстроило?'
  ]
};

const questions2 = [
  'Что именно произошло?',
  'Какие детали важны?',
  'Опишите факты'
];

const questions3 = [
  'Как это исправить?',
  'Что может помочь?',
  'Ваши предложения?'
];

const currentQuestionShare = ref(questionsShare[0]);
const currentQuestion1 = ref(questions1.female[0]);
const currentQuestion2 = ref(questions2[0]);
const currentQuestion3 = ref(questions3[0]);

let rotationInterval = null;

function startRotation(questionNum) {
  if (rotationInterval) {
    clearInterval(rotationInterval);
  }

  let questions, currentQuestion;

  if (questionNum === 'share') {
    questions = questionsShare;
    currentQuestion = currentQuestionShare;
  } else if (questionNum === 1) {
    questions = selectedGender.value === 'female' ? questions1.female : questions1.male;
    currentQuestion = currentQuestion1;
  } else if (questionNum === 2) {
    questions = questions2;
    currentQuestion = currentQuestion2;
  } else if (questionNum === 3) {
    questions = questions3;
    currentQuestion = currentQuestion3;
  }

  let currentIndex = questions.indexOf(currentQuestion.value);

  rotationInterval = setInterval(() => {
    currentIndex = (currentIndex + 1) % questions.length;
    currentQuestion.value = questions[currentIndex];
  }, 3000);
}
</script>

<style scoped>
:root {
  --signal-font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
}

.signal-demo-wrapper {
  max-width: 600px;
  margin: 0 auto;
  padding: 1rem;
  font-family: var(--signal-font-sans);
  background: #1e1e20;
  border-radius: 20px;
}

.signal-demo__header {
  margin-bottom: 1.5rem;
}

.signal-demo__breadcrumbs {
  display: flex;
  justify-content: center;
  gap: 1rem;
  padding: 0.75rem 0;
}

.signal-breadcrumb {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  transition: all 0.3s ease;
}

.signal-breadcrumb-circle {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #444;
  transition: all 0.3s ease;
}

.signal-breadcrumb.is-active .signal-breadcrumb-circle {
  background: #fff;
  box-shadow: 0 0 12px rgba(255, 255, 255, 0.5);
}

.signal-breadcrumb.share.is-active .signal-breadcrumb-circle {
  background: #6B7280;
  box-shadow: 0 0 12px rgba(107, 114, 128, 0.5);
}

.signal-breadcrumb.emotions.is-active .signal-breadcrumb-circle {
  background: #A972FF;
  box-shadow: 0 0 12px rgba(169, 114, 255, 0.5);
}

.signal-breadcrumb.facts.is-active .signal-breadcrumb-circle {
  background: #3DDC84;
  box-shadow: 0 0 12px rgba(61, 220, 132, 0.5);
}

.signal-breadcrumb.solutions.is-active .signal-breadcrumb-circle {
  background: #FFB800;
  box-shadow: 0 0 12px rgba(255, 184, 0, 0.5);
}

.signal-breadcrumb.summary.is-active .signal-breadcrumb-circle {
  background: #FF6B6B;
  box-shadow: 0 0 12px rgba(255, 107, 107, 0.5);
}

.signal-breadcrumb.location.is-active .signal-breadcrumb-circle {
  background: #00D9FF;
  box-shadow: 0 0 12px rgba(0, 217, 255, 0.5);
}

.signal-breadcrumb.contact.is-active .signal-breadcrumb-circle {
  background: #6B7280;
  box-shadow: 0 0 12px rgba(107, 114, 128, 0.5);
}

.signal-controls-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  gap: 1rem;
}

.signal-info-button {
  padding: 0.5rem 1rem;
  border-radius: 12px;
  border: 1px solid #444;
  background: #2a2a2e;
  color: #888;
  cursor: pointer;
  font-size: 0.85rem;
  font-weight: 500;
  transition: all 0.3s ease;
}

.signal-info-button:hover {
  border-color: #666;
  color: #bbb;
}

.signal-gender-switch {
  display: flex;
  align-items: center;
}

.signal-gender-container {
  display: flex;
  gap: 0.5rem;
  background: #2a2a2e;
  padding: 0.25rem;
  border-radius: 12px;
  border: 1px solid #444;
}

.signal-gender-btn {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  background-size: 60%;
  background-position: center;
  background-repeat: no-repeat;
}

.signal-gender-female {
  background-color: #3a3a3e;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23888' stroke-width='2'%3E%3Ccircle cx='12' cy='8' r='5'/%3E%3Cpath d='M12 13v8m-4 0h8'/%3E%3C/svg%3E");
}

.signal-gender-male {
  background-color: #3a3a3e;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23888' stroke-width='2'%3E%3Ccircle cx='10' cy='14' r='5'/%3E%3Cpath d='M14 5l5 5m0-5l-5 5m5-5h-5m5 0v5'/%3E%3C/svg%3E");
}

.signal-gender-btn.is-active {
  background-color: #fff;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23000' stroke-width='2'%3E%3Ccircle cx='12' cy='8' r='5'/%3E%3Cpath d='M12 13v8m-4 0h8'/%3E%3C/svg%3E");
}

.signal-gender-male.is-active {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23000' stroke-width='2'%3E%3Ccircle cx='10' cy='14' r='5'/%3E%3Cpath d='M14 5l5 5m0-5l-5 5m5-5h-5m5 0v5'/%3E%3C/svg%3E");
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 1rem;
}

.modal {
  background: #2a2a2e;
  border-radius: 20px;
  max-width: 500px;
  width: 100%;
  padding: 2rem;
  color: #f0f0f0;
}

.modal-header {
  margin-bottom: 1.5rem;
}

.modal-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #fff;
}

.modal-body {
  margin-bottom: 1.5rem;
  line-height: 1.6;
  color: #ccc;
}

.modal-link {
  color: #A972FF;
  text-decoration: none;
  font-weight: 500;
}

.modal-link:hover {
  text-decoration: underline;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
}

.modal-ok {
  padding: 0.75rem 2rem;
  border-radius: 12px;
  border: none;
  background: #A972FF;
  color: #fff;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.modal-ok:hover {
  background: #9860e6;
}

.signal-demo__form-container {
  margin-top: 1rem;
}

.signal-form-section {
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
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

.signal-rotating-phrase-container {
  min-height: 1.3em;
  margin-bottom: 0.6rem;
  display: flex;
  align-items: flex-start;
  overflow: hidden;
}

.signal-rotating-fixed-height {
  min-height: 2.6em;
}

.signal-question-label {
  font-weight: 500;
  font-size: 1rem;
  margin: 0;
  color: #f0f0f0;
  line-height: 1.3;
  width: 100%;
}

.fade-enter-active, .fade-leave-active { 
  transition: opacity 0.5s ease; 
}

.fade-enter-from, .fade-leave-to { 
  opacity: 0; 
}

textarea, .signal-input, .signal-select {
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
  margin-bottom: 0.75rem;
}

textarea:focus, .signal-input:focus, .signal-select:focus {
  outline: none;
  border-color: var(--accent-color);
  background-color: #2a2a2e;
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent-color) 20%, transparent);
}

::placeholder { 
  color: #666; 
}

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

.signal-example-hint-white {
  color: #f0f0f0 !important;
  margin: 0.5rem 0 0 0rem !important;
}

.signal-example-hint b {
  color: #aaa;
  font-weight: 600;
}

.signal-humanize-button-container {
  margin-top: 0.75rem;
  margin-bottom: 0.25rem;
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

.signal-next-button-container, .signal-submit-button-container {
  margin-top: 0.75rem;
}

.signal-liquid-next-btn, .signal-liquid-submit-btn {
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
  gap: 12px;
  font-family: var(--signal-font-sans);
  white-space: nowrap;
}

.signal-liquid-next-btn::before, .signal-liquid-submit-btn::before {
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

.signal-liquid-next-btn::after, .signal-liquid-submit-btn::after {
  content: '';
  position: absolute;
  inset: 2px;
  border-radius: 18px;
  background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.12) 0%, transparent 70%),
              #2a2a2e;
  z-index: 2;
  transition: all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
}

.signal-liquid-next-text, .signal-liquid-submit-text {
  position: relative;
  z-index: 3;
  font-size: 16px;
  font-weight: 600;
  transition: color 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.signal-next-icon {
  position: relative;
  z-index: 3;
  transition: transform 0.3s ease;
  flex-shrink: 0;
}

.signal-share-next {
  --accent-color: #6B7280;
}

.signal-emotion-next {
  --accent-color: #A972FF;
}

.signal-fact-next {
  --accent-color: #3DDC84;
}

.signal-solution-next {
  --accent-color: #FFB800;
}

.signal-summary-next {
  --accent-color: #FF6B6B;
}

.signal-location-next {
  --accent-color: #00D9FF;
}

.signal-share-next .signal-liquid-next-text,
.signal-share-next .signal-next-icon {
  color: #6B7280;
}

.signal-emotion-next .signal-liquid-next-text,
.signal-emotion-next .signal-next-icon {
  color: #A972FF;
}

.signal-fact-next .signal-liquid-next-text,
.signal-fact-next .signal-next-icon {
  color: #3DDC84;
}

.signal-solution-next .signal-liquid-next-text,
.signal-solution-next .signal-next-icon {
  color: #FFB800;
}

.signal-summary-next .signal-liquid-next-text,
.signal-summary-next .signal-next-icon {
  color: #FF6B6B;
}

.signal-location-next .signal-liquid-next-text,
.signal-location-next .signal-next-icon {
  color: #00D9FF;
}

.signal-liquid-submit-btn {
  --accent-color: #6B7280;
}

.signal-liquid-submit-text {
  color: #6B7280;
}

.signal-liquid-submit-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Стили для секции контактов */
.signal-contact-header {
  text-align: center;
  margin-bottom: 1.5rem;
}

.signal-contact-title {
  font-size: 1.2rem;
  font-weight: 700;
  color: #f0f0f0;
  letter-spacing: 0.05em;
  margin: 0;
}

.signal-input-group {
  margin-bottom: 1.25rem;
}

.signal-label {
  display: block;
  font-size: 0.85rem;
  font-weight: 600;
  color: #aaa;
  margin-bottom: 0.5rem;
}

.signal-input-hint {
  font-size: 0.75rem;
  color: #777;
  margin-top: 0.25rem;
  line-height: 1.3;
}

.signal-checkbox-group {
  margin-top: 1.5rem;
}

.signal-checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  font-size: 0.9rem;
  color: #ccc;
}

.signal-checkbox {
  width: 20px;
  height: 20px;
  cursor: pointer;
  accent-color: #6B7280;
}

.signal-success-message {
  margin-top: 1.5rem;
  padding: 1.25rem;
  background: rgba(61, 220, 132, 0.1);
  border: 1px solid rgba(61, 220, 132, 0.3);
  border-radius: 12px;
  text-align: center;
}

.signal-success-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #3DDC84;
  margin: 0 0 0.5rem 0;
}

.signal-success-text {
  font-size: 0.9rem;
  color: #aaa;
  margin: 0;
}

@media (max-width: 768px) {
  .signal-demo-wrapper {
    padding: 0.75rem;
  }

  .signal-controls-row {
    flex-direction: column;
    align-items: stretch;
  }

  .signal-info-button {
    width: 100%;
    text-align: center;
  }

  .signal-gender-switch {
    justify-content: center;
    margin-top: 0.75rem;
  }
}
</style>
