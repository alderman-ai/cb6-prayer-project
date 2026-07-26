import en from '@/content/en.json';
import cz from '@/content/cz.json';

export type Img = { src: string; from: string; width: number; height: number; tag?: string };

export type Content = typeof en;

const LOCALES = { en, cz } as const;

export function locale(): 'en' | 'cz' {
  const l = (process.env.SITE_LOCALE || 'en').toLowerCase();
  return l === 'cz' || l === 'cs' ? 'cz' : 'en';
}

export function content(): Content {
  return LOCALES[locale()] as unknown as Content;
}
