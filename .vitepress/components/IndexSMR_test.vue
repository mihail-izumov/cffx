<template>
  <div class="index-smr-table-container">
    <table class="index-smr-table">
      <thead>
        <tr>
          <th class="index-column">
            <span class="animated-icon">⚡</span>
          </th>
          <th>Кофейня</th>
          <th class="points-column">Точки</th>
          <th>Отзывы</th>
          <th>Статус</th>
          <th>Потенциал</th>
          <th><a class="header-link" href="/radar/index-smr/test#зерно-→-выручка">Тип зерна</a></th>
          <th><a class="header-link" href="/radar/index-smr/test#зерно-→-выручка">Поставщик</a></th>
          <th>Тип</th>
          <th>Стадия</th>
          <th>Инновации</th>
          <th>Влияние</th>
          <th>Рост</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(coffee, idx) in sortedCoffeeData"
          :key="`${coffee.name}-${coffee.index}`"
          @click="setActiveRow(idx)"
          :class="{ 
            'golden-row': idx < 6,
            'out-of-game-separator': isFirstOutOfGame(coffee, idx),
            'active-row': activeRowIndex === idx
          }"
        >
          <td class="cell-center index-column">{{ coffee.index }}</td>
          <td class="cell-left nowrap">
            <span 
              v-if="coffee.name === 'Корж'" 
              @click.stop="openReviewsModal(coffee.name)"
              class="coffee-name-clickable"
            >{{ coffee.name }}</span>
            <span v-else class="coffee-name-regular">{{ coffee.name }}</span>
            <span v-if="getDessertEmoji(coffee.name)" class="dessert-emoji">
              {{ getDessertEmoji(coffee.name) }}
            </span>
            <a v-if="isInCalculator(coffee.name)" href="/radar/index-smr/calc" class="badge badge-calculator" title="Рассчитать потенциал роста">
              <strong>+₽↑</strong>
            </a>
          </td>
          <td class="cell-left points-column">
            {{ coffee.points }}
            <span v-if="coffee.scale !== '·'" class="scale-text"> ({{ coffee.scale }})</span>
            <span v-else class="stagnation-dot">·</span>
          </td>
          <td class="cell-left">{{ coffee.reviews }}</td>
          <td class="cell-nowrap">
            <span class="badge" :class="statusClass(coffee.status)">
              {{ coffee.status }}
            </span>
          </td>
          <td class="cell-left">
            <span class="badge" :class="potentialClass(coffee.potential)">
              {{ coffee.potential }} {{ potentialEmoji(coffee.potential) }}
            </span>
          </td>
          <td class="cell-left">
            <span class="badge" :class="beanTypeClass(coffee.beanType)">
              {{ coffee.beanType }}
            </span>
          </td>
          <td class="cell-left supplier-cell">
            <span v-for="name in getCleanedSuppliers(coffee.supplier)" :key="name" class="badge badge-supplier">
              {{ name }}
            </span>
          </td>
          <td class="cell-left">
            <span class="badge" :class="typeClass(coffee.type)">
              {{ coffee.type }}
            </span>
          </td>
          <td class="cell-left">
            <span class="badge" :class="stageClass(coffee.stage)">
              {{ coffee.stage }}
            </span>
          </td>
          <td class="cell-left">
            <span class="badge" :class="innovationClass(coffee.innovation)">
              {{ coffee.innovation }}
            </span>
          </td>
          <td class="cell-left">
            <span class="badge" :class="influenceClass(coffee.influence)">
              {{ coffee.influence }}
            </span>
          </td>
          <td class="cell-left">
            <span class="badge" :class="growthClass(coffee.growth)">
              {{ coffee.growth }}
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- Модальное окно с отзывами -->
  <Teleport to="body">
    <div v-if="showReviewsModal" class="reviews-modal-backdrop" @click="closeReviewsModal">
      <div class="reviews-modal-container" @click.stop>
        <button @click="closeReviewsModal" class="reviews-close-btn">×</button>
        <div class="reviews-widget-wrapper">
          <!-- Заголовок виджета -->
          <div class="widget-header">
            <h2>🏆 Помогите составить честный рейтинг</h2>
            <p class="subtitle">Выберите кофейню и оставьте свой отзыв</p>
          </div>
          
          <!-- Карточка заведения -->
          <div class="establishment-card">
            <div class="card-header">
              <h3>{{ selectedEstablishment?.name }}</h3>
              <div class="status-badge">{{ selectedEstablishment?.status }}</div>
            </div>
            
            <div class="card-stats">
              <div class="stat">
                <span class="stat-label">Индекс роста:</span>
                <span class="stat-value index">{{ selectedEstablishment?.index }}</span>
              </div>
              <div class="stat">
                <span class="stat-label">Отзывов:</span>
                <span class="stat-value reviews">{{ selectedEstablishment?.totalReviews }}</span>
              </div>
              <div class="stat">
                <span class="stat-label">Филиалов:</span>
                <span class="stat-value branches">{{ selectedEstablishment?.branches?.length }}</span>
              </div>
            </div>
          </div>
          
          <!-- Список филиалов -->
          <div class="modal-content">
            <p class="modal-subtitle">Выберите филиал, чтобы оставить отзыв:</p>
            
            <div class="branches-list">
              <button
                v-for="(branch, index) in selectedEstablishment?.branches"
                :key="index"
                @click="goToReviews(branch)"
                class="branch-item"
              >
                <div class="branch-info">
                  <div class="branch-number">{{ index + 1 }}</div>
                  <div class="branch-address">
                    <span class="address-text">{{ branch.address }}</span>
                  </div>
                </div>
                <div class="branch-action">
                  <span class="action-text">Оставить отзыв</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="m9 18 6-6-6-6"/>
                  </svg>
                </div>
              </button>
            </div>
            
            <div class="modal-footer">
              <p class="ab-info">
                <small>💡 Вы будете автоматически перенаправлены на 2ГИС или Яндекс.Карты</small>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'IndexSMR',
  setup() {
    const showReviewsModal = ref(false)
    const selectedCoffeeShop = ref(null)

    const openReviewsModal = (shopName) => {
      selectedCoffeeShop.value = shopName
      showReviewsModal.value = true
    }

    const closeReviewsModal = () => {
      showReviewsModal.value = false
      selectedCoffeeShop.value = null
    }

    return {
      showReviewsModal,
      selectedCoffeeShop,
      openReviewsModal,
      closeReviewsModal
    }
  },
  data() {
    return {
      activeRowIndex: null,
      statusOrder: [
        'Лидер 👑',
        'Сильный 💪', 
        'Растущий 📈',
        'Стабильный 🎯',
        'Вне игры 🚫'
      ],
      calculatorShops: [
        'Balance coffee', 'Bonfix', 'Булка нетто', 'Coffee Bean', 'Cup-cup',
        'Дринкит', 'Кофеваркин', 'Корж', 'Lumos barista lab', 'MB Cafe',
        'Mosaic coffee&tea', 'Skuratov Coffee', 'Surf Coffee', 'Uco Coffee Roaster',
        'Vandal coffee', 'White Cup', 'Хюггешная', 'Юни'
      ],
      dessertLeaders: ['Корж', 'Этажи', 'Muwa', 'Конфитюр', 'Coffee Bean', 'Shu Authentic Coffee'],
      otherDesserts: ['Булка нетто', 'Lumos barista lab', 'Комод', 'Хюггешная', 'Кофейная поляна', 'Дринкит'],
      establishments: {
        'Корж': {
          name: 'Корж',
          totalReviews: '4,520',
          branches: [
            { address: 'Куйбышева, 103', gisUrl: 'https://2gis.ru/samara/firm/70000001100403006', yandexUrl: 'https://yandex.ru/maps/org/korzh/217541675197/' },
            { address: 'Революционная, 101В, к1', gisUrl: 'https://2gis.ru/samara/firm/70000001079219341', yandexUrl: 'https://yandex.ru/maps/org/korzh/53721116858/' },
            { address: '9 просека 5-я малая линия, 3б', gisUrl: 'https://2gis.ru/samara/firm/70000001074923618', yandexUrl: 'https://yandex.ru/maps/51/samara/house/9_ya_proseka_5_ya_malaya_liniya_3b/YUkYdw5hQUAAQFtpfX52dXVgZw==/' },
            { address: 'Льва Толстого, 30Б', gisUrl: 'https://2gis.ru/samara/firm/70000001052357057', yandexUrl: 'https://yandex.ru/maps/org/korzh/39953057475/' },
            { address: 'Самарская, 270', gisUrl: 'https://2gis.ru/samara/firm/70000001043471927', yandexUrl: 'https://yandex.ru/maps/org/korzh/58375020263/' },
            { address: 'Дачная, 2к2', gisUrl: 'https://2gis.ru/samara/firm/70000001045453045', yandexUrl: 'https://yandex.ru/maps/51/samara/house/dachnaya_ulitsa_2k2/YUkYdwNhSEcOQFtpfX5xcHpkZQ==/' },
            { address: 'Ульяновская, 19', gisUrl: 'https://2gis.ru/samara/firm/70000001033411071', yandexUrl: 'https://yandex.ru/maps/51/samara/chain/korz/23062014558/' },
            { address: 'Ново-Садовая, 106б', gisUrl: 'https://2gis.ru/samara/firm/70000001027391770', yandexUrl: 'https://yandex.ru/maps/org/korzh/95875749858/' }
          ],
          status: 'Лидер 👑',
          index: 98,
          type: 'Независимая сеть'
        }
      },
      coffeeData: [
        { index:98,  name:'Корж', reviews:'4,520', points:8,  scale:'~12+', status:'Лидер 👑', supplier:'Berry Coffee (Тольятти)', beanType:'Свой бренд 🏷️', type:'Независимая', potential:'Высокий', stage:'Экспансия', innovation:'Высокая', influence:'Высокое', growth:'Очень высокий' },
        { index:96,  name:'Skuratov Coffee', reviews:'3,129', points:6,  scale:'~10+', status:'Лидер 👑', supplier:'Skuratov Coffee Roasters', beanType:'Свой бренд 🏷️', type:'Сеть', potential:'Высокий', stage:'Экспансия', innovation:'Высокая', influence:'Высокое', growth:'Высокий' },
        { index:93,  name:'Surf Coffee', reviews:'925', points:3,  scale:'~8+', status:'Лидер 👑', supplier:'Surf Coffee Roasters (Иваново)', beanType:'Свой бренд 🏷️', type:'Франшиза', potential:'Высокий', stage:'Экспансия', innovation:'Средняя', influence:'Высокое', growth:'Высокий' },
        { index:91,  name:'Mosaic coffee&tea', reviews:'2,231', points:14,  scale:'~19+', status:'Лидер 👑', supplier:'Собственная обжарка', beanType:'Свой бренд 🏷️', type:'Независимая', potential:'Высокий', stage:'Экспансия', innovation:'Высокая', influence:'Высокое', growth:'Высокий' },
        { index:83,  name:'Stars Coffee', reviews:'405', points:3,  scale:'~8+', status:'Лидер 👑', supplier:'Stars Coffee Roasters', beanType:'Свой бренд 🏷️', type:'Франшиза', potential:'Высокий', stage:'Экспансия', innovation:'Средняя', influence:'Высокое', growth:'Высокий' },
        { index:81,  name:'Дринкит', reviews:'763', points:2,  scale:'~8+', status:'Лидер 👑', supplier:'Tasty Coffee', beanType:'Коммерция 📦', type:'Франшиза', potential:'Высокий', stage:'Рост', innovation:'Высокая', influence:'Среднее', growth:'Высокий' },
        { index:78,  name:'Uco Coffee Roaster', reviews:'209', points:2,  scale:'~4+', status:'Сильный 💪', supplier:'Собственная обжарка', beanType:'Спешелти ⭐', type:'Локальная', potential:'Средний', stage:'Рост', innovation:'Высокая', influence:'Среднее', growth:'Высокий' },
        { index:75,  name:'White Cup', reviews:'646', points:2,  scale:'~3+', status:'Сильный 💪', supplier:'Собственная обжарка', beanType:'Спешелти ⭐', type:'Локальная', potential:'Средний', stage:'Зрелость', innovation:'Средняя', influence:'Среднее', growth:'Средний' },
        { index:67,  name:'8 Атомов', reviews:'34', points:1,  scale:'~2+', status:'Сильный 💪', supplier:'UCO, Soldiers, Сварщица Екатерина', beanType:'Без бренда ⚪', type:'Локальная', potential:'Средний', stage:'Рост', innovation:'Высокая', influence:'Среднее', growth:'Высокий' },
        { index:65,  name:'Vandal coffee', reviews:'273', points:3,  scale:'~5+', status:'Сильный 💪', supplier:'Разное', beanType:'Без бренда ⚪', type:'Локальная', potential:'Средний', stage:'Рост', innovation:'Высокая', influence:'Низкое', growth:'Высокий' },
        { index:63,  name:'Lumos barista lab', reviews:'303', points:2,  scale:'~4+', status:'Сильный 💪', supplier:'Собственная обжарка', beanType:'Спешелти ⭐', type:'Локальная', potential:'Средний', stage:'Рост', innovation:'Высокая', influence:'Низкое', growth:'Средний' },
        { index:57,  name:'Cofix', reviews:'253', points:5,  scale:'~7+', status:'Растущий 📈', supplier:'Cofix (контрактная обжарка)', beanType:'Свой бренд 🏷️', type:'Франшиза', potential:'Средний', stage:'Рост', innovation:'Низкая', influence:'Низкое', growth:'Средний' },
        { index:55,  name:'Green Stag Roasters', reviews:'119', points:1,  scale:'~3+', status:'Растущий 📈', supplier:'Собственная обжарка', beanType:'Спешелти ⭐', type:'Локальная', potential:'Средний', stage:'Рост', innovation:'Высокая', influence:'Среднее', growth:'Высокий' },
        { index:55,  name:'Shu Authentic Coffee', reviews:'151', points:1, scale:'~2+', status:'Растущий 📈', supplier:'Собственная обжарка', beanType:'Спешелти ⭐', type:'Локальная', potential:'Средний', stage:'Рост', innovation:'Высокая', influence:'Среднее', growth:'Высокий' },
        { index:53,  name:'Cup-cup', reviews:'1,505', points:20,  scale:'~27+', status:'Растущий 📈', supplier:'Разное', beanType:'Без бренда ⚪', type:'Независимая', potential:'Низкий', stage:'Зрелость', innovation:'Низкая', influence:'Среднее', growth:'Средний' },
        { index:52,  name:'Хюггешная', reviews:'885', points:6,  scale:'~6+', status:'Растущий 📈', supplier:'Разное', beanType:'Без бренда ⚪', type:'Локальная', potential:'Средний', stage:'Рост', innovation:'Средняя', influence:'Среднее', growth:'Средний' },
        { index:50,  name:'Булка нетто', reviews:'771', points:3,  scale:'~5+', status:'Растущий 📈', supplier:'Разное', beanType:'Без бренда ⚪', type:'Локальная', potential:'Средний', stage:'Рост', innovation:'Средняя', influence:'Низкое', growth:'Средний' },
        { index:45,  name:'Coffee Bean', reviews:'1,703', points:1,  scale:'~2+', status:'Растущий 📈', supplier:'LEON (Coffee Bean)', beanType:'Коммерция 📦', type:'Локальная', potential:'Средний', stage:'Рост', innovation:'Средняя', influence:'Низкое', growth:'Низкий' },
        { index:45,  name:'MB Cafe', reviews:'199', points:2,  scale:'~3+', status:'Растущий 📈', supplier:'Разное', beanType:'Без бренда ⚪', type:'Локальная', potential:'Средний', stage:'Рост', innovation:'Средняя', influence:'Низкое', growth:'Низкий' },
        { index:45,  name:'Bonfix', reviews:'143', points:2,  scale:'~3+', status:'Растущий 📈', supplier:'Разное', beanType:'Без бренда ⚪', type:'Локальная', potential:'Средний', stage:'Рост', innovation:'Средняя', influence:'Низкое', growth:'Низкий' },
        { index:45,  name:'Coffetino', reviews:'186', points:2,  scale:'~3+', status:'Растущий 📈', supplier:'Разное', beanType:'Без бренда ⚪', type:'Локальная', potential:'Средний', stage:'Рост', innovation:'Средняя', influence:'Низкое', growth:'Низкий' },
        { index:45,  name:'Кофейный лис', reviews:'47', points:2,  scale:'~3+', status:'Растущий 📈', supplier:'Разное', beanType:'Без бренда ⚪', type:'Локальная', potential:'Средний', stage:'Рост', innovation:'Средняя', influence:'Низкое', growth:'Низкий' },
        { index:41,  name:'Юни', reviews:'376', points:3,  scale:'~5+', status:'Растущий 📈', supplier:'Tasty Coffee', beanType:'Коммерция 📦', type:'Локальная', potential:'Низкий', stage:'Рост', innovation:'Средняя', influence:'Низкое', growth:'Средний' },
        { index:40,  name:'Balance coffee', reviews:'147', points:1,  scale:'1+', status:'Растущий 📈', supplier:'Разное', beanType:'Без бренда ⚪', type:'Локальная', potential:'Средний', stage:'Стартап', innovation:'Средняя', influence:'Низкое', growth:'Высокий' },
        { index:40,  name:'Days Coffee', reviews:'15', points:1,  scale:'1+', status:'Растущий 📈', supplier:'Разное', beanType:'Без бренда ⚪', type:'Локальная', potential:'Средний', stage:'Рост', innovation:'Средняя', influence:'Низкое', growth:'Средний' },
        { index:40,  name:'Ягоза', reviews:'437', points:1,  scale:'1+', status:'Растущий 📈', supplier:'Разное', beanType:'Без бренда ⚪', type:'Локальная', potential:'Средний', stage:'Рост', innovation:'Средняя', influence:'Низкое', growth:'Средний' },
        { index:40,  name:'Тепло', reviews:'789', points:1,  scale:'1+', status:'Растущий 📈', supplier:'Разное', beanType:'Без бренда ⚪', type:'Локальная', potential:'Средний', stage:'Рост', innovation:'Средняя', influence:'Низкое', growth:'Средний' },
        { index:40,  name:'Комод', reviews:'1,783', points:1,  scale:'1+', status:'Растущий 📈', supplier:'Разное', beanType:'Без бренда ⚪', type:'Локальная', potential:'Средний', stage:'Рост', innovation:'Средняя', influence:'Низкое', growth:'Средний' },
        { index:40,  name:'Конфитюр', reviews:'946', points:1,  scale:'1+', status:'Растущий 📈', supplier:'Алеф Трейд', beanType:'Без бренда ⚪', type:'Локальная', potential:'Средний', stage:'Рост', innovation:'Средняя', influence:'Низкое', growth:'Средний' },
        { index:40,  name:'КоЗа', reviews:'215', points:1,  scale:'1+', status:'Растущий 📈', supplier:'Разное', beanType:'Без бренда ⚪', type:'Локальная', potential:'Средний', stage:'Рост', innovation:'Средняя', influence:'Низкое', growth:'Средний' },
        { index:40,  name:'Komkofe', reviews:'465', points:1,  scale:'1+', status:'Растущий 📈', supplier:'Tasty Coffee', beanType:'Коммерция 📦', type:'Локальная', potential:'Средний', stage:'Рост', innovation:'Средняя', influence:'Низкое', growth:'Средний' },
        { index:40,  name:'Сойка', reviews:'292', points:1,  scale:'1+', status:'Растущий 📈', supplier:'Разное', beanType:'Без бренда ⚪', type:'Локальная', potential:'Средний', stage:'Рост', innovation:'Средняя', influence:'Низкое', growth:'Средний' },
        { index:40,  name:'Black milk', reviews:'153', points:1,  scale:'1+', status:'Растущий 📈', supplier:'Разное', beanType:'Без бренда ⚪', type:'Локальная', potential:'Средний', stage:'Рост', innovation:'Средняя', influence:'Низкое', growth:'Средний' },
        { index:40,  name:'One Price Coffee', reviews:'42', points:1,  scale:'1+', status:'Растущий 📈', supplier:'Разное', beanType:'Без бренда ⚪', type:'Локальная', potential:'Средний', stage:'Рост', innovation:'Средняя', influence:'Низкое', growth:'Средний' },
        { index:40,  name:'Art Coffee', reviews:'57', points:1,  scale:'1+', status:'Растущий 📈', supplier:'Разное', beanType:'Без бренда ⚪', type:'Локальная', potential:'Средний', stage:'Рост', innovation:'Средняя', influence:'Низкое', growth:'Средний' },
        { index:40,  name:'Coffee cake', reviews:'947', points:1,  scale:'1+', status:'Растущий 📈', supplier:'Разное', beanType:'Без бренда ⚪', type:'Локальная', potential:'Средний', stage:'Рост', innovation:'Средняя', influence:'Низкое', growth:'Средний' },
        { index:40,  name:'Этажи', reviews:'904', points:1,  scale:'1+', status:'Растущий 📈', supplier:'Разное', beanType:'Без бренда ⚪', type:'Локальная', potential:'Средний', stage:'Рост', innovation:'Средняя', influence:'Низкое', growth:'Средний' },
        { index:40,  name:'Кофейная поляна', reviews:'629', points:3,  scale:'1+', status:'Растущий 📈', supplier:'Разное', beanType:'Без бренда ⚪', type:'Локальная', potential:'Средний', stage:'Рост', innovation:'Средняя', influence:'Низкое', growth:'Средний' },
        { index:40,  name:'Pluma', reviews:'93', points:1,  scale:'1+', status:'Растущий 📈', supplier:'Разное', beanType:'Без бренда ⚪', type:'Локальная', potential:'Средний', stage:'Рост', innovation:'Средняя', influence:'Низкое', growth:'Средний' },
        { index:39,  name:'Coffee Like', reviews:'170', points:3,  scale:'~6+', status:'Стабильный 🎯', supplier:'Coffee Like (контрактная обжарка)', beanType:'Свой бренд 🏷️', type:'Локальная', potential:'Низкий', stage:'Экспансия', innovation:'Низкая', influence:'Низкое', growth:'Низкий' },
        { index:30,  name:'Толстой', reviews:'398', points:1,  scale:'·', status:'Стабильный 🎯', supplier:'Tasty Coffee', beanType:'Коммерция 📦', type:'Локальная', potential:'Низкий', stage:'Зрелость', innovation:'Низкая', influence:'Низкое', growth:'Низкий' },
        { index:30,  name:'Coffee time', reviews:'70', points:1,  scale:'·', status:'Стабильный 🎯', supplier:'Разное', beanType:'Без бренда ⚪', type:'Локальная', potential:'Низкий', stage:'Зрелость', innovation:'Низкая', influence:'Низкое', growth:'Низкий' },
        { index:30,  name:'Точка притяжения', reviews:'122', points:1,  scale:'·', status:'Стабильный 🎯', supplier:'Разное', beanType:'Без бренда ⚪', type:'Локальная', potential:'Низкий', stage:'Зрелость', innovation:'Низкая', influence:'Низкое', growth:'Низкий' },
        { index:30,  name:'Капуч', reviews:'65', points:1,  scale:'·', status:'Стабильный 🎯', supplier:'Разное', beanType:'Без бренда ⚪', type:'Локальная', potential:'Низкий', stage:'Зрелость', innovation:'Низкая', influence:'Низкое', growth:'Низкий' },
        { index:30,  name:'Кофеваркин', reviews:'185', points:1,  scale:'·', status:'Стабильный 🎯', supplier:'Собственная обжарка', beanType:'Спешелти ⭐', type:'Локальная', potential:'Низкий', stage:'Зрелость', innovation:'Низкая', influence:'Низкое', growth:'Низкий' },
        { index:30,  name:'Белый кот', reviews:'50', points:1,  scale:'·', status:'Стабильный 🎯', supplier:'Разное', beanType:'Без бренда ⚪', type:'Локальная', potential:'Низкий', stage:'Зрелость', innovation:'Низкая', influence:'Низкое', growth:'Низкий' },
        { index:30,  name:'Cup to cup', reviews:'342', points:1,  scale:'·', status:'Стабильный 🎯', supplier:'Разное', beanType:'Без бренда ⚪', type:'Локальная', potential:'Низкий', stage:'Зрелость', innovation:'Низкая', influence:'Низкое', growth:'Низкий' },
        { index:30,  name:'Котель', reviews:'158', points:1,  scale:'·', status:'Стабильный 🎯', supplier:'Разное', beanType:'Без бренда ⚪', type:'Локальная', potential:'Низкий', stage:'Зрелость', innovation:'Низкая', influence:'Низкое', growth:'Низкий' },
        { index:30,  name:'Coffee inn', reviews:'138', points:1,  scale:'·', status:'Стабильный 🎯', supplier:'Разное', beanType:'Без бренда ⚪', type:'Локальная', potential:'Низкий', stage:'Зрелость', innovation:'Низкая', influence:'Низкое', growth:'Низкий' },
        { index:30,  name:'Coffee Cup', reviews:'114', points:2,  scale:'·', status:'Стабильный 🎯', supplier:'Разное', beanType:'Без бренда ⚪', type:'Локальная', potential:'Низкий', stage:'Зрелость', innovation:'Низкая', influence:'Низкое', growth:'Низкий' },
        { index:30,  name:'Cappuccino cup', reviews:'132', points:1,  scale:'·', status:'Стабильный 🎯', supplier:'Разное', beanType:'Без бренда ⚪', type:'Локальная', potential:'Низкий', stage:'Зрелость', innovation:'Низкая', influence:'Низкое', growth:'Низкий' },
        { index:25,  name:'New coffee', reviews:'203', points:1,  scale:'·', status:'Стабильный 🎯', supplier:'Разное', beanType:'Без бренда ⚪', type:'Локальная', potential:'Низкий', stage:'Стартап', innovation:'Низкая', influence:'Низкое', growth:'Средний' },
        { index:58,  name:'Muwa', reviews:'672', points:1,  scale:'~2+', status:'Вне игры 🚫', supplier:'Экспериментальные', beanType:'Эксперимент 🧪', type:'Локальная', potential:'Средний', stage:'Рост', innovation:'Высокая', influence:'Среднее', growth:'Средний' },
        { index:40,  name:'Twinz', reviews:'115', points:1,  scale:'1+', status:'Вне игры 🚫', supplier:'Разное', beanType:'Без бренда ⚪', type:'Локальная', potential:'Средний', stage:'Рост', innovation:'Средняя', influence:'Низкое', growth:'Средний' }
      ]
    }
  },
  computed: {
    sortedCoffeeData() {
      return [...this.coffeeData].sort((a, b) => {
        const statusOrderA = this.statusOrder.indexOf(a.status);
        const statusOrderB = this.statusOrder.indexOf(b.status);
        if (statusOrderA !== statusOrderB) {
          return statusOrderA - statusOrderB;
        }
        return b.index - a.index;
      });
    },
    selectedEstablishment() {
      return this.establishments[this.selectedCoffeeShop];
    }
  },
  methods: {
    setActiveRow(index) {
      if (this.activeRowIndex === index) {
        this.activeRowIndex = null; 
      } else {
        this.activeRowIndex = index;
      }
    },
    isInCalculator(name) {
      return this.calculatorShops.includes(name);
    },
    getDessertEmoji(name) {
      if (this.dessertLeaders.includes(name)) return '🥐🥐';
      if (this.otherDesserts.includes(name)) return '🥐';
      return '';
    },
    statusClass(status) {
      if (status === 'Лидер 👑') return 'status-leader';
      if (status === 'Сильный 💪') return 'status-strong';
      if (status === 'Растущий 📈') return 'status-growing';
      if (status === 'Стабильный 🎯') return 'status-stable';
      if (status === 'Вне игры 🚫') return 'status-out';
      return '';
    },
    beanTypeClass(beanType) {
      if (beanType === 'Свой бренд 🏷️') return 'bean-own-brand';
      if (beanType === 'Коммерция 📦') return 'bean-commercial';
      if (beanType === 'Спешелти ⭐') return 'bean-specialty';
      if (beanType === 'Без бренда ⚪') return 'bean-no-brand';
      if (beanType === 'Эксперимент 🧪') return 'bean-experiment';
      return 'bean-default';
    },
    typeClass(type) {
      if (type === 'Независимая') return 'param-independent';
      if (type === 'Сеть') return 'param-network';
      if (type === 'Франшиза') return 'param-franchise';
      if (type === 'Локальная') return 'param-local';
      return 'param-default';
    },
    potentialClass(potential) {
      if (potential === 'Высокий') return 'param-high';
      if (potential === 'Средний') return 'param-medium';
      if (potential === 'Низкий') return 'param-low';
      return 'param-default';
    },
    stageClass(stage) {
      if (stage === 'Экспансия') return 'param-expansion';
      if (stage === 'Рост') return 'param-growth';
      if (stage === 'Зрелость') return 'param-mature';
      if (stage === 'Стартап') return 'param-startup';
      return 'param-default';
    },
    innovationClass(innovation) {
      if (innovation === 'Высокая') return 'param-high';
      if (innovation === 'Средняя') return 'param-medium';
      if (innovation === 'Низкая') return 'param-low';
      return 'param-default';
    },
    influenceClass(influence) {
      if (influence === 'Высокое') return 'param-high';
      if (influence === 'Среднее') return 'param-medium';
      if (influence === 'Низкое') return 'param-low';
      return 'param-default';
    },
    growthClass(growth) {
      if (growth === 'Очень высокий') return 'param-very-high';
      if (growth === 'Высокий') return 'param-high';
      if (growth === 'Средний') return 'param-medium';
      if (growth === 'Низкий') return 'param-low';
      return 'param-default';
    },
    isFirstOutOfGame(coffee, index) {
      return coffee.status === 'Вне игры 🚫' && 
             (index === 0 || this.sortedCoffeeData[index - 1].status !== 'Вне игры 🚫');
    },
    potentialEmoji(potential) {
      if (potential === 'Высокий') return '🚀';
      if (potential === 'Низкий') return '🌱';
      if (potential === 'Средний') return '✨';
      return '';
    },
    getCleanedSuppliers(supplier) {
      const names = supplier.split(/, |,/g);
      return names.map(name => {
        let cleaned = name.replace(/\(контрактная обжарка\)/gi, '').trim();
        cleaned = cleaned.replace(/\s*\([^\)]*\)/gi, '').trim();
        if (cleaned === 'Собственная обжарка') {
          return 'Своя обжарка';
        }
        return cleaned;
      });
    },
    getRandomService() {
      return Math.random() < 0.5 ? 'gis' : 'yandex'
    },
    goToReviews(branch) {
      const service = this.getRandomService()
      const url = service === 'gis' ? branch.gisUrl : branch.yandexUrl
      if (window.gtag) {
        window.gtag('event', 'review_redirect', {
          establishment: this.selectedEstablishment.name,
          address: branch.address,
          service: service === 'gis' ? '2ГИС' : 'Яндекс.Карты'
        })
      }
      window.open(url, '_blank')
      this.closeReviewsModal()
    }
  }
}
</script>

