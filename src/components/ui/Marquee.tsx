type Props = {
  items: string[]
  className?: string
}

export default function Marquee({ items, className = '' }: Props) {
  const row = (
    <div className="flex shrink-0 items-center gap-12 pr-12">
      {items.map((t, i) => (
        <span key={i} className="flex items-center gap-12 text-lg font-bold text-white/35">
          {t}
          <span className="text-blue-glow/60">✦</span>
        </span>
      ))}
    </div>
  )
  return (
    <div className={`mask-fade-x overflow-hidden ${className}`}>
      <div className="flex w-max animate-marquee">
        {row}
        {row}
      </div>
    </div>
  )
}
