import { useState, useEffect, useRef } from 'react'
import { C, SPACE, TYPE } from './theme'

/* ─── data ────────────────────────────────────────────────────────────── */
const sculptures = [
  {
    id: 1, name: 'Forma I', sub: 'with Void',
    material: 'Carrara Marble', year: 2024, dim: '42 × 28 × 18 cm', price: 4800,
    category: 'Abstract', available: true,
    img: 'https://images.unsplash.com/photo-1775255673747-c12434640d34?w=800&h=1050&fit=crop&auto=format',
    alt: 'Stone sculpture with circular void',
    note: 'A singular aperture opens through dense white marble — mass and absence held in balance.',
  },
  {
    id: 2, name: 'Due Figure', sub: 'Seated',
    material: 'Portuguese Limestone', year: 2023, dim: '68 × 32 × 24 cm', price: 7200,
    category: 'Figurative', available: true,
    img: 'https://images.unsplash.com/photo-1784653547575-c57e9bd37db5?w=800&h=1050&fit=crop&auto=format',
    alt: 'Abstract speckled sculpture resembling seated figures',
    note: 'Two presences carved from a single block — companionship made geological.',
  },
  {
    id: 3, name: 'Visage', sub: 'Terrae',
    material: 'Granite', year: 2024, dim: '55 × 40 × 30 cm', price: 6100,
    category: 'Figurative', available: false,
    img: 'https://images.unsplash.com/photo-1696820033957-bf155a24a135?w=800&h=1050&fit=crop&auto=format',
    alt: 'Stone face resting on ground',
    note: 'The face returns to earth. Repose as a condition of existence.',
  },
  {
    id: 4, name: 'Archivio', sub: 'Grande',
    material: 'Pietra Serena', year: 2022, dim: '110 × 60 × 45 cm', price: 14500,
    category: 'Large Format', available: true,
    img: 'https://images.unsplash.com/photo-1767584949720-0d8369a4ada5?w=1400&h=900&fit=crop&auto=format',
    alt: 'Modern sculpture in minimalist exhibition space',
    note: 'A monumental compression of time — seventy million years of sedimentation, shaped by weeks of labour.',
  },
  {
    id: 5, name: 'Tensione', sub: 'Ascendente',
    material: 'Carrara Marble', year: 2023, dim: '88 × 35 × 22 cm', price: 9800,
    category: 'Abstract', available: true,
    img: 'https://images.unsplash.com/photo-1773761542225-90315d50ed34?w=800&h=1050&fit=crop&auto=format',
    alt: 'Muscular stone figure holding rock overhead',
    note: 'Exertion arrested in marble. The instant before release, frozen in perpetuity.',
  },
  {
    id: 6, name: 'Equilibrio', sub: 'in Parco',
    material: 'Belgian Blue Stone', year: 2024, dim: '74 × 52 × 38 cm', price: 11200,
    category: 'Large Format', available: true,
    img: 'https://images.unsplash.com/photo-1771612559799-76daebaf37e4?w=1400&h=900&fit=crop&auto=format',
    alt: 'Abstract sculptures in a grassy park',
    note: 'Designed to weather. In ten years it will be a different piece — and a better one.',
  },
]

const cats = ['All', 'Abstract', 'Figurative', 'Large Format']

const testimonials = [
  { q: "The piece arrived exactly as I had imagined from the photographs — and then some. Its weight in the room changes everything.", a: 'James H.', l: 'London, UK' },
  { q: "We commissioned a garden piece three years ago. It has already weathered into something extraordinary — it feels geological, ancient.", a: 'Dr. Sabine K.', l: 'Munich, DE' },
  { q: "Progress photographs arrived every two weeks. The level of craft and the depth of communication made it unlike any purchase I have made.", a: 'Takeshi M.', l: 'Tokyo, JP' },
]

function gbp(n: number) {
  return new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 }).format(n)
}

/* ─── fade-in on scroll ───────────────────────────────────────────────── */
function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect() } }, { threshold: 0.1 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return (
    <div ref={ref} style={{ opacity: vis ? 1 : 0, transform: vis ? 'translateY(0)' : 'translateY(24px)', transition: `opacity 1s ease ${delay}s, transform 1s ease ${delay}s` }}>
      {children}
    </div>
  )
}

