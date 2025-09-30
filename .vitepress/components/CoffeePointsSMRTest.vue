<script setup>
import { ref, watch, nextTick, onMounted, onUnmounted, computed } from 'vue'
import SignalT9Configurator from './SignalT9Configurator.vue'

const cafeNames = ['Корж', 'MOSAIC', 'Surf', 'Skuratov', 'Белотурка', 'Кэрри']

// Данные о кофейнях - ОБНОВЛЕНО ИЗ ТАБЛИЦЫ
const cafes = {
  'Корж': {
    name: 'Корж',
    totalReviews: '4,520',
    status: 'Актуально: 30.09.2025',
    index: 98,
    isConnected: true,
    branches: [
      { address: 'Куйбышева, 103', gisUrl: 'https://2gis.ru/samara/firm/70000001100403006/tab/reviews', yandexUrl: 'https://yandex.ru/maps/org/korzh/217541675197/reviews' },
      { address: 'Революционная, 101В', gisUrl: 'https://2gis.ru/samara/firm/70000001079219341/tab/reviews', yandexUrl: 'https://yandex.ru/maps/org/korzh/53721116858//reviews' },
      { address: '9 просека 5-я малая линия, 3б', gisUrl: 'https://2gis.ru/samara/firm/70000001074923618/tab/reviews', yandexUrl: 'https://yandex.ru/maps/org/korzh/152008652145/reviews' },
      { address: 'Льва Толстого, 30Б', gisUrl: 'https://2gis.ru/samara/firm/70000001052357057/tab/reviews', yandexUrl: 'https://yandex.ru/maps/org/korzh/39953057475/reviews' },
      { address: 'Самарская, 270', gisUrl: 'https://2gis.ru/samara/firm/70000001043471927/tab/reviews', yandexUrl: 'https://yandex.ru/maps/org/korzh/58375020263/reviews' },
      { address: 'Дачная, 2к2', gisUrl: 'https://2gis.ru/samara/firm/70000001045453045/tab/reviews', yandexUrl: 'https://yandex.ru/maps/org/korzh/144063441903/reviews' },
      { address: 'Ульяновская, 19', gisUrl: 'https://2gis.ru/samara/firm/70000001033411071/tab/reviews', yandexUrl: 'https://yandex.ru/maps/org/korzh/102178077269/reviews' },
      { address: 'Ново-Садовая, 106б', gisUrl: 'https://2gis.ru/samara/firm/70000001027391770/tab/reviews', yandexUrl: 'https://yandex.ru/maps/org/korzh/95875749858/reviews' }
    ]
  },
  'MOSAIC': {
    name: 'MOSAIC',
    totalReviews: '2,231',
    status: 'Актуально: 30.09.2025',
    index: 91,
    isConnected: false,
    branches: [
        { address: 'Фрунзе, 91', gisUrl: 'https://2gis.ru/samara/firm/70000001077330664/tab/reviews', yandexUrl: 'https://yandex.ru/maps/org/mosaic_coffee_tea/151180373582/reviews/' },
        { address: 'Волжский просп., 50', gisUrl: 'https://2gis.ru/samara/firm/70000001074565560/tab/reviews', yandexUrl: 'https://yandex.ru/maps/org/mosaic_coffee_tea/241776381665/reviews/' },
        { address: 'Речной вокзал', gisUrl: 'https://2gis.ru/samara/firm/70000001074565559/tab/reviews', yandexUrl: 'https://yandex.ru/maps/org/mosaic_coffee_tea/26968768492/reviews/' },
        { address: 'Максима Горького, 82', gisUrl: 'https://2gis.ru/samara/firm/70000001065476074/tab/reviews', yandexUrl: 'https://yandex.ru/maps/org/mosaic_coffee_tea/130707944684/reviews/' },
        { address: 'Волжский просп., 40', gisUrl: 'https://2gis.ru/samara/firm/70000001052939655/tab/reviews', yandexUrl: 'https://yandex.ru/maps/org/mosaic_coffee_tea/26968768492/reviews/' },
        { address: 'Мичурина, 138', gisUrl: 'https://2gis.ru/samara/firm/70000001035366800/tab/reviews', yandexUrl: 'https://yandex.ru/maps/org/mosaic_coffee_tea/186171163289/reviews/' },
        { address: 'Мичурина, 15', gisUrl: 'https://2gis.ru/samara/firm/70000001034344804/tab/reviews', yandexUrl: 'https://yandex.ru/maps/org/mosaic_coffee_tea/40452073764/reviews/' },
        { address: 'Аэродромная улица, 47А (ТРЦ Аврора Молл)', gisUrl: 'https://2gis.ru/samara/firm/70000001046644341/tab/reviews', yandexUrl: 'https://yandex.ru/maps/org/mosaic_coffee_tea/121248491329/reviews/' },
        { address: 'Московское шоссе, 185А', gisUrl: 'https://2gis.ru/samara/firm/70000001027292047/tab/reviews', yandexUrl: 'https://yandex.ru/maps/org/mosaic_coffee_tea/241817444822/reviews/' },
        { address: 'Волгина, 127А', gisUrl: 'https://2gis.ru/samara/firm/70000001026465823/tab/reviews', yandexUrl: 'https://yandex.ru/maps/org/mosaic_coffee_tea/189131333340/reviews/' },
        { address: 'Ново-Садовая, 106', gisUrl: 'https://2gis.ru/samara/firm/70000001027292024/tab/reviews', yandexUrl: 'https://yandex.ru/maps/org/mosaic_coffee_tea/131060566066/reviews/' },
        { address: 'Солнечная, 24Б', gisUrl: 'https://2gis.ru/samara/firm/70000001037266527/tab/reviews', yandexUrl: 'https://yandex.ru/maps/org/mosaic_coffee_tea/59004397239/reviews/' },
        { address: 'Красноармейский спуск', gisUrl: 'https://2gis.ru/samara/firm/70000001074565722/tab/reviews', yandexUrl: 'https://yandex.ru/maps/org/mosaic_coffee_tea/87795478653/reviews/' },
        { address: 'Напротив ЦСКА', gisUrl: 'https://2gis.ru/samara/firm/70000001088760179/tab/reviews', yandexUrl: 'https://yandex.ru/maps/org/mosaic_coffee_tea/62781566656/reviews/' }
    ]
  },
    'Skuratov': {
    name: 'Skuratov',
    totalReviews: '3,129',
    status: 'Актуально: 30.09.2025',
    index: 96,
    isConnected: false,
    branches: [
      { address: 'Самарская, 190', gisUrl: 'https://2gis.ru/samara/firm/70000001062410566/tab/reviews', yandexUrl: 'https://yandex.ru/maps/org/skuratov/150151107830/reviews/' },
      { address: 'Молодогвардейская, 80', gisUrl: 'https://2gis.ru/samara/firm/70000001063379108/tab/reviews', yandexUrl: 'https://yandex.ru/maps/org/skuratov_coffee/112256596811/reviews/' },
      { address: 'Максима Горького, 129', gisUrl: 'https://2gis.ru/samara/firm/70000001094239079/tab/reviews', yandexUrl: 'https://yandex.ru/maps/org/skuratov_coffee/222229699719/reviews/' },
      { address: 'Красноармейская, 133', gisUrl: 'https://2gis.ru/samara/firm/70000001052366972/tab/reviews', yandexUrl: 'https://yandex.ru/maps/org/skuratov_coffee/9331047841/reviews/' },
      { address: 'Первомайская, 29', gisUrl: 'https://2gis.ru/samara/firm/70000001043589620/tab/reviews', yandexUrl: 'https://yandex.ru/maps/org/skuratov_coffee/64247746809/reviews/' },
      { address: 'Куйбышева, 68/70', gisUrl: 'https://2gis.ru/samara/firm/70000001036538224/tab/reviews', yandexUrl: 'https://yandex.ru/maps/org/skuratov_coffee/203299963607/reviews/' }
    ]
  },
  'Surf': {
    name: 'Surf',
    totalReviews: '925',
    status: 'Актуально: 30.09.2025',
    index: 93,
    isConnected: false,
    branches: [
      { address: 'Некрасовская, 57', gisUrl: 'https://2gis.ru/samara/firm/70000001036632385/tab/reviews', yandexUrl: 'https://yandex.ru/maps/org/surf_coffee/130764135504/reviews/' },
      { address: 'Полевая, 54', gisUrl: 'https://2gis.ru/samara/firm/70000001047142182/tab/reviews', yandexUrl: 'https://yandex.ru/maps/org/surf_coffee_x_pool/179188509748/reviews/' },
      { address: 'Куйбышева, 100', gisUrl: 'https://2gis.ru/samara/firm/70000001082424572/tab/reviews', yandexUrl: 'https://yandex.ru/maps/org/surf_coffee/13215597722/reviews/' }
    ]
  },
  'Белотурка': {
    name: 'Белотурка',
    totalReviews: '2,941',
    status: 'Актуально: 30.09.2025',
    index: '~',
    isConnected: false,
    branches: [
      { address: 'Куйбышева, 99', gisUrl: 'https://2gis.ru/samara/firm/70000001075213346/tab/reviews', yandexUrl: 'https://yandex.ru/maps/org/beloturka/21345450545/reviews/' },
      { address: 'Молодогвардейская, 153', gisUrl: 'https://2gis.ru/samara/firm/70000001094600683/tab/reviews', yandexUrl: 'https://yandex.ru/maps/org/beloturка/71041285330/reviews/' },
      { address: 'Ново-Садовая, 106', gisUrl: 'https://2gis.ru/samara/firm/70000001095659001/tab/reviews', yandexUrl: 'https://yandex.ru/maps/org/beloturка/56246021902/reviews/' },
      { address: 'Московское шоссе, 41 (РДЦ)', gisUrl: 'https://2gis.ru/samara/firm/70000001090546275/tab/reviews', yandexUrl: 'https://yandex.ru/maps/org/beloturка/34710016395/reviews/' },
      { address: 'Московское шоссе, 81Б (Парк Хаус)', gisUrl: 'https://2gis.ru/samara/firm/70000001100074136/tab/reviews', yandexUrl: 'https://yandex.ru/maps/org/beloturка/90354199231/reviews/' }
    ]
  },
  'Кэрри': {
    name: 'Кэрри',
    totalReviews: '3,568',
    status: 'Актуально: 30.09.2025',
    index: '~',
    isConnected: false,
    branches: [
      { address: 'Ново-Садовая ул., 160М', gisUrl: 'https://2gis.ru/samara/firm/70000001070543566/tab/reviews', yandexUrl: 'https://yandex.ru/maps/org/kerri/202386458956/reviews/' },
      { address: 'Московское шоссе, 252', gisUrl: 'https://2gis.ru/samara/firm/70000001028380476/tab/reviews', yandexUrl: 'https://yandex.ru/maps/org/kerri/158033026774/reviews/' },
      { address: 'Дачная ул., 2, корп. 1', gisUrl: 'https://2gis.ru/samara/firm/70000001020794652/tab/reviews', yandexUrl: 'https://yandex.ru/maps/org/kerri/75305070589/reviews/' },
      { address: 'Дыбенко, 30 (Космопорт)', gisUrl: 'https://2gis.ru/samara/firm/70000001027327015/tab/reviews', yandexUrl: 'https://yandex.ru/maps/org/kerri/25856651419/reviews/' }
    ]
  }
}

