import { Link } from 'react-router-dom'
import PageHero from '../components/layout/PageHero'
import Reveal from '../components/ui/Reveal'
import { Lede, Stats, Rows, Numbered, Timeline, Pull, SectionHead, Prose, Note } from '../components/ui/Editorial'
import { NextLinks } from '../components/ui/Explainers'
import { CTABand } from '../components/sections/Bands'
import { useSEO } from '../hooks/usePageMeta'
import { graph, webPageLd } from '../data/jsonld'

/* The four things we settled on before there was an app to argue about. Each
   one is a decision with a consequence in the build, not a value on a poster. */
const principles = [
  {
    t: 'A promise written inside the app counts for more than one written on a page',
    d: 'Wherever the app makes a claim, it makes it on the screen the claim applies to — a convo says it is encrypted, the vault says the code cannot be recovered, the sign-up says the age gate is real. A policy page is where the details live, not where the promises start.',
    app: 'This convo is encrypted',
  },
  {
    t: 'Nothing irreversible happens without being said out loud first',
    d: 'The parts of Xelvic with no undo are the parts that warn you before you commit: a vault reset with a lock set, disappearing messages, leaving a group, deleting an account. The warning is the feature.',
    app: 'Your account will be deleted in 30 days. Log in again to recover it.',
  },
  {
    t: 'Your phone does the deciding wherever it can',
    d: 'Contacts are matched on the device rather than uploaded, sessions are listed so you can see every phone the account is open on, and the first device needs your password before it can be removed. The work happens as close to you as it can.',
    app: 'Allow contacts and everyone in your phone who is already on Xelvic shows up right here. Numbers never leave your device in readable form.',
  },
  {
    t: 'The person holding the phone comes before the feature',
    d: 'That is why a run only counts if both people show up, why a group cannot quietly accumulate people you never agreed to, and why the app would rather refuse a sign-up than let somebody under 13 through it.',
    app: 'Nobody else sees this. Xelvic is not for anyone under 13.',
  },
]

/* Company history. The years are ours; where a year contains a claim about the
   app, the claim is one the app itself makes. */
const history = [
  {
    k: '2024',
    t: 'The spark',
    d: 'A small team set out to build one app for the people you actually talk to — instead of five apps that each do a slice of it. The first sketches were of a convo list, a call button and a counter that only moves when two people both show up.',
  },
  {
    k: '2025',
    t: 'First builds',
    d: 'Chat, calls and moments came together, and the first theme packs went in. This is the year the Vault was designed, the age gate went in front of sign-up, and the contact matching moved onto the device rather than onto a server.',
  },
  {
    k: '2026',
    t: 'Hello, world',
    d: 'Xelvic opens up: live rooms with a stage and a host, drops and vibes, music you keep, circles of fifty, and a creator economy where the agreement and the payment sit in the same place.',
  },
  {
    k: 'Next',
    t: 'The long game',
    d: 'The plan is not a new app every year. It is the same app, getting quicker on the phone you already own, and keeping the promises above true as more people arrive.',
  },
]

/* How the company runs, stated as facts rather than as perks. */
const howWeWork = [
  {
    k: 'Where we work',
    v: 'Remote-first, and written down',
    note: 'The team is spread across time zones and works from written decisions rather than from meetings. Nothing important lives only in somebody’s head or in a call you had to be on.',
  },
  {
    k: 'How we ship',
    v: 'Small, often, and behind a real device',
    note: 'A change is judged on the phone it is meant for — the older one, on the slower network, with the smaller screen. Performance on a good connection in a good room is not evidence of anything.',
  },
  {
    k: 'How we decide',
    v: 'By whether the person holding the phone is better off',
    note: 'Not by how long they stay, and not by how many of their contacts we can match. A feature that works only by taking something from you is not a feature we ship.',
  },
  {
    k: 'What we will not do',
    v: 'Sell your data, or advertise against your conversations',
    note: 'There is no advertising profile of you, and the contents of a convo are not used to decide what you see. The Data page spells this out in full, including the parts that are less flattering.',
  },
]

