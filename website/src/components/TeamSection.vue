<template>
  <section id="team" class="team-section">
    <div class="team-inner">
      <h2 class="section-title reveal-up">{{ t.team.title }}</h2>
      <div class="team-grid">
        <div v-for="(member, i) in team" :key="i" class="team-card reveal-up">
          <div class="team-avatar">
            <span class="avatar-initials">{{ member.initials }}</span>
          </div>
          <div class="team-info">
            <h3 class="team-name">{{ member.name }}</h3>
            <p class="team-role">{{ member.role }}</p>
            <p class="team-bio">{{ member.bio }}</p>
          </div>
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

const team = computed(() => lang.value === 'tr'
  ? [
      { initials: 'K1', name: 'Kurucu', role: 'CEO & Ürün', bio: 'Lojistik sektörü deneyimi ve ürün vizyonu.' },
      { initials: 'K2', name: 'Kurucu', role: 'CTO', bio: 'Ölçeklenebilir platform mimarisi ve mobil uygulama.' },
      { initials: 'K3', name: 'Kurucu', role: 'COO', bio: 'Operasyon, büyüme ve sürücü network geliştirme.' }
    ]
  : [
      { initials: 'F1', name: 'Founder', role: 'CEO & Product', bio: 'Logistics industry experience and product vision.' },
      { initials: 'F2', name: 'Founder', role: 'CTO', bio: 'Scalable platform architecture and mobile apps.' },
      { initials: 'F3', name: 'Founder', role: 'COO', bio: 'Operations, growth and driver network development.' }
    ]
)

onMounted(() => {
  gsap.utils.toArray('.team-section .reveal-up').forEach((el, i) => {
    gsap.fromTo(el,
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
        delay: i * 0.1,
        scrollTrigger: { trigger: el, start: 'top 85%', once: true }
      }
    )
  })
})
</script>

<style scoped>
.team-section {
  background: var(--color-navy);
  padding: 100px 24px;
}
.team-inner {
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
.team-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
  width: 100%;
}
.team-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  background: var(--color-navy-mid);
  border-radius: 20px;
  padding: 36px 24px;
  text-align: center;
  transition: transform 0.3s;
}
.team-card:hover { transform: translateY(-4px); }
.team-avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--color-navy-light), var(--color-navy-mid));
  border: 3px solid var(--color-orange);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 0 6px var(--color-orange-glow);
}
.avatar-initials {
  font-family: 'SF Pro Display', 'Manrope', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 24px;
  font-weight: 700;
  color: var(--color-orange);
}
.team-name {
  font-family: 'SF Pro Display', 'Manrope', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 18px;
  font-weight: 600;
  color: var(--color-white);
  margin-bottom: 4px;
}
.team-role {
  font-size: 13px;
  font-weight: 700;
  color: var(--color-orange);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 8px;
}
.team-bio {
  font-size: 14px;
  color: var(--color-muted);
  line-height: 1.6;
}
@media (max-width: 768px) {
  .team-grid { grid-template-columns: 1fr; max-width: 320px; margin: 0 auto; }
}
</style>
