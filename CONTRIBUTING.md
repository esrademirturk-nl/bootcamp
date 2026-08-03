# Katkı Rehberi

## Branch İsimlendirme

```
r1/kisa-aciklama     → R1 (Platform & Design System)
r2/kisa-aciklama     → R2 (Marketing Pages)
r3/kisa-aciklama     → R3 (Product Pages)
```

Örnek: `r1/design-tokens`, `r2/landing-page`, `r3/bootcamp-detay`

`main` branch korumalıdır — doğrudan push yapılamaz, her değişiklik PR ile gelir.

## Commit Mesajları (Conventional Commits)

```
feat: yeni özellik
fix: hata düzeltmesi
chore: kurulum/config/bağımlılık işleri
docs: dokümantasyon
style: sadece format/stil değişikliği (davranış değişmez)
refactor: davranışı değiştirmeyen kod düzenlemesi
```

Örnek: `feat: bootcamp filtreleme eklendi`, `fix: dark mode geçişindeki flicker giderildi`

## PR Süreci

1. `main`'den yeni branch aç (yukarıdaki isimlendirmeyle)
2. Değişikliği yap, commit'le
3. Push et, PR aç — şablon otomatik gelir, doldur
4. CI'nin (lint/typecheck/build) yeşil olduğundan emin ol
5. En az 1 takım arkadaşından onay al
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
