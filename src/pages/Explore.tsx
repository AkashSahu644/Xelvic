import { useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Bell,
  Camera,
  ChevronDown,
  CirclePlus,
  Flame,
  Heart,
  Lock,
  MessageCircle,
  Mic,
  MoreVertical,
  Phone,
  Plus,
  Search,
  Users,
  Video,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import Reveal from '../components/ui/Reveal'
import PhoneFrame from '../components/ui/PhoneFrame'
import PhoneDemo, { type DemoKind } from '../components/ui/PhoneDemo'
import { CTABand } from '../components/sections/Bands'
import { features, socialFeatures } from '../data/features'
import { wallpapers } from '../data/themes'
import { useSEO } from '../hooks/usePageMeta'

/**
 * One page, the way you already use your phone: the feed, the chats and the
 * stories, each shown in the shape people know. The three tabs drive the same
 * live phone demo, so the hero is a working preview rather than a screenshot,
 * and the sections underneath take one familiar layout each — a story rail, a
 * profile grid, a chat window — instead of another grid of cards.
 */

type Mode = {
  key: string
  label: string
  icon: LucideIcon
  demo: DemoKind
  title: string
  body: string
  to: string
}

const modes: Mode[] = [
  {
    key: 'feed',
    label: 'Feed',
    icon: Heart,
    demo: 'drops',
    title: 'The scroll you already know',
    body: 'Drops and Vibes in a clean, full-bleed grid. Feel a post, leave a note, and keep scrolling — the feed stays yours.',
    to: '/features/drops-vibes',
  },
  {
    key: 'chats',
    label: 'Chats',
    icon: MessageCircle,
    demo: 'chat',
    title: 'The chats you already send',
    body: 'Texts, voice notes and files, with Sent and Delivered telling you what landed. Offline-first, so nothing is lost when the signal is.',
    to: '/features/chat',
  },
  {
    key: 'stories',
    label: 'Stories',
    icon: Camera,
    demo: 'moments',
    title: 'The stories you already watch',
    body: 'Moments sit at the top of the day for the people you keep, then tuck themselves into Memories tomorrow.',
    to: '/features/moments',
  },
]

type Story = {
  name: string
  img: string
  to: string
  own?: boolean
  live?: boolean
}

const stories: Story[] = [
  { name: 'Your story', img: '/media/char/bio.png', to: '/features/moments', own: true },
  { name: 'Live now', img: '/media/themes/catgirl/live.jpg', to: '/features/live-rooms', live: true },
  { name: 'Anime Blue', img: '/media/themes/covers/animeblue.png', to: '/features/themes' },
  { name: 'Catgirl', img: '/media/themes/covers/catgirl.png', to: '/features/themes' },
  { name: 'Teddy', img: '/media/themes/covers/teddy.png', to: '/features/themes' },
  { name: 'Fresh drops', img: '/media/themes/alone/drops.jpg', to: '/features/drops-vibes' },
  { name: 'Trending audio', img: '/media/themes/alone/audio.jpg', to: '/features/audio' },
  { name: 'Today', img: '/media/themes/animeblue/moments.jpg', to: '/features/moments' },
]

type Post = {
  img: string
  likes: string
  notes: string
  to: string
  video?: boolean
}

const posts: Post[] = [
  { img: '/media/themes/animeblue/drops.jpg', likes: '12.4k', notes: '318', to: '/features/drops-vibes' },
  { img: '/media/themes/catgirl/moment.jpg', likes: '8,902', notes: '214', to: '/features/moments', video: true },
  { img: '/media/themes/catgirl/live.jpg', likes: '21.7k', notes: '640', to: '/features/live-rooms', video: true },
  { img: '/media/themes/alone/audio.jpg', likes: '4,118', notes: '96', to: '/features/audio' },
  { img: '/media/themes/teddy/convo.jpg', likes: '17.2k', notes: '502', to: '/features/themes' },
  { img: '/media/themes/catgirl/drops.jpg', likes: '9,441', notes: '188', to: '/features/drops-vibes' },
  { img: '/media/themes/animeblue/chat.jpg', likes: '6,730', notes: '143', to: '/features/chat' },
  { img: '/media/themes/alone/convo.jpg', likes: '11.9k', notes: '276', to: '/features/themes' },
  { img: '/media/themes/animeblue/moments.jpg', likes: '14.1k', notes: '367', to: '/features/moments', video: true },
]

type Chat = {
  name: string
  status: string
  time: string
  letter: string
  tone: string
  ring?: boolean
  unread?: boolean
  bell?: boolean
  flame?: 'pink' | 'gold'
}

const chats: Chat[] = [
  {
    name: 'Emily Carter',
    status: 'Nothing new',
    time: '14m',
    letter: 'E',
    tone: '#7c3aed',
    ring: true,
    flame: 'pink',
  },
  {
    name: 'Notifications',
    status: 'Ashley 😊😊 did something',
    time: '21m',
    letter: '',
    tone: '#ffd6e5',
    bell: true,
    unread: true,
  },
  {
    name: 'Sydney Grant',
    status: '1 new',
    time: '33m',
    letter: 'S',
    tone: '#7c3aed',
    unread: true,
    flame: 'gold',
  },
  {
    name: 'Ava Thompson',
    status: 'Delivered',
    time: '34m',
    letter: 'AT',
    tone: '#0f9b8e',
    ring: true,
    flame: 'gold',
  },
  { name: 'its_riley😊', status: 'Sent', time: '34m', letter: 'R', tone: '#4f46e5', flame: 'gold' },
  {
    name: 'Alex Rivera',
    status: 'Sent',
    time: '34m',
    letter: 'A',
    tone: '#0f9b8e',
    ring: true,
    flame: 'pink',
  },
  { name: 'Dylan Carter', status: 'Sent', time: '34m', letter: 'DC', tone: '#0f9b8e', flame: 'pink' },
  { name: 'Marcus Reed', status: 'Sent', time: '34m', letter: 'MR', tone: '#0f9b8e', flame: 'gold' },
]

/** A message in the wide chat window — the app's own bubble, not a WhatsApp one. */
function Line({ mine = false, children }: { mine?: boolean; children: ReactNode }) {
  return (
    <div className={`flex ${mine ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[78%] rounded-2xl px-3.5 py-2 text-sm leading-relaxed shadow-[0_1px_2px_rgba(58,10,36,.06)] ${
          mine ? 'rounded-br-md bg-[#f7bcd6]' : 'bg-pure'
        }`}
      >
        {children}
      </div>
    </div>
  )
}

export default function Explore() {
  useSEO()
  const [mode, setMode] = useState(0)
  const active = modes[mode]

  return (
    <>
      {/* ── the hero: feed, chats and stories in a working phone ─────────── */}
      <section className="relative overflow-hidden pb-16 pt-[calc(9rem+env(safe-area-inset-top))] md:pb-24 md:pt-[calc(11rem+env(safe-area-inset-top))]">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <img
            src="/media/walls/sheher.jpg"
            alt=""
            className="h-full w-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink-900/60 via-ink-800/80 to-ink-900" />
          <div className="absolute left-1/4 top-0 h-[min(400px,60vw)] w-[min(700px,110vw)] -translate-x-1/2 rounded-full bg-blue/20 blur-[120px]" />
          <div className="absolute bottom-10 right-0 h-[min(340px,52vw)] w-[min(600px,100vw)] translate-x-1/4 rounded-full bg-pink-400/25 blur-[110px]" />
        </div>

        <div className="wrap">
          <div className="grid items-center gap-12 lg:grid-cols-[1.02fr_0.98fr] lg:gap-16">
            <div className="mx-auto w-full max-w-xl lg:mx-0">
              <Reveal delay={0.05}>
                <h1 className="font-display text-[clamp(2.5rem,8vw,3.25rem)] font-bold leading-[1.02] tracking-tight md:text-[clamp(3.75rem,6.4vw,4.75rem)]">
                  The feed, the chats, the stories —{' '}
                  <span className="text-grad">one app</span>
                </h1>
              </Reveal>

              <Reveal delay={0.1}>
                <p className="mt-5 max-w-lg text-base leading-relaxed text-plum/55 md:text-lg">
                  Everything you already open three apps for, in one place —
                  with calls, live rooms, music and a marketplace besides.
                </p>
              </Reveal>

              <Reveal delay={0.15}>
                <div className="mt-8 flex flex-wrap gap-2">
                  {modes.map((m, i) => {
                    const Icon = m.icon
                    return (
                      <button
                        key={m.key}
                        type="button"
                        data-active={mode === i}
                        onClick={() => setMode(i)}
                        className="tab inline-flex items-center gap-2"
                      >
                        <Icon size={16} />
                        {m.label}
                      </button>
                    )
                  })}
                </div>
              </Reveal>

              <div className="mt-7 min-h-[220px] sm:min-h-[176px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active.key}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="font-display text-2xl font-bold md:text-3xl">
                      {active.title}
                    </h2>
                    <p className="mt-3 max-w-md text-base leading-relaxed text-plum/55">
                      {active.body}
                    </p>
                    <Link
                      to={active.to}
                      className="group mt-5 inline-flex items-center gap-2 text-sm font-bold text-pink-600"
                    >
                      See it in the app
                      <ArrowRight
                        size={16}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </Link>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            <Reveal delay={0.2} className="flex justify-center lg:justify-end">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.key}
                  initial={{ opacity: 0, scale: 0.95, rotateY: -10 }}
                  animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                  exit={{ opacity: 0, scale: 0.95, rotateY: 10 }}
                  transition={{ duration: 0.4 }}
                >
                  <PhoneFrame tilt glow="rgba(236,72,153,.42)" size="lg">
                    <PhoneDemo kind={active.demo} />
                  </PhoneFrame>
                </motion.div>
              </AnimatePresence>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── the story rail ────────────────────────────────────────────────── */}
      <section className="pb-16">
        <div className="wrap">
          <Reveal>
            <div className="rounded-[2rem] border border-plum/10 bg-pure p-4 shadow-card sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="font-display text-xl font-bold sm:text-2xl">
                  Stories from today
                </h2>
                <Link
                  to="/features/moments"
                  className="group inline-flex items-center gap-1.5 text-sm font-bold text-pink-600"
                >
                  Open Moments
                  <ArrowRight
                    size={15}
                    className="transition-transform group-hover:translate-x-0.5"
                  />
                </Link>
              </div>

              <div className="mt-5 flex gap-4 overflow-x-auto pb-1">
                {stories.map((s) => (
                  <Link
                    key={s.name}
                    to={s.to}
                    className="group flex w-[78px] shrink-0 flex-col items-center gap-2"
                  >
                    <span className="relative rounded-full bg-brand-grad p-[3px] transition-transform duration-200 group-hover:-translate-y-0.5">
                      <span className="block rounded-full bg-pure p-[2px]">
                        <img
                          src={s.img}
                          alt=""
                          loading="lazy"
                          className={`h-16 w-16 rounded-full ${
                            s.own ? 'bg-pink-100 object-contain p-1.5' : 'object-cover'
                          }`}
                        />
                      </span>
                      {s.own && (
                        <span className="absolute -bottom-0.5 -right-0.5 grid h-5 w-5 place-items-center rounded-full border-2 border-pure bg-plum text-pure">
                          <Plus size={11} strokeWidth={3} />
                        </span>
                      )}
                      {s.live && (
                        <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 rounded-full bg-[#ff2d78] px-1.5 py-[1px] text-[8px] font-bold leading-tight text-pure">
                          LIVE
                        </span>
                      )}
                    </span>
                    <span className="w-full truncate text-center text-xs font-semibold text-plum/70">
                      {s.name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── the profile grid ──────────────────────────────────────────────── */}
      <section className="section bg-ink-800">
        <div className="wrap">
          <Reveal>
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
              <span className="rounded-full bg-brand-grad p-[3px]">
                <span className="block rounded-full bg-pure p-[3px]">
                  <img
                    src="/media/walls/xelvic.jpg"
                    alt=""
                    loading="lazy"
                    className="h-20 w-20 rounded-full object-cover"
                  />
                </span>
              </span>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h2 className="font-display text-2xl font-bold">@xelvic</h2>
                  <BadgeCheck size={19} className="text-[#1d9bf0]" />
                </div>
                <p className="mt-1 max-w-md text-sm leading-relaxed text-plum/55">
                  Drops, Vibes, Moments and the people who make them. The whole
                  feed lives inside the same app you chat in.
                </p>
              </div>

              <Link
                to="/download"
                className="btn btn-white shrink-0 self-start sm:self-auto"
              >
                Get the app
              </Link>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-x-7 gap-y-2 border-y border-plum/10 py-3 text-sm">
              <span>
                <b className="font-bold">1,204</b>{' '}
                <span className="text-plum/50">drops</span>
              </span>
              <span>
                <b className="font-bold">2.4M</b>{' '}
                <span className="text-plum/50">on Xelvic</span>
              </span>
              <span>
                <b className="font-bold">312</b>{' '}
                <span className="text-plum/50">keeps</span>
              </span>
            </div>
          </Reveal>

          <div className="mt-4 grid grid-cols-3 gap-1.5 sm:gap-2">
            {posts.map((p, i) => (
              <Reveal key={p.img + i} delay={(i % 3) * 0.04}>
                <Link
                  to={p.to}
                  className="group relative block aspect-square overflow-hidden rounded-xl bg-plum/10"
                >
                  <img
                    src={p.img}
                    alt=""
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-plum/60 via-transparent to-transparent" />
                  <span className="absolute bottom-2 left-2 flex items-center gap-3 text-[11px] font-bold text-pure">
                    <span className="flex items-center gap-1">
                      <Heart size={12} className="fill-pure text-pure" />
                      {p.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle size={12} />
                      {p.notes}
                    </span>
                  </span>
                  {p.video && (
                    <span className="absolute right-2 top-2 grid h-6 w-6 place-items-center rounded-full bg-black/45 text-pure backdrop-blur">
                      <Camera size={12} />
                    </span>
                  )}
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── the chat window ───────────────────────────────────────────────── */}
      <section className="section">
        <div className="wrap">
          <Reveal>
            <h2 className="font-display text-3xl font-bold md:text-4xl">
              Chats that feel <span className="text-grad">like home</span>
            </h2>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-plum/55">
              Groups, channels, voice notes and delivery states that tell you
              what landed — with an outbox that sends itself the moment the
              signal comes back.
            </p>
            <Link
              to="/features/chat"
              className="group mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-pink-600"
            >
              See how messaging works
              <ArrowRight
                size={15}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </Link>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-8 overflow-hidden rounded-[2rem] border border-plum/10 bg-pure shadow-card lg:grid lg:grid-cols-[340px_1fr]">
              {/* the chat list, drawn the way the app draws it */}
              <div className="border-b border-plum/10 lg:border-b-0 lg:border-r">
                <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 bg-pink-50 px-3 py-3">
                  <span className="flex items-center gap-3">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#0f9b8e] text-[11px] font-bold text-pure ring-2 ring-pink-400 ring-offset-2 ring-offset-pink-50">
                      AS
                    </span>
                    <Search size={19} className="shrink-0 text-plum/60" />
                  </span>
                  <span className="flex items-center justify-center gap-1.5">
                    <span className="font-display text-lg font-bold">Convo</span>
                    <span className="h-2 w-2 rounded-full bg-[#16a34a]" />
                  </span>
                  <span className="flex items-center justify-end gap-3 text-plum/60">
                    <Users size={19} />
                    <Camera size={19} />
                  </span>
                </div>

                <div className="flex border-b border-plum/[0.07] bg-pink-50 text-xs font-bold">
                  {['All 13', 'Unread 1', 'Requested', 'Calls'].map((t, i) => (
                    <span
                      key={t}
                      className={`relative flex-1 py-2.5 text-center ${
                        i === 0 ? 'text-pink-600' : 'text-plum/45'
                      }`}
                    >
                      {t}
                      {i === 0 && (
                        <span className="absolute inset-x-0 -bottom-px h-0.5 bg-pink-500" />
                      )}
                    </span>
                  ))}
                </div>

                <div>
                  {chats.map((c) => (
                    <div
                      key={c.name}
                      className={`relative flex items-center gap-3 px-4 py-2.5 ${
                        c.unread ? 'bg-[#ffe9f1]' : ''
                      }`}
                    >
                      {c.unread && (
                        <span className="absolute inset-y-0 left-0 w-[3px] bg-pink-500" />
                      )}

                      <span
                        className={`grid h-11 w-11 shrink-0 place-items-center rounded-full text-[13px] font-bold ${
                          c.bell ? 'bg-[#ffd6e5] text-pink-500' : 'text-pure'
                        } ${c.ring ? 'ring-2 ring-pink-400 ring-offset-2 ring-offset-pure' : ''}`}
                        style={c.bell ? undefined : { background: c.tone }}
                      >
                        {c.bell ? <Bell size={19} /> : c.letter}
                      </span>

                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-bold">{c.name}</span>
                        <span
                          className={`mt-0.5 block truncate text-xs ${
                            c.unread ? 'text-plum/70' : 'text-plum/45'
                          }`}
                        >
                          {c.status}
                        </span>
                      </span>

                      <span className="flex shrink-0 items-center gap-1.5">
                        {c.flame && (
                          <Flame
                            size={14}
                            className={
                              c.flame === 'pink'
                                ? 'fill-pink-500 text-pink-500'
                                : 'fill-amber-400 text-amber-400'
                            }
                          />
                        )}
                        <span className="text-[11px] text-plum/40">{c.time}</span>
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* the conversation, opened the way the app opens one */}
              <div className="relative hidden min-h-[520px] flex-col bg-[#fbfbfb] lg:flex">
                <div className="flex items-center gap-2.5 border-b border-plum/[0.06] bg-pure px-3 py-2.5">
                  <ArrowLeft size={20} className="shrink-0 text-plum/70" />
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#7c3aed] text-xs font-bold text-pure">
                    E
                  </span>
                  <span className="flex min-w-0 flex-1 items-center gap-1">
                    <span className="truncate text-sm font-bold">Emily Carter</span>
                    <BadgeCheck size={15} className="shrink-0 text-[#1d9bf0]" />
                  </span>
                  <span className="flex items-center gap-4 text-plum/60">
                    <Phone size={17} />
                    <Video size={17} />
                    <MoreVertical size={17} />
                  </span>
                </div>

                <div className="flex flex-1 flex-col gap-2 p-3 sm:p-4">
                  <span className="mx-auto flex items-center gap-1.5 rounded-full border border-plum/10 bg-pure px-3 py-1.5 text-[11px] font-semibold text-plum/55">
                    <Lock size={11} />
                    This convo is encrypted
                  </span>
                  <span className="mx-auto rounded-full border border-plum/10 bg-pure px-2.5 py-1 text-[11px] font-semibold text-plum/55">
                    9 Oct
                  </span>

                  <Line>Did you see the new Drops grid?</Line>
                  <Line>It is so much cleaner than I expected.</Line>
                  <Line>Also — the track you sent is on repeat.</Line>

                  <div className="mt-1 flex justify-end">
                    <span className="flex flex-col items-end gap-1">
                      <img
                        src="/media/themes/catgirl/drops.jpg"
                        alt=""
                        loading="lazy"
                        className="h-24 w-20 rounded-xl object-cover"
                      />
                      <span className="text-[10px] text-plum/40">11:57</span>
                    </span>
                  </div>

                  <Line>Same here. One app for all of it.</Line>
                </div>

                <span className="absolute bottom-[70px] right-4 grid h-9 w-9 place-items-center rounded-full bg-pure text-plum/60 shadow-card">
                  <ChevronDown size={18} />
                </span>

                <div className="flex items-center gap-2 border-t border-plum/[0.06] bg-pure px-3 py-2.5">
                  <CirclePlus size={22} className="shrink-0 text-pink-500" />
                  <span className="flex min-w-0 flex-1 items-center rounded-full border border-plum/10 bg-pure px-4 py-2.5 text-sm text-plum/40">
                    Say something
                  </span>
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#e11d74] text-pure">
                    <Mic size={17} />
                  </span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── every feature, in a bento ─────────────────────────────────────── */}
      <section className="section bg-ink-800">
        <div className="wrap">
          <Reveal>
            <h2 className="font-display text-3xl font-bold md:text-4xl">
              Six apps&rsquo; worth of fun, <span className="text-grad">in one</span>
            </h2>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-plum/55">
              Messaging, calling, stories, live audio, a social feed, music and a
              creator economy — one home, one login, one look.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f, i) => {
              const Icon = f.icon
              const featured = i === 0
              return (
                <Reveal
                  key={f.slug}
                  delay={(i % 4) * 0.05}
                  className={`h-full ${featured ? 'sm:col-span-2' : ''}`}
                >
                  <Link
                    to={`/features/${f.slug}`}
                    className={`group flex h-full flex-col rounded-3xl p-6 transition-all duration-200 hover:-translate-y-1 ${
                      featured
                        ? 'bg-gradient-to-br from-plum to-[#6b1f45] text-pure shadow-card-dark'
                        : 'border border-plum/10 bg-pure hover:border-pink-400/50 hover:shadow-pink-soft'
                    }`}
                  >
                    <span
                      className="grid h-12 w-12 place-items-center rounded-2xl text-pure shadow-glow-sm"
                      style={{ background: `linear-gradient(135deg, ${f.color}, #ff8fc4)` }}
                    >
                      <Icon size={22} />
                    </span>
                    <h3 className="mt-5 text-lg font-bold">{f.name}</h3>
                    <p
                      className={`mt-2 flex-1 text-sm leading-relaxed ${
                        featured ? 'text-pure/70' : 'text-plum/55'
                      }`}
                    >
                      {f.blurb}
                    </p>
                    <span
                      className={`mt-5 inline-flex items-center gap-1.5 text-sm font-bold ${
                        featured ? 'text-pink-200' : 'text-pink-600'
                      }`}
                    >
                      Explore
                      <ArrowRight
                        size={15}
                        className="transition-transform group-hover:translate-x-0.5"
                      />
                    </span>
                  </Link>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── the social layer ──────────────────────────────────────────────── */}
      <section className="section">
        <div className="wrap">
          <Reveal>
            <h2 className="font-display text-3xl font-bold md:text-4xl">
              The social layer
            </h2>
            <p className="mt-3 max-w-xl text-lg leading-relaxed text-plum/55">
              Sparks, Circles and the rest — the things that make Xelvic feel
              like people, not a product.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {socialFeatures.map((s, i) => {
              const Icon = s.icon
              return (
                <Reveal key={s.name} delay={(i % 3) * 0.05} className="h-full">
                  <div className="flex h-full gap-4 rounded-2xl border border-plum/10 bg-pure p-5">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-pink-100 text-pink-600">
                      <Icon size={20} />
                    </span>
                    <div>
                      <h3 className="font-bold">{s.name}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-plum/55">{s.body}</p>
                    </div>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── wallpapers ─────────────────────────────────────────────────────── */}
      <section className="pb-16">
        <div className="wrap">
          <Reveal>
            <div className="rounded-[2rem] bg-ink-800 p-5 sm:p-7">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <h2 className="font-display text-2xl font-bold md:text-3xl">
                    Pick a backdrop
                  </h2>
                  <p className="mt-2 max-w-lg text-plum/55">
                    Hand-painted wallpapers like Mehfil, Raat, Safar and Sheher —
                    drop one behind any conversation.
                  </p>
                </div>
                <Link
                  to="/features/themes"
                  className="group inline-flex items-center gap-1.5 text-sm font-bold text-pink-600"
                >
                  All themes
                  <ArrowRight
                    size={15}
                    className="transition-transform group-hover:translate-x-0.5"
                  />
                </Link>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3 sm:grid-cols-6">
                {wallpapers.map((w) => (
                  <Link
                    key={w.slug}
                    to="/features/themes"
                    className="group relative aspect-[9/16] overflow-hidden rounded-2xl border border-plum/10"
                  >
                    <img
                      src={w.src}
                      alt={w.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-plum/80 to-transparent px-2.5 pb-2 pt-6 text-xs font-bold text-pure">
                      {w.name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── on to the rest of the site ────────────────────────────────────── */}
      <section className="pb-8">
        <div className="wrap flex flex-wrap justify-center gap-3">
          <Link to="/how-it-works" className="chip">
            How it all works
          </Link>
          <Link to="/features" className="chip">
            All features
          </Link>
          <Link to="/whats-new" className="chip">
            What&rsquo;s new
          </Link>
          <Link
            to="/download"
            className="chip inline-flex items-center gap-1.5 font-bold text-pink-600"
          >
            Download <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      <CTABand />
    </>
  )
}
