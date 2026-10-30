import { useState, useEffect, useRef } from 'react'

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('[data-reveal]')
    if (!('IntersectionObserver' in window)) { els.forEach((e) => e.setAttribute('data-in', '')); return }
    const io = new IntersectionObserver((entries) => entries.forEach((en) => {
      if (en.isIntersecting) { en.target.setAttribute('data-in', ''); io.unobserve(en.target) }
    }), { threshold: 0.15, rootMargin: '0px 0px -6% 0px' })
    els.forEach((e) => io.observe(e))
    return () => io.disconnect()
  }, [])
}
function useScroll() {
  const [y, setY] = useState(0)
  useEffect(() => {
    const on = () => {
      const h = document.documentElement
      setY({ top: h.scrollTop, p: h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight) })
    }
    on(); window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  return y || { top: 0, p: 0 }
}

import { faqs } from './faqs.js'
import { EMAILJS } from './config.js'

const img = (n) => `/images/${n}`
const Arrow = () => <span aria-hidden="true">→</span>

const Logo = ({ light }) => (
  <a href="#top" className={`logo ${light ? 'light' : ''}`} aria-label="Stamp Cleaning">
    <img src={`/images/${light ? 'logo-light' : 'logo'}.png`} alt="" width="48" height="44" />
    <span>STAMP</span>
  </a>
)

const Icon = ({ d }) => (
  <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {d.map((p, i) => <path key={i} d={p} />)}
  </svg>
)
const icons = {
  doc: ['M6 3h8l4 4v14H6z', 'M14 3v4h4', 'M9 12h6M9 16h6'],
  shield: ['M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z', 'M8.5 12l2.5 2.5L16 9.5'],
  people: ['M9 11a3 3 0 100-6 3 3 0 000 6z', 'M3 20c0-3.5 2.7-6 6-6s6 2.5 6 6', 'M16 5a3 3 0 010 6', 'M18 14c2 .6 3 2.6 3 6'],
  chat: ['M4 5h16v11H9l-5 4z', 'M8 9h8M8 12h5'],
  hat: ['M4 17h16', 'M6 17a6 6 0 0112 0', 'M12 7v4'],
  person: ['M12 12a4 4 0 100-8 4 4 0 000 8z', 'M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7'],
  spark: ['M12 3l2 6 6 2-6 2-2 6-2-6-6-2 6-2z'],
}

const services = [
  { n: '01', t: 'Accommodation Turnovers', s: 'Guest-ready rooms. Seamless turnovers.', d: 'Professional room turnover and presentation cleans for hotels, motels and short-stay accommodation, with quick turnaround and reliable checklists.', i: '02_accommodation_bedroom.jpg', inc: ['Bed making and linen changeover', 'Bathroom and kitchenette clean', 'Floors, surfaces and bins', 'Room-by-room checklist sign-off'] },
  { n: '02', t: 'Commercial & Office', s: 'Workspaces that work better.', d: 'Scheduled office cleaning, reception and lobby upkeep, meeting room refreshes, and communal area maintenance.', i: '03_commercial_office.jpg', inc: ['Workstations, floors and bins', 'Reception and lobby upkeep', 'Meeting room refreshes', 'Kitchens, bathrooms and communal areas'] },
  { n: '03', t: 'Specialist & Event', s: 'Big cleans. Special requirements.', d: 'Deep cleaning, end-of-lease, carpet spot treatment and post-event cleanup. We can scale teams for larger or one-off jobs.', i: '04_specialist_cleaning.jpg', inc: ['Deep cleaning', 'End-of-lease cleaning', 'Carpet spot treatment', 'Post-event cleanup'] },
]
const why = [
  ['doc', 'Flexible contracts', 'From regular scheduled work to bespoke agreements, with pricing and scope set by property size and service frequency.'],
  ['shield', 'Quality assurance', 'Photo-verified handovers, checklists and supervisor spot checks available for multi-site accounts.'],
  ['people', 'Scalable teams', 'Crews scale for peak periods or special cleans, with consistent management and reporting.'],
  ['chat', 'Clear communication', 'Operational coordination that helps keep properties ready for guests and workplaces running smoothly.'],
]
const trust = [
  ['shield', 'Public liability', 'Certificate available on request.'],
  ['hat', 'Workers compensation', 'NSW registered.'],
  ['person', 'Insured teams, safety-checked staff', 'Vetted staff and routine quality checks.'],
]
const steps = [
  ['doc', 'Tell us about your space.', 'Share your property type, cleaning requirements and preferred schedule.'],
  ['chat', 'Get a tailored plan.', 'The team discusses your needs and prepares a quote based on your property and service requirements.'],
  ['spark', 'Let us handle the clean.', 'Agree on the scope and schedule, then the cleaning team gets to work.'],
]
// PLACEHOLDER testimonials for design testing. Replace with real client quotes before launch.
const quotes = [
  { q: 'Our rooms are guest-ready every single turnover. Fewer complaints, better reviews, and I no longer chase anyone for updates.', n: 'Sarah M.', r: 'Motel Owner', t: 'Accommodation turnovers' },
  { q: 'The office has never looked better. The team is quiet, thorough and gone before we arrive. Exactly what we wanted.', n: 'David K.', r: 'Office Manager', t: 'Commercial & office' },
  { q: 'We had a last-minute post-event cleanup and they scaled the crew overnight. The venue was spotless by morning.', n: 'Priya R.', r: 'Events Coordinator', t: 'Specialist & event' },
  { q: 'The photo handovers give me peace of mind across all three of our sites. I can see the work without being there.', n: 'James T.', r: 'Property Manager', t: 'Multi-site contract' },
  { q: 'Clear communication, fair pricing and a team that actually turns up when they say they will. Easy to recommend.', n: 'Linda W.', r: 'Business Owner', t: 'Regular contract' },
]
const initials = (n) => n.split(' ').map((x) => x[0]).join('')

function ServicesMenu({ onPick }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  useEffect(() => {
    const away = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    const esc = (e) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('pointerdown', away); document.addEventListener('keydown', esc)
    return () => { document.removeEventListener('pointerdown', away); document.removeEventListener('keydown', esc) }
  }, [])
  const hover = () => typeof window !== 'undefined' && window.matchMedia('(hover:hover)').matches
  const pick = (k) => {
    setOpen(false); onPick && onPick()
    setTimeout(() => window.dispatchEvent(new CustomEvent('open-service', { detail: k })), 450)
  }
  return (
    <div className={`dd ${open ? 'open' : ''}`} ref={ref}
      onMouseEnter={() => hover() && setOpen(true)} onMouseLeave={() => hover() && setOpen(false)}
      onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setOpen(false) }}>
      <button className="dd-btn" aria-haspopup="true" aria-expanded={open} onClick={() => setOpen(!open)}>Services <i aria-hidden="true" /></button>
      <div className="dd-menu">
        {services.map((x, k) => (
          <a key={x.n} href="#services" onClick={() => pick(k)}>
            <span className="dd-thumb" style={{ backgroundImage: `url(${img(x.i)})` }} aria-hidden="true" />
            <span><b>{x.t}</b><small>{x.s}</small></span>
          </a>
        ))}
        <a className="dd-all" href="#contact" onClick={() => setOpen(false)}>Not sure which you need? <b>Get a quote →</b></a>
      </div>
    </div>
  )
}

