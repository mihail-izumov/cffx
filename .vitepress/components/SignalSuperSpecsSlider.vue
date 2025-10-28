<template>
  <div class="sss-slider-wrapper">
    <div class="sss-brands-container" ref="sliderContainer">
      <!-- Ниже пример одной карточки. Повторить аналогично для всех 8 слайдов из контента. -->
      <div class="sss-brand-card sss-step-card" @mouseover="active = true" @mouseleave="active = false" :class="{active}">
        <!-- Заголовок -->
        <h3 class="sss-title">{{ slide.headline }}</h3>
        <!-- ВЕРХ: акцентная цель/выгода (лайм) — раньше была внизу -->
        <div class="sss-main-benefit">{{ slide.benefit }}</div>
        <!-- "Ваш контроль" и маркер (анимируется при наведении) -->
        <div class="sss-control-area">
          <span class="sss-control-label">Ваш контроль:</span>
          <span class="sss-control-highlight" :class="{animated: active}">
            {{ slide.control }}
          </span>
        </div>
        <!-- НИЗ: основной подробный текст, теперь приглушённый и меньший -->
        <div class="sss-description-details">{{ slide.details }}</div>
        <!-- Ссылка "Узнать Больше", появляется и анимируется при active -->
        <div class="sss-more-link-area">
          <a
            href="#"
            class="sss-more-link"
            :class="{active: active}"
            @click.prevent="onMoreClick(slide)"
          >
            Узнать больше
            <span class="sss-arrow" :class="{move: active}">→</span>
          </a>
        </div>
      </div>
      <!-- ... остальные карточки ... -->
    </div>
    <div class="sss-nav-buttons">
      <!-- как раньше -->
      <button class="sss-nav-btn sss-nav-prev" @click="scrollPrev" aria-label="Предыдущий слайд">
        <!--...-->
      </button>
      <button class="sss-nav-btn sss-nav-next" @click="scrollNext" aria-label="Следующий слайд">
        <!--...-->
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

// Пример структуры (передавай данные из файла, аналогично 8 карточек)
const slides = [
  {
    headline: 'Обратная связь за пару кликов',
    benefit: 'Гость легко и быстро сообщает о проблеме, а вы получаете все обращения точно и вовремя.',
    control: 'Виджет работает на сайте, в приложении или в любом формате для сферы услуг.',
    details: 'Любой клиент фитнеса или гость ресторана оставляет обратную связь за пару кликов — Сигнал или отзыв в Яндекс/2ГИС. ... Если гость недоволен, Сигнал сразу идёт команде, а не в открытые рейтинги. Положительные отклики легко отправляются на агрегаторы.'
  },
  // остальные карточки ...
]
const sliderContainer = ref(null)
const active = ref(false)

const scrollNext = () => {
  if (sliderContainer.value) {
    sliderContainer.value.scrollBy({ left: 336, behavior: 'smooth' })
  }
}

const scrollPrev = () => {
  if (sliderContainer.value) {
    sliderContainer.value.scrollBy({ left: -336, behavior: 'smooth' })
  }
}
const onMoreClick = (slide) => {
  // логика перехода/открытия подробностей
}
</script>

<style scoped>
.sss-slider-wrapper { position: relative; margin: 24px 0; }
.sss-brands-container { display: flex; overflow-x: auto; gap: 16px; padding: 4px 0 12px 4px; scroll-behavior: smooth; margin-bottom: 16px; }
.sss-brands-container::-webkit-scrollbar { display: none; }
.sss-brand-card {
  flex: 0 0 320px;
  border-radius: 12px;
  padding: 48px 24px;
  display: flex; flex-direction: column; gap: 16px;
  border-style: solid; border-width: 1px; border-top-width: 4px;
  position: relative; min-height: 360px; overflow: hidden;
  transition: border-top-color 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  background-color: #4a4a4a; border-color: #555; border-top-color: rgba(197, 249, 70, 0.3);
}
.sss-brand-card.active { border-top-color: #C5F946; }
.sss-title { font-size: 16px; font-weight: 700; color: #fff; }
.sss-main-benefit {
  color: #C5F946; font-size: 16px; font-weight: 500; margin-bottom: 0; margin-top: 0;
}
.sss-control-area { display: flex; align-items: center; gap: 8px; }
.sss-control-label { color: #fff; font-weight: 700; font-size: 16px; }
.sss-control-highlight {
  background: linear-gradient(to right, #C5F946 0%, #C5F946 50%, rgba(197,249,70,0.08) 50%);
  background-size: 200% 100%; background-position: 100% 0;
  background-color: rgba(197,249,70,0.08); color: #fff;
  padding: 1px 5px; border-radius: 1px; transition: background-position 0.4s, color 0.3s;
  font-size: 16px; font-weight: 500; line-height: 1.55;
}
.sss-control-highlight.animated { background-position: 0 0; color: #1a1a1a; }
.sss-description-details {
  color: #b0b0b0; font-size: 13px; line-height: 1.6; margin-top: auto;
}
.sss-more-link-area {
  margin-top: 16px;
  display: flex; justify-content: flex-start;
}
.sss-more-link {
  font-size: 14px; color: #b0b0b0; font-weight: 500; border: none; outline: none;
  background: none; cursor: pointer; text-decoration: none;
  display: flex; align-items: center; gap: 6px; transition: color 0.3s;
}
.sss-more-link.active { color: #C5F946; }
.sss-arrow {
  font-size: 18px; transition: transform 0.25s;
  margin-left: 2px;
}
.sss-arrow.move { transform: translateX(8px); }
.sss-nav-buttons { display: flex; gap: 8px; justify-content: flex-end; margin-right: 0; padding-right: 4px; }
.sss-nav-btn { width: 40px; height: 40px; border-radius: 50%; border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.3s; box-shadow: 0 2px 8px rgba(0,0,0,0.15); }
.sss-nav-prev { background-color: #e8e8e8; color: #4a4a4a; }
.sss-nav-prev:hover { background-color: #d0d0d0; transform: scale(1.05); }
.sss-nav-next { background-color: #fff; color: #2a2a2a; }
.sss-nav-next:hover { background-color: #f5f5f5; transform: scale(1.05); }
</style>
