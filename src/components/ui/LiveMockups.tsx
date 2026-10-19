import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import {
  AudioLines,
  ChevronLeft,
  Crown,
  Gamepad2,
  Hand,
  Headphones,
  HelpCircle,
  MessageSquare,
  Mic,
  MicOff,
  MoreVertical,
  Plus,
  Share,
  Smile,
  SwitchCamera,
  Video,
  VideoOff,
} from "lucide-react";
import {
  AVATAR,
  Float,
  FloatBody,
  FloatTitle,
} from "./NewMockups";

/**
 * The screens the live page draws, one per thing the app actually does: open a
 * room, stream, hold an audio room, read the hands-up queue, put a game on the
 * stage, and find it all again on the shelf.
 *
 * These are drawn from the app itself, screen for screen — the same light ground,
 * the same `+` sheet with its four kinds of room, the same stage header with the
 * coloured kind tile, the LIVE badge, the microphone line, the hands-up row with
 * Bring up, the white game card, the named noughts-and-crosses board, and the
 * round action bar at the bottom. Nothing here is a mood piece: if the app does
 * not show it, it is not drawn.
 *
 * Each screen also hands one piece of itself to the frame's unclipped layer: the
 * `+` sheet, the camera tile, the stage, the hands-up queue, the board, the
 * shelf. The piece is drawn at the size the app gives it — bigger than the
 * phone — and runs past the glass on one side or both, and the screen leaves the
 * same height empty behind it so the two still read as one screen. Only one
 * explanatory card survives (in the Room), because there is one thing the screen
 * cannot say by itself: that the audience is still in the room.
 *
 * The light chrome — the status row, the letter avatars, one floating card — comes
 * from `NewMockups`, the same kit the messaging and calls pages draw with. The
 * parts that are the app's live vocabulary and nothing else — the kind tile, the
 * bottom action bar, the room rows — are local, because no other screen in the
 * app has them.
 *
 * Nothing moves. A room caught on camera does not need staging.
 */

/** the two faces these screens use, and the wall the camera is pointed at */
const HOST = "/media/walls/studio.jpg";
const FACE = "/media/walls/mehfil.jpg";
const FACE_2 = "/media/walls/sheher.jpg";
const STREAM = "/media/walls/raat.jpg";

/** the app's own mark, in the Live tab's header */
const MARK = "/media/brand/xelvic.png";

/* ── the room's furniture ─────────────────────────────────────────────────
   The pieces every live screen shares: the ground, the status row, the kind
   tile, the header, and the round bar at the foot of the room. */

