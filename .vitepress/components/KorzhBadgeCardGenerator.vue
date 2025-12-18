<template>
  <div>
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
      rel="stylesheet"
    >

    <!-- СКРЫТЫЙ ШАБЛОН (1080x1920) -->
    <div class="story-wrapper-hidden">
      <div id="story-capture-area" class="story-template">
        <div class="story-bg-base"></div>

        <div
          :key="bgKey"
          class="story-bg-image"
          :class="!customBgImage ? bgClass : ''"
          :style="customBgImage ? { backgroundImage: `url(${customBgImage})` } : {}"
        ></div>

        <div class="story-noise"></div>
        <div class="story-bg-overlay"></div>

        <!-- ФИКС-СЕТКА: подарок не режется, сообщение не залезает на футер -->
        <div class="story-content-grid">
          <!-- Header -->
          <div class="grid-header">
            <div class="header-text">
              Вы превратили этот момент в<br>уникальное воспоминание
            </div>
          </div>

          <!-- Gift zone -->
          <div class="grid-gift">
            <div class="gift-card-shell">
              <div class="gift-card-container">
                <div class="card-inner-location">
                  {{ sAddress || 'Все кофейни' }}
                </div>

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
                  <div class="meta-from">
                    Подарок от {{ sFromName }}
                  </div>

                  <div class="gift-name">
                    {{ sBadgeLabel }}
                  </div>

                  <div class="meta-gradient-badge" aria-label="Номер и дата">
                    <div class="mb-content">
                      <span class="mb-num">{{ sTicket }}</span>
                      <span class="mb-icon">🎁</span>
                      <span class="mb-date">{{ sDate }}</span>
                    </div>
                  </div>
                </div>

                <div class="card-bottom-spacer"></div>
              </div>

              <!-- ЛЕНТОЧКА: поверх карточки и бордера -->
              <img
                class="corner-tag-img"
                src="/img/korzh/badge/corner-tag-img.png"
                alt=""
                crossorigin="anonymous"
              />
            </div>
          </div>

          <!-- Message zone (фикс высота, слева bubble, справа avatar как в чате) -->
          <div class="grid-message">
            <div v-if="sTextFull" class="message-row">
              <div class="message-bubble">
                <div ref="messageWrapRef" class="message-body-wrap">
                  <div ref="messageTextRef" class="message-body">
                    {{ sTextDisplay }}
                  </div>
                </div>

                <!-- хвостик справа -->
                <svg class="message-tail" width="44" height="30" viewBox="0 0 44 30" fill="none" aria-hidden="true">
                  <path d="M2 2C2 2 12 15 42 28V2H2Z" fill="rgba(30, 30, 35, 0.50)"/>
                </svg>
              </div>

              <div class="message-avatar">
                {{ sAvatar }}
              </div>
            </div>
          </div>

          <!-- Footer -->
          <div class="grid-footer">
            <div class="story-footer-text">
              Сделано в Сигнале
            </div>
          </div>
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

  sTextFull.value = formatText(sAllTextRaw.value)
  sTextDisplay.value = sTextFull.value
}

watch(customBgImage, () => {
  bgKey.value++
  generatedImageUrl.value = null
})

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

const bgClass = computed(() => {
  const a = sAddressRaw.value || props.address || ''
  if (a.includes('Куйбышева')) return 'bg-1'
  if (a.includes('Льва Толстого')) return 'bg-2'
  if (a.includes('Революционная')) return 'bg-3'
  if (a.includes('9 просека')) return 'bg-4'
  if (a.includes('Самарская')) return 'bg-5'
  if (a.includes('Дачная')) return 'bg-6'
  if (a.includes('Ульяновская')) return 'bg-7'
  if (a.includes('Ново-Садовая')) return 'bg-8'
  return 'bg-default'
})