function Header() {
  const [open, setOpen] = useState(false)
  const { top, p } = useScroll()
  return (
    <header className={`header ${top > 20 ? 'scrolled' : ''}`}>
      <span className="progress" style={{ transform: `scaleX(${p})` }} />
      <Logo />
      <nav className={open ? 'open' : ''} aria-label="Main" onClick={(e) => { if (e.target.closest('a')) setOpen(false) }}>
        <ServicesMenu onPick={() => setOpen(false)} /><a href="#why">Capabilities</a>
        <a href="#compliance">Compliance</a><a href="#process">About</a><a href="#faq">FAQ</a><a href="#contact">Contact</a>
      </nav>
      <a className="call" href="tel:0410093803">Call us</a>
      <a className="btn btn-sm" href="#contact">Get a Quote <Arrow /></a>
      <button className="burger" onClick={() => setOpen(!open)} aria-label="Toggle menu" aria-expanded={open}>☰</button>
    </header>
  )
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-copy">
        <p className="eyebrow hl" style={{ '--d': 0 }}>Sydney · Commercial & Accommodation Cleaning</p>
        <h1 className="hl" style={{ '--d': 1 }}><span className="sr">Commercial and accommodation cleaning in Sydney. </span>A higher standard of <em>clean.</em></h1>
        <p className="lead hl" style={{ '--d': 2 }}>Trusted cleaning for motels, <b>workplaces</b> and shared spaces. Regular contracts, one-off cleans or bespoke packages for events and deep cleans.</p>
        <div className="cta-row hl" style={{ '--d': 3 }}>
          <a className="btn" href="#contact">Let’s Talk About Your Space <Arrow /></a>
          <a className="btn btn-ghost" href="#services">Explore Our Services ↓</a>
        </div>
        <ul className="chips hl" style={{ '--d': 4 }}>
          {['Reliable Teams', 'Quality Cleaning', 'Flexible Plans'].map((c) => <li key={c}><i />{c}</li>)}
        </ul>
      </div>
      <div className="hero-img" style={{ '--bg': `url(${img('01_hero_office.jpg')})`, '--pos': '74% 50%' }} role="img" aria-label="Cleaner polishing an office floor">
        <div className="badge">✦ Clean spaces.<br />Confident teams.</div>
      </div>
    </section>
  )
}

