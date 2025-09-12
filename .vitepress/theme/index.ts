import DefaultTheme from 'vitepress/theme'
import './custom.css'
import CustomLayout from './CustomLayout.vue'
import SimulatorCards from '../components/SimulatorCards.vue'
import BrandCards from '../components/BrandCards.vue'
import FeaturesGrid from '../components/FeaturesGrid.vue'
import InstrumentsGrid from '../components/InstrumentsGrid.vue'
import InfoCardsPro from '../components/InfoCardsPro.vue'
import ValueCards from '../components/ValueCards.vue'
import PricingTable from '../components/PricingTable.vue'
import MembershipCards from '../components/MembershipCards.vue'
import MembershipCards2 from '../components/MembershipCards2.vue'
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
import RotatingPhrases from '../components/RotatingPhrases.vue'
import FeedbackAlchemy from '../components/FeedbackAlchemy.vue'
import KorzhWidget from '../components/KorzhWidget.vue'
import PulseSubscribeBanner from '../components/PulseSubscribeBanner.vue'
import IndexAbout from '../components/IndexAbout.vue'
import Pulse3Cards from '../components/Pulse3Cards.vue'
import PulseSpecs from '../components/PulseSpecs.vue'
import RegularVSSmart from '../components/RegularVSSmart.vue'
import FestTerms from '../components/FestTerms.vue'
import FestCards from '../components/FestCards.vue'
import FestActivities from '../components/FestActivities.vue'
import FestPossibilities from '../components/FestPossibilities.vue'
import FestContact from '../components/FestContact.vue'
import FestBrands from '../components/FestBrands.vue'
import GrowthPotentialMethod from '../components/GrowthPotentialMethod.vue'
import IndexApproach from '../components/IndexApproach.vue'
import AnnaSpecsSignal from '../components/AnnaSpecsSignal.vue'
import InvestPulseForm from '../components/InvestPulseForm.vue'
import InvestNewCafe from '../components/InvestNewCafe.vue'
import SignalsYandexVSSignal from '../components/SignalsYandexVSSignal.vue'
import AnnaWhatYouGet from '../components/AnnaWhatYouGet.vue'
import AnnaWithYou from '../components/AnnaWithYou.vue'
import AnnaFeelThePower from '../components/AnnaFeelThePower.vue'

export default {
  extends: DefaultTheme,

  // 2. Указываем наш новый CustomLayout в качестве основного
  Layout: CustomLayout,

  enhanceApp({ app }) {
    // Регистрация ваших компонентов остается без изменений
    app.component('SimulatorCards', SimulatorCards)
    app.component('BrandCards', BrandCards)
    app.component('FeaturesGrid', FeaturesGrid)
    app.component('InstrumentsGrid', InstrumentsGrid)
    app.component('InfoCardsPro', InfoCardsPro)
    app.component('ValueCards', ValueCards)
    app.component('PricingTable', PricingTable)
    app.component('MembershipCards', MembershipCards)
    app.component('MembershipCards2', MembershipCards2)
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
    app.component('RotatingPhrases', RotatingPhrases)
    app.component('FeedbackAlchemy', FeedbackAlchemy)
    app.component('KorzhWidget', KorzhWidget)
    app.component('PulseSubscribeBanner', PulseSubscribeBanner)
    app.component('IndexAbout', IndexAbout)
    app.component('Pulse3Cards', Pulse3Cards)
    app.component('PulseSpecs', PulseSpecs)
    app.component('RegularVSSmart', RegularVSSmart)
    app.component('FestTerms', FestTerms)
    app.component('FestCards', FestCards)
    app.component('FestActivities', FestActivities)
    app.component('FestPossibilities', FestPossibilities)
    app.component('FestContact', FestContact)
    app.component('FestBrands', FestBrands)
    app.component('GrowthPotentialMethod', GrowthPotentialMethod)
    app.component('IndexApproach', IndexApproach)
    app.component('AnnaSpecsSignal', AnnaSpecsSignal)
    app.component('InvestPulseForm', InvestPulseForm)
    app.component('InvestNewCafe', InvestNewCafe)
    app.component('SignalsYandexVSSignal', SignalsYandexVSSignal)
    app.component('AnnaWhatYouGet', AnnaWhatYouGet)
    app.component('AnnaWithYou', AnnaWithYou)
    app.component('AnnaFeelThePower', AnnaFeelThePower)
  },
}
