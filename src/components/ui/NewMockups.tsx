import type { ReactNode } from "react";
import {
  Camera,
  ChevronLeft,
  CirclePlus,
  CornerUpLeft,
  Eye,
  Flame,
  Heart,
  Image as ImageIcon,
  Medal,
  MessageSquare,
  Mic,
  MoreVertical,
  Phone,
  Rocket,
  Search,
  Send,
  Share,
  Shield,
  Smile,
  Sparkles,
  Sun,
  ThumbsUp,
  Users,
  Video,
  VolumeX,
} from "lucide-react";
import { IoIosUndo } from "react-icons/io";
import { FaRegEyeSlash } from "react-icons/fa6";
import type { LucideIcon } from "lucide-react";
import { MdVerified } from "react-icons/md";

/**
 * The screens that sit inside the phone on each What's New block. They are
 * drawn here rather than photographed, so every one of them can show the thing
 * its own section is about — the Spark sheet for sparks, a felt post for feels,
 * the Comments/Notes sheet for comments and notes — instead of a theme wallpaper
 * that happened to be lying around.
 *
 * One thing on this page does not stay behind the glass. A screen can also ship
 * an escape — a piece drawn in the frame's overlay layer, outside its clip — and
 * the post in the Feels thread uses it to run off the side of the phone. The
 * screen itself leaves a gap exactly where that piece goes; see `FeelsEscape`.
 *
 * Nothing here animates. These blocks are deliberately still.
 *
 * The chrome every screen is built out of — the status row, the convo header,
 * the composer, the ground they all sit on — is exported, because the messaging
 * page draws its own screens out of the same parts. Only the screens are private
 * to this file.
 */

export const AVATAR = "/media/walls/mehfil.jpg";

/* ------------------------------- chrome ------------------------------- */

/** Sits clear of the shell's dynamic island, which hangs 8px–32px from the top
 *  and would otherwise cut into whatever comes next. */
export function StatusRow() {
  return (
    <div className="flex items-end justify-between px-4 pb-2 pt-4 text-[10px] font-semibold leading-none text-plum/70">
      <span>21:04</span>
      <span className="flex items-center gap-1 text-plum/50">
        <span className="h-2 w-3 rounded-[2px] border border-plum/40" />
        <span>5G</span>
      </span>
    </div>
  );
}

/** the screen itself — one warm ground, so all three read as one product */
export function Screen({ children }: { children: ReactNode }) {
  return (
    <div
      className="flex h-full flex-col bg-[#f4edf1] text-plum"
      style={{
        backgroundImage:
          "radial-gradient(rgba(58,10,36,.055) 1px, transparent 1px)",
        backgroundSize: "11px 11px",
      }}
    >
      {children}
    </div>
  );
}

/** the convo header every chat screen in the app wears */
export function ConvoHeader({
  name,
  sub,
  avatar,
  verified = true,
  more = false,
}: {
  name: string;
  sub?: string;
  /** overrides the photo — some screens open on a letter avatar instead */
  avatar?: ReactNode;
  verified?: boolean;
  /** the kebab, which only some screens carry */
  more?: boolean;
}) {
  return (
    <div className="flex shrink-0 items-center gap-2 border-b border-plum/10 bg-pure px-2 py-1.5">
      <ChevronLeft size={15} className="shrink-0 text-plum/60" />
      {avatar ?? (
        <span className="h-7 w-7 shrink-0 overflow-hidden rounded-full bg-pink-100">
          <img src={AVATAR} alt="" className="h-full w-full object-cover" />
        </span>
      )}
      <span className="flex min-w-0 flex-1 flex-col">
        <span className="flex items-center gap-1">
          <span className="truncate text-[12px] font-bold leading-tight">
            {name}
          </span>
          {verified && (
            <MdVerified size={11} className="shrink-0 text-[#1d9bf0]" />
          )}
        </span>
        {sub && (
          <span className="truncate text-[8px] leading-tight text-plum/50">
            {sub}
          </span>
        )}
      </span>
      <Phone size={14} className="shrink-0 text-plum/60" />
      <Video size={15} className="shrink-0 text-plum/60" />
      {more && <MoreVertical size={15} className="shrink-0 text-plum/60" />}
    </div>
  );
}

/** The foot of every thread, drawn the way the app draws it: the ringed "+"
 *  that opens everything you can attach, a plain white field, and the mic.
 *
 *  Nothing else lives in the field. The app keeps the smiley, the paperclip and
 *  the camera inside the "+" rather than crowding the row, so the only thing
 *  the bar says is the one thing you would type — and the field, being plain
 *  white on the tinted strip, is the brightest thing on the screen. */