function ServiceCard({ s, k }) {
  const [open, setOpen] = useState(false)
  const [quote, setQuote] = useState(false)
  const [st, setSt] = useState('idle') // idle | sending | sent | mailto | error
  const sendQuote = async (e) => {
    e.preventDefault()
    const d = Object.fromEntries(new FormData(e.currentTarget))
    setSt('sending')
    try { setSt(await sendEnquiry({ ...d, service: s.t }, `Quote request: ${s.t}`)) } catch { setSt('error') }
  }
  useEffect(() => {
    const on = (e) => setOpen(e.detail === k)
    window.addEventListener('open-service', on)
    return () => window.removeEventListener('open-service', on)
  }, [k])
  return (
    <article className={`card ${open ? 'open' : ''}`} data-reveal style={{ '--bg': `url(${img(s.i)})`, '--d': k }}>
      <div className="card-body">
        <h3>{s.t}</h3>
        <div className="reveal"><div>
          <p><b>{s.s}</b></p><p>{s.d}</p>
          <button className="tog" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls={`inc-${k}`}>
            <span className="plus" aria-hidden="true">+</span>{open ? 'Hide details' : 'What’s included'}
          </button>
        </div></div>
        <div className="inc" id={`inc-${k}`}><div>
          <h4>What’s included</h4>
          <ul>{s.inc.map((x) => <li key={x}>{x}</li>)}</ul>
          {!quote ? (
            <button className="q" onClick={() => setQuote(true)}>Get a quote for this →</button>
          ) : st === 'sent' || st === 'mailto' ? (
            <p className="qthanks" role="status">{st === 'sent' ? 'Thanks! We’ll reply within 1 business day.' : 'Your email app should open with your message ready to send.'}</p>
          ) : (
            <form className="qform" onSubmit={sendQuote}>
              <label className="sr" htmlFor={`qm-${k}`}>Your message</label>
              <textarea id={`qm-${k}`} name="message" required rows="3" autoFocus placeholder={`Tell us a little about your space and what you need for ${s.t.toLowerCase()}…`} />
              <label className="sr" htmlFor={`qc-${k}`}>Your phone or email</label>
              <input id={`qc-${k}`} name="contact" required placeholder="Your phone or email, so we can reply" />
              <input className="hp" name="_gotcha" tabIndex="-1" autoComplete="off" aria-hidden="true" />
              {st === 'error' && <p className="qerr" role="alert">That didn’t send. Please try again or call 0410 093 803.</p>}
              <button className="q" type="submit" disabled={st === 'sending'}>{st === 'sending' ? 'Sending…' : 'Send message →'}</button>
            </form>
          )}
        </div></div>
      </div>
    </article>
  )
}

