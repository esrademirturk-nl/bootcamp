import type { Bootcamp } from '@/types';

/**
 * @file src/data/bootcamps.ts
 * @description Bootcamp mock verisi. Başlık/açıklama/müfredat başlıkları
 * artık i18n key + defaultValue mantığıyla çözülüyor (bkz. timelineEvents.ts
 * pattern'i, çözümleme için src/lib/resolve-mock-data.ts). Anahtarlar ->
 * public/locales/{lng}/common.json içindeki
 * `bootcamps.<slug>.title|shortDescription|description|curriculum.moduleN`.
 * `lessons[]` alanları teknik terimler olduğu için bilinçli olarak çevrilmez.
 */
export const mockBootcamps: Bootcamp[] = [
  {
    slug: 'react-nextjs-frontend-bootcamp',
    defaultTitle: 'React & Next.js Frontend Bootcamp',
    categorySlug: 'frontend',
    level: 'intermediate',
    format: 'online',
    durationWeeks: 12,
    languages: ['TR', 'EN'],
    priceEUR: 1490,
    rating: 4.9,
    studentCount: 340,
    defaultShortDescription:
      'Modern web geliştirme ekosisteminde React, Next.js ve TypeScript ile profesyonel projeler üretin.',
    defaultDescription:
      'Bu kapsamlı eğitimde modern frontend mimarilerini, state yönetimini, Server Components mantığını ve performans optimizasyonlarını uygulamalı projelerle öğreneceksiniz.',
    heroImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800',
    tags: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
    instructorSlug: 'ahmet-yilmaz',
    featured: true,
    curriculum: [
      {
        titleKey: 'module1',
        defaultTitle: 'Modül 1: TypeScript ve Modern JS',
        durationHours: 20,
        lessons: ['ES6+', 'TypeScript Fundamentals', 'Interfaces & Types'],
      },
      {
        titleKey: 'module2',
        defaultTitle: 'Modül 2: Advanced React',
        durationHours: 30,
        lessons: ['Custom Hooks', 'Context API', 'Performance Optimization'],
      },
      {
        titleKey: 'module3',
        defaultTitle: 'Modül 3: Next.js App Router',
        durationHours: 40,
        lessons: ['Server Components', 'Routing & Middleware', 'Data Fetching'],
      },
    ],
  },
  {
    slug: 'zero-to-hero-javascript',
    defaultTitle: 'Sıfırdan Frontend Web Geliştirme',
    categorySlug: 'frontend',
    level: 'beginner',
    format: 'online',
    durationWeeks: 8,
    languages: ['TR'],
    priceEUR: 890,
    rating: 4.7,
    studentCount: 520,
    defaultShortDescription:
      'Yazılıma ilk adımı atın. HTML, CSS ve JavaScript ile web siteleri tasarlamayı öğrenin.',
    defaultDescription:
      'Hangi altyapıdan olursanız olun, web dünyasına giriş yapmanız için tasarlanmış temel seviye kodlama eğitimi.',
    heroImage: 'https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=800',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'Git'],
    instructorSlug: 'ahmet-yilmaz',
    featured: false,
    curriculum: [
      {
        titleKey: 'module1',
        defaultTitle: 'Modül 1: Web Temelleri',
        durationHours: 15,
        lessons: ['HTML Structure', 'CSS Basics', 'Flexbox & Grid'],
      },
      {
        titleKey: 'module2',
        defaultTitle: 'Modül 2: JavaScript Temelleri',
        durationHours: 25,
        lessons: ['Variables & Types', 'Functions', 'DOM Manipulation'],
      },
    ],
  },
  {
    slug: 'advanced-vue-js-masterclass',
    defaultTitle: 'Advanced Vue.js & Nuxt 3 Masterclass',
    categorySlug: 'frontend',
    level: 'advanced',
    format: 'hybrid',
    durationWeeks: 10,
    languages: ['EN'],
    priceEUR: 1290,
    rating: 4.8,
    studentCount: 180,
    defaultShortDescription:
      'Vue 3 Composition API ve Nuxt 3 ile ölçeklenebilir kurumsal uygulamalar geliştirin.',
    defaultDescription:
      'Büyük ölçekli projeler için Vue 3 mimarisi, Pinia state yönetimi ve Nuxt SSR sistemleri.',
    heroImage: 'https://images.unsplash.com/photo-1581276879432-15e50529f34b?w=800',
    tags: ['Vue 3', 'Nuxt 3', 'Pinia', 'TypeScript'],
    instructorSlug: 'ahmet-yilmaz',
    featured: false,
    curriculum: [
      {
        titleKey: 'module1',
        defaultTitle: 'Modül 1: Composition API',
        durationHours: 20,
        lessons: ['Reactivity', 'Composables', 'Script Setup'],
      },
    ],
  },
  {
    slug: 'node-js-microservices-backend',
    defaultTitle: 'Node.js & Microservices Backend',
    categorySlug: 'backend',
    level: 'intermediate',
    format: 'online',
    durationWeeks: 12,
    languages: ['TR', 'EN'],
    priceEUR: 1390,
    rating: 4.9,
    studentCount: 290,
    defaultShortDescription:
      'Node.js, Express, PostgreSQL ve Docker kullanarak mikroservis mimarileri inşa edin.',
    defaultDescription:
      'Yüksek trafikli sistemler için backend geliştirmeyi, API güvenliğini ve veritabanı yönetimini öğrenin.',
    heroImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800',
    tags: ['Node.js', 'Express', 'PostgreSQL', 'Docker'],
    instructorSlug: 'can-ozkan',
    featured: true,
    curriculum: [
      {
        titleKey: 'module1',
        defaultTitle: 'Modül 1: REST API Design',
        durationHours: 25,
        lessons: ['Express Architecture', 'Middleware', 'JWT Authentication'],
      },
    ],
  },
  {
    slug: 'go-programming-high-performance',
    defaultTitle: 'Go (Golang) High Performance Backend',
    categorySlug: 'backend',
    level: 'advanced',
    format: 'onsite',
    durationWeeks: 8,
    languages: ['EN'],
    priceEUR: 1590,
    rating: 4.95,
    studentCount: 140,
    defaultShortDescription:
      'Google tarafından geliştirilen Go dili ile eşzamanlı (concurrent) ve hızlı backend yazılımı.',
    defaultDescription:
      'Goroutine, Channel ve Go ekosistemi ile yüksek performanslı backend servisleri yazın.',
    heroImage: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=800',
    tags: ['Go', 'Concurrency', 'gRPC', 'Microservices'],
    instructorSlug: 'can-ozkan',
    featured: false,
    curriculum: [
      {
        titleKey: 'module1',
        defaultTitle: 'Modül 1: Go Internals',
        durationHours: 20,
        lessons: ['Pointers & Memory', 'Goroutines', 'Channels'],
      },
    ],
  },
  {
    slug: 'python-django-rest-framework',
    defaultTitle: 'Python & Django REST Framework',
    categorySlug: 'backend',
    level: 'beginner',
    format: 'online',
    durationWeeks: 10,
    languages: ['TR'],
    priceEUR: 990,
    rating: 4.6,
    studentCount: 410,
    defaultShortDescription:
      'Python ile sıfırdan backend geliştirmeye geçin. Güvenli web servisleri yazın.',
    defaultDescription:
      'Python ekosisteminde en popüler backend framework olan Django ile veritabanı ve API yönetimi.',
    heroImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800',
    tags: ['Python', 'Django', 'REST API', 'SQLite'],
    instructorSlug: 'can-ozkan',
    featured: false,
    curriculum: [
      {
        titleKey: 'module1',
        defaultTitle: 'Modül 1: Python Basics',
        durationHours: 15,
        lessons: ['Syntax', 'OOP', 'Package Management'],
      },
    ],
  },
  {
    slug: 'devops-kubernetes-aws-bootcamp',
    defaultTitle: 'DevOps, AWS & Kubernetes Mastery',
    categorySlug: 'devops',
    level: 'advanced',
    format: 'hybrid',
    durationWeeks: 14,
    languages: ['EN'],
    priceEUR: 1790,
    rating: 4.9,
    studentCount: 210,
    defaultShortDescription:
      'CI/CD süreçleri, bulut altyapısı ve konteyner orkestrasyonu ile modern DevOps mühendisi olun.',
    defaultDescription:
      'AWS servisleri, Terraform ile Infrastructure as Code ve Kubernetes cluster yönetimi.',
    heroImage: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800',
    tags: ['AWS', 'Kubernetes', 'Docker', 'Terraform', 'CI/CD'],
    instructorSlug: 'elena-rodriguez',
    featured: true,
    curriculum: [
      {
        titleKey: 'module1',
        defaultTitle: 'Modül 1: Container Architecture',
        durationHours: 25,
        lessons: ['Docker Deep Dive', 'Kubernetes Basics', 'Helm'],
      },
    ],
  },
  {
    slug: 'fullstack-javascript-bootcamp',
    defaultTitle: 'Fullstack JavaScript (MERN)',
    categorySlug: 'fullstack',
    level: 'intermediate',
    format: 'online',
    durationWeeks: 16,
    languages: ['TR', 'EN'],
    priceEUR: 1690,
    rating: 4.85,
    studentCount: 450,
    defaultShortDescription:
      'MongoDB, Express, React ve Node.js ile baştan sona uçtan uca web uygulamaları geliştirin.',
    defaultDescription:
      'Tek bir dille (JavaScript) hem ön yüzü hem arka yüzü geliştirmeyi öğrenin.',
    heroImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800',
    tags: ['React', 'Node.js', 'MongoDB', 'Express'],
    instructorSlug: 'ahmet-yilmaz',
    featured: true,
    curriculum: [
      {
        titleKey: 'module1',
        defaultTitle: 'Modül 1: Fullstack Architecture',
        durationHours: 40,
        lessons: ['Monorepo Setup', 'API Integration', 'Deployment'],
      },
    ],
  },
  {
    slug: 'ui-ux-design-systems',
    defaultTitle: 'UI/UX Design & Design Systems',
    categorySlug: 'uiux',
    level: 'beginner',
    format: 'online',
    durationWeeks: 8,
    languages: ['TR'],
    priceEUR: 790,
    rating: 4.75,
    studentCount: 310,
    defaultShortDescription:
      'Figma ile profesyonel arayüz tasarımları ve ölçeklenebilir tasarım sistemleri oluşturun.',
    defaultDescription:
      'Kullanıcı araştırmasından tel çerçeve (wireframe) ve prototiplemeye kadar UI/UX metodolojileri.',
    heroImage: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800',
    tags: ['Figma', 'UI Design', 'UX Research', 'Design System'],
    instructorSlug: 'sarah-jenkins',
    featured: false,
    curriculum: [
      {
        titleKey: 'module1',
        defaultTitle: 'Modül 1: Design Fundamentals',
        durationHours: 15,
        lessons: ['Color Theory', 'Typography', 'Figma Auto-Layout'],
      },
    ],
  },
  {
    slug: 'react-native-cross-platform',
    defaultTitle: 'React Native ile Mobil Uygulama',
    categorySlug: 'mobile',
    level: 'intermediate',
    format: 'online',
    durationWeeks: 10,
    languages: ['TR'],
    priceEUR: 1190,
    rating: 4.8,
    studentCount: 260,
    defaultShortDescription:
      'iOS ve Android için tek bir kod tabanı üzerinden yerel (native) performanslı mobil uygulamalar yazın.',
    defaultDescription:
      'React bilginizi mobil dünyaya taşıyın. Navigation, Redux Toolkit ve Cihaz Özellikleri erişimi.',
    heroImage: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800',
    tags: ['React Native', 'Expo', 'Mobile', 'iOS', 'Android'],
    instructorSlug: 'zeynep-iron',
    featured: false,
    curriculum: [
      {
        titleKey: 'module1',
        defaultTitle: 'Modül 1: Mobile UI',
        durationHours: 20,
        lessons: ['Flexbox Layout', 'React Native Components', 'Navigation'],
      },
    ],
  },
  {
    slug: 'data-science-machine-learning-python',
    defaultTitle: 'Python ile Data Science & Machine Learning',
    categorySlug: 'data',
    level: 'intermediate',
    format: 'online',
    durationWeeks: 14,
    languages: ['EN'],
    priceEUR: 1490,
    rating: 4.9,
    studentCount: 380,
    defaultShortDescription:
      'Veri analizi, görselleştirme ve yapay zeka modelleri ile veriden değer üretmeyi öğrenin.',
    defaultDescription:
      'Pandas, NumPy, Scikit-Learn ve TensorFlow kullanarak gerçek dünya verilerini işleyin.',
    heroImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
    tags: ['Python', 'Pandas', 'Machine Learning', 'AI'],
    instructorSlug: 'mehmet-kaya',
    featured: false,
    curriculum: [
      {
        titleKey: 'module1',
        defaultTitle: 'Modül 1: Data Processing',
        durationHours: 30,
        lessons: ['NumPy Arrays', 'Pandas DataFrames', 'Data Cleaning'],
      },
    ],
  },
  {
    slug: 'ethical-hacking-cybersecurity',
    defaultTitle: 'Ethical Hacking & Cyber Security',
    categorySlug: 'cybersecurity',
    level: 'beginner',
    format: 'online',
    durationWeeks: 12,
    languages: ['TR'],
    priceEUR: 1290,
    rating: 4.85,
    studentCount: 220,
    defaultShortDescription:
      'Sistem güvenlik açıkları tespiti, sızma testleri ve siber savunma stratejileri.',
    defaultDescription:
      'Ağ güvenliği, web uygulama güvenliği (OWASP Top 10) ve etik korsanlık teknikleri.',
    heroImage: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800',
    tags: ['Ethical Hacking', 'Network Security', 'OWASP', 'Linux'],
    instructorSlug: 'can-ozkan',
    featured: false,
    curriculum: [
      {
        titleKey: 'module1',
        defaultTitle: 'Modül 1: Security Fundamentals',
        durationHours: 25,
        lessons: ['Linux Basics', 'Networking', 'Penetration Testing'],
      },
    ],
  },
];
