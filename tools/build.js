/* =========================================================
   Webify static site generator
   Usage:  node tools/build.js
   Writes all HTML pages, sitemap.xml and robots.txt into the
   repository root. Upload everything (except /tools) to hosting.
   ========================================================= */
const fs = require("fs");
const path = require("path");
const { site, reviews, services, industries } = require("./data");

const ROOT = path.join(__dirname, "..");
const bySlug = Object.fromEntries(services.map((s) => [s.slug, s]));
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const year = new Date().getFullYear();

/* ---------------- small components ---------------- */
const icon = (paths) => `<svg viewBox="0 0 24 24" aria-hidden="true">${paths}</svg>`;
const arrow = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 5l7 7-7 7"/></svg>`;
const check = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>`;

const head2 = (eyebrow, a, b, p = "") => `
  <div class="section__head reveal">
    <span class="eyebrow">${eyebrow}</span>
    <h2>${a} <span class="serif gradient-text">${b}</span></h2>
    ${p ? `<p>${p}</p>` : ""}
  </div>`;

const serviceCard = (s) => `
  <a href="/services/${s.slug}/" class="service reveal" style="--c1:${s.c1};--c2:${s.c2}">
    <div class="service__icon">${icon(s.icon)}</div>
    <h3>${s.name}</h3>
    <p>${s.short}</p>
    <ul>${s.bullets.map((b) => `<li>${b}</li>`).join("")}</ul>
    <span class="service__more">Learn more ${arrow}</span>
  </a>`;

const steps = (list) => `
  <div class="steps">
    ${list.map((st, i) => `<div class="step reveal"><div class="step__num">${i + 1}</div><h4>${st.t}</h4><p>${st.d}</p></div>`).join("")}
  </div>`;

const faqBlock = (faqs) => `
  <div class="faq">
    ${faqs.map((f, i) => `<details class="reveal"${i === 0 ? " open" : ""}><summary>${f.q}</summary><p>${f.a}</p></details>`).join("")}
  </div>`;

const plans = (pk, prefix = "") => `
  <div class="plans">
    ${pk.map((p) => `
    <div class="plan${p.featured ? " plan--featured" : ""} reveal">
      ${p.featured ? '<div class="plan__badge">Most Popular</div>' : ""}
      <h4>${p.name}</h4>
      <p class="plan__desc">${p.desc}</p>
      <ul>${p.items.map((i) => `<li>${i}</li>`).join("")}</ul>
      <a href="#quote" class="btn ${p.featured ? "btn--primary" : "btn--ghost"} btn--block" data-pick="${esc(prefix + p.name)}">Get a Free Quote</a>
    </div>`).join("")}
  </div>`;

const crumbs = (items) => `
  <nav class="crumbs" aria-label="Breadcrumb">
    <a href="/">Home</a>${items.map((c) => (c.href ? ` <span>/</span> <a href="${c.href}">${c.name}</a>` : ` <span>/</span> <b>${c.name}</b>`)).join("")}
  </nav>`;

const pageHero = ({ eyebrow, a, b, text, crumb, actions = true }) => `
  <section class="page-hero">
    <div class="hero__bg"><div class="blob blob--1"></div><div class="blob blob--2"></div><div class="grid-lines"></div></div>
    <div class="container page-hero__inner">
      ${crumb ? crumbs(crumb) : ""}
      ${eyebrow ? `<div class="pill reveal"><span class="pill__dot"></span> ${eyebrow}</div>` : ""}
      <h1 class="page-hero__title reveal">${a} <span class="serif gradient-text">${b}</span></h1>
      ${text ? `<p class="page-hero__text reveal">${text}</p>` : ""}
      ${actions ? `<div class="hero__actions reveal">
        <a href="#quote" class="btn btn--primary btn--lg">Get a Free Quote ${arrow}</a>
        <a href="#" class="btn btn--ghost btn--lg js-whatsapp">${waIcon} Chat on WhatsApp</a>
      </div>` : ""}
    </div>
  </section>`;

const waIcon = `<svg class="wa-ico" viewBox="0 0 32 32" aria-hidden="true"><path fill="currentColor" d="M16 3a13 13 0 0 0-11.2 19.6L3 29l6.6-1.7A13 13 0 1 0 16 3zm0 23.7c-2 0-4-.6-5.7-1.6l-.4-.2-3.9 1 1-3.8-.3-.4A10.7 10.7 0 1 1 16 26.7zm5.9-8c-.3-.2-1.9-1-2.2-1-.3-.1-.5-.2-.7.2l-1 1.2c-.2.2-.4.2-.7.1-.3-.2-1.4-.5-2.6-1.6-1-.9-1.6-1.9-1.8-2.2-.2-.3 0-.5.1-.7l.5-.6.3-.5c.1-.2 0-.4 0-.6l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.1-1.2 2.7s1.2 3.2 1.4 3.4c.2.2 2.3 3.6 5.6 5 .8.3 1.4.5 1.9.7.8.2 1.5.2 2.1.1.6-.1 1.9-.8 2.2-1.5.3-.8.3-1.4.2-1.5l-.7-.4z"/></svg>`;

const serviceOptions = (selected) =>
  [...services.map((s) => s.name), "Complete Package (Multiple Services)", "Not sure yet — need advice"]
    .map((n) => `<option${n === selected ? " selected" : ""}>${n}</option>`)
    .join("");

const contactForm = (selected, title = "Get your free quote", sub = "Tell us about your project — we reply within 24 hours.") => `
  <section class="section contact" id="quote">
    <div class="container">
      <div class="contact__box reveal">
        <div class="contact__info">
          <span class="eyebrow eyebrow--light">Let's Talk</span>
          <h2>${title}</h2>
          <p>${sub}</p>
          <ul class="contact__perks">
            <li>${check} Free consultation & honest advice</li>
            <li>${check} Clear proposal with timeline</li>
            <li>${check} No obligation, no pressure</li>
          </ul>
          <div class="contact__list">
            <a href="mailto:${site.email}" class="contact__item"><span>${icon('<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/>')}</span>${site.email}</a>
            <a href="#" class="contact__item js-whatsapp"><span>${icon('<path d="M21 11.5a8.4 8.4 0 0 1-12.4 7.4L3 21l2.1-5.4A8.4 8.4 0 1 1 21 11.5z"/>')}</span>Chat on WhatsApp</a>
            ${site.phone ? `<a href="tel:${site.phone.replace(/[^+\d]/g, "")}" class="contact__item"><span>${icon('<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/>')}</span>${site.phone}</a>` : ""}
          </div>
        </div>
        ${leadForm(selected)}
      </div>
    </div>
  </section>`;

const leadForm = (selected) => `
  <form class="form js-lead-form" novalidate>
    <div class="form__row">
      <label>Your Name *<input type="text" name="name" required placeholder="Ali Khan" autocomplete="name" /></label>
      <label>Email *<input type="email" name="email" required placeholder="you@email.com" autocomplete="email" /></label>
    </div>
    <div class="form__row">
      <label>Phone / WhatsApp<input type="tel" name="phone" placeholder="+92 3xx xxxxxxx" autocomplete="tel" /></label>
      <label>Service<select name="service" class="js-service">${serviceOptions(selected)}</select></label>
    </div>
    <label>Project Details *<textarea name="message" rows="4" required placeholder="Tell us about your business and what you need..."></textarea></label>
    <div class="form__actions">
      <button type="submit" class="btn btn--primary btn--lg">Send Message</button>
      <button type="button" class="btn btn--wa btn--lg js-wa-submit">${waIcon} Send via WhatsApp</button>
    </div>
    <p class="form__note" role="status"></p>
  </form>`;

const reviewsSection = () => {
  if (!reviews.length) return "";
  return `
  <section class="section reviews-sec">
    <div class="container">
      ${head2("Client Reviews", "Loved by", "our clients")}
      <div class="reviews">
        ${reviews.map((r) => `
        <figure class="review reveal">
          <div class="stars" aria-label="${r.rating || 5} out of 5">${"★".repeat(r.rating || 5)}</div>
          <blockquote>“${esc(r.text)}”</blockquote>
          <figcaption><span class="review__av">${esc(r.name.charAt(0))}</span><div><b>${esc(r.name)}</b><small>${esc(r.role || "")}</small></div></figcaption>
        </figure>`).join("")}
      </div>
    </div>
  </section>`;
};

const auditBanner = () => `
  <section class="section section--tight">
    <div class="container">
      <div class="audit reveal">
        <div class="audit__text">
          <span class="eyebrow eyebrow--light">Free Offer</span>
          <h2>Get a free website & marketing audit</h2>
          <p>We'll review your website, Google presence and social media, then send you a personalised report with clear, actionable improvements — completely free.</p>
        </div>
        <a href="/free-audit/" class="btn btn--white btn--lg">Claim My Free Audit ${arrow}</a>
      </div>
    </div>
  </section>`;

const comparison = () => {
  const rows = [
    ["Premium custom design", 1, 0, 1],
    ["All services under one roof", 1, 0, 1],
    ["Affordable for small businesses", 1, 1, 0],
    ["Dedicated point of contact", 1, 1, 0],
    ["Fast, reliable delivery", 1, 0, 0],
    ["Strategy + reporting included", 1, 0, 1],
    ["Direct WhatsApp support", 1, 1, 0],
  ];
  const c = (v) => (v ? '<span class="yes">✓</span>' : '<span class="no">✕</span>');
  return `
  <div class="compare reveal">
    <table>
      <thead><tr><th></th><th class="compare__us">Webify</th><th>Freelancers</th><th>Big Agencies</th></tr></thead>
      <tbody>${rows.map((r) => `<tr><td>${r[0]}</td><td class="compare__us">${c(r[1])}</td><td>${c(r[2])}</td><td>${c(r[3])}</td></tr>`).join("")}</tbody>
    </table>
  </div>`;
};

const industriesGrid = () => `
  <div class="industries">
    ${industries.map((i) => `<div class="industry reveal"><span>${i.e}</span>${i.n}</div>`).join("")}
  </div>`;

const commitments = () => {
  const list = [
    ["Satisfaction First", "We revise until you're happy within the agreed scope — your approval comes before final delivery.", '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>'],
    ["You Own Everything", "Domains, ad accounts, source files and designs are 100% yours. No hostage situations.", '<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>'],
    ["Transparent Reporting", "Clear monthly reports in plain language — you always know what we did and what it achieved.", '<path d="M3 3v18h18"/><path d="m7 15 4-4 3 3 6-6"/>'],
    ["On‑Time Delivery", "Every project gets a clear timeline up front, and we stick to it.", '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>'],
    ["No Long Contracts", "Monthly services are month‑to‑month. We keep clients by delivering results.", '<path d="M17 3a2.8 2.8 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5z"/>'],
    ["Real Human Support", "Talk directly to the people working on your project via WhatsApp, email or call.", '<path d="M21 11.5a8.4 8.4 0 0 1-12.4 7.4L3 21l2.1-5.4A8.4 8.4 0 1 1 21 11.5z"/>'],
  ];
  return `<div class="commit">${list.map((x) => `<div class="commit__item reveal"><div class="commit__icon">${icon(x[2])}</div><div><h4>${x[0]}</h4><p>${x[1]}</p></div></div>`).join("")}</div>`;
};

const workItems = [
  { cat: "web", label: "Website", title: "E‑commerce Store", html: `<div class="work__thumb t-web"><div class="tw-nav"><i></i><i></i><i></i></div><div class="tw-hero"><b></b><b class="s"></b><span></span></div><div class="tw-row"><i></i><i></i><i></i></div></div>` },
  { cat: "brand", label: "Logo Design", title: "Brand Identity", html: `<div class="work__thumb t-logo"><div class="tl-mark">A</div><p>AURORA</p></div>` },
  { cat: "social", label: "Social Media", title: "Instagram Campaign", html: `<div class="work__thumb t-social"><div class="ts-post p1"><b>50%</b><span>OFF</span></div><div class="ts-post p2"><b>NEW</b><span>Arrival</span></div><div class="ts-post p3"><b>♥</b><span>12k</span></div></div>` },
  { cat: "brand", label: "Business Card", title: "Corporate Stationery", html: `<div class="work__thumb t-card"><div class="tc-card tc-back"></div><div class="tc-card tc-front"><b>John Carter</b><span>Creative Director</span><i></i></div></div>` },
  { cat: "marketing", label: "SEO", title: "Local Business Growth", html: `<div class="work__thumb t-seo"><div class="seo-bar"><i style="--h:30%"></i><i style="--h:45%"></i><i style="--h:40%"></i><i style="--h:62%"></i><i style="--h:75%"></i><i style="--h:92%"></i></div><p>Organic Traffic ↑</p></div>` },
  { cat: "brand", label: "E‑Book", title: "Cover & Layout", html: `<div class="work__thumb t-book"><div class="tb-book"><span>THE</span><b>GROWTH</b><span>PLAYBOOK</span></div></div>` },
  { cat: "web", label: "Landing Page", title: "Course Launch Page", html: `<div class="work__thumb t-land"><div class="tla-card"><b></b><b class="s"></b><div class="tla-row"><span></span><span class="o"></span></div></div><div class="tla-badge">+ Conversions</div></div>` },
  { cat: "marketing", label: "Google Ads", title: "Lead Gen Campaign", html: `<div class="work__thumb t-ads"><div class="tad"><small>Ad · webify.website</small><b>Premium Websites in 7 Days</b><p>Custom design · SEO ready · Free consultation</p></div><div class="tad tad--2"><small>Ad · yourbrand.com</small><b>Your Ad at the Top</b></div></div>` },
  { cat: "social", label: "Video", title: "Product Reel", html: `<div class="work__thumb t-video"><div class="tv-phone"><div class="tv-play">▶</div><div class="tv-cap">Wait for it…</div></div></div>` },
];

const workGrid = (items) => `
  <div class="work">
    ${items.map((w) => `<div class="work__item reveal" data-cat="${w.cat}">${w.html}<div class="work__meta"><span>${w.label}</span><h4>${w.title}</h4></div></div>`).join("")}
  </div>`;


/* ---------------- animated hero visual ---------------- */
const heroVisual = () => {
  const orbitIcons = ["website-development", "logo-design", "social-media-marketing", "seo-marketing", "website-design", "google-ads", "video-editing", "business-card-design", "email-marketing", "branding-graphics"];
  return `
  <div class="hv" aria-hidden="true">
    <div class="hv__glow"></div>
    <div class="hv__orbit hv__orbit--outer">
      ${orbitIcons.map((slug, i) => { const s = bySlug[slug]; return `<div class="hv__dot" style="--a:${i * 36}deg"><span class="hv__chip" style="--c1:${s.c1};--c2:${s.c2}">${icon(s.icon)}</span></div>`; }).join("")}
    </div>
    <div class="hv__orbit hv__orbit--inner"><i></i><i></i><i></i></div>
    <div class="hv__core"><span class="hv__ring"></span><span class="hv__ring hv__ring--2"></span><span class="hv__logo">W</span></div>

    <div class="win win--site">
      <div class="win__bar"><span></span><span></span><span></span><div class="win__url"><em class="type">yourbrand.com</em></div></div>
      <div class="ws">
        <div class="ws__nav s1"><i class="ws__logo"></i><i></i><i></i><i></i><b></b></div>
        <div class="ws__hero">
          <div class="ws__txt"><i class="s2"></i><i class="s2 w2"></i><i class="s3 sm"></i><i class="s3 sm w3"></i><span class="ws__btn s4">Get started</span></div>
          <div class="ws__img s4z"><span></span></div>
        </div>
        <div class="ws__cards"><i class="s5"></i><i class="s6"></i><i class="s7"></i></div>
      </div>
      <svg class="cursor" viewBox="0 0 24 24"><path d="M4 2l16 10-7 1.5L9.5 21z"/></svg>
    </div>

    <div class="win win--logo">
      <div class="win__bar"><span></span><span></span><span></span></div>
      <div class="wl">
        <svg viewBox="0 0 100 100" class="wl__mark"><defs><linearGradient id="hvg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f59e0b"/><stop offset="1" stop-color="#ec4899"/></linearGradient></defs>
          <path class="wl__hex" d="M50 6 88 28v44L50 94 12 72V28z"/>
          <path class="wl__a" d="M32 70 50 28l18 42M39 56h22"/>
        </svg>
        <p class="wl__name">BRAND</p>
        <p class="wl__tag">your tagline</p>
      </div>
    </div>

    <div class="win win--rank">
      <div class="wr__search">${icon('<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>')}<span class="type type--2">best agency near me</span></div>
      <div class="wr__list">
        <div class="wr__row r-a"><b></b><i></i></div>
        <div class="wr__row r-b"><b></b><i></i></div>
        <div class="wr__row r-c"><b></b><i></i></div>
        <div class="wr__row r-me"><span class="wr__pos">#1</span><b>Your Business</b><i></i></div>
      </div>
    </div>

    <div class="win win--social">
      <div class="wsx__head"><span class="wsx__av"></span><i></i></div>
      <div class="wsx__img"><b>SALE</b><span>50% OFF</span><em class="fh fh1">♥</em><em class="fh fh2">♥</em><em class="fh fh3">♥</em></div>
      <div class="wsx__acts"><span class="heart">♥</span><span class="cmt">💬</span><span class="likes"><span class="tick"><span>1,204</span><span>1,876</span><span>2,431</span><span>3,092</span></span> likes</span></div>
      <div class="toast toast--1"><span>👤</span> New follower</div>
      <div class="toast toast--2"><span>🛒</span> New order</div>
    </div>
  </div>`;
};

/* ---------------- layout ---------------- */
const navGroups = ["Web", "Design", "Marketing"];
const megaMenu = () => `
  <div class="mega">
    ${navGroups.map((g) => `
    <div class="mega__col">
      <p class="mega__title">${g === "Web" ? "Web" : g === "Design" ? "Design & Branding" : "Digital Marketing"}</p>
      ${services.filter((s) => s.group === g).map((s) => `
      <a href="/services/${s.slug}/" class="mega__link" style="--c1:${s.c1};--c2:${s.c2}">
        <span class="mega__icon">${icon(s.icon)}</span>
        <span><b>${s.name}</b><small>${s.bullets[0]}</small></span>
      </a>`).join("")}
    </div>`).join("")}
    <div class="mega__cta">
      <p class="mega__title">Not sure where to start?</p>
      <p>Get a free audit of your website & marketing with clear next steps.</p>
      <a href="/free-audit/" class="btn btn--primary btn--sm">Free Audit ${arrow}</a>
    </div>
  </div>`;

const header = (active) => `
  <header class="nav" id="nav">
    <div class="container nav__inner">
      <a href="/" class="logo" aria-label="Webify home"><span class="logo__mark">W</span><span class="logo__text">Webify<span class="dot">.</span></span></a>
      <nav class="nav__links" id="navLinks" aria-label="Main">
        <div class="nav__dd">
          <a href="/services/" class="nav__dd-btn${active === "services" ? " active" : ""}">Services <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m6 9 6 6 6-6"/></svg></a>
          ${megaMenu()}
        </div>
        <a href="/portfolio/"${active === "portfolio" ? ' class="active"' : ""}>Portfolio</a>
        <a href="/pricing/"${active === "pricing" ? ' class="active"' : ""}>Pricing</a>
        <a href="/about/"${active === "about" ? ' class="active"' : ""}>About</a>
        <a href="/contact/"${active === "contact" ? ' class="active"' : ""}>Contact</a>
        <a href="/free-audit/" class="btn btn--primary btn--sm nav__cta-mobile">Free Audit</a>
      </nav>
      <a href="/free-audit/" class="btn btn--primary btn--sm nav__cta">Get Free Audit</a>
      <button class="nav__toggle" id="navToggle" aria-label="Open menu" aria-expanded="false"><span></span><span></span><span></span></button>
    </div>
  </header>`;

const socialLinks = () => {
  const ic = {
    facebook: '<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>',
    instagram: '<rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".5"/>',
    linkedin: '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/>',
    tiktok: '<path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/>',
    youtube: '<path d="M22.5 6.4a2.8 2.8 0 0 0-2-2C18.9 4 12 4 12 4s-6.9 0-8.6.5a2.8 2.8 0 0 0-1.9 2A29 29 0 0 0 1 12a29 29 0 0 0 .5 5.6 2.8 2.8 0 0 0 1.9 2c1.7.4 8.6.4 8.6.4s6.9 0 8.6-.5a2.8 2.8 0 0 0 1.9-2A29 29 0 0 0 23 12a29 29 0 0 0-.5-5.6z"/><path d="m9.8 15.5 5.7-3.5-5.7-3.3z"/>',
  };
  const items = Object.entries(site.socials).filter(([, u]) => u);
  if (!items.length) return "";
  return `<div class="socials">${items.map(([k, u]) => `<a href="${u}" target="_blank" rel="noopener" aria-label="${k}">${icon(ic[k])}</a>`).join("")}</div>`;
};

const footer = () => `
  <footer class="footer">
    <div class="container footer__inner">
      <div class="footer__brand">
        <a href="/" class="logo"><span class="logo__mark">W</span><span class="logo__text">Webify<span class="dot">.</span></span></a>
        <p>Premium digital marketing agency helping businesses build, brand and grow online — websites, design, social media and SEO under one roof.</p>
        <a href="mailto:${site.email}" class="footer__mail">${site.email}</a>
        ${socialLinks()}
      </div>
      <div>
        <h5>Web & Design</h5>
        ${services.filter((s) => s.group !== "Marketing").map((s) => `<a href="/services/${s.slug}/">${s.name}</a>`).join("")}
      </div>
      <div>
        <h5>Marketing</h5>
        ${services.filter((s) => s.group === "Marketing").map((s) => `<a href="/services/${s.slug}/">${s.name}</a>`).join("")}
      </div>
      <div>
        <h5>Company</h5>
        <a href="/about/">About Us</a>
        <a href="/portfolio/">Portfolio</a>
        <a href="/pricing/">Pricing</a>
        <a href="/free-audit/">Free Audit</a>
        <a href="/contact/">Contact</a>
      </div>
    </div>
    <div class="container footer__bottom">
      <p>© ${year} Webify. All rights reserved.</p>
      <div class="footer__legal"><a href="/privacy-policy/">Privacy Policy</a><a href="/terms/">Terms of Service</a></div>
    </div>
  </footer>

  <div class="mbar">
    <a href="#" class="mbar__wa js-whatsapp">${waIcon} WhatsApp</a>
    <a href="/contact/" class="mbar__quote">Free Quote</a>
  </div>
  <a href="#" class="wa-float js-whatsapp" aria-label="Chat on WhatsApp">${waIcon}</a>`;

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.name,
  url: site.domain + "/",
  logo: site.domain + "/favicon.svg",
  image: site.domain + "/og-image.png",
  email: site.email,
  ...(site.phone ? { telephone: site.phone } : {}),
  description: site.description,
  areaServed: "Worldwide",
  sameAs: Object.values(site.socials).filter(Boolean),
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Digital Marketing Services",
    itemListElement: services.map((s) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: s.name, url: `${site.domain}/services/${s.slug}/` } })),
  },
};

const layout = ({ url, title, desc, active, body, schema = [] }) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(desc)}" />
  <meta name="theme-color" content="#5b4cf5" />
  <link rel="canonical" href="${site.domain}${url}" />
  <meta property="og:site_name" content="Webify" />
  <meta property="og:title" content="${esc(title)}" />
  <meta property="og:description" content="${esc(desc)}" />
  <meta property="og:url" content="${site.domain}${url}" />
  <meta property="og:type" content="website" />
  <meta property="og:image" content="${site.domain}/og-image.png" />
  <meta name="twitter:card" content="summary_large_image" />
  <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Instrument+Serif:ital@1&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="/style.css?v=${BUILD}" />
  ${[orgSchema, ...schema].map((s) => `<script type="application/ld+json">${JSON.stringify(s)}</script>`).join("\n  ")}
</head>
<body>
<div class="progress" aria-hidden="true"></div>
${header(active)}
  <main>
${body}
  </main>
${footer()}
  <script>window.WEBIFY = ${JSON.stringify({ whatsapp: site.whatsapp, email: site.email })};</script>
  <script src="/script.js?v=${BUILD}"></script>
</body>
</html>
`;
const BUILD = Date.now().toString(36);

