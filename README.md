# Aldrin Abir — Creative Portfolio & Showreel

> High-performance, production-grade creative portfolio for **Aldrin Abir** (Creative Video Editor & Content Designer). Built with vanilla HTML5, modern CSS3 design tokens, and lightweight ES6 JavaScript.

---

## ⚡ Performance & Production Highlights
- **FastStart Web Video Streaming**: All 1080p video banners and workflow showcases are encoded with `-movflags +faststart` for zero-delay instant playback.
- **Ultra-Lean Asset Footprint**: Optimized from over 115MB down to **~30MB total**, leveraging modern `.webp` mockups and H.264 web rate-controlled video streams.
- **Interactive Contact & Booking Drawer**: Slide-in glassmorphic inquiry form with service selectors, budget ranges, copy-to-clipboard email feedback, and direct email delivery.
- **Full SEO & Social Graph (OpenGraph)**: Complete meta tags, Schema.org `Person` structured data, and high-resolution 1200x630 social preview card for WhatsApp, LinkedIn, Discord, and X/Twitter.
- **Digital Rights & Media Protection**: Anti-scraping controls blocking right-click context menus, image drag-and-drop, and native video downloading.
- **WCAG AAA Accessibility & Spatial Rhythm**: Accessible semantic landmarks, fluid clamp typography, 8pt spatial rhythm system, and keyboard navigation support.

---

## 🚀 How to Host & Deploy (Step-by-Step)

### Option 1: Cloudflare Pages (Recommended ★★★★★)
*Cloudflare Pages is the gold standard for video portfolios because it includes **unlimited free bandwidth**, global Anycast edge caching (330+ locations), automated HTTP/3, and free SSL.*

1. **Push your code to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "feat: initial production build of Aldrin Abir portfolio"
   git remote add origin https://github.com/<YOUR_USERNAME>/aldrin-portfolio.git
   git branch -M main
   git push -u origin main
   ```

2. **Connect to Cloudflare Pages**:
   - Log in to the [Cloudflare Dashboard](https://dash.cloudflare.com/).
   - Navigate to **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
   - Select your repository (`aldrin-portfolio`).
   - Leave Build Command blank, set Output Directory to `/`, and click **Save and Deploy**.
   - Your site is immediately live at `https://aldrin-portfolio.pages.dev`!

3. **Custom Domain Setup (e.g. `aldrinabir.com`)**:
   - In Cloudflare Pages, go to **Custom domains** > **Set up a custom domain**.
   - Enter your domain (e.g., `aldrinabir.com`).
   - Cloudflare will configure DNS records and issue a free universal SSL certificate automatically.

---

### Option 2: Vercel
1. Import your GitHub repository on [Vercel](https://vercel.com/new).
2. Set Root Directory to `./` and Framework Preset to `Other`.
3. Click **Deploy**.
4. Configure your custom domain under **Settings** > **Domains**.

---

## 📬 Contact Form & Lead Inquiries
The contact drawer is pre-wired to launch pre-filled client emails to `aldrinabir@gmail.com`.

To enable zero-backend background form submissions (where clients submit without opening their email app):
1. Get a free access key from [Web3Forms](https://web3forms.com/) (takes 30 seconds).
2. In `script.js`, set `access_key` in the form POST request or form action.

---

## 📁 Project Directory Structure
```
aldrin-portfolio/
├── assets/
│   ├── hero_banner.mp4              # FastStart 1080p banner video (5.7 MB)
│   ├── ba_landscape.mp4             # FastStart Creative Process video (7.3 MB)
│   ├── footer_globe.mp4             # FastStart Earth Horizon loop (13.1 MB)
│   ├── og_preview.jpg               # High-res 1200x630 social preview card
│   ├── *.webp                       # Ultra-compressed visual mockups
│   └── archive/                     # Heavy uncompressed originals (gitignored)
├── index.html                       # Production semantic HTML with SEO/OG
├── style.css                        # 8pt spatial rhythm & glassmorphism CSS
├── script.js                        # Playback, scrubber, dock, drawer & toasts
├── favicon.svg                      # Scalable vector monogram favicon
├── favicon-32x32.png                # Fallback standard icon
├── apple-touch-icon.png             # iOS home screen bookmark icon
├── site.webmanifest                 # Mobile PWA manifest
├── _headers                         # Cloudflare caching & security headers
├── vercel.json                      # Vercel deployment config
└── README.md                        # Documentation & deployment guide
```
