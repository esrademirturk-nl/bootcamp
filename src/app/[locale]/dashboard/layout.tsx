'use client';

import { ReactNode, useState, use } from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { LayoutDashboard, BookOpen, User, Menu, X } from 'lucide-react';
import i18nConfig from '../../../../i18n.config';

interface DashboardLayoutProps {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

function localizedHref(path: string, locale: string) {
  if (locale === i18nConfig.fallbackLng) return path;
  return `/${locale}${path}`;
}

export default function DashboardLayout({ children, params }: DashboardLayoutProps) {
  const { locale } = use(params);
  const { t } = useTranslation('common');
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const navItems = [
    {
      href: '/dashboard',
      label: t('dashboard.nav.overview', { defaultValue: 'Genel Bakış' }),
      icon: LayoutDashboard,
    },
    {
      href: '/dashboard/my-bootcamps',
      label: t('dashboard.nav.myBootcamps', { defaultValue: 'Bootcamplerim' }),
      icon: BookOpen,
    },
    {
      href: '/dashboard/profile',
      label: t('dashboard.nav.profile', { defaultValue: 'Profil' }),
      icon: User,
    },
  ];

  return (
    <div className="flex min-h-screen">
      {/* Mobil üst bar: hamburger menü */}
      <div className="sticky top-0 z-20 flex items-center justify-between border-b border-border bg-background p-4 md:hidden">
        <span className="font-heading text-lg font-bold">
          {t('dashboard.title', { defaultValue: 'Öğrenci Paneli' })}
        </span>
        <button
          type="button"
          onClick={() => setIsMobileNavOpen((prev) => !prev)}
          aria-label={t('dashboard.nav.toggle', { defaultValue: 'Menüyü aç/kapat' })}
        >
          {isMobileNavOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`${
          isMobileNavOpen ? 'block' : 'hidden'
        } w-full border-b border-border bg-surface p-4 md:block md:w-64 md:border-b-0 md:border-r md:p-6`}
      >
        <span className="hidden font-heading text-xl font-bold md:block">
          {t('dashboard.title', { defaultValue: 'Öğrenci Paneli' })}
        </span>
        <nav className="mt-6 flex flex-col gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={localizedHref(item.href, locale)}
                onClick={() => setIsMobileNavOpen(false)}
                className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-primary/10 hover:text-primary"
              >
                <Icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Ana içerik */}
      <main className="flex-1 p-4 md:p-8">{children}</main>
    </div>
  );
}
