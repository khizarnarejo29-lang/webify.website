/* =========================================================
   Webify — site scripts
   WhatsApp number & email are set in tools/data.js (site.whatsapp)
   and injected into every page as window.WEBIFY.
   ========================================================= */
(() => {
  const CFG = window.WEBIFY || {};
  const WHATSAPP_NUMBER = (CFG.whatsapp || "").replace(/\D/g, "");
  const CONTACT_EMAIL = CFG.email || "info@webify.website";

  /* ---------- Navbar ---------- */
  const nav = document.getElementById("nav");
  const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 20);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  const toggle = document.getElementById("navToggle");
  const links = document.getElementById("navLinks");
  const closeMenu = () => {
    toggle.classList.remove("open");
    links.classList.remove("open");
    document.body.classList.remove("menu-open");
    toggle.setAttribute("aria-expanded", "false");
  };
  toggle.addEventListener("click", () => {
    const open = !links.classList.contains("open");
    toggle.classList.toggle("open", open);
    links.classList.toggle("open", open);
    document.body.classList.toggle("menu-open", open);
    toggle.setAttribute("aria-expanded", String(open));
  });
  links.querySelectorAll("a:not(.nav__dd-btn)").forEach((a) => a.addEventListener("click", closeMenu));

  // Mobile: tapping "Services" expands the mega menu instead of navigating
  const ddBtn = document.querySelector(".nav__dd-btn");
  const dd = document.querySelector(".nav__dd");
  ddBtn.addEventListener("click", (e) => {
    if (window.matchMedia("(max-width: 960px)").matches) {
      e.preventDefault();
      dd.classList.toggle("open");
    }
  });

  /* ---------- Reveal on scroll ---------- */
  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    reveals.forEach((el, i) => {
      el.style.transitionDelay = `${(i % 4) * 70}ms`;
      io.observe(el);
    });
  } else reveals.forEach((el) => el.classList.add("in"));

  /* ---------- Portfolio filter ---------- */
  document.querySelectorAll(".filter").forEach((btn) =>
    btn.addEventListener("click", () => {
      document.querySelectorAll(".filter").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const f = btn.dataset.filter;
      document.querySelectorAll(".work__item").forEach((item) =>
        item.classList.toggle("hide", f !== "all" && item.dataset.cat !== f)
      );
    })
  );

  /* ---------- WhatsApp / email links ---------- */
  const waLink = (text) =>
    WHATSAPP_NUMBER
      ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`
      : `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Project Inquiry — Webify")}&body=${encodeURIComponent(text)}`;

  const pageName = document.title.split("|")[0].split("—")[0].trim();
  document.querySelectorAll(".js-whatsapp").forEach((a) => {
    a.href = waLink(`Hi Webify! I'm interested in your services. (Page: ${pageName})`);
    a.target = "_blank";
    a.rel = "noopener";
  });
  if (!WHATSAPP_NUMBER) document.body.classList.add("no-wa");

  /* ---------- Package buttons pre-fill the form ---------- */
  const addOption = (select, value) => {
    if (![...select.options].some((o) => o.value === value)) select.add(new Option(value, value), 0);
    select.value = value;
  };
  document.querySelectorAll("[data-pick]").forEach((btn) =>
    btn.addEventListener("click", () => {
      const sel = document.querySelector("#quote .js-service");
      if (sel) addOption(sel, `${btn.dataset.pick} Package`);
    })
  );

  // Contact page: ?service=... preselects
  const qs = new URLSearchParams(location.search).get("service");
  if (qs) document.querySelectorAll(".js-service").forEach((s) => addOption(s, qs));

  /* ---------- Lead forms ---------- */
  document.querySelectorAll(".js-lead-form").forEach((form) => {
    const note = form.querySelector(".form__note");
    const isAudit = form.dataset.kind === "audit";

    const build = () => {
      const d = new FormData(form);
      const lines = [
        isAudit ? "Hi Webify! I'd like a FREE AUDIT." : "Hi Webify!",
        "",
        `Name: ${d.get("name")}`,
        `Email: ${d.get("email")}`,
        `Phone: ${d.get("phone") || "-"}`,
      ];
      if (d.get("website") !== null) lines.push(`Website: ${d.get("website") || "-"}`);
      if (d.get("social") !== null) lines.push(`Social: ${d.get("social") || "-"}`);
      lines.push(`${isAudit ? "Goal" : "Service"}: ${d.get("service")}`);
      if (!isAudit) lines.push("", d.get("message"));
      return { text: lines.join("\n"), d };
    };

    const valid = () => {
      if (form.checkValidity()) return true;
      form.reportValidity();
      return false;
    };

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!valid()) return;
      const { text, d } = build();
      const subject = isAudit ? `Free Audit Request — ${d.get("name")}` : `New Inquiry: ${d.get("service")} — ${d.get("name")}`;
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`;
      note.textContent = "Thank you! Your email app is opening — just press send.";
    });

    form.querySelector(".js-wa-submit")?.addEventListener("click", () => {
      if (!valid()) return;
      window.open(waLink(build().text), "_blank", "noopener");
      note.textContent = "Thank you! We'll get back to you shortly.";
    });
  });
})();
