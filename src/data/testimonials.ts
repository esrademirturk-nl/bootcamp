import type { Testimonial } from '@/types';

/**
 * @file src/data/testimonials.ts
 * @description Öğrenci yorumu (testimonial) mock verisi. Minimum 8 kayıt şartı
 * için 2 yeni yorum eklendi (7, 8). Ayrıca mevcut kayıtlardaki bootcampSlug
 * değerleri gerçek bootcamps.ts slug'larıyla eşleşmiyordu (örn. 'ui-ux-design-
 * fundamentals' → doğrusu 'ui-ux-design-systems', 'product-management-bootcamp'
 * diye bir bootcamp hiç yok) — bu sessiz kopukluk, bootcamp detay sayfasında
 * ilgili yorumların hiç görünmemesine yol açıyordu. Tamamı doğru slug'lara
 * bağlandı. `defaultQuote` TR fallback'tir; gösterim anında
 * `t(\`testimonials.${id}.quote\`, { defaultValue: defaultQuote })` ile
 * çözülür (bkz. timelineEvents.ts pattern'i).
 */
export const mockTestimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Merve Demir',
    role: 'Frontend Developer',
    company: 'Trendyol',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200',
    defaultQuote:
      'React & Next.js bootcamp sayesinde sektör standartlarında proje geliştirmeyi ve clean code disiplinini kazandım.',
    rating: 5,
    bootcampSlug: 'react-nextjs-frontend-bootcamp',
  },
  {
    id: '2',
    name: 'Burak Arslan',
    role: 'DevOps Engineer',
    company: 'Getir',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200',
    defaultQuote: 'Kubernetes ve AWS süreçlerini canlı projeler üzerinde deneyimlemek harikaydı.',
    rating: 5,
    bootcampSlug: 'devops-kubernetes-aws-bootcamp',
  },
  {
    id: '3',
    name: 'Ayşe Kılıç',
    role: 'UI/UX Designer',
    company: 'Hepsiburada',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200',
    defaultQuote:
      'Figma ile başlayan yolculuğum, gerçek kullanıcı testleriyle desteklenen bir portföye dönüştü.',
    rating: 5,
    bootcampSlug: 'ui-ux-design-systems',
  },
  {
    id: '4',
    name: 'Emre Şahin',
    role: 'Data Analyst',
    company: 'Migros',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
    defaultQuote:
      'SQL ve veri görselleştirme becerilerimi geliştirerek kariyer değişikliği yaptım.',
    rating: 4,
    bootcampSlug: 'data-science-machine-learning-python',
  },
  {
    id: '5',
    name: 'Ece Yıldız',
    role: 'Product Manager',
    company: 'Insider',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200',
    defaultQuote:
      'Teknik ekiplerle daha güçlü iletişim kurabilmek için Python & Django bootcamp\u2019ine katıldım; artık backend kararlarını çok daha rahat tartışabiliyorum.',
    rating: 5,
    bootcampSlug: 'python-django-rest-framework',
  },
  {
    id: '6',
    name: 'Kerem Aydın',
    role: 'Full-Stack Developer',
    company: 'Sahibinden.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200',
    defaultQuote: "Full-stack bootcamp'i tamamladıktan bir ay sonra yeni işime başladım.",
    rating: 5,
    bootcampSlug: 'fullstack-javascript-bootcamp',
  },
  {
    id: '7',
    name: 'Deniz Koç',
    role: 'Mobile Developer',
    company: 'Yemeksepeti',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200',
    defaultQuote:
      'React Native bootcamp\u2019inde tek kod tabanıyla hem iOS hem Android\u2019e yayın yapmayı öğrendim, portföyüme gerçek bir mobil uygulama ekledim.',
    rating: 5,
    bootcampSlug: 'react-native-cross-platform',
  },
  {
    id: '8',
    name: 'Berk Yılmaz',
    role: 'Security Analyst',
    company: 'Turkcell',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200',
    defaultQuote:
      'Ethical Hacking bootcamp\u2019i sızma testi (pentest) süreçlerini uçtan uca uygulamalı görmemi sağladı, sertifikasyon sınavına çok daha hazır girdim.',
    rating: 5,
    bootcampSlug: 'ethical-hacking-cybersecurity',
  },
];