export function Composer({ placeholder = "Say something" }: { placeholder?: string }) {
  return (
    <div className="flex shrink-0 items-center gap-1.5 border-t border-plum/10 bg-[#fbf6f9] px-2 py-2">
      <span className="grid h-6 w-6 shrink-0 place-items-center text-pink-500">
        <CirclePlus size={18} />
      </span>
      <span className="flex h-8 min-w-0 flex-1 items-center rounded-full bg-pure px-3 border">
        <span className="truncate text-[11px] leading-none text-plum/40">
          {placeholder}
        </span>
      </span>
      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-pink-600 text-pure">
        <Mic size={14} />
      </span>
    </div>
  );
}

/* ── the parts every drawn screen shares ─────────────────────────────────────
   A thread, the bubbles in it, the initial somebody without a photo wears, and
   the card that hangs off the side of the frame. The messaging page and the
   calls page both draw with these, so they live here with the rest of the
   chrome rather than in either page's own file. */

/**
 * One message in a thread. `mine` sends it: right-aligned, in the pink the app
 * sends with, and squared off at the corner it points from.
 */
export function Bubble({
  mine = false,
  text,
  meta,
  fill = false,
  big = false,
}: {
  mine?: boolean;
  text: ReactNode;
  /** the time and whatever rides with it — ticks, or the clock a disappearing
   *  message counts down on */
  meta?: ReactNode;
  /** fills the box it is given instead of stopping at 82% of it. Only the
   *  bubbles that leave the phone need this: each is placed in a box of its own
   *  so that a third of it can sit past the glass. */
  fill?: boolean;
  /** a size up, for a bubble that has left the glass and has to hold up beside
   *  a thread it is no longer part of */
  big?: boolean;
}) {
  return (
    <div
      className={`flex flex-col ${fill ? "w-full" : "max-w-[82%]"} ${
        mine ? "self-end" : "self-start"
      }`}
    >
      <div
        className={`leading-snug ${
          big
            ? "rounded-2xl px-3.5 py-2.5 text-[13px] shadow-[0_8px_20px_rgba(58,10,36,.18)]"
            : "rounded-xl px-2 py-1.5 text-[10.5px] shadow-[0_1px_2px_rgba(58,10,36,.10)]"
        } ${mine ? "rounded-br-[3px] bg-[#f7bcd6]" : "rounded-bl-[3px] bg-pure"}`}
      >
        {text}
        {meta && (
          <span className="mt-1 flex items-center justify-end gap-1 text-[8px] leading-none text-plum/50">
            {meta}
          </span>
        )}
      </div>
    </div>
  );
}

/** The scroller every thread sits in. */
export function Thread({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-0 flex-1 flex-col gap-1.5 overflow-hidden px-2 pt-2">
      {children}
    </div>
  );
}

/** Somebody who never set a photo wears their initial instead. */
export function Person({
  letter,
  tone = "#7c3aed",
  size = "h-9 w-9",
  text = "text-[11px]",
}: {
  letter: string;
  tone?: string;
  size?: string;
  text?: string;
}) {
  return (
    <span
      className={`grid ${size} shrink-0 place-items-center rounded-full ${text} font-bold leading-none text-pure`}
      style={{ background: tone }}
    >
      {letter}
    </span>
  );
}

/**
 * A card that does not stay behind the glass. The display is 280px across on
 * the size these pages draw at, and a confirm dialog or a legend is worth more
 * room than that — so it hangs off the side of the frame, over the empty half
 * of the screen underneath, exactly the way the comments sheet's cards do.
 *
 * `top` is in screen coordinates: 0 is the top of the display.
 */
export function Float({
  side,
  top,
  width = 216,
  children,
}: {
  side: "left" | "right";
  top: number;
  width?: number;
  children: ReactNode;
}) {
  return (
    <div
      className={`absolute rounded-xl bg-pure p-2.5 shadow-lg ring-1 ring-plum/10 ${
        side === "left" ? "-left-7 sm:-left-12" : "-right-7 sm:-right-12"
      }`}
      style={{ top, width: `min(${width}px, 76vw)` }}
    >
      {children}
    </div>
  );
}

/** A card's own heading and body, so they all read as one thing. */
export function FloatTitle({ children }: { children: ReactNode }) {
  return <p className="text-[10px] font-bold leading-none">{children}</p>;
}

export function FloatBody({ children }: { children: ReactNode }) {
  return (
    <p className="mt-1.5 text-[9.5px] leading-snug text-plum/60">{children}</p>
  );
}

/** a shared thing landing in a thread — the shape every post card takes */
function PostShell({ children }: { children: ReactNode }) {
  return (
    <div className="w-[178px] overflow-hidden rounded-lg pb-0.5 bg-pure shadow-[0_3px_12px_rgba(58,10,36,.12)] ring-1 ring-plum/10">
      {children}
    </div>
  );
}

