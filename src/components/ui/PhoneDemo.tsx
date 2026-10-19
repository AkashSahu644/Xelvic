import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone,
  Video,
  VideoOff,
  Mic,
  Volume2,
  VolumeX,
  Search,
  UserPlus,
  ChevronDown,
  Radio,
  Heart,
  Send,
  MoreVertical,
  ChevronLeft,
  BadgeCheck,
  Lock,
  Plus,
  Pause,
  Play,
  Shuffle,
  SkipBack,
  SkipForward,
  Repeat,
  Download,
  X,
  Upload,
  Ellipsis,
  Share2,
  LayoutGrid,
  Sparkles,
  MessageSquare,
  AudioLines,
  Crown,
  Gamepad2,
  Hand,
  Headphones,
  Share,
  Smile,
  Bookmark,
  EyeOff,
  Image as ImageIcon,
  CornerUpLeft,
  AlertCircle,
  ArrowRight,
  AtSign,
  BatteryFull,
  Cake,
  Eye,
  RefreshCw,
  Signal,
  User,
  Wifi,
} from "lucide-react";
import { FaArrowLeft } from "react-icons/fa6";
import { MdVerified } from "react-icons/md";
import { FiPlusCircle } from "react-icons/fi";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import ThemeMarketplaceMockup from "./ThemeMarketplaceMockup";

export type DemoKind =
  | "chat"
  | "call"
  | "moments"
  | "live"
  | "audio"
  | "drops"
  | "onboarding"
  | "contacts"
  | "marketplace";
const barClass =
  "flex items-center justify-between px-4 pt-9 pb-2 text-[11px] font-semibold text-pure/90";

function StatusBar({ title, sub }: { title: string; sub?: string }) {
  return (
    <div className="relative z-10">
      <div className={barClass}>
        <span>9:41</span>
        <span className="flex items-center gap-1 text-pure/70">
          <span className="h-2 w-3 rounded-[2px] border border-pure/50" />
          <span>5G</span>
        </span>
      </div>
      {title && (
        <div className="flex items-center gap-2.5 border-b border-pure/10 px-3 pb-2.5 text-pure">
          <ChevronLeft size={18} className="text-pure/60" />
          <span className="grid h-8 w-8 place-items-center rounded-full bg-brand-grad text-xs font-bold text-plum">
            {title.slice(0, 1)}
          </span>
          <span className="min-w-0 flex-1 leading-tight">
            <span className="block truncate text-sm font-bold">{title}</span>
            {sub && (
              <span className="block text-[10px] text-[#ff8fc4]">{sub}</span>
            )}
          </span>
          <Phone size={16} className="text-pure/55" />
          <Video size={16} className="text-pure/55" />
          <MoreVertical size={15} className="text-pure/45" />
        </div>
      )}
    </div>
  );
}

type Line =
  | { kind: "system"; text: string }
  | { kind: "date"; text: string }
  | { kind: "them"; text: string }
  | { kind: "me"; text: string }
  | { kind: "image"; image: string; size: string; time: string };

const conversations: Line[][] = [
  [
    { kind: "system", text: "This convo is encrypted" },
    { kind: "date", text: "Today" },
    { kind: "me", text: "finally joined Xelvic 🎉" },
    { kind: "them", text: "yayy welcome!! 💗" },
    { kind: "them", text: "pick a theme yet?" },
    { kind: "me", text: "went full Pink 🌸" },
    {
      kind: "image",
      image: "/media/char/typing.png",
      size: "162 KB",
      time: "11:57",
    },
    { kind: "them", text: "obsessed 😍 call me on it?" },
    { kind: "me", text: "omw — the HD video is unreal 📞" },
  ],
  [
    { kind: "system", text: "This convo is encrypted" },
    { kind: "date", text: "Yesterday" },
    { kind: "them", text: "you up? spinning a live room 🎙️" },
    { kind: "me", text: "joining now!" },
    { kind: "them", text: "anyone can hop on the mic btw" },
    { kind: "me", text: "the audio is SO clean 🔥" },
    { kind: "them", text: "right? you hold the room 👑" },
  ],
  [
    { kind: "system", text: "This convo is encrypted" },
    { kind: "date", text: "Today" },
    { kind: "me", text: "did you catch my Moment?" },
    { kind: "them", text: "the sunset one?? 😍" },
    { kind: "me", text: "gone in 24h so screenshot it 📸" },
    {
      kind: "image",
      image: "/media/char/typing.png",
      size: "162 KB",
      time: "09:12",
    },
    { kind: "them", text: "saved to Memories already 💗" },
  ],
  [
    { kind: "system", text: "This convo is encrypted" },
    { kind: "date", text: "Yesterday" },
    { kind: "them", text: "can we talk somewhere private?" },
    { kind: "me", text: "moving this to the Vault 🔒" },
    { kind: "them", text: "wait it needs a code?" },
    { kind: "me", text: "yep — only we get in" },
    { kind: "them", text: "okay that's actually genius" },
  ],
  [
    { kind: "system", text: "This convo is encrypted" },
    { kind: "date", text: "Today" },
    { kind: "me", text: "sharing my playlist 🎧" },
    { kind: "them", text: "ooh what's on it" },
    { kind: "me", text: "all the Xelvic Sounds tracks" },
    {
      kind: "image",
      image: "/media/char/typing.png",
      size: "162 KB",
      time: "20:40",
    },
    { kind: "them", text: "night drive on repeat 🌙" },
  ],
];

// shared enter/exit for every item; `as const` pins `type: "spring"`
const bubbleMotion = {
  initial: { opacity: 0, y: 14, scale: 0.9 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, scale: 0.92, transition: { duration: 0.15 } },
  transition: { type: "spring", stiffness: 340, damping: 28, mass: 0.7 },
} as const;