<style scoped>
.index-smr-table-container {
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}
.index-smr-table {
  width: 100%;
  border-spacing: 0;
  border-collapse: separate;
  table-layout: fixed;
}
/* Заголовки */
.index-smr-table th {
  position: sticky;
  top: 0;
  z-index: 1;
  background: var(--vp-c-bg-soft, #222);
  text-transform: uppercase;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 1px;
  color: var(--vp-c-text-2, #888);
  border-bottom: 1px solid var(--vp-c-divider, #333);
  padding: 12px 10px;
  white-space: nowrap;
  vertical-align: middle;
}
.header-link {
  color: inherit; 
  text-decoration: underline; 
  text-decoration-style: dashed;
  text-decoration-thickness: 1px; 
  text-underline-offset: 3px; 
  font-weight: 700;
  transition: all 0.2s ease;
}
.header-link:hover { 
  color: var(--vp-c-brand-1, #646cff); 
  text-decoration-style: solid; 
}
.header-link:visited { color: inherit; }
.index-column { width: 60px; text-align: center; }
.points-column { white-space: nowrap; font-weight: 600; width: 100px; }
.nowrap { white-space: nowrap !important; }
.animated-icon {
  display: inline-block;
  font-size: 1.2em;
  animation: pulse 2.5s infinite;
  transition: transform 0.3s ease;
}
@keyframes pulse {
  0% { transform: scale(1); text-shadow: 0 0 5px rgba(255, 255, 0, 0); }
  50% { transform: scale(1.1); text-shadow: 0 0 10px rgba(255, 193, 7, 0.7); }
  100% { transform: scale(1); text-shadow: 0 0 5px rgba(255, 255, 0, 0); }
}
/* Ячейки */
.index-smr-table td {
  padding: 10px 8px;
  border-bottom: 1px solid var(--vp-c-divider, #333);
  font-size: 15px;
  background: none;
  transition: background 0.14s;
  color: var(--vp-c-text-1, #e6e6e6);
  vertical-align: middle;
}
.index-smr-table td:nth-child(2) { font-weight: 600; }
.index-smr-table tbody tr {
  cursor: pointer;
  transition: box-shadow 0.2s ease-in-out, background 0.2s;
}
/* Выделение активной строки */
.active-row {
  box-shadow: inset 0 2px 0 #c5f946, inset 0 -2px 0 #c5f946;
}
.active-row td {
  background: rgba(197, 249, 70, 0.08) !important;
}
.index-smr-table tbody tr:hover td {
  background: rgba(120,120,120,0.12);
}
.active-row:hover td {
  background: rgba(197, 249, 70, 0.12) !important;
}
.golden-row {
  background: linear-gradient(90deg,rgba(255,230,90,0.05) 0%,rgba(255,226,120,0.0) 100%);
}
.active-row.golden-row td {
  background: linear-gradient(90deg, rgba(255,230,90,0.1) 0%, rgba(197, 249, 70, 0.05) 100%) !important;
}
.out-of-game-separator td { border-top: 4px solid #ff6b6b !important; padding-top: 14px; }
.cell-center { text-align: center; }
.cell-left { text-align: left; }
.cell-nowrap { white-space: nowrap; }
.supplier-cell { line-height: 1.6; }
.scale-text { font-size: 0.9em; color: #888; }
.stagnation-dot { font-weight: 900; font-size: 1.5em; line-height: 1; vertical-align: middle; color: #888; padding-left: 4px; }

/* Стили для кликабельного "Корж" - использует глобальные стили ссылок */
.coffee-name-clickable {
  color: var(--vp-c-brand-2, #C5F946); /* зеленый цвет как глобальные ссылки */
  text-decoration: none;
  border-bottom: 1px solid transparent;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.coffee-name-clickable:hover {
  color: var(--vp-c-brand-1, #347b6c); /* темно-зеленый при hover */
  border-bottom-color: var(--vp-c-brand-1, #347b6c);
}

/* Стили для обычных названий кофеен */
.coffee-name-regular {
  color: inherit;
  font-weight: 600;
  cursor: default;
  text-decoration: none;
  border: none;
}

/* Стили для модального окна */
.reviews-modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(8px);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  box-sizing: border-box;
}

.reviews-modal-container {
  background: var(--vp-c-bg);
  border-radius: 20px;
  max-width: 800px;
  width: 100%;
  max-height: calc(100vh - 40px);
  position: relative;
  box-shadow: 0 25px 80px rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.reviews-widget-wrapper {
  max-height: calc(100vh - 120px);
  overflow-y: auto;
  padding: 0;
  scrollbar-width: thin;
  scrollbar-color: var(--vp-c-brand-1) transparent;
}

.reviews-widget-wrapper::-webkit-scrollbar {
  width: 6px;
}

.reviews-widget-wrapper::-webkit-scrollbar-track {
  background: transparent;
}

.reviews-widget-wrapper::-webkit-scrollbar-thumb {
  background: var(--vp-c-brand-1);
  border-radius: 3px;
}

.reviews-widget-wrapper::-webkit-scrollbar-thumb:hover {
  background: var(--vp-c-brand-2);
}

.reviews-close-btn {
  position: absolute;
  top: 20px;
  right: 20px;
  background: var(--vp-c-bg-mute);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  cursor: pointer;
  color: var(--vp-c-text-2);
  transition: all 0.3s ease;
  z-index: 10;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.reviews-close-btn:hover {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  transform: rotate(90deg);
}

/* Стили виджета отзывов */
.widget-header {
  text-align: center;
  margin-bottom: 32px;
  padding: 32px 32px 0;
}
.widget-header h2 {
  margin: 0 0 8px 0;
  color: var(--vp-c-brand-1);
  font-size: 28px;
  font-weight: 700;
}
.subtitle {
  margin: 0;
  color: var(--vp-c-text-2);
  font-size: 16px;
}
.establishment-card {
  background: var(--vp-c-bg-soft);
  border: 2px solid var(--vp-c-border);
  border-radius: 16px;
  padding: 24px;
  margin: 0 24px 32px;
  position: relative;
  overflow: hidden;
}
.establishment-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--vp-c-brand-2), var(--vp-c-brand-1));
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
}
.card-header h3 {
  margin: 0;
  color: var(--vp-c-brand-1);
  font-size: 22px;
  font-weight: 600;
}
.status-badge {
  background: linear-gradient(135deg, var(--vp-c-brand-2), var(--vp-c-brand-1));
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  white-space: nowrap;
}
.card-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}
.stat {
  text-align: center;
}
.stat-label {
  display: block;
  font-size: 12px;
  color: var(--vp-c-text-3);
  margin-bottom: 4px;
}
.stat-value {
  display: block;
  font-size: 18px;
  font-weight: 700;
}
.stat-value.index {
  color: var(--vp-c-brand-1);
}
.stat-value.reviews {
  color: var(--vp-c-green-1);
}
.stat-value.branches {
  color: var(--vp-c-blue-1);
}
.modal-content {
  flex-grow: 1;
}
.modal-subtitle {
  margin: 0;
  padding: 20px 28px 12px;
  color: var(--vp-c-text-2);
  font-size: 14px;
}
.branches-list {
  padding: 0 16px;
}
.branch-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 16px;
  margin: 8px 0;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-border);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: left;
}
.branch-item:hover {
  background: var(--vp-c-brand-soft);
  border-color: var(--vp-c-brand-1);
  transform: translateX(8px);
}
.branch-info {
  display: flex;
  align-items: center;
  gap: 16px;
  flex: 1;
}
.branch-number {
  background: var(--vp-c-brand-1);
  color: white;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 600;
  flex-shrink: 0;
}
.address-text {
  font-weight: 500;
  color: var(--vp-c-text-1);
  font-size: 15px;
}
.branch-action {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--vp-c-brand-1);
  font-size: 14px;
  font-weight: 600;
}
.modal-footer {
  padding: 16px 28px;
  border-top: 1px solid var(--vp-c-border);
  background: var(--vp-c-bg-soft);
  flex-shrink: 0;
  text-align: center;
}
.ab-info {
  margin: 0;
  color: var(--vp-c-text-3);
  font-size: 13px;
}

.badge {
  display: inline-block;
  border-radius: 6px;
  padding: 4px 10px;
  font-size: 0.85em;
  white-space: nowrap;
  vertical-align: baseline;
  margin: 2px;
  font-weight: 500;
  letter-spacing: 0.02em;
  border: 1px solid transparent;
}
.status-leader { background: rgba(197, 249, 70, 0.15); color: #c5f946; border-color: rgba(197, 249, 70, 0.3); }
.status-strong { background: rgba(59, 130, 246, 0.15); color: #60a5fa; border-color: rgba(59, 130, 246, 0.3); }
.status-growing { background: rgba(34, 197, 94, 0.15); color: #4ade80; border-color: rgba(34, 197, 94, 0.3); }
.status-stable { background: rgba(156, 163, 175, 0.15); color: #9ca3af; border-color: rgba(156, 163, 175, 0.3); }
.status-out { background: rgba(255, 107, 107, 0.15); color: #ff6b6b; border-color: rgba(255, 107, 107, 0.3); }
.bean-own-brand { background: rgba(245, 158, 11, 0.15); color: #f59e0b; border-color: rgba(245, 158, 11, 0.3); }
.bean-commercial { background: rgba(99, 102, 241, 0.15); color: #818cf8; border-color: rgba(99, 102, 241, 0.3); }
.bean-specialty { background: rgba(16, 185, 129, 0.15); color: #34d399; border-color: rgba(16, 185, 129, 0.3); }
.bean-no-brand { background: rgba(107, 114, 128, 0.15); color: #9ca3af; border-color: rgba(107, 114, 128, 0.3); }
.bean-experiment { background: rgba(236, 72, 153, 0.15); color: #f472b6; border-color: rgba(236, 72, 153, 0.3); }
.badge-supplier { background: rgba(107, 114, 128, 0.1); color: #a0a0a0; border-color: rgba(107, 114, 128, 0.2); }
.param-independent { background: rgba(197, 249, 70, 0.1); color: rgba(197, 249, 70, 0.9); border-color: rgba(197, 249, 70, 0.2); }
.param-network { background: rgba(59, 130, 246, 0.1); color: rgba(96, 165, 250, 0.9); border-color: rgba(59, 130, 246, 0.2); }
.param-franchise { background: rgba(168, 85, 247, 0.15); color: rgba(192, 132, 252, 1); border-color: rgba(168, 85, 247, 0.3); }
.param-local { background: rgba(107, 114, 128, 0.15); color: rgba(156, 163, 175, 1); border-color: rgba(107, 114, 128, 0.25); }
.param-very-high, .param-high, .badge.param-high { background: rgba(34, 197, 94, 0.15); color: rgba(52, 211, 153, 1); border-color: rgba(34, 197, 94, 0.3); }
.param-medium, .badge.param-medium { background: rgba(234, 179, 8, 0.15); color: rgba(252, 211, 77, 1); border-color: rgba(234, 179, 8, 0.3); }
.param-low, .badge.param-low { background: rgba(239, 68, 68, 0.15); color: rgba(248, 113, 113, 1); border-color: rgba(239, 68, 68, 0.3); }
.param-expansion { background: rgba(59, 130, 246, 0.1); color: rgba(96, 165, 250, 0.9); border-color: rgba(59, 130, 246, 0.2); }
.param-growth { background: rgba(34, 197, 94, 0.1); color: rgba(52, 211, 153, 0.9); border-color: rgba(34, 197, 94, 0.2); }
.param-mature { background: rgba(156, 163, 175, 0.15); color: rgba(156, 163, 175, 1); border-color: rgba(156, 163, 175, 0.25); }
.param-startup { background: rgba(168, 85, 247, 0.1); color: rgba(192, 132, 252, 0.9); border-color: rgba(168, 85, 247, 0.2); }
.param-default { background: rgba(107, 114, 128, 0.1); color: rgba(107, 114, 128, 0.9); border-color: rgba(107, 114, 128, 0.2); }
a.badge-calculator {
  margin-left: 6px;
  background: #2b2b2b;
  color: #777;
  border: 1px solid #444;
  text-decoration: none;
  transition: all 0.2s ease;
  padding: 2px 7px;
  font-size: 0.8em;
  vertical-align: middle;
  border-radius: 5px;
  font-weight: 600;
  box-shadow: none;
  text-shadow: none;
}
a.badge-calculator:hover {
  background: #3c3c3c;
  border-color: #777;
  color: #fff;
  box-shadow: 0 1px 3px rgba(0,0,0,0.3);
}
.dessert-emoji {
  margin-left: 6px;
  vertical-align: middle;
  font-size: 1.1em;
}

@media (max-width: 768px) {
  .reviews-modal-backdrop { 
    padding: 10px 15px; 
  }
  .reviews-modal-container {
    max-height: calc(100vh - 30px);
    border-radius: 15px;
  }
  .reviews-widget-wrapper {
    max-height: calc(100vh - 110px);
  }
  .card-stats {
    grid-template-columns: 1fr;
    gap: 12px;
  }
}

@media (max-width: 640px) {
  .reviews-modal-backdrop { 
    padding: 5px; 
  }
  .reviews-modal-container {
    border-radius: 12px;
    max-height: calc(100vh - 10px);
  }
  .reviews-widget-wrapper {
    max-height: calc(100vh - 90px);
  }
  .reviews-close-btn {
    top: 15px;
    right: 15px;
    width: 36px;
    height: 36px;
    font-size: 20px;
  }
}
</style>
