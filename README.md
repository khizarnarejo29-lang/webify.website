# Webify — webify.website

Static multi-page website (no framework). Hosted on Hostinger.

## Edit content
All text (services, FAQs, packages, WhatsApp number, email, socials, reviews) lives in `tools/data.js`.

```bash
node tools/build.js
```

This regenerates every page. Then upload all files **except the `tools/` folder** to Hostinger `public_html`
(or connect this repo in hPanel → Websites → Advanced → Git).
