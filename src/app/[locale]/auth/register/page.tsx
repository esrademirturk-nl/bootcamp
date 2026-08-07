/**
 * @file src/app/[locale]/auth/register/page.tsx
 * @description E-03 - Register Sayfası (Tam i18n Uyumlu)
 */

'use client';

import React, { useState, use, useEffect } from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface RegisterPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default function RegisterPage({ params }: RegisterPageProps) {
  const { locale } = use(params);
  const routeParams = useParams();
  const currentLocale = (routeParams?.locale as string) || locale || 'tr';
  const { t, i18n } = useTranslation('common');

  useEffect(() => {
    if (i18n.language !== currentLocale) {
      i18n.changeLanguage(currentLocale);
    }
  }, [currentLocale, i18n]);

  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '', terms: false });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverMessage, setServerMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const calculatePasswordStrength = (pass: string): number => {
    let score = 0;
    if (!pass) return score;
    if (pass.length >= 8) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;
    return score;
  };

  const passwordStrength = calculatePasswordStrength(formData.password);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = t('authPage.errors.nameRequired', { defaultValue: 'Ad soyad alanı zorunludur.' });
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errs.email = t('authPage.errors.emailRequired', { defaultValue: 'E-posta alanı zorunludur.' });
    } else if (!emailRegex.test(formData.email.trim())) {
      errs.email = t('authPage.errors.emailInvalid', { defaultValue: 'Geçerli bir e-posta adresi giriniz.' });
    }

    if (!formData.password) {
      errs.password = t('authPage.errors.passwordRequired', { defaultValue: 'Şifre alanı zorunludur.' });
    } else if (formData.password.length < 8) {
      errs.password = t('authPage.errors.passwordMin', { defaultValue: 'Şifre en az 8 karakter olmalıdır.' });
    }

    if (formData.password !== formData.confirmPassword) {
      errs.confirmPassword = t('authPage.errors.passwordMatch', { defaultValue: 'Şifreler eşleşmiyor.' });
    }

    if (!formData.terms) {
      errs.terms = t('authPage.errors.termsRequired', { defaultValue: 'Kullanım koşullarını kabul etmelisiniz.' });
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
      setServerMessage({
        type: 'success',
        text: t('authPage.registerSuccess', { defaultValue: 'Kayıt başarıyla tamamlandı! Hesabınıza giriş yapabilirsiniz.' }),
      });
      setFormData({ name: '', email: '', password: '', confirmPassword: '', terms: false });
    }, 1000);
  };

  return (
    <div className="container mx-auto px-4 py-8 md:py-16 max-w-md">
      <Card className="border-border/60 bg-card shadow-md">
        <CardContent className="p-6 sm:p-8 space-y-6">
          
          <div className="text-center space-y-2">
            <Badge variant="neutral" className="uppercase text-[10px] tracking-widest px-2.5 py-0.5">
              {t('authPage.tabRegister', { defaultValue: 'Kayıt Ol' })}
            </Badge>
            <h1 className="text-2xl font-bold text-foreground">
              {t('authPage.registerTitle', { defaultValue: 'Yeni Hesap Oluşturun' })}
            </h1>
          </div>

          {/* Tab Navigasyonu */}
          <div className="grid grid-cols-2 p-1 bg-muted rounded-lg text-xs font-semibold">
            <Link
              href={`/${currentLocale}/auth/login`}
              className="py-2 text-center rounded-md text-muted-foreground hover:text-foreground transition-colors"
            >
              {t('authPage.tabLogin', { defaultValue: 'Giriş Yap' })}
            </Link>
            <Link
              href={`/${currentLocale}/auth/register`}
              className="py-2 text-center rounded-md bg-background text-foreground shadow-xs"
            >
              {t('authPage.tabRegister', { defaultValue: 'Kayıt Ol' })}
            </Link>
          </div>

          {serverMessage && (
            <div className="p-3.5 rounded-lg text-xs font-medium border bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400">
              {serverMessage.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            
            {/* Name */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-foreground">
                {t('authPage.fields.name', { defaultValue: 'Ad Soyad' })} *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="John Doe"
                className={`w-full rounded-lg border bg-background px-3.5 py-2 text-sm text-foreground transition-colors focus:outline-none focus:ring-2 ${
                  errors.name ? 'border-destructive focus:ring-destructive/30' : 'border-border focus:ring-primary/20'
                }`}
              />
              {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
            </div>

            {/* Email */}
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
            </div>

            {/* Password */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-foreground">
                {t('authPage.fields.password', { defaultValue: 'Şifre' })} *
              </label>
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

            {/* Password Strength Indicator */}
            {formData.password && (
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                  <span>{t('authPage.strengthLabel', { defaultValue: 'Şifre Gücü:' })}</span>
                  <span className="font-semibold text-foreground">
                    {passwordStrength <= 1
                      ? t('authPage.strength.weak', { defaultValue: 'Zayıf' })
                      : passwordStrength === 2
                      ? t('authPage.strength.medium', { defaultValue: 'Orta' })
                      : passwordStrength === 3
                      ? t('authPage.strength.good', { defaultValue: 'İyi' })
                      : t('authPage.strength.strong', { defaultValue: 'Çok Güçlü' })}
                  </span>
                </div>
                <div className="flex h-1.5 gap-1 w-full rounded-full bg-muted overflow-hidden">
                  <div className={`h-full flex-1 ${passwordStrength >= 1 ? 'bg-destructive' : 'bg-transparent'}`} />
                  <div className={`h-full flex-1 ${passwordStrength >= 2 ? 'bg-amber-500' : 'bg-transparent'}`} />
                  <div className={`h-full flex-1 ${passwordStrength >= 3 ? 'bg-blue-500' : 'bg-transparent'}`} />
                  <div className={`h-full flex-1 ${passwordStrength >= 4 ? 'bg-emerald-500' : 'bg-transparent'}`} />
                </div>
              </div>
            )}

            {/* Confirm Password */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-foreground">
                {t('authPage.fields.confirmPassword', { defaultValue: 'Şifre Tekrarı' })} *
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  placeholder="••••••••"
                  className={`w-full rounded-lg border bg-background pl-3.5 pr-10 py-2 text-sm text-foreground transition-colors focus:outline-none focus:ring-2 ${
                    errors.confirmPassword ? 'border-destructive focus:ring-destructive/30' : 'border-border focus:ring-primary/20'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground text-xs font-semibold"
                >
                  {showConfirmPassword ? t('authPage.hide', { defaultValue: 'Gizle' }) : t('authPage.show', { defaultValue: 'Göster' })}
                </button>
              </div>
              {errors.confirmPassword && <p className="text-xs text-destructive">{errors.confirmPassword}</p>}
            </div>

            {/* Terms Checkbox */}
            <div className="space-y-1">
              <label className="flex items-center gap-2 cursor-pointer text-xs text-muted-foreground">
                <input
                  type="checkbox"
                  checked={formData.terms}
                  onChange={(e) => setFormData({ ...formData, terms: e.target.checked })}
                  className="rounded border-border text-primary focus:ring-primary h-4 w-4"
                />
                <span>{t('authPage.acceptTerms', { defaultValue: 'Kullanım Koşullarını kabul ediyorum. *' })}</span>
              </label>
              {errors.terms && <p className="text-xs text-destructive">{errors.terms}</p>}
            </div>

            <Button type="submit" disabled={isSubmitting} className="w-full mt-2">
              {isSubmitting
                ? t('authPage.btnProcessing', { defaultValue: 'İşleniyor...' })
                : t('authPage.btnRegister', { defaultValue: 'Kayıt Ol' })}
            </Button>
          </form>

          <div className="text-center text-xs text-muted-foreground pt-2 border-t border-border/50">
            {t('authPage.hasAccount', { defaultValue: 'Zaten hesabınız var mı?' })}{' '}
            <Link href={`/${currentLocale}/auth/login`} className="text-primary font-semibold hover:underline">
              {t('authPage.loginNow', { defaultValue: 'Giriş Yapın' })}
            </Link>
          </div>

        </CardContent>
      </Card>
    </div>
  );
}