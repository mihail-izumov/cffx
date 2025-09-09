<template>
<div class="festival-experience">
<!-- Блок с кнопками для переключения вкладок -->
<div class="tabs">
  <button :class="{ active: activeTab === 'tastings' }" @click="activeTab = 'tastings'">
    ☕ Дегустации
  </button>
  <button :class="{ active: activeTab === 'pairings' }" @click="activeTab = 'pairings'">
    🍷 Пейринги
  </button>
  <button :class="{ active: activeTab === 'masterclasses' }" @click="activeTab = 'masterclasses'">
    🎨 Мастер-классы
  </button>
  <button :class="{ active: activeTab === 'lectures' }" @click="activeTab = 'lectures'">
    📚 Лекции и обучение
  </button>
</div>

<!-- Контент для вкладок -->
<div class="tab-content">
  <!-- Вкладка 1: Дегустации -->
  <div v-show="activeTab === 'tastings'" class="content-section">
    <h3>Погрузитесь в мир вкусов через профессиональные дегустации</h3>
    
    <div class="experience-grid">
      <div class="experience-card">
        <div class="card-header">
          <h4>Профессиональный каппинг</h4>
          <span class="card-badge">SCA стандарты</span>
        </div>
        <p class="card-description">Учитесь оценивать кофе по международным стандартам. Развивайте навыки Q-грейдера и понимание качественных характеристик зерна.</p>
        <div class="card-highlight">
          <strong>Ведут:</strong> Q-грейдеры от Skuratov и Coffee Balance
        </div>
      </div>

      <div class="experience-card">
        <div class="card-header">
          <h4>Слепые дегустации</h4>
          <span class="card-badge">Без предрассудков</span>
        </div>
        <p class="card-description">Развивайте чувствительность вкусовых рецепторов, учитесь определять происхождение и способ обработки зерна без визуальных подсказок.</p>
        <div class="card-highlight">
          <strong>Формат:</strong> 8 самарских обжарщиков • "Угадай происхождение"
        </div>
      </div>

      <div class="experience-card">
        <div class="card-header">
          <h4>Треугольные тесты</h4>
          <span class="card-badge">Точность восприятия</span>
        </div>
        <p class="card-description">Тренируйте способность различать тонкие нюансы в похожих образцах. Профессиональный инструмент контроля качества.</p>
        <div class="card-highlight">
          <strong>Задача:</strong> Найти отличия в одном зерне из разных партий
        </div>
      </div>
    </div>
  </div>

  <!-- Вкладка 2: Пейринги -->
  <div v-show="activeTab === 'pairings'" class="content-section">
    <h3>Откройте гармонию вкусов через уникальные сочетания</h3>
    
    <div class="experience-grid">
      <div class="experience-card">
        <div class="card-header">
          <h4>Wine & Coffee</h4>
          <span class="card-badge">Авторские пары</span>
        </div>
        <p class="card-description">Изучайте принципы сочетания кислотности, сладости и танинов. Понимайте, как вино и кофе могут дополнять друг друга.</p>
        <div class="card-highlight">
          <strong>Партнеры:</strong> Винотека "Градус" × White Cup
        </div>
      </div>

      <div class="experience-card">
        <div class="card-header">
          <h4>Кофе и десерты</h4>
          <span class="card-badge">Гастрономия</span>
        </div>
        <p class="card-description">Понимайте, как текстуры и вкусы усиливают друг друга. Секреты создания идеальных сочетаний от профессиональных кондитеров.</p>
        <div class="card-highlight">
          <strong>Специально:</strong> Кондитеры "Коржа" под разные сорта кофе
        </div>
      </div>

      <div class="experience-card">
        <div class="card-header">
          <h4>Coffee & Craft Beer</h4>
          <span class="card-badge">Эксперименты</span>
        </div>
        <p class="card-description">Исследуйте неожиданные комбинации горечи, фруктовости и солодовости. Новая граница гастрономических открытий.</p>
        <div class="card-highlight">
          <strong>Крафт:</strong> "Жигулевское" × Cold Brew Bar
        </div>
      </div>
    </div>
  </div>

  <!-- Вкладка 3: Мастер-классы -->
  <div v-show="activeTab === 'masterclasses'" class="content-section">
    <h3>Получите практические навыки от профессионалов индустрии</h3>
    
    <div class="experience-grid">
      <div class="experience-card">
        <div class="card-header">
          <h4>Латте-арт для начинающих</h4>
          <span class="card-badge">Hands-on</span>
        </div>
        <p class="card-description">Основы работы с молочной пеной, создание базовых рисунков. От простого сердца до сложного тюльпана.</p>
        <div class="card-highlight">
          <strong>Мастер:</strong> Чемпион Поволжья из Surf Coffee
        </div>
      </div>

      <div class="experience-card">
        <div class="card-header">
          <h4>Альтернативные способы</h4>
          <span class="card-badge">V60 • Chemex • AeroPress</span>
        </div>
        <p class="card-description">Как выбрать метод заваривания под конкретное зерно и настроение. Секреты извлечения максимума вкуса.</p>
        <div class="card-highlight">
          <strong>Опыт:</strong> Бариста-тренеры Green House • 10+ лет
        </div>
      </div>

      <div class="experience-card">
        <div class="card-header">
          <h4>Домашняя обжарка</h4>
          <span class="card-badge">От зерна до чашки</span>
        </div>
        <p class="card-description">Понимание профилей обжарки, работа с домашним оборудованием. Создавайте уникальные вкусы самостоятельно.</p>
        <div class="card-highlight">
          <strong>Ведут:</strong> Основатели "Самарские зерна"
        </div>
      </div>
    </div>
  </div>

  <!-- Вкладка 4: Лекции и обучение -->
  <div v-show="activeTab === 'lectures'" class="content-section">
    <h3>Расширьте кофейные горизонты через экспертные знания</h3>
    
    <div class="experience-grid">
      <div class="experience-card">
        <div class="card-header">
          <h4>Развитие вкусового словаря</h4>
          <span class="card-badge">Flavor Wheel</span>
        </div>
        <p class="card-description">Научитесь описывать сложные букеты, используя профессиональные дескрипторы. Язык кофейных экспертов станет вашим языком.</p>
        <div class="card-highlight">
          <strong>Спикер:</strong> Q-грейдер • Судья российских чемпионатов
        </div>
      </div>

      <div class="experience-card">
        <div class="card-header">
          <h4>География кофе</h4>
          <span class="card-badge">Терруар</span>
        </div>
        <p class="card-description">Как климат, почва и высота влияют на вкус. Путешествие от эфиопских плато до колумбийских склонов через призму чашки.</p>
        <div class="card-highlight">
          <strong>Опыт:</strong> 15 лет прямых закупок • Импортер зеленого кофе
        </div>
      </div>

      <div class="experience-card">
        <div class="card-header">
          <h4>Наука о кофе</h4>
          <span class="card-badge">Химия вкуса</span>
        </div>
        <p class="card-description">Химические процессы экстракции, влияние температуры и времени на вкус. Научный подход к идеальной чашке.</p>
        <div class="card-highlight">
          <strong>Эксперт:</strong> Технолог производства • Исследователь индустрии
        </div>
      </div>
    </div>
  </div>
