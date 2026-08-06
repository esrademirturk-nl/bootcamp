import type { Testimonial } from '@/types';

export const mockTestimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Merve Demir',
    role: 'Frontend Developer',
    company: 'Trendyol',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200',
    quote:
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
    quote: 'Kubernetes ve AWS süreçlerini canlı projeler üzerinde deneyimlemek harikaydı.',
    rating: 5,
    bootcampSlug: 'devops-kubernetes-aws-bootcamp',
  },
];
