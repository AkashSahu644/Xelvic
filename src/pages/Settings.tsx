import { Link } from 'react-router-dom'
import PageHero from '../components/layout/PageHero'
import Reveal from '../components/ui/Reveal'
import { NextLinks } from '../components/ui/Explainers'
import { CTABand } from '../components/sections/Bands'
import { useSEO } from '../hooks/usePageMeta'
import { Lede, Stats, Rows, Numbered, SectionHead, Prose, Note } from '../components/ui/Editorial'

/* Every row below is a real Settings screen from the app — labels and
 * descriptions are traced back to the strings in the build, so the "why"
 * lines explain decisions the app has actually made rather than invented
 * ones. The hub's own subtitle in the app is "Privacy, notifications and
 * the way out." */

type Row = { l: string; d: string }
type Group = { title: string; sub: string; why: string; rows: Row[] }

const groups: Group[] = [
  {
    title: 'Account',
    sub: 'About this account',
    why: 'So people know it is really you, and so there is always a way back in that is not the phone in your hand.',
    rows: [
      { l: 'Your full name', d: 'The name that sits on your profile and in every convo.' },
      { l: 'Handle', d: 'Your @name. You can change it once a day — after that it tells you to come back tomorrow.' },
      { l: 'Email address', d: 'A second way into the account, kept on file alongside the number.' },
      { l: 'About this account', d: 'The details behind the profile — what this account is and when it started.' },
    ],
  },
  {
    title: 'Privacy',
    sub: 'Who sees what you post',
    why: 'Every one of these switches only ever narrows who can see you. Nothing here makes you more visible than you already were.',
    rows: [
      { l: 'Last seen', d: 'Only you, only your contacts, or only the people you pick one by one.' },
      { l: 'Show my birthday', d: 'Off, and the date is not on your profile at all.' },
      { l: 'Show my sparks', d: 'Your spark run stays yours. Nobody else gets to watch it.' },
      { l: 'Show my crew count', d: 'Keep how many people you run with private.' },
      { l: 'Show like count / Hide like count', d: 'The number on a post is yours to show or hide. The switch reads “Like count shown.” or “Like count hidden.”' },
      { l: 'Moments audience', d: 'Everyone who can already see your moments — or everyone except the people you pick.' },
    ],
  },
  {
    title: 'Notifications',
    sub: 'What reaches you, and how',
    why: 'Quiet is a choice here, never an accident. Turned down, a message still arrives — it just does not shout at you.',
    rows: [
      { l: 'Notifications', d: 'Back on, or off, in one tap.' },
      { l: 'Quiet', d: 'No sound, no badge. It still arrives.' },
    ],
  },
  {
    title: 'Appearance',
    sub: 'Themes and wallpapers',
    why: 'The app is meant to look like yours. Nothing in here is held back behind a subscription.',
    rows: [
      { l: 'Theme', d: '33 looks that flip the whole app at once. Change it, or remove it, whenever you like.' },
      { l: 'Chat wallpaper', d: 'Set a backdrop behind a conversation — or take it off and go back to plain.' },
    ],
  },
  {
    title: 'Vault',
    sub: 'The vault, and a way to reset it if you lose the code',
    why: 'Some conversations should not sit in your normal chat list. The Vault keeps them out of sight — and the way back in is a code only you know.',
    rows: [
      {
        l: 'Show the vault in the menu',
        d: 'Off, and there is no door to it on screen. You type your code where you would type a name.',
      },
      { l: 'Vault code', d: 'Chosen by you, not stored anywhere you can look up. There is no way to recover it.' },
      { l: 'Auto-close', d: 'The vault locks itself again on its own after a set time, so it cannot be left open.' },
      {
        l: 'Reset the lock',
        d: 'The way back in if the code is lost — every chat inside the vault is deleted when you reset.',
      },
    ],
  },
  {
    title: 'Sessions',
    sub: 'Every phone on this account, and a way to sign any of them out',
    why: 'If a phone goes missing, the account should not go with it. You can cut any device loose without touching the one in your hand.',
    rows: [
      { l: 'Every phone', d: 'See each device signed in, and sign one out on its own row.' },
      { l: 'Sign out everywhere else', d: 'Every phone but this one, in one press.' },
      { l: 'Scan a code', d: 'Add a new phone by scanning a QR code from the one you are already on.' },
      {
        l: 'The first device',
        d: 'It stays put — removing that one needs your password, because it is the account’s origin.',
      },
    ],
  },
]

