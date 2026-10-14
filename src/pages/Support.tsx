import { Link } from 'react-router-dom'
import PageHero from '../components/layout/PageHero'
import Reveal from '../components/ui/Reveal'
import ContactForm from '../components/ui/ContactForm'
import { NextLinks } from '../components/ui/Explainers'
import { CTABand } from '../components/sections/Bands'
import { useSEO } from '../hooks/usePageMeta'
import { graph, webPageLd } from '../data/jsonld'
import { Lede, Stats, Rows, SectionHead, Prose, Note } from '../components/ui/Editorial'

/* Four doors, each answering a different kind of "I need help" — reading,
   safety, what we hold about you, and trimming the account down. */
const routes = [
  {
    t: 'Help Center',
    d: 'Answers covering sign-up, messaging, calls, Moments, Sparks, the Vault and leaving — searchable by the label the app prints.',
    to: '/help',
    cta: 'Browse answers',
  },
  {
    t: 'Safety',
    d: 'Blocking, reporting and what to do when something is happening right now. If anybody is in danger, emergency services come first.',
    to: '/safety',
    cta: 'Open Safety',
  },
  {
    t: 'Your Data',
    d: 'What we hold, where it is used, and how to get a copy or have it deleted. Written for the question rather than for the lawyer.',
    to: '/data',
    cta: 'Read the Data page',
  },
  {
    t: 'Security',
    d: 'Encryption, the Vault, the device rules, and one address for reporting a vulnerability responsibly.',
    to: '/security',
    cta: 'How we protect you',
  },
]

/* The triage list. Most support traffic is one of these six, and four of them
   are answered faster by a page than by a ticket. */
const triage = [
  {
    t: 'Messages are not arriving',
    first: 'Check whether you are offline. Xelvic holds what you sent and delivers it the moment you are back — a message that looks stuck usually is not lost. If a device was signed out, unsent messages on it are discarded rather than sent later.',
    link: { label: 'Help: do my messages send if I lose signal?', to: '/help' },
  },
  {
    t: 'I cannot get into my account',
    first: 'The sign-in code goes to your number and is six digits — never share it, including with anyone claiming to be us. If you have forgotten your password, the reset asks for the current one first, and only completes if it is correct.',
    link: { label: 'Help: how do I change my password?', to: '/help' },
  },
  {
    t: 'Somebody is harassing me',
    first: 'Block first — it works both ways at once, and they are not told. Then report, which puts it in a queue a moderator reads. If anyone is in danger, contact your local emergency services before anything else.',
    link: { label: 'Open the Safety page', to: '/safety' },
  },
  {
    t: 'I deleted my account and want it back',
    first: 'Sign in again inside 30 days and it is restored exactly as it was. Past that window the account is gone permanently, along with the profile and everything posted, and there is no route back for you or for us.',
    link: { label: 'Read the Data page', to: '/data' },
  },
  {
    t: 'I want to be verified',
    first: 'Request the mark from your profile and say why you should be verified. It is granted to accounts that are who they claim to be, and it can be taken back if the account stops being that.',
    link: { label: 'Help: how do I get verified?', to: '/help' },
  },
  {
    t: 'A brand deal or a payment',
    first: 'Payment is released once the company approves the deliverable you upload. Deals you send or receive sit together in one place, so the agreement and the payment stay visible side by side.',
    link: { label: 'Help: creators & deals', to: '/help' },
  },
]

/* What a support message should contain, so the first reply is usually the
   answer rather than a question. */
const include = [
  {
    k: 'A person replies',
    v: 'Within two business days, and usually sooner',
    note: 'Nothing here is answered by a bot, and there is no ticket number to chase. The reply comes from somebody who can act on it.',
  },
  {
    k: 'In danger right now?',
    v: 'Emergency services first, always',
    note: 'A support ticket reaches nobody who can help in the next ten minutes. That call comes before anything on this site.',
  },
  {
    k: 'Never send a code',
    v: 'We will never ask for your password or a one-time code',
    note: 'Not by email, not in a message, not on a call, and not to “verify” an account. Anybody who asks is not us.',
  },
  {
    k: 'What to include',
    v: 'The handle, and what happened instead',
    note: 'The handle is unique and it is what the moderation queue works from — display names repeat and change. For a bug, tell us what you tapped, what you expected and what you saw.',
  },
]

