<script setup>
import { reactive, onMounted } from 'vue'

const cardTypes = [
  { id: 'badge1', label: 'Сигналка', image: '/img/korzh/gifts/signalka-gift.png' },
  { id: 'badge2', label: 'Бонжур', image: '/img/korzh/gifts/bonjour-gift.png' },
  { id: 'badge3', label: 'Кальцифер', image: '/img/korzh/gifts/calcifer-gift.png' },
  { id: 'badge4', label: 'Нян Кот', image: '/img/korzh/gifts/nyancat-gift.png' },
  { id: 'badge5', label: 'Пёрпи', image: '/img/korzh/gifts/purrpy-gifts.png' },
  { id: 'badge6', label: 'Дерпи', image: '/img/korzh/gifts/derpy-gift.png' }, 
  { id: 'badge7', label: 'Почита-заряд', image: '/img/korzh/gifts/pochitazaryad-gift.png' },
  { id: 'badge8', label: 'Сладкий Кусь', image: '/img/korzh/gifts/sladkiykus-gift.png' },
  { id: 'badge9', label: 'Холодок', image: '/img/korzh/gifts/holodok-gift.png' },
  { id: 'badge10', label: 'Ход королевы', image: '/img/korzh/gifts/queensmove-gift.png' },
  { id: 'badge11', label: 'Леденцовая Ель', image: '/img/korzh/gifts/candytree-gift.png' },
  { id: 'badge12', label: 'Сердечный Дроп', image: '/img/korzh/gifts/heartdrop-gift.png' },
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

function getUTCDateKey() {
  return new Date().toISOString().slice(0, 10); // "YYYY-MM-DD" в UTC
}

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function distributePoints(counts, ids, points, perBadgeCap = Infinity) {
  let guard = 100000;
  while (points > 0 && guard-- > 0) {
    const id = ids[randInt(0, ids.length - 1)];
    if ((counts[id] ?? 0) < perBadgeCap) {
      counts[id] = (counts[id] ?? 0) + 1;
      points--;
    }
  }
}

function initBadgeCounts() {
  // НАСТРОЙКИ
  const STATE_KEY = 'korzh_badge_state_v1';
  const START_TOTAL_MAX = 15;
  const START_PER_BADGE_MAX = 3;
  const DAILY_TOTAL_ADD_MAX = 10;

  const ids = cardTypes.map(c => c.id);
  const todayKey = getUTCDateKey();

  // 1) Пытаемся восстановить состояние
  const raw = localStorage.getItem(STATE_KEY);
  if (raw) {
    try {
      const state = JSON.parse(raw);
      Object.assign(badgeCounts, state.counts || {});

      // 2) Если день сменился — добавляем прирост(ы) по дням
      if (state.dayKey && state.dayKey !== todayKey) {
        const daysDiff = Math.max(
          0,
          Math.floor((Date.parse(todayKey) - Date.parse(state.dayKey)) / (1000 * 60 * 60 * 24))
        );

        for (let i = 0; i < daysDiff; i++) {
          const add = randInt(0, DAILY_TOTAL_ADD_MAX); // <= 10 на ВСЕ карточки
          distributePoints(badgeCounts, ids, add);
        }

        localStorage.setItem(STATE_KEY, JSON.stringify({
          dayKey: todayKey,
          counts: { ...badgeCounts }
        }));
      }

      return;
    } catch (e) {
      console.error(e);
      // если сломано — упадём в генерацию заново
    }
  }

  // 3) Первый запуск: стартовые 0..3, сумма <= 15
  ids.forEach(id => (badgeCounts[id] = 0));
  const startTotal = randInt(0, START_TOTAL_MAX);
  distributePoints(badgeCounts, ids, startTotal, START_PER_BADGE_MAX);

  localStorage.setItem(STATE_KEY, JSON.stringify({
    dayKey: todayKey,
    counts: { ...badgeCounts }
  }));
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
