<template>
  <div class="city-select-block">
    <h3 class="city-select-title">Кофейни в</h3>
    <div class="dropdown" :class="{ open: open }" @click="open = !open">
      <div class="selected">
        <span class="icon pointer">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" 
           stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
           class="lucide-mouse-pointer-2">
            <path d="M4.037 4.688a.495.495 0 0 1 .651-.651l16 6.5a.5.5 0 0 1-.063.947l-6.124 1.58a2 2 0 0 0-1.438 1.435l-1.579 6.126a.5.5 0 0 1-.947.063z"/>
          </svg>
        </span>
        <span>Самара</span>
        <span class="dropdown-arrow">▼</span>
      </div>
      <ul v-if="open" class="options">
        <li>
          <a href="/me">
            <span class="icon pointer">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
              class="lucide-mouse-pointer-2">
                <path d="M4.037 4.688a.495.495 0 0 1 .651-.651l16 6.5a.5.5 0 0 1-.063.947l-6.124 1.58a2 2 0 0 0-1.438 1.435l-1.579 6.126a.5.5 0 0 1-.947.063z"/>
              </svg>
            </span>
            Самара
          </a>
        </li>
        <li>
          <a href="#" class="partner-link">Стать партнером</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const open = ref(false)
</script>

<style scoped>
.city-select-block {
  max-width: 370px;
  margin: 0 auto 2rem auto;
  color: #E4EBC4;
}
.city-select-title {
  font-size: 1.35rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #E4EBC4;
  letter-spacing: 0.01em;
}
.dropdown {
  background: #222526;
  border-radius: 16px;
  box-shadow: 0 1.5px 8px rgba(0,0,0,0.09);
  border: 2px solid #2C2F31;
  transition: border 0.15s;
  user-select: none;
  width: 100%;
  cursor: pointer;
  position: relative;
}
.dropdown.open {
  border: 2px solid #C7FF28;
}
.selected {
  display: flex;
  align-items: center;
  padding: 1rem 1.1rem;
  font-size: 1.13rem;
  font-weight: 500;
  color: #E4EBC4;
}
.selected .icon {
  margin-right: 9px;
  color: #C7FF28;
  min-width: 20px;
}
.selected .dropdown-arrow {
  margin-left: auto;
  color: #88936C;
  font-size: 1.08rem;
}
.options {
  position: absolute;
  width: 100%;
  left: 0;
  top: calc(100% + 3px);
  background: #151617;
  border-radius: 0 0 12px 12px;
  box-shadow: 0 3px 12px rgba(30,40,17,0.13);
  overflow: hidden;
  padding: 0;
  z-index: 1003;
  border: 1.5px solid #2C2F31;
}
.options li {
  list-style: none;
}
.options li a {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #E4EBC4;
  text-decoration: none;
  padding: 0.8rem 1.1rem;
  font-size: 1.05rem;
  transition: background 0.13s, color 0.13s;
}
.options li a .icon {
  color: #C7FF28;
  min-width: 20px;
}
.options li a.partner-link {
  color: #BCFF5E;
  font-weight: 600;
}
.options li a:hover {
  background: #223900;
  color: #C7FF28;
}
.dropdown.open .selected {
  border-bottom: 1.5px solid #C7FF28;
}
</style>
