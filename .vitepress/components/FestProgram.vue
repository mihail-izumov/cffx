<template>
<div class="festival-schedule">
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
    <!-- Вкладка: Бенке Холл -->
    <div v-show="activeTab === 'benke'" class="content-section">
      <div class="schedule-grid">
        <div class="event-card">
          <h4>Презентация осеннего меню от Хюгешной</h4>
          <div class="badges">
            <span class="time-badge">11:00</span>
            <span class="location-badge">Бенке Холл</span>
          </div>
          <div class="event-author">
            Хюгешная
          </div>
        </div>

        <div class="event-card">
          <h4>Мастер-класс по джезве (турка), воронке, кемексу и гейзерной кофеварке</h4>
          <div class="badges">
            <span class="time-badge">15:00</span>
            <span class="location-badge">Бенке Холл</span>
          </div>
          <div class="event-author">
            Кофейня «На краю земли»
          </div>
        </div>

        <div class="event-card">
          <h4>Домашние методы</h4>
          <div class="badges">
            <span class="time-badge">18:00</span>
            <span class="location-badge">Бенке Холл</span>
          </div>
          <div class="event-author">
            Евгений Ивахненко, 8 Атомов
          </div>
        </div>

        <div class="event-card">
          <h4>Голоса Волги на сцене Станкозавода</h4>
          <div class="badges">
            <span class="time-badge">19:00</span>
            <span class="location-badge">Бенке холл</span>
          </div>
          <div class="event-author">
            Хор «Константа»
          </div>
        </div>

        <div class="event-card">
          <h4>Выставка картин на кофейную тематику – при поддержке Арт 100</h4>
          <div class="badges">
            <span class="time-badge">Весь день</span>
            <span class="location-badge">Бенке холл</span>
          </div>
          <div class="event-author">
            Иван Шкатов, художник
          </div>
        </div>
      </div>
    </div>

    <!-- Вкладка: Малый эвент -->
    <div v-show="activeTab === 'event'" class="content-section">
      <div class="schedule-grid">
        <div class="event-card">
          <h4>Презентация: "НЕ Франшиза: Развитие кофейного рынка Самары"</h4>
          <div class="badges">
            <span class="time-badge">12:00</span>
            <span class="location-badge">Лекторий "Малый эвент"</span>
          </div>
          <div class="event-author">
            Михаил Изюмов, Сигнал
          </div>
        </div>

        <div class="event-card">
          <h4>Кофе и Вино: Органолептика (Блок 1)</h4>
          <div class="badges">
            <span class="time-badge">14:00</span>
            <span class="location-badge">Лекторий "Малый эвент"</span>
          </div>
          <div class="event-author">
            Александр Миронов, старший кавист Vittoria Gourmet
          </div>
        </div>

        <div class="event-card">
          <h4>Кофе и Вино: Органолептика (Блок 2)</h4>
          <div class="badges">
            <span class="time-badge">17:00</span>
            <span class="location-badge">Лекторий "Малый эвент"</span>
          </div>
          <div class="event-author">
            Александр Миронов, старший кавист Vittoria Gourmet
          </div>
        </div>
      </div>
    </div>

    <!-- Вкладка: А106 студия -->
    <div v-show="activeTab === 'studio'" class="content-section">
      <div class="schedule-grid">
        <div class="event-card">
          <h4>Каппинг: Красная комната (Блок 1)</h4>
          <div class="badges">
            <span class="time-badge">13:00</span>
            <span class="location-badge">А106 студия</span>
          </div>
          <div class="event-author">
            MOSAIC
          </div>
        </div>

        <div class="event-card">
          <h4>Каппинг: Красная комната (Блок 2)</h4>
          <div class="badges">
            <span class="time-badge">16:00</span>
            <span class="location-badge">А106 студия</span>
          </div>
          <div class="event-author">
            MOSAIC
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
.festival-schedule {
  margin: 0.5rem 0 1rem 0;
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

.schedule-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 1rem;
}

.event-card {
  background: var(--vp-c-bg-soft);
  border-radius: 10px;
  padding: 1rem;
  border: 1px solid var(--vp-c-divider);
  transition: all 0.2s ease;
  position: relative;
  display: flex;
  flex-direction: column;
}

.event-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
  border-color: var(--vp-c-brand);
}

.event-card h4 {
  margin: 0 0 1rem 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  line-height: 1.3;
}

.badges {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.time-badge, .location-badge {
  display: inline-block;
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  line-height: 1.2;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
}

.time-badge {
  background: linear-gradient(135deg, #84cc16 0%, #a3e635 50%, #84cc16 100%);
  color: #000000;
  box-shadow: 0 4px 15px rgba(132, 204, 22, 0.4);
  font-weight: 700;
}

.time-badge:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(132, 204, 22, 0.5);
}

.location-badge {
  background: linear-gradient(135deg, #22c55e 0%, #16a34a 50%, #15803d 100%);
  color: #ffffff;
  box-shadow: 0 4px 15px rgba(34, 197, 94, 0.2);
}

.location-badge:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(34, 197, 94, 0.3);
}

.time-badge::before, .location-badge::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
  transition: left 0.5s;
}

.time-badge:hover::before, .location-badge:hover::before {
  left: 100%;
}

.event-author {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-2);
  padding: 0.6rem;
  border-radius: 6px;
  font-size: 0.85rem;
  margin-top: auto;
  width: fit-content;
}

.event-author strong {
  color: var(--vp-c-text-1);
}

/* Адаптивность */
@media (max-width: 768px) {
  .festival-schedule {
    margin: 0.25rem 0 1rem 0;
  }
  
  .tabs {
    flex-wrap: wrap;
    justify-content: center;
  }
  
  .schedule-grid {
    grid-template-columns: 1fr;
    gap: 0.8rem;
  }
  
  .event-card {
    padding: 0.8rem;
  }
  
  .badges {
    flex-wrap: wrap;
  }
}
</style>
