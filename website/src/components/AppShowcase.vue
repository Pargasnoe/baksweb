<template>
  <section id="app" class="showcase-section">
    <div class="showcase-inner">
      <h2 class="section-title reveal-up">
        {{ lang === 'tr' ? 'Cebinizde taşıyın' : 'Carry it in your pocket' }}
      </h2>
      <p class="section-sub reveal-up">
        {{ lang === 'tr'
          ? 'iOS ve Android için — tek uygulama, hem gönderici hem şoför.'
          : 'iOS and Android — one app, for both senders and drivers.' }}
      </p>

      <div class="phones-row" ref="phonesRowRef" @mousemove="onMouseMove" @mouseleave="onMouseLeave">
        <div
          v-for="(screen, i) in phones"
          :key="i"
          class="phone-mock reveal-up"
          :ref="el => { if (el) phoneRefs[i] = el }"
        >
          <div class="mock-frame">
            <div class="mock-notch"></div>
            <img :src="screen.src" :alt="screen.label" class="mock-screen" />
          </div>
          <p class="mock-label">{{ screen.label }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { useLang } from '../i18n.js'

gsap.registerPlugin(ScrollTrigger)
const { lang } = useLang()

const phones = computed(() => lang.value === 'tr'
  ? [
      { src: '/dashboard.jpeg', label: 'Dashboard' },
      { src: '/ilanlarım.jpeg', label: 'İlanlarım' },
      { src: '/ilandetay.jpeg', label: 'İlan Detay' },
      { src: '/mesajlar.jpeg', label: 'Mesajlar' },
      { src: '/harcamalr.jpeg', label: 'Harcamalar' }
    ]
  : [
      { src: '/dashboard.jpeg', label: 'Dashboard' },
      { src: '/ilanlarım.jpeg', label: 'My Loads' },
      { src: '/ilandetay.jpeg', label: 'Load Detail' },
      { src: '/mesajlar.jpeg', label: 'Messages' },
      { src: '/harcamalr.jpeg', label: 'Spending' }
    ]
)

const phonesRowRef = ref(null)
const phoneRefs = ref([])

function onMouseMove(e) {
  const rect = phonesRowRef.value.getBoundingClientRect()
  const cx = rect.left + rect.width / 2
  const cy = rect.top + rect.height / 2
  const rx = ((e.clientX - cx) / rect.width) * 10
  const ry = ((e.clientY - cy) / rect.height) * -5
  phoneRefs.value.forEach((el, i) => {
    if (!el) return
    const offsetRx = rx + (i - 1.5) * 2
    gsap.to(el, { rotateX: ry, rotateY: offsetRx, duration: 0.4, ease: 'power2.out', transformPerspective: 800 })
  })
}

function onMouseLeave() {
  phoneRefs.value.forEach(el => {
    if (!el) return
    gsap.to(el, { rotateX: 0, rotateY: 0, duration: 0.6, ease: 'elastic.out(1, 0.5)', transformPerspective: 800 })
  })
}

onMounted(() => {
  gsap.utils.toArray('.showcase-section .reveal-up').forEach((el, i) => {
    gsap.fromTo(el,
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
        delay: i * 0.12,
        scrollTrigger: { trigger: el, start: 'top 85%', once: true }
      }
    )
  })
})
</script>

<style scoped>
.showcase-section {
  background: var(--color-navy);
  padding: clamp(60px, 10vw, 100px) clamp(16px, 4vw, 24px);
  overflow: hidden;
}
.showcase-inner {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}
.section-title {
  font-family: 'SF Pro Display', 'Manrope', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: clamp(28px, 4vw, 52px);
  font-weight: 700;
  color: var(--color-white);
  text-align: center;
}
.section-sub {
  font-size: 16px;
  color: var(--color-muted);
  text-align: center;
  margin-bottom: 40px;
}
.phones-row {
  display: flex;
  gap: 24px;
  align-items: flex-end;
  perspective: 1200px;
  transform-style: preserve-3d;
  cursor: pointer;
  flex-wrap: wrap;
  justify-content: center;
}
.phone-mock {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  transform-style: preserve-3d;
}
.mock-frame {
  position: relative;
  width: 180px;
  height: 360px;
  background: var(--color-navy-mid);
  border: 2px solid var(--color-navy-light);
  border-radius: 28px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0,0,0,0.4);
}
.mock-notch {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 18px;
  background: var(--color-navy-mid);
  z-index: 2;
  border-radius: 0 0 12px 12px;
  border: 2px solid var(--color-navy-light);
  border-top: none;
}
.mock-screen {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
}
.mock-label {
  font-size: 13px;
  color: var(--color-muted);
  font-weight: 500;
}
@media (max-width: 768px) {
  .phones-row { gap: 14px; }
  .mock-frame { width: 150px; height: 300px; }
  .showcase-inner { gap: 12px; }
}
@media (max-width: 580px) {
  .phones-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    width: 100%;
    max-width: 360px;
    perspective: none;
  }
  .phone-mock:nth-child(5) { grid-column: 1 / -1; justify-self: center; }
  .mock-frame { width: 100%; height: auto; aspect-ratio: 589 / 1280; border-radius: 20px; }
}
@media (max-width: 400px) {
  .phones-row { max-width: 300px; }
}
</style>
