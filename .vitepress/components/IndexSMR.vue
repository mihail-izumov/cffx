<template>
  <div class="coffee-index-table-container">
    <table class="coffee-index-table">
      <thead>
        <tr>
          <th>Кофейня</th>
          <th><a href="#индекс-роста">Индекс</a></th>
          <th><a href="#статус-роста">Статус</a></th>
          <th>Точки</th>
          <th>Масштаб</th>
          <th>Тип</th>
          <th>Потенциал</th>
          <th><a href="#стадия-развития">Стадия</a></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="coffee in coffeeData" :key="`${coffee.name}-${coffee.index}`">
          <td>
            <span :class="getIconClass(coffee.icon)">{{ coffee.icon }}</span>
            {{ coffee.name }}
          </td>
          <td>{{ coffee.index }}</td>
          <td>{{ coffee.status }}</td>
          <td>{{ coffee.points }}</td>
          <td>{{ coffee.scale }}</td>
          <td>{{ coffee.type }}</td>
          <td>{{ coffee.potential }}</td>
          <td>{{ coffee.stage }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'CoffeeIndexTable',
  data() {
    return {
      coffeeData: [
        { icon: '🟡', index: 98, name: 'Корж', points: 8, scale: '~12+', status: 'Лидер 👑', type: 'Независимая сеть', potential: 'Высокий', stage: 'Экспансия' },
        { icon: '🔴', index: 96, name: 'Skuratov Coffee', points: 6, scale: '~10+', status: 'Лидер 👑', type: 'Независимая сеть', potential: 'Высокий', stage: 'Экспансия' },
        { icon: '🔴', index: 93, name: 'Surf Coffee', points: 3, scale: '~8+', status: 'Лидер 👑', type: 'Сеть (франшиза)', potential: 'Высокий', stage: 'Экспансия' },
        { icon: '🟡', index: 91, name: 'Mosaic coffee&tea', points: 7, scale: '~11+', status: 'Лидер 👑', type: 'Независимая сеть', potential: 'Высокий', stage: 'Экспансия' },
        { icon: '🔴', index: 83, name: 'Stars Coffee', points: 3, scale: '~8+', status: 'Лидер 👑', type: 'Сеть (франшиза)', potential: 'Высокий', stage: 'Экспансия' },
        { icon: '🟡', index: 81, name: 'Дринкит', points: 3, scale: '~8+', status: 'Лидер 👑', type: 'Сеть (франшиза)', potential: 'Высокий', stage: 'Рост' },
        { icon: '🟡', index: 78, name: 'Uco Coffee Roaster', points: 2, scale: '~4+', status: 'Сильный 💪', type: 'Локальное заведение', potential: 'Средний', stage: 'Рост' },
        { icon: '🟡', index: 75, name: 'White Cup', points: 2, scale: '~3+', status: 'Сильный 💪', type: 'Локальное заведение', potential: 'Средний', stage: 'Зрелость' },
        { icon: '🟢', index: 67, name: '8 Атомов', points: 1, scale: '~2+', status: 'Сильный 💪', type: 'Локальное заведение', potential: 'Средний', stage: 'Рост' },
        { icon: '🔴', index: 65, name: 'Vandal coffee', points: 3, scale: '~5+', status: 'Сильный 💪', type: 'Локальное заведение', potential: 'Средний', stage: 'Рост' },
        { icon: '🟡', index: 63, name: 'Lumos barista lab', points: 2, scale: '~4+', status: 'Сильный 💪', type: 'Локальное заведение', potential: 'Средний', stage: 'Рост' },
        { icon: '🔴', index: 58, name: 'Muwa', points: 1, scale: '~2+', status: 'Растущий 📈', type: 'Локальное заведение', potential: 'Средний', stage: 'Рост' },
        { icon: '🔴', index: 57, name: 'Cofix', points: 5, scale: '~7+', status: 'Растущий 📈', type: 'Сеть (франшиза)', potential: 'Средний', stage: 'Рост' },
        { icon: '🔴', index: 55, name: 'Green Stag Roasters', points: 1, scale: '~3+', status: 'Растущий 📈', type: 'Локальное заведение', potential: 'Средний', stage: 'Рост' },
        { icon: '🔴', index: 55, name: 'Shu Authentic Coffee', points: 1, scale: '~2+', status: 'Растущий 📈', type: 'Локальное заведение', potential: 'Средний', stage: 'Рост' },
        { icon: '🔴', index: 53, name: 'Cup-cup', points: 8, scale: 'стагнация', status: 'Растущий 📈', type: 'Независимая сеть', potential: 'Низкий', stage: 'Зрелость' },
        { icon: '🔴', index: 52, name: 'Хюггешная', points: 4, scale: '~6+', status: 'Растущий 📈', type: 'Локальное заведение', potential: 'Средний', stage: 'Рост' },
        { icon: '🔴', index: 50, name: 'Булка нетто', points: 3, scale: '~5+', status: 'Растущий 📈', type: 'Локальное заведение', potential: 'Средний', stage: 'Рост' },
        { icon: '🔴', index: 45, name: 'Coffee Bean', points: 2, scale: '~3+', status: 'Растущий 📈', type: 'Локальное заведение', potential: 'Средний', stage: 'Рост' },
        { icon: '🔴', index: 45, name: 'MB Cafe', points: 2, scale: '~3+', status: 'Растущий 📈', type: 'Локальное заведение', potential: 'Средний', stage: 'Рост' },
        { icon: '🔴', index: 45, name: 'Bonfix', points: 2, scale: '~3+', status: 'Растущий 📈', type: 'Локальное заведение', potential: 'Средний', stage: 'Рост' },
        { icon: '🔴', index: 45, name: 'Coffetino', points: 2, scale: '~3+', status: 'Растущий 📈', type: 'Локальное заведение', potential: 'Средний', stage: 'Рост' },
        { icon: '🔴', index: 45, name: 'Кофейный лис', points: 2, scale: '~3+', status: 'Растущий 📈', type: 'Локальное заведение', potential: 'Средний', stage: 'Рост' },
        { icon: '🔴', index: 41, name: 'Юни', points: 3, scale: '~5+', status: 'Растущий 📈', type: 'Локальное заведение', potential: 'Низкий', stage: 'Рост' },
        { icon: '🔴', index: 39, name: 'Coffee Like', points: 3, scale: '~6+', status: 'Начинающий 🚀', type: 'Локальное заведение', potential: 'Низкий', stage: 'Экспансия' },
        { icon: '🔴', index: 40, name: 'Balance coffee', points: 1, scale: '1+', status: 'Растущий 📈', type: 'Локальное заведение', potential: 'Средний', stage: 'Стартап' },
        { icon: '🔴', index: 40, name: 'Days Coffee', points: 1, scale: '1+', status: 'Растущий 📈', type: 'Локальное заведение', potential: 'Средний', stage: 'Рост' },
        { icon: '🔴', index: 40, name: 'Twinz', points: 1, scale: '1+', status: 'Растущий 📈', type: 'Локальное заведение', potential: 'Средний', stage: 'Рост' },
        { icon: '🔴', index: 40, name: 'Ягоза', points: 1, scale: '1+', status: 'Растущий 📈', type: 'Локальное заведение', potential: 'Средний', stage: 'Рост' },
        { icon: '🔴', index: 40, name: 'Тепло', points: 1, scale: '1+', status: 'Растущий 📈', type: 'Локальное заведение', potential: 'Средний', stage: 'Рост' },
        { icon: '🔴', index: 40, name: 'Комод', points: 1, scale: '1+', status: 'Растущий 📈', type: 'Локальное заведение', potential: 'Средний', stage: 'Рост' },
        { icon: '🔴', index: 40, name: 'Конфитюр', points: 1, scale: '1+', status: 'Растущий 📈', type: 'Локальное заведение', potential: 'Средний', stage: 'Рост' },
        { icon: '🔴', index: 40, name: 'КоЗа', points: 1, scale: '1+', status: 'Растущий 📈', type: 'Локальное заведение', potential: 'Средний', stage: 'Рост' },
        { icon: '🔴', index: 40, name: 'Komkofe', points: 1, scale: '1+', status: 'Растущий 📈', type: 'Локальное заведение', potential: 'Средний', stage: 'Рост' },
        { icon: '🔴', index: 40, name: 'Сойка', points: 1, scale: '1+', status: 'Растущий 📈', type: 'Локальное заведение', potential: 'Средний', stage: 'Рост' },
        { icon: '🔴', index: 40, name: 'Black milk', points: 1, scale: '1+', status: 'Растущий 📈', type: 'Локальное заведение', potential: 'Средний', stage: 'Рост' },
        { icon: '🔴', index: 40, name: 'One Price Coffee', points: 1, scale: '1+', status: 'Растущий 📈', type: 'Локальное заведение', potential: 'Средний', stage: 'Рост' },
        { icon: '🔴', index: 40, name: 'Art Coffee', points: 1, scale: '1+', status: 'Растущий 📈', type: 'Локальное заведение', potential: 'Средний', stage: 'Рост' },
        { icon: '🔴', index: 40, name: 'Coffee cake', points: 1, scale: '1+', status: 'Растущий 📈', type: 'Локальное заведение', potential: 'Средний', stage: 'Рост' },
        { icon: '🔴', index: 40, name: 'Этажи', points: 1, scale: '1+', status: 'Растущий 📈', type: 'Локальное заведение', potential: 'Средний', stage: 'Рост' },
        { icon: '🔴', index: 40, name: 'Кофейная поляна', points: 1, scale: '1+', status: 'Растущий 📈', type: 'Локальное заведение', potential: 'Средний', stage: 'Рост' },
        { icon: '🔴', index: 40, name: 'Фартук', points: 1, scale: '1+', status: 'Растущий 📈', type: 'Локальное заведение', potential: 'Средний', stage: 'Рост' },
        { icon: '🔴', index: 40, name: 'Pluma', points: 1, scale: '1+', status: 'Растущий 📈', type: 'Локальное заведение', potential: 'Средний', stage: 'Рост' },
        { icon: '🔴', index: 35, name: 'Coffee Balance', points: 1, scale: '1+', status: 'Начинающий 🚀', type: 'Локальное заведение', potential: 'Низкий', stage: 'Стартап' },
        { icon: '🔴', index: 30, name: 'Толстой', points: 1, scale: 'стагнация', status: 'Начинающий 🚀', type: 'Локальное заведение', potential: 'Низкий', stage: 'Зрелость' },
        { icon: '🔴', index: 30, name: 'Coffee time', points: 1, scale: 'стагнация', status: 'Начинающий 🚀', type: 'Локальное заведение', potential: 'Низкий', stage: 'Зрелость' },
        { icon: '🔴', index: 30, name: 'Точка притяжения', points: 1, scale: 'стагнация', status: 'Начинающий 🚀', type: 'Локальное заведение', potential: 'Низкий', stage: 'Зрелость' },
        { icon: '🔴', index: 30, name: 'Капуч', points: 1, scale: 'стагнация', status: 'Начинающий 🚀', type: 'Локальное заведение', potential: 'Низкий', stage: 'Зрелость' },
        { icon: '🔴', index: 30, name: 'Кофеваркин', points: 1, scale: 'стагнация', status: 'Начинающий 🚀', type: 'Локальное заведение', potential: 'Низкий', stage: 'Зрелость' },
        { icon: '🔴', index: 30, name: 'Белый кот', points: 1, scale: 'стагнация', status: 'Начинающий 🚀', type: 'Локальное заведение', potential: 'Низкий', stage: 'Зрелость' },
        { icon: '🔴', index: 30, name: 'Cup to cup', points: 1, scale: 'стагнация', status: 'Начинающий 🚀', type: 'Локальное заведение', potential: 'Низкий', stage: 'Зрелость' },
        { icon: '🔴', index: 30, name: 'Котель', points: 1, scale: 'стагнация', status: 'Начинающий 🚀', type: 'Локальное заведение', potential: 'Низкий', stage: 'Зрелость' },
        { icon: '🔴', index: 30, name: 'Coffee inn', points: 1, scale: 'стагнация', status: 'Начинающий 🚀', type: 'Локальное заведение', potential: 'Низкий', stage: 'Зрелость' },
        { icon: '🔴', index: 30, name: 'Coffee Cup', points: 1, scale: 'стагнация', status: 'Начинающий 🚀', type: 'Локальное заведение', potential: 'Низкий', stage: 'Зрелость' },
        { icon: '🔴', index: 30, name: 'Cappuccino cup', points: 1, scale: 'стагнация', status: 'Начинающий 🚀', type: 'Локальное заведение', potential: 'Низкий', stage: 'Зрелость' },
        { icon: '🔴', index: 25, name: 'New coffee', points: 1, scale: 'стагнация', status: 'Начинающий 🚀', type: 'Локальное заведение', potential: 'Низкий', stage: 'Стартап' }
      ]
    }
  },
  methods: {
    getIconClass(icon) {
      switch (icon) {
        case '🟡': return 'icon-yellow'
        case '🔴': return 'icon-red'
        case '🟢': return 'icon-green'
        default: return ''
      }
    }
  }
}
</script>