function LiveScreen({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex h-full flex-col bg-[#f8f6f9] text-plum">
      {children}
    </div>
  );
}

/** A piece of the screen that leaves the phone.
 *
 *  The overlay layer `PhoneFrame` hands us is the display's own box, unclipped,
 *  so a child pushed past the edge and given more than 100% of the width carries
 *  real furniture — the + sheet, a camera tile, the board, a room row — out over
 *  the glass. The screen leaves the same height empty where the piece would sit,
 *  which is what keeps the two reading as one screen rather than two drawings.
 *
 *  This is the escape the messaging page uses with a bubble, done with the parts
 *  that matter on this page. A card explaining a screen is only added where the
 *  screen itself cannot say the thing. */
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

/** The status row, with the app's other right-hand side: a room in session wears
 *  the green microphone pill where the signal usually sits. Same minute as the
 *  rest of the site, because these are the same phones. */
function LiveStatus({ mic = false }: { mic?: boolean }) {
  return (
    <div className="flex shrink-0 items-end justify-between px-4 pb-2 pt-4 text-[10px] font-semibold leading-none text-plum/70">
      <span>21:04</span>
      {mic ? (
        <span className="grid h-4 w-9 place-items-center rounded-full bg-[#22c55e] text-pure">
          <Mic size={8} />
        </span>
      ) : (
        <span className="flex items-center gap-1 text-plum/50">
          <span className="h-2 w-3 rounded-[2px] border border-plum/40" />
          <span>5G</span>
        </span>
      )}
    </div>
  );
}

type Kind = "room" | "stream" | "game" | "ama";

/** Each kind of room has its own tile in the app: amber for a Room, violet for a
 *  Stream, teal for a Game — the colour the header wears and the shelf reuses. */
const KINDS: Record<Kind, { color: string; icon: LucideIcon }> = {
  room: { color: "#a16207", icon: AudioLines },
  stream: { color: "#7c3aed", icon: Video },
  game: { color: "#0d9488", icon: Gamepad2 },
  ama: { color: "#db2777", icon: HelpCircle },
};

function KindTile({ kind, size = "h-7 w-7" }: { kind: Kind; size?: string }) {
  const K = KINDS[kind];
  return (
    <span
      className={`grid ${size} shrink-0 place-items-center rounded-lg text-pure`}
      style={{ background: K.color }}
    >
      <K.icon size={14} />
    </span>
  );
}

/** The head of a room: back, the kind's tile, who and how many, LIVE, and the
 *  kebab. */
function RoomHead({
  kind,
  title,
  sub,
}: {
  kind: Kind;
  title: string;
  sub: string;
}) {
  return (
    <div className="flex shrink-0 items-center gap-2 px-2.5">
      <ChevronLeft size={16} className="shrink-0 text-plum/70" />
      <KindTile kind={kind} />
      <span className="min-w-0 flex-1 leading-tight">
        <span className="block truncate text-[11px] font-bold">{title}</span>
        <span className="block truncate text-[8px] text-plum/50">{sub}</span>
      </span>
      <span className="shrink-0 rounded bg-[#e11d6b] px-1.5 py-[3px] text-[6.5px] font-bold leading-none text-pure">
        LIVE
      </span>
      <MoreVertical size={13} className="shrink-0 text-plum/60" />
    </div>
  );
}

type BarIcon = { icon: LucideIcon; state?: "off" | "on" | "warn" };

/** The round action bar at the bottom of every room: chat, reactions, the game,
 *  share, and the person's own mic and camera. */
function LiveBar({ items }: { items: BarIcon[] }) {
  return (
    <div className="shrink-0 border-t border-plum/10 bg-pure px-2 pb-4 pt-2">
      <div className="flex items-center justify-between">
        {items.map(({ icon: Icon, state = "off" }, i) => (
          <span
            key={i}
            className={`grid h-7 w-7 place-items-center rounded-full ${
              state === "on"
                ? "bg-[#fce7f0] text-[#e11d6b]"
                : state === "warn"
                  ? "bg-[#fde7e6] text-[#e5302f]"
                  : "bg-[#f3f0f4] text-plum/70"
            }`}
          >
            <Icon size={13} />
          </span>
        ))}
      </div>
    </div>
  );
}

const ROOM_BAR: BarIcon[] = [
  { icon: MessageSquare },
  { icon: Smile },
  { icon: Gamepad2, state: "on" },
  { icon: Share },
  { icon: Mic, state: "on" },
];

const STREAM_BAR: BarIcon[] = [
  { icon: MessageSquare },
  { icon: Smile },
  { icon: Gamepad2 },
  { icon: Share },
  { icon: Mic, state: "on" },
  { icon: Video, state: "on" },
  { icon: SwitchCamera },
];

const GAME_BAR: BarIcon[] = [
  { icon: MessageSquare },
  { icon: Smile },
  { icon: Gamepad2, state: "on" },
  { icon: Share },
  { icon: Mic },
  { icon: VideoOff, state: "warn" },
  { icon: SwitchCamera },
];

/** The white card the app puts under the stage: a game, and the button that
 *  starts it. */
function GameCard({
  title,
  body,
  cta,
}: {
  title: string;
  body: string;
  cta: string;
}) {
  return (
    <div className="rounded-xl border border-plum/10 bg-pure px-2.5 py-2">
      <span className="block text-[9px] font-bold leading-tight">{title}</span>
      <span className="mt-0.5 block text-[7.5px] leading-snug text-plum/50">
        {body}
      </span>
      <span className="mt-1.5 flex items-center justify-center rounded-lg border border-plum/15 py-1.5 text-[8px] font-semibold leading-none">
        {cta}
      </span>
    </div>
  );
}

/** A label over a section of the room: HANDS UP, LISTENING. */
function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <span className="block text-[7px] font-bold uppercase leading-none tracking-[0.12em] text-plum/40">
      {children}
    </span>
  );
}

