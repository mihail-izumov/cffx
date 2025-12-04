<template>
  <div class="comparison-container">
    <!-- Десктопная версия (таблица) -->
    <div class="desktop-view">
      <table class="comparison-table">
        <thead>
          <tr>
            <th>Обычный отзыв Яндекс/2ГИС</th>
            <th>⚡ Сигнал</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in comparisonData" :key="index">
            <td>
              <div class="regular-review">{{ item.regular }}</div>
            </td>
            <td>
              <div class="signal-benefit">→ {{ item.signal }}</div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Мобильная версия (карточки) -->
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
          <div class="item-label">⚡ Сигнал</div>
          <div class="item-value signal-value">→ {{ item.signal }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const comparisonData = ref([
  {
    regular: 'Теряется в потоке',
    signal: 'Поступает в работу немедленно'
  },
  {
    regular: 'Решение не гарантировано',
    signal: 'Результат за 24 часа'
  },
  {
    regular: 'Поделиться с другими и наказать',
    signal: 'Разобраться и изменить'
  },
  {
    regular: 'Шум без последствий',
    signal: 'Рост бизнеса'
  }
])
</script>

<style scoped>
.comparison-container {
  width: 100%;
  margin: 20px 0;
}

/* Десктопная версия - показываем на больших экранах */
.desktop-view {
  display: block;
}

.mobile-view {
  display: none;
}

.comparison-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  background-color: var(--vp-c-bg-soft);
  border-radius: 8px;
  overflow: hidden;
}

.comparison-table thead {
  background-color: var(--vp-c-bg-mute);
}

.comparison-table th {
  padding: 16px;
  text-align: left;
  font-weight: 600;
  font-size: 16px;
  border-bottom: 2px solid var(--vp-c-divider);
}

.comparison-table th:first-child {
  color: var(--vp-c-text-2);
}

.comparison-table th:last-child {
  color: var(--vp-c-brand-1);
}

.comparison-table td {
  padding: 16px;
  border-bottom: 1px solid var(--vp-c-divider);
}

.comparison-table tr:last-child td {
  border-bottom: none;
}

.regular-review {
  color: var(--vp-c-text-2);
  font-size: 15px;
}

.signal-benefit {
  color: var(--vp-c-brand-1);
  font-weight: 600;
  font-size: 15px;
}

/* Мобильная версия - показываем на маленьких экранах */
@media (max-width: 768px) {
  .desktop-view {
    display: none;
  }

  .mobile-view {
    display: block;
  }

  .comparison-card {
    background-color: var(--vp-c-bg-soft);
    border: 1px solid var(--vp-c-divider);
    border-radius: 12px;
    padding: 20px;
    margin-bottom: 16px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .comparison-card:last-child {
    margin-bottom: 0;
  }

  .comparison-item {
    margin-bottom: 16px;
  }

  .comparison-item:last-child {
    margin-bottom: 0;
  }

  .item-label {
    font-size: 13px;
    font-weight: 600;
    color: var(--vp-c-text-3);
    margin-bottom: 6px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .item-value {
    font-size: 17px;
    line-height: 1.5;
    color: var(--vp-c-text-1);
    font-weight: 500;
  }

  .signal-value {
    color: var(--vp-c-brand-1);
    font-weight: 700;
    font-size: 18px;
  }

  .divider {
    height: 1px;
    background-color: var(--vp-c-divider);
    margin: 16px 0;
  }
}

/* Очень маленькие экраны */
@media (max-width: 480px) {
  .comparison-card {
    padding: 16px;
    margin-bottom: 12px;
  }

  .item-value {
    font-size: 16px;
  }

  .signal-value {
    font-size: 17px;
  }
}
</style>
