import { Link } from 'react-router-dom'
import PageHero from '../components/layout/PageHero'
import Reveal from '../components/ui/Reveal'
import { Lede, Stats, Rows, Numbered, Pull, SectionHead, Prose, Note } from '../components/ui/Editorial'
import { NextLinks } from '../components/ui/Explainers'
import { CTABand } from '../components/sections/Bands'
import { jobs, departments } from '../data/jobs'
import { useSEO } from '../hooks/usePageMeta'
import { graph, webPageLd } from '../data/jsonld'

/* The surfaces a new person would actually own, described in terms of what the
   app does rather than in terms of a stack. Each one carries a line from the
   build, so the work is legible before the interview. */
const surfaces = [
  {
    t: 'Messaging and calls',
    d: 'The convo list, the thread, voice notes, groups and channels, and calls that hold up on a bad connection. This is the surface most people open the app for, and the one with the least room for a rough edge — a dropped call is remembered for a long time.',
    app: 'Hold the mic to record. Slide up to lock it, left to cancel.',
  },
  {
    t: 'Moments, drops and vibes',
    d: 'What people put up and who gets to see it. A moment is gone from the feed the next day and kept in Memories; a drop holds up to ten pieces and can be found by its words, its tag or its place; a vibe is a video and stays up until its author takes it down.',
    app: 'A drop holds up to 10 pieces.',
  },
  {
    t: 'Live rooms, stages and games',
    d: 'Voices-only rooms with a stage, an audience and a host who hands out the microphones. Watch-together games put a board on the screen everybody is already looking at, and two people play while the rest of the room watches.',
    app: 'Only the stage can play. Raise your hand to be brought up.',
  },
  {
    t: 'Sparks, themes and Drip',
    d: 'The counter that only moves when both people show up, the Shields that cover a missed day, and the theme system that changes how the app looks and what your character wears — rotated, spent with Sparks, applied to you rather than to anybody else.',
    app: 'One banks each week, up to ',
  },
  {
    t: 'Trust, safety and moderation',
    d: 'The queue a report lands in, the console a moderator works from, and the tools — blocking, comment controls, audience settings, the age gate — that stop problems before they need a report at all. Small team, human review, real consequences.',
    app: 'A moderator will look at it. Nobody is told you reported this, and nothing happens to them on its own.',
  },
  {
    t: 'Creators, deals and payments',
    d: 'Brands invite creators, a brief is agreed in the open, a deliverable is uploaded and the payment releases on approval. Deal work is half product and half trust: money moving between two parties who have never met needs to be legible at every step.',
    app: 'Invite creators to make content and track paid deals, agreement to payment, in the open.',
  },
]

const hiring = [
  {
    t: 'You write to us',
    d: 'One email, the role in the subject line, and something you have made that you are happy to talk about. A CV on its own is fine but it is the weakest thing you can send us; a link to something working is the strongest.',
  },
  {
    t: 'A conversation',
    d: 'About thirty minutes with the person who would be your manager, mostly about work you have done. No whiteboard, no trick questions, and no asking you to invert a tree on a call.',
  },
  {
    t: 'A work sample, paid',
    d: 'A small piece of real work, scoped to a few hours and paid at our normal rate. You keep what you make. We would rather pay for an hour of your time than ask for a free weekend.',
  },
  {
    t: 'Meet the team',
    d: 'The people you would work with day to day, and a slot for the awkward questions — what is broken, what we have got wrong, what the last six months actually looked like.',
  },
  {
    t: 'An answer either way',
    d: 'Within a week of the last conversation, whether it is a yes or a no, with a reason. Nobody is left waiting to find out they were a maybe.',
  },
]

/* Stated as facts about the job rather than as a wall of perks. */
const offer = [
  {
    k: 'Where you work',
    v: 'Remote, with the hours that actually suit you',
    note: 'The team is spread across time zones. We ask for a few hours of overlap, not for you to be online at a fixed hour.',
  },
  {
    k: 'What you own',
    v: 'A surface, end to end',
    note: 'People here own a part of the app rather than a ticket queue — from the design argument through to the release and the support messages that follow it.',
  },
  {
    k: 'How you are paid',
    v: 'A salary and equity, for everyone',
    note: 'Equity is not reserved for a senior tier. If you are building the thing, you have a stake in the thing.',
  },
  {
    k: 'How you grow',
    v: 'A learning budget and real time to use it',
    note: 'Courses, conferences, books, or a week on something adjacent that you think we should be doing. Asked for once, not rationed.',
  },
  {
    k: 'What you get to use',
    v: 'The gear you need, chosen by you',
    note: 'A phone that can run the app properly matters more here than a chair, so that one is not a negotiation.',
  },
  {
    k: 'What we do not do',
    v: 'Crunch, or shipping something we cannot stand behind',
    note: 'A date is not a reason to break one of the four decisions on the About page. If those two ever conflict, the date moves.',
  },
]

