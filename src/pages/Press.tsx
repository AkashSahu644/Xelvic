import { Link } from 'react-router-dom'
import PageHero from '../components/layout/PageHero'
import { Lede, Stats, Rows, Timeline, Pull, SectionHead, Prose, Note, DoDont } from '../components/ui/Editorial'
import { NextLinks } from '../components/ui/Explainers'
import { CTABand } from '../components/sections/Bands'
import { useSEO } from '../hooks/usePageMeta'
import { graph, webPageLd } from '../data/jsonld'

/* The facts a journalist actually needs, in the order they usually ask for
   them. Anything that is a claim about the app is a claim the app itself makes. */
const facts = [
  {
    k: 'Name',
    v: 'Xelvic',
    note: 'One word, capital X, no space and no hyphen. Never “Xelvic app” in a headline — the word is the name.',
  },
  {
    k: 'What it is',
    v: 'A social and messaging app for the people you actually talk to',
    note: 'Chat and calls sit at the centre; moments, live rooms, drops, music and a watch-together game sit around them, in the same app rather than in five.',
  },
  {
    k: 'Founded',
    v: '2024',
    note: 'A small remote-first team, building the app they wanted to open every day.',
  },
  {
    k: 'Where the team is',
    v: 'Remote-first, spread across time zones',
    note: 'There is no head office to visit, and decisions are written down rather than made in a room.',
  },
  {
    k: 'Platforms',
    v: 'iOS and Android',
    note: 'Built for the phone in your pocket, including the older one on the slower network.',
  },
  {
    k: 'Age',
    v: '13 and over',
    note: 'The gate sits in front of sign-up. Xelvic is not for anyone under 13, and that is enforced rather than stated.',
  },
  {
    k: 'Business model',
    v: 'Not advertising',
    note: 'There is no advertising profile of a user, and no conversation is read to decide what they see. Creator deals are paid collaborations, disclosed as such.',
  },
  {
    k: 'Press contact',
    v: 'press@xelvic.app',
    note: 'Interviews, assets, briefings and corrections all go to the same address, and reach a person.',
  },
]

/* Figures from the build. Each one is a number the app enforces somewhere, so a
   story that quotes one is quoting the product rather than a marketing deck. */
const numbers = [
  { value: '50', label: 'People in a circle', note: 'Pick what you are into and you land in a circle of fifty who chose the same thing.' },
  { value: '100', label: 'Days in the longest run', note: 'A Spark only moves when both people show up, all the way to a hundred.' },
  { value: '10', label: 'Pieces in a drop', note: 'Words, tags or a place — a drop can be found by any of them.' },
  { value: '30 min', label: 'The voice-note limit', note: 'A voice note stops itself at thirty minutes rather than growing without end.' },
]

const releases = [
  {
    k: 'September 2026',
    t: 'Xelvic launches: one app to chat, call, go live and vibe',
    d: 'The first public build brings messaging, calls, moments, live rooms with a stage, drops and vibes together in one app — with encrypted convos, device-side contact matching and an age gate in front of sign-up.',
  },
  {
    k: 'August 2026',
    t: 'Creator tools open, with brand deals agreed in the open',
    d: 'Brands invite creators, the brief is agreed on the record, the deliverable is uploaded and the payment releases on approval — the agreement and the payment sitting in the same place rather than in a thread.',
  },
  {
    k: 'June 2026',
    t: 'Themes and Drip arrive, so the app can look like you',
    d: 'Theme packs change how the app looks, and Drip changes what your character wears. Themes are rotated, spent with Sparks and applied to you rather than to anybody else.',
  },
  {
    k: 'April 2026',
    t: 'Circles, Sparks and Shields go into the build',
    d: 'A circle of fifty who chose the same interest, a counter that only moves when both people show up, and a Shield that can cover a missed day without wiping the run.',
  },
]

const assets = [
  {
    k: 'Logo pack',
    v: 'Available now',
    note: 'The primary logo and the app icon, on light and dark. Download them from the Brand Center — no request needed.',
  },
  {
    k: 'Screenshots',
    v: 'On request',
    note: 'Current, unretouched captures of the convo list, a thread, a live room, a drop and the vault, at both screen sizes.',
  },
  {
    k: 'Founder and team',
    v: 'On request',
    note: 'Bios, headshots and availability for interview, including the awkward questions.',
  },
  {
    k: 'Briefings',
    v: 'On request',
    note: 'A walkthrough of the app with somebody who builds it, and access to the data and security detail behind the claims on this site.',
  },
]

