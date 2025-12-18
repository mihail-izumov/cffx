<template>
  <div>
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
      rel="stylesheet"
    />

    <!-- СКРЫТЫЙ ШАБЛОН (1080x1920) -->
    <div class="story-wrapper-hidden">
      <div id="story-capture-area" class="story-template">
        <div class="story-bg-base"></div>

        <!-- ФОН: теперь всегда задается inline-стилем bgResolvedUrl (с preloading + fallback) -->
        <div
          :key="bgKey"
          class="story-bg-image"
          :style="{ backgroundImage: `url(${bgResolvedUrl})` }"
        ></div>

        <div class="story-noise"></div>
        <div class="story-bg-overlay"></div>

        <!-- Flex-колонка: footer едет вместе с высотой message -->
        <div class="story-content">
          <!-- Header -->
          <div class="header-text">
            Вы превратили этот момент в<br />уникальное воспоминание
          </div>

          <!-- Gift -->
          <div class="gift-card-shell">
            <div class="gift-card-container">
              <!-- Локация -->
              <div class="card-inner-location">
                <img class="loc-icon" src="/korzh_invest_card.png" alt="" crossorigin="anonymous" />
                <span class="loc-text">{{ sAddress || 'Все кофейни' }}</span>
              </div>

              <!-- Картинка + все ниже -->
              <div class="gift-image-wrapper">
                <div class="gift-glow"></div>
                <img
                  v-if="sBadgeImage"
                  :src="sBadgeImage"
                  class="gift-main-img"
                  alt="Gift"
                  crossorigin="anonymous"
                />
              </div>

              <div class="gift-info-block">
                <div class="meta-from">Подарок от {{ sFromName }}</div>

                <div class="gift-name">{{ sBadgeLabel }}</div>

                <div class="meta-gradient-badge" aria-label="Номер и дата">
                  <div class="mb-content">
                    <span class="mb-num">{{ sTicket }}</span>
                    <span class="mb-icon">🎁</span>
                    <span class="mb-date">{{ sDate }}</span>
                  </div>
                </div>
              </div>

              <!-- Отступ от бейджа до низа карточки -->
              <div class="card-bottom-spacer"></div>
            </div>

            <!-- Лента (PNG) -->
            <img
              class="corner-tag-img"
              src="/img/korzh/badge/corner-tag-img.png"
              alt=""
              crossorigin="anonymous"
            />
          </div>

          <!-- Message -->
          <div class="message-section">
            <div v-if="sTextFull" class="message-row">
              <div class="message-bubble">
                <div ref="messageWrapRef" class="message-body-wrap">
                  <div ref="messageTextRef" class="message-body">
                    {{ sTextDisplay }}
                  </div>
                </div>

                <!-- Хвостик (справа сверху) -->
                <svg
                  class="message-tail-top"
                  width="56"
                  height="42"
                  viewBox="0 0 56 42"
                  fill="none"
                  aria-hidden="true"
                >
                  <path d="M2 40C2 40 14 22 54 6V40H2Z" fill="rgba(30, 30, 35, 0.55)" />
                </svg>
              </div>

              <!-- Аватар прижат к правому краю gift-контейнера -->
              <div class="message-avatar-top">{{ sAvatar }}</div>
            </div>
          </div>

          <!-- Footer: теперь привязан к высоте message -->
          <div class="story-footer-text">Сделано в Сигнале</div>
        </div>
      </div>
    </div>

    <!-- МОДАЛКА -->
    <transition name="modal-fade">
      <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
        <div class="modal">
          <div class="modal-header">
            <h3>Ваша открытка готова</h3>
            <button class="modal-close" @click="closeModal" type="button" aria-label="Закрыть">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          <div class="modal-body">
            <img v-if="generatedImageUrl" :src="generatedImageUrl" class="preview-img" alt="" />
            <div v-else class="spinner">
              <img src="/favicon.svg" class="spinner-icon" alt="" />
              <div class="spinner-text">Создаем магию...</div>
            </div>
          </div>

          <div class="modal-footer">
            <div class="buttons-row">
              <button
                @click="shareOrDownload"
                class="download-btn primary-btn"
                :disabled="!generatedImageUrl"
                type="button"
              >
                {{ canShare ? 'Поделиться' : 'Скачать' }}
              </button>

              <button
                v-if="canShare"
                @click="downloadFile"
                class="download-btn secondary-btn"
                :disabled="!generatedImageUrl"
                type="button"
              >
                Скачать
              </button>
            </div>

            <div class="upload-section">
              <button class="text-btn upload-btn" type="button" @click.stop="triggerFileUpload">
                Загрузить свое фото
              </button>

              <input
                type="file"
                ref="fileInputRef"
                accept="image/*"
                class="hidden-input"
                @change="handleFileUpload"
                @click.stop
              />
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, defineExpose, computed, nextTick, watch } from 'vue'

