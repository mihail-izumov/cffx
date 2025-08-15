import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
// Импортируем каждый компонент с уникальным именем
import SimulatorCards from '../components/SimulatorCards.vue'
import BrandCards from '../components/BrandCards.vue'
import FeaturesGrid from '../components/FeaturesGrid.vue'
import InstrumentsGrid from '../components/InstrumentsGrid.vue'
import InfoCardsPro from '../components/InfoCardsPro.vue'
import ValueCards from '../components/ValueCards.vue'
import PricingTable from '../components/PricingTable.vue'
import MembershipCards from '../components/MembershipCards.vue'
import TariffFeatures from '../components/TariffFeatures.vue'
import LeadersTable from '../components/LeadersTable.vue'
import YooKassaPayment from '../components/YooKassaPayment.vue'

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
    })
  },
  enhanceApp({ app }) {
    // Регистрируем каждый компонент с уникальным тегом
    app.component('SimulatorCards', SimulatorCards)
    app.component('BrandCards', BrandCards)
    app.component('FeaturesGrid', FeaturesGrid)
    app.component('InstrumentsGrid', InstrumentsGrid)
    app.component('InfoCardsPro', InfoCardsPro)
    app.component('ValueCards', ValueCards)
    app.component('PricingTable', PricingTable)
    app.component('MembershipCards', MembershipCards)
    app.component('TariffFeatures', TariffFeatures)
    app.component('LeadersTable', LeadersTable)
    app.component('YooKassaPayment', YooKassaPayment)
  }
} satisfies Theme