export default function About() {
  useSEO({
    title: 'About — Xelvic',
    description:
      'Who builds Xelvic, what we decided before we wrote a line of code, how the team works, and the limits we would rather you heard from us.',
    image: '/media/walls/mehfil.jpg',
    jsonLd: graph(
      webPageLd({
        name: 'About Xelvic',
        description:
          'Who builds Xelvic, what we decided before we wrote a line of code, how the team works, and the limits we would rather you heard from us.',
        path: '/about',
        image: '/media/walls/mehfil.jpg',
        breadcrumbs: [
          { name: 'Home', path: '/' },
          { name: 'About', path: '/about' },
        ],
      }),
    ),
  })

  return (
    <>
      <PageHero
        title={
          <>
            One app for the people you <span className="text-grad">actually talk to</span>
          </>
        }
        sub="Xelvic started from a small irritation: the people you care about were spread across five apps, and not one of them felt good to open. So we built the one we wanted."
        wall="/media/walls/mehfil.jpg"
      />

      {/* ————— the opening ————— */}
      <section className="pb-16">
        <div className="wrap">
          <Lede>
            Xelvic is a messaging app that also lets you post, go live, keep music and play a game
            together in a room — and it tries to be honest about all of it. Where the app makes a
            promise, the promise is written on the screen it applies to, in the app’s own words.
            This page is the longer version of who is behind it.
          </Lede>
        </div>
      </section>

      {/* ————— the line we started from ————— */}
      <section className="pb-20">
        <div className="wrap">
          <Pull by="What we started from">
            The phone in your pocket should not be the price of admission.
          </Pull>
        </div>
      </section>

      {/* ————— the numbers ————— */}
      <section className="pb-20">
        <div className="wrap">
          <Stats
            items={[
              { value: 'Nothing', label: 'Sold to advertisers', note: 'No advertising profile is built from you, and none is sold.' },
              { value: 'Never', label: 'Is your address book uploaded', note: 'Contacts are matched on your phone, not in a copy on our side.' },
              { value: '30 days', label: 'To change your mind', note: 'Delete the account and it is recoverable for a month, then it is gone.' },
              { value: '13', label: 'The age you have to be', note: 'The gate is in front of sign-up, and it is real rather than decorative.' },
            ]}
          />
        </div>
      </section>

      {/* ————— what we decided ————— */}
      <section className="section bg-ink-800">
        <div className="wrap max-w-4xl">
          <SectionHead
            kicker="Four decisions"
            title={
              <>
                What we settled <span className="text-grad">before we wrote a line of code</span>
              </>
            }
            sub="These are not values on a poster. Each one has a consequence in the build, which is why each one is followed by the line the app actually prints."
          />

          <Numbered className="mt-10" items={principles} />

          <Note className="mt-10" title="Where the rest of it is written down">
            The four decisions above are the short version. The long version lives on the{' '}
            <Link to="/data" className="font-semibold text-pink-700 underline">
              Data page
            </Link>{' '}
            — what we hold, where it is used, how it is used and what you can do about it — with
            the contractual wording on the{' '}
            <Link to="/privacy" className="font-semibold text-pink-700 underline">
              Privacy Policy
            </Link>
            .
          </Note>
        </div>
      </section>

      {/* ————— how we got here ————— */}
      <section className="section">
        <div className="wrap max-w-4xl">
          <SectionHead
            kicker="History"
            title="How we got here"
            sub="Short, because the app is younger than the phone you are reading this on."
          />
          <Timeline className="mt-10" items={history} />
        </div>
      </section>

      {/* ————— the honest part ————— */}
      <section className="section bg-ink-800">
        <div className="wrap max-w-4xl">
          <SectionHead
            kicker="The honest part"
            title="Four things we would rather you heard from us"
            sub="Every app has limits. Most of them are easier to find out about in advance than in the moment you needed them not to exist."
          />

          <div className="mt-10 grid gap-10 lg:grid-cols-2">
            <Prose>
              <p>
                A screenshot cannot be blocked by any app running on a normal phone. Xelvic does the
                only useful thing available: it tells both sides when a Spark is captured, so nobody
                is left guessing. That is a light left on, not a lock.
              </p>
              <p>
                A vault code has no recovery route. That is what makes the vault worth having — a
                reset that handed it back to anyone who asked would make it a folder with a nicer
                name.
              </p>
            </Prose>
            <Prose>
              <p>
                Deleting an account hides it immediately and keeps it for thirty days. Past that
                window there is no route back, for you or for us, and we would rather say so now
                than in a support thread later.
              </p>
              <p>
                Reports are read by people. That means they are taken seriously and that they take
                time — there is no automatic punishment, and nobody is told who reported them.
              </p>
            </Prose>
          </div>

          <div className="mt-10">
            <NextLinks
              links={[
                { label: 'Safety', to: '/safety' },
                { label: 'Security', to: '/security' },
                { label: 'Your Data', to: '/data' },
              ]}
            />
          </div>
        </div>
      </section>

      {/* ————— how we work ————— */}
      <section className="section">
        <div className="wrap max-w-4xl">
          <SectionHead
            kicker="Inside the team"
            title="How we work"
            sub="Four facts about the company, in place of a page of perks."
          />
          <Rows className="mt-10" items={howWeWork} />

          <Reveal className="mt-10">
            <p className="max-w-2xl leading-relaxed text-white/60">
              We are hiring across engineering, design, product, trust and safety, marketing and
              operations — and the roles are written in terms of the surfaces you would actually
              own rather than in terms of a stack.{' '}
              <Link to="/careers" className="font-semibold text-pink-700 underline">
                See the open roles
              </Link>
              .
            </p>
          </Reveal>
        </div>
      </section>

      <section className="pb-20">
        <div className="wrap max-w-4xl">
          <NextLinks
            links={[
              { label: 'Careers', to: '/careers' },
              { label: 'Press', to: '/press' },
              { label: 'Brand Center', to: '/brand' },
              { label: 'Contact', to: '/contact' },
            ]}
          />
        </div>
      </section>

      <CTABand />
    </>
  )
}