const props = defineProps({
  ticket: String,
  date: String,
  address: String,
  allText: String,
  badgeImage: String,
  badgeLabel: String,
  userName: String
})

const showModal = ref(false)
const generatedImageUrl = ref(null)
const generatedBlob = ref(null)
const customBgImage = ref(null)
const fileInputRef = ref(null)
const bgKey = ref(0)
const canShare = ref(false)

if (typeof navigator !== 'undefined') {
  canShare.value = !!(navigator.share && navigator.canShare)
}

/** Snapshot */
const sTicketRaw = ref('')
const sDateRaw = ref('')
const sAddressRaw = ref('')
const sUserNameRaw = ref('')
const sAllTextRaw = ref('')
const sBadgeLabelRaw = ref('')
const sBadgeImageRaw = ref(null)
const sAvatar = ref('😊')

const sTextFull = ref('')
const sTextDisplay = ref('')

const messageWrapRef = ref(null)
const messageTextRef = ref(null)

const DEFAULT_BADGE = {
  label: 'Сигналка',
  image: '/img/korzh/badge/korzh-cffx-cup.png'
}
const smileys = ['😊', '😅', '😉', '😋', '😀']

/** Background resolve + fallback */
const DEFAULT_BG = 'https://cffx.ru/widget/rest-and-coffee/korzh_widget_bg.jpg'
const bgResolvedUrl = ref(DEFAULT_BG)
let lastBgRequestId = 0

const BG_MAP = [
  { includes: 'Куйбышева', url: '/img/korzh/korzh-kuybisheva103-1080x1920(2).jpg' },
  { includes: 'Льва Толстого', url: '/img/korzh/korzh-lva-tolstogo-1080x1920.jpg' },
  { includes: 'Революционная', url: '/img/korzh/korzh-revolucionnaya-1080x1920.jpg' },
  { includes: '9 просека', url: '/img/korzh/korzh-9proseka-1080x1920.jpg' },
  { includes: 'Самарская', url: '/img/korzh/korzh-samarskaya-1080x1920.jpg' },
  { includes: 'Дачная', url: '/img/korzh/korzh-dachnaya-1080x1920.jpg' },
  { includes: 'Ульяновская', url: '/img/korzh/korzh-ulyanovskaya-1080x1920.jpg' },
  { includes: 'Ново-Садовая', url: '/img/korzh/korzh-novo-sadovaya-1080x1920.jpg' },
]

function resolveBgUrlFromAddress(address) {
  const a = String(address || '')
  if (!a.trim()) return DEFAULT_BG
  const found = BG_MAP.find(x => a.includes(x.includes))
  return found?.url || DEFAULT_BG
}

function preloadImage(url) {
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => resolve(true)
    img.onerror = () => resolve(false)
    img.src = url
  })
}

async function updateBackgroundResolved() {
  const reqId = ++lastBgRequestId

  if (customBgImage.value) {
    bgResolvedUrl.value = customBgImage.value
    bgKey.value++
    return
  }

  const candidate = resolveBgUrlFromAddress(sAddressRaw.value || props.address || '')
  const ok = await preloadImage(candidate)
  if (reqId !== lastBgRequestId) return

  bgResolvedUrl.value = ok ? candidate : DEFAULT_BG
  bgKey.value++
}

watch(() => props.address, updateBackgroundResolved)
watch(customBgImage, updateBackgroundResolved)

function capitalizeFirst(str) {
  const s = String(str || '').trim()
  if (!s) return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}