function PostFoot({
  likes,
  notes,
  felt,
  shares,
  reply,
}: {
  likes: number;
  notes: number;
  felt?: boolean;
  /** the forward count, when the card is a post somebody passed on */
  shares?: number;
  /** the card answers another one — the arrow takes the place of "Add a note" */
  reply?: boolean;
}) {
  return (
    <div className="mt-1 flex items-center gap-3.5 border-plum/10 px-2 py-1 text-[9px] font-semibold leading-none text-plum/60">
      <span className="flex items-center gap-0.5">
        <Heart
          size={11}
          className={felt ? "fill-[#ff2d78] text-[#ff2d78]" : "text-plum/50"}
        />
        {likes}
      </span>
      <span className="flex items-center gap-0.5">
        <MessageSquare size={11} />
        {notes}
      </span>
      {shares !== undefined && (
        <span className="flex items-center gap-0.5">
          <Share size={11} />
          {shares}
        </span>
      )}
      {reply ? (
        <IoIosUndo size={11} className="ml-auto shrink-0 text-plum/55" />
      ) : (
        <span className="ml-auto text-[8px] font-bold text-pink-600">
          Add a note
        </span>
      )}
    </div>
  );
}

/** a line of grey time, the way a thread stamps each stretch of itself */
/** A time on its own line in a thread, the way the app writes one: never inside
 *  a bubble, and hard against the right of the column. */
export function Stamp({ children }: { children: ReactNode }) {
  return (
    <p className="mt-1.5 text-right text-[8px] font-medium leading-none text-plum/45">
      {children}
    </p>
  );
}

/**
 * A day in a thread — the white chip the app drops in the middle of a
 * conversation rather than a grey line off to one side.
 *
 * The two are not interchangeable. A grey line is a time that belongs to the
 * message beside it; this chip belongs to everything under it, which is why it
 * sits centred and wears the same white as the bubbles. A thread with the chips
 * in it reads as days with messages in them.
 */
export function DayChip({
  children,
  className = "",
}: {
  children: ReactNode;
  /** margin, for the few places the chip is pinned rather than scrolled past */
  className?: string;
}) {
  return (
    <span
      className={`self-center rounded-full border border-plum/10 bg-pure px-2.5 py-1 text-[9.5px] font-bold leading-none text-plum/75 shadow-[0_1px_3px_rgba(58,10,36,.05)] ${className}`}
    >
      {children}
    </span>
  );
}

/** the app's own line in a thread — a Spark sent, then spent */
function SparkPill() {
  return (
    <span className="mt-1.5 inline-flex w-fit items-center gap-1.5 rounded-lg bg-pure px-2 py-1.5 text-[10px] font-semibold leading-none text-plum/60">
      <FaRegEyeSlash size={12} className="shrink-0 text-plum/45" />
      Spark · opened
    </span>
  );
}

/* ------------------------------- Sparks ------------------------------- */

/** rungs you have not reached yet wear no colour of their own */
const LOCKED = "rgba(58,10,36,.22)";

type Rung = {
  name: string;
  range: string;
  /** the day this rung opens on — also the day the rung below it closes */
  from: number;
  icon: LucideIcon;
  tone: string;
  /** the rung the run is standing on right now */
  now?: boolean;
  /** solid rather than an outline */
  solid?: boolean;
};

/** The ladder, in order. Everything up to and including the rung the run
 *  stands on has been reached and wears its own colour; everything above it
 *  has not. */
const LADDER: Rung[] = [
  { name: "Ember", range: "1–3 days", from: 1, icon: Flame, tone: "#f59e0b" },
  { name: "Flame", range: "4–7 days", from: 4, icon: Flame, tone: "#ef4444" },
  { name: "Blaze", range: "8–15 days", from: 8, icon: Flame, tone: "#ec4899" },
  {
    name: "Comet",
    range: "16–30 days",
    from: 16,
    icon: Rocket,
    tone: "#a855f7",
  },
  {
    name: "Nova",
    range: "31–60 days",
    from: 31,
    icon: Sun,
    tone: "#d946ef",
    now: true,
    solid: true,
  },
  {
    name: "Supernova",
    range: "61–99 days",
    from: 61,
    icon: Sparkles,
    tone: LOCKED,
  },
  { name: "Century", range: "100+ days", from: 100, icon: Medal, tone: LOCKED },
];

/** This run: 46 days, which lands it on Nova — so the ring, the flame and the
 *  tier label all take Nova's colour, and the line under them names whatever
 *  comes next. Everything is derived, so changing the number is enough. */
const SPARK_DAYS = 46;
const at = LADDER.findIndex((r) => r.now);
const CURRENT = LADDER[at];
const NEXT = LADDER[at + 1];
/** how far the run has come, out of the 100 days the ladder tops out at */
const ARC = (SPARK_DAYS / 100) * 360;

