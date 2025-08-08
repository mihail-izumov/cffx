import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import SimulatorCards from '../components/SimulatorCards.vue' // 1. ПРИКАЗ: НАЙТИ ОРУЖЕЙНИКА

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      // Здесь могут быть слоты для кастомизации макета, если понадобятся
    })
  },
  enhanceApp({ app }) {
    // 2. ПРИКАЗ: ДАТЬ ДОСТУП В ЛЮБОЙ ЗАЛ
    app.component('SimulatorCards', SimulatorCards)
  }
} satisfies Theme
