import Link from 'next/link';

const footerColumns = [
  {
    title: 'Platform',
    links: [
      { href: '/bootcamps', label: "Bootcamp'ler" },
      { href: '/schedule', label: 'Program' },
      { href: '/about', label: 'Hakkımızda' },
    ],
  },
  {
    title: 'Kaynaklar',
    links: [
      { href: '/contact', label: 'İletişim' },
      { href: '/auth/login', label: 'Giriş Yap' },
      { href: '/auth/register', label: 'Kayıt Ol' },
    ],
  },
  {
    title: 'Yasal',
    links: [
      { href: '/privacy', label: 'Gizlilik Politikası' },
      { href: '/terms', label: 'Kullanım Koşulları' },
    ],
  },
];

const socialLinks = [
  { href: 'https://linkedin.com', label: 'LinkedIn' },
  { href: 'https://twitter.com', label: 'X (Twitter)' },
  { href: 'https://instagram.com', label: 'Instagram' },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="font-heading text-lg font-bold text-foreground">
              Bootcamp<span className="text-primary-600">.</span>
            </Link>
            <p className="mt-2 text-sm text-muted">
              Kariyerini bootcamp&apos;lerle bir üst seviyeye taşı.
            </p>
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
          <p className="text-xs text-muted">&copy; {year} Bootcamp Sitesi. Tüm hakları saklıdır.</p>
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
