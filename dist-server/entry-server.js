import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { renderToString } from "react-dom/server";
import { useEffect, useState, useRef } from "react";
const faqs = [
  ["How is pricing worked out?", "Pricing and scope are set by property size, service frequency and the tasks you need. Tell us about your site and we’ll propose a tailored plan with a clear quote."],
  ["Do you only do regular contracts?", "No. We offer regular contracts, one-off cleans and bespoke packages for special events and deep cleans."],
  ["Are your cleaners insured and vetted?", "Yes. Our teams are insured, our staff are safety-checked, and we hold public liability and NSW workers compensation cover. Certificates of Currency are available on request."],
  ["Can you handle busy periods?", "Yes. We can scale crews for peak periods, larger sites and one-off jobs, with consistent management and reporting."],
  ["How do I know the work is up to standard?", "We use checklists and routine quality checks, and for multi-site accounts we can provide photo-verified handovers and supervisor spot checks."],
  ["Can you supply consumables?", "Consumables management is available on request, so you can leave supplies to us."],
  ["How quickly will I hear back?", "We reply to every enquiry within 1 business day. Call 0410 093 803 if it’s urgent."]
];
const EMAILJS = {
  serviceId: "service_4mxrlif",
  // Email Services → your service → Service ID
  templateId: "template_r00sqlr",
  // Email Templates → your template → Template ID
  publicKey: "XnuaXGqMsb395V_Bk"
  // Account → General → Public Key
};
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll("[data-reveal]");
    if (!("IntersectionObserver" in window)) {
      els.forEach((e) => e.setAttribute("data-in", ""));
      return;
    }
    const io = new IntersectionObserver((entries) => entries.forEach((en) => {
      if (en.isIntersecting) {
        en.target.setAttribute("data-in", "");
        io.unobserve(en.target);
      }
    }), { threshold: 0.15, rootMargin: "0px 0px -6% 0px" });
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, []);
}
function useScroll() {
  const [y, setY] = useState(0);
  useEffect(() => {
    const on = () => {
      const h = document.documentElement;
      setY({ top: h.scrollTop, p: h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight) });
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return y || { top: 0, p: 0 };
}
const img = (n) => `/images/${n}`;
const Arrow = () => /* @__PURE__ */ jsx("span", { "aria-hidden": "true", children: "→" });
const Logo = ({ light }) => /* @__PURE__ */ jsxs("a", { href: "#top", className: `logo ${light ? "light" : ""}`, "aria-label": "Stamp Cleaning", children: [
  /* @__PURE__ */ jsx("img", { src: `/images/${light ? "logo-light" : "logo"}.png`, alt: "", width: "48", height: "44" }),
  /* @__PURE__ */ jsx("span", { children: "STAMP" })
] });
const Icon = ({ d }) => /* @__PURE__ */ jsx("svg", { viewBox: "0 0 24 24", width: "28", height: "28", fill: "none", stroke: "currentColor", strokeWidth: "1.6", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", children: d.map((p, i) => /* @__PURE__ */ jsx("path", { d: p }, i)) });
const icons = {
  doc: ["M6 3h8l4 4v14H6z", "M14 3v4h4", "M9 12h6M9 16h6"],
  shield: ["M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z", "M8.5 12l2.5 2.5L16 9.5"],
  people: ["M9 11a3 3 0 100-6 3 3 0 000 6z", "M3 20c0-3.5 2.7-6 6-6s6 2.5 6 6", "M16 5a3 3 0 010 6", "M18 14c2 .6 3 2.6 3 6"],
  chat: ["M4 5h16v11H9l-5 4z", "M8 9h8M8 12h5"],
  hat: ["M4 17h16", "M6 17a6 6 0 0112 0", "M12 7v4"],
  person: ["M12 12a4 4 0 100-8 4 4 0 000 8z", "M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7"],
  spark: ["M12 3l2 6 6 2-6 2-2 6-2-6-6-2 6-2z"]
};
const services = [
  { n: "01", t: "Accommodation Turnovers", s: "Guest-ready rooms. Seamless turnovers.", d: "Professional room turnover and presentation cleans for hotels, motels and short-stay accommodation, with quick turnaround and reliable checklists.", i: "02_accommodation_bedroom.jpg", inc: ["Bed making and linen changeover", "Bathroom and kitchenette clean", "Floors, surfaces and bins", "Room-by-room checklist sign-off"] },
  { n: "02", t: "Commercial & Office", s: "Workspaces that work better.", d: "Scheduled office cleaning, reception and lobby upkeep, meeting room refreshes, and communal area maintenance.", i: "03_commercial_office.jpg", inc: ["Workstations, floors and bins", "Reception and lobby upkeep", "Meeting room refreshes", "Kitchens, bathrooms and communal areas"] },
  { n: "03", t: "Specialist & Event", s: "Big cleans. Special requirements.", d: "Deep cleaning, end-of-lease, carpet spot treatment and post-event cleanup. We can scale teams for larger or one-off jobs.", i: "04_specialist_cleaning.jpg", inc: ["Deep cleaning", "End-of-lease cleaning", "Carpet spot treatment", "Post-event cleanup"] }
];
const why = [
  ["doc", "Flexible contracts", "From regular scheduled work to bespoke agreements, with pricing and scope set by property size and service frequency."],
  ["shield", "Quality assurance", "Photo-verified handovers, checklists and supervisor spot checks available for multi-site accounts."],
  ["people", "Scalable teams", "Crews scale for peak periods or special cleans, with consistent management and reporting."],
  ["chat", "Clear communication", "Operational coordination that helps keep properties ready for guests and workplaces running smoothly."]
];
const trust = [
  ["shield", "Public liability", "Certificate available on request."],
  ["hat", "Workers compensation", "NSW registered."],
  ["person", "Insured teams, safety-checked staff", "Vetted staff and routine quality checks."]
];
const steps = [
  ["doc", "Tell us about your space.", "Share your property type, cleaning requirements and preferred schedule."],
  ["chat", "Get a tailored plan.", "The team discusses your needs and prepares a quote based on your property and service requirements."],
  ["spark", "Let us handle the clean.", "Agree on the scope and schedule, then the cleaning team gets to work."]
];
const quotes = [
  { q: "Our rooms are guest-ready every single turnover. Fewer complaints, better reviews, and I no longer chase anyone for updates.", n: "Sarah M.", r: "Motel Owner", t: "Accommodation turnovers" },
  { q: "The office has never looked better. The team is quiet, thorough and gone before we arrive. Exactly what we wanted.", n: "David K.", r: "Office Manager", t: "Commercial & office" },
  { q: "We had a last-minute post-event cleanup and they scaled the crew overnight. The venue was spotless by morning.", n: "Priya R.", r: "Events Coordinator", t: "Specialist & event" },
  { q: "The photo handovers give me peace of mind across all three of our sites. I can see the work without being there.", n: "James T.", r: "Property Manager", t: "Multi-site contract" },
  { q: "Clear communication, fair pricing and a team that actually turns up when they say they will. Easy to recommend.", n: "Linda W.", r: "Business Owner", t: "Regular contract" }
];
const initials = (n) => n.split(" ").map((x) => x[0]).join("");
function ServicesMenu({ onPick }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const away = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    const esc = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", away);
    document.addEventListener("keydown", esc);
    return () => {
      document.removeEventListener("pointerdown", away);
      document.removeEventListener("keydown", esc);
    };
  }, []);
  const hover = () => typeof window !== "undefined" && window.matchMedia("(hover:hover)").matches;
  const pick = (k) => {
    setOpen(false);
    onPick && onPick();
    setTimeout(() => window.dispatchEvent(new CustomEvent("open-service", { detail: k })), 450);
  };
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: `dd ${open ? "open" : ""}`,
      ref,
      onMouseEnter: () => hover() && setOpen(true),
      onMouseLeave: () => hover() && setOpen(false),
      onBlur: (e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setOpen(false);
      },
      children: [
        /* @__PURE__ */ jsxs("button", { className: "dd-btn", "aria-haspopup": "true", "aria-expanded": open, onClick: () => setOpen(!open), children: [
          "Services ",
          /* @__PURE__ */ jsx("i", { "aria-hidden": "true" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "dd-menu", children: [
          services.map((x, k) => /* @__PURE__ */ jsxs("a", { href: "#services", onClick: () => pick(k), children: [
            /* @__PURE__ */ jsx("span", { className: "dd-thumb", style: { backgroundImage: `url(${img(x.i)})` }, "aria-hidden": "true" }),
            /* @__PURE__ */ jsxs("span", { children: [
              /* @__PURE__ */ jsx("b", { children: x.t }),
              /* @__PURE__ */ jsx("small", { children: x.s })
            ] })
          ] }, x.n)),
          /* @__PURE__ */ jsxs("a", { className: "dd-all", href: "#contact", onClick: () => setOpen(false), children: [
            "Not sure which you need? ",
            /* @__PURE__ */ jsx("b", { children: "Get a quote →" })
          ] })
        ] })
      ]
    }
  );
}
function Header() {
  const [open, setOpen] = useState(false);
  const { top, p } = useScroll();
  return /* @__PURE__ */ jsxs("header", { className: `header ${top > 20 ? "scrolled" : ""}`, children: [
    /* @__PURE__ */ jsx("span", { className: "progress", style: { transform: `scaleX(${p})` } }),
    /* @__PURE__ */ jsx(Logo, {}),
    /* @__PURE__ */ jsxs("nav", { className: open ? "open" : "", "aria-label": "Main", onClick: (e) => {
      if (e.target.closest("a")) setOpen(false);
    }, children: [
      /* @__PURE__ */ jsx(ServicesMenu, { onPick: () => setOpen(false) }),
      /* @__PURE__ */ jsx("a", { href: "#why", children: "Capabilities" }),
      /* @__PURE__ */ jsx("a", { href: "#compliance", children: "Compliance" }),
      /* @__PURE__ */ jsx("a", { href: "#process", children: "About" }),
      /* @__PURE__ */ jsx("a", { href: "#faq", children: "FAQ" }),
      /* @__PURE__ */ jsx("a", { href: "#contact", children: "Contact" })
    ] }),
    /* @__PURE__ */ jsx("a", { className: "call", href: "tel:0410093803", children: "Call us" }),
    /* @__PURE__ */ jsxs("a", { className: "btn btn-sm", href: "#contact", children: [
      "Get a Quote ",
      /* @__PURE__ */ jsx(Arrow, {})
    ] }),
    /* @__PURE__ */ jsx("button", { className: "burger", onClick: () => setOpen(!open), "aria-label": "Toggle menu", "aria-expanded": open, children: "☰" })
  ] });
}
function Hero() {
  return /* @__PURE__ */ jsxs("section", { className: "hero", id: "top", children: [
    /* @__PURE__ */ jsxs("div", { className: "hero-copy", children: [
      /* @__PURE__ */ jsx("p", { className: "eyebrow hl", style: { "--d": 0 }, children: "Sydney · Commercial & Accommodation Cleaning" }),
      /* @__PURE__ */ jsxs("h1", { className: "hl", style: { "--d": 1 }, children: [
        /* @__PURE__ */ jsx("span", { className: "sr", children: "Commercial and accommodation cleaning in Sydney. " }),
        "A higher standard of ",
        /* @__PURE__ */ jsx("em", { children: "clean." })
      ] }),
      /* @__PURE__ */ jsxs("p", { className: "lead hl", style: { "--d": 2 }, children: [
        "Trusted cleaning for motels, ",
        /* @__PURE__ */ jsx("b", { children: "workplaces" }),
        " and shared spaces. Regular contracts, one-off cleans or bespoke packages for events and deep cleans."
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "cta-row hl", style: { "--d": 3 }, children: [
        /* @__PURE__ */ jsxs("a", { className: "btn", href: "#contact", children: [
          "Let’s Talk About Your Space ",
          /* @__PURE__ */ jsx(Arrow, {})
        ] }),
        /* @__PURE__ */ jsx("a", { className: "btn btn-ghost", href: "#services", children: "Explore Our Services ↓" })
      ] }),
      /* @__PURE__ */ jsx("ul", { className: "chips hl", style: { "--d": 4 }, children: ["Reliable Teams", "Quality Cleaning", "Flexible Plans"].map((c) => /* @__PURE__ */ jsxs("li", { children: [
        /* @__PURE__ */ jsx("i", {}),
        c
      ] }, c)) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "hero-img", style: { "--bg": `url(${img("01_hero_office.jpg")})`, "--pos": "74% 50%" }, role: "img", "aria-label": "Cleaner polishing an office floor", children: /* @__PURE__ */ jsxs("div", { className: "badge", children: [
      "✦ Clean spaces.",
      /* @__PURE__ */ jsx("br", {}),
      "Confident teams."
    ] }) })
  ] });
}
function ServiceCard({ s, k }) {
  const [open, setOpen] = useState(false);
  const [quote, setQuote] = useState(false);
  const [st, setSt] = useState("idle");
  const sendQuote = async (e) => {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(e.currentTarget));
    setSt("sending");
    try {
      setSt(await sendEnquiry({ ...d, service: s.t }, `Quote request: ${s.t}`));
    } catch {
      setSt("error");
    }
  };
  useEffect(() => {
    const on = (e) => setOpen(e.detail === k);
    window.addEventListener("open-service", on);
    return () => window.removeEventListener("open-service", on);
  }, [k]);
  return /* @__PURE__ */ jsx("article", { className: `card ${open ? "open" : ""}`, "data-reveal": true, style: { "--bg": `url(${img(s.i)})`, "--d": k }, children: /* @__PURE__ */ jsxs("div", { className: "card-body", children: [
    /* @__PURE__ */ jsx("h3", { children: s.t }),
    /* @__PURE__ */ jsx("div", { className: "reveal", children: /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx("b", { children: s.s }) }),
      /* @__PURE__ */ jsx("p", { children: s.d }),
      /* @__PURE__ */ jsxs("button", { className: "tog", onClick: () => setOpen(!open), "aria-expanded": open, "aria-controls": `inc-${k}`, children: [
        /* @__PURE__ */ jsx("span", { className: "plus", "aria-hidden": "true", children: "+" }),
        open ? "Hide details" : "What’s included"
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "inc", id: `inc-${k}`, children: /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h4", { children: "What’s included" }),
      /* @__PURE__ */ jsx("ul", { children: s.inc.map((x) => /* @__PURE__ */ jsx("li", { children: x }, x)) }),
      !quote ? /* @__PURE__ */ jsx("button", { className: "q", onClick: () => setQuote(true), children: "Get a quote for this →" }) : st === "sent" || st === "mailto" ? /* @__PURE__ */ jsx("p", { className: "qthanks", role: "status", children: st === "sent" ? "Thanks! We’ll reply within 1 business day." : "Your email app should open with your message ready to send." }) : /* @__PURE__ */ jsxs("form", { className: "qform", onSubmit: sendQuote, children: [
        /* @__PURE__ */ jsx("label", { className: "sr", htmlFor: `qm-${k}`, children: "Your message" }),
        /* @__PURE__ */ jsx("textarea", { id: `qm-${k}`, name: "message", required: true, rows: "3", autoFocus: true, placeholder: `Tell us a little about your space and what you need for ${s.t.toLowerCase()}…` }),
        /* @__PURE__ */ jsx("label", { className: "sr", htmlFor: `qc-${k}`, children: "Your phone or email" }),
        /* @__PURE__ */ jsx("input", { id: `qc-${k}`, name: "contact", required: true, placeholder: "Your phone or email, so we can reply" }),
        /* @__PURE__ */ jsx("input", { className: "hp", name: "_gotcha", tabIndex: "-1", autoComplete: "off", "aria-hidden": "true" }),
        st === "error" && /* @__PURE__ */ jsx("p", { className: "qerr", role: "alert", children: "That didn’t send. Please try again or call 0410 093 803." }),
        /* @__PURE__ */ jsx("button", { className: "q", type: "submit", disabled: st === "sending", children: st === "sending" ? "Sending…" : "Send message →" })
      ] })
    ] }) })
  ] }) });
}
const Services = () => /* @__PURE__ */ jsxs(Fragment, { children: [
  /* @__PURE__ */ jsx("div", { className: "strip", "aria-label": "Accommodation, commercial and specialist cleaning in Sydney, NSW", children: /* @__PURE__ */ jsx("div", { className: "strip-track", children: [0, 1].map((i) => /* @__PURE__ */ jsxs("div", { className: "strip-set", "aria-hidden": i === 1 ? "true" : void 0, children: [
    /* @__PURE__ */ jsx("span", { children: "Accommodation Cleaning" }),
    /* @__PURE__ */ jsx("span", { children: "/" }),
    /* @__PURE__ */ jsx("span", { children: "Commercial Cleaning" }),
    /* @__PURE__ */ jsx("span", { children: "/" }),
    /* @__PURE__ */ jsx("span", { children: "Specialist Cleaning" }),
    /* @__PURE__ */ jsx("span", { className: "r", children: "Sydney, NSW →" })
  ] }, i)) }) }),
  /* @__PURE__ */ jsxs("section", { className: "section", id: "services", children: [
    /* @__PURE__ */ jsxs("div", { className: "split-head", "data-reveal": true, children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "eyebrow blue", children: "Our Services" }),
        /* @__PURE__ */ jsx("h2", { children: "Tailored cleaning for every space." })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "muted", children: "From guest rooms to office spaces and specialist jobs, we deliver reliable, high-quality cleaning solutions for a range of commercial and accommodation properties." })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "cards", children: services.map((s) => /* @__PURE__ */ jsx(ServiceCard, { s, k: services.indexOf(s) }, s.n)) }),
    /* @__PURE__ */ jsx("ul", { className: "checks", "data-reveal": true, children: ["Vetted staff and routine quality checks", "Flexible scheduling: nightly, weekly or on demand", "Tailored scopes; consumables management on request"].map((c) => /* @__PURE__ */ jsxs("li", { children: [
      /* @__PURE__ */ jsx("span", { children: "✓" }),
      c
    ] }, c)) })
  ] })
] });
const Why = () => /* @__PURE__ */ jsxs("section", { className: "why", id: "why", children: [
  /* @__PURE__ */ jsx("span", { className: "why-glow", "aria-hidden": "true" }),
  /* @__PURE__ */ jsxs("div", { className: "why-in", children: [
    /* @__PURE__ */ jsxs("div", { "data-reveal": true, children: [
      /* @__PURE__ */ jsx("p", { className: "eyebrow cyan", children: "Why Stamp Cleaning?" }),
      /* @__PURE__ */ jsxs("h2", { children: [
        "Reliability isn’t an extra. ",
        /* @__PURE__ */ jsx("em", { children: "It’s the standard." })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "lead", children: "We deliver consistent, high-quality cleaning with a focus on reliability, flexibility and clear communication — so your property is always ready for guests, clients and teams." }),
      /* @__PURE__ */ jsxs("a", { className: "btn", href: "#contact", children: [
        "Get a Quote ",
        /* @__PURE__ */ jsx(Arrow, {})
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "why-grid", children: why.map(([i, t, d]) => /* @__PURE__ */ jsxs("div", { className: "why-item", "data-reveal": true, style: { "--d": why.findIndex((w) => w[1] === t) }, children: [
      /* @__PURE__ */ jsx("span", { className: "ico", children: /* @__PURE__ */ jsx(Icon, { d: icons[i] }) }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { children: t }),
        /* @__PURE__ */ jsx("p", { children: d })
      ] })
    ] }, t)) })
  ] })
] });
const Compliance = () => /* @__PURE__ */ jsxs("section", { className: "section compliance", id: "compliance", children: [
  /* @__PURE__ */ jsxs("div", { "data-reveal": true, children: [
    /* @__PURE__ */ jsx("p", { className: "eyebrow blue", children: "Compliance & Trust" }),
    /* @__PURE__ */ jsx("h2", { children: "Professional standards. Peace of mind." }),
    /* @__PURE__ */ jsx("p", { className: "muted", children: "We take safety, compliance and insurance seriously, so you can have confidence in our team and our service. Certificates of Currency and policy details are available to partners and clients on request." })
  ] }),
  /* @__PURE__ */ jsx("img", { "data-reveal": "zoom", src: img("05_cleaning_team.jpg"), alt: "Stamp cleaner wiping a surface" }),
  /* @__PURE__ */ jsx("div", { className: "trust", children: trust.map(([i, t, d]) => /* @__PURE__ */ jsxs("div", { className: "trust-item", "data-reveal": "right", style: { "--d": trust.findIndex((w) => w[1] === t) }, children: [
    /* @__PURE__ */ jsx("span", { className: "ico dark", children: /* @__PURE__ */ jsx(Icon, { d: icons[i] }) }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h3", { children: t }),
      /* @__PURE__ */ jsx("p", { children: d })
    ] })
  ] }, t)) })
] });
const Process = () => /* @__PURE__ */ jsxs("section", { className: "section process", id: "process", children: [
  /* @__PURE__ */ jsxs("div", { "data-reveal": true, children: [
    /* @__PURE__ */ jsx("p", { className: "eyebrow blue", children: "How It Works" }),
    /* @__PURE__ */ jsx("h2", { children: "A simple process. A cleaner space." })
  ] }),
  /* @__PURE__ */ jsx("ol", { className: "steps", "data-reveal": true, children: steps.map(([i, t, d], k) => /* @__PURE__ */ jsxs("li", { style: { "--d": k }, children: [
    /* @__PURE__ */ jsx("span", { className: "num sm", children: String(k + 1).padStart(2, "0") }),
    /* @__PURE__ */ jsx("span", { className: "ico plain", children: /* @__PURE__ */ jsx(Icon, { d: icons[i] }) }),
    /* @__PURE__ */ jsx("h3", { children: t }),
    /* @__PURE__ */ jsx("p", { children: d })
  ] }, t)) })
] });
function Testimonials() {
  const track = useRef(null);
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const to = (n) => {
    const t = track.current, c = t && t.children[n];
    if (c) t.scrollTo({ left: c.offsetLeft - (t.clientWidth - c.offsetWidth) / 2, behavior: "smooth" });
  };
  const go = (d) => to((i + d + quotes.length) % quotes.length);
  const onScroll = () => {
    const t = track.current, mid = t.scrollLeft + t.clientWidth / 2;
    let best = 0, dist = Infinity;
    [...t.children].forEach((c, k) => {
      const d = Math.abs(c.offsetLeft + c.offsetWidth / 2 - mid);
      if (d < dist) {
        dist = d;
        best = k;
      }
    });
    setI(best);
  };
  return /* @__PURE__ */ jsxs("section", { className: "tsec", "aria-roledescription": "carousel", "aria-label": "Client testimonials", children: [
    /* @__PURE__ */ jsxs("div", { className: "thead", "data-reveal": true, children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "eyebrow blue", children: "What Our Clients Say" }),
        /* @__PURE__ */ jsx("h2", { children: "Trusted by businesses and accommodation providers." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "tctl", children: [
        /* @__PURE__ */ jsx("button", { onClick: () => go(-1), "aria-label": "Previous testimonial", children: "←" }),
        /* @__PURE__ */ jsx("button", { onClick: () => go(1), "aria-label": "Next testimonial", children: "→" })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "ttrack", ref: track, onScroll, "data-reveal": true, onMouseEnter: () => setPaused(true), onMouseLeave: () => setPaused(false), onFocus: () => setPaused(true), onBlur: () => setPaused(false), onTouchStart: () => setPaused(true), children: quotes.map((x, k) => /* @__PURE__ */ jsxs("figure", { className: `tcard ${k === i ? "active" : ""}`, onClick: () => to(k), "aria-label": `${k + 1} of ${quotes.length}`, children: [
      /* @__PURE__ */ jsx("span", { className: "tmark", "aria-hidden": "true", children: "“" }),
      /* @__PURE__ */ jsx("div", { className: "stars", role: "img", "aria-label": "5 out of 5 stars", children: "★★★★★" }),
      /* @__PURE__ */ jsx("blockquote", { children: x.q }),
      /* @__PURE__ */ jsxs("figcaption", { children: [
        /* @__PURE__ */ jsx("span", { className: "avatar", "aria-hidden": "true", children: initials(x.n) }),
        /* @__PURE__ */ jsxs("span", { children: [
          /* @__PURE__ */ jsx("b", { children: x.n }),
          /* @__PURE__ */ jsx("br", {}),
          x.r,
          ", Sydney"
        ] }),
        /* @__PURE__ */ jsx("span", { className: "tag", children: x.t })
      ] })
    ] }, x.n)) }),
    /* @__PURE__ */ jsx("div", { className: "tdots", role: "tablist", "aria-label": "Choose testimonial", children: quotes.map((x, k) => /* @__PURE__ */ jsx("button", { role: "tab", "aria-selected": k === i, "aria-label": `Show testimonial ${k + 1}`, className: k === i ? "on" : "", onClick: () => to(k), children: k === i && /* @__PURE__ */ jsx("span", { style: { animationPlayState: paused ? "paused" : "running" }, onAnimationEnd: () => go(1) }, `${i}-${paused}`) }, x.n)) })
  ] });
}
function FAQ() {
  const [open, setOpen] = useState(0);
  return /* @__PURE__ */ jsxs("section", { className: "section faq", id: "faq", children: [
    /* @__PURE__ */ jsxs("div", { "data-reveal": true, children: [
      /* @__PURE__ */ jsx("p", { className: "eyebrow blue", children: "Questions" }),
      /* @__PURE__ */ jsx("h2", { children: "Answers before you ask." }),
      /* @__PURE__ */ jsxs("p", { className: "muted", children: [
        "Can’t see yours? ",
        /* @__PURE__ */ jsx("a", { href: "#contact", children: "Send us an enquiry" }),
        " or call ",
        /* @__PURE__ */ jsx("a", { href: "tel:0410093803", children: "0410 093 803" }),
        "."
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "acc", "data-reveal": true, children: faqs.map(([q, a], i) => /* @__PURE__ */ jsxs("div", { className: `acc-item ${open === i ? "open" : ""}`, children: [
      /* @__PURE__ */ jsx("h3", { children: /* @__PURE__ */ jsxs("button", { id: `q${i}`, "aria-expanded": open === i, "aria-controls": `a${i}`, onClick: () => setOpen(open === i ? -1 : i), children: [
        q,
        /* @__PURE__ */ jsx("span", { "aria-hidden": "true" })
      ] }) }),
      /* @__PURE__ */ jsx("div", { id: `a${i}`, role: "region", "aria-labelledby": `q${i}`, className: "acc-body", children: /* @__PURE__ */ jsx("p", { children: a }) })
    ] }, q)) })
  ] });
}
function MobileBar() {
  const { top } = useScroll();
  return /* @__PURE__ */ jsxs("div", { className: `mbar ${top > 400 ? "show" : ""}`, children: [
    /* @__PURE__ */ jsx("a", { href: "tel:0410093803", className: "btn btn-ghost", children: "☎ Call" }),
    /* @__PURE__ */ jsxs("a", { href: "#contact", className: "btn", children: [
      "Get a Quote ",
      /* @__PURE__ */ jsx(Arrow, {})
    ] })
  ] });
}
const WA = "https://wa.me/61410093803?text=" + encodeURIComponent("Hi Stamp Cleaning, I’d like a quote for ");
const pairs = [
  { k: "office", label: "Office", b: "office-before.jpg", a: "office-after.jpg", altB: "Open-plan office before cleaning, with rubbish and dirty floors", altA: "The same office after a Stamp clean, spotless and polished" },
  { k: "room", label: "Accommodation", b: "room-before.jpg", a: "room-after.jpg", altB: "Hotel room before cleaning, with an unmade bed and rubbish", altA: "The same hotel room after a Stamp turnover clean" }
];
function BeforeAfter() {
  const [tab, setTab] = useState(0);
  const [pos, setPos] = useState(50);
  const [touched, setTouched] = useState(false);
  const box = useRef(null), drag = useRef(false);
  const set = (x) => {
    const r = box.current.getBoundingClientRect();
    setPos(Math.min(100, Math.max(0, (x - r.left) / r.width * 100)));
    setTouched(true);
  };
  const choose = (k) => {
    setTab(k);
    setPos(50);
  };
  const key = (e) => {
    if (e.key === "ArrowLeft") {
      setPos((p) => Math.max(0, p - 5));
      setTouched(true);
    }
    if (e.key === "ArrowRight") {
      setPos((p) => Math.min(100, p + 5));
      setTouched(true);
    }
  };
  return /* @__PURE__ */ jsxs("section", { className: "section ba", id: "results", children: [
    /* @__PURE__ */ jsxs("div", { className: "split-head", "data-reveal": true, children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "eyebrow blue", children: "The Difference" }),
        /* @__PURE__ */ jsx("h2", { children: "See a Stamp clean for yourself." })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "muted", children: "Drag the slider to compare the same space before and after our team has been through. Choose an office or accommodation below." })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "ba-tabs", role: "tablist", "aria-label": "Choose a space", "data-reveal": true, children: pairs.map((x, k) => /* @__PURE__ */ jsx("button", { role: "tab", "aria-selected": k === tab, className: k === tab ? "on" : "", onClick: () => choose(k), children: x.label }, x.k)) }),
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: "ba-box",
        ref: box,
        "data-reveal": "zoom",
        style: { "--p": `${pos}%` },
        onPointerDown: (e) => {
          drag.current = true;
          e.currentTarget.setPointerCapture(e.pointerId);
          set(e.clientX);
        },
        onPointerMove: (e) => drag.current && set(e.clientX),
        onPointerUp: () => drag.current = false,
        onPointerCancel: () => drag.current = false,
        children: [
          pairs.map((x, k) => /* @__PURE__ */ jsxs("div", { className: `ba-pair ${k === tab ? "on" : ""}`, "aria-hidden": k !== tab, children: [
            /* @__PURE__ */ jsx("img", { className: "ba-img", src: img(x.b), alt: x.altB, draggable: "false", loading: "lazy" }),
            /* @__PURE__ */ jsx("img", { className: "ba-img ba-after", src: img(x.a), alt: x.altA, draggable: "false", loading: "lazy" })
          ] }, x.k)),
          /* @__PURE__ */ jsx("span", { className: "ba-label l", children: "Before" }),
          /* @__PURE__ */ jsx("span", { className: "ba-label r", children: "After" }),
          /* @__PURE__ */ jsx("div", { className: "ba-handle", role: "slider", tabIndex: 0, "aria-label": "Before and after comparison", "aria-valuemin": 0, "aria-valuemax": 100, "aria-valuenow": Math.round(pos), onKeyDown: key, children: /* @__PURE__ */ jsx("span", { children: "◂ ▸" }) }),
          /* @__PURE__ */ jsx("span", { className: `ba-hint ${touched ? "gone" : ""}`, children: "Drag to compare" })
        ]
      }
    )
  ] });
}
const HOME = [-33.9667, 151.102];
function ServiceArea() {
  const el = useRef(null), map = useRef(null);
  useEffect(() => {
    let dead = false;
    const start = async () => {
      const L = (await import("leaflet")).default;
      if (dead || !el.current || map.current) return;
      const m = L.map(el.current, { scrollWheelZoom: false, dragging: !L.Browser.mobile, tap: false }).setView(HOME, 11);
      map.current = m;
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 18, attribution: "© OpenStreetMap contributors" }).addTo(m);
      L.circleMarker(HOME, { radius: 12, color: "#fff", weight: 3, fillColor: "#0b2d57", fillOpacity: 1 }).addTo(m).bindTooltip("Stamp Cleaning, Hurstville NSW 2220", { direction: "top", offset: [0, -8], permanent: true });
    };
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        start();
        io.disconnect();
      }
    }, { rootMargin: "300px" });
    io.observe(el.current);
    return () => {
      dead = true;
      io.disconnect();
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);
  return /* @__PURE__ */ jsxs("section", { className: "section area", id: "areas", children: [
    /* @__PURE__ */ jsxs("div", { "data-reveal": true, children: [
      /* @__PURE__ */ jsx("p", { className: "eyebrow blue", children: "Service Area" }),
      /* @__PURE__ */ jsx("h2", { children: "Where we clean." }),
      /* @__PURE__ */ jsx("p", { className: "muted", children: "Based in Hurstville and servicing Sydney and surrounding areas, for accommodation providers, offices and commercial properties." }),
      /* @__PURE__ */ jsxs("ul", { className: "details", children: [
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("span", { children: "⌖" }),
          "Based in Hurstville NSW 2220"
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("span", { children: "◎" }),
          "Servicing Sydney and surrounding areas"
        ] })
      ] }),
      /* @__PURE__ */ jsxs("p", { className: "muted small", children: [
        "Not sure we cover your site? ",
        /* @__PURE__ */ jsx("a", { href: "#contact", children: "Ask us" }),
        " and we’ll let you know."
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "map-wrap", "data-reveal": "zoom", children: /* @__PURE__ */ jsx("div", { ref: el, className: "map", role: "region", "aria-label": "Map showing our Hurstville base" }) })
  ] });
}
function WhatsApp() {
  const { top } = useScroll();
  return /* @__PURE__ */ jsxs("a", { className: `wa ${top > 400 ? "up" : ""}`, href: WA, target: "_blank", rel: "noopener noreferrer", "aria-label": "Chat with Stamp Cleaning on WhatsApp", children: [
    /* @__PURE__ */ jsxs("svg", { viewBox: "0 0 24 24", width: "28", height: "28", fill: "none", "aria-hidden": "true", children: [
      /* @__PURE__ */ jsx("path", { d: "M12 3a9 9 0 00-7.8 13.5L3 21l4.6-1.2A9 9 0 1012 3z", stroke: "#fff", strokeWidth: "1.8", strokeLinejoin: "round" }),
      /* @__PURE__ */ jsx("path", { d: "M9 8.5c0 3.5 3 6.5 6.5 6.5l1-1.5-2-1-1 .8c-1-.4-2-1.4-2.4-2.4l.8-1-1-2z", fill: "#fff" })
    ] }),
    /* @__PURE__ */ jsx("span", { children: "Chat on WhatsApp" })
  ] });
}
const EJS = { service: EMAILJS.serviceId, template: EMAILJS.templateId, key: EMAILJS.publicKey };
const EJS_READY = Boolean(EJS.key);
const EMAIL = "contact@stampcleaning.com";
let lastSent = 0;
async function sendEnquiry(data, subject) {
  if (data._gotcha) return "sent";
  if (!EJS_READY) {
    const body = Object.entries(data).filter(([k]) => k !== "_gotcha").map(([k, v]) => `${k}: ${v}`).join("\n");
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    return "mailto";
  }
  if (Date.now() - lastSent < 15e3) throw new Error("too fast");
  const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      service_id: EJS.service,
      template_id: EJS.template,
      user_id: EJS.key,
      template_params: {
        subject,
        name: data.name || "(not given)",
        email: data.email || "(not given)",
        phone: data.phone || "(not given)",
        contact: data.contact || "",
        property: data.property || data.service || "(not given)",
        service: data.service || "",
        message: data.message || "(no message)",
        reply_to: data.email || data.contact || ""
      }
    })
  });
  if (!res.ok) throw new Error(await res.text());
  lastSent = Date.now();
  return "sent";
}
function SentCheck() {
  return /* @__PURE__ */ jsxs("div", { className: "sent-art", "aria-hidden": "true", children: [
    /* @__PURE__ */ jsx("span", { className: "ring r1" }),
    /* @__PURE__ */ jsx("span", { className: "ring r2" }),
    /* @__PURE__ */ jsxs("svg", { viewBox: "0 0 52 52", width: "84", height: "84", children: [
      /* @__PURE__ */ jsx("circle", { className: "sc-circle", cx: "26", cy: "26", r: "23", fill: "none", strokeWidth: "3" }),
      /* @__PURE__ */ jsx("path", { className: "sc-tick", d: "M15 27l8 8 15-17", fill: "none", strokeWidth: "4", strokeLinecap: "round", strokeLinejoin: "round" })
    ] }),
    [0, 1, 2, 3, 4, 5, 6, 7].map((i) => /* @__PURE__ */ jsx("i", { style: { "--a": `${i * 45}deg` } }, i))
  ] });
}
function Contact() {
  const [status, setStatus] = useState("idle");
  const [prop, setProp] = useState("");
  async function submit(e) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    if (data.property === "Other") data.property = `Other: ${data.propertyOther}`;
    delete data.propertyOther;
    setStatus("sending");
    try {
      setStatus(await sendEnquiry(data, "Quote request from stampcleaning.com"));
    } catch {
      setStatus("error");
    }
  }
  const reset = () => {
    setProp("");
    setStatus("idle");
  };
  return /* @__PURE__ */ jsxs("section", { className: "contact", id: "contact", children: [
    /* @__PURE__ */ jsx("div", { className: "contact-img", "data-reveal": "zoom", style: { "--bg": `url(${img("07_contact_building.jpg")})` }, children: /* @__PURE__ */ jsx("span", { children: "Sydney & Surrounding Areas" }) }),
    /* @__PURE__ */ jsxs("div", { className: "contact-info", "data-reveal": true, children: [
      /* @__PURE__ */ jsx("p", { className: "eyebrow blue", children: "Get in Touch" }),
      /* @__PURE__ */ jsx("h2", { children: "Your space deserves a better standard." }),
      /* @__PURE__ */ jsx("p", { className: "muted", children: "Tell us about your site and we’ll propose a tailored cleaning plan and a clear quote. We reply within 1 business day." }),
      /* @__PURE__ */ jsxs("ul", { className: "details", children: [
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("span", { children: "☎" }),
          /* @__PURE__ */ jsx("a", { href: "tel:0410093803", children: "0410 093 803" })
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("span", { children: "✉" }),
          /* @__PURE__ */ jsx("a", { href: "mailto:contact@stampcleaning.com", children: "contact@stampcleaning.com" })
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("span", { children: "✆" }),
          /* @__PURE__ */ jsx("a", { href: WA, target: "_blank", rel: "noopener noreferrer", children: "Message us on WhatsApp" })
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("span", { children: "⌖" }),
          "Hurstville NSW 2220"
        ] })
      ] })
    ] }),
    status === "sent" || status === "mailto" ? /* @__PURE__ */ jsxs("div", { className: "form thanks", role: "status", children: [
      /* @__PURE__ */ jsx(SentCheck, {}),
      /* @__PURE__ */ jsx("h3", { children: status === "sent" ? "Message sent!" : "Almost there!" }),
      /* @__PURE__ */ jsx("p", { children: status === "sent" ? /* @__PURE__ */ jsxs(Fragment, { children: [
        "Thank you. We’ll get back to you within 1 business day. If it’s urgent, call ",
        /* @__PURE__ */ jsx("a", { href: "tel:0410093803", children: "0410 093 803" }),
        "."
      ] }) : "Your email app has opened with your message ready. Press Send there to deliver it to us." }),
      /* @__PURE__ */ jsx("button", { className: "btn btn-ghost", onClick: reset, children: "Send another enquiry" })
    ] }) : /* @__PURE__ */ jsxs("form", { className: "form", "data-reveal": "right", onSubmit: submit, children: [
      /* @__PURE__ */ jsxs("div", { className: "row", children: [
        /* @__PURE__ */ jsxs("label", { children: [
          "Full Name *",
          /* @__PURE__ */ jsx("input", { name: "name", required: true, autoComplete: "name", placeholder: "Your name" })
        ] }),
        /* @__PURE__ */ jsxs("label", { children: [
          "Business Email *",
          /* @__PURE__ */ jsx("input", { name: "email", required: true, type: "email", autoComplete: "email", placeholder: "you@company.com" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("label", { children: [
        "Phone Number *",
        /* @__PURE__ */ jsx("input", { name: "phone", required: true, type: "tel", autoComplete: "tel", placeholder: "Your phone number" })
      ] }),
      /* @__PURE__ */ jsxs("label", { children: [
        "Property Type *",
        /* @__PURE__ */ jsxs("select", { name: "property", required: true, value: prop, onChange: (e) => setProp(e.target.value), children: [
          /* @__PURE__ */ jsx("option", { value: "", disabled: true, children: "Select property type" }),
          /* @__PURE__ */ jsx("option", { children: "Motel / Hotel" }),
          /* @__PURE__ */ jsx("option", { children: "Short-stay accommodation" }),
          /* @__PURE__ */ jsx("option", { children: "Office / Commercial" }),
          /* @__PURE__ */ jsx("option", { children: "Other" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: `other ${prop === "Other" ? "show" : ""}`, children: /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("label", { children: [
        "What type of property? *",
        /* @__PURE__ */ jsx("input", { name: "propertyOther", required: prop === "Other", disabled: prop !== "Other", maxLength: "80", placeholder: "Tell us what kind of place it is" })
      ] }) }) }),
      /* @__PURE__ */ jsxs("label", { children: [
        "Message",
        /* @__PURE__ */ jsx("textarea", { name: "message", rows: "3", placeholder: "Write a short message: what you need, how often, anything we should know…" })
      ] }),
      /* @__PURE__ */ jsx("input", { className: "hp", name: "_gotcha", tabIndex: "-1", autoComplete: "off", "aria-hidden": "true" }),
      status === "error" && /* @__PURE__ */ jsxs("p", { className: "err", role: "alert", children: [
        "Sorry, that didn’t send. Please try again, or call ",
        /* @__PURE__ */ jsx("a", { href: "tel:0410093803", children: "0410 093 803" }),
        " or email ",
        /* @__PURE__ */ jsx("a", { href: `mailto:${EMAIL}`, children: EMAIL }),
        "."
      ] }),
      /* @__PURE__ */ jsx("button", { className: "btn wide", type: "submit", disabled: status === "sending", children: status === "sending" ? "Sending…" : /* @__PURE__ */ jsxs(Fragment, { children: [
        "Request My Quote ",
        /* @__PURE__ */ jsx(Arrow, {})
      ] }) }),
      /* @__PURE__ */ jsx("small", { className: "fine", children: "By submitting, you agree we may contact you about your enquiry." })
    ] })
  ] });
}
const Footer = () => /* @__PURE__ */ jsxs("footer", { className: "footer", children: [
  /* @__PURE__ */ jsxs("div", { className: "foot-grid", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(Logo, { light: true }),
      /* @__PURE__ */ jsx("p", { children: "Professional cleaning solutions for accommodation providers, offices and commercial properties." })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h4", { children: "Services" }),
      /* @__PURE__ */ jsx("a", { href: "#services", children: "Accommodation Cleaning" }),
      /* @__PURE__ */ jsx("a", { href: "#services", children: "Commercial & Office Cleaning" }),
      /* @__PURE__ */ jsx("a", { href: "#services", children: "Specialist Cleaning" })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h4", { children: "Company" }),
      /* @__PURE__ */ jsx("a", { href: "#process", children: "About Us" }),
      /* @__PURE__ */ jsx("a", { href: "#why", children: "Capabilities" }),
      /* @__PURE__ */ jsx("a", { href: "#compliance", children: "Compliance" }),
      /* @__PURE__ */ jsx("a", { href: "#contact", children: "Contact" })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h4", { children: "Service Area" }),
      /* @__PURE__ */ jsxs("p", { children: [
        "Hurstville, NSW",
        /* @__PURE__ */ jsx("br", {}),
        "and surrounding areas"
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "foot-cta", children: [
      /* @__PURE__ */ jsxs("a", { className: "btn btn-sm", href: "#contact", children: [
        "Get a Quote ",
        /* @__PURE__ */ jsx(Arrow, {})
      ] }),
      /* @__PURE__ */ jsx("a", { href: "tel:0410093803", children: "☎ 0410 093 803" }),
      /* @__PURE__ */ jsx("a", { href: "mailto:contact@stampcleaning.com", children: "✉ contact@stampcleaning.com" }),
      /* @__PURE__ */ jsx("p", { children: "⌖ Hurstville NSW 2220" })
    ] })
  ] }),
  /* @__PURE__ */ jsx("div", { className: "legal", children: /* @__PURE__ */ jsxs("span", { children: [
    "© ",
    (/* @__PURE__ */ new Date()).getFullYear(),
    " Stamp Cleaning Pty Ltd. All rights reserved. ABN: 34 691 737 596"
  ] }) })
] });
function App() {
  useReveal();
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Header, {}),
    /* @__PURE__ */ jsxs("main", { children: [
      /* @__PURE__ */ jsx(Hero, {}),
      /* @__PURE__ */ jsx(Services, {}),
      /* @__PURE__ */ jsx(Why, {}),
      /* @__PURE__ */ jsx(Compliance, {}),
      /* @__PURE__ */ jsx(Process, {}),
      /* @__PURE__ */ jsx(BeforeAfter, {}),
      /* @__PURE__ */ jsx(ServiceArea, {}),
      /* @__PURE__ */ jsx(Testimonials, {}),
      /* @__PURE__ */ jsx(FAQ, {}),
      /* @__PURE__ */ jsx(Contact, {})
    ] }),
    /* @__PURE__ */ jsx(Footer, {}),
    /* @__PURE__ */ jsx(MobileBar, {}),
    /* @__PURE__ */ jsx(WhatsApp, {})
  ] });
}
const render = () => renderToString(/* @__PURE__ */ jsx(App, {}));
export {
  faqs,
  render
};
