/* =========================================================
   Webify — site content
   Edit this file, then run:  node tools/build.js
   ========================================================= */

const site = {
  name: "Webify",
  domain: "https://webify.website",
  email: "info@webify.website",
  // WhatsApp number with country code, digits only, e.g. "923001234567"
  whatsapp: "",
  // Optional phone number to show on the site, e.g. "+92 300 1234567"
  phone: "",
  tagline: "Premium Digital Marketing Agency",
  description:
    "Webify is a premium digital marketing agency offering website development, website design, logo design, business card design, e-book design, social media marketing, SEO, Google Ads and more.",
  socials: {
    // Add your profile links, e.g. facebook: "https://facebook.com/webify"
    facebook: "",
    instagram: "",
    linkedin: "",
    tiktok: "",
    youtube: "",
  },
};

/* ---------------------------------------------------------
   CLIENT REVIEWS
   Only add REAL reviews from real clients (with their permission).
   While this list is empty, the reviews section stays hidden.
   Example:
   { name: "Ahmed Raza", role: "Owner, Raza Foods", text: "Webify built our website...", rating: 5 },
   --------------------------------------------------------- */
const reviews = [];

/* ---------------------------------------------------------
   SERVICES
   --------------------------------------------------------- */
const icons = {
  dev: '<path d="m8 9-4 3 4 3M16 9l4 3-4 3M14 5l-4 14"/>',
  design: '<rect x="3" y="4" width="18" height="14" rx="2"/><path d="M3 9h18M8 21h8M12 18v3"/>',
  logo: '<path d="M12 3 3 8l9 5 9-5-9-5z"/><path d="m3 13 9 5 9-5"/>',
  card: '<rect x="2" y="6" width="20" height="13" rx="2"/><circle cx="8" cy="12.5" r="2"/><path d="M13 11h5M13 14h3"/>',
  book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5v14z"/><path d="M6.5 17A2.5 2.5 0 0 0 4 19.5 2.5 2.5 0 0 0 6.5 22H20v-5"/>',
  social: '<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4"/>',
  seo: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5M8 11h6M11 8v6"/>',
  ads: '<path d="M3 3v18h18"/><path d="m7 15 4-4 3 3 6-6"/>',
  write: '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/>',
  brand: '<circle cx="13.5" cy="6.5" r="1.5"/><circle cx="17.5" cy="10.5" r="1.5"/><circle cx="8.5" cy="7.5" r="1.5"/><circle cx="6.5" cy="12.5" r="1.5"/><path d="M12 2a10 10 0 0 0 0 20c1.1 0 2-.9 2-2 0-.5-.2-1-.5-1.3-.3-.4-.5-.8-.5-1.3 0-1.1.9-2 2-2h2.4A5.6 5.6 0 0 0 22 9.8C22 5.5 17.5 2 12 2z"/>',
  video: '<rect x="2" y="6" width="14" height="12" rx="2"/><path d="m16 10 6-3v10l-6-3"/>',
  email: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/>',
};