/** The host on the stage: their picture, ringed, with the crown badge the app
 *  gives the person holding the room. */
function HostStage({ name }: { name: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="relative">
        <span className="block h-16 w-16 overflow-hidden rounded-full ring-[3px] ring-[#e11d6b]">
          <img src={HOST} alt="" className="h-full w-full object-cover" />
        </span>
        <span className="absolute -right-0.5 -top-0.5 grid h-4 w-4 place-items-center rounded-full bg-pure text-[#e11d6b] shadow-sm">
          <Crown size={9} />
        </span>
      </span>
      <span className="mt-1.5 text-[9px] font-bold leading-none">{name}</span>
    </div>
  );
}

/** What the room says is actually on: the mic, the camera, the voices. */
function OnLine({
  icon: Icon,
  children,
}: {
  icon: LucideIcon;
  children: ReactNode;
}) {
  return (
    <span className="flex items-center justify-center gap-1 text-[7.5px] leading-none text-plum/55">
      <Icon size={8} />
      {children}
    </span>
  );
}

/* ------------------------------ open a room ------------------------------ */

function LiveTabHead() {
  return (
    <div className="flex shrink-0 items-center gap-2.5 px-3">
      <span className="block h-8 w-8 shrink-0 overflow-hidden rounded-full bg-plum">
        <img src={MARK} alt="" className="h-full w-full object-cover" />
      </span>
      <span className="min-w-0 flex-1 leading-none">
        <span className="block text-[15px] font-bold">Live</span>
        <span className="mt-1 block text-[7.5px] text-plum/45">
          Rooms · Streams · AMAs
        </span>
      </span>
      <Plus size={15} className="shrink-0 text-plum/70" />
    </div>
  );
}

function TabChips({ active }: { active: string }) {
  return (
    <div className="flex shrink-0 items-center gap-1.5 px-3">
      {["On air", "Coming up", "Mine"].map((t) => (
        <span
          key={t}
          className={`rounded-full px-2.5 py-1 text-[8px] font-bold leading-none ${
            t === active
              ? "bg-[#b3134f] text-pure"
              : "bg-plum/[0.07] text-plum/70"
          }`}
        >
          {t}
        </span>
      ))}
    </div>
  );
}

function Field({ children }: { children: ReactNode }) {
  return (
    <span className="block rounded-lg bg-[#f4f1f5] px-3 py-2.5 text-[8.5px] leading-none text-plum/35">
      {children}
    </span>
  );
}

function KindChip({
  icon: Icon,
  label,
  active,
}: {
  icon: LucideIcon;
  label: string;
  active?: boolean;
}) {
  return (
    <span
      className={`flex flex-1 items-center justify-center gap-1 rounded-full border px-1 py-1.5 text-[7.5px] font-bold leading-none ${
        active
          ? "border-[#e11d6b] bg-[#e11d6b] text-pure"
          : "border-plum/10 bg-pure text-plum"
      }`}
    >
      <Icon size={9} />
      {label}
    </span>
  );
}

/** The + sheet, drawn the way the app draws it, with Room selected. It is drawn
 *  outside the glass, so it carries its own rounded corners and shadow. */