</div>
</div>
</template>

<script setup>
import { ref } from 'vue'
const activeTab = ref('tastings')
</script>

<style scoped>
.festival-experience {
  margin: 1.5rem 0;
}

.tabs {
  display: inline-flex;
  gap: 4px;
  margin-bottom: 1.5rem;
  background: #2a2a2a;
  border-radius: 10px;
  padding: 4px;
}

.tabs button {
  padding: 8px 12px;
  border: none;
  background: transparent;
  color: #9ca3af;
  cursor: pointer;
  border-radius: 6px;
  font-weight: 500;
  transition: all 0.2s ease;
  font-size: 0.9rem;
  white-space: nowrap;
}

.tabs button:hover {
  background: rgba(255, 255, 255, 0.05);
  color: #ffffff;
}

.tabs button.active {
  background: #84cc16;
  color: #000000;
  font-weight: 600;
}

.content-section {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

.content-section h3 {
  font-size: 1.3rem;
  margin-bottom: 1.2rem;
  color: var(--vp-c-text-1);
  font-weight: 600;
}

.experience-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1rem;
}

.experience-card {
  background: var(--vp-c-bg-soft);
  border-radius: 10px;
  padding: 1rem;
  border: 1px solid var(--vp-c-divider);
  transition: all 0.2s ease;
}

.experience-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
  border-color: var(--vp-c-brand);
}

.card-header {
  margin-bottom: 0.75rem;
}

.card-header h4 {
  margin: 0 0 0.5rem 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  line-height: 1.3;
}

.card-badge {
  display: inline-block;
  background: #4ade80;
  color: #000000;
  padding: 3px 8px;
  border-radius: 4px;
  font-size: 0.7rem;
  font-weight: 600;
  line-height: 1.2;
}

.card-description {
  color: var(--vp-c-text-2);
  line-height: 1.5;
  margin-bottom: 0.75rem;
  font-size: 0.9rem;
}

.card-highlight {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.6rem;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.card-highlight strong {
  color: var(--vp-c-text-1);
}

/* Адаптивность */
@media (max-width: 768px) {
  .tabs {
    flex-wrap: wrap;
    justify-content: center;
  }
  
  .experience-grid {
    grid-template-columns: 1fr;
    gap: 0.8rem;
  }
  
  .experience-card {
    padding: 0.8rem;
  }
}
</style>
