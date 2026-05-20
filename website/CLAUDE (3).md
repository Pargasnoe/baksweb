# Baks — Girişimcilik Fuarı Tanıtım Web Sitesi

## 📋 PROJE ÖZETİ

**Şirket / Uygulama adı:** Baks  
**Tagline:** Türkiye'nin Yük Taşıma Platformu — Gönderen bulur, şoför yükler.  
**Hedef kitle:** Yatırımcılar, potansiyel iş ortakları, fuar ziyaretçileri  
**Site amacı:** Yatırımcı odaklı profesyonel tanıtım sitesi — uygulamayı, misyonu, pazar büyüklüğünü ve ekibi anlatır  
**Diller:** Türkçe (varsayılan) + İngilizce (toggle)

---

## 🛠 TEKNOLOJİ STACK

```
Framework:     Vue 3 (Composition API + <script setup>)
Build:         Vite
Animasyon:     GSAP (ScrollTrigger dahil) + Lenis (Nano Banana smooth scroll)
Stil:          Tailwind CSS v3
Form:          Netlify Forms (AJAX submit, sıfır backend)
Font:          Clash Display (heading) + Satoshi (body) — Fontshare CDN
İkon:          Lucide Icons (CDN veya npm)
Dil:           Vue reactive i18n objesi, localStorage'a kaydedilir
```

**Kurulum:**
```bash
npm create vite@latest . -- --template vue
npm install
npm install gsap @studio-freight/lenis lucide-vue-next
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

---

## 🎨 MARKA & TASARIM SİSTEMİ

### Renkler (CSS değişkenleri)

```css
:root {
  --color-navy:        #0D1B2A;
  --color-navy-mid:    #1B2E45;
  --color-navy-light:  #253A52;
  --color-orange:      #F57C2B;
  --color-orange-glow: rgba(245,124,43,0.15);
  --color-white:       #FFFFFF;
  --color-muted:       #8A9BB5;
  --color-surface:     #131F2E;
}
```

### Tipografi

```css
/* index.html <head> içine */
<link rel="preconnect" href="https://api.fontshare.com">
<link href="https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&f[]=satoshi@400,500,700&display=swap" rel="stylesheet">

--font-display: 'Clash Display', sans-serif;
--font-body:    'Satoshi', sans-serif;
```

### Logo & Görseller

- `public/baks-logo.png` — sana verilen PNG logo buraya
- `public/screens/screen-dashboard.png`
- `public/screens/screen-listings.png`
- `public/screens/screen-messages.png`
- `public/screens/screen-profile.png`

### Tasarım Dili

- **Tema:** Dark luxury tech — lacivert zemin, turuncu vurgu
- **Atmosfer:** Ağır, güven verici, hız hissi, profesyonel
- **Arka plan dokusu:** Subtle dot-grid (opacity 0.03)
- **Kart stili:** `border: 1px solid var(--color-navy-light)` + `backdrop-filter: blur(12px)`
- **YASAK:** Inter, Roboto, Arial, mor gradyan, cookie-cutter layout, AI estetik

---

## 📱 UYGULAMA EKRAN GÖRSELLERİ

Sana yollanan 4 PNG ekran:
- Hero section: telefon SVG frame içinde otomatik geçen carousel (3s interval, GSAP crossfade)
- App Showcase section: 4 ekran yan yana mockup, mouse paralaks (mousemove + gsap tilt)

---

## 🗂 SAYFA YAPISI & BÖLÜMLER

### 1. SPLASH / LOADER
- Koyu (navy) tam ekran overlay
- Ortada Baks logo fade-in + scale-up (GSAP, 0.6s, back.out)
- Logonun altında turuncu yatay çizgi: scaleX 0→1 stroke animasyonu (0.8s delay 0.4s)
- 1.8s sonra overlay opacity 0 → gizle, ana içerik y:30→0 fade-in
- `sessionStorage.getItem('baks-splash')` varsa splash gösterme

### 2. NAV (Sticky)
```
[Logo 120px]  [Baks Nedir] [Pazar] [Uygulama] [Ekip] [İletişim]    [TR | EN]  [Demo İste →]
```
- Scroll > 60px: `backdrop-filter: blur(20px)` + `border-bottom: 1px solid var(--color-navy-light)`
- Mobile: hamburger → full-screen overlay (GSAP slide down)
- "Demo İste" → `#contact` smooth scroll

