<template>
  <div class="city-center-row">
    <h3 class="city-title">Кофейни</h3>
    <div class="city-dropdown-combo">
      <button
        class="city-dropdown-btn"
        :class="{ open: open }"
        @click="toggle"
        ref="dropdown"
        type="button"
      >
        <span class="icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
               viewBox="0 0 24 24" fill="none"
               stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
               style="transform: scaleX(-1) rotate(-11deg)">
             <path d="M4.037 4.688a.495.495 0 0 1 .651-.651l16 6.5a.5.5 0 0 1-.063.947l-6.124 1.58a2 2 0 0 0-1.438 1.435l-1.579 6.126a.5.5 0 0 1-.947.063z"/>
          </svg>
        </span>
        <span class="city-selected lime">Самара</span>
        <span class="arrow" :class="{open: open}">
          <svg width="13" height="13" viewBox="0 0 16 16" fill="none"
               stroke="#9ba278" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round">
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
             href="/partner">
            Стать партнером
          </a>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
const open = ref(false)
const dropdown = ref(null)
const dropdownWidth = ref(200)

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
.city-center-row {
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  gap: 18px !important;
  width: 100%;
  margin: 0 auto 16px auto;
  padding-top: 8px;
  /* для pageClass: centered-page достаточно */
}
.city-title {
  color: #fff !important;
  font-size: 1.22rem !important;
  font-weight: 600 !important;
  margin: 0 !important;
  padding: 0 !important;
  letter-spacing: 0.01em !important;
  line-height: 1.7;
}
.city-dropdown-combo {
  position: relative;
  display: flex;
  flex-direction: column;
}
.city-dropdown-btn {
  display: flex !important;
  align-items: center !important;
  gap: 0.55rem !important;
  padding: 0.58rem 1.01rem !important;
  border-radius: 14px !important;
  border: 1.5px solid #C7FF28 !important;
  background: #25251b !important;
  font-size: 1.02rem !important;
  font-weight: 500 !important;
  color: #cfd5bd !important;
  cursor: pointer !important;
  outline: none !important;
  box-shadow: 0 0 10px 0 #C7FF2820 !important;
  transition: border-color 0.16s, box-shadow 0.20s, background 0.14s, color 0.14s;
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
.city-selected.lime {
  color: #C7FF28 !important;
  font-weight: 600 !important;
}
.arrow {
  margin-left: 0.54rem !important;
  display: flex !important;
  align-items: center !important;
  transition: transform 0.23s, stroke 0.20s;
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
.fade-menu-enter-active, .fade-menu-leave-active {
  transition: opacity 0.14s, transform 0.15s;
}
.fade-menu-enter-from, .fade-menu-leave-to { opacity: 0; transform: translateY(-8px) scale(0.97); }
.fade-menu-enter-to, .fade-menu-leave-from { opacity: 1; transform: translateY(0) scale(1); }
.city-dropdown-menu {
  position: absolute !important;
  left: 0 !important;
  top: 100% !important;
  z-index: 2 !important;
  min-width: 100% !important;
  background: #34321f !important;
  box-shadow: 0 0 14px 1px #C7FF2820, 0 2px 7px 0 #1c260b11 !important;
  border-radius: 0 0 14px 14px !important;
  border: 1.5px solid #C7FF28 !important;
  border-top: none !important;
  margin-top: -1.5px;
  padding: 0 !important;
  overflow: hidden !important;
}
.menu-entry {
  width: 100% !important;
  font-size: 1.02rem !important;
  padding: 1.1rem 1.05rem !important;
  color: #cccfc4 !important;
  background: transparent !important;
  border: none !important;
  text-decoration: none !important;
  text-align: left !important;
  font-weight: 500 !important;
  letter-spacing: 0.01em !important;
  transition: background 0.11s, color 0.13s !important;
  cursor: pointer !important;
  outline: none !important;
  border-radius: 0 !important;
  display: block !important;
}
.menu-entry:hover, .menu-entry:focus-visible {
  background: #484926 !important;
  color: #E4EBC4 !important;
}
@media (max-width: 800px) {
  .city-center-row { gap: 11px !important;}
  .city-title { font-size: 1.08rem !important; }
}
@media (max-width: 440px) {
  .city-center-row { gap: 8px !important;}
  .city-title { font-size: 0.98rem !important; }
}
</style>
