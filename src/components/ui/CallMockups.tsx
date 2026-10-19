import type { ReactNode } from "react";
import {
  AudioLines,
  Camera,
  ChevronDown,
  ChevronLeft,
  LayoutGrid,
  MessageCircle,
  Mic,
  Phone,
  PhoneIncoming,
  PhoneMissed,
  PhoneOutgoing,
  Radio,
  Search,
  Sparkles,
  UserPlus,
  Users,
  Video,
  VideoOff,
  Volume2,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  AVATAR,
  Bubble,
  Composer,
  ConvoHeader,
  DayChip,
  Float,
  FloatBody,
  FloatTitle,
  Person,
  Screen,
  Stamp,
  StatusRow,
  Thread,
} from "./NewMockups";

/**
 * The screens the calls page draws, one per thing a call can do: how one starts,
 * what it looks like while it rings, what it is once it connects — voice, then
 * video — the people you can pull in, and the list of what you have already
 * done.
 *
 * They are built out of the same chrome the messaging screens are — the status
 * row, the convo header, the composer, the ground, the bubbles, the cards that
 * hang off the side of the frame — which is why all of that is exported from
 * `NewMockups`. A calls screen and a messaging screen are the same app seen
 * twice, and they should not be able to drift apart.
 *
 * One thing does differ, on purpose. A call is a takeover: the chat's wallpaper
 * and its dotted ground are gone and the call has the whole screen, so the
 * screens here are drawn flat (`CallScreen`) rather than on `Screen`. That is
 * how the app draws a call, and `CallDemo` on the feature page draws it the same
 * way.
 *
 * Two rules hold across all of them:
 *
 *   1. The words are the app's own. That call media is peer-to-peer over WebRTC
 *      and encrypted in transit, that quality adapts rather than dropping the
 *      call, that ＋ pulls somebody into a call already in progress, and that a
 *      missed call becomes a row with a tap to call back are all things the
 *      feature data states outright, so nothing here softens them.
 *   2. Nothing moves. These blocks sit still while you read them, exactly like
 *      the ones on the messaging page.
 *
 * Anything a screen cannot fit is drawn outside the phone by its escape, in the
 * frame's unclipped layer — the trick every page on this site shares.
 */

/** The far end of a video call: somebody holding their camera up to the window,
 *  which is the frame the app is actually showing when it is not showing a
 *  face. Both are walls the rest of the site already uses. */
const WALL_FAR = "/media/walls/sheher.jpg";
const WALL_SELF = "/media/walls/studio.jpg";

const MARK = "/media/brand/xelvic.png";

/* ── the call, in three parts ──────────────────────────────────────────────
   The ground, the bottom bar, and the person in the middle. Every call screen
   on this page is some arrangement of those three, which is exactly how the app
   draws them. */

/** The ground a call sits on: flat, because the chat's wallpaper is behind the
 *  call rather than on top of it. */
