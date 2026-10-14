import PageHero from '../components/layout/PageHero'
import Reveal from '../components/ui/Reveal'
import { DeepSection, NextLinks } from '../components/ui/Explainers'
import { CTABand } from '../components/sections/Bands'
import { socials } from '../data/socials'
import {
  Lede,
  Stats,
  Blocks,
  SectionHead,
  Prose,
  Note,
} from '../components/ui/Editorial'
import { useSEO } from '../hooks/usePageMeta'
import { graph, webPageLd } from '../data/jsonld'

/* The four places a Xelvic account is not alone. Each carries a line the app
   itself uses, so the block is a pointer to the build rather than a promise. */
const gather = [
  {
    t: 'Circles',
    d: 'Pick what you are into and land in a room of fifty who picked the same thing. It gets one small task a day, and the best take goes to the top.',
    app: 'Pick what you are into.',
  },
  {
    t: 'Sparks',
    d: 'A day two people talk on is one spark. Nobody is handed one — the first line starts it, and both of you keep it alive.',
    app: 'Your first line starts the spark.',
  },
  {
    t: 'Rooms and stages',
    d: 'Voices only, with a stage for the people talking and a room chat for everybody else. The host decides who is on the mic.',
    app: 'Only the stage can play. Raise your hand to be brought up.',
  },
  {
    t: 'Creators and deals',
    d: 'Brands invite creators, a deliverable releases the payment, and the agreement sits next to the money rather than in a separate inbox.',
    app: 'Invite creators to make content and track paid deals, agreement to payment, in the open.',
  },
]

/* The run ladder, in order. Names and day ranges are the ones the run card in
   the app uses; the note under each is ours, saying what the rung means rather
   than what the app prints. Set as a table rather than as tiles, because a
   ladder read top to bottom is the whole point of it. */
const LADDER: { name: string; range: string; tone: string; note: string }[] = [
  { name: 'Ember', range: '1–3 days', tone: '#d97706', note: 'It has started. Two people said something on the same day.' },
  { name: 'Flame', range: '4–7 days', tone: '#dc2626', note: 'A working week of neither of you letting it drop.' },
  { name: 'Blaze', range: '8–15 days', tone: '#db2777', note: 'Past a fortnight, and it stops looking like an accident.' },
  { name: 'Comet', range: '16–30 days', tone: '#9333ea', note: 'A month in, and the counter is part of the day.' },
  { name: 'Nova', range: '31–60 days', tone: '#c026d3', note: 'Where a long run sits, and where a Shield earns its keep.' },
  { name: 'Supernova', range: '61–99 days', tone: '#7c3aed', note: 'Two months of both of you turning up.' },
  { name: 'Century', range: '100+ days', tone: '#0284c7', note: 'The top of the ladder, with nothing above it.' },
]

/* What keeps a public space worth being in. Same shape as the rest of the site:
   a claim, then the app's own line underneath it. */
const principles = [
  {
    t: 'Somebody actually reads it',
    d: 'A report goes to a queue a moderator works through by hand — not to a filter that decides on its own and tells nobody.',
    app: 'A moderator looks at it.',
  },
  {
    t: 'Nobody is named',
    d: 'The person you reported is not told who reported them, and nothing happens to them automatically. A report starts a review.',
    app: 'Nobody is told you reported this, and nothing happens to them on its own.',
  },
  {
    t: 'A block works both ways',
    d: 'One press, and neither of you can reach or even see the other online. The convo stays where it is rather than vanishing.',
    app: 'They cannot reach you, and neither of you sees the other online.',
  },
  {
    t: 'Nothing has to shout',
    d: 'A room can be turned down without being left, and a message can arrive with no sound and no badge at all.',
    app: 'No sound, no badge. It still arrives.',
  },
]