const services = [
  /* ------------------------------------------------ 1 */
  {
    slug: "website-development",
    name: "Website Development",
    group: "Web",
    icon: icons.dev, c1: "#6d5dfc", c2: "#a78bfa",
    short: "Fast, secure and responsive websites — business sites, e‑commerce stores, WordPress, Shopify and custom builds.",
    bullets: ["Business & Portfolio Sites", "E‑commerce Stores", "WordPress / Shopify"],
    metaTitle: "Website Development Services — Fast, Secure & SEO-Ready | Webify",
    metaDesc: "Professional website development: business websites, e-commerce stores, WordPress, Shopify and custom web apps. Fast, mobile-friendly and built to convert.",
    heroA: "Websites that load fast,", heroB: "sell faster.",
    heroText: "We develop modern, mobile‑first websites that look premium, rank on Google and turn visitors into customers — from simple business sites to full e‑commerce stores.",
    introTitle: "Your website is your best salesperson",
    intro: [
      "Most customers check your website before they call, visit or buy. A slow, outdated or confusing site quietly sends them to your competitors. A great one works 24/7 — answering questions, building trust and collecting leads while you sleep.",
      "At Webify we build websites with three goals: speed, trust and conversions. Every site is hand‑crafted, fully responsive, SEO‑ready from day one and easy for you to update yourself.",
    ],
    features: [
      { t: "Business Websites", d: "Professional multi‑page websites that present your company, services and contact details with clarity and style." },
      { t: "E‑commerce Stores", d: "Online stores with product catalogs, cart, checkout, COD and payment gateway integration (JazzCash, Easypaisa, Stripe, PayPal)." },
      { t: "WordPress Development", d: "Custom WordPress sites with an easy dashboard so you can edit text, images and blogs without touching code." },
      { t: "Shopify Stores", d: "Conversion‑focused Shopify setup, theme customization, apps and product uploads — ready to start selling." },
      { t: "Landing Pages", d: "High‑converting single pages built for ads, launches and lead generation campaigns." },
      { t: "Custom Web Apps", d: "Booking systems, portals, dashboards and custom functionality built around your business process." },
    ],
    included: ["100% mobile responsive", "Speed‑optimized (Core Web Vitals)", "On‑page SEO setup", "SSL & security hardening", "Contact forms & WhatsApp chat", "Google Analytics & Search Console", "Domain & hosting setup help", "Training video on managing your site"],
    process: [
      { t: "Discovery Call", d: "We learn about your business, goals, competitors and the features you need." },
      { t: "Sitemap & Design", d: "We plan the page structure and design a custom look that matches your brand." },
      { t: "Development", d: "We build, connect integrations and optimize every page for speed and SEO." },
      { t: "Launch & Support", d: "We test on all devices, go live and support you after launch." },
    ],
    packages: [
      { name: "Starter Site", desc: "Perfect for new businesses", items: ["Up to 5 pages", "Responsive design", "Contact form + WhatsApp", "Basic SEO setup", "1 month support"] },
      { name: "Business Pro", desc: "For growing companies", featured: true, items: ["Up to 12 pages", "Custom premium design", "Blog / news section", "Advanced on‑page SEO", "Speed optimization", "3 months support"] },
      { name: "E‑commerce", desc: "Sell online with confidence", items: ["Unlimited products", "Cart, checkout & payments", "Order & inventory management", "Product SEO", "Training & 3 months support"] },
    ],
    tools: ["WordPress", "Shopify", "WooCommerce", "HTML5 / CSS3", "JavaScript", "React", "PHP", "Elementor", "Cloudflare"],
    faqs: [
      { q: "How long does it take to build a website?", a: "A standard business website takes 7–14 working days. E‑commerce stores and custom web apps usually take 2–5 weeks depending on features. You'll get a clear timeline before we start." },
      { q: "Will I be able to update my website myself?", a: "Yes. We build on easy‑to‑use platforms like WordPress or Shopify and give you a short training video so you can edit text, images, products and blogs on your own." },
      { q: "Do you provide domain and hosting?", a: "We can help you buy and set up your domain and hosting, or work with what you already have. Everything is registered in your name so you always own it." },
      { q: "Will my website be mobile‑friendly and SEO‑ready?", a: "Absolutely. Every website we build is fully responsive and comes with on‑page SEO basics: meta tags, clean URLs, sitemap, fast loading and Google Search Console setup." },
      { q: "What happens after the website goes live?", a: "Every package includes free support after launch. After that, you can choose an affordable monthly maintenance plan for updates, backups and security." },
    ],
    related: ["website-design", "seo-marketing", "content-writing"],
  },

  /* ------------------------------------------------ 2 */
  {
    slug: "website-design",
    name: "Website Design",
    group: "Web",
    icon: icons.design, c1: "#ec4899", c2: "#f9a8d4",
    short: "Modern UI/UX design that looks premium and turns visitors into paying customers.",
    bullets: ["UI/UX & Wireframes", "Landing Pages", "Website Redesign"],
    metaTitle: "Website Design & UI/UX Services — Premium, Conversion-Focused | Webify",
    metaDesc: "Custom website design and UI/UX that makes your brand look premium. Wireframes, Figma designs, landing pages and website redesigns that convert.",
    heroA: "Design that makes people", heroB: "trust you instantly.",
    heroText: "Visitors judge your business in under a second. We design beautiful, intuitive websites that build credibility instantly and guide people towards taking action.",
    introTitle: "Beautiful is good. Beautiful + clear is better.",
    intro: [
      "Great web design isn't just about looking pretty — it's about making the right first impression and making it effortless for visitors to understand what you offer and how to buy it.",
      "Our designers combine brand aesthetics with proven UX principles: clear hierarchy, persuasive layouts, strong calls‑to‑action and a seamless experience on every screen size.",
    ],
    features: [
      { t: "Custom UI Design", d: "Unique, on‑brand designs created from scratch in Figma — never a generic template." },
      { t: "UX & Wireframing", d: "User journeys and wireframes that make navigation simple and conversions natural." },
      { t: "Landing Page Design", d: "Focused, persuasive pages for ads, product launches and lead generation." },
      { t: "Website Redesign", d: "Turn an outdated website into a modern, fast and trustworthy brand experience." },
      { t: "Mobile‑First Design", d: "Layouts designed for phones first, where most of your customers are browsing." },
      { t: "Design Systems", d: "Reusable components, colors and typography so your brand stays consistent everywhere." },
    ],
    included: ["Figma source files", "Desktop, tablet & mobile layouts", "Interactive clickable prototype", "Custom icons & illustrations", "Brand‑matched color & typography", "Conversion‑focused CTAs", "Revisions until approved", "Developer‑ready handoff"],
    process: [
      { t: "Research", d: "We study your audience, competitors and goals to define what the design must achieve." },
      { t: "Wireframes", d: "We map layouts and user flow so structure is right before visuals." },
      { t: "Visual Design", d: "We craft high‑fidelity designs with your brand colors, fonts and imagery." },
      { t: "Prototype & Handoff", d: "You review a clickable prototype; once approved, we hand off or build it." },
    ],
    packages: [
      { name: "Landing Page", desc: "One page, maximum impact", items: ["1 long‑form page", "Desktop + mobile design", "2 design concepts", "Figma source file"] },
      { name: "Full Website", desc: "Complete website design", featured: true, items: ["Up to 10 pages", "UX wireframes", "Clickable prototype", "Design system", "Unlimited revisions*"] },
      { name: "Redesign", desc: "Refresh your existing site", items: ["UX audit of current site", "Modern new design", "Improved conversion flow", "Developer handoff"] },
    ],
    tools: ["Figma", "Adobe XD", "Photoshop", "Illustrator", "Framer", "Webflow"],
    faqs: [
      { q: "What's the difference between web design and development?", a: "Design is how your website looks and feels (layouts, colors, user experience). Development is turning that design into a working website. We offer both — separately or together." },
      { q: "Will I see the design before it's built?", a: "Yes. You'll review the full design and a clickable prototype in Figma and request changes before any development begins." },
      { q: "Can you redesign my existing website?", a: "Definitely. We start with a free audit of your current site, then design a modern version that keeps what works and fixes what doesn't." },
      { q: "Do I get the source files?", a: "Yes, you receive the complete Figma source files and all assets once the project is complete." },
      { q: "How many revisions do I get?", a: "We revise until you're happy within the agreed scope. Most clients are fully satisfied within 2–3 rounds." },
    ],
    related: ["website-development", "branding-graphics", "logo-design"],
  },

  /* ------------------------------------------------ 3 */
  {
    slug: "logo-design",
    name: "Logo Design",
    group: "Design",
    icon: icons.logo, c1: "#f59e0b", c2: "#fcd34d",
    short: "Unique, memorable logos that capture your brand's personality and build instant trust.",
    bullets: ["Custom Logo Concepts", "Brand Colors & Fonts", "All Source Files"],
    metaTitle: "Professional Logo Design Services — Unique & Memorable | Webify",
    metaDesc: "Custom logo design that makes your brand memorable. Multiple original concepts, unlimited revisions and all source files (AI, SVG, PNG, PDF).",
    heroA: "A logo people", heroB: "remember.",
    heroText: "Your logo is the face of your business. We design original, timeless logos that communicate who you are and look great everywhere — from a signboard to an Instagram profile.",
    introTitle: "More than a pretty symbol",
    intro: [
      "A strong logo builds recognition, trust and professionalism. It's on your website, social media, packaging, cards and signboards — so it needs to be simple, versatile and unmistakably yours.",
      "Every Webify logo is designed by hand from scratch. No templates, no clip‑art. We research your industry and audience, sketch multiple directions and refine the winner until it's perfect.",
    ],
    features: [
      { t: "Wordmark Logos", d: "Elegant typography‑based logos built around your brand name." },
      { t: "Icon & Symbol Logos", d: "Distinct symbols that stand out even at small sizes like app icons." },
      { t: "Combination Marks", d: "Icon + text logos that are versatile across all platforms." },
      { t: "Emblem & Badge Logos", d: "Classic badge‑style logos for restaurants, schools, clubs and premium brands." },
      { t: "Mascot Logos", d: "Friendly custom characters that give your brand personality." },
      { t: "Logo Redesign", d: "Modernize your existing logo while keeping its recognition." },
    ],
    included: ["Multiple original concepts", "Unlimited revisions*", "Full color, black & white versions", "Transparent PNG", "Vector files (AI, SVG, EPS, PDF)", "Social media profile sizes", "Color codes & font names", "Full copyright ownership"],
    process: [
      { t: "Brand Brief", d: "We understand your business, audience, style preferences and competitors." },
      { t: "Concepts", d: "We sketch and present multiple unique logo directions." },
      { t: "Refinement", d: "We perfect your chosen concept — colors, fonts and details." },
      { t: "Final Delivery", d: "You receive every file format you'll ever need, plus full ownership." },
    ],
    packages: [
      { name: "Basic Logo", desc: "Clean & professional", items: ["2 logo concepts", "3 revisions", "PNG + JPG files", "Transparent background"] },
      { name: "Standard Logo", desc: "Most chosen by businesses", featured: true, items: ["4 logo concepts", "Unlimited revisions*", "All vector source files", "Social media kit", "Color palette"] },
      { name: "Brand Starter", desc: "Logo + identity basics", items: ["6 logo concepts", "Business card design", "Letterhead design", "Mini brand guide", "All source files"] },
    ],
    tools: ["Adobe Illustrator", "Photoshop", "Figma", "Procreate"],
    faqs: [
      { q: "How long does logo design take?", a: "You'll receive your first concepts within 2–4 working days. The full process, including revisions, usually takes about a week." },
      { q: "Will my logo be 100% original?", a: "Yes. Every logo is designed from scratch by our designers. We never use templates or stock clip‑art, so you can trademark it." },
      { q: "What files will I receive?", a: "AI, EPS, SVG, PDF, PNG (transparent) and JPG — in color, black and white versions — ready for print, web and social media." },
      { q: "Do I own the copyright?", a: "Yes, once the project is complete you own 100% of the rights to your logo." },
      { q: "What if I don't like the concepts?", a: "We'll go back to the drawing board with your feedback. Our goal is a logo you're genuinely proud of." },
    ],
    related: ["business-card-design", "branding-graphics", "website-design"],
  },

  /* ------------------------------------------------ 4 */
  {
    slug: "business-card-design",
    name: "Business Card Design",
    group: "Design",
    icon: icons.card, c1: "#14b8a6", c2: "#5eead4",
    short: "Elegant, print‑ready business cards that leave a lasting first impression.",
    bullets: ["Double‑Sided Designs", "Print‑Ready Files", "Digital Cards (QR)"],
    metaTitle: "Business Card Design — Premium, Print-Ready Cards | Webify",
    metaDesc: "Custom business card design that leaves a lasting impression. Double-sided, print-ready files, QR codes and digital business cards.",
    heroA: "First impressions that", heroB: "stay in their pocket.",
    heroText: "A business card is often the first physical thing a client keeps from you. We design premium, print‑ready cards that make you look established and memorable.",
    introTitle: "Small card. Big impression.",
    intro: [
      "In meetings, events and shops, your business card speaks for you after you've left the room. A cheap‑looking card says the same about your business — a well‑designed one signals quality and professionalism.",
      "We design cards that match your brand perfectly, with careful typography, smart layouts and print‑ready files prepared for your printer — including special finishes like foil, spot UV and embossing.",
    ],
    features: [
      { t: "Corporate Cards", d: "Clean, professional cards for companies, consultants and executives." },
      { t: "Creative Cards", d: "Bold, unique designs for creatives, salons, cafés and boutiques." },
      { t: "Luxury Finishes", d: "Designs prepared for gold foil, spot UV, embossing and textured papers." },
      { t: "QR Code Cards", d: "Smart QR codes linking to your website, WhatsApp, location or portfolio." },
      { t: "Digital Business Cards", d: "Shareable digital cards for WhatsApp and email — eco‑friendly and always updated." },
      { t: "Team Card Sets", d: "Consistent card designs for your whole team with individual details." },
    ],
    included: ["Double‑sided design", "2–3 design concepts", "Print‑ready PDF (CMYK, bleed)", "High‑res PNG for sharing", "QR code integration", "Brand‑matched colors & fonts", "Revisions until approved", "Printer coordination support"],
    process: [
      { t: "Your Details", d: "Share your logo, details and style preference — or we'll suggest a direction." },
      { t: "Concepts", d: "We design 2–3 unique card concepts for you to choose from." },
      { t: "Refine", d: "We polish your favourite until every detail is perfect." },
      { t: "Print‑Ready Files", d: "You get files prepared exactly to your printer's requirements." },
    ],
    packages: [
      { name: "Single Card", desc: "One person, one design", items: ["Double‑sided design", "2 concepts", "Print‑ready PDF", "QR code"] },
      { name: "Premium Card", desc: "Luxury finish ready", featured: true, items: ["3 concepts", "Foil / spot UV setup", "Digital card version", "Unlimited revisions*"] },
      { name: "Team Set", desc: "For your entire team", items: ["Up to 10 team members", "Consistent design system", "Print‑ready files for each", "Digital versions"] },
    ],
    tools: ["Illustrator", "InDesign", "Photoshop", "Canva (for edits)"],
    faqs: [
      { q: "Do you also print the cards?", a: "We provide fully print‑ready files and can recommend trusted printers. We also coordinate with your printer to make sure the result is perfect." },
      { q: "Can you design a card without a logo?", a: "Yes. We can create a typography‑based card, or design a logo for you first in a combined package." },
      { q: "What size will the card be?", a: "Standard size is 3.5 × 2 inches (89 × 51 mm), but we can design square, rounded, folded or any custom size." },
      { q: "What is a digital business card?", a: "It's a mobile‑friendly version of your card that you can share via WhatsApp, email or QR code — with clickable phone, email, map and social links." },
      { q: "How fast is delivery?", a: "First concepts are usually ready within 1–2 working days." },
    ],
    related: ["logo-design", "branding-graphics", "ebook-design"],
  },

  /* ------------------------------------------------ 5 */
  {
    slug: "ebook-design",
    name: "E‑Book Design",
    group: "Design",
    icon: icons.book, c1: "#8b5cf6", c2: "#c4b5fd",
    short: "Beautiful e‑book covers and interior layouts for authors, coaches and businesses.",
    bullets: ["Cover Design", "Interior Formatting", "Kindle / PDF Ready"],
    metaTitle: "E-Book Design & Formatting — Covers, Layouts, Kindle Ready | Webify",
    metaDesc: "Professional e-book cover design and interior formatting for authors, coaches and businesses. Kindle (KDP), EPUB and PDF ready. Lead magnets that convert.",
    heroA: "E‑books people actually", heroB: "want to read.",
    heroText: "Whether you're publishing on Amazon or creating a lead magnet, we design stunning covers and readable interiors that make your content look like a bestseller.",
    introTitle: "People do judge a book by its cover",
    intro: [
      "Your e‑book cover is the advertisement for everything inside. On Amazon, social media or your website, it has seconds to grab attention — and a professional interior keeps readers engaged until the last page.",
      "We design covers that sell and layouts that read beautifully on phones, tablets, Kindle and print. Perfect for authors, coaches, course creators and businesses using e‑books to generate leads.",
    ],
    features: [
      { t: "E‑Book Cover Design", d: "Eye‑catching covers designed to stand out in thumbnails and stores." },
      { t: "Interior Layout", d: "Clean typography, chapter styles, images and callouts for an easy read." },
      { t: "Kindle / KDP Formatting", d: "Files formatted to Amazon KDP requirements for e‑book and paperback." },
      { t: "Lead Magnet E‑Books", d: "Branded guides and checklists that collect emails and build authority." },
      { t: "Workbooks & Guides", d: "Fillable PDFs, planners and workbooks for coaches and courses." },
      { t: "3D Mockups", d: "Realistic book mockups for your ads, website and social media." },
    ],
    included: ["Front cover design", "Interior formatting", "PDF, EPUB & MOBI files", "Clickable table of contents", "Images, charts & callouts", "3D promotional mockups", "Paperback cover (spine & back)", "Revisions until approved"],
    process: [
      { t: "Manuscript & Brief", d: "Send your content and tell us your audience, genre and style." },
      { t: "Cover Concepts", d: "We create cover options designed to stand out in your market." },
      { t: "Interior Layout", d: "We format and design every page for comfortable reading." },
      { t: "Publish‑Ready Files", d: "You get files ready for Amazon, your website or email." },
    ],
    packages: [
      { name: "Cover Only", desc: "A cover that sells", items: ["2 cover concepts", "E‑book cover", "3D mockup", "Unlimited revisions*"] },
      { name: "Complete E‑Book", desc: "Cover + interior", featured: true, items: ["Cover design", "Up to 50 pages layout", "PDF + EPUB files", "Clickable TOC", "3D mockups"] },
      { name: "Publishing Pack", desc: "Amazon KDP ready", items: ["E‑book + paperback cover", "Full interior formatting", "KDP‑ready files", "Promotional graphics"] },
    ],
    tools: ["InDesign", "Illustrator", "Photoshop", "Vellum", "Canva"],
    faqs: [
      { q: "Can you format my e‑book for Amazon Kindle?", a: "Yes. We deliver files that meet Amazon KDP requirements for both Kindle e‑books and paperbacks, including the full wrap‑around print cover." },
      { q: "Do you write the e‑book content too?", a: "We can! Our content writing team can write or edit your e‑book, especially lead magnets, guides and business e‑books." },
      { q: "What is a lead magnet e‑book?", a: "A free, valuable guide that you offer in exchange for a visitor's email address. It's one of the most effective ways to grow your email list and generate leads." },
      { q: "How many pages can you design?", a: "Any length — from a 10‑page guide to a 300‑page book. Pricing depends on page count and complexity." },
      { q: "Will I get editable files?", a: "Yes, on request we provide the source files so you can make small updates later." },
    ],
    related: ["content-writing", "email-marketing", "branding-graphics"],
  },

  /* ------------------------------------------------ 6 */
  {
    slug: "social-media-marketing",
    name: "Social Media Marketing",
    group: "Marketing",
    icon: icons.social, c1: "#3b82f6", c2: "#93c5fd",
    short: "Grow on Facebook, Instagram, TikTok & LinkedIn with content and ads that convert.",
    bullets: ["Page Management", "Post & Reel Design", "Meta / TikTok Ads"],
    metaTitle: "Social Media Marketing Agency — Facebook, Instagram, TikTok | Webify",
    metaDesc: "Social media marketing that grows followers and sales. Page management, content creation, reels, Meta Ads and TikTok Ads with monthly reporting.",
    heroA: "Turn followers into", heroB: "loyal customers.",
    heroText: "We plan, design and manage your social media and run targeted ads on Facebook, Instagram and TikTok — so your brand stays active, grows every month and brings in real sales.",
    introTitle: "Consistent. Creative. Converting.",
    intro: [
      "Your customers spend hours every day on social media. If your pages are inactive or your posts look amateur, you're invisible — or worse, you look unreliable.",
      "Webify handles everything: strategy, content calendar, scroll‑stopping post and reel designs, captions, hashtags, community management and paid ads. Every month you get a clear report showing what's working.",
    ],
    features: [
      { t: "Social Media Strategy", d: "A clear plan for your audience, content pillars, posting frequency and goals." },
      { t: "Page Management", d: "Daily posting, scheduling and profile optimization across all your platforms." },
      { t: "Post & Carousel Design", d: "On‑brand, scroll‑stopping graphics that people stop, like and share." },
      { t: "Reels & Short Videos", d: "Trending reels and TikToks that boost reach and engagement." },
      { t: "Meta & TikTok Ads", d: "Targeted ad campaigns for leads, messages and sales with optimized budgets." },
      { t: "Community Management", d: "Replying to comments and messages so no potential customer is ignored." },
    ],
    included: ["Monthly content calendar", "Custom post designs", "Captions & hashtag research", "Reels / short video editing", "Profile & bio optimization", "Ad campaign setup & optimization", "Competitor analysis", "Monthly performance report"],
    process: [
      { t: "Audit & Strategy", d: "We audit your pages and competitors, then build a growth strategy." },
      { t: "Content Calendar", d: "We plan a month of content for your approval before anything goes live." },
      { t: "Create & Publish", d: "We design, write, schedule and post — consistently." },
      { t: "Analyze & Grow", d: "We track results, run ads and improve every month." },
    ],
    packages: [
      { name: "Starter", desc: "Build a strong presence", items: ["2 platforms", "12 posts / month", "Captions & hashtags", "Monthly report"] },
      { name: "Growth", desc: "Most popular for businesses", featured: true, items: ["3 platforms", "20 posts + 4 reels / month", "Ad campaign management", "Community management", "Bi‑weekly reports"] },
      { name: "Premium", desc: "Full social domination", items: ["All platforms", "30 posts + 8 reels / month", "Advanced ads funnels", "Influencer outreach", "Dedicated manager"] },
    ],
    tools: ["Meta Business Suite", "TikTok Ads", "Canva", "Photoshop", "CapCut", "Premiere Pro", "Later", "LinkedIn"],
    faqs: [
      { q: "Which platforms do you manage?", a: "Facebook, Instagram, TikTok, LinkedIn, YouTube, Pinterest and X (Twitter). We'll recommend the platforms where your customers actually spend time." },
      { q: "Is ad budget included in your fee?", a: "No. Your ad budget is paid directly to Facebook/TikTok, so you have full control and transparency. Our fee covers strategy, creatives and management." },
      { q: "Will I approve posts before they go live?", a: "Yes. You receive a monthly content calendar to review and approve before we publish anything." },
      { q: "How soon will I see results?", a: "Engagement usually improves in the first month. Paid ads can start generating leads within days. Organic growth builds steadily over 2–3 months." },
      { q: "Is there a long‑term contract?", a: "No lock‑in. Our plans are month‑to‑month — we keep clients by delivering results." },
    ],
    related: ["video-editing", "google-ads", "content-writing"],
  },

  /* ------------------------------------------------ 7 */
  {
    slug: "seo-marketing",
    name: "SEO Marketing",
    group: "Marketing",
    icon: icons.seo, c1: "#22c55e", c2: "#86efac",
    short: "Rank higher on Google and get found by customers searching for what you offer.",
    bullets: ["On‑Page & Technical SEO", "Local SEO / Google Maps", "Backlinks & Keywords"],
    metaTitle: "SEO Services — Rank Higher on Google & Get More Customers | Webify",
    metaDesc: "Result-driven SEO services: keyword research, on-page & technical SEO, local SEO, Google Business Profile, content and quality backlinks. Monthly ranking reports.",
    heroA: "Get found on Google by", heroB: "ready‑to‑buy customers.",
    heroText: "People searching on Google already want what you sell. Our SEO puts your business in front of them — bringing consistent, free traffic and leads month after month.",
    introTitle: "The marketing channel that keeps paying you back",
    intro: [
      "Ads stop the moment you stop paying. SEO builds an asset: rankings that bring visitors every single day. That's why SEO consistently delivers one of the highest returns of any marketing channel.",
      "Our approach is transparent and white‑hat: we find the keywords your customers use, fix technical issues holding your site back, create content Google loves and build authority with quality backlinks.",
    ],
    features: [
      { t: "Keyword Research", d: "We find high‑intent keywords your customers are searching — and that you can realistically win." },
      { t: "On‑Page SEO", d: "Optimized titles, meta descriptions, headings, content and internal links." },
      { t: "Technical SEO", d: "Site speed, mobile usability, indexing, schema markup and Core Web Vitals." },
      { t: "Local SEO", d: "Google Business Profile optimization to rank in Google Maps and 'near me' searches." },
      { t: "Content & Blogging", d: "SEO articles that answer customer questions and attract organic traffic." },
      { t: "Link Building", d: "High‑quality, relevant backlinks that build your website's authority." },
    ],
    included: ["Full SEO audit", "Competitor analysis", "Keyword strategy", "On‑page optimization", "Technical fixes", "Google Business Profile", "Monthly SEO content", "Monthly ranking & traffic report"],
    process: [
      { t: "SEO Audit", d: "We analyze your site, rankings and competitors to find quick wins and gaps." },
      { t: "Strategy", d: "We create a keyword and content roadmap aligned with your business goals." },
      { t: "Optimize & Build", d: "We fix technical issues, optimize pages, publish content and earn links." },
      { t: "Report & Improve", d: "Monthly reports show rankings, traffic and leads — and we keep improving." },
    ],
    packages: [
      { name: "Local SEO", desc: "Dominate your city", items: ["Google Business Profile", "10 target keywords", "Local citations", "On‑page SEO", "Monthly report"] },
      { name: "Growth SEO", desc: "For ambitious businesses", featured: true, items: ["25 target keywords", "Technical SEO fixes", "4 SEO blogs / month", "Quality backlinks", "Bi‑weekly updates"] },
      { name: "E‑commerce SEO", desc: "Rank your products", items: ["50+ keywords", "Product & category SEO", "Schema markup", "Advanced link building", "Dedicated SEO manager"] },
    ],
    tools: ["Google Search Console", "Google Analytics 4", "Ahrefs", "SEMrush", "Screaming Frog", "Rank Math / Yoast", "PageSpeed Insights"],
    faqs: [
      { q: "How long does SEO take to show results?", a: "Most websites see noticeable improvements in 2–4 months, with strong results in 6+ months. Local SEO and technical fixes often show faster wins." },
      { q: "Can you guarantee #1 ranking on Google?", a: "No honest agency can guarantee #1 — Google controls rankings. What we do guarantee is transparent, proven white‑hat work and clear monthly reporting on progress." },
      { q: "What is local SEO?", a: "Local SEO helps your business appear in Google Maps and 'near me' searches in your city — perfect for shops, clinics, restaurants and service businesses." },
      { q: "Do I need a new website for SEO?", a: "Not usually. We can optimize your existing website. If it has serious technical problems, we'll tell you honestly and suggest the best option." },
      { q: "Will I get reports?", a: "Yes. Every month you receive a clear report showing keyword rankings, traffic, leads and the work completed." },
    ],
    related: ["content-writing", "google-ads", "website-development"],
  },

  /* ------------------------------------------------ 8 */
  {
    slug: "google-ads",
    name: "Google Ads (PPC)",
    group: "Marketing",
    icon: icons.ads, c1: "#ef4444", c2: "#fca5a5",
    short: "Targeted pay‑per‑click campaigns that bring instant leads with maximum ROI.",
    bullets: ["Search & Display Ads", "YouTube Ads", "Conversion Tracking"],
    metaTitle: "Google Ads Management (PPC) — More Leads, Lower Cost | Webify",
    metaDesc: "Google Ads management that gets instant leads at a lower cost. Search, Display, YouTube and Shopping campaigns with conversion tracking and transparent reporting.",
    heroA: "Show up at the top of Google", heroB: "starting today.",
    heroText: "Google Ads puts your business in front of people the moment they search for what you sell. We build and optimize campaigns that bring qualified leads without wasting your budget.",
    introTitle: "Every rupee should work for you",
    intro: [
      "Google Ads can be the fastest way to get leads — or the fastest way to burn money. The difference is in the setup: the right keywords, compelling ads, strong landing pages and accurate conversion tracking.",
      "Our PPC specialists build campaigns from the ground up, cut wasted spend with negative keywords and smart bidding, and optimize weekly so your cost per lead keeps going down.",
    ],
    features: [
      { t: "Search Ads", d: "Appear at the top of Google for high‑intent keywords when customers are ready to buy." },
      { t: "Display Ads", d: "Eye‑catching banner ads across millions of websites to build awareness." },
      { t: "YouTube Ads", d: "Video ads that reach your audience on the world's second‑largest search engine." },
      { t: "Shopping Ads", d: "Product listings with images and prices for e‑commerce stores." },
      { t: "Remarketing", d: "Bring back visitors who left your website without buying or contacting you." },
      { t: "Conversion Tracking", d: "Track calls, forms, WhatsApp clicks and sales so you know exactly what works." },
    ],
    included: ["Account setup or audit", "Keyword & competitor research", "Ad copywriting", "Negative keyword management", "Conversion tracking setup", "Landing page recommendations", "Weekly optimization", "Monthly ROI report"],
    process: [
      { t: "Research", d: "We study your market, keywords, competitors and cost per click." },
      { t: "Campaign Build", d: "We structure campaigns, write ads and set up conversion tracking." },
      { t: "Launch", d: "Campaigns go live with careful budgets and bidding strategies." },
      { t: "Optimize", d: "We refine weekly — cutting waste and scaling what converts." },
    ],
    packages: [
      { name: "Launch", desc: "Get started with ads", items: ["1 search campaign", "Up to 2 ad groups", "Conversion tracking", "Monthly report"] },
      { name: "Growth", desc: "Scale your leads", featured: true, items: ["Search + Display", "Remarketing campaigns", "A/B ad testing", "Weekly optimization", "Bi‑weekly reports"] },
      { name: "Performance", desc: "Full‑funnel PPC", items: ["Search, Display, YouTube, Shopping", "Advanced audiences", "Landing page CRO", "Dedicated PPC manager"] },
    ],
    tools: ["Google Ads", "Google Tag Manager", "Google Analytics 4", "Keyword Planner", "Looker Studio", "Merchant Center"],
    faqs: [
      { q: "How much should I spend on Google Ads?", a: "It depends on your industry and goals. We'll recommend a starting budget after researching your keywords' costs — many small businesses start with a modest daily budget and scale up as results come in." },
      { q: "Is the ad spend included in your fee?", a: "No. Ad spend is paid directly to Google from your own account. Our fee covers setup, management and optimization." },
      { q: "How quickly will I get leads?", a: "Google Ads can start bringing clicks and enquiries within the first few days of launch. Performance improves further as we optimize with real data." },
      { q: "Do I own the Google Ads account?", a: "Yes, always. The account is in your name and you have full access at all times." },
      { q: "Can you fix my existing campaigns?", a: "Yes. We start with a free audit of your account and show you exactly where budget is being wasted." },
    ],
    related: ["seo-marketing", "social-media-marketing", "website-design"],
  },

  /* ------------------------------------------------ 9 */
  {
    slug: "content-writing",
    name: "Content Writing",
    group: "Marketing",
    icon: icons.write, c1: "#0ea5e9", c2: "#7dd3fc",
    short: "SEO‑friendly website copy, blogs and captions that speak to your audience.",
    bullets: ["Website Copy", "Blog Articles", "Ad & Social Copy"],
    metaTitle: "Content Writing & Copywriting Services — SEO Blogs, Web Copy | Webify",
    metaDesc: "Professional content writing: website copy, SEO blog posts, product descriptions, ad copy and social media captions that rank on Google and convert readers.",
    heroA: "Words that rank, engage", heroB: "and sell.",
    heroText: "Great design gets attention — great words get action. Our writers create clear, persuasive and SEO‑friendly content that speaks directly to your customers.",
    introTitle: "Content is how customers get to know you",
    intro: [
      "Your website copy, blogs and captions are often the only 'conversation' a customer has with your business before deciding to buy. Generic, copy‑pasted or AI‑sounding content loses trust instantly.",
      "Our writers research your industry and audience, then write original content in your brand voice — optimized for Google and written to persuade real humans.",
    ],
    features: [
      { t: "Website Copywriting", d: "Homepage, about, services and landing page copy that converts visitors." },
      { t: "SEO Blog Posts", d: "Well‑researched articles that rank on Google and build authority." },
      { t: "Product Descriptions", d: "Persuasive descriptions that help e‑commerce products sell." },
      { t: "Ad Copywriting", d: "Scroll‑stopping headlines and copy for Google, Facebook and TikTok ads." },
      { t: "Social Media Captions", d: "Engaging captions with the right hooks, hashtags and calls‑to‑action." },
      { t: "Company Profiles", d: "Professional company profiles, brochures and pitch documents." },
    ],
    included: ["Topic & keyword research", "100% original content", "SEO optimization", "Brand voice matching", "Proofreading & editing", "Meta titles & descriptions", "Revisions included", "Plagiarism‑free guarantee"],
    process: [
      { t: "Brief", d: "We learn your business, audience, tone and goals." },
      { t: "Research", d: "We research keywords, competitors and what your audience wants to know." },
      { t: "Write & Edit", d: "Our writers craft, edit and optimize your content." },
      { t: "Deliver & Revise", d: "You review, we polish — ready to publish." },
    ],
    packages: [
      { name: "Website Copy", desc: "Copy for your website", items: ["Up to 5 pages", "SEO optimized", "Meta descriptions", "2 revisions"] },
      { name: "Blog Growth", desc: "Monthly content engine", featured: true, items: ["4 SEO blogs / month", "Keyword research", "Images & formatting", "Publishing on your site"] },
      { name: "Content Pro", desc: "All your content needs", items: ["8 blogs / month", "Website & ad copy", "Social captions", "Content strategy"] },
    ],
    tools: ["Google Docs", "Grammarly", "Surfer SEO", "SEMrush", "Hemingway", "Copyscape"],
    faqs: [
      { q: "Is your content original?", a: "Yes. Every piece is written by our team and checked for plagiarism before delivery." },
      { q: "Can you write in my brand's tone?", a: "Absolutely. We study your existing content and brand to match your voice — whether formal, friendly or bold." },
      { q: "Do you write in Urdu as well?", a: "Yes, we can write content in English and Urdu (including Roman Urdu for social media)." },
      { q: "Will the content be SEO‑optimized?", a: "Yes. We research keywords and structure every piece with proper headings, meta descriptions and internal linking." },
      { q: "Can you publish the blogs on my website?", a: "Yes, we can format and publish directly to WordPress or most other platforms." },
    ],
    related: ["seo-marketing", "ebook-design", "email-marketing"],
  },

  /* ------------------------------------------------ 10 */
  {
    slug: "branding-graphics",
    name: "Branding & Graphics",
    group: "Design",
    icon: icons.brand, c1: "#d946ef", c2: "#f0abfc",
    short: "Complete brand identity — flyers, banners, packaging, brochures and more.",
    bullets: ["Brand Identity Kits", "Flyers & Brochures", "Banners & Packaging"],
    metaTitle: "Branding & Graphic Design Services — Brand Identity, Flyers, Packaging | Webify",
    metaDesc: "Complete branding and graphic design: brand identity, brand guidelines, flyers, brochures, banners, packaging, menus and more. Look consistent and premium everywhere.",
    heroA: "A brand that looks", heroB: "premium everywhere.",
    heroText: "From brand identity to flyers, packaging and signboards — we create a consistent, professional look that makes your business instantly recognizable and trusted.",
    introTitle: "Consistency builds trust",
    intro: [
      "When your logo, colors, social media, packaging and printed materials all look different, customers notice. Inconsistent branding makes even good businesses look small and unreliable.",
      "We create a complete visual identity with clear guidelines, then design every asset you need — online and offline — so your brand looks polished at every touchpoint.",
    ],
    features: [
      { t: "Brand Identity", d: "Logo, color palette, typography, patterns and imagery style — your complete visual DNA." },
      { t: "Brand Guidelines", d: "A brand book that keeps everything consistent for your team and partners." },
      { t: "Flyers & Brochures", d: "Persuasive marketing materials for print and digital distribution." },
      { t: "Packaging & Labels", d: "Product packaging that stands out on shelves and in unboxing videos." },
      { t: "Banners & Signage", d: "Shop signboards, standees, roll‑ups and event banners." },
      { t: "Menus & Stationery", d: "Restaurant menus, letterheads, envelopes, invoices and more." },
    ],
    included: ["Brand strategy session", "Logo & visual identity", "Color & typography system", "Brand guidelines PDF", "Social media templates", "Print‑ready files", "Editable source files", "Revisions until approved"],
    process: [
      { t: "Brand Discovery", d: "We explore your values, audience and personality." },
      { t: "Visual Direction", d: "We present mood boards and identity concepts." },
      { t: "Design System", d: "We build your full identity and design your assets." },
      { t: "Brand Kit Delivery", d: "You receive guidelines and every file you need." },
    ],
    packages: [
      { name: "Marketing Pack", desc: "Essential print designs", items: ["Flyer design", "Brochure (bi/tri‑fold)", "Roll‑up banner", "Print‑ready files"] },
      { name: "Brand Identity", desc: "Complete brand look", featured: true, items: ["Logo + identity system", "Brand guidelines", "Stationery set", "Social media templates"] },
      { name: "Full Branding", desc: "Launch a brand from scratch", items: ["Everything in Brand Identity", "Packaging design", "Signage design", "Marketing collateral"] },
    ],
    tools: ["Illustrator", "Photoshop", "InDesign", "Figma", "Dimension (3D mockups)"],
    faqs: [
      { q: "What is included in brand identity?", a: "Logo variations, color palette, typography, graphic elements, imagery style and a brand guidelines document explaining how to use them." },
      { q: "Can you design packaging for my product?", a: "Yes. We design boxes, labels, pouches and bags, and deliver print‑ready dielines for your manufacturer." },
      { q: "Do you design restaurant menus?", a: "Yes — dine‑in menus, takeaway menus, digital QR menus and menu boards." },
      { q: "Will I get editable files?", a: "Yes, you'll receive editable source files plus print‑ready and web‑ready versions." },
      { q: "Can you work with my existing logo?", a: "Of course. We can build a full identity system around your current logo or refresh it if needed." },
    ],
    related: ["logo-design", "business-card-design", "social-media-marketing"],
  },

  /* ------------------------------------------------ 11 */
  {
    slug: "video-editing",
    name: "Video Editing",
    group: "Marketing",
    icon: icons.video, c1: "#f97316", c2: "#fdba74",
    short: "Scroll‑stopping reels, promo videos and motion graphics for your brand.",
    bullets: ["Reels & Shorts", "Promo Videos", "Motion Graphics"],
    metaTitle: "Video Editing Services — Reels, Promo Videos & Motion Graphics | Webify",
    metaDesc: "Professional video editing for reels, TikToks, YouTube, promo videos, ads and motion graphics. Captions, music, transitions and fast turnaround.",
    heroA: "Videos that stop", heroB: "the scroll.",
    heroText: "Video is the most engaging content online. We edit reels, TikToks, ads and promo videos that grab attention in the first second and keep people watching.",
    introTitle: "Video is no longer optional",
    intro: [
      "Short‑form video drives the most reach on Instagram, TikTok, Facebook and YouTube. Brands that post consistent, high‑quality video grow faster — and sell more.",
      "Send us your raw clips (even from your phone) and we'll turn them into polished, on‑brand videos with hooks, captions, music, transitions and motion graphics.",
    ],
    features: [
      { t: "Reels & TikToks", d: "Trend‑aware short videos with strong hooks and captions." },
      { t: "YouTube Editing", d: "Long‑form edits with cuts, B‑roll, thumbnails and chapters." },
      { t: "Promo & Ad Videos", d: "Conversion‑focused video ads for Meta, TikTok and YouTube." },
      { t: "Motion Graphics", d: "Animated logos, text animations and explainer graphics." },
      { t: "Product Videos", d: "Showcase your products with clean, attractive edits." },
      { t: "Subtitles & Captions", d: "Accurate, styled captions — most people watch on mute." },
    ],
    included: ["Professional cuts & pacing", "Animated captions", "Royalty‑free music", "Color correction", "Logo & brand elements", "Platform‑specific sizes", "Thumbnail design (YouTube)", "Revisions included"],
    process: [
      { t: "Share Footage", d: "Upload your raw clips and tell us the goal and style." },
      { t: "First Edit", d: "We create the first cut with music, captions and effects." },
      { t: "Revisions", d: "You give feedback and we fine‑tune every detail." },
      { t: "Final Export", d: "Delivered in perfect formats for each platform." },
    ],
    packages: [
      { name: "Reels Pack", desc: "Short‑form starter", items: ["4 reels / TikToks", "Captions & music", "Up to 60 sec each", "2 revisions each"] },
      { name: "Content Creator", desc: "Consistent video content", featured: true, items: ["12 reels / month", "1 YouTube video", "Thumbnails", "Motion graphics"] },
      { name: "Brand Promo", desc: "High‑impact brand video", items: ["Promo / ad video", "Script support", "Motion graphics", "All platform sizes"] },
    ],
    tools: ["Premiere Pro", "After Effects", "CapCut", "DaVinci Resolve", "Final Cut Pro"],
    faqs: [
      { q: "Can I send videos recorded on my phone?", a: "Yes! Most of our clients shoot on their phones. We'll make them look professional." },
      { q: "How fast is delivery?", a: "Reels are usually delivered within 24–48 hours. Longer videos take 3–5 working days." },
      { q: "Do you provide music?", a: "Yes, we use royalty‑free music so your videos are safe from copyright claims." },
      { q: "Can you write video scripts too?", a: "Yes, we can write hooks and scripts for reels, ads and promo videos." },
      { q: "Which formats do you deliver?", a: "Vertical 9:16 for reels/TikTok/shorts, square 1:1 and horizontal 16:9 for YouTube and websites." },
    ],
    related: ["social-media-marketing", "google-ads", "branding-graphics"],
  },

  /* ------------------------------------------------ 12 */
  {
    slug: "email-marketing",
    name: "Email Marketing",
    group: "Marketing",
    icon: icons.email, c1: "#6366f1", c2: "#a5b4fc",
    short: "Newsletters and automated email campaigns that nurture leads into sales.",
    bullets: ["Newsletter Design", "Automation Flows", "Campaign Reports"],
    metaTitle: "Email Marketing Services — Newsletters & Automation | Webify",
    metaDesc: "Email marketing that turns subscribers into customers: newsletter design, automated welcome & abandoned cart flows, list growth and campaign reporting.",
    heroA: "Your inbox, your", heroB: "best sales channel.",
    heroText: "Email gives you a direct line to customers who already know you. We design beautiful newsletters and automated flows that nurture leads and drive repeat sales.",
    introTitle: "You own your email list",
    intro: [
      "Social media algorithms change constantly — but your email list is yours. Email remains one of the highest‑ROI marketing channels, especially for repeat customers and e‑commerce.",
      "We set up your email platform, grow your list, design branded templates and build automations that work around the clock: welcome series, abandoned cart reminders, offers and more.",
    ],
    features: [
      { t: "Newsletter Campaigns", d: "Branded newsletters for offers, launches and updates." },
      { t: "Welcome Series", d: "Automated emails that introduce new subscribers to your brand." },
      { t: "Abandoned Cart Flows", d: "Recover lost sales with timely, persuasive reminders." },
      { t: "List Growth", d: "Pop‑ups, lead magnets and forms that grow your subscriber list." },
      { t: "Template Design", d: "Mobile‑friendly email templates that match your brand." },
      { t: "Analytics & A/B Testing", d: "We test subject lines and content to improve open and click rates." },
    ],
    included: ["Platform setup & integration", "Branded email templates", "Copywriting", "Automation flows", "List segmentation", "Signup forms & pop‑ups", "A/B testing", "Monthly performance report"],
    process: [
      { t: "Setup", d: "We set up or audit your email platform and connect it to your website." },
      { t: "Strategy", d: "We plan campaigns, automations and segments for your audience." },
      { t: "Design & Write", d: "We design templates and write emails that get opened and clicked." },
      { t: "Send & Optimize", d: "We send, measure and continuously improve results." },
    ],
    packages: [
      { name: "Setup", desc: "Get started right", items: ["Platform setup", "Signup form", "Welcome email", "Branded template"] },
      { name: "Automation", desc: "Sell on autopilot", featured: true, items: ["Welcome series", "Abandoned cart flow", "Post‑purchase flow", "List segmentation"] },
      { name: "Full Management", desc: "Hands‑free email marketing", items: ["4 campaigns / month", "All automations", "A/B testing", "Monthly reports"] },
    ],
    tools: ["Mailchimp", "Klaviyo", "Brevo", "MailerLite", "HubSpot", "Shopify Email"],
    faqs: [
      { q: "Which email platform should I use?", a: "It depends on your business. Mailchimp and Brevo are great for most businesses, while Klaviyo is excellent for e‑commerce. We'll recommend the best fit." },
      { q: "I don't have an email list. Can you help?", a: "Yes. We'll set up signup forms, pop‑ups and lead magnets (like a free e‑book) to start growing your list." },
      { q: "Will my emails land in spam?", a: "We follow deliverability best practices — domain authentication (SPF, DKIM, DMARC), clean lists and quality content — to keep you in the inbox." },
      { q: "How often should I send emails?", a: "Most businesses do well with 2–4 emails per month plus automated flows. We'll find the right rhythm for your audience." },
      { q: "Do you write the emails too?", a: "Yes, copywriting and design are both included." },
    ],
    related: ["ebook-design", "content-writing", "social-media-marketing"],
  },
];

/* ---------------------------------------------------------
   INDUSTRIES
   --------------------------------------------------------- */
const industries = [
  { n: "Restaurants & Cafés", e: "🍽️" },
  { n: "Real Estate", e: "🏠" },
  { n: "E‑commerce & Retail", e: "🛍️" },
  { n: "Healthcare & Clinics", e: "🩺" },
  { n: "Education & Coaching", e: "🎓" },
  { n: "Beauty & Salons", e: "💅" },
  { n: "Fashion & Clothing", e: "👗" },
  { n: "Construction", e: "🏗️" },
  { n: "Travel & Tourism", e: "✈️" },
  { n: "Startups & Tech", e: "🚀" },
  { n: "Fitness & Gyms", e: "🏋️" },
  { n: "Professional Services", e: "💼" },
];

module.exports = { site, reviews, services, industries };
