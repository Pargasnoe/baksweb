<template>
  <section id="about" class="hero-section">
    <!-- dot grid overlay -->
    <div class="dot-grid" aria-hidden="true"></div>

    <!-- orange glow -->
    <div class="hero-glow" aria-hidden="true"></div>

    <div class="hero-inner">
      <!-- LEFT -->
      <div class="hero-left">
        <div class="hero-badge reveal-up">
          <span class="badge-dot"></span>
          {{ t.hero.badge }}
        </div>

        <h1 class="hero-h1">
          <span v-for="(line, li) in t.hero.h1" :key="li" class="hero-line">
            <span v-for="(word, wi) in line.split(' ')" :key="wi" class="hero-word">{{ word }}&nbsp;</span>
          </span>
        </h1>

        <p class="hero-desc reveal-up">{{ t.hero.desc }}</p>

        <div class="hero-ctas reveal-up">
          <a href="#app" @click.prevent="scrollTo('app')" class="cta-primary">{{ t.hero.cta1 }}</a>
          <a href="#how" @click.prevent="scrollTo('how')" class="cta-secondary">
            {{ t.hero.cta2 }}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 3L13 8L8 13M3 8H13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </a>
        </div>

        <!-- floating stats -->
        <div class="hero-stats">
          <div ref="stat1Ref" class="stat-badge">
            <span class="stat-num">100B$</span>
            <span class="stat-label">Pazar Büyüklüğü</span>
          </div>
          <div ref="stat2Ref" class="stat-badge">
            <span class="stat-num">%2</span>
            <span class="stat-label">Dijitalleşme</span>
          </div>
          <div ref="stat3Ref" class="stat-badge">
            <span class="stat-num">#1</span>
            <span class="stat-label">İlk Platform</span>
          </div>
        </div>
      </div>

      <!-- RIGHT -->
      <div class="hero-right">
        <div class="phone-frame">
          <div class="phone-screen">
            <img
              v-for="(src, i) in screens"
              :key="src"
              :src="src"
              :class="{ active: activeScreen === i }"
              class="screen-img"
              alt="Baks App Screenshot"
            />
          </div>
          <!-- floating UI badges on phone -->
          <div class="phone-badge phone-badge-top">
            <span>✓ Teklif Alındı</span>
          </div>
          <div class="phone-badge phone-badge-bottom">
            <span>📍 Canlı Takip</span>
          </div>
        </div>
      </div>
    </div>

    <!-- scroll indicator -->
    <div class="scroll-indicator reveal-up">
      <div class="scroll-line"></div>
      <span>Scroll</span>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import { useLang } from '../i18n.js'

const { t } = useLang()

const screens = ['/dashboard.jpeg', '/ilanlarım.jpeg', '/ilandetay.jpeg', '/mesajlar.jpeg', '/harcamalr.jpeg']
const activeScreen = ref(0)
let screenInterval = null
const stat1Ref = ref(null)
const stat2Ref = ref(null)
const stat3Ref = ref(null)

function scrollTo(id) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

onMounted(() => {
  screenInterval = setInterval(() => {
    activeScreen.value = (activeScreen.value + 1) % screens.length
  }, 3000)

  // hero words animation (after splash ~2s)
  gsap.fromTo('.hero-word',
    { opacity: 0, y: 80 },
    { opacity: 1, y: 0, stagger: 0.08, duration: 0.7, ease: 'power3.out', delay: 2.0 }
  )

  // floating stats
  const statsEls = [stat1Ref.value, stat2Ref.value, stat3Ref.value]
  statsEls.forEach((el, i) => {
    if (!el) return
    gsap.to(el, {
      y: -12,
      duration: 2 + i * 0.3,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
      delay: i * 0.4
    })
  })

  // phone badges float
  gsap.to('.phone-badge-top', { y: -8, duration: 2.2, ease: 'sine.inOut', yoyo: true, repeat: -1 })
  gsap.to('.phone-badge-bottom', { y: 8, duration: 2.6, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 0.8 })

  // reveal-up elements
  gsap.to('.hero-section .reveal-up', {
    opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: 'power2.out', delay: 2.2
  })
})

onUnmounted(() => clearInterval(screenInterval))
</script>

