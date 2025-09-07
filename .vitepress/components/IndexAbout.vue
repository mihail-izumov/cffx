<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const ROTATION_INTERVAL_MS = 7000
const FADE_DURATION_MS = 1000

const establishment = {
  name: 'Не просто рейтинг',
  index: 98,
  currentPoints: 8,
  targetPoints: 12,
  influenceLevel: 'Высокое'
}

const rotatingMessages = [
  'Смотреть Индекс — полный срез рынка.',
  'Получать Пульс — еженедельные изменения и возможности.',
  'Это данные лидера сейчас. Хотите видеть свой прогресс — подпишитесь.'
]

const currentMessageIndex = ref(0)
const showText = ref(true)
let rotatorInterval = null

const cycleRotatorText = () => {
  showText.value = false
  setTimeout(() => {
    currentMessageIndex.value = (currentMessageIndex.value + 1) % rotatingMessages.length
    showText.value = true
  }, FADE_DURATION_MS)
}

const showTooltip = ref(false)
let longPressTimer = null

const onBadgeTouchStart = () => {
  longPressTimer = setTimeout(() => { showTooltip.value = true }, 500)
}
const onBadgeTouchEnd = () => {
  if (longPressTimer) {
    clearTimeout(longPressTimer)
    longPressTimer = null
  }
  setTimeout(() => { showTooltip.value = false }, 150)
}

const showInfoModal = ref(false)
const onKeydown = (e) => {
  if (e.key === 'Escape') {
    showInfoModal.value = false
  }
}

onMounted(() => {
  rotatorInterval = setInterval(cycleRotatorText, ROTATION_INTERVAL_MS)
  window.addEventListener('keydown', onKeydown)
})

onUnmounted(() => {
  clearInterval(rotatorInterval)
  if (longPressTimer) clearTimeout(longPressTimer)
  window.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <div class="reviews-widget-content">
    <div class="main-card">
      <div class="establishment-header">
        <div>
          <h3 class="cafe-name">{{ establishment.name }}</h3>
          <p class="cafe-subtitle">Данные лидера рынка: сеть «Корж».</p>
        </div>
        
        <div class="status-badge-wrapper">
          <button
            type="button"
            class="status-badge"
            aria-describedby="badge-tip"
            @mouseenter="showTooltip = true"
            @mouseleave="showTooltip = false"
            @focus="showTooltip = true"
            @blur="showTooltip = false"
            @touchstart.passive="onBadgeTouchStart"
            @touchend.passive="onBadgeTouchEnd"
            @touchcancel.passive="onBadgeTouchEnd