const Services = () => (
  <>
    <div className="strip" aria-label="Accommodation, commercial and specialist cleaning in Sydney, NSW">
      <div className="strip-track">
        {[0, 1].map((i) => (
          <div className="strip-set" key={i} aria-hidden={i === 1 ? 'true' : undefined}>
            <span>Accommodation Cleaning</span><span>/</span><span>Commercial Cleaning</span><span>/</span><span>Specialist Cleaning</span><span className="r">Sydney, NSW →</span>
          </div>
        ))}
      </div>
    </div>
    <section className="section" id="services">
      <div className="split-head" data-reveal>
        <div><p className="eyebrow blue">Our Services</p><h2>Tailored cleaning for every space.</h2></div>
        <p className="muted">From guest rooms to office spaces and specialist jobs, we deliver reliable, high-quality cleaning solutions for a range of commercial and accommodation properties.</p>
      </div>
      <div className="cards">
        {services.map((s) => <ServiceCard key={s.n} s={s} k={services.indexOf(s)} />)}
      </div>
      <ul className="checks" data-reveal>
        {['Vetted staff and routine quality checks', 'Flexible scheduling: nightly, weekly or on demand', 'Tailored scopes; consumables management on request'].map((c) => <li key={c}><span>✓</span>{c}</li>)}
      </ul>
    </section>
  </>
)

const Why = () => (
  <section className="why" id="why">
    <span className="why-glow" aria-hidden="true" />
    <div className="why-in">
      <div data-reveal>
        <p className="eyebrow cyan">Why Stamp Cleaning?</p>
        <h2>Reliability isn’t an extra. <em>It’s the standard.</em></h2>
        <p className="lead">We deliver consistent, high-quality cleaning with a focus on reliability, flexibility and clear communication — so your property is always ready for guests, clients and teams.</p>
        <a className="btn" href="#contact">Get a Quote <Arrow /></a>
      </div>
      <div className="why-grid">
        {why.map(([i, t, d]) => (
          <div key={t} className="why-item" data-reveal style={{ '--d': why.findIndex((w) => w[1] === t) }}><span className="ico"><Icon d={icons[i]} /></span><div><h3>{t}</h3><p>{d}</p></div></div>
        ))}
      </div>
    </div>
  </section>
)

const Compliance = () => (
  <section className="section compliance" id="compliance">
    <div data-reveal>
      <p className="eyebrow blue">Compliance & Trust</p>
      <h2>Professional standards. Peace of mind.</h2>
      <p className="muted">We take safety, compliance and insurance seriously, so you can have confidence in our team and our service. Certificates of Currency and policy details are available to partners and clients on request.</p>
    </div>
    <img data-reveal="zoom" src={img('05_cleaning_team.jpg')} alt="Stamp cleaner wiping a surface" />
    <div className="trust">
      {trust.map(([i, t, d]) => (
        <div key={t} className="trust-item" data-reveal="right" style={{ '--d': trust.findIndex((w) => w[1] === t) }}><span className="ico dark"><Icon d={icons[i]} /></span><div><h3>{t}</h3><p>{d}</p></div></div>
      ))}
    </div>
  </section>
)

const Process = () => (
  <section className="section process" id="process">
    <div data-reveal><p className="eyebrow blue">How It Works</p><h2>A simple process. A cleaner space.</h2></div>
    <ol className="steps" data-reveal>
      {steps.map(([i, t, d], k) => (
        <li key={t} style={{ '--d': k }}><span className="num sm">{String(k + 1).padStart(2, '0')}</span><span className="ico plain"><Icon d={icons[i]} /></span><h3>{t}</h3><p>{d}</p></li>
      ))}
    </ol>
  </section>
)

