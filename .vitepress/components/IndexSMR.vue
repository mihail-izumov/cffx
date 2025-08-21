<template>
  <div class="index-smr-table-container">
    <table class="index-smr-table">
      <thead>
        <tr>
          <th>Кофейня</th>
          <th>Индекс</th>
          <th>Отзывы</th>
          <th>Точки</th>
          <th>Масштаб</th>
          <th>Статус</th>
          <th>Тип</th>
          <th>Потенциал</th>
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
          :class="{ 'golden-row': idx < 6 }"
        >
          <td class="cell-left nowrap">
            <span :class="iconClass(coffee.icon)">{{ coffee.icon }}</span>
            {{ coffee.name }}
          </td>
          <td class="cell-center">{{ coffee.index }}</td>
          <td class="cell-center">{{ coffee.reviews }}</td>
          <td class="cell-center">{{ coffee.points }}</td>
          <td class="cell-center">{{ coffee.scale }}</td>
          <td class="cell-nowrap">{{ coffee.status }}</td>
          <td class="cell-left">{{ coffee.type }}</td>
          <td class="cell-center">{{ coffee.potential }}</td>
          <td class="cell-center">{{ coffee.stage }}</td>
          <td class="cell-center">{{ coffee.innovation }}</td>
          <td class="cell-center">{{ coffee.influence }}</td>
          <td class="cell-center">{{ coffee.growth }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'IndexSMR',
  data() {
    return {
      statusOrder: [
        'Лидер 👑',
        'Сильный 💪', 
        'Растущий 📈',
        'Начинающий 🚀',
        'Вне игры 🚫'
      ],
      coffeeData: [
        { icon:'🟡', index:98,  name:'Корж', reviews:'4,520', points:8,  scale:'~12+', status:'Лидер 👑', type:'Независимая сеть', potential:'Высокий', stage:'Экспансия', innovation:'Высокая', influence:'Высокое', growth:'Очень высокий' },
        { icon:'🔴', index:96,  name:'Skuratov Coffee', reviews:'3,129', points:6,  scale:'~10+', status:'Лидер 👑', type:'Независимая сеть', potential:'Высокий', stage:'Экспансия', innovation:'Высокая', influence:'Высокое', growth:'Высокий' },
        { icon:'🔴', index:93,  name:'Surf Coffee', reviews:'925', points:3,  scale:'~8+', status:'Лидер 👑', type:'Сеть (франшиза)', potential:'Высокий', stage:'Экспансия', innovation:'Средняя', influence:'Высокое', growth:'Высокий' },
        { icon:'🟡', index:91,  name:'Mosaic coffee&tea', reviews:'2,231', points:14,  scale:'~19+', status:'Лидер 👑', type:'Независимая сеть', potential:'Высокий', stage:'Экспансия', innovation:'Высокая', influence:'Высокое', growth:'Высокий' },
        { icon:'🔴', index:83,  name:'Stars Coffee', reviews:'405', points:3,  scale:'~8+', status:'Лидер 👑', type:'Сеть (франшиза)', potential:'Высокий', stage:'Экспансия', innovation:'Средняя', influence:'Высокое', growth:'Высокий' },
        { icon:'🟡', index:81,  name:'Дринкит', reviews:'763', points:2,  scale:'~8+', status:'Лидер 👑', type:'Сеть (франшиза)', potential:'Высокий', stage:'Рост', innovation:'Высокая', influence:'Среднее', growth:'Высокий' },
        { icon:'🟡', index:78,  name:'Uco Coffee Roaster', reviews:'209', points:2,  scale:'~4+', status:'Сильный 💪', type:'Локальное заведение', potential:'Средний', stage:'Рост', innovation:'Высокая', influence:'Среднее', growth:'Высокий' },
        { icon:'🟡', index:75,  name:'White Cup', reviews:'646', points:2,  scale:'~3+', status:'Сильный 💪', type:'Локальное заведение', potential:'Средний', stage:'Зрелость', innovation:'Средняя', influence:'Среднее', growth:'Средний' },
        { icon:'🟢', index:67,  name:'8 Атомов', reviews:'34', points:1,  scale:'~2+', status:'Сильный 💪', type:'Локальное заведение', potential:'Средний', stage:'Рост', innovation:'Высокая', influence:'Среднее', growth:'Высокий' },
        { icon:'🔴', index:65,  name:'Vandal coffee', reviews:'273', points:3,  scale:'~5+', status:'Сильный 💪', type:'Локальное заведение', potential:'Средний', stage:'Рост', innovation:'Высокая', influence:'Низкое', growth:'Высокий' },
        { icon:'🟡', index:63,  name:'Lumos barista lab', reviews:'303', points:2,  scale:'~4+', status:'Сильный 💪', type:'Локальное заведение', potential:'Средний', stage:'Рост', innovation:'Высокая', influence:'Низкое', growth:'Средний' },
        { icon:'🔴', index:57,  name:'Cofix', reviews:'253', points:5,  scale:'~7+', status:'Растущий 📈', type:'Сеть (франшиза)', potential:'Средний', stage:'Рост', innovation:'Низкая', influence:'Низкое', growth:'Средний' },
        { icon:'🔴', index:55,  name:'Green Stag Roasters', reviews:'119', points:1,  scale:'~3+', status:'Растущий 📈', type:'Локальное заведение', potential:'Средний', stage:'Рост', innovation:'Высокая', influence:'Среднее', growth:'Высокий' },
        { icon:'🔴', index:55,  name:'Shu Authentic Coffee', reviews:'151', points:1, scale:'~2+', status:'Растущий 📈', type:'Локальное заведение', potential:'Средний', stage:'Рост', innovation:'Высокая', influence:'Среднее', growth:'Высокий' },
        { icon:'🔴', index:53,  name:'Cup-cup', reviews:'1,505', points:20,  scale:'~27+', status:'Растущий 📈', type:'Независимая сеть', potential:'Низкий', stage:'Зрелость', innovation:'Низкая', influence:'Среднее', growth:'Низкий' },
        { icon:'🔴', index:52,  name:'Хюггешная', reviews:'885', points:6,  scale:'~6+', status:'Растущий 📈', type:'Локальное заведение', potential:'Средний', stage:'Рост', innovation:'Средняя', influence:'Среднее', growth:'Средний' },
        { icon:'🔴', index:50,  name:'Булка нетто', reviews:'771', points:3,  scale:'~5+', status:'Растущий 📈', type:'Локальное заведение', potential:'Средний', stage:'Рост', innovation:'Средняя', influence:'Низкое', growth:'Средний' },
        { icon:'🔴', index:45,  name:'Coffee Bean', reviews:'1,703', points:1,  scale:'~2+', status:'Растущий 📈', type:'Локальное заведение', potential:'Средний', stage:'Рост', innovation:'Средняя', influence:'Низкое', growth:'Низкий' },
        { icon:'🔴', index:45,  name:'MB Cafe', reviews:'199', points:2,  scale:'~3+', status:'Растущий 📈', type:'Локальное заведение', potential:'Средний', stage:'Рост', innovation:'Средняя', influence:'Низкое', growth:'Низкий' },
        { icon:'🔴', index:45,  name:'Bonfix', reviews:'143', points:2,  scale:'~3+', status:'Растущий 📈', type:'Локальное заведение', potential:'Средний', stage:'Рост', innovation:'Средняя', influence:'Низкое', growth:'Низкий' },
        { icon:'🔴', index:45,  name:'Coffetino', reviews:'186', points:2,  scale:'~3+', status:'Растущий 📈', type:'Локальное заведение', potential:'Средний', stage:'Рост', innovation:'Средняя', influence:'Низкое', growth:'Низкий' },
        { icon:'🔴', index:45,  name:'Кофейный лис', reviews:'47', points:2,  scale:'~3+', status:'Растущий 📈', type:'Локальное заведение', potential:'Средний', stage:'Рост', innovation:'Средняя', influence:'Низкое', growth:'Низкий' },
        { icon:'🔴', index:41,  name:'Юни', reviews:'376', points:3,  scale:'~5+', status:'Растущий 📈', type:'Локальное заведение', potential:'Низкий', stage:'Рост', innovation:'Средняя', influence:'Низкое', growth:'Низкий' },
        { icon:'🔴', index:40,  name:'Balance coffee', reviews:'147', points:1,  scale:'1+', status:'Растущий 📈', type:'Локальное заведение', potential:'Средний', stage:'Стартап', innovation:'Средняя', influence:'Низкое', growth:'Высокий' },
        { icon:'🔴', index:40,  name:'Days Coffee', reviews:'15', points:1,  scale:'1+', status:'Растущий 📈', type:'Локальное заведение', potential:'Средний', stage:'Рост', innovation:'Средняя', influence:'Низкое', growth:'Средний' },
        { icon:'🔴', index:40,  name:'Ягоза', reviews:'437', points:1,  scale:'1+', status:'Растущий 📈', type:'Локальное заведение', potential:'Средний', stage:'Рост', innovation:'Средняя', influence:'Низкое', growth:'Средний' },
        { icon:'🔴', index:40,  name:'Тепло', reviews:'789', points:1,  scale:'1+', status:'Растущий 📈', type:'Локальное заведение', potential:'Средний', stage:'Рост', innovation:'Средняя', influence:'Низкое', growth:'Средний' },
        { icon:'🔴', index:40,  name:'Комод', reviews:'1,783', points:1,  scale:'1+', status:'Растущий 📈', type:'Локальное заведение', potential:'Средний', stage:'Рост', innovation:'Средняя', influence:'Низкое', growth:'Средний' },
        { icon:'🔴', index:40,  name:'Конфитюр', reviews:'946', points:1,  scale:'1+', status:'Растущий 📈', type:'Локальное заведение', potential:'Средний', stage:'Рост', innovation:'Средняя', influence:'Низкое', growth:'Средний' },
        { icon:'🔴', index:40,  name:'КоЗа', reviews:'215', points:1,  scale:'1+', status:'Растущий 📈', type:'Локальное заведение', potential:'Средний', stage:'Рост', innovation:'Средняя', influence:'Низкое', growth:'Средний' },
        { icon:'🔴', index:40,  name:'Komkofe', reviews:'465', points:1,  scale:'1+', status:'Растущий 📈', type:'Локальное заведение', potential:'Средний', stage:'Рост', innovation:'Средняя', influence:'Низкое', growth:'Средний' },
        { icon:'🔴', index:40,  name:'Сойка', reviews:'292', points:1,  scale:'1+', status:'Растущий 📈', type:'Локальное заведение', potential:'Средний', stage:'Рост', innovation:'Средняя', influence:'Низкое', growth:'Средний' },
        { icon:'🔴', index:40,  name:'Black milk', reviews:'153', points:1,  scale:'1+', status:'Растущий 📈', type:'Локальное заведение', potential:'Средний', stage:'Рост', innovation:'Средняя', influence:'Низкое', growth:'Средний' },
        { icon:'🔴', index:40,  name:'One Price Coffee', reviews:'42', points:1,  scale:'1+', status:'Растущий 📈', type:'Локальное заведение', potential:'Средний', stage:'Рост', innovation:'Средняя', influence:'Низкое', growth:'Средний' },
        { icon:'🔴', index:40,  name:'Art Coffee', reviews:'57', points:1,  scale:'1+', status:'Растущий 📈', type:'Локальное заведение', potential:'Средний', stage:'Рост', innovation:'Средняя', influence:'Низкое', growth:'Средний' },
        { icon:'🔴', index:40,  name:'Coffee cake', reviews:'947', points:1,  scale:'1+', status:'Растущий 📈', type:'Локальное заведение', potential:'Средний', stage:'Рост', innovation:'Средняя', influence:'Низкое', growth:'Средний' },
        { icon:'🔴', index:40,  name:'Этажи', reviews:'904', points:1,  scale:'1+', status:'Растущий 📈', type:'Локальное заведение', potential:'Средний', stage:'Рост', innovation:'Средняя', influence:'Низкое', growth:'Средний' },
        { icon:'🔴', index:40,  name:'Кофейная поляна', reviews:'629', points:3,  scale:'1+', status:'Растущий 📈', type:'Локальное заведение', potential:'Средний', stage:'Рост', innovation:'Средняя', influence:'Низкое', growth:'Средний' },
        { icon:'🔴', index:40,  name:'Pluma', reviews:'93', points:1,  scale:'1+', status:'Растущий 📈', type:'Локальное заведение', potential:'Средний', stage:'Рост', innovation:'Средняя', influence:'Низкое', growth:'Средний' },
        { icon:'🔴', index:39,  name:'Coffee Like', reviews:'170', points:3,  scale:'~6+', status:'Начинающий 🚀', type:'Локальное заведение', potential:'Низкий', stage:'Экспансия', innovation:'Низкая', influence:'Низкое', growth:'Низкий' },
        { icon:'🔴', index:30,  name:'Толстой', reviews:'398', points:1,  scale:'стагнация', status:'Начинающий 🚀', type:'Локальное заведение', potential:'Низкий', stage:'Зрелость', innovation:'Низкая', influence:'Низкое', growth:'Низкий' },
        { icon:'🔴', index:30,  name:'Coffee time', reviews:'70', points:1,  scale:'стагнация', status:'Начинающий 🚀', type:'Локальное заведение', potential:'Низкий', stage:'Зрелость', innovation:'Низкая', influence:'Низкое', growth:'Низкий' },
        { icon:'🔴', index:30,  name:'Точка притяжения', reviews:'122', points:1,  scale:'стагнация', status:'Начинающий 🚀', type:'Локальное заведение', potential:'Низкий', stage:'Зрелость', innovation:'Низкая', influence:'Низкое', growth:'Низкий' },
        { icon:'🔴', index:30,  name:'Капуч', reviews:'65', points:1,  scale:'стагнация', status:'Начинающий 🚀', type:'Локальное заведение', potential:'Низкий', stage:'Зрелость', innovation:'Низкая', influence:'Низкое', growth:'Низкий' },
        { icon:'🔴', index:30,  name:'Кофеваркин', reviews:'185', points:1,  scale:'стагнация', status:'Начинающий 🚀', type:'Локальное заведение', potential:'Низкий', stage:'Зрелость', innovation:'Низкая', influence:'Низкое', growth:'Низкий' },
        { icon:'🔴', index:30,  name:'Белый кот', reviews:'50', points:1,  scale:'стагнация', status:'Начинающий 🚀', type:'Локальное заведение', potential:'Низкий', stage:'Зрелость', innovation:'Низкая', influence:'Низкое', growth:'Низкий' },
        { icon:'🔴', index:30,  name:'Cup to cup', reviews:'342', points:1,  scale:'стагнация', status:'Начинающий 🚀', type:'Локальное заведение', potential:'Низкий', stage:'Зрелость', innovation:'Низкая', influence:'Низкое', growth:'Низкий' },
        { icon:'🔴', index:30,  name:'Котель', reviews:'158', points:1,  scale:'стагнация', status:'Начинающий 🚀', type:'Локальное заведение', potential:'Низкий', stage:'Зрелость', innovation:'Низкая', influence:'Низкое', growth:'Низкий' },
        { icon:'🔴', index:30,  name:'Coffee inn', reviews:'138', points:1,  scale:'стагнация', status:'Начинающий 🚀', type:'Локальное заведение', potential:'Низкий', stage:'Зрелость', innovation:'Низкая', influence:'Низкое', growth:'Низкий' },
        { icon:'🔴', index:30,  name:'Coffee Cup', reviews:'114', points:2,  scale:'стагнация', status:'Начинающий 🚀', type:'Локальное заведение', potential:'Низкий', stage:'Зрелость', innovation:'Низкая', influence:'Низкое', growth:'Низкий' },
        { icon:'🔴', index:30,  name:'Cappuccino cup', reviews:'132', points:1,  scale:'стагнация', status:'Начинающий 🚀', type:'Локальное заведение', potential:'Низкий', stage:'Зрелость', innovation:'Низкая', influence:'Низкое', growth:'Низкий' },
        { icon:'🔴', index:25,  name:'New coffee', reviews:'203', points:1,  scale:'стагнация', status:'Начинающий 🚀', type:'Локальное заведение', potential:'Низкий', stage:'Стартап', innovation:'Низкая', influence:'Низкое', growth:'Средний' },
        { icon:'🔴', index:58,  name:'Muwa', reviews:'672', points:1,  scale:'~2+', status:'Вне игры 🚫', type:'Локальное заведение', potential:'Средний', stage:'Рост', innovation:'Высокая', influence:'Среднее', growth:'Средний' },
        { icon:'🔴', index:40,  name:'Twinz', reviews:'115', points:1,  scale:'1+', status:'Вне игры 🚫', type:'Локальное заведение', potential:'Средний', stage:'Рост', innovation:'Средняя', influence:'Низкое', growth:'Средний' }
      ]
    }
  },
  computed: {
    sortedCoffeeData() {
      return [...this.coffeeData].sort((a, b) => {
        // Сначала сортируем по статусу
        const statusOrderA = this.statusOrder.indexOf(a.status)
        const statusOrderB = this.statusOrder.indexOf(b.status)
        
        if (statusOrderA !== statusOrderB) {
          return statusOrderA - statusOrderB
        }
        
        // Если статусы одинаковые, сортируем по индексу (по убыванию)
        return b.index - a.index
      })
    }
  },
  methods: {
    iconClass(icon) {
      if (icon === '🟡') return 'icon-yellow'
      if (icon === '🔴') return 'icon-red'
      if (icon === '🟢') return 'icon-green'
      return ''
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

.index-smr-table th {
  position: sticky;
  top: 0;
  z-index: 2;
  background: var(--vp-c-bg-soft, #222);
  text-transform: uppercase;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 1px;
  color: var(--vp-c-text-2, #888);
  border-bottom: 1px solid var(--vp-c-divider, #333);
  padding: 12px 10px;
  white-space: nowrap;
}

.index-smr-table td {
  padding: 10px 8px;
  border-bottom: 1px solid var(--vp-c-divider, #333);
  font-size: 15px;
  background: none;
  transition: background 0.14s;
  color: var(--vp-c-text-1, #e6e6e6);
}

/* Первый столбец — всегда одна строка, без переноса, не ограничен по ширине */
.index-smr-table th:first-child,
.index-smr-table td:first-child,
.nowrap {
  white-space: nowrap !important;
  max-width: none !important;
  width: auto !important;
}

.index-smr-table tbody tr:hover {
  background: rgba(120,120,120,0.12);
}

.golden-row {
  background: linear-gradient(90deg,rgba(255,230,90,0.05) 0%,rgba(255,226,120,0.0) 100%);
}

.cell-center {
  text-align: center;
}
.cell-left {
  text-align: left;
}
.cell-nowrap {
  white-space: nowrap;
}

.icon-yellow {
  color: #fbbf24;
  font-weight: bold;
}
.icon-red {
  color: #dc2626;
  font-weight: bold;
}
.icon-green {
  color: #22c55e;
  font-weight: bold;
}

/* Адаптивность */
@media (max-width: 1024px) {
  .index-smr-table th,
  .index-smr-table td {
    padding: 9px 7px;
    font-size: 13px;
  }
  .index-smr-table {
    min-width: 900px;
  }
}
@media (max-width: 760px) {
  .index-smr-table th,
  .index-smr-table td {
    padding: 7px 6px;
    font-size: 12px;
  }
  .index-smr-table {
    min-width: 680px;
  }
}
@media (max-width: 480px) {
  .index-smr-table th,
  .index-smr-table td {
    padding: 5px 4px;
    font-size: 11px;
  }
  .index-smr-table {
    min-width: 620px;
  }
}
</style>
