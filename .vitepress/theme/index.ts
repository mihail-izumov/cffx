import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import './custom.css' // ← ДОБАВЬТЕ ЭТУ СТРОКУ
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
import TariffFeaturesFree from '../components/TariffFeaturesFree.vue'
import TariffFeaturesInsider from '../components/TariffFeaturesInsider.vue'
import TariffFeaturesLeader from '../components/TariffFeaturesLeader.vue'
import LeadersTable from '../components/LeadersTable.vue'
import YooKassaPayment from '../components/YooKassaPayment.vue'
import FreeForm from '../components/FreeForm.vue'
import InsiderForm from '../components/InsiderForm.vue'
import PartnerForm from '../components/PartnerForm.vue'
import IndexSMR from '../components/IndexSMR.vue'
import PriceCalculator from '../components/PriceCalculator.vue'
import SimulatorTabs from '../components/SimulatorTabs.vue'
import DialogTables from '../components/DialogTables.vue'
import IndexSMRTest from '../components/IndexSMR_test.vue'
import CoffeeGlossaryTabs from '../components/CoffeeGlossaryTabs.vue'
import GrowthIndexMethod from '../components/GrowthIndexMethod.vue'
import IndexGuide from '../components/IndexGuide.vue'
import IndexPlans from '../components/IndexPlans.vue'
import TariffFeaturesCalc from '../components/TariffFeaturesCalc.vue'
import BrewFirst30Days from '../components/BrewFirst30Days.vue'
import ReviewsWidget from '../components/ReviewsWidget.vue'
import SignalSteps from '../components/SignalSteps.vue'

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {})
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
    app.component('TariffFeaturesFree', TariffFeaturesFree)
    app.component('TariffFeaturesInsider', TariffFeaturesInsider)
    app.component('TariffFeaturesLeader', TariffFeaturesLeader)
    app.component('LeadersTable', LeadersTable)
    app.component('YooKassaPayment', YooKassaPayment)
    app.component('FreeForm', FreeForm)
    app.component('InsiderForm', InsiderForm)
    app.component('PartnerForm', PartnerForm)
    app.component('IndexSMR', IndexSMR)
    app.component('PriceCalculator', PriceCalculator)
    app.component('SimulatorTabs', SimulatorTabs)
    app.component('DialogTables', DialogTables)
    app.component('IndexSMRTest', IndexSMRTest)
    app.component('CoffeeGlossaryTabs', CoffeeGlossaryTabs)
    app.component('GrowthIndexMethod', GrowthIndexMethod)
    app.component('IndexGuide', IndexGuide)
    app.component('IndexPlans', IndexPlans)
    app.component('TariffFeaturesCalc', TariffFeaturesCalc)
    app.component('BrewFirst30Days', BrewFirst30Days)
    app.component('ReviewsWidget', ReviewsWidget)
    app.component('SignalSteps', SignalSteps)
  }
}