async function fitMessageTextToBox() {
  await nextTick()
  const wrap = messageWrapRef.value
  const el = messageTextRef.value
  const full = sTextFull.value || ''

  if (!wrap || !el) return
  if (!full) {
    sTextDisplay.value = ''
    return
  }

  const fits = () => el.scrollHeight <= wrap.clientHeight + 1

  // пробуем полный
  el.textContent = full
  if (fits()) {
    sTextDisplay.value = full
    return
  }

  // бинарный поиск по длине
  let lo = 0
  let hi = full.length

  while (lo < hi) {
    const mid = Math.ceil((lo + hi) / 2)
    const candidate = full.slice(0, mid).trimEnd() + '..'
    el.textContent = candidate
    if (fits()) lo = mid
    else hi = mid - 1
  }

  const finalText = full.slice(0, Math.max(lo, 0)).trimEnd() + '..'
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

    // важно: перед снимком подгоняем текст под коробку
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
    canvas.toBlob((b) => { generatedBlob.value = b }, 'image/png')
  } catch (e) {
    console.error('Error generating image:', e)
    alert('Ошибка генерации.')
  }
}

const generateAndShare = async () => {
  makeSnapshot()
  showModal.value = true
  customBgImage.value = null
  bgKey.value++
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

const closeModal = () => { showModal.value = false }

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

/* backgrounds */
.story-bg-base { position: absolute; inset: 0; background: #1a1a1a; z-index: 0; }
.story-bg-image {
  position: absolute; inset: 0; z-index: 1;
  background-size: cover; background-position: center;
  filter: blur(8px);
  transform: scale(1.05);
}
.story-bg-image.bg-default { background-image: url('https://cffx.ru/widget/rest-and-coffee/korzh_widget_bg.jpg'); }
.story-bg-image.bg-1 { background-image: url('/img/korzh/korzh-kuybisheva103-1080x1920(2).jpg'); }
.story-bg-image.bg-2 { background-image: url('/img/korzh/korzh-lva-tolstogo-1080x1920.jpg'); }
.story-bg-image.bg-3 { background-image: url('/img/korzh/korzh-revolucionnaya-1080x1920.jpg'); }
.story-bg-image.bg-4 { background-image: url('/img/korzh/korzh-9proseka-1080x1920.jpg'); }
.story-bg-image.bg-5 { background-image: url('/img/korzh/korzh-samarskaya-1080x1920.jpg'); }
.story-bg-image.bg-6 { background-image: url('/img/korzh/korzh-dachnaya-1080x1920.jpg'); }
.story-bg-image.bg-7 { background-image: url('/img/korzh/korzh-ulyanovskaya-1080x1920.jpg'); }
.story-bg-image.bg-8 { background-image: url('/img/korzh/korzh-novo-sadovaya-1080x1920.jpg'); }

.story-noise {
  position: absolute; inset: 0; z-index: 2;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.08'/%3E%3C/svg%3E");
  opacity: 0.6; mix-blend-mode: overlay; pointer-events: none;
}
.story-bg-overlay {
  position: absolute; inset: 0; z-index: 3;
  background: linear-gradient(180deg, rgba(0,0,0,0.12) 0%, rgba(0,0,0,0.45) 100%);
}

/* === FIXED GRID === */
.story-content-grid {
  position: relative;
  z-index: 10;
  width: 100%;
  height: 100%;
  padding: 160px 60px 90px 60px;

  display: grid;
  /* внутри: 1920 - 160 - 90 = 1670 */
  grid-template-rows: 170px 965px 415px 120px; /* message row fixed => не лезет на футер */
  align-items: start;
}

.grid-header { display: flex; align-items: flex-start; justify-content: center; }
.grid-gift {
  display: flex; align-items: flex-start; justify-content: center;
  overflow: visible;
  transform: translateY(-15px);
}
.grid-message {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  overflow: hidden;
  padding-bottom: 10px; /* гарантированный зазор до футера по сетке */
}
.grid-footer { display: flex; align-items: flex-end; justify-content: center; }

.header-text {
  font-size: 36px;
  line-height: 1.4;
  text-align: center;
  color: #fff;
  font-weight: 500;
  text-shadow: 0 4px 20px rgba(0,0,0,0.5);
}

/* === Gift card === */
.gift-card-shell {
  position: relative;
  width: 100%;
  max-width: 860px;
  height: 965px;
  overflow: visible;
}

.gift-card-container {
  width: 100%;
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
  overflow: hidden; /* сохраняем как было */
}

.card-inner-location {
  position: absolute;
  top: 40px;
  left: 45px;
  font-size: 28px;
  font-weight: 600;
  color: #fff;
  text-shadow: 0 2px 8px rgba(0,0,0,0.3);
  letter-spacing: 0.02em;
  z-index: 30;
}

/* ленточка поверх бордера */
.corner-tag-img {
  position: absolute;
  top: -8px;
  right: -8px;
  width: 250px;
  height: 250px;
  z-index: 999;
  pointer-events: none;
  object-fit: contain;
}

.gift-image-wrapper {
  position: relative;
  width: 100%;
  height: 520px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 112px; /* было 120 — чуть меньше (5-10px) */
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
  position: relative;
  z-index: 5;
}

.meta-from {
  font-size: 48px;
  font-weight: 500;
  color: #fff; /* чисто белый */
  margin-bottom: 22px;
  line-height: 1.1;
}

.gift-name {
  font-size: 58px;
  font-weight: 700;
  color: rgba(214, 186, 255, 0.9);
  text-shadow: 0 2px 18px rgba(155, 127, 183, 0.55);
  margin-bottom: 24px; /* чуть компактнее */
  line-height: 1.1;
}

/* badge */
.meta-gradient-badge {
  height: 70px; /* чуть выше, чтобы “не прижималось снизу” */
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
  transform: translateY(-1px); /* микроподъем для оптического центра */
}
.mb-num, .mb-date, .mb-icon {
  line-height: 1;
  display: inline-flex;
  align-items: center;
}
.mb-num { font-size: 28px; font-weight: 800; color: #fff; }
.mb-date { font-size: 28px; font-weight: 600; color: #fff; }
.mb-icon { font-size: 26px; }

.card-bottom-spacer { height: 68px; width: 100%; } /* было 78 — компактнее */

/* === Message row (telegram-like) === */
.message-row {
  width: 100%;
  max-width: 860px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-end; /* аватар снизу, как в чатах */
  gap: 18px;
}

.message-bubble {
  position: relative;
  width: 720px; /* уже, чтобы справа был аватар */
  height: 100%;
  max-height: 405px; /* меньше строки 415, оставляем воздух */
  background: rgba(30, 30, 35, 0.4);
  backdrop-filter: blur(25px);
  border-radius: 40px;
  padding: 34px 40px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.2);
  border: 8px solid rgba(255,255,255,0.26); /* толще */
  overflow: hidden;
  display: flex;
  align-items: flex-start;
}

.message-body-wrap {
  width: 100%;
  height: 100%;
  overflow: hidden;          /* фикс */
}

.message-body {
  font-size: 34px;
  line-height: 1.38;
  color: #fff;
  font-weight: 600;
  text-shadow: 0 2px 5px rgba(0,0,0,0.2);
  text-align: left;          /* слева */
  white-space: normal;
  word-break: break-word;
}

/* хвост справа (не вниз) */
.message-tail {
  position: absolute;
  right: -22px;
  bottom: 22px;
  z-index: 5;
  pointer-events: none;
}

.message-avatar {
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
  transform: translateY(-10px); /* центр аватара примерно на уровне хвостика */
}

/* footer */
.story-footer-text {
  font-size: 48px;
  color: rgba(255,255,255,0.5);
  font-weight: 500;
  letter-spacing: 0.02em;
}

/* modal */
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
  background: #1E1E20;
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
  transition: transform 0.2s;
}
.primary-btn { background: #9B7FB7; color: #fff; }
.secondary-btn { background: #444; color: #ccc; }
.upload-section { width: 100%; display: flex; justify-content: center; }
.upload-btn { background: transparent; border: 1px dashed #555; color: #aaa; padding: 8px 16px; border-radius: 8px; cursor: pointer; font-size: 13px; }
.hidden-input { position: absolute; left: -9999px; width: 1px; height: 1px; opacity: 0; }

@keyframes breathe {
  0%, 100% { transform: scale(1); opacity: 0.8; }
  50% { transform: scale(1.1); opacity: 1; }
}
</style>
