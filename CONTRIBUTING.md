# Katkı Rehberi

## Branch İsimlendirme

```
feature/A-01-kisa-aciklama    → EPIC A kartları (R1 — Kurulum & Tasarım Sistemi)
feature/B-01-kisa-aciklama    → EPIC B kartları (R1 — i18n & Tema)
feature/C-01-kisa-aciklama    → EPIC C kartları (R2 — Landing)
feature/D-01-kisa-aciklama    → EPIC D kartları (R3 — Bootcamps)
feature/E-01-kisa-aciklama    → EPIC E kartları (R2 + R3 — Diğer Sayfalar)
feature/F-01-kisa-aciklama    → EPIC F kartları (Tüm takım — Etkileşim & Cila)
feature/G-01-kisa-aciklama    → EPIC G kartları (Tüm takım — Kalite & Teslim)
```

Örnek: `feature/A-02-design-tokens`, `feature/C-01-hero-section`, `feature/D-03-bootcamp-detay`

`main` branch korumalıdır — doğrudan push yapılamaz, her değişiklik PR ile gelir.

## Commit Mesajları (Conventional Commits)

```
feat(scope): yeni özellik
fix(scope): hata düzeltmesi
chore(scope): kurulum/config/bağımlılık işleri
docs(scope): dokümantasyon
style(scope): sadece format/stil değişikliği (davranış değişmez)
refactor(scope): davranışı değiştirmeyen kod düzenlemesi
```

scope = değişikliğin ait olduğu alan (`bootcamps`, `header`, `tokens`, `auth`, `landing` gibi)

Örnek: `feat(bootcamps): add level filter to listing page`, `fix(header): prevent mobile menu scroll lock on iOS`, `style(tokens): adjust dark mode surface color`

## PR Süreci

1. `main`'den yeni branch aç (yukarıdaki isimlendirmeyle, kart koduna göre)
2. Değişikliği yap, commit'le
3. Push et, PR aç — şablon otomatik gelir, doldur (ne yapıldı, hangi issue'yu kapatıyor, ekran görüntüsü/GIF)
4. CI'nin (lint/typecheck/build) yeşil olduğundan emin ol
5. En az 1 takım arkadaşından onay al — kendi PR'ını onaylayamazsın
6. Merge et (squash merge önerilir — temiz bir main geçmişi için)

## Commit Öncesi Otomatik Kontrol

Husky + lint-staged her commit'te değişen dosyaları otomatik lint'ler ve formatlar. Elle çalıştırmak istersen:

```bash
npm run lint
npm run format
npm run typecheck
```

## 2 Saat Kuralı

Bir görevde 2 saatten fazla takılı kalırsan (bug, karar, tasarım problemi fark etmez) — takıma söyle, tek başına debug etmeye devam etme. Zaman kısıtlı bir proje, erken yardım istemek zayıflık değil.
