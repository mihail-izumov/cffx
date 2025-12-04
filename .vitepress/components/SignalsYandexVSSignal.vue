<template>
  <div class="comparison-container">
    <!-- === ДЕСКТОПНАЯ ВЕРСИЯ: ИСХОДНЫЙ ДИЗАЙН === -->
    <div class="desktop-view">
      <div class="comparison-table-wrapper">
        <table class="comparison-table">
          <thead>
            <tr>
              <th>Обычный отзыв Яндекс/2ГИС</th>
              <th><span class="lightning-bolt">⚡</span> Сигнал</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in comparisonData" :key="index">
              <td>{{ item.regular }}</td>
              <td class="signal-cell">→ {{ item.signal }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- === МОБИЛЬНАЯ ВЕРСИЯ: НОВАЯ СТРУКТУРА + ВАШ СТИЛЬ === -->
    <div class="mobile-view">
      <div 
        v-for="(item, index) in comparisonData" 
        :key="index" 
        class="comparison-card"
      >
        <div class="comparison-item">
          <div class="item-label">Обычный отзыв Яндекс/2ГИС:</div>
          <div class="item-value">{{ item.regular }}</div>
        </div>
        
        <div class="divider"></div>
        
        <div class="comparison-item">
          <div class="item-label signal-label"><span class="lightning-bolt">⚡</span> Сигнал</div>
          <div class="item-value signal-value">→ {{ item.signal }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const comparisonData = ref([
  { regular: 'Теряется в потоке', signal: 'Поступает в работу немедленно' },
  { regular: 'Решение не гарантировано', signal: 'Результат за 24 часа' },
  { regular: 'Поделиться с другими и наказать', signal: 'Разобраться и изменить' },
  { regular: 'Шум без последствий', signal: 'Рост бизнеса' }
])
</script>

<style scoped>
/* === ОБЩИЕ СТИЛИ === */
.lightning-bolt {
  color: #F1C40F; /* Желтый цвет молнии */
}

/* === СТИЛИ ДЕСКТОПНОЙ ВЕРСИИ === */
.desktop-view {
  display: block;
}
.mobile-view {
  display: none;
}

.comparison-table-wrapper {
  background-color: #283739; /* Темный фон из вашего макета */
  border-radius: 12px;
  overflow: hidden;
  padding: 8px 0;
}

.comparison-table {
  width: 100%;
  border-collapse: collapse;
}

.comparison-table th,
.comparison-table td {
  padding: 16px 24px;
  text-align: left;
  vertical-align: middle;
}

.comparison-table th {
  font-size: 16px;
  font-weight: 600;
  color: #e0e0e0;
}

.comparison-table th:first-child {
  color: #a0aeb3;
}

.comparison-table tbody tr {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.comparison-table td {
  font-size: 16px;
  color: #f0f0f0;
}

.comparison-table .signal-cell {
  color: #34D399; /* Зеленый цвет для Сигнала */
  font-weight: 600;
}

/* === СТИЛИ МОБИЛЬНОЙ ВЕРСИИ (с 768px и меньше) === */
@media (max-width: 768px) {
  .desktop-view {
    display: none;
  }
  .mobile-view {
    display: block;
  }

  .comparison-card {
    background-color: #283739; /* Темный фон из вашего макета */
    border-radius: 12px;
    padding: 20px;
    margin-bottom: 16px;
  }

  .comparison-item {
    padding: 8px 0;
  }

  .item-label {
    font-size: 13px;
    font-weight: 600;
    color: #97a8ad; /* Цвет подписи */
    margin-bottom: 8px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  
  /* Делаем подпись Сигнала ярче, как вы просили */
  .item-label.signal-label {
    color: #e0e0e0; 
  }

  .item-value {
    font-size: 18px;
    line-height: 1.5;
    color: #f0f0f0;
    font-weight: 500;
  }

  .signal-value {
    color: #34D399; /* Зеленый цвет для Сигнала */
    font-weight: 700;
  }

  .divider {
    height: 1px;
    background-color: rgba(255, 255, 255, 0.1);
    margin: 8px 0;
  }
}
</style>
