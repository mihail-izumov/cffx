<script setup>
// Данные таблицы можно вынести в реактивные переменные если нужно
</script>

<template>
  <div class="comparison-container">
    <div class="comparison-table">
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
.comparison-container {
  border: 1px solid rgba(255,255,255,0.08);
  background: rgba(255,255,255,0.03);
  border-radius: 12px;
  padding: 16px;
}

.comparison-table {
  width: 100%;
}

.table-header {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1px;
  margin-bottom: 1px;
}

.header-cell {
  padding: 12px 15px;
  font-weight: 600;
  font-size: 14px;
  text-align: center;
  border-radius: 8px 8px 0 0;
}

.header-cell.usual {
  background: rgba(255,255,255,0.04);
  color: rgba(255,255,255,0.7);
  border: 1px solid rgba(255,255,255,0.08);
}

.header-cell.smart {
  background: rgba(200,255,90,0.08);
  color: #c8ff5a;
  border: 1px solid rgba(200,255,90,0.2);
}

.table-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1px;
  margin-bottom: 1px;
}

.table-row:last-child .cell {
  border-radius: 0 0 8px 8px;
}

.cell {
  padding: 14px 15px;
  font-size: 13px;
  line-height: 1.46;
  border-left: 1px solid rgba(255,255,255,0.08);
  border-right: 1px solid rgba(255,255,255,0.08);
  border-bottom: 1px solid rgba(255,255,255,0.08);
}

.usual-cell {
  background: rgba(255,255,255,0.02);
  color: rgba(255,255,255,0.75);
}

.smart-cell {
  background: rgba(200,255,90,0.04);
  color: rgba(255,255,255,0.88);
  position: relative;
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
  .table-header,
  .table-row {
    grid-template-columns: 1fr;
  }
  
  .header-cell.usual {
    border-radius: 8px 8px 0 0;
  }
  
  .header-cell.smart {
    border-radius: 0;
    margin-top: -1px;
  }
  
  .table-row:last-child .usual-cell {
    border-radius: 0;
  }
  
  .table-row:last-child .smart-cell {
    border-radius: 0 0 8px 8px;
  }
  
  .cell {
    border-left: 1px solid rgba(255,255,255,0.08);
    border-right: 1px solid rgba(255,255,255,0.08);
  }
  
  .usual-cell {
    border-bottom: none;
  }
  
  .smart-cell {
    margin-top: -1px;
  }
}
</style>
