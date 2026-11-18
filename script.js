/* =========================================================
   Webify — site scripts
   ⚙️  APNA WHATSAPP NUMBER YAHAN LIKHEIN (country code ke sath, bina + ke)
   Example: "923001234567"
   ========================================================= */
const WHATSAPP_NUMBER = ""; // e.g. "923001234567"
const CONTACT_EMAIL = "info@webify.website";

// Year
document.getElementById("year").textContent = new Date().getFullYear();

// Navbar scroll state
const nav = document.getElementById("nav");
const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 20);
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

// Mobile menu
const toggle = document.getElementById("navToggle");
const links = document.getElementById("navLinks");
toggle.addEventListener("click", () => {
  toggle.classList.toggle("open");
  links.classList.toggle("open");
});
links.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    toggle.classList.remove("open");
    links.classList.remove("open");
  })
);

// Reveal on scroll
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        io.unobserve(e.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
);
document.querySelectorAll(".reveal").forEach((el, i) => {
  el.style.transitionDelay = `${(i % 4) * 70}ms`;
  io.observe(el);
});

// Portfolio filter
document.querySelectorAll(".filter").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filter").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    const f = btn.dataset.filter;
    document.querySelectorAll(".work__item").forEach((item) => {
      item.classList.toggle("hide", f !== "all" && item.dataset.cat !== f);
    });
  });
});

// Package buttons pre-select service in form
const serviceSelect = document.getElementById("serviceSelect");
document.querySelectorAll("[data-plan]").forEach((btn) =>
  btn.addEventListener("click", () => {
    serviceSelect.value = `${btn.dataset.plan} Package`;
  })
);

// WhatsApp links
const waLink = (text) =>
  WHATSAPP_NUMBER
    ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`
    : `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Project Inquiry — Webify")}&body=${encodeURIComponent(text)}`;

document.querySelectorAll(".js-whatsapp").forEach((a) => {
  a.href = waLink("Hi Webify! I'm interested in your services.");
  a.target = "_blank";
  a.rel = "noopener";
});
if (!WHATSAPP_NUMBER) document.querySelector(".wa-float").style.display = "none";

// Contact form
const form = document.getElementById("contactForm");
const note = document.getElementById("formNote");
const buildMessage = () => {
  const d = new FormData(form);
  return `Hi Webify!\n\nName: ${d.get("name")}\nEmail: ${d.get("email")}\nPhone: ${d.get("phone") || "-"}\nService: ${d.get("service")}\n\n${d.get("message")}`;
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const d = new FormData(form);
  window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
    `New Inquiry: ${d.get("service")} — ${d.get("name")}`
  )}&body=${encodeURIComponent(buildMessage())}`;
  note.textContent = "Thank you! Your email app is opening — just hit send.";
});

document.querySelector(".js-wa-submit").addEventListener("click", () => {
  if (!form.reportValidity()) return;
  window.open(waLink(buildMessage()), "_blank", "noopener");
  note.textContent = "Thank you! We'll get back to you shortly.";
});
