import Image from 'next/image';
import type { Img } from '@/lib/content';

/* Copy is authored in Markdown and converted to a small, fixed set of inline
   tags by scripts/sync-copy.mjs (strong / em / a). Nothing user-supplied ever
   reaches this. */
export function Html({ html, as: Tag = 'p', className }: { html: string; as?: any; className?: string }) {
  return <Tag className={className} dangerouslySetInnerHTML={{ __html: html }} />;
}

export function ArchMark() {
  return (
    <svg className="cb-btn__arch" width="12" height="16" viewBox="0 0 24 32" fill="none" aria-hidden="true">
      <path d="M2 31 V20 Q2 8 12 2 Q22 8 22 20 V31" stroke="#264653" strokeWidth="2.6" strokeLinecap="round" />
    </svg>
  );
}

export function Cta({
  label,
  href,
  size = 'lg',
  arch = false,
}: {
  label: string;
  href: string;
  size?: 'lg' | 'md' | 'sm';
  arch?: boolean;
}) {
  const sizeClass = size === 'lg' ? ' cb-btn--lg' : size === 'sm' ? ' cb-btn--sm' : '';
  return (
    <a className={`cb-btn cb-btn--primary${sizeClass}`} href={href}>
      {arch ? <ArchMark /> : null}
      {label}
    </a>
  );
}

export function SectionHead({ title }: { title: string }) {
  return (
    <header className="cb-sechead">
      <div className="cb-sechead__ribbing" aria-hidden="true" />
      <h2 className="cb-sechead__title">{title}</h2>
    </header>
  );
}

export function Figure({
  img,
  alt,
  sizes = '(max-width: 860px) 100vw, 1152px',
  priority = false,
  wide = false,
  ink = false,
}: {
  img: Img;
  alt: string;
  sizes?: string;
  priority?: boolean;
  wide?: boolean;
  /* Sits the image on the deepest ink ground (#16303A) rather than a pale one.
     For the section drawing, whose own ground has been remapped to that value —
     the frame and the artwork then read as one intentional panel. */
  ink?: boolean;
}) {
  return (
    <figure className={`cb-figure${wide ? ' cb-figure--wide' : ''}${ink ? ' cb-figure--ink' : ''}`}>
      <div className="cb-figure__frame">
        <Image
          src={img.src}
          alt={alt}
          width={img.width}
          height={img.height}
          sizes={sizes}
          priority={priority}
        />
      </div>
    </figure>
  );
}

export function BeforeAfter({
  before,
  after,
  beforeAlt,
  afterAlt,
}: {
  before: Img;
  after: Img;
  beforeAlt: string;
  afterAlt: string;
}) {
  return (
    <div className="cb-beforeafter">
      <figure className="cb-ba">
        <div className="cb-ba__frame">
          <Image src={before.src} alt={beforeAlt} width={before.width} height={before.height} sizes="(max-width: 760px) 100vw, 560px" />
        </div>
        <figcaption className="cb-ba__tag">{before.tag}</figcaption>
      </figure>
      <figure className="cb-ba cb-ba--after">
        <div className="cb-ba__frame">
          <Image src={after.src} alt={afterAlt} width={after.width} height={after.height} sizes="(max-width: 760px) 100vw, 560px" />
        </div>
        <figcaption className="cb-ba__tag">{after.tag}</figcaption>
      </figure>
    </div>
  );
}

type Progress = {
  committed: number;
  total: number;
  pct: number;
  committedLabel: string;
  committedCaption: string;
  totalLabel: string;
  totalCaption: string;
  ariaLabel: string;
  ariaText: string;
};

/* The bar is the perforated wall: solid gold is what has been committed, the
   perforation is what is still open. Only --pct is set. */
export function ProgressBar({ p }: { p: Progress }) {
  return (
    <div className="cb-progress" style={{ ['--pct' as any]: `${p.pct}%` }}>
      <div className="cb-progress__figures">
        <p className="cb-progress__amount">
          {p.committedLabel} <span className="cb-progress__of">/ {p.totalLabel}</span>
        </p>
      </div>
      <div
        className="cb-progress__track"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={p.total}
        aria-valuenow={p.committed}
        aria-valuetext={p.ariaText}
        aria-label={p.ariaLabel}
      >
        <div className="cb-progress__fill" />
        <div className="cb-progress__seam" />
      </div>
      <div className="cb-progress__scale">
        <div className="cb-progress__mark cb-progress__mark--given">
          <b>{p.committedLabel}</b>
          <span>{p.committedCaption}</span>
        </div>
        <div className="cb-progress__mark cb-progress__mark--goal">
          <b>{p.totalLabel}</b>
          <span>{p.totalCaption}</span>
        </div>
      </div>
    </div>
  );
}

type Bank = {
  title: string;
  rows: { label: string; value: string; note?: string }[];
  foot: string | null;
  qr: { src: string; caption: string } | null;
};

export function GivingCard({ bank }: { bank: Bank }) {
  return (
    <div className="cb-give">
      <div>
        <div className="cb-give__head">
          <h3 className="cb-give__title">{bank.title}</h3>
        </div>
        {bank.rows.map((r) => (
          <div className="cb-give__row" key={r.label}>
            <p className="cb-give__label">{r.label}</p>
            <p className="cb-give__value">
              {r.value}
              {r.note ? <small>{r.note}</small> : null}
            </p>
          </div>
        ))}
      </div>
      {bank.qr ? (
        <div className="cb-give__qr">
          <div className="cb-give__qr-frame">
            <Image src={bank.qr.src} alt={bank.qr.caption} width={148} height={148} />
          </div>
          <p className="cb-give__qr-cap">{bank.qr.caption}</p>
        </div>
      ) : null}
      {bank.foot ? <Html className="cb-give__foot" html={bank.foot} /> : null}
    </div>
  );
}
