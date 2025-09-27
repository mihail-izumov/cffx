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
  margin: 0.75rem 0;
  padding: 1rem;
  border-radius: 14px;
  background: rgba(22, 24, 28, 0.6);
  backdrop-filter: blur(6px);
  border: 1px solid rgba(132, 204, 22, 0.15);
}

.tabs {
  display: inline-flex;
  gap: 4px;
  margin-bottom: 1.5rem;
  background: rgba(34, 38, 44, 0.8);
  border: 1px solid rgba(132, 204, 22, 0.12);
  border-radius: 10px;
  padding: 4px;
}

.tabs button {
  padding: 8px 12px;
  border: none;
  background: transparent;
  color: #c9d1d9;
  cursor: pointer;
  border-radius: 6px;
  font-weight: 500;
  transition: all 0.2s ease;
  font-size: 0.9rem;
  white-space: nowrap;
}

.tabs button:hover {
  background: rgba(132, 204, 22, 0.08);
  color: #e5e7eb;
}

.tabs button.active {
  background: #84cc16;
  color: #0b0f12;
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
  gap: 0.9rem;
}

.event-card {
  background: linear-gradient(180deg, rgba(32,36,42,0.9), rgba(28,31,36,0.9));
  border: 1px solid rgba(99,102,241,0.08);
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 6px 18px rgba(0,0,0,0.25);
  transition: all 0.2s ease;
  position: relative;
  display: flex;
  flex-direction: column;
}

.event-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 28px rgba(0,0,0,0.35);
  border-color: rgba(132,204,22,0.25);
}

.event-card h4 {
  margin: 0 0 1rem 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: #e8eaed;
  line-height: 1.3;
}

.badges {
  display: flex;
  gap: 0.45rem;
  margin-bottom: 1rem;
}

.time-badge, .location-badge {
  display: inline-block;
  padding: 6px 12px;
  border-radius: 999px;
  font-size: 0.78rem;
  font-weight: 700;
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(255,255,255,0.12);
  box-shadow: inset 0 0 0 1px rgba(0,0,0,0.25), 0 6px 18px rgba(0,0,0,0.25);
  transition: transform .2s ease, box-shadow .2s ease;
}

.time-badge {
  background: radial-gradient(120% 120% at 10% 10%, #a3e635 0%, #84cc16 40%, #65a30d 100%);
  color: #0b0f12;
}

.location-badge {
  background: radial-gradient(120% 120% at 10% 10%, #a78bfa 0%, #6366f1 45%, #4f46e5 100%);
  color: #0b0f12;
}

.time-badge::before, .location-badge::before {
  content: "";
  position: absolute;
  inset: -40% -60% auto auto;
  width: 140%;
  height: 200%;
  background: conic-gradient(from 0deg, rgba(255,255,255,0.22), rgba(255,255,255,0.06), transparent 60%);
  mix-blend-mode: screen;
  transform: rotate(12deg);
}

.time-badge:hover, .location-badge:hover {
  transform: translateY(-1px);
  box-shadow: inset 0 0 0 1px rgba(0,0,0,0.25), 0 10px 24px rgba(0,0,0,0.35);
}

.event-author {
  margin-top: auto;
  width: fit-content;
  color: #e5e7eb;
  background: linear-gradient(180deg, #13161a, #0f1216);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 8px;
  padding: 6px 10px;
  font-size: 0.9rem;
  font-weight: 500;
  box-shadow: 0 4px 14px rgba(0,0,0,0.35);
}

/* Адаптивность */
@media (max-width: 768px) {
  .festival-schedule {
    margin-top: 0.5rem;
    padding: 0.85rem;
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
    padding: 0.9rem;
  }
  
  .badges {
    flex-wrap: wrap;
  }
}
</style>
