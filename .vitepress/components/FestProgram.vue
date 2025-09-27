<template>
<div class="festival-experience">
<!-- Блок с кнопками для переключения вкладок -->
<div class="tabs">
  <button :class="{ active: activeTab === 'benke' }" @click="activeTab = 'benke'">
    Бенке Холл
  </button>
  <button :class="{ active: activeTab === 'event' }" @click="activeTab = 'event'">
    Малый эвент
  </button>
  <button :class="{ active: activeTab === 'studio' }" @click="activeTab = 'studio'">
    А106 студия
  </button>
</div>
<!-- Контент для вкладок -->
<div class="tab-content">
  <!-- Вкладка 1: Бенке Холл -->
  <div v-show="activeTab === 'benke'" class="content-section">
    <h3>Основная площадка фестиваля с разнообразной программой</h3>
    
    <div class="experience-grid">
      <!-- Изображение в рамках карточки - ПЕРВОЕ -->
      <div class="experience-card image-card">
        <img src="/benke-hall.jpg" alt="Бенке Холл" class="card-image" />
      </div>
      
      <div class="experience-card">
        <div class="card-header">
          <h4>Презентация осеннего меню от Хюгешной</h4>
          <div class="card-badges">
            <span class="time-badge">11:00</span>
            <span class="location-badge">Бенке Холл</span>
          </div>
        </div>
        <p class="card-description">Знакомство с новыми осенними позициями меню, сезонными напитками и авторскими рецептами от команды Хюгешной.</p>
        <div class="card-highlight">
          <strong>Кто:</strong> Хюгешная
        </div>
      </div>

      <div class="experience-card">
        <div class="card-header">
          <h4>Мастер-класс по джезве (турка), воронке, кемексу и гейзерной кофеварке</h4>
          <div class="card-badges">
            <span class="time-badge">15:00</span>
            <span class="location-badge">Бенке Холл</span>
          </div>
        </div>
        <p class="card-description">Практические навыки заваривания кофе различными домашними методами. Изучение особенностей каждого способа приготовления.</p>
        <div class="card-highlight">
          <strong>Кто:</strong> Кофейня «На краю земли»
        </div>
      </div>

      <div class="experience-card">
        <div class="card-header">
          <h4>Домашние методы</h4>
          <div class="card-badges">
            <span class="time-badge">18:00</span>
            <span class="location-badge">Бенке Холл</span>
          </div>
        </div>
        <p class="card-description">Освоение простых и доступных способов приготовления качественного кофе в домашних условиях каждый день.</p>
        <div class="card-highlight">
          <strong>Кто:</strong> Евгений Ивахненко, 8 Атомов
        </div>
      </div>

      <div class="experience-card">
        <div class="card-header">
          <h4>Голоса Волги на сцене Станкозавода</h4>
          <div class="card-badges">
            <span class="time-badge">19:00</span>
            <span class="location-badge">Бенке Холл</span>
          </div>
        </div>
        <p class="card-description">Музыкальное выступление хора с репертуаром, вдохновленным культурой и традициями Поволжья.</p>
        <div class="card-highlight">
          <strong>Кто:</strong> Хор «Константа»
        </div>
      </div>

      <div class="experience-card">
        <div class="card-header">
          <h4>Выставка картин на кофейную тематику – при поддержке Арт 100</h4>
          <div class="card-badges">
            <span class="time-badge">Весь день</span>
            <span class="location-badge">Бенке Холл</span>
          </div>
        </div>
        <p class="card-description">Художественная экспозиция работ, посвященных кофейной культуре, истории и традициям кофейного дела.</p>
        <div class="card-highlight">
          <strong>Кто:</strong> Иван Шкатов, художник
        </div>
      </div>
    </div>
  </div>

  <!-- Вкладка 2: Малый эвент -->
  <div v-show="activeTab === 'event'" class="content-section">
    <h3>Образовательные лекции и профессиональные дегустации</h3>
    
    <div class="experience-grid">
      <!-- Изображение в рамках карточки - ПЕРВОЕ -->
      <div class="experience-card image-card">
        <img src="/event-hall.jpg" alt="Малый эвент" class="card-image" />
      </div>
      
      <div class="experience-card">
        <div class="card-header">
          <h4>Презентация: "НЕ Франшиза: Развитие кофейного рынка Самары"</h4>
          <div class="card-badges">
            <span class="time-badge">12:00</span>
            <span class="location-badge">Малый эвент</span>
          </div>
        </div>
        <p class="card-description">Детальный анализ развития независимых кофеен в Самаре, альтернативные модели ведения кофейного бизнеса и перспективы рынка.</p>
        <div class="card-highlight">
          <strong>Кто:</strong> Михаил Изюмов, Сигнал
        </div>
      </div>

      <div class="experience-card">
        <div class="card-header">
          <h4>Кофе и Вино: Органолептика (Блок 1)</h4>
          <div class="card-badges">
            <span class="time-badge">14:00</span>
            <span class="location-badge">Малый эвент</span>
          </div>
        </div>
        <p class="card-description">Изучение принципов сочетания кофе и вина, развитие навыков органолептического анализа и создание идеальных пейрингов.</p>
        <div class="card-highlight">
          <strong>Кто:</strong> Александр Миронов, старший кавист Vittoria Gourmet
        </div>
      </div>

      <div class="experience-card">
        <div class="card-header">
          <h4>Кофе и Вино: Органолептика (Блок 2)</h4>
          <div class="card-badges">
            <span class="time-badge">17:00</span>
            <span class="location-badge">Малый эвент</span>
          </div>
        </div>
        <p class="card-description">Продолжение изучения гармонии вкусов, углубленное понимание взаимодействия кофейных и винных характеристик.</p>
        <div class="card-highlight">
          <strong>Кто:</strong> Александр Миронов, старший кавист Vittoria Gourmet
        </div>
      </div>
    </div>
  </div>

  <!-- Вкладка 3: А106 студия -->
  <div v-show="activeTab === 'studio'" class="content-section">
    <h3>Профессиональные каппинги и дегустации специалистов</h3>
    
    <div class="experience-grid">
      <!-- Изображение в рамках карточки - ПЕРВОЕ -->
      <div class="experience-card image-card">
        <img src="/studio-a106.jpg" alt="А106 студия" class="card-image" />
      </div>
      
      <div class="experience-card">
        <div class="card-header">
          <h4>Каппинг: Красная комната (Блок 1)</h4>
          <div class="card-badges">
            <span class="time-badge">13:00</span>
            <span class="location-badge">А106 студия</span>
          </div>
        </div>
        <p class="card-description">Профессиональная дегустация кофе по международным стандартам SCA в специально оборудованном пространстве для каппинга.</p>
        <div class="card-highlight">
          <strong>Кто:</strong> MOSAIC
        </div>
      </div>

      <div class="experience-card">
        <div class="card-header">
          <h4>Каппинг: Красная комната (Блок 2)</h4>
          <div class="card-badges">
            <span class="time-badge">16:00</span>
            <span class="location-badge">А106 студия</span>
          </div>
        </div>
        <p class="card-description">Второй блок профессионального каппинга с углубленным анализом различных образцов кофе и их характеристик.</p>
        <div class="card-highlight">
          <strong>Кто:</strong> MOSAIC
        </div>
      </div>
    </div>
  </div>
</div>
</div>
</template>

<script setup>
import { ref } from 'vue'
const activeTab = ref('benke')
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

.card-badges {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.time-badge {
  display: inline-block;
  background: #84cc16;
  color: #000000;
  padding: 3px 8px;
  border-radius: 4px;
  font-size: 0.7rem;
  font-weight: 600;
  line-height: 1.2;
}

.location-badge {
  display: inline-block;
  background: #6b7280;
  color: #ffffff;
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
  background: #1a1a1a;
  color: #ffffff;
  border-radius: 6px;
  padding: 0.5rem 0.75rem;
  font-size: 0.85rem;
  display: inline-block;
  width: fit-content;
}

.card-highlight strong {
  color: #ffffff;
  font-weight: 600;
}

/* Стили для карточки с изображением */
.image-card {
  padding: 0;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  border-radius: 10px;
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
  
  .image-card {
    padding: 0;
  }
}
</style>