<style scoped>
.hero-section {
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--color-navy);
  overflow: hidden;
  padding-top: 72px;
}
.dot-grid {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(circle, rgba(138,155,181,0.18) 1px, transparent 1px);
  background-size: 32px 32px;
  opacity: 0.04;
  pointer-events: none;
}
.hero-glow {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, var(--color-orange-glow) 0%, transparent 70%);
  pointer-events: none;
}
.hero-inner {
  flex: 1;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  padding: 60px 24px;
  display: flex;
  align-items: center;
  gap: 48px;
}
.hero-left {
  flex: 0 0 55%;
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: var(--color-navy-mid);
  border: 1px solid var(--color-orange);
  color: var(--color-orange);
  font-size: 13px;
  font-weight: 600;
  padding: 6px 14px;
  border-radius: 100px;
  width: fit-content;
}
.badge-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--color-orange);
  display: inline-block;
}
.hero-h1 {
  font-family: 'SF Pro Display', 'Manrope', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: clamp(40px, 5vw, 68px);
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.02em;
  color: var(--color-white);
  display: flex;
  flex-direction: column;
}
.hero-line {
  display: flex;
  flex-wrap: wrap;
}
.hero-word {
  display: inline-block;
  opacity: 0;
}
.hero-desc {
  font-size: clamp(15px, 2.5vw, 18px);
  color: var(--color-muted);
  line-height: 1.6;
  max-width: 480px;
}
.hero-ctas {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}
.cta-primary {
  background: var(--color-orange);
  color: white;
  text-decoration: none;
  font-size: 15px;
  font-weight: 600;
  padding: 14px 28px;
  border-radius: 10px;
  transition: transform 0.2s, opacity 0.2s;
}
.cta-primary:hover { transform: translateY(-2px); opacity: 0.9; }
.cta-secondary {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--color-white);
  text-decoration: none;
  font-size: 15px;
  font-weight: 500;
  padding: 14px 20px;
  border: 1px solid var(--color-navy-light);
  border-radius: 10px;
  transition: border-color 0.2s;
}
.cta-secondary:hover { border-color: var(--color-orange); color: var(--color-orange); }
.hero-stats {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-top: 8px;
}
.stat-badge {
  display: flex;
  flex-direction: column;
  background: var(--color-surface);
  border: 1px solid var(--color-navy-light);
  padding: 12px 16px;
  border-radius: 12px;
  min-width: 90px;
}
.stat-num {
  font-family: 'SF Pro Display', 'Manrope', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 20px;
  font-weight: 700;
  color: var(--color-orange);
}
.stat-label {
  font-size: 11px;
  color: var(--color-muted);
  margin-top: 2px;
}
.hero-right {
  flex: 0 0 45%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.phone-frame {
  position: relative;
  width: 260px;
  aspect-ratio: 589 / 1280;
  background: var(--color-navy-mid);
  border: 2px solid var(--color-navy-light);
  border-radius: 40px;
  overflow: visible;
  box-shadow: 0 40px 80px rgba(0,0,0,0.5), 0 0 0 8px var(--color-surface);
}
.phone-screen {
  position: absolute;
  inset: 0;
  border-radius: 38px;
  overflow: hidden;
}
.screen-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: fill;
  opacity: 0;
  transition: opacity 0.8s ease;
}
.screen-img.active { opacity: 1; }
.phone-badge {
  position: absolute;
  background: var(--color-surface);
  border: 1px solid var(--color-navy-light);
  border-radius: 10px;
  padding: 8px 14px;
  font-size: 12px;
  font-weight: 600;
  color: var(--color-white);
  white-space: nowrap;
  box-shadow: 0 8px 24px rgba(0,0,0,0.3);
}
.phone-badge-top {
  top: 60px;
  right: -60px;
}
.phone-badge-bottom {
  bottom: 80px;
  left: -60px;
}
.scroll-indicator {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding-bottom: 32px;
  color: var(--color-muted);
  font-size: 11px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}
.scroll-line {
  width: 1px;
  height: 40px;
  background: linear-gradient(to bottom, var(--color-orange), transparent);
  animation: scrollPulse 1.5s ease-in-out infinite;
}
@keyframes scrollPulse {
  0%, 100% { opacity: 0.3; transform: scaleY(0.5); transform-origin: top; }
  50% { opacity: 1; transform: scaleY(1); transform-origin: top; }
}
@media (max-width: 900px) {
  .hero-inner {
    flex-direction: column;
    padding: 40px 20px;
    text-align: center;
  }
  .hero-left { flex: none; align-items: center; }
  .hero-right { flex: none; }
  .hero-badge { align-self: center; }
  .hero-ctas { justify-content: center; }
  .hero-stats { justify-content: center; }
  .phone-badge { display: none; }
  .phone-frame { width: min(260px, 70vw); }
}
@media (max-width: 640px) {
  .hero-inner { padding: 32px 16px; gap: 32px; }
  .hero-stats { gap: 8px; }
  .stat-badge { padding: 10px 12px; min-width: 80px; }
  .stat-num { font-size: 17px; }
  .hero-ctas { flex-direction: column; align-items: center; width: 100%; }
  .cta-primary, .cta-secondary { width: 100%; justify-content: center; text-align: center; }
  .phone-frame { width: min(220px, 65vw); }
}
@media (max-width: 480px) {
  .hero-inner { padding: 24px 16px; }
  .phone-frame { width: min(190px, 70vw); }
  .scroll-indicator { display: none; }
}
</style>
