<template>
  <div class="city-row">
    <h3 class="city-title">Кофейни в</h3>
    <div class="city-dropdown" :class="{ open: open }" @click="open=!open">
      <div class="city-selected">
        <span class="icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
               style="transform: rotate(-15deg);">
            <path d="M4.037 4.688a.495.495 0 0 1 .651-.651l16 6.5a.5.5 0 0 1-.063.947l-6.124 1.58a2 2 0 0 0-1.438 1.435l-1.579 6.126a.5.5 0 0 1-.947.063z"/>
          </svg>
        </span>
        <span :class="{'lime': active==='samara'}">Самара</span>
        <span class="arrow" :class="{lime:open}">
          <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="4 6 8 10 12 6"/>
          </svg>
        </span>
      </div>
      <ul v-if="open" class="city-options">
        <li>
          <a href="/me"
             :class="['city-btn', active==='samara'?'lime':'']"
             @click="setActive('samara')"> 
            <span class="icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                   style="transform: rotate(-15deg);">
                <path d="M4.037 4.688a.495.495 0 0 1 .651-.651l16 6.5a.5.5 0 0 1-.063.947l-6.124 1.58a2 2 0 0 0-1.438 1.435l-1.579 6.126a.5.5 0 0 1-.947.063z"/>
              </svg>
            </span>
            Самара
          </a>
        </li>
        <li>
          <a href="/partner" class="city-btn" :class="{active:active==='partner'}" @click="setActive('partner')">
            Стать партнером
          </a>
        </li>
      </ul>
    </div>
    <div class="city-btns">
      <a href="/me"
         class="city-btn" 
         :class="['no-radius', active==='samara'?'lime':'']"
         @click="setActive('samara')">Самара</a>
      <a href="/partner"
         class="city-btn" 
         :class="['no-radius',active==='partner'?'lime':'']"
         @click="setActive('partner')">Стать партнером</a>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const open = ref(false)
const active = ref('samara')
function setActive(a) {
  active.value=a
  open.value=false
}
</script>

<style scoped>
.city-row {
  display: flex !important;
  align-items: center !important;
  gap: 0 !important;
  background: none !important;
}
.city-title {
  color: #fff !important;
  margin: 0 !important;
  font-size: 1.28rem !important;
  font-weight: 600 !important;
  padding-right: 1.14rem !important;
}
.city-dropdown {
  position: relative !important;
  border-radius: 13px !important;
  border: 1.3px solid #C7FF28 !important;
  background: #222318 !important;
  min-width: 170px !important;
  margin: 0 !important;
  transition: border-color 0.13s !important;
  z-index: 10 !important;
}
.city-dropdown.open {
  box-shadow: 0 0 6px 1px #C7FF28 !important;
  border-color: #C7FF28 !important;
}
.city-selected {
  display: flex !important;
  align-items: center !important;
  gap: 8px !important;
  font-size: 1.08rem !important;
  padding: 0.7rem 1.05rem !important;
  background: none !important;
  color: #b7bca6 !important;
  font-weight: 500 !important;
}
.city-selected .icon {
  color: #C7FF28 !important;
  margin-right: 4px !important;
  min-width: 17px !important;
}
.city-selected .arrow {
  margin-left: .6rem !important;
  display: flex !important;
  align-items: center !important;
  color: #C7FF28 !important;
  transition: color 0.14s !important;
}
.city-selected .arrow svg {
  stroke: #C7FF28 !important;
  background: transparent !important;
}
.city-options {
  position: absolute !important;
  top: 100% !important;
  left: 0 !important;
  width: 100% !important;
  background: #151617 !important;
  border-radius: 0 0 13px 13px !important;
  margin: 0 !important;
  box-shadow: 0 3px 16px 0 rgba(13,16,9,0.19) !important;
  border: none !important;
  padding: 0 !important;
  z-index: 900 !important;
}
.city-options li {
  list-style: none !important;
  margin: 0 !important;
  padding: 0 !important;
}
.city-btn {
  background: none !important;
  color: #b8beac !important;
  text-decoration: none !important;
  display: flex !important;
  align-items: center !important;
  gap: 7px !important;
  font-size: 1.06rem !important;
  padding: 0.75rem 1.16rem !important;
  border: none !important;
  box-shadow: none !important;
  transition: background 0.13s !important;
  cursor: pointer !important;
  outline: none !important;
  border-radius: 0 !important;
}
.city-btn.lime, 
.city-btn.active.lime, 
.city-btn.lime:focus,
.city-btn.lime:active {
  color: #C7FF28 !important;
  font-weight: 600 !important;
  background: none !important;
}
.city-btn:hover, .city-btn.active:not(.lime) {
  color: #e4ebc4 !important;
  background: #262724 !important;
}
.no-radius {
  margin-right: 0 !important;
  border-radius: 0 !important;
}
.city-btns {
  display: flex !important;
  align-items: center !important;
  margin-left: 1rem !important;
}
.city-btns .city-btn {
  background: #191a16 !important;
  border-radius: 0 !important;
  border-left: 1px solid #262724 !important;
  font-size: 1.03rem !important;
  padding: 0.64rem 1.19rem !important;
  margin: 0 !important;
  box-shadow: none !important;
  transition: none !important;
}
.city-btns .city-btn:first-child {
  border-left: none !important;
}
.city-btns .city-btn.lime {
  color: #C7FF28 !important;
  font-weight: 600 !important;
  background: #191a16 !important;
}
.city-btns .city-btn:hover:not(.lime) {
  background: #223900 !important;
  color: #e4ebc4 !important;
}
.city-btns .city-btn:active {
  box-shadow: none !important;
}
.lime { color: #C7FF28 !important; }
.city-options li .icon { color: #C7FF28 !important; min-width: 17px !important; }
.city-options li a:hover, .city-options li a:focus {
  background: #1e200d !important;
  color: #e4ebc4 !important;
}
.city-options li a.lime {
  color: #C7FF28 !important;
  font-weight: 600 !important;
}
.city-options li a:not(.lime):hover { color: #b7bca6 !important; background: #1a1a18 !important; }
</style>