const cafeProfiles = {
  'корж': { responseTime: { base: 2.3, min: 1.8, max: 2.8 }, resolutionTime: { base: 17.5, min: 15, max: 20 } },
  'mosaic': { responseTime: { base: 1.4, min: 1.0, max: 1.9 }, resolutionTime: { base: 14.7, min: 12, max: 17 } },
  'skuratov': { responseTime: { base: 1.6, min: 1.2, max: 2.1 }, resolutionTime: { base: 15.2, min: 13, max: 18 } },
  'surf': { responseTime: { base: 3.1, min: 2.5, max: 3.8 }, resolutionTime: { base: 20.3, min: 18, max: 23 } },
  'белотурка': { responseTime: { base: 2.7, min: 2.2, max: 3.2 }, resolutionTime: { base: 18.8, min: 16, max: 22 } },
  'кэрри': { responseTime: { base: 2.0, min: 1.5, max: 2.6 }, resolutionTime: { base: 16.4, min: 14, max: 19 } }
}

const getCafeConfig = (cafeName) => {
  const normalized = cafeName?.toLowerCase() || ''
  return cafeProfiles[normalized] || { responseTime: { base: 2, min: 1, max: 3 }, resolutionTime: { base: 15, min: 12, max: 18 } }
}

const selectedCafe = ref(cafeNames[0] || 'Корж')

const establishment = computed(() => cafes[selectedCafe.value] || {
  name: '',
  totalReviews: '',
  status: '',
  index: 0,
  isConnected: false,
  branches: []
})

const cafeConfig = computed(() => getCafeConfig(selectedCafe.value))

const systemMetrics = ref({
  responseTime: cafeConfig.value.responseTime.base,
  resolutionTime: cafeConfig.value.resolutionTime.base,
  lastUpdate: Date.now()
})

const showLeftGradient = ref(false)
const showRightGradient = ref(false)
const isMobile = ref(false)
const isReviewModalOpen = ref(false)

const fetchSystemStatus = async () => {
  try {
    await new Promise(resolve => setTimeout(resolve, 50))
    const currentConfig = cafeConfig.value
    const now = Date.now()
    const hourOfDay = new Date().getHours()
    const isBusinessHours = hourOfDay >= 9 && hourOfDay <= 21
    const loadFactor = isBusinessHours ? 0.8 : 1.2
    const responseVariation = (Math.random() - 0.5) * 0.15 * loadFactor
    const resolutionVariation = (Math.random() - 0.5) * 1.2 * loadFactor

    systemMetrics.value.responseTime = Math.max(
      currentConfig.responseTime.min,
      Math.min(currentConfig.responseTime.max,
        systemMetrics.value.responseTime + responseVariation
      )
    )

    systemMetrics.value.resolutionTime = Math.max(
      currentConfig.resolutionTime.min,
      Math.min(currentConfig.resolutionTime.max,
        systemMetrics.value.resolutionTime + resolutionVariation
      )
    )

    systemMetrics.value.lastUpdate = now
  } catch (error) {
    // ignore
  }
}