### 3. HERO SECTION
Layout: 55% sol metin / 45% sağ telefon mockup (flex, lg:flex-row)

**Sol:**
- Küçük pill badge: "🚚 Türkiye'nin Lojistik Platformu" (turuncu border, navy-mid bg)
- H1 (Clash Display 68px): "Yükü olan bulsun. / Yol alan taşısın." — kelimeleri `<span>` ile sar, GSAP stagger y:80→0
- Açıklama (Satoshi 18px muted): "Gönderenlerle onaylı şoförleri buluşturan platform. Anlık teklif, canlı takip, güvenli ödeme."
- 2 CTA: `[Uygulamayı Keşfet →]` (turuncu bg) + `[Nasıl Çalışır ↓]` (ghost border)
- Floating stat kartları: "100B$ Pazar" / "%2 Dijital" / "İlk Platform" — navy-mid bg, GSAP yüzer

**Sağ:**
- Telefon SVG frame (430×870 viewBox oranı)
- İçinde 4 ekran GSAP crossfade carousel (3s interval, opacity)
- Telefon etrafında 2–3 floating badge (GSAP infinite yoyo y:-12px)

**Arka plan:**
- `radial-gradient` turuncu glow sol altta (opacity 0.08)
- Dot-grid SVG pattern (opacity 0.04)
- Animated gradient mesh (CSS @keyframes hue-rotate veya GSAP)

### 4. MARKET/PROBLEM SECTION
**ID:** `#market`  
**Başlık (Clash Display 52px):** "100 milyar dolarlık pazar. %2 dijital."

3 büyük stat kartı (grid cols-3):
```
┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐
│  100-110B$       │  │  %90+            │  │  %2-4            │
│  Lojistik sektör │  │  Karayolu taşıma │  │  Dijitalleşme    │
│  büyüklüğü       │  │  oranı           │  │  (AB: %15-25)    │
└──────────────────┘  └──────────────────┘  └──────────────────┘
```
- Rakamlar: `data-target` attribute + GSAP ScrollTrigger CountUp animasyonu
- Kartlar: navy-mid bg, turuncu top border 2px, hover lift efekti

**Uzun investor metin bloğu (Satoshi 17px, line-height 1.8):**
> Türkiye lojistik sektörünün toplam büyüklüğü 100–110 milyar dolar seviyesindedir. Yurt içi yük trafiğinin %90'ından fazlası karayoluyla gerçekleşmektedir. Bu kadar büyük bir işlem hacmine karşın pazar inanılmaz derecede parçalıdır — Türkiye'nin en büyük kurumsal lojistik şirketi bile günde ortalama 3.000 taşıma organize ederek pazarın yalnızca %0,7'sine hükmedebilmektedir. Avrupa ve Amerika'da dijitalleşme oranı %15–25, Çin'de %40–60 iken Türkiye'de bu oran henüz %2–4 düzeyindedir. Bu fark, Baks için tarihi bir fırsat penceresi açmaktadır.

### 5. NASIL ÇALIŞIR
**ID:** `#how`  
**Başlık:** "Baks nasıl çalışır?"

3 adım (vertical numbered timeline, sol çizgi):
1. **İlan Ver** — Yükünü, rotanı ve tarihi gir. Dakikalar içinde teklifler gelsin.
2. **Teklif Karşılaştır** — Onaylı şoförlerden gelen teklifleri karşılaştır, en iyisini seç.
3. **Taşı & Takip Et** — Canlı GPS takibi, uygulama içi mesajlaşma, teslimat fotoğrafı.

Her adımın sağında ilgili ekran görüntüsü (scroll reveal ile giriş).

### 6. ÖZELLİKLER GRID
**ID:** `#features`  
**Başlık:** "Hem göndericiler hem şoförler için"

2 sütun kart grid:

**Gönderici (sol):**
- ✓ Anlık teklif karşılaştırma
- ✓ Canlı GPS konum takibi
- ✓ Uygulama içi güvenli mesajlaşma
- ✓ iyzico ile dijital ödeme
- ✓ Telefon gizliliği — numara paylaşılmaz
- ✓ Teslimat fotoğrafı ve onay sistemi

