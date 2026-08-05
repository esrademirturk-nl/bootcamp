import 'server-only';
import type { I18nConfig } from 'next-i18next/proxy';
import baseI18nConfig from './i18n.config';
import trCommon from './public/locales/tr/common.json';
import enCommon from './public/locales/en/common.json';
import nlCommon from './public/locales/nl/common.json';

// Bu dosya SADECE sunucu tarafında (layout.tsx'in initServerI18next çağrısında)
// import edilmeli. 'server-only' paketi, bu dosya yanlışlıkla bir Client
// Component'ten import edilirse build zamanında hata fırlatarak bunu
// garanti altına alır.
//
// NOT: İlk denemede resourceLoader'ı dinamik import (`import(\`./locales/${lang}/${ns}.json\`)`)
// ile yazmıştık — next-i18next'in resmi App Router örneğindeki gibi. Ancak
// Turbopack, iki değişken (dil + namespace) içeren bu tarz "context" dinamik
// import'ları güvenilir şekilde çözemiyor (üç farklı dosya konumunda denendi,
// hepsinde "module not found" hatası verdi). Bunun yerine tüm çeviri
// dosyalarını derleme zamanında STATİK olarak import edip bir obje içinde
// tutuyoruz — bu, Turbopack için tamamen sorunsuz, standart bir pattern.

const resources: Record<string, Record<string, unknown>> = {
  tr: { common: trCommon },
  en: { common: enCommon },
  nl: { common: nlCommon },
};

function resourceLoader(language: string, namespace: string) {
  return Promise.resolve(resources[language]?.[namespace] ?? {});
}

const i18nConfigServer: I18nConfig = {
  ...baseI18nConfig,
  // Vercel gibi serverless ortamlarda public/locales dosya sisteminden
  // güvenilir okunamıyor — production'da çevirileri build zamanında
  // koda gömüyoruz (statik import). Development'ta public/locales
  // üzerinden okunmaya devam ediyor, böylece i18n.reloadResources() ile
  // sunucuyu yeniden başlatmadan JSON değişikliklerini görebiliyoruz.
  ...(process.env.NODE_ENV === 'production' ? { resourceLoader } : {}),
};

export default i18nConfigServer;
