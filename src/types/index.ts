
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
  slug: string;        // URL dostu benzersiz id (ör: 'frontend-development')
  name: string;        // Gösterilecek kategori adı
  icon: string;        // İkon adı veya path
  courseCount: number; // Kategorideki toplam kurs sayısı
}

// Müfredat modülü arayüzü
export interface CurriculumModule {
  title: string;         // Modül başlığı
  durationHours: number; // Modülün saat cinsinden süresi
  lessons: string[];     // Modül altındaki ders konuları
}

// Eğitmen verisi arayüzü
export interface Instructor {
  slug: string;    // Eğitmen benzersiz id'si
  name: string;    // Ad Soyad
  title: string;   // Unvan (ör: Senior Frontend Engineer)
  bio: string;     // Kısa özgeçmiş
  avatar: string;  // Profil görseli URL'i
  company: string; // Çalıştığı şirket
}

// Bootcamp ana verisi arayüzü (En önemli tip)
export interface Bootcamp {
  slug: string;                   // URL path'i (ör: 'react-frontend-developer')
  title: string;                  // Bootcamp başlığı
  categorySlug: string;           // İlişkili olduğu kategorinin slug'ı
  level: Level;                   // Seviyesi ('beginner' | 'intermediate' | 'advanced')
  format: Format;                 // Formatı ('online' | 'hybrid' | 'onsite')
  durationWeeks: number;          // Hafta cinsinden süre
  languages: string[];            // Eğitim dilleri (ör: ['TR', 'EN'])
  priceEUR: number;               // Fiyat (Euro)
  rating: number;                 // Puan (0 - 5 arası float)
  studentCount: number;           // Kayıtlı öğrenci sayısı
  shortDescription: string;       // Kartlarda görünecek kısa açıklama
  description: string;            // Detay sayfasında görünecek uzun açıklama
  heroImage: string;              // Kapak görseli URL'i
  tags: string[];                 // Etiketler (ör: ['React', 'Next.js'])
  curriculum: CurriculumModule[]; // Müfredat modülleri
  instructorSlug: string;         // Eğitmenin slug'ı
  featured: boolean;              // Öne çıkarılan ürün mü?
}

// Kohort (dönem/sınıf) verisi arayüzü
export interface Cohort {
  id: string;           // Benzersiz kohort ID
  bootcampSlug: string; // İlgili bootcamp slug'ı
  startDate: string;    // Başlangıç tarihi (ISO format)
  endDate: string;      // Bitiş tarihi (ISO format)
  seatsTotal: number;   // Toplam kontenjan
  seatsLeft: number;    // Kalan kontenjan
  format: Format;       // Eğitimin formatı
  timezone: string;     // Saat dilimi
}

// Öğrenci yorumu arayüzü
export interface Testimonial {
  id: string;            // Benzersiz yorum ID
  name: string;          // Yorum yapan öğrenci adı
  role: string;          // Öğrencinin şu anki unvanı
  company: string;       // Çalıştığı şirket
  avatar: string;        // Profil avatarı URL'i
  quote: string;         // Yorum metni
  rating: number;        // Verdiği puan
  bootcampSlug?: string; // Hangi bootcamp için yapıldığı
}
=======
export type Level = 'beginner' | 'intermediate' | 'advanced';
export type Format = 'online' | 'hybrid' | 'onsite';

export interface Category {
  slug: string;
  name: string;
  icon: string;
  courseCount: number;
}

export interface CurriculumModule {
  title: string;
  durationHours: number;
  lessons: string[];
}

export interface Bootcamp {
  slug: string;
  title: string;
  categorySlug: string;
  level: Level;
  format: Format;
  durationWeeks: number;
  languages: string[];
  priceEUR: number;
  rating: number;
  studentCount: number;
  shortDescription: string;
  description: string;
  heroImage: string;
  tags: string[];
  curriculum: CurriculumModule[];
  instructorSlug: string;
  featured: boolean;
}
export interface Stat {
  id: string;
  value: number;
  suffix: string;
  label: string;
}