export default function Community() {
  useSEO({
    title: 'Community — Xelvic',
    description:
      'Circles, Sparks, rooms and creators — how the people on Xelvic find each other, keep a run going, hold a stage and keep the place worth being in.',
    image: '/media/walls/mehfil.jpg',
    jsonLd: graph(
      webPageLd({
        name: 'The Xelvic community',
        description:
          'Circles, Sparks, rooms and creators — how the people on Xelvic find each other, keep a run going, hold a stage and keep the place worth being in.',
        path: '/community',
        image: '/media/walls/mehfil.jpg',
        breadcrumbs: [
          { name: 'Home', path: '/' },
          { name: 'Community', path: '/community' },
        ],
      }),
    ),
  })

  return (
    <>
      <PageHero
        title={
          <>
            The Xelvic <span className="text-grad">community</span>
          </>
        }
        sub="Circles to land in, Sparks to keep, rooms to hold and creators to build with — plus the rules that keep any of it worth showing up for."
        wall="/media/walls/mehfil.jpg"
      />

      <section className="pb-16">
        <div className="wrap">
          <Lede>
            Two of the four places below are for the people you already know, and two are for the
            ones you do not yet — which, for anybody arriving without a contact list, is the whole
            point. Every claim here is followed by the line the app itself prints.
          </Lede>
        </div>
      </section>

      <section className="pb-20">
        <div className="wrap">
          <Stats
            items={[
              { value: 'Fifty', label: 'People in a circle', note: 'Grouped by interest rather than by who you already know.' },
              { value: 'One', label: 'Task a day', note: 'The same task for everybody in that circle, and a short answer is enough.' },
              { value: '100', label: 'Days in the longest run', note: 'A Spark moves only when both people show up, all the way up.' },
              { value: 'Weekly', label: 'A Shield banks', note: 'Up to a cap the app shows you, to cover the occasional missed day.' },
            ]}
          />
        </div>
      </section>

      {/* ————— where people gather ————— */}
      <section className="section bg-ink-800">
        <div className="wrap">
          <SectionHead
            kicker="Four places you are not alone"
            title={
              <>
                Where the people on Xelvic <span className="text-grad">actually are</span>
              </>
            }
            sub="Two of these are for the people you already know and two are for the ones you do not yet — which, for anyone arriving without a contact list, is the whole point."
          />
          <Blocks className="mt-10" cols={4} items={gather} />
        </div>
      </section>

      {/* the long version */}
      <section className="section">
        <div className="wrap space-y-16">
          <DeepSection
            n={1}
            title="Circles: a small room that does one thing"
            lead="Fifty people who picked the same interest, one task a day, and a scoreboard nobody has to argue about."
            body={[
              'Circles are the part of Xelvic that has nothing to do with the people you already know. You pick what you are into, the app puts you in a circle of fifty who chose the same thing, and every day that circle gets one small task to answer.',
              'The task is deliberately small — a question with a short answer rather than a thread you have to maintain. Answer it and you have done your bit for the day. The best take goes to the top, which is the only ranking on Xelvic decided by other people rather than by a counter.',
              'It also solves the problem every new account has. You do not need to arrive with a contact list to find somebody worth talking to; you need one interest and an answer.',
            ]}
            points={[
              'A circle is fifty people, grouped by interest rather than by who you know.',
              'One task a day, and it is the same task for everybody in that circle.',
              'The best take goes to the top — that is the entire scoreboard.',
              'Your task arrives at a set time, and the app tells you when.',
            ]}
            app="Pick what you are into. You land in a circle of fifty who chose the same thing, and every day it gets one small task to answer. Best take goes to the top."
            path={['Pick what you are into', 'Land in a circle of fifty', 'Answer the day’s task']}
          />

          {/* ————— the ladder ————— */}
          <DeepSection
            n={2}
            title="What a run grows into"
            lead="A long spark gets a name. The app sorts a run into seven rungs, and the card shows the one you are standing on along with whatever comes next."
          >
            <Reveal>
              <ol className="mt-8 divide-y divide-plum/10 border-y border-plum/10">
                {LADDER.map((r, i) => (
                  <li
                    key={r.name}
                    className="grid gap-1 py-4 sm:grid-cols-[36px_150px_120px_minmax(0,1fr)] sm:items-baseline sm:gap-5"
                  >
                    <span className="font-display text-xs font-bold tracking-[0.14em] text-plum/25">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="font-display text-lg font-bold leading-snug text-plum">
                      {r.name}
                    </span>
                    <span
                      className="text-[11px] font-bold uppercase tracking-[0.14em]"
                      style={{ color: r.tone }}
                    >
                      {r.range}
                    </span>
                    <span className="leading-relaxed text-white/60">{r.note}</span>
                  </li>
                ))}
              </ol>
            </Reveal>

            <Prose className="mt-8">
              <p>
                Seven rungs, and the last one is a hundred days of both people turning up. There is
                nothing above it, which is the point — a ladder you can finish is a ladder worth
                climbing.
              </p>
            </Prose>
          </DeepSection>

          <DeepSection
            n={3}
            title="A Spark, day by day"
            lead="A counter that only moves if both people do something, which is the only reason it means anything."
            body={[
              'A spark is not a follower count and it is not something you can buy. It starts the moment two people have both said something on the same day, and it does not matter who went first — the app is explicit about that, because the whole value of the thing depends on it being mutual.',
              'Every day after that, both of you have to say something before the day is out. Miss one and a Shield takes the hit instead of the run. Shields bank once a week, up to a cap the app shows you, so there are only so many days you can sleep through before the run is the thing that suffers.',
              'Your run is yours to look at rather than to broadcast — showing sparks is a setting, not a default. What the other person does see is a screenshot: capture a Spark and the app notes it on your screen and tells them their Spark was captured. It cannot stop the screenshot; it just refuses to let it be quiet.',
              'One more rule worth knowing before you start counting: a one-to-one convo keeps its own spark, and a group does not count towards one. A spark is meant to be the two of you, not a room you both happen to be sitting in.',
            ]}
            steps={[
              { t: 'Both of you say something', d: 'On the same day, in the same convo. Whoever speaks first does not matter — the app is explicit about that.' },
              { t: 'Keep it up daily', d: 'Every day after that, both of you have to speak before the day is out or the run is at risk.' },
              { t: 'Let a Shield take a hit', d: 'A Shield covers one missed day. They bank once a week, up to a cap the app shows you.' },
              { t: 'Watch it name itself', d: 'Past a week the run picks up a rung — Ember, Flame, Blaze, and up to Century at a hundred days.' },
            ]}
            points={[
              'Starts when both people have said something on the same day, whoever went first.',
              'Keeps going only if both of you speak before the day ends.',
              'A Shield covers a missed day, banks once a week, and has a cap.',
              'Groups do not count towards a spark — only a one-to-one convo does.',
              'A screenshot of a Spark is announced to the other person.',
            ]}
            app="Nobody yet. A day two people talk on is one spark, and it does not matter who of you sent first."
            path={['Open the convo', 'The counter sits at the top', 'Both of you speak to keep it']}
          />

          <DeepSection
            n={4}
            title="Rooms, stages and who holds the mic"
            lead="A live room is a stage with an audience, and the host is the one who decides which is which."
            body={[
              'A room is voices only. Anybody on the stage can be heard, and everybody else can talk in the room chat and throw emoji at what they are hearing — a good split, because it means a room of two hundred can still be a conversation rather than a wall of noise.',
              'The host holds it. They hand out the microphones, bring people up from the audience, and put them back down; and the app explains the rule rather than simply refusing you when you try to speak from the audience.',
              'Groups carry their own version of the same idea. A channel set to announcements is read-only for everyone but the admins, and the app says so on the screen instead of leaving you to find out by typing into it. Rooms you open stay in your list afterwards, whether they were on, coming or over.',
            ]}
            steps={[
              { t: 'Open a room', d: 'Pick voices and start. It is announced to the people who follow you the moment you go.' },
              { t: 'Bring people up', d: 'Only the stage is heard. Somebody in the audience raises a hand and the host brings them up.' },
              { t: 'Hand the mic round', d: 'The host decides who speaks and who steps back down to the audience.' },
              { t: 'Close it', d: 'The room stays in your list afterwards, so what you hosted is not lost when it ends.' },
            ]}
            points={[
              'Voices only — the audience talks in chat and reacts with emoji.',
              'Only the stage is heard, and the host decides who is on it.',
              'An announcements channel is read-only for everybody but admins.',
              'A locked channel means only admins can send for now.',
              'Rooms you host stay in your list once they are over.',
            ]}
            app="Voices only. Anybody on the stage can be heard, and the audience can talk in the room’s chat and throw emoji."
            path={['Open Live', 'Pick voices', 'Bring the stage up']}
          />

          <DeepSection
            n={5}
            title="Groups, invites and the door"
            lead="Who gets in, who can speak, and what leaving costs — all of it stated rather than implied."
            body={[
              'A group is you and at least one other person, and whoever runs it decides who is allowed in. Invites can be turned off entirely, and the app is blunt about what that does: nobody new can join, links included. Turn them back on and the links that were already handed out start working again.',
              'Inside a group there are channels, and each can be open or read-only. That is the difference between an announcements channel and a room to talk in, and the app tells you which one you are looking at rather than letting you discover it by typing a message nobody will see.',
              'Leaving is the sharp edge, and it is worth knowing before you do it: everything goes with you — the channels, what was said in them, and your place in the group. Getting back in is not automatic, and somebody still inside has to add you back. If you would rather not be found in the first place, a private account means new people send a request instead of being able to keep you outright.',
            ]}
            points={[
              'Invites can be switched off, which stops new joins and disables every link.',
              'Turning invites back on makes the links that already exist work again.',
              'A channel is either open to the group or read-only for all but the admins.',
              'Leaving a group takes the channels, everything said in them, and your place in it.',
              'Getting back in needs somebody still inside to add you back.',
              'A private account takes requests rather than accepting people outright.',
            ]}
            app="Invites are off. Nobody new can join, links included."
            path={['Group', 'Member controls', 'Invites on or off']}
          />
        </div>
      </section>

      {/* ————— keeping it worth being in ————— */}
      <section className="section bg-ink-800">
        <div className="wrap">
          <SectionHead
            kicker="The house rules"
            title={
              <>
                What keeps a public place <span className="text-grad">worth being in</span>
              </>
            }
            sub="Four things the app does by design, because a community is not a feature you ship once. Every line below is the app talking, not us."
          />
          <Blocks className="mt-10" cols={4} items={principles} />
        </div>
      </section>

      {/* ————— if something is wrong ————— */}
      <section className="section">
        <div className="wrap max-w-4xl">
          <Note title="If something in a circle, a room or a group is wrong">
            Report it from where it happened — the profile, the message, the comment or the room. It
            reaches a moderator, the person is not told who reported them, and nothing happens to
            them on its own. If anybody is in danger, your local emergency services come before
            anything on this site.
          </Note>

          <div className="mt-10">
            <NextLinks
              links={[
                { label: 'Safety', to: '/safety' },
                { label: 'Report it', to: '/support' },
                { label: 'Community guidelines', to: '/terms' },
              ]}
            />
          </div>
        </div>
      </section>

      {/* ————— the same people, elsewhere ————— */}
      <section className="section bg-ink-800">
        <div className="wrap max-w-4xl">
          <SectionHead
            kicker="Elsewhere"
            title="The same people, on other platforms"
            sub="Announcements land here first, and every one of these is run by us rather than by a fan account."
          />
          <Reveal>
            <dl className="mt-10 divide-y divide-plum/10 border-y border-plum/10">
              {socials.map(({ label, href }) => (
                <div
                  key={label}
                  className="grid gap-1.5 py-4 sm:grid-cols-[210px_minmax(0,1fr)] sm:gap-8"
                >
                  <dt className="text-[11px] font-bold uppercase tracking-[0.14em] text-plum/40 sm:pt-1">
                    {label}
                  </dt>
                  <dd className="min-w-0">
                    <a
                      href={href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="break-all font-semibold text-pink-600 underline decoration-pink-500/30 underline-offset-4 transition-colors hover:decoration-pink-500"
                    >
                      {href.replace(/^https?:\/\//, '')}
                    </a>
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      <section className="pb-20 pt-20">
        <div className="wrap max-w-4xl">
          <NextLinks
            links={[
              { label: 'What’s New', to: '/whats-new' },
              { label: 'Creators', to: '/creators' },
              { label: 'Safety', to: '/safety' },
              { label: 'Help Center', to: '/help' },
            ]}
          />
        </div>
      </section>

      <CTABand />
    </>
  )
}