function formatText(raw) {
  if (!raw || !String(raw).trim()) return ''
  let text = String(raw).trim()
  text = text.replace(/([.,!?;:])([^\s])/g, '$1 $2')
  text = text.replace(/\s+/g, ' ')
  text = text.charAt(0).toUpperCase() + text.slice(1)
  return text
}

function toAccusativeGiftName(name) {
  const s = String(name || '').trim()
  if (!s) return s
  const words = s.split(/\s+/)
  let last = words.pop()
  const low = last.toLowerCase()

  if (low.endsWith('ия')) last = last.slice(0, -2) + 'ию'
  else if (low.endsWith('а')) last = last.slice(0, -1) + 'у'
  else if (low.endsWith('я')) last = last.slice(0, -1) + 'ю'

  words.push(last)
  return words.join(' ')
}

function applyGiftDeclensionInText(text, giftLabel) {
  const t = String(text || '')
  const gl = String(giftLabel || '').trim()
  if (!t || !gl) return t

  const acc = toAccusativeGiftName(gl)
  return t.replace(/(Дарю:\s*)([^.\n!?]+)([.!?])?/i, (m, p1, p2, p3) => {
    const end = p3 || '.'
    return `${p1}${acc}${end}`
  })
}

function makeSnapshot() {
  sTicketRaw.value = props.ticket || ''
  sDateRaw.value = props.date || ''
  sAddressRaw.value = props.address || ''
  sUserNameRaw.value = capitalizeFirst(props.userName || '')
  sAllTextRaw.value = props.allText || ''

  const label = (props.badgeLabel || '').trim()
  const img = props.badgeImage || null
  sBadgeLabelRaw.value = label || DEFAULT_BADGE.label
  sBadgeImageRaw.value = img || DEFAULT_BADGE.image

  sAvatar.value = smileys[Math.floor(Math.random() * smileys.length)]

  const baseText = formatText(sAllTextRaw.value)
  const fixedText = applyGiftDeclensionInText(baseText, sBadgeLabelRaw.value)
  sTextFull.value = fixedText
  sTextDisplay.value = fixedText
}

function getGenitiveName(name) {
  if (!name) return 'Гостя'
  const n = String(name).trim()
  if (!n) return 'Гостя'
  const last = n.slice(-1).toLowerCase()
  if (last === 'а') return n.slice(0, -1) + 'ы'
  if (last === 'я') return n.slice(0, -1) + 'и'
  if (last === 'ь') return n.slice(0, -1) + 'и'
  if (last === 'й') return n.slice(0, -1) + 'я'
  if (/[бвгджзклмнпрстфхцчшщ]/.test(last)) return n + 'а'
  return n
}

const sFromName = computed(() => {
  const n = (sUserNameRaw.value || '').trim()
  return n ? getGenitiveName(n) : 'Гостя'
})

const sTicket = computed(() => (sTicketRaw.value || '').trim())
const sDate = computed(() => (sDateRaw.value || '').trim())
const sAddress = computed(() => (sAddressRaw.value || '').trim())
const sBadgeLabel = computed(() => (sBadgeLabelRaw.value || DEFAULT_BADGE.label).trim())
const sBadgeImage = computed(() => sBadgeImageRaw.value || DEFAULT_BADGE.image)

function normalizeSpaces(text) {
  return String(text || '').replace(/\s+/g, ' ').trim()
}

async function fitMessageTextToBox() {
  await nextTick()
  const wrap = messageWrapRef.value
  const el = messageTextRef.value
  const full = normalizeSpaces(sTextFull.value || '')
  if (!wrap || !el) return

  if (!full) {
    sTextDisplay.value = ''
    return
  }

  // если влезает полностью — не режем
  el.textContent = full
  const fitsFully = () => el.scrollHeight <= wrap.clientHeight + 1
  if (fitsFully()) {
    sTextDisplay.value = full
    return
  }

  // иначе — режем по словам
  const SAFE_BOTTOM_PX = 22
  const maxH = Math.max(0, wrap.clientHeight - SAFE_BOTTOM_PX)
  const fits = () => el.scrollHeight <= maxH + 1

  const words = full.split(/\s+/).filter(Boolean)
  if (words.length <= 1) {
    sTextDisplay.value = full + '...'
    el.textContent = sTextDisplay.value
    return
  }

  let lo = 1
  let hi = words.length

  while (lo < hi) {
    const mid = Math.ceil((lo + hi) / 2)
    const candidate = words.slice(0, mid).join(' ') + '...'
    el.textContent = candidate
    if (fits()) lo = mid
    else hi = mid - 1
  }

  const finalText = words.slice(0, Math.max(lo, 1)).join(' ') + '...'
  sTextDisplay.value = finalText
  el.textContent = finalText
}

