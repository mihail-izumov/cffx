<script setup>
import { reactive, onMounted } from 'vue'

const cardTypes = [
  { id: 'badge1', label: 'Сигналка', image: '/img/korzh/gifts/signalka-gift.png' },
  { id: 'badge2', label: 'Бонжур', image: '/img/korzh/gifts/bonjour-gift.png' },
  { id: 'badge3', label: 'Нян Кот', image: '/img/korzh/gifts/nyancat-gift.png' },
  { id: 'badge4', label: 'Сладкий Кусь', image: '/img/korzh/gifts/sladkiykus-gift.png' },
  { id: 'badge5', label: 'Холодок', image: '/img/korzh/gifts/holodok-gift.png' },
  { id: 'badge6', label: 'Кальцифер', image: '/img/korzh/gifts/calcifer-gift.png' },
  { id: 'badge7', label: 'Ход королевы', image: '/img/korzh/gifts/queensmove-gift.png' },
  { id: 'badge8', label: 'Леденцовая Ель', image: '/img/korzh/gifts/candytree-gift.png' },
  { id: 'badge9', label: 'Почита-заряд', image: '/img/korzh/gifts/pochitazaryad-gift.png' },
  { id: 'badge10', label: 'Сердечный Дроп', image: '/img/korzh/gifts/heartdrop-gift.png' },
  { id: 'badge11', label: 'Вдохновик', image: '/img/korzh/gifts/signalka-gift.png' },
  { id: 'badge12', label: 'Тайный Снеговик', image: '/img/korzh/gifts/signalka-gift.png' }
]

const badgeCounts = reactive({
  badge1: 0,
  badge2: 0,
  badge3: 0,
  badge4: 0,
  badge5: 0,
  badge6: 0,
  badge7: 0,
  badge8: 0,
  badge9: 0,
  badge10: 0,
  badge11: 0,
  badge12: 0
})

// Алгоритм счетчиков
function getDayOfYearUTC() {
  const now = new Date();
  const start = new Date(Date.UTC(now.getUTCFullYear(), 0, 0));
  const diff = now - start;
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
}

function initBadgeCounts() {
  const sessionKey = 'korzh_badge_counts_session';
  const savedSession = sessionStorage.getItem(sessionKey);
  
  if (savedSession) {
    try {
      const parsed = JSON.parse(savedSession);
      Object.assign(badgeCounts, parsed);
      return;
    } catch (e) {
      console.error(e);
    }
  }

  const day = getDayOfYearUTC();
  const startDay = 355; 
  const daysPassed = Math.max(0, day - startDay);
  const growthStep = Math.floor(Math.random() * 4) + 4;
  const growthBase = daysPassed * growthStep;
  const now = new Date();
  const timeBonus = Math.floor(now.getUTCHours() / 5); 

  const savedLocal = localStorage.getItem('korzh_user_clicks');
  let userClicks = { 
    badge1: 0, badge2: 0, badge3: 0, badge4: 0, badge5: 0, badge6: 0, 
    badge7: 0, badge8: 0, badge9: 0, badge10: 0, badge11: 0, badge12: 0 
  };
  if (savedLocal) {
    try { userClicks = JSON.parse(savedLocal); } catch (e) { console.error(e) }
  }

  badgeCounts.badge1 = growthBase + timeBonus + 2 + (userClicks.badge1 || 0);
  badgeCounts.badge2 = growthBase + timeBonus + 4 + (userClicks.badge2 || 0);
  badgeCounts.badge3 = growthBase + timeBonus + 2 + (userClicks.badge3 || 0);
  badgeCounts.badge4 = growthBase + timeBonus + 1 + (userClicks.badge4 || 0);
  badgeCounts.badge5 = growthBase + timeBonus + 0 + (userClicks.badge5 || 0);
  badgeCounts.badge6 = growthBase + timeBonus + 2 + (userClicks.badge6 || 0);
  badgeCounts.badge7 = growthBase + timeBonus + 2 + (userClicks.badge7 || 0);
  badgeCounts.badge8 = growthBase + timeBonus + 0 + (userClicks.badge8 || 0);
  badgeCounts.badge9 = growthBase + timeBonus + 1 + (userClicks.badge9 || 0);
  badgeCounts.badge10 = growthBase + timeBonus + 2 + (userClicks.badge10 || 0);
  badgeCounts.badge11 = growthBase + timeBonus + 0 + (userClicks.badge11 || 0);
  badgeCounts.badge12 = growthBase + timeBonus + 1 + (userClicks.badge12 || 0);

  sessionStorage.setItem(sessionKey, JSON.stringify(badgeCounts));
}

