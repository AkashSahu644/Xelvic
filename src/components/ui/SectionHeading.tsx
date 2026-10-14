import Reveal from './Reveal'

type Props = {
  eyebrow?: string
  title: React.ReactNode
  sub?: string
  center?: boolean
  className?: string
}

export default function SectionHeading({ eyebrow, title, sub, center = true, className = '' }: Props) {
  return (
    <div className={`${center ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'} ${className}`}>
      {eyebrow && (
        <Reveal>
          <span className="eyebrow mb-4">
            <span className="h-2 w-2 rounded-full bg-blue glow-dot" />
            {eyebrow}
          </span>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        {/* `text-wrap: balance` matters most on a phone, where these headings
            are the widest thing on the screen and the fewest words fit per
            line: without it a two-word last line is a coin toss, and "A look
            for every you" is as likely to arrive as "A look for every / you"
            as it is balanced. Browsers that do not know the property ignore it
            and get the wrapping they always had. */}
        <h2 className="font-display text-4xl font-bold leading-tight tracking-tight [text-wrap:balance] md:text-5xl">
          {title}
        </h2>
      </Reveal>
      {sub && (
        <Reveal delay={0.1}>
          <p className="mt-4 text-lg leading-relaxed text-white/60">{sub}</p>
        </Reveal>
      )}
    </div>
  )
}
