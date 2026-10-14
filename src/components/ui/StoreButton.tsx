import type { ReactNode } from 'react'
import { FaApple, FaGooglePlay } from 'react-icons/fa6'
import MagneticButton from './MagneticButton'

type Store = 'apple' | 'google'

/**
 * The two store buttons.
 *
 * The only thing that changed here is the glyph. The header and the download
 * page used to carry a play triangle typed into the label and, for the App
 * Store, the Apple logo as a private-use character — which is not a logo at
 * all on any system whose font has no glyph for it, and rendered as an empty
 * box on most of them. Both are now the real brand marks from react-icons.
 *
 * Everything else is the site's own pill, because a store button that stops
 * looking like every other button on the page is a worse trade than a store
 * button that stops looking like Apple's: the gradient carries the primary
 * store and an outline carries the second, exactly as the two CTAs did before.
 */
const badges: Record<Store, { glyph: ReactNode; name: string }> = {
  /* The apple is a tall, narrow mark and the play triangle is a wide, short
     one, so matching them by point size leaves the apple looking shrunken
     beside the triangle. These two sizes are what makes the pair read as
     equal weight at 14px of type. */
  apple: { glyph: <FaApple size={17} />, name: 'App Store' },
  google: { glyph: <FaGooglePlay size={16} />, name: 'Google Play' },
}

type Props = {
  store: Store
  /** Which of the site's button styles this instance wears. */
  variant?: 'glow' | 'white' | 'ghost'
  /** An in-site route — what the CTA bands use to hand off to /download. */
  to?: string
  /** The store listing itself. */
  href?: string
  className?: string
}

export default function StoreButton({
  store,
  variant = 'glow',
  to,
  href,
  className = '',
}: Props) {
  const b = badges[store]

  return (
    <MagneticButton variant={variant} to={to} href={href} className={className}>
      {/* The glyph inherits the button's own colour, so it stays legible on
          the gradient, on the outline and on the dark variant without a
          colour being named here. */}
      {b.glyph}
      {b.name}
    </MagneticButton>
  )
}
