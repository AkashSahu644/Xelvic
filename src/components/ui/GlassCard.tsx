import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
  className?: string
  strong?: boolean
  as?: keyof JSX.IntrinsicElements
}

export default function GlassCard({ children, className = '', strong }: Props) {
  return (
    <div
      className={`rounded-3xl ${strong ? 'glass-strong' : 'glass'} ${className}`}
    >
      {children}
    </div>
  )
}