const formatTime = (hours) => {
  if (hours < 1) return `${Math.round(hours * 60)}мин`
  return `${hours.toFixed(1)}ч`
}

const showBranchList = ref(false)
const emit = defineEmits(['close'])
const widgetContentRef = ref(null)
const switchersRef = ref(null)
const badgeRef = ref(null)

const getRandomService = () => Math.random() < 0.5 ? 'gis' : 'yandex'
const goToReviews = (branch) => {
  const service = getRandomService()
  const url = service === 'gis' ? branch.gisUrl : branch.yandexUrl
  window.open(url, '_blank')
}

const openReviewModal = () => {
  isReviewModalOpen.value = true
  document.body.style.overflow = 'hidden'
}

const closeReviewModal = () => {
  isReviewModalOpen.value = false
  document.body.style.overflow = 'auto'
}

const closeModalAndGoToReviews = () => {
  isReviewModalOpen.value = false
  document.body.style.overflow = 'auto'
  showBranchList.value = true
  
  nextTick(() => {
    if (widgetContentRef.value) {
      widgetContentRef.value.scrollTo({ top: 0, behavior: 'smooth' })
    }
  })
}

const openSignalNew = () => {
  window.location.href = '/signal/new'
}

const handleSwitcherScroll = () => {
  if (!switchersRef.value) return
  
  const container = switchersRef.value
  const scrollLeft = container.scrollLeft
  const scrollWidth = container.scrollWidth
  const clientWidth = container.clientWidth
  
  showLeftGradient.value = scrollLeft > 5
  showRightGradient.value = scrollLeft < (scrollWidth - clientWidth - 5)
}

const checkMobile = () => {
  isMobile.value = window.innerWidth <= 768
}

const rotatingQuestions = [
  "\"Что почувствовали в эту минуту?\"",
  "\"Что вызвало улыбку или напряжение?\"",
  "\"Какой момент хотелось бы изменить?\"",
  "\"Что дало ощущение уюта/суеты?\"",
  "\"Одно слово, которое осталось после визита?\""
]
const currentQuestionIndex = ref(0)
const showText = ref(true)
let intervalId = null
let metricsIntervalId = null

const cycleText = () => {
  showText.value = false
  setTimeout(() => {
    currentQuestionIndex.value = (currentQuestionIndex.value + 1) % rotatingQuestions.length
    showText.value = true
  }, 1000)
}

const showInfoModal = ref(false)
const showGrowthModal = ref(false)

const onKeydown = (e) => {
  if (e.key === 'Escape') {
    if (isReviewModalOpen.value) {
      closeReviewModal()
    } else {
      showInfoModal.value = false
      showGrowthModal.value = false
    }
  }
}

const openGrowthModal = () => {
  showGrowthModal.value = true
}

const openInvestLink = () => {
  window.open('/invest/smr', '_blank')
}

watch(selectedCafe, (newName) => {
  const newConfig = getCafeConfig(newName)
  systemMetrics.value.responseTime = newConfig.responseTime.base
  systemMetrics.value.resolutionTime = newConfig.resolutionTime.base
  systemMetrics.value.lastUpdate = Date.now()
  fetchSystemStatus()
})

onMounted(() => {
  intervalId = setInterval(cycleText, 7000)
  metricsIntervalId = setInterval(fetchSystemStatus, 45000)
  fetchSystemStatus()
  window.addEventListener('keydown', onKeydown)
  window.addEventListener('resize', checkMobile)
  checkMobile()
  
  nextTick(() => {
    handleSwitcherScroll()
  })
})

onUnmounted(() => {
  clearInterval(intervalId)
  clearInterval(metricsIntervalId)
  window.removeEventListener('keydown', onKeydown)
  window.removeEventListener('resize', checkMobile)
})

watch(showBranchList, (newValue) => {
  if (newValue) {
    nextTick(() => {
      if (widgetContentRef.value) {
        widgetContentRef.value.scrollTo({ top: 0, behavior: 'smooth' })
      }
    })
  }
})
</script>

