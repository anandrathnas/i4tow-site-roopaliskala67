import { useState, type ReactNode } from 'react';
import type {
  Block, HeroBlock, RichTextBlock, GalleryBlock, MediaStoryBlock, FeatureGridBlock, CtaBlock, ScrollytellingBlock,
} from '@/lib/blocks';
import { Reveal } from './motion';

function Button({ href, children, variant = 'primary' }: { href: string; children: ReactNode; variant?: 'primary' | 'ghost' }) {
  const base = 'inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-transform duration-200 will-change-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-clay';
  const styles = variant === 'primary'
    ? 'bg-clay text-canvas hover:bg-clay-deep shadow-soft'
    : 'border border-line text-ink hover:border-clay hover:text-clay';
  return <a href={href} className={`${base} ${styles}`}>{children}</a>;
}

function Section({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <section className={`mx-auto w-full max-w-6xl px-6 py-20 md:py-28 ${className}`}>{children}</section>;
}

function Hero({ b }: { b: HeroBlock }) {
  return (
    <header className="relative overflow-hidden">
      {b.image && (
        <div className="absolute inset-0 -z-10">
          <img src={b.image} alt="" aria-hidden="true" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-canvas/70 via-canvas/60 to-canvas" />
        </div>
      )}
      <Section className="text-center md:py-36">
        {b.eyebrow && <Reveal as="p"><span className="text-sm font-medium uppercase tracking-[0.2em] text-clay">{b.eyebrow}</span></Reveal>}
        <Reveal as="h1"><span className="display-xl block max-w-4xl mx-auto mt-4 text-ink">{b.heading}</span></Reveal>
        {b.subheading && <Reveal as="p" delay={80}><span className="mx-auto mt-6 block max-w-2xl text-lg text-ink-soft">{b.subheading}</span></Reveal>}
        {b.cta && <Reveal delay={160}><div className="mt-9"><Button href={b.cta.href}>{b.cta.label}</Button></div></Reveal>}
      </Section>
    </header>
  );
}

function RichText({ b }: { b: RichTextBlock }) {
  const paras = b.markdown.split(/\n{2,}/).map((s) => s.trim()).filter(Boolean);
  return (
    <Section>
      {b.heading && <Reveal as="h2"><span className="display-lg block mb-8 text-ink">{b.heading}</span></Reveal>}
      <Reveal>
        <div className="max-w-3xl space-y-5 text-lg leading-relaxed text-ink-soft">
          {paras.map((p, i) => <p key={i}>{p}</p>)}
        </div>
      </Reveal>
    </Section>
  );
}

function Gallery({ b }: { b: GalleryBlock }) {
  const items = b.items ?? [];
  return (
    <Section>
      {b.heading && <Reveal as="h2"><span className="display-lg block mb-10 text-ink">{b.heading}</span></Reveal>}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5">
        {items.map((it, i) => (
          <Reveal key={i} delay={(i % 3) * 60}>
            <figure className="group overflow-hidden rounded-[var(--radius-card)] bg-surface shadow-soft">
              <img
                src={it.src}
                alt={it.alt ?? ''}
                width={it.width}
                height={it.height}
                loading="lazy"
                decoding="async"
                className="aspect-[4/5] w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </figure>
          </Reveal>
        ))}
        {items.length === 0 && <p className="col-span-full text-ink-soft">Add images to this gallery in your i4tow studio.</p>}
      </div>
    </Section>
  );
}

function FeatureGrid({ b }: { b: FeatureGridBlock }) {
  return (
    <Section>
      {b.heading && <Reveal as="h2"><span className="display-lg block mb-10 text-ink">{b.heading}</span></Reveal>}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {b.features.map((f, i) => (
          <Reveal key={i} delay={(i % 3) * 60}>
            <article className="h-full rounded-[var(--radius-card)] border border-line bg-surface/60 p-7">
              <h3 className="font-display text-xl text-ink">{f.title}</h3>
              <p className="mt-3 text-ink-soft">{f.body}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function Cta({ b }: { b: CtaBlock }) {
  return (
    <Section>
      <Reveal>
        <div className="rounded-[var(--radius-card)] bg-clay px-8 py-14 text-center text-canvas md:py-20">
          <h2 className="display-lg mx-auto max-w-3xl">{b.heading}</h2>
          {b.body && <p className="mx-auto mt-4 max-w-xl text-canvas/85">{b.body}</p>}
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {b.primary && <a href={b.primary.href} className="rounded-full bg-canvas px-6 py-3 text-sm font-medium text-clay-deep transition-transform hover:-translate-y-0.5">{b.primary.label}</a>}
            {b.secondary && <a href={b.secondary.href} className="rounded-full border border-canvas/40 px-6 py-3 text-sm font-medium text-canvas transition-transform hover:-translate-y-0.5">{b.secondary.label}</a>}
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

/** Bespoke art-directed scrollytelling: sticky media, step text reveals beside it. */
function Scrollytelling({ b }: { b: ScrollytellingBlock }) {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-20">
      <div className="grid gap-12 md:grid-cols-2">
        <div className="space-y-[60vh] md:space-y-[70vh]">
          {b.steps.map((s, i) => (
            <Reveal key={i}>
              <div>
                <span className="font-display text-clay text-sm">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="display-lg mt-2 text-ink">{s.heading}</h3>
                {s.body && <p className="mt-4 max-w-md text-lg text-ink-soft">{s.body}</p>}
              </div>
            </Reveal>
          ))}
        </div>
        <div className="hidden md:block">
          <div className="sticky top-24 overflow-hidden rounded-[var(--radius-card)] bg-surface shadow-soft">
            {b.steps[0]?.image && <img src={b.steps[0].image} alt="" className="aspect-[3/4] w-full object-cover" />}
          </div>
        </div>
      </div>
    </section>
  );
}

function MediaStory({ b }: { b: MediaStoryBlock }) {
  const [i, setI] = useState(0);
  const imgs = b.images ?? [];
  const n = imgs.length;
  const go = (d: number) => setI((p) => (n ? (p + d + n) % n : 0));
  const media = (
    <div className="relative overflow-hidden rounded-[var(--radius-card)] bg-surface shadow-soft">
      {n > 0 ? (
        <img src={imgs[i]!.src} alt={imgs[i]!.alt ?? ''} className="aspect-[4/3] w-full object-cover" />
      ) : (
        <div className="grid aspect-[4/3] place-items-center text-ink-soft">Add images in your studio</div>
      )}
      {n > 1 && (
        <>
          <button onClick={() => go(-1)} aria-label="Previous image" className="absolute left-3 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-canvas/85 text-ink shadow-soft hover:bg-canvas">‹</button>
          <button onClick={() => go(1)} aria-label="Next image" className="absolute right-3 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-canvas/85 text-ink shadow-soft hover:bg-canvas">›</button>
          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
            {imgs.map((_, j) => <span key={j} className={`h-1.5 w-1.5 rounded-full ${j === i ? 'bg-clay' : 'bg-canvas/70'}`} />)}
          </div>
        </>
      )}
    </div>
  );
  const story = (
    <div className="flex flex-col justify-center">
      <h2 className="display-lg text-ink">{b.heading}</h2>
      <p className="mt-4 text-lg leading-relaxed text-ink-soft">{b.story}</p>
    </div>
  );
  return (
    <Section>
      <Reveal>
        <div className="grid items-stretch gap-8 md:grid-cols-2">
          {(b.imageSide ?? 'left') === 'left' ? <>{media}{story}</> : <>{story}{media}</>}
        </div>
      </Reveal>
    </Section>
  );
}

export function BlockRenderer({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((b, i) => {
        switch (b.kind) {
          case 'hero': return <Hero key={i} b={b} />;
          case 'richText': return <RichText key={i} b={b} />;
          case 'gallery': return <Gallery key={i} b={b} />;
          case 'mediaStory': return <MediaStory key={i} b={b} />;
          case 'featureGrid': return <FeatureGrid key={i} b={b} />;
          case 'cta': return <Cta key={i} b={b} />;
          case 'scrollytelling': return <Scrollytelling key={i} b={b} />;
          default: return null;
        }
      })}
    </>
  );
}
