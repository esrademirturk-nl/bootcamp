'use client';

import * as React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { useT } from 'next-i18next/client';

export function Newsletter() {
  const { t } = useT('common');
  const [email, setEmail] = React.useState('');
  const [status, setStatus] = React.useState<'idle' | 'loading' | 'success'>('idle');

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!email) return;
    setStatus('loading');
    // Gerçek bir backend olmadığı için mock davranış (~1sn gecikme)
    await new Promise((resolve) => setTimeout(resolve, 800));
    setStatus('success');
    setEmail('');
  }

  return (
    <section className="border-y border-border bg-surface py-20">
      <div className="mx-auto max-w-2xl px-4 text-center">
        <span className="text-sm font-semibold uppercase tracking-wide text-primary-600">
          {t('landing.newsletter.eyebrow')}
        </span>
        <h2 className="mt-2 font-heading text-3xl font-bold text-foreground sm:text-4xl">
          {t('landing.newsletter.title')}
        </h2>
        <p className="mx-auto mt-3 max-w-md text-muted">{t('landing.newsletter.subtitle')}</p>

        {status === 'success' ? (
          <div className="mx-auto mt-8 flex max-w-md items-center justify-center gap-2 text-success">
            <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
            <p className="text-sm font-medium">{t('landing.newsletter.success')}</p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mx-auto mt-8 flex max-w-md items-center gap-3 border-b-2 border-foreground/20 pb-2 transition-colors focus-within:border-primary-500"
          >
            <input
              type="email"
              placeholder={t('landing.newsletter.placeholder')}
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              disabled={status === 'loading'}
              className="flex-1 bg-transparent text-foreground placeholder:text-muted focus:outline-none disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              aria-label={t('landing.newsletter.button')}
              className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary-600 text-white transition-all hover:translate-x-0.5 hover:bg-primary-700 disabled:opacity-50"
            >
              {status === 'loading' ? (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
              ) : (
                <ArrowRight className="h-4 w-4" />
              )}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
