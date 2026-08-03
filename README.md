# Bootcamp Sitesi

Referans: global-it.team-vit-devops.nl/en (içerik/bilgi mimarisi baz alınır, görsel dil ve komponent yapısı özgündür — piksel klon değildir).

## Stack
- **Framework:** Next.js (App Router) + TypeScript
- **Styling:** Tailwind CSS
- **Paket yöneticisi:** npm
- **i18n:** _(karar bekleniyor — next-intl / next-i18next)_
- **Animasyon:** _(karar bekleniyor — Framer Motion / CSS View Transitions)_
- **Komponent kütüphanesi:** _(kullanılırsa buraya gerekçesiyle yazılacak)_

## Klasör Yapısı
```
src/
  app/          → sayfalar ve route'lar (App Router)
  components/   → paylaşılan UI komponentleri (Button, Card, Input, vb.)
  types/        → TypeScript tip tanımları (Bootcamp, Category, Instructor, vb.)
  data/         → mock veri (gerçekçi, lorem ipsum yok)
  lib/          → yardımcı fonksiyonlar, utils
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

## Mock Data Hacmi
12 bootcamp, 8 kategori, 6 eğitmen, 15 kohort, 8 yorum, 3 plan.

## Kapsam Dışı (Won't)
Gerçek backend, ödeme, video, admin panel.
