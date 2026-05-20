<template>
  <nav ref="navRef" class="navbar" :class="{ scrolled: isScrolled }">
    <div class="nav-inner">
      <a href="#" class="nav-logo">
        <img src="/baks_logo_1024.png" alt="Baks" />
      </a>

      <ul class="nav-links">
        <li><a href="#about" @click.prevent="scrollTo('about')">{{ t.nav.about }}</a></li>
        <li><a href="#market" @click.prevent="scrollTo('market')">{{ t.nav.market }}</a></li>
        <li><a href="#app" @click.prevent="scrollTo('app')">{{ t.nav.app }}</a></li>
        <li><a href="#contact" @click.prevent="scrollTo('contact')">{{ t.nav.contact }}</a></li>
      </ul>

      <div class="nav-right">
        <button class="lang-toggle" @click="toggle">
          {{ lang === 'tr' ? 'EN' : 'TR' }}
        </button>
        <a href="#contact" @click.prevent="scrollTo('contact')" class="btn-demo">
          {{ t.nav.demo }}
        </a>
        <button class="hamburger" @click="mobileOpen = !mobileOpen" aria-label="Menu">
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>

    <div class="mobile-menu" :class="{ open: mobileOpen }" ref="mobileMenuRef">
      <ul>
        <li v-for="(key, idx) in ['about','market','app','contact']" :key="idx">
          <a :href="`#${key}`" @click.prevent="mobileNav(key)">{{ t.nav[key] }}</a>
        </li>
        <li>
          <a href="#contact" @click.prevent="mobileNav('contact')" class="mobile-demo">{{ t.nav.demo }}</a>
        </li>
      </ul>
      <button class="lang-toggle mobile-lang" @click="toggle">
        {{ lang === 'tr' ? 'EN' : 'TR' }}
      </button>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import { useLang } from '../i18n.js'

const { lang, t, toggle } = useLang()
const navRef = ref(null)
const mobileMenuRef = ref(null)
const isScrolled = ref(false)
const mobileOpen = ref(false)

function scrollTo(id) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

function mobileNav(id) {
  mobileOpen.value = false
  setTimeout(() => scrollTo(id), 300)
}

function onScroll() {
  isScrolled.value = window.scrollY > 60
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  gsap.from('.nav-links li', {
    opacity: 0, y: -10, stagger: 0.08, duration: 0.5, ease: 'power2.out', delay: 0.2
  })
})
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 0 24px;
  transition: background 0.3s, border-color 0.3s, backdrop-filter 0.3s;
  border-bottom: 1px solid transparent;
}
.navbar.scrolled {
  background: rgba(13, 27, 42, 0.85);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom-color: var(--color-navy-light);
}
.nav-inner {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 72px;
}
.nav-logo img {
  width: 100px;
  height: auto;
  display: block;
}
.nav-links {
  display: flex;
  list-style: none;
  gap: 32px;
}
.nav-links a {
  color: var(--color-muted);
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  transition: color 0.2s;
}
.nav-links a:hover { color: var(--color-white); }
.nav-right {
  display: flex;
  align-items: center;
  gap: 16px;
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
.btn-demo {
  background: var(--color-orange);
  color: var(--color-white);
  text-decoration: none;
  font-size: 14px;
  font-weight: 600;
  padding: 8px 20px;
  border-radius: 8px;
  transition: opacity 0.2s, transform 0.2s;
}
.btn-demo:hover { opacity: 0.9; transform: translateY(-1px); }
.hamburger {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
}
.hamburger span {
  width: 22px;
  height: 2px;
  background: var(--color-white);
  display: block;
  border-radius: 2px;
  transition: transform 0.3s;
}
.mobile-menu {
  display: none;
  position: fixed;
  inset: 0;
  background: var(--color-navy);
  z-index: 999;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 32px;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s;
}
.mobile-menu.open {
  opacity: 1;
  pointer-events: all;
}
.mobile-menu ul {
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 28px;
}
.mobile-menu a {
  color: var(--color-white);
  text-decoration: none;
  font-family: 'SF Pro Display', 'Manrope', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 28px;
  font-weight: 600;
}
.mobile-demo {
  color: var(--color-orange) !important;
}
.mobile-lang {
  margin-top: 16px;
}
@media (max-width: 768px) {
  .nav-links { display: none; }
  .btn-demo { display: none; }
  .hamburger { display: flex; }
  .mobile-menu { display: flex; }
}
</style>