onMounted(() => {
  initBadgeCounts()
})
</script>

<template>
  <div class="kzh-cards-container">
    <div class="kzh-cards-grid">
      <div 
        v-for="card in cardTypes" 
        :key="card.id"
        class="kzh-card"
      >
        <div class="kzh-card-icon">
          <img :src="card.image" alt="" />
        </div>
        <div class="kzh-card-label">{{ card.label }}</div>
        <div class="kzh-card-count">{{ badgeCounts[card.id] }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
:root {
  --kzh-font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  --kzh-font-mono: "SF Mono", "Monaco", "Inconsolata", "Fira Code", "Droid Sans Mono", "Source Code Pro", monospace;
  --kzh-color-female: #ff69b4;
  --kzh-color-male: #87ceeb;
}

.kzh-cards-container {
  width: 100%;
}

.kzh-cards-grid {
  display: flex; 
  overflow-x: auto;
  gap: 12px;
  padding-bottom: 25px; 
  padding-top: 20px;    
  padding-left: 15px;   
  margin-left: -15px;
  margin-right: -1.5rem;
  padding-right: 1.5rem;
  scrollbar-width: none;
}
.kzh-cards-grid::-webkit-scrollbar { display: none; }

.kzh-card {
  position: relative;
  aspect-ratio: 1 / 1;
  background: rgba(42, 42, 46, 0.6);
  border: 1px solid #3a3a3e;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transform: translateZ(0); 
  transition: transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 0.4s ease, border-color 0.4s ease;
  overflow: hidden;
  backdrop-filter: blur(10px);
  min-width: 180px; 
  width: 180px;
}

.kzh-card::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50%; 
  background: linear-gradient(to bottom, transparent 0%, rgba(30, 30, 32, 0.6) 40%, #1e1e20 100%);
  z-index: 1;
  pointer-events: none;
}

.kzh-card-icon img {
  width: 150px;
  height: 150px;
  display: block;
  opacity: 0.8;
  transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.3s ease;
  object-fit: contain;
  z-index: 0;
}

@media (hover: hover) {
  .kzh-card:hover {
    background: rgba(60, 60, 65, 0.4);
    transform: translateY(-4px) scale(1.02);
    box-shadow: 0 15px 35px rgba(0,0,0,0.3);
  }
  .kzh-card:hover .kzh-card-icon img {
    transform: scale(1.15) rotate(5deg);
    opacity: 1;
    filter: drop-shadow(0 0 15px rgba(255,255,255,0.2));
  }
}

.kzh-card-label {
  position: absolute;
  bottom: 12px;
  font-size: 0.85rem;
  color: #fff;
  opacity: 0.8;
  font-weight: 500;
  transition: opacity 0.3s ease;
  z-index: 2;
  text-shadow: 0 2px 4px rgba(0,0,0,0.8);
}

.kzh-card:hover .kzh-card-label {
  opacity: 1;
}

.kzh-card-count {
  position: absolute;
  top: 8px;
  right: 12px;
  font-size: 0.65rem;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 600;
  z-index: 2;
  text-shadow: 0 2px 4px rgba(0,0,0,0.8);
}

@media (max-width: 768px) {
  .kzh-card {
    min-width: 140px; 
    width: 140px;
  }
  
  .kzh-card-icon img {
    width: 110px;
    height: 110px;
  }
}
</style>
