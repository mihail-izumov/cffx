<template>
  <div class="city-select-flex">
    <h3 class="city-select-title">Кофейни в</h3>
    <div class="dropdown" :class="{ open: open }">
      <div class="buttons">
        <button
          :class="['item-btn', { active: active === 'samara' }]"
          @click="go('/me')"
          tabindex="0"
        >
          <span class="icon pointer">
            <!-- Иконка мыши, ПОВЕРНУТА ВПРАВО -->
            <svg xmlns="http://www.w3.org/2000/svg" style="transform: rotate(0deg);" width="22" height="22" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
             class="lucide-mouse-pointer-2">
              <path d="M4.037 4.688a.495.495 0 0 1 .651-.651l16 6.5a.5.5 0 0 1-.063.947l-6.124 1.58a2 2 0 0 0-1.438 1.435l-1.579 6.126a.5.5 0 0 1-.947.063z"/>
            </svg>
          </span>
          <span class="samara">Самара</span>
        </button>
        <button
          :class="['item-btn', { active: active === 'partner' }]"
          @click="go('/partner')"
          tabindex="0"
        >Стать партнером</button>
      </div>
      <span class="dropdown-arrow" @click="toggleDropdown">
        <!-- Стрелка-галочка -->
        <svg width="16" height="16" viewBox="0 0 10 10" fill="none"
         stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round" style="display:block;">
          <polyline points="2.5,4.3 5,7.3 7.5,4.3"/>
        </svg>
      </span>
      <ul v-if="open" class="options">
        <li>
          <a href="/me" class="option-link" :class="{ chosen: active === 'samara' }"
             @click.prevent="select('samara')">
            <span class="icon pointer right">
              <svg xmlns="http://www.w3.org/2000/svg" style="transform: rotate(0deg);" width="20" height="20" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
               class="lucide-mouse-pointer-2">
                <path d="M4.037 4.688a.495.495 0 0 1 .651-.651l16 6.5a.5.5 0 0 1-.063.947l-6.124 1.58a2 2 0 0 0-1.438 1.435l-1.579 6.126a.5.5 0 0 1-.947.063z"/>
              </svg>
            </span>
            Самара
          </a>
        </li>
        <li>
          <a href="/partner" class="option-link" :class="{ chosen: active === 'partner' }"
             @click.prevent="select('partner')">
            Стать партнером
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const open = ref(false)
const active = ref('samara')
function go(url) {
  window.open(url, '_blank')
}
function select(val) {
  active.value = val
  open.value = false
  go(val === 'samara' ? '/me' : '/partner')
}
function toggleDropdown() {
  open.value = !open.value
}
</script>

<style scoped>
.city-select-flex {
  display: flex;
  align-items: center;
  gap: 22px;
}

.city-select-title {
  color: #fff !important;
  font-size: 1.28rem;
  font-weight: 600;
  margin: 0;
  letter-spacing: 0.01em;
}

.dropdown {
  position: relative;
  display: flex;
  align-items: center;
  border: 1.2px solid #C7FF28 !important;
  border-radius: 15px;
  background: #181918 !important;
  box-shadow: none !important;
  transition: border-color 0.17s;
  padding: 0 0.3rem;
  min-width: 240px;
}

.dropdown-arrow {
  margin-left: 7px;
  cursor: pointer;
  display: flex;
  align-items: center;
  color: #C7FF28;
  background: none;
}

.buttons {
  display: flex;
  align-items: center;
  gap: 0;
}

.item-btn {
  border: none !important;
  outline: none !important;
  background: none !important;
  color: #AEB6A5 !important;
  font-size: 1.12rem !important;
  font-weight: 500;
  padding: 0.8rem 1.2rem;
  border-radius: 12px 0 0 12px;
  margin: 0;
  position: relative;
  transition: color 0.13s, box-shadow 0.14s;
  z-index: 1;
  box-shadow: none !important;
}
.item-btn:last-child {
  border-left: 1.2px solid #222523 !important;
  border-radius: 0 12px 12px 0;
}
.item-btn.active {
  color: #C7FF28 !important;
  background: rgba(199,255,40,0.07);
}
.item-btn:hover:not(.active) {
  color: #E4EBC4 !important;
  background: #232523 !important;
}
.item-btn:focus { box-shadow: none !important; }

.icon.pointer {
  display: inline-flex;
  vertical-align: middle;
  margin-right: 8px;
  color: #C7FF28;
  min-width: 20px;
  transform: rotate(0deg) !important;
}
.samara { margin-right: 2px; }

.options {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  width: 100%;
  background: #181918 !important;
  border-radius: 0 0 12px 12px !important;
  box-shadow: none !important;
  padding: 0;
  z-index: 9999;
  border: 1.2px solid #C7FF28 !important;
}
.options li {
  list-style: none;
  margin: 0;
}
.option-link {
  display: flex;
  align-items: center;
  gap: 7px;
  color: #AEB6A5 !important;
  text-decoration: none !important;
  padding: 0.85rem 1.08rem;
  font-size: 1.106rem;
  transition: background 0.13s, color 0.13s;
  background: none !important;
  border: none !important;
  cursor: pointer;
}
.option-link.chosen {
  color: #C7FF28 !important;
  background: rgba(199,255,40,0.08) !important;
}
.option-link:not(.chosen):hover {
  color: #E4EBC4 !important;
  background: #232523 !important;
}
.option-link .icon.pointer.right {
  margin-right: 5px;
}
.options li + li { margin-left: 0; }
</style>