/* ─── App ─────────────────────────────────────────────────────────────── */
export default function App() {
  const [activeCat, setActiveCat] = useState('All')
  const [selected, setSelected] = useState<typeof sculptures[0] | null>(null)
  const [inquiry, setInquiry] = useState<{ target: typeof sculptures[0] | null; open: boolean }>({ target: null, open: false })
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const filtered = activeCat === 'All' ? sculptures : sculptures.filter(s => s.category === activeCat)

  function openInquiry(s: typeof sculptures[0] | null) {
    setSelected(null)
    setInquiry({ target: s, open: true })
  }

  return (
    <div style={{ backgroundColor: C.stone, color: C.ink, minHeight: '100vh' }}>

      {/* ── Nav ── */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 80,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: `0 ${SPACE.lg}px`, height: 68,
        backgroundColor: scrolled ? 'rgba(250,249,246,0.94)' : 'transparent',
        borderBottom: scrolled ? `1px solid ${C.hairline}` : '1px solid transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        transition: 'background-color 0.4s, border-color 0.4s',
      }}>
        <a href="#top" style={{ textDecoration: 'none', color: scrolled ? C.ink : C.stone }}>
          <div style={{ fontFamily: "'Cormorant SC', serif", fontSize: 20, fontWeight: 400, letterSpacing: '0.16em', lineHeight: 1 }}>PETRA</div>
          <div style={{ fontSize: 8.5, letterSpacing: '0.28em', color: scrolled ? C.faint : 'rgba(250,249,246,0.6)', marginTop: 3 }}>STONE SCULPTURE</div>
        </a>
        <div style={{ display: 'flex', gap: 36, alignItems: 'center' }}>
          {['Collection', 'Process', 'About', 'Contact'].map(item => (
            <NavLink key={item} href={`#${item.toLowerCase()}`} light={!scrolled}>{item}</NavLink>
          ))}
          <button
            onClick={() => openInquiry(null)}
            style={{
              padding: '9px 22px', fontSize: 10, letterSpacing: '0.18em',
              border: `1px solid ${scrolled ? C.hairline : 'rgba(250,249,246,0.4)'}`,
              backgroundColor: 'transparent',
              color: scrolled ? C.ink : C.stone,
              cursor: 'pointer', transition: 'all 0.4s',
            }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = C.ink; e.currentTarget.style.color = C.stone; e.currentTarget.style.borderColor = C.ink }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = scrolled ? C.ink : C.stone; e.currentTarget.style.borderColor = scrolled ? C.hairline : 'rgba(250,249,246,0.4)' }}
          >
            ENQUIRE
          </button>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section id="top" style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
        <img
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1800&h=1200&fit=crop&auto=format&q=80"
          alt="Stone sculpture"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 20%', filter: 'brightness(0.52)' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(20,18,16,0.1) 0%, rgba(20,18,16,0.55) 100%)' }} />
        <div style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: `0 ${SPACE.xl}px 80px` }}>
          <div style={{ maxWidth: 760 }}>
            <div style={{ fontSize: TYPE.labelCompact.fontSize, letterSpacing: TYPE.label.letterSpacing, color: 'rgba(250,249,246,0.55)', marginBottom: 28 }}>HAND-CARVED STONE · PIETRASANTA · EST. 1994</div>
            <h1 style={{ fontFamily: "'Cormorant Display', serif", fontSize: 'clamp(64px, 9vw, 124px)', fontWeight: 300, lineHeight: 0.92, letterSpacing: '-0.02em', color: C.stone, margin: 0, marginBottom: 36 }}>
              Carved<br /><em style={{ fontStyle: 'italic', fontWeight: 300 }}>from</em><br />silence
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
              <a href="#collection"
                style={{ fontSize: 10, letterSpacing: '0.2em', color: C.stone, textDecoration: 'none', padding: '13px 28px', border: `1px solid rgba(250,249,246,0.5)`, transition: 'all 0.5s' }}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = C.stone; e.currentTarget.style.color = C.ink }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = C.stone }}
              >
                VIEW COLLECTION
              </a>
              <a href="#process" style={{ fontSize: 11, color: 'rgba(250,249,246,0.6)', textDecoration: 'none', letterSpacing: '0.06em', transition: 'color 0.5s' }}
                onMouseEnter={e => (e.currentTarget.style.color = C.stone)}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(250,249,246,0.6)')}
              >
                The process →
              </a>
            </div>
          </div>
          <div style={{ position: 'absolute', right: 64, bottom: 80, textAlign: 'right' }}>
            <div style={{ fontSize: 9, letterSpacing: '0.22em', color: 'rgba(250,249,246,0.4)', marginBottom: 4 }}>FEATURED WORK</div>
            <div style={{ fontFamily: "'Cormorant Display', serif", fontSize: 15, color: 'rgba(250,249,246,0.7)', fontStyle: 'italic' }}>Tensione Ascendente</div>
            <div style={{ fontSize: 9, letterSpacing: '0.14em', color: 'rgba(250,249,246,0.35)', marginTop: 3 }}>CARRARA MARBLE · 2023</div>
          </div>
        </div>
        <div style={{ position: 'absolute', bottom: 36, left: '50%', transform: 'translateX(-50%)' }}>
          <div style={{ width: 1, height: 48, backgroundColor: 'rgba(250,249,246,0.3)', animation: 'scrollbar 1.8s ease-in-out infinite' }} />
          <style>{`@keyframes scrollbar { 0%,100%{opacity:0.3} 50%{opacity:0.7} }`}</style>
        </div>
      </section>

      {/* ── Static provenance line (replaces marquee) ── */}
      <div style={{ borderTop: `1px solid ${C.hairline}`, borderBottom: `1px solid ${C.hairline}`, padding: '18px 0', backgroundColor: C.ink, textAlign: 'center' }}>
        <span style={{ fontFamily: "'Cormorant SC', serif", fontSize: 12, letterSpacing: '0.28em', color: C.mid }}>
          Carrara &nbsp;·&nbsp; Pietrasanta &nbsp;·&nbsp; Single Maker &nbsp;·&nbsp; Hand-Carved &nbsp;·&nbsp; Since 1994 &nbsp;·&nbsp; Natural Stone
        </span>
      </div>

      {/* ── Collection ── */}
      <section id="collection" style={{ padding: `${SPACE.xxl}px ${SPACE.xl}px` }}>
        <FadeIn>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 64 }}>
            <div>
              <div style={{ fontSize: 9, letterSpacing: '0.3em', color: C.faint, marginBottom: 16 }}>THE COLLECTION</div>
              <h2 style={{ fontFamily: "'Cormorant Display', serif", fontSize: 'clamp(38px, 4.5vw, 60px)', fontWeight: 300, lineHeight: 1.0, margin: 0 }}>
                Available Works
              </h2>
            </div>
            <div style={{ display: 'flex', gap: 0 }}>
              {cats.map((cat, i) => (
                <button key={cat} onClick={() => setActiveCat(cat)} style={{
                  padding: '9px 20px', fontSize: 9, letterSpacing: '0.2em',
                  border: `1px solid ${C.hairline}`,
                  marginLeft: i > 0 ? -1 : 0,
                  backgroundColor: activeCat === cat ? C.ink : 'transparent',
                  color: activeCat === cat ? C.stone : C.faint,
                  cursor: 'pointer', transition: 'all 0.4s', zIndex: activeCat === cat ? 1 : 0, position: 'relative',
                }}>
                  {cat.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Asymmetric editorial grid */}
        <AsymmetricGrid sculptures={filtered} onSelect={setSelected} />
      </section>

      {/* ── Divider quote ── */}
      <FadeIn>
        <div style={{ borderTop: `1px solid ${C.hairline}`, borderBottom: `1px solid ${C.hairline}`, padding: '72px 64px', backgroundColor: C.ink, textAlign: 'center' }}>
          <div style={{ fontFamily: "'Cormorant Display', serif", fontSize: 'clamp(22px, 3vw, 38px)', fontStyle: 'italic', fontWeight: 300, color: C.stone, maxWidth: 780, margin: '0 auto', lineHeight: 1.55 }}>
            "Stone is not carved — it is revealed. My work is about listening until the material tells you what it wants to become."
          </div>
          <div style={{ fontSize: 9, letterSpacing: '0.26em', color: C.mid, marginTop: 28 }}>ELENA MARCHETTI · SCULPTOR</div>
        </div>
      </FadeIn>

      {/* ── Process ── */}
      <section id="process" style={{ padding: `${SPACE.xxl}px ${SPACE.xl}px` }}>
        <div style={{ display: 'grid', gridTemplateColumns: '5fr 4fr', gap: 96, alignItems: 'start' }}>
          <div>
            <FadeIn>
              <div style={{ fontSize: 9, letterSpacing: '0.3em', color: C.faint, marginBottom: 20 }}>THE PROCESS</div>
              <h2 style={{ fontFamily: "'Cormorant Display', serif", fontSize: 'clamp(36px, 4vw, 56px)', fontWeight: 300, lineHeight: 1.0, marginBottom: 40 }}>
                From quarry<br /><em style={{ fontStyle: 'italic' }}>to room</em>
              </h2>
              <p style={{ fontSize: 14, lineHeight: 1.9, color: C.faint, marginBottom: 20, maxWidth: 480 }}>
                Every block is selected in person — in Carrara, in Sintra, in the Ardennes. The grain, the weight, the imperceptible imperfections all determine what the piece can become.
              </p>
              <p style={{ fontSize: 14, lineHeight: 1.9, color: C.faint, maxWidth: 480, marginBottom: 72 }}>
                Power tools are used sparingly for rough blocking only. Finishing is always by hand — chisels, rasps, abrasives — across weeks or months of uninterrupted focus.
              </p>
            </FadeIn>
            {/* Process steps — large editorial numerals */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 56 }}>
              {[
                { n: '01', title: 'Stone selection', body: 'Personally sourced from European quarries each spring' },
                { n: '02', title: 'Rough blocking', body: 'Form established using hammer and point chisel' },
                { n: '03', title: 'Carving', body: '3–8 weeks of continuous, focused hand work' },
                { n: '04', title: 'Finishing', body: 'Polished, waxed, or naturally patinated per piece' },
              ].map((item, i) => (
                <FadeIn key={item.n} delay={i * 0.1}>
                  <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start' }}>
                    <div style={{
                      fontFamily: "'Cormorant Display', serif",
                      fontSize: 72,
                      fontWeight: 300,
                      lineHeight: 1,
                      color: C.amber,
                      opacity: 0.7,
                      flexShrink: 0,
                      width: 80,
                    }}>{item.n}</div>
                    <div style={{ paddingTop: 12 }}>
                      <div style={{ fontFamily: "'Cormorant Display', serif", fontSize: 22, fontWeight: 400, marginBottom: 10, lineHeight: 1.2 }}>{item.title}</div>
                      <div style={{ fontSize: 13, color: C.faint, lineHeight: 1.8 }}>{item.body}</div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
          <FadeIn delay={0.15}>
            <div style={{ position: 'sticky', top: 100 }}>
              <div style={{ position: 'relative' }}>
                <img
                  src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=700&h=920&fit=crop&auto=format"
                  alt="Stone hand sculpture"
                  style={{ width: '100%', display: 'block', filter: 'grayscale(15%) contrast(1.05)' }}
                />
                <div style={{ position: 'absolute', top: -16, left: -16, right: 16, bottom: 16, border: `1px solid ${C.hairline}`, zIndex: -1 }} />
              </div>
              <div style={{ marginTop: 20, padding: '20px 0', borderTop: `1px solid ${C.hairline}` }}>
                <div style={{ fontSize: 9, letterSpacing: '0.22em', color: C.mid }}>STUDIO · PIETRASANTA, TUSCANY</div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Commission ── */}
      <section style={{ backgroundColor: C.ink, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <img
            src="https://images.unsplash.com/photo-1763013373531-82aa6d2b5d9e?w=1400&h=900&fit=crop&auto=format&q=70"
            alt="Marble sculpture detail"
            style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.18, filter: 'grayscale(40%)' }}
          />
        </div>
        <div style={{ position: 'relative', padding: '120px 64px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 96, alignItems: 'center' }}>
          <FadeIn>
            <div>
              <div style={{ fontSize: 9, letterSpacing: '0.3em', color: C.mid, marginBottom: 24 }}>COMMISSIONS</div>
              <h2 style={{ fontFamily: "'Cormorant Display', serif", fontSize: 'clamp(36px, 4vw, 60px)', fontWeight: 300, lineHeight: 1.0, color: C.stone, marginBottom: 28 }}>
                A sculpture made<br /><em style={{ fontStyle: 'italic' }}>for you alone</em>
              </h2>
              <p style={{ fontSize: 14, lineHeight: 1.9, color: C.mid, marginBottom: 40, maxWidth: 440 }}>
                Commissions are accepted for private residences, gardens, and institutional collections. The process spans 4–12 months from initial consultation to installation. Pricing from £18,000.
              </p>
              <button
                aria-label="Begin a commission conversation"
                onClick={() => openInquiry(null)}
                style={{ padding: '14px 32px', backgroundColor: C.stone, color: C.ink, fontSize: 10, letterSpacing: '0.2em', border: 'none', cursor: 'pointer', transition: 'opacity 0.5s' }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '0.82')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
              >
                BEGIN A CONVERSATION
              </button>
            </div>
          </FadeIn>
          <FadeIn delay={0.12}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {[
                'Site assessment and dimension consultation',
                'Stone block selected from quarry samples',
                'Bi-weekly photographic progress reports',
                'White-glove crating and installation',
                'Certificate of authenticity and care guide',
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: 20, alignItems: 'flex-start', padding: '20px 0', borderBottom: `1px solid rgba(250,249,246,0.1)` }}>
                  <div style={{ fontFamily: "'Cormorant SC', serif", fontSize: 10, letterSpacing: '0.18em', color: C.amber, paddingTop: 3, flexShrink: 0 }}>
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div style={{ fontSize: 13, color: C.mid, lineHeight: 1.6 }}>{item}</div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── About ── */}
      <section id="about" style={{ padding: `${SPACE.xxl}px ${SPACE.xl}px` }}>
        <div style={{ display: 'grid', gridTemplateColumns: '380px 1fr', gap: 80 }}>
          <FadeIn>
            <div style={{ position: 'sticky', top: 100 }}>
              <img
                src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&h=740&fit=crop&auto=format"
                alt="Artist at work"
                style={{ width: '100%', display: 'block', filter: 'grayscale(10%)' }}
              />
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div style={{ paddingTop: 12 }}>
              <div style={{ fontSize: 9, letterSpacing: '0.3em', color: C.faint, marginBottom: 24 }}>ABOUT</div>
              <h2 style={{ fontFamily: "'Cormorant Display', serif", fontSize: 'clamp(40px, 4.5vw, 64px)', fontWeight: 300, lineHeight: 0.95, marginBottom: 40 }}>
                Elena<br /><em style={{ fontStyle: 'italic' }}>Marchetti</em>
              </h2>
              <p style={{ fontSize: 15, lineHeight: 1.9, color: C.faint, marginBottom: 20 }}>
                Elena Marchetti studied sculpture at the Accademia di Belle Arti in Florence, graduating in 1992. She trained under Piero Ceccarelli in Pietrasanta, learning the traditional methods of Carrara, before establishing her own studio in the Tuscan hills.
              </p>
              <p style={{ fontSize: 15, lineHeight: 1.9, color: C.faint, marginBottom: 48 }}>
                Her work has been acquired by private collectors in the United Kingdom, Germany, Japan, and the United States. She accepts six to eight commissions each year, working exclusively in natural stone.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px 24px', paddingTop: 40, borderTop: `1px solid ${C.hairline}` }}>
                {[{ n: '30+', label: 'Years practising' }, { n: '140', label: 'Sculptures completed' }, { n: '18', label: 'Countries reached' }].map(stat => (
                  <div key={stat.n}>
                    <div style={{ fontFamily: "'Cormorant Display', serif", fontSize: 44, fontWeight: 300, lineHeight: 1 }}>{stat.n}</div>
                    <div style={{ fontSize: 10, letterSpacing: '0.18em', color: C.faint, marginTop: 8 }}>{stat.label.toUpperCase()}</div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Testimonials — single rotating quote ── */}
      <RotatingTestimonial />

      {/* ── Contact ── */}
      <section id="contact" style={{ padding: `${SPACE.xxl}px ${SPACE.xl}px` }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 96 }}>
          <FadeIn>
            <div>
              <div style={{ fontSize: 9, letterSpacing: '0.3em', color: C.faint, marginBottom: 24 }}>CONTACT</div>
              <h2 style={{ fontFamily: "'Cormorant Display', serif", fontSize: 'clamp(36px, 4vw, 56px)', fontWeight: 300, lineHeight: 1.0, marginBottom: 32 }}>
                Begin a<br /><em style={{ fontStyle: 'italic' }}>conversation</em>
              </h2>
              <p style={{ fontSize: 14, lineHeight: 1.9, color: C.faint, marginBottom: 52, maxWidth: 400 }}>
                Whether you are drawn to an existing work or imagining something new, all enquiries are personal and confidential. Elena responds to every message herself.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
                {[
                  { label: 'Studio address', value: 'Via delle Colline 14\nPietrasanta, Tuscany, Italy' },
                  { label: 'Email', value: 'studio@petrasculpture.com' },
                  { label: 'Response time', value: 'Within 48 hours' },
                ].map(item => (
                  <div key={item.label} style={{ paddingBottom: 28, borderBottom: `1px solid ${C.hairline}` }}>
                    <div style={{ fontSize: 9, letterSpacing: '0.22em', color: C.mid, marginBottom: 8 }}>{item.label.toUpperCase()}</div>
                    <div style={{ fontSize: 14, color: C.ink, lineHeight: 1.7, whiteSpace: 'pre-line' }}>{item.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={0.12}>
            <ContactForm />
          </FadeIn>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{ borderTop: `1px solid ${C.hairline}`, backgroundColor: C.ink, padding: `${SPACE.lg}px ${SPACE.xl}px` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontFamily: "'Cormorant SC', serif", fontSize: 18, color: C.stone, letterSpacing: '0.16em' }}>PETRA</div>
            <div style={{ fontSize: 8.5, letterSpacing: '0.26em', color: C.mid, marginTop: 4 }}>STONE SCULPTURE</div>
          </div>
          <div style={{ fontSize: 10, color: C.mid }}>© 2024 Elena Marchetti. All works protected.</div>
          <div style={{ display: 'flex', gap: 28 }}>
            {['Instagram', 'Artsy', 'Press'].map(link => (
              <a key={link} href="#" style={{ fontSize: 9, letterSpacing: '0.2em', color: C.mid, textDecoration: 'none', transition: 'color 0.4s' }}
                onMouseEnter={e => (e.currentTarget.style.color = C.stone)}
                onMouseLeave={e => (e.currentTarget.style.color = C.mid)}
              >
                {link.toUpperCase()}
              </a>
            ))}
          </div>
        </div>
      </footer>

      {/* ── Full-screen Detail Takeover ── */}
      {selected && (
        <SculptureDetailTakeover
          s={selected}
          onClose={() => setSelected(null)}
          onEnquire={() => openInquiry(selected)}
        />
      )}

      {/* ── Inquiry Modal ── */}
      {inquiry.open && (
        <Modal onClose={() => setInquiry({ target: null, open: false })}>
          <InquiryForm
            target={inquiry.target}
            onClose={() => setInquiry({ target: null, open: false })}
          />
        </Modal>
      )}
    </div>
  )
}

/* ─── Asymmetric Collection Grid ─────────────────────────────────────── */
function AsymmetricGrid({ sculptures, onSelect }: { sculptures: typeof import('./App').default extends never ? never : any[]; onSelect: (s: any) => void }) {
  // Layout: hero piece (first large-format or first) spans full width,
  // then pairs/singles fill below with varied proportions.
  if (sculptures.length === 0) return <div style={{ textAlign: 'center', padding: '80px 0', color: C.faint, fontFamily: "'Cormorant Display', serif", fontSize: 24 }}>No works in this category.</div>

  const [hero, ...rest] = sculptures

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
      {/* Hero piece — wide */}
      <FadeIn>
        <AsymCard s={hero} onSelect={onSelect} wide />
      </FadeIn>

      {/* Remaining — alternating 2-col and 3-col rows */}
      {rest.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: rest.length === 1 ? '1fr 1fr' : 'repeat(3, 1fr)', gap: 32 }}>
          {rest.map((s, i) => (
            <FadeIn key={s.id} delay={i * 0.08}>
              <AsymCard s={s} onSelect={onSelect} tall={i % 2 === 0} />
            </FadeIn>
          ))}
        </div>
      )}
    </div>
  )
}

function AsymCard({ s, onSelect, wide = false, tall = false }: { s: any; onSelect: (s: any) => void; wide?: boolean; tall?: boolean }) {
  const [hov, setHov] = useState(false)
  const aspect = wide ? '16/7' : tall ? '3/4.4' : '3/3.8'

  return (
    <div
      onClick={() => onSelect(s)}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ cursor: 'crosshair', position: 'relative' }}
    >
      <div style={{ aspectRatio: aspect, overflow: 'hidden', backgroundColor: C.dust, position: 'relative' }}>
        <img
          src={s.img}
          alt={s.alt}
          style={{
            width: '100%', height: '100%', objectFit: 'cover', display: 'block',
            transition: 'filter 0.65s ease, transform 0.65s ease',
            filter: hov ? 'brightness(0.88) saturate(0.75)' : 'brightness(1) saturate(1)',
            transform: 'scale(1)',
          }}
        />
        {!s.available && (
          <div style={{ position: 'absolute', top: 16, left: 16, backgroundColor: C.ink, color: C.stone, fontSize: 8, letterSpacing: '0.2em', padding: '4px 10px' }}>SOLD</div>
        )}
      </div>
      <div style={{ paddingTop: 18, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ fontFamily: "'Cormorant Display', serif", fontSize: wide ? 24 : 20, fontWeight: 400, letterSpacing: '0.01em', transition: 'opacity 0.5s', opacity: hov ? 0.7 : 1 }}>{s.name}</div>
          <div style={{ fontFamily: "'Cormorant Display', serif", fontSize: wide ? 18 : 15, fontStyle: 'italic', fontWeight: 300, color: C.faint, marginTop: 2 }}>{s.sub}</div>
          <div style={{ fontSize: 9, letterSpacing: '0.18em', color: C.mid, marginTop: 8 }}>{s.material.toUpperCase()} · {s.year}</div>
          <div style={{ fontSize: 11, color: C.mid, marginTop: 4 }}>{s.dim}</div>
        </div>
        <div style={{ fontFamily: "'Cormorant Display', serif", fontSize: wide ? 22 : 18, fontWeight: 300, color: s.available ? C.ink : C.mid, paddingTop: 2 }}>
          {gbp(s.price)}
        </div>
      </div>
    </div>
  )
}

/* ─── Full-screen Sculpture Detail ───────────────────────────────────── */
function SculptureDetailTakeover({ s, onClose, onEnquire }: { s: any; onClose: () => void; onEnquire: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [onClose])

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 200, backgroundColor: C.ink, display: 'grid', gridTemplateColumns: '70% 30%', animation: 'takeoverIn 0.5s cubic-bezier(0.25,0,0,1)' }}>
      <style>{`@keyframes takeoverIn { from { opacity:0 } to { opacity:1 } }`}</style>

      {/* Full-height image */}
      <div style={{ position: 'relative', overflow: 'hidden', backgroundColor: '#0d0c0a' }} onClick={onClose}>
        <img
          src={s.img}
          alt={s.alt}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', opacity: 0.92 }}
        />
        <div style={{ position: 'absolute', bottom: 32, left: 40, fontSize: 9, letterSpacing: '0.22em', color: 'rgba(250,249,246,0.35)' }}>
          CLICK IMAGE TO CLOSE
        </div>
      </div>

      {/* Detail panel */}
      <div style={{ backgroundColor: C.stone, padding: '56px 44px', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 40 }}>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: 22, cursor: 'pointer', color: C.mid, lineHeight: 1, padding: 4 }}>×</button>
        </div>
        <div style={{ fontSize: 9, letterSpacing: '0.26em', color: C.faint, marginBottom: 10 }}>{s.category.toUpperCase()}</div>
        <div style={{ fontFamily: "'Cormorant Display', serif", fontSize: 40, fontWeight: 300, lineHeight: 1, marginBottom: 4 }}>{s.name}</div>
        <div style={{ fontFamily: "'Cormorant Display', serif", fontSize: 22, fontStyle: 'italic', fontWeight: 300, color: C.faint, marginBottom: 32 }}>{s.sub}</div>

        <p style={{ fontSize: 13, lineHeight: 1.95, color: C.faint, marginBottom: 40, borderBottom: `1px solid ${C.hairline}`, paddingBottom: 36 }}>{s.note}</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, marginBottom: 40 }}>
          {[
            { l: 'Material', v: s.material },
            { l: 'Year', v: String(s.year) },
            { l: 'Dimensions', v: s.dim },
            { l: 'Availability', v: s.available ? 'Available' : 'Sold' },
          ].map(item => (
            <div key={item.l} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: `1px solid ${C.hairline}`, paddingBottom: 16 }}>
              <div style={{ fontSize: 9, letterSpacing: '0.2em', color: C.mid }}>{item.l.toUpperCase()}</div>
              <div style={{ fontSize: 13, color: C.ink }}>{item.v}</div>
            </div>
          ))}
        </div>

        <div style={{ fontFamily: "'Cormorant Display', serif", fontSize: 36, fontWeight: 300, marginBottom: 28, color: s.available ? C.ink : C.mid }}>
          {gbp(s.price)}
        </div>

        {s.available && (
          <button
            onClick={onEnquire}
            style={{ padding: '14px 28px', backgroundColor: C.ink, color: C.stone, fontSize: 10, letterSpacing: '0.18em', border: 'none', cursor: 'pointer', transition: 'opacity 0.5s', alignSelf: 'flex-start' }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.72')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            ENQUIRE TO PURCHASE
          </button>
        )}
      </div>
    </div>
  )
}