/** the convo list the Spark sheet opens over — held back, and cut off by it */
function ConvoPeek() {
  return (
    <div className="relative shrink-0 bg-pure">
      <div className="flex items-center gap-2.5 px-3 pb-2 pt-0.5">
        <span className="h-8 w-8 shrink-0 overflow-hidden rounded-full bg-pink-100">
          <img src={AVATAR} alt="" className="h-full w-full object-cover" />
        </span>
        <Search size={14} className="shrink-0 text-plum/70" />
        <span className="flex flex-1 items-center justify-center gap-1.5">
          <span className="text-[13px] font-bold">Convo</span>
          <span className="h-1.5 w-1.5 rounded-full bg-[#22c55e]" />
        </span>
        <Users size={15} className="shrink-0 text-plum/70" />
        <Camera size={15} className="shrink-0 text-plum/70" />
      </div>

      <div className="flex items-center gap-5 border-b border-plum/10 px-3 text-[10px] font-bold">
        <span className="border-b-2 border-[#db2777] pb-1.5 text-[#db2777]">
          All 15
        </span>
        <span className="pb-1.5 text-plum/45">Unread</span>
        <span className="pb-1.5 text-plum/45">Requested</span>
        <span className="pb-1.5 text-plum/45">Calls</span>
      </div>

      <div className="flex items-start gap-2.5 px-3 py-2">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#2b0b1d] text-[6px] font-bold text-pure">
          Xelvic
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[11px] font-bold leading-tight">
            Xelvic group
          </span>
          <span className="block truncate text-[9px] leading-tight text-plum/50">
            Nothing new
          </span>
          <span className="mt-0.5 inline-flex items-center gap-0.5 rounded-full bg-plum/[0.07] px-1.5 py-[1px] text-[7px] font-semibold text-plum/55">
            <Users size={7} />
            Group
          </span>
        </span>
        <span className="shrink-0 text-[8px] font-semibold text-plum/40">
          1h
        </span>
      </div>

      <span className="absolute inset-0 bg-[#2b0b1d]/25" />
    </div>
  );
}

function SparksMockup() {
  return (
    <Screen>
      <StatusRow />
      <ConvoPeek />

      {/* the Spark sheet, opened over the list */}
      <div className="relative -mt-1 flex flex-1 flex-col overflow-hidden rounded-t-[26px] bg-pure px-3.5 pb-3 pt-2 shadow-[0_-10px_28px_rgba(58,10,36,.22)]">
        <span className="mx-auto h-1 w-9 shrink-0 rounded-full bg-plum/15" />

        <p className="mt-2 text-[13px] font-bold leading-tight">Mr. Bean</p>
        <p className="text-[9px] leading-tight text-plum/50">Spark</p>

        {/* the run, riding a ring */}
        <div className="mt-2 flex flex-col items-center">
          <span
            className="grid shrink-0 place-items-center rounded-full"
            style={{
              height: 72,
              width: 72,
              background: `conic-gradient(from 0deg, ${CURRENT.tone} 0deg ${ARC}deg, rgba(58,10,36,.10) ${ARC}deg 360deg)`,
            }}
          >
            <span
              className="grid place-items-center rounded-full bg-pure"
              style={{ height: 67, width: 67 }}
            >
              <Flame
                size={30}
                style={{ color: CURRENT.tone, fill: CURRENT.tone }}
              />
            </span>
          </span>

          <p className="mt-1 font-display text-[34px] font-bold leading-none">
            {SPARK_DAYS}
          </p>
          <p className="text-[10px] leading-tight text-plum/50">days</p>
          <p
            className="mt-0.5 flex items-center gap-1 text-[11px] font-bold leading-none"
            style={{ color: CURRENT.tone }}
          >
            <Flame size={11} style={{ fill: CURRENT.tone }} />
            {CURRENT.name}
          </p>
        </div>

        {NEXT && (
          <p className="mt-2 flex items-center gap-1.5 text-[10px] font-semibold leading-none">
            <Rocket
              size={11}
              className="shrink-0"
              style={{ color: NEXT.tone }}
            />
            {NEXT.name} in {NEXT.from - SPARK_DAYS} days — day {NEXT.from}
          </p>
        )}

        <p className="mt-2.5 text-[7px] font-bold uppercase leading-none tracking-[0.16em] text-plum/40">
          The ladder
        </p>
        <div className="mt-1.5 grid grid-cols-7 gap-0.5">
          {LADDER.map((r) => {
            const Rung = r.icon;
            return (
              <span
                key={r.name}
                className="flex min-w-0 flex-col items-center gap-[3px] text-center"
              >
                <Rung
                  size={14}
                  strokeWidth={1.7}
                  fill={r.solid ? "currentColor" : "none"}
                  style={{ color: r.tone }}
                />
                <span
                  className={`text-[6px] leading-tight ${
                    r.now ? "font-bold text-plum" : "font-semibold text-plum/55"
                  }`}
                >
                  {r.name}
                </span>
                <span className="text-[5.5px] leading-tight text-plum/35">
                  {r.range}
                </span>
              </span>
            );
          })}
        </div>

        <p className="mt-2 flex items-center gap-1.5 text-[10px] font-bold leading-none">
          <Shield size={11} className="shrink-0 fill-plum text-plum" />1 shield
          banked
        </p>
        <p className="mt-1 flex items-center gap-1.5 text-[8px] leading-none text-plum/55">
          <Shield
            size={9}
            className="shrink-0"
            style={{ color: CURRENT.tone, fill: CURRENT.tone }}
          />
          <Shield size={9} className="shrink-0 text-plum/25" />
          One banks each week, up to 2
        </p>

        <div className="mt-2 border-t border-plum/10 pt-2">
          <div className="flex items-center gap-2">
            <Eye size={14} className="shrink-0 text-plum/70" />
            <span className="min-w-0 flex-1">
              <span className="block text-[11px] font-bold leading-tight">
                Keep a Spark here
              </span>
              <span className="block truncate text-[8px] leading-tight text-plum/50">
                Counting the days you two talk
              </span>
            </span>
            <span className="flex h-[17px] w-[30px] shrink-0 items-center rounded-full bg-[#f472b6] px-[2px]">
              <span className="ml-auto h-[13px] w-[13px] rounded-full bg-pure shadow-[0_1px_2px_rgba(58,10,36,.3)]" />
            </span>
          </div>
        </div>

        <p className="mt-2 text-[8px] leading-[1.55] text-plum/55">
          A day counts when both of you send something — a line, a photo, a
          voice note, a share. Nothing is lost quietly: a shield covers a day
          that was missed, and the days already earned stay in the wallet
          whatever happens to the run.
        </p>
      </div>
    </Screen>
  );
}

