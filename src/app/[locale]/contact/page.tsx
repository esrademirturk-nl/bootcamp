/**
 * @file src/app/[locale]/contact/page.tsx
 * @description E-02 - Contact Page & Form Validation
 */

'use client';

import React, { useState, use, useEffect } from 'react';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ContactPageProps {
  params: Promise<{
    locale: string;
  }>;
}

interface FormValues {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export default function ContactPage({ params }: ContactPageProps) {
  const { locale } = use(params);
  const routeParams = useParams();
  const currentLocale = (routeParams?.locale as string) || locale || 'tr';
  const { t, i18n } = useTranslation('common');

  useEffect(() => {
    if (i18n.language !== currentLocale) {
      i18n.changeLanguage(currentLocale);
    }
  }, [currentLocale, i18n]);

  const [formData, setFormData] = useState<FormValues>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const validate = (values: FormValues): FormErrors => {
    const newErrors: FormErrors = {};

    if (!values.name.trim()) {
      newErrors.name = t('contactPage.errors.nameRequired', {
        defaultValue: 'Ad soyad alanı zorunludur.',
      });
    } else if (values.name.trim().length < 2) {
      newErrors.name = t('contactPage.errors.nameMin', {
        defaultValue: 'Ad en az 2 karakter olmalıdır.',
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!values.email.trim()) {
      newErrors.email = t('contactPage.errors.emailRequired', {
        defaultValue: 'E-posta alanı zorunludur.',
      });
    } else if (!emailRegex.test(values.email.trim())) {
      newErrors.email = t('contactPage.errors.emailInvalid', {
        defaultValue: 'Geçerli bir e-posta adresi giriniz.',
      });
    }

    if (!values.subject.trim()) {
      newErrors.subject = t('contactPage.errors.subjectRequired', {
        defaultValue: 'Konu alanı zorunludur.',
      });
    } else if (values.subject.trim().length < 3) {
      newErrors.subject = t('contactPage.errors.subjectMin', {
        defaultValue: 'Konu en az 3 karakter olmalıdır.',
      });
    }

    if (!values.message.trim()) {
      newErrors.message = t('contactPage.errors.messageRequired', {
        defaultValue: 'Mesaj alanı zorunludur.',
      });
    } else if (values.message.trim().length < 10) {
      newErrors.message = t('contactPage.errors.messageMin', {
        defaultValue: 'Mesaj en az 10 karakter olmalıdır.',
      });
    }

    return newErrors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1000);
  };

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 space-y-12 max-w-7xl">
      {/* Sayfa Başlığı */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <Badge variant="neutral" className="uppercase tracking-widest text-xs px-3 py-1">
          {t('contactPage.badge', { defaultValue: 'İletişim' })}
        </Badge>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
          {t('contactPage.title', { defaultValue: 'Bizimle İletişime Geçin' })}
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          {t('contactPage.subtitle', {
            defaultValue:
              'Sorularınız, eğitim programları ve kayıt süreçleri için formu doldurabilirsiniz.',
          })}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* SOL TARAF: Contact Form */}
        <div className="lg:col-span-7 bg-card border border-border/60 rounded-2xl p-6 sm:p-8 shadow-xs">
          {isSuccess ? (
            <div className="text-center py-12 space-y-4">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-3xl font-bold">
                ✓
              </div>
              <h3 className="text-2xl font-bold text-foreground">
                {t('contactPage.successTitle', { defaultValue: 'Mesajınız Alındı!' })}
              </h3>
              <p className="text-sm text-muted-foreground max-w-md mx-auto">
                {t('contactPage.successDesc', {
                  defaultValue:
                    'Bizimle iletişime geçtiğiniz için teşekkür ederiz. En kısa sürede size dönüş yapacağız.',
                })}
              </p>
              <Button variant="secondary" className="mt-4" onClick={() => setIsSuccess(false)}>
                {t('contactPage.btnNewMessage', { defaultValue: 'Yeni Mesaj Gönder' })}
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              {/* Name Field */}
              <div className="space-y-1.5">
                <label
                  htmlFor="name"
                  className="text-xs font-semibold uppercase tracking-wider text-foreground"
                >
                  {t('contactPage.fields.name', { defaultValue: 'Ad Soyad' })} *
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={t('contactPage.placeholders.name', { defaultValue: 'John Doe' })}
                  className={`w-full rounded-lg border bg-background px-4 py-2.5 text-sm text-foreground transition-colors focus:outline-none focus:ring-2 ${
                    errors.name
                      ? 'border-destructive focus:ring-destructive/30'
                      : 'border-border focus:border-primary focus:ring-primary/20'
                  }`}
                />
                {errors.name && (
                  <p className="text-xs font-medium text-destructive mt-1">{errors.name}</p>
                )}
              </div>

              {/* Email Field */}
              <div className="space-y-1.5">
                <label
                  htmlFor="email"
                  className="text-xs font-semibold uppercase tracking-wider text-foreground"
                >
                  {t('contactPage.fields.email', { defaultValue: 'E-posta Adresi' })} *
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={t('contactPage.placeholders.email', {
                    defaultValue: 'john@example.com',
                  })}
                  className={`w-full rounded-lg border bg-background px-4 py-2.5 text-sm text-foreground transition-colors focus:outline-none focus:ring-2 ${
                    errors.email
                      ? 'border-destructive focus:ring-destructive/30'
                      : 'border-border focus:border-primary focus:ring-primary/20'
                  }`}
                />
                {errors.email && (
                  <p className="text-xs font-medium text-destructive mt-1">{errors.email}</p>
                )}
              </div>

              {/* Subject Field */}
              <div className="space-y-1.5">
                <label
                  htmlFor="subject"
                  className="text-xs font-semibold uppercase tracking-wider text-foreground"
                >
                  {t('contactPage.fields.subject', { defaultValue: 'Konu' })} *
                </label>
                <input
                  id="subject"
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder={t('contactPage.placeholders.subject', {
                    defaultValue: 'Bootcamp Kayıt Bilgisi',
                  })}
                  className={`w-full rounded-lg border bg-background px-4 py-2.5 text-sm text-foreground transition-colors focus:outline-none focus:ring-2 ${
                    errors.subject
                      ? 'border-destructive focus:ring-destructive/30'
                      : 'border-border focus:border-primary focus:ring-primary/20'
                  }`}
                />
                {errors.subject && (
                  <p className="text-xs font-medium text-destructive mt-1">{errors.subject}</p>
                )}
              </div>

              {/* Message Field */}
              <div className="space-y-1.5">
                <label
                  htmlFor="message"
                  className="text-xs font-semibold uppercase tracking-wider text-foreground"
                >
                  {t('contactPage.fields.message', { defaultValue: 'Mesajınız' })} *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={t('contactPage.placeholders.message', {
                    defaultValue: 'Sorunuzu buraya detaylıca yazabilirsiniz...',
                  })}
                  className={`w-full rounded-lg border bg-background px-4 py-2.5 text-sm text-foreground transition-colors focus:outline-none focus:ring-2 resize-none ${
                    errors.message
                      ? 'border-destructive focus:ring-destructive/30'
                      : 'border-border focus:border-primary focus:ring-primary/20'
                  }`}
                />
                {errors.message && (
                  <p className="text-xs font-medium text-destructive mt-1">{errors.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto px-8">
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
                    <span>{t('contactPage.btnSending', { defaultValue: 'Gönderiliyor...' })}</span>
                  </div>
                ) : (
                  t('contactPage.btnSubmit', { defaultValue: 'Mesaj Gönder' })
                )}
              </Button>
            </form>
          )}
        </div>

        {/* SAĞ TARAF: Alternate Contact Info + Static Map */}
        <div className="lg:col-span-5 space-y-6">
          {/* Alternatif İletişim Bilgileri */}
          <Card className="border-border/60 bg-card p-6 shadow-xs space-y-6">
            <h3 className="font-bold text-lg text-foreground border-b border-border/50 pb-3">
              {t('contactPage.infoTitle', { defaultValue: 'İletişim Bilgilerimiz' })}
            </h3>

            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <span className="text-xl">📍</span>
                <div>
                  <p className="font-semibold text-foreground">
                    {t('contactPage.addressLabel', { defaultValue: 'Adres' })}
                  </p>
                  <p className="text-muted-foreground text-xs leading-relaxed">
                    Bezuidenhoutseweg 1, 2594 AC Den Haag, Nederland
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-xl">✉️</span>
                <div>
                  <p className="font-semibold text-foreground">
                    {t('contactPage.emailLabel', { defaultValue: 'E-posta' })}
                  </p>
                  <a href="mailto:info@werhere.io" className="text-xs text-primary hover:underline">
                    info@werhere.io
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-xl">📞</span>
                <div>
                  <p className="font-semibold text-foreground">
                    {t('contactPage.phoneLabel', { defaultValue: 'Telefon' })}
                  </p>
                  <a
                    href="tel:+31701234567"
                    className="text-xs text-muted-foreground hover:text-foreground"
                  >
                    +31 70 123 4567
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-xl">🕒</span>
                <div>
                  <p className="font-semibold text-foreground">
                    {t('contactPage.hoursLabel', { defaultValue: 'Çalışma Saatleri' })}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {t('contactPage.hoursValue', {
                      defaultValue: 'Pazartesi - Cuma: 09:00 - 18:00 (CET)',
                    })}
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Statik Harita Görseli */}
          <Card className="overflow-hidden border-border/60 bg-card shadow-xs">
            <div className="relative h-48 w-full bg-muted">
              <Image
                src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=800&q=80"
                alt="Location Map"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-background/20 backdrop-blur-[1px]" />
              <div className="absolute bottom-3 left-3 bg-background/90 backdrop-blur-md px-3 py-1.5 rounded-md text-xs font-semibold text-foreground shadow-xs border border-border/50">
                📍 Den Haag HQ / Nederland
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
