<script setup>
const cards = [
  {
    status: '🟢',
    city: 'Симулятор Самары',
    difficulty: 'Сложность: ★★☆',
    scenario: '⚔️ Душа против системы',
    image: 'https://i.postimg.cc/mDw1xVz3/samara-korzh.jpg',
    specs: [
      { label: 'Игроки в фокусе', value: 'Корж, Skuratov, Surf Coffee, White Cup, Coffee Balance' },
      { label: 'Ядро симуляции', value: '~20 точек, формирующих эпицентр конкуренции' },
      { label: 'Вызов', value: 'Как масштабировать уют, не потеряв магию бренда?' }
    ],
    button: { text: 'Войти →', href: '/simulator/samara', secondary: false }
  },
  {
    status: '🟡',
    city: 'Симулятор Новосибирска',
    difficulty: 'Сложность: ★★★',
    scenario: '🎯 Массовость против премиума',
    image: 'https://i.postimg.cc/x15tDnzj/novosibirsk-skuratov-greenhouse.jpg',
    specs: [
      { label: 'Игроки в фокусе', value: 'Green House (массовость) vs. Skuratov (качество)' },
      { label: 'Ядро симуляции', value: '~100 точек двух ключевых титанов рынка' },
      { label: 'Вызов', 'value': 'Найти асимметричный ответ федеральному гиганту, вскрыв его внутренние противоречия' }
    ],
    button: { text: 'Следить →', href: '/simulator/novosibirsk', secondary: true }
  }
]
</script>

<div class="card-grid-container">
  <div v-for="card in cards" :key="card.city" class="simulator-card">
    <div class="card-header-row">
      <div class="card-header-left">
        <span class="status-dot">{{ card.status }}</span>
        <span class="card-city-title">{{ card.city }}</span>
      </div>
      <div class="card-header-right">
        <span class="card-difficulty">{{ card.difficulty }}</span>
      </div>
    </div>

    <div class="scenario-line">{{ card.scenario }}</div>

    <div class="card-image-wrapper">
      <img :src="card.image" :alt="card.city" class="card-image">
    </div>

    <div class="card-specs">
      <div v-for="spec in card.specs" :key="spec.label" class="spec-item">
        <span class="spec-label">{{ spec.label }}</span>
        <span class="spec-value">{{ spec.value }}</span>
      </div>
    </div>

    <a :href="card.button.href" class="card-button" :class="{ 'card-button--secondary': card.button.secondary }">
      {{ card.button.text }}
    </a>
  </div>
</div>

<style>
  :root {
    --brand-color: #C5F946;
    --panel-bg: #1c1c1e;
    --panel-border: #3a3a3c;
    --text-primary: #f2f2f7;
    --text-secondary: #8e8e93;
  }

  .card-grid-container {
    display: grid; 
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); 
    gap: 1.5rem; 
    margin: 2rem 0;
  }

  .simulator-card {
    background-color: var(--panel-bg);
    border: 1px solid var(--panel-border);
    border-radius: 18px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    transition: all 0.3s ease;
    box-sizing: border-box;
    min-height: 490px;
  }

  .simulator-card:hover {
    transform: translateY(-5px);
    border-color: var(--brand-color);
    box-shadow: 0 10px 30px rgba(0,0,0,0.25);
  }

  .card-header-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 4px 2px 8px 2px;
  }
  
  .card-header-left {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    min-width: 0;
  }
  
  .status-dot {
    font-size: 1rem;
    line-height: 1;
  }
  
  .card-city-title {
    color: var(--text-secondary);
    font-size: 0.84rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  .card-header-right {
    flex-shrink: 0;
    color: var(--text-secondary);
    font-size: 0.8rem;
    white-space: nowrap;
  }

  .scenario-line {
    color: var(--text-primary);
    font-size: 1.25rem;
    font-weight: 600;
    line-height: 1.3;
    text-align: center;
    margin: 8px 0 16px 0;
    min-height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .card-image-wrapper {
    width: 100%;
    height: 168px;
    border-radius: 12px;
    overflow: hidden;
    margin-bottom: 20px;
  }
  
  .card-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .card-specs {
    display: flex;
    flex-direction: column;
    gap: 14px;
    flex-grow: 1;
  }
  
  .spec-item { 
    line-height: 1.45; 
  }
  
  .spec-label {
    display: block;
    font-size: 0.78rem;
    color: var(--text-secondary);
    margin-bottom: 3px;
    font-weight: 500;
  }
  
  .spec-value {
    display: block;
    font-size: 0.94rem;
    font-weight: 500;
    color: var(--text-primary);
  }

  .card-button {
    margin-top: 20px;
    background-color: var(--brand-color);
    color: #000;
    padding: 12px 16px;
    border-radius: 10px;
    font-weight: 700;
    font-size: 0.92rem;
    text-align: center;
    text-decoration: none;
    transition: all 0.25s ease;
    border: 2px solid transparent;
    box-sizing: border-box;
    display: block;
  }

  .card-button:hover {
    background: #fff !important;
    color: #000 !important;
    transform: translateY(-1px);
  }

  .card-button.card-button--secondary {
    background: transparent;
    color: var(--brand-color);
    border-color: var(--brand-color);
  }

  .card-button.card-button--secondary:hover {
    background: var(--brand-color) !important;
    color: #000 !important;
  }
</style>