function Testimonials() {
  const track = useRef(null)
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)
  const to = (n) => {
    const t = track.current, c = t && t.children[n]
    if (c) t.scrollTo({ left: c.offsetLeft - (t.clientWidth - c.offsetWidth) / 2, behavior: 'smooth' })
  }
  const go = (d) => to((i + d + quotes.length) % quotes.length)
  const onScroll = () => {
    const t = track.current, mid = t.scrollLeft + t.clientWidth / 2
    let best = 0, dist = Infinity
    ;[...t.children].forEach((c, k) => { const d = Math.abs(c.offsetLeft + c.offsetWidth / 2 - mid); if (d < dist) { dist = d; best = k } })
    setI(best)
  }
  return (
    <section className="tsec" aria-roledescription="carousel" aria-label="Client testimonials">
      <div className="thead" data-reveal>
        <div><p className="eyebrow blue">What Our Clients Say</p><h2>Trusted by businesses and accommodation providers.</h2></div>
        <div className="tctl">
          <button onClick={() => go(-1)} aria-label="Previous testimonial">←</button>
          <button onClick={() => go(1)} aria-label="Next testimonial">→</button>
        </div>
      </div>
      <div className="ttrack" ref={track} onScroll={onScroll} data-reveal onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)} onTouchStart={() => setPaused(true)}>
        {quotes.map((x, k) => (
          <figure key={x.n} className={`tcard ${k === i ? 'active' : ''}`} onClick={() => to(k)} aria-label={`${k + 1} of ${quotes.length}`}>
            <span className="tmark" aria-hidden="true">“</span>
            <div className="stars" role="img" aria-label="5 out of 5 stars">★★★★★</div>
            <blockquote>{x.q}</blockquote>
            <figcaption>
              <span className="avatar" aria-hidden="true">{initials(x.n)}</span>
              <span><b>{x.n}</b><br />{x.r}, Sydney</span>
              <span className="tag">{x.t}</span>
            </figcaption>
          </figure>
        ))}
      </div>
      <div className="tdots" role="tablist" aria-label="Choose testimonial">
        {quotes.map((x, k) => (
          <button key={x.n} role="tab" aria-selected={k === i} aria-label={`Show testimonial ${k + 1}`} className={k === i ? 'on' : ''} onClick={() => to(k)}>
            {k === i && <span key={`${i}-${paused}`} style={{ animationPlayState: paused ? 'paused' : 'running' }} onAnimationEnd={() => go(1)} />}
          </button>
        ))}
      </div>
    </section>
  )
}

function FAQ() {
  const [open, setOpen] = useState(0)
  return (
    <section className="section faq" id="faq">
      <div data-reveal><p className="eyebrow blue">Questions</p><h2>Answers before you ask.</h2>
        <p className="muted">Can’t see yours? <a href="#contact">Send us an enquiry</a> or call <a href="tel:0410093803">0410 093 803</a>.</p></div>
      <div className="acc" data-reveal>
        {faqs.map(([q, a], i) => (
          <div key={q} className={`acc-item ${open === i ? 'open' : ''}`}>
            <h3><button id={`q${i}`} aria-expanded={open === i} aria-controls={`a${i}`} onClick={() => setOpen(open === i ? -1 : i)}>{q}<span aria-hidden="true" /></button></h3>
            <div id={`a${i}`} role="region" aria-labelledby={`q${i}`} className="acc-body"><p>{a}</p></div>
          </div>
        ))}
      </div>
    </section>
  )
}

function MobileBar() {
  const { top } = useScroll()
  return (
    <div className={`mbar ${top > 400 ? 'show' : ''}`}>
      <a href="tel:0410093803" className="btn btn-ghost">☎ Call</a>
      <a href="#contact" className="btn">Get a Quote <Arrow /></a>
    </div>
  )
}

const WA = 'https://wa.me/61410093803?text=' + encodeURIComponent('Hi Stamp Cleaning, I’d like a quote for ')

const pairs = [
  { k: 'office', label: 'Office', b: 'office-before.jpg', a: 'office-after.jpg', altB: 'Open-plan office before cleaning, with rubbish and dirty floors', altA: 'The same office after a Stamp clean, spotless and polished' },
  { k: 'room', label: 'Accommodation', b: 'room-before.jpg', a: 'room-after.jpg', altB: 'Hotel room before cleaning, with an unmade bed and rubbish', altA: 'The same hotel room after a Stamp turnover clean' },
]

