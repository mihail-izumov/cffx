import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import './custom.css'
import Layout from './Layout.vue'

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
import LTVCalc from '../components/LTVCalc.vue'
import DialogsAnnaWorks from '../components/DialogsAnnaWorks.vue'
import DialogsSteps from '../components/DialogsSteps.vue'
import Dialogs3Cards from '../components/Dialogs3Cards.vue'
import DialogsFirst5Days from '../components/DialogsFirst5Days.vue'
import DialogsFeatures from '../components/DialogsFeatures.vue'
import DialogsTarifs from '../components/DialogsTarifs.vue'
import DialogsForm from '../components/DialogsForm.vue'
import RadarStrategyTabs from '../components/RadarStrategyTabs.vue'
import DialogsHowItWorks from '../components/DialogsHowItWorks.vue'
import RadarForm from '../components/RadarForm.vue'
import RadarFeatures from '../components/RadarFeatures.vue'
import RadarTarifs from '../components/RadarTarifs.vue'
import Products from '../components/Products.vue'
import AllFeatures from '../components/AllFeatures.vue'
import SignalFormKorzh1 from '../components/SignalFormKorzh1.vue'
import DialogsT9 from '../components/DialogsT9.vue'
import DialogsTestT9 from '../components/DialogsTestT9.vue'
import SignalT9Configurator from '../components/SignalT9Configurator.vue'
import SignalModalButton from '../components/SignalModalButton.vue'
import CoffeePointsSMR from '../components/CoffeePointsSMR.vue'
import CoffeePointsSMRTest from '../components/CoffeePointsSMRTest.vue'
import FestProgram from '../components/FestProgram.vue'
import VideoPlayer from '../components/VideoPlayer.vue'
import PDFButton from '../components/PDFButton.vue'
import SmartReview3Cards from '../components/SmartReview3Cards.vue'
import SignalWidget from '../components/SignalWidget.vue'
import SignalBranchSelector from '../components/SignalBranchSelector.vue'
import SignalCafeCard from '../components/SignalCafeCard.vue'
import SignalModalWrapper from '../components/SignalModalWrapper.vue'
import SignalSendButton from '../components/SignalSendButton.vue'
import CupFillIcon from '../components/CupFillIcon.vue'
import ReviewModal from '../components/ReviewModal.vue'
import FestImageSlider from '../components/FestImageSlider.vue'
import GoogleDocsViewer from '../components/GoogleDocsViewer.vue'
import CoffeePointsCitySelect from '../components/CoffeePointsCitySelect.vue'
import SystemTabs from '../components/SystemTabs.vue'
import SignalWidgetBadge from '../components/SignalWidgetBadge.vue'
import FitnessTarifs from '../components/FitnessTarifs.vue'
import Dialogs7LevelsControl from '../components/Dialogs7LevelsControl.vue'
import RotatingSlogan from '../components/RotatingSlogan.vue'
import SignalConstructorModules from '../components/SignalConstructorModules.vue'
import SignalAbout3Cards from '../components/SignalAbout3Cards.vue'
import DialogsWidgets from '../components/DialogsWidgets.vue'
import SignalProductsSlider from '../components/SignalProductsSlider.vue'
import SignalProductsCards from '../components/SignalProductsCards.vue'
import AnnaSpecsSlider from '../components/AnnaSpecsSlider.vue'
import AnnaAccordion from '../components/AnnaAccordion.vue'
import TicketsAccordion from '../components/TicketsAccordion.vue'
import AnalyticsAccordion from '../components/AnalyticsAccordion.vue'
import TicketsSpecsSlider from '../components/TicketsSpecsSlider.vue'
import AnaliticsSpecsSlider from '../components/AnaliticsSpecsSlider.vue'
import SignalSuperSpecsSlider from '../components/SignalSuperSpecsSlider.vue'
import TicketsExamples from '../components/TicketsExamples.vue'
import DashboardCafeSignalsMap from '../components/DashboardCafeSignalsMap.vue'
import DashboardGymSignalsMap from '../components/DashboardGymSignalsMap.vue'
import SignalDashboardSwitcher from '../components/SignalDashboardSwitcher.vue'
import AnnaQuotes from '../components/AnnaQuotes.vue'
import DialogsStatisticsSlider from '../components/DialogsStatisticsSlider.vue'
import LTVFitCalc from '../components/LTVFitCalc.vue'
import LTVCalcSwitcher from '../components/LTVCalcSwitcher.vue'
import SignalMaker123 from '../components/SignalMaker123.vue'
import SignalSLAConfigurator from '../components/SignalSLAConfigurator.vue'
import DividerCustom from '../components/DividerCustom.vue'
import MaxGrowWithYou3Cards from '../components/MaxGrowWithYou3Cards.vue'
import SuperSportWidget from '../components/SuperSportWidget.vue'
import SignalFormSuperSport from '../components/SignalFormSuperSport.vue'
import TestT9Fitness from '../components/TestT9Fitness.vue'
import BannerFitGuide from '../components/BannerFitGuide.vue'
import SignalConfigurator2New from '../components/SignalConfigurator2New.vue'
import MainSignalWidgetsCoffee from '../components/MainSignalWidgetsCoffee.vue'
import AddVoteStatus from '../components/AddVoteStatus.vue'
import BadgeCounter from '../components/BadgeCounter.vue'
import SignalItemsSlider from '../components/SignalItemsSlider.vue'
import RadarWorksBadge from '../components/RadarWorksBadge.vue'
import MainSignalWidgetsFitness from '../components/MainSignalWidgetsFitness.vue'
import DashboardTest from '../components/DashboardTest.vue'
import InvestKorzhWidget from '../components/InvestKorzhWidget.vue'
import InvestKorzhInfoBlock from '../components/InvestKorzhInfoBlock.vue'
import InvestUpdatesInfoBlock from '../components/InvestUpdatesInfoBlock.vue'
import InvestKorzhGallerySlider from '../components/InvestKorzhGallerySlider.vue'
import InvestKorzhIndexBlock from '../components/InvestKorzhIndexBlock.vue'
import InvestKorzhSendSignal from '../components/InvestKorzhSendSignal.vue'
import InvestKorzhSpecsTabs from '../components/InvestKorzhSpecsTabs.vue'
import InvestKorzhConfigurator2 from '../components/InvestKorzhConfigurator2.vue'