export default function Careers() {
  useSEO({
    title: 'Careers — Xelvic',
    description:
      'Open roles at Xelvic, the surfaces you would own, how the hiring process actually works, and what the job is like in practice.',
    image: '/media/walls/studio.jpg',
    jsonLd: graph(
      webPageLd({
        name: 'Careers at Xelvic',
        description:
          'Open roles at Xelvic, the surfaces you would own, how the hiring process actually works, and what the job is like in practice.',
        path: '/careers',
        image: '/media/walls/studio.jpg',
        breadcrumbs: [
          { name: 'Home', path: '/' },
          { name: 'Careers', path: '/careers' },
        ],
      }),
    ),
  })

  return (
    <>
      <PageHero
        title={
          <>
            Build the app people <span className="text-grad">open first</span>
          </>
        }
        sub="A small, remote-first team building one app for the people you actually talk to. The roles below are written in terms of what you would own, not in terms of a stack."
        wall="/media/walls/studio.jpg"
      />

      <section className="pb-16">
        <div className="wrap">
          <Lede>
            There are {jobs.length} open roles across {departments.length} teams. Every one of them
            is a surface of the app rather than an abstract function — the convo list, the rooms, the
            moderation queue, the theme system, the deal flow. If you have used the app and found
            something that annoyed you, that is a reasonable place to start.
          </Lede>
        </div>
      </section>

      <section className="pb-20">
        <div className="wrap">
          <Stats
            items={[
              { value: String(jobs.length), label: 'Open roles', note: 'Listed below, each with the surface it owns.' },
              { value: 'Remote', label: 'Where the team works', note: 'A few hours of overlap, not a fixed hour online.' },
              { value: 'Paid', label: 'Every work sample', note: 'Scoped to a few hours and paid at our normal rate.' },
              { value: String(hiring.length), label: 'Steps in the process', note: 'No whiteboard, and an answer either way within a week.' },
            ]}
          />
        </div>
      </section>

      {/* ————— what you would work on ————— */}
      <section className="section bg-ink-800">
        <div className="wrap max-w-4xl">
          <SectionHead
            kicker="The work"
            title={
              <>
                What you would <span className="text-grad">actually work on</span>
              </>
            }
            sub="Six surfaces, described in the app’s own terms. Each one ends with a line from the build, because that is the standard the work is held to."
          />
          <Numbered className="mt-10" items={surfaces} />
        </div>
      </section>

      {/* ————— open roles ————— */}
      <section className="section">
        <div className="wrap max-w-4xl">
          <SectionHead
            kicker="Open roles"
            title="Who we are looking for"
            sub="Grouped by team. Every role says where it sits, what kind of contract it is, and what the first six months would look like."
          />

          <div className="mt-12 space-y-12">
            {departments.map((dept) => {
              const list = jobs.filter((j) => j.team === dept)
              if (!list.length) return null
              return (
                <div key={dept}>
                  <div className="flex items-baseline justify-between gap-4 border-b border-plum/15 pb-3">
                    <h3 className="font-display text-lg font-bold">{dept}</h3>
                    <span className="text-xs font-semibold uppercase tracking-[0.14em] text-plum/40">
                      {list.length} {list.length === 1 ? 'role' : 'roles'}
                    </span>
                  </div>

                  <div className="divide-y divide-plum/10">
                    {list.map((j) => (
                      <Reveal key={j.id}>
                        <Link
                          to={`/careers/${j.id}`}
                          className="group block py-6 transition-colors"
                        >
                          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                            <h4 className="font-display text-xl font-bold leading-snug transition-colors group-hover:text-pink-700 md:text-2xl">
                              {j.title}
                            </h4>
                            <span className="text-xs font-bold uppercase tracking-[0.14em] text-plum/40">
                              {j.location} · {j.type}
                            </span>
                          </div>
                          <p className="mt-2.5 max-w-2xl leading-relaxed text-white/55">
                            {j.summary}
                          </p>
                          <span className="mt-3 inline-block text-sm font-semibold text-pink-600 group-hover:underline">
                            Read the role
                          </span>
                        </Link>
                      </Reveal>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>

          <Note className="mt-12" title="Nothing here fits?">
            Write to us anyway. Tell us what you would build, what you would fix first, and why you
            are the person for it — a good argument beats a matching job title.{' '}
            <a href="mailto:careers@xelvic.app" className="font-semibold text-pink-700 underline">
              careers@xelvic.app
            </a>
          </Note>
        </div>
      </section>

      {/* ————— hiring ————— */}
      <section className="section bg-ink-800">
        <div className="wrap max-w-4xl">
          <SectionHead
            kicker="The process"
            title="How hiring works here"
            sub="Five steps, no take-home that eats a weekend, and an answer either way."
          />
          <Numbered className="mt-10" items={hiring} />
        </div>
      </section>

      {/* ————— what the job is like ————— */}
      <section className="section">
        <div className="wrap max-w-4xl">
          <SectionHead
            kicker="In practice"
            title="What the job is actually like"
            sub="Six facts, in place of a page of perks."
          />
          <Rows className="mt-10" items={offer} />

          <div className="mt-14">
            <Pull by="The bar we hold ourselves to">
              Ship it on the cheaper phone, on the worse network, or do not ship it.
            </Pull>
          </div>

          <div className="mt-14">
            <Prose>
              <p>
                We are not looking for people who have shipped at a certain scale, and we are not
                looking for a particular set of logos on a CV. We are looking for people who care
                about how a thing feels when somebody who is not technical uses it for the first
                time — and who will argue for that when it is inconvenient.
              </p>
              <p>
                What we are not looking for is a strong opinion held loosely: somebody who will
                agree with the loudest voice in the room, or who would rather ship something fast
                than ship something that holds. Both of those are easier to hire for and worse to
                work with.
              </p>
            </Prose>
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="wrap max-w-4xl">
          <NextLinks
            links={[
              { label: 'About us', to: '/about' },
              { label: 'Press', to: '/press' },
              { label: 'Contact', to: '/contact' },
              { label: 'How it works', to: '/how-it-works' },
            ]}
          />
        </div>
      </section>

      <CTABand />
    </>
  )
}
