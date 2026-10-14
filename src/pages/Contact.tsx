import { Link } from 'react-router-dom'
import PageHero from '../components/layout/PageHero'
import Reveal from '../components/ui/Reveal'
import ContactForm from '../components/ui/ContactForm'
import { Lede, Stats, Numbered, SectionHead, Prose, Note } from '../components/ui/Editorial'
import { NextLinks } from '../components/ui/Explainers'
import { CTABand } from '../components/sections/Bands'
import { useSEO } from '../hooks/usePageMeta'
import { before, doors, topics } from '../data/contact'

export default function Contact() {
  /* No arguments. The title, the share card, the WebPage and the ContactPage
     listing all nine addresses come from the route entry, built from the same
     `doors` array this page renders — so the nine addresses in the head are the
     nine a reader can see. */
  useSEO()

  return (
    <>
      <PageHero
        title={
          <>
            Reach a <span className="text-grad">person</span>, not a queue
          </>
        }
        sub="Nine addresses, each with one job. Pick the closest one and your message is already with the right people — every one of them is read by somebody who works on the thing you are writing about."
        wall="/media/walls/sheher.jpg"
      />

      <section className="pb-16">
        <div className="wrap">
          <Lede>
            There is no ticket number and no chatbot in front of this. Choose the address that fits,
            include the account handle when it is about your own account, and you will get a reply
            from a person who can actually do something about it.
          </Lede>
        </div>
      </section>

      {/* ————— the four promises ————— */}
      <section className="pb-20">
        <div className="wrap">
          <Stats
            items={[
              { value: '2 days', label: 'The usual reply', note: 'Most addresses answer within two working days, and usually sooner.' },
              { value: '24 hours', label: 'To acknowledge a security report', note: 'Security reports are acknowledged within a day, ahead of everything else in the queue.' },
              { value: '9', label: 'Addresses, each with one job', note: 'The address you choose does most of the routing for us.' },
              { value: 'Never', label: 'We ask for your password', note: 'Not by email, not by message, not on a call. Anyone who does is not us.' },
            ]}
          />
        </div>
      </section>

      {/* ————— where to write ————— */}
      <section className="section bg-ink-800">
        <div className="wrap max-w-4xl">
          <SectionHead
            kicker="Where to write"
            title="Nine doors, and what is behind each one"
            sub="Every one of these is a real inbox with a real owner. The line underneath says how long each one usually takes."
          />

          <Reveal>
            <dl className="mt-10 divide-y divide-plum/10 border-y border-plum/10">
              {doors.map((r) => (
                <div key={r.address} className="grid gap-2 py-6 sm:grid-cols-[210px_minmax(0,1fr)] sm:gap-8">
                  <dt className="text-[11px] font-bold uppercase tracking-[0.14em] text-plum/40 sm:pt-1">
                    {r.k}
                  </dt>
                  <dd className="min-w-0">
                    <a
                      href={`mailto:${r.address}`}
                      className="font-display text-lg font-bold text-pink-600 underline decoration-pink-500/30 underline-offset-4 transition-colors hover:decoration-pink-500"
                    >
                      {r.address}
                    </a>
                    <p className="mt-2.5 leading-relaxed text-white/60">{r.d}</p>
                    <p className="mt-3 text-[11px] font-bold uppercase tracking-[0.14em] text-plum/35">
                      {r.when}
                    </p>
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Note className="mt-12" title="One thing we will never do">
            We will never ask you for your password, your vault code or a code we have just sent
            you — not by email, not in a message and not on a call, and not to “verify” an account
            or release a payment. Password resets and vault unlocks happen inside the app, on a
            screen you opened yourself, after you have entered the password there. If somebody
            contacts you claiming to be from Xelvic and asks for any of those, it is not us: stop,
            and forward the message to{' '}
            <a href="mailto:security@xelvic.app" className="font-semibold text-pink-700 underline">
              security@xelvic.app
            </a>
            .
          </Note>
        </div>
      </section>

      {/* ————— before you write ————— */}
      <section className="section">
        <div className="wrap max-w-4xl">
          <SectionHead
            kicker="Before you write"
            title="Four things that get you a useful reply"
            sub="None of this is required. All of it saves a round trip, and a round trip is usually a day."
          />
          <Numbered className="mt-10" items={before} />

          <div className="mt-14">
            <Prose>
              <p>
                If you are writing about something you reported inside the app, give the report a
                moment before writing here. Reports are worked by moderators from the queue, and the
                outcome is shown to you — nobody is told that you reported them, and nothing happens
                to them on its own. Writing to support as well does not move a report up the queue,
                so it is usually worth waiting for the answer that is already coming.
              </p>
              <p>
                If what you need is an answer rather than a conversation, the{' '}
                <Link to="/help" className="font-semibold text-pink-700 underline">
                  Help Center
                </Link>{' '}
                covers how the app works screen by screen, and the{' '}
                <Link to="/data" className="font-semibold text-pink-700 underline">
                  Data page
                </Link>{' '}
                covers what we hold and what you can do about it. Both are faster than any inbox.
              </p>
            </Prose>
          </div>
        </div>
      </section>

      {/* ————— the form ————— */}
      <section className="section bg-ink-800">
        <div className="wrap max-w-2xl">
          <Reveal className="mb-8 text-center">
            <h2 className="font-display text-3xl font-bold md:text-4xl">Or write to us here</h2>
            <p className="mx-auto mt-4 max-w-lg leading-relaxed text-white/60">
              Same inbox, fewer decisions. Pick the closest topic and it is routed the same way the
              addresses above are — so if you already know which one fits, emailing it directly is
              quicker.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <ContactForm topics={topics} cta="Send it to a person" />
          </Reveal>
        </div>
      </section>

      <section className="pb-20 pt-20">
        <div className="wrap max-w-4xl">
          <NextLinks
            links={[
              { label: 'Help Center', to: '/help' },
              { label: 'Safety', to: '/safety' },
              { label: 'Security', to: '/security' },
              { label: 'Your Data', to: '/data' },
            ]}
          />
        </div>
      </section>

      <CTABand />
    </>
  )
}
