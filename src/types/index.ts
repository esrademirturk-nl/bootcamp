/**
 * src/types/index.ts
 * Projedeki tüm veri yapılarının TypeScript arayüzleri ve tipleri.
 */

// Seviye seçenekleri
export type Level = 'beginner' | 'intermediate' | 'advanced';

// Eğitim formatı seçenekleri
export type Format = 'online' | 'hybrid' | 'onsite';

// Kategori verisi arayüzü
export interface Category {
  slug: string; // URL dostu benzersiz id (ör: 'frontend-development'), aynı zamanda i18n key kökü
  defaultName: string; // TR fallback kategori adı; i18n key: categories.<slug>.name
  icon: string; // İkon adı veya path
}

// Müfredat modülü arayüzü
export interface CurriculumModule {
  titleKey: string; // bootcamps.<slug>.curriculum.<titleKey> -> common.json
  defaultTitle: string; // TR fallback modül başlığı
  durationHours: number; // Modülün saat cinsinden süresi
  lessons: string[]; // Modül altındaki ders konuları (teknik terimler, çevrilmez)
}

// Çözülmüş (translate edilmiş) müfredat modülü; UI bileşenlerine bu şekilde geçilir.
export interface ResolvedCurriculumModule extends Omit<
  CurriculumModule,
  'titleKey' | 'defaultTitle'
> {
  title: string;
}

// Eğitmen verisi arayüzü
export interface Instructor {
  slug: string; // Eğitmen benzersiz id'si (i18n key: instructors.<slug>.bio)
  name: string; // Ad Soyad (özel isim, çevrilmez)
  title: string; // Unvan (ör: Senior Frontend Engineer — sektör konvansiyonu gereği çevrilmez)
  defaultBio: string; // TR fallback kısa özgeçmiş
  avatar: string; // Profil görseli URL'i
  company: string; // Çalıştığı şirket (özel isim, çevrilmez)
}

// Bootcamp ana verisi arayüzü (En önemli tip)
export interface Bootcamp {
  slug: string; // URL path'i (ör: 'react-frontend-developer'), aynı zamanda i18n key kökü
  defaultTitle: string; // TR fallback başlık; i18n key: bootcamps.<slug>.title
  categorySlug: string; // İlişkili olduğu kategorinin slug'ı
  level: Level; // Seviyesi ('beginner' | 'intermediate' | 'advanced')
  format: Format; // Formatı ('online' | 'hybrid' | 'onsite')
  durationWeeks: number; // Hafta cinsinden süre
  languages: string[]; // Eğitim dilleri (ör: ['TR', 'EN'])
  priceEUR: number; // Fiyat (Euro)
  rating: number; // Puan (0 - 5 arası float)
  studentCount: number; // Kayıtlı öğrenci sayısı
  defaultShortDescription: string; // TR fallback kısa açıklama; i18n key: bootcamps.<slug>.shortDescription
  defaultDescription: string; // TR fallback uzun açıklama; i18n key: bootcamps.<slug>.description
  heroImage: string; // Kapak görseli URL'i
  tags: string[]; // Etiketler (ör: ['React', 'Next.js'])
  curriculum: CurriculumModule[]; // Müfredat modülleri
  instructorSlug: string; // Eğitmenin slug'ı
  featured: boolean; // Öne çıkarılan ürün mü?
}

// Çözülmüş (translate edilmiş) bootcamp; UI bileşenlerine bu şekilde geçilir.
export interface ResolvedBootcamp extends Omit<
  Bootcamp,
  'defaultTitle' | 'defaultShortDescription' | 'defaultDescription' | 'curriculum'
> {
  title: string;
  shortDescription: string;
  description: string;
  curriculum: ResolvedCurriculumModule[];
}

// Kohort (dönem/sınıf) verisi arayüzü
export interface Cohort {
  id: string; // Benzersiz kohort ID
  bootcampSlug: string; // İlgili bootcamp slug'ı
  startDate: string; // Başlangıç tarihi (ISO format)
  endDate: string; // Bitiş tarihi (ISO format)
  seatsTotal: number; // Toplam kontenjan
  seatsLeft: number; // Kalan kontenjan
  format: Format; // Eğitimin formatı
  timezone: string; // Saat dilimi
}

// Öğrenci yorumu arayüzü
export interface Testimonial {
  id: string; // Benzersiz yorum ID (i18n key: testimonials.<id>.quote)
  name: string; // Yorum yapan öğrenci adı (özel isim, çevrilmez)
  role: string; // Öğrencinin şu anki unvanı (sektör konvansiyonu gereği çevrilmez)
  company: string; // Çalıştığı şirket (özel isim, çevrilmez)
  avatar: string; // Profil avatarı URL'i
  defaultQuote: string; // TR fallback yorum metni
  rating: number; // Verdiği puan
  bootcampSlug?: string; // Hangi bootcamp için yapıldığı
}

// Çözülmüş (translate edilmiş) yorum; UI bileşenlerine bu şekilde geçilir.
export interface ResolvedTestimonial extends Omit<Testimonial, 'defaultQuote'> {
  quote: string;
}

export interface Feature {
  id: string;
  icon: string;
  titleKey: string; // features.<id>.title -> common.json
  descriptionKey: string; // features.<id>.description -> common.json
  defaultTitle: string; // TR fallback
  defaultDescription: string; // TR fallback
}

export interface HowItWorksStep {
  step: number;
  titleKey: string; // landing.howItWorks.steps.<titleKey> -> common.json
  descriptionKey: string; // landing.howItWorks.steps.<descriptionKey> -> common.json
  defaultTitle: string; // TR fallback
  defaultDescription: string; // TR fallback
}
export interface PricingPlan {
  id: string;
  priceEUR: number | null;
  period: 'month' | 'year' | null;
  defaultName: string; // TR fallback; i18n key: pricingPlans.<id>.name
  defaultDescription: string; // TR fallback; i18n key: pricingPlans.<id>.description
  defaultFeatures: string[]; // TR fallback; i18n key: pricingPlans.<id>.features
  highlighted: boolean;
}

// Çözülmüş (translate edilmiş) plan; UI bileşenlerine bu şekilde geçilir.
export interface ResolvedPricingPlan extends Omit<
  PricingPlan,
  'defaultName' | 'defaultDescription' | 'defaultFeatures'
> {
  name: string;
  description: string;
  features: string[];
}

// Çözülmüş (translate edilmiş) eğitmen; UI bileşenlerine bu şekilde geçilir.
export interface ResolvedInstructor extends Omit<Instructor, 'defaultBio'> {
  bio: string;
}
export interface TimelineEvent {
  year: string;
  titleKey: string;
  descKey: string;
  defaultTitle: string;
  defaultDesc: string;
}
// Öğrencinin bir bootcamp'e kayıt bilgisi (dashboard için mock enrollment verisi)
export interface EnrollmentModuleProgress {
  moduleTitle: string; // CurriculumModule.title ile eşleşir
  completed: boolean; // Modül tamamlandı mı
}

export interface Enrollment {
  id: string; // Benzersiz kayıt ID
  bootcampSlug: string; // İlgili bootcamp
  cohortId: string; // İlgili kohort
  enrolledAt: string; // Kayıt tarihi (ISO format)
  progressPercent: number; // Genel ilerleme yüzdesi (0-100)
  moduleProgress: EnrollmentModuleProgress[]; // Modül bazlı ilerleme
}