const faqSchema = (faqs) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
});
const crumbSchema = (list) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: list.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, item: site.domain + c.url })),
});

/* =========================================================
   PAGES
   ========================================================= */
const pages = [];
const add = (url, html) => pages.push({ url, html });

/* ---------------- HOME ---------------- */
const homeFaqs = [
  { q: "What services does Webify offer?", a: "We offer website development, website design, logo design, business card design, e‑book design, social media marketing, SEO, Google Ads, content writing, branding & graphics, video editing and email marketing — everything your business needs to grow online." },
  { q: "How much do your services cost?", a: "Every business has different needs, so we prepare a custom quote after a free consultation. We offer packages that fit startups, small businesses and established brands — with no hidden charges." },
  { q: "Do you work with clients outside Pakistan?", a: "Yes! We work with clients worldwide. Everything is handled online through WhatsApp, email and video calls." },
  { q: "How long does a typical project take?", a: "Logos and business cards take a few days, standard websites 1–2 weeks, and e‑commerce or custom projects 2–5 weeks. Marketing services like SEO and social media are ongoing monthly." },
  { q: "What is the payment process?", a: "For one‑time projects it's usually 50% advance and 50% on completion. Monthly services like social media and SEO are billed monthly with no long‑term contract." },
  { q: "Will I own my website, logo and accounts?", a: "Yes, 100%. All designs, source files, domains, and ad/social accounts belong to you." },
];