/* -------------------------------- Feels -------------------------------- */

/** Where the post sits in the Feels thread: the height of the status row, the
 *  header, the pinned Spark line, and the two stamps above it. The screen leaves
 *  exactly this much room, and the escape layer puts the card back in it. */
const FEELS_POST_TOP = 202;
/** the card's full height — art, author row and counts — plus the badge that
 *  hangs off its bottom edge */
const FEELS_POST_ROOM = 282;

function FeelsMockup() {
  return (
    <Screen>
      <StatusRow />
      <ConvoHeader
        name="Kingston"
        verified={false}
        more
        avatar={
          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#7c3aed] text-[11px] font-bold leading-none text-pure">
            K
          </span>
        }
      />

      {/* the thread, on the wallpaper */}
      <div className="relative min-h-0 flex-1 overflow-hidden">
        <img
          src="/media/walls/safar.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* washed back, so the cards and the small grey type still read on it */}
        <span className="absolute inset-0 bg-[#f4edf1]/[0.82]" />

        <div className="relative flex h-full flex-col px-2">
          {/* the post above — already rolled out of the phone, so only the lip
              of its art and its foot are left */}
          <div className="-mt-[56px] w-fit">
            <PostShell>
              <div className="h-[70px] overflow-hidden bg-plum">
                <img
                  src="/media/themes/catgirl/drops.jpg"
                  alt=""
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex items-center gap-1.5 px-2 pt-1.5">
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#2b0b1d] text-[7px] font-bold leading-none text-pure">
                  A
                </span>
                <span className="flex min-w-0 flex-1 flex-col">
                  <span className="flex items-center gap-0.5">
                    <Heart size={10} className="fill-[#ff2d78] text-[#ff2d78]" />
                    <Smile size={10} className="text-[#f59e0b]" />
                    <MdVerified size={10} className="text-[#1d9bf0]" />
                  </span>
                  <span className="truncate text-[8px] font-semibold leading-tight text-plum/55">
                    @alex.rivera
                  </span>
                </span>
              </div>
              <PostFoot likes={12} notes={2} shares={9} reply />
            </PostShell>
          </div>

          <Stamp>10:24</Stamp>
          <SparkPill />
          <Stamp>12:49</Stamp>

          {/* The post belongs to this thread, but it is not drawn here — it is
              drawn in the frame's escape layer so it can run off the side of the
              phone. This is the room it would have taken. */}
          <div aria-hidden="true" style={{ height: FEELS_POST_ROOM }} />

          <Stamp>1:40</Stamp>
          <SparkPill />

          <DayChip className="mb-3 mt-auto">Yesterday</DayChip>
        </div>
      </div>

      <Composer />
    </Screen>
  );
}
function FeelsEscape() {
  return (
    <div className="absolute left-2 -right-8" style={{ top: FEELS_POST_TOP }}>
      <div className="overflow-hidden rounded-xl bg-pure shadow-[0_14px_38px_rgba(58,10,36,.32)] ring-1 ring-plum/10">
        <div className="relative h-[200px] overflow-hidden bg-[#0b0b12]">
          <img
            src="/media/themes/alone/audio.jpg"
            alt=""
            className="h-full w-full object-cover opacity-80"
          />
          <span className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/10 to-black/70" />
          <span className="absolute right-2 top-2 grid h-7 w-7 place-items-center rounded-full bg-black/55 text-pure ring-1 ring-pure/25">
            <VolumeX size={14} />
          </span>
          <span className="absolute left-3 right-3 top-[30%] font-display text-[17px] italic leading-snug text-pure">
            Kisi Ki Baaton Se
          </span>
          <span className="absolute bottom-3 left-3 text-[9px] font-bold uppercase leading-none tracking-[0.14em] text-pure/70">
            @morgan.lee
          </span>
        </div>

        <div className="flex items-center gap-2 px-3 pt-2">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#7c3aed] text-[13px] font-bold leading-none text-pure">
            K
          </span>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-[13px] font-bold leading-tight">
              Kingston
            </span>
            <span className="block truncate text-[10px] leading-tight text-plum/50">
              @kingston.ward
            </span>
          </span>
        </div>

        <div className="flex items-center gap-5 px-3 pb-2 pt-1.5 text-[12px] font-semibold leading-none text-plum/60">
          <span className="flex items-center gap-1">
            <Heart size={14} className="fill-[#ff2d78] text-[#ff2d78]" />4
          </span>
          <span className="flex items-center gap-1">
            <MessageSquare size={14} />3
          </span>
          <span className="flex items-center gap-1">
            <Share size={14} />3
          </span>
          <IoIosUndo size={14} className="ml-auto shrink-0 text-plum/55" />
        </div>
      </div>

      {/* the feel coming back up off the card's corner — the one count in the
          whole screen that gets to be this loud */}
      <span className="absolute -bottom-4 left-3 flex items-center gap-1 rounded-full bg-red-200 border border-red-600 pl-1 pr-2.5 shadow-[0_8px_20px_rgba(58,10,36,.3)] ring-1 ring-plum/10">
        <span className="grid h-6 w-6 place-items-center rounded-full">
          <Heart size={14} className="fill-red-600 text-red-600" />
        </span>
        <span className="text-[12px] font-bold leading-none">1</span>
      </span>
    </div>
  );
}