function CallScreen({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-full flex-col bg-[#f1eff5] text-plum">
      {children}
    </div>
  );
}

/** The six things the app puts along the foot of a call, in the order it puts
 *  them: the two you reach for most, then the two that change the call, then a
 *  way to leave it running, then the one red button.
 *
 *  `over` is for the video screen, where the bar rides on the picture instead of
 *  on a ground of its own — so it goes translucent and drops its hairline. */
function CallControls({ over = false }: { over?: boolean }) {
  const controls = [
    { icon: VideoOff, label: "Video" },
    { icon: Mic, label: "Mute" },
    { icon: Volume2, label: "Speaker" },
    { icon: UserPlus, label: "Add" },
    { icon: ChevronDown, label: "Minimise" },
  ];

  return (
    <div
      className={`mx-2 mb-3 rounded-2xl px-1 py-1.5 shadow-[0_10px_30px_rgba(58,10,36,.16)] ${
        over ? "bg-pure/92 backdrop-blur" : "border border-plum/10 bg-pure"
      }`}
    >
      <div className="flex items-start justify-between">
        {controls.map(({ icon: Icon, label }) => (
          <span
            key={label}
            className="flex min-w-0 flex-1 flex-col items-center gap-1"
          >
            <span className="grid h-7 w-7 place-items-center rounded-full bg-plum/[0.06] text-plum">
              <Icon size={14} />
            </span>
            <span className="whitespace-nowrap text-[7px] leading-none text-plum/55">
              {label}
            </span>
          </span>
        ))}
        <span className="flex min-w-0 flex-1 flex-col items-center gap-1">
          <span className="grid h-7 w-7 place-items-center rounded-full bg-[#e5302f] text-pure">
            <Phone size={14} className="rotate-[135deg]" />
          </span>
          <span className="whitespace-nowrap text-[7px] leading-none text-plum/55">
            Hang up
          </span>
        </span>
      </div>
    </div>
  );
}

/** Their photo, at the size the app draws it on a call. */
function CallAvatar() {
  return (
    <span className="h-24 w-24 overflow-hidden rounded-full ring-4 ring-pure">
      <img src={AVATAR} alt="" className="h-full w-full object-cover" />
    </span>
  );
}

/* ------------------------------ start ------------------------------ */

/** The conversation a call begins in. Nothing here is about the call yet — it
 *  is the app's ordinary convo header, which is the whole point: the two icons
 *  that ring somebody are already in it. */
function StartScreen() {
  return (
    <Screen>
      <StatusRow />
      <ConvoHeader name="John" sub="online" more />

      <Thread>
        <DayChip>Today</DayChip>
        <Bubble text="Are we still on for tonight?" />
        <Bubble mine text="Yes — ring me when you are free" />
        <Bubble text="Give me ten minutes, I'm finishing something." />
        <Bubble mine text="Take your time." />
        <Stamp>20:31</Stamp>
        <Bubble text="Done. Calling you now 📞" />
        <Bubble mine text="Perfect — I'm here." />
        <Bubble text="Also, that rooftop place you mentioned?" />
        <Bubble mine text="Worth the walk. I'll show you on the call." />
        <Bubble text="Deal." />
      </Thread>

      <Composer placeholder="Say something" />
    </Screen>
  );
}

function StartEscape() {
  return (
    <Float side="right" top={92} width={178}>
      <FloatTitle>Two ways to ring</FloatTitle>
      <span className="mt-2 flex items-center gap-3">
        <span className="flex flex-col items-center gap-1">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-[#f7bcd6] text-plum">
            <Phone size={15} />
          </span>
          <span className="text-[8px] font-semibold leading-none text-plum/60">
            Voice
          </span>
        </span>
        <span className="flex flex-col items-center gap-1">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-[#f7bcd6] text-plum">
            <Video size={15} />
          </span>
          <span className="text-[8px] font-semibold leading-none text-plum/60">
            Video
          </span>
        </span>
      </span>
      <FloatBody>
        They sit in the header of every convo — one person or a whole group — so
        a call starts in the place you were already talking.
      </FloatBody>
    </Float>
  );
}

/* ------------------------------ ringing ------------------------------ */

/** Outgoing, before they pick up. */
function RingingScreen() {
  return (
    <CallScreen>
      <StatusRow />

      <div className="flex min-h-0 flex-1 flex-col items-center justify-center px-6">
        <CallAvatar />
        <p className="mt-5 font-display text-xl font-bold leading-none">John</p>
        <p className="mt-2 text-[11px] leading-none text-plum/55">Ringing…</p>
        <span className="mt-4 flex items-center gap-1.5 rounded-full bg-pure px-2.5 py-1 text-[8.5px] font-semibold leading-none text-plum/60 shadow-[0_1px_3px_rgba(58,10,36,.10)]">
          <span className="h-2 w-2 shrink-0 rounded-full bg-[#22c55e]" />
          Connected · ringing them
        </span>
      </div>

      <div className="flex shrink-0 items-center justify-center pb-7">
        <span className="grid h-11 w-11 place-items-center rounded-full bg-[#e5302f] text-pure shadow-[0_6px_18px_rgba(229,48,47,.35)]">
          <Phone size={18} className="rotate-[135deg]" />
        </span>
      </div>
    </CallScreen>
  );
}

function RingEscape() {
  return (
    <>
      <Float side="right" top={318} width={176}>
        <FloatTitle>Peer to peer, not through a middle</FloatTitle>
        <FloatBody>
          The call is built on WebRTC, so the two ends talk to each other
          directly — low latency, and no middle to listen in from.
        </FloatBody>
      </Float>
      <Float side="left" top={452} width={146}>
        <FloatTitle>A missed call is not lost</FloatTitle>
        <FloatBody>
          It becomes a row in the calls list, one tap from being tried again.
        </FloatBody>
      </Float>
    </>
  );
}

/* ------------------------------ voice ------------------------------ */

/** Connected, audio only. Their photo, their name, and the count — which is all
 *  the app keeps on screen once there is nothing to look at. */
function VoiceScreen() {
  return (
    <CallScreen>
      <StatusRow />

      <div className="flex min-h-0 flex-1 flex-col items-center justify-center px-6">
        <CallAvatar />
        <p className="mt-5 font-display text-xl font-bold leading-none">John</p>
        <p className="mt-2 text-[11px] leading-none text-plum/55">
          Audio call · 04:12
        </p>
      </div>

      <CallControls />
    </CallScreen>
  );
}

function VoiceEscape() {
  return (
    <>
      <Float side="right" top={286} width={192}>
        <FloatTitle>The bar along the bottom</FloatTitle>
        <span className="mt-2 flex flex-col gap-1.5">
          {[
            "Video — turn your camera on mid-call",
            "Mute and Speaker — one tap each",
            "Add — another person, without hanging up",
            "Minimise — keep talking, use the app",
            "Hang up — the only red one",
          ].map((line) => (
            <span
              key={line}
              className="flex items-center gap-1.5 text-[9.5px] font-medium leading-snug text-plum/70"
            >
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#ec4899]" />
              {line}
            </span>
          ))}
        </span>
      </Float>
      <Float side="left" top={470} width={142}>
        <FloatTitle>Minimise is the useful one</FloatTitle>
        <FloatBody>
          On a long call it folds into a strip and the call keeps running while
          you use everything else.
        </FloatBody>
      </Float>
    </>
  );
}

/* ------------------------------ video ------------------------------ */

/** The same call with the camera on: them across the whole display, you in the
 *  corner, and the controls over the picture. */
function VideoScreen() {
  return (
    <div className="relative h-full overflow-hidden bg-plum text-pure">
      <img
        src={WALL_FAR}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      {/* dark at both ends and clear in the middle, so the status row and the
          name stay legible over whatever the far camera happens to be showing */}
      <div className="absolute inset-0 bg-gradient-to-b from-plum/60 via-plum/10 to-plum/65" />

      <div className="relative flex items-end justify-between px-4 pb-2 pt-4 text-[10px] font-semibold leading-none text-pure/85">
        <span>21:04</span>
        <span className="flex items-center gap-1 text-pure/70">
          <span className="h-2 w-3 rounded-[2px] border border-pure/60" />
          <span>5G</span>
        </span>
      </div>

      {/* their own camera, small, and ringed so it is never mistaken for the
          call itself */}
      <span className="absolute right-3 top-12 h-[76px] w-[56px] overflow-hidden rounded-xl ring-2 ring-pure/75 shadow-[0_6px_18px_rgba(58,10,36,.4)]">
        <img src={WALL_SELF} alt="" className="h-full w-full object-cover" />
      </span>

      <div className="absolute inset-x-0 bottom-[74px] flex flex-col items-center gap-1">
        <span className="text-[13px] font-bold leading-none">John</span>
        <span className="text-[9.5px] font-medium leading-none text-pure/75">
          Video call · 06:24
        </span>
      </div>

      <div className="absolute inset-x-0 bottom-0">
        <CallControls over />
      </div>
    </div>
  );
}

function VideoEscape() {
  return (
    <>
      <Float side="right" top={168} width={162}>
        <FloatTitle>You, in the corner</FloatTitle>
        <FloatBody>
          Your own camera waits in a small ringed tile over the picture, so
          there is never a question about which one is you.
        </FloatBody>
      </Float>
      <Float side="left" top={438} width={150}>
        <FloatTitle>One tap swaps the camera</FloatTitle>
        <FloatBody>
          ↺ flips between the front and the back, so you can show them the thing
          instead of describing it.
        </FloatBody>
      </Float>
    </>
  );
}

/* ------------------------------ group ------------------------------ */

/** More than two. The app gives everybody a tile of their own, and leaves one
 *  empty for the person you have not added yet. */
function GroupScreen() {
  const tiles: { name: string; src?: string; letter?: string; tone?: string }[] =
    [
      { name: "John", src: AVATAR },
      { name: "Priya", src: WALL_SELF },
      { name: "Morgan", letter: "M", tone: "#7c3aed" },
      { name: "Hannah", letter: "H", tone: "#db2777" },
      { name: "Sam", letter: "S", tone: "#0ea5e9" },
    ];

  return (
    <CallScreen>
      <StatusRow />

      <div className="flex shrink-0 items-center gap-2 px-2 py-1.5">
        <ChevronLeft size={15} className="shrink-0 text-plum/60" />
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[12px] font-bold leading-tight">
            Weekend crew
          </span>
          <span className="block text-[8px] leading-tight text-plum/50">
            5 on the call
          </span>
        </span>
        <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#e5302f] text-pure">
          <Phone size={12} className="rotate-[135deg]" />
        </span>
      </div>

      <div className="grid min-h-0 flex-1 grid-cols-2 content-start gap-1.5 px-1.5 pb-1.5">
        {tiles.map((t) => (
          <span
            key={t.name}
            className="relative h-[140px] overflow-hidden rounded-xl bg-[#e7e1e6]"
          >
            {t.src ? (
              <img src={t.src} alt="" className="h-full w-full object-cover" />
            ) : (
              <span className="absolute inset-0 grid place-items-center">
                <Person letter={t.letter!} tone={t.tone} />
              </span>
            )}
            <span className="absolute bottom-1 left-1 flex items-center gap-1 rounded-md bg-plum/55 px-1.5 py-[3px] text-[7px] font-semibold leading-none text-pure backdrop-blur">
              <Mic size={7} />
              {t.name}
            </span>
          </span>
        ))}

        {/* the sixth tile is the one nobody is in yet */}
        <span className="grid h-[140px] place-items-center rounded-xl border border-dashed border-plum/25 bg-pure/60">
          <span className="flex flex-col items-center gap-1 text-plum/60">
            <span className="grid h-7 w-7 place-items-center rounded-full bg-plum/[0.06]">
              <UserPlus size={14} />
            </span>
            <span className="text-[7.5px] font-semibold leading-none">Add</span>
          </span>
        </span>
      </div>

      <CallControls />
    </CallScreen>
  );
}

function GroupEscape() {
  return (
    <>
      <Float side="right" top={252} width={184}>
        <FloatTitle>Nobody has to leave to invite</FloatTitle>
        <FloatBody>
          ＋ pulls somebody else into the call you are already on. They ring, the
          picker opens over the call, and the conversation underneath carries on
          while you choose.
        </FloatBody>
      </Float>
      <Float side="left" top={438} width={148}>
        <FloatTitle>Quality adapts, the call does not drop</FloatTitle>
        <FloatBody>
          On a bad network the app lowers what it sends rather than ending the
          call.
        </FloatBody>
      </Float>
    </>
  );
}

/* ------------------------------ history ------------------------------ */

type CallRow = {
  name: string;
  /** which way it went — this is what the row's colour and glyph say */
  dir: "incoming" | "outgoing" | "missed";
  /** the line under the name: the direction, then whatever else is known */
  note: string;
  when: string;
  /** was it video; the call-back glyph matches */
  video?: boolean;
  src?: string;
  letter?: string;
  tone?: string;
};

/** What each direction looks like: its own glyph and its own colour, so a
 *  missed call cannot hide among the ones you had. */
const CALL_KIND = {
  incoming: { icon: PhoneIncoming, tone: "text-[#16a34a]" },
  outgoing: { icon: PhoneOutgoing, tone: "text-plum/55" },
  missed: { icon: PhoneMissed, tone: "text-[#e5302f]" },
} as const;

/** The head of the list, with Calls open rather than All. It is the app's own
 *  head — the mark, the title with its dot of life, and the four counts the
 *  calls sit under. */
function CallHead() {
  const counts: { label: string; count?: number }[] = [
    { label: "All", count: 9 },
    { label: "Unread", count: 2 },
    { label: "Requested" },
    { label: "Calls", count: 6 },
  ];

  return (
    <div className="shrink-0 bg-pure">
      <div className="flex items-center gap-2.5 px-3 pb-1.5 pt-1">
        <span className="h-7 w-7 shrink-0 overflow-hidden rounded-full ring-1 ring-plum/10">
          <img src={MARK} alt="" className="h-full w-full object-cover" />
        </span>
        <Search size={15} className="shrink-0 text-plum/75" />

        <span className="flex flex-1 items-baseline justify-center gap-1">
          <span className="text-[15px] font-bold leading-none">Convo</span>
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#22c55e]" />
        </span>

        <Users size={17} className="shrink-0 text-plum/75" />
        <Camera size={17} className="shrink-0 text-plum/75" />
      </div>

      <div className="grid grid-cols-4 border-b border-plum/10">
        {counts.map((c) => (
          <span
            key={c.label}
            className={`flex items-baseline justify-center gap-1 pb-1.5 text-[10.5px] font-semibold leading-none ${
              c.label === "Calls"
                ? "border-b-2 border-[#ec4899] text-[#ec4899]"
                : "text-plum/50"
            }`}
          >
            {c.label}
            {c.count !== undefined && (
              <span className="text-[8px] font-bold">{c.count}</span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}

/** One call. The avatar, the name, which way it went and how long it lasted,
 *  when it was, and the glyph on the right that rings them again. */
function CallLine({ row }: { row: CallRow }) {
  const kind = CALL_KIND[row.dir];
  const Kind = kind.icon;
  const Back = row.video ? Video : Phone;

  return (
    <div className="flex items-center gap-2.5 border-b border-plum/10 bg-pure px-3 py-2">
      <span className="shrink-0">
        {row.src ? (
          <span className="block h-9 w-9 overflow-hidden rounded-full bg-pink-100">
            <img src={row.src} alt="" className="h-full w-full object-cover" />
          </span>
        ) : (
          <Person letter={row.letter!} tone={row.tone} />
        )}
      </span>

      <span className="min-w-0 flex-1">
        <span className="block truncate text-[11.5px] font-bold leading-tight">
          {row.name}
        </span>
        <span
          className={`mt-0.5 flex items-center gap-1 truncate text-[9.5px] leading-none ${kind.tone}`}
        >
          <Kind size={10} className="shrink-0" />
          <span className="truncate">{row.note}</span>
        </span>
      </span>

      <span className="flex shrink-0 flex-col items-end gap-1">
        <span
          className={`text-[8.5px] leading-none ${
            row.dir === "missed" ? "font-bold text-[#e5302f]" : "text-plum/45"
          }`}
        >
          {row.when}
        </span>
        <span className="grid h-[18px] w-[18px] place-items-center rounded-full bg-plum/[0.06] text-plum/70">
          <Back size={10} />
        </span>
      </span>
    </div>
  );
}

/** The app's five destinations, in the floating pill it floats over every list:
 *  the same foot the messaging list draws, with Convo still the live one,
 *  because a screen's foot says where you are in the app rather than what you
 *  are looking at. */
function CallFoot() {
  const tabs: { label: string; icon: LucideIcon; on?: boolean; dot?: boolean }[] =
    [
      { label: "Drops", icon: LayoutGrid },
      { label: "Moments", icon: Sparkles },
      { label: "Convo", icon: MessageCircle, on: true, dot: true },
      { label: "Audio", icon: AudioLines },
      { label: "Live", icon: Radio },
    ];

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center gap-1.5 bg-gradient-to-t from-[#fdf7fa] via-[#fdf7fa]/92 to-transparent px-2 pb-2 pt-5">
      <span className="flex flex-1 items-center justify-around rounded-full bg-pure/85 px-1 py-1.5 shadow-[0_6px_18px_rgba(58,10,36,.14)] ring-1 ring-plum/5 backdrop-blur">
        {tabs.map(({ label, icon: Icon, on, dot }) => (
          <span
            key={label}
            className={`relative flex flex-col items-center gap-0.5 text-[7px] font-semibold leading-none ${
              on ? "text-[#ec4899]" : "text-plum/45"
            }`}
          >
            <Icon size={13} />
            {dot && (
              <span className="absolute -right-1 top-0 h-1.5 w-1.5 rounded-full bg-[#ef4444]" />
            )}
            {label}
          </span>
        ))}
      </span>
    </div>
  );
}

/** What you have already done, in the order you did it. */
function HistoryScreen() {
  const rows: CallRow[] = [
    {
      name: "John",
      dir: "outgoing",
      note: "Outgoing · 4 min 12 s",
      when: "20:41",
      video: true,
      src: AVATAR,
    },
    {
      name: "Morgan Lee",
      dir: "missed",
      note: "Missed",
      when: "18:02",
      letter: "M",
      tone: "#7c3aed",
    },
    {
      name: "Priya",
      dir: "incoming",
      note: "Incoming · 12 min",
      when: "17:20",
      src: WALL_SELF,
    },
    {
      name: "Weekend crew",
      dir: "outgoing",
      note: "Outgoing · 5 people · 26 min",
      when: "Mon",
      video: true,
      letter: "W",
      tone: "#db2777",
    },
    {
      name: "Hannah B",
      dir: "missed",
      note: "Missed · 2 calls",
      when: "Sun",
      letter: "H",
      tone: "#0ea5e9",
    },
    {
      name: "John",
      dir: "incoming",
      note: "Incoming · 52 s",
      when: "Sat",
      src: AVATAR,
    },
    {
      name: "Studio",
      dir: "outgoing",
      note: "Outgoing · 1 min 08 s",
      when: "Fri",
      letter: "S",
      tone: "#f59e0b",
    },
  ];

  return (
    <Screen>
      <StatusRow />
      <CallHead />

      <div className="min-h-0 flex-1 overflow-hidden">
        {rows.map((row) => (
          <CallLine key={`${row.name}-${row.when}`} row={row} />
        ))}
      </div>

      <CallFoot />
    </Screen>
  );
}

function HistoryEscape() {
  return (
    <>
      <Float side="right" top={330} width={182}>
        <FloatTitle>Every call, made and missed</FloatTitle>
        <FloatBody>
          A missed call is a row you read at your own pace rather than a banner
          you have to clear — and the list is in the order things happened.
        </FloatBody>
      </Float>
      <Float side="left" top={452} width={146}>
        <FloatTitle>Tap a row to call back</FloatTitle>
        <FloatBody>
          The glyph on the right starts that call again, in the kind it was the
          first time.
        </FloatBody>
      </Float>
    </>
  );
}

/* ------------------------------- the map ------------------------------- */

const screens: Record<string, () => JSX.Element> = {
  start: StartScreen,
  ring: RingingScreen,
  voice: VoiceScreen,
  video: VideoScreen,
  group: GroupScreen,
  history: HistoryScreen,
};

const escapes: Record<string, () => JSX.Element> = {
  start: StartEscape,
  ring: RingEscape,
  voice: VoiceEscape,
  video: VideoEscape,
  group: GroupEscape,
  history: HistoryEscape,
};

/** The screen a calls section draws. */
export function CallMockup({ id }: { id: string }) {
  const Mockup = screens[id];
  return Mockup ? <Mockup /> : null;
}

/** The cards that one draws outside the phone, in the frame's overlay layer. */
export function CallEscape({ id }: { id: string }) {
  const Escape = escapes[id];
  return Escape ? <Escape /> : null;
}
