import type { ReactNode } from "react";
import {
  AtSign,
  AudioLines,
  BadgeCheck,
  BarChart3,
  Camera,
  ChevronLeft,
  Eye,
  Heart,
  LayoutGrid,
  MessageSquare,
  MoreVertical,
  Music2,
  Pause,
  PenLine,
  Plus,
  Radio,
  Search,
  Share2,
  Sparkles,
  Trash2,
  Type,
  Users,
  X,
} from "lucide-react";

/**
 * The screens the Moments page draws, taken screen for screen from the app:
 * the Moments tab, the composer, your own Moment with its watched count, the
 * Answered sheet that opens from it, and the Memories grid.
 *
 * The proportions here are measured against the app's own screenshots rather
 * than guessed. The ground is the pale pink `#fbe9f1`; the viewer is the grey
 * mauve `#e8dee3`; the picture in the viewer runs edge to edge with no card
 * around it; the story rail's pink edge belongs only to the story that is still
 * up, and the plus circle is first on the rail. The words are the app's too —
 * "Your moments", "Hold to open the drop", "Pick your interests", "Answered",
 * "14 watched" — and the handles are the ones in the screenshots.
 *
 * Two rules hold across all of them:
 *
 *   1. Nothing moves. A Moment caught mid-play is still a still.
 *   2. Anything a screen cannot fit is drawn outside the phone by its escape,
 *      in the frame's unclipped layer, and the screen leaves the same place
 *      empty so the two read as one screen rather than two drawings.
 */

/** the faces these screens use */
const FACE = "/media/walls/mehfil.jpg";
const FACE_2 = "/media/walls/sheher.jpg";
const FACE_3 = "/media/walls/safar.jpg";
const FACE_4 = "/media/walls/studio.jpg";

/** the art the Moments are drawn on */
const ART = "/media/themes/animeblue/moments.jpg";
const ART_2 = "/media/themes/catgirl/moment.jpg";
const ART_3 = "/media/themes/teddy/moments.jpg";
const ART_4 = "/media/themes/alone/moments.jpg";

/** the cover of the track a Moment is set to */
const TRACK = "/media/themes/animeblue/audio.jpg";

/* ── the screen's furniture ─────────────────────────────────────────────── */