/* --------------------------- Comments & notes --------------------------- */

export type NewTab = "comments" | "notes";

/** Handed to every screen, whether or not it has a sheet to work — only the
 *  Comments/Notes screen reads it. */
type MockupProps = {
  tab?: NewTab;
  onTab?: (tab: NewTab) => void;
};

/** A tab at the head of the sheet. The live one goes bold and wears a pink rule
 *  as wide as the word above it; the quiet one stays grey. Both of them work —
 *  tapping the other one brings up what is behind it. */
function SheetTab({
  label,
  active,
  onClick,
}: {
  label: string;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex flex-1 cursor-pointer justify-center"
    >
      <span className="flex flex-col items-center gap-1">
        <span
          className={`text-[11px] leading-none ${
            active ? "font-bold text-plum" : "font-semibold text-plum/45"
          }`}
        >
          {label}
        </span>
        <span
          className={`h-[3px] self-stretch rounded-full ${
            active ? "bg-[#ec4899]" : "bg-transparent"
          }`}
        />
      </span>
    </button>
  );
}

/** One voice in the sheet. A comment carries a heart and a Reply; a note
 *  carries neither — it was only ever meant for one reader. */
type SheetVoice = {
  name: string;
  when: string;
  text: string;
  /** the people who never set a photo wear their initial instead */
  letter?: string;
};

function SheetRow({
  name,
  when,
  text,
  letter,
  actions = false,
}: SheetVoice & {
  /** the heart and the Reply, which only comments have */
  actions?: boolean;
}) {
  return (
    <div className="flex gap-2 pb-2.5">
      {letter ? (
        <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#7c3aed] text-[8px] font-bold leading-none text-pure">
          {letter}
        </span>
      ) : (
        <span className="h-5 w-5 shrink-0 overflow-hidden rounded-full bg-pink-100">
          <img src={AVATAR} alt="" className="h-full w-full object-cover" />
        </span>
      )}
      <span className="min-w-0 flex-1">
        <span className="flex items-baseline gap-1.5 leading-none">
          <span className="truncate text-[9px] font-bold">{name}</span>
          <span className="shrink-0 text-[9px] text-plum/45">{when}</span>
        </span>
        <span className="mt-1 block text-[10px] leading-snug">{text}</span>
        {actions && (
          <span className="mt-1 flex items-center gap-2.5 text-[9px] font-medium leading-none text-plum/45">
            <Heart size={10} className="shrink-0 text-plum/45" />
            Reply
          </span>
        )}
      </span>
    </div>
  );
}

