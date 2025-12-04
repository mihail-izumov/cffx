<template>
  <div class="adaptive-comparison">
    <!-- === ДЕСКТОПНАЯ ВЕРСИЯ === -->
    <div class="desktop-view">
      <div class="table-content">
        <div class="table-header">
          <div class="header-cell usual">Обычный отзыв Яндекс/2ГИС</div>
          <div class="header-cell smart">
            <img src="/favicon.svg" alt="Signal Icon" class="header-icon" />
            <span class="signal-header-text">Сигнал</span>
          </div>
        </div>
        
        <div class="table-row" v-for="(item, index) in comparisonData" :key="index">
          <div class="cell usual-cell">
            <p>{{ item.regular }}</p>
          </div>
          <div class="cell smart-cell">
            <svg
              class="arrow-icon"
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M18 8L22 12L18 16" />
              <path d="M2 12H22" />
            </svg>
            <p><strong>{{ item.signal }}</strong></p>
          </div>
        </div>
      </div>
    </div>

    <!-- === МОБИЛЬНАЯ ВЕРСИЯ (КАРТОЧКИ) === -->
    <div class="mobile-view">
      <div class="mobile-card" v-for="(item, index) in comparisonData" :key="index">
        <div class="mobile-item">
          <div class="mobile-label">Обычный отзыв Яндекс/2ГИС</div>
          <div class="mobile-value">{{ item.regular }}</div>
        </div>
        
        <div class="mobile-divider"></div>
        
        <div class="mobile-item">
          <div class="mobile-label signal-label">
            <img src="/favicon.svg" alt="Signal Icon" class="mobile-icon" />
            <span class="signal-label-text">Сигнал</span>
          </div>
          <div class="mobile-value signal-value">
            <svg
              class="arrow-icon"
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M18 8L22 12L18 16" />
              <path d="M2 12H22" />
            </svg>
            <span>{{ item.signal }}</span>
          </div>
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
.desktop-view {
  display: block;
}
.mobile-view {
  display: none;
}

/* Десктоп — ваши стили + правка цветов */
.table-content {
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 12px;
  background: rgba(255,255,255,0.03);
  overflow: hidden;
}
.table-header {
  display: grid;
  grid-template-columns: 1fr 1fr;
  border-bottom: 1px solid rgba(255,255,255,0.08);
}
.header-cell {
  padding: 10px 16px;
  font-weight: 600;
  font-size: 14px;
  text-align: center;
  border-right: 1px solid rgba(255,255,255,0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}
.header-cell:last-child {
  border-right: none;
}
.header-cell.usual {
  background: rgba(255,255,255,0.04);
  color: rgba(255,255,255,0.7);
}
.header-cell.smart {
  background: rgba(200,255,90,0.08);
}
.signal-header-text {
  color: #ffffff;
}
.header-icon {
  width: 16px;
  height: 16px;
}
.table-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  border-bottom: 1px solid rgba(255,255,255,0.08);
}
.table-row:last-child {
  border-bottom: none;
}
.cell {
  padding: 8px 16px;
  font-size: 14px;
  line-height: 1.05;
  border-right: 1px solid rgba(255,255,255,0.08);
  display: flex;
  align-items: center;
}
.cell:last-child {
  border-right: none;
}
.usual-cell {
  color: rgba(255,255,255,0.7);
  background: rgba(255,255,255,0.01);
}
.smart-cell {
  color: rgba(255,255,255,0.88);
  background: rgba(200,255,90,0.04);
  gap: 8px;
}
.cell p {
  margin: 0;
}
.smart-cell strong {
  font-weight: 600;
  color: #c8ff5a;
}
.arrow-icon {
  color: #c8ff5a;
  flex-shrink: 0;
}

/* Мобильные карточки */
@media (max-width: 768px) {
  .desktop-view {
    display: none;
  }
  .mobile-view {
    display: block;
  }

  .mobile-card {
    background-color: #222528;
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 12px;
    padding: 20px;
    margin-bottom: 16px;
  }

  .mobile-item {
    padding: 4px 0;
  }

  .mobile-label {
    font-size: 13px;
    font-weight: 600;
    color: rgba(255,255,255,0.5);
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .signal-label-text {
    color: #ffffff;
  }

  .signal-label {
    opacity: 0.95;
  }

  .mobile-icon {
    width: 14px;
    height: 14px;
  }

  .mobile-value {
    font-size: 17px;
    line-height: 1.5;
    color: rgba(255,255,255,0.9);
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .signal-value {
    color: #c8ff5a;
    font-weight: 700;
    font-size: 18px;
  }

  .mobile-divider {
    height: 1px;
    background-color: rgba(255,255,255,0.1);
    margin: 12px 0;
  }
}
</style>
