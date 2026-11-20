import { useEffect, useLayoutEffect } from 'react'
import { BookOpen, ChartNoAxesCombined, MessageCircle } from 'lucide-react'
import { TelegramLink } from './components/TelegramLink'
import { trackScrollDepth, trackTimeOnPage, trackViewContent } from './lib/pixel'

const features = [
  {
    number: '01',
    title: 'Lectura del mercado',
    description: 'Contexto y análisis centrado en XAU/USD.',
    Icon: ChartNoAxesCombined,
  },
  {
    number: '02',
    title: 'Contenido educativo',
    description: 'Conceptos para entender mejor cada escenario.',
    Icon: BookOpen,
  },
  {
    number: '03',
    title: 'Comunidad activa',
    description: 'Un espacio para seguir contenido sobre oro.',
    Icon: MessageCircle,
  },
] as const

function useLandingTracking() {
  useEffect(() => {
    trackViewContent()

    const timer = window.setTimeout(trackTimeOnPage, 30_000)
    let frame = 0
    const checkScroll = () => {
      window.cancelAnimationFrame(frame)
      frame = window.requestAnimationFrame(() => {
        const scrollable = document.documentElement.scrollHeight - window.innerHeight
        if (scrollable <= 0) return
        const depth = Math.min(100, Math.round((window.scrollY / scrollable) * 100))
        for (const threshold of [25, 50, 75, 100] as const) {
          if (depth >= threshold) trackScrollDepth(threshold)
        }
      })
    }

    window.addEventListener('scroll', checkScroll, { passive: true })
    window.addEventListener('resize', checkScroll)
    checkScroll()
    return () => {
      window.clearTimeout(timer)
      window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', checkScroll)
      window.removeEventListener('resize', checkScroll)
    }
  }, [])
}

function Header() {
  return (
    <header className="site-header shell">
      <a className="brand" href="/" aria-label="YORFI ÉLITE GOLD CLUB, volver al inicio">
        <span className="brand-mark" aria-hidden="true">Y</span>
        <span className="brand-name">YORFI <span>ÉLITE GOLD CLUB</span></span>
      </a>
      <span className="header-label"><span className="status-dot" /> Comunidad en Telegram</span>
    </header>
  )
}

function Ticker() {
  const items = ['Oro', 'XAU/USD', 'Contexto de mercado', 'Contenido educativo', 'Comunidad']
  const row = items.map((item) => (
    <span className="ticker-item" key={item}>{item}<span className="ticker-dot" aria-hidden="true" /></span>
  ))
  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker-track">
        <div className="ticker-row">{row}</div>
        <div className="ticker-row">{row}</div>
      </div>
    </div>
  )
}

function EclipseBackdrop() {
  return (
    <div className="eclipse" aria-hidden="true">
      <span className="eclipse-glow" />
      <span className="eclipse-shadow" />
    </div>
  )
}

function Hero() {
  return (
    <section className="hero shell" aria-labelledby="hero-title">
      <EclipseBackdrop />
      <div className="hero-copy">
        <div className="eyebrow"><span className="eyebrow-line" /> Comunidad de trading XAU/USD</div>
        <h1 id="hero-title">Trading<br />de oro,<br /><span>en comunidad.</span></h1>
        <p className="hero-description">Únete a una comunidad de trading enfocada en el oro y accede a contenido educativo, contexto de mercado y análisis sobre XAU/USD.</p>
        <div className="hero-action">
          <TelegramLink section="hero" buttonId="hero_primary" />
          <span className="action-note">Acceso directo a través de Telegram.</span>
        </div>
      </div>
      <div className="video-frame hero-video-frame">
        <video
          className="intro-video"
          autoPlay
          muted
          controls
          playsInline
          preload="auto"
          aria-label="Video de presentación de YORFI ÉLITE GOLD CLUB"
        >
          <source src="/yorfi-intro-v2.mp4" type="video/mp4" />
          Tu navegador no puede reproducir este video.
        </video>
      </div>
    </section>
  )
}

function MediaSection() {
  return (
    <section className="media-section" aria-labelledby="media-title">
      <div className="shell media-layout">
        <div className="media-copy">
          <p className="section-kicker">Conoce a Yorfi</p>
          <h2 id="media-title">ESTE ERA YO</h2>
          <p>Este era yo cuando era militar y ganaba 250 dólares al mes. Hoy vivo del negocio que un día solo era una idea en mi cabeza. Cuando veo esta foto, me acuerdo de dónde empecé y de todo lo que me tocó aprender para llegar hasta aquí.</p>
          <p>Y si tú estás empezando, quiero decirte algo: tú también puedes construir algo propio. Empieza con lo que tienes, aprende en el camino y date tiempo para crecer. 🙏🏽</p>
          <TelegramLink section="media" buttonId="media_primary" />
        </div>
        <div className="portrait-card media-portrait-card">
          <img
            className="portrait-image"
            src="/yorfi-military.webp"
            width="1187"
            height="1600"
            alt="Retrato de la persona que presenta YORFI ÉLITE GOLD CLUB"
            loading="lazy"
          />
          <div className="portrait-topline" aria-hidden="true">
            <span>YORFI ÉLITE GOLD CLUB</span>
            <span className="portrait-badge"><span className="status-dot" /> GOLD FOCUS</span>
          </div>
          <div className="portrait-caption" aria-hidden="true">
            <span>ORO · XAU/USD</span>
            <span>COMUNIDAD</span>
          </div>
        </div>
      </div>
    </section>
  )
}

function ResultsCarousel() {
  const images = Array.from({ length: 7 }, (_, index) => `/carousel-${index + 1}.png`)
  return (
    <section className="results-carousel" aria-label="Capturas compartidas por miembros de la comunidad">
      <div className="carousel-track">
        {[...images, ...images].map((src, index) => (
          <img key={`${src}-${index}`} src={src} alt={index < 7 ? `Captura compartida ${index + 1}` : ''} aria-hidden={index >= 7} loading="lazy" />
        ))}
      </div>
    </section>
  )
}

function Features() {
  return (
    <section className="features-section" aria-label="Contenido de la comunidad">
      <div className="shell feature-grid">
        {features.map(({ number, title, description, Icon }) => (
          <article className="feature" key={number}>
            <span className="feature-icon"><Icon size={20} strokeWidth={1.8} aria-hidden="true" /></span>
            <div>
              <span className="feature-number">{number}</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function FinalCta() {
  return (
    <section className="final-cta" aria-labelledby="final-cta-title">
      <div className="shell final-cta-inner">
        <h2 id="final-cta-title">Empieza hoy<span>.</span></h2>
        <p>Entra a la comunidad de Telegram y accede al contenido sobre oro y XAU/USD.</p>
        <TelegramLink section="final" buttonId="final_primary" />
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="site-footer shell">
      <p>Contenido informativo y educativo. No constituye asesoramiento financiero.</p>
      <p>© {new Date().getFullYear()} YORFI ÉLITE GOLD CLUB</p>
    </footer>
  )
}

export default function App() {
  useLandingTracking()
  useLayoutEffect(() => {
    const root = document.documentElement
    const previousScrollBehavior = root.style.scrollBehavior
    root.style.scrollBehavior = 'auto'
    window.scrollTo(0, 0)
    root.style.scrollBehavior = previousScrollBehavior
  }, [])

  return (
    <>
      <Header />
      <Ticker />
      <main>
        <Hero />
        <ResultsCarousel />
        <MediaSection />
        <Features />
        <FinalCta />
      </main>
      <Footer />
    </>
  )
}