/** The app's Moments ground: a pale pink that the white cards sit on. */
function MomentScreen({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex h-full flex-col bg-[#fbe9f1] text-plum">
      {children}
      <span className="pointer-events-none absolute bottom-1 left-1/2 h-[3px] w-[90px] -translate-x-1/2 rounded-full bg-plum/30" />
    </div>
  );
}

/** The viewer's ground: the grey mauve the app holds a playing Moment on. */
function ViewerScreen({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex h-full flex-col bg-[#e8dee3] text-plum">
      {children}
      <span className="pointer-events-none absolute bottom-1 left-1/2 h-[3px] w-[90px] -translate-x-1/2 rounded-full bg-plum/30" />
    </div>
  );
}

/** A piece of the screen that leaves the phone. The overlay layer `PhoneFrame`
 *  hands us is the display's own box, unclipped, so a child pushed past the edge
 *  carries real furniture out over the glass. */
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

function MomentStatus() {
  return (
    <div className="flex shrink-0 items-center justify-between px-4 pb-1 pt-3 text-[9px] font-semibold leading-none text-plum/75">
      <span>12:33</span>
      <span className="flex items-center gap-1 text-plum/50">
        <span className="h-[7px] w-2.5 rounded-[2px] border border-plum/40" />
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
    <div className="mx-2.5 mb-2.5 mt-auto flex shrink-0 items-center justify-between rounded-full bg-pure/70 px-3 py-2 backdrop-blur">
      {tabs.map(({ icon: Icon, label, dot }) => (
        <span
          key={label}
          className={`flex w-10 flex-col items-center gap-[3px] ${
            active === label ? "text-[#e11d6b]" : "text-plum/55"
          }`}
        >
          <span className="relative">
            <Icon size={14} strokeWidth={active === label ? 2.4 : 2} />
            {dot && (
              <span className="absolute -right-1 -top-0.5 h-[5px] w-[5px] rounded-full bg-[#e11d6b] ring-1 ring-[#fbe9f1]" />
            )}
          </span>
          <span className="text-[8px] font-semibold leading-none">
            {label}
          </span>
        </span>
      ))}
    </div>
  );
}

/** A story card on the rail: the picture, the poster's avatar on its corner, and
 *  the name under it. Only the story still up today carries the pink edge. */
function Story({
  name,
  src,
  avatar,
  verified,
  active,
}: {
  name: string;
  src: string;
  avatar: string;
  verified?: boolean;
  active?: boolean;
}) {
  return (
    <span className="flex w-[57px] shrink-0 flex-col items-center">
      <span className="relative block h-[85px] w-[57px]">
        <span
          className={`block h-full w-full overflow-hidden rounded-[7px] border-2 ${
            active ? "border-[#ec4899]" : "border-white/80"
          }`}
        >
          <img src={src} alt="" className="h-full w-full object-cover" />
        </span>
        <span className="absolute left-1 top-1 h-[22px] w-[22px] overflow-hidden rounded-full ring-2 ring-white/90">
          <img src={avatar} alt="" className="h-full w-full object-cover" />
        </span>
      </span>
      <span className="mt-1 flex items-center gap-0.5">
        <span className="whitespace-nowrap text-[10px] font-medium leading-none">
          {name}
        </span>
        {verified && (
          <BadgeCheck size={9} className="shrink-0 text-[#1d9bf0]" />
        )}
      </span>
    </span>
  );
}

/** The progress the viewer runs along its top, one segment per Moment. */
function Progress({ count = 2, done = 1 }: { count?: number; done?: number }) {
  return (
    <div className="flex gap-[3px]">
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className="h-[2.5px] flex-1 overflow-hidden rounded-full bg-plum/20"
        >
          <span
            className="block h-full rounded-full bg-[#f8f0f3]"
            style={{ width: i < done ? "100%" : "0%" }}
          />
        </span>
      ))}
    </div>
  );
}

/* ── the Moments tab ──────────────────────────────────────────────────────
   The real tab, screen for screen: the head with its three icons, the "Your
   moments" circle first on the rail, the people who posted today beside it,
   then Circles. The circle is the piece that leaves the phone. */

function CircleScreen() {
  return (
    <MomentScreen>
      <MomentStatus />

      <div className="flex shrink-0 items-center px-4 pb-2 pt-0.5">
        <span className="text-[17px] font-extrabold tracking-tight">
          Moments
        </span>
        <span className="ml-auto flex items-center gap-3 text-plum">
          <BarChart3 size={15} strokeWidth={2.3} />
          <PenLine size={14} strokeWidth={2.3} />
          <Camera size={15} strokeWidth={2.3} />
        </span>
      </div>

      <div className="mt-2 flex items-start gap-2 overflow-hidden px-4">
        {/* the escaped circle lands here */}
        <span className="h-[98px] w-[57px] shrink-0" />
        <Story name="Chloe 😊😊" src={ART_3} avatar={FACE_3} active />
        <Story name="Emma" src={ART_2} avatar={FACE_2} verified />
        <Story name="Noah" src={ART} avatar={FACE_4} />
      </div>

      <div className="mt-7 px-4">
        <span className="text-[14px] font-extrabold">Circles</span>
        <div className="mt-2 rounded-[12px] bg-pure px-3.5 py-2.5">
          <span className="flex items-center gap-1.5 text-[11px] font-extrabold">
            <Users size={12} className="text-[#e11d6b]" strokeWidth={2.6} />{" "}
            Find your people
          </span>
          <p className="mt-1.5 text-[9px] leading-[1.55] text-plum/60">
            Pick what you are into. You land in a circle of fifty who chose the
            same thing, and every day it gets one small task to answer. Best
            take goes to the top.
          </p>
          <span className="mt-2 block rounded-lg bg-[#e91e63] py-2.5 text-center text-[10px] font-bold text-pure">
            Pick your interests
          </span>
        </div>
      </div>

      <TabBar active="Moments" />
    </MomentScreen>
  );
}