function ChatDemo({ reduced }: { reduced: boolean }) {
  // which thread, and how many of its lines are shown (the 2 pills are always up)
  const [convo, setConvo] = useState(0);
  const [count, setCount] = useState(reduced ? conversations[0].length : 2);
  const [typing, setTyping] = useState(false);
  const [draft, setDraft] = useState(""); // what "I" am typing in the composer

  useEffect(() => {
    if (reduced) return;
    let ci = 0;
    let i = 2;
    let alive = true;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const wait = (ms: number, fn: () => void) => {
      const t = setTimeout(() => {
        if (alive) fn();
      }, ms);
      timers.push(t);
    };
    const step = () => {
      if (!alive) return;
      const script = conversations[ci];
      if (i >= script.length) {
        // hold the finished thread, then move on to the NEXT conversation
        wait(2600, () => {
          ci = (ci + 1) % conversations.length;
          i = 2;
          setConvo(ci);
          setCount(2);
          setTyping(false);
          setDraft("");
          wait(900, step);
        });
        return;
      }
      const line = script[i];
      if (line.kind === "them") {
        setTyping(true);
        wait(1400, () => {
          setTyping(false);
          i += 1;
          setCount(i);
          wait(850, step);
        });
      } else if (line.kind === "me") {
        // type my reply into the composer, letter by letter, then "send" it
        const full = line.text;
        let c = 0;
        const typeChar = () => {
          if (!alive) return;
          c += 1;
          setDraft(full.slice(0, c));
          if (c < full.length) {
            wait(55, typeChar);
          } else {
            wait(550, () => {
              setDraft("");
              i += 1;
              setCount(i);
              wait(1000, step);
            });
          }
        };
        wait(350, typeChar);
      } else {
        // a shared photo just drops in
        wait(750, () => {
          i += 1;
          setCount(i);
          wait(1000, step);
        });
      }
    };
    wait(1200, step);
    return () => {
      alive = false;
      timers.forEach(clearTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced]);

  const shown = conversations[convo].slice(0, count);
  return (
    <div className="flex h-full flex-col bg-[#f1eff5] text-plum">
      {/* status row */}
      <div className="flex items-center justify-between px-4 pt-3 pb-1 text-[11px] font-semibold text-plum/75">
        <span>11:58</span>
        <span className="flex items-center gap-1 text-plum/55">
          <span className="h-2 w-3 rounded-[2px] border border-plum/40" />
          <span>5G</span>
        </span>
      </div>

      {/* contact header */}
      <div className="flex items-center gap-2.5 border-b border-plum/10 shadow-[0_1px_3px_rgba(58,10,36,.05)] px-1.5 py-1">
        <FaArrowLeft size={16} className="text-plum/70" />
        <span className="h-8 w-8 shrink-0 overflow-hidden rounded-full bg-pink-100">
          <img
            src="/media/walls/mehfil.jpg"
            alt=""
            className="h-full w-full object-cover"
          />
        </span>
        <span className="flex min-w-0 flex-1 items-center gap-1">
          <span className="truncate text-[15px] font-bold">John</span>
          {/* app's verified seal keeps its familiar blue */}
          <MdVerified size={14} className="shrink-0 text-[#1d9bf0]" />
        </span>
        <Phone size={17} className="text-plum/70" />
        <Video size={17} className="text-plum/70" />
        <MoreVertical size={16} className="text-plum/55" />
      </div>

      {/* thread */}
      <div className="relative flex flex-1 flex-col justify-end gap-2 overflow-hidden px-1.5 py-2">
        <AnimatePresence initial={false} mode="popLayout">
          {shown.map((m, idx) => {
            if (m.kind === "system")
              return (
                <motion.div
                  key={`${convo}-${idx}`}
                  layout
                  {...bubbleMotion}
                  className="flex items-center gap-1.5 self-center rounded-full border border-plum/10 bg-pure px-3.5 py-1 text-[11px] font-semibold text-plum/75 shadow-[0_1px_3px_rgba(58,10,36,.05)]"
                >
                  <Lock size={11} className="text-plum/60" />
                  {m.text}
                </motion.div>
              );
            if (m.kind === "date")
              return (
                <motion.div
                  key={`${convo}-${idx}`}
                  layout
                  {...bubbleMotion}
                  className="self-center rounded-full border border-plum/10 bg-pure px-2.5 py-1 text-[11px] font-semibold text-plum/75 shadow-[0_1px_3px_rgba(58,10,36,.05)]"
                >
                  {m.text}
                </motion.div>
              );
            if (m.kind === "them")
              return (
                <motion.div
                  key={`${convo}-${idx}`}
                  layout
                  {...bubbleMotion}
                  className="w-fit max-w-[82%] origin-bottom-left self-start rounded-[20px] rounded-bl-md bg-pure px-2 py-1.5 text-[12px] leading-snug text-plum shadow-[0_2px_8px_rgba(58,10,36,.05)]"
                >
                  {m.text}
                </motion.div>
              );
            if (m.kind === "me")
              return (
                <motion.div
                  key={`${convo}-${idx}`}
                  layout
                  {...bubbleMotion}
                  className="w-fit max-w-[82%] origin-bottom-right self-end rounded-[20px] rounded-br-md bg-[#f4b7d2] px-2 py-1.5 text-[12px] leading-snug text-plum shadow-[0_2px_8px_rgba(58,10,36,.05)]"
                >
                  {m.text}
                </motion.div>
              );
            // shared photo
            return (
              <motion.div
                key={`${convo}-${idx}`}
                layout
                {...bubbleMotion}
                className="flex origin-bottom-right flex-col items-end self-end"
              >
                <span className="mb-1 mr-1 text-[9px] text-plum/40">
                  {m.time}
                </span>
                <div className="relative h-32 w-20 overflow-hidden rounded-[10px] bg-black">
                  <img
                    src={m.image}
                    alt=""
                    className="absolute inset-0 h-full w-full object-contain p-2"
                  />
                  <span className="absolute bottom-2 right-2 rounded bg-black/55 px-1.5 py-0.5 text-[10px] font-semibold text-pure">
                    {m.size}
                  </span>
                </div>
                {/* a read receipt, not a tick */}
                <span className="mt-1 mr-1 text-[9px] text-plum/40">
                  Opened · just now
                </span>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* the other person's character, always floating above the thread
            (absolute, out of flow — the messages never shift). She holds a
            phone while composing and switches to the thinking pose the rest of
            the time (receiving / waiting / after sending). */}
        <motion.div className="pointer-events-none absolute inset-x-0 -bottom-2 z-10 flex justify-center">
          <AnimatePresence mode="wait" initial={false}>
            <motion.img
              key={typing ? "typing" : "wait"}
              src={
                typing
                  ? "/media/themes/pink/typing.png"
                  : "/media/themes/pink/wait.png"
              }
              alt={typing ? "Hifza is typing…" : "Hifza"}
              /* a small bottom-to-top nudge — minimal travel, no fuss */
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.28, ease: [0.22, 0.68, 0.24, 1] }}
              className="h-[70px] w-auto object-contain drop-shadow-[0_12px_20px_rgba(58,10,36,.22)]"
            />
          </AnimatePresence>
        </motion.div>
      </div>

      {/* composer */}
      <div className="flex items-center gap-1 border-t border-plum/10 shadow-xs px-2 py-2">
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border-pink-500 text-pink-500">
          <FiPlusCircle size={18} />
        </span>
        <div className="flex-1 truncate rounded-full bg-pure px-3 py-2 text-[12px] shadow-[0_1px_3px_rgba(58,10,36,.08)]">
          {draft ? (
            <span className="text-plum">
              {draft}
              <motion.span
                aria-hidden
                className="ml-px inline-block"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.9, repeat: Infinity }}
              >
                |
              </motion.span>
            </span>
          ) : (
            <span className="text-plum/40">Say something</span>
          )}
        </div>
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-pink-600 text-pure">
          <Mic size={15} />
        </span>
      </div>
    </div>
  );
}

/* ---------------------------- CALL ---------------------------- *
 * A light audio-call screen matching the real app: centred photo
 * avatar, name, "Audio call · timer", and a white rounded control bar
 * with six labelled buttons (hang-up in red). */
function CallDemo({ reduced }: { reduced: boolean }) {
  const [sec, setSec] = useState(reduced ? 3 : 0);
  useEffect(() => {
    if (reduced) return;
    const t = setInterval(() => setSec((s) => (s + 1) % 3600), 1000);
    return () => clearInterval(t);
  }, [reduced]);
  const mm = String(Math.floor(sec / 60)).padStart(2, "0");
  const ss = String(sec % 60).padStart(2, "0");

  const controls = [
    { icon: VideoOff, label: "Video" },
    { icon: Mic, label: "Mute" },
    { icon: Volume2, label: "Speaker" },
    { icon: UserPlus, label: "Add" },
    { icon: ChevronDown, label: "Minimise" },
  ];

  return (
    <div className="flex h-full flex-col bg-[#f1eff5] text-plum">
      {/* status row */}
      <div className="flex items-center justify-between px-4 pt-3.5 pb-1 text-[11px] font-semibold text-plum/75">
        <span>11:59</span>
        <span className="flex items-center gap-1 text-plum/55">
          <span className="h-2 w-3 rounded-[2px] border border-plum/40" />
          <span>5G</span>
        </span>
      </div>

      {/* avatar + name + call status */}
      <div className="flex flex-1 flex-col items-center justify-center px-6 pb-6">
        <div className="h-24 w-24 overflow-hidden rounded-full ring-4 ring-pure">
          <img
            src="/media/walls/mehfil.jpg"
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
        <p className="mt-5 font-display text-xl font-bold text-plum">John</p>
        <p className="text-xs text-plum/55">
          Audio call · {mm}:{ss}
        </p>
      </div>

      {/* control bar — tiny labels + nowrap so "Minimise" / "Hang up" don't
          collide in the narrow mockup */}
      <div className="mx-2 mb-4 rounded-2xl border border-plum/10 bg-pure px-1 py-1.5 shadow-[0_10px_30px_rgba(58,10,36,.12)]">
        <div className="flex items-start justify-between">
          {controls.map((c) => {
            const Icon = c.icon;
            return (
              <div
                key={c.label}
                className="flex min-w-0 flex-1 flex-col items-center gap-1"
              >
                <span className="grid h-8 w-8 place-items-center rounded-full bg-plum/[0.06] text-plum">
                  <Icon size={16} />
                </span>
                <span className="whitespace-nowrap text-[8px] leading-none text-plum/55">
                  {c.label}
                </span>
              </div>
            );
          })}
          <div className="flex min-w-0 flex-1 flex-col items-center gap-1">
            <motion.span
              animate={reduced ? undefined : { rotate: [0, -10, 0] }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="grid h-8 w-8 place-items-center rounded-full bg-[#e5302f] text-pure"
            >
              <Phone size={16} className="rotate-[135deg]" />
            </motion.span>
            <span className="whitespace-nowrap text-[8px] leading-none text-plum/55">
              Hang up
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------- MOMENTS -------------------------- */
const moments = [
  { src: "/media/themes/animeblue/moments.jpg", caption: "These lines »" },
  { src: "/media/themes/catgirl/moment.jpg", caption: "golden hour 🌇" },
];
function MomentsDemo({ reduced }: { reduced: boolean }) {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    if (reduced) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % moments.length), 3200);
    return () => clearInterval(t);
  }, [reduced]);
  const m = moments[idx];

  /* The marketing hero: the Moment itself is the whole screen, with the
     poster, the progress and Reply laid over the picture. */
  return (
    <div className="relative flex h-full flex-col overflow-hidden bg-black text-pure">
      <AnimatePresence mode="popLayout">
        <motion.img
          key={idx}
          src={m.src}
          alt=""
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </AnimatePresence>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/45 via-black/15 to-black/60" />

      <div className="relative flex shrink-0 items-center justify-between px-4 pb-1 pt-3 text-[9px] font-semibold leading-none text-pure/85">
        <span>12:33</span>
        <span className="flex items-center gap-1 text-pure/60">
          <span className="h-[7px] w-2.5 rounded-[2px] border border-pure/50" />
          <span>5G</span>
        </span>
      </div>

      {/* progress + poster */}
      <div className="relative shrink-0 px-3">
        <div className="flex gap-[3px]">
          {moments.map((_, i) => (
            <span
              key={i}
              className="h-[2.5px] flex-1 overflow-hidden rounded-full bg-pure/30"
            >
              <motion.span
                className="block h-full rounded-full bg-pure"
                initial={{ width: "0%" }}
                animate={{
                  width: i < idx ? "100%" : i === idx ? "100%" : "0%",
                }}
                transition={{ duration: i === idx && !reduced ? 3.1 : 0 }}
              />
            </span>
          ))}
        </div>

        <div className="mt-2.5 flex items-center gap-2">
          <span className="h-7 w-7 shrink-0 overflow-hidden rounded-full ring-1 ring-pure/30">
            <img
              src="/media/walls/sheher.jpg"
              alt=""
              className="h-full w-full object-cover"
            />
          </span>
          <div className="min-w-0 flex-1 leading-tight">
            <span className="flex items-center gap-1">
              <span className="text-[12px] font-bold">Emma</span>
              <BadgeCheck size={11} className="shrink-0 text-[#4db5ff]" />
            </span>
            <span className="block text-[9px] text-pure/70">
              2 moments · 23 hr ago
            </span>
          </div>
          <Pause size={15} className="shrink-0 text-pure" />
          <Share2 size={14} className="shrink-0 text-pure" />
          <X size={15} className="shrink-0 text-pure" />
        </div>
      </div>

      {/* the line sits on the picture, as in the app */}
      <div className="pointer-events-none absolute inset-0 grid place-items-center px-7">
        <AnimatePresence mode="wait">
          <motion.p
            key={idx}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center font-display text-xl font-semibold leading-snug text-pure drop-shadow-[0_2px_10px_rgba(0,0,0,.65)]"
          >
            {m.caption}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* the foot of the viewer, over the picture */}
      <div className="relative mt-auto px-4 pb-4">
        <span className="text-[9px] text-pure/70">Hold to open the drop</span>
        <div className="mt-2 flex justify-end">
          <span className="grid h-[30px] w-[30px] place-items-center rounded-full bg-pure/15 text-pure backdrop-blur">
            <Heart size={15} />
          </span>
        </div>
        <div className="mt-2 flex items-center gap-2">
          <div className="flex-1 rounded-full bg-pure/15 px-4 py-2.5 text-[10px] text-pure/70 backdrop-blur">
            Reply...
          </div>
          <span className="grid h-9 w-9 place-items-center rounded-full bg-pure/25 text-pure backdrop-blur">
            <Send size={14} />
          </span>
        </div>
      </div>

      <span className="pointer-events-none absolute bottom-1 left-1/2 h-[3px] w-[90px] -translate-x-1/2 rounded-full bg-pure/50" />
    </div>
  );
}

/* ---------------------------- LIVE ---------------------------- */
/** The app's audio room as the host sees it: the stage, the game card, the
 *  hands-up queue and the round bar underneath. The one thing that moves is the
 *  waveform in the kind tile, because a live room's own indicator is the only
 *  motion the app gives it. */