<style scoped>
.coffee-index-table-container {
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

.coffee-index-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  table-layout: fixed;
}

.coffee-index-table th, 
.coffee-index-table td {
  padding: 12px 15px;
  border-bottom: 1px solid var(--vp-c-divider);
  text-align: left;
}

.coffee-index-table th {
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.5px;
  color: var(--vp-c-text-2);
  background-color: var(--vp-c-bg-soft);
  position: sticky;
  top: 0;
  z-index: 10;
}

.coffee-index-table th a {
  color: inherit;
  text-decoration: none;
  border-bottom: 1px dotted var(--vp-c-text-3);
}

.coffee-index-table th a:hover {
  color: var(--vp-c-text-1);
  border-bottom-color: var(--vp-c-text-1);
}

/* Выравнивание по центру для числовых данных */
.coffee-index-table th:nth-child(2), 
.coffee-index-table td:nth-child(2),
.coffee-index-table th:nth-child(4), 
.coffee-index-table td:nth-child(4),
.coffee-index-table th:nth-child(5), 
.coffee-index-table td:nth-child(5) {
  text-align: center;
}

/* Оптимизированная ширина столбцов */
.coffee-index-table th:nth-child(1), 
.coffee-index-table td:nth-child(1) { width: 22%; } /* Кофейня */
.coffee-index-table th:nth-child(2), 
.coffee-index-table td:nth-child(2) { width: 8%; }  /* Индекс */
.coffee-index-table th:nth-child(3), 
.coffee-index-table td:nth-child(3) { width: 15%; } /* Статус */
.coffee-index-table th:nth-child(4), 
.coffee-index-table td:nth-child(4) { width: 8%; }  /* Точки */
.coffee-index-table th:nth-child(5), 
.coffee-index-table td:nth-child(5) { width: 12%; } /* Масштаб */
.coffee-index-table th:nth-child(6), 
.coffee-index-table td:nth-child(6) { width: 18%; } /* Тип */
.coffee-index-table th:nth-child(7), 
.coffee-index-table td:nth-child(7) { width: 10%; } /* Потенциал */
.coffee-index-table th:nth-child(8), 
.coffee-index-table td:nth-child(8) { width: 12%; } /* Стадия */

