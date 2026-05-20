<template>
  <section class="opp-section">
    <div class="opp-inner">
      <h2 class="section-title reveal-up">{{ t.opportunity.title }}</h2>
      <div class="opp-grid">
        <div
          v-for="(card, i) in cards"
          :key="i"
          class="opp-card reveal-up"
        >
          <div class="opp-icon">{{ card.icon }}</div>
          <h3 class="opp-card-title">{{ card.title }}</h3>
          <p class="opp-card-desc">{{ card.desc }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { useLang } from '../i18n.js'

gsap.registerPlugin(ScrollTrigger)
const { lang, t } = useLang()

const cards = computed(() => lang.value === 'tr'
  ? [
      { icon: '🎯', title: 'Parçalı Pazar', desc: 'En büyük oyuncu yalnızca %0.7 paya sahip. Kazanan henüz belirsiz.' },
      { icon: '📱', title: 'Dijital Açık', desc: "Dijitalleşme oranı %2-4. Rakipler çok geride, başlangıç noktasındayız." },
      { icon: '🔗', title: 'Network Effect', desc: 'Her yeni şoför platformu daha değerli yapar. Ağ büyüdükçe savunma gücü artar.' },
      { icon: '💳', title: 'Net Gelir Modeli', desc: 'İşlem başına şeffaf komisyon. Nakit yok, gecikmeli ödeme yok.' }
    ]
  : [
      { icon: '🎯', title: 'Fragmented Market', desc: "The largest player holds only 0.7% share. No clear winner yet." },
      { icon: '📱', title: 'Digital Gap', desc: "Only 2-4% digitized. Competitors are far behind — we're at the starting line." },
      { icon: '🔗', title: 'Network Effect', desc: 'Every new driver makes the platform more valuable. Defense grows with scale.' },
      { icon: '💳', title: 'Clear Revenue Model', desc: 'Transparent per-transaction commission. No cash, no delayed payments.' }
    ]
)

onMounted(() => {
  gsap.utils.toArray('.opp-section .reveal-up').forEach(el => {
    gsap.fromTo(el,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 85%', once: true } }
    )
  })
})
</script>

<style scoped>
.opp-section {
  background: var(--color-navy-mid);
  padding: clamp(60px, 10vw, 100px) clamp(16px, 4vw, 24px);
}
.opp-inner {
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 56px;
}
.section-title {
  font-family: 'SF Pro Display', 'Manrope', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: clamp(28px, 4vw, 48px);
  font-weight: 700;
  color: var(--color-white);
  text-align: center;
}
.opp-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  width: 100%;
}
.opp-card {
  background: var(--color-navy);
  border-radius: 20px;
  padding: 32px;
  border: 1px solid transparent;
  background-clip: padding-box;
  position: relative;
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
}
.opp-card::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 20px;
  padding: 1px;
  background: linear-gradient(135deg, var(--color-orange), transparent 60%);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
}
.opp-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 40px rgba(245,124,43,0.1);
}
.opp-icon {
  font-size: 36px;
  margin-bottom: 16px;
}
.opp-card-title {
  font-family: 'SF Pro Display', 'Manrope', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 20px;
  font-weight: 600;
  color: var(--color-white);
  margin-bottom: 10px;
}
.opp-card-desc {
  font-size: 14px;
  color: var(--color-muted);
  line-height: 1.7;
}
@media (max-width: 768px) {
  .opp-card { padding: 24px; }
  .opp-inner { gap: 36px; }
}
@media (max-width: 640px) {
  .opp-grid { grid-template-columns: 1fr; gap: 16px; }
  .opp-icon { font-size: 28px; margin-bottom: 10px; }
  .opp-card-title { font-size: 17px; }
}
</style>
