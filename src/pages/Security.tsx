import PageHero from '../components/layout/PageHero'
import { DeepSection, NextLinks } from '../components/ui/Explainers'
import { CTABand } from '../components/sections/Bands'
import {
  Lede,
  Stats,
  Blocks,
  Numbered,
  Pull,
  SectionHead,
  Prose,
  Note,
  DoDont,
} from '../components/ui/Editorial'
import { useSEO } from '../hooks/usePageMeta'

const pillars = [
  {
    t: 'Encrypted chats',
    d: 'A conversation is encrypted, and the convo says so on its face rather than only in a policy document.',
    app: 'This convo is encrypted',
  },
  {
    t: 'The Vault',
    d: 'A hidden space for the convos you want out of the list, behind a code only you hold — with no recovery route, by design.',
    app: 'Type this where you would type a name to open the vault.',
  },
  {
    t: 'Account locks',
    d: 'A password reset only completes if the current password is right, so nobody wipes your account by claiming to be you.',
    app: 'You are asked for your account password first.',
  },
  {
    t: 'Device control',
    d: 'Every phone signed in is listed with where it signed in from, and signing out of all but this one takes a single press.',
    app: 'Every phone but this one, in one press.',
  },
  {
    t: 'Private contact matching',
    d: 'Friends are matched on your phone, so your address book never becomes a file on our side.',
    app: 'Numbers never leave your device in readable form.',
  },
  {
    t: 'Kept small on purpose',
    d: 'Fewer moving parts is the whole strategy: less to attack, less to get wrong, less to leak.',
  },
]

/* What a report needs to be actionable. Numbered rather than bulleted, because
   a disclosure is a sequence somebody has to sit down and write. */
const report = [
  {
    t: 'What you found, and where it lives',
    d: 'The screen or the endpoint, named as precisely as you can. “The vault opens without the code” is actionable; “the vault is insecure” is not.',
  },
  {
    t: 'Steps to reproduce it',
    d: 'Numbered, starting from a fresh install where you can. Assume we are following them exactly and have none of your context.',
  },
  {
    t: 'What an attacker actually gets',
    d: 'Read somebody’s convos? Take over an account? Learn whether a number is registered? Say it concretely, including what they do not get.',
  },
  {
    t: 'A build number and a device',
    d: 'The app version and the phone you saw it on. A finding that only reproduces on one build is still worth having — we would just rather know which one.',
  },
  {
    t: 'How you would like to be credited',
    d: 'A name, a handle, a team, or nothing at all. All three are fine; say which and we will follow it.',
  },
]

