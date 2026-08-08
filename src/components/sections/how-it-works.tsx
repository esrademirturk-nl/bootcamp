'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useT } from 'next-i18next/client';
import { howItWorksSteps } from '@/data/how-it-works';

interface HowItWorksProps {
  id?: string;
}

// Numara dairelerinin dönüşümlü renkleri — tek düz renk yerine
// primary/accent arasında geçiş yaparak daha canlı bir görünüm.
const stepColors = ['bg-primary-600', 'bg-accent-500', 'bg-primary-700', 'bg-accent-600'];

export function HowItWorks({ id }: HowItWorksProps) {
  const shouldReduceMotion = useReducedMotion();
  const { t } = useT('common');

  return (
    <section id={id} className="bg-surface py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-14 text-center">
          <span className="text-sm font-semibold uppercase tracking-wide text-primary-600">
            {t('landing.howItWorks.eyebrow')}
          </span>
          <h2 className="mt-2 font-heading text-3xl font-bold text-foreground">
            {t('landing.howItWorks.title')}
          </h2>
        </div>

        <div className="relative grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Soldan sağa açılarak çizilen bağlayıcı çizgi */}
          <motion.div
            className="absolute inset-x-0 top-6 hidden h-0.5 origin-left bg-border lg:block"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.9, ease: 'easeOut' }}
          />

          {howItWorksSteps.map((item, index) => (
            <motion.div
              key={item.step}
              className="relative z-10 flex flex-col items-center text-center"
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{
                duration: shouldReduceMotion ? 0 : 0.5,
                delay: shouldReduceMotion ? 0 : index * 0.15,
                ease: 'easeOut',
              }}
            >
              <div
                className={`mb-4 flex h-12 w-12 items-center justify-center rounded-full border-4 border-surface ${stepColors[index % stepColors.length]} font-heading font-bold text-white shadow-sm`}
              >
                {item.step}
              </div>
              <h3 className="mb-2 font-heading font-semibold text-foreground">{item.title}</h3>
              <p className="text-sm text-muted">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
