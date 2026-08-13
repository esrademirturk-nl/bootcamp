'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function ProfilePage() {
  const { t } = useTranslation('common');

  // Mock kullanıcı verisi - gerçek auth olmadığı için sabit başlangıç değerleri
  const [name, setName] = useState('Ahmet Yılmaz');
  const [email, setEmail] = useState('ahmet.yilmaz@example.com');
  const [saved, setSaved] = useState(false);

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    // Gerçek bir backend olmadığı için mock davranış: kaydedildi mesajı göster
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-heading text-2xl font-bold">
        {t('dashboard.profile.title', { defaultValue: 'Profil' })}
      </h1>

      <form
        onSubmit={handleSave}
        className="flex max-w-md flex-col gap-4 rounded-xl border border-border bg-card p-6"
      >
        <div className="flex flex-col items-center gap-2">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-2xl font-bold text-primary">
            {name.charAt(0).toUpperCase()}
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="profile-name" className="text-sm font-medium">
            {t('dashboard.profile.name', { defaultValue: 'İsim' })}
          </label>
          <Input id="profile-name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="profile-email" className="text-sm font-medium">
            {t('dashboard.profile.email', { defaultValue: 'E-posta' })}
          </label>
          <Input
            id="profile-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <Button type="submit">{t('dashboard.profile.save', { defaultValue: 'Kaydet' })}</Button>

        {saved && (
          <p className="text-center text-sm font-medium text-primary">
            ✓ {t('dashboard.profile.saved', { defaultValue: 'Profiliniz başarıyla kaydedildi.' })}
          </p>
        )}
      </form>
    </div>
  );
}