<template>
  <div class="signal2-widget-content" ref="widgetContentRef">
    <div class="signal2-cafe-switchers-container">
      <div 
        class="signal2-cafe-switchers" 
        ref="switchersRef"
        @scroll="handleSwitcherScroll"
      >
        <button
          class="signal2-switcher"
          :class="{ active: selectedCafe === 'Корж' }"
          @click="selectedCafe = 'Корж'"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="signal2-switcher-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/>
          </svg>
          Корж
        </button>
        <button
          class="signal2-switcher"
          :class="{ active: selectedCafe === 'MOSAIC' }"
          @click="selectedCafe = 'MOSAIC'"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="signal2-switcher-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.513 4.856 13.12 2.17a.5.5 0 0 1 .86.46l-1.377 4.317"/><path d="M15.656 10H20a1 1 0 0 1 .78 1.63l-1.72 1.773"/><path d="M16.273 16.273 10.88 21.83a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14H4a1 1 0 0 1-.78-1.63l4.507-4.643"/><path d="m2 2 20 20"/></svg>
          MOSAIC
        </button>
        <button
          class="signal2-switcher"
          :class="{ active: selectedCafe === 'Surf' }"
          @click="selectedCafe = 'Surf'"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="signal2-switcher-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.513 4.856 13.12 2.17a.5.5 0 0 1 .86.46l-1.377 4.317"/><path d="M15.656 10H20a1 1 0 0 1 .78 1.63l-1.72 1.773"/><path d="M16.273 16.273 10.88 21.83a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14H4a1 1 0 0 1-.78-1.63l4.507-4.643"/><path d="m2 2 20 20"/></svg>
          Surf
        </button>
        <button
          class="signal2-switcher"
          :class="{ active: selectedCafe === 'Skuratov' }"
          @click="selectedCafe = 'Skuratov'"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="signal2-switcher-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.513 4.856 13.12 2.17a.5.5 0 0 1 .86.46l-1.377 4.317"/><path d="M15.656 10H20a1 1 0 0 1 .78 1.63l-1.72 1.773"/><path d="M16.273 16.273 10.88 21.83a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14H4a1 1 0 0 1-.78-1.63l4.507-4.643"/><path d="m2 2 20 20"/></svg>
          Skuratov
        </button>
        <button
          class="signal2-switcher"
          :class="{ active: selectedCafe === 'Белотурка' }"
          @click="selectedCafe = 'Белотурка'"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="signal2-switcher-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.513 4.856 13.12 2.17a.5.5 0 0 1 .86.46l-1.377 4.317"/><path d="M15.656 10H20a1 1 0 0 1 .78 1.63l-1.72 1.773"/><path d="M16.273 16.273 10.88 21.83a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14H4a1 1 0 0 1-.78-1.63l4.507-4.643"/><path d="m2 2 20 20"/></svg>
          Белотурка
        </button>
        <button
          class="signal2-switcher"
          :class="{ active: selectedCafe === 'Кэрри' }"
          @click="selectedCafe = 'Кэрри'"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="signal2-switcher-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.513 4.856 13.12 2.17a.5.5 0 0 1 .86.46l-1.377 4.317"/><path d="M15.656 10H20a1 1 0 0 1 .78 1.63l-1.72 1.773"/><path d="M16.273 16.273 10.88 21.83a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14H4a1 1 0 0 1-.78-1.63l4.507-4.643"/><path d="m2 2 20 20"/></svg>
          Кэрри
        </button>
      </div>
      
      <div 
        class="signal2-switchers-gradient signal2-switchers-gradient-left"
        :class="{ 'signal2-gradient-visible': showLeftGradient }"
      ></div>
      <div 
        class="signal2-switchers-gradient signal2-switchers-gradient-right"
        :class="{ 'signal2-gradient-visible': showRightGradient }"
      ></div>
    </div>

    <div v-if="establishment">
      <div v-if="!showBranchList">
        <div class="signal2-main-card">
          <div class="signal2-establishment-header">
            <h3 class="signal2-cafe-name">{{ establishment.name }}</h3>
            <div 
              v-if="establishment.status" 
              class="signal2-status-badge"
              ref="badgeRef"
            >
              {{ establishment.status }}
            </div>
          </div>

          <div class="signal2-stats-grid">
            <div class="signal2-stat-card signal2-branches-card signal2-graphite">
              <div class="signal2-stat-content">
                <div class="signal2-stat-left-group">
                  <div class="signal2-stat-icon">💬</div>
                  <div class="signal2-stat-value">{{ establishment.branches.length }}</div>
                </div>
                <div class="signal2-stat-label">Яндекс/2ГИС</div>
              </div>
            </div>

            <div class="signal2-stat-card signal2-index-card signal2-yelloworange" @click="openGrowthModal">
              <div class="signal2-stat-content">
                <div class="signal2-stat-left-group">
                  <div class="signal2-stat-icon">📡</div>
                  <div class="signal2-stat-value">{{ establishment.index }}</div>
                </div>
                <div class="signal2-stat-label">Умные Отзывы</div>
              </div>
            </div>

            <div class="signal2-stat-card signal2-reviews-card signal2-lime" @click="isMobile ? (showInfoModal = true) : null">
              <div class="signal2-stat-content">
                <div class="signal2-stat-left-group">
                  <div class="signal2-stat-icon">⚡</div>
                  <div class="signal2-stat-value">{{ establishment.totalReviews }}</div>
                </div>
                <div class="signal2-stat-label">Сигналы</div>
              </div>
            </div>
          </div>

          <div class="signal2-system-status-bar">
            <span v-if="establishment.isConnected" class="signal2-status-label">🟢 На связи:</span>
            <span v-else class="signal2-status-label-disconnected">🔴 Не подключен к Сигналу</span>
            
            <div v-if="establishment.isConnected" class="signal2-status-metrics">
              <div class="signal2-status-metric">
                <span class="signal2-metric-time">{{ formatTime(systemMetrics.responseTime) }}</span>
                <span class="signal2-metric-text">→ ответ</span>
              </div>
              <div class="signal2-status-separator">•</div>
              <div class="signal2-status-metric">
                <span class="signal2-metric-time">{{ formatTime(systemMetrics.resolutionTime) }}</span>
                <span class="signal2-metric-text">→ решение</span>
              </div>
            </div>
          </div>

          <div class="signal2-control-panel">
            <div class="signal2-control-panel-header">
              <button
                v-if="!isMobile"
                type="button"
                class="signal2-info-link signal2-info-button"
                aria-haspopup="dialog"
                aria-controls="signal2-signal-dialog"
                :aria-expanded="showInfoModal ? 'true' : 'false'"
                @click="showInfoModal = true"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 16v-4" />
                  <path d="M12 8h.01" />
                </svg>
              </button>
              <span v-if="!isMobile" class="signal2-static-prompt">Поделитесь:</span>
              <div class="signal2-rotating-text-container" :class="{ 'signal2-full-width': isMobile }">
                <span :class="['signal2-rotating-text', { 'signal2-show': showText }]">{{ rotatingQuestions[currentQuestionIndex] }}</span>
              </div>
            </div>

            <div class="signal2-button-container">
              <button @click="showBranchList = true" class="signal2-action-button signal2-ticket-button">
                Отправить Яндекс/ГИС
                <div class="signal2-button-icon-container">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-pinned-icon lucide-map-pinned"><path d="M18 8c0 3.613-3.869 7.429-5.393 8.795a1 1 0 0 1-1.214 0C9.87 15.429 6 11.613 6 8a6 6 0 0 1 12 0"/><circle cx="12" cy="8" r="2"/><path d="M8.714 14h-3.71a1 1 0 0 0-.948.683l-2.004 6A1 1 0 0 0 3 22h18a1 1 0 0 0 .948-1.316l-2-6a1 1 0 0 0-.949-.684h-3.712"/></svg>
                </div>
              </button>
              
              <button @click="openReviewModal" class="signal2-action-button signal2-review-button">
                Отправить Умный Отзыв
                <div class="signal2-button-icon-container signal2-golden-icon-container">
                  <svg class="signal2-button-icon signal2-white-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#422006" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </div>
              </button>
            </div>

            <div v-if="establishment.isConnected" class="signal2-signal-section">
              <div class="signal2-signal-description">
                Просто скажите, что не так и мы поможем решить любую проблему за 24 часа.
              </div>
              
              <div class="signal2-mystery-button-container">
                <button @click="openSignalNew" class="signal2-mystery-button signal2-lime-button">
                  <span class="signal2-mystery-glow"></span>
                  <span class="signal2-mystery-text">Отправить ⚡ Сигнал</span>
                </button>
              </div>
              
              <div class="signal2-signal-link">
                <a href="/signals" target="_blank" class="signal2-how-it-works-link signal2-no-vitepress-style">Как Работает</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-else>
        <div class="signal2-branches-header">
          <button @click="showBranchList = false" class="signal2-internal-close-btn signal2-back-btn" aria-label="Вернуться назад">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M19 12H5" />
              <path d="m12 19-7-7 7-7" />
            </svg>
          </button>
          <div class="signal2-branches-title-text">{{ establishment.name }}</div>
          <div style="width: 44px;"></div>
        </div>
        <div class="signal2-branches-content">
          <p class="signal2-branches-subtitle">💡 Вы будете автоматически перенаправлены на 2ГИС или Яндекс.Карты</p>
          <div class="signal2-branches-list">
            <button v-for="(branch, index) in establishment.branches" :key="index" @click="goToReviews(branch)" class="signal2-branch-item">
              <div class="signal2-branch-info">
                <div class="signal2-branch-number">{{ index + 1 }}</div>
                <div class="signal2-branch-address">{{ branch.address }}</div>
              </div>
              <div class="signal2-branch-action">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div 
      v-if="isReviewModalOpen" 
      class="signal2-review-modal-overlay"
      @click="closeReviewModal"
    >
      <div 
        class="signal2-review-modal-content"
        @click.stop
      >
        <div class="signal2-modal-scrollable-content">
          <SignalT9Configurator />
        </div>
        
        <div class="signal2-modal-close-section">
          <button 
            @click="closeModalAndGoToReviews" 
            class="signal2-modal-close-button"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="m9 18 6-6-6-6" />
            </svg>
            Перейти к выбору локаций
          </button>
        </div>
      </div>
    </div>
    
    <div v-if="showInfoModal" class="signal2-modal-overlay" @click.self="showInfoModal = false">
      <div class="signal2-modal" role="dialog" aria-modal="true" id="signal2-signal-dialog" aria-label="Ваши отзывы меняют всё">
        <div class="signal2-modal-header">
          <div class="signal2-modal-title">Ваши отзывы меняют всё.</div>
        </div>
        <div class="signal2-modal-body">
          Каждый отзыв делает любимую кофейню еще лучше, а Сигнал помогает решить Вашу проблему за 24 часа. Почувствуйте силу настоящих перемен.
          <br /><br />
          <a href="https://cffx.ru/signals.html" target="_blank" class="signal2-modal-link signal2-no-vitepress-style">Как Работает Сигнал</a>
        </div>
        <div class="signal2-modal-footer">
          <button class="signal2-modal-ok" type="button" @click="showInfoModal = false">Понятно</button>
        </div>
      </div>
    </div>

    <div v-if="showGrowthModal" class="signal2-modal-overlay" @click.self="showGrowthModal = false">
      <div class="signal2-modal" role="dialog" aria-modal="true" aria-label="Индекс Роста">
        <div class="signal2-modal-header">
          <div class="signal2-modal-title">Индекс Роста</div>
        </div>
        <div class="signal2-modal-body">
          Все забыли, что такое настоящий рост.<br>
          Они измеряют рейтинг на 2ГИС и Яндекс.<br>
          Мы находим в отзывах гостей то, что не видят другие.<br><br>
          Наш Индекс показывает не размер бизнеса сегодня, а возможности, которые он может реализовать завтра.<br><br>
          <span @click="openInvestLink" class="signal2-modal-link">Индекс Роста Самары</span>
        </div>
        <div class="signal2-modal-footer">
          <button class="signal2-modal-ok" type="button" @click="showGrowthModal = false">Понятно</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.signal2-widget-content {
  padding: 32px 0;
}

