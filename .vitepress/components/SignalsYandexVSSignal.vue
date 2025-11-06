<script setup>
// Данные таблицы можно вынести в реактивные переменные если нужно
</script>
<template>
  <div class="comparison-table">
    <div class="table-content">
      <div class="table-header">
        <div class="header-cell usual">Обычный отзыв Яндекс/2ГИС</div>
        <div class="header-cell smart">⚡ Сигнал</div>
      </div>
      
      <div class="table-row">
        <div class="cell usual-cell">
          <span class="mobile-label">Яндекс/2ГИС:</span>
          <p>Теряется в потоке</p>
        </div>
        <div class="cell smart-cell">
          <span class="mobile-label">Сигнал:</span>
          <span class="arrow">→</span>
          <p><strong>Поступает в работу немедленно</strong></p>
        </div>
      </div>
      
      <div class="table-row">
        <div class="cell usual-cell">
          <span class="mobile-label">Яндекс/2ГИС:</span>
          <p>Решение не гарантировано</p>
        </div>
        <div class="cell smart-cell">
          <span class="mobile-label">Сигнал:</span>
          <span class="arrow">→</span>
          <p><strong>Результат за 24 часа</strong></p>
        </div>
      </div>
      
      <div class="table-row">
        <div class="cell usual-cell">
          <span class="mobile-label">Яндекс/2ГИС:</span>
          <p>Шум без последствий</p>
        </div>
        <div class="cell smart-cell">
          <span class="mobile-label">Сигнал:</span>
          <span class="arrow">→</span>
          <p><strong>Рост бизнеса</strong></p>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.comparison-table {
  width: 100%;
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
  display: flex;
  align-items: center;
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
.mobile-label {
  display: none;
}
/* Мобильная версия */
@media (max-width: 768px) {
  .table-header {
    display: none;
  }
  .table-row {
    grid-template-columns: 1fr;
    border-bottom: 1px solid rgba(255,255,255,0.08);
    padding: 0;
  }
  .table-row:last-child {
    border-bottom: none;
  }
  .cell {
    border-right: none;
    padding: 6px 14px;
    font-size: 12px;
    line-height: 1.2;
  }
  .usual-cell {
    background: rgba(255,255,255,0.04);
    border-bottom: 1px solid rgba(255,255,255,0.05);
    padding-bottom: 4px;
  }
  .smart-cell {
    background: rgba(200,255,90,0.06);
    padding-top: 4px;
    gap: 6px;
  }
  .arrow {
    font-size: 12px;
  }
  .mobile-label {
    display: inline;
    font-size: 10px;
    font-weight: 600;
    opacity: 0.7;
    margin-right: 4px;
  }
  .usual-cell .mobile-label {
    color: rgba(255,255,255,0.6);
  }
  .smart-cell .mobile-label {
    color: #c8ff5a;
  }
}
</style>
