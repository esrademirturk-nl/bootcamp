/**
 * @file src/app/[locale]/auth/login/page.tsx
 * @description E-03 - Login Sayfası (Tam i18n Uyumlu)
 */

'use client';

import React, { useState, use, useEffect } from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface LoginPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default function LoginPage({ params }: LoginPageProps) {
  const { locale } = use(params);
  const routeParams = useParams();
  const currentLocale = (routeParams?.locale as string) || locale || 'tr';
  const { t, i18n } = useTranslation('common');

  useEffect(() => {
    if (i18n.language !== currentLocale) {
      i18n.changeLanguage(currentLocale);
    }
  }, [currentLocale, i18n]);

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverMessage, setServerMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.email.trim()) {
      errs.email = t('authPage.errors.emailRequired', { defaultValue: 'E-posta alanı zorunludur.' });
    }
    if (!formData.password) {
      errs.password = t('authPage.errors.passwordRequired', { defaultValue: 'Şifre alanı zorunludur.' });
    }
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setServerMessage(null);
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      if (formData.email === 'fail@example.com') {
        setServerMessage({
          type: 'error',
          text: t('authPage.loginFailure', { defaultValue: 'E-posta veya şifre hatalı. Lütfen tekrar deneyin.' }),
        });
      } else {
        setServerMessage({
          type: 'success',
          text: t('authPage.loginSuccess', { defaultValue: 'Giriş başarılı! Yönlendiriliyorsunuz...' }),
        });
      }
    }, 1000);
  };

  return (
    <div className="container mx-auto px-4 py-8 md:py-16 max-w-md">
      <Card className="border-border/60 bg-card shadow-md">
        <CardContent className="p-6 sm:p-8 space-y-6">
          
          <div className="text-center space-y-2">
            <Badge variant="neutral" className="uppercase text-[10px] tracking-widest px-2.5 py-0.5">
              {t('authPage.tabLogin', { defaultValue: 'Giriş Yap' })}
            </Badge>
            <h1 className="text-2xl font-bold text-foreground">
              {t('authPage.loginTitle', { defaultValue: 'Hesabınıza Giriş Yapın' })}
            </h1>
          </div>

          {/* Tab Navigasyonu */}
          <div className="grid grid-cols-2 p-1 bg-muted rounded-lg text-xs font-semibold">
            <Link
              href={`/${currentLocale}/auth/login`}
              className="py-2 text-center rounded-md bg-background text-foreground shadow-xs"
            >
              {t('authPage.tabLogin', { defaultValue: 'Giriş Yap' })}
            </Link>
            <Link
              href={`/${currentLocale}/auth/register`}
              className="py-2 text-center rounded-md text-muted-foreground hover:text-foreground transition-colors"
            >
              {t('authPage.tabRegister', { defaultValue: 'Kayıt Ol' })}
            </Link>
          </div>

          {serverMessage && (
            <div
              className={`p-3.5 rounded-lg text-xs font-medium border ${
                serverMessage.type === 'success'
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400'
                  : 'bg-destructive/10 border-destructive/30 text-destructive'
              }`}
            >
              {serverMessage.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-foreground">
                {t('authPage.fields.email', { defaultValue: 'E-posta Adresi' })} *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="example@werhere.io"
                className={`w-full rounded-lg border bg-background px-3.5 py-2 text-sm text-foreground transition-colors focus:outline-none focus:ring-2 ${
                  errors.email ? 'border-destructive focus:ring-destructive/30' : 'border-border focus:ring-primary/20'
                }`}
              />
              {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
              <p className="text-[11px] text-muted-foreground italic">
                {t('authPage.failHint', { defaultValue: '* Hata senaryosu için fail@example.com yazabilirsiniz.' })}
              </p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-foreground">
                  {t('authPage.fields.password', { defaultValue: 'Şifre' })} *
                </label>
                <Link href={`/${currentLocale}/forgot-password`} className="text-xs text-primary hover:underline">
                  {t('authPage.forgotPassword', { defaultValue: 'Şifremi Unuttum?' })}
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="••••••••"
                  className={`w-full rounded-lg border bg-background pl-3.5 pr-10 py-2 text-sm text-foreground transition-colors focus:outline-none focus:ring-2 ${
                    errors.password ? 'border-destructive focus:ring-destructive/30' : 'border-border focus:ring-primary/20'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground text-xs font-semibold"
                >
                  {showPassword ? t('authPage.hide', { defaultValue: 'Gizle' }) : t('authPage.show', { defaultValue: 'Göster' })}
                </button>
              </div>
              {errors.password && <p className="text-xs text-destructive">{errors.password}</p>}
            </div>

            <Button type="submit" disabled={isSubmitting} className="w-full mt-2">
              {isSubmitting
                ? t('authPage.btnProcessing', { defaultValue: 'İşleniyor...' })
                : t('authPage.btnLogin', { defaultValue: 'Giriş Yap' })}
            </Button>
          </form>

          <div className="text-center text-xs text-muted-foreground pt-2 border-t border-border/50">
            {t('authPage.noAccount', { defaultValue: 'Hesabınız yok mu?' })}{' '}
            <Link href={`/${currentLocale}/auth/register`} className="text-primary font-semibold hover:underline">
              {t('authPage.registerNow', { defaultValue: 'Hemen Kayıt Olun' })}
            </Link>
          </div>

        </CardContent>
      </Card>
    </div>
  );
}