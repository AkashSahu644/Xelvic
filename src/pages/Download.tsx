import PageHero from '../components/layout/PageHero'
import Reveal from '../components/ui/Reveal'
import PhoneFrame from '../components/ui/PhoneFrame'
import PhoneDemo from '../components/ui/PhoneDemo'
import StoreButton from '../components/ui/StoreButton'
import Accordion from '../components/ui/Accordion'
import { Lede, Stats, Rows, Steps, Blocks, SectionHead, Note } from '../components/ui/Editorial'
import { NextLinks } from '../components/ui/Explainers'
import { CTABand } from '../components/sections/Bands'
import { useSEO } from '../hooks/usePageMeta'
import { graph, breadcrumbLd, faqLd, softwareApplicationLd } from '../data/jsonld'
import { site } from '../data/site'
import { ArrowUpRight, Check } from 'lucide-react'

/* The host the sign-in link prints. Derived rather than typed twice, so the
   address in the sentence can never drift from the address in the href. */
const webHost = site.web.replace(/^https?:\/\//, '')

/* The short list that sits under the badges. Six is deliberate: it is the
   number that fills two columns on a phone without a ragged last row. */
const perks = [
  'Free to download and use',
  'Encrypted calls & chats',
  'Works on low-end phones',
  '50+ themes included',
  'Offline-first messaging',
  'QR login across devices',
]

/* The factual spine of the page, printed before anything is asked of the
   reader. Three of the four are limits rather than selling points, which is
   the point — a download page that only lists good news is not trusted about
   the good news either. */
const headline = [
  {
    value: 'Free',
    label: 'The whole app',
    note: 'No subscription, and no ads between you and your chats. Nothing is held back behind a tier.',
  },
  {
    value: 'Android 8',
    label: 'The oldest Android we run on',
    note: 'Oreo shipped in 2017. If the phone still turns on, it can most likely run Xelvic.',
  },
  {
    value: 'iOS 14',
    label: 'The oldest iPhone we run on',
    note: 'iPhone 6s and later, and iPad. One build covers both — there is no separate tablet version.',
  },
  {
    value: '13+',
    label: 'The age you have to be',
    note: 'Xelvic is not for anyone under 13.',
  },
]

/* What is actually in the download, stated as capabilities rather than as
   feature names — "offline-first messaging" tells you what happens on the
   train, "Offline mode" does not. */
const included = [
  {
    t: 'Messaging that waits for signal',
    d: 'A message written in a tunnel is sent the moment the phone finds a bar again. You do not have to remember to resend it.',
  },
  {
    t: 'Calls and chats, encrypted',
    d: 'Voice, video and text are encrypted end to end. Nobody between the two phones can read a word of it, us included.',
  },
  {
    t: 'Live rooms you can open yourself',
    d: 'Go live to your people, or to anyone, and hold the room from the phone in your pocket.',
  },
  {
    t: '50+ themes, all included',
    d: 'Every look ships in the download. Nothing in the theme shelf is a paid extra, and there is nothing to unlock.',
  },
  {
    t: 'Your feed, on your terms',
    d: 'Moments, Drops and Vibes share what you choose with who you choose. Nothing posts on its own.',
  },
  {
    t: 'One account, every device',
    d: 'Sign in on a new phone by scanning the code from the old one. Your chats arrive with you.',
  },
]

/* Requirements, as a table rather than as four cards — the question is
   "will it run on mine", and a table is the shape that answers it. */
const requirements = [
  {
    k: 'Android',
    v: '8.0 Oreo and later',
    note: 'The app is built light on purpose, so a budget phone from 2017 runs it as well as a flagship.',
  },
  {
    k: 'iPhone & iPad',
    v: 'iOS 14 and later',
    note: 'iPhone 6s and later. The app fills the screen on an iPad rather than sitting in a phone-shaped box.',
  },
  {
    k: 'To sign up',
    v: 'A phone number',
    note: 'That is the whole of it — no email address, no password to invent, nothing to verify afterwards.',
  },
  {
    k: 'To sign back in',
    v: 'Your number and the code we text you',
    note: 'Or scan the QR code from a phone that is already signed in, which skips the code entirely.',
  },
  {
    k: 'On a computer',
    v: `A browser, at ${webHost}`,
    note: 'The same account, with nothing to install. Useful on a machine that is not yours.',
  },
  {
    k: 'Price',
    v: 'Free',
    note: 'Free now and free later. There is no plan to move anything behind a subscription.',
  },
]

/* Four taps, in the order they happen. */
const install = [
  {
    t: 'Tap the badge for your phone',
    d: 'The Google Play badge on an Android, the App Store badge on an iPhone. Both go to the listing for this app and nothing else.',
  },
  {
    t: 'Let the store install it',
    d: 'Android may ask once about installing from this source; iPhone will ask for Face ID or your Apple ID password. Both are the store, not us.',
  },
  {
    t: 'Enter your number',
    d: 'We text you a six-digit code. That code is the only thing standing between a stranger and your account, so it is never asked for by anyone on our team.',
  },
  {
    t: 'Bring your people with you',
    d: 'Invite from your contacts, share your handle, or scan the QR code from your old phone to carry the whole account across.',
  },
]

/* The questions a download page actually gets asked, answered without
   hedging. If an answer here ever stops being true, it has to be deleted
   rather than softened. */
const faqs = [
  {
    q: 'Is it genuinely free, or free for now?',
    a: 'Genuinely free. There is no subscription, no premium tier and no ads in the chat list. Everything the app can do, it does for everyone who installs it.',
    tag: 'Price',
  },
  {
    q: 'Will it run on an old phone?',
    a: 'If the phone runs Android 8 or iOS 14, yes — and those go back to 2017 and 2020 respectively. The app is built light, so a cheap phone is not treated as a second-class one.',
    tag: 'Devices',
  },
  {
    q: 'Do I need a second account for the web app?',
    a: `No. ${webHost} is the same account, reached through a browser. Sign in with your number and you are looking at the same chats you have on your phone.`,
    tag: 'Sign-in',
  },
  {
    q: 'How do I move my chats to a new phone?',
    a: 'Install Xelvic on the new phone, choose the QR sign-in, and scan the code shown on your old phone. The account moves across; you do not have to start again.',
    tag: 'Moving',
  },
  {
    q: 'Why does it want my phone number?',
    a: 'Because a number is the account. It is what your people already have for you, so nobody has to be told a new username, and it is what makes the sign-in code work.',
    tag: 'Privacy',
  },
  {
    q: 'Can I use it on a tablet as well as a phone?',
    a: 'Yes. The same account signs in on a phone, a tablet and a browser at once, and a message you send from one turns up on the others.',
    tag: 'Devices',
  },
]

export default function Download() {
  useSEO({
    title: 'Download — Xelvic',
    description:
      'Download Xelvic free on Android 8+ and iOS 14+. What is included, what it needs to run, how to install it in four taps, and how to sign in on the web without installing anything.',
    image: '/media/walls/xelvic.jpg',
    jsonLd: graph(
      softwareApplicationLd(),
      breadcrumbLd([
        { name: 'Home', path: '/' },
        { name: 'Download', path: '/download' },
      ]),
      faqLd(faqs)
    ),
  })

  return (
    <>
      <PageHero
        eyebrow="Free · Android & iOS"
        title={
          <>
            Get <span className="text-grad">Xelvic</span>
          </>
        }
        sub="Free on Android and iPhone. Install it, sign in with your number, and your people are a tap away."
        wall="/media/walls/xelvic.jpg"
      />

      {/* ————— what you are getting, before you are asked for anything ————— */}
      <section className="pb-20">
        <div className="wrap">
          <Lede>
            Xelvic is free, and it stays free — no subscription, no ads between you and your
            chats, and nothing held back behind a tier. It is built to run on the phone you
            already have, including the cheap one.
          </Lede>

          <Stats className="mt-12" items={headline} />
        </div>
      </section>

      {/* ————— the download itself ————— */}
      <section className="pb-20">
        <div className="wrap grid items-center gap-14 lg:grid-cols-2">
          <Reveal>
            <div className="flex justify-center gap-6">
              <PhoneFrame drift tilt>
                <PhoneDemo kind="chat" />
              </PhoneFrame>
              <div className="mt-12 hidden sm:block">
                <PhoneFrame tilt glow="rgba(236,72,153,.35)">
                  <img
                    src="/media/themes/catgirl/convo.jpg"
                    alt="A Xelvic conversation on the Catgirl theme"
                    className="h-full w-full object-cover"
                  />
                </PhoneFrame>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="font-display text-3xl font-bold md:text-4xl">
              Two taps from your crew
            </h2>
            <p className="mt-3 leading-relaxed text-white/60">
              Pick the store your phone uses. Signing in takes a number and a code — there is
              no password to invent and nothing to verify afterwards.
            </p>

            <div className="mt-7 flex flex-wrap gap-4">
              <StoreButton store="apple" variant="white" href="#" />
              <StoreButton store="google" variant="glow" href="#" />
            </div>

            {/* For the person who already has an account: the shortest path
                back into it is a browser, and it is worth saying so here
                rather than making them find the header. */}
            <a
              href={site.web}
              className="group mt-5 flex items-center gap-4 rounded-2xl border border-plum/12 bg-pure px-5 py-4 transition-colors hover:border-pink-500/45"
            >
              <span className="min-w-0">
                <span className="block text-sm font-bold text-plum">
                  Already have an account?
                </span>
                <span className="mt-1 block text-sm leading-relaxed text-plum/55">
                  Sign in at {webHost} — nothing to install.
                </span>
              </span>
              <ArrowUpRight
                size={18}
                className="ml-auto shrink-0 text-pink-600 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>

            <ul className="mt-9 grid gap-3 sm:grid-cols-2">
              {perks.map((p) => (
                <li key={p} className="flex items-center gap-2 text-sm text-white/70">
                  <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-grad">
                    <Check size={12} />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ————— what is in the download ————— */}
      <section className="section relative overflow-hidden border-t border-white/10 bg-ink-800">
        <div className="aurora-bg" />
        <div className="wrap">
          <SectionHead
            kicker="What's included"
            title={
              <>
                Everything, in the <span className="text-grad">download</span>
              </>
            }
            sub="No paid tier sits above any of this. What is listed here is what arrives when the install finishes."
          />
          <Blocks className="mt-10" cols={3} items={included} />
        </div>
      </section>

      {/* ————— will it run on mine ————— */}
      <section className="section">
        <div className="wrap max-w-4xl">
          <SectionHead
            kicker="Before you start"
            title="What it needs to run"
            sub="The honest version, including the two limits that will rule some phones out."
          />
          <Rows className="mt-10" items={requirements} />

          <Note className="mt-12" title="One thing we will never do">
            We will never ask you for your password, your vault code or a code we have just
            sent you — not by email, not in a message, and not on a call, and not to “verify”
            an account. If somebody contacts you claiming to be from Xelvic and asks for any
            of those, it is not us: stop, and tell us at{' '}
            <a href="mailto:security@xelvic.app" className="font-semibold text-pink-700 underline">
              security@xelvic.app
            </a>
            .
          </Note>
        </div>
      </section>

      {/* ————— four taps ————— */}
      <section className="section border-t border-white/10 bg-ink-800">
        <div className="wrap max-w-4xl">
          <SectionHead
            kicker="Installing"
            title="From tapping the badge to your first message"
            sub="Four steps, in the order they happen, including the two places your phone will interrupt you."
          />
          <Steps className="mt-10" items={install} />
        </div>
      </section>

      {/* ————— questions ————— */}
      <section className="section">
        <div className="wrap max-w-3xl">
          <SectionHead
            kicker="Questions"
            title="Asked before installing"
            sub="If the answer you need is not here, the Help Center covers the app screen by screen."
          />
          <div className="mt-10">
            <Accordion items={faqs} />
          </div>

          <div className="mt-12">
            <NextLinks
              links={[
                { label: 'Help Center', to: '/help' },
                { label: 'How it works', to: '/how-it-works' },
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