.signal2-cafe-switchers-container {
  position: relative;
  margin-bottom: 32px;
}

.signal2-cafe-switchers {
  display: flex;
  gap: 12px;
  padding-bottom: 12px;
  flex-wrap: nowrap;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: thin;
  scrollbar-color: rgba(70, 70, 70, 0.8) transparent;
}

.signal2-cafe-switchers::-webkit-scrollbar {
  height: 2px;
}

.signal2-cafe-switchers::-webkit-scrollbar-track {
  background: transparent;
}

.signal2-cafe-switchers::-webkit-scrollbar-thumb {
  background-color: rgba(70, 70, 70, 0.8);
  border-radius: 10px;
}

.signal2-cafe-switchers::-webkit-scrollbar-thumb:hover {
  background-color: rgba(85, 85, 85, 0.9);
}

.signal2-switcher {
  border-radius: 50px;
  padding: 12px 20px;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  border: none;
  transition: all 0.3s ease;
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: fit-content;
  position: relative;
  overflow: hidden;
  background: rgba(70, 70, 70, 0.6);
  color: rgba(255, 255, 255, 0.9);
}

.signal2-switcher::before {
  content: '';
  position: absolute;
  left: -200%;
  top: 0;
  width: 200%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent 0%,
    transparent 30%,
    rgba(255, 255, 255, 0.08) 40%,
    rgba(255, 255, 255, 0.15) 50%,
    rgba(255, 255, 255, 0.08) 60%,
    transparent 70%,
    transparent 100%
  );
  transition: all 1.2s ease;
}

.signal2-switcher:hover::before {
  left: 100%;
}

@media (max-width: 768px) {
  .signal2-switcher::before {
    display: none;
  }
  
  .signal2-switcher:hover::before {
    display: none;
  }
}

.signal2-switcher.active {
  background: rgba(255, 255, 255, 0.95);
  color: #333;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.signal2-switcher.active::before {
  display: none;
}

.signal2-switcher-icon {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.signal2-switchers-gradient {
  position: absolute;
  top: 0;
  bottom: 12px;
  width: 60px;
  pointer-events: none;
  z-index: 2;
  opacity: 0;
  transition: opacity 0.6s ease;
}

.signal2-switchers-gradient.signal2-gradient-visible {
  opacity: 1;
}

.signal2-switchers-gradient-left {
  left: 0;
  background: linear-gradient(
    to right,
    #1b1b1f 0%,
    #1b1b1f 20%,
    rgba(27, 27, 31, 0.95) 40%,
    rgba(27, 27, 31, 0.8) 60%,
    rgba(27, 27, 31, 0.5) 80%,
    transparent 100%
  );
}

.signal2-switchers-gradient-right {
  right: 0;
  background: linear-gradient(
    to left,
    #1b1b1f 0%,
    #1b1b1f 20%,
    rgba(27, 27, 31, 0.95) 40%,
    rgba(27, 27, 31, 0.8) 60%,
    rgba(27, 27, 31, 0.5) 80%,
    transparent 100%
  );
}

:deep(.signal2-no-vitepress-style) {
  text-decoration: underline !important;
  text-decoration-color: rgba(255, 255, 255, 0.3) !important;
  border-bottom: none !important;
  background: none !important;
}

:deep(.signal2-no-vitepress-style:hover) {
  text-decoration: underline !important;
  text-decoration-color: rgba(255, 255, 255, 0.6) !important;
  border-bottom: none !important;
  background: none !important;
}

:deep(.signal2-no-vitepress-style:visited),
:deep(.signal2-no-vitepress-style:focus),
:deep(.signal2-no-vitepress-style:active) {
  text-decoration: underline !important;
  text-decoration-color: rgba(255, 255, 255, 0.3) !important;
  border-bottom: none !important;
  background: none !important;
}

:deep(.signal2-modal-link.signal2-no-vitepress-style) {
  text-decoration: underline !important;
  text-decoration-color: #a3e635 !important;
  border-bottom: none !important;
  background: none !important;
}

:deep(.signal2-modal-link.signal2-no-vitepress-style:hover) {
  text-decoration: underline !important;
  text-decoration-color: #c5f946 !important;
  border-bottom: none !important;
  background: none !important;
}

.signal2-review-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 8px;
  box-sizing: border-box;
}

