import { Link } from 'react-router-dom'

/* ─────────────────────────────────────────────────────────── the lockup ─── */

/**
 * The Xelvic lockup: the app icon and the name, in one place.
 *
 * The header, the footer and the phone mock-up were each picking their own
 * height and their own gap around the mark, which is how a lockup drifts — the
 * same icon ends up a different size relative to the word beside it on every
 * surface, and the spacing stops looking deliberate. Here the wordmark is
 * derived from the icon's height, so the two can only move together.
 *
 * The name is live type rather than part of the artwork. That keeps it crisp
 * at any density, keeps it in the site's own display face, and means the icon
 * needs no alt text — the text sitting next to it is the accessible name.
 */
const MARK = '/media/brand/xelvic.png'
const MARK_REVERSED = '/media/brand/xelvic_white.png'

type Props = {
  /** Height of the icon in px. The wordmark is set from it. */
  size?: number
  /** For plum surfaces: the reversed file, and white type. */
  reversed?: boolean
  /** Wrap the lockup in a link home. Leave off where it already sits in one. */
  to?: string
  className?: string
}

export default function Logo({ size = 30, reversed = false, to, className = '' }: Props) {
  const lockup = (
    <span className={`inline-flex select-none items-center gap-2.5 ${className}`}>
      <img
        src={reversed ? MARK_REVERSED : MARK}
        alt=""
        width={size}
        height={size}
        /* The file is a square plate with its corners already transparent.
           Re-applying the radius costs nothing and means the mark still reads
           as a squircle if it is ever swapped for an export that is not
           pre-rounded. */
        className="shrink-0 rounded-[22%] object-contain"
        style={{ width: size, height: size }}
      />
      <span
        className={`font-display font-extrabold lowercase leading-none tracking-tight ${
          reversed ? 'text-pure' : 'text-plum'
        }`}
        style={{ fontSize: Math.round(size * 0.82) }}
      >
        xelvic
      </span>
    </span>
  )

  if (!to) return lockup

  return (
    <Link
      to={to}
      className="inline-flex rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500"
    >
      {lockup}
    </Link>
  )
}
