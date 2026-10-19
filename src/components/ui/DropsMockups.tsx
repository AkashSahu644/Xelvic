import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import {
  AtSign,
  AudioLines,
  Bookmark,
  Cast,
  ChevronLeft,
  Clapperboard,
  Ellipsis,
  EyeOff,
  Globe,
  Heart,
  LayoutGrid,
  MessageSquare,
  MoreVertical,
  Play,
  Plus,
  Radio,
  Search,
  Share2,
  Sparkles,
  UserPlus,
  Video,
  VolumeX,
} from "lucide-react";

/**
 * The screens the Drops & Vibes page draws, one per screen from the app: the
 * Drops tab with its Vibe rail and the photo Drop under For you, a Vibe playing
 * edge to edge, and the New Vibe composer.
 *
 * These are the app's own screens, not an idea of them. The tab is the pale-pink
 * ground with the Xelvic mark at the top, the tall Vibe cards with the person
 * and the play count on them, and For you underneath; a Vibe is full-bleed with
 * the title over the picture, the reactions down the right and Add comment along
 * the foot; and New Vibe is Record, Your clips, the line, Collaborate, Tag people
 * and Sensitive content, with the public note at the bottom.
 *
 * As on the other feature pages, anything a screen cannot fit is drawn outside
 * the phone by its escape, in the frame's unclipped layer, and the screen leaves
 * the same place empty so the two read as one screen rather than two drawings.
 */

/** the mark the Drops tab carries */
const MARK = "/media/brand/xelvic.png";

/** the pictures these screens use */
const CAR = "/media/walls/raat.jpg";
const HILLS = "/media/walls/safar.jpg";
const CITY = "/media/walls/sheher.jpg";
const PERSON = "/media/walls/xelvic.jpg";

/** the avatars these screens use */
const AV_1 = "/media/themes/alone/profile.jpg";
const AV_2 = "/media/walls/mehfil.jpg";

/* ── the screen's furniture ─────────────────────────────────────────────── */

function DropsScreen({
  children,
  tone = "#fce9f1",
}: {
  children: ReactNode;
  tone?: string;
}) {
  return (
    <div
      className="relative flex h-full flex-col overflow-hidden text-plum"
      style={{ background: tone }}
    >
      {children}
    </div>
  );
}

function Breakout({
  top,
  bottom,
  left = 0,
  width,
  children,
}: {
  top?: number;
  bottom?: number;
  left?: number;
  width: number;
  children: ReactNode;
}) {
  return (
    <div
      className="absolute"
      style={{ top, bottom, left: `${left}%`, width: `${width}%` }}
    >
      {children}
    </div>
  );
}

function DropsStatus({ time = "1:44" }: { time?: string }) {
  return (
    <div className="flex shrink-0 items-end justify-between px-4 pb-2 pt-4 text-[10px] font-semibold leading-none text-plum/70">
      <span>{time}</span>
      <span className="flex items-center gap-1 text-plum/50">
        <span className="h-2 w-3 rounded-[2px] border border-plum/40" />
        <span>5G</span>
      </span>
    </div>
  );
}

/** The floating five-tab bar the app shows under its social screens. */
function TabBar({ active }: { active: string }) {
  const tabs = [
    { icon: LayoutGrid, label: "Drops" },
    { icon: Sparkles, label: "Moments", dot: true },
    { icon: MessageSquare, label: "Convo", dot: true },
    { icon: AudioLines, label: "Audio" },
    { icon: Radio, label: "Live" },
  ];

  return (
    <div className="mx-3 mb-2 mt-auto flex shrink-0 items-center justify-between rounded-full bg-pure/80 px-3 py-2 shadow-[0_10px_30px_rgba(58,10,36,.16)] backdrop-blur">
      {tabs.map(({ icon: Icon, label, dot }) => (
        <span
          key={label}
          className={`flex w-11 flex-col items-center gap-0.5 ${
            active === label ? "text-[#e11d6b]" : "text-plum/55"
          }`}
        >
          <span className="relative">
            <Icon size={15} />
            {dot && (
              <span className="absolute -right-1 -top-0.5 h-1.5 w-1.5 rounded-full bg-[#e11d6b]" />
            )}
          </span>
          <span className="text-[6.5px] font-semibold leading-none">
            {label}
          </span>
        </span>
      ))}
    </div>
  );
}

function HomeBar({ light = false }: { light?: boolean }) {
  return (
    <span
      className={`pointer-events-none absolute bottom-1 left-1/2 h-[3px] w-[90px] -translate-x-1/2 rounded-full ${
        light ? "bg-pure/50" : "bg-plum/25"
      }`}
    />
  );
}

