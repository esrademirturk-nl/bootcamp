import { cva } from 'class-variance-authority';

// Bu dosyada 'use client' YOK — çünkü cva() saf bir fonksiyon, React hook'u
// ya da taray\u0131c\u0131 API'si kullanmıyor. Hem Server Component'lerden (örn. bir
// Link'e buttonVariants class'larını uygulamak için) hem Client Component'lerden
// (Button komponenti) güvenle import edilebilmesi için button.tsx'ten ayrı tutuluyor.
// button.tsx'in en üstünde 'use client' olduğu için, oradan export edilen her şey
// "client-only" sayılır — Server Component'ler onu doğrudan çağıramaz.

export const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        primary: 'bg-primary-600 text-white hover:bg-primary-700',
        secondary: 'bg-secondary text-white hover:opacity-90',
        ghost: 'bg-transparent text-foreground hover:bg-surface-muted',
      },
      size: {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-6 py-3 text-lg',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);
