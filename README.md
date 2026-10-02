# Legacy Fundraising — legacyfundraising.org

Static HTML/CSS/JS marketing site. No build step — open the files directly or serve the folder with any static host.

## Preview locally

```bash
cd legacy-fundraising-website
python3 -m http.server 8000
```

Then open `http://localhost:8000` in your browser. (Opening `index.html` directly by double-clicking also works, since there's no build step — a local server just avoids any browser quirks with relative paths.)

## Pages

`index.html` (home) · `how-it-works.html` · `why-legacy.html` · `gold-cards.html` · `for-programs.html` · `for-businesses.html` · `about.html` · `forecast.html` · `faq.html`

Shared styles live in `css/styles.css`; shared behavior (mobile nav, the homepage profit slider, FAQ accordion, and the forecast form) lives in `js/main.js`.

## Before this goes live

1. **Brand assets — partly done:**
   - Your real logo is in place at `assets/logo-horizontal.png` (pulled from your `Horizontal logo.png`) and used in every page's header and footer.
   - The header's white/reversed version on the homepage hero is that same PNG with a CSS filter (`brightness(0) invert(1)` on `.logo-img.light-logo` in `css/styles.css`) rendering it as a solid-white silhouette, since there's no dedicated reversed-color logo file yet. It looks clean, but if you ever get a proper white/gold version of the logo exported, drop it in as `assets/logo-horizontal-white.png`, point the `light-logo` `<img>` tags at it, and remove that filter rule.
   - `gold-cards.html`'s intro section now shows a real fan of 5 Gold Cards (Grandview, Heritage, Castle View, Niwot, Cherokee Trail) to the right of the intro text — a pre-rendered composite image from your Claude design project, saved as `assets/cards/gold-card-fan.jpg`. To swap in a different render (e.g. the front/back close-up or the alternate arrangement you also have), just replace that file or point the `<img>` in `gold-cards.html`'s intro section at a new filename.
   - Still placeholder: the homepage hero photo only (search `index.html` for the `REPLACE: full-bleed hero photo` comment — swap in a background-image on `.hero` in `css/styles.css`).

2. **Fundraising Forecast form — done.** It's wired to your real Formspree endpoint (`https://formspree.io/f/mgavbraw`) in both `forecast.html`'s `<form action="...">` and `FORECAST_FORM_ENDPOINT` in `js/main.js`. Submit a real test through the live form once to confirm it actually lands wherever that Formspree form is configured to deliver (check formspree.io's dashboard if you haven't pointed it at an inbox yet).

3. **Deploy to Netlify + point your GoDaddy domain at it:**
   1. Create a free account at [netlify.com](https://netlify.com).
   2. From the Netlify dashboard, drag the whole `legacy-fundraising-website` folder onto the "Sites" page's drop zone. No git, no build step — it deploys as-is and gives you a live `*.netlify.app` URL immediately. Click through it to confirm everything looks right.
   3. In that site's **Site settings → Domain management → Add a domain**, enter `legacyfundraising.org`. When Netlify asks, choose **Netlify DNS** (not "I'll use my own DNS") — this is the simplest path for a GoDaddy-registered domain, since GoDaddy can't do the DNS record type Netlify needs for the bare domain, so letting Netlify host DNS sidesteps that.
   4. Netlify shows you 4 nameserver addresses (e.g. `dns1.p0X.nsone.net`). Log into **GoDaddy → My Products → DNS** (next to legacyfundraising.org) → **Nameservers → Change** → enter those 4 → Save.
   5. Wait for DNS to propagate (usually under a few hours, can take up to 48). Netlify auto-issues a free HTTPS certificate once it sees the domain pointing at it — check **Domain management** for a green "certificate issued" status.
   6. Test from a phone on cell data (not your home wifi, which may cache old DNS) that `https://legacyfundraising.org` loads, then click through all 9 pages and submit a real test entry through the Forecast form to confirm you actually receive it.

## Notes on content decisions

- The homepage intentionally does **not** state a specific program revenue-share percentage anywhere (hero, steps, or FAQ) — per your instruction, since the actual split varies by team size and program type. The FAQ has a "How is program revenue split?" entry that stays intentionally general and points people to their forecast for specifics.
- Profit-per-participant is **$275–$575** everywhere on the site (hero stat, homepage slider, FAQ) — a deliberately wide range, not an average, since actual profit depends on team size, team type, participation minimums, pricing, offer structure and campaign performance. The hero stat and the slider's footnote both say so explicitly. To change this range later, edit `PROFIT_PER_PARTICIPANT_LOW`/`_HIGH` at the top of `initProfitSlider()` in `js/main.js`, plus the matching numbers in `index.html`'s hero stat bar and `faq.html`'s "How much can our program raise?" answer.
- No competitor names appear anywhere on the site.
- No phone number appears on the site. Every footer links only to **contact@legacyfundraising.org**; the Fundraising Forecast form's phone field is still the way for leads to give you theirs.