function CircleEscape() {
  return (
    <Breakout top={60} left={-9} width={46}>
      <div className="flex w-[112px] flex-col items-center rounded-2xl bg-[#fbe9f1] px-2 pb-2.5 pt-2.5 shadow-[0_18px_50px_rgba(0,0,0,.4)]">
        <span className="grid h-[84px] w-[84px] place-items-center rounded-full border-[2.5px] border-[#ef8ab3] bg-[#fce3ee] text-[#e91e63]">
          <Plus size={30} strokeWidth={2.4} />
        </span>
        <span className="mt-2 text-[10px] font-bold leading-none text-plum">
          Your moments
        </span>
      </div>
    </Breakout>
  );
}

/* ── compose ──────────────────────────────────────────────────────────────
   The composer: the picture held in the frame, the line over it, the mention
   line, the track, and the tools along the foot. The track leaves the phone. */

function ComposeScreen() {
  return (
    <MomentScreen>
      <MomentStatus />

      <div className="flex shrink-0 items-center gap-2 px-3 py-1.5">
        <X size={15} className="shrink-0 text-plum/75" />
        <span className="flex-1 text-center text-[11px] font-bold">
          New Moment
        </span>
        <span className="rounded-full bg-[#e91e63] px-3 py-1 text-[9px] font-bold leading-none text-pure">
          Post
        </span>
      </div>

      <div className="relative mx-3 mt-1 min-h-0 flex-1 overflow-hidden rounded-xl">
        <img
          src={ART_2}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <span className="absolute inset-x-4 bottom-4 text-center font-display text-[17px] font-semibold text-pure drop-shadow-[0_2px_8px_rgba(0,0,0,.6)]">
          golden hour 🌇
        </span>
      </div>

      <div className="flex shrink-0 items-center gap-1.5 px-3 py-1.5 text-[8.5px] text-plum/50">
        <AtSign size={10} className="shrink-0" />
        Mention up to 5 people
      </div>

      {/* the track the escape lifts — the same place, left empty */}
      <div className="mx-3 mt-0.5 h-[44px] shrink-0" />

      <div className="mt-2 flex shrink-0 items-center justify-around border-t border-plum/10 bg-pure/60 px-3 py-2 text-plum/70">
        {[
          { icon: Type, label: "Text" },
          { icon: BarChart3, label: "Poll" },
          { icon: Music2, label: "Music" },
          { icon: AtSign, label: "Mention" },
        ].map(({ icon: Icon, label }) => (
          <span key={label} className="flex flex-col items-center gap-1">
            <span className="grid h-7 w-7 place-items-center rounded-full bg-[#fce3ee]">
              <Icon size={13} />
            </span>
            <span className="text-[7px] font-semibold leading-none">
              {label}
            </span>
          </span>
        ))}
      </div>
    </MomentScreen>
  );
}

function ComposeEscape() {
  return (
    <Breakout bottom={58} left={-9} width={112}>
      <div className="flex items-center gap-3 rounded-2xl bg-pure p-3 shadow-[0_18px_50px_rgba(58,10,36,.24)] ring-1 ring-plum/10">
        <span className="h-14 w-14 shrink-0 overflow-hidden rounded-xl">
          <img src={TRACK} alt="" className="h-full w-full object-cover" />
        </span>
        <div className="min-w-0 flex-1">
          <span className="mt-1 block truncate text-[13px] font-bold leading-none">
            Night Drive
          </span>
          <span className="mt-1.5 block text-[9px] leading-none text-plum/50">
            Xelvic Sounds
          </span>
          <span className="mt-2 flex h-3 items-end gap-[3px]">
            {[7, 11, 5, 12, 8, 4, 10, 6, 9, 5, 12, 7].map((h, i) => (
              <span
                key={i}
                className="w-[2.5px] rounded-full bg-[#e91e63]"
                style={{ height: `${h}px` }}
              />
            ))}
          </span>
        </div>
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#e91e63] text-pure">
          <Pause size={14} />
        </span>
      </div>
    </Breakout>
  );
}

/* ── your own Moment ──────────────────────────────────────────────────────
   The same viewer, seen by the person who posted it: your Moment along the top,
   the caption across the picture, the heart and its count, and the watched bar
   with the bin at the foot. The Answered sheet is lifted out of it. */

