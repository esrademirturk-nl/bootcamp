# Bootcamp Sitesi

Referans: global-it.team-vit-devops.nl/en (içerik/bilgi mimarisi baz alınır, görsel dil ve komponent yapısı özgündür — piksel klon değildir).

**Canlı:** [bootcamp-three-chi.vercel.app](https://bootcamp-three-chi.vercel.app/)

## Stack

- **Framework:** Next.js (App Router) + TypeScript
- **Styling:** Tailwind CSS v4
- **Paket yöneticisi:** npm
- **Font:** Geist (gövde) + Space Grotesk (başlık), ikisi de local/self-hosted
- **i18n:** next-i18next v16 (App Router desteği), `/[locale]/` route yapısı — TR (varsayılan), EN, NL
- **Animasyon:** Framer Motion (sayfa geçişleri + scroll-tetikli animasyonlar, prefers-reduced-motion destekli)
- **Komponent kütüphanesi:** Kullanılmıyor — tüm temel komponentler (Button, Card, Input vb.) design token'lar üzerinden sıfırdan yazılıyor
- **Deploy:** Vercel, main branch'e her merge'de otomatik

## Design Token'lar

Kurumsal/güven verici yön: koyu mavi (primary) + soğuk gri (neutral) + turkuaz vurgu (accent, CTA'lar için).
Tüm token'lar `src/app/[locale]/globals.css`'de tanımlı, `@theme inline` ile Tailwind'e bağlı (`bg-primary-600`, `text-neutral-800`, `bg-surface`, `rounded-lg`, `shadow-md` gibi class'larla kullanılır).

Dark mode class tabanlı (`html.dark`), localStorage'da kalıcı, ilk yüklemede sistem tercihi (`prefers-color-scheme`) okunuyor, FOUC yok (`next/script` ile `beforeInteractive` stratejisi).

- **Renkler:** `primary-50..950`, `neutral-50..950`, `accent-400/500/600`, `secondary`, semantic (`success`, `warning`, `error`, `info`)
- **Yüzeyler:** `background`, `foreground`, `text`, `muted`, `surface`, `surface-muted`, `border`
- **Radius:** `sm` (4px), `md` (8px), `lg` (14px), `xl` (20px)
- **Shadow:** `sm`, `md`, `lg` (light/dark için ayrı opaklık değerleri)

Tüm token'ları ve komponentleri görsel olarak `/styleguide` sayfasında görebilirsin.

## Klasör Yapısı

```
i18n.config.ts            → i18n ayarları (client-safe)
i18n.config.server.ts     → i18n ayarları + production resource loader (server-only)
public/locales/           → çeviri JSON'ları (tr, en, nl)
src/
  proxy.ts                → locale routing (Next.js 16 middleware konvansiyonu)
  app/
    [locale]/              → tüm sayfalar locale altında (/, /en, /nl gibi)
      layout.tsx
      globals.css
      page.tsx
      styleguide/          → design token & komponent showcase sayfası
  components/
    ui/                    → paylaşılan UI komponentleri (Button, Card, Input, Badge, vb.)
    layout/                → Header, Footer, MobileNav, LanguageSwitcher, ThemeToggle
  fonts/                   → local font dosyaları
  lib/                     → yardımcı fonksiyonlar (cn() vb.)
  types/                   → TypeScript tip tanımları (Bootcamp, Category, Instructor, vb.)
  data/                    → mock veri (gerçekçi, lorem ipsum yok)
```

## Roller

- **R1 – Platform & Design System:** kurulum, design token'lar, tema, layout, i18n altyapısı, paylaşılan komponentler, mock data şeması, deploy
- **R2 – Marketing Pages:** Landing, About, Contact
- **R3 – Product Pages:** Bootcamps (liste + filtre), Detay, Schedule, Login/Register, 404

## Geliştirme

```bash
npm install
npm run dev
```

Diller: `localhost:3000` (TR), `localhost:3000/en`, `localhost:3000/nl`

## Mock Data Hacmi

12 bootcamp, 8 kategori, 6 eğitmen, 15 kohort, 8 yorum, 3 plan.

## Kapsam Dışı (Won't)

Gerçek backend, ödeme, video, admin panel.