/* ─── Rotating testimonial ───────────────────────────────────────────── */
function RotatingTestimonial() {
  const [idx, setIdx] = useState(0)
  const [fading, setFading] = useState(false)

  function goTo(next: number) {
    setFading(true)
    setTimeout(() => { setIdx(next); setFading(false) }, 500)
  }

  useEffect(() => {
    const t = setTimeout(() => goTo((idx + 1) % testimonials.length), 6000)
    return () => clearTimeout(t)
  }, [idx])

  const t = testimonials[idx]

  return (
    <div style={{ borderTop: `1px solid ${C.hairline}`, borderBottom: `1px solid ${C.hairline}`, padding: '88px 64px', textAlign: 'center' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{
          transition: 'opacity 0.5s ease',
          opacity: fading ? 0 : 1,
        }}>
          <div style={{ fontFamily: "'Cormorant Display', serif", fontSize: 'clamp(20px, 2.5vw, 30px)', fontStyle: 'italic', fontWeight: 300, lineHeight: 1.65, color: C.ink, marginBottom: 36 }}>
            "{t.q}"
          </div>
          <div style={{ fontSize: 9, letterSpacing: '0.26em', color: C.faint }}>
            {t.a.toUpperCase()} &nbsp;·&nbsp; {t.l.toUpperCase()}
          </div>
        </div>
        {/* Dot navigation */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginTop: 40 }}>
          {testimonials.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to testimonial ${i + 1}`}
              onClick={() => goTo(i)}
              style={{
                width: i === idx ? 20 : 6, height: 6,
                borderRadius: 3, border: 'none', cursor: 'pointer',
                backgroundColor: i === idx ? C.ink : C.dust,
                transition: 'all 0.5s ease', padding: 0,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

/* ─── Inquiry form ───────────────────────────────────────────────────── */
function InquiryForm({ target, onClose }: { target: any; onClose: () => void }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    setting: '',
    budget: '',
    timeline: '',
    message: target ? `I am interested in "${target.name}" (${gbp(target.price)}). Please get in touch.` : 'I would like to discuss a commission.',
  })
  const [sent, setSent] = useState(false)

  if (sent) return (
    <div style={{ padding: '64px 52px', width: 520, textAlign: 'center' }}>
      <div style={{ fontFamily: "'Cormorant Display', serif", fontSize: 36, fontWeight: 300, marginBottom: 16 }}>
        {target ? 'Thank you for your interest' : 'Thank you'}
      </div>
      <p style={{ fontSize: 13, color: C.faint, lineHeight: 1.8, marginBottom: 12 }}>
        {target
          ? `Elena will review your enquiry for "${target.name}" and respond personally within 48 hours.`
          : 'Elena will respond personally within 48 hours to begin the conversation.'}
      </p>
      <button onClick={onClose} style={{ marginTop: 32, padding: '12px 28px', backgroundColor: C.ink, color: C.stone, fontSize: 10, letterSpacing: '0.18em', border: 'none', cursor: 'pointer' }}>CLOSE</button>
    </div>
  )

  return (
    <div style={{ padding: '52px 48px', width: 540 }}>
      <button onClick={onClose} style={{ float: 'right', background: 'none', border: 'none', fontSize: 22, cursor: 'pointer', color: C.mid }}>×</button>
      <div style={{ fontSize: 9, letterSpacing: '0.28em', color: C.faint, marginBottom: 14 }}>ENQUIRY</div>
      <h3 style={{ fontFamily: "'Cormorant Display', serif", fontSize: 28, fontWeight: 300, margin: 0, marginBottom: 36 }}>
        {target ? target.name : 'Commission Enquiry'}
      </h3>
      <form onSubmit={e => { e.preventDefault(); /* TODO: backend integration point */ setSent(true) }} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <Field label="Full Name" type="text" value={form.name} onChange={v => setForm(p => ({ ...p, name: v }))} required />
        <Field label="Email" type="email" value={form.email} onChange={v => setForm(p => ({ ...p, email: v }))} required />

        {/* Intended setting */}
        <div>
          <div style={{ fontSize: 9, letterSpacing: '0.2em', color: C.mid, marginBottom: 8 }}>INTENDED SETTING</div>
          <div style={{ display: 'flex', gap: 0 }}>
            {['Interior', 'Garden', 'Public space'].map((opt, i) => (
              <button
                key={opt} type="button"
                onClick={() => setForm(p => ({ ...p, setting: opt }))}
                style={{
                  flex: 1, padding: '9px 0', fontSize: 10, letterSpacing: '0.12em',
                  border: `1px solid ${C.hairline}`, marginLeft: i > 0 ? -1 : 0,
                  backgroundColor: form.setting === opt ? C.ink : 'transparent',
                  color: form.setting === opt ? C.stone : C.faint,
                  cursor: 'pointer', transition: 'all 0.35s',
                }}
              >{opt}</button>
            ))}
          </div>
        </div>

        {/* Budget range */}
        <div>
          <div style={{ fontSize: 9, letterSpacing: '0.2em', color: C.mid, marginBottom: 8 }}>BUDGET RANGE</div>
          <select
            value={form.budget}
            onChange={e => setForm(p => ({ ...p, budget: e.target.value }))}
            style={{ width: '100%', padding: '11px 14px', border: `1px solid ${C.hairline}`, backgroundColor: 'transparent', fontSize: 13, color: form.budget ? C.ink : C.mid, outline: 'none', fontFamily: 'inherit', appearance: 'none', cursor: 'pointer' }}
          >
            <option value="">Select a range</option>
            <option value="under-10k">Under £10,000</option>
            <option value="10-20k">£10,000 – £20,000</option>
            <option value="20-50k">£20,000 – £50,000</option>
            <option value="50k+">Above £50,000</option>
          </select>
        </div>

        <Field label="Ideal Timeline (optional)" type="text" value={form.timeline} onChange={v => setForm(p => ({ ...p, timeline: v }))} placeholder="e.g. Ready by autumn 2025" />

        <div>
          <div style={{ fontSize: 9, letterSpacing: '0.2em', color: C.mid, marginBottom: 8 }}>MESSAGE</div>
          <textarea
            required rows={4}
            value={form.message}
            onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
            style={{ width: '100%', padding: '11px 14px', border: `1px solid ${C.hairline}`, backgroundColor: 'transparent', fontSize: 13, color: C.ink, outline: 'none', resize: 'vertical', fontFamily: 'inherit', lineHeight: 1.7 }}
            onFocus={e => (e.target.style.borderColor = C.ink)}
            onBlur={e => (e.target.style.borderColor = C.hairline)}
          />
        </div>
        <button type="submit" style={{ alignSelf: 'flex-start', padding: '13px 28px', backgroundColor: C.ink, color: C.stone, fontSize: 10, letterSpacing: '0.18em', border: 'none', cursor: 'pointer', transition: 'opacity 0.4s' }}
          onMouseEnter={e => (e.currentTarget.style.opacity = '0.75')}
          onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
        >
          SEND ENQUIRY
        </button>
      </form>
    </div>
  )
}

/* ─── Contact form (page section) ────────────────────────────────────── */
function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)
  if (sent) return (
    <div style={{ paddingTop: 48 }}>
      <div style={{ fontFamily: "'Cormorant Display', serif", fontSize: 32, fontWeight: 300, marginBottom: 12 }}>Message received</div>
      <div style={{ fontSize: 13, color: C.faint }}>Elena will respond within 48 hours.</div>
    </div>
  )
  return (
    <form onSubmit={e => { e.preventDefault(); /* TODO: backend integration point */ setSent(true) }} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Field label="Full Name" type="text" value={form.name} onChange={v => setForm(p => ({ ...p, name: v }))} required />
      <Field label="Email Address" type="email" value={form.email} onChange={v => setForm(p => ({ ...p, email: v }))} required />
      <div>
        <div style={{ fontSize: 9, letterSpacing: '0.2em', color: C.mid, marginBottom: 8 }}>MESSAGE</div>
        <textarea
          required rows={5}
          value={form.message}
          onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
          placeholder="Tell Elena about your interest, your space, or your idea..."
          style={{ width: '100%', padding: '11px 14px', border: `1px solid ${C.hairline}`, backgroundColor: 'transparent', fontSize: 13, color: C.ink, outline: 'none', resize: 'vertical', fontFamily: 'inherit', lineHeight: 1.7 }}
          onFocus={e => (e.target.style.borderColor = C.ink)}
          onBlur={e => (e.target.style.borderColor = C.hairline)}
        />
      </div>
      <button type="submit" style={{ alignSelf: 'flex-start', padding: '13px 32px', backgroundColor: C.ink, color: C.stone, fontSize: 10, letterSpacing: '0.18em', border: 'none', cursor: 'pointer', transition: 'opacity 0.4s' }}
        onMouseEnter={e => (e.currentTarget.style.opacity = '0.75')}
        onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
      >
        SEND MESSAGE
      </button>
    </form>
  )
}

/* ─── shared primitives ──────────────────────────────────────────────── */
function NavLink({ href, children, light }: { href: string; children: React.ReactNode; light?: boolean }) {
  const [hov, setHov] = useState(false)
  return (
    <a href={href} style={{ fontSize: 10, letterSpacing: '0.18em', color: hov ? (light ? C.stone : C.ink) : (light ? 'rgba(250,249,246,0.55)' : C.faint), textDecoration: 'none', transition: 'color 0.4s' }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
    >
      {(children as string).toUpperCase()}
    </a>
  )
}

function Field({ label, type, value, onChange, required, placeholder }: { label: string; type: string; value: string; onChange: (v: string) => void; required?: boolean; placeholder?: string }) {
  return (
    <div>
      <div style={{ fontSize: 9, letterSpacing: '0.2em', color: C.mid, marginBottom: 8 }}>{label.toUpperCase()}</div>
      <input
        type={type} required={required} value={value} placeholder={placeholder}
        onChange={e => onChange(e.target.value)}
        style={{ width: '100%', padding: '11px 14px', border: `1px solid ${C.hairline}`, backgroundColor: 'transparent', fontSize: 13, color: C.ink, outline: 'none', fontFamily: 'inherit' }}
        onFocus={e => (e.target.style.borderColor = C.ink)}
        onBlur={e => (e.target.style.borderColor = C.hairline)}
      />
    </div>
  )
}

function Modal({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  const dialogRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
        return
      }

      if (e.key === 'Tab' && dialogRef.current) {
        const focusables = dialogRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])')
        if (focusables.length === 0) {
          e.preventDefault()
          return
        }

        const first = focusables[0]
        const last = focusables[focusables.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }

    window.addEventListener('keydown', onKey)
    dialogRef.current?.focus()
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div
      style={{ position: 'fixed', inset: 0, zIndex: 200, backgroundColor: 'rgba(20,18,16,0.72)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 32, backdropFilter: 'blur(4px)' }}
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        style={{ backgroundColor: C.stone, maxWidth: '92vw', overflow: 'hidden', animation: 'modalIn 0.4s cubic-bezier(0.25,0,0,1)' }}
        onClick={e => e.stopPropagation()}
      >
        {children}
      </div>
      <style>{`@keyframes modalIn { from { opacity:0; transform:translateY(20px) } to { opacity:1; transform:translateY(0) } }`}</style>
    </div>
  )
}
