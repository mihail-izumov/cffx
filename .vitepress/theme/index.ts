import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'

import SimulatorCards from '../components/SimulatorCards.vue'
import BrandCards from '../components/BrandCards.vue'
import FeaturesGrid from '../components/FeaturesGrid.vue'
import FeaturesGrid from '../components/InstrumentsGrid.vue'

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
    })
  },
  enhanceApp({ app }) {
    app.component('SimulatorCards', SimulatorCards)
    app.component('BrandCards', BrandCards)
    app.component('FeaturesGrid', FeaturesGrid)
    app.component('FeaturesGrid', InstrumentsGrid)
  }
} satisfies Theme