/* ── the Drops tab ────────────────────────────────────────────────────────
   The feed as the app opens it: the mark and the name, the Vibe rail with the
   person and the play count on every card, For you with its photo Drop, the
   four taps under it, and the comments underneath. The last Vibe card is the
   piece that leaves the phone. */

function VibeCard({
  name,
  src,
  avatar,
  plays,
  muted,
}: {
  name: string;
  src?: string;
  avatar: string;
  plays: number;
  muted?: boolean;
}) {
  return (
    <span className="flex w-[57px] shrink-0 flex-col">
      <span className="relative block h-[72px] w-[57px] overflow-hidden rounded-[10px] bg-[#efe7eb]">
        {muted ? (
          <span className="grid h-full w-full place-items-center">
            <VolumeX size={17} className="text-[#e11d6b]" />
          </span>
        ) : (
          <img src={src} alt="" className="h-full w-full object-cover" />
        )}
        <span className="absolute left-1 top-1 h-[18px] w-[18px] overflow-hidden rounded-full ring-2 ring-pure/90">
          <img src={avatar} alt="" className="h-full w-full object-cover" />
        </span>
        <span className="absolute bottom-1 left-1 flex items-center gap-0.5 rounded-full bg-black/45 px-1.5 py-0.5 text-[7px] font-semibold leading-none text-pure">
          <Play size={6} className="fill-pure" />
          {plays}
        </span>
      </span>
      <span className="mt-1 truncate text-[9px] font-semibold leading-none">
        {name}
      </span>
    </span>
  );
}

function FeedScreen() {
  return (
    <DropsScreen>
      <DropsStatus />

      <div className="flex items-center gap-2 px-4 pb-1 pt-1">
        <span className="h-8 w-8 shrink-0 overflow-hidden rounded-full ring-2 ring-pure/80">
          <img src={MARK} alt="" className="h-full w-full object-cover" />
        </span>
        <span className="font-display text-[17px] font-extrabold tracking-tight">
          Xelvic
        </span>
        <span className="ml-auto flex items-center gap-3 text-plum/80">
          <Search size={16} />
          <Plus size={18} />
        </span>
      </div>

      <div className="mt-2 flex items-center justify-between px-4">
        <span className="text-[13px] font-extrabold">Vibe</span>
        <span className="text-[8px] font-bold text-[#e11d6b]">See all</span>
      </div>

      <div className="mt-2 flex items-start gap-2 overflow-hidden px-4">
        <VibeCard name="Mason" src={CAR} avatar={AV_1} plays={8} />
        <VibeCard
          name="Hailey"
          src={PERSON}
          avatar={AV_2}
          plays={15}
        />
        <VibeCard name="Mason" avatar={AV_1} plays={7} muted />
        {/* the escaped card lands here */}
        <span className="h-[82px] w-[57px] shrink-0" />
      </div>

      <div className="mt-3 flex items-center justify-between px-4">
        <span className="text-[13px] font-extrabold">For you</span>
      </div>

      <div className="mt-2 flex items-center gap-2 px-4">
        <span className="h-8 w-8 shrink-0 overflow-hidden rounded-full p-[1.5px] ring-2 ring-[#e11d6b]/70">
          <img
            src={PERSON}
            alt=""
            className="h-full w-full rounded-full object-cover"
          />
        </span>
        <div className="min-w-0 flex-1 leading-tight">
          <span className="block truncate text-[11px] font-bold">
            Ethan Cole
          </span>
          <span className="block text-[7.5px] text-plum/45">6d · 🌐</span>
        </div>
        <Ellipsis size={16} className="shrink-0 text-plum/50" />
      </div>

      {/* the photo takes the room the rest of the feed leaves, so the
          frame still reads on the narrower phone in a two-column block */}
      <div className="relative mt-2 min-h-0 flex-1 overflow-hidden bg-plum">
        <img src={CITY} alt="" className="h-full w-full object-cover" />
        <span className="absolute bottom-1.5 right-2 text-[6px] font-medium text-pure/55">
          2025-05-06 19:00
        </span>
      </div>

      <div className="flex items-center gap-4 px-4 py-2 text-[11px] font-semibold text-plum/65">
        <span className="flex items-center gap-1">
          <Heart size={15} className="fill-[#e11d6b] text-[#e11d6b]" />
          21
        </span>
        <span className="flex items-center gap-1">
          <MessageSquare size={14} />
          8
        </span>
        <span className="flex items-center gap-1">
          <Share2 size={14} />
          8
        </span>
        <Bookmark size={14} className="ml-auto" />
      </div>

      <div className="flex items-center gap-2 px-4">
        <span className="h-6 w-6 shrink-0 overflow-hidden rounded-full bg-[#3a0a24]">
          <img
            src={CAR}
            alt=""
            className="h-full w-full object-cover opacity-80"
          />
        </span>
        <span className="text-[9px] font-bold">Ava Brooks</span>
        <span className="ml-auto text-[8px] text-plum/40">8 comments</span>
      </div>
      <div className="mt-1 flex items-center gap-2 px-4 opacity-70">
        <span className="h-6 w-6 shrink-0 overflow-hidden rounded-full bg-[#3a0a24]">
          <img
            src={HILLS}
            alt=""
            className="h-full w-full object-cover opacity-70"
          />
        </span>
        <span className="text-[9px] font-bold">Mia Carter</span>
        <Ellipsis size={12} className="ml-auto text-plum/40" />
      </div>

      <TabBar active="Drops" />
      <HomeBar />
    </DropsScreen>
  );
}

