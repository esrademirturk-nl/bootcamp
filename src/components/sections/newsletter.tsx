'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    // Gerçek bir backend olmadığı için mock davranış: başarı mesajı göster
    setSubmitted(true);
    setEmail('');
  }

  return (
    <section className="bg-surface py-16">
      <div className="mx-auto max-w-xl px-4 text-center">
        <h2 className="mb-2 text-3xl font-bold">Bültenimize Katılın</h2>
        <p className="mb-6 text-muted">
          Yeni bootcamp&apos;ler ve kariyer fırsatları hakkında ilk siz haberdar olun.
        </p>

        {submitted ? (
          <p className="text-primary">Teşekkürler! Abonelik talebiniz alındı.</p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
            <Input
              type="email"
              placeholder="E-posta adresiniz"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1"
            />
            <Button type="submit">Abone Ol</Button>
          </form>
        )}
      </div>
    </section>
  );
}
