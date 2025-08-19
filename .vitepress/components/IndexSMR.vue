<template>
  <div class="index-smr-table-container">
    <table class="index-smr-table">
      <thead>
        <tr>
          <th>Значок</th>
          <th>Индекс</th>
          <th>Кофейня</th>
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
          v-for="(coffee, idx) in coffeeData"
          :key="`${coffee.name}-${coffee.index}`"
          :class="{
            'golden-row': idx < 6,
          }"
        >
          <td>
            <span :class="iconClass(coffee.icon)">{{ coffee.icon }}</span>
          </td>
          <td class="cell-center">{{ coffee.index }}</td>
          <td class="cell-left">{{ coffee.name }}</td>
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
      coffeeData: [
        { icon:'🟡', index:98,  name:'Корж',               points:8,  scale:'~12+', status:'Лидер 👑', type:'Независимая сеть',    potential:'Высокий',   stage:'Экспансия', innovation:'Высокая', influence:'Высокое', growth:'Очень высокий' },
        { icon:'🔴', index:96,  name:'Skuratov Coffee',    points:6,  scale:'~10+', status:'Лидер 👑', type:'Независимая сеть',    potential:'Высокий',   stage:'Экспансия', innovation:'Высокая', influence:'Высокое', growth:'Высокий' },
        { icon:'🔴', index:93,  name:'Surf Coffee',        points:3,  scale:'~8+',  status:'Лидер 👑', type:'Сеть (франшиза)',     potential:'Высокий',   stage:'Экспансия', innovation:'Средняя', influence:'Высокое', growth:'Высокий' },
        { icon:'🟡', index:91,  name:'Mosaic coffee&tea',  points:7,  scale:'~11+', status:'Лидер 👑', type:'Независимая сеть',    potential:'Высокий',   stage:'Экспансия', innovation:'Высокая', influence:'Высокое', growth:'Высокий' },
        { icon:'🔴', index:83,  name:'Stars Coffee',       points:3,  scale:'~8+',  status:'Лидер 👑', type:'Сеть (франшиза)',     potential:'Высокий',   stage:'Экспансия', innovation:'Средняя', influence:'Высокое', growth:'Высокий' },
        { icon:'🟡', index:81,  name:'Дринкит',            points:3,  scale:'~8+',  status:'Лидер 👑', type:'Сеть (франшиза)',     potential:'Высокий',   stage:'Рост',      innovation:'Высокая', influence:'Среднее', growth:'Высокий' },
        { icon:'🟡', index:78,  name:'Uco Coffee Roaster', points:2,  scale:'~4+',  status:'Сильный 💪', type:'Локальное заведение', potential:'Средний', stage:'Рост',      innovation:'Высокая', influence:'Среднее', growth:'Высокий' },
        { icon:'🟡', index:75,  name:'White Cup',          points:2,  scale:'~3+',  status:'Сильный 💪', type:'Локальное заведение', potential:'Средний', stage:'Зрелость',  innovation:'Средняя', influence:'Среднее', growth:'Средний' },
        { icon:'🟢', index:67,  name:'8 Атомов',           points:1,  scale:'~2+',  status:'Сильный 💪', type:'Локальное заведение', potential:'Средний', stage:'Рост',      innovation:'Высокая', influence:'Среднее', growth:'Высокий' },
        { icon:'🔴', index:65,  name:'Vandal coffee',      points:3,  scale:'~5+',  status:'Сильный 💪', type:'Локальное заведение', potential:'Средний', stage:'Рост',      innovation:'Высокая', influence:'Низкое', growth:'Высокий' },
        { icon:'🟡', index:63,  name:'Lumos barista lab',  points:2,  scale:'~4+',  status:'Сильный 💪', type:'Локальное заведение', potential:'Средний', stage:'Рост',      innovation:'Высокая', influence:'Низкое',  growth:'Средний' },
        { icon:'🔴', index:58,  name:'Muwa',               points:1,  scale:'~2+',  status:'Растущий 📈', type:'Локальное заведение', potential:'Средний', stage:'Рост',      innovation:'Высокая', influence:'Среднее',  growth:'Средний' },
        { icon:'🔴', index:57,  name:'Cofix',              points:5,  scale:'~7+',  status:'Растущий 📈', type:'Сеть (франшиза)',     potential:'Средний', stage:'Рост',      innovation:'Низкая',  influence:'Низкое',  growth:'Средний' },
        { icon:'🔴', index:55,  name:'Green Stag Roasters',points:1,  scale:'~3+',  status:'Растущий 📈', type:'Локальное заведение', potential:'Средний', stage:'Рост',      innovation:'Высокая', influence:'Среднее',  growth:'Высокий' },
        { icon:'🔴', index:55,  name:'Shu Authentic Coffee',points:1, scale:'~2+',  status:'Растущий 📈', type:'Локальное заведение', potential:'Средний', stage:'Рост',      innovation:'Высокая', influence:'Среднее',  growth:'Высокий' },
        { icon:'🔴', index:53,  name:'Cup-cup',            points:8,  scale:'стагнация', status:'Растущий 📈', type:'Независимая сеть', potential:'Низкий', stage:'Зрелость', innovation:'Низкая', influence:'Среднее',  growth:'Низкий' },
        { icon:'🔴', index:52,  name:'Хюггешная',          points:4,  scale:'~6+',  status:'Растущий 📈', type:'Локальное заведение', potential:'Средний', stage:'Рост',      innovation:'Средняя', influence:'Среднее',  growth:'Средний' },
        { icon:'🔴', index:50,  name:'Булка нетто',        points:3,  scale:'~5+',  status:'Растущий 📈', type:'Локальное заведение', potential:'Средний', stage:'Рост',      innovation:'Средняя', influence:'Низкое',   growth:'Средний' },
        { icon:'🔴', index:45,  name:'Coffee Bean',        points:2,  scale:'~3+',  status:'Растущий 📈', type:'Локальное заведение', potential:'Средний', stage:'Рост',      innovation:'Средняя', influence:'Низкое',   growth:'Низкий' },
        { icon:'🔴', index:45,  name:'MB Cafe',            points:2,  scale:'~3+',  status:'Растущий 📈', type:'Локальное заведение', potential:'Средний', stage:'Рост',      innovation:'Средняя', influence:'Низкое',   growth:'Низкий' },
        { icon:'🔴', index:45,  name:'Bonfix',             points:2,  scale:'~3+',  status:'Растущий 📈', type:'Локальное заведение', potential:'Средний', stage:'Рост',      innovation:'Средняя', influence:'Низкое',   growth:'Низкий' },
        { icon:'🔴', index:45,  name:'Coffetino',          points:2,  scale:'~3+',  status:'Растущий 📈', type:'Локальное заведение', potential:'Средний', stage:'Рост',      innovation:'Средняя', influence:'Низкое',   growth:'Низкий' },
        { icon:'🔴', index:45,  name:'Кофейный лис',       points:2,  scale:'~3+',  status:'Растущий 📈', type:'Локальное заведение', potential:'Средний', stage:'Рост',      innovation:'Средняя', influence:'Низкое',   growth:'Низкий' },
        { icon:'🔴', index:41,  name:'Юни',                points:3,  scale:'~5+',  status:'Растущий 📈', type:'Локальное заведение', potential:'Низкий',  stage:'Рост',      innovation:'Средняя', influence:'Низкое',   growth:'Низкий' },
        { icon:'🔴', index:39,  name:'Coffee Like',        points:3,  scale:'~6+',  status:'Начинающий 🚀', type:'Локальное заведение', potential:'Низкий',  stage:'Экспансия', innovation:'Низкая', influence:'Низкое',   growth:'Низкий' },
        { icon:'🔴', index:40,  name:'Balance coffee',     points:1,  scale:'1+',   status:'Растущий 📈', type:'Локальное заведение', potential:'Средний', stage:'Стартап',   innovation:'Средняя', influence:'Низкое',   growth:'Высокий' },
        { icon:'🔴', index:40,  name:'Days Coffee',        points:1,  scale:'1+',   status:'Растущий 📈', type:'Локальное заведение', potential:'Средний', stage:'Рост',      innovation:'Средняя', influence:'Низкое',   growth:'Средний' },
        { icon:'🔴', index:40,  name:'Twinz',              points:1,  scale:'1+',   status:'Растущий 📈', type:'Локальное заведение', potential:'Средний', stage:'Рост',      innovation:'Средняя', influence:'Низкое',   growth:'Средний' },
        { icon:'🔴', index:40,  name:'Ягоза',              points:1,  scale:'1+',   status:'Растущий 📈', type:'Локальное заведение', potential:'Средний', stage:'Рост',      innovation:'Средняя', influence:'Низкое',   growth:'Средний' },
        { icon:'🔴', index:40,  name:'Тепло',              points:1,  scale:'1+',   status:'Растущий 📈', type:'Локальное заведение', potential:'Средний', stage:'Рост',      innovation:'Средняя', influence:'Низкое',   growth:'Средний' },
        { icon:'🔴', index:40,  name:'Комод',              points:1,  scale:'1+',   status:'Растущий 📈', type:'Локальное заведение', potential:'Средний', stage:'Рост',      innovation:'Средняя', influence:'Низкое',   growth:'Средний' },
        { icon:'🔴', index:40,  name:'Конфитюр',           points:1,  scale:'1+',   status:'Растущий 📈', type:'Локальное заведение', potential:'Средний', stage:'Рост',      innovation:'Средняя', influence:'Низкое',   growth:'Средний' },
        { icon:'🔴', index:40,  name:'КоЗа',               points:1,  scale:'1+',   status:'Растущий 📈', type:'Локальное заведение', potential:'Средний', stage:'Рост',      innovation:'Средняя', influence:'Низкое',   growth:'Средний' },
        { icon:'🔴', index:40,  name:'Komkofe',            points:1,  scale:'1+',   status:'Растущий 📈', type:'Локальное заведение', potential:'Средний', stage:'Рост',      innovation:'Средняя', influence:'Низкое',   growth:'Средний' },
        { icon:'🔴', index:40,  name:'Сойка',              points:1,  scale:'1+',   status:'Растущий 📈', type:'Локальное заведение', potential:'Средний', stage:'Рост',      innovation:'Средняя', influence:'Низкое',   growth:'Средний' },
        { icon:'🔴', index:40,  name:'Black milk',         points:1,  scale:'1+',   status:'Растущий 📈', type:'Локальное заведение', potential:'Средний', stage:'Рост',      innovation:'Средняя', influence:'Низкое',   growth:'Средний' },
        { icon:'🔴', index:40,  name:'One Price Coffee',   points:1,  scale:'1+',   status:'Растущий 📈', type:'Локальное заведение', potential:'Средний', stage:'Рост',      innovation:'Средняя', influence:'Низкое',   growth:'Средний' },
        { icon:'🔴', index:40,  name:'Art Coffee',         points:1,  scale:'1+',   status:'Растущий 📈', type:'Локальное заведение', potential:'Средний', stage:'Рост',      innovation:'Средняя', influence:'Низкое',   growth:'Средний' },
        { icon:'🔴', index:40,  name:'Coffee cake',        points:1,  scale:'1+',   status:'Растущий 📈', type:'Локальное заведение', potential:'Средний', stage:'Рост',      innovation:'Средняя', influence:'Низкое',   growth:'Средний' },
        { icon:'🔴', index:40,  name:'Этажи',              points:1,  scale:'1+',   status:'Растущий 📈', type:'Локальное заведение', potential:'Средний', stage:'Рост',      innovation:'Средняя', influence:'Низкое',   growth:'Средний' },
        { icon:'🔴', index:40,  name:'Кофейная поляна',    points:1,  scale:'1+',   status:'Растущий 📈', type:'Локальное заведение', potential:'Средний', stage:'Рост',      innovation:'Средняя', influence:'Низкое',   growth:'Средний' },
        { icon:'🔴', index:40,  name:'Фартук',             points:1,  scale:'1+',   status:'Растущий 📈', type:'Локальное заведение', potential:'Средний', stage:'Рост',      innovation:'Средняя', influence:'Низкое',   growth:'Средний' },
        { icon:'🔴', index:40,  name:'Pluma',              points:1,  scale:'1+',   status:'Растущий 📈', type:'Локальное заведение', potential:'Средний', stage:'Рост',      innovation:'Средняя', influence:'Низкое',   growth:'Средний' },
        { icon:'🔴', index:40,  name:'Хюггешная',          points:4,  scale:'1+',   status:'Растущий 📈', type:'Локальное заведение', potential:'Средний', stage:'Рост',      innovation:'Средняя', influence:'Низкое',   growth:'Средний' },
        { icon:'🔴', index:35,  name:'Coffee Balance',     points:1,  scale:'1+',   status:'Начинающий 🚀', type:'Локальное заведение', potential:'Низкий',  stage:'Стартап',   innovation:'Низкая',  influence:'Низкое',   growth:'Средний' },
        { icon:'🔴', index:30,  name:'Толстой',            points:1,  scale:'стагнация', status:'Начинающий 🚀', type:'Локальное заведение', potential:'Низкий',  stage:'Зрелость',  innovation:'Низкая', influence:'Низкое',   growth:'Низкий' },
        { icon:'🔴', index:30,  name:'Coffee time',        points:1,  scale:'стагнация', status:'Начинающий 🚀', type:'Локальное заведение', potential:'Низкий',  stage:'Зрелость',  innovation:'Низкая', influence:'Низкое',   growth:'Низкий' },
        { icon:'🔴', index:30,  name:'Точка притяжения',   points:1,  scale:'стагнация', status:'Начинающий 🚀', type:'Локальное заведение', potential:'Низкий',  stage:'Зрелость',  innovation:'Низкая', influence:'Низкое',   growth:'Низкий' },
        { icon:'🔴', index:30,  name:'Капуч',              points:1,  scale:'стагнация', status:'Начинающий 🚀', type:'Локальное заведение', potential:'Низкий',  stage:'Зрелость',  innovation:'Низкая', influence:'Низкое',   growth:'Низкий' },
        { icon:'🔴', index:30,  name:'Кофеваркин',         points:1,  scale:'стагнация', status:'Начинающий 🚀', type:'Локальное заведение', potential:'Низкий',  stage:'Зрелость',  innovation:'Низкая', influence:'Низкое',   growth:'Низкий' },
        { icon:'🔴', index:30,  name:'Белый кот',          points:1,  scale:'стагнация', status:'Начинающий 🚀', type:'Локальное заведение', potential:'Низкий',  stage:'Зрелость',  innovation:'Низкая', influence:'Низкое',   growth:'Низкий' },
        { icon:'🔴', index:30,  name:'Cup to cup',         points:1,  scale:'стагнация', status:'Начинающий 🚀', type:'Локальное заведение', potential:'Низкий',  stage:'Зрелость',  innovation:'Низкая', influence:'Низкое',   growth:'Низкий' },
        { icon:'🔴', index:30,  name:'Котель',             points:1,  scale:'стагнация', status:'Начинающий 🚀', type:'Локальное заведение', potential:'Низкий',  stage:'Зрелость',  innovation:'Низкая', influence:'Низкое',   growth:'Низкий' },
        { icon:'🔴', index:30,  name:'Coffee inn',         points:1,  scale:'стагнация', status:'Начинающий 🚀', type:'Локальное заведение', potential:'Низкий',  stage:'Зрелость',  innovation:'Низкая', influence:'Низкое',   growth:'Низкий' },
        { icon:'🔴', index:30,  name:'Coffee Cup',         points:1,  scale:'стагнация', status:'Начинающий 🚀', type:'Локальное заведение', potential:'Низкий',  stage:'Зрелость',  innovation:'Низкая', influence:'Низкое',   growth:'Низкий' },
        { icon:'🔴', index:30,  name:'Cappuccino cup',     points:1,  scale:'стагнация', status:'Начинающий 🚀', type:'Локальное заведение', potential:'Низкий',  stage:'Зрелость',  innovation:'Низкая', influence:'Низкое',   growth:'Низкий' },
        { icon:'🔴', index:25,  name:'New coffee',         points:1,  scale:'стагнация', status:'Начинающий 🚀', type:'Локальное заведение', potential:'Низкий',  stage:'Стартап',   innovation:'Низкая', influence:'Низкое',   growth:'Средний' }
      ]
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
  background: var(--vp-c-bg-soft, #f8fafc);
  text-transform: uppercase;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 1px;
  color: var(--vp-c-text-2, #64748b);
  border-bottom: 1px solid var(--vp-c-divider, #e5e7eb);
  padding: 12px 10px;
  white-space: nowrap;
}

.index-smr-table td {
  padding: 10px 8px;
  border-bottom: 1px solid var(--vp-c-divider, #e5e7eb);
  font-size: 15px;
  background: none;
  transition: background 0.12s;
  color: var(--vp-c-text-1, #1e293b);
}

.index-smr-table tbody tr:hover {
  background: var(--vp-c-bg-mute, #f3f4f6);
}

.golden-row {
  background: linear-gradient(90deg,rgba(255,224,82,0.06) 0%,rgba(255,226,120,0.01) 100%);
}

.index-smr-table th,
.index-smr-table td {
  box-sizing: border-box;
}

/* Центрирование для числовых и коротких данных */
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
  color: #fbbf24; /* gold */
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
    min-width: 840px;
  }
}
@media (max-width: 760px) {
  .index-smr-table th,
  .index-smr-table td {
    padding: 7px 6px;
    font-size: 12px;
  }
  .index-smr-table {
    min-width: 670px;
  }
}
@media (max-width: 480px) {
  .index-smr-table th,
  .index-smr-table td {
    padding: 5px 4px;
    font-size: 11px;
  }
  .index-smr-table {
    min-width: 610px;
  }
}
</style>
