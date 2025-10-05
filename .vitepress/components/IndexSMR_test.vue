<template>
  <div class="index-smr-table-container">
    <table class="index-smr-table">
      <thead>
        <tr>
          <th class="index-column">
            <span class="animated-icon">⚡</span>
          </th>
          <th>Сигналы</th>
          <th class="points-column">Точки</th>
          <th>Отзывы</th>
          <th>Статус</th>
          <th>Потенциал</th>
          <th><a class="header-link" href="/smr#зерно-→-выручка">Тип зерна</a></th>
          <th><a class="header-link" href="/smr#зерно-→-выручка">Поставщик</a></th>
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
            <a v-if="isInCalculator(coffee.name)" href="/invest/calc" class="badge badge-calculator" title="Рассчитать потенциал роста">
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

  <Teleport to="body">
    <div v-if="showReviewsModal" class="reviews-modal-backdrop" @click="closeReviewsModal">
      <!-- Кнопка закрытия вынесена наружу -->
      <button @click="closeReviewsModal" class="reviews-modal-close-btn" aria-label="Закрыть">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
        </svg>
      </button>
      
      <div class="reviews-modal-container" @click.stop>
        <KorzhWidget :is-modal="false" @close="closeReviewsModal" />
      </div>
    </div>
  </Teleport>
</template>

<script>
import { ref } from 'vue'
import KorzhWidget from './KorzhWidget.vue'

export default {
  name: 'IndexSMR',
  components: {
    KorzhWidget
  },
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
        'Лидер 👑', 'Сильный 💪', 'Растущий 📈', 'Стабильный 🎯', 'Вне игры 🚫'
      ],
      calculatorShops: [
        'Balance coffee', 'Bonfix', 'Булка нетто', 'Coffee Bean', 'Cup-cup',
        'Дринкит', 'Кофеваркин', 'Корж', 'Lumos barista lab', 'MB Cafe',
        'Mosaic coffee&tea', 'Skuratov Coffee', 'Surf Coffee', 'Uco Coffee Roaster',
        'Vandal coffee', 'White Cup', 'Хюггешная', 'Юни'
      ],
      dessertLeaders: ['Корж', 'Этажи', 'Muwa', 'Конфитюр', 'Coffee Bean', 'Shu Authentic Coffee'],
      otherDesserts: ['Булка нетто', 'Lumos barista lab', 'Комод', 'Хюггешная', 'Кофейная поляна', 'Дринкит'],
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
        { index:45,  name:'Coffee Bean', reviews:'1,703', points:2,  scale:'~2+', status:'Растущий 📈', supplier:'LEON (Coffee Bean)', beanType:'Коммерция 📦', type:'Локальная', potential:'Средний', stage:'Рост', innovation:'Средняя', influence:'Низкое', growth:'Низкий' },
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
    }
  }
}
</script>

<style scoped>
/* Стили таблицы */
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

/* НОВЫЕ СТИЛИ ДЛЯ НАЗВАНИЙ */
.coffee-name-clickable {
  color: var(--vp-c-brand-2, #C5F946);
  text-decoration: none;
  border-bottom: 1px solid transparent;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}
.coffee-name-clickable:hover {
  color: var(--vp-c-brand-1, #347b6c);
  border-bottom-color: var(--vp-c-brand-1, #347b6c);
}
.coffee-name-regular {
  color: inherit;
  font-weight: 600;
  cursor: default;
  text-decoration: none;
  border: none;
}

/* Стили модального окна */
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

/* Кнопка закрытия вынесена наружу */
.reviews-modal-close-btn {
  position: fixed;
  top: 24px;
  right: 24px;
  width: 44px;
  height: 44px;
  background: var(--vp-c-bg-mute);
  border: 2px solid var(--vp-c-border);
  border-radius: 50%;
  color: var(--vp-c-text-2);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  z-index: 10001;
}

.reviews-modal-close-btn:hover {
  background: var(--vp-c-bg-soft);
  border-color: var(--vp-c-text-2);
  color: white;
  transform: scale(1.05);
}

.reviews-modal-container {
  background: var(--vp-c-bg);
  border-radius: 20px;
  width: 850px;
  max-width: 95vw;
  max-height: calc(100vh - 40px);
  position: relative;
  box-shadow: 0 25px 80px rgba(0, 0, 0, 0.4);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center; /* ДОБАВИТЬ: центрирование по горизонтали */
  justify-content: flex-start; /* ДОБАВИТЬ: выравнивание сверху */
}


/* Badge стили */
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
    padding: 10px; 
  }
  
  .reviews-modal-close-btn {
    top: 16px;
    right: 12px;
    width: 40px;
    height: 40px;
  }
  
  .reviews-modal-container {
    width: 100%;
    max-width: 100%;
    max-height: calc(100vh - 20px);
    border-radius: 15px;
  }
}

@media (max-width: 640px) {
  .reviews-modal-backdrop { 
    padding: 5px; 
  }
  
  .reviews-modal-close-btn {
    top: 8px;
    right: 8px;
  }
  
  .reviews-modal-container {
    border-radius: 12px;
    max-height: calc(100vh - 10px);
  }
}
</style>