export default {
  extends: DefaultTheme,

  // Используем Layout напрямую (модальное окно добавлено в Layout.vue)
  Layout: Layout,

  enhanceApp({ app }) {
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
    app.component('LTVCalc', LTVCalc)
    app.component('DialogsAnnaWorks', DialogsAnnaWorks)
    app.component('DialogsSteps', DialogsSteps)
    app.component('Dialogs3Cards', Dialogs3Cards)
    app.component('DialogsFirst5Days', DialogsFirst5Days) 
    app.component('DialogsFeatures', DialogsFeatures)
    app.component('DialogsTarifs', DialogsTarifs)
    app.component('DialogsForm', DialogsForm)   
    app.component('RadarStrategyTabs', RadarStrategyTabs)   
    app.component('DialogsHowItWorks', DialogsHowItWorks) 
    app.component('RadarForm', RadarForm) 
    app.component('RadarFeatures', RadarFeatures)
    app.component('RadarTarifs', RadarTarifs)
    app.component('Products', Products) 
    app.component('AllFeatures', AllFeatures) 
    app.component('SignalFormKorzh1', SignalFormKorzh1) 
    app.component('DialogsT9', DialogsT9)
    app.component('DialogsTestT9', DialogsTestT9)
    app.component('SignalT9Configurator', SignalT9Configurator)
    app.component('SignalModalButton', SignalModalButton)
    app.component('CoffeePointsSMR', CoffeePointsSMR)
    app.component('CoffeePointsSMRTest', CoffeePointsSMRTest)
    app.component('FestProgram', FestProgram)
    app.component('VideoPlayer', VideoPlayer)
    app.component('PDFButton', PDFButton)
    app.component('SmartReview3Cards', SmartReview3Cards)    
    app.component('SignalWidget', SignalWidget)  
    app.component('SignalCafeCard', SignalCafeCard)  
    app.component('SignalBranchSelector', SignalBranchSelector)  
    app.component('SignalModalWrapper', SignalModalWrapper)
    app.component('SignalSendButton', SignalSendButton)
    app.component('CupFillIcon', CupFillIcon)
    app.component('ReviewModal', ReviewModal)
    app.component('FestImageSlider', FestImageSlider)
    app.component('GoogleDocsViewer', GoogleDocsViewer)
    app.component('CoffeePointsCitySelect', CoffeePointsCitySelect)
    app.component('SystemTabs', SystemTabs)
    app.component('SignalWidgetBadge', SignalWidgetBadge)
    app.component('FitnessTarifs', FitnessTarifs)
    app.component('Dialogs7LevelsControl', Dialogs7LevelsControl)
    app.component('RotatingSlogan', RotatingSlogan)
    app.component('SignalConstructorModules', SignalConstructorModules)
    app.component('SignalAbout3Cards', SignalAbout3Cards)
    app.component('DialogsWidgets', DialogsWidgets)
    app.component('SignalProductsSlider', SignalProductsSlider)
    app.component('SignalProductsCards', SignalProductsCards)
    app.component('AnnaSpecsSlider', AnnaSpecsSlider)
    app.component('AnnaAccordion', AnnaAccordion)
    app.component('TicketsAccordion', TicketsAccordion)
    app.component('AnalyticsAccordion', AnalyticsAccordion)
    app.component('TicketsSpecsSlider', TicketsSpecsSlider)
    app.component('AnaliticsSpecsSlider', AnaliticsSpecsSlider)
    app.component('SignalSuperSpecsSlider', SignalSuperSpecsSlider)
    app.component('TicketsExamples', TicketsExamples)
    app.component('DashboardCafeSignalsMap', DashboardCafeSignalsMap)
    app.component('DashboardGymSignalsMap', DashboardGymSignalsMap)
    app.component('SignalDashboardSwitcher', SignalDashboardSwitcher)
    app.component('AnnaQuotes', AnnaQuotes)
    app.component('DialogsStatisticsSlider', DialogsStatisticsSlider)
    app.component('LTVFitCalc', LTVFitCalc)
    app.component('LTVCalcSwitcher', LTVCalcSwitcher)
    app.component('SignalMaker123', SignalMaker123)
    app.component('SignalSLAConfigurator', SignalSLAConfigurator)
    app.component('DividerCustom', DividerCustom)
    app.component('MaxGrowWithYou3Cards', MaxGrowWithYou3Cards)
    app.component('SuperSportWidget', SuperSportWidget)
    app.component('SignalFormSuperSport', SignalFormSuperSport)
    app.component('TestT9Fitness', TestT9Fitness)
    app.component('BannerFitGuide', BannerFitGuide)
    app.component('SignalConfigurator2New', SignalConfigurator2New)
    app.component('MainSignalWidgetsCoffee', MainSignalWidgetsCoffee)
    app.component('AddVoteStatus', AddVoteStatus)
    app.component('BadgeCounter', BadgeCounter)
    app.component('SignalItemsSlider', SignalItemsSlider)
    app.component('RadarWorksBadge', RadarWorksBadge)
    app.component('MainSignalWidgetsFitness', MainSignalWidgetsFitness)
    app.component('DashboardTest', DashboardTest)
    app.component('InvestKorzhWidget', InvestKorzhWidget)
    app.component('InvestKorzhInfoBlock', InvestKorzhInfoBlock)
    app.component('InvestUpdatesInfoBlock', InvestUpdatesInfoBlock)
    app.component('InvestKorzhGallerySlider', InvestKorzhGallerySlider)
    app.component('InvestKorzhIndexBlock', InvestKorzhIndexBlock)
    app.component('InvestKorzhSendSignal', InvestKorzhSendSignal)
    app.component('InvestKorzhSpecsTabs', InvestKorzhSpecsTabs)
    app.component('InvestKorzhConfigurator2', InvestKorzhConfigurator2)
    
  },
}
