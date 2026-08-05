import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import localFont from 'next/font/local';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import './globals.css';

const spaceGrotesk = localFont({
  src: '../fonts/SpaceGrotesk-Variable.ttf',
  variable: '--font-heading',
  weight: '300 700',
});

export const metadata: Metadata = {
  title: 'Bootcamp Sitesi',
  description: 'Bootcamp platformu — R1/R2/R3 ekip projesi',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      className={`${GeistSans.variable} ${GeistMono.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground">
        <Header />
        <div className="flex-1">{children}</div>
        <h1>test</h1>
        <Footer />
      </body>
    </html>
  );
}
