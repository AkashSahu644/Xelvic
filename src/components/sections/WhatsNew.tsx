import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import ConvoStory from '../ui/ConvoStory'
import Reveal from '../ui/Reveal'
import { newInXelvic } from '../../data/whatsNew'

export default function WhatsNew() {
  return (
    <section className="section relative overflow-hidden">
      <div className="aurora-bg aurora-bg--drift" />
      <div className="wrap">
        <SectionHeading
          title={
            <>
              Feel it and note it, <span className="text-grad">without leaving the chat</span>
            </>
          }
          sub="Sparks that count the days two people talk, and a convo where every Vibe, photo Drop and track can be felt and noted the moment it lands."
        />

        <p className="mx-auto mt-6 max-w-xl text-center text-sm font-semibold text-plum/45">
          The thread below is playing. Watch the heart fill, the note go on the post, and a
          Spark get sent and spent — the notes beside the phone light up as each one happens.
        </p>

        <ConvoStory className="mt-12" />

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {newInXelvic.map((it, i) => (
            <Reveal key={it.id} delay={i * 0.05} className="h-full">
              {/* each card jumps straight to that thing's block on /whats-new */}
              <Link
                to={`/whats-new#${it.id}`}
                className="glass-soft group flex h-full gap-4 rounded-2xl p-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-pink-soft"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-brand-grad text-plum shadow-glow-sm">
                  <it.icon size={19} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-1.5 font-bold">
                    {it.short}
                    <ArrowRight
                      size={14}
                      className="shrink-0 text-plum/30 transition-transform group-hover:translate-x-1 group-hover:text-pink-600"
                    />
                  </span>
                  <span className="mt-1 block text-sm leading-relaxed text-plum/55">
                    {it.summary}
                  </span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-10 flex justify-center">
            <Link to="/whats-new" className="btn btn-glow">
              See everything that&rsquo;s new
              <ArrowRight size={16} />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
