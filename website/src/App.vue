<template>
  <div>
    <SplashScreen v-if="!splashDone" @done="splashDone = true" />
    <Transition name="fade-in">
      <div v-if="splashDone" class="site-wrapper">
        <NavBar />
        <main>
          <HeroSection />
          <MarketSection />
          <HowItWorks />
          <FeaturesGrid />
          <AppShowcase />
          <OpportunitySection />
          <ContactForm />
        </main>
        <FooterSection />
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import SplashScreen from './components/SplashScreen.vue'
import NavBar from './components/NavBar.vue'
import HeroSection from './components/HeroSection.vue'
import MarketSection from './components/MarketSection.vue'
import HowItWorks from './components/HowItWorks.vue'
import FeaturesGrid from './components/FeaturesGrid.vue'
import AppShowcase from './components/AppShowcase.vue'
import OpportunitySection from './components/OpportunitySection.vue'
import ContactForm from './components/ContactForm.vue'
import FooterSection from './components/FooterSection.vue'

gsap.registerPlugin(ScrollTrigger)

const splashDone = ref(false)

// If already seen splash (same session), skip it
if (sessionStorage.getItem('baks-splash')) {
  splashDone.value = true
}
</script>

<style>
.site-wrapper {
  min-height: 100vh;
}
.fade-in-enter-active {
  transition: opacity 0.4s ease;
}
.fade-in-enter-from {
  opacity: 0;
}
</style>
