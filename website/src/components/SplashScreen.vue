<template>
  <div ref="overlayRef" class="splash-overlay">
    <div class="splash-inner">
      <img ref="logoRef" src="/baks_logo_1024.png" alt="Baks" class="splash-logo" />
      <div ref="lineRef" class="splash-line"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import gsap from 'gsap'

const emit = defineEmits(['done'])
const overlayRef = ref(null)
const logoRef = ref(null)
const lineRef = ref(null)

onMounted(() => {
  if (sessionStorage.getItem('baks-splash')) {
    emit('done')
    return
  }

  const tl = gsap.timeline()
  tl.fromTo(logoRef.value,
    { opacity: 0, scale: 0.75 },
    { opacity: 1, scale: 1, duration: 0.7, ease: 'back.out(1.7)' }
  )
  .fromTo(lineRef.value,
    { scaleX: 0 },
    { scaleX: 1, duration: 0.9, ease: 'power3.inOut', transformOrigin: 'left' },
    '-=0.3'
  )
  .to({}, { duration: 0.4 })
  .to(overlayRef.value, {
    opacity: 0,
    duration: 0.5,
    onComplete: () => {
      sessionStorage.setItem('baks-splash', '1')
      emit('done')
    }
  })
})
</script>

<style scoped>
.splash-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: #0D1B2A;
  display: flex;
  align-items: center;
  justify-content: center;
}
.splash-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}
.splash-logo {
  width: 200px;
  opacity: 0;
}
.splash-line {
  width: 300px;
  height: 3px;
  background: #F57C2B;
  transform-origin: left;
  transform: scaleX(0);
}
</style>
