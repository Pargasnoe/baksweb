<template>
  <section class="features-section">
    <div class="features-inner">
      <h2 class="section-title reveal-up">{{ t.features.title }}</h2>
      <div class="features-grid">
        <div class="feature-card reveal-up">
          <div class="card-header">
            <div class="role-icon">📦</div>
            <span class="role-label">{{ t.features.sender }}</span>
          </div>
          <ul class="feature-list">
            <li v-for="f in senderFeatures" :key="f">
              <span class="check">✓</span>
              <span>{{ f }}</span>
            </li>
          </ul>
        </div>
        <div class="feature-card reveal-up">
          <div class="card-header">
            <div class="role-icon">🚚</div>
            <span class="role-label">{{ t.features.driver }}</span>
          </div>
          <ul class="feature-list">
            <li v-for="f in driverFeatures" :key="f">
              <span class="check">✓</span>
              <span>{{ f }}</span>
            </li>
          </ul>
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
const { t, lang } = useLang()

const senderFeatures = computed(() => lang.value === 'tr'
  ? ['Anlık teklif karşılaştırma', 'Canlı GPS takibi', 'Uygulama içi mesajlaşma', 'iyzico güvenli ödeme', 'Telefon gizliliği', 'Teslimat fotoğrafı']
  : ['Instant quote comparison', 'Live GPS tracking', 'In-app messaging', 'iyzico secure payments', 'Phone privacy', 'Delivery photo proof']
)

const driverFeatures = computed(() => lang.value === 'tr'
  ? ['Uygun yük bulma', 'Şeffaf komisyon', 'Dijital ödeme takibi', 'İtibar puanı', 'Favori göndericiler', 'Dönüş yükü önerileri (yakında)']
  : ['Find matching freight', 'Transparent commission', 'Digital payment tracking', 'Reputation score', 'Favourite senders', 'Return load suggestions (soon)']
)

onMounted(() => {
  gsap.utils.toArray('.features-section .reveal-up').forEach(el => {
    gsap.fromTo(el,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 85%', once: true } }
    )
  })
})
</script>

<style scoped>
.features-section {
  background: var(--color-surface);
  padding: clamp(60px, 10vw, 100px) clamp(16px, 4vw, 24px);
}
.features-inner {
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 56px;
  align-items: center;
}
.section-title {
  font-family: 'SF Pro Display', 'Manrope', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: clamp(28px, 4vw, 46px);
  font-weight: 700;
  color: var(--color-white);
  text-align: center;
}
.features-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
  width: 100%;
}
.feature-card {
  background: var(--color-navy-mid);
  border-radius: 20px;
  padding: 36px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.card-header {
  display: flex;
  align-items: center;
  gap: 14px;
}
.role-icon {
  width: 52px;
  height: 52px;
  border-radius: 14px;
  background: var(--color-orange-glow);
  border: 1px solid var(--color-orange);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
}
.role-label {
  font-family: 'SF Pro Display', 'Manrope', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 22px;
  font-weight: 600;
  color: var(--color-white);
}
.feature-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.feature-list li {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-size: 15px;
  color: var(--color-muted);
}
.check {
  color: var(--color-orange);
  font-weight: 700;
  flex-shrink: 0;
  margin-top: 1px;
}
@media (max-width: 768px) {
  .feature-card { padding: 24px; }
  .features-inner { gap: 36px; }
}
@media (max-width: 640px) {
  .features-grid { grid-template-columns: 1fr; gap: 16px; }
  .role-label { font-size: 18px; }
  .feature-list li { font-size: 14px; }
}
</style>
