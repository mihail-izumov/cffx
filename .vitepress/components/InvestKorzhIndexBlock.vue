<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const establishment = {
  name: 'Корж – лидер Индекса в Самаре',
  index: 98,
  currentPoints: 8,
  targetPoints: 12,
  influenceLevel: 'Высокое'
}

const showInfoModal = ref(false)
const onKeydown = (e) => {
  if (e.key === 'Escape') {
    showInfoModal.value = false
  }
}

onMounted(() => {
  window.addEventListener('keydown', onKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <div class="reviews-widget-content">
    
    <!-- SVG Definitions (Градиенты и Фильтры) -->
    <svg width="0" height="0" style="position: absolute; pointer-events: none;">
      <defs>
        <!-- Матовый фиолетовый градиент (Premium Matte) -->
        <!-- ВАЖНО: gradientUnits="userSpaceOnUse" для корректной отрисовки линий -->
        <linearGradient 
          id="purple-matte-gradient-fixed" 
          gradientUnits="userSpaceOnUse"
          x1="0" y1="0" x2="24" y2="24"
        >
          <stop offset="0%" style="stop-color:#E0D7F8; stop-opacity:1" />
          <stop offset="45%" style="stop-color:#C1B5F0; stop-opacity:1" />
          <stop offset="100%" style="stop-color:#8E7CC3; stop-opacity:1" />
        </linearGradient>

        <!-- Фильтр объема -->
        <filter id="depth-effect-soft">
          <feGaussianBlur in="SourceAlpha" stdDeviation="1.5" />
          <feOffset dx="0" dy="1.5" result="offsetblur" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.3" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        
        <!-- Усиленный фильтр для hover -->
        <filter id="depth-effect-hover">
          <feGaussianBlur in="SourceAlpha" stdDeviation="2.5" />
          <feOffset dx="0" dy="3" result="offsetblur" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.4" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
    </svg>

    <div class="main-card">
      
      <!-- ЦЕНТРАЛЬНЫЙ ЗАГОЛОВОК -->
      <div class="establishment-header-centered">
        <h3 class="cafe-name">{{ establishment.name }}</h3>
      </div>

      <div class="stats-grid">
        <!-- ⚡ Индекс -->
        <div class="stat-card">
          <div class="stat-content">
            <div class="stat-header">
              <svg class="stat-icon icon-3d" width="32" height="32" viewBox="0 0 24 24" fill="none" 
                   stroke="url(#purple-matte-gradient-fixed)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                   filter="url(#depth-effect-soft)">
                <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/>
              </svg>
              <div class="stat-title">Индекс</div>
            </div>
            <div class="stat-main">
              <div class="stat-value">{{ establishment.index }}</div>
            </div>
            <div class="stat-description">Score всего бизнеса</div>
          </div>
        </div>

        <!-- 🧩 Потенциал -->
        <div class="stat-card">
          <div class="stat-content">
            <div class="stat-header">
              <svg class="stat-icon icon-3d" width="32" height="32" viewBox="0 0 24 24" fill="none" 
                   stroke="url(#purple-matte-gradient-fixed)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                   filter="url(#depth-effect-soft)">
                <path d="M19.439 7.85c-.049.322.059.648.289.878l1.568 1.568c.47.47.706 1.087.706 1.704s-.235 1.233-.706 1.704l-1.611 1.611a.98.98 0 0 1-.837.276c-.47-.07-.802-.48-.968-.925a2.501 2.501 0 1 0-3.214 3.214c.446.166.855.497.925.968a.979.979 0 0 1-.276.837l-1.61 1.61a2.404 2.404 0 0 1-1.705.707 2.402 2.402 0 0 1-1.704-.706l-1.568-1.568a1.026 1.026 0 0 0-.877-.29c-.493.074-.84.504-1.02.968a2.5 2.5 0 1 1-3.237-3.237c.464-.18.894-.527.967-1.02a1.026 1.026 0 0 0-.289-.877l-1.568-1.568A2.402 2.402 0 0 1 1.998 12c0-.617.236-1.234.706-1.704L4.23 8.77c.24-.24.581-.353.917-.303.515.077.877.528 1.073 1.01a2.5 2.5 0 1 0 3.259-3.259c-.482-.196-.933-.558-1.01-1.073-.05-.336.062-.676.303-.917l1.525-1.525A2.402 2.402 0 0 1 12 1.998c.617 0 1.234.236 1.704.706l1.568 1.568c.23.23.556.338.877.29.493-.074.84-.504 1.02-.968a2.5 2.5 0 1 1 3.237 3.237c-.464.18-.894.527-.967 1.02Z"/>
              </svg>
              <div class="stat-title">Потенциал</div>
            </div>
            <div class="stat-main">
              <div class="stat-value potential-value">
                <span class="current">{{ establishment.currentPoints }}</span>
                <span class="potential">({{ establishment.targetPoints }}+)</span>
              </div>
            </div>
            <div class="stat-description">Точек сейчас и целевой масштаб сети</div>
          </div>
        </div>

        <!-- 🌐 Влияние -->
        <div class="stat-card">
          <div class="stat-content">
            <div class="stat-header">
              <svg class="stat-icon icon-3d" width="32" height="32" viewBox="0 0 24 24" fill="none" 
                   stroke="url(#purple-matte-gradient-fixed)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                   filter="url(#depth-effect-soft)">
                ircle cx="12" cy="12" r="10"/>
                <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/>
                <path d="M2 12h20"/>
              </svg>
              <div class="stat-title">Влияние</div>
            </div>
            <div class="stat-main">
              <div class="stat-metric-badge">{{ establishment.influenceLevel }}</div>
            </div>
            <div class="stat-description">Сила эффекта на рынок</div>
          </div>
        </div>
      </div>

      <div class="control-panel">
        <div class="button-container">
          
          <!-- Кнопка Смотреть Индекс -->
          <a href="/invest/smr" class="action-button ticket-button">
            Смотреть Индекс
          </a>

          <!-- Кнопка Получать Пульс -->
          <a href="https://t.me/runScale" class="action-button review-button">
            Получать Пульс
            <svg class="button-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="m9 18 6-6-6-6"/>
            </svg>
          </a>
          
        </div>
      </div>

    </div>

    <!-- Modal (оставлен на случай, если вернете инфо-кнопку, сейчас не вызывается) -->
    <div v-if="showInfoModal" class="modal-overlay" @click.self="showInfoModal = false">
      <div class="modal" role="dialog" aria-modal="true" id="index-dialog" aria-label="Что такое Индекс Роста">
        <div class="modal-header">
          <div class="modal-title">Что такое Индекс Роста</div>
        </div>
        <div class="modal-body">Интегральный score по десяткам показателей.</div>
        <div class="modal-footer">
          <button class="modal-ok" type="button" @click="showInfoModal = false">Понятно</button>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
.reviews-widget-content { 
  padding: 0; 
  width: 100%; 
  box-sizing: border-box;
}

/* Фон основного контейнера */
.main-card { 
  background: #2a2a2a; 
  border-radius: 24px;
  padding: 24px;
  width: 100%;
  box-sizing: border-box;
  color: #e0e0e0;
}

/* ЦЕНТРАЛЬНЫЙ ЗАГОЛОВОК */
.establishment-header-centered {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 32px; /* Отступ до карточек */
  text-align: center;
}

.cafe-name { 
  margin: 0; 
  color: #FFFFFF; 
  font-size: 32px; /* 32 пикселя */
  font-weight: 700; /* жирность 700 */
  line-height: 1.2;
}

/* СЕТКА СТАТИСТИКИ */
.stats-grid { 
  display: grid; 
  grid-template-columns: 1fr 1fr 1fr; 
  gap: 16px; 
}

/* КАРТОЧКА СТАТИСТИКИ */
.stat-card {
  position: relative;
  background: #1f1f1f; 
  border-radius: 22px;
  transition: transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
  overflow: hidden;
  border: none;
  background-clip: padding-box;
  box-shadow: inset 0 0 0 1px transparent;
}

/* МАГИЧЕСКАЯ ОБВОДКА (Фиолетовый градиент) */
.stat-card::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 22px;
  padding: 1px; 
  background: linear-gradient(135deg, rgba(224, 215, 248, 0.4) 0%, rgba(193, 181, 240, 0.1) 50%, rgba(255, 255, 255, 0) 100%);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  transition: all 0.4s ease;
  z-index: 1;
  pointer-events: none;
}

.stat-card:hover {
  transform: translateY(-6px);
}

.stat-card:hover::before {
  background: linear-gradient(135deg, rgba(224, 215, 248, 0.7) 0%, rgba(142, 124, 195, 0.3) 60%, rgba(255, 255, 255, 0) 100%);
}

.stat-content {
  background: radial-gradient(circle at 50% 0%, rgba(142, 124, 195, 0.08) 0%, transparent 70%);
  border-radius: 20px;
  padding: 24px 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 240px;
  text-align: center;
  transition: all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
  position: relative;
  z-index: 2;
}

.stat-card:hover .stat-content {
  background: radial-gradient(circle at 50% 0%, rgba(142, 124, 195, 0.15) 0%, transparent 70%);
}

/* HEADER СТАТИСТИКИ */
.stat-header { 
  display: flex; 
  flex-direction: column; 
  align-items: center; 
  gap: 12px;
  height: auto;
  justify-content: flex-start;
}

.stat-icon { 
  transition: all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
  flex-shrink: 0;
}

.stat-card:hover .stat-icon { 
  transform: scale(1.1) translateY(-2px);
  filter: url(#depth-effect-hover) drop-shadow(0 4px 12px rgba(142, 124, 195, 0.3));
}

.stat-title { 
  font-size: 14px; 
  font-weight: 700; 
  color: rgba(255,255,255,0.8); 
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transition: all 0.4s ease;
}

.stat-card:hover .stat-title { 
  color: #E0D7F8;
}

/* ЗНАЧЕНИЯ */
.stat-main {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.stat-value {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  font-weight: 700;
  line-height: 1;
  color: #fff;
  transition: all 0.4s ease;
}

.potential-value {
  display: flex;
  align-items: baseline;
  gap: 4px;
  justify-content: center;
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  font-weight: 700;
  line-height: 1;
  color: #fff;
}

.potential-value .current { font-size: 1em; }
.potential-value .potential {
  font-size: 0.6em;
  opacity: 0.5;
  font-weight: 500;
}

.stat-card:hover .stat-value,
.stat-card:hover .potential-value {
  transform: scale(1.02);
  color: #E0D7F8; 
}

/* МЕТРИКА ВЛИЯНИЯ */
.stat-metric-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 18px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #fff;
  font-weight: 600;
  letter-spacing: 0.05em;
  font-size: clamp(14px, 2.5vw, 18px);
  white-space: nowrap;
  transition: all 0.4s ease;
  text-transform: uppercase;
}

.stat-card:hover .stat-metric-badge {
  border-color: #8E7CC3;
  background: rgba(142, 124, 195, 0.2);
  color: #E0D7F8;
}

/* ОПИСАНИЕ */
.stat-description {
  font-size: 13px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.5);
  line-height: 1.4;
  text-align: center;
  transition: color 0.4s ease;
  margin-top: 12px;
}

.stat-card:hover .stat-description { 
  color: rgba(255, 255, 255, 0.8);
}

/* ПАНЕЛЬ УПРАВЛЕНИЯ */
.control-panel { margin-top: 24px; }

.button-container { display: flex; gap: 10px; background-color: #1f1f1f; border-radius: 20px; padding: 8px; }

.action-button { 
  flex: 1; 
  padding: 14px 20px; 
  border-radius: 16px; 
  border: none; 
  font-size: 16px; 
  font-weight: 600; 
  cursor: pointer; 
  transition: all 0.3s ease; 
  display: flex; 
  align-items: center; 
  justify-content: center; 
  gap: 8px; 
  text-decoration: none; 
}

/* КНОПКА 1: Смотреть Индекс */
.ticket-button { 
  background: transparent; 
  color: rgba(255, 255, 255, 0.7); /* Светло-серый в пассиве */
  border: 1px solid transparent;
}

.ticket-button:hover { 
  background: rgba(255, 255, 255, 0.08); /* Легкий фон при ховере */
  color: #fff; /* Белый в активе */
  border-color: transparent; /* Убрал обводку в ховере */
}

/* КНОПКА 2: Получать Пульс */
.review-button { 
  background: #e0e0e0; /* Светло-серый фон */
  color: #1a1a1a; /* Почти черный текст */
  box-shadow: none;
}

.review-button:hover { 
  background: #ffffff; /* Белый фон в активе */
  color: #000000;
  transform: translateY(-2px); 
}

.button-icon { transition: transform 0.3s ease; }
.review-button:hover .button-icon { transform: translateX(4px); }

/* МОДАЛЬНОЕ ОКНО */
.modal-overlay { 
  position: fixed; 
  inset: 0; 
  background: rgba(0,0,0,0.6); 
  backdrop-filter: blur(8px);
  display: flex; 
  align-items: center; 
  justify-content: center; 
  z-index: 1000; 
}
.modal { 
  background: #1f1f1f; 
  color: #fff; 
  border: 1px solid rgba(255,255,255,0.1); 
  border-radius: 16px; 
  width: min(520px, 90vw); 
  box-shadow: 0 20px 60px rgba(0,0,0,0.5); 
  padding: 24px; 
}
.modal-header { display: flex; align-items: center; margin-bottom: 12px; }
.modal-title { font-weight: 700; font-size: 18px; }
.modal-body { font-size: 15px; color: rgba(255,255,255,0.8); line-height: 1.5; }
.modal-footer { margin-top: 20px; display: flex; justify-content: flex-end; }
.modal-ok { 
  background: #333; 
  border: 1px solid rgba(255,255,255,0.1); 
  color: #fff; 
  border-radius: 8px; 
  padding: 8px 16px; 
  cursor: pointer; 
}
.modal-ok:hover { background: #444; }

/* МОБИЛЬНАЯ ВЕРСИЯ */
@media (max-width: 768px) {
  .main-card { padding: 20px; border-radius: 20px; }
  
  .establishment-header-centered {
    margin-bottom: 24px;
  }
  
  .cafe-name { 
    font-size: 24px; /* Чуть меньше на мобильных */
  }

  .stats-grid { 
    grid-template-columns: 1fr; 
    gap: 12px; 
  }
  .stat-card { 
    border-radius: 16px; 
  }
  .stat-card:hover { transform: none; }
  
  .stat-content { 
    display: flex;
    flex-direction: column; 
    justify-content: flex-start; 
    align-items: flex-start; 
    padding: 20px;
    min-height: auto;
    background: radial-gradient(circle at 20% 50%, rgba(142, 124, 195, 0.08) 0%, transparent 70%) !important;
    gap: 16px;
  }
  
  .stat-header { 
    flex-direction: row; 
    align-items: center; 
    gap: 12px; 
    width: 100%;
    justify-content: flex-start;
  }
  
  .stat-icon { width: 24px; height: 24px; }
  .stat-title { font-size: 12px; margin: 0; }
  
  .stat-main {
    width: 100%;
    flex: none;
    justify-content: flex-start;
  }
  
  .stat-value {
    font-size: 2.2rem !important;
    margin: 0;
  }
  
  .potential-value {
    font-size: 2.2rem !important;
    justify-content: flex-start;
  }
  
  .potential-value .potential {
    font-size: 1.6rem !important;
  }
  
  .stat-metric-badge { 
    font-size: 1.2rem !important;
    padding: 8px 16px !important;
    border-color: rgba(255,255,255,0.15);
  }
  
  .stat-description { 
    text-align: left;
    margin: 0;
    width: 100%;
  }
  
  .button-container { flex-direction: column; gap: 8px; }
}
</style>