add("/", layout({
  url: "/",
  title: "Webify — Premium Digital Marketing, Web Design & SEO Agency",
  desc: site.description,
  active: "home",
  schema: [faqSchema(homeFaqs)],
  body: `
    <section class="hero" id="home">
      <div class="hero__bg"><div class="blob blob--1"></div><div class="blob blob--2"></div><div class="blob blob--3"></div><div class="grid-lines"></div></div>
      <div class="container hero__inner">
        <div class="hero__content hero-par">
          <div class="pill reveal"><span class="pill__dot"></span> Premium Digital Marketing Agency</div>
          <h1 class="hero__title reveal">We build brands that <span class="rot" aria-hidden="true"><span class="rot__w serif gradient-text" style="--d:0s">grow online.</span><span class="rot__w serif gradient-text" style="--d:2.5s">get found.</span><span class="rot__w serif gradient-text" style="--d:5s">sell more.</span><span class="rot__w serif gradient-text" style="--d:7.5s">stand out.</span></span><span class="sr-only">grow online.</span></h1>
          <p class="hero__text reveal">Websites, logos, social media, SEO and ads — everything your business needs to look premium, get found and win more customers. One agency. One team. Real results.</p>
          <div class="hero__actions reveal">
            <a href="/free-audit/" class="btn btn--primary btn--lg">Get a Free Audit ${arrow}</a>
            <a href="/services/" class="btn btn--ghost btn--lg">Explore Services</a>
          </div>
          <ul class="hero__checks reveal">
            <li>${check} Free consultation</li>
            <li>${check} No long‑term contracts</li>
            <li>${check} 100% ownership</li>
          </ul>
        </div>
        <div class="hero-par hero-par--slow">
          <div class="hero__visual reveal">${heroVisual()}</div>
        </div>
      </div>
    </section>

    <section class="marquee" aria-label="Our expertise">
      <div class="marquee__track">
        ${[0, 1].map(() => services.map((s) => `<span>${s.name}</span><i>✦</i>`).join("")).join("")}
      </div>
    </section>

    <section class="section" id="services">
      <div class="container">
        ${head2("Our Services", "Everything your business needs to", "shine online", "Twelve services, one dedicated team. Click any service to see exactly what's included.")}
        <div class="services">${services.map(serviceCard).join("")}</div>
      </div>
    </section>

    <section class="bigtext" aria-hidden="true">
      <div class="bigtext__row bigtext__row--outline"><div class="bigtext__track">${[0,1].map(()=>["Websites","Branding","Logos","SEO","Social Media","Google Ads","Content","Video"].map(w=>`<span>${w}</span><i></i>`).join("")).join("")}</div></div>
      <div class="bigtext__row bigtext__row--fill"><div class="bigtext__track">${[0,1].map(()=>["Design","Develop","Market","Grow","Rank","Convert","Scale"].map(w=>`<span>${w}</span><i></i>`).join("")).join("")}</div></div>
    </section>

    <section class="section why">
      <div class="container why__inner">
        <div class="why__left reveal">
          <span class="eyebrow">Why Webify</span>
          <h2>Big‑agency quality, <span class="serif gradient-text">personal attention</span></h2>
          <p>Freelancers can be unreliable. Big agencies are expensive and slow. Webify gives you the best of both: a dedicated team, premium work, fair pricing and direct communication from start to finish.</p>
          <div class="hero__actions"><a href="/about/" class="btn btn--ghost">About Webify</a><a href="/free-audit/" class="btn btn--primary">Free Consultation</a></div>
        </div>
        ${comparison()}
      </div>
    </section>

    <section class="section">
      <div class="container">
        ${head2("Our Promise", "Commitments we", "never break", "These aren't marketing lines — they're how we work with every single client.")}
        ${commitments()}
      </div>
    </section>

    <section class="section process" id="process">
      <div class="container">
        ${head2("How We Work", "Simple process,", "stunning results")}
        ${steps([
          { t: "Free Consultation", d: "We understand your business, goals and audience — and recommend what will actually help." },
          { t: "Strategy & Proposal", d: "You get a clear plan, timeline and quote. No surprises, no hidden costs." },
          { t: "Design & Build", d: "We create, you review. Revisions until you're genuinely happy." },
          { t: "Launch & Grow", d: "We launch, market and optimize — with reports that show real progress." },
        ])}
      </div>
    </section>

    <section class="section" id="work">
      <div class="container">
        ${head2("Our Work", "Work that speaks", "for itself", "A glimpse of the kind of projects we create.")}
        ${workGrid(workItems.slice(0, 6))}
        <div class="center reveal"><a href="/portfolio/" class="btn btn--ghost btn--lg">View Full Portfolio ${arrow}</a></div>
      </div>
    </section>

    <section class="section industries-sec">
      <div class="container">
        ${head2("Industries", "Helping businesses in", "every industry")}
        ${industriesGrid()}
      </div>
    </section>

    ${reviewsSection()}
    ${auditBanner()}

    <section class="section faq-sec" id="faq">
      <div class="container faq-wrap">
        ${head2("FAQ", "Questions?", "Answered.")}
        ${faqBlock(homeFaqs)}
      </div>
    </section>

    ${contactForm("Not sure yet — need advice", "Ready to grow your business online?", "Tell us about your project and get a free quote within 24 hours.")}
  `,
}));

