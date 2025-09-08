<script setup>
// Данные таблицы можно вынести в реактивные переменные если нужно
</script>

<template>
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
</template>

<style scoped>
.comparison-table {
  width: 100%;
}

.table-header {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 20px;
}

.header-cell {
  padding: 12px 20px;
  font-weight: 600;
  font-size: 14px;
  text-align: center;
  border-radius: 12px;
}

.header-cell.usual {
  background: rgba(255,255,255,0.06);
  color: rgba(255,255,255,0.7);
}

.header-cell.smart {
  background: rgba(200,255,90,0.12);
  color: #c8ff5a;
}

.table-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 16px;
}

.cell {
  padding: 18px 20px;
  font-size: 14px;
  line-height: 1.5;
  border-radius: 12px;
}

.usual-cell {
  background: rgba(255,255,255,0.04);
  color: rgba(255,255,255,0.75);
}

.smart-cell {
  background: rgba(200,255,90,0.06);
  color: rgba(255,255,255,0.88);
  display: flex;
  align-items: center;
  gap: 12px;
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
  font-size: 18px;
  font-weight: bold;
  flex-shrink: 0;
}

/* Мобильная версия */
@media (max-width: 768px) {
  .table-header,
  .table-row {
    grid-template-columns: 1fr;
    gap: 8px;
  }
  
  .table-header {
    margin-bottom: 16px;
  }
  
  .table-row {
    margin-bottom: 12px;
  }
  
  .cell {
    padding: 16px 18px;
    font-size: 13px;
  }
  
  .arrow {
    font-size: 16px;
  }
}
</style>
