<template>
  <footer class="footer">
    <div class="footer-inner">
      <div class="footer-top">
        <div class="footer-brand">
          <img src="/baks_logo_1024.png" alt="Baks" class="footer-logo" />
          <p class="footer-tagline">{{ t.footer.tagline }}</p>
        </div>

        <nav class="footer-nav">
          <a v-for="(key, i) in navKeys" :key="i" :href="`#${key}`" @click.prevent="scrollTo(key)">
            {{ t.nav[key] }}
          </a>
        </nav>

        <div class="footer-actions">
          <button class="lang-toggle" @click="toggle">
            {{ lang === 'tr' ? '🇬🇧 EN' : '🇹🇷 TR' }}
          </button>
          <p class="footer-copy">© 2025 Baks</p>
        </div>
      </div>

      <div class="footer-bottom">
        <span class="privacy-note">🔒 {{ t.footer.privacy }}</span>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { useLang } from '../i18n.js'

const { lang, t, toggle } = useLang()
const navKeys = ['about', 'market', 'app', 'team', 'contact']

function scrollTo(id) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}
</script>

<style scoped>
.footer {
  background: var(--color-navy-mid);
  border-top: 1px solid var(--color-navy-light);
  padding: 48px 24px 32px;
}
.footer-inner {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 32px;
}
.footer-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 24px;
}
.footer-brand {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.footer-logo {
  width: 80px;
  height: auto;
}
.footer-tagline {
  font-size: 13px;
  color: var(--color-muted);
}
.footer-nav {
  display: flex;
  gap: 28px;
  flex-wrap: wrap;
}
.footer-nav a {
  color: var(--color-muted);
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  transition: color 0.2s;
}
.footer-nav a:hover { color: var(--color-white); }
.footer-actions {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
}
.lang-toggle {
  background: transparent;
  border: 1px solid var(--color-navy-light);
  color: var(--color-muted);
  font-size: 12px;
  font-weight: 700;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
  transition: border-color 0.2s, color 0.2s;
  font-family: 'SF Pro Text', 'Manrope', -apple-system, BlinkMacSystemFont, sans-serif;
}
.lang-toggle:hover {
  border-color: var(--color-orange);
  color: var(--color-white);
}
.footer-copy {
  font-size: 12px;
  color: var(--color-muted);
}
.footer-bottom {
  border-top: 1px solid var(--color-navy-light);
  padding-top: 20px;
  text-align: center;
}
.privacy-note {
  font-size: 13px;
  color: var(--color-muted);
}
@media (max-width: 768px) {
  .footer-nav { gap: 16px; }
}
@media (max-width: 640px) {
  .footer-top { flex-direction: column; align-items: flex-start; gap: 20px; }
  .footer-actions { align-items: flex-start; flex-direction: row; align-items: center; gap: 16px; }
  .footer-nav { flex-wrap: wrap; gap: 12px 20px; }
  .footer-nav a { font-size: 13px; }
}
</style>