const loadLibrary = () => {
  return new Promise((resolve, reject) => {
    if (window.html2canvas) return resolve(window.html2canvas)
    const script = document.createElement('script')
    script.src = 'https://unpkg.com/html2canvas@1.4.1/dist/html2canvas.min.js'
    script.onload = () => resolve(window.html2canvas)
    script.onerror = () => {
      const backup = document.createElement('script')
      backup.src = 'https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js'
      backup.onload = () => resolve(window.html2canvas)
      backup.onerror = () => reject(new Error('Failed'))
      document.head.appendChild(backup)
    }
    document.head.appendChild(script)
  })
}

const waitForImages = async (element) => {
  const imgs = element.querySelectorAll('img')
  const promises = Array.from(imgs).map((img) => {
    if (img.complete && img.naturalHeight !== 0) return Promise.resolve()
    return new Promise((resolve) => {
      img.onload = () => resolve()
      img.onerror = () => resolve()
    })
  })
  await Promise.all(promises)
}

const waitForFonts = async () => {
  if (document.fonts && document.fonts.ready) await document.fonts.ready
}

const generateImageInternal = async () => {
  generatedImageUrl.value = null
  try {
    await loadLibrary()
    await nextTick()

    await updateBackgroundResolved() // гарантируем выбранный фон (или fallback)
    await fitMessageTextToBox()

    const el = document.getElementById('story-capture-area')
    if (!el) return

    await waitForFonts()
    await waitForImages(el)
    await new Promise((r) => setTimeout(r, 550))

    const canvas = await window.html2canvas(el, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      logging: false,
      width: 1080,
      height: 1920,
      windowWidth: 1080,
      windowHeight: 1920,
      backgroundColor: null,
      ignoreElements: (element) => element.tagName === 'SCRIPT'
    })

    generatedImageUrl.value = canvas.toDataURL('image/png')
    canvas.toBlob((b) => {
      generatedBlob.value = b
    }, 'image/png')
  } catch (e) {
    console.error('Error generating image:', e)
    alert('Ошибка генерации.')
  }
}

const generateAndShare = async () => {
  makeSnapshot()
  await updateBackgroundResolved()

  showModal.value = true
  customBgImage.value = null
  await generateImageInternal()
}

const triggerFileUpload = async () => {
  if (!fileInputRef.value) return
  fileInputRef.value.value = ''
  await nextTick()
  fileInputRef.value.click()
}

const handleFileUpload = (event) => {
  const file = event.target.files && event.target.files[0]
  if (!file) return

  const reader = new FileReader()
  reader.onload = async (e) => {
    customBgImage.value = e.target.result
    await nextTick()
    setTimeout(() => generateImageInternal(), 350)
  }
  reader.readAsDataURL(file)
}

const shareOrDownload = async () => {
  if (!generatedBlob.value) return
  if (canShare.value) {
    const file = new File([generatedBlob.value], `signal-${sTicket.value || props.ticket || 'card'}.png`, { type: 'image/png' })
    try {
      await navigator.share({ files: [file] })
      return
    } catch (e) {}
  }
  downloadFile()
}

