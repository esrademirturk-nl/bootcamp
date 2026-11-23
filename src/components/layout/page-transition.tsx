/**
 * @file src/components/layout/page-transition.tsx
 * @description Route değişimlerinde tutarlı, kısa (≤300ms) geçiş animasyonu uygular.
 *
 * Bu dosya ne iş yapar?
 * Next.js App Router'da layout.tsx sabit kalır, sadece `children` değişir — bu yüzden
 * geçiş animasyonu üretmek için AnimatePresence'ı pathname'e keyli bir client wrapper
 * içine almak gerekiyor (App Router + Framer Motion'da standart pattern budur).
 * `children` server component ağacı olarak kalır, sadece bu dosya 'use client' sınırıdır.
 *
 * `prefers-reduced-motion` sistem ayarı açık olan kullanıcılar için `useReducedMotion`
 * hook'u ile animasyon tamamen devre dışı bırakılır (F-01 kabul kriteri).
 */

'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { usePathname } from 'next/navigation';

interface PageTransitionProps {
  children: React.ReactNode;
}

// Tüm site genelinde TEK bir kaynaktan yönetilen geçiş süresi/eğrisi —
// F-01 kartındaki "tutarlı, 300ms'i geçmeyen" kriterine uymak için burada sabitlendi.
const TRANSITION_DURATION_SECONDS = 0.2;

export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={prefersReducedMotion ? undefined : { opacity: 0, y: -8 }}
        transition={{
          duration: prefersReducedMotion ? 0 : TRANSITION_DURATION_SECONDS,
          ease: 'easeInOut',
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