function LiveDemo({ reduced }: { reduced: boolean }) {
  const bars = [0.55, 1, 0.7, 0.85];

  return (
    <div className="flex h-full flex-col bg-[#f8f6f9] text-plum">
      <div className="flex shrink-0 items-end justify-between px-4 pb-2 pt-4 text-[10px] font-semibold leading-none text-plum/70">
        <span>21:04</span>
        <span className="grid h-4 w-9 place-items-center rounded-full bg-[#22c55e] text-pure">
          <Mic size={8} />
        </span>
      </div>

      <div className="flex shrink-0 items-center gap-2 px-2.5">
        <ChevronLeft size={16} className="shrink-0 text-plum/70" />
        <span className="relative grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-[#a16207] text-pure">
          <Mic size={13} className="absolute opacity-30" />
          <span className="relative flex h-3 items-end gap-[2px]">
            {bars.map((h, i) => (
              <motion.span
                key={i}
                className="w-[2px] rounded-full bg-pure"
                animate={
                  reduced
                    ? { height: `${h * 12}px` }
                    : { height: [`${4 + i}px`, `${h * 12}px`, `${5 + i}px`] }
                }
                transition={{
                  duration: 0.8 + i * 0.12,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
          </span>
        </span>
        <span className="min-w-0 flex-1 leading-tight">
          <span className="block truncate text-[11px] font-bold">
            Late night, no plan
          </span>
          <span className="block truncate text-[8px] text-plum/50">
            Jordan Blake · 3 people
          </span>
        </span>
        <span className="shrink-0 rounded bg-[#e11d6b] px-1.5 py-[3px] text-[6.5px] font-bold leading-none text-pure">
          LIVE
        </span>
        <MoreVertical size={13} className="shrink-0 text-plum/60" />
      </div>

      {/* `pt-1` keeps the avatar's ring and crown clear of the container's
          clip — both are drawn outside the avatar's own box. */}
      <div className="mt-5 flex min-h-0 flex-1 flex-col overflow-hidden px-3 pt-1">
        <div className="flex flex-col items-center">
          <span className="relative">
            <span className="block h-16 w-16 overflow-hidden rounded-full ring-[3px] ring-[#e11d6b]">
              <img
                src="/media/walls/studio.jpg"
                alt=""
                className="h-full w-full object-cover"
              />
            </span>
            <span className="absolute -right-0.5 -top-0.5 grid h-4 w-4 place-items-center rounded-full bg-pure text-[#e11d6b] shadow-sm">
              <Crown size={9} />
            </span>
          </span>
          <span className="mt-1.5 text-[9px] font-bold leading-none">
            Jordan Blake
          </span>
          <span className="mt-2 flex items-center gap-1 text-[7.5px] leading-none text-plum/55">
            <Mic size={8} /> Your microphone is open · 1 voice
          </span>
        </div>

        <div className="mt-2.5 rounded-xl border border-plum/10 bg-pure px-2.5 py-2">
          <span className="block text-[9px] font-bold leading-tight">
            Play something with the room
          </span>
          <span className="mt-0.5 block text-[7.5px] leading-snug text-plum/50">
            Two of you play and everybody else watches.
          </span>
          <span className="mt-1.5 flex items-center justify-center rounded-lg border border-plum/15 py-1.5 text-[8px] font-semibold leading-none">
            Choose a game
          </span>
        </div>

        <span className="mt-3 block text-[7px] font-bold uppercase leading-none tracking-[0.12em] text-plum/40">
          Hands up
        </span>
        <span className="mt-1.5 flex items-center gap-2">
          <span className="block h-7 w-7 shrink-0 overflow-hidden rounded-full bg-pink-100">
            <img
              src="/media/walls/mehfil.jpg"
              alt=""
              className="h-full w-full object-cover"
            />
          </span>
          <span className="min-w-0 flex-1 truncate text-[9px] font-bold">
            Tyler Brooks
          </span>
          <Hand size={10} className="shrink-0 text-[#d97706]" />
          <span className="shrink-0 rounded-full bg-[#b3134f] px-2.5 py-1 text-[7.5px] font-bold leading-none text-pure">
            Bring up
          </span>
        </span>

        <span className="mt-3 block text-[7px] font-bold uppercase leading-none tracking-[0.12em] text-plum/40">
          Listening
        </span>
        <span className="mt-1.5 flex items-center gap-1.5">
          <Headphones size={10} className="shrink-0 text-plum/50" />
          <span className="text-[9px] leading-none text-plum/70">
            2 people listening
          </span>
        </span>
      </div>

      <div className="shrink-0 border-t border-plum/10 bg-pure px-2 pb-4 pt-2">
        <div className="flex items-center justify-between">
          {[MessageSquare, Smile, Gamepad2, Share, Mic].map((I, i) => (
            <span
              key={i}
              className={`grid h-7 w-7 place-items-center rounded-full ${
                i === 2 || i === 4
                  ? "bg-[#fce7f0] text-[#e11d6b]"
                  : "bg-[#f3f0f4] text-plum/70"
              }`}
            >
              <I size={13} />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------------------------- AUDIO --------------------------- */
/** The app's light player, drawn the way the app draws it: the artwork with the
 *  mint circle behind it, "Piya Aye Na", a waveform caught part-way, the pink
 *  circle in the middle, Share and Download under it, and Up next below. */
const demoWave = [
  6, 12, 5, 15, 9, 6, 16, 9, 12, 7, 17, 10, 5, 14, 8, 12, 6, 15, 9, 7, 13, 9,
  16, 11, 6, 14, 8, 12, 7, 16, 10, 7, 13, 9, 14, 6, 11, 8, 14, 9,
];

function AudioDemo({ reduced }: { reduced: boolean }) {
  return (
    <div className="relative flex h-full flex-col bg-[#f4f1f4] text-plum">
      <div className="flex shrink-0 items-end justify-between px-4 pb-2 pt-4 text-[10px] font-semibold leading-none text-plum/70">
        <span>21:04</span>
        <span className="flex items-center gap-1 text-plum/50">
          <span className="h-2 w-3 rounded-[2px] border border-plum/40" />
          <span>5G</span>
        </span>
      </div>

      <div className="flex items-center px-3 py-1">
        <ChevronDown size={18} className="shrink-0 text-plum/70" />
        <div className="flex-1 text-center leading-tight">
          <span className="block text-[6px] font-bold uppercase tracking-[0.2em] text-plum/40">
            Playing from
          </span>
          <span className="mt-0.5 block text-[10px] font-bold">Trending</span>
        </div>
        <MoreVertical size={16} className="shrink-0 text-plum/60" />
      </div>

      {/* artwork with the mint circle behind it */}
      <div className="relative mt-3 flex shrink-0 justify-center">
        <span className="absolute right-5 top-4 h-[136px] w-[136px] rounded-full bg-[#bfe8dc]" />
        <img
          src="/media/themes/animeblue/audio.jpg"
          alt=""
          className="relative h-[160px] w-[160px] rounded-2xl object-cover shadow-[0_18px_40px_rgba(58,10,36,.25)]"
        />
      </div>

      <div className="mt-3 flex items-start gap-2 px-4">
        <div className="min-w-0 flex-1">
          <span className="block truncate text-[16px] font-extrabold leading-none">
            Piya Aye Na
          </span>
          <span className="mt-1.5 flex items-center gap-1.5">
            <span className="h-3 w-3 shrink-0 overflow-hidden rounded-full">
              <img
                src="/media/walls/studio.jpg"
                alt=""
                className="h-full w-full object-cover"
              />
            </span>
            <span className="truncate text-[7px] font-semibold uppercase tracking-[0.08em] text-plum/45">
              Totul Sarker
            </span>
          </span>
        </div>
        <Heart size={16} className="mt-0.5 shrink-0 text-plum/70" />
      </div>

      {/* waveform, with the played part in pink */}
      <div className="mt-2.5 px-4">
        <div className="relative flex h-10 items-center gap-[2px]">
          {demoWave.map((h, i) => (
            <motion.span
              key={i}
              className={`min-w-0 flex-1 rounded-full ${
                i < 18 ? "bg-[#e91e63]" : "bg-plum/15"
              }`}
              style={{
                height: `${Math.round(h * 1.55)}px`,
                transformOrigin: "center",
              }}
              animate={
                reduced ? undefined : { scaleY: [0.7, 1, 0.8, 1, 0.7] }
              }
              transition={{
                duration: 1.4 + (i % 4) * 0.25,
                repeat: Infinity,
                ease: "easeInOut",
                delay: (i % 6) * 0.08,
              }}
            />
          ))}
          <span
            className="pointer-events-none absolute top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#e91e63] ring-2 ring-[#f4f1f4]"
            style={{ left: `${(18 / demoWave.length) * 100}%` }}
          />
        </div>
        <div className="mt-1 flex justify-between text-[7.5px] font-medium text-plum/45">
          <span>1:45</span>
          <span>4:45</span>
        </div>
      </div>

      <div className="mt-2 flex items-center justify-between px-6 text-plum/70">
        <Shuffle size={14} />
        <SkipBack size={18} />
        <motion.span
          className="grid h-11 w-11 place-items-center rounded-full bg-[#e91e63] text-pure shadow-[0_6px_18px_rgba(233,30,99,.35)]"
          animate={reduced ? undefined : { scale: [1, 1.05, 1] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        >
          <Pause size={17} fill="currentColor" />
        </motion.span>
        <SkipForward size={18} />
        <Repeat size={14} />
      </div>

      <div className="mt-3 flex items-center gap-2 px-4">
        <span className="flex flex-1 items-center justify-center gap-1.5 rounded-full border border-plum/20 py-2 text-[9px] font-semibold">
          <Share2 size={12} className="text-[#e91e63]" /> Share
        </span>
        <span className="flex flex-1 items-center justify-center gap-1.5 rounded-full border border-plum/20 py-2 text-[9px] font-semibold text-plum/70">
          <Download size={12} /> Download
        </span>
      </div>

      <div className="mt-3 flex items-center justify-between px-4">
        <span className="text-[11px] font-bold">Up next</span>
        <span className="text-[8px] font-bold text-[#e11d6b]">Queue</span>
      </div>

      <div className="mt-1.5 space-y-1.5 px-4">
        {[
          {
            src: "/media/themes/alone/audio.jpg",
            title: "Saundebaazi",
            artist: "TOTUL SARKER",
            time: "6:31",
          },
          {
            src: "/media/themes/catgirl/audio.jpg",
            title: "Jhol",
            artist: "Ekta 😊😊",
            time: "4:38",
          },
        ].map((t) => (
          <div key={t.title} className="flex items-center gap-2">
            <span className="h-8 w-8 shrink-0 overflow-hidden rounded-lg">
              <img src={t.src} alt="" className="h-full w-full object-cover" />
            </span>
            <div className="min-w-0 flex-1 leading-tight">
              <span className="block truncate text-[9px] font-bold">
                {t.title}
              </span>
              <span className="block truncate text-[7px] text-plum/50">
                {t.artist}
              </span>
            </div>
            <span className="text-[7.5px] text-plum/40">{t.time}</span>
            <span className="grid h-5 w-5 place-items-center rounded-full border border-plum/25 text-plum/55">
              <Play size={9} />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------------------- DROPS --------------------------- *
 * The Drops feed, matching the real app: the Xelvic mark and wordmark,
 * a "Vibe" rail of clips (avatar + play count + name) with a muted
 * clip among them, a "For you" photo Drop with its feel / comment /
 * share / keep row and the comments underneath, and the floating
 * light five-tab bar (Drops active). */
const vibes = [
  {
    src: "/media/walls/raat.jpg",
    avatar: "/media/themes/alone/profile.jpg",
    name: "Mason",
    n: 8,
    muted: false,
  },
  {
    src: "/media/walls/xelvic.jpg",
    avatar: "/media/walls/mehfil.jpg",
    name: "Hailey",
    n: 15,
    muted: false,
  },
  {
    src: undefined,
    avatar: "/media/themes/alone/profile.jpg",
    name: "Mason",
    n: 7,
    muted: true,
  },
  {
    src: "/media/walls/safar.jpg",
    avatar: "/media/walls/xelvic.jpg",
    name: "Noah",
    n: 5,
    muted: false,
  },
];

const dropTabs = [
  { icon: LayoutGrid, label: "Drops", active: true, dot: false },
  { icon: Sparkles, label: "Moments", active: false, dot: true },
  { icon: MessageSquare, label: "Convo", active: false, dot: true },
  { icon: AudioLines, label: "Audio", active: false, dot: false },
  { icon: Radio, label: "Live", active: false, dot: false },
];

function DropsDemo({ reduced }: { reduced: boolean }) {
  const [liked, setLiked] = useState(reduced);
  useEffect(() => {
    if (reduced) return;
    const t = setInterval(() => setLiked((v) => !v), 2600);
    return () => clearInterval(t);
  }, [reduced]);

  return (
    <div className="relative flex h-full flex-col overflow-hidden bg-[#fce9f1] text-plum">
      {/* status row */}
      <div className="flex items-center justify-between px-4 pb-2 pt-4 text-[10px] font-semibold leading-none text-plum/70">
        <span>1:44</span>
        <span className="flex items-center gap-1 text-plum/50">
          <span className="h-2 w-3 rounded-[2px] border border-plum/40" />
          <span>5G</span>
        </span>
      </div>

      {/* top bar */}
      <div className="flex items-center gap-2 px-4 pb-1 pt-1">
        <span className="h-8 w-8 shrink-0 overflow-hidden rounded-full ring-2 ring-pure/80">
          <img
            src="/media/brand/xelvic.png"
            alt=""
            className="h-full w-full object-cover"
          />
        </span>
        <span className="font-display text-[17px] font-extrabold tracking-tight">
          Xelvic
        </span>
        <span className="ml-auto flex items-center gap-3 text-plum/80">
          <Search size={16} />
          <Plus size={18} />
        </span>
      </div>

      {/* Vibe rail */}
      <div className="mt-2 flex items-center justify-between px-4">
        <h4 className="text-[13px] font-extrabold">Vibe</h4>
        <span className="text-[8px] font-bold text-[#e11d6b]">See all</span>
      </div>
      <div className="mt-2 flex items-start gap-2 overflow-hidden px-4">
        {vibes.map((v, i) => (
          <div key={`${v.name}-${i}`} className="w-[22%] shrink-0">
            <div className="relative aspect-[9/12.5] overflow-hidden rounded-[10px] bg-[#efe7eb]">
              {v.muted ? (
                <span className="grid h-full w-full place-items-center">
                  <VolumeX size={17} className="text-[#e11d6b]" />
                </span>
              ) : (
                <img
                  src={v.src}
                  alt=""
                  className="h-full w-full object-cover"
                />
              )}
              <span className="absolute left-1 top-1 h-[18px] w-[18px] overflow-hidden rounded-full ring-2 ring-pure/90">
                <img
                  src={v.avatar}
                  alt=""
                  className="h-full w-full object-cover"
                />
              </span>
              <span className="absolute bottom-1 left-1 flex items-center gap-0.5 rounded-full bg-black/45 px-1.5 py-0.5 text-[7px] font-semibold leading-none text-pure">
                <Play size={6} className="fill-pure" />
                {v.n}
              </span>
            </div>
            <p className="mt-1 truncate text-[9px] font-semibold leading-none">
              {v.name}
            </p>
          </div>
        ))}
      </div>

      {/* For you — one Drop */}
      <div className="mt-3 flex items-center justify-between px-4">
        <h4 className="text-[13px] font-extrabold">For you</h4>
      </div>
      <div className="mt-2 flex items-center gap-2 px-4">
        <span className="h-8 w-8 shrink-0 overflow-hidden rounded-full p-[1.5px] ring-2 ring-[#e11d6b]/70">
          <img
            src="/media/walls/xelvic.jpg"
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

      {/* the photo is set at the Drop frame, and takes the room the rest
          of the feed leaves — the shell is narrower in the Features grid
          than in the hero, so the frame has to give there */}
      <div className="relative mt-2 min-h-0 flex-1 overflow-hidden bg-plum">
        <img
          src="/media/walls/sheher.jpg"
          alt=""
          className="h-full w-full object-cover"
        />
        <span className="absolute bottom-1.5 right-2 text-[6px] font-medium text-pure/55">
          2025-05-06 19:00
        </span>
      </div>

      {/* feel / comment / share / keep */}
      <div className="flex items-center gap-4 px-4 py-2 text-[11px] font-semibold text-plum/65">
        <span className="flex items-center gap-1">
          <Heart
            size={15}
            className={
              liked ? "fill-[#e11d6b] text-[#e11d6b]" : "text-plum/65"
            }
          />
          {21 + (liked ? 1 : 0)}
        </span>
        <span className="flex items-center gap-1">
          <MessageSquare size={14} />8
        </span>
        <span className="flex items-center gap-1">
          <Share2 size={14} />8
        </span>
        <Bookmark size={14} className="ml-auto" />
      </div>

      {/* the comments sit under the post */}
      <div className="flex items-center gap-2 px-4">
        <span className="h-6 w-6 shrink-0 overflow-hidden rounded-full bg-[#3a0a24]">
          <img
            src="/media/walls/raat.jpg"
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
            src="/media/walls/safar.jpg"
            alt=""
            className="h-full w-full object-cover opacity-70"
          />
        </span>
        <span className="text-[9px] font-bold">Mia Carter</span>
        <Ellipsis size={12} className="ml-auto text-plum/40" />
      </div>

      {/* floating tab bar */}
      <div className="mx-3 mb-2 mt-auto flex shrink-0 items-center justify-between rounded-full bg-pure/80 px-3 py-2 shadow-[0_10px_30px_rgba(58,10,36,.16)] backdrop-blur">
        {dropTabs.map((t) => {
          const Icon = t.icon;
          return (
            <div
              key={t.label}
              className={`flex w-11 flex-col items-center gap-0.5 ${
                t.active ? "text-[#e11d6b]" : "text-plum/55"
              }`}
            >
              <span className="relative">
                <Icon size={15} />
                {t.dot && (
                  <span className="absolute -right-1 -top-0.5 h-1.5 w-1.5 rounded-full bg-[#e11d6b]" />
                )}
              </span>
              <span className="text-[6.5px] font-semibold leading-none">
                {t.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* home indicator */}
      <span className="pointer-events-none absolute bottom-1 left-1/2 h-[3px] w-[90px] -translate-x-1/2 rounded-full bg-plum/25" />
    </div>
  );
}

/* --------------------------- CONVO ---------------------------- *
 * A one-to-one thread with the app's newer in-chat touches: anything shared
 * into the convo — a Vibe, a photo Drop, a track — arrives as the thing itself
 * and carries its own feel row, and answering it opens the comment sheet over
 * the thread rather than sending you out to another screen. The heart fills on
 * its own, the way a real tap looks from the other side. */
type ConvoPostKind = "Vibe" | "Photo" | "Track";

type ConvoLine =
  | { kind: "system"; text: string }
  | { kind: "them"; text: string }
  | { kind: "me"; text: string }
  | {
      kind: "post";
      mine: boolean;
      type: ConvoPostKind;
      src: string;
      title: string;
      meta: string;
      likes: number;
      comments: number;
      shares: number;
    }
  /** the reader taps the heart on post #on (0-based, counted among posts) */
  | { kind: "like"; on: number }
  /**
   * The comment sheet, opened from post #on. It carries both of the things a
   * post takes: a comment, which goes to everyone who can see the post, and a
   * private note, which only the person who put the post up ever reads.
   */
  | { kind: "comment"; on: number; comment: string; note: string }
  /** a Spark — sent rather than posted, carrying no picture, and gone the moment it is opened */
  | { kind: "spark"; mine: boolean }
  /** the reader opens the Spark sitting in the thread, and it is gone */
  | { kind: "openSpark" };

const convoScript: ConvoLine[] = [
  { kind: "system", text: "This convo is encrypted" },
  { kind: "them", text: "posted a new Vibe, tell me what you think 👀" },
  {
    kind: "post",
    mine: false,
    type: "Vibe",
    src: "/media/themes/catgirl/drops.jpg",
    title: "night market",
    meta: "0:18",
    likes: 11,
    comments: 3,
    shares: 2,
  },
  { kind: "like", on: 0 },
  { kind: "me", text: "felt it before I even opened the app 🔥" },
  { kind: "them", text: "the track under it is off your playlist btw 🎧" },
  {
    kind: "post",
    mine: true,
    type: "Track",
    src: "/media/themes/animeblue/audio.jpg",
    title: "Night Drive",
    meta: "Xelvic Sounds · 3:12",
    likes: 4,
    comments: 1,
    shares: 1,
  },
  // the sheet comes up over the thread and takes both: a comment anybody who
  // can see the post will read, and a note only John will
  {
    kind: "comment",
    on: 0,
    comment: "sending this to the group chat",
    note: "saving this one for the trip",
  },
  { kind: "them", text: "wait till you see the photo drop 📸" },
  {
    kind: "post",
    mine: false,
    type: "Photo",
    src: "/media/themes/animeblue/moments.jpg",
    title: "golden hour",
    meta: "4 photos",
    likes: 26,
    comments: 8,
    shares: 5,
  },
  // a Spark goes the other way round from everything above: it is sent to
  // people rather than posted, it carries no picture, and it does not keep —
  // the moment it is opened it reads "Spark · opened" for both sides
  { kind: "spark", mine: true },
  { kind: "them", text: "a Spark?? okay okay 👀" },
  { kind: "spark", mine: false },
  { kind: "openSpark" },
];

/* ── the comment sheet ─────────────────────────────────────────────────────── */

/**
 * One voice in the sheet — a comment, which everybody who can see the post
 * reads, or a note, which only the two people in the convo ever will. They are
 * drawn the same way; the difference is the heart and the Reply, which a note
 * has neither of, because there is nobody else to reply to.
 */
type SheetVoice = {
  name: string;
  when: string;
  text: string;
  /** whoever never set a photo wears their initial instead */
  letter?: string;
  /** the colour that initial sits on */
  tone?: string;
  /** the avatar, when there is a photo rather than an initial */
  photo?: string;
  /** how many people felt it — most comments have nobody yet */
  feels?: number;
};

/**
 * What the sheet is already holding when it comes up on a post, indexed by the
 * post's ordinal in the thread so the sheet always belongs to the post that was
 * tapped. Only comments: a post with no notes on it opens on the app's own
 * "No notes yet", which is the whole point of that tab.
 */
const POST_COMMENTS: SheetVoice[][] = [
  [
    {
      name: "tyler_brooks",
      when: "9d",
      text: "Where is this? I need to go 🙌",
      letter: "TB",
      tone: "#3b82f6",
      feels: 1,
    },
    {
      name: "emily.rose",
      when: "4d",
      text: "The colours in this are unreal.",
      letter: "ER",
      tone: "#7c3aed",
    },
    {
      name: "marcus_reed",
      when: "3d",
      text: "Best thing on my feed all week 🔥",
      letter: "MR",
      tone: "#e11d48",
    },
  ],
  [
    {
      name: "sydney.grant",
      when: "2d",
      text: "On repeat since you posted it.",
      letter: "SG",
      tone: "#7c3aed",
    },
    {
      name: "dylancarter",
      when: "1d",
      text: "Adding this to the road trip mix.",
      letter: "DC",
      tone: "#0ea5e9",
    },
  ],
  [
    {
      name: "hannah.b",
      when: "10d",
      text: "Frame three belongs in a gallery.",
      letter: "HB",
      tone: "#db2777",
    },
    {
      name: "jake_morrison",
      when: "9d",
      text: "Golden hour never misses 🌇",
      letter: "JM",
      tone: "#e11d48",
      feels: 2,
    },
    {
      name: "ashleygrant",
      when: "8d",
      text: "So clean. What did you shoot on?",
      letter: "AG",
      tone: "#3b82f6",
    },
  ],
];

/** The account this demo is signed in as — the name its own comment wears. */
const ME = {
  name: "alex.rivera",
  when: "now",
  photo: "/media/themes/teddy/profile.jpg",
};

type SheetTab = "comments" | "notes";

/** One row. */
function SheetVoiceRow({
  voice,
  actions,
}: {
  voice: SheetVoice;
  actions: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex gap-2 pb-2.5"
    >
      {voice.photo ? (
        <span className="h-5 w-5 shrink-0 overflow-hidden rounded-full bg-pink-100">
          <img
            src={voice.photo}
            alt=""
            className="h-full w-full object-cover"
          />
        </span>
      ) : (
        <span
          className="grid h-5 w-5 shrink-0 place-items-center rounded-full text-[7.5px] font-bold leading-none text-pure"
          style={{ background: voice.tone }}
        >
          {voice.letter}
        </span>
      )}
      <span className="min-w-0 flex-1">
        <span className="flex items-baseline gap-1.5 leading-none">
          <span className="truncate text-[9px] font-bold">{voice.name}</span>
          <span className="shrink-0 text-[8px] font-medium text-plum/45">
            {voice.when}
          </span>
        </span>
        <span className="mt-0.5 block truncate text-[9.5px] leading-snug">
          {voice.text}
        </span>
        {actions && (
          <span className="mt-1 flex items-center gap-2.5 text-[8px] font-medium leading-none text-plum/45">
            <span className="flex items-center gap-1">
              <Heart size={8} className="shrink-0" />
              {voice.feels ? voice.feels : ""}
            </span>
            Reply
          </span>
        )}
      </span>
    </motion.div>
  );
}

/**
 * The sheet a post opens into: Comments on one tab, Notes on the other, slid up
 * over the thread with the thread pushed back behind it. A note and a comment
 * are written in the same field — the placeholder is the only thing that
 * changes, and that is how the app tells you which one you are writing.
 */
function CommentSheet({
  tab,
  rows,
  draft,
  withWhom,
}: {
  tab: SheetTab;
  rows: SheetVoice[];
  /** what is in the field while it is being typed into */
  draft: string;
  /** the person the notes are between, named back in the empty state */
  withWhom: string;
}) {
  const onNotes = tab === "notes";
  return (
    <>
      {/* the thread is still there, just pushed back */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="absolute inset-0 z-10 bg-[#2b0b1d]/30"
      />
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 32 }}
        className="absolute inset-x-0 bottom-0 z-20 flex h-[72%] flex-col rounded-t-[22px] bg-pure shadow-[0_-10px_30px_rgba(58,10,36,.22)]"
      >
        <span className="mx-auto mt-1.5 h-[3px] w-8 shrink-0 rounded-full bg-plum/70" />

        <div className="mt-3 flex shrink-0 border-b border-plum/10">
          {(["comments", "notes"] as const).map((t) => {
            const active = tab === t;
            return (
              <span key={t} className="flex flex-1 justify-center pt-1">
                <span className="flex flex-col items-center gap-1 px-2">
                  <span
                    className={`text-[10px] leading-none ${
                      active
                        ? "font-bold text-plum"
                        : "font-semibold text-plum/45"
                    }`}
                  >
                    {t === "comments" ? "Comments" : "Notes"}
                  </span>
                  <span
                    className={`h-[2.5px] self-stretch rounded-full ${
                      active ? "bg-[#ec4899]" : "bg-transparent"
                    }`}
                  />
                </span>
              </span>
            );
          })}
        </div>

        <div className="min-h-0 flex-1 overflow-hidden px-2.5 pt-2">
          {rows.length === 0 ? (
            /* the app's own empty state, word for word — a post nobody has
               written a note on is the ordinary case, not an error */
            <div className="flex h-full flex-col items-center justify-center gap-1 pb-8 text-center">
              <Lock size={17} className="text-plum/25" />
              <span className="text-[10px] font-bold leading-none">
                No notes yet
              </span>
              <span className="text-[8.5px] leading-snug text-plum/50">
                A note is private — only you and {withWhom} see it.
              </span>
            </div>
          ) : (
            rows.map((v, i) => (
              <SheetVoiceRow
                key={`${v.name}-${i}`}
                voice={v}
                actions={!onNotes}
              />
            ))
          )}
        </div>

        <div className="flex shrink-0 items-center gap-1 border-t border-plum/10 px-2.5 pb-2 pt-2">
          <ImageIcon size={16} className="shrink-0 text-plum/70" />
          <Mic size={16} className="shrink-0 text-plum/70" />
          <span className="flex min-w-0 flex-1 items-center rounded-full border-[1.5px] border-[#ec4899]/70 px-2 py-2">
            {draft ? (
              <span className="truncate text-[11px] leading-none">
                {draft}
                <motion.span
                  aria-hidden
                  className="ml-px inline-block"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.9, repeat: Infinity }}
                >
                  |
                </motion.span>
              </span>
            ) : (
              <span className="truncate text-[9px] leading-none text-plum/40">
                {onNotes ? "Write a private note" : "Say something"}
              </span>
            )}
          </span>
          <Send size={16} className="shrink-0 h-5 w-5 p-0.5 fill-[#ec4899] text-[#ec4899]" />
        </div>
      </motion.div>
    </>
  );
}

function PostCard({
  type,
  src,
  title,
  meta,
  likes,
  comments,
  shares,
  liked,
}: {
  type: ConvoPostKind;
  src: string;
  title: string;
  meta: string;
  likes: number;
  comments: number;
  shares: number;
  liked: boolean;
}) {
  const badge = type === "Vibe" ? "Vibe" : type === "Photo" ? "Drop" : "Audio";
  return (
    <div className="w-[188px] overflow-hidden rounded-2xl bg-pure text-plum shadow-[0_3px_12px_rgba(58,10,36,.12)] ring-1 ring-plum/10">
      {type === "Track" ? (
        /* a track shared into the chat reads as a small player row */
        <div className="flex items-center gap-2 p-2">
          <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-lg bg-plum">
            <img src={src} alt="" className="h-full w-full object-cover" />
            <span className="absolute inset-0 grid place-items-center bg-black/35">
              <Play size={12} className="fill-pure text-pure" />
            </span>
          </span>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-[11px] font-bold">
              {title}
            </span>
            <span className="block truncate text-[9px] text-plum/50">
              {meta}
            </span>
            <span className="mt-1 flex h-3 items-end gap-[2px]">
              {Array.from({ length: 16 }).map((_, i) => (
                <span
                  key={i}
                  className="w-[2px] flex-1 rounded-full bg-pink-400/70"
                  style={{ height: `${30 + ((i * 41) % 65)}%` }}
                />
              ))}
            </span>
          </span>
        </div>
      ) : (
        <>
          <div className="relative aspect-[4/5] bg-plum">
            <img src={src} alt="" className="h-full w-full object-cover" />
            {type === "Vibe" && (
              <span className="absolute inset-0 grid place-items-center">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-black/45 backdrop-blur-sm">
                  <Play size={13} className="fill-pure text-pure" />
                </span>
              </span>
            )}
            <span className="absolute left-2 top-2 rounded-full bg-black/50 px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wide text-pure">
              {badge}
            </span>
            <span className="absolute bottom-2 right-2 rounded bg-black/55 px-1.5 py-0.5 text-[9px] font-semibold text-pure">
              {meta}
            </span>
          </div>
          <p className="truncate px-2.5 pt-1.5 text-[11px] font-bold">
            {title}
          </p>
        </>
      )}

      {/* The app's own row: a feel with its count, the comments, the shares,
          and the reply arrow the app keeps on the right. The comment count is
          the thing the sheet moves, so it is the one to watch. */}
      <div className="mt-1.5 flex items-center gap-3 border-t border-plum/10 px-2.5 py-1.5 text-[10px] font-semibold text-plum/60">
        <span className="flex items-center gap-1">
          <motion.span
            key={liked ? "on" : "off"}
            initial={{ scale: liked ? 0.5 : 1 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 520, damping: 16 }}
            className="inline-flex"
          >
            <Heart
              size={13}
              className={
                liked ? "fill-[#ff2d78] text-[#ff2d78]" : "text-plum/60"
              }
            />
          </motion.span>
          <span className={liked ? "text-[#ff2d78]" : undefined}>
            {likes + (liked ? 1 : 0)}
          </span>
        </span>
        <span className="flex items-center gap-1">
          <MessageSquare size={11} />
          {comments}
        </span>
        <span className="flex items-center gap-1">
          <Upload size={11} />
          {shares}
        </span>
        <CornerUpLeft size={12} className="ml-auto shrink-0 text-pink-600" />
      </div>
    </div>
  );
}

/**
 * A Spark.
 *
 * The one thing in the app that is *sent* to people rather than posted, and the
 * one thing that does not keep. It carries no picture — what arrives is a card
 * saying a Spark is waiting, and opening it is the whole of it. Afterwards both
 * sides of the thread are left holding the same spent line, which is why the
 * sent and opened states are the small pill rather than a card of their own.
 */
function SparkCard({ mine, gone }: { mine: boolean; gone: boolean }) {
  // only the Spark that was sent to me can be opened, so only that one is spent
  const spent = gone && !mine;

  if (mine || spent) {
    return (
      <motion.span
        // the key changes when it is opened, so the line is replaced rather
        // than quietly reworded — which is what opening a Spark does
        key={spent ? "opened" : "sent"}
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="inline-flex items-center gap-1.5 rounded-full border border-plum/10 bg-pure px-2.5 py-1.5 text-[10px] font-semibold leading-none text-plum/70 shadow-[0_2px_8px_rgba(58,10,36,.06)]"
      >
        {spent ? (
          <EyeOff size={12} className="shrink-0 text-plum/40" />
        ) : (
          <Sparkles size={12} className="shrink-0 text-plum/45" />
        )}
        {spent ? "Spark · opened" : "Spark · sent"}
      </motion.span>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex w-fit max-w-[172px] items-center gap-2 rounded-[18px] border border-[#f7c9dd] bg-[#fbe0ec] px-2.5 py-2"
    >
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#f9c9de]">
        <Sparkles size={16} className="text-[#e8447f]" />
      </span>
      <span className="min-w-0">
        <span className="block truncate text-[11px] font-bold leading-tight text-plum">
          A Spark for you
        </span>
        <span className="mt-0.5 block truncate text-[9px] leading-tight text-plum/50">
          Tap to open · once only
        </span>
      </span>
    </motion.div>
  );
}

/**
 * The convo screen: a one-to-one thread where anything shared into it arrives
 * as the thing itself, so you can feel it, comment on it or leave a private
 * note without ever leaving the chat — and a Spark can be sent and spent
 * without leaving it either.
 *
 * `onCount` reports how much of the thread is up. A caller can hang its own
 * annotations off that same timeline instead of guessing at the timing — which
 * is exactly what ConvoStory does.
 */
export function ConvoDemo({
  reduced,
  onCount,
}: {
  reduced: boolean;
  onCount?: (shown: number) => void;
}) {
  // how many script lines are up, what "I" am typing, and which posts I liked
  const [count, setCountState] = useState(reduced ? convoScript.length : 1);
  // mirrored out to the caller so both are reading the same beat
  const setCount = (n: number) => {
    setCountState(n);
    onCount?.(n);
  };
  const [typing, setTyping] = useState(false);
  const [draft, setDraft] = useState("");
  const [liked, setLiked] = useState<number[]>(reduced ? [0] : []);
  // the post the comment sheet is open on, and which of its two tabs is up
  const [sheet, setSheet] = useState<{ on: number; tab: SheetTab } | null>(
    null,
  );
  // what is in the sheet's field while it is being typed into
  const [sheetDraft, setSheetDraft] = useState("");
  // everything written into a sheet in this run, keyed `post:tab` — the app
  // keeps the two apart, so a note never turns up among the comments
  const [written, setWritten] = useState<Record<string, SheetVoice[]>>({});
  // a Spark is only there until it is opened — then it is gone, for both sides
  const [sparkOpened, setSparkOpened] = useState(reduced);
  // the app answers a tap with a line of its own — "Felt. Tap to take it back.",
  // "Spark sent." — so the demo shows the same confirmation at the same moment
  const [toast, setToast] = useState<string | null>(null);

  /** Add what was just written to the sheet, and empty the field. */
  const wrote = (on: number, tab: SheetTab, text: string) => {
    setWritten((w) => ({
      ...w,
      [`${on}:${tab}`]: [...(w[`${on}:${tab}`] ?? []), { ...ME, text }],
    }));
    setSheetDraft("");
  };

  useEffect(() => {
    // With motion off there is no timeline to run, so land on the finished
    // thread: the screen still says what it is for, and the count still goes
    // out so a caller's annotations settle with it.
    if (reduced) {
      setDraft("");
      setTyping(false);
      setLiked([0]);
      setSheet(null);
      setSheetDraft("");
      setWritten({});
      setSparkOpened(true);
      setToast(null);
      setCount(convoScript.length);
      return;
    }
    let i = 1;
    let alive = true;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const wait = (ms: number, fn: () => void) => {
      const t = setTimeout(() => {
        if (alive) fn();
      }, ms);
      timers.push(t);
    };
    // type `full` into the composer, then send it
    const compose = (full: string, send: () => void) => {
      let c = 0;
      const typeChar = () => {
        if (!alive) return;
        c += 1;
        setDraft(full.slice(0, c));
        if (c < full.length) wait(48, typeChar);
        else wait(520, send);
      };
      wait(320, typeChar);
    };
    // the same, into the sheet's field — which is a shade quicker, because a
    // comment is a shorter thing to write than a line of conversation
    const typeInto = (full: string, send: () => void) => {
      let c = 0;
      const typeChar = () => {
        if (!alive) return;
        c += 1;
        setSheetDraft(full.slice(0, c));
        if (c < full.length) wait(42, typeChar);
        else wait(460, send);
      };
      wait(280, typeChar);
    };
    const step = () => {
      if (!alive) return;
      if (i >= convoScript.length) {
        // hold the finished thread, then start the story over
        wait(3400, () => {
          i = 1;
          setCount(1);
          setDraft("");
          setLiked([]);
          setTyping(false);
          setSheet(null);
          setSheetDraft("");
          setWritten({});
          setSparkOpened(false);
          setToast(null);
          wait(900, step);
        });
        return;
      }
      const line = convoScript[i];
      if (line.kind === "them") {
        setTyping(true);
        wait(1400, () => {
          setTyping(false);
          i += 1;
          setCount(i);
          wait(850, step);
        });
      } else if (line.kind === "me") {
        compose(line.text, () => {
          setDraft("");
          i += 1;
          setCount(i);
          wait(950, step);
        });
      } else if (line.kind === "comment") {
        // the sheet comes up over the thread on Comments, takes the comment,
        // and is then moved to the other tab for the note — the two are written
        // in the same field, and only the placeholder tells them apart
        setSheet({ on: line.on, tab: "comments" });
        wait(1000, () => {
          typeInto(line.comment, () => {
            wrote(line.on, "comments", line.comment);
            wait(1250, () => {
              setSheet((s) => (s ? { ...s, tab: "notes" } : s));
              wait(950, () => {
                typeInto(line.note, () => {
                  wrote(line.on, "notes", line.note);
                  wait(1500, () => {
                    setSheet(null);
                    wait(520, () => {
                      i += 1;
                      setCount(i);
                      wait(900, step);
                    });
                  });
                });
              });
            });
          });
        });
      } else if (line.kind === "like") {
        wait(650, () => {
          setLiked((l) => (l.includes(line.on) ? l : [...l, line.on]));
          setToast("Felt. Tap to take it back.");
          wait(2400, () => setToast(null));
          i += 1;
          setCount(i);
          wait(900, step);
        });
      } else if (line.kind === "spark") {
        // it lands in the thread as itself; the app's own confirmation for one
        // going out is the toast, so the demo says the same thing at the same
        // moment rather than inventing a button to light up
        if (line.mine) {
          setToast("Spark sent.");
          wait(1900, () => setToast(null));
        }
        wait(720, () => {
          i += 1;
          setCount(i);
          wait(1150, step);
        });
      } else if (line.kind === "openSpark") {
        // opening it is the whole of a Spark — there is nothing left after
        wait(900, () => {
          setSparkOpened(true);
          i += 1;
          setCount(i);
          wait(1500, step);
        });
      } else {
        // a shared post lands in the thread
        wait(800, () => {
          i += 1;
          setCount(i);
          wait(1000, step);
        });
      }
    };
    wait(1100, step);
    return () => {
      alive = false;
      timers.forEach(clearTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced]);

  const shown = convoScript.slice(0, count);
  let postN = -1; // ordinal of each shown post, so `liked` can address one
  /* What the sheet is showing: the post's own comments on the Comments tab —
     a note is never in that list — and then whatever has been written into the
     tab that is up. */
  const sheetRows: SheetVoice[] = sheet
    ? [
        ...(sheet.tab === "comments" ? (POST_COMMENTS[sheet.on] ?? []) : []),
        ...(written[`${sheet.on}:${sheet.tab}`] ?? []),
      ]
    : [];
  /* A comment moves the post's comment count; a note does not, because a note
     was never in the comments to begin with. */
  const commentsOn = (n: number) => written[`${n}:comments`]?.length ?? 0;
  // A day two people talk on is one spark, and it does not matter who of you
  // sent first — John has already spoken here, so it ticks over the moment "I"
  // do. The count itself lives on the convo's own screen, though, not here.

  return (
    <div className="relative flex h-full flex-col bg-[#f1eff5] text-plum">
      {/* status row */}
      <div className="flex items-center justify-between px-4 pt-3 pb-1 text-[11px] font-semibold text-plum/75">
        <span>21:04</span>
        <span className="flex items-center gap-1 text-plum/55">
          <span className="h-2 w-3 rounded-[2px] border border-plum/40" />
          <span>5G</span>
        </span>
      </div>

      {/* contact header */}
      <div className="flex items-center gap-2.5 border-b border-plum/10 px-1.5 py-1 shadow-[0_1px_3px_rgba(58,10,36,.05)]">
        <ChevronLeft size={16} className="shrink-0 text-plum/70" />
        <span className="h-8 w-8 shrink-0 overflow-hidden rounded-full bg-pink-100">
          <img
            src="/media/walls/mehfil.jpg"
            alt=""
            className="h-full w-full object-cover"
          />
        </span>
        <span className="flex min-w-0 flex-1 items-center gap-1">
          <span className="truncate text-[15px] font-bold">John</span>
          <MdVerified size={14} className="shrink-0 text-[#1d9bf0]" />
        </span>
        <Phone size={17} className="text-plum/70" />
        <Video size={17} className="text-plum/70" />
        <MoreVertical size={16} className="text-plum/55" />
      </div>

      {/* thread — the bottom pad is the floor John's character stands on, so it
          never ends up drawn across the last thing said */}
      <div className="relative flex flex-1 flex-col justify-end gap-2 overflow-hidden px-1.5 pt-2 pb-[78px]">
        <AnimatePresence initial={false} mode="popLayout">
          {shown.map((m, idx) => {
            if (m.kind === "system")
              return (
                <motion.div
                  key={idx}
                  layout
                  {...bubbleMotion}
                  className="flex items-center gap-1.5 self-center rounded-full border border-plum/10 bg-pure px-3.5 py-1 text-[11px] font-semibold text-plum/75 shadow-[0_1px_3px_rgba(58,10,36,.05)]"
                >
                  <Lock size={11} className="text-plum/60" />
                  {m.text}
                </motion.div>
              );
            if (m.kind === "them")
              return (
                <motion.div
                  key={idx}
                  layout
                  {...bubbleMotion}
                  className="w-fit max-w-[82%] origin-bottom-left self-start rounded-[20px] rounded-bl-md bg-pure px-2 py-1.5 text-[12px] leading-snug shadow-[0_2px_8px_rgba(58,10,36,.05)]"
                >
                  {m.text}
                </motion.div>
              );
            if (m.kind === "me")
              return (
                <motion.div
                  key={idx}
                  layout
                  {...bubbleMotion}
                  className="w-fit max-w-[82%] origin-bottom-right self-end rounded-[20px] rounded-br-md bg-[#f4b7d2] px-2 py-1.5 text-[12px] leading-snug shadow-[0_2px_8px_rgba(58,10,36,.05)]"
                >
                  {m.text}
                </motion.div>
              );
            if (
              m.kind === "like" ||
              m.kind === "comment" ||
              m.kind === "openSpark"
            )
              return null; // an action on something already in the thread
            if (m.kind === "spark")
              return (
                <motion.div
                  key={idx}
                  layout
                  {...bubbleMotion}
                  className={`w-fit ${m.mine ? "self-end" : "self-start"}`}
                >
                  <SparkCard mine={m.mine} gone={sparkOpened} />
                </motion.div>
              );
            // a shared post
            postN += 1;
            return (
              <motion.div
                key={idx}
                layout
                {...bubbleMotion}
                className={`flex flex-col ${m.mine ? "items-end self-end" : "items-start self-start"}`}
              >
                <PostCard
                  type={m.type}
                  src={m.src}
                  title={m.title}
                  meta={m.meta}
                  likes={m.likes}
                  comments={m.comments + commentsOn(postN)}
                  shares={m.shares}
                  liked={liked.includes(postN)}
                />
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* John's character at the foot of the thread — the same indicator the
            messaging screen wears, so the two read as one app: small, centred,
            and it swaps between the theme's `typing` pose while he is
            mid-sentence and its `wait` pose the rest of the time. It stands on
            the thread's bottom pad rather than over the messages, and being out
            of flow it never shifts them either. */}
        <div className="pointer-events-none absolute inset-x-0 -bottom-2 z-10 flex justify-center">
          <AnimatePresence mode="wait" initial={false}>
            <motion.img
              key={typing ? "typing" : "wait"}
              src={
                typing
                  ? "/media/themes/pink/typing.png"
                  : "/media/themes/pink/wait.png"
              }
              alt={typing ? "John is typing…" : "John"}
              /* a small bottom-to-top nudge — minimal travel, no fuss */
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.28, ease: [0.22, 0.68, 0.24, 1] }}
              className="h-[70px] w-auto object-contain drop-shadow-[0_12px_20px_rgba(58,10,36,.22)]"
            />
          </AnimatePresence>
        </div>

        {/* the app's own confirmation, word for word, at the moment it happens.
            Its own AnimatePresence: the one above runs in popLayout mode for the
            thread, which is not what a floating pill wants. */}
        <AnimatePresence>
          {toast && (
            <motion.div
              key="toast"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              className="pointer-events-none absolute inset-x-0 bottom-2 z-10 mx-auto w-fit max-w-[92%] truncate rounded-2xl bg-pure px-3 py-2 text-[10px] font-semibold text-plum shadow-[0_6px_18px_rgba(58,10,36,.18)]"
            >
              {toast}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* composer */}
      <div className="border-t border-plum/10 px-2 pb-2 pt-1.5">
        <div className="flex items-center gap-1">
          <span className="grid shrink-0 place-items-center rounded-full border text-pink-500">
            <FiPlusCircle size={18} />
          </span>
          <div className="flex-1 truncate rounded-full bg-pure px-2.5 py-1.5 text-[12px] shadow-[0_1px_3px_rgba(58,10,36,.08)]">
            {draft ? (
              <span>
                {draft}
                <motion.span
                  aria-hidden
                  className="ml-px inline-block"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.9, repeat: Infinity }}
                >
                  |
                </motion.span>
              </span>
            ) : (
              <span className="text-plum/40">Say something</span>
            )}
          </div>
          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-pink-600 text-pure">
            <Mic size={14} />
          </span>
        </div>
      </div>

      {/* the comment sheet, over everything — it is the app's one way of
          answering a post without leaving the convo it arrived in */}
      <AnimatePresence>
        {sheet && (
          <CommentSheet
            key="sheet"
            tab={sheet.tab}
            rows={sheetRows}
            draft={sheetDraft}
            withWhom="John"
          />
        )}
      </AnimatePresence>
    </div>
  );
}

/* -------------------------- ONBOARDING ------------------------ *
 * The create-account flow exactly as the app walks it: a name, a birthday,
 * a number, the six-digit code that proves it, a password, and the handle
 * Xelvic rolls for you. The pale pink stage with its doodles, the six
 * progress segments, and the way each screen asks for one thing only are
 * all the app's. It advances on its own, and the button moves it along too.
 */
const ONBOARD_SCREENS = [
  {
    title: "What is your name?",
    sub: "This is the name people see on your profile. We will make your username later.",
  },
  {
    title: "Pick your date of birth",
    sub: "Nobody else sees this. Xelvic is not for anyone under 13.",
  },
  {
    title: "Let us verify your number",
    sub: "The code goes there. We also check right away whether it already has an account.",
  },
  {
    title: "Enter the 6-digit code",
    sub: "Sent on WhatsApp to +919999999999. It stays good for ten minutes.",
  },
  {
    title: "Set a password",
    sub: "Eight characters or more. You will need it whenever you log in on a new phone.",
  },
  {
    title: "All set, Emma!",
    sub: "This is how people find you on Xelvic. Not feeling it? Roll another — you can change it later from your profile.",
  },
] as const;

const onboardLabel = "text-[7.5px] font-bold text-plum/55";

/** The one button every screen ends with — pale until the field is done,
 *  solid on the two screens that commit something. */
function OnboardButton({
  children,
  onClick,
  solid,
}: {
  children: ReactNode;
  onClick: () => void;
  solid?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`mt-2 flex w-full items-center justify-center gap-1 rounded-full py-2 text-[9.5px] font-bold text-pure transition-colors ${
        solid ? "bg-[#d81b60]" : "bg-[#f7b9cf] hover:bg-[#f4a8c5]"
      }`}
    >
      {children}
    </button>
  );
}

/** The marks around the art: two arrows, a heart in a speech bubble, and the
 *  app's "Good Vibes Only" signature. They are drawn, not a picture, so they
 *  scale with the screen. */
function OnboardDoodles() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-[2]">
      <svg
        viewBox="0 0 24 24"
        className="absolute left-[3%] top-[20%] h-5 w-5 -rotate-6 text-[#e6007a]"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M8 4l8 8-8 8" />
      </svg>
      <svg
        viewBox="0 0 24 24"
        className="absolute right-[3%] top-[36%] h-5 w-5 rotate-6 text-[#e6007a]"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M16 4l-8 8 8 8" />
      </svg>

      <span className="absolute right-[9%] top-[8%] flex h-9 w-11 items-center justify-center rounded-[11px] border-[2.5px] border-[#e6007a]">
        <Heart size={13} strokeWidth={2.6} className="text-[#e6007a]" />
        <span className="absolute -bottom-[5px] left-2.5 h-2 w-2 rotate-45 border-b-[2.5px] border-l-[2.5px] border-[#e6007a]" />
      </span>

      <span className="absolute right-[13%] top-[42%] h-px w-3 rotate-[24deg] bg-[#e6007a]" />
      <span className="absolute right-[4%] top-[65%] h-px w-2.5 -rotate-[30deg] bg-[#e6007a]" />

      <div className="absolute right-[2%] top-[51%] -rotate-[8deg] text-center">
        <p className="font-display text-[7px] font-extrabold leading-[1.08] text-[#e6007a]">
          Good
          <br />
          Vibes
          <br />
          Only
        </p>
        <Smile
          size={11}
          strokeWidth={2.4}
          className="mx-auto mt-0.5 text-[#e6007a]"
        />
      </div>
    </div>
  );
}

function OnboardingDemo({ reduced }: { reduced: boolean }) {
  // With motion off, land on the finished account — the result is the point.
  const [i, setI] = useState(reduced ? ONBOARD_SCREENS.length - 1 : 0);
  const next = () => setI((n) => (n + 1) % ONBOARD_SCREENS.length);

  useEffect(() => {
    if (reduced) {
      // the preference can arrive after the first paint, so settle on the
      // finished account rather than freezing on the name screen
      setI(ONBOARD_SCREENS.length - 1);
      return;
    }
    const t = setInterval(next, 3800);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced]);

  const s = ONBOARD_SCREENS[i];

  return (
    <div className="relative flex h-full flex-col overflow-hidden bg-[#fdeef4] text-plum">
      {/* the soft fields the art stands on */}
      <span
        aria-hidden
        className="pointer-events-none absolute -right-14 top-5 h-36 w-36 rounded-full bg-[#fbdce9]"
      />

      {/* status row */}
      <div className="relative z-10 flex shrink-0 items-center justify-between px-4 pb-1 pt-3.5 text-[8px] font-semibold leading-none text-plum/70">
        <span>4:42</span>
        <span className="flex items-center gap-1 text-plum/50">
          <Signal size={8} />
          <Wifi size={8} />
          <BatteryFull size={9} />
        </span>
      </div>

      {/* back, and the six segments — one per screen */}
      <div className="relative z-10 flex shrink-0 items-center gap-3 px-4 pt-1">
        <FaArrowLeft size={13} className="shrink-0 text-plum/75" />
        <div className="flex flex-1 items-center justify-center gap-1 pr-4">
          {ONBOARD_SCREENS.map((_, k) => (
            <span
              key={k}
              className={`h-[3px] flex-1 rounded-full transition-colors duration-300 ${
                k <= i ? "bg-[#e6007a]" : "bg-[#f2cada]"
              }`}
            />
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={i}
          initial={{ opacity: 0, x: 8 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -8 }}
          transition={{ duration: 0.26 }}
          className="relative z-10 flex min-h-0 flex-1 flex-col"
        >
          <div className="shrink-0 px-4 pt-3">
            <h3 className="font-display text-[15.5px] font-extrabold leading-tight tracking-tight">
              {s.title}
            </h3>
            <p className="mt-1 text-[8.5px] leading-snug text-plum/55">
              {s.sub}
            </p>
          </div>

          {/* the character on its pink wave, with the drawn doodles around it */}
          <div className="relative flex min-h-0 flex-1 items-end justify-center overflow-hidden">
            <span
              aria-hidden
              className="absolute inset-x-[-25%] bottom-[-10%] h-[68%] rounded-[50%] bg-[#f9d2e3]"
            />
            <span
              aria-hidden
              className="absolute inset-x-[-25%] bottom-[-58%] h-[82%] rounded-[50%] bg-[#fbdde9]"
            />
            <OnboardDoodles />
            <img
              src="/media/themes/pink/typing.png"
              alt=""
              className={`relative z-[1] mb-0 w-auto max-w-[74%] object-contain object-bottom drop-shadow-[0_12px_18px_rgba(58,10,36,.18)] ${
                i === ONBOARD_SCREENS.length - 1 ? "h-[84%]" : "h-[94%]"
              }`}
            />
          </div>

          {/* the one thing this screen asks for */}
          <div className="relative z-10 shrink-0 px-4 pb-2 pt-1">
            {i === 0 && (
              <>
                <p className={onboardLabel}>Full name</p>
                <div className="mt-1 flex items-center gap-1.5 rounded-full bg-pure px-3 py-2 shadow-[0_1px_3px_rgba(58,10,36,.08)]">
                  <User size={11} className="shrink-0 text-plum/45" />
                  <span className="text-[9.5px] text-plum/80">Emma</span>
                  <motion.span
                    aria-hidden
                    className="ml-px inline-block text-[#d81b60]"
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 0.9, repeat: Infinity }}
                  >
                    |
                  </motion.span>
                </div>
                <OnboardButton onClick={next}>
                  Continue
                  <ArrowRight size={11} />
                </OnboardButton>
              </>
            )}

            {i === 1 && (
              <>
                <p className={onboardLabel}>Date of birth</p>
                <div className="mt-1 flex gap-1.5">
                  {["Day", "Month", "Year"].map((v, k) => (
                    <span
                      key={v}
                      className={`flex flex-1 items-center justify-between rounded-full bg-pure px-2.5 py-2 text-[8.5px] ${
                        k === 0
                          ? "text-plum/80 ring-[1.5px] ring-[#d81b60]"
                          : "text-plum/40"
                      }`}
                    >
                      {v}
                      <ChevronDown size={9} className="text-plum/45" />
                    </span>
                  ))}
                </div>
                <p className="mt-1 flex items-center gap-1 text-[7px] font-semibold text-[#d61c4e]">
                  <AlertCircle size={8} />
                  Pick all three
                </p>
                <OnboardButton onClick={next}>
                  Continue
                  <ArrowRight size={11} />
                </OnboardButton>
              </>
            )}

            {i === 2 && (
              <>
                <p className={onboardLabel}>Mobile number</p>
                <div className="mt-1 flex items-center gap-2 rounded-full bg-pure px-2.5 py-2 shadow-[0_1px_3px_rgba(58,10,36,.08)]">
                  <span className="flex shrink-0 items-center gap-1 text-[9px] font-bold">
                    <span aria-hidden>🇮🇳</span>+91
                    <ChevronDown size={9} className="text-plum/45" />
                  </span>
                  <span className="h-4 w-px shrink-0 bg-plum/15" />
                  <span className="text-[9.5px] tracking-wide text-plum/70">
                    98765 43210
                  </span>
                </div>
                <OnboardButton solid onClick={next}>
                  <Send size={10} className="fill-current" />
                  Send OTP
                </OnboardButton>
                <div className="mt-2 flex items-center gap-2 text-[6.5px] font-bold text-plum/35">
                  <span className="h-px flex-1 bg-plum/15" />
                  OR
                  <span className="h-px flex-1 bg-plum/15" />
                </div>
                <p className="mt-1.5 flex items-center justify-center gap-1 text-[8.5px] font-bold text-[#d81b60]">
                  <AtSign size={9} />
                  else continue with email
                </p>
                <p className="mt-1.5 text-center text-[6.5px] leading-snug text-plum/45">
                  Whichever you pick, a 6-digit code goes to it.
                </p>
              </>
            )}

            {i === 3 && (
              <>
                <p className={onboardLabel}>Verification code</p>
                <div className="mt-1 flex gap-1">
                  {Array.from({ length: 6 }).map((_, k) => (
                    <span
                      key={k}
                      className={`grid h-[30px] flex-1 place-items-center rounded-full bg-pure ${
                        k === 0
                          ? "ring-[1.5px] ring-[#d81b60]"
                          : "border border-plum/10"
                      }`}
                    >
                      {k === 0 && (
                        <motion.span
                          aria-hidden
                          className="h-3.5 w-px bg-[#d81b60]"
                          animate={{ opacity: [1, 0, 1] }}
                          transition={{ duration: 0.9, repeat: Infinity }}
                        />
                      )}
                    </span>
                  ))}
                </div>
                <div className="mt-2 flex items-center justify-between text-[7.5px] font-semibold">
                  <span className="flex items-center gap-1 text-plum/45">
                    <RefreshCw size={9} />
                    Resend in 22s
                  </span>
                  <span className="font-bold text-[#d81b60]">Change</span>
                </div>
                <OnboardButton onClick={next}>Verify</OnboardButton>
                <p className="mt-1.5 text-center text-[6.5px] text-plum/45">
                  Never share this code with anyone.
                </p>
              </>
            )}

            {i === 4 && (
              <>
                <p className={onboardLabel}>Password</p>
                <div className="mt-1 flex items-center gap-2 rounded-full bg-pure px-3 py-2 ring-[1.5px] ring-[#d81b60]">
                  <Lock size={10} className="shrink-0 text-plum/55" />
                  <span className="flex-1 text-[8.5px] text-plum/40">
                    At least 8 characters
                  </span>
                  <Eye size={11} className="shrink-0 text-plum/45" />
                </div>
                <OnboardButton onClick={next}>
                  Continue
                  <ArrowRight size={11} />
                </OnboardButton>
                <p className="mt-1.5 text-center text-[6.5px] leading-snug text-plum/45">
                  Tap the eye to check it before you go on. You can change it
                  later from your profile.
                </p>
              </>
            )}

            {i === 5 && (
              <>
                <div className="rounded-xl bg-pure px-3 py-2.5 text-center shadow-[0_2px_10px_rgba(58,10,36,.08)]">
                  <span className="mx-auto grid h-9 w-9 place-items-center rounded-full bg-[#009688] text-[14px] font-bold text-pure">
                    E
                  </span>
                  <p className="mt-1.5 text-[12.5px] font-extrabold leading-none">
                    @emma_zz8
                  </p>
                  <p className="mt-1 text-[7.5px] text-plum/50">Emma</p>
                  <p className="mt-1.5 flex items-center justify-center gap-1 text-[8.5px] font-bold text-[#d81b60]">
                    <Shuffle size={9} />
                    Give me another
                  </p>
                </div>
                <div className="mt-1.5 space-y-1">
                  {[
                    { Icon: User, label: "Name", value: "Emma" },
                    { Icon: Cake, label: "Born", value: "5 Jun 1999" },
                    { Icon: Phone, label: "Verified", value: "+919999999999" },
                  ].map(({ Icon, label, value }) => (
                    <div
                      key={label}
                      className="flex items-center gap-1.5 text-[7.5px]"
                    >
                      <Icon size={9} className="shrink-0 text-plum/40" />
                      <span className="flex-1 text-plum/50">{label}</span>
                      <span className="font-bold text-plum/80">{value}</span>
                    </div>
                  ))}
                </div>
                <OnboardButton solid onClick={next}>
                  Start a convo
                </OnboardButton>
                <p className="mt-1 text-center text-[6.5px] text-plum/45">
                  One tap and the account is yours.
                </p>
              </>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* --------------------------- CONTACTS ------------------------- *
 * Step two: the contacts permission, the search field, and the people
 * already on Xelvic — which is what "find your people" means in the app.
 */
function ContactsDemo() {
  const people = [
    { name: "Ava Brooks", handle: "@ava.b", src: "/media/walls/sheher.jpg" },
    {
      name: "Tyler Brooks",
      handle: "@tyler_brooks",
      src: "/media/walls/mehfil.jpg",
    },
    { name: "Mia Carter", handle: "@mia.carter", src: "/media/walls/safar.jpg" },
    { name: "Noah Reed", handle: "@noahreed", src: "/media/walls/raat.jpg" },
  ];

  return (
    <div className="flex h-full flex-col bg-[#fbf5f8] text-plum">
      <div className="flex shrink-0 items-center justify-between px-4 pb-1 pt-3.5 text-[8px] font-semibold leading-none text-plum/70">
        <span>9:41</span>
        <span className="flex items-center gap-1 text-plum/50">
          <Signal size={8} />
          <Wifi size={8} />
          <BatteryFull size={9} />
        </span>
      </div>

      <div className="flex shrink-0 items-center gap-2 px-3 pt-1">
        <FaArrowLeft size={13} className="shrink-0 text-plum/75" />
        <span className="text-[13px] font-extrabold tracking-tight">
          Find your people
        </span>
      </div>

      <div className="shrink-0 px-4 pt-2">
        <p className="text-[8px] leading-snug text-plum/55">
          Everyone already on Xelvic shows up right away. Your numbers never
          leave your device in readable form.
        </p>

        <div className="mt-2 rounded-xl border border-[#f2d3e1] bg-[#fdf0f5] p-2.5">
          <span className="grid h-7 w-7 place-items-center rounded-full bg-[#f9d4e4] text-[#d81b60]">
            <UserPlus size={13} />
          </span>
          <p className="mt-1.5 text-[10px] font-extrabold leading-none">
            Allow contacts
          </p>
          <p className="mt-1 text-[7px] leading-snug text-plum/55">
            Xelvic matches the numbers on your phone and shows you the people
            already here.
          </p>
          <button
            type="button"
            className="mt-2 w-full rounded-full bg-[#d81b60] py-1.5 text-[8.5px] font-bold text-pure"
          >
            Allow contacts
          </button>
        </div>

        <div className="mt-2 flex items-center gap-1.5 rounded-full bg-pure px-3 py-1.5 text-[8px] text-plum/40 ring-1 ring-plum/10">
          <Search size={10} className="shrink-0" />
          Search by name or @handle
        </div>

        <div className="mt-2 flex items-center justify-between">
          <p className="text-[10px] font-extrabold leading-none">On Xelvic</p>
          <span className="text-[7px] font-bold text-[#d81b60]">4 found</span>
        </div>
      </div>

      <div className="mt-1.5 min-h-0 flex-1 space-y-1 overflow-hidden px-4">
        {people.map((p) => (
          <div
            key={p.handle}
            className="flex items-center gap-2 rounded-xl bg-pure p-1.5 ring-1 ring-plum/5"
          >
            <span className="h-7 w-7 shrink-0 overflow-hidden rounded-full bg-pink-100">
              <img src={p.src} alt="" className="h-full w-full object-cover" />
            </span>
            <span className="min-w-0 flex-1 leading-tight">
              <span className="block truncate text-[9px] font-bold">
                {p.name}
              </span>
              <span className="block truncate text-[7px] text-plum/45">
                {p.handle}
              </span>
            </span>
            <span className="shrink-0 rounded-full bg-[#fdf0f5] px-2 py-1 text-[7px] font-bold text-[#d81b60]">
              Say hi
            </span>
          </div>
        ))}
      </div>

      <p className="shrink-0 px-4 py-2 text-center text-[6.5px] text-plum/40">
        Prefer to search? Find anyone by name or @handle.
      </p>
    </div>
  );
}

/* ------------------------- MARKETPLACE ------------------------ *
 * Step five opens the place the look is changed — the same Marketplace the
 * Themes & Drip card uses, so the walkthrough and the feature agree.
 */
function MarketplaceDemo() {
  return <ThemeMarketplaceMockup />;
}

const demos: Record<DemoKind, (p: { reduced: boolean }) => JSX.Element> = {
  chat: ChatDemo,
  call: CallDemo,
  moments: MomentsDemo,
  live: LiveDemo,
  audio: AudioDemo,
  drops: DropsDemo,
  onboarding: OnboardingDemo,
  contacts: ContactsDemo,
  marketplace: MarketplaceDemo,
};

export default function PhoneDemo({ kind }: { kind: DemoKind }) {
  const reduced = useReducedMotion();
  const Demo = demos[kind];
  return <Demo reduced={reduced} />;
}