/* Where a message should go, so nobody has to guess and nobody’s request sits
   in the wrong inbox for a week. */
const inboxes = [
  { topic: 'Account, login, a bug', address: 'support@xelvic.app', note: 'Anything about using the app.' },
  { topic: 'Safety and reports', address: 'safety@xelvic.app', note: 'Harassment, or an account that should not exist.' },
  { topic: 'Privacy and your data', address: 'privacy@xelvic.app', note: 'Access, export, correction, deletion.' },
  { topic: 'Security disclosures', address: 'security@xelvic.app', note: 'Vulnerabilities, with steps to reproduce.' },
  { topic: 'Legal and rights', address: 'legal@xelvic.app', note: 'Notices and rights complaints.' },
  { topic: 'Press and partnerships', address: 'press@xelvic.app', note: 'Interviews, assets, brands and creators.' },
]

export default function Support() {
  useSEO({
    title: 'Support — Xelvic',
    description:
      'Get help from the Xelvic team — what to try first for the six most common problems, how to reach a person, and where each kind of request should go.',
    image: '/media/walls/studio.jpg',
    jsonLd: graph(
      webPageLd({
        name: 'Xelvic Support',
        description:
          'Get help from the Xelvic team — what to try first for the six most common problems, how to reach a person, and where each kind of request should go.',
        path: '/support',
        image: '/media/walls/studio.jpg',
        breadcrumbs: [
          { name: 'Home', path: '/' },
          { name: 'Support', path: '/support' },
        ],
      }),
    ),
  })

  return (
    <>
      <PageHero
        title={
          <>
            Get <span className="text-grad">support</span>
          </>
        }
        sub="Four pages answer most of it, and a person answers the rest. Start with whichever is true for you — a ticket is not always the fastest route."
        wall="/media/walls/studio.jpg"
      />

      <section className="pb-16">
        <div className="wrap max-w-3xl">
          <Lede>
            Support is read by people who work on the app, not by a script. The quickest route is
            usually one of the four pages below; when it is not, the form at the bottom of this page
            reaches a person who can actually do something about it.
          </Lede>
        </div>
      </section>

      <section className="pb-20">
        <div className="wrap">
          <Stats
            items={[
              { value: '4', label: 'Pages answer most of it', note: 'Start there — a page is faster than a ticket.' },
              { value: '6', label: 'Problems cover the rest', note: 'Each has something worth trying before you write.' },
              { value: '2 days', label: 'To hear from a person', note: 'Two business days, and usually sooner than that.' },
              { value: 'Never', label: 'Will we ask for a code', note: 'Not a password, not a one-time code, not ever.' },
            ]}
          />
        </div>
      </section>

      {/* ————— the four doors ————— */}
      <section className="section bg-ink-800">
        <div className="wrap max-w-4xl">
          <SectionHead
            kicker="Start here"
            title="Four pages, four different problems"
            sub="Reading is faster than writing when the answer already exists — and three of these four are pages somebody has already written properly."
          />

          <Reveal>
            <div className="mt-10 divide-y divide-plum/10 border-y border-plum/10">
              {routes.map((r) => (
                <Link key={r.to} to={r.to} className="group block py-6">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                    <h3 className="font-display text-xl font-bold leading-snug text-plum transition-colors group-hover:text-pink-700 md:text-2xl">
                      {r.t}
                    </h3>
                    <span className="text-sm font-semibold text-pink-600 group-hover:underline">
                      {r.cta}
                    </span>
                  </div>
                  <p className="mt-2.5 max-w-2xl leading-relaxed text-plum/60">{r.d}</p>
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ————— the six that cover most of it ————— */}
      <section className="section">
        <div className="wrap max-w-4xl">
          <SectionHead
            kicker="Try this first"
            title={
              <>
                Six problems, and what to do <span className="text-grad">before writing to us</span>
              </>
            }
            sub="Four of these are answered faster by a page than by a ticket. The other two are worth reading before you write, so your message lands with the detail it needs."
          />

          <Reveal>
            <div className="mt-10 divide-y divide-plum/10 border-y border-plum/10">
              {triage.map((item, i) => (
                <div
                  key={item.t}
                  className="grid gap-3 py-7 sm:grid-cols-[56px_minmax(0,1fr)] sm:gap-6"
                >
                  <span className="font-display text-sm font-bold tracking-[0.14em] text-pink-600 sm:pt-1">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-display text-lg font-bold leading-snug text-plum">
                      {item.t}
                    </h3>
                    <p className="mt-2.5 leading-relaxed text-plum/60">{item.first}</p>
                    <Link
                      to={item.link.to}
                      className="mt-3 inline-block text-sm font-semibold text-pink-600 hover:underline"
                    >
                      {item.link.label} →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ————— what to expect ————— */}
      <section className="section bg-ink-800">
        <div className="wrap max-w-4xl">
          <SectionHead
            kicker="Before you write"
            title="What happens after you send it"
            sub="Four facts about support, so there is no guessing about what you are writing into."
          />
          <Rows className="mt-10" items={include} />
        </div>
      </section>

      {/* ————— the form ————— */}
      <section className="section">
        <div className="wrap grid items-start gap-12 lg:grid-cols-2">
          <div>
            <SectionHead
              kicker="Write to us"
              title="Send us a message"
              sub="Tell us what you were doing and what happened instead. If it is a bug, the exact steps are worth more than a description, and if it is a person, the handle and a rough time saves us asking."
            />

            <div className="mt-8">
              <Prose>
                <p>
                  Screenshots help enormously and a screen recording helps more — send them as
                  attachments rather than links that expire. If you have already filed a report
                  inside the app, say so in the message; it does not move the report up the queue,
                  but knowing one exists saves a round trip.
                </p>
              </Prose>
            </div>
          </div>

          <Reveal delay={0.1}>
            <ContactForm
              topics={[
                'General help',
                'Account & login',
                'Report a problem',
                'Safety concern',
                'Privacy or my data',
                'Creator & brand deals',
                'Something else',
              ]}
              cta="Send to support"
            />
          </Reveal>
        </div>
      </section>

      {/* ————— which inbox ————— */}
      <section className="section bg-ink-800">
        <div className="wrap max-w-4xl">
          <SectionHead
            kicker="Routing"
            title="Where a message should go"
            sub="Support reads everything that arrives, but a request sent to the right address reaches the right person without being forwarded first."
          />

          <Reveal>
            <dl className="mt-10 divide-y divide-plum/10 border-y border-plum/10">
              {inboxes.map((r) => (
                <div key={r.address} className="grid gap-1.5 py-5 sm:grid-cols-[210px_minmax(0,1fr)] sm:gap-8">
                  <dt className="text-[11px] font-bold uppercase tracking-[0.14em] text-plum/40 sm:pt-1">
                    {r.topic}
                  </dt>
                  <dd className="min-w-0">
                    <a
                      href={`mailto:${r.address}`}
                      className="font-display text-[17px] font-bold text-pink-600 underline decoration-pink-500/30 underline-offset-4 transition-colors hover:decoration-pink-500"
                    >
                      {r.address}
                    </a>
                    <span className="mt-2 block text-sm leading-relaxed text-plum/55">{r.note}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Note className="mt-12" title="If you are not sure which one">
            Send it to support and say so. Getting an answer a day late is better than having a
            request sit in an inbox nobody reads because it went to the wrong place. The Contact
            page lists every address we run, with what each one is for and how quickly it answers.
          </Note>

          <div className="mt-10">
            <NextLinks
              links={[
                { label: 'Contact', to: '/contact' },
                { label: 'Help Center', to: '/help' },
                { label: 'Safety', to: '/safety' },
                { label: 'Your Data', to: '/data' },
              ]}
            />
          </div>
        </div>
      </section>

      <CTABand />
    </>
  )
}
