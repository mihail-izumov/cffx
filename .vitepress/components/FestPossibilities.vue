<template>
<div class="participants-section">
<!-- Блок с кнопками для переключения вкладок -->
<div class="tabs">
  <button :class="{ active: activeTab === 'expo' }" @click="activeTab = 'expo'">
    💼 Экспозиция
  </button>
  <button :class="{ active: activeTab === 'audience' }" @click="activeTab = 'audience'">
    👥 Аудитория
  </button>
  <button :class="{ active: activeTab === 'interactive' }" @click="activeTab = 'interactive'">
    🎯 Интерактив
  </button>
  <button :class="{ active: activeTab === 'partners' }" @click="activeTab = 'partners'">
    🤝 Участники
  </button>
</div>

<!-- Контент для вкладок -->
<div class="tab-content">
  <!-- Вкладка 1: Экспозиция -->
  <div v-show="activeTab === 'expo'" class="content-section">
    <h3>Персональное пространство для демонстрации продукта</h3>
    
    <div class="experience-grid">
      <div class="experience-card">
        <div class="card-header">
          <h4>Собственный стенд</h4>
          <span class="card-badge">Премиум локация</span>
        </div>
        <p class="card-description">Полностью оборудованное пространство с брендингом вашей компании. Возможность демонстрации продукции в идеальных условиях.</p>
        <div class="card-highlight">
          <strong>Включено:</strong> Электричество • Мебель • Освещение • Брендинг
        </div>
      </div>
      <div class="experience-card">
        <div class="card-header">
          <h4>Зона дегустаций</h4>
          <span class="card-badge">Прямые продажи</span>
        </div>
        <p class="card-description">Организованные точки дегустации с возможностью прямых продаж. Покупатели попробуют и купят на месте.</p>
        <div class="card-highlight">
          <strong>Возможности:</strong> Эквайринг • POS-система • Упаковка товаров
        </div>
      </div>
    </div>
  </div>

  <!-- Вкладка 2: Аудитория -->
  <div v-show="activeTab === 'audience'" class="content-section">
    <h3>Поток целевой аудитории 3000+ человек</h3>
    
    <div class="experience-grid">
      <div class="experience-card">
        <div class="card-header">
          <h4>Качественный трафик</h4>
          <span class="card-badge">3000+ гостей</span>
        </div>
        <p class="card-description">Любители кофе, профессионалы индустрии, владельцы кофеен. Аудитория, готовая к покупкам и долгосрочному сотрудничеству.</p>
        <div class="card-highlight">
          <strong>Сегменты:</strong> B2C покупатели • B2B партнеры • HoReCa сектор
        </div>
      </div>
      <div class="experience-card">
        <div class="card-header">
          <h4>Прямые контакты</h4>
          <span class="card-badge">Лиды в реальном времени</span>
        </div>
        <p class="card-description">Живое общение с потенциальными клиентами, обмен контактами, договоренности о сотрудничестве прямо на мероприятии.</p>
        <div class="card-highlight">
          <strong>Результат:</strong> Базы контактов • Договоры • Дистрибьюторские соглашения
        </div>
      </div>
      <div class="experience-card">
        <div class="card-header">
          <h4>Медиа охват</h4>
          <span class="card-badge">Реклама включена</span>
        </div>
        <p class="card-description">Освещение в социальных сетях, блогах о кофе, местных медиа. Ваш бренд увидят тысячи потенциальных клиентов.</p>
        <div class="card-highlight">
          <strong>Каналы:</strong> Instagram • Telegram • YouTube • Локальные медиа
        </div>
      </div>
    </div>
  </div>

  <!-- Вкладка 3: Интерактив -->
  <div v-show="activeTab === 'interactive'" class="content-section">
    <h3>Интерактивный маршрут с вовлечением гостей</h3>
    
    <div class="experience-grid">
      <div class="experience-card">
        <div class="card-header">
          <h4>Геймификация продаж</h4>
          <span class="card-badge">Увеличение конверсии</span>
        </div>
        <p class="card-description">Игровые механики стимулируют покупки. Скидки за правильные ответы, бонусы за участие в дегустациях.</p>
        <div class="card-highlight">
          <strong>Инструменты:</strong> Промокоды • Бонусные карты • Призовые акции
        </div>
      </div>
      <div class="experience-card">
        <div class="card-header">
          <h4>Круглый стол индустрии</h4>
          <span class="card-badge">Нетворкинг</span>
        </div>
        <p class="card-description">Эксклюзивная дискуссия для представителей кофейной индустрии. Обмен опытом, обсуждение трендов, поиск партнеров.</p>
        <div class="card-highlight">
          <strong>Участники:</strong> Обжарщики • Импортеры • Владельцы кофеен • Поставщики
        </div>
      </div>
    </div>
  </div>

  <!-- Вкладка 4: Участники -->
  <div v-show="activeTab === 'partners'" class="content-section">
    <h3>Профессиональное сообщество участников</h3>
    
    <div class="experience-grid">
      <div class="experience-card">
        <div class="card-header">
          <h4>Обжарщики</h4>
          <span class="card-badge">Craft Coffee</span>
        </div>
        <p class="card-description">Локальные и региональные обжарщики представляют свои уникальные сорта. Возможность B2B сотрудничества и обмена опытом.</p>
        <div class="card-highlight">
          <strong>Из Самары:</strong> MOSAIC Coffee • Кофеваркин • White Cup
        </div>
      </div>
      <div class="experience-card">
        <div class="card-header">
          <h4>Гастропроекты и кофейни</h4>
          <span class="card-badge">HoReCa сектор</span>
        </div>
        <p class="card-description">Владельцы заведений ищут поставщиков, оборудование, новые концепции. Прямые контакты с принимающими решения.</p>
        <div class="card-highlight">
          <strong>Представлены:</strong> MOSAIC Coffee • Кофеваркин • White Cup • Толстой • Твинс • На краю земли • Хюгешная • Матча бар
        </div>
      </div>
      <div class="experience-card">
        <div class="card-header">
          <h4>Винные и кондитерские проекты</h4>
          <span class="card-badge">Смежные отрасли</span>
        </div>
        <p class="card-description">Расширение сети контактов в смежных областях. Возможность кросс-промоушена и совместных проектов.</p>
        <div class="card-highlight">
          <strong>Партнеры:</strong> Vittoria Gourmet
        </div>
      </div>
      <div class="experience-card">
        <div class="card-header">
          <h4>Энтузиасты кофейной культуры</h4>
          <span class="card-badge">Открыты для всех</span>
        </div>
        <p class="card-description">Все неравнодушные к развитию культуры кофе могут принять участие. Домашние обжарщики, блогеры, кофейные активисты.</p>
        <div class="card-highlight">
          <strong>Возможности:</strong> Мини-стенды • Презентации проектов • Обмен опытом
        </div>
      </div>
    </div>
  </div>
</div>
</div>
</template>

<script setup>
import { ref } from 'vue'
const activeTab = ref('expo')
</script>

<style scoped>
.participants-section {
  margin: 1.5rem 0;
}

.participants-section h2 {
  font-size: 1.6rem;
  margin-bottom: 1.5rem;
  color: var(--vp-c-text-1);
  font-weight: 700;
  text-align: center;
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
  
  .participants-section h2 {
    font-size: 1.4rem;
  }
}
</style>