.signal2-review-modal-content {
  background: #1e1e20;
  border-radius: 16px;
  width: 650px;
  height: clamp(85vh, 90vh, 85vh);
  max-width: 95vw;
  max-height: clamp(85vh, 90vh, 85vh);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
  box-sizing: border-box;
  color: white;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.signal2-modal-scrollable-content {
  flex: 1;
  overflow-y: auto;
  padding: 20px 16px 16px 16px;
}

:deep(h1), :deep(h2), :deep(h3), :deep(h4), :deep(p), :deep(span), :deep(label),
:deep(.title), :deep(.subtitle), :deep(.description), :deep(.example-text), :deep(.hint-text) {
  text-align: initial !important;
  padding-left: 0 !important;
  padding-right: 0 !important;
}

:deep(.container), :deep(.content) {
  padding-left: 0 !important;
  padding-right: 0 !important;
  margin-left: 0 !important;
  margin-right: 0 !important;
}

:deep(.form-section), :deep(.form-group), :deep(.section-wrapper) {
  margin-bottom: clamp(10px, 2vw, 10px) !important;
}

:deep(.card), :deep(.block), :deep(.content-block) {
  margin-bottom: clamp(8px, 1.6vw, 8px) !important;
}

.signal2-modal-close-section {
  flex-shrink: 0;
  padding: 20px 16px 24px 16px;
  background: #1e1e20;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: center;
}

.signal2-modal-close-button {
  background: linear-gradient(135deg, #f59e0b, #fcd34d);
  color: #422006;
  border: none;
  border-radius: 12px;
  padding: 14px 24px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 200px;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(245, 158, 11, 0.3);
}

.signal2-modal-close-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(245, 158, 11, 0.4);
}

.signal2-modal-close-button svg {
  transition: transform 0.3s ease;
}

.signal2-modal-close-button:hover svg {
  transform: translateX(2px);
}

.signal2-branches-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 20px;
  border-bottom: 2px solid var(--vp-c-border);
}

.signal2-branches-title-text {
  margin: 0;
  color: white;
  font-size: 26px;
  font-weight: 700;
  line-height: 1.2;
  text-align: center;
  flex-grow: 1;
}

.signal2-internal-close-btn {
  background: var(--vp-c-bg-mute);
  border: 2px solid var(--vp-c-border);
  border-radius: 50%;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--vp-c-text-2);
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.signal2-back-btn:hover {
  background: var(--vp-c-bg-soft);
  border-color: var(--vp-c-text-2);
  color: white;
}

.signal2-main-card {
  background: var(--vp-c-bg-soft);
  border-radius: 20px;
  padding: 24px;
}

.signal2-establishment-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.signal2-cafe-name {
  margin: 0;
  color: #ffffff;
  font-size: 24px;
  font-weight: 600;
}

.signal2-status-badge {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(0, 0, 0, 0.1));
  color: rgba(255, 255, 255, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 700;
  white-space: nowrap;
  box-shadow: inset 0 1px 2px rgba(255, 255, 255, 0.1), 0 2px 4px rgba(0, 0, 0, 0.3);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  position: relative;
}

@keyframes signal2-tooltip-fade-in {
  from {
    opacity: 0;
    transform: translateY(-4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.signal2-stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 16px;
}

.signal2-stat-card {
  position: relative;
  border-radius: 22px;
  transition: transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
  overflow: hidden;
  background: var(--vp-c-bg-soft);
}

.signal2-stat-card:hover {
  transform: translateY(-8px);
}

.signal2-clickable-card {
  cursor: pointer;
}

.signal2-stat-card::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 22px;
  padding: 2px;
  background: var(--signal2-border-gradient);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  transition: filter 0.4s ease;
  z-index: 3;
}

.signal2-stat-card:hover::before {
  filter: brightness(2) saturate(1.5);
}

.signal2-stat-card.signal2-graphite {
  --signal2-border-gradient: linear-gradient(135deg, #4a5568, #718096, #a0aec0);
  --signal2-glow-color: rgba(113, 128, 150, 0.25);
  --signal2-glow-hover-color: rgba(113, 128, 150, 0.6);
}

.signal2-stat-card.signal2-yelloworange {
  --signal2-border-gradient: linear-gradient(135deg, #b45309, #f59e0b, #fcd34d);
  --signal2-glow-color: rgba(245, 158, 11, 0.25);
  --signal2-glow-hover-color: rgba(245, 158, 11, 0.6);
}

.signal2-stat-card.signal2-lime {
  --signal2-border-gradient: linear-gradient(135deg, #4d7c0f, #a3e635, #c5f946);
  --signal2-glow-color: rgba(197, 249, 70, 0.25);
  --signal2-glow-hover-color: rgba(197, 249, 70, 0.6);
}

.signal2-stat-content {
  background: radial-gradient(circle at 50% 0%, var(--signal2-glow-color) 0%, transparent 70%);
  border-radius: 20px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  text-align: center;
  box-shadow: 0 10px 25px -10px rgba(0, 0, 0, 0.3);
  transition: all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
  position: relative;
  z-index: 2;
}

.signal2-stat-card:hover .signal2-stat-content {
  background: radial-gradient(circle at 50% 0%, var(--signal2-glow-hover-color) 0%, transparent 70%);
  box-shadow: 0 25px 50px -10px rgba(0, 0, 0, 0.4);
}

.signal2-stat-icon,
.signal2-stat-value,
.signal2-stat-label {
  transition: transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
}

.signal2-stat-icon {
  font-size: 28px;
  opacity: 0.8;
  height: 32px;
}

.signal2-stat-card:hover .signal2-stat-icon {
  transform: scale(1.2);
}

.signal2-stat-value {
  font-family: 'Inter', sans-serif;
  font-size: 3.2rem;
  font-weight: 600;
  line-height: 1;
  color: #fff;
  margin: 12px 0;
  text-shadow: 0 0 20px rgba(0, 0, 0, 0.7), 0 0 10px rgba(0, 0, 0, 0.7);
}

.signal2-stat-card:hover .signal2-stat-value {
  transform: scale(1.15);
  text-shadow: 0 0 30px rgba(0, 0, 0, 0.8), 0 0 15px rgba(0, 0, 0, 0.8);
}

.signal2-stat-label {
  font-size: 11px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.7);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.signal2-stat-card:hover .signal2-stat-label {
  transform: scale(1.05);
}

.signal2-system-status-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin: 20px 0 16px 0;
  padding: 8px 12px;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.06);
}

.signal2-status-label {
  font-size: 14px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.7);
  margin-right: 6px;
  flex-shrink: 0;
}

.signal2-status-label-disconnected {
  font-size: 14px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.7);
  flex-shrink: 0;
}

.signal2-status-metrics {
  display: flex;
  align-items: center;
  gap: 8px;
}

.signal2-status-metric {
  display: flex;
  align-items: baseline;
  gap: 4px;
}

