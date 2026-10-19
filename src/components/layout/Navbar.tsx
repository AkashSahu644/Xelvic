import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown, Building2, Download, ArrowRight } from 'lucide-react'
import { productMenu, resourcesMenu } from '../../data/nav'
import type { NavGroup } from '../../data/nav'
import { site } from '../../data/site'
import MagneticButton from '../ui/MagneticButton'
import Logo from '../ui/Logo'

/* Only Product and Resources open a panel now — Company is a plain link
 * straight into /about, and its five destinations (Careers, Press,
 * Community, Contact, About) still have a home in the footer sitemap. */
const menus: { label: string; groups: NavGroup[] }[] = [
  { label: 'Product', groups: productMenu },
  { label: 'Resources', groups: resourcesMenu },
]

const plainLinks: { label: string; to: string; icon: typeof Building2 }[] = [
  { label: 'Company', to: '/about', icon: Building2 },
  { label: 'Download', to: '/download', icon: Download },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState<string | null>(null)
  const [mobile, setMobile] = useState(false)
  const location = useLocation()
  const active = menus.find((m) => m.label === open) ?? null

  /* One treatment, not two. The bar used to open "bare" on the home page —
     no glass, white type, the reversed logo — because the hero it sat on was
     a full screen of near-black and neither glass nor plum type was readable
     over it. That hero is pink now, and there is no dark bed left anywhere on
     the site, so the light-page treatment is the only one the bar needs. */
  const linkOn = 'bg-white/10 text-white'
  const linkOff = 'text-white/80 hover:text-white'
  const linkActive = 'text-pink-600'

  /* The sign-in button. An outline rather than a fill, so it does not compete
     with "Get Xelvic" sitting next to it: signing in is for somebody who
     already has the app, and the download is what the bar is selling. It
     leaves for the web app, which is why it is an anchor and not a route.
     The outline is a `ring` and not a `border` on purpose — a border would
     make this button two pixels wider and two pixels taller than the one
     beside it, and the two are meant to be the same button. */
  const loginCls = 'ring-plum/20 text-plum hover:ring-plum/45 hover:bg-pink-500/10'

  useEffect(() => {
    /* The threshold is the height of the hero, not a fixed 20px. Flipping to
       glass after twenty pixels of scroll would put a bar across the hero for
       the whole time the hero is on screen, which is not what a masthead that
       is meant to stay out of the way looks like. */
    const onScroll = () => {
      const trigger = location.pathname === '/' ? window.innerHeight - 96 : 20
      setScrolled(window.scrollY > trigger)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [location.pathname])

  useEffect(() => {
    setMobile(false)
    setOpen(null)
  }, [location.pathname])

  // Close any open mega-menu / drawer on Escape.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(null)
        setMobile(false)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-blue focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-white focus:shadow-lg"
      >
        Skip to content
      </a>
      <div
        className={`pt-safe transition-all duration-300 ${
          scrolled ? 'glass-strong border-b border-white/10' : 'border-b border-transparent'
        }`}
      >
        <nav className="wrap flex h-[72px] items-center justify-between">
          <Logo to="/" size={30} />

          {/* Desktop menu. The panel hangs off this CONTAINER, not off the
           * trigger that opened it: at the 1024px breakpoint a 746px panel
           * centred under "Product" — the leftmost trigger — would hang off
           * the left edge of the screen. Anchored here it stays centred under
           * the whole cluster, which is what a mega-menu is meant to do. */}
          <div className="relative hidden items-center gap-1 lg:flex" onMouseLeave={() => setOpen(null)}>
            {menus.map((m) => (
              <button
                key={m.label}
                className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  open === m.label ? linkOn : linkOff
                }`}
                aria-haspopup="true"
                aria-expanded={open === m.label}
                onMouseEnter={() => setOpen(m.label)}
                onFocus={() => setOpen(m.label)}
                onClick={() => setOpen((v) => (v === m.label ? null : m.label))}
              >
                {m.label}
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-200 ${open === m.label ? 'rotate-180' : ''}`}
                />
              </button>
            ))}

            {plainLinks.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                /* these have no panel, so dismiss any open one */
                onMouseEnter={() => setOpen(null)}
                className={({ isActive }) =>
                  `rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                    isActive ? linkActive : linkOff
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}

            <AnimatePresence>
              {active && (
                /* Positioning lives on the OUTER element because Framer writes
                 * its own inline `transform` on the inner one — two transforms
                 * on one node and the `-translate-x-1/2` that centres the
                 * panel gets clobbered. */
                <motion.div
                  key={active.label}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.16 }}
                  className="absolute left-1/2 top-full -translate-x-1/2 pt-3"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 12, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ duration: 0.22, ease: [0.22, 0.68, 0.24, 1] }}
                    /* glass-strong already ships a border + inset highlight;
                     * the drop shadow goes in the same arbitrary value so a
                     * separate `shadow-*` utility can't clobber the inset. */
                    className="glass-strong relative w-max max-w-[760px] overflow-hidden rounded-[26px] shadow-[inset_0_1px_0_rgba(255,255,255,1),0_34px_80px_-30px_rgba(157,23,77,.45)]"
                  >
                    {/* Three typographic columns — no boxes, no icon tiles.
                     * The structure comes from the rule under each heading
                     * and the pink underline that sweeps in under whatever
                     * label you are pointing at. */}
                    <div
                      className="grid gap-x-10 gap-y-7 px-7 pb-6 pt-7"
                      style={{
                        gridTemplateColumns: `repeat(${active.groups.length}, minmax(184px, 1fr))`,
                      }}
                    >
                      {active.groups.map((g) => (
                        <div key={g.heading}>
                          <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-plum/45">
                            {g.heading}
                          </p>
                          <span
                            aria-hidden
                            className="mt-3 block h-px w-full bg-gradient-to-r from-pink-400 to-transparent"
                          />
                          <ul className="mt-3.5 space-y-1">
                            {g.links.map((l) => (
                              <li key={l.to}>
                                <Link
                                  to={l.to}
                                  className="group relative inline-block py-1.5 text-[15px] font-semibold text-plum/70 transition-colors duration-200 hover:text-plum"
                                >
                                  {l.label}
                                  <span
                                    aria-hidden
                                    className="absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0 rounded-full bg-brand-grad transition-transform duration-300 ease-out group-hover:scale-x-100"
                                  />
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>

                    {/* footer strip — grounds the sheet and carries the CTA */}
                    <div className="flex items-center justify-between gap-6 border-t border-white/10 bg-ink-800/50 px-7 py-3.5">
                      <p className="text-xs font-semibold text-plum/50">
                        Free · Android &amp; iOS · 33 themes
                      </p>
                      <Link
                        to="/download"
                        className="group flex items-center gap-1.5 text-xs font-bold text-pink-600"
                      >
                        Get Xelvic
                        <ArrowRight
                          size={13}
                          className="transition-transform duration-200 group-hover:translate-x-0.5"
                        />
                      </Link>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* The two are the same button twice over: same padding, same type,
              same height. `.btn` is the site's own button shape, and taking it
              rather than hand-rolling a smaller pill is the only thing that
              stops them drifting apart the next time one of them is touched. */}
          <div className="hidden items-center gap-2.5 lg:flex">
            <a
              href={site.web}
              className={`btn ring-1 ring-inset hover:-translate-y-0.5 ${loginCls}`}
            >
              Log in
            </a>
            <MagneticButton to="/download" variant="glow">
              Get Xelvic
            </MagneticButton>
          </div>

          {/* Phone and tablet carry the same pair, with the sign-in button
              pulled in to `px-4` so it fits beside the logo: at 320px the
              logo, this button and the toggle come to roughly 255px of the
              280px the gutter leaves. From `sm` up it takes the full `px-6`
              and is once again the identical button the desktop bar shows. */}
          <div className="flex items-center gap-2 lg:hidden">
            <a
              href={site.web}
              className={`btn px-4 ring-1 ring-inset sm:px-6 ${loginCls}`}
            >
              Log in
            </a>
            {/* 44px rather than 40: it is the only control in the bar on a
                phone and it sits in the top corner, where a thumb is least
                accurate. */}
            <button
              className="glass-soft grid h-11 w-11 place-items-center rounded-full"
              onClick={() => setMobile((v) => !v)}
              aria-label={mobile ? 'Close menu' : 'Open menu'}
              aria-expanded={mobile}
              aria-controls="mobile-nav"
            >
              {mobile ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobile && (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="glass-strong overflow-hidden border-b border-white/10 lg:hidden"
          >
            {/* `overscroll-contain` keeps a flick past the end of the drawer
                from scrolling the page underneath it, and the bottom padding
                carries the home indicator rather than letting the last link
                sit under it.

                The cap is written twice on purpose. `vh` on a phone is the
                height the page would have with the browser's own bars tucked
                away, so a drawer capped at 75vh is taller than three quarters
                of what is actually on screen — and its last row, which is the
                pair of buttons, ends up below the fold. `dvh` tracks the bars
                as they come and go, so it is the number that means what it
                says; the class is what older browsers fall back to. */}
            <div
              className="wrap max-h-[75vh] space-y-6 overflow-y-auto overscroll-contain pt-6 pb-[calc(1.5rem+env(safe-area-inset-bottom))]"
              style={{ maxHeight: '75dvh' }}
            >
              {menus.map((m) => (
                <div key={m.label}>
                  <p className="mb-2 text-xs font-bold uppercase tracking-wider text-blue-glow">{m.label}</p>
                  <div className="space-y-3">
                    {m.groups.map((g) =>
                      g.links.map((l) => {
                        const Icon = l.icon
                        return (
                          <Link
                            key={l.to}
                            to={l.to}
                            className="flex items-center gap-3 text-base font-semibold text-white/85"
                          >
                            {Icon && (
                              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-white/10 text-blue-glow">
                                <Icon size={15} />
                              </span>
                            )}
                            {l.label}
                          </Link>
                        )
                      })
                    )}
                  </div>
                </div>
              ))}

              {/* same two links the desktop bar shows after the panels */}
              <div className="space-y-3 border-t border-white/10 pt-6">
                {plainLinks.map((l) => {
                  const Icon = l.icon
                  return (
                    <Link
                      key={l.to}
                      to={l.to}
                      className="flex items-center gap-3 text-base font-semibold text-white/85"
                    >
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-white/10 text-blue-glow">
                        <Icon size={15} />
                      </span>
                      {l.label}
                    </Link>
                  )
                })}
              </div>

              {/* The bar's pair again, stacked for a thumb and matched to each
                  other the same way — `.btn` plus `w-full` is exactly what the
                  MagneticButton below renders. */}
              <div className="flex flex-col gap-3">
                <a
                  href={site.web}
                  className={`btn w-full ring-1 ring-inset ${loginCls}`}
                >
                  Log in
                </a>
                <MagneticButton to="/download" variant="glow" className="w-full">
                  Get Xelvic
                </MagneticButton>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