**Şoför (sağ):**
- ✓ Uygun yük bulma — filtre ve kategori
- ✓ Şeffaf ve adil komisyon sistemi
- ✓ Dijital ödeme ve gelir takibi
- ✓ Değerlendirme ve itibar puanı
- ✓ Favori göndericiler listesi
- ✓ Dönüş yükü önerileri (yakında)

### 7. APP SHOWCASE
**ID:** `#app`  
**Başlık:** "Cebinizde taşıyın"

4 telefon mockup yan yana, hafif tilt (perspective 800px).
Mouse move → GSAP rotateX/Y paralaks etkisi (±5 derece).
Her ekranın altında kısa açıklama.

### 8. PAZAR FIRSAT BLOĞU
**Başlık:** "Neden şimdi, neden Baks?"

4 kart (2x2 grid):
- 🎯 **Parçalı Pazar** — En büyük oyuncu bile %0.7 paya sahip. Birleştirilecek dev bir pazar var.
- 📱 **Dijital Açık** — Rakiplerimiz (AB, Çin) onlarca yıl önde. Türkiye henüz başlangıç noktasında.
- 🔗 **Network Effect** — Her yeni şoför, platformu göndericiler için daha değerli yapar. Katlanarak büyür.
- 💳 **Net Gelir Modeli** — Her taşıma üzerinden şeffaf komisyon. Öngörülebilir, ölçeklenebilir.

### 9. EKİP
**ID:** `#team`  
**Başlık:** "Arkasında kim var?"

3–4 kişi kart grid:
- Yuvarlak avatar (150px)
- Clash Display 20px isim
- Satoshi muted unvan + kısa bio (2 satır)
- LinkedIn SVG ikon linki

### 10. İLETİŞİM
**ID:** `#contact`  
**Başlık:** "Birlikte konuşalım."  
**Alt:** "Yatırım, iş birliği veya demo için — 24 saat içinde dönüyoruz."

**Layout (Happy Horizon contact sayfası referans):** 60/40 split
- Sol (60%): Form
- Sağ (40%): İletişim bilgileri + "Fuardayız!" badge

**Form alanları:**
```
Ad Soyad *
E-posta *
Telefon (opsiyonel)
Ben bir: [Yatırımcı ●] [İş Ortağı] [Gönderici] [Şoför] [Diğer]  ← chip toggle
Mesajınız *
[Gönder →]  ← turuncu, loading spinner, success state animasyonu
```

**Sağ:**
- E-posta adresi
- Sosyal medya (LinkedIn, Instagram, Twitter)
- "📍 Bugün fuardayız!" — tarih ve yer

### 11. FOOTER
```
[Baks Logo]
Türkiye'nin yük taşıma platformu.

[Nav linkleri]                              [TR | EN]

© 2025 Baks. Tüm hakları saklıdır.
Telefon numaranız asla karşı tarafa paylaşılmaz.
```

---

## 🌐 DİL SİSTEMİ (i18n)