/** What the thread had to say about the post, and about the app that put the
 *  two of them in one place. Three of the five sit in the sheet; the other two
 *  are out past the edge of the phone, where `CommentsEscape` draws them. No
 *  name repeats anywhere in the comments — every one of them is somebody new. */
const COMMENTS: SheetVoice[] = [
  {
    name: "hannah.b",
    when: "2d",
    text: "Frame three belongs in a gallery.",
    letter: "H",
  },
  {
    name: "tyler_brooks",
    when: "2d",
    text: "The light in the second one is unreal.",
  },
  {
    name: "emily.rose",
    when: "2d",
    text: "Commenting without leaving the chat, finally.",
  },
];

/** The same post said quietly. Three notes, all of them under the same name —
 *  they are one person's, each one written to whoever put the post up rather
 *  than to the thread. */
const NOTES: SheetVoice[] = [
  {
    name: "alex.rivera",
    when: "now",
    text: "The fourth frame should be the cover.",
  },
  {
    name: "alex.rivera",
    when: "1h",
    text: "Same spot last week. Sending you mine.",
  },
  {
    name: "alex.rivera",
    when: "2h",
    text: "Tell me when the next set goes up.",
  },
];

/** The foot of the sheet. Two ways to attach something, the field, and the send
 *  arrow — and the field is ringed in the brand pink here rather than the grey
 *  the convo's own composer wears. */
function SheetComposer({ placeholder }: { placeholder: string }) {
  return (
    <div className="shrink-0 border-t border-plum/10 bg-pure px-3 pb-3.5 pt-2.5">
      <div className="flex items-center gap-2">
        <ImageIcon size={15} className="shrink-0 text-plum/70" />
        <Mic size={15} className="shrink-0 text-plum/70" />
        <span className="flex min-w-0 flex-1 items-center rounded-full border-[1.5px] border-[#ec4899]/70 px-2.5 py-2.5">
          <span className="truncate text-[10px] leading-none text-plum/40">
            {placeholder}
          </span>
        </span>
        <Send size={16} className="shrink-0 fill-[#ec4899] text-[#ec4899]" />
      </div>
    </div>
  );
}

/** The sheet a post opens into: Comments on one tab, Notes on the other, and
 *  the thread it slid up over pushed back behind it. Only the foot of the post
 *  is left showing above the sheet — the rest of it is under the scrim.
 *
 *  This is the one screen on the page you can work: the tabs in the sheet are
 *  live, and what floats outside the phone (`CommentsEscape`) follows them. */
function CommentsMockup({ tab = "comments", onTab }: MockupProps) {
  const onNotes = tab === "notes";

  return (
    <Screen>
      <div className="relative flex h-full flex-col">
        <StatusRow />
        <ConvoHeader
          name="Kevin"
          avatar={
            <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#7c3aed] text-[10px] font-bold leading-none text-pure">
              K
            </span>
          }
          verified={false}
          more
        />

        <div className="min-h-0 flex-1 overflow-hidden px-2 pt-0.5">
          {/* the post this sheet belongs to, caught with only its foot above the
              sheet: the last strip of the picture, the count it carries, and the
              reactions it collected */}
          <div className="relative h-4 overflow-hidden rounded-t-lg bg-plum">
            <img
              src="/media/themes/animeblue/moments.jpg"
              alt=""
              className="h-[70px] w-full object-cover"
            />
            <span className="absolute right-1 top-1 rounded bg-black/55 px-1 py-0.5 text-[7px] font-semibold leading-none text-pure">
              4 photos
            </span>
          </div>
          <div className="mt-0.5 flex -space-x-1 pl-1">
            <span className="grid h-4 w-4 place-items-center rounded-full bg-pure">
              <Heart size={10} className="fill-[#ff2d78] text-[#ff2d78]" />
            </span>
            <span className="grid h-4 w-4 place-items-center rounded-full bg-pure">
              <Smile size={10} className="text-[#f59e0b]" />
            </span>
            <span className="grid h-4 w-4 place-items-center rounded-full bg-pure">
              <ThumbsUp size={10} className="text-[#3b82f6]" />
            </span>
          </div>
        </div>

        {/* everything behind the sheet is pushed back */}
        <span className="absolute inset-0 bg-[#2b0b1d]/30" />

        <div className="absolute inset-x-0 bottom-0 top-[104px] flex flex-col rounded-t-xl bg-pure">
          <div className="flex shrink-0 justify-center pt-2.5">
            <span className="h-[3px] w-6 rounded-full bg-plum/60" />
          </div>

          <div className="mt-6 flex shrink-0 border-b border-plum/10 px-2">
            <SheetTab
              label="Comments"
              active={!onNotes}
              onClick={() => onTab?.("comments")}
            />
            <SheetTab
              label="Notes"
              active={onNotes}
              onClick={() => onTab?.("notes")}
            />
          </div>

          {/* three of the five comments sit here; the other two are out past the
              edge of the phone, where `CommentsEscape` draws them */}
          <div className="min-h-0 flex-1 overflow-hidden px-2.5 pt-2.5">
            {(onNotes ? NOTES : COMMENTS).map((v) => (
              <SheetRow key={v.text} {...v} actions={!onNotes} />
            ))}
          </div>

          <SheetComposer
            placeholder={onNotes ? "Write a private note" : "Say something"}
          />
        </div>
      </div>
    </Screen>
  );
}