function BeforeAfter() {
  const [tab, setTab] = useState(0)
  const cur = pairs[tab]
  const [pos, setPos] = useState(50)
  const [touched, setTouched] = useState(false)
  const box = useRef(null), drag = useRef(false)
  const set = (x) => { const r = box.current.getBoundingClientRect(); setPos(Math.min(100, Math.max(0, ((x - r.left) / r.width) * 100))); setTouched(true) }
  const choose = (k) => { setTab(k); setPos(50) }
  const key = (e) => { if (e.key === 'ArrowLeft') { setPos((p) => Math.max(0, p - 5)); setTouched(true) } if (e.key === 'ArrowRight') { setPos((p) => Math.min(100, p + 5)); setTouched(true) } }
  return (
    <section className="section ba" id="results">
      
      <div className="split-head" data-reveal>
        <div><p className="eyebrow blue">The Difference</p><h2>See a Stamp clean for yourself.</h2></div>
        <p className="muted">Drag the slider to compare the same space before and after our team has been through. Choose an office or accommodation below.</p>
      </div>
      <div className="ba-tabs" role="tablist" aria-label="Choose a space" data-reveal>
        {pairs.map((x, k) => <button key={x.k} role="tab" aria-selected={k === tab} className={k === tab ? 'on' : ''} onClick={() => choose(k)}>{x.label}</button>)}
      </div>
      <div className="ba-box" ref={box} data-reveal="zoom" style={{ '--p': `${pos}%` }}
        onPointerDown={(e) => { drag.current = true; e.currentTarget.setPointerCapture(e.pointerId); set(e.clientX) }}
        onPointerMove={(e) => drag.current && set(e.clientX)}
        onPointerUp={() => (drag.current = false)} onPointerCancel={() => (drag.current = false)}>
        {pairs.map((x, k) => (
          <div key={x.k} className={`ba-pair ${k === tab ? 'on' : ''}`} aria-hidden={k !== tab}>
            <img className="ba-img" src={img(x.b)} alt={x.altB} draggable="false" loading="lazy" />
            <img className="ba-img ba-after" src={img(x.a)} alt={x.altA} draggable="false" loading="lazy" />
          </div>
        ))}
        <span className="ba-label l">Before</span><span className="ba-label r">After</span>
        <div className="ba-handle" role="slider" tabIndex={0} aria-label="Before and after comparison" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(pos)} onKeyDown={key}><span>◂ ▸</span></div>
        <span className={`ba-hint ${touched ? 'gone' : ''}`}>Drag to compare</span>
      </div>
    </section>
  )
}

// Only locations the client has actually stated: Hurstville NSW 2220 (address), servicing Sydney and surrounds.
const HOME = [-33.9667, 151.102]

function ServiceArea() {
  const el = useRef(null), map = useRef(null)
  useEffect(() => {
    let dead = false
    const start = async () => {
      const L = (await import('leaflet')).default
      if (dead || !el.current || map.current) return
      const m = L.map(el.current, { scrollWheelZoom: false, dragging: !L.Browser.mobile, tap: false }).setView(HOME, 11)
      map.current = m
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '© OpenStreetMap contributors' }).addTo(m)
      L.circleMarker(HOME, { radius: 12, color: '#fff', weight: 3, fillColor: '#0b2d57', fillOpacity: 1 })
        .addTo(m).bindTooltip('Stamp Cleaning, Hurstville NSW 2220', { direction: 'top', offset: [0, -8], permanent: true })
    }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { start(); io.disconnect() } }, { rootMargin: '300px' })
    io.observe(el.current)
    return () => { dead = true; io.disconnect(); if (map.current) { map.current.remove(); map.current = null } }
  }, [])
  return (
    <section className="section area" id="areas">
      <div data-reveal>
        <p className="eyebrow blue">Service Area</p>
        <h2>Where we clean.</h2>
        <p className="muted">Based in Hurstville and servicing Sydney and surrounding areas, for accommodation providers, offices and commercial properties.</p>
        <ul className="details">
          <li><span>⌖</span>Based in Hurstville NSW 2220</li>
          <li><span>◎</span>Servicing Sydney and surrounding areas</li>
        </ul>
        <p className="muted small">Not sure we cover your site? <a href="#contact">Ask us</a> and we’ll let you know.</p>
      </div>
      <div className="map-wrap" data-reveal="zoom"><div ref={el} className="map" role="region" aria-label="Map showing our Hurstville base" /></div>
    </section>
  )
}

