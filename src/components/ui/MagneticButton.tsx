import { useRef, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

type Props = {
  children: ReactNode
  to?: string
  href?: string
  variant?: 'glow' | 'white' | 'ghost'
  className?: string
  onClick?: () => void
}

export default function MagneticButton({
  children,
  to,
  href,
  variant = 'glow',
  className = '',
  onClick,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - (rect.left + rect.width / 2)
    const y = e.clientY - (rect.top + rect.height / 2)
    setPos({ x: x * 0.25, y: y * 0.35 })
  }

  const reset = () => setPos({ x: 0, y: 0 })

  const inner = (
    <motion.span
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: 'spring', stiffness: 200, damping: 15, mass: 0.4 }}
      className={`btn btn-${variant} ${className}`}
    >
      {children}
    </motion.span>
  )

  if (to) return <Link to={to} onClick={onClick}>{inner}</Link>
  /* An absolute link leaves the site — the store listings are the ones that
     do — so it opens beside the page rather than replacing it, and without
     handing the listing a window handle back into xelvic.com. */
  if (href && /^https?:\/\//.test(href)) {
    return (
      <a href={href} onClick={onClick} target="_blank" rel="noopener noreferrer">
        {inner}
      </a>
    )
  }
  if (href) return <a href={href} onClick={onClick}>{inner}</a>
  return <button onClick={onClick} className="appearance-none bg-transparent">{inner}</button>
}