function WatchedScreen() {
  return (
    <ViewerScreen>
      <MomentStatus />

      <div className="shrink-0 px-3">
        <Progress />

        <div className="mt-2.5 flex items-center gap-2">
          <span className="h-7 w-7 shrink-0 overflow-hidden rounded-full">
            <img src={FACE} alt="" className="h-full w-full object-cover" />
          </span>
          <div className="min-w-0 flex-1 leading-tight">
            <span className="block text-[12px] font-bold">Your moments</span>
            <span className="block text-[9px] text-plum/55">
              1 moment · 21 hr ago
            </span>
          </div>
          <Pause size={15} className="shrink-0 text-plum/75" />
          <Share2 size={14} className="shrink-0 text-plum/75" />
          <MoreVertical size={15} className="shrink-0 text-plum/75" />
          <X size={15} className="shrink-0 text-plum/75" />
        </div>
      </div>

      <div className="relative mt-2.5 min-h-0 flex-1 overflow-hidden">
        <img
          src={ART_2}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <span className="absolute inset-x-5 bottom-6 text-center text-[17px] font-bold leading-[1.3] text-pure drop-shadow-[0_2px_8px_rgba(0,0,0,.65)]">
          Mile toh bilkul bhi sampark na kare thank you
        </span>
      </div>

      <span className="mt-2 px-4 text-[9px] leading-none text-plum/55">
        Hold to open the drop
      </span>

      <div className="mt-1.5 flex items-center gap-1 px-4">
        <Heart size={12} className="fill-[#e11d6b] text-[#e11d6b]" />
        <span className="text-[9px] font-semibold leading-none text-plum/70">
          2
        </span>
      </div>

      <div className="mt-auto flex items-center gap-2 px-3 pb-4 pt-2">
        <span className="flex h-10 flex-1 items-center gap-2 rounded-full bg-[#c7b8bf] px-4 text-[10px] text-plum/70">
          <Eye size={14} /> 14 watched
        </span>
        <span className="grid h-10 w-10 place-items-center rounded-full bg-[#d3c5cb] text-plum/70">
          <Trash2 size={14} />
        </span>
      </div>
    </ViewerScreen>
  );
}

function PersonRow({
  name,
  handle,
  src,
  initial,
  tone,
  heart,
}: {
  name: string;
  handle: string;
  src?: string;
  initial?: string;
  tone?: string;
  heart?: boolean;
}) {
  return (
    <div className="flex items-center gap-2.5">
      <span
        className="grid h-7 w-7 shrink-0 place-items-center overflow-hidden rounded-full text-[8px] font-black text-pure"
        style={{ background: src ? undefined : tone }}
      >
        {src ? (
          <img src={src} alt="" className="h-full w-full object-cover" />
        ) : (
          initial
        )}
      </span>
      <span className="min-w-0 flex-1 leading-tight">
        <span className="block truncate text-[10.5px] font-medium">
          {name}
        </span>
        <span className="block truncate text-[8.5px] text-plum/45">
          {handle}
        </span>
      </span>
      {heart && (
        <Heart size={14} className="shrink-0 fill-[#ef4444] text-[#ef4444]" />
      )}
    </div>
  );
}

function WatchedEscape() {
  return (
    <>
      {/* the screen dims the way it does when the sheet is up */}
      <Breakout top={0} bottom={0} left={0} width={100}>
        <div className="h-full w-full rounded-[1.9rem] bg-plum/25" />
      </Breakout>

      <Breakout bottom={16} left={-11} width={112}>
        <div className="rounded-t-[18px] rounded-b-2xl bg-pure px-3.5 pb-3 pt-2 text-plum shadow-[0_20px_55px_rgba(0,0,0,.4)] ring-1 ring-black/5">
          <div className="mx-auto h-1 w-9 rounded-full bg-plum/20" />

          <span className="mt-2.5 block text-[13px] font-extrabold">
            Answered
          </span>
          <div className="mt-2.5 space-y-2.5">
            <PersonRow name="Harper 😊😊" handle="@harper" src={FACE} heart />
            <PersonRow
              name="Ava Brooks"
              handle="@ava_brooks"
              initial="AB"
              tone="#e11d6b"
              heart
            />
          </div>

          <span className="mt-3.5 block text-[11px] font-extrabold">
            14 watched
          </span>
          <div className="mt-2 space-y-2">
            <PersonRow
              name="Ava Brooks"
              handle="@ava_brooks"
              initial="AB"
              tone="#e11d6b"
            />
            <PersonRow name="Ethan Cole" handle="@ethan_cole" src={FACE_4} />
            <PersonRow
              name="Jordan Blake"
              handle="@jordan_blake"
              initial="J"
              tone="#1d9b62"
            />
            <PersonRow name="Sophia Reed" handle="@sophia_reed" src={FACE_2} />
          </div>
        </div>
      </Breakout>
    </>
  );
}