function WhatsApp() {
  const { top } = useScroll()
  return (
    <a className={`wa ${top > 400 ? 'up' : ''}`} href={WA} target="_blank" rel="noopener noreferrer" aria-label="Chat with Stamp Cleaning on WhatsApp">
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" aria-hidden="true">
        <path d="M12 3a9 9 0 00-7.8 13.5L3 21l4.6-1.2A9 9 0 1012 3z" stroke="#fff" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M9 8.5c0 3.5 3 6.5 6.5 6.5l1-1.5-2-1-1 .8c-1-.4-2-1.4-2.4-2.4l.8-1-1-2z" fill="#fff" />
      </svg>
      <span>Chat on WhatsApp</span>
    </a>
  )
}

const EJS = { service: EMAILJS.serviceId, template: EMAILJS.templateId, key: EMAILJS.publicKey }
const EJS_READY = Boolean(EJS.service && EJS.template && EJS.key)
const EMAIL = 'contact@stampcleaning.com'

// Sends every enquiry (main form + service-card boxes) through EmailJS. Until the IDs are added it falls back to the visitor's email app.
let lastSent = 0
async function sendEnquiry(data, subject) {
  if (data._gotcha) return 'sent' // honeypot: bots fill this hidden field
  if (!EJS_READY) {
    const body = Object.entries(data).filter(([k]) => k !== '_gotcha').map(([k, v]) => `${k}: ${v}`).join('\n')
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    return 'mailto'
  }
  if (Date.now() - lastSent < 15000) throw new Error('too fast') // simple spam guard
  const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      service_id: EJS.service,
      template_id: EJS.template,
      user_id: EJS.key,
      template_params: {
        subject,
        name: data.name || '(not given)',
        email: data.email || '(not given)',
        phone: data.phone || '(not given)',
        contact: data.contact || '',
        property: data.property || data.service || '(not given)',
        service: data.service || '',
        message: data.message || '(no message)',
        reply_to: data.email || data.contact || '',
      },
    }),
  })
  if (!res.ok) throw new Error(await res.text())
  lastSent = Date.now()
  return 'sent'
}

function SentCheck() {
  return (
    <div className="sent-art" aria-hidden="true">
      <span className="ring r1" /><span className="ring r2" />
      <svg viewBox="0 0 52 52" width="84" height="84">
        <circle className="sc-circle" cx="26" cy="26" r="23" fill="none" strokeWidth="3" />
        <path className="sc-tick" d="M15 27l8 8 15-17" fill="none" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => <i key={i} style={{ '--a': `${i * 45}deg` }} />)}
    </div>
  )
}

