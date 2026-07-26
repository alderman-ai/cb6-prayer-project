# cb6.cz — Website Technology

Probed 2026-07-26 via curl headers, HTML source, DNS, and RDAP. No browser used.

## Verdict
Custom-built **Next.js 15.5.4 (Pages Router) + Tailwind CSS** frontend, fed by a self-hosted **Directus** headless CMS, running on a **vpsFree.cz VPS in Prague** behind Apache. Not WordPress, not a site builder, not a static site.

**Implication for the landing page:** it is a bespoke React/TypeScript app on a self-managed VPS — a new page cannot be "pasted in" by a non-developer. Plain paste-ready HTML (Q4 default) remains the right call; it can be dropped into `public/` on the VPS, served as a standalone page, or hosted anywhere else. If their developer wants it in-app, the HTML converts to a Next.js page component with minimal effort.

## Evidence

**Frontend / framework**
- Response header `X-Powered-By: Next.js`
- Asset paths under `/_next/static/chunks/…`, `/_next/image?url=…`, build ID `mz3x5D2keuQW6rG9TY3nk`
- `pages/_app`, `pages/index`, `pages/_error` chunks → **Pages Router**, not App Router
- Version string `15.5.4` in `main-*.js`
- `__NEXT_DATA__` JSON payload present with live CMS records (`featuredEvents`, etc.)
- Rendered server-side per request (`Cache-Control: private, no-cache, no-store` and 500 error pages rendered by Next), so `getServerSideProps` rather than static export
- Templating language: **React / JSX (TypeScript likely)**
- Styling: **Tailwind CSS** — utility classes throughout (`flex max-w-7xl mx-auto`, `bg-stone-300`, `text-slate-200`)
- Fonts: Google Fonts, Raleway
- Analytics: legacy Google Analytics Universal tag `UA-28717644-1` (deprecated property — GA4 apparently not migrated)

**CMS**
- `content.cb6.cz` returns `X-Powered-By: Directus`; `/server/info` reports project name **"CB6 CMS"**
- Images served as `content.cb6.cz/assets/<uuid>?key=preview|large-avatar` (Directus asset presets)
- Self-hosted on the same server/IP as the website

**Hosting**
- Both `www.cb6.cz` and `content.cb6.cz` → `37.205.15.27` / `2a03:3b40:fe:455::1`
- RDAP: `VPSFREE-PRG6` and `VPSFREE-IPV6-PRG2`, CZ — **vpsFree.cz**, a Czech non-profit VPS/container association (community-run, self-administered; not a managed host)
- `Server: Apache/2.4.67 (Debian)` — Apache reverse-proxying the Node process
- No CDN in front (no Cloudflare/Vercel/Fastly headers); `Access-Control-Allow-Origin: *` set at the server
- DNS nameservers: `ns.web4u.cz`, `ns2.web4u.cz` → domain/DNS managed via **Web4U** (Czech registrar/host)
- Email: Google Workspace (`aspmx.l.google.com` MX; SPF includes googlemail)

**Payments already on-site**
- Czech QR payment images generated via `api.paylibo.com` for two accounts: `1031051032/5500` (VS 5061999, "Na modlitebnu" — for the sanctuary) and `1032886672/5500` (VS 1991999, "Na provoz" — operations). Bank code 5500 = Raiffeisenbank. Useful for the CZ version and for any USD/CZK donation routing decisions.

## Caveats
- `robots.txt` and `sitemap.xml` both return Next.js 500 error pages — no sitemap/robots served. Minor SEO gap, not a blocker.
- Whether their developer is available/responsive is unknown; the stack implies a technical volunteer or agency maintains it.