const downloadFile = () => {
  if (!generatedImageUrl.value) return
  const link = document.createElement('a')
  link.download = `signal-${sTicket.value || props.ticket || 'card'}.png`
  link.href = generatedImageUrl.value
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

const closeModal = () => {
  showModal.value = false
}

defineExpose({ generateAndShare })
</script>

<style scoped>
* { font-family: 'Inter', -apple-system, sans-serif; box-sizing: border-box; }

.story-wrapper-hidden {
  position: fixed; top: 0; left: 0;
  width: 0; height: 0; overflow: hidden;
  z-index: -9999; opacity: 0;
}

.story-template {
  width: 1080px; height: 1920px;
  position: relative;
  background: #000; color: #fff;
  overflow: hidden;
}

.story-bg-base { position: absolute; inset: 0; background: #1a1a1a; z-index: 0; }
.story-bg-image {
  position: absolute; inset: 0; z-index: 1;
  background-size: cover; background-position: center;
  filter: blur(8px);
  transform: scale(1.05);
}

.story-noise {
  position: absolute; inset: 0; z-index: 2;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.08'/%3E%3C/svg%3E");
  opacity: 0.6; mix-blend-mode: overlay; pointer-events: none;
}
.story-bg-overlay {
  position: absolute; inset: 0; z-index: 3;
  background: linear-gradient(180deg, rgba(0,0,0,0.12) 0%, rgba(0,0,0,0.45) 100%);
}

/* Flex layout */
.story-content {
  position: relative;
  z-index: 10;
  width: 100%;
  height: 100%;
  padding: 160px 60px 90px 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.header-text {
  font-size: 36px;
  line-height: 1.4;
  text-align: center;
  color: #fff;
  font-weight: 500;
  text-shadow: 0 4px 20px rgba(0,0,0,0.5);
  margin-bottom: 60px;
}

/* Gift */
.gift-card-shell { position: relative; width: 860px; height: 965px; margin-bottom: 34px; }
.gift-card-container {
  width: 860px;
  height: 965px;
  background: rgba(168, 139, 235, 0.65);
  backdrop-filter: blur(35px) saturate(120%);
  border-radius: 60px;
  position: relative;
  box-shadow: 0 40px 100px -10px rgba(0,0,0,0.3);
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 8px solid rgba(255,255,255,0.3);
  overflow: hidden;
}
.corner-tag-img {
  position: absolute;
  top: 0;
  right: 0;
  width: 250px;
  height: 250px;
  z-index: 999;
  pointer-events: none;
  object-fit: contain;
}

/* Location */
.card-inner-location {
  position: absolute;
  top: 40px;
  left: 40px;
  display: flex;
  align-items: center;
  gap: 18px;
  z-index: 30;
}
.loc-icon {
  width: 120px;
  height: 120px;
  border-radius: 28px;
  object-fit: cover;
  opacity: 0.95;
}
.loc-text {
  font-size: 36px;
  font-weight: 700;
  color: #fff;
  text-shadow: 0 2px 8px rgba(0,0,0,0.3);
}

/* СДВИГ ВНИЗ (гарантированный, без transform):
   - margin-top +40px
   - height -40px
   => внутри той же высоты карточки все визуально опустится */
.gift-image-wrapper {
  position: relative;
  width: 100%;
  height: 480px;     /* было 520 */
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 144px; /* было 104 */
}

.gift-glow {
  position: absolute;
  width: 450px; height: 450px;
  background: radial-gradient(circle, rgba(255,255,255,0.5) 0%, transparent 70%);
  opacity: 0.6;
}
.gift-main-img {
  width: 440px; height: 440px;
  object-fit: contain;
  z-index: 2;
  position: relative;
  filter: drop-shadow(0 20px 40px rgba(0,0,0,0.35));
}

.gift-info-block {
  width: 100%;
  padding: 0 50px 0 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  z-index: 5;
}
.meta-from {
  font-size: 48px;
  font-weight: 500;
  color: #fff;
  margin-bottom: 22px;
  line-height: 1.1;
}
.gift-name {
  font-size: 58px;
  font-weight: 700;
  color: rgba(214, 186, 255, 0.9);
  text-shadow: 0 2px 18px rgba(155, 127, 183, 0.55);
  margin-bottom: 14px;
  line-height: 1.1;
}

/* Badge */
.meta-gradient-badge {
  height: 72px;
  padding: 0 36px;
  border-radius: 999px;
  background: linear-gradient(90deg, #9B7FB7 0%, #B39DC8 100%);
  box-shadow: 0 10px 20px -5px rgba(155, 127, 183, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
}
.mb-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
  transform: translateY(-2px);
}
.mb-num, .mb-date, .mb-icon { line-height: 1; display: inline-flex; align-items: center; }
.mb-num { font-size: 28px; font-weight: 800; color: #fff; }
.mb-date { font-size: 28px; font-weight: 600; color: #fff; }
.mb-icon { font-size: 26px; }

.card-bottom-spacer { height: 8px; width: 100%; }

/* Message */
.message-section { width: 860px; margin-bottom: 26px; }
.message-row {
  width: 860px;
  display: flex;
  align-items: flex-start;
  gap: 14px;
}
.message-bubble {
  position: relative;
  flex: 1;
  min-width: 0;
  height: auto;
  max-height: 405px;
  background: rgba(30, 30, 35, 0.4);
  backdrop-filter: blur(25px);
  border-radius: 40px;
  padding: 28px 34px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.2);
  border: 1px solid rgba(255,255,255,0.3);
  overflow: visible;
}
.message-body-wrap {
  width: 100%;
  max-height: 349px;
  overflow: hidden;
}
.message-body {
  font-size: 34px;
  line-height: 1.38;
  color: #fff;
  font-weight: 600;
  text-shadow: 0 2px 5px rgba(0,0,0,0.2);
  text-align: left;
  word-break: break-word;
}
.message-tail-top {
  position: absolute;
  top: 10px;
  right: -30px;
  z-index: 50;
  pointer-events: none;
}
.message-avatar-top {
  width: 74px;
  height: 74px;
  flex: 0 0 74px;
  background: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 36px;
  box-shadow: 0 6px 18px rgba(0,0,0,0.35);
  margin-top: 8px;
  margin-left: auto;
}

/* Footer (привязан к message, потому что в потоке) */
.story-footer-text {
  font-size: 48px;
  color: rgba(255,255,255,0.5);
  font-weight: 500;
  letter-spacing: 0.02em;
}

/* Modal */
.modal-overlay {
  position: fixed; inset: 0;
  background: rgba(0,0,0,0.92);
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);
  padding: 20px;
}
.modal {
  background: #1e1e20;
  width: 100%;
  max-width: 420px;
  max-height: 95vh;
  border-radius: 28px;
  border: 1px solid #333;
  display: flex;
  flex-direction: column;
  box-shadow: 0 30px 80px rgba(0,0,0,0.7);
  overflow: hidden;
}
.modal-header {
  padding: 18px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #333;
  background: #252528;
}
.modal-header h3 { margin: 0; font-size: 18px; color: #fff; font-weight: 600; }
.modal-close {
  background: rgba(255,255,255,0.1);
  border: none;
  color: #fff;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.modal-body {
  background: #000;
  flex-grow: 1;
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}
.preview-img {
  max-width: 100%;
  max-height: 60vh;
  object-fit: contain;
  border-radius: 12px;
}
.spinner { display: flex; flex-direction: column; align-items: center; gap: 16px; }
.spinner-icon { width: 48px; height: 48px; animation: breathe 3s ease-in-out infinite; }
.spinner-text { color: #888; font-size: 14px; }

.modal-footer {
  padding: 24px;
  background: #252528;
  border-top: 1px solid #333;
  display: flex;
  flex-direction: column;
  gap: 14px;
  align-items: center;
}
.buttons-row { display: flex; gap: 10px; width: 100%; }
.download-btn {
  flex: 1;
  padding: 14px;
  border-radius: 12px;
  border: none;
  font-weight: 600;
  font-size: 15px;
  cursor: pointer;
}
.primary-btn { background: #9b7fb7; color: #fff; }
.secondary-btn { background: #444; color: #ccc; }
.upload-section { width: 100%; display: flex; justify-content: center; }
.upload-btn { background: transparent; border: 1px dashed #555; color: #aaa; padding: 8px 16px; border-radius: 8px; cursor: pointer; font-size: 13px; }
.hidden-input { position: absolute; left: -9999px; width: 1px; height: 1px; opacity: 0; }

@keyframes breathe {
  0%, 100% { transform: scale(1); opacity: 0.8; }
  50% { transform: scale(1.1); opacity: 1; }
}
</style>