function FeedEscape() {
  return (
    <Breakout top={112} left={80} width={38}>
      <div className="w-[96px]">
        <div className="relative h-[112px] w-full overflow-hidden rounded-2xl bg-plum shadow-[0_22px_60px_rgba(58,10,36,.32)] ring-1 ring-black/5">
          <img src={HILLS} alt="" className="h-full w-full object-cover" />
          <span className="absolute left-1.5 top-1.5 h-[24px] w-[24px] overflow-hidden rounded-full ring-2 ring-pure/90">
            <img src={PERSON} alt="" className="h-full w-full object-cover" />
          </span>
          <span className="absolute bottom-1.5 left-1.5 flex items-center gap-1 rounded-full bg-black/50 px-2 py-0.5 text-[8px] font-semibold leading-none text-pure">
            <Play size={8} className="fill-pure" />5
          </span>
        </div>
        <span className="mt-1.5 block text-[11px] font-semibold leading-none">
          Noah
        </span>
      </div>
    </Breakout>
  );
}

/* ── a Vibe, full screen ──────────────────────────────────────────────────
   The viewer from the app: the video edge to edge, the title and its line over
   the picture, the actions down the right, the handle along the foot, and the
   comments already waiting as chips. The action rail is the piece that leaves
   the phone. */

function ViewerAction({
  icon: Icon,
  label,
}: {
  icon: LucideIcon;
  label?: string;
}) {
  return (
    <span className="flex flex-col items-center gap-0.5 text-pure drop-shadow-[0_2px_6px_rgba(0,0,0,.55)]">
      <Icon size={18} strokeWidth={2} />
      {label && (
        <span className="text-[7.5px] font-semibold leading-none">{label}</span>
      )}
    </span>
  );
}

function ViewerScreen() {
  return (
    <div className="relative flex h-full flex-col overflow-hidden bg-black text-pure">
      <img
        src={HILLS}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/45 via-black/10 to-black/70" />

      <div className="relative flex items-center px-4 pt-4">
        <ChevronLeft size={20} />
        <span className="ml-auto flex items-center gap-4">
          <MoreVertical size={18} />
          <Sparkles size={17} />
          <Cast size={17} />
        </span>
      </div>

      <div className="relative mt-10 px-6 text-center">
        <span className="block font-serif text-[30px] font-bold leading-none tracking-tight drop-shadow-[0_2px_12px_rgba(0,0,0,.55)]">
          Darjeeling
        </span>
        <span className="mt-2 block text-[10px] font-bold text-[#f6d16e] drop-shadow-[0_1px_6px_rgba(0,0,0,.55)]">
          toy train &amp; this song
        </span>
      </div>

      {/* the escaped rail lands here */}
      <div className="flex-1" />

      <div className="relative px-3 pb-5">
        <div className="flex items-center gap-2">
          <span className="h-[26px] w-[26px] shrink-0 overflow-hidden rounded-full ring-2 ring-pure/80">
            <img
              src={AV_1}
              alt=""
              className="h-full w-full object-cover"
            />
          </span>
          <span className="text-[10px] font-bold">@noah_west</span>
        </div>

        <div className="mt-2 flex items-center gap-2 rounded-full border border-pure/10 bg-black/40 px-3 py-2 backdrop-blur">
          <MessageSquare size={13} className="shrink-0 text-pure/80" />
          <span className="text-[9px] text-pure/55">Add comment...</span>
        </div>

        <div className="mt-2 flex flex-wrap gap-1.5">
          <span className="rounded-lg bg-black/45 px-2 py-1 text-[8px] leading-none text-pure/85">
            First one here.
          </span>
          <span className="rounded-lg bg-black/45 px-2 py-1 text-[8px] leading-none text-pure/85">
            Where was this shot?
          </span>
        </div>
      </div>

      <HomeBar light />
    </div>
  );
}

