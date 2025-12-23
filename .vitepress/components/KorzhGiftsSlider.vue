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
  badge1: 0, badge2: 0, badge3: 0, badge4: 0, badge5: 0, badge6: 0,
  badge7: 0, badge8: 0, badge9: 0, badge10: 0, badge11: 0, badge12: 0
})

/**
 * =========================
 * НАСТРОЙКИ (крути тут)
 * =========================
 */

// Версия ключа: меняешь -> пересоздаст распределение с нуля
const STATE_KEY = 'korzh_badge_state_v3'

// Потолки
const START_TOTAL_MIN = 15        // сколько всего очков раздать на старте (минимум)
const START_TOTAL_MAX = 20        // сколько всего очков раздать на старте (максимум)
const START_PER_BADGE_MAX = 3     // максимум на один бейдж на старте (0..3)
const DAILY_TOTAL_ADD_MIN = 0     // сколько всего добавлять за новый день (минимум)
const DAILY_TOTAL_ADD_MAX = 7    // сколько всего добавлять за новый день (максимум)

// Коэффициенты (веса): больше = чаще получит +1 при распределении
const WEIGHTS = {
  badge1: 2,
  badge2: 3,
  badge3: 0.9,
  badge4: 1.5,
  badge5: 0.8,
  badge6: 0.4,
  badge7: 0.3,
  badge8: 0.5,
  badge9: 0.5,
  badge10: 0.5,
  badge11: 0.5,
  badge12: 0.5,
}

// (опционально) Ограничение дневного прироста на одну карточку
// null/Infinity = без ограничения
const DAILY_PER_BADGE_MAX = Infinity

/**
 * =========================
 * Утилиты
 * =========================
 */

function getUTCDateKey() {
  // "YYYY-MM-DD" в UTC, чтобы смена дня была одинаковой для всех часовых поясов
  return new Date().toISOString().slice(0, 10)
}

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function weightedPickId(ids, weights) {
  let total = 0
  const cum = []

  for (const id of ids) {
    const w = Math.max(0, Number(weights[id] ?? 1))
    total += w
    cum.push(total)
  }

  if (total <= 0) return ids[0]

  const r = Math.random() * total
  for (let i = 0; i < cum.length; i++) {
    if (r < cum[i]) return ids[i]
  }
  return ids[ids.length - 1]
}

// распределение "points" по ids по 1 очку за итерацию
// perBadgeCap — общий cap на значение (например 3 на старте)
// perBadgeAddedCapMap — cap на ДОБАВЛЕНИЕ в рамках одной операции (например +3 в день на одну карточку)
function distributeWeightedPoints(counts, ids, points, weights, perBadgeCap = Infinity, perBadgeAddedCapMap = null) {
  let guard = 200000
  while (points > 0 && guard-- > 0) {
    const id = weightedPickId(ids, weights)

    const current = counts[id] ?? 0
    if (current >= perBadgeCap) continue

    if (perBadgeAddedCapMap) {
      const added = perBadgeAddedCapMap[id] ?? 0
      if (added >= perBadgeAddedCapMap.__cap) continue
      perBadgeAddedCapMap[id] = added + 1
    }

    counts[id] = current + 1
    points--
  }
}

function ensureAllKeys(counts, ids) {
  for (const id of ids) {
    if (typeof counts[id] !== 'number' || Number.isNaN(counts[id])) counts[id] = 0
  }
}

/**
 * =========================
 * Инициализация/обновление
 * =========================
 */
function initBadgeCounts() {
  const ids = cardTypes.map(c => c.id)
  const todayKey = getUTCDateKey()

  // 1) Восстановление
  const raw = localStorage.getItem(STATE_KEY)
  if (raw) {
    try {
      const state = JSON.parse(raw)
      Object.assign(badgeCounts, state.counts || {})
      ensureAllKeys(badgeCounts, ids)

      // 2) Доначисление за прошедшие дни
      if (state.dayKey && state.dayKey !== todayKey) {
        const daysDiff = Math.max(
          0,
          Math.floor((Date.parse(todayKey) - Date.parse(state.dayKey)) / (1000 * 60 * 60 * 24))
        )

        for (let i = 0; i < daysDiff; i++) {
          const add = randInt(DAILY_TOTAL_ADD_MIN, DAILY_TOTAL_ADD_MAX)

          const addedMap = {
            __cap: DAILY_PER_BADGE_MAX
          }

          distributeWeightedPoints(
            badgeCounts,
            ids,
            add,
            WEIGHTS,
            Infinity,
            Number.isFinite(DAILY_PER_BADGE_MAX) ? addedMap : null
          )
        }

        localStorage.setItem(STATE_KEY, JSON.stringify({
          dayKey: todayKey,
          counts: { ...badgeCounts }
        }))
      }

      return
    } catch (e) {
      console.error(e)
      // упадём в генерацию заново
    }
  }

  // 3) Первый запуск: стартовые значения
  ids.forEach(id => (badgeCounts[id] = 0))

  const startTotal = randInt(START_TOTAL_MIN, START_TOTAL_MAX)
  distributeWeightedPoints(badgeCounts, ids, startTotal, WEIGHTS, START_PER_BADGE_MAX)

  localStorage.setItem(STATE_KEY, JSON.stringify({
    dayKey: todayKey,
    counts: { ...badgeCounts }
  }))
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