```javascript
// src/i18n.js
import { ref, computed } from 'vue'

const lang = ref(localStorage.getItem('baks-lang') || 'tr')

const translations = {
  tr: {
    nav: { about: 'Baks Nedir', market: 'Pazar', app: 'Uygulama', team: 'Ekip', contact: 'İletişim', demo: 'Demo İste' },
    hero: {
      badge: "Türkiye'nin Lojistik Platformu",
      h1: ['Yükü olan bulsun.', 'Yol alan taşısın.'],
      desc: "Gönderenlerle onaylı şoförleri buluşturan platform. Anlık teklif, canlı takip, güvenli ödeme.",
      cta1: 'Uygulamayı Keşfet', cta2: 'Nasıl Çalışır',
    },
    market: {
      title: '100 milyar dolarlık pazar. %2 dijital.',
      body: 'Türkiye lojistik sektörünün toplam büyüklüğü 100–110 milyar dolar seviyesindedir. Yurt içi yük trafiğinin %90\'ından fazlası karayoluyla gerçekleşmektedir. Bu kadar büyük bir işlem hacmine karşın pazar inanılmaz derecede parçalıdır — Türkiye\'nin en büyük kurumsal lojistik şirketi bile günde ortalama 3.000 taşıma organize ederek pazarın yalnızca %0,7\'sine hükmedebilmektedir. Avrupa ve Amerika\'da dijitalleşme oranı %15–25, Çin\'de %40–60 iken Türkiye\'de bu oran henüz %2–4 düzeyindedir.',
    },
    how: { title: 'Baks nasıl çalışır?', steps: ['İlan Ver', 'Teklif Karşılaştır', 'Taşı & Takip Et'] },
    contact: { title: 'Birlikte konuşalım.', sub: 'Yatırım, iş birliği veya demo için — 24 saat içinde dönüyoruz.' },
    form: { name: 'Ad Soyad', email: 'E-posta', phone: 'Telefon', message: 'Mesajınız', send: 'Gönder', success: 'Mesajınız alındı! 24 saat içinde dönüyoruz.' },
  },
  en: {
    nav: { about: 'About Baks', market: 'Market', app: 'App', team: 'Team', contact: 'Contact', demo: 'Request Demo' },
    hero: {
      badge: "Turkey's Freight Platform",
      h1: ['Senders find.', 'Drivers deliver.'],
      desc: 'The platform connecting freight senders with verified drivers across Turkey. Instant quotes, live tracking, secure payments.',
      cta1: 'Explore the App', cta2: 'How It Works',
    },
    market: {
      title: '$100B market. 2% digital.',
      body: "Turkey's logistics sector totals $100–110 billion. Over 90% of domestic freight is moved by road. Despite this volume, the market is extraordinarily fragmented — even Turkey's largest logistics company manages only 3,000 shipments per day, commanding just 0.7% market share. Digitization rates stand at 15–25% in Europe and America, 40–60% in China, yet only 2–4% in Turkey. This gap is Baks' historic opportunity.",
    },
    how: { title: 'How does Baks work?', steps: ['Post a Load', 'Compare Offers', 'Ship & Track'] },
    contact: { title: "Let's talk.", sub: 'For investment, partnership, or a demo — we respond within 24 hours.' },
    form: { name: 'Full Name', email: 'Email', phone: 'Phone', message: 'Your message', send: 'Send', success: 'Message received! We\'ll get back to you within 24 hours.' },
  }
}

export function useLang() {
  const t = computed(() => translations[lang.value])
  function toggle() {
    lang.value = lang.value === 'tr' ? 'en' : 'tr'
    localStorage.setItem('baks-lang', lang.value)
  }
  return { lang, t, toggle }
}
```

---

## 🎬 ANİMASYON MİMARİSİ

### main.js — Lenis Başlatma

```javascript
import { createApp } from 'vue'
import App from './App.vue'
import Lenis from '@studio-freight/lenis'
import './style.css'

const lenis = new Lenis({ duration: 1.2, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)) })
function raf(time) { lenis.raf(time); requestAnimationFrame(raf) }
requestAnimationFrame(raf)

createApp(App).mount('#app')
```

### GSAP Animasyon Setleri

```javascript
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

// Hero H1 — kelime stagger
gsap.from('.hero-word', { y: 80, opacity: 0, duration: 0.8, stagger: 0.08, ease: 'power3.out', delay: 2.0 })

// Scroll reveal — her section
gsap.utils.toArray('.reveal-up').forEach(el => {
  gsap.from(el, {
    scrollTrigger: { trigger: el, start: 'top 85%' },
    y: 60, opacity: 0, duration: 0.9, ease: 'power2.out'
  })
})

// CountUp animasyonu
gsap.utils.toArray('.counter').forEach(el => {
  const target = parseFloat(el.dataset.target)
  const isDecimal = el.dataset.decimal === 'true'
  ScrollTrigger.create({
    trigger: el, start: 'top 80%', once: true,
    onEnter: () => {
      gsap.to({ val: 0 }, {
        val: target, duration: 2.2, ease: 'power2.out',
        onUpdate() { el.textContent = isDecimal ? this.targets()[0].val.toFixed(1) : Math.round(this.targets()[0].val) }
      })
    }
  })
})

// Floating badges
gsap.to('.float-badge', { y: -14, duration: 2.8, ease: 'sine.inOut', yoyo: true, repeat: -1, stagger: 0.5 })

// Telefon carousel (Hero)
let current = 0
const screens = document.querySelectorAll('.phone-screen')
setInterval(() => {
  gsap.to(screens[current], { opacity: 0, duration: 0.4 })
  current = (current + 1) % screens.length
  gsap.to(screens[current], { opacity: 1, duration: 0.4 })
}, 3000)

// App Showcase paralaks
document.addEventListener('mousemove', e => {
  const x = (e.clientX / window.innerWidth - 0.5) * 16
  const y = (e.clientY / window.innerHeight - 0.5) * 16
  gsap.to('.showcase-phone', { rotateY: x * 0.4, rotateX: -y * 0.3, duration: 0.9, ease: 'power1.out' })
})
```