function OpenSheet() {
  return (
    <div className="relative z-10 shrink-0 rounded-2xl bg-pure px-3 pb-4 pt-3 shadow-[0_18px_50px_rgba(58,10,36,.28)] ring-1 ring-plum/10">
      <span className="block text-[15px] font-bold leading-none">
        Open a room
      </span>
      <p className="mt-1.5 text-[8px] leading-snug text-plum/50">
        Anybody can walk in. You hold the room, which means you hand out the
        microphones and you are the one who closes it.
      </p>

      <div className="mt-2.5 flex flex-col gap-1.5">
        <Field>What is it called?</Field>
        <Field>A line under it (optional)</Field>
      </div>

      <div className="mt-2 flex items-center gap-1.5">
        <KindChip icon={Mic} label="Room" active />
        <KindChip icon={Video} label="Stream" />
        <KindChip icon={Gamepad2} label="Game" />
        <KindChip icon={HelpCircle} label="AMA" />
      </div>

      <p className="mt-1.5 text-[7.5px] leading-snug text-plum/50">
        Voices only. Anybody on the stage can be heard, and the audience can talk
        in the room's chat and throw emoji.
      </p>

      <div className="mt-2">
        <Field>Tags, comma separated (optional)</Field>
      </div>

      <div className="mt-2 flex items-start justify-between gap-2">
        <span>
          <span className="block text-[9px] font-bold leading-none">
            Start it later
          </span>
          <span className="mt-1 block text-[7.5px] leading-snug text-plum/50">
            It is announced on the shelf with a time on it.
          </span>
        </span>
        <span className="mt-0.5 flex h-[18px] w-8 shrink-0 items-center rounded-full border-2 border-plum bg-pure p-[1px]">
          <span className="block h-3 w-3 rounded-full bg-plum" />
        </span>
      </div>

      <span className="mt-2.5 flex items-center justify-center rounded-xl bg-[#e11d6b] py-2 text-[9.5px] font-bold leading-none text-pure">
        Open it
      </span>
    </div>
  );
}

function OpenScreen() {
  return (
    <LiveScreen>
      <div className="relative flex min-h-0 flex-1 flex-col">
        <LiveStatus />
        <LiveTabHead />
        <div className="mt-2.5">
          <TabChips active="On air" />
        </div>

        {/* The shelf the + was tapped on. The sheet is drawn outside the glass
            and covers the lower half of this, the way it does in the app. */}
        <div className="mt-3 flex flex-col gap-3 px-3">
          <ShelfList />
        </div>

        <div className="absolute inset-0 bg-plum/25" />
      </div>
    </LiveScreen>
  );
}

/** The + sheet, lifted clear of the glass and wider than the phone on both
 *  sides, so it reads as the sheet enlarged rather than as a bleed. */
function OpenEscape() {
  return (
    <Breakout bottom={18} left={-10} width={120}>
      <OpenSheet />
    </Breakout>
  );
}

/* -------------------------------- stream -------------------------------- */

