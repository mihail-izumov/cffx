<template>
  <div class="coffee-plans-container">
    <div class="coffee-plan-card">
      <div class="card-content">
        <h3 class="card-title">Первая кофейня</h3>
        <p class="card-description">
          Вы мечтаете о своей кофейне. Вы хотите избежать дорогих ошибок и запустить бизнес, который сразу начнет приносить радость, а не проблемы. Пульс Сигнала — это ваш самый быстрый путь от идеи до первой прибыли.
        </p>
        <p class="card-highlight">
          <strong>Получите проверенный план локации, финансов и запуска на основе анализа успешных кейсов Самары.</strong>
        </p>
      </div>
      <a href="/invest/pulse#живые-данные-кофеиного-рынка-для-умных-инвестиции" class="card-button">
        <strong>Получить план запуска</strong>
      </a>
    </div>
    
    <div class="coffee-plan-card">
      <div class="card-content">
        <h3 class="card-title">Расширение сети</h3>
        <p class="card-description">
          У вас уже есть кофейня, и скорее всего даже не одна. Вы знаете цену успеху и устали от операционной рутины. Вы хотите расти, систематизировать хаос и превратить свой бизнес в актив, который работает на вас.
        </p>
        <p class="card-highlight">
          <strong>Узнайте, где и как открыть следующую точку для максимальной прибыли.</strong>
        </p>
      </div>
      <a href="/invest/pulse#живые-данные-кофеиного-рынка-для-умных-инвестиции" class="card-button">
        <strong>Стратегия расширения</strong>
      </a>
    </div>
  </div>
</template>

<style scoped>
.coffee-plans-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.coffee-plan-card {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 28px;
  display: flex;
  flex-direction: column;
  height: 100%;
  transition: all 0.3s ease;
}

.coffee-plan-card:hover {
  border-color: #c5f946;
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(197, 249, 70, 0.15);
}

.card-content {
  flex: 1;
  margin-bottom: 1.5rem;
}

.card-title {
  color: #c5f946 !important;
  margin: 0 0 1.2rem 0;
  font-size: 1.4rem;
  font-weight: 600;
  line-height: 1.3;
}

.card-description {
  margin: 0 0 1.2rem 0;
  line-height: 1.6;
  color: var(--vp-c-text-1);
  font-size: 1.05rem;
}

.card-highlight {
  margin: 0;
  line-height: 1.6;
  color: var(--vp-c-text-1);
  font-size: 1.05rem;
}

.card-button {
  background: #c5f946;
  color: #1a1a1a !important;
  padding: 16px 32px;
  border-radius: 8px;
  text-decoration: none;
  text-align: center;
  font-weight: 600;
  font-size: 1.05rem;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
  margin-top: auto;
}

.card-button:hover {
  background: #b8e63f;
  transform: translateY(-1px);
  box-shadow: 0 4px 15px rgba(197, 249, 70, 0.3);
}

.card-button:active {
  transform: translateY(0);
}

/* Светлая тема */
:root:not(.dark) .coffee-plan-card {
  background: #f6f6f7;
  border: 1px solid #e2e2e3;
}

:root:not(.dark) .card-title {
  color: #2d5016 !important;
}

:root:not(.dark) .card-button {
  background: #2d5016;
  color: #ffffff !important;
}

:root:not(.dark) .card-button:hover {
  background: #1f3a0f;
}

/* Мобильная адаптация */
@media (max-width: 768px) {
  .coffee-plans-container {
    grid-template-columns: 1fr;
    gap: 1rem;
    margin: 1.5rem 0;
  }
  
  .coffee-plan-card {
    padding: 24px;
  }
  
  .card-title {
    font-size: 1.25rem;
    margin-bottom: 1rem;
  }
  
  .card-description,
  .card-highlight {
    font-size: 1rem;
  }
  
  .card-button {
    padding: 16px 24px;
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .coffee-plans-container {
    margin: 1rem 0;
  }
  
  .coffee-plan-card {
    padding: 20px;
  }
  
  .card-title {
    font-size: 1.2rem;
  }
  
  .card-description,
  .card-highlight {
    font-size: 0.95rem;
  }
  
  .card-button {
    padding: 14px 20px;
    font-size: 0.95rem;
  }
}
</style>