const wayOut = [
  {
    t: 'Sign out',
    d: 'Ends the session on this phone. Your account and your chats stay exactly where they are, and the next sign-in asks for your password as usual.',
  },
  {
    t: 'Sign out anyway?',
    d: 'The second ask, when something has not been saved yet — discard it and go, or stay and keep editing. It exists so a half-written message is not lost by a stray tap.',
  },
  {
    t: 'Delete account',
    d: 'Requested from the same sheet, and undoable from the same sheet. The account is hidden right away, kept for 30 days so you can log back in and recover it — after that it is gone for good and cannot be recovered.',
  },
]

/* What Settings deliberately does not have. Worth saying, because most apps
   have all three. */
const notHere = [
  {
    k: 'No dark mode',
    v: 'There is one look, and it is the light one',
    note: 'Themes change the colour of the whole app, but there is no separate dark scheme hiding in a menu. If a theme is dark, it is dark because you chose that theme.',
  },
  {
    k: 'Nothing behind a subscription',
    v: 'Every switch on this page is free',
    note: 'Sparks buy themes and looks — the things that change how the app appears. Not one setting here is held back, and there is no tier where the privacy switches start working.',
  },
  {
    k: 'No advertising preferences',
    v: 'Because there is no advertising profile',
    note: 'There is nothing to opt out of. We do not build a profile of you to sell, so there is no switch here pretending to stop us from doing it.',
  },
  {
    k: 'No data-selling toggle',
    v: 'Nothing is sold, so there is nothing to turn off',
    note: 'The Data page spells out exactly what is held and what is done with it, including the parts that are less flattering to us.',
  },
]