function StreamScreen() {
  return (
    <LiveScreen>
      <LiveStatus />
      <RoomHead
        kind="stream"
        title="Rooftop stream"
        sub="Jordan Blake · 3 people"
      />

      <div className="mt-2 flex min-h-0 flex-1 flex-col overflow-hidden px-2">
        {/* the host's camera — drawn outside the glass, so the stage below it
            starts where the tile would have ended */}
        <div className="h-[208px] shrink-0" />

        {/* the rest of the stage */}
        <div className="mt-1.5 grid shrink-0 grid-cols-2 gap-1.5">
          {[
            { src: FACE, name: "Tyler Brooks" },
            { src: FACE_2, name: "Ava Mitchell 😊😊" },
          ].map((t) => (
            <div
              key={t.name}
              className="relative h-[58px] overflow-hidden rounded-lg bg-[#efeaf0]"
            >
              <img src={t.src} alt="" className="h-full w-full object-cover" />
              <span className="absolute right-1 top-1 grid h-4 w-4 place-items-center rounded-full bg-plum/50 text-pure">
                <MicOff size={8} />
              </span>
              <span className="absolute inset-x-0 bottom-0 truncate bg-plum/40 px-1.5 py-1 text-[7px] font-semibold leading-none text-pure">
                {t.name}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-1.5 flex shrink-0 flex-col gap-1">
          <OnLine icon={Mic}>Your microphone is open · 2 voices</OnLine>
          <OnLine icon={Video}>Your camera is on</OnLine>
        </div>

        <div className="mt-2 shrink-0">
          <GameCard
            title="Go live with a game"
            body="The board becomes the stream. Everybody watching sees the same game."
            cta="Choose a game"
          />
        </div>

        <div className="mt-2 shrink-0">
          <SectionLabel>Listening</SectionLabel>
          <span className="mt-1 block text-[7.5px] leading-snug text-plum/45">
            Nobody is listening yet. A room with one person in it is a room.
          </span>
        </div>
      </div>

      <LiveBar items={STREAM_BAR} />
    </LiveScreen>
  );
}

/** The stage's big camera tile, running off the left of the phone. */
function StreamEscape() {
  return (
    <Breakout top={70} left={-10} width={110}>
      <div className="relative h-[208px] overflow-hidden rounded-xl border-2 border-[#e11d6b]">
        <img src={STREAM} alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-x-0 bottom-0 flex items-center gap-1 bg-gradient-to-t from-plum/80 to-transparent px-2 pb-1.5 pt-5">
          <span className="text-[8px] font-bold leading-none text-pure">
            Jordan Blake
          </span>
          <Crown size={8} className="text-pure/90" />
        </div>
      </div>
    </Breakout>
  );
}

/* --------------------------------- room --------------------------------- */

function HandsUpRow({
  name,
  src,
  big = false,
}: {
  name: string;
  src: string;
  big?: boolean;
}) {
  return (
    <span className={`flex items-center ${big ? "gap-2.5" : "gap-2"}`}>
      <span
        className={`block shrink-0 overflow-hidden rounded-full bg-pink-100 ${
          big ? "h-9 w-9" : "h-7 w-7"
        }`}
      >
        <img src={src} alt="" className="h-full w-full object-cover" />
      </span>
      <span
        className={`min-w-0 flex-1 truncate font-bold ${
          big ? "text-[11px]" : "text-[9px]"
        }`}
      >
        {name}
      </span>
      <Hand
        size={big ? 12 : 10}
        className="shrink-0 text-[#d97706]"
      />
      <span
        className={`shrink-0 rounded-full bg-[#b3134f] font-bold leading-none text-pure ${
          big ? "px-3 py-1.5 text-[9px]" : "px-2.5 py-1 text-[7.5px]"
        }`}
      >
        Bring up
      </span>
    </span>
  );
}

function RoomScreen() {
  return (
    <LiveScreen>
      <LiveStatus mic />
      <RoomHead
        kind="room"
        title="Late night, no plan"
        sub="Jordan Blake · 3 people"
      />

      <div className="mt-3 flex min-h-0 flex-1 flex-col overflow-hidden px-3">
        {/* the stage — drawn outside the glass and carried off the right, so the
            room's own line starts where the enlarged stage ends */}
        <div className="h-[172px] shrink-0" />

        <div className="mt-2 flex justify-center">
          <OnLine icon={Mic}>Your microphone is open · 1 voice</OnLine>
        </div>

        <div className="mt-2.5">
          <GameCard
            title="Play something with the room"
            body="Two of you play and everybody else watches."
            cta="Choose a game"
          />
        </div>

        <div className="mt-3">
          <SectionLabel>Hands up</SectionLabel>
          <div className="mt-1.5">
            <HandsUpRow name="Tyler Brooks" src={FACE} />
          </div>
        </div>

        <div className="mt-3">
          <SectionLabel>Listening</SectionLabel>
          <span className="mt-1.5 flex items-center gap-1.5">
            <Headphones size={10} className="shrink-0 text-plum/50" />
            <span className="text-[9px] leading-none text-plum/70">
              2 people listening
            </span>
          </span>
        </div>
      </div>

      <LiveBar items={ROOM_BAR} />
    </LiveScreen>
  );
}

/** The stage at the size the room actually gives it, carried off the right of
 *  the phone. One card stays on the left, because "the audience is still in the
 *  room" is the one thing a silent stage cannot show by itself. */
function RoomEscape() {
  return (
    <>
      <Breakout top={74} left={48} width={62}>
        <div className="flex flex-col items-center rounded-2xl bg-[#f8f6f9] p-2.5 shadow-lg ring-1 ring-plum/[0.06]">
          <span className="relative">
            <span className="block h-[132px] w-[132px] overflow-hidden rounded-full ring-4 ring-[#e11d6b]">
              <img src={HOST} alt="" className="h-full w-full object-cover" />
            </span>
            <span className="absolute -right-1 -top-1 grid h-7 w-7 place-items-center rounded-full bg-pure text-[#e11d6b] shadow-sm">
              <Crown size={13} />
            </span>
          </span>
          <span className="mt-1.5 text-[11px] font-bold leading-none">
            Jordan Blake
          </span>
        </div>
      </Breakout>

      <Float side="left" top={120} width={150}>
        <FloatTitle>Voices only</FloatTitle>
        <FloatBody>
          A Room has no camera in it. The audience is still in it — they talk in
          the chat and throw emoji.
        </FloatBody>
      </Float>
    </>
  );
}

/* --------------------------------- hands --------------------------------- */

function HandsScreen() {
  return (
    <LiveScreen>
      <LiveStatus mic />
      <RoomHead
        kind="room"
        title="Late night, no plan"
        sub="Jordan Blake · 4 people"
      />

      {/* `pt-1` gives the avatar's ring and crown room inside the clipped
          column — both sit outside the avatar's own box. */}
      <div className="mt-5 flex min-h-0 flex-1 flex-col overflow-hidden px-3 pt-1">
        <HostStage name="Jordan Blake" />
        <div className="mt-2 flex justify-center">
          <OnLine icon={Mic}>Your microphone is open · 2 voices</OnLine>
        </div>

        <div className="mt-3">
          <SectionLabel>Hands up</SectionLabel>
          {/* the queue itself is drawn outside the glass, at the size it needs */}
          <div className="mt-1.5 h-[96px]" />
        </div>

        <div className="mt-3">
          <SectionLabel>Listening</SectionLabel>
          <span className="mt-1.5 flex items-center gap-1.5">
            <Headphones size={10} className="shrink-0 text-plum/50" />
            <span className="text-[9px] leading-none text-plum/70">
              2 people listening
            </span>
          </span>
        </div>
      </div>

      <LiveBar items={ROOM_BAR} />
    </LiveScreen>
  );
}

/** The hands-up queue, widened past both sides of the phone. Nothing explains
 *  it: the rows, the hand and Bring up are the whole point. It keeps the screen's
 *  own ground, because outside the glass there is only the page behind it. */
function HandsEscape() {
  return (
    <Breakout top={204} left={-6} width={116}>
      <div className="flex flex-col gap-2 rounded-xl bg-[#f8f6f9] p-2 shadow-lg ring-1 ring-plum/[0.06]">
        <HandsUpRow name="Tyler Brooks" src={FACE} big />
        <HandsUpRow name="Chloe Bennett" src={FACE_2} big />
      </div>
    </Breakout>
  );
}

/* --------------------------------- game --------------------------------- */

/** x, o, x / blank, x, x / o, o, o — Ethan has taken the bottom row, which is
 *  the row the app lights up. */
const CELLS: ("" | "x" | "o")[] = ["x", "o", "x", "", "x", "x", "o", "o", "o"];
const WINNING = [6, 7, 8];

function Board() {
  return (
    <div className="rounded-xl border border-plum/10 bg-pure p-2.5">
      <div className="flex items-center gap-1 px-0.5">
        <span className="text-[8px] font-bold leading-none text-plum/35">#</span>
        <span className="min-w-0 truncate text-[8.5px] font-bold leading-none">
          Noughts and crosses
        </span>
        <span className="ml-auto text-[8px] font-bold leading-none text-[#e11d6b]">
          ✕
        </span>
        <span className="text-[7px] font-semibold leading-none text-plum/50">
          Jordan Blake
        </span>
        <span className="ml-1 text-[8px] font-bold leading-none">○</span>
        <span className="text-[7px] font-semibold leading-none text-plum/50">
          Ethan Cole
        </span>
      </div>

      <div className="mx-auto mt-2 grid w-[216px] grid-cols-3 gap-1.5">
        {CELLS.map((cell, i) => (
          <span
            key={i}
            className={`grid h-[52px] place-items-center rounded-md text-[18px] font-bold leading-none ${
              WINNING.includes(i)
                ? "bg-[#e8f5e9] ring-1 ring-[#16a34a]/40"
                : "bg-[#f4f1f5]"
            }`}
          >
            {cell === "x" ? (
              <span className="text-[#e11d6b]">✕</span>
            ) : cell === "o" ? (
              <span className="text-plum">○</span>
            ) : null}
          </span>
        ))}
      </div>

      <span className="mt-2 block text-[8px] font-bold leading-none text-[#16a34a]">
        Ethan Cole won
      </span>

      <div className="mt-2 flex gap-1.5">
        <span className="flex-1 rounded-full bg-[#e11d6b] py-1.5 text-center text-[8px] font-bold leading-none text-pure">
          Play again
        </span>
        <span className="flex-1 rounded-full border border-plum/15 py-1.5 text-center text-[8px] font-bold leading-none">
          Put it away
        </span>
      </div>
    </div>
  );
}

function GameScreen() {
  return (
    <LiveScreen>
      <LiveStatus />
      <RoomHead kind="game" title="Game night" sub="Jordan Blake · 2 people" />

      <div className="mt-2 flex min-h-0 flex-1 flex-col overflow-hidden px-2">
        {/* the board — drawn outside the glass, over both sides of the phone */}
        <div className="h-[249px] shrink-0" />

        {/* the room watching: one tile holding the board, one host tile below it */}
        <div className="relative mt-2 h-[168px] shrink-0 overflow-hidden rounded-xl bg-[#efeaf0]">
          <div className="absolute inset-0 grid place-items-center">
            <span className="block h-24 w-24 overflow-hidden rounded-full ring-2 ring-pure/60">
              <img src={HOST} alt="" className="h-full w-full object-cover" />
            </span>
          </div>
          <span className="absolute right-1.5 top-1.5 grid h-4 w-4 place-items-center rounded-full bg-plum/50 text-pure">
            <MicOff size={8} />
          </span>
          <span className="absolute inset-x-0 bottom-0 bg-plum/45 px-2 py-1.5 text-[7.5px] font-semibold leading-none text-pure">
            Ethan Cole
          </span>
        </div>

        <div className="relative mt-1 h-[34px] shrink-0 overflow-hidden rounded-t-lg border-2 border-b-0 border-[#e11d6b] bg-[#f4f0f4]">
          <span className="absolute left-1/2 top-1.5 block h-10 w-10 -translate-x-1/2 overflow-hidden rounded-full">
            <img src={MARK} alt="" className="h-full w-full object-cover" />
          </span>
        </div>
      </div>

      <LiveBar items={GAME_BAR} />
    </LiveScreen>
  );
}

/** The board at full size, breaking out of the phone on both sides — the room's
 *  stream, so it gets the width the stream would have had. */
function GameEscape() {
  return (
    <Breakout top={70} left={-8} width={116}>
      <Board />
    </Breakout>
  );
}

/* --------------------------------- shelf --------------------------------- */

function RoomRow({
  kind,
  host,
  name,
  people,
  live = true,
  when,
}: {
  kind: Kind;
  host: string;
  name: string;
  people: string;
  live?: boolean;
  when?: string;
}) {
  return (
    <div className="flex gap-2">
      <KindTile kind={kind} size="h-11 w-11" />
      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-1">
          <span
            className={`shrink-0 rounded px-1 py-[2px] text-[6px] font-bold leading-none text-pure ${
              live ? "bg-[#e11d6b]" : "bg-plum/45"
            }`}
          >
            {live ? "LIVE" : "COMING UP"}
          </span>
          <span className="truncate text-[7px] leading-none text-plum/50">
            {when ?? `by ${host}`}
          </span>
        </span>
        <span className="mt-1 block truncate text-[10px] font-bold leading-none">
          {name}
        </span>
        <span className="mt-1 flex items-center gap-1">
          <span className="block h-3 w-3 shrink-0 overflow-hidden rounded-full bg-pink-100">
            <img src={AVATAR} alt="" className="h-full w-full object-cover" />
          </span>
          <span className="text-[7px] leading-none text-plum/50">{people}</span>
        </span>
      </span>
    </div>
  );
}

/** What sits under the shelf's tabs: the rooms on air, then what is coming. */
function ShelfList() {
  return (
    <>
      <RoomRow
        kind="room"
        host="Jordan Blake"
        name="Late night, no plan"
        people="2 people"
      />
      <RoomRow
        kind="stream"
        host="Tyler Brooks"
        name="Balcony stream"
        people="5 people"
      />
      <RoomRow
        kind="game"
        host="Chloe Bennett"
        name="Noughts and crosses"
        people="3 people"
      />

      <div className="mt-1">
        <SectionLabel>Coming up</SectionLabel>
        <div className="mt-2">
          <RoomRow
            kind="ama"
            host="Ava Mitchell"
            name="Ask me anything"
            people="0 people yet"
            live={false}
            when="Starts 9:30 PM"
          />
        </div>
      </div>
    </>
  );
}

function ShelfScreen() {
  return (
    <LiveScreen>
      <LiveStatus />
      <LiveTabHead />
      <div className="mt-2.5">
        <TabChips active="On air" />
      </div>

      {/* the shelf itself is drawn outside the glass */}
      <div className="mt-3 h-[232px] shrink-0" />
    </LiveScreen>
  );
}

/** The shelf, running past both sides of the phone, so the rows read at the size
 *  the Live tab actually gives them — on the screen's own ground, since the rows
 *  themselves are transparent. */
function ShelfEscape() {
  return (
    <Breakout top={104} left={-8} width={116}>
      <div className="flex flex-col gap-3 rounded-xl bg-[#f8f6f9] p-2.5 shadow-lg ring-1 ring-plum/[0.06]">
        <ShelfList />
      </div>
    </Breakout>
  );
}

/* ------------------------------- the map ------------------------------- */

const screens: Record<string, () => JSX.Element> = {
  open: OpenScreen,
  stream: StreamScreen,
  room: RoomScreen,
  hands: HandsScreen,
  game: GameScreen,
  shelf: ShelfScreen,
};

const escapes: Record<string, () => JSX.Element> = {
  open: OpenEscape,
  stream: StreamEscape,
  room: RoomEscape,
  hands: HandsEscape,
  game: GameEscape,
  shelf: ShelfEscape,
};

/** The screen a live section draws. */
export function LiveMockup({ id }: { id: string }) {
  const Mockup = screens[id];
  return Mockup ? <Mockup /> : null;
}

/** The piece of the screen that one section draws outside the phone, in the
 *  frame's overlay layer. */
export function LiveEscape({ id }: { id: string }) {
  const Escape = escapes[id];
  return Escape ? <Escape /> : null;
}
