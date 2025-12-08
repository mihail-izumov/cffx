<script setup>
import { ref } from 'vue'
const activeTab = ref('idea')
</script>

<template>
  <div class="how-it-works-widget">
    
    <!-- Заголовок секции -->
    <div class="widget-header">
      <h2 class="widget-title">Почему бы не присоединиться?</h2>
      <p class="widget-subtitle">
        За восемь лет инвесторами в «Корж» стали не только Андрей и Елена Ивановы, но и гости, и команда. Любовь и доверие, которые конвертируются в рост сети.
      </p>
    </div>

    <!-- Навигация (Табы) -->
    <div class="tabs-container">
      <button 
        v-for="tab in [
          { id: 'idea', label: 'Идея' },
          { id: 'growth', label: 'Рост' },
          { id: 'guests', label: 'Гости' },
          { id: 'community', label: 'Сообщество' }
        ]" 
        :key="tab.id"
        :class="['tab-button', { active: activeTab === tab.id }]" 
        @click="activeTab = tab.id"
      >
        {{ tab.label }}
      </button>
    </div>

    <!-- Панель контента -->
    <div class="content-panel">
      
      <!-- Вкладка: Идея -->
      <div v-show="activeTab === 'idea'" class="tab-content">
        <h3>Идея: анти-сеть с человеческим лицом</h3>
        <p>
          Большинство городских кофеен похожи друг на друга: быстрый поток, одинаковый интерьер, мало жизни. «Корж» задумывался как противоположность — место, где важен человек, тишина внутри и честный продукт.
        </p>
        <p>
          Каждая кофейня сети — не копия, а живая точка на карте города: со своим ритмом, привычными гостями и командой, которую знают по именам. При этом философия «человек-человек» и любовь к деталям остаются общими для всех.
        </p>
      </div>

      <!-- Вкладка: Рост сети -->
      <div v-show="activeTab === 'growth'" class="tab-content">
        <h3>Рост сети: один внимательный шаг за другим</h3>
        <p>
          История началась в 2017 году с небольшого пространства, которое долгое время работало в минус и держалось на упрямстве основателей. Пересборка концепции, честный разбор ошибок и ставка на фирменные десерты позволили выйти в плюс.
        </p>
        <p>
          Новые кофейни появлялись не ради «галочки», а когда команда была уверена в продукте, людях и районе. Так «Корж» органично дорос до восьми локаций без франшизы, сохранив ощущение одной большой семьи, а не анонимной сети.
        </p>
      </div>

      <!-- Вкладка: Гости (сценарии гостей) -->
      <div v-show="activeTab === 'guests'" class="tab-content">
        <h3>Гости: разные сценарии, одно ощущение дома</h3>
        <p>
          Утром сюда забегают за своим «как всегда» по дороге на работу, днём остаются с ноутбуком и делают вид, что это их кабинет, а по выходным приходят семьями — с детьми и собаками. У каждой локации есть свой главный сценарий, но везде гостю должно быть спокойно.
        </p>
        <p>
          Сеть собирает на себя разные кусочки городской жизни: деловые короткие встречи, долгие разговоры за фильтром, первые свидания и «кофе после пробежки». Инвестиции в новые кофейни — это возможность подарить такие сценарии ещё большему числу людей.
        </p>
      </div>

      <!-- Вкладка: Сообщество -->
      <div v-show="activeTab === 'community'" class="tab-content">
        <h3>Сообщество: люди, которые выбирают Корж сердцем</h3>
        <p>
          Вокруг «Коржа» выросло сообщество людей, которые разделяют его ценности: любовь, заботу, уважение к себе и другим. Они следят за новыми десертами, приходят на каппинги, участвуют в городских инициативах и остаются с брендом годами.
        </p>
        <p>
          Для инвестора это не просто аудитория, а фундамент роста: когда открывается новая точка, у неё есть кому сказать «наконец-то вы рядом с домом». Именно это доверие делает расширение сети естественным шагом, а не рискованным экспериментом.
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Сброс стилей для VitePress */
.how-it-works-widget :deep(h2),
.how-it-works-widget :deep(h3),
.how-it-works-widget :deep(h4),
.how-it-works-widget :deep(p),
.how-it-works-widget :deep(ul),
.how-it-works-widget :deep(li) {
  margin: 0;
  padding: 0;
  border: none;
}

