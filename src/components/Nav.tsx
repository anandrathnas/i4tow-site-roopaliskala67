import { useState } from 'react';

// No "Home" item — the logo links home (item #2).
const links = [
  { label: 'About', href: '/about/' },
  { label: 'Curriculum', href: '/curriculum/' },
  { label: 'Contact', href: '/contact/' },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="sticky top-0 z-40 border-b border-line/60 bg-canvas/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="/" className="font-display text-lg text-clay">Roopali&rsquo;s Kala</a>

        {/* Desktop links */}
        <ul className="hidden gap-6 text-sm text-ink-soft md:flex">
          {links.map((n) => (
            <li key={n.href}><a href={n.href} className="transition-colors hover:text-clay">{n.label}</a></li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          className="grid h-10 w-10 place-items-center text-ink md:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {open
              ? (<><line x1="6" y1="6" x2="18" y2="18" /><line x1="18" y1="6" x2="6" y2="18" /></>)
              : (<><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></>)}
          </svg>
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <ul className="border-t border-line/60 px-6 py-3 text-sm text-ink-soft md:hidden">
          {links.map((n) => (
            <li key={n.href} className="py-2">
              <a href={n.href} className="block transition-colors hover:text-clay" onClick={() => setOpen(false)}>{n.label}</a>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
