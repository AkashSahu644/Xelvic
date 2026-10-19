import type { ReactNode } from "react";
import {
  ArrowUp,
  AudioLines,
  Ban,
  Bell,
  BellOff,
  Brush,
  Camera,
  Check,
  Clock,
  Flame,
  LayoutGrid,
  Lock,
  MessageCircle,
  Mic,
  Pin,
  Play,
  Radio,
  Search,
  Sparkles,
  SquareCheck,
  Timer,
  Trash2,
  Users,
  X,
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
 * The screens the messaging page draws, one per thing a conversation can do:
 * pin a message, mute one, move one to the vault, let one disappear, react to
 * one, speak into one.
 *
 * They are built out of the same chrome the What's New screens are — the status
 * row, the convo header, the composer, the ground, the bubbles in a thread, the
 * cards that hang off the side of the frame — which is why that kit is exported
 * from `NewMockups`. A messaging screen, a What's New screen and a calls screen
 * are the same app seen three times, and they should not be able to drift apart.
 *
 * The list is the one thing that stays here: the head with the mark and the
 * counts, the rows under it, and the floating foot. The messaging page is the
 * page that draws the app's list, so the list lives with the screens that are
 * made of it.
 *
 * Two rules hold across all of them:
 *
 *   1. The words are the app's own. The 30-minute ceiling on a voice note, the
 *      vault code having no recovery route, and switching on disappearing
 *      messages deleting everything already in the chat for both people are all
 *      things the app states outright, so nothing here softens them.
 *   2. Nothing moves. These blocks sit still while you read them, exactly like
 *      the ones on `/whats-new`.
 *
 * Anything a screen cannot fit is drawn outside the phone by its escape, in the
 * frame's unclipped layer — the same trick the comments sheet uses.
 */

/* ── the convo list ────────────────────────────────────────────────────────
   The app's list, in its three parts: the head with the mark and the counts,
   a row with its avatar and chips, and the floating foot. The mute and vault
   screens are both this list, so all three live here rather than inside either
   of them. */

const MARK = "/media/brand/xelvic.png";

/** The app's own head for the list, and the strip of counts under it. The title
 *  carries a dot of life beside it, which is where the app puts it. */
function ConvoHead() {
  const tabs: { label: string; count?: number; on?: boolean }[] = [
    { label: "All", count: 9, on: true },
    { label: "Unread", count: 2 },
    { label: "Requested" },
    { label: "Calls" },
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

      {/* four counts across the width, the live one underlined in pink */}
      <div className="grid grid-cols-4 border-b border-plum/10">
        {tabs.map((t) => (
          <span
            key={t.label}
            className={`flex items-baseline justify-center gap-1 pb-1.5 text-[10.5px] font-semibold leading-none ${
              t.on ? "border-b-2 border-[#ec4899] text-[#ec4899]" : "text-plum/50"
            }`}
          >
            {t.label}
            {t.count !== undefined && (
              <span className="text-[8px] font-bold">{t.count}</span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}

type ChatRow = {
  name: string;
  /** the line under the name */
  text: string;
  /** how that line is written: a count of what is new, a receipt, or neither */
  state?: "new" | "opened" | "sent" | "none";
  /** the age on the right */
  when: string;
  /** the streak the app keeps beside it */
  flame?: boolean;
  /** the chip the app hangs under the line, when there is one */
  chip?: "group" | "muted";
  /** something in it is unread: tinted, with the pink edge down the side */
  unread?: boolean;
  /** a notice from the app rather than a person */
  bell?: boolean;
  /** the app's own group, so it wears the mark rather than a face */
  mark?: boolean;
  /** the @name under it in the sheet that opens on the row */
  handle?: string;
  /** somebody is online — the green dot on the avatar */
  online?: boolean;
  /** no photo — the initial stands in */
  letter?: string;
  tone?: string;
};

/** The line under a name, in the three colours the app gives it. */
const PREVIEW: Record<string, string> = {
  new: "font-semibold text-plum",
  opened: "font-semibold text-[#ec4899]",
  sent: "text-plum/55",
  none: "text-plum/55",
};

/** The row, at either of the two sizes it is drawn at: the list's own, and the
 *  size the muted row is drawn at once it has left the glass. Same row, same
 *  parts, one scale apart — the escaped one is the loudest thing on the phone
 *  and has to stand up on its own, away from the column that framed it. */
const ROW = {
  list: {
    pad: "gap-2.5 border-b border-plum/10 px-3 py-2",
    avatar: "h-9 w-9",
    name: "text-[11.5px]",
    preview: "text-[9.5px]",
    chip: "gap-1 px-1.5 py-[3px] text-[7.5px]",
    chipIcon: 8,
    when: "text-[8.5px]",
    flame: 11,
    dot: "h-2.5 w-2.5",
    bell: 16,
    letter: "text-[11px]",
  },
  big: {
    pad: "gap-3 px-4 py-2.5",
    avatar: "h-10 w-10",
    name: "text-[13px]",
    preview: "text-[10.5px]",
    chip: "gap-1.5 px-2 py-[3px] text-[8px]",
    chipIcon: 9,
    when: "text-[9.5px]",
    flame: 12,
    dot: "h-3 w-3",
    bell: 18,
    letter: "text-[13px]",
  },
} as const;

/** One row of the convo list, in the app's own dress: the avatar with its dot,
 *  the name, the line under it, any chip, and the streak on the right. A row
 *  with something unread in it is tinted, with the pink edge the app puts on
 *  it — which is the whole reason a muted row is worth drawing. */
function ChatLine({
  row,
  size = "list",
}: {
  row: ChatRow;
  size?: keyof typeof ROW;
}) {
  const s = ROW[size];

  return (
    <div
      className={`relative flex items-center ${s.pad} ${
        row.unread ? "bg-[#fce4ef]" : "bg-pure"
      }`}
    >
      {row.unread && (
        <span className="absolute inset-y-0 left-0 w-1 rounded-r-full bg-[#ec4899]" />
      )}

      <span className="relative shrink-0">
        {row.bell ? (
          <span
            className={`grid ${s.avatar} place-items-center rounded-full bg-[#f9c6dc] text-[#ec4899]`}
          >
            <Bell size={s.bell} />
          </span>
        ) : row.mark ? (
          <span
            className={`block ${s.avatar} overflow-hidden rounded-full ring-1 ring-plum/10`}
          >
            <img src={MARK} alt="" className="h-full w-full object-cover" />
          </span>
        ) : row.letter ? (
          <Person
            letter={row.letter}
            tone={row.tone}
            size={s.avatar}
            text={s.letter}
          />
        ) : (
          <span
            className={`block ${s.avatar} overflow-hidden rounded-full bg-pink-100`}
          >
            <img src={AVATAR} alt="" className="h-full w-full object-cover" />
          </span>
        )}
        {row.online && (
          <span
            className={`absolute -bottom-0.5 -left-0.5 ${s.dot} rounded-full bg-[#22c55e] ring-2 ring-pure`}
          />
        )}
      </span>

      <span className="min-w-0 flex-1">
        <span className={`block truncate font-bold leading-tight ${s.name}`}>
          {row.name}
        </span>
        <span
          className={`mt-0.5 block truncate leading-none ${s.preview} ${
            PREVIEW[row.state ?? "none"]
          }`}
        >
          {row.text}
        </span>
        {row.chip && (
          <span
            className={`mt-1 inline-flex items-center rounded-md bg-[#efeaf0] font-semibold leading-none text-plum/60 ${s.chip}`}
          >
            {row.chip === "group" ? (
              <Users size={s.chipIcon} />
            ) : (
              <BellOff size={s.chipIcon} />
            )}
            {row.chip === "group" ? "Group" : "Muted"}
          </span>
        )}
      </span>

      {/* the age sits on the name's line, not in the middle of the row */}
      <span className="flex shrink-0 items-center gap-1 self-start pt-0.5">
        {row.flame && (
          <Flame size={s.flame} className="fill-[#fbbf24] text-[#f59e0b]" />
        )}
        <span
          className={`leading-none ${s.when} ${
            row.unread ? "font-bold text-[#ec4899]" : "text-plum/45"
          }`}
        >
          {row.when}
        </span>
      </span>
    </div>
  );
}

/** The foot of both list screens: the app's five destinations in a floating
 *  pill, with the profile beside it. It sits OVER the list rather than under
 *  it, so the last row carries on behind the glass — which is how the app
 *  looks, and the reason the list is not padded to make room. */
function TabBar() {
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

/** A button in a dialog. There is only ever one pink one. */
function DialogButton({
  children,
  primary = false,
}: {
  children: ReactNode;
  primary?: boolean;
}) {
  return (
    <span
      className={`rounded-lg px-2.5 py-1.5 text-[9.5px] font-bold leading-none ${
        primary ? "bg-[#ec4899] text-pure" : "text-plum/60"
      }`}
    >
      {children}
    </span>
  );
}

/** A setting, at the size a 280px screen can carry. */
function Switch({ on }: { on: boolean }) {
  return (
    <span
      className={`flex h-4 w-7 shrink-0 items-center rounded-full px-0.5 ${
        on ? "justify-end bg-[#ec4899]" : "justify-start bg-plum/20"
      }`}
    >
      <span className="h-3 w-3 rounded-full bg-pure shadow-sm" />
    </span>
  );
}

/* --------------------------------- pin --------------------------------- */

/* The pinned bar and the message it points at both leave the phone, so the
   thread keeps their room and `PinEscape` draws them. These three numbers are
   that room, and they have to agree or the thread closes up around nothing. The
   bar is 40 tall including its border; the pinned message wraps to two lines in
   the 210px bubble the escape gives it, which with the pin beside the words
   comes to 41. `PIN_BUBBLE_TOP` is where that bubble starts, measured from the
   top of the display: the chrome above it (75), the bar's room and the gap
   after it, the day chip, the first message with its own gap — none of them
   taller than one line now that no bubble carries a time. */
const PIN_BAR_ROOM = 40;
const PIN_BUBBLE_ROOM = 53;
const PIN_BUBBLE_TOP = 187;

/** A message pinned to the head of the thread. Both the bar and the message it
 *  names are drawn outside the glass, so all this screen holds is the room they
 *  take up — the pinned message is the hole in the middle of the thread. */
function PinScreen() {
  return (
    <Screen>
      <StatusRow />
      <ConvoHeader name="John" sub="online" more />

      <Thread>
        {/* the bar is drawn across the phone, wider than the phone, below */}
        <span aria-hidden className="shrink-0" style={{ height: PIN_BAR_ROOM }} />

        <DayChip>Today</DayChip>
        <Bubble text="Are we still on for the weekend?" />

        {/* and this is where the pinned message sits — two thirds of it on the
            glass, the rest off the right-hand edge of it */}
        <span aria-hidden className="shrink-0" style={{ height: PIN_BUBBLE_ROOM }} />

        <Bubble text="Perfect. I'll bring the film camera." />
        <Bubble mine text="It is pinned, so nobody forgets 👌" />
      </Thread>

      <Composer />
    </Screen>
  );
}

function PinEscape() {
  return (
    <>
      {/* The pinned bar, out past the glass on both sides: what the chat keeps
          at the head of a thread, laid across the phone rather than buried
          inside it. 24px shows past each edge — 14 past the bezel itself, which
          is the whole difference between a card laid over the phone and a strip
          that looks misaligned — and it is room enough for the line to sit on
          one row instead of being cut short. */}
      <div
        className="absolute -left-6 -right-6 flex items-center gap-2 rounded-xl border border-[#ec4899]/25 bg-[#fdf3f8] px-3 py-2 shadow-[0_8px_22px_rgba(58,10,36,.16)]"
        style={{ top: 83 }}
      >
        <Pin size={12} className="shrink-0 -rotate-45 text-[#ec4899]" />
        <span className="min-w-0 flex-1">
          <span className="block text-[8px] font-bold leading-none text-[#ec4899]">
            Pinned message
          </span>
          <span className="mt-1 block truncate text-[9.5px] leading-none text-plum/70">
            Booked it — Saturday, 8pm, the usual place.
          </span>
        </span>
        <X size={12} className="shrink-0 text-plum/40" />
      </div>

      {/* The message itself, in the room the thread left for it and a third of
          the way off the right of the phone — and carrying the pin, because the
          bar at the top is where a pinned message lives, not why it is one. The
          pin leads the words rather than sitting under them: no bubble in these
          screens wears a time or a tick, so a glyph in the corner would be the
          only thing down there and would read as one. It is anchored to the
          right edge rather than placed from the left, so the 70px hanging off
          are 70px at any width — a third of the 210. A phone gets 26 instead:
          the shell is 88vw there and the viewport has nothing to spare, so the
          message keeps the size of the ones above it and leaves the glass by
          less. */}
      <div
        className="absolute -right-[26px] w-[210px] drop-shadow-[0_8px_16px_rgba(58,10,36,.2)] sm:-right-[70px]"
        style={{ top: PIN_BUBBLE_TOP }}
      >
        <Bubble
          fill
          mine
          text={
            <span className="flex items-start gap-1">
              <Pin
                size={10}
                className="mt-[2px] shrink-0 -rotate-45 text-plum/60"
              />
              <span>Booked it — Saturday, 8pm, the usual place.</span>
            </span>
          }
        />
      </div>

      {/* what the bar is for, on the quiet side of the phone */}
      <Float side="left" top={436} width={196}>
        <span className="flex items-center gap-2">
          <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#fdf3f8]">
            <Pin size={12} className="-rotate-45 text-[#ec4899]" />
          </span>
          <span className="min-w-0">
            <span className="block text-[10px] font-bold leading-none">
              Pinned to this chat
            </span>
            <span className="mt-1 block text-[9px] leading-none text-plum/55">
              Tap it and the thread jumps to the message.
            </span>
          </span>
        </span>
      </Float>
    </>
  );
}

/* --------------------------------- mute --------------------------------- */

/** The list both of these screens draw — the app's own, row for row: the notice
 *  at the head of it, the app's group, two with something new in them, and then
 *  the row the mute section is about. Sharing one list is what keeps the two
 *  screens the same list seen twice, rather than two lists that happen to look
 *  alike, and it is why the vault's sheet can be open on the row the mute
 *  section points at.
 *
 *  There are nine rows because the strip above them counts nine, and exactly two
 *  of them are unread because it counts two of those as well. A list that says
 *  "All 9" over eleven rows is the sort of thing a reader catches and the
 *  screenshot does not. */
const CONVOS: ChatRow[] = [
  {
    name: "Notifications",
    text: "Maya posted a vibe",
    when: "20m",
    unread: true,
    bell: true,
  },
  {
    name: "Xelvic group",
    text: "2 new",
    state: "new",
    when: "30m",
    unread: true,
    chip: "group",
    mark: true,
  },
  {
    name: "Oliver Grant",
    text: "1 new",
    state: "new",
    when: "1h",
    flame: true,
  },
  {
    name: "Ethan Cole",
    text: "Nothing new",
    when: "2h",
    chip: "muted",
    flame: true,
    online: true,
    handle: "@ethan_cole",
  },
  {
    name: "Chloe 😊😊",
    text: "Nothing new",
    when: "3h",
    flame: true,
    online: true,
    letter: "C",
    tone: "#db2777",
  },
  { name: "Jack Miller", text: "Opened", state: "opened", when: "4h", flame: true },
  {
    name: "jess_walker",
    text: "Sent",
    state: "sent",
    when: "4h",
    flame: true,
  },
  {
    name: "Maya Bennett",
    text: "Opened",
    state: "opened",
    when: "4h",
    flame: true,
  },
  {
    name: "Weekend plans",
    text: "hannah.b: I'm in 🙌",
    state: "opened",
    when: "6h",
    chip: "group",
    letter: "W",
    tone: "#0ea5e9",
  },
];

/** The row both blocks are about — the muted one. It is looked up rather than
 *  repeated, so that the two things drawn from it rather than in the list (the
 *  row that leaves the glass, and the sheet that opens on it) cannot come apart
 *  from it or from each other. */
const MUTED = CONVOS.find((r) => r.chip === "muted")!;

/* That row is also the one thing in either list that leaves the glass, so the
   list keeps its room: `MUTED_ROW_ROOM` is the room, and `MUTED_ROW_TOP` is
   where it sits, measured from the top of the display — the chrome above it,
   then the three rows between (52, 59 and 52 tall). The drawn row is a size up
   from the list's own, and it hangs a little past its room at either end, which
   is why the room is the drawn row's height, 69, less those two overhangs. Six
   is as far as it can go: the neighbours' own padding is eight, so nothing they
   say is ever covered. */
const MUTED_ROW_ROOM = 57;
const MUTED_ROW_TOP = 253;
const MUTED_ROW_HANG = 6;

/** The list, with the muted row's room left open — the row itself is drawn
 *  outside the glass, by `MutedRowEscape`. */
function ConvoList() {
  return (
    <>
      {CONVOS.map((r) =>
        r === MUTED ? (
          <span
            key={r.name}
            aria-hidden
            className="block"
            style={{ height: MUTED_ROW_ROOM }}
          />
        ) : (
          <ChatLine key={r.name} row={r} />
        ),
      )}
    </>
  );
}

/** The convo list, one row of it quieter than the rest — which the app says
 *  with a chip rather than by dimming the row, because a muted convo is still
 *  a convo: it keeps its place, its streak and whatever is unread in it. */
function MuteScreen() {
  return (
    <Screen>
      <StatusRow />
      <ConvoHead />

      {/* the list runs to the bottom of the glass, behind the nav rather than
          stopping above it, so the last row carries on under the pill — which
          is how the app looks, and why the list is not padded around it */}
      <div className="relative min-h-0 flex-1 overflow-hidden bg-[#fdf7fa]">
        <ConvoList />
        <TabBar />
      </div>
    </Screen>
  );
}

/** The muted row, out past the glass on both sides: the one convo in the list
 *  the app treats differently, laid across the phone where it can be read. 24px
 *  shows past each edge — the same overhang the pinned bar uses, which is what
 *  keeps the two blocks looking like one hand drew them.
 *
 *  `dim` is for the vault. There the list has stepped back behind the sheet and
 *  this row has to step back with it; the row is outside the glass, so the
 *  scrim inside cannot reach it and the wash is laid on here instead. */
function MutedRowEscape({ dim = false }: { dim?: boolean }) {
  return (
    <div
      className="absolute -left-6 -right-6 overflow-hidden rounded-xl border border-plum/10 bg-pure shadow-[0_10px_24px_rgba(58,10,36,.18)]"
      style={{ top: MUTED_ROW_TOP - MUTED_ROW_HANG }}
    >
      <ChatLine row={MUTED} size="big" />
      {dim && <span className="absolute inset-0 bg-plum/20" />}
    </div>
  );
}

function MuteEscape() {
  const spans = ["8 hours", "1 week", "Always"];

  return (
    <>
      <MutedRowEscape />

      {/* the card sits above the muted row and the other below it, so the row
          the section is about — the one wearing the chip — is never covered by
          either of them */}
      <Float side="right" top={110}>
        <span className="flex items-center gap-2">
          <BellOff size={13} className="shrink-0 text-plum/70" />
          <span className="flex-1 text-[10px] font-bold leading-none">
            Mute notifications
          </span>
          <Switch on />
        </span>
        <div className="mt-2 flex flex-col gap-0.5">
          {spans.map((s) => {
            const on = s === "Always";
            return (
              <span
                key={s}
                className={`flex items-center justify-between rounded-lg px-2 py-1.5 text-[9.5px] font-semibold ${
                  on ? "bg-[#fdf3f8] text-[#ec4899]" : "text-plum/60"
                }`}
              >
                {s}
                {on && <Check size={11} />}
              </span>
            );
          })}
        </div>
      </Float>

      <Float side="left" top={360} width={196}>
        <FloatTitle>The chat stays put</FloatTitle>
        <FloatBody>
          Muting turns off what the app tells you about it. The convo itself does
          not move, and nothing in it is deleted.
        </FloatBody>
      </Float>
    </>
  );
}

/* --------------------------------- vault --------------------------------- */

/** The app's own sheet, the one a held convo brings up: whose convo it is, then
 *  what you can do to it, and the two that throw it away in pink at the foot.
 *  It names the row the list draws outside the glass, which is the convo the
 *  sheet is meant to be open on.
 *
 *  `lit` is the row your finger is on. The app greys whichever row that is, and
 *  on this screen it is the vault — not because the vault is more important
 *  than pinning, but because it is the one this block is about. */
function ConvoSheet({ lit }: { lit: "pin" | "vault" }) {
  const rows: {
    icon: LucideIcon;
    label: string;
    sub?: string;
    right?: string;
    key?: "pin" | "vault";
  }[] = [
    {
      icon: Pin,
      label: "Pin to top",
      sub: "It stays above the rest of the list.",
      right: "0/3",
      key: "pin",
    },
    { icon: Bell, label: "Unmute" },
    {
      icon: Lock,
      label: "Move to the vault",
      sub: "Out of the convo list, behind your code.",
      key: "vault",
    },
    {
      icon: SquareCheck,
      label: "Select more",
      sub: "Pick several convos at once.",
      right: "Pick",
    },
  ];

  const bins: { icon: LucideIcon; label: string }[] = [
    { icon: Brush, label: "Clear convo" },
    { icon: Trash2, label: "Trash convo" },
  ];

  return (
    <div className="absolute inset-x-0 bottom-0 rounded-t-[20px] bg-pure shadow-[0_-14px_34px_rgba(58,10,36,.22)]">
      <span className="mx-auto mt-2 block h-1 w-8 rounded-full bg-plum/25" />

      <div className="flex items-center gap-2.5 px-3.5 py-2.5">
        <span className="block h-9 w-9 shrink-0 overflow-hidden rounded-full bg-pink-100">
          <img src={AVATAR} alt="" className="h-full w-full object-cover" />
        </span>
        <span className="min-w-0">
          <span className="block truncate text-[12.5px] font-bold leading-none">
            {MUTED.name}
          </span>
          <span className="mt-1 block truncate text-[10px] leading-none text-plum/50">
            {MUTED.handle}
          </span>
        </span>
      </div>

      {rows.map(({ icon: Icon, label, sub, right, key }) => (
        <div
          key={label}
          className={`flex items-center gap-3 px-3.5 py-2 ${
            key === lit ? "bg-[#efeaf0]" : ""
          }`}
        >
          <Icon size={15} className="shrink-0 text-plum/70" />
          <span className="min-w-0 flex-1">
            <span className="block truncate text-[11.5px] font-bold leading-none">
              {label}
            </span>
            {sub && (
              <span className="mt-1 block truncate text-[9.5px] leading-none text-plum/50">
                {sub}
              </span>
            )}
          </span>
          {right && (
            <span className="shrink-0 text-[9.5px] font-semibold leading-none text-plum/45">
              {right}
            </span>
          )}
        </div>
      ))}

      {bins.map(({ icon: Icon, label }) => (
        <div
          key={label}
          className="flex items-center gap-3 border-t border-plum/10 px-3.5 py-2.5"
        >
          <Icon size={15} className="shrink-0 text-[#ec4899]" />
          <span className="text-[11.5px] font-bold leading-none text-[#ec4899]">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}

/** The list again, with the app's sheet up from the bottom of it and the row the
 *  sheet is open on drawn outside the glass — dimmed, because behind a sheet is
 *  where that row is. Every other screen here is a thread; this one has to be
 *  the list, because the vault is reached from the list. */
function VaultScreen() {
  return (
    <Screen>
      {/* one wrapper so the scrim can dim the head along with the list — the
          sheet comes up over the whole screen, the way a sheet does */}
      <div className="relative flex min-h-0 flex-1 flex-col">
        <StatusRow />
        <ConvoHead />

        <div className="min-h-0 flex-1 overflow-hidden bg-[#fdf7fa]">
          <ConvoList />
        </div>

        <div className="absolute inset-0 bg-plum/20" />
        <ConvoSheet lit="vault" />
      </div>
    </Screen>
  );
}

/** Both cards are about what the vault is, not about the tap that puts a convo
 *  in it — that tap is drawn in the phone now, in the sheet, where the app puts
 *  it. */
function VaultEscape() {
  return (
    <>
      <MutedRowEscape dim />

      {/* Both cards keep clear of the row and of the sheet under it: what is
          free is the band between the head and the drawn row, and both are cut
          to fit inside it rather than lying over the thing the phone is
          showing. */}
      <Float side="right" top={83}>
        <span className="flex items-center gap-2">
          <span
            className="grid h-6 w-6 shrink-0 place-items-center rounded-full"
            style={{ background: "linear-gradient(135deg,#ec4899,#ff8fc4)" }}
          >
            <Lock size={12} className="text-pure" />
          </span>
          <span className="text-[10px] font-bold leading-none">
            Back in with the code
          </span>
        </span>
        <FloatBody>
          Type the code where you would type a name, and what you moved in
          opens.
        </FloatBody>
      </Float>

      <Float side="left" top={167} width={200}>
        <span className="flex items-center gap-1.5">
          <Ban size={12} className="shrink-0 text-[#b45309]" />
          <span className="text-[10px] font-bold leading-none text-[#92400e]">
            The code cannot be recovered
          </span>
        </span>
        <FloatBody>
          Forget it and the convos inside are out of reach.
        </FloatBody>
      </Float>
    </>
  );
}

/* -------------------------------- vanish -------------------------------- */

/** A thread on a clock — and the question the app asks before it starts one. */
function VanishScreen() {
  const gone = <Clock size={9} className="shrink-0 text-plum/45" />;

  return (
    <Screen>
      <StatusRow />
      <ConvoHeader name="John" sub="disappearing · 24 hours" more />

      <div className="flex shrink-0 items-center justify-center gap-1.5 border-b border-plum/10 bg-[#fdf3f8] px-2 py-1.5">
        <Timer size={12} className="shrink-0 text-[#ec4899]" />
        <span className="text-[9px] font-semibold leading-none text-[#ec4899]">
          Disappearing messages are on
        </span>
      </div>

      <Thread>
        <DayChip>Today</DayChip>
        <Bubble text="Sending the address in a second." meta={gone} />
        <Bubble
          mine
          text="Got it. I'll delete it once I'm there."
          meta={gone}
        />
        <Bubble text="They clear themselves, so you don't have to." meta={gone} />
        <Bubble mine text="Then I'll stop worrying about it 👌" meta={gone} />
      </Thread>

      <Composer />
    </Screen>
  );
}

function VanishEscape() {
  const spans = ["24 hours", "7 days", "90 days"];

  return (
    <>
      <Float side="right" top={150}>
        <FloatTitle>Turn on disappearing messages?</FloatTitle>
        <FloatBody>
          Everything already in this chat will be deleted — for both of you.
          That part cannot be undone.
        </FloatBody>
        <span className="mt-2.5 flex justify-end gap-1.5">
          <DialogButton>Cancel</DialogButton>
          <DialogButton primary>Turn on</DialogButton>
        </span>
      </Float>

      <Float side="left" top={388} width={168}>
        <FloatTitle>They clear after</FloatTitle>
        <div className="mt-2 flex flex-col gap-0.5">
          {spans.map((s) => {
            const on = s === "24 hours";
            return (
              <span
                key={s}
                className={`flex items-center justify-between rounded-lg px-2 py-1.5 text-[9.5px] font-semibold ${
                  on ? "bg-[#fdf3f8] text-[#ec4899]" : "text-plum/60"
                }`}
              >
                {s}
                {on && <Check size={11} />}
              </span>
            );
          })}
        </div>
        <FloatBody>Once they have been seen.</FloatBody>
      </Float>
    </>
  );
}

/* --------------------------------- react --------------------------------- */

/* The message the picker is open on is the one thing in this thread that leaves
   the glass, so the thread keeps that message's *room* rather than the message:
   the wrapper below is `REACT_BUBBLE_ROOM` tall and empty, and the message
   itself is drawn in the overlay at `REACT_BUBBLE_TOP` — the same place, in the
   display's own coordinates — starting where the thread's own padding starts and
   hanging `REACT_BUBBLE_HANG` past the right edge, so a third of the message is
   always outside the phone whatever width it is drawn at. The room is the bubble
   at three lines plus the chip under it, so nothing left in the thread ends up
   sitting on top of the bubble that left. */
const REACT_BUBBLE_ROOM = 102;
const REACT_BUBBLE_TOP = 260;
const REACT_BUBBLE_HANG = 100;
/** The one the picker is already on. */
const REACTED = "❤️";

/** A longer convo, with the picker open over one message — the message that has
 *  left the glass and is drawn by `ReactEscape`. */
function ReactScreen() {
  const emoji = ["❤️", "😂", "😮", "😢", "👍", "🔥"];

  return (
    <Screen>
      <StatusRow />
      <ConvoHeader name="John" sub="online" more />

      <Thread>
        <DayChip>Today</DayChip>
        <Bubble mine text="The set from Saturday is up." />
        <Bubble text="These came out so good 🔥" />

        <span className="ml-2 flex w-fit items-center gap-1 rounded-full bg-pure px-1.5 py-0.5 text-[8px] font-bold leading-none shadow-[0_1px_2px_rgba(58,10,36,.12)] ring-1 ring-plum/10">
          👍 1
        </span>

        <Bubble mine text="Knew you'd like that one." />

        {/* the message the picker is on: its room, with the picker over it */}
        <div className="relative mt-9" style={{ height: REACT_BUBBLE_ROOM }}>
          <span className="absolute -top-7 left-0 z-10 flex items-center gap-0.5 rounded-full bg-pure px-1.5 py-1 shadow-md ring-1 ring-plum/10">
            {emoji.map((e) => (
              <span
                key={e}
                className={`grid h-[18px] w-[18px] place-items-center rounded-full text-[13px] leading-none ${
                  e === REACTED ? "bg-[#fdf3f8] ring-1 ring-[#ec4899]/30" : ""
                }`}
              >
                {e}
              </span>
            ))}
          </span>
        </div>

        <Stamp>21:04</Stamp>
        <Bubble text="I'm framing the roof one." />
        <Bubble mine text="I'll send the unedited file tonight." />
        <Bubble text="Perfect. No rush 🙌" />
      </Thread>

      <Composer />
    </Screen>
  );
}

function ReactEscape() {
  /* two of them, because the chip under the escaped message says two — the card
     and the chip have to be telling the same story */
  const who: { name: string; emoji: string; letter?: string; tone?: string }[] = [
    { name: "morgan.lee", emoji: "❤️" },
    { name: "hannah.b", emoji: "❤️", letter: "H", tone: "#db2777" },
  ];

  return (
    <>
      {/* The message the picker is on, out of the glass on the right. It is
          incoming, so the cut falls at the end of its lines rather than the
          start, and its chip sits under the bottom-left corner the way an
          incoming message's reactions do. */}
      <div
        className="absolute"
        style={{ left: 8, right: -REACT_BUBBLE_HANG, top: REACT_BUBBLE_TOP }}
      >
        <Bubble
          big
          fill
          text="Okay but the one from the roof at golden hour is genuinely the best thing you have shot, and I am really not just saying that."
        />
        {/* the count goes up a size with the message it sits on — same shape as
            the chips in the thread, drawn at the size the big bubble is */}
        <span className="mt-1 ml-2 flex w-fit items-center gap-1.5 rounded-full bg-pure px-2 py-1.5 text-[12px] font-bold leading-none shadow-[0_2px_6px_rgba(58,10,36,.16)] ring-1 ring-plum/10">
          ❤️ 2
        </span>
      </div>

      {/* 466, not the old 184: this thread is a long one now, so the cards
          belong in the empty stretch under it rather than beside the bubble.
          At 466 the card clears the last message above it and stops short of
          the composer below. */}
      <Float side="right" top={466} width={186}>
        <FloatTitle>On this message</FloatTitle>
        <div className="mt-2 flex flex-col gap-1.5">
          {who.map((w) => (
            <span key={w.name} className="flex items-center gap-2">
              {w.letter ? (
                <Person
                  letter={w.letter}
                  tone={w.tone}
                  size="h-5 w-5"
                  text="text-[8px]"
                />
              ) : (
                <span className="h-5 w-5 shrink-0 overflow-hidden rounded-full bg-pink-100">
                  <img src={AVATAR} alt="" className="h-full w-full object-cover" />
                </span>
              )}
              <span className="min-w-0 flex-1 truncate text-[9.5px] font-semibold">
                {w.name}
              </span>
              <span className="text-[12px] leading-none">{w.emoji}</span>
            </span>
          ))}
        </div>
      </Float>

      {/* 140 wide rather than 190: the two cards now share the empty stretch at
          the foot of the thread, and a narrower one leaves the right-hand card
          its own column instead of crossing under it */}
      <Float side="left" top={484} width={140}>
        <span className="flex items-center gap-2">
          <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-pure text-[12px] leading-none shadow ring-1 ring-plum/10">
            ❤️
          </span>
          <span className="text-[9.5px] font-semibold leading-snug text-plum/70">
            One tap puts it on the message — both of you see it.
          </span>
        </span>
      </Float>
    </>
  );
}

/* --------------------------------- voice --------------------------------- */

/** A wave, at the size a bubble can hold. The played part is pink. */
function Wave({ bars, played }: { bars: number[]; played: number }) {
  return (
    <span className="flex items-center gap-[2px]">
      {bars.map((h, i) => (
        <span
          key={i}
          className={`w-[2px] rounded-full ${
            i < played ? "bg-[#ec4899]" : "bg-plum/30"
          }`}
          style={{ height: h }}
        />
      ))}
    </span>
  );
}

/** Long enough to cross a note's bubble, which is how the app draws one. */
const WAVE = [
  5, 9, 6, 13, 8, 15, 7, 11, 6, 10, 14, 8, 6, 12, 9, 15, 7, 11, 6, 13, 9, 7, 12,
  8, 14, 6, 10, 7, 13, 9,
];

/**
 * A voice note, at the shape the app gives it: the wave across the top, then
 * the play button, both clocks and the speed along the bottom. The one you sent
 * carries the word under it rather than a tick — a note is not read, it is
 * listened to, so the app says what it did with it.
 */
function VoiceNote({
  mine = false,
  length = "0:42",
  played = 6,
}: {
  mine?: boolean;
  length?: string;
  /** how much of the wave has been played through, in bars */
  played?: number;
}) {
  return (
    <div className={`flex flex-col ${mine ? "self-end" : "self-start"}`}>
      <div
        className={`w-[158px] px-2.5 py-2 shadow-[0_1px_2px_rgba(58,10,36,.10)] ${
          mine
            ? "rounded-2xl rounded-br-[3px] bg-[#f7bcd6]"
            : "rounded-2xl rounded-bl-[3px] bg-pure"
        }`}
      >
        <span className="flex items-center justify-end">
          <Wave bars={WAVE} played={played} />
        </span>
        <span className="mt-2 flex items-center gap-1.5">
          <Play size={12} className="shrink-0 fill-[#ec4899] text-[#ec4899]" />
          <span className="min-w-0 flex-1 text-center text-[9.5px] font-bold leading-none text-plum/65">
            0:00 / {length}
          </span>
          <span className="shrink-0 text-[9.5px] font-bold leading-none text-plum/65">
            1×
          </span>
        </span>
      </div>
      {mine && (
        <span className="mt-1 self-end text-[8px] font-medium leading-none text-plum/45">
          Sent
        </span>
      )}
    </div>
  );
}

/**
 * What the app puts in the composer's place while a note is being recorded: the
 * lock, the live wave, the clock and the bin in one pill, the state it is in
 * written under them, and — beside it, in the send button's own place — the way
 * out. Slide up to lock it and this is what stays on screen.
 */
function RecordBar() {
  return (
    <div className="flex shrink-0 items-center gap-2 border-t border-plum/10 bg-[#fbf6f9] px-2 py-2">
      <div className="flex min-w-0 flex-1 flex-col rounded-xl bg-pure px-2 py-1.5 shadow-[0_1px_3px_rgba(58,10,36,.08)] ring-1 ring-plum/10">
        <span className="flex items-center gap-2">
          <Lock size={11} className="shrink-0 text-[#ec4899]" />
          <span className="flex min-w-0 flex-1 items-center justify-center">
            <Wave bars={WAVE} played={WAVE.length} />
          </span>
          <span className="shrink-0 text-[9.5px] font-bold leading-none text-plum">
            0:07
          </span>
          <Trash2 size={11} className="shrink-0 text-[#ec4899]" />
        </span>
        <span className="mt-1 block text-[8.5px] font-semibold leading-none text-[#ec4899]">
          Still recording · send when you are done
        </span>
      </div>

      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#ec4899] text-pure shadow-[0_3px_10px_rgba(236,72,153,.35)]">
        <ArrowUp size={15} />
      </span>
    </div>
  );
}

/** A note arriving, a note sent, and one being recorded at the foot of it. */
function VoiceScreen() {
  return (
    <Screen>
      <StatusRow />
      <ConvoHeader name="John" sub="online" more />

      <Thread>
        <DayChip>Today</DayChip>
        <Bubble text="Listen to this when you get a minute." />
        <VoiceNote length="0:42" played={6} />
        <Stamp>20:31</Stamp>
        <Bubble mine text="Ha — that is exactly what I said." />
        <VoiceNote mine length="0:09" played={0} />
      </Thread>

      <RecordBar />
    </Screen>
  );
}

function VoiceEscape() {
  const moves: { icon: LucideIcon; title: string; body: string }[] = [
    { icon: Mic, title: "Hold the mic", body: "Let go and it sends." },
    { icon: ArrowUp, title: "Slide up to lock", body: "Hands free — keep talking." },
    { icon: X, title: "Slide left to cancel", body: "Nothing is sent at all." },
  ];

  return (
    <>
      {/* 400, not the old 186: the bar the card describes is at the foot of the
          screen now, and this thread ends higher up than the one before it, so
          the card belongs in the empty stretch just above the recording bar */}
      <Float side="right" top={400}>
        <FloatTitle>Recording a voice note</FloatTitle>
        <div className="mt-2 flex flex-col gap-2">
          {moves.map(({ icon: Icon, title, body }) => (
            <span key={title} className="flex items-start gap-2">
              <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#f7f0f4] text-plum/70">
                <Icon size={11} />
              </span>
              <span className="min-w-0">
                <span className="block text-[9.5px] font-bold leading-none">
                  {title}
                </span>
                <span className="mt-1 block text-[9px] leading-none text-plum/55">
                  {body}
                </span>
              </span>
            </span>
          ))}
        </div>
      </Float>

      <Float side="left" top={316} width={186}>
        <span className="flex items-center gap-1.5">
          <Timer size={12} className="shrink-0 text-plum/60" />
          <span className="text-[10px] font-bold leading-none">
            30 minutes, then it stops
          </span>
        </span>
        <FloatBody>
          The app says so when it does, rather than cutting you off in silence.
        </FloatBody>
      </Float>
    </>
  );
}

/* ------------------------------- the map ------------------------------- */

const screens: Record<string, () => JSX.Element> = {
  pin: PinScreen,
  mute: MuteScreen,
  vault: VaultScreen,
  vanish: VanishScreen,
  react: ReactScreen,
  voice: VoiceScreen,
};

const escapes: Record<string, () => JSX.Element> = {
  pin: PinEscape,
  mute: MuteEscape,
  vault: VaultEscape,
  vanish: VanishEscape,
  react: ReactEscape,
  voice: VoiceEscape,
};

/** The screen a messaging section draws. */
export function MessagingMockup({ id }: { id: string }) {
  const Mockup = screens[id];
  return Mockup ? <Mockup /> : null;
}

/** The cards that one draws outside the phone, in the frame's overlay layer. */
export function MessagingEscape({ id }: { id: string }) {
  const Escape = escapes[id];
  return Escape ? <Escape /> : null;
}