function ViewerEscape() {
  return (
    <Breakout top={210} left={82} width={38}>
      <div className="flex w-[86px] flex-col items-center gap-3 rounded-2xl border border-pure/15 bg-black/40 px-2 py-3 shadow-[0_22px_60px_rgba(0,0,0,.45)] backdrop-blur">
        <ViewerAction icon={Heart} label="0" />
        <ViewerAction icon={MessageSquare} label="0" />
        <ViewerAction icon={Share2} label="0" />
        <Bookmark size={18} className="text-pure" />
        <VolumeX size={18} className="text-pure" />
      </div>
    </Breakout>
  );
}

/* ── New Vibe ─────────────────────────────────────────────────────────────
   The composer from the app: Record and Your clips, the box for the line,
   Collaborate, Tag people, Sensitive content and the public note at the foot.
   The Collaborate card is the piece that leaves the phone. */

function ComposeScreen() {
  return (
    <DropsScreen tone="#f4f1f4">
      <DropsStatus time="1:46" />

      <div className="flex items-center px-3 py-1.5">
        <ChevronLeft size={19} className="shrink-0 text-plum/75" />
        <span className="ml-3 flex-1 text-[15px] font-extrabold">
          New Vibe
        </span>
        <span className="text-[9px] font-bold text-[#e11d6b]">Put it up</span>
      </div>

      <div className="mt-3 flex gap-2.5 px-4">
        <span className="flex h-[64px] flex-1 items-center justify-center gap-1.5 rounded-2xl bg-pure">
          <Video size={17} className="text-[#e11d6b]" />
          <span className="text-[9px] font-bold">Record</span>
        </span>
        <span className="flex h-[64px] flex-1 items-center justify-center gap-1.5 rounded-2xl bg-pure">
          <Clapperboard size={17} className="text-[#e11d6b]" />
          <span className="text-[9px] font-bold">Your clips</span>
        </span>
      </div>

      <div className="mx-4 mt-3 h-[100px] rounded-2xl bg-pure px-3 py-2.5">
        <span className="text-[10px] text-plum/35">Say something about it</span>
      </div>

      {/* the escaped Collaborate card lands here */}
      <div className="mx-4 mt-3 h-[80px]" />

      <div className="mt-3 flex items-center gap-2 px-4">
        <AtSign size={14} className="shrink-0 text-plum/70" />
        <span className="text-[10px] font-bold">Tag people</span>
        <span className="ml-auto text-[9px] font-bold text-[#e11d6b]">
          Add people
        </span>
      </div>

      <div className="mt-2.5 px-4">
        <div className="flex items-center gap-2">
          <EyeOff size={14} className="shrink-0 text-plum/70" />
          <span className="text-[10px] font-bold">Sensitive content</span>
          <span className="ml-auto text-[9px] font-bold text-[#e11d6b]">
            Turn on
          </span>
        </div>
        <p className="mt-1 pl-6 text-[8px] leading-relaxed text-plum/50">
          Adult, violent or graphic. Only people over 18 can open it, and only
          if they ask to.
        </p>
      </div>

      <div className="mt-3 flex items-start gap-1.5 px-4">
        <Globe size={10} className="mt-[1px] shrink-0 text-plum/55" />
        <p className="text-[8px] leading-relaxed text-plum/55">
          A Vibe is public, and it stays up until you take it down.
        </p>
      </div>

      <HomeBar />
    </DropsScreen>
  );
}

function ComposeEscape() {
  return (
    <Breakout top={264} left={-14} width={122}>
      <div className="flex w-[248px] items-center gap-3 rounded-3xl border border-[#e11d6b]/20 bg-[#fbe3ee] p-3.5 shadow-[0_22px_60px_rgba(58,10,36,.28)]">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#f7c6dc] text-[#e11d6b]">
          <UserPlus size={18} />
        </span>
        <div className="min-w-0 flex-1 leading-tight">
          <span className="block text-[15px] font-extrabold">Collaborate</span>
          <span className="mt-0.5 block text-[10px] text-plum/55">
            Post it together with someone
          </span>
        </div>
        <Plus size={18} className="shrink-0 text-[#e11d6b]" />
      </div>
    </Breakout>
  );
}

/* ── the map ────────────────────────────────────────────────────────────── */

const screens: Record<string, () => JSX.Element> = {
  feed: FeedScreen,
  vibe: ViewerScreen,
  compose: ComposeScreen,
};

const escapes: Record<string, () => JSX.Element> = {
  feed: FeedEscape,
  vibe: ViewerEscape,
  compose: ComposeEscape,
};

export function DropsMockup({ id }: { id: string }) {
  const S = screens[id];
  return S ? <S /> : null;
}

export function DropsEscape({ id }: { id: string }) {
  const E = escapes[id];
  return E ? <E /> : null;
}