.signal2-metric-time {
  font-size: 14px;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.9);
  font-family: 'SF Mono', 'Monaco', 'Inconsolata', monospace;
  min-width: 32px;
  text-align: right;
  transition: all 0.3s ease;
}

.signal2-metric-text {
  font-size: 14px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.6);
}

.signal2-status-separator {
  color: rgba(255, 255, 255, 0.3);
  font-size: 14px;
  margin: 0 4px;
}

.signal2-control-panel {
  margin-top: 24px;
}

.signal2-control-panel-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
  padding: 0 8px;
  font-size: 14px;
  font-weight: 600;
}

.signal2-info-link {
  color: rgba(255, 255, 255, 0.5);
  display: flex;
  align-items: center;
  transition: color 0.3s ease;
  flex-shrink: 0;
}

.signal2-info-link:hover,
.signal2-info-link:focus {
  color: white;
}

.signal2-info-button {
  background: transparent;
  border: none;
  cursor: pointer;
}

.signal2-static-prompt {
  color: white;
  margin-right: 8px;
  flex-shrink: 0;
}

.signal2-rotating-text-container {
  flex-grow: 1;
  text-align: left;
  color: rgba(255, 255, 255, 0.7);
  min-height: 36px;
  display: flex;
  align-items: center;
}

.signal2-rotating-text-container.signal2-full-width {
  text-align: center;
  justify-content: center;
}

.signal2-rotating-text {
  transition: opacity 0.5s ease-in-out;
  line-height: 1.2;
}

.signal2-rotating-text:not(.signal2-show) {
  opacity: 0;
}

.signal2-button-container {
  display: flex;
  gap: 6px;
  background-color: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 20px;
  padding: 6px;
}

.signal2-action-button {
  flex: 1;
  padding: 14px 20px;
  border-radius: 16px;
  border: none;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.signal2-ticket-button {
  background: rgba(70, 70, 70, 0.8);
  color: rgba(255, 255, 255, 0.9);
}

.signal2-ticket-button:hover {
  background: rgba(85, 85, 85, 0.9);
  color: white;
  transform: translateY(-2px);
}

.signal2-review-button {
  background: linear-gradient(135deg, #f59e0b, #fcd34d);
  color: #422006;
  box-shadow: 0 4px 12px rgba(245, 158, 11, 0.3);
}

.signal2-review-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(245, 158, 11, 0.4);
}

.signal2-button-icon-container {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(50, 50, 50, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.3s ease;
}

.signal2-golden-icon-container {
  background: rgba(154, 91, 24, 0.7) !important;
}

.signal2-button-icon {
  transition: transform 0.3s ease;
  color: currentColor;
}

.signal2-review-button:hover .signal2-button-icon {
  transform: translateX(2px);
}

.signal2-ticket-button:hover .signal2-button-icon-container {
  background: rgba(35, 35, 35, 1);
  transform: scale(1.05);
}

.signal2-review-button:hover .signal2-golden-icon-container {
  background: rgba(205, 122, 32, 0.8) !important;
  transform: scale(1.05);
}

.signal2-signal-section {
  margin-top: 32px;
  padding: 20px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  text-align: center;
}

.signal2-signal-description {
  color: rgba(255, 255, 255, 0.8);
  font-size: 14px;
  font-weight: 500;
  line-height: 1.4;
  margin-bottom: 16px;
  max-width: 300px;
  margin-left: auto;
  margin-right: auto;
}

.signal2-mystery-button-container {
  margin-top: 12px;
  display: flex;
  justify-content: center;
}

.signal2-mystery-button {
  position: relative;
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(139, 92, 246, 0.05));
  border: 1px solid rgba(139, 92, 246, 0.2);
  color: rgba(139, 92, 246, 0.9);
  padding: 10px 20px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  overflow: hidden;
  backdrop-filter: blur(8px);
  text-shadow: 0 0 8px rgba(139, 92, 246, 0.3);
}

.signal2-mystery-button:hover {
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(139, 92, 246, 0.1));
  border-color: rgba(139, 92, 246, 0.4);
  color: rgba(139, 92, 246, 1);
  transform: translateY(-1px);
  box-shadow: 0 8px 20px rgba(139, 92, 246, 0.15);
  text-shadow: 0 0 12px rgba(139, 92, 246, 0.5);
}

.signal2-lime-button {
  background: linear-gradient(135deg, rgba(197, 249, 70, 0.1), rgba(163, 230, 53, 0.05)) !important;
  border: 1px solid rgba(197, 249, 70, 0.2) !important;
  color: rgba(197, 249, 70, 0.9) !important;
  text-shadow: 0 0 8px rgba(197, 249, 70, 0.3) !important;
}

.signal2-lime-button:hover {
  background: linear-gradient(135deg, rgba(197, 249, 70, 0.2), rgba(163, 230, 53, 0.1)) !important;
  border-color: rgba(197, 249, 70, 0.4) !important;
  color: rgba(197, 249, 70, 1) !important;
  text-shadow: 0 0 12px rgba(197, 249, 70, 0.5) !important;
  box-shadow: 0 8px 20px rgba(197, 249, 70, 0.15) !important;
}

.signal2-mystery-glow {
  position: absolute;
  top: -50%;
  left: -50%;
  right: -50%;
  bottom: -50%;
  background: radial-gradient(
    circle,
    rgba(139, 92, 246, 0.1) 0%,
    transparent 70%
  );
  opacity: 0;
  transition: opacity 0.4s ease;
  pointer-events: none;
}

.signal2-lime-button .signal2-mystery-glow {
  background: radial-gradient(
    circle,
    rgba(197, 249, 70, 0.1) 0%,
    transparent 70%
  ) !important;
}

.signal2-mystery-button:hover .signal2-mystery-glow {
  opacity: 1;
  animation: signal2-mystery-pulse 2s infinite;
}

.signal2-mystery-text {
  position: relative;
  z-index: 2;
}

@keyframes signal2-mystery-pulse {
  0%, 100% { 
    transform: scale(1);
    opacity: 0.3;
  }
  50% { 
    transform: scale(1.1);
    opacity: 0.6;
  }
}

.signal2-signal-link {
  margin-top: 12px;
}

.signal2-how-it-works-link {
  color: rgba(255, 255, 255, 0.5);
  text-decoration: underline;
  text-decoration-color: rgba(255, 255, 255, 0.3);
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.signal2-how-it-works-link:hover {
  color: rgba(255, 255, 255, 0.8);
  text-decoration: underline;
  text-decoration-color: rgba(255, 255, 255, 0.6);
}

.signal2-branches-content {
  flex-grow: 1;
}

.signal2-branches-subtitle {
  margin: 0 0 16px 0;
  font-size: 16px;
  color: var(--vp-c-text-2);
}

.signal2-branches-list {
  padding: 0;
}

.signal2-branch-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 18px;
  margin-bottom: 12px;
  background: var(--vp-c-bg-soft);
  border: 2px solid var(--vp-c-border);
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: left;
}