/* Основной контейнер */
.how-it-works-widget {
  width: 100%;
  max-width: 100%;
  margin: 48px 0;
  background-color: #2a2a2a;
  color: #e0e0e0;
  padding: 48px;
  border-radius: 32px;
  box-sizing: border-box;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}

/* Header */
.widget-header {
  text-align: center;
  margin-bottom: 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.widget-title {
  font-size: 32px !important;
  font-weight: 700 !important;
  color: #ffffff !important;
  line-height: 1.2 !important;
}

.widget-subtitle {
  font-size: 18px !important;
  color: rgba(255, 255, 255, 0.6) !important;
  line-height: 1.5 !important;
  max-width: 600px;
}

/* Табы */
.tabs-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 24px;
  justify-content: center;
}

.tab-button {
  appearance: none;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.05);
  color: rgba(255, 255, 255, 0.7);
  padding: 10px 18px;
  border-radius: 14px;
  font-weight: 500;
  font-size: 14px;
  line-height: 1.4;
  cursor: pointer;
  transition: all 0.3s ease;
}

.tab-button:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  transform: translateY(-1px);
}

.tab-button.active {
  color: #fff;
  background: rgba(142, 124, 195, 0.2); /* Фиолетовый фон */
  border-color: #8E7CC3; /* Фиолетовая обводка */
  box-shadow: 0 0 12px rgba(142, 124, 195, 0.25);
}

/* Панель контента */
.content-panel {
  background: #1f1f1f;
  border-radius: 24px;
  padding: 32px;
  position: relative;
  border: none;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.05); 
}

.content-panel::before {
  content: '';
  position: absolute;
  top: 0;
  left: 24px;
  right: 24px;
  height: 1px;
  background: linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.15) 50%, transparent 100%);
}

.tab-content h3 {
  font-size: 20px;
  font-weight: 700;
  color: #fff;
  margin-bottom: 16px !important;
  letter-spacing: -0.01em;
}

.tab-content h4 {
  font-size: 13px;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.5);
  letter-spacing: 0.05em;
  margin: 24px 0 12px !important;
  font-weight: 600;
}

.tab-content p {
  font-size: 16px;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 16px !important;
}

.tab-content p:last-child {
  margin-bottom: 0 !important;
}

.tab-content strong {
  color: #fff;
  font-weight: 600;
}

/* Списки */
.tab-content ul {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px !important;
}

.tab-content li {
  position: relative;
  padding-left: 20px;
  font-size: 16px;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.8);
}

.tab-content li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 10px; 
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: #C1B5F0; 
  box-shadow: 0 0 6px rgba(193, 181, 240, 0.4);
}

/* Ссылки */
.tab-content a {
  color: #C1B5F0;
  text-decoration: none;
  border-bottom: 1px dashed rgba(193, 181, 240, 0.5);
  transition: all 0.2s ease;
  padding-bottom: 1px;
}

.tab-content a:hover {
  color: #fff;
  border-color: #fff;
}

.step-block {
  margin-bottom: 24px;
  padding-bottom: 24px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.step-block:last-child {
  margin-bottom: 0;
  padding-bottom: 0;
  border-bottom: none;
}

.step-block h4 {
  margin-top: 0 !important;
}

/* Мобильная адаптация */
@media (max-width: 768px) {
  .how-it-works-widget {
    padding: 40px 20px;
    border-radius: 24px;
  }
  
  .widget-title {
    font-size: 26px !important;
  }
  
  .widget-subtitle {
    font-size: 16px !important;
  }
  
  /* Исправление для переноса табов */
  .tabs-container {
    justify-content: center; /* Центрируем перенесенные элементы */
    flex-wrap: wrap;        /* Разрешаем перенос на новую строку */
    padding-bottom: 0;      /* Убираем отступ для скролла */
    overflow-x: visible;    /* Убираем скролл */
    margin-right: 0;
    padding-right: 0;
  }
  
  .tab-button {
    white-space: normal;    /* Разрешаем тексту внутри кнопки переноситься, если нужно */
    flex-shrink: 0;
    width: auto;            /* Автоматическая ширина */
    font-size: 13px;        /* Чуть уменьшим шрифт для компактности */
    padding: 8px 14px;      /* Чуть меньше паддинги */
  }
  
  .content-panel {
    padding: 24px;
    border-radius: 20px;
  }
  
  .tab-content h3 {
    font-size: 18px;
  }
  
  .tab-content p, 
  .tab-content li {
    font-size: 15px;
  }
}
</style>
