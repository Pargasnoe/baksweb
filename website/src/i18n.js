import { ref, computed } from 'vue'

const lang = ref(localStorage.getItem('baks-lang') || 'tr')

const translations = {
  tr: {
    nav: { about: 'Baks Nedir', market: 'Pazar', app: 'Uygulama', team: 'Ekip', contact: 'İletişim', demo: 'Demo İste' },
    hero: {
      badge: "Türkiye'nin Lojistik Platformu",
      h1: ['Yükü olan bulsun.', 'Yol alan taşısın.'],
      desc: "Gönderenlerle onaylı şoförleri buluşturan platform. Anlık teklif, canlı takip, güvenli ödeme.",
      cta1: 'Uygulamayı Keşfet',
      cta2: 'Nasıl Çalışır'
    },
    market: {
      title: '100 milyar dolarlık pazar. %2 dijital.',
      body: "Türkiye lojistik sektörünün toplam büyüklüğü 100–110 milyar dolar seviyesindedir. Yurt içi yük trafiğinin %90'ından fazlası karayoluyla gerçekleşmektedir. Bu kadar büyük bir işlem hacmine karşın pazar inanılmaz derecede parçalıdır — Türkiye'nin en büyük kurumsal lojistik şirketi bile günde ortalama 3.000 taşıma organize ederek pazarın yalnızca %0,7'sine hükmedebilmektedir. Avrupa ve Amerika'da dijitalleşme oranı %15–25, Çin'de %40–60 iken Türkiye'de bu oran henüz %2–4 düzeyindedir. Bu fark, Baks için tarihi bir fırsat penceresi açmaktadır."
    },
    how: {
      title: 'Baks nasıl çalışır?',
      steps: [
        { title: 'İlan Ver', desc: 'Yükünü, rotanı ve kalkış tarihini gir. Dakikalar içinde onaylı şoförlerden teklifler gelmeye başlar.' },
        { title: 'Teklif Karşılaştır', desc: 'Şoförlerin puanını, araç tipini ve fiyatını karşılaştır. En uygununu seç, anlaşmayı onayla.' },
        { title: 'Taşı & Takip Et', desc: 'Haritadan canlı takip et, şoförle mesajlaş, teslimat fotoğrafını al.' }
      ]
    },
    features: { title: 'Hem göndericiler hem şoförler için', sender: 'Gönderici', driver: 'Şoför' },
    opportunity: { title: 'Neden şimdi, neden Baks?' },
    team: { title: 'Arkasında kim var?' },
    contact: { title: 'Birlikte konuşalım.', sub: 'Yatırım, iş birliği veya demo için — 24 saat içinde dönüyoruz.' },
    form: { name: 'Ad Soyad', email: 'E-posta', phone: 'Telefon (opsiyonel)', message: 'Mesajınız', send: 'Gönder', success: 'Mesajınız alındı! 24 saat içinde dönüyoruz.' },
    roles: ['Yatırımcı', 'İş Ortağı', 'Gönderici', 'Şoför', 'Diğer'],
    footer: { tagline: "Türkiye'nin yük taşıma platformu.", privacy: 'Telefon numaranız asla karşı tarafa paylaşılmaz.' }
  },
  en: {
    nav: { about: 'About', market: 'Market', app: 'App', team: 'Team', contact: 'Contact', demo: 'Request Demo' },
    hero: {
      badge: "Turkey's Freight Platform",
      h1: ['Senders find.', 'Drivers deliver.'],
      desc: 'Connecting freight senders with verified drivers across Turkey. Instant quotes, live tracking, secure payments.',
      cta1: 'Explore the App',
      cta2: 'How It Works'
    },
    market: {
      title: '$100B market. 2% digital.',
      body: "Turkey's logistics sector totals $100–110 billion. Over 90% of domestic freight moves by road. The market is extraordinarily fragmented — even Turkey's largest logistics company manages only 3,000 shipments per day, commanding just 0.7% market share. Digitization stands at 15–25% in Europe, 40–60% in China, yet only 2–4% in Turkey. This gap is Baks' historic opportunity."
    },
    how: {
      title: 'How does Baks work?',
      steps: [
        { title: 'Post a Load', desc: 'Enter your cargo, route, and date. Verified drivers start sending offers within minutes.' },
        { title: 'Compare Offers', desc: 'Compare driver ratings, vehicle types, and prices. Choose the best fit and confirm.' },
        { title: 'Ship & Track', desc: 'Track live on the map, message your driver, and receive delivery photo confirmation.' }
      ]
    },
    features: { title: 'Built for both sides of the road', sender: 'Sender', driver: 'Driver' },
    opportunity: { title: 'Why now. Why Baks.' },
    team: { title: 'The team behind it' },
    contact: { title: "Let's talk.", sub: 'For investment, partnership, or a demo — we respond within 24 hours.' },
    form: { name: 'Full Name', email: 'Email', phone: 'Phone (optional)', message: 'Your message', send: 'Send', success: "Message received! We'll get back to you within 24 hours." },
    roles: ['Investor', 'Partner', 'Sender', 'Driver', 'Other'],
    footer: { tagline: "Turkey's freight platform.", privacy: 'Your phone number is never shared with the other party.' }
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
