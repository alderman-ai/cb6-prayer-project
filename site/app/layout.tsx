import type { Metadata } from 'next';
import './globals.css';
import { content } from '@/lib/content';

const c = content();

export const metadata: Metadata = {
  title: c.meta.title,
  description: c.meta.description,
  metadataBase: new URL(c.url),
  alternates: { canonical: c.url },
  openGraph: {
    title: c.meta.title,
    description: c.meta.description,
    url: c.url,
    type: 'website',
    locale: c.lang === 'cs' ? 'cs_CZ' : 'en_US',
    images: [{ url: c.hero.image.src }],
  },
  icons: { icon: '/favicon.png' },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={c.lang}>
      <body>{children}</body>
    </html>
  );
}
