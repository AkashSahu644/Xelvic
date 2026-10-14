import { Link } from 'react-router-dom'
import PageHero from '../components/layout/PageHero'
import Reveal from '../components/ui/Reveal'
import { DeepSection, NextLinks } from '../components/ui/Explainers'
import { CTABand } from '../components/sections/Bands'
import {
  Lede,
  Stats,
  Blocks,
  Steps,
  SectionHead,
  Prose,
  Note,
} from '../components/ui/Editorial'
import { useSEO } from '../hooks/usePageMeta'
import { graph, breadcrumbLd } from '../data/jsonld'

const tools = [
  {
    t: 'Report anything',
    d: 'A person, a post or a single comment. It goes into a queue a moderator works through.',
    app: 'Reported. A moderator will look at it.',
  },
  {
    t: 'Block',
    d: 'A wall rather than a filter — and it works in both directions at once.',
    app: 'They cannot reach you, and neither of you sees the other online.',
  },
  {
    t: 'Quiet things down',
    d: 'Turn a conversation down without ending it, and decide what is allowed to interrupt you at all.',
    app: 'Nothing will interrupt you, in the app or on the phone.',
  },
  {
    t: 'The Vault',
    d: 'Move convos out of your list entirely, behind a code that is not recoverable.',
    app: 'Move to the vault',
  },
  {
    t: 'Disappearing chats',
    d: 'Put a conversation on a clock so messages clear once they have been seen.',
    app: 'You asked to switch on disappearing messages.',
  },
  {
    t: 'Control your audience',
    d: 'A private profile keeps your moments inside the app, to the people you approved.',
    app: 'This account is private, so their moments stay in the app.',
  },
  {
    t: 'Comment controls',
    d: 'Turn comments off under your own post, or remove a single comment.',
    app: 'Comments are off.',
  },
  {
    t: 'Take it down',
    d: 'Take a post down and it goes away for everybody carrying it, not just for you.',
    app: 'It goes away for everybody.',
  },
]

/* The order somebody should actually do these in, when something is happening
   now. Emergency services first, every time. */
const urgent = [
  { t: 'Emergency services first', d: 'If there is a threat to anyone’s safety, that call comes before anything on this page. No report you file with us reaches anybody who can help in the next ten minutes.' },
  { t: 'Block them', d: 'A block stops them reaching you and stops both of you showing up online to the other. It works immediately — you do not have to wait for a review.' },
  { t: 'Report the account', d: 'From the profile or the message. It goes into a queue a moderator reads, and the person is never told who reported them.' },
  { t: 'Keep what you have', d: 'Screenshot what you need before you block. A block does not delete their copy of anything already sent.' },
  { t: 'Move the convo', d: 'Move the chat into the Vault so it is out of your list and behind your code, rather than sitting where somebody can read it over your shoulder.' },
  { t: 'Check your devices', d: 'In sessions, sign out of every phone but this one, in a single press — and look at when each one last signed in.' },
]

/* Habits, stated as facts about how the app works rather than as advice. */
const habits = [
  {
    t: 'Keep the list small',
    d: 'Only follow and keep people you actually want to hear from. Most of what is unpleasant on any app arrives through a connection somebody accepted once and forgot about.',
  },
  {
    t: 'Use the Vault for the private half',
    d: 'Anything you would not want read over your shoulder belongs behind the code rather than in the convo list, where a glance across a table can catch it.',
  },
  {
    t: 'Look at sessions once in a while',
    d: 'Every signed-in phone is listed with where it signed in from. An entry you do not recognise is worth acting on the day you notice it.',
  },
  {
    t: 'Never share a code',
    d: 'Not a one-time sign-in code, not a vault code, not a password — and not with somebody who says they are from Xelvic, because we will never ask.',
  },
  {
    t: 'Report early',
    d: 'A pattern reported the first time is far easier to act on than the tenth. Waiting to see whether it continues usually just means more of it to read.',
  },
  {
    t: 'Say it out loud, not just in the app',
    d: 'If somebody you know is being harassed, the most useful thing is often a person who already knows. A report is a process; a friend is faster.',
  },
]

