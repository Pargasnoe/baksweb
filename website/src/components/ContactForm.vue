<template>
  <section id="contact" class="contact-section">
    <div class="contact-inner">
      <!-- LEFT: Form -->
      <div class="contact-left">
        <h2 class="section-title reveal-up">{{ t.contact.title }}</h2>
        <p class="section-sub reveal-up">{{ t.contact.sub }}</p>

        <Transition name="fade" mode="out-in">
          <div v-if="submitted" class="success-state reveal-up" key="success">
            <div class="success-icon">✓</div>
            <p class="success-text">{{ t.form.success }}</p>
          </div>
          <form
            v-else
            key="form"
            name="baks-contact"
            method="POST"
            @submit.prevent="handleSubmit"
            class="contact-form"
          >
            <input type="hidden" name="form-name" value="baks-contact" />
            <p hidden><input name="bot-field" /></p>

            <div class="form-row">
              <div class="form-field reveal-up">
                <label>{{ t.form.name }}</label>
                <input v-model="form.fullname" name="fullname" type="text" required :placeholder="t.form.name" />
              </div>
              <div class="form-field reveal-up">
                <label>{{ t.form.email }}</label>
                <input v-model="form.email" name="email" type="email" required :placeholder="t.form.email" />
              </div>
            </div>

            <div class="form-row">
              <div class="form-field reveal-up">
                <label>{{ t.form.phone }}</label>
                <input v-model="form.phone" name="phone" type="tel" :placeholder="t.form.phone" />
              </div>
              <div class="form-field reveal-up">
                <label>{{ lang === 'tr' ? 'Rolünüz' : 'Your Role' }}</label>
                <div class="role-chips">
                  <button
                    v-for="role in t.roles"
                    :key="role"
                    type="button"
                    class="role-chip"
                    :class="{ active: form.role === role }"
                    @click="form.role = role"
                  >{{ role }}</button>
                </div>
              </div>
            </div>

            <div class="form-field reveal-up">
              <label>{{ t.form.message }}</label>
              <textarea v-model="form.message" name="message" rows="4" required :placeholder="t.form.message"></textarea>
            </div>

            <button type="submit" class="submit-btn reveal-up" :disabled="loading">
              <span v-if="!loading">{{ t.form.send }}</span>
              <span v-else class="btn-spinner"></span>
            </button>
          </form>
        </Transition>
      </div>

      <!-- RIGHT: Info -->
      <div class="contact-right reveal-up">
        <div class="info-badge">
          <span>📍</span>
          <span>{{ lang === 'tr' ? 'Türkiye merkezli ekip' : 'Turkey-based team' }}</span>
        </div>

        <div class="contact-detail">
          <p class="detail-label">Email</p>
          <a href="mailto:info@baksapp.com" class="detail-value">info@baksapp.com</a>
        </div>

        <div class="privacy-note">
          <span class="lock-icon">🔒</span>
          <span>{{ t.footer.privacy }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { useLang } from '../i18n.js'

gsap.registerPlugin(ScrollTrigger)
const { lang, t } = useLang()

const submitted = ref(false)
const loading = ref(false)
const form = reactive({ fullname: '', email: '', phone: '', role: '', message: '' })

async function handleSubmit() {
  loading.value = true
  try {
    await fetch('https://formspree.io/f/mykvelor', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
    submitted.value = true
    gsap.from('.success-state', { scale: 0.8, opacity: 0, duration: 0.5, ease: 'back.out(2)' })
  } catch (e) {
    submitted.value = true
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  gsap.utils.toArray('.contact-section .reveal-up').forEach(el => {
    gsap.fromTo(el,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 88%', once: true } }
    )
  })
})
</script>

<style scoped>
.contact-section {
  background: var(--color-navy-mid);
  padding: clamp(60px, 10vw, 100px) clamp(16px, 4vw, 24px);
}
.contact-inner {
  max-width: 1100px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 60% 40%;
  gap: 64px;
  align-items: start;
}
.section-title {
  font-family: 'SF Pro Display', 'Manrope', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: clamp(28px, 4vw, 52px);
  font-weight: 700;
  color: var(--color-white);
  margin-bottom: 8px;
}
.section-sub {
  font-size: 15px;
  color: var(--color-muted);
  margin-bottom: 32px;
}
.contact-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}
.form-field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.form-field label {
  font-size: 13px;
  font-weight: 600;
  color: var(--color-muted);
  text-transform: uppercase;
  letter-spacing: 0.06em;
}
.form-field input,
.form-field textarea {
  background: var(--color-navy);
  border: 1px solid var(--color-navy-light);
  border-radius: 10px;
  color: var(--color-white);
  font-family: 'SF Pro Text', 'Manrope', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 15px;
  padding: 12px 14px;
  outline: none;
  resize: none;
  transition: border-color 0.2s;
}
.form-field input:focus,
.form-field textarea:focus {
  border-color: var(--color-orange);
}
.form-field input::placeholder,
.form-field textarea::placeholder {
  color: var(--color-muted);
}
.role-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.role-chip {
  background: var(--color-navy);
  border: 1px solid var(--color-navy-light);
  color: var(--color-muted);
  font-size: 12px;
  font-weight: 600;
  padding: 6px 12px;
  border-radius: 100px;
  cursor: pointer;
  transition: all 0.2s;
  font-family: 'SF Pro Text', 'Manrope', -apple-system, BlinkMacSystemFont, sans-serif;
}
.role-chip.active,
.role-chip:hover {
  background: var(--color-orange);
  border-color: var(--color-orange);
  color: white;
}
.submit-btn {
  background: var(--color-orange);
  color: white;
  border: none;
  font-family: 'SF Pro Text', 'Manrope', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 15px;
  font-weight: 700;
  padding: 14px 32px;
  border-radius: 10px;
  cursor: pointer;
  transition: opacity 0.2s, transform 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 50px;
}
.submit-btn:hover:not(:disabled) { opacity: 0.9; transform: translateY(-2px); }
.submit-btn:disabled { opacity: 0.6; cursor: not-allowed; }
.btn-spinner {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255,255,255,0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }
.success-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 48px;
  text-align: center;
}
.success-icon {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: var(--color-orange);
  color: white;
  font-size: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.success-text {
  font-size: 18px;
  color: var(--color-white);
  line-height: 1.6;
}
.contact-right {
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding-top: 80px;
}
.info-badge {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: var(--color-orange-glow);
  border: 1px solid var(--color-orange);
  border-radius: 100px;
  padding: 8px 16px;
  color: var(--color-orange);
  font-size: 13px;
  font-weight: 600;
  width: fit-content;
}
.contact-detail {}
.detail-label {
  font-size: 11px;
  font-weight: 700;
  color: var(--color-muted);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 6px;
}
.detail-value {
  color: var(--color-white);
  font-size: 16px;
  text-decoration: none;
  transition: color 0.2s;
}
.detail-value:hover { color: var(--color-orange); }
.privacy-note {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-size: 13px;
  color: var(--color-muted);
  background: var(--color-navy);
  border-radius: 10px;
  padding: 14px 16px;
  line-height: 1.6;
}
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
@media (max-width: 768px) {
  .contact-inner { grid-template-columns: 1fr; gap: 36px; }
  .form-row { grid-template-columns: 1fr; }
  .contact-right { padding-top: 0; }
  .success-state { padding: 32px 16px; }
}
@media (max-width: 480px) {
  .contact-inner { gap: 28px; }
  .form-field input, .form-field textarea { font-size: 16px; padding: 11px 12px; }
  .role-chips { gap: 6px; }
  .role-chip { font-size: 11px; padding: 5px 10px; }
  .submit-btn { width: 100%; }
}
</style>
