import Link from 'next/link';
import { Rocket } from 'lucide-react';
import { getT } from 'next-i18next/server';
import i18nConfig from '../../../i18n.config';

function localizedHref(path: string, locale: string) {
  if (locale === i18nConfig.fallbackLng) return path;
  return `/${locale}${path === '/' ? '' : path}`;
}

const socialLinks = [
  { href: 'https://linkedin.com', label: 'LinkedIn' },
  { href: 'https://twitter.com', label: 'X (Twitter)' },
  { href: 'https://instagram.com', label: 'Instagram' },
];

interface FooterProps {
  locale: string;
}

export async function Footer({ locale }: FooterProps) {
  const { t } = await getT('common', { lng: locale });

  const footerColumns = [
    {
      title: t('footer.columnPlatform'),
      links: [
        { href: localizedHref('/bootcamps', locale), label: t('nav.bootcamps') },
        { href: localizedHref('/schedule', locale), label: t('nav.schedule') },
        { href: localizedHref('/about', locale), label: t('nav.about') },
      ],
    },
    {
      title: t('footer.columnResources'),
      links: [
        { href: localizedHref('/contact', locale), label: t('nav.contact') },
        { href: localizedHref('/auth/login', locale), label: t('footer.login') },
        { href: localizedHref('/auth/register', locale), label: t('cta.signup') },
      ],
    },
    {
      title: t('footer.columnLegal'),
      links: [
        { href: localizedHref('/privacy', locale), label: t('footer.privacy') },
        { href: localizedHref('/terms', locale), label: t('footer.terms') },
      ],
    },
  ];

  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <Link
              href={localizedHref('/', locale)}
              className="flex items-center gap-2.5 font-heading text-lg font-bold text-foreground"
            >
              <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-primary-600 text-white">
                <Rocket className="h-4 w-4" strokeWidth={2} />
              </span>
              <span>
                <span className="text-primary-600">NextGen</span> IT Academy
              </span>
            </Link>
            <p className="mt-2 text-sm text-muted">{t('footer.tagline')}</p>
          </div>

          {footerColumns.map((column) => (
            <div key={column.title}>
              <h3 className="mb-3 text-sm font-semibold text-foreground">{column.title}</h3>
              <ul className="flex flex-col gap-2">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-muted hover:text-primary-600">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 md:flex-row">
          <p className="text-xs text-muted">
            &copy; {year} Bootcamp Sitesi. {t('footer.rights')}
          </p>
          <div className="flex gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.href}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-muted hover:text-primary-600"
                aria-label={social.label}
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
