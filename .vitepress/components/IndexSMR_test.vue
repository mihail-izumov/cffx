<template>
  <div class="index-smr-table-container">
    <table class="index-smr-table">
      <thead>
        <tr>
          <th>Кофейня</th>
          <th>Индекс</th>
          <th>Статус</th>
          <th>Точки</th>
          <th>Поставщик</th>
          <th>Тип зерна</th>
          <th>Отзывы</th>
          <th>Масштаб</th>
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
          :class="{ 
            'golden-row': idx < 6,
            'out-of-game-separator': isFirstOutOfGame(coffee, idx)
          }"
        >
          <td class="cell-left nowrap">
            <span :class="iconClass(coffee.icon)">{{ coffee.icon }}</span>
            {{ coffee.name }}
          </td>
          <td class="cell-center">{{ coffee.index }}</td>
          <td class="cell-nowrap">
            <span class="badge-status" :class="statusClass(coffee.status)">
              {{ coffee.status }}
            </span>
          </td>
          <td class="cell-center">{{ coffee.points }}</td>
          <td class="cell-left">{{ coffee.supplier }}</td>
          <td class="cell-left">
            <span class="badge-bean" :class="beanTypeClass(coffee.beanType)">
              {{ coffee.beanType }}
            </span>
          </td>
          <td class="cell-center">{{ coffee.reviews }}</td>
          <td class="cell-center">{{ coffee.scale }}</td>
          <td class="cell-left">
            <span class="badge-param" :class="typeClass(coffee.type)">
              {{ coffee.type }}
            </span>
          </td>
          <td class="cell-left">
            <span class="badge-param" :class="potentialClass(coffee.potential)">
              {{ coffee.potential }}
            </span>
          </td>
          <td class="cell-left">
            <span class="badge-param" :class="stageClass(coffee.stage)">
              {{ coffee.stage }}
            </span>
          </td>
          <td class="cell-left">
            <span class="badge-param" :class="innovationClass(coffee.innovation)">
              {{ coffee.innovation }}
            </span>
          </td>
          <td class="cell-left">
            <span class="badge-param" :class="influenceClass(coffee.influence)">
              {{ coffee.influence }}
            </span>
          </td>
          <td class="cell-left">
            <span class="badge-param" :class="growthClass(coffee.growth)">
              {{ coffee.growth }}
            </span>
          </td>
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
        'Стабильный 🎯',
        'Вне игры 🚫'
      ],
      coffeeData: [
        { icon:'🟡', index:98,  name:'Корж', reviews:'4,520', points:8,  scale:'~12+', status:'Лидер 👑', supplier:'Berry Coffee (Тольятти)', beanType:'Свой бренд 🏷️', type:'Независимая', potential:'Высокий', stage:'Экспансия', innovation:'Высокая', influence:'Высокое', growth:'Очень высокий' },
        { icon:'🔴', index:96,  name:'Skuratov Coffee', reviews:'3,129', points:6,  scale:'~10+', status:'Лидер 👑', supplier:'Skuratov Coffee Roasters', beanType:'Свой бренд 🏷️', type:'Сеть', potential:'Высокий', stage:'Экспансия', innovation:'Высокая', influence:'Высокое', growth:'Высокий' },
        { icon:'🔴', index:93,  name:'Surf Coffee', reviews:'925', points:3,  scale:'~8+', status:'Лидер 👑', supplier:'Surf Coffee Roasters (Иваново)', beanType:'Свой бренд 🏷️', type:'Франшиза', potential:'Высокий', stage:'Экспансия', innovation:'Средняя', influence:'Высокое', growth:'Высокий' },
        { icon:'🟡', index:91,  name:'Mosaic coffee&tea', reviews:'2,231', points:14,  scale:'~19+', status:'Лидер 👑', supplier:'Собственная обжарка', beanType:'Свой бренд 🏷️', type:'Независимая', potential:'Высокий', stage:'Экспансия', innovation:'Высокая', influence:'Высокое', growth:'Высокий' },
        { icon:'🔴', index:83,  name:'Stars Coffee', reviews:'405', points:3,  scale:'~8+', status:'Лидер 👑', supplier:'Stars Coffee Roasters', beanType:'Свой бренд 🏷️', type:'Франшиза', potential:'Высокий', stage:'Экспансия', innovation:'Средняя', influence:'Высокое', growth:'Высокий' },
        { icon:'🟡', index:81,  name:'Дринкит', reviews:'763', points:2,  scale:'~8+', status:'Лидер 👑', supplier:'Tasty Coffee', beanType:'Коммерция 📦', type:'Франшиза', potential:'Высокий', stage:'Рост', innovation:'Высокая', influence:'Среднее', growth:'Высокий' },
        { icon:'🟡', index:78,  name:'Uco Coffee Roaster', reviews:'209', points:2,  scale:'~4+', status:'Сильный 💪', supplier:'Собственная обжарка', beanType:'Спешелти ⭐', type:'Локальная', potential:'Средний', stage:'Рост', innovation:'Высокая', influence:'Среднее', growth:'Высокий' },
        { icon:'🟡', index:75,  name:'White Cup', reviews:'646', points:2,  scale:'~3+', status:'Сильный 💪', supplier:'Собственная обжарка', beanType:'Спешелти ⭐', type:'Локальная', potential:'Средний', stage:'Зрелость', innovation:'Средняя', influence:'Среднее', growth:'Средний' },
        { icon:'🟢', index:67,  name:'8 Атомов', reviews:'34', points:1,  scale:'~2+', status:'Сильный 💪', supplier:'UCO, Soldiers, Сварщица Екатерина', beanType:'Без бренда ⚪', type:'Локальная', potential:'Средний', stage:'Рост', innovation:'Высокая', influence:'Среднее', growth:'Высокий' },
        { icon:'🔴', index:65,  name:'Vandal coffee', reviews:'273', points:3,  scale:'~5+', status:'Сильный 💪', supplier:'Разное', beanType:'Без бренда ⚪', type:'Локальная', potential:'Средний', stage:'Рост', innovation:'Высокая', influence:'Низкое', growth:'Высокий' },
        { icon:'🟡', index:63,  name:'Lumos barista lab', reviews:'303', points:2,  scale:'~4+', status:'Сильный 💪', supplier:'Собственная обжарка', beanType:'Спешелти ⭐', type:'Локальная', potential:'Средний', stage:'Рост', innovation:'Высокая', influence:'Низкое', growth:'Средний' },
        { icon:'🔴', index:57,  name:'Cofix', reviews:'253', points:5,  scale:'~7+', status:'Растущий 📈', supplier:'Cofix (контрактная обжарка)', beanType:'Свой бренд 🏷️', type:'Франшиза', potential:'Средний', stage:'Рост', innovation:'Низкая', influence:'Низкое', growth:'Средний' },
        { icon:'🔴', index:55,  name:'Green Stag Roasters', reviews:'119', points:1,  scale:'~3+', status:'Растущий 📈', supplier:'Собственная обжарка', beanType:'Спешелти ⭐', type:'Локальная', potential:'Средний', stage:'Рост', innovation:'Высокая', influence:'Среднее', growth:'Высокий' },
        { icon:'🔴', index:55,  name:'Shu Authentic Coffee', reviews:'151', points:1, scale:'~2+', status:'Растущий 📈', supplier:'Собственная обжарка', beanType:'Спешелти ⭐', type:'Локальная', potential:'Средний', stage:'Рост', innovation:'Высокая', influence:'Среднее', growth:'Высокий' },
        { icon:'🔴', index:53,  name:'Cup-cup', reviews:'1,505', points:20,  scale:'~27+', status:'Растущий 📈', supplier:'Разное', beanType:'Без бренда ⚪', type:'Независимая', potential:'Низкий', stage:'Зрелость', innovation:'Низкая', influence:'Среднее', growth:'Низкий' },
        { icon:'🔴', index:52,  name:'Хюггешная', reviews:'885', points:6,  scale:'~6+', status:'Растущий 📈', supplier:'Разное', beanType:'Без бренда ⚪', type:'Локальная', potential:'Средний', stage:'Рост', innovation:'Средняя', influence:'Среднее', growth:'Средний' },
        { icon:'🔴', index:50,  name:'Булка нетто', reviews:'771', points:3,  scale:'~5+', status:'Растущий 📈', supplier:'Разное', beanType:'Без бренда ⚪', type:'Локальная', potential:'Средний', stage:'Рост', innovation:'Средняя', influence:'Низкое', growth:'Средний' },
        { icon:'🔴', index:45,  name:'Coffee Bean', reviews:'1,703', points:1,  scale:'~2+', status:'Растущий 📈', supplier:'LEON (Coffee Bean)', beanType:'Коммерция 📦', type:'Локальная', potential:'Средний', stage:'Рост', innovation:'Средняя', influence:'Низкое', growth:'Низкий' },
        { icon:'🔴', index:45,  name:'MB Cafe', reviews:'199', points:2,  scale:'~3+', status:'Растущий 📈', supplier:'Разное', beanType:'Без бренда ⚪', type:'Локальная', potential:'Средний', stage:'Рост', innovation:'Средняя', influence:'Низкое', growth:'Низкий' },
        { icon:'🔴', index:45,  name:'Bonfix', reviews:'143', points:2,  scale:'~3+', status:'Растущий 📈', supplier:'Разное', beanType:'Без бренда ⚪', type:'Локальная', potential:'Средний', stage:'Рост', innovation:'Средняя', influence:'Низкое', growth:'Низкий' },
        { icon:'🔴', index:45,  name:'Coffetino', reviews:'186', points:2,  scale:'~3+', status:'Растущий 📈', supplier:'Разное', beanType:'Без бренда ⚪', type:'Локальная', potential:'Средний', stage:'Рост', innovation:'Средняя', influence:'Низкое', growth:'Низкий' },
        { icon:'🔴', index:45,  name:'Кофейный лис', reviews:'47', points:2,  scale:'~3+', status:'Растущий 📈', supplier:'Разное', beanType:'Без бренда ⚪', type:'Локальная', potential:'Средний', stage:'Рост', innovation:'Средняя', influence:'Низкое', growth:'Низкий' },
        { icon:'🔴', index:41,  name:'Юни', reviews:'376', points:3,  scale:'~5+', status:'Растущий 📈', supplier:'Tasty Coffee', beanType:'Коммерция 📦', type:'Локальная', potential:'Низкий', stage:'Рост', innovation:'Средняя', influence:'Низкое', growth:'Низкий' },
        { icon:'🔴', index:40,  name:'Balance coffee', reviews:'147', points:1,  scale:'1+', status:'Растущий 📈', supplier:'Разное', beanType:'Без бренда ⚪', type:'Локальная', potential:'Средний', stage:'Стартап', innovation:'Средняя', influence:'Низкое', growth:'Высокий' },
        { icon:'🔴', index:40,  name:'Days Coffee', reviews:'15', points:1,  scale:'1+', status:'Растущий 📈', supplier:'Разное', beanType:'Без бренда ⚪', type:'Локальная', potential:'Средний', stage:'Рост', innovation:'Средняя', influence:'Низкое', growth:'Средний' },
        { icon:'🔴', index:40,  name:'Ягоза', reviews:'437', points:1,  scale:'1+', status:'Растущий 📈', supplier:'Разное', beanType:'Без бренда ⚪', type:'Локальная', potential:'Средний', stage:'Рост', innovation:'Средняя', influence:'Низкое', growth:'Средний' },
        { icon:'🔴', index:40,  name:'Тепло', reviews:'789', points:1,  scale:'1+', status:'Растущий 📈', supplier:'Разное', beanType:'Без бренда ⚪', type:'Локальная', potential:'Средний', stage:'Рост', innovation:'Средняя', influence:'Низкое', growth:'Средний' },
        { icon:'🔴', index:40,  name:'Комод', reviews:'1,783', points:1,  scale:'1+', status:'Растущий 📈', supplier:'Разное', beanType:'Без бренда ⚪', type:'Локальная', potential:'Средний', stage:'Рост', innovation:'Средняя', influence:'Низкое', growth:'Средний' },
        { icon:'🔴', index:40,  name:'Конфитюр', reviews:'946', points:1,  scale:'1+', status:'Растущий 📈', supplier:'Алеф Трейд', beanType:'Без бренда ⚪', type:'Локальная', potential:'Средний', stage:'Рост', innovation:'Средняя', influence:'Низкое', growth:'Средний' },
        { icon:'🔴', index:40,  name:'КоЗа', reviews:'215', points:1,  scale:'1+', status:'Растущий 📈', supplier:'Разное', beanType:'Без бренда ⚪', type:'Локальная', potential:'Средний', stage:'Рост', innovation:'Средняя', influence:'Низкое', growth:'Средний' },
        { icon:'🔴', index:40,  name:'Komkofe', reviews:'465', points:1,  scale:'1+', status:'Растущий 📈', supplier:'Tasty Coffee', beanType:'Коммерция 📦', type:'Локальная', potential:'Средний', stage:'Рост', innovation:'Средняя', influence:'Низкое', growth:'Средний' },
        { icon:'🔴', index:40,  name:'Сойка', reviews:'292', points:1,  scale:'1+', status:'Растущий 📈', supplier:'Разное', beanType:'Без бренда ⚪', type:'Локальная', potential:'Средний', stage:'Рост', innovation:'Средняя', influence:'Низкое', growth:'Средний' },
        { icon:'🔴', index:40,  name:'Black milk', reviews:'153', points:1,  scale:'1+', status:'Растущий 📈', supplier:'Разное', beanType:'Без бренда ⚪', type:'Локальная', potential:'Средний', stage:'Рост', innovation:'Средняя', influence:'Низкое', growth:'Средний' },
        { icon:'🔴', index:40,  name:'One Price Coffee', reviews:'42', points:1,  scale:'1+', status:'Растущий 📈', supplier:'Разное', beanType:'Без бренда ⚪', type:'Локальная', potential:'Средний', stage:'Рост', innovation:'Средняя', influence:'Низкое', growth:'Средний' },
        { icon:'🔴', index:40,  name:'Art Coffee', reviews:'57', points:1,  scale:'1+', status:'Растущий 📈', supplier:'Разное', beanType:'Без бренда ⚪', type:'Локальная', potential:'Средний', stage:'Рост', innovation:'Средняя', influence:'Низкое', growth:'Средний' },
        { icon:'🔴', index:40,  name:'Coffee cake', reviews:'947', points:1,  scale:'1+', status:'Растущий 📈', supplier:'Разное', beanType:'Без бренда ⚪', type:'Локальная', potential:'Средний', stage:'Рост', innovation:'Средняя', influence:'Низкое', growth:'Средний' },
        { icon:'🔴', index:40,  name:'Этажи', reviews:'904', points:1,  scale:'1+', status:'Растущий 📈', supplier:'Разное', beanType:'Без бренда ⚪', type:'Локальная', potential:'Средний', stage:'Рост', innovation:'Средняя', influence:'Низкое', growth:'Средний' },
        { icon:'🔴', index:40,  name:'Кофейная поляна', reviews:'629', points:3,  scale:'1+', status:'Растущий 📈', supplier:'Разное', beanType:'Без бренда ⚪', type:'Локальная', potential:'Средний', stage:'Рост', innovation:'Средняя', influence:'Низкое', growth:'Средний' },
        { icon:'🔴', index:40,  name:'Pluma', reviews:'93', points:1,  scale:'1+', status:'Растущий 📈', supplier:'Разное', beanType:'Без бренда ⚪', type:'Локальная', potential:'Средний', stage:'Рост', innovation:'Средняя', influence:'Низкое', growth:'Средний' },
        { icon:'🔴', index:39,  name:'Coffee Like', reviews:'170', points:3,  scale:'~6+', status:'Стабильный 🎯', supplier:'Coffee Like (контрактная обжарка)', beanType:'Свой бренд 🏷️', type:'Локальная', potential:'Низкий', stage:'Экспансия', innovation:'Низкая', influence:'Низкое', growth:'Низкий' },
        { icon:'🔴', index:30,  name:'Толстой', reviews:'398', points:1,  scale:'стагнация', status:'Стабильный 🎯', supplier:'Tasty Coffee', beanType:'Коммерция 📦', type:'Локальная', potential:'Низкий', stage:'Зрелость', innovation:'Низкая', influence:'Низкое', growth:'Низкий' },
        { icon:'🔴', index:30,  name:'Coffee time', reviews:'70', points:1,  scale:'стагнация', status:'Стабильный 🎯', supplier:'Разное', beanType:'Без бренда ⚪', type:'Локальная', potential:'Низкий', stage:'Зрелость', innovation:'Низкая', influence:'Низкое', growth:'Низкий' },
        { icon:'🔴', index:30,  name:'Точка притяжения', reviews:'122', points:1,  scale:'стагнация', status:'Стабильный 🎯', supplier:'Разное', beanType:'Без бренда ⚪', type:'Локальная', potential:'Низкий', stage:'Зрелость', innovation:'Низкая', influence:'Низкое', growth:'Низкий' },
        { icon:'🔴', index:30,  name:'Капуч', reviews:'65', points:1,  scale:'стагнация', status:'Стабильный 🎯', supplier:'Разное', beanType:'Без бренда ⚪', type:'Локальная', potential:'Низкий', stage:'Зрелость', innovation:'Низкая', influence:'Низкое', growth:'Низкий' },
        { icon:'🔴', index:30,  name:'Кофеваркин', reviews:'185', points:1,  scale:'стагнация', status:'Стабильный 🎯', supplier:'Собственная обжарка', beanType:'Спешелти ⭐', type:'Локальная', potential:'Низкий', stage:'Зрелость', innovation:'Низкая', influence:'Низкое', growth:'Низкий' },
        { icon:'🔴', index:30,  name:'Белый кот', reviews:'50', points:1,  scale:'стагнация', status:'Стабильный 🎯', supplier:'Разное', beanType:'Без бренда ⚪', type:'Локальная', potential:'Низкий', stage:'Зрелость', innovation:'Низкая', influence:'Низкое', growth:'Низкий' },
        { icon:'🔴', index:30,  name:'Cup to cup', reviews:'342', points:1,  scale:'стагнация', status:'Стабильный 🎯', supplier:'Разное', beanType:'Без бренда ⚪', type:'Локальная', potential:'Низкий', stage:'Зрелость', innovation:'Низкая', influence:'Низкое', growth:'Низкий' },
        { icon:'🔴', index:30,  name:'Котель', reviews:'158', points:1,  scale:'стагнация', status:'Стабильный 🎯', supplier:'Разное', beanType:'Без бренда ⚪', type:'Локальная', potential:'Низкий', stage:'Зрелость', innovation:'Низкая', influence:'Низкое', growth:'Низкий' },
        { icon:'🔴', index:30,  name:'Coffee inn', reviews:'138', points:1,  scale:'стагнация', status:'Стабильный 🎯', supplier:'Разное', beanType:'Без бренда ⚪', type:'Локальная', potential:'Низкий', stage:'Зрелость', innovation:'Низкая', influence:'Низкое', growth:'Низкий' },
        { icon:'🔴', index:30,  name:'Coffee Cup', reviews:'114', points:2,  scale:'стагнация', status:'Стабильный 🎯', supplier:'Разное', beanType:'Без бренда ⚪', type:'Локальная', potential:'Низкий', stage:'Зрелость', innovation:'Низкая', influence:'Низкое', growth:'Низкий' },
        { icon:'🔴', index:30,  name:'Cappuccino cup', reviews:'132', points:1,  scale:'стагнация', status:'Стабильный 🎯', supplier:'Разное', beanType:'Без бренда ⚪', type:'Локальная', potential:'Низкий', stage:'Зрелость', innovation:'Низкая', influence:'Низкое', growth:'Низкий' },
        { icon:'🔴', index:25,  name:'New coffee', reviews:'203', points:1,  scale:'стагнация', status:'Стабильный 🎯', supplier:'Разное', beanType:'Без бренда ⚪', type:'Локальная', potential:'Низкий', stage:'Стартап', innovation:'Низкая', influence:'Низкое', growth:'Средний' },
        { icon:'🔴', index:58,  name:'Muwa', reviews:'672', points:1,  scale:'~2+', status:'Вне игры 🚫', supplier:'Экспериментальные', beanType:'Эксперимент 🧪', type:'Локальная', potential:'Средний', stage:'Рост', innovation:'Высокая', influence:'Среднее', growth:'Средний' },
        { icon:'🔴', index:40,  name:'Twinz', reviews:'115', points:1,  scale:'1+', status:'Вне игры 🚫', supplier:'Разное', beanType:'Без бренда ⚪', type:'Локальная', potential:'Средний', stage:'Рост', innovation:'Средняя', influence:'Низкое', growth:'Средний' }
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
    },
    statusClass(status) {
      if (status === 'Лидер 👑') return 'status-leader'
      if (status === 'Сильный 💪') return 'status-strong'
      if (status === 'Растущий 📈') return 'status-growing'
      if (status === 'Стабильный 🎯') return 'status-stable'
      if (status === 'Вне игры 🚫') return 'status-out'
      return ''
    },
    beanTypeClass(beanType) {
      if (beanType === 'Свой бренд 🏷️') return 'bean-own-brand'
      if (beanType === 'Коммерция 📦') return 'bean-commercial'
      if (beanType === 'Спешелти ⭐') return 'bean-specialty'
      if (beanType === 'Без бренда ⚪') return 'bean-no-brand'
      if (beanType === 'Эксперимент 🧪') return 'bean-experiment'
      return 'bean-default'
    },
    typeClass(type) {
      if (type === 'Независимая') return 'param-independent'
      if (type === 'Сеть') return 'param-network'
      if (type === 'Франшиза') return 'param-franchise'
      if (type === 'Локальная') return 'param-local'
      return 'param-default'
    },
    potentialClass(potential) {
      if (potential === 'Высокий') return 'param-high'
      if (potential === 'Средний') return 'param-medium'
      if (potential === 'Низкий') return 'param-low'
      return 'param-default'
    },
    stageClass(stage) {
      if (stage === 'Экспансия') return 'param-expansion'
      if (stage === 'Рост') return 'param-growth'
      if (stage === 'Зрелость') return 'param-mature'
      if (stage === 'Стартап') return 'param-startup'
      return 'param-default'
    },
    innovationClass(innovation) {
      if (innovation === 'Высокая') return 'param-high'
      if (innovation === 'Средняя') return 'param-medium'
      if (innovation === 'Низкая') return 'param-low'
      return 'param-default'
    },
    influenceClass(influence) {
      if (influence === 'Высокое') return 'param-high'
      if (influence === 'Среднее') return 'param-medium'
      if (influence === 'Низкое') return 'param-low'
      return 'param-default'
    },
    growthClass(growth) {
      if (growth === 'Очень высокий') return 'param-very-high'
      if (growth === 'Высокий') return 'param-high'
      if (growth === 'Средний') return 'param-medium'
      if (growth === 'Низкий') return 'param-low'
      return 'param-default'
    },
    isFirstOutOfGame(coffee, index) {
      return coffee.status === 'Вне игры 🚫' && 
             (index === 0 || this.sortedCoffeeData[index - 1].status !== 'Вне игры 🚫')
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
  vertical-align: middle;
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

/* Полужирный для столбцов "Кофейня" и "Индекс" */
.index-smr-table td:nth-child(1),
.index-smr-table td:nth-child(2) {
  font-weight: 600;
}

/* Жирный разделитель для "Вне игры" */
.out-of-game-separator td {
  border-top: 4px solid #ff6b6b !important;
  padding-top: 14px;
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

/* Бейджи статусов - кислотные приглушенные цвета в стиле UX 2025 */
.badge-status {
  display: inline-block;
  border-radius: 6px;
  padding: 3px 10px;
  font-size: 0.85em;
  white-space: nowrap;
  vertical-align: baseline;
  margin: 0 2px;
  font-weight: 500;
  letter-spacing: 0.02em;
}

/* Кислотный лайм для лидера */
.status-leader {
  background: rgba(197, 249, 70, 0.15) !important;
  color: #c5f946 !important;
  border: 1px solid rgba(197, 249, 70, 0.3);
}

/* Кислотный синий для сильного */
.status-strong {
  background: rgba(59, 130, 246, 0.15) !important;
  color: #60a5fa !important;
  border: 1px solid rgba(59, 130, 246, 0.3);
}

/* Кислотный зеленый для растущего (как на сайте) */
.status-growing {
  background: rgba(34, 197, 94, 0.15) !important;
  color: #4ade80 !important;
  border: 1px solid rgba(34, 197, 94, 0.3);
}

/* Приглушенный серый для стабильного */
.status-stable {
  background: rgba(156, 163, 175, 0.12) !important;
  color: #9ca3af !important;
  border: 1px solid rgba(156, 163, 175, 0.25);
}

/* Коралловый для вне игры */
.status-out {
  background: rgba(255, 107, 107, 0.15) !important;
  color: #ff6b6b !important;
  border: 1px solid rgba(255, 107, 107, 0.3);
}

/* Бейджи для типа зерна */
.badge-bean {
  display: inline-block;
  border-radius: 5px;
  padding: 3px 8px;
  font-size: 0.8em;
  white-space: nowrap;
  vertical-align: baseline;
  font-weight: 500;
  border: 1px solid transparent;
}

/* Свой бренд - золотисто-оранжевый */
.bean-own-brand {
  background: rgba(245, 158, 11, 0.12) !important;
  color: #f59e0b !important;
  border: 1px solid rgba(245, 158, 11, 0.25);
}

/* Коммерция - фиолетово-синий */
.bean-commercial {
  background: rgba(99, 102, 241, 0.12) !important;
  color: #6366f1 !important;
  border: 1px solid rgba(99, 102, 241, 0.25);
}

/* Спешелти - изумрудно-зеленый */
.bean-specialty {
  background: rgba(16, 185, 129, 0.12) !important;
  color: #10b981 !important;
  border: 1px solid rgba(16, 185, 129, 0.25);
}

/* Без бренда - нейтральный серый */
.bean-no-brand {
  background: rgba(107, 114, 128, 0.08) !important;
  color: rgba(107, 114, 128, 0.8) !important;
  border: 1px solid rgba(107, 114, 128, 0.15);
}

/* Эксперимент - кислотный розово-фиолетовый */
.bean-experiment {
  background: rgba(236, 72, 153, 0.12) !important;
  color: #ec4899 !important;
  border: 1px solid rgba(236, 72, 153, 0.25);
}

.bean-default {
  background: rgba(107, 114, 128, 0.05) !important;
  color: rgba(107, 114, 128, 0.7) !important;
  border: 1px solid rgba(107, 114, 128, 0.1);
}

/* Приглушенные бейджи для параметров */
.badge-param {
  display: inline-block;
  border-radius: 4px;
  padding: 2px 6px;
  font-size: 0.75em;
  white-space: nowrap;
  vertical-align: baseline;
  font-weight: 400;
  border: 1px solid transparent;
  opacity: 0.7;
}

/* Типы */
.param-independent {
  background: rgba(197, 249, 70, 0.08) !important;
  color: rgba(197, 249, 70, 0.8) !important;
  border-color: rgba(197, 249, 70, 0.15);
}

.param-network {
  background: rgba(59, 130, 246, 0.08) !important;
  color: rgba(59, 130, 246, 0.8) !important;
  border-color: rgba(59, 130, 246, 0.15);
}

.param-franchise {
  background: rgba(147, 51, 234, 0.08) !important;
  color: rgba(147, 51, 234, 0.8) !important;
  border-color: rgba(147, 51, 234, 0.15);
}

.param-local {
  background: rgba(107, 114, 128, 0.08) !important;
  color: rgba(107, 114, 128, 0.8) !important;
  border-color: rgba(107, 114, 128, 0.15);
}

/* Уровни (Высокий/Средний/Низкий) */
.param-very-high {
  background: rgba(34, 197, 94, 0.08) !important;
  color: rgba(34, 197, 94, 0.9) !important;
  border-color: rgba(34, 197, 94, 0.15);
}

.param-high {
  background: rgba(34, 197, 94, 0.06) !important;
  color: rgba(34, 197, 94, 0.8) !important;
  border-color: rgba(34, 197, 94, 0.12);
}

.param-medium {
  background: rgba(234, 179, 8, 0.06) !important;
  color: rgba(234, 179, 8, 0.8) !important;
  border-color: rgba(234, 179, 8, 0.12);
}

.param-low {
  background: rgba(239, 68, 68, 0.06) !important;
  color: rgba(239, 68, 68, 0.8) !important;
  border-color: rgba(239, 68, 68, 0.12);
}

/* Стадии */
.param-expansion {
  background: rgba(59, 130, 246, 0.06) !important;
  color: rgba(59, 130, 246, 0.8) !important;
  border-color: rgba(59, 130, 246, 0.12);
}

.param-growth {
  background: rgba(34, 197, 94, 0.06) !important;
  color: rgba(34, 197, 94, 0.8) !important;
  border-color: rgba(34, 197, 94, 0.12);
}

.param-mature {
  background: rgba(156, 163, 175, 0.06) !important;
  color: rgba(156, 163, 175, 0.8) !important;
  border-color: rgba(156, 163, 175, 0.12);
}

.param-startup {
  background: rgba(168, 85, 247, 0.06) !important;
  color: rgba(168, 85, 247, 0.8) !important;
  border-color: rgba(168, 85, 247, 0.12);
}

.param-default {
  background: rgba(107, 114, 128, 0.05) !important;
  color: rgba(107, 114, 128, 0.7) !important;
  border-color: rgba(107, 114, 128, 0.1);
}

/* Адаптивность */
@media (max-width: 1024px) {
  .index-smr-table th,
  .index-smr-table td {
    padding: 9px 7px;
    font-size: 13px;
  }
  .index-smr-table {
    min-width: 1100px;
  }
  .out-of-game-separator td {
    padding-top: 12px;
  }
  .badge-status {
    font-size: 0.8em;
    padding: 2px 8px;
  }
  .badge-param {
    font-size: 0.7em;
    padding: 1px 4px;
  }
  .badge-bean {
    font-size: 0.75em;
    padding: 2px 6px;
  }
}
@media (max-width: 760px) {
  .index-smr-table th,
  .index-smr-table td {
    padding: 7px 6px;
    font-size: 12px;
  }
  .index-smr-table {
    min-width: 820px;
  }
  .out-of-game-separator td {
    padding-top: 10px;
  }
  .badge-status {
    font-size: 0.75em;
    padding: 2px 6px;
  }
  .badge-param {
    font-size: 0.65em;
    padding: 1px 3px;
  }
  .badge-bean {
    font-size: 0.7em;
    padding: 2px 5px;
  }
}
@media (max-width: 480px) {
  .index-smr-table th,
  .index-smr-table td {
    padding: 5px 4px;
    font-size: 11px;
  }
  .index-smr-table {
    min-width: 760px;
  }
  .out-of-game-separator td {
    padding-top: 8px;
  }
  .badge-status {
    font-size: 0.7em;
    padding: 1px 4px;
  }
  .badge-param {
    font-size: 0.6em;
    padding: 1px 2px;
  }
  .badge-bean {
    font-size: 0.65em;
    padding: 1px 4px;
  }
}
</style>
