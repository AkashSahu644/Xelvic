import Reveal from '../ui/Reveal'

type Props = {
  eyebrow?: string
  title: React.ReactNode
  sub?: string
  wall?: string
}

export default function PageHero({ eyebrow, title, sub, wall }: Props) {
  return (
    <section className="relative overflow-hidden pt-[calc(9rem+env(safe-area-inset-top))] pb-16 md:pt-[calc(11rem+env(safe-area-inset-top))] md:pb-20">
      {/* ambient background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        {wall && (
          <>
            <img src={wall} alt="" className="h-full w-full object-cover opacity-30" />
            <div className="absolute inset-0 bg-gradient-to-b from-ink-900/60 via-ink-800/80 to-ink-900" />
          </>
        )}
        {/* A 120px blur is one of the more expensive things a phone can be
            asked to composite, so the blob is measured in the viewport rather
            than in fixed pixels: it is the same 700×400 from `sm` up, and a
            fraction of that on a phone, where it would otherwise be mostly
            off-screen anyway. */}
        <div className="absolute left-1/2 top-0 h-[min(400px,60vw)] w-[min(700px,110vw)] -translate-x-1/2 rounded-full bg-blue/20 blur-[120px]" />
      </div>
      <div className="wrap text-center">
        {eyebrow && (
          <Reveal>
            <span className="eyebrow mb-5">
              <span className="h-2 w-2 rounded-full bg-blue glow-dot" />
              {eyebrow}
            </span>
          </Reveal>
        )}
        <Reveal delay={0.05}>
          {/* Every page title on the site is a sentence rather than a word, and
              a fixed 48px on a 320px phone leaves three or four characters a
              line. It gives way to the viewport instead — down to 36px on the
              smallest phones, and back up to the 72px it has always been from
              `md`, where there is room for it.

              `text-wrap: balance` is the other half of that, and it is the
              half that only shows on a phone: at 320px a title breaks over
              three or four lines, and without balancing the last of them is
              whatever word happened to fall there — often one. Balanced, the
              lines come out close to even. Browsers that do not know the
              property ignore it. */}
          <h1 className="mx-auto max-w-4xl font-display text-[clamp(2.25rem,7vw,3rem)] font-bold leading-[1.05] tracking-tight [text-wrap:balance] md:text-[clamp(3.5rem,7.5vw,4.5rem)]">
            {title}
          </h1>
        </Reveal>
        {sub && (
          <Reveal delay={0.1}>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/60 md:text-xl">{sub}</p>
          </Reveal>
        )}
      </div>
    </section>
  )
}
