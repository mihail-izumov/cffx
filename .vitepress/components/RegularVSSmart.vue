<script setup>
// Данные таблицы можно вынести в реактивные переменные если нужно
</script>

<template>
  <div class="comparison-table">
    <div class="table-content">
      <div class="table-header">
        <div class="header-cell usual">Как обычно</div>
        <div class="header-cell smart">Умная Кофейня</div>
      </div>
      
      <div class="table-row">
        <div class="cell usual-cell">
          <p>Нечеткое понимание проблем и возможностей</p>
        </div>
        <div class="cell smart-cell">
          <span class="arrow">→</span>
          <p><strong>Точки роста</strong> с задачами и приоритетами</p>
        </div>
      </div>
      
      <div class="table-row">
        <div class="cell usual-cell">
          <p>Отсутствие системного плана развития</p>
        </div>
        <div class="cell smart-cell">
          <span class="arrow">→</span>
          <p><strong>Точный план</strong> улучшений</p>
        </div>
      </div>
      
      <div class="table-row">
        <div class="cell usual-cell">
          <p>Ручной и хаотичный контроль процессов</p>
        </div>
        <div class="cell smart-cell">
          <span class="arrow">→</span>
          <p><strong>Непрерывная оценка</strong> ключевых процессов</p>
        </div>
      </div>
      
      <div class="table-row">
        <div class="cell usual-cell">
          <p>Низкая вовлеченность команды</p>
        </div>
        <div class="cell smart-cell">
          <span class="arrow">→</span>
          <p><strong>Конкретные метрики</strong> роста вовлеченности</p>
        </div>
      </div>
      
      <div class="table-row">
        <div class="cell usual-cell">
          <p>Отсутствие данных для принятия решений</p>
        </div>
        <div class="cell smart-cell">
          <span class="arrow">→</span>
          <p><strong>Сигналы для оперативной</strong> корректировки курса</p>
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
  padding: 12px 18px;
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
  padding: 12px 18px;
  font-size: 14px;
  line-height: 1.3;
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
  gap: 10px;
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

/* Мобильная версия */
@media (max-width: 768px) {
  .table-header {
    display: none;
  }
  
  .table-row {
    grid-template-columns: 1fr;
    padding: 14px 18px;
    gap: 8px;
  }
  
  .table-row:not(:last-child) {
    border-bottom: 1px solid rgba(255,255,255,0.08);
  }
  
  .cell {
    padding: 0;
    border-right: none;
    background: transparent !important;
  }
  
  .usual-cell {
    margin-bottom: 8px;
  }
  
  .smart-cell {
    gap: 8px;
  }
  
  .arrow {
    font-size: 14px;
  }
}
</style>