/* ── memories ─────────────────────────────────────────────────────────────
   The Memories grid under Profile. One cell is left empty and the escaped
   Memory floats above it, larger than the cell it came from. */

const MEMORIES = [
  { src: ART, caption: "These lines »" },
  { src: ART_4, caption: "the drive home" },
  { src: ART_3, caption: "rooftop, 2 am" },
];

function MemoryCell({ src, caption }: { src: string; caption: string }) {
  return (
    <div className="overflow-hidden rounded-xl bg-pure">
      <img src={src} alt="" className="h-[88px] w-full object-cover" />
      <span className="block truncate px-1.5 py-1 text-[7.5px] font-semibold">
        {caption}
      </span>
    </div>
  );
}

function MemoriesScreen() {
  return (
    <MomentScreen>
      <MomentStatus />

      <div className="flex shrink-0 items-center gap-2 px-3 py-1.5">
        <ChevronLeft size={16} className="shrink-0 text-plum/70" />
        <span className="flex-1 text-center text-[13px] font-bold">
          Memories
        </span>
        <Search size={14} className="shrink-0 text-plum/60" />
      </div>

      <p className="px-3 text-[8px] leading-relaxed text-plum/50">
        Everything you have posted, kept once its day is over.
      </p>

      <div className="mt-3 flex shrink-0 items-center justify-between px-3">
        <span className="text-[11px] font-bold leading-none">September</span>
        <span className="text-[8px] leading-none text-plum/45">
          8 memories
        </span>
      </div>

      <div className="mt-2 grid grid-cols-2 gap-2 px-3">
        <MemoryCell src={ART} caption="These lines »" />
        {/* the escaped Memory lands here */}
        <div className="h-[104px] rounded-xl bg-[#f3e3ea]" />
        {MEMORIES.slice(1).map((m) => (
          <MemoryCell key={m.caption} src={m.src} caption={m.caption} />
        ))}
      </div>

      <p className="mt-auto px-4 pb-5 text-center text-[7.5px] leading-relaxed text-plum/40">
        A Moment moves here when its day is over.
        <br />
        Nothing is deleted.
      </p>
    </MomentScreen>
  );
}

function MemoriesEscape() {
  return (
    <Breakout top={112} left={44} width={66}>
      <div className="overflow-hidden rounded-2xl bg-pure shadow-[0_20px_55px_rgba(58,10,36,.3)] ring-1 ring-plum/10">
        <img src={ART_2} alt="" className="h-[152px] w-full object-cover" />
        <div className="px-2 py-1.5">
          <span className="block truncate text-[10px] font-bold leading-tight">
            golden hour 🌇
          </span>
          <span className="block text-[8px] leading-tight text-plum/50">
            14 Sep · was a Moment
          </span>
        </div>
      </div>
    </Breakout>
  );
}

/* ── the map ────────────────────────────────────────────────────────────── */

const screens: Record<string, () => JSX.Element> = {
  circle: CircleScreen,
  compose: ComposeScreen,
  watched: WatchedScreen,
  memories: MemoriesScreen,
};

const escapes: Record<string, () => JSX.Element> = {
  circle: CircleEscape,
  compose: ComposeEscape,
  watched: WatchedEscape,
  memories: MemoriesEscape,
};

export function MomentsMockup({ id }: { id: string }) {
  const S = screens[id];
  return S ? <S /> : null;
}

export function MomentsEscape({ id }: { id: string }) {
  const E = escapes[id];
  return E ? <E /> : null;
}
