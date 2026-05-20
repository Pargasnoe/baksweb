<template>
  <section id="how" class="how-section">
    <div class="how-inner">
      <h2 class="section-title reveal-up">{{ t.how.title }}</h2>
      <div class="steps-container">
        <div
          v-for="(step, i) in t.how.steps"
          :key="i"
          class="step reveal-up"
        >
          <div class="step-left">
            <div class="step-number">{{ String(i + 1).padStart(2, '0') }}</div>
            <div v-if="i < t.how.steps.length - 1" class="step-line"></div>
          </div>
          <div class="step-content">
            <h3 class="step-title">{{ step.title }}</h3>
            <p class="step-desc">{{ step.desc }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { useLang } from '../i18n.js'

gsap.registerPlugin(ScrollTrigger)

const { t } = useLang()

onMounted(() => {
  gsap.utils.toArray('.how-section .reveal-up').forEach((el, i) => {
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
.how-section {
  background: var(--color-navy);
  padding: clamp(60px, 10vw, 100px) clamp(16px, 4vw, 24px);
}
.how-inner {
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 56px;
}
.section-title {
  font-family: 'SF Pro Display', 'Manrope', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: clamp(28px, 4vw, 48px);
  font-weight: 700;
  color: var(--color-white);
  text-align: center;
}
.steps-container {
  display: flex;
  flex-direction: column;
  gap: 0;
}
.step {
  display: grid;
  grid-template-columns: 80px 1fr;
  gap: 24px;
  align-items: start;
  padding: 40px 0;
  border-bottom: 1px solid var(--color-navy-light);
}
.step:last-child { border-bottom: none; }
.step-left {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0;
}
.step-number {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: var(--color-orange);
  color: white;
  font-family: 'SF Pro Display', 'Manrope', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 18px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 0 0 8px rgba(245,124,43,0.1);
}
.step-line {
  width: 2px;
  height: 80px;
  background: linear-gradient(to bottom, var(--color-orange), transparent);
  margin-top: 8px;
}
.step-content {
  padding-top: 8px;
}
.step-title {
  font-family: 'SF Pro Display', 'Manrope', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 22px;
  font-weight: 600;
  color: var(--color-white);
  margin-bottom: 10px;
}
.step-desc {
  font-size: 15px;
  color: var(--color-muted);
  line-height: 1.7;
}
@media (max-width: 768px) {
  .step { grid-template-columns: 56px 1fr; padding: 28px 0; }
  .how-inner { gap: 36px; }
}
@media (max-width: 480px) {
  .step { grid-template-columns: 44px 1fr; gap: 16px; }
  .step-number { width: 44px; height: 44px; font-size: 15px; }
  .step-line { height: 60px; }
  .step-title { font-size: 18px; }
  .step-desc { font-size: 14px; }
}
</style>
