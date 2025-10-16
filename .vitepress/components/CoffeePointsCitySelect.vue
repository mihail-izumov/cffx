<template>
  <div class="center-wrap">
    <div class="city-dropdown-combo">
      <button
        class="city-dropdown-btn"
        :class="{ open: open }"
        @click="toggle"
        @mouseenter="hovered=true"
        @mouseleave="hovered=false"
        ref="dropdown"
        type="button"
      >
        <span class="icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22"
               viewBox="0 0 24 24" fill="none"
               stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
               style="transform: scaleX(-1) rotate(-11deg)">
             <path d="M4.037 4.688a.495.495 0 0 1 .651-.651l16 6.5a.5.5 0 0 1-.063.947l-6.124 1.58a2 2 0 0 0-1.438 1.435l-1.579 6.126a.5.5 0 0 1-.947.063z"/>
          </svg>
        </span>
        <span class="city-selected lime">Самара</span>
        <span class="arrow" :class="{open: open}">
          <svg width="18" height="18" viewBox="0 0 16 16" fill="none"
               stroke="#9ba278" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="4 6 8 10 12 6"/>
          </svg>
        </span>
      </button>
      <transition name="fade-menu">
        <div
          v-if="open"
          class="city-dropdown-menu"
          :style="{ width: dropdownWidth + 'px' }"
          @mousedown.stop
        >
          <a class="menu-entry"
             href="/partner"
             @mouseenter="entryHover=true"
             @mouseleave="entryHover=false">
            Стать партнером
          </a>
        </div>
      </transition>
    </div>
    <h3 class="city-title">Кофейни в</h3>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
const open = ref(false)
const hovered = ref(false)
const entryHover = ref(false)
const dropdown = ref(null)
const dropdownWidth = ref(320)

function handleResize() {
  if (dropdown.value) {
    dropdownWidth.value = dropdown.value.offsetWidth
  }
}

function closeMenu(e) {
  if (dropdown.value && !dropdown.value.contains(e.target)) open.value = false
}
function toggle() {
  open.value = !open.value
  nextTick(() => handleResize())
}
onMounted(() => {
  window.addEventListener('mousedown', closeMenu, true)
  window.addEventListener('resize', handleResize, true)
  nextTick(() => handleResize())
})
onBeforeUnmount(() => {
  window.removeEventListener('mousedown', closeMenu, true)
  window.removeEventListener('resize', handleResize, true)
})
</script>

<style scoped>
.center-wrap {
  width: 100vw;
  min-height: 50vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 3rem;
  gap: 18px;
}

.city-title {
  color: #fff !important;
  font-size: 2rem !important;
  font-weight: 600 !important;
  margin: 0 !important;
  letter-spacing: 0.01em !important;
  margin-top: 20px;
}

.city-dropdown-combo {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Dropdown button style */
.city-dropdown-btn {
  display: flex !important;
  align-items: center !important;
  gap: 0.7rem !important;
  padding: 1.18rem 2.1rem !important;
  border-radius: 25px !important;
  border: 2.4px solid #C7FF28 !important;
  background: #25251b !important;
  font-size: 1.23rem !important;
  font-weight: 500 !important;
  color: #cfd5bd !important;
  cursor: pointer !important;
  outline: none !important;
  box-shadow: 0 0 21px 0 #C7FF2825 !important;
  transition: border-color 0.18s cubic-bezier(.44,1.72,.58,.76),
              box-shadow 0.22s cubic-bezier(.44,1.72,.58,.76),
              background 0.14s, color 0.14s;
  position: relative !important;
  z-index: 3;
}

.city-dropdown-btn.open {
  border-bottom-right-radius: 0 !important;
  border-bottom-left-radius: 0 !important;
}

.city-dropdown-btn .icon {
  color: #beff13 !important;
  display: flex;
  align-items: center;
}

/* City name always lime */
.city-selected.lime {
  color: #C7FF28 !important;
  font-weight: 600 !important;
}

/* Arrow style */
.arrow {
  margin-left: 1.05rem !important;
  display: flex !important;
  align-items: center !important;
  transition: transform 0.33s cubic-bezier(.44,1.45,.58,.76), stroke 0.23s;
  stroke: #818274 !important;
}
.arrow svg {
  stroke: #939885 !important;
  background: transparent !important;
  display: block;
}
.arrow.open {
  transform: rotate(180deg);
}
.city-dropdown-btn.open .arrow svg {
  stroke: #babebe !important;
}

/* Dropdown menu block styles */
.fade-menu-enter-active, .fade-menu-leave-active {
  transition: opacity 0.18s cubic-bezier(.47,1.83,.49,.68), transform 0.23s cubic-bezier(.47,1.83,.49,.68);
}
.fade-menu-enter-from, .fade-menu-leave-to { opacity: 0; transform: translateY(-13px) scale(0.98)}
.fade-menu-enter-to, .fade-menu-leave-from { opacity: 1; transform: translateY(0) scale(1) }

.city-dropdown-menu {
  position: absolute !important;
  left: 0 !important;
  top: 100% !important;
  z-index: 2 !important;
  min-width: 100% !important;
  width: 320px;
  background: #34321f !important;
  box-shadow: 0 0 21px 1px #C7FF2825, 0 2px 11px 0 #1c260b12 !important;
  border-radius: 0 0 25px 25px !important;
  border: 2.4px solid #C7FF28 !important;
  border-top: none !important;
  margin-top: -2.4px;
  padding: 0 !important;
  overflow: hidden !important;
}

.menu-entry {
  width: 100% !important;
  font-size: 1.33rem !important;
  padding: 1.7rem 2rem !important;
  color: #cccfc4 !important;
  background: transparent !important;
  border: none !important;
  text-decoration: none !important;
  text-align: left !important;
  font-weight: 500 !important;
  letter-spacing: 0.01em !important;
  transition: background 0.16s, color 0.16s !important;
  cursor: pointer !important;
  outline: none !important;
  border-radius: 0 !important;
  display: block !important;
}
.menu-entry:hover, .menu-entry:focus-visible {
  background: #484926 !important;
  color: #E4EBC4 !important;
}

@media (max-width: 640px) {
  .center-wrap { margin-top: 0; }
  .city-dropdown-btn, .city-dropdown-menu { width: 98vw; max-width: 99vw; }
}

</style>