/* ---------------- SERVICES INDEX ---------------- */
add("/services/", layout({
  url: "/services/",
  title: "Our Services — Web Design, Branding, SEO & Social Media | Webify",
  desc: "Explore Webify's digital services: website development, web design, logo design, business cards, e-books, social media marketing, SEO, Google Ads, content, video and email marketing.",
  active: "services",
  schema: [crumbSchema([{ name: "Home", url: "/" }, { name: "Services", url: "/services/" }])],
  body: `
    ${pageHero({ eyebrow: "12 Services · One Team", a: "Everything you need to", b: "grow online.", text: "From your first logo to a full marketing engine — choose a single service or let us handle everything.", crumb: [{ name: "Services" }] })}
    ${navGroups.map((g) => `
    <section class="section section--tight">
      <div class="container">
        <div class="group-head reveal"><h2>${g === "Web" ? "Websites" : g === "Design" ? "Design & Branding" : "Digital Marketing"}</h2><p>${g === "Web" ? "Fast, beautiful websites built to convert." : g === "Design" ? "A brand identity that looks premium everywhere." : "Get found, get followers, get customers."}</p></div>
        <div class="services services--${services.filter((s) => s.group === g).length}">${services.filter((s) => s.group === g).map(serviceCard).join("")}</div>
      </div>
    </section>`).join("")}
    ${auditBanner()}
    ${contactForm("Not sure yet — need advice")}
  `,
}));