### Splash Animasyonu (SplashScreen.vue)

```javascript
onMounted(() => {
  if (sessionStorage.getItem('baks-splash')) {
    emit('done'); return
  }
  const tl = gsap.timeline()
  tl.fromTo('#splash-logo', { opacity: 0, scale: 0.75 }, { opacity: 1, scale: 1, duration: 0.7, ease: 'back.out(1.5)' })
    .fromTo('#splash-line', { scaleX: 0 }, { scaleX: 1, duration: 0.9, ease: 'power3.inOut', transformOrigin: 'left center' }, '-=0.2')
    .to('#splash-overlay', { opacity: 0, duration: 0.6, delay: 0.4, onComplete: () => {
      sessionStorage.setItem('baks-splash', '1')
      emit('done')
    }})
})
```

---

## 📁 DOSYA YAPISI

```
baks-website/
├── public/
│   ├── baks-logo.png               ← Logo PNG buraya
│   ├── favicon.ico
│   └── screens/
│       ├── screen-dashboard.png    ← Ana Sayfa ekranı
│       ├── screen-listings.png     ← İlanlarım ekranı
│       ├── screen-messages.png     ← Mesajlar ekranı
│       └── screen-profile.png      ← Profil ekranı
├── src/
│   ├── App.vue                     ← Splash kontrolü + ana layout
│   ├── main.js                     ← Vue + Lenis init
│   ├── i18n.js                     ← Dil sistemi (yukarıdaki kod)
│   ├── style.css                   ← CSS değişkenleri + global
│   └── components/
│       ├── SplashScreen.vue
│       ├── NavBar.vue
│       ├── HeroSection.vue
│       ├── MarketSection.vue
│       ├── HowItWorks.vue
│       ├── FeaturesGrid.vue
│       ├── AppShowcase.vue
│       ├── OpportunitySection.vue
│       ├── TeamSection.vue
│       ├── ContactForm.vue
│       └── FooterSection.vue
├── index.html                      ← Netlify hidden form burada
├── tailwind.config.js
├── vite.config.js
└── netlify.toml
```

---

## 📬 FORM (Netlify Forms)

### index.html — hidden pre-render form
```html
<!-- Netlify bot-tarama için -->
<form name="baks-contact" netlify hidden>
  <input name="fullname" /> <input name="email" />
  <input name="phone" /> <input name="role" />
  <textarea name="message"></textarea>
</form>
```

### ContactForm.vue — AJAX submit
```javascript
async function submit() {
  loading.value = true
  const body = new URLSearchParams({ 'form-name': 'baks-contact', ...form.value })
  try {
    await fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body })
    submitted.value = true
    // GSAP success animasyonu
    await nextTick()
    gsap.from('.success-icon', { scale: 0, rotation: -45, duration: 0.6, ease: 'back.out(2)' })
    gsap.from('.success-text', { y: 20, opacity: 0, duration: 0.5, delay: 0.3 })
  } catch { alert('Bir hata oluştu.') }
  finally { loading.value = false }
}
```

---

## 🔧 NETLIFY DEPLOY

