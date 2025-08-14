import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import SimulatorCards from '../components/SimulatorCards.vue'
import BrandCards from '../components/BrandCards.vue'

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      // Здесь могут быть слоты для кастомизации макета, если понадобятся
    })
  },
  enhanceApp({ app }) {
    // Регистрация компонентов, чтобы они были доступны глобально
    app.component('SimulatorCards', SimulatorCards)
    app.component('BrandCards', BrandCards)
  }
} satisfies Theme