.signal2-branch-item:hover {
  background: linear-gradient(135deg, rgba(245, 158, 11, 0.1), var(--vp-c-bg-soft));
  border-color: #f59e0b;
  box-shadow: 0 8px 20px rgba(245, 158, 11, 0.1);
  transform: translateX(4px);
}

.signal2-branch-info {
  display: flex;
  align-items: center;
  gap: 16px;
  flex: 1;
  overflow: hidden;
}

.signal2-branch-number {
  background: linear-gradient(135deg, #f59e0b, #fcd34d);
  color: #422006;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 700;
  flex-shrink: 0;
  transition: all 0.3s ease;
  box-shadow: none;
}

.signal2-branch-item:hover .signal2-branch-number {
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.2),
    inset 0 0 10px rgba(245, 158, 11, 0.5);
}

.signal2-branch-address {
  font-weight: 600;
  font-size: 16px;
  color: var(--vp-c-text-1);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.signal2-branch-action {
  color: #f59e0b;
  transition: transform 0.3s ease;
  margin-left: 12px;
}

.signal2-branch-item:hover .signal2-branch-action {
  transform: translateX(4px);
}

.signal2-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.signal2-modal {
  background: var(--vp-c-bg, #111);
  color: var(--vp-c-text-1, #fff);
  border: 1px solid var(--vp-c-border, rgba(255, 255, 255, 0.12));
  border-radius: 12px;
  width: min(520px, 96vw);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
  padding: 32px;
}

.signal2-modal-header {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 12px;
}

.signal2-modal-title {
  font-weight: 700;
  font-size: 16px;
}

.signal2-modal-body {
  margin-top: 16px;
  font-size: 14px;
  color: var(--vp-c-text-1);
  line-height: 1.5;
}

.signal2-modal-link {
  color: #a3e635;
  text-decoration: underline;
  text-decoration-color: #a3e635 !important;
  font-weight: 600;
  transition: all 0.3s ease;
  cursor: pointer;
}

.signal2-modal-link:hover {
  color: #c5f946;
  text-decoration: underline;
  text-decoration-color: #c5f946 !important;
}

.signal2-modal-footer {
  margin-top: 24px;
  display: flex;
  justify-content: flex-end;
}

.signal2-modal-ok {
  background: var(--vp-c-bg-mute, #222);
  border: 1px solid var(--vp-c-border);
  color: var(--vp-c-text-1);
  border-radius: 8px;
  padding: 10px 16px;
  cursor: pointer;
  font-weight: 500;
}

.signal2-modal-ok:hover {
  background: var(--vp-c-bg-soft, #333);
}

@media (max-width: 768px) {
  .signal2-widget-content {
    padding: 24px 0;
  }
  .signal2-main-card {
    padding: 16px;
  }
  .signal2-stats-grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }
  .signal2-stat-card {
    display: flex;
    flex-direction: row;
    align-items: center;
    border-radius: 16px;
    transition: none;
    cursor: pointer;
  }
  .signal2-stat-card:hover {
    transform: none;
  }
  .signal2-stat-content {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 12px 16px;
    width: 100%;
    background: none !important;
    box-shadow: none !important;
  }
  .signal2-stat-left-group {
    display: flex;
    align-items: center;
    gap: 16px;
  }
  .signal2-stat-icon {
    font-size: 28px;
    line-height: 1;
    display: flex;
    align-items: center;
  }
  .signal2-stat-value {
    font-size: 2rem;
    font-weight: 600;
    margin: 0;
  }
  .signal2-stat-label {
    font-size: 16px;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.9);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  .signal2-button-container {
    flex-direction: column;
    gap: 8px;
  }
  .signal2-action-button:hover {
    transform: none;
  }
  
  .signal2-system-status-bar {
    flex-direction: column;
    align-items: center;
    padding: 8px 12px;
    gap: 4px;
    margin: 16px 0 12px 0;
  }
  
  .signal2-status-label,
  .signal2-status-label-disconnected {
    font-size: 14px;
    font-weight: 600;
    margin-right: 0;
  }
  
  .signal2-status-metrics {
    gap: 12px;
    justify-content: center;
  }
  
  .signal2-metric-time,
  .signal2-metric-text {
    font-size: 14px;
  }
  
  .signal2-button-icon-container {
    width: 28px;
    height: 28px;
  }
  
  .signal2-mystery-button {
    font-size: clamp(15.6px, 3vw, 12px);
    padding: clamp(10.4px, 1.95vw, 8px) clamp(19.5px, 3.75vw, 15px);
  }
  
  .signal2-how-it-works-link {
    font-size: 14px;
  }

  .signal2-action-button {
    justify-content: center;
  }

  .signal2-button-icon-container {
    margin-left: 0 !important;
  }
  
  .signal2-review-modal-overlay {
    padding: 4px;
  }

  .signal2-review-modal-content {
      width: 95vw;
      height: clamp(85vh, 90vh, 85vh);
      max-width: 95vw;
      max-height: clamp(85vh, 90vh, 85vh);
  }

  .signal2-modal-scrollable-content {
    padding: 20px 12px 12px 12px;
  }

  .signal2-modal-close-button {
    width: 100%;
    justify-content: center;
    font-size: 14px;
    padding: 12px 20px;
  }

  .signal2-modal-close-section {
    padding: 12px;
  }
}

@media (max-width: 700px) {
  .signal2-review-modal-content {
    width: 95vw;
    height: 85vh;
  }

  .signal2-modal-scrollable-content {
    padding: 20px 12px 12px 12px;
  }
}

@media (max-width: 480px) {
  .signal2-widget-content {
    padding: 20px 0;
  }
  .signal2-branches-title-text {
    font-size: 22px;
    text-align: center;
  }
  .signal2-branches-subtitle {
    font-size: 14px;
  }
  .signal2-cafe-name {
    font-size: 20px;
  }
  .signal2-status-badge {
    padding: 4px 12px;
    font-size: 10px;
  }
  .signal2-status-metrics {
    gap: 8px;
  }
  .signal2-metric-time {
    font-size: 13px;
    min-width: 28px;
  }
  .signal2-metric-text {
    font-size: 13px;
  }
  .signal2-modal {
    padding: 24px;
  }
  .signal2-modal-body {
    margin-top: 12px;
  }
  .signal2-modal-footer {
    margin-top: 20px;
  }

  .signal2-mystery-button {
    font-size: clamp(14.3px, 3vw, 11px);
    padding: clamp(9.1px, 1.82vw, 7px) clamp(18.2px, 3.64vw, 14px);
  }

  .signal2-how-it-works-link {
    font-size: 14px;
  }

  .signal2-review-modal-content {
    height: 85vh;
  }

  .signal2-modal-scrollable-content {
    padding: 16px 10px 10px 10px;
  }
}

@media screen and (max-height: 700px) {
  .signal2-review-modal-content {
    height: 80vh !important;
    max-height: 80vh !important;
  }
}

@media screen and (max-height: 600px) {
  .signal2-review-modal-content {
    height: 75vh !important;
    max-height: 75vh !important;
  }
}
</style>