/* Стили для иконок */
.icon-yellow {
  color: #f59e0b;
}

.icon-red {
  color: #ef4444;
}

.icon-green {
  color: #10b981;
}

/* Стили для строк в зависимости от индекса */
.coffee-index-table tbody tr:hover {
  background-color: var(--vp-c-bg-soft);
}

/* Выделение топ кофеен */
.coffee-index-table tbody tr:nth-child(-n+6) {
  background-color: rgba(251, 191, 36, 0.1);
}

/* Адаптивность для планшетов */
@media (max-width: 1024px) {
  .coffee-index-table {
    min-width: 900px;
  }
  
  .coffee-index-table th, 
  .coffee-index-table td {
    padding: 10px 12px;
    font-size: 14px;
  }
}

/* Адаптивность для мобильных */
@media (max-width: 768px) {
  .coffee-index-table {
    min-width: 800px;
    font-size: 13px;
  }
  
  .coffee-index-table th, 
  .coffee-index-table td {
    padding: 8px 10px;
  }
  
  .coffee-index-table th {
    font-size: 11px;
  }
}

/* Для очень узких экранов */
@media (max-width: 480px) {
  .coffee-index-table {
    min-width: 700px;
    font-size: 12px;
  }
  
  .coffee-index-table th, 
  .coffee-index-table td {
    padding: 6px 8px;
  }
  
  .coffee-index-table th {
    font-size: 10px;
  }
}
</style>