export default function Security() {
  useSEO()

  return (
    <>
      <PageHero
        title={
          <>
            Security you can <span className="text-grad">feel good</span> about
          </>
        }
        sub="Encryption, a vault behind your own code, and real control over every device. Security is part of how Xelvic is built — and where it stops, this page says so."
        wall="/media/walls/raat.jpg"
      />

      <section className="pb-16">
        <div className="wrap">
          <Lede>
            Most security pages are a list of words. This one is written the other way round: each
            claim below is followed by the line the app itself prints on the screen the claim
            applies to, so you can check it against the build rather than take our word for it.
          </Lede>
        </div>
      </section>

      <section className="pb-20">
        <div className="wrap">
          <Stats
            items={[
              { value: 'Encrypted', label: 'Convos', note: 'Stated on the conversation itself, not only in a policy.' },
              { value: 'Code only', label: 'The Vault', note: 'Opened by a code you hold, with no recovery route.' },
              { value: 'You decide', label: 'Devices', note: 'Every phone listed, every one removable but the first.' },
              { value: 'Nothing', label: 'Data sold', note: 'There is no advertising profile of you to sell.' },
            ]}
          />
        </div>
      </section>

      <section className="pb-20">
        <div className="wrap">
          <Pull by="The rule the whole page is built on">
            A promise about your privacy belongs on the screen it applies to, not only in a
            document nobody opens.
          </Pull>
        </div>
      </section>

      {/* ————— the six things ————— */}
      <section className="section bg-ink-800">
        <div className="wrap">
          <SectionHead
            kicker="Six things doing the work"
            title={
              <>
                What is protecting you, <span className="text-grad">in plain terms</span>
              </>
            }
            sub="Each of these is followed by the line the app uses. Where a line is quoted, it is quoted word for word out of the build."
          />
          <Blocks className="mt-10" cols={3} items={pillars} />
        </div>
      </section>

      {/* the long version */}
      <section className="section">
        <div className="wrap space-y-16">
          <DeepSection
            n={1}
            title="What “encrypted” actually means here"
            lead="It is the word every app uses, so it is worth saying exactly what Xelvic does with it and where the promise ends."
            body={[
              'A conversation is encrypted, and the app states it on the conversation rather than only in a policy document — you can see the claim on the screen it applies to. What that buys you is that the contents of a chat are not sitting somewhere readable for anybody who goes looking.',
              'What it does not buy you is protection from the person you are talking to. They can screenshot, they can read it out loud, they can hand their phone to somebody else. No amount of encryption on our side changes that, and any app that implies otherwise is selling you something.',
            ]}
            points={[
              'Encryption applies to the conversation itself, stated on the convo.',
              'The people in the chat can always read the chat — that is the point of it.',
              'Anything they can see, they can also capture or repeat.',
            ]}
            app="This convo is encrypted"
            path={['Any convo', 'Open it', 'The convo says so on its face']}
          />

          <DeepSection
            n={2}
            title="The Vault, in full"
            lead="A second convo list that does not exist until you type the right thing into the name field."
            body={[
              'The Vault is the strongest privacy tool in the app, and it is deliberately awkward to open: instead of a menu item, you type your code where you would normally type a name. Nothing about the convo list gives away that it is there.',
              'It is also the one place where losing something is genuinely permanent. The code has no recovery route — there is no reset that hands it back to you — and if a lock is set, resetting deletes what is inside. That is not a gap in the design; it is what makes the vault worth having.',
            ]}
            steps={[
              { t: 'Move a convo in', d: 'Hold the convo in your list and choose “Move to the vault”. It leaves the list and turns up inside.' },
              { t: 'Set a code', d: 'Choose one you will not lose. It is typed where a name would normally go, and it closes again on its own.' },
              { t: 'Add a lock if you want one', d: 'A lock means a reset deletes every chat inside. Know that before you set it, not after.' },
              { t: 'Take a convo back out', d: 'It returns to being a row in the convo list like any other — and the code still opens the vault.' },
            ]}
            points={[
              'Opened by typing the code where a name would go, not from a menu.',
              'The code cannot be recovered, and the app warns you when you set it.',
              'Reset with a lock set and everything inside is deleted, permanently.',
              'The vault closes itself again after a stretch, so it does not sit open behind you.',
            ]}
            app="Type this where you would type a name to open the vault. There is no way to recover it."
            path={['Hold a convo in the list', 'Move to the vault', 'Open with your code']}
          />

          <DeepSection
            n={3}
            title="Your account: passwords, codes and the reset rule"
            lead="The account is the thing everything else hangs off, so this is where the app is at its most stubborn."
            body={[
              'A password has to clear a minimum before the app will take it, and it tells you when you have picked a good one rather than leaving you guessing. Changing it signs the other sessions out with the old credential, so a password you changed because somebody had it is actually worth changing.',
              'The reset path is the part worth knowing. The app asks for your current password first, and the reset only happens if that is correct — which means an account cannot be wiped by somebody who merely claims to be you. That is a deliberate trade of convenience for safety, and it is the right way round.',
              'One-time codes are the other half. Whoever holds the code can finish the sign-in, so the app says the only thing worth saying about it, plainly.',
            ]}
            points={[
              'A minimum length, and a signal when a password is a good one.',
              'Changing a password invalidates the sessions using the old one.',
              'A reset requires the current password — no exceptions, no appeals.',
              'One-time codes are never shared, with anyone, ever.',
            ]}
            app="Never share this code with anyone."
            path={['Settings', 'Account password', 'Change and confirm']}
          />

          <DeepSection
            n={4}
            title="Every device, accounted for"
            lead="If somebody else is in your account, this is the screen that shows it — and the one that gets them out."
            body={[
              'Sessions lists each device the account is open on, with where it signed in from, so an unfamiliar entry is visible rather than theoretical. Signing out of every phone but the current one takes a single press.',
              'The exception is deliberate. The first device the account was ever set up on cannot be removed without your password, because otherwise anybody holding your unlocked phone could lock you out of your own account in one tap. The app explains the rule rather than hiding it behind a disabled button.',
              'The same care runs through signing in elsewhere: a browser sign-in asks the phone to confirm, and tells you to press No if you did not just start it. Unsent messages left on a device you sign out are discarded rather than delivered later from a phone you no longer hold.',
            ]}
            points={[
              'Every signed-in device, listed with where it signed in from.',
              'Sign out of all but this one in a single press.',
              'The first device needs your password before it can be removed.',
              'An unexpected browser sign-in is confirmed on the phone, not silently allowed.',
              'Unsent messages on a device you sign out are discarded, not delivered later.',
            ]}
            app="The first device this account signed in on stays, because taking that one needs your password."
            path={['Settings', 'Sessions', 'Sign out everywhere else']}
          />

          <DeepSection
            n={5}
            title="Finding friends without handing over your address book"
            lead="The feature that asks for the most and gives back the least is contact matching — so it is done in the one place the data already is."
            body={[
              'Matching happens on your device. What we receive is the answer to whether somebody is already on Xelvic, not a copy of who you know — the app’s own words are that numbers never leave your device in readable form.',
              'If you would rather not use contacts at all, nothing forces it: you can find people by handle instead, and the app offers both routes side by side rather than making contacts the price of admission.',
            ]}
            points={[
              'Contacts are matched on the device, not uploaded.',
              'Nothing about the match is kept as an address book on our side.',
              'Searching by handle works without contacts access at all.',
            ]}
            app="Numbers never leave your device in readable form."
            path={['Contacts', 'Allow, or search a handle', 'People you know appear']}
          />

          <DeepSection
            n={6}
            title="What security cannot do"
            lead="The honest section. Every claim above is real, and so are these limits — an app that will not name them is not being straight with you."
            body={[
              'A screenshot cannot be blocked by any app running on a normal phone. Xelvic does the only useful thing available: it tells both sides when a Spark is captured, so nobody is guessing about it. That is a light left on, not a lock.',
              'A phone that is already compromised is outside anything an app can fix. If somebody has your unlocked device, or a copy of your one-time codes, encryption on our side does not help — the app can only be as strong as the phone it is on.',
              'And two things here are genuinely one-way: a vault code with no recovery, and an account deleted more than 30 days ago. Both are deliberate, both are warned about before you commit, and neither can be undone by asking us.',
            ]}
            points={[
              'Screenshots cannot be blocked — they are announced instead.',
              'A compromised phone is beyond what any app can protect.',
              'A lost vault code is lost, permanently, by design.',
              'An account gone past 30 days cannot be brought back.',
            ]}
            app="They took a screenshot of your Spark."
          />
        </div>
      </section>

      {/* ————— responsible disclosure ————— */}
      <section className="section bg-ink-800">
        <div className="wrap max-w-4xl">
          <SectionHead
            kicker="Responsible disclosure"
            title={
              <>
                Found something? Tell us <span className="text-grad">before you tell anyone else</span>
              </>
            }
            sub="We welcome disclosure, and we would rather hear about a flaw from you than read about it. Give us enough to reproduce it, and a reasonable window to fix it before it goes anywhere public."
          />

          <div className="mt-10">
            <Prose>
              <p>
                Report something in good faith and we will work with you rather than against you.
                We will not treat a researcher doing the right thing as an attacker, we will
                acknowledge the report, and we will tell you when it is fixed.
              </p>
              <p>
                Please do not test against somebody else’s account, do not access data that is not
                yours, and do not run anything that degrades the service for other people. A
                finding demonstrated on your own account is worth just as much to us.
              </p>
            </Prose>
          </div>

          <h3 className="mt-14 font-display text-xl font-bold md:text-2xl">
            What to put in the report
          </h3>
          <Numbered className="mt-6" items={report} />

          <div className="mt-14">
            <DoDont
              doLabel="In scope"
              dontLabel="Out of scope"
              dos={[
                'The Xelvic app for Android.',
                'This website and everything served from it.',
                'Account, session and vault behaviour.',
                'How a conversation is encrypted and what the app claims about it.',
              ]}
              donts={[
                'Social engineering of anybody on the team, or of another person who uses the app.',
                'Physical attacks on a device, or anything needing an already-jailbroken phone.',
                'Denial of service, load testing, or automated scanning that degrades the service.',
                'Reports produced only by a scanner, with no explanation of what the finding means.',
              ]}
            />
          </div>

          <Note className="mt-12" title="How to reach the security team">
            One address, read by the people who build the app rather than by a queue.
            Acknowledge within 24 hours, a first assessment within a few days, and we will tell you
            when the fix ships.{' '}
            <a href="mailto:security@xelvic.app" className="font-semibold text-pink-700 underline">
              security@xelvic.app
            </a>
          </Note>
        </div>
      </section>

      <section className="pb-20 pt-20">
        <div className="wrap max-w-4xl">
          <NextLinks
            links={[
              { label: 'Safety', to: '/safety' },
              { label: 'Your Data', to: '/data' },
              { label: 'Privacy Policy', to: '/privacy' },
              { label: 'Help Center', to: '/help' },
            ]}
          />
        </div>
      </section>

      <CTABand />
    </>
  )
}
