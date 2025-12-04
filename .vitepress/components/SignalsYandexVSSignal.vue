<template>
  <div class="adaptive-comparison">
    <!-- === ДЕСКТОПНАЯ ВЕРСИЯ (ВАШ КОД) === -->
    <div class="desktop-view">
      <div class="table-content">
        <div class="table-header">
          <div class="header-cell usual">Обычный отзыв Яндекс/2ГИС</div>
          <div class="header-cell smart">
            <img src="/favicon.svg" alt="Signal Icon" class="header-icon" />
            Сигнал
          </div>
        </div>
        
        <div class="table-row" v-for="(item, index) in comparisonData" :key="index">
          <div class="cell usual-cell">
            <p>{{ item.regular }}</p>
          </div>
          <div class="cell smart-cell">
            <span class="arrow">→</span>
            <p><strong>{{ item.signal }}</strong></p>
          </div>
        </div>
      </div>
    </div>

    <!-- === УЛУЧШЕННАЯ МОБИЛЬНАЯ ВЕРСИЯ (КАРТОЧКИ) === -->
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
            Сигнал
          </div>
          <div class="mobile-value signal-value">→ {{ item.signal }}</div>
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
/* === ДЕСКТОПНАЯ ВЕРСИЯ (ВАШИ СТИЛИ) === */
.desktop-view {
  display: block;
}
.mobile-view {
  display: none;
}

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
  color: #c8ff5a;
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
.arrow {
  color: #c8ff5a;
  font-size: 16px;
  font-weight: bold;
  flex-shrink: 0;
}

/* === МОБИЛЬНАЯ ВЕРСИЯ (НОВЫЕ СТИЛИ) === */
@media (max-width: 768px) {
  .desktop-view {
    display: none;
  }
  .mobile-view {
    display: block;
  }

  .mobile-card {
    background-color: #222528; /* Графитовый фон */
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
  
  .mobile-label.signal-label {
    color: #c8ff5a;
    opacity: 0.9;
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