```toml
# netlify.toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

## 📝 İÇERİK (Tam Metinler)

### Misyon
**TR:** Türkiye'nin parçalı ve dijitalleşmemiş nakliye sektörünü tek bir güvenilir platformda buluşturmak.  
**EN:** To unite Turkey's fragmented freight market on a single trusted platform.

### Vizyon
**TR:** 2028'de Türkiye'nin her yükünü dijital olarak organize eden lider platform olmak.  
**EN:** To become Turkey's leading platform digitally organizing every freight movement by 2028.

### Gizlilik Vurgusu
**TR:** Telefon numaranız karşı tarafa asla gösterilmez. Tüm iletişim uygulama içinde.  
**EN:** Your phone number is never shared. All communication stays in-app.

### Nasıl Çalışır — Adım Açıklamaları
1. **TR:** "Yükünü, rotanı ve kalkış tarihini gir. Dakikalar içinde onaylı şoförlerden teklifler gelmeye başlar."  
   **EN:** "Enter your cargo, route, and departure date. Verified drivers start sending offers within minutes."
2. **TR:** "Şoförlerin puanını, araç tipini ve fiyatını karşılaştır. En uygununu seç, anlaşmayı onayla."  
   **EN:** "Compare driver ratings, vehicle types, and prices. Choose the best fit and confirm."
3. **TR:** "Yükün yola çıktı! Haritadan canlı takip et, şoförle mesajlaş, teslimat fotoğrafını al."  
   **EN:** "Your cargo is on the way! Track live on the map, message your driver, and receive delivery confirmation."

---

## ⚠️ KESİN KURALLAR

1. **Font:** Clash Display (başlık) + Satoshi (body) — başka font kullanma
2. **Renk:** Sadece yukarıdaki CSS değişkenleri — yeni renk türetme
3. **Animasyon:** GSAP + Lenis — CSS-only animasyon yok (splash hariç)
4. **Splash:** sessionStorage ile tek gösterim
5. **Form:** Netlify Forms — harici servis yok
6. **Dil:** Vue reaktif, sayfa yenilenmez
7. **AI estetik yasak:** Inter/Roboto/mor gradient/generic layout
8. **Mobile-first:** 320px'den başla, Tailwind sm/md/lg/xl breakpoint
9. **Her bölüm:** ScrollTrigger reveal animasyonu
10. **Telefon gizliliği notu:** Footer'da mutlaka yer alsın

---

## 🚀 CLAUDE CODE PROMPTU

**Bu CLAUDE.md dosyasını projenin root dizinine koy, sonra Claude Code'da şu promptu çalıştır:**

---

Bu dizinde CLAUDE.md dosyasındaki tüm spesifikasyonlara göre Baks tanıtım web sitesini Vue 3 + Vite + Tailwind CSS + GSAP + Lenis ile sıfırdan inşa et.

**ADIMLAR:**

1. `npm create vite@latest . -- --template vue` ile projeyi başlat
2. `npm install gsap @studio-freight/lenis lucide-vue-next` yükle
3. `npm install -D tailwindcss postcss autoprefixer && npx tailwindcss init -p` çalıştır
4. `public/baks-logo.png` ve `public/screens/*.png` dosyalarının mevcut olduğunu varsay
5. CLAUDE.md'deki tüm bölümleri, animasyonları, i18n sistemini, form sistemini ve tasarım kurallarını eksiksiz uygula

**BÖLÜMLER (sırasıyla):**
SplashScreen → NavBar → HeroSection → MarketSection → HowItWorks → FeaturesGrid → AppShowcase → OpportunitySection → TeamSection → ContactForm → FooterSection

**TASARIM:**
- Clash Display + Satoshi fontları (Fontshare CDN)
- CSS değişkenleri: --color-navy #0D1B2A, --color-orange #F57C2B
- Dark luxury tech estetik — AI görünüm YASAK
- GSAP ScrollTrigger her section için
- Hero H1 kelime kelime stagger reveal
- CountUp animasyonu pazar rakamları için
- Splash: logo + turuncu çizgi animasyonu, sessionStorage flag
- Telefon mockup carousel (4 ekran, 3s GSAP geçiş)
- App Showcase: mouse paralaks
- Happy Horizon contact sayfası gibi 60/40 split form layout
- Netlify Forms AJAX submit + animasyonlu success state

**KURAL:** Her component ayrı .vue dosyası. i18n.js CLAUDE.md'deki koddan al. Netlify deploy için netlify.toml yaz. Tüm kodu yaz, test et, çalıştırılabilir hale getir.