/* ---------------- SERVICE PAGES ---------------- */
services.forEach((s) => {
  const url = `/services/${s.slug}/`;
  add(url, layout({
    url,
    title: s.metaTitle,
    desc: s.metaDesc,
    active: "services",
    schema: [
      { "@context": "https://schema.org", "@type": "Service", name: s.name, serviceType: s.name, description: s.metaDesc, url: site.domain + url, provider: { "@type": "ProfessionalService", name: site.name, url: site.domain + "/" }, areaServed: "Worldwide" },
      faqSchema(s.faqs),
      crumbSchema([{ name: "Home", url: "/" }, { name: "Services", url: "/services/" }, { name: s.name, url }]),
    ],
    body: `
    <section class="page-hero page-hero--service" style="--c1:${s.c1};--c2:${s.c2}">
      <div class="hero__bg"><div class="blob blob--1"></div><div class="blob blob--2"></div><div class="grid-lines"></div></div>
      <div class="container svc-hero">
        <div>
          ${crumbs([{ name: "Services", href: "/services/" }, { name: s.name }])}
          <div class="pill reveal"><span class="svc-hero__ic">${icon(s.icon)}</span> ${s.name}</div>
          <h1 class="page-hero__title reveal">${s.heroA} <span class="serif gradient-text">${s.heroB}</span></h1>
          <p class="page-hero__text reveal">${s.heroText}</p>
          <div class="hero__actions reveal">
            <a href="#quote" class="btn btn--primary btn--lg">Get a Free Quote ${arrow}</a>
            <a href="#" class="btn btn--ghost btn--lg js-whatsapp">${waIcon} WhatsApp Us</a>
          </div>
        </div>
        <div class="svc-card reveal">
          <div class="svc-card__top"><span class="svc-card__ic">${icon(s.icon)}</span><div><b>What's included</b><small>${s.name}</small></div></div>
          <ul>${s.included.map((i) => `<li>${check}${i}</li>`).join("")}</ul>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container split">
        <div class="reveal">
          <span class="eyebrow">Why it matters</span>
          <h2 class="h2">${s.introTitle}</h2>
        </div>
        <div class="split__text reveal">${s.intro.map((p) => `<p>${p}</p>`).join("")}</div>
      </div>
    </section>

    <section class="section section--soft">
      <div class="container">
        ${head2("What We Offer", `Our ${s.name.toLowerCase().replace("(ppc)", "").trim()}`, "services")}
        <div class="features" style="--c1:${s.c1};--c2:${s.c2}">
          ${s.features.map((f, i) => `<div class="feature reveal"><span class="feature__n">${String(i + 1).padStart(2, "0")}</span><h4>${f.t}</h4><p>${f.d}</p></div>`).join("")}
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        ${head2("Our Process", "How we deliver", "results")}
        ${steps(s.process)}
      </div>
    </section>

    <section class="section section--soft">
      <div class="container">
        ${head2("Packages", "Choose the right", "package", "Every package is customizable. Tell us what you need and we'll send a clear, honest quote.")}
        ${plans(s.packages, s.name + " — ")}
      </div>
    </section>

    <section class="section section--tight">
      <div class="container">
        <div class="tools reveal">
          <p>Tools & platforms we use</p>
          <div class="chips">${s.tools.map((t) => `<span>${t}</span>`).join("")}</div>
        </div>
      </div>
    </section>

    ${reviewsSection()}

    <section class="section faq-sec">
      <div class="container faq-wrap">
        ${head2("FAQ", `${s.name}`, "questions")}
        ${faqBlock(s.faqs)}
      </div>
    </section>

    <section class="section section--tight">
      <div class="container">
        <div class="group-head reveal"><h2>Related services</h2><p>Businesses that choose ${s.name} often combine it with:</p></div>
        <div class="services services--3">${s.related.map((r) => serviceCard(bySlug[r])).join("")}</div>
      </div>
    </section>

    ${contactForm(s.name, `Let's start your ${s.name.toLowerCase().replace("(ppc)", "").trim()} project`)}
    `,
  }));
});

/* ---------------- ABOUT ---------------- */
add("/about/", layout({
  url: "/about/",
  title: "About Webify — A Digital Agency That Treats Your Business Like Our Own",
  desc: "Learn about Webify, a premium digital marketing agency on a mission to help businesses look world-class and grow online with design, websites and marketing.",
  active: "about",
  schema: [crumbSchema([{ name: "Home", url: "/" }, { name: "About", url: "/about/" }])],
  body: `
    ${pageHero({ eyebrow: "About Webify", a: "We help businesses", b: "look world‑class.", text: "Webify is a digital marketing agency built on a simple belief: every business — big or small — deserves premium design and marketing that actually brings results.", crumb: [{ name: "About" }] })}

    <section class="section">
      <div class="container split">
        <div class="reveal"><span class="eyebrow">Our Story</span><h2 class="h2">Why we started Webify</h2></div>
        <div class="split__text reveal">
          <p>We saw the same story again and again: great businesses with poor websites, inconsistent branding and social media that brought no customers. Owners were stuck between unreliable freelancers and expensive agencies that treated them like a number.</p>
          <p>Webify was created to fix that. We bring together web developers, designers, marketers and writers into one team — so you get a complete, consistent digital presence without managing five different people.</p>
          <p>Today we help startups, local businesses and growing brands with everything from their first logo to complete marketing campaigns.</p>
        </div>
      </div>
    </section>

    <section class="section section--soft">
      <div class="container">
        <div class="mvv">
          <div class="mvv__card reveal"><span class="mvv__ic">🎯</span><h3>Our Mission</h3><p>To help businesses grow online with premium design and honest, result‑driven marketing.</p></div>
          <div class="mvv__card reveal"><span class="mvv__ic">🔭</span><h3>Our Vision</h3><p>To be the most trusted digital partner for growing businesses — known for quality, transparency and results.</p></div>
          <div class="mvv__card reveal"><span class="mvv__ic">💎</span><h3>Our Values</h3><p>Quality over shortcuts. Honesty over hype. Clients' success over everything.</p></div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container why__inner">
        <div class="why__left reveal">
          <span class="eyebrow">The Difference</span>
          <h2>Why businesses <span class="serif gradient-text">choose us</span></h2>
          <p>We combine creative talent with marketing know‑how and treat every project like our own business is on the line.</p>
        </div>
        ${comparison()}
      </div>
    </section>

    <section class="section section--soft">
      <div class="container">
        ${head2("Our Promise", "How we", "work with you")}
        ${commitments()}
      </div>
    </section>

    <section class="section">
      <div class="container">
        ${head2("Industries", "Businesses we", "help grow")}
        ${industriesGrid()}
      </div>
    </section>

    ${reviewsSection()}
    ${contactForm("Not sure yet — need advice", "Let's build something great together")}
  `,
}));

/* ---------------- PORTFOLIO ---------------- */
add("/portfolio/", layout({
  url: "/portfolio/",
  title: "Portfolio — Websites, Logos, Branding & Marketing Work | Webify",
  desc: "See the kind of websites, logos, business cards, e-books, social media and marketing campaigns Webify creates for businesses.",
  active: "portfolio",
  schema: [crumbSchema([{ name: "Home", url: "/" }, { name: "Portfolio", url: "/portfolio/" }])],
  body: `
    ${pageHero({ eyebrow: "Portfolio", a: "Work that makes brands", b: "stand out.", text: "Websites, identities, campaigns and content — crafted with care for businesses like yours.", crumb: [{ name: "Portfolio" }] })}
    <section class="section">
      <div class="container">
        <div class="filters reveal" role="tablist">
          <button class="filter active" data-filter="all">All</button>
          <button class="filter" data-filter="web">Websites</button>
          <button class="filter" data-filter="brand">Branding & Design</button>
          <button class="filter" data-filter="social">Social & Video</button>
          <button class="filter" data-filter="marketing">SEO & Ads</button>
        </div>
        ${workGrid(workItems)}
        <div class="note-card reveal">
          <h3>Want to see projects in your industry?</h3>
          <p>Message us on WhatsApp and we'll share relevant samples and case studies privately.</p>
          <a href="#" class="btn btn--wa js-whatsapp">${waIcon} Request Samples</a>
        </div>
      </div>
    </section>
    ${reviewsSection()}
    ${contactForm("Not sure yet — need advice", "Want results like these?")}
  `,
}));

/* ---------------- PRICING ---------------- */
const bundles = [
  { name: "Starter", desc: "For new businesses getting online", items: ["Logo Design", "Business Card Design", "1–5 Page Website", "Social Media Setup", "Basic SEO Setup", "1 month support"] },
  { name: "Growth", desc: "For businesses ready to scale", featured: true, items: ["Complete Brand Identity", "Premium 5–12 Page Website", "Social Media Management", "Monthly SEO", "Ad Campaign Setup", "Monthly reporting"] },
  { name: "Premium", desc: "Your full‑service digital team", items: ["Custom Web App / E‑commerce", "Full Branding + E‑Book", "Social Media + Video Content", "Advanced SEO + Google Ads", "Email Marketing", "Priority dedicated manager"] },
];
const pricingFaqs = [
  { q: "Why don't you show fixed prices?", a: "Because every business has different needs. A 3‑page website and a 50‑product store are very different projects. After a quick chat we send a clear, fixed quote — no hidden costs." },
  { q: "What are your payment terms?", a: "One‑time projects: 50% advance, 50% on completion. Monthly services: billed monthly in advance, cancel anytime with notice." },
  { q: "Which payment methods do you accept?", a: "Bank transfer, JazzCash, Easypaisa and international methods like Wise/Payoneer for overseas clients." },
  { q: "Can I combine services from different packages?", a: "Absolutely. All packages are flexible — mix and match the services you need and we'll quote accordingly." },
  { q: "Is ad spend included in marketing packages?", a: "No. Ad budgets are paid directly to Google, Meta or TikTok from your own account for full transparency." },
];
add("/pricing/", layout({
  url: "/pricing/",
  title: "Pricing & Packages — Flexible Plans for Every Business | Webify",
  desc: "Flexible digital marketing packages for startups, small businesses and growing brands. Get a free custom quote for websites, branding, SEO and social media.",
  active: "pricing",
  schema: [faqSchema(pricingFaqs), crumbSchema([{ name: "Home", url: "/" }, { name: "Pricing", url: "/pricing/" }])],
  body: `
    ${pageHero({ eyebrow: "Pricing", a: "Simple packages,", b: "honest quotes.", text: "Choose a ready‑made bundle or pick individual services. Every quote is clear, fixed and free — no hidden costs, ever.", crumb: [{ name: "Pricing" }] })}
    <section class="section">
      <div class="container">
        ${head2("Bundles", "All‑in‑one", "growth packages", "Our most popular combinations for businesses at every stage.")}
        ${plans(bundles.map((b) => ({ ...b })), "")}
      </div>
    </section>

    <section class="section section--soft">
      <div class="container">
        ${head2("Individual Services", "Need just", "one thing?", "Each service has its own packages. Click to see what's included.")}
        <div class="svc-list">
          ${services.map((s) => `
          <a href="/services/${s.slug}/#quote" class="svc-row reveal" style="--c1:${s.c1};--c2:${s.c2}">
            <span class="mega__icon">${icon(s.icon)}</span>
            <span class="svc-row__t"><b>${s.name}</b><small>${s.packages.map((p) => p.name).join(" · ")}</small></span>
            <span class="svc-row__go">View packages ${arrow}</span>
          </a>`).join("")}
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        ${head2("Every package includes", "No surprises.", "Just value.")}
        ${commitments()}
      </div>
    </section>

    <section class="section faq-sec section--soft">
      <div class="container faq-wrap">
        ${head2("FAQ", "Pricing", "questions")}
        ${faqBlock(pricingFaqs)}
      </div>
    </section>
    ${contactForm("Complete Package (Multiple Services)", "Get your custom quote")}
  `,
}));

/* ---------------- CONTACT ---------------- */
add("/contact/", layout({
  url: "/contact/",
  title: "Contact Webify — Get a Free Quote & Consultation",
  desc: "Contact Webify for a free consultation and quote. Reach us via WhatsApp or email — we reply within 24 hours.",
  active: "contact",
  schema: [crumbSchema([{ name: "Home", url: "/" }, { name: "Contact", url: "/contact/" }])],
  body: `
    ${pageHero({ eyebrow: "We reply within 24 hours", a: "Let's talk about your", b: "next big step.", text: "Whether you need a website, a new brand or more customers — tell us what you have in mind and we'll get back to you with honest advice and a free quote.", crumb: [{ name: "Contact" }], actions: false })}
    <section class="section section--tight">
      <div class="container contact-cards">
        <a href="#" class="ccard reveal js-whatsapp"><span class="ccard__ic ccard__ic--wa">${waIcon}</span><b>WhatsApp</b><p>Fastest way to reach us</p></a>
        <a href="mailto:${site.email}" class="ccard reveal"><span class="ccard__ic">${icon('<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/>')}</span><b>Email</b><p>${site.email}</p></a>
        <a href="/free-audit/" class="ccard reveal"><span class="ccard__ic">${icon('<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>')}</span><b>Free Audit</b><p>Get a free marketing review</p></a>
      </div>
    </section>
    ${contactForm("Not sure yet — need advice", "Send us a message")}
    <section class="section faq-sec">
      <div class="container faq-wrap">
        ${head2("FAQ", "Before you", "reach out")}
        ${faqBlock(homeFaqs.slice(1, 5))}
      </div>
    </section>
  `,
}));

/* ---------------- FREE AUDIT ---------------- */
add("/free-audit/", layout({
  url: "/free-audit/",
  title: "Free Website & Digital Marketing Audit | Webify",
  desc: "Get a free audit of your website, SEO and social media. We'll send a personalised report with clear, actionable steps to get more customers online.",
  active: "",
  schema: [crumbSchema([{ name: "Home", url: "/" }, { name: "Free Audit", url: "/free-audit/" }])],
  body: `
    <section class="page-hero">
      <div class="hero__bg"><div class="blob blob--1"></div><div class="blob blob--2"></div><div class="grid-lines"></div></div>
      <div class="container audit-hero">
        <div>
          ${crumbs([{ name: "Free Audit" }])}
          <div class="pill reveal"><span class="pill__dot"></span> 100% Free · No obligation</div>
          <h1 class="page-hero__title reveal">Find out what's holding your business <span class="serif gradient-text">back online.</span></h1>
          <p class="page-hero__text reveal">Our experts will review your website, Google presence and social media — then send you a personalised report with clear, practical steps to get more customers.</p>
          <ul class="audit-list reveal">
            <li>${check}<div><b>Website review</b><span>Design, speed, mobile experience & conversion issues</span></div></li>
            <li>${check}<div><b>SEO check</b><span>Rankings, keywords, technical problems & quick wins</span></div></li>
            <li>${check}<div><b>Google Business Profile</b><span>How you appear on Google Maps & local search</span></div></li>
            <li>${check}<div><b>Social media review</b><span>Content, consistency, branding & engagement</span></div></li>
            <li>${check}<div><b>Competitor snapshot</b><span>What your competitors do better — and how to beat them</span></div></li>
          </ul>
        </div>
        <form class="form form--audit js-lead-form reveal" data-kind="audit" novalidate>
          <h3>Claim your free audit</h3>
          <p class="form__sub">Takes 30 seconds. Report delivered within 48 hours.</p>
          <label>Your Name *<input type="text" name="name" required placeholder="Ali Khan" autocomplete="name" /></label>
          <label>Email *<input type="email" name="email" required placeholder="you@email.com" autocomplete="email" /></label>
          <label>Phone / WhatsApp<input type="tel" name="phone" placeholder="+92 3xx xxxxxxx" autocomplete="tel" /></label>
          <label>Website URL (if any)<input type="text" name="website" placeholder="www.yourbusiness.com" /></label>
          <label>Facebook / Instagram page<input type="text" name="social" placeholder="instagram.com/yourbrand" /></label>
          <label>Your biggest goal *<select name="service" class="js-service"><option>Get more customers / leads</option><option>Rank higher on Google</option><option>Grow on social media</option><option>Improve or redesign website</option><option>Build a stronger brand</option></select></label>
          <input type="hidden" name="message" value="Free audit request" />
          <button type="submit" class="btn btn--primary btn--lg btn--block">Get My Free Audit ${arrow}</button>
          <button type="button" class="btn btn--wa btn--lg btn--block js-wa-submit">${waIcon} Request via WhatsApp</button>
          <p class="form__note" role="status"></p>
        </form>
      </div>
    </section>
    <section class="section process">
      <div class="container">
        ${head2("How it works", "Three simple", "steps")}
        <div class="steps steps--3">
          <div class="step reveal"><div class="step__num">1</div><h4>Submit the form</h4><p>Share your website and social links — takes 30 seconds.</p></div>
          <div class="step reveal"><div class="step__num">2</div><h4>We analyze</h4><p>Our team reviews your online presence in detail.</p></div>
          <div class="step reveal"><div class="step__num">3</div><h4>Get your report</h4><p>Receive clear recommendations — use them yourself or with us.</p></div>
        </div>
      </div>
    </section>
  `,
}));

/* ---------------- LEGAL ---------------- */
const legal = (url, title, h, sections) => add(url, layout({
  url, title: `${title} | Webify`, desc: `${title} for webify.website.`, active: "",
  body: `
    ${pageHero({ a: h[0], b: h[1], text: `Last updated: ${new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}`, crumb: [{ name: title }], actions: false })}
    <section class="section section--tight"><div class="container prose">${sections.map(([t, p]) => `<h2>${t}</h2><p>${p}</p>`).join("")}</div></section>
  `,
}));
legal("/privacy-policy/", "Privacy Policy", ["Privacy", "Policy"], [
  ["Introduction", `Webify ("we", "us") respects your privacy. This policy explains what information we collect through ${site.domain.replace("https://", "")} and how we use it.`],
  ["Information we collect", "When you contact us or request a quote or audit, we collect the details you provide — such as your name, email address, phone number, website and project details. We may also collect anonymous usage data (like pages visited) through analytics tools to improve our website."],
  ["How we use your information", "We use your information only to respond to your enquiry, prepare quotes and proposals, deliver our services and, if you agree, send you relevant updates. We never sell or rent your personal information to anyone."],
  ["Cookies & analytics", "Our website may use cookies and analytics tools (such as Google Analytics) to understand how visitors use the site. You can disable cookies in your browser settings at any time."],
  ["Third‑party services", "When you message us via WhatsApp or email, your communication is also subject to the privacy policies of those providers. Links to external websites are not covered by this policy."],
  ["Data security", "We take reasonable measures to protect your information from unauthorised access, loss or misuse."],
  ["Your rights", `You can ask us at any time to access, correct or delete the personal information we hold about you by emailing ${site.email}.`],
  ["Contact", `If you have any questions about this Privacy Policy, contact us at ${site.email}.`],
]);
legal("/terms/", "Terms of Service", ["Terms of", "Service"], [
  ["Agreement", "By using this website or engaging Webify's services, you agree to these terms. Specific project terms (scope, timeline, cost) are confirmed in writing in each proposal or quote."],
  ["Quotes & payments", "Quotes are valid for 30 days. One‑time projects typically require a 50% advance before work begins, with the balance due on completion before final files are delivered. Monthly services are billed in advance."],
  ["Revisions", "Each project includes revisions within the agreed scope. Requests outside the original scope may be quoted separately."],
  ["Client responsibilities", "Clients are responsible for providing accurate information, content and timely feedback. Delays in feedback may affect delivery timelines."],
  ["Ownership", "Once full payment is received, the client owns the final deliverables (designs, website, content) created specifically for them. Third‑party assets such as fonts, plugins, themes or stock images remain subject to their own licences."],
  ["Advertising spend", "Ad budgets for Google, Meta, TikTok or other platforms are paid directly by the client and are separate from our service fees. Results from marketing and SEO depend on many factors and cannot be guaranteed."],
  ["Cancellation", "Monthly services can be cancelled with written notice before the next billing cycle. Advance payments for one‑time projects are non‑refundable once work has started."],
  ["Limitation of liability", "Webify is not liable for indirect or consequential losses, or for issues caused by third‑party platforms, hosting providers or changes in search engine and social media algorithms."],
  ["Contact", `Questions about these terms? Email us at ${site.email}.`],
]);

/* ---------------- 404 ---------------- */
const page404 = layout({
  url: "/404.html", title: "Page Not Found | Webify", desc: "The page you are looking for does not exist.", active: "",
  body: `
    <section class="page-hero page-hero--404">
      <div class="hero__bg"><div class="blob blob--1"></div><div class="blob blob--2"></div><div class="grid-lines"></div></div>
      <div class="container page-hero__inner">
        <p class="big404 gradient-text">404</p>
        <h1 class="page-hero__title">This page took a <span class="serif gradient-text">wrong turn.</span></h1>
        <p class="page-hero__text">The page you're looking for doesn't exist or has moved.</p>
        <div class="hero__actions"><a href="/" class="btn btn--primary btn--lg">Back to Home</a><a href="/services/" class="btn btn--ghost btn--lg">Our Services</a></div>
      </div>
    </section>`,
}).replace('<link rel="canonical" href="https://webify.website/404.html" />', '<meta name="robots" content="noindex" />');

/* =========================================================
   WRITE FILES
   ========================================================= */
const write = (rel, content) => {
  const file = path.join(ROOT, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content);
};
pages.forEach((p) => write(p.url === "/" ? "index.html" : path.join(p.url, "index.html"), p.html));
write("404.html", page404);

const today = new Date().toISOString().slice(0, 10);
write("sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map((p) => `  <url><loc>${site.domain}${p.url}</loc><lastmod>${today}</lastmod><priority>${p.url === "/" ? "1.0" : p.url.startsWith("/services/") ? "0.9" : "0.7"}</priority></url>`).join("\n")}
</urlset>
`);
write("robots.txt", `User-agent: *
Allow: /
Disallow: /tools/

Sitemap: ${site.domain}/sitemap.xml
`);

console.log(`Built ${pages.length + 1} pages.`);