export default function Press() {
  useSEO({
    title: 'Press — Xelvic',
    description:
      'Company facts, figures from the build, how to describe Xelvic correctly, the release history and how to reach the communications team.',
    image: '/media/walls/sheher.jpg',
    jsonLd: graph(
      webPageLd({
        name: 'Xelvic press room',
        description:
          'Company facts, figures from the build, how to describe Xelvic correctly, the release history and how to reach the communications team.',
        path: '/press',
        image: '/media/walls/sheher.jpg',
        breadcrumbs: [
          { name: 'Home', path: '/' },
          { name: 'Press', path: '/press' },
        ],
      }),
    ),
  })

  return (
    <>
      <PageHero
        title={
          <>
            Everything you need to <span className="text-grad">write about us</span>
          </>
        }
        sub="The facts, the numbers the app actually enforces, the wording we would ask you to use, and one address that reaches a person."
        wall="/media/walls/sheher.jpg"
      />

      <section className="pb-16">
        <div className="wrap">
          <Lede>
            Most press pages make you dig for a founding date. This one is written in the order the
            questions usually arrive: what we are, where the numbers come from, how to say it
            correctly, what we have shipped, and how to reach somebody who can answer properly.
          </Lede>
        </div>
      </section>

      {/* ————— the boilerplate ————— */}
      <section className="pb-20">
        <div className="wrap">
          <Pull by="Lift-and-quote — the short description, in our own words">
            Xelvic is a social and messaging app for the people you actually talk to. Chat, calls,
            moments, live rooms and music in one app — with encrypted convos, contacts matched on
            your phone rather than on our servers, and no advertising profile of anybody.
          </Pull>
          <p className="mt-6 max-w-3xl text-sm leading-relaxed text-plum/55">
            That paragraph is free to use verbatim, in full or in part, without asking. If you need
            a different length, take the first sentence and stop — it stands on its own.
          </p>
        </div>
      </section>

      {/* ————— the numbers ————— */}
      <section className="pb-20">
        <div className="wrap">
          <SectionHead
            kicker="Xelvic in numbers"
            title="Figures the app enforces"
            sub="Not a marketing deck — each of these is a number the build acts on, which is why we are willing to have it quoted back at us."
          />
          <Stats className="mt-10" items={numbers} />
        </div>
      </section>

      {/* ————— fast facts ————— */}
      <section className="section bg-ink-800">
        <div className="wrap max-w-4xl">
          <SectionHead
            kicker="Fast facts"
            title="The company, on the record"
            sub="Eight rows, in the order they are usually asked for. Everything here is current and free to publish."
          />
          <Rows className="mt-10" items={facts} />
        </div>
      </section>

      {/* ————— wording ————— */}
      <section className="section">
        <div className="wrap max-w-4xl">
          <SectionHead
            kicker="Wording"
            title="How to describe Xelvic"
            sub="Two columns: the sentences that are accurate, and the ones that would have us writing a correction."
          />
          <div className="mt-10">
            <DoDont
              doLabel="Say this"
              dontLabel="Not this"
              dos={[
                '“Xelvic, a messaging and social app” — one word, capital X.',
                '“Encrypted convos” — the app says so on the convo screen itself.',
                '“Contacts are matched on the device” — the numbers never leave the phone in readable form.',
                '“Reports are reviewed by people” — there is no automatic punishment, and nobody is told who reported them.',
                '“Xelvic is for people 13 and over” — the gate is in front of sign-up.',
              ]}
              donts={[
                '“Xelvic” spelled with a lowercase x, a hyphen or a space.',
                '“End-to-end encrypted everything” — encryption covers convos and calls, not every surface in the app.',
                '“Anonymous” — it is not, and profiles carry a handle for a reason.',
                '“AI-moderated” — the queue is worked by moderators; automation flags, people decide.',
                '“Xelvic sells your data” — there is no advertising profile of a user to sell.',
              ]}
            />
          </div>
        </div>
      </section>

      {/* ————— releases ————— */}
      <section className="section bg-ink-800">
        <div className="wrap max-w-4xl">
          <SectionHead
            kicker="Newsroom"
            title="Release history"
            sub="Newest first. Where a release introduced a limit or a rule, the rule is what the app enforces."
          />
          <Timeline className="mt-10" items={releases} />
        </div>
      </section>

      {/* ————— assets + contact ————— */}
      <section className="section">
        <div className="wrap max-w-4xl">
          <SectionHead
            kicker="Assets"
            title="What we can send you"
            sub="The logo pack is self-serve. Everything else, ask and it goes out the same working day."
          />
          <Rows className="mt-10" items={assets} />

          <Note className="mt-12" title="Media enquiries">
            One address for interviews, assets, briefings, comment and corrections — and it reaches a
            person rather than a queue.{' '}
            <a href="mailto:press@xelvic.app" className="font-semibold text-pink-700 underline">
              press@xelvic.app
            </a>
            . We answer questions about the product, the numbers on this page and the decisions
            behind them; we will say so plainly when there is something we cannot talk about yet.
            Logos, colour values and type rules live in the{' '}
            <Link to="/brand" className="font-semibold text-pink-700 underline">
              Brand Center
            </Link>
            .
          </Note>

          <div className="mt-14">
            <Prose>
              <p>
                If you are writing about how we handle data, the{' '}
                <Link to="/data" className="font-semibold text-pink-700 underline">
                  Data page
                </Link>{' '}
                is written for exactly that purpose — what is held, where it is used, what you can
                do about it, and the parts that are less flattering to us. The security detail sits
                on the{' '}
                <Link to="/security" className="font-semibold text-pink-700 underline">
                  Security page
                </Link>{' '}
                and the rules people are held to sit on{' '}
                <Link to="/terms" className="font-semibold text-pink-700 underline">
                  Terms
                </Link>
                .
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
              { label: 'Brand Center', to: '/brand' },
              { label: 'Careers', to: '/careers' },
              { label: 'Contact', to: '/contact' },
            ]}
          />
        </div>
      </section>

      <CTABand />
    </>
  )
}