function Contact() {
  const [status, setStatus] = useState('idle') // idle | sending | sent | mailto | error
  const [prop, setProp] = useState('')
  async function submit(e) {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(e.currentTarget))
    if (data.property === 'Other') data.property = `Other: ${data.propertyOther}`
    delete data.propertyOther
    setStatus('sending')
    try { setStatus(await sendEnquiry(data, 'Quote request from stampcleaning.com')) } catch { setStatus('error') }
  }
  const reset = () => { setProp(''); setStatus('idle') }
  return (
    <section className="contact" id="contact">
      <div className="contact-img" data-reveal="zoom" style={{ '--bg': `url(${img('07_contact_building.jpg')})` }}><span>Sydney & Surrounding Areas</span></div>
      <div className="contact-info" data-reveal>
        <p className="eyebrow blue">Get in Touch</p>
        <h2>Your space deserves a better standard.</h2>
        <p className="muted">Tell us about your site and we’ll propose a tailored cleaning plan and a clear quote. We reply within 1 business day.</p>
        <ul className="details">
          <li><span>☎</span><a href="tel:0410093803">0410 093 803</a></li><li><span>✉</span><a href="mailto:contact@stampcleaning.com">contact@stampcleaning.com</a></li><li><span>✆</span><a href={WA} target="_blank" rel="noopener noreferrer">Message us on WhatsApp</a></li><li><span>⌖</span>Hurstville NSW 2220</li>
        </ul>
      </div>
      {status === 'sent' || status === 'mailto' ? (
        <div className="form thanks" role="status">
          <SentCheck />
          <h3>{status === 'sent' ? 'Message sent!' : 'Almost there!'}</h3>
          <p>{status === 'sent' ? <>Thank you. We’ll get back to you within 1 business day. If it’s urgent, call <a href="tel:0410093803">0410 093 803</a>.</> : 'Your email app has opened with your message ready. Press Send there to deliver it to us.'}</p>
          <button className="btn btn-ghost" onClick={reset}>Send another enquiry</button>
        </div>
      ) : (
        <form className="form" data-reveal="right" onSubmit={submit}>
          <div className="row">
            <label>Full Name *<input name="name" required autoComplete="name" placeholder="Your name" /></label>
            <label>Business Email *<input name="email" required type="email" autoComplete="email" placeholder="you@company.com" /></label>
          </div>
          <label>Phone Number *<input name="phone" required type="tel" autoComplete="tel" placeholder="Your phone number" /></label>
          <label>Property Type *
            <select name="property" required value={prop} onChange={(e) => setProp(e.target.value)}>
              <option value="" disabled>Select property type</option><option>Motel / Hotel</option><option>Short-stay accommodation</option><option>Office / Commercial</option><option>Other</option>
            </select>
          </label>
          <div className={`other ${prop === 'Other' ? 'show' : ''}`}><div>
            <label>What type of property? *<input name="propertyOther" required={prop === 'Other'} disabled={prop !== 'Other'} maxLength="80" placeholder="Tell us what kind of place it is" /></label>
          </div></div>
          <label>Message<textarea name="message" rows="3" placeholder="Write a short message: what you need, how often, anything we should know…" /></label>
          <input className="hp" name="_gotcha" tabIndex="-1" autoComplete="off" aria-hidden="true" />
          {status === 'error' && <p className="err" role="alert">Sorry, that didn’t send. Please try again, or call <a href="tel:0410093803">0410 093 803</a> or email <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.</p>}
          <button className="btn wide" type="submit" disabled={status === 'sending'}>{status === 'sending' ? 'Sending…' : <>Request My Quote <Arrow /></>}</button>
          <small className="fine">By submitting, you agree we may contact you about your enquiry.</small>
        </form>
      )}
    </section>
  )
}

const Footer = () => (
  <footer className="footer">
    <div className="foot-grid">
      <div><Logo light /><p>Professional cleaning solutions for accommodation providers, offices and commercial properties.</p></div>
      <div><h4>Services</h4><a href="#services">Accommodation Cleaning</a><a href="#services">Commercial & Office Cleaning</a><a href="#services">Specialist Cleaning</a></div>
      <div><h4>Company</h4><a href="#process">About Us</a><a href="#why">Capabilities</a><a href="#compliance">Compliance</a><a href="#contact">Contact</a></div>
      <div><h4>Service Area</h4><p>Hurstville, NSW<br />and surrounding areas</p></div>
      <div className="foot-cta"><a className="btn btn-sm" href="#contact">Get a Quote <Arrow /></a><a href="tel:0410093803">☎ 0410 093 803</a><a href="mailto:contact@stampcleaning.com">✉ contact@stampcleaning.com</a><p>⌖ Hurstville NSW 2220</p></div>
    </div>
    <div className="legal"><span>© {new Date().getFullYear()} Stamp Cleaning Pty Ltd. All rights reserved. ABN: 34 691 737 596</span></div>
  </footer>
)

export default function App() {
  useReveal()
  return (<><Header /><main><Hero /><Services /><Why /><Compliance /><Process /><BeforeAfter /><ServiceArea /><Testimonials /><FAQ /><Contact /></main><Footer /><MobileBar /><WhatsApp /></>)
}
