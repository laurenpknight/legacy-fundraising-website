# Legacy Fundraising — legacyfundraising.org

Static HTML/CSS/JS marketing site. No build step.

**Status: live.** `legacyfundraising.org` is public, DNS is on Netlify, HTTPS is issued, and the Fundraising Forecast form is wired to a real Formspree endpoint.

## How this site gets updated

This repo (`github.com/laurenpknight/legacy-fundraising-website`) is connected to Netlify for continuous deployment: a push to `main` auto-deploys to legacyfundraising.org within a minute or two, no manual upload needed.

To make a change: ask Claude Code (in this project folder) to edit the files, confirm it locally, then have it commit and push. That's the whole loop.

## Preview locally

```bash
cd legacy-fundraising-website
python3 -m http.server 8000
```

Then open `http://localhost:8000`. (Double-clicking `index.html` also works since there's no build step — a local server just avoids relative-path quirks.)

## Pages

`index.html` (home) · `how-it-works.html` · `why-legacy.html` · `gold-cards.html` · `for-programs.html` · `for-businesses.html` · `about.html` · `forecast.html` · `faq.html`

Shared styles live in `css/styles.css`; shared behavior (mobile nav, the homepage profit slider, FAQ accordion, and the forecast form) lives in `js/main.js`.

## Known remaining placeholder

- **Homepage hero photo** — still a CSS diagonal-stripe pattern standing in for a real photo. Search `index.html` for the `REPLACE: full-bleed hero photo` comment; the real image would go in as a `background-image` on `.hero` in `css/styles.css`.

Everything else (logo, Gold Card fan image, forecast form endpoint, domain, HTTPS) is done.

## Notes on content decisions

- The homepage intentionally does **not** state a specific program revenue-share percentage anywhere (hero, steps, or FAQ) — the split varies by team size and program type. The FAQ's "How is program revenue split?" entry stays intentionally general and points people to their forecast for specifics.
- Profit-per-participant is **$275–$575** everywhere on the site (hero stat, homepage slider, FAQ) — a deliberately wide range, not an average, since it depends on team size, team type, participation minimums, pricing, offer structure and campaign performance. To change this range later, edit `PROFIT_PER_PARTICIPANT_LOW`/`_HIGH` at the top of `initProfitSlider()` in `js/main.js`, plus the matching numbers in `index.html`'s hero stat bar and `faq.html`'s "How much can our program raise?" answer.
- No competitor names appear anywhere on the site.
- No phone number appears on the site. Every footer links only to **contact@legacyfundraising.org**; the Fundraising Forecast form's phone field is the way leads give you theirs.