export default function Settings() {
  useSEO()

  const rows = groups.reduce((n, g) => n + g.rows.length, 0)

  return (
    <>
      <PageHero
        title={
          <>
            What is in <span className="text-grad">Settings</span>
          </>
        }
        sub="Privacy, notifications and the way out — plus the themes, the Vault and every phone signed in to your account. Here is what each one does, and why it is there at all."
        wall="/media/walls/mehfil.jpg"
      />

      <section className="pb-16">
        <div className="wrap max-w-3xl">
          <Lede>
            Settings is where the app hands decisions back to you. Nothing on this page is a
            preference for us — every row is a switch you own, and each section below ends with the
            reason it exists rather than leaving you to work it out.
          </Lede>

          <Reveal className="mt-10">
            <div className="border-l-4 border-[#ec4899] pl-6 sm:pl-8">
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-plum/40">
                Getting there
              </p>
              <p className="mt-3 font-display text-xl font-bold leading-snug text-plum md:text-2xl">
                Your profile › the gear › pick a section
              </p>
              <p className="mt-4 max-w-xl leading-relaxed text-plum/60">
                Settings lives on your profile rather than in the tab bar, so it is never one
                thumb-slip away from a conversation.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="pb-20">
        <div className="wrap">
          <Stats
            items={[
              { value: String(groups.length), label: 'Screens in Settings', note: 'One for each thing you own, rather than one long scroll.' },
              { value: String(rows), label: 'Individual switches', note: 'Each one documented below, with what it actually changes.' },
              { value: String(wayOut.length), label: 'Ways out', note: 'Signing out and closing the account sit in the same place.' },
              { value: 'None', label: 'Behind a subscription', note: 'Sparks buy themes, not settings. Every switch here is free.' },
            ]}
          />
        </div>
      </section>

      {/* ————— the six screens ————— */}
      <section className="section bg-ink-800">
        <div className="wrap">
          <SectionHead
            kicker="Six screens"
            title={
              <>
                One screen for <span className="text-grad">each thing you own</span>
              </>
            }
            sub="Every row is a real switch in the app. Where a label is quoted, it is quoted the way the app prints it."
          />

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {groups.map((g, i) => (
              <Reveal key={g.title} delay={(i % 2) * 0.06} className="h-full">
                <div className="flex h-full flex-col overflow-hidden rounded-3xl border border-plum/[0.08] bg-pure shadow-card">
                  <div className="border-b border-plum/[0.07] px-6 py-5 sm:px-7">
                    <h3 className="font-display text-xl font-bold text-plum">{g.title}</h3>
                    <p className="mt-1 text-sm leading-snug text-plum/55">{g.sub}</p>
                  </div>

                  <ul className="flex-1">
                    {g.rows.map((r) => (
                      <li key={r.l} className="border-b border-plum/[0.06] px-6 py-4 sm:px-7">
                        <p className="font-display text-[15px] font-bold text-plum">{r.l}</p>
                        <p className="mt-1 text-sm leading-relaxed text-plum/55">{r.d}</p>
                      </li>
                    ))}
                  </ul>

                  <div className="bg-ink-800/70 px-6 py-5 sm:px-7">
                    <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-pink-600">
                      Why it is there
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-plum/70">{g.why}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ————— what is not here ————— */}
      <section className="section">
        <div className="wrap">
          <SectionHead
            kicker="The honest part"
            title="What Settings deliberately does not have"
            sub="Four things most apps put on this kind of page. We would rather say why they are missing than leave you hunting for a switch that was never there."
          />
          <Rows className="mt-10" items={notHere} />
        </div>
      </section>

      {/* ————— the way out ————— */}
      <section className="section bg-ink-800">
        <div className="wrap">
          <SectionHead
            kicker="The way out"
            title={
              <>
                Leaving should be as easy as <span className="text-grad">joining</span>
              </>
            }
            sub="Signing out and closing an account sit in the same place, with the same plain wording. No maze, no retention tricks."
          />

          <Numbered className="mt-10" items={wayOut} />

          <div className="mt-14 max-w-3xl">
            <Prose>
              <p>
                Deleting an account is the only thing in Settings with a clock on it. It hides the
                account straight away, keeps it for thirty days in case you change your mind, and
                then removes it permanently — along with the profile and everything posted. Past
                that window there is no route back, for you or for us, and we would rather say so
                here than in a support thread.
              </p>
              <p>
                What is held, where it is used and what you can ask us to do with it is written out
                in full on the{' '}
                <Link to="/data" className="font-semibold text-pink-700 underline">
                  Data page
                </Link>
                , and the contractual wording sits in the{' '}
                <Link to="/privacy" className="font-semibold text-pink-700 underline">
                  Privacy Policy
                </Link>
                .
              </p>
            </Prose>
          </div>

          <Note className="mt-12 max-w-3xl" title="A switch that is not where you expect it">
            If something is not in the section you would have put it in, the Help Center has an
            answer for each screen with the exact path written out — and the{' '}
            <Link to="/help" className="font-semibold text-pink-700 underline">
              Help Center search
            </Link>{' '}
            will find it by the label the app prints. If a switch genuinely is not there, tell
            support; a missing setting is a bug, not a decision.
          </Note>
        </div>
      </section>

      <section className="pb-20">
        <div className="wrap max-w-4xl">
          <NextLinks
            links={[
              { label: 'Security', to: '/security' },
              { label: 'Safety', to: '/safety' },
              { label: 'Your Data', to: '/data' },
              { label: 'Help Center', to: '/help' },
            ]}
          />
        </div>
      </section>

      <CTABand />
    </>
  )
}
