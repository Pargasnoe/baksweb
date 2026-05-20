<template>
  <section id="market" class="market-section">
    <div class="market-inner">
      <h2 class="section-title reveal-up">{{ t.market.title }}</h2>

      <div class="stats-grid">
        <div class="stat-card reveal-up" v-for="(stat, i) in stats" :key="i">
          <div class="stat-value">
            <span v-if="stat.animated" ref="countRefs" class="count-num">0</span>
            <span v-else class="count-num">{{ stat.value }}</span>
            <span class="count-suffix">{{ stat.suffix }}</span>
          </div>
          <p class="stat-desc">{{ stat.desc }}</p>
        </div>
      </div>

      <div class="market-body reveal-up">
        <p>{{ t.market.body }}</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { useLang } from '../i18n.js'

gsap.registerPlugin(ScrollTrigger)

const { t, lang } = useLang()
const countRefs = ref([])

const stats = [
  { value: '100', animated: true, suffix: 'B$', desc: 'Türkiye lojistik sektörü büyüklüğü' },
  { value: '%90+', animated: false, suffix: '', desc: 'Karayolu taşıma oranı' },
  { value: '%2–4', animated: false, suffix: '', desc: "Türkiye'de dijitalleşme (AB: %15-25, Çin: %40-60)" }
]

onMounted(() => {
  // reveal-up
  gsap.utils.toArray('.market-section .reveal-up').forEach((el, i) => {
    gsap.fromTo(el,
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 85%', once: true }
      }
    )
  })

  // countup
  const countEl = countRefs.value[0]
  if (countEl) {
    ScrollTrigger.create({
      trigger: countEl,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        gsap.to({ val: 0 }, {
          val: 100,
          duration: 2,
          ease: 'power2.out',
          onUpdate: function() {
            countEl.textContent = Math.round(this.targets()[0].val)
          }
        })
      }
    })
  }
})
</script>

<style scoped>
.market-section {
  background: var(--color-navy-mid);
  padding: clamp(60px, 10vw, 100px) clamp(16px, 4vw, 24px);
}
.market-inner {
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 56px;
}
.section-title {
  font-family: 'SF Pro Display', 'Manrope', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: clamp(32px, 4vw, 52px);
  font-weight: 700;
  color: var(--color-white);
  text-align: center;
}
.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  width: 100%;
}
.stat-card {
  background: var(--color-navy);
  border-top: 2px solid var(--color-orange);
  border-radius: 16px;
  padding: 32px 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  transition: transform 0.3s;
}
.stat-card:hover { transform: translateY(-4px); }
.stat-value {
  display: flex;
  align-items: baseline;
  gap: 4px;
}
.count-num {
  font-family: 'SF Pro Display', 'Manrope', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: clamp(32px, 6vw, 48px);
  font-weight: 700;
  color: var(--color-orange);
  line-height: 1;
}
.count-suffix {
  font-family: 'SF Pro Display', 'Manrope', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: clamp(20px, 4vw, 28px);
  font-weight: 700;
  color: var(--color-orange);
}
.stat-desc {
  font-size: 14px;
  color: var(--color-muted);
  line-height: 1.5;
}
.market-body {
  max-width: 780px;
  text-align: center;
}
.market-body p {
  font-size: clamp(14px, 2vw, 16px);
  color: var(--color-muted);
  line-height: 1.8;
}
@media (max-width: 768px) {
  .stats-grid { grid-template-columns: 1fr 1fr; }
  .stat-card { padding: 24px 18px; }
  .market-inner { gap: 36px; }
}
@media (max-width: 480px) {
  .stats-grid { grid-template-columns: 1fr; }
  .stat-card { padding: 20px 16px; }
}
</style>