/** A comment or a note lifted out of the sheet and floated past the edge of the
 *  phone. It hangs off the side it is told to, over the empty half of the sheet
 *  underneath, so it reads as one more voice rather than as another row — and
 *  it is built exactly like a row in the sheet, heart and Reply and all, so it
 *  reads as a comment rather than as a label. */
function FloatingCard({
  side,
  top,
  name,
  when,
  text,
  letter,
  actions = false,
}: SheetVoice & {
  side: "left" | "right";
  top: number;
  /** notes carry no heart and no Reply — nobody answers a note */
  actions?: boolean;
}) {
  /* Fluid below `sm`, where the card is nearly as wide as the display it hangs
     off — 240px of card against a 260px screen leaves the phone itself barely
     visible. It only takes its full designed width once the column can hold
     both. */
  return (
    <div
      className={`absolute w-[min(240px,76vw)] rounded-lg bg-pure p-2 shadow-lg ring-1 ring-plum/10 sm:w-[240px] ${
        side === "left" ? "-left-7 sm:-left-12" : "-right-7 sm:-right-12"
      }`}
      style={{ top }}
    >
      <div className="flex gap-2">
        {letter ? (
          <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#7c3aed] text-[8px] font-bold leading-none text-pure">
            {letter}
          </span>
        ) : (
          <span className="h-5 w-5 shrink-0 overflow-hidden rounded-full bg-pink-100">
            <img src={AVATAR} alt="" className="h-full w-full object-cover" />
          </span>
        )}
        <span className="min-w-0 flex-1">
          <span className="flex items-baseline gap-1.5 leading-none">
            <span className="truncate text-[9px] font-bold">{name}</span>
            <span className="shrink-0 text-[9px] text-plum/45">{when}</span>
          </span>
          <span className="mt-1 block text-[10px] leading-snug">{text}</span>
          {actions && (
            <span className="mt-1 flex items-center gap-2.5 text-[9px] font-medium leading-none text-plum/45">
              <Heart size={10} className="shrink-0 text-plum/45" />
              Reply
            </span>
          )}
        </span>
      </div>
    </div>
  );
}

/** The two voices that do not stay behind the glass — the first one out to the
 *  left, the second out to the right, whichever tab is up. Every comment here
 *  is somebody new; every note is the same person as the notes in the sheet. */
function CommentsEscape({ tab = "comments" }: { tab?: NewTab }) {
  const onNotes = tab === "notes";

  const left: SheetVoice = onNotes
    ? {
        name: "alex.rivera",
        when: "3h",
        text: "Only you will read this, and that is the point.",
      }
    : {
        name: "morgan.lee",
        when: "1d",
        text: "Post and the talk in one place. Nothing else does this.",
      };

  const right: SheetVoice = onNotes
    ? {
        name: "alex.rivera",
        when: "yesterday",
        text: "A private note, kept right under the post.",
      }
    : {
        name: "brandon.hale",
        when: "1d",
        text: "I have not opened another app for this since.",
      };

  return (
    <>
      <FloatingCard side="left" top={356} actions={!onNotes} {...left} />
      <FloatingCard side="right" top={452} actions={!onNotes} {...right} />
    </>
  );
}

/* ------------------------------- the map ------------------------------- */

const mockups: Record<string, (props: MockupProps) => JSX.Element> = {
  sparks: SparksMockup,
  react: FeelsMockup,
  comment: CommentsMockup,
};

/** The piece of a screen that is drawn outside the phone, if that screen has
 *  one. The Feels post and the Comments/Notes cards escape; the rest return
 *  nothing. */
const escapes: Record<string, (props: { tab: NewTab }) => JSX.Element> = {
  react: FeelsEscape,
  comment: CommentsEscape,
};

/** Falls back to the first screen so a new entry in the data never renders blank. */
export default function NewMockup({ id, tab, onTab }: { id: string } & MockupProps) {
  const Mockup = mockups[id] ?? SparksMockup;
  return <Mockup tab={tab} onTab={onTab} />;
}

/** Goes in the frame's `overlay` slot, which is not clipped by the shell. */
export function NewMockupEscape({ id, tab }: { id: string } & MockupProps) {
  const Escape = escapes[id];
  return Escape ? <Escape tab={tab ?? "comments"} /> : null;
}
