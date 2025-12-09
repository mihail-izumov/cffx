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
        За восемь лет инвесторами в «Корж» стали не только Андрей и Елена Ивановы, но также гости и команда кофеен. Любовь и доверие стабильно конвертируются в рост сети.
      </p>
    </div>

    <!-- Навигация (Табы) -->
    <div class="tabs-container">
      <button 
        v-for="tab in [
          { id: 'idea', label: 'Идея' },
          { id: 'growth', label: 'История' },
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
      
      <!-- Вкладка: Идея Коржа -->
      <div v-show="activeTab === 'idea'" class="tab-content">
        <h3>Идея Коржа</h3>
        <p>
          Корж — это сеть кофеен, которая родилась в Самаре и выросла из простой мечты о месте, где человек может по‑настоящему почувствовать вкус еды и тишину внутри себя. На старте это был гибрид эко‑лавки и пекарни, но со временем команда отсеяла всё лишнее и оставила главное: честный кофе, превосходную выпечку и атмосферу, в которую хочется возвращаться каждый день.
        </p>
        <p>
          Сегодня Корж — это восемь кофеен без франшизы, каждая из которых сделана «руками» команды с любовью к гостям и вниманием к деталям.
        </p>
      </div>

      <!-- Вкладка: Как рос Корж -->
      <div v-show="activeTab === 'growth'" class="tab-content">
        <h3>Рост сети</h3>
        <p>
          История сети Корж началась в 2017 году с небольшого пространства, которое долгое время работало в минус и держалась только на упрямстве и вере основателя Андрея Иванова. Перелом наступил, когда команда пересобрала концепцию, обновила меню, пригласила сильного шефа и бариста, и сделала ставку на те самые круассаны и сырники, из‑за которых о Корже заговорил весь город.
        </p>
        <p>
          Дальше сеть росла по одному и тому же принципу: каждая новая кофейня открывалась только тогда, когда команда была уверена в качестве продукта, атмосферы и людей внутри, а не ради галочки «ещё одна точка».
        </p>
      </div>

      <!-- Вкладка: Сценарии для гостей -->
      <div v-show="activeTab === 'guests'" class="tab-content">
        <h3>Пространство для гостей</h3>
        <p>
          Команда Коржа сознательно не делит кофейни на «лучшие» и «проходные» — каждая кофейня отвечает за свой кусочек городской жизни. Есть места, куда забегают утром за «тем самым» апельсиновый рафом и миндальным круассаном по дороге на работу. Есть кофейни, где гости открывают ноутбук и пропадают на полдня. Есть семейные локации в жилых районах, где по выходным завтракают с детьми.
        </p>
        <p>
          Такой подход не про тиражирование одного и того же интерьера, а про внимательное встраивание уникальной атмосферы Коржа в ритм конкретного места в городе и ритм жизни людей.
        </p>
      </div>

      <!-- Вкладка: Сообщество вокруг Коржа -->
      <div v-show="activeTab === 'community'" class="tab-content">
        <h3>Сообщество вокруг Коржа</h3>
        <p>
          Всем известно, что главная ценность Коржа — любовь и забота: сначала о команде, потом о гостях. Из этого выросла живая экосистема: гости ходят «к своим бариста», помогают в разработке сезонных предложений, участвуют в мероприятиях и в целом – воспринимают Корж как «родное» место в городе.
        </p>
        <p>
          Команда аккуратно выбирает партнеров и инфлюенсеров, ориентируясь на совпадение по ценностям, поэтому рост сообщества происходит органично.
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
    justify-content: center; 
    flex-wrap: wrap;        
    padding-bottom: 0;      
    overflow-x: visible;    
    margin-right: 0;
    padding-right: 0;
  }
  
  .tab-button {
    white-space: normal;    
    flex-shrink: 0;
    width: auto;            
    font-size: 13px;        
    padding: 8px 14px;      
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
