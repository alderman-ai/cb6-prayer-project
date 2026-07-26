import Image from 'next/image';
import { content } from '@/lib/content';
import {
  BeforeAfter,
  Cta,
  Figure,
  GivingCard,
  Html,
  ProgressBar,
  SectionHead,
} from '@/components/blocks';

export default function Page() {
  const c = content();
  const anchor = `#${c.chrome.givingAnchor}`;

  return (
    <>
      <a className="cb-skip" href={anchor}>
        {c.chrome.skip}
      </a>

      {/* Header — logo only. No navigation links off this page. */}
      <header className="cb-header">
        <span className="cb-header__brand">
          <span className="cb-logo-plate">
            <Image src="/logo-var1.png" alt={c.chrome.brandAlt} width={514} height={118} priority />
          </span>
        </span>
        <Cta label={c.cta.label} href={anchor} size="sm" />
      </header>

      <main>
        {/* ---- Block 1 — Hero ---- */}
        <section className="cb-hero">
          <div>
            <p className="cb-hero__eyebrow">{c.chrome.eyebrow}</p>
            <h1 className="cb-hero__title">{c.hero.headline}</h1>
            <Html className="cb-hero__sub" html={c.hero.subhead} />
            <div className="cb-hero__actions">
              <Cta label={c.cta.label} href={anchor} size="lg" arch />
            </div>
            <Html className="cb-hero__reassure" html={c.hero.reassurance} />
          </div>
          <div className="cb-hero__media">
            <div className="cb-hero__frame">
              <Image
                src={c.hero.image.src}
                alt={c.hero.image.alt}
                width={c.hero.image.width}
                height={c.hero.image.height}
                sizes="(max-width: 860px) 100vw, 600px"
                priority
              />
            </div>
            <div className="cb-hero__perf" aria-hidden="true" />
          </div>
        </section>

        {/* ---- Block 2 — The story ---- */}
        <section className="cb-section cb-section--warm">
          <div className="cb-section__inner">
            <SectionHead title={c.story.heading} />
            <div className="cb-split">
              <div className="cb-prose">
                {c.story.body.map((p, i) => (
                  <Html key={i} html={p} />
                ))}
              </div>
              <Figure img={c.story.image} alt={c.story.image.alt} sizes="(max-width: 860px) 100vw, 560px" />
            </div>
          </div>
        </section>

        {/* ---- Block 3 — Before and after ---- */}
        <section className="cb-section">
          <div className="cb-section__inner">
            <SectionHead title={c.beforeAfter.heading} />
            <div className="cb-prose">
              {c.beforeAfter.body.map((p, i) => (
                <Html key={i} html={p} />
              ))}
            </div>
            <BeforeAfter
              before={c.beforeAfter.before}
              after={c.beforeAfter.after}
              beforeAlt={c.beforeAfter.before.alt}
              afterAlt={c.beforeAfter.after.alt}
            />
          </div>
        </section>

        {/* ---- Block 4 — Why it costs this much ---- */}
        <section className="cb-section cb-section--cool">
          <div className="cb-section__inner">
            <SectionHead title={c.cost.heading} />
            <div className="cb-prose">
              {c.cost.body.map((p, i) => (
                <Html key={i} html={p} />
              ))}
            </div>
            <Figure img={c.cost.image} alt={c.cost.image.alt} wide ink />
            <div className="cb-cta-row">
              <Cta label={c.cost.cta} href={anchor} />
            </div>
          </div>
        </section>

        {/* ---- Block 5 — Financial transparency ---- */}
        <section className="cb-section cb-section--warm-strong">
          <div className="cb-section__inner">
            <SectionHead title={c.money.heading} />
            <ProgressBar p={c.money.progress} />
            <div className="cb-figures">
              <table>
                <thead>
                  <tr>
                    {c.money.table.head.map((h, i) => (
                      <th key={i} scope="col">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {c.money.table.rows.map((row, i) => (
                    <tr key={i}>
                      {row.map((cell, j) =>
                        j === 0 ? (
                          <th key={j} scope="row" dangerouslySetInnerHTML={{ __html: cell }} />
                        ) : (
                          /* data-label carries the column head down into the cell so the
                             table can restack as labelled rows on narrow screens, where
                             the <thead> is hidden. See .cb-figures in globals.css. */
                          <td
                            key={j}
                            data-label={c.money.table.head[j]}
                            dangerouslySetInnerHTML={{ __html: cell }}
                          />
                        )
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="cb-prose" style={{ marginTop: 'var(--space-2xl)' }}>
              {c.money.body.map((p, i) => (
                <Html key={i} html={p} />
              ))}
            </div>
            <Html className="cb-credibility" html={c.money.credibility} />
          </div>
        </section>

        {/* ---- Block 6 — What your gift enables ---- */}
        <section className="cb-section">
          <div className="cb-section__inner">
            <SectionHead title={c.benefits.heading} />
            <div className="cb-cards">
              {c.benefits.items.map((item, i) => (
                <div className="cb-card" key={i}>
                  <h3 className="cb-card__title">{item.title}</h3>
                  <Html className="cb-card__body" html={item.body} />
                </div>
              ))}
            </div>
            <Figure img={c.benefits.image} alt={c.benefits.image.alt} />
          </div>
        </section>

        {/* ---- Block 7 — Giving details ---- */}
        <section className="cb-section cb-section--warm" id={c.chrome.givingAnchor}>
          <div className="cb-section__inner">
            <SectionHead title={c.give.heading} />
            <div className="cb-prose">
              {c.give.items.map((item, i) =>
                item.type === 'bank' ? (
                  <GivingCard key={i} bank={c.give.bank} />
                ) : (
                  <Html key={i} html={item.html as string} />
                )
              )}
            </div>
            <div className="cb-cta-row">
              <Cta label={c.give.cta} href={anchor} />
            </div>
          </div>
        </section>

        {/* ---- Block 8 — FAQ ---- */}
        <section className="cb-section">
          <div className="cb-section__inner">
            <SectionHead title={c.faq.heading} />
            <div className="cb-faq">
              {c.faq.items.map((item, i) => (
                <div className="cb-faq__item" key={i}>
                  <h3 className="cb-faq__q">{item.q}</h3>
                  <Html className="cb-faq__a" html={item.a} />
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* ---- Block 9 — Footer ---- */}
      <footer className="cb-footer">
        <div className="cb-footer__inner">
          <div className="cb-footer__top">
            <div className="cb-footer__org">
              {c.footer.org.map((p, i) => (
                <Html key={i} html={p} />
              ))}
            </div>
            <div className="cb-footer__contacts">
              {c.footer.contacts.map((p, i) => (
                <Html key={i} html={p} />
              ))}
            </div>
          </div>
          <div className="cb-footer__bottom">
            <span className="cb-footer__brand">
              <Image src="/logo-var1.png" alt={c.chrome.brandAlt} width={514} height={118} />
            </span>
            <div>
              {c.footer.fine.map((p, i) => (
                <Html key={i} className="cb-footer__fine" html={p} />
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
