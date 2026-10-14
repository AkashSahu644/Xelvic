import { Link } from 'react-router-dom'
import { Download } from 'lucide-react'
import { footerColumns } from '../../data/nav'
import { socials } from '../../data/socials'
import Logo from '../ui/Logo'

/* The three documents people actually look for, given their own row rather than
   buried in a column. */
const legalBar = [
  { label: 'Privacy', to: '/privacy' },
  { label: 'Terms', to: '/terms' },
  { label: 'Your Data', to: '/data' },
]

/* The watermark sits centred in the footer rather than pinned to its bottom
   edge, so it reads as something the content sits on. It is declared before the
   content, so the content paints over it without needing a z-index.

   The tight leading is deliberate. An all-caps word has no descenders, so a
   normal line box reserves space for them and the letters end up sitting high
   of the true centre; a line-height under the cap height makes the box hug the
   letters instead. */
const WATERMARK =
  'pointer-events-none absolute inset-0 hidden select-none items-center justify-center overflow-hidden whitespace-nowrap font-display text-[19vw] font-bold leading-[0.72] tracking-tight text-white/[0.06] sm:flex'

export default function Footer() {
  return (
    <footer className="relative mt-10 overflow-hidden border-t border-white/10 bg-ink-800">
      {/* a hairline of brand light along the top, instead of a hard rule */}
      <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#ec4899]/60 to-transparent" />
      <div className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-blue/10 blur-[90px]" />

      <span aria-hidden className={WATERMARK}>
        XELVIC
      </span>

      <div className="wrap relative pt-12 pb-[calc(4rem+env(safe-area-inset-bottom))] sm:pt-16">
        {/* brand + sitemap */}
        <div className="grid grid-cols-[repeat(2,minmax(0,1fr))] gap-x-8 gap-y-8 sm:gap-10 lg:grid-cols-7">
          <div className="col-span-2 min-w-0 sm:col-span-2">
            <Logo to="/" size={32} />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/50">
              Chat, call, go live and vibe. One app for the people you talk to every
              day — and one that tells you what it does with what you give it.
            </p>

            <Link
              to="/download"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-grad px-5 py-3 text-sm font-bold text-white shadow-glow-sm transition-transform hover:-translate-y-0.5"
            >
              <Download size={15} />
              Get Xelvic
            </Link>

            <div className="mt-6 flex gap-2.5">
              {socials.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={`Xelvic on ${label}`}
                  title={label}
                  className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 text-white/60 transition-all duration-200 hover:-translate-y-0.5 hover:border-transparent hover:bg-brand-grad hover:text-white hover:shadow-[0_10px_22px_-10px_rgba(157,23,77,.6)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-800"
                >
                  <Icon size={17} />
                </a>
              ))}
            </div>
          </div>

          {footerColumns.map((col) => (
            <div key={col.heading} className="min-w-0">
              <h4 className="mb-4 text-xs font-bold uppercase tracking-wider text-white/40">
                {col.heading}
              </h4>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.to + l.label}>
                    <Link
                      to={l.to}
                      className="text-sm font-medium text-white/65 transition-colors hover:text-blue-glow"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* the bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-5 border-t border-white/10 pt-7 md:flex-row">
          <p className="text-sm text-white/40">
            © {new Date().getFullYear()} Xelvic. All rights reserved.
          </p>

          <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            {legalBar.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="text-sm font-semibold text-white/55 transition-colors hover:text-blue-glow"
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/help"
              className="text-sm font-semibold text-white/55 transition-colors hover:text-blue-glow"
            >
              Help
            </Link>
          </nav>

          <p className="text-xs text-white/30">
            Made for the people you talk to every day.
          </p>
        </div>

        <p className="mt-5 text-center text-xs text-white/30 md:text-left">
          Xelvic is not for anyone under 13.
        </p>
      </div>
    </footer>
  )
}
