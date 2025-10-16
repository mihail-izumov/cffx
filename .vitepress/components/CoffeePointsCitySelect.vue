<template>
  <div class="city-row">
    <h3 class="city-title">Кофейни в</h3>
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
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
             viewBox="0 0 24 24" fill="none"
             stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
             style="transform: scaleX(-1) rotate(-12deg)">
           <path d="M4.037 4.688a.495.495 0 0 1 .651-.651l16 6.5a.5.5 0 0 1-.063.947l-6.124 1.58a2 2 0 0 0-1.438 1.435l-1.579 6.126a.5.5 0 0 1-.947.063z"/>
        </svg>
      </span>
      <span class="city-selected lime">Самара</span>
      <span class="arrow" :class="{open: open}">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
             stroke="#9ba278" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="4 6 8 10 12 6"/>
        </svg>
      </span>
    </button>
    <transition name="fade-menu">
      <div
        v-if="open"
        class="city-dropdown-menu"
        @mousedown.stop
      >
        <a class="menu-entry" href="/partner">
          Стать партнером
        </a>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
const open = ref(false)
const hovered = ref(false)
const dropdown = ref(null)

function closeMenu(e) {
  if (dropdown.value && !dropdown.value.contains(e.target)) open.value = false
}
function toggle() {
  open.value = !open.value
}
onMounted(() => window.addEventListener('mousedown', closeMenu, true))
onBeforeUnmount(() => window.removeEventListener('mousedown', closeMenu, true))
</script>

<style scoped>
.city-row {
  display: flex !important;
  align-items: center !important;
  gap: 0.8rem !important;
}

.city-title {
  color: #fff !important;
  font-size: 1.38rem !important;
  font-weight: 600 !important;
  margin: 0 !important;
  letter-spacing: 0.01em !important;
}

/* Dropdown button style */
.city-dropdown-btn {
  display: flex !important;
  align-items: center !important;
  gap: 0.6rem !important;
  padding: 0.88rem 1.26rem !important;
  border-radius: 18px !important;
  border: 1.2px solid #C7FF28 !important;
  background: #25251b !important;
  font-size: 1.13rem !important;
  font-weight: 500 !important;
  color: #cfd5bd !important;
  cursor: pointer !important;
  outline: none !important;
  box-shadow: 0 0 12px 0 rgba(199,255,40,0.00) !important;
  transition: border-color 0.18s cubic-bezier(.44,1.72,.58,.76),
              box-shadow 0.22s cubic-bezier(.44,1.72,.58,.76),
              background 0.14s, color 0.14s;
  position: relative !important;
}

.city-dropdown-btn:not(.open):hover,
.city-dropdown-btn:not(.open):focus-visible {
  border-color: #dafe73 !important;
  box-shadow: 0 0 0 3px #b0c72633 !important;
  background: #28281e !important;
}

/* Lime border only when open */
.city-dropdown-btn.open {
  border-color: #C7FF28 !important;
  box-shadow: 0 0 14px 2px #C7FF2879 !important;
  background: #222318 !important;
}

/* Pointer icon right */
.city-dropdown-btn .icon {
  display: flex;
  align-items: center;
  color: #beff13 !important;
}

/* City name always lime */
.city-selected.lime {
  color: #C7FF28 !important;
  font-weight: 600 !important;
}

/* Arrow style */
.arrow {
  margin-left: 0.72rem !important;
  display: flex !important;
  align-items: center !important;
  transition: transform 0.26s cubic-bezier(.44,1.45,.58,.76), stroke 0.23s;
  stroke: #9ba278 !important;
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
.fade-menu-enter-active,.fade-menu-leave-active {
  transition: opacity 0.18s cubic-bezier(.47,1.83,.49,.68), transform 0.23s cubic-bezier(.47,1.83,.49,.68);
}
.fade-menu-enter-from, .fade-menu-leave-to { opacity: 0; transform: translateY(-13px) scale(0.98)}
.fade-menu-enter-to,   .fade-menu-leave-from { opacity: 1; transform: translateY(0) scale(1) }

.city-dropdown-menu {
  position: absolute !important;
  left: 0 !important;
  top: 100% !important;
  z-index: 99 !important;
  min-width: 100% !important;
  background: #2d2e23 !important;
  padding: 0.4rem 0 !important;
  box-shadow: 0 7px 40px 0 #c8ff284a, 0 2px 11px 0 #1c260b12 !important;
  border-radius: 0 0 17px 17px !important;
  border-top: 1.2px solid #C7FF28 !important;
  border-left: 1.2px solid #C7FF28 !important;
  border-right: 1.2px solid #C7FF28 !important;
  border-bottom: 1.2px solid #C7FF28 !important;
  margin-top: -1.2px;
  overflow: hidden !important;
  animation: dropdown-fade 0.22s cubic-bezier(.45,1.72,.62,.87);
}

/* Menu entry style */
.menu-entry {
  display: block !important;
  font-size: 1.06rem !important;
  padding: 0.93rem 1.3rem !important;
  color: #cccfc4 !important;
  background: transparent !important;
  border: none !important;
  text-decoration: none !important;
  text-align: left !important;
  font-weight: 500 !important;
  letter-spacing: 0.01em !important;
  transition: background 0.12s, color 0.12s !important;
  cursor: pointer !important;
  outline: none !important;
}

.menu-entry:hover, .menu-entry:focus-visible {
  background: #484926 !important;
  color: #E4EBC4 !important;
}

@media (max-width: 640px) {
  .city-row { flex-direction: column; align-items: flex-start; }
  .city-dropdown-btn { width: 100%; }
}

</style>