export default function Safety() {
  useSEO({
    title: 'Safety — Xelvic',
    description:
      'Blocking, reporting, the Vault and the controls that keep you in charge — what each one actually does, step by step, including the limits.',
    image: '/media/walls/mehfil.jpg',
    jsonLd: graph(
      breadcrumbLd([
        { name: 'Home', path: '/' },
        { name: 'Safety', path: '/safety' },
      ]),
    ),
  })

  return (
    <>
      <PageHero
        title={
          <>
            Tools to keep you <span className="text-grad">in control</span>
          </>
        }
        sub="Blocking, reporting, the Vault and disappearing chats — where to find each one, what it really does, and what to do when something is happening right now."
        wall="/media/walls/mehfil.jpg"
      />

      <section className="pb-16">
        <div className="wrap">
          <Lede>
            Every control on this page is one the app actually has, and each one is followed by the
            line the app prints when you use it. Where a control has a limit, the limit is written
            down next to it rather than left for you to find out.
          </Lede>
        </div>
      </section>

      <section className="pb-20">
        <div className="wrap">
          <Stats
            items={[
              { value: 'Both ways', label: 'A block', note: 'One press, and neither of you can reach or see the other.' },
              { value: 'A person', label: 'Reads every report', note: 'Not a filter, and nothing happens on its own.' },
              { value: 'Never', label: 'Are you named', note: 'The person you reported is not told who reported them.' },
              { value: '13+', label: 'Only, and enforced', note: 'The age gate sits in front of sign-up rather than after it.' },
            ]}
          />
        </div>
      </section>

      {/* ————— if it is happening now ————— */}
      <section className="pb-20">
        <div className="wrap max-w-4xl">
          <Note title="If it is happening right now, start here">
            <p className="text-lg leading-relaxed text-plum/80">
              If you or somebody else is in danger, contact your local emergency services first.
              Nothing in an app is faster than that, and no report you file with us reaches anybody
              who can help in the next ten minutes.
            </p>
          </Note>

          <Steps className="mt-10" items={urgent} />
        </div>
      </section>

      {/* ————— the eight controls ————— */}
      <section className="section bg-ink-800">
        <div className="wrap">
          <SectionHead
            kicker="Eight controls"
            title={
              <>
                Everything you can reach <span className="text-grad">in a couple of taps</span>
              </>
            }
            sub="None of these need a support ticket, and none of them need an explanation. Each is followed by what the app says when you use it."
          />
          <Blocks className="mt-10" cols={4} items={tools} />
        </div>
      </section>

      {/* the long version */}
      <section className="section">
        <div className="wrap space-y-16">
          <DeepSection
            n={1}
            title="Reporting, from the tap to the answer"
            lead="A report is read by a person. That is the whole design, and it is worth knowing exactly what happens between filing one and hearing back."
            body={[
              'Reporting a profile, a message or a single comment puts it in a queue a moderator works through by hand. The app tells you it landed — “Reported. A moderator will look at it.” — and it tells you the thing most people actually want to know: nobody is told who reported them, and nothing happens to them automatically.',
              'A report is not a punishment button. It starts a review. What comes out of that review is a decision about the content or the account, and it is made by a person looking at what you sent rather than by a rule that fires on a keyword.',
              'If you report the same thing twice, the app recognises it rather than filing it again, so you do not have to keep at it to feel heard. If you want the case to be stronger, the most useful thing you can add is context: what happened, whether it has happened before, and what you would like to stop.',
            ]}
            steps={[
              { t: 'File it', d: 'From the profile, the message, or the comment itself — comments have their own report option.' },
              { t: 'Add the context', d: 'Say what happened rather than only what was said. Context is what turns a report into an action.' },
              { t: 'Wait for the outcome', d: 'You will see the answer where you filed it. You will not be told what was done to the other account.' },
              { t: 'Block while you wait', d: 'You do not have to wait for a review to stop somebody reaching you. Block first, report second.' },
            ]}
            points={[
              'Every report is read by a moderator, not a filter.',
              'The person you reported is never told who reported them.',
              'Nothing happens to them on its own — a report opens a review.',
              'A duplicate report is recognised instead of re-filed.',
              'Comments can be reported individually.',
            ]}
            app="A moderator will look at it. Nobody is told you reported this, and nothing happens to them on its own."
            path={['Open the profile or message', 'Choose report', 'Say what happened']}
          />

          <DeepSection
            n={2}
            title="Blocking, and what it actually cuts"
            lead="A block is a wall, not a mute. It is also quiet — the other person is not told, they simply stop getting through."
            body={[
              'Block somebody and they cannot reach you, and neither of you shows up online to the other. It works in both directions at once, so a block is not something they can step around by opening a new convo.',
              'What a block does not do is delete things. The conversation stays where it is rather than being torn out from under either of you, and their copy of anything already sent is still theirs. If you want the chat out of your own list as well, moving it into the Vault does that without destroying the history.',
              'If there is nobody left to block, the app says so rather than leaving an empty screen — a small thing, but it is the difference between an app that explains itself and one that does not.',
            ]}
            points={[
              'They cannot reach you, and neither of you sees the other online.',
              'It cuts both ways at once — no way around it from their side.',
              'The convo stays where it is; nothing is deleted by blocking.',
              'Anything they already have, they keep. A block is not a recall.',
              'For quiet rather than cut-off, muting does the job without the wall.',
            ]}
            app="They cannot reach you, and neither of you sees the other online. The convo stays where it is."
            path={['Open the profile', 'Block', 'They stop reaching you']}
          />

          <DeepSection
            n={3}
            title="Who can reach you, and who can see what"
            lead="Almost everything about reach is a setting rather than a hope — and the ones that matter most are the ones people forget they have."
            body={[
              'A private profile is the broadest switch. Your moments stay inside the app, seen by the people you approved rather than by anyone who goes looking, and your posts stop being dealt into other people’s feeds. Make it public again and what you put up shows there — the app says that too, so the change is not a surprise.',
              'Under your own posts, comments can be switched off entirely, and a single comment can be removed without touching the rest. That is usually the faster fix for one bad reply than reporting it and waiting.',
              'Groups have their own rule, and it cuts in your favour: leaving is real. If you leave, everything said in the group’s channels and everybody’s place in it go with you, and photos or videos sent there stop being reachable on your side. Getting back in needs somebody still inside to add you back.',
            ]}
            points={[
              'A private profile keeps your moments inside the app.',
              'Going public again means your posts show in feeds again.',
              'Comments can be switched off per post, or removed one at a time.',
              'Leaving a group takes your place in it with you.',
              'Getting back into a group needs somebody inside to add you.',
            ]}
            app="A private profile does not drop. Make your profile public again and what you put up shows here."
            path={['Settings', 'Privacy', 'Private profile']}
          />

          <DeepSection
            n={4}
            title="Screenshots, copies, and what you cannot take back"
            lead="Some of what leaves your hands is genuinely gone from your control. It is better to know which before you send it than after."
            body={[
              'Screenshots cannot be blocked by any app on a normal phone. Xelvic does the only honest thing available: it announces them. Take one of a Spark and it is noted on your screen and the other person is told their Spark was captured, so nobody is left assuming a conversation stayed between two people.',
              'Phone calls leave a record on both ends. Deleting a call from your log tidies your list and leaves the other person theirs — a call is a two-party event and the app does not pretend otherwise.',
              'Taking a post down is real, and it goes further than most people expect: it comes off the app for everybody carrying it. The narrower tool is a feed takedown, which stops something being dealt into feeds while leaving it on its author’s profile and at its own link — the app is explicit about that difference, because the two are often confused.',
            ]}
            points={[
              'Screenshots cannot be blocked — they are announced to both sides.',
              'Deleting a call removes it from your log only; they keep theirs.',
              'Taking a post down removes it for everybody carrying it.',
              'A feed takedown is narrower, and stays at the author’s own link.',
            ]}
            app="It leaves your call log. The other person keeps their own copy."
            path={['Your post', 'Take this down', 'It goes away for everybody']}
          />

          <DeepSection
            n={5}
            title="Young people, and the age gate"
            lead="Xelvic is not for anyone under 13, and the gate is enforced rather than suggested."
            body={[
              'A date of birth is checked when an account is created, and an account that does not clear the line cannot be finished. The date itself is never stored — it is used to answer one question and then it is gone, which is the right amount of retention for that particular fact.',
              'If you believe an account belongs to somebody under 13, report it or write to us. We remove accounts that should not be there, and we would rather hear about one that turns out to be fine than miss one that is not.',
              'If you are a parent or guardian and you want to understand what the app collects and what controls exist, the Data page is written for exactly that question, in plain language and without the legal padding.',
            ]}
            points={[
              'You must be 13 or over, and the sign-up enforces it.',
              'The date of birth is checked, then not stored.',
              'Under-13 accounts are removed when we learn of them.',
              'Parents: the Data page answers the collection question directly.',
            ]}
            app="You need to be over 13"
          />

          <DeepSection
            n={6}
            title="If you made a mistake, or just changed your mind"
            lead="Most of this app is reversible, and the parts that are not say so before you commit."
            body={[
              'A post can be taken down, a comment removed, comments switched off, a theme changed or removed, a convo moved out of the Vault and back into the list. None of those need a support ticket or an explanation.',
              'Two things are one-way, and both warn you first. Turning on disappearing messages deletes everything already in that chat for both people. And deleting your account hides it at once, keeps it 30 days in case you change your mind, then removes it permanently — past that window there is no route back for you or for us.',
            ]}
            points={[
              'Posts, comments and themes can all be changed or removed freely.',
              'A convo can come back out of the Vault; the code still opens it.',
              'Disappearing messages deletes the existing chat, for both sides.',
              'A deleted account has a 30-day window, and then it does not.',
            ]}
            app="After 30 days it is gone for good and cannot be recovered."
            path={['Settings', 'Delete account', '30 days to change your mind']}
          />
        </div>
      </section>

      {/* ————— habits ————— */}
      <section className="section bg-ink-800">
        <div className="wrap">
          <SectionHead
            kicker="In practice"
            title="Six habits that do most of the work"
            sub="None of these is a setting. They are the things that decide whether the tools above ever need to be used."
          />
          <Blocks className="mt-10" cols={2} items={habits} />
        </div>
      </section>

      {/* ————— need a person ————— */}
      <section className="section">
        <div className="wrap max-w-4xl">
          <SectionHead
            kicker="Need a person"
            title="When a page is not enough"
            sub="Harassment, an account that should not exist, or a report you have not heard back on — support is read by a human, not a bot."
          />

          <div className="mt-10 grid gap-px overflow-hidden rounded-3xl border border-plum/10 bg-plum/12 md:grid-cols-2">
            <Reveal>
              <div className="h-full bg-pure p-6 sm:p-7">
                <h3 className="text-[11px] font-bold uppercase tracking-[0.14em] text-pink-600">
                  Right now
                </h3>
                <p className="mt-4 leading-relaxed text-plum/70">
                  If you or somebody else is in danger, call your local emergency services before
                  anything else. For everything short of that, support is the fastest route to a
                  person, and the safety address reaches the people who work the moderation queue.
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Link
                    to="/support"
                    className="rounded-full bg-plum px-5 py-2.5 text-sm font-bold text-pure transition-transform hover:-translate-y-0.5"
                  >
                    Contact support
                  </Link>
                  <a
                    href="mailto:safety@xelvic.app"
                    className="rounded-full border border-plum/15 px-5 py-2.5 text-sm font-bold text-plum transition-colors hover:border-pink-500/40 hover:text-pink-700"
                  >
                    safety@xelvic.app
                  </a>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="h-full bg-pure p-6 sm:p-7">
                <h3 className="text-[11px] font-bold uppercase tracking-[0.14em] text-plum/40">
                  What to put in the message
                </h3>
                <p className="mt-4 leading-relaxed text-plum/70">
                  Tell us what happened, roughly when, and the handle rather than the display name —
                  the handle is unique and it is what the moderation queue works from. If a report
                  is already filed, say so; a message does not move it up the queue, but knowing
                  there is one saves us asking.
                </p>
              </div>
            </Reveal>
          </div>

          <div className="mt-12">
            <Prose>
              <p>
                If you are reading this on behalf of somebody else, the most useful thing you can
                do is sit with them while they file the report rather than filing it for them. A
                report is worked from the account it came from, and the person who filed it is the
                one who will see the outcome.
              </p>
            </Prose>
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="wrap max-w-4xl">
          <NextLinks
            links={[
              { label: 'Security', to: '/security' },
              { label: 'Help Center', to: '/help' },
              { label: 'Your Data', to: '/data' },
              { label: 'Support', to: '/support' },
            ]}
          />
        </div>
      </section>

      <CTABand />
    </>
  )
}
