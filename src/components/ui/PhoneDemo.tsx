import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone,
  Video,
  VideoOff,
  Mic,
  Volume2,
  UserPlus,
  ChevronDown,
  Camera,
  Radio,
  Heart,
  Send,
  MoreVertical,
  ChevronLeft,
  BadgeCheck,
  Lock,
  Plus,
  Pause,
  Upload,
  X,
  Play,
  Ellipsis,
  Share2,
  LayoutGrid,
  Sparkles,
  MessageSquare,
  AudioLines,
  Bookmark,
  Flame,
} from "lucide-react";
import { FaArrowLeft } from "react-icons/fa6";
import { MdVerified } from "react-icons/md";
import { FiPlusCircle } from "react-icons/fi";
import { useReducedMotion } from "../../hooks/useReducedMotion";

export type DemoKind = "chat" | "call" | "moments" | "live" | "audio" | "drops";
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
    { kind: "image", image: "/media/char/typing.png", size: "162 KB", time: "11:57" },
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
    { kind: "image", image: "/media/char/typing.png", size: "162 KB", time: "09:12" },
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
    { kind: "image", image: "/media/char/typing.png", size: "162 KB", time: "20:40" },
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
                  className="flex items-center gap-1.5 self-center rounded-full border border-plum/10 bg-pure px-3.5 py-1 text-[11px] font-semibold text-plum/55 shadow-[0_1px_3px_rgba(58,10,36,.05)]"
                >
                  <Lock size={11} className="text-plum/45" />
                  {m.text}
                </motion.div>
              );
            if (m.kind === "date")
              return (
                <motion.div
                  key={`${convo}-${idx}`}
                  layout
                  {...bubbleMotion}
                  className="self-center rounded-full border border-plum/10 bg-pure px-2.5 py-1 text-[11px] font-semibold text-plum/55 shadow-[0_1px_3px_rgba(58,10,36,.05)]"
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
                <span className="mb-1 mr-1 text-[9px] text-plum/40">{m.time}</span>
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
        <motion.div
          className="pointer-events-none absolute inset-x-0 -bottom-2 z-10 flex justify-center"
        >
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
        <div className="flex-1 truncate rounded-full bg-pure px-3 border py-2 text-[12px]">
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
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
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
  return (
    <div className="relative h-full bg-black text-pure">
      <AnimatePresence mode="popLayout">
        <motion.img
          key={idx}
          src={m.src}
          alt=""
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </AnimatePresence>

      {/* scrims top & bottom for legibility */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/70 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/80 to-transparent" />

      {/* top: progress segments + poster header */}
      <div className="absolute inset-x-0 top-0 z-10 px-3 pt-3">
        <div className="flex gap-1">
          {moments.map((_, i) => (
            <span
              key={i}
              className="h-[3px] flex-1 overflow-hidden rounded-full bg-pure/30"
            >
              <motion.span
                className="block h-full bg-pure"
                initial={{ width: "0%" }}
                animate={{ width: i < idx ? "100%" : i === idx ? "100%" : "0%" }}
                transition={{ duration: i === idx && !reduced ? 3.1 : 0 }}
              />
            </span>
          ))}
        </div>

        <div className="mt-3 flex items-center gap-2.5">
          <span className="h-8 w-8 shrink-0 overflow-hidden rounded-full ring-2 ring-pure/40">
            <img
              src="/media/walls/mehfil.jpg"
              alt=""
              className="h-full w-full object-cover"
            />
          </span>
          <div className="min-w-0 flex-1 leading-tight">
            <span className="flex items-center gap-1">
              <span className="text-sm font-bold">Hifza</span>
              <BadgeCheck size={13} className="shrink-0 text-[#1d9bf0]" />
            </span>
            <span className="block text-[10px] text-pure/70">
              2 moments · 4 hr ago
            </span>
          </div>
          <Pause size={16} className="shrink-0 text-pure" />
          <Upload size={15} className="shrink-0 text-pure" />
          <X size={17} className="shrink-0 text-pure" />
        </div>
      </div>

      {/* centred caption, laid over the photo */}
      <div className="absolute inset-0 z-10 flex items-center justify-center px-6">
        <AnimatePresence mode="wait">
          <motion.p
            key={idx}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center font-display text-xl font-semibold text-pure drop-shadow-[0_2px_8px_rgba(0,0,0,.6)]"
          >
            {m.caption}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* bottom: like + reply bar */}
      <div className="absolute inset-x-0 bottom-0 z-10 px-3 pb-4">
        <div className="mb-3 flex justify-end pr-1">
          <Heart size={20} className="text-pure" />
        </div>
        <div className="flex items-center gap-2">
          <div className="flex-1 rounded-full border border-pure/40 px-4 py-2.5 text-[11px] text-pure/60">
            Reply…
          </div>
          <Send size={18} className="shrink-0 text-pure" />
        </div>
      </div>
    </div>
  );
}

/* ---------------------------- LIVE ---------------------------- */
const liveComments = [
  "🔥🔥",
  "joined!",
  "play that again",
  "hiii",
  "👏👏",
  "lets gooo",
];
function LiveDemo({ reduced }: { reduced: boolean }) {
  const [feed, setFeed] = useState<{ id: number; who: string; text: string }[]>(
    [],
  );
  const n = useRef(0);
  useEffect(() => {
    if (reduced) return;
    const t = setInterval(() => {
      n.current += 1;
      setFeed((f) =>
        [
          ...f,
          {
            id: n.current,
            who: ["maya", "devon", "ria", "sam"][n.current % 4],
            text: liveComments[n.current % liveComments.length],
          },
        ].slice(-4),
      );
    }, 1300);
    return () => clearInterval(t);
  }, [reduced]);
  return (
    <div className="relative h-full bg-[#1c0614] text-pure">
      <img
        src="/media/themes/catgirl/audio.jpg"
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-80"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-plum/60 via-transparent to-plum/90" />
      <div className="relative z-10 flex items-center gap-2 px-3 pt-10">
        <span className="flex items-center gap-1 rounded-full bg-[#e11d6b] px-2 py-0.5 text-[10px] font-bold text-pure">
          <Radio size={11} /> LIVE
        </span>
        <span className="rounded-full bg-plum/60 px-2 py-0.5 text-[10px] text-pure/80">
          1.2k watching
        </span>
      </div>
      <div className="absolute bottom-16 left-0 right-0 z-10 space-y-1.5 px-3">
        <AnimatePresence initial={false}>
          {feed.map((c) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className="text-[11px]"
            >
              <span className="font-bold text-[#ff9ecb]">{c.who}</span>{" "}
              <span className="text-pure/85">{c.text}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <div className="absolute bottom-0 left-0 right-0 z-10 flex items-center gap-2 p-3">
        <div className="flex-1 rounded-full border border-pure/30 px-3 py-1.5 text-[11px] text-pure/60">
          Say something…
        </div>
        <span className="grid h-9 w-9 place-items-center rounded-full bg-pure/15 text-pure">
          <Camera size={16} />
        </span>
      </div>
    </div>
  );
}

/* ---------------------------- AUDIO --------------------------- */
function AudioDemo({ reduced }: { reduced: boolean }) {
  return (
    <div className="relative flex h-full flex-col bg-gradient-to-b from-[#2e0b22] to-[#1c0614] text-pure">
      <StatusBar title="" />
      <div className="flex flex-1 flex-col items-center justify-center px-6">
        <img
          src="/media/themes/animeblue/audio.jpg"
          alt=""
          className="h-40 w-40 rounded-2xl object-cover shadow-glow"
        />
        <p className="mt-5 text-sm font-bold">Night Drive</p>
        <p className="text-[11px] text-pure/55">Xelvic Sounds</p>
        {/* equalizer */}
        <div className="mt-6 flex h-10 items-end gap-1">
          {Array.from({ length: 22 }).map((_, i) => (
            <motion.span
              key={i}
              className="w-1 rounded-full bg-brand-grad"
              style={{ transformOrigin: "bottom" }}
              animate={
                reduced ? { scaleY: 0.5 } : { scaleY: [0.3, 1, 0.4, 0.9, 0.3] }
              }
              transition={{
                duration: 1 + (i % 5) * 0.2,
                repeat: Infinity,
                delay: i * 0.05,
              }}
            />
          ))}
        </div>
        <div className="mt-6 h-1 w-full overflow-hidden rounded-full bg-pure/15">
          <motion.div
            className="h-full bg-brand-grad"
            animate={reduced ? { width: "45%" } : { width: ["0%", "100%"] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
        </div>
      </div>
    </div>
  );
}

/* ---------------------------- DROPS --------------------------- *
 * The Drops feed, matching the real app: a "xelvic" top bar, a "Vibe"
 * rail of reels (avatar + play count + name), a "For you" photo Drop
 * with its like / comment / share / save counts, and the floating
 * five-tab bar (Drops active). */
const vibes = [
  { src: "/media/themes/animeblue/drops.jpg", n: 3 },
  { src: "/media/themes/catgirl/drops.jpg", n: 10 },
  { src: "/media/themes/teddy/drops.jpg", n: 5 },
  { src: "/media/themes/animeblue/moments.jpg", n: 12 },
];

const dropTabs = [
  { icon: LayoutGrid, label: "Drops", active: true },
  { icon: Sparkles, label: "Moments", active: false },
  { icon: MessageSquare, label: "Convo", active: false },
  { icon: AudioLines, label: "Audio", active: false },
  { icon: Radio, label: "Live", active: false },
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
      <div className="flex items-center justify-between px-4 pt-4 pb-1 text-[11px] font-semibold text-plum/75">
        <span>3:43</span>
        <span className="flex items-center gap-1 text-plum/55">
          <span className="h-2 w-3 rounded-[2px] border border-plum/40" />
          <span>5G</span>
        </span>
      </div>

      {/* top bar */}
      <div className="flex items-center gap-2 px-3 py-1.5">
        {/* The plum disc was there to frame a wordmark file. The mark is its
            own plate now, so it sits on the bar at the size it was drawn for
            rather than shrunk inside a circle. */}
        <img
          src="/media/brand/xelvic.png"
          alt=""
          className="h-8 w-8 shrink-0 rounded-[22%] object-contain"
        />
        <span className="font-display text-lg font-extrabold lowercase text-plum">
          xelvic
        </span>
        <Plus size={20} className="ml-auto text-plum" />
      </div>

      {/* Vibe rail */}
      <div className="px-3 pt-1">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-bold text-plum">Vibe</h4>
          <span className="text-xs font-bold text-pink-600">See all</span>
        </div>
        <div className="mt-2 flex gap-2 overflow-hidden">
          {vibes.map((v) => (
            <div key={v.src} className="w-[22%] shrink-0">
              <div className="relative aspect-[9/15] overflow-hidden border rounded-xl bg-plum">
                <img src={v.src} alt="" className="h-full w-full object-cover" />
                <span className="absolute left-1 top-1 h-5 w-5 overflow-hidden rounded-full ring-2 ring-pure/70">
                  <img
                    src="/media/walls/mehfil.jpg"
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </span>
                <span className="absolute bottom-1 left-1 flex items-center gap-0.5 text-[8px] font-semibold text-pure drop-shadow">
                  <Play size={8} className="fill-pure" />
                  {v.n}
                </span>
              </div>
              <p className="mt-1 flex items-center gap-0.5 text-[9px] font-semibold text-plum">
                Arjun
                <BadgeCheck size={9} className="shrink-0 text-[#1d9bf0]" />
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* For you — one Drop */}
      <div className="mt-2 px-3">
        <h4 className="text-sm font-bold text-plum">For you</h4>
        <div className="mt-4 flex items-center gap-2">
          <span className="h-8 w-8 shrink-0 overflow-hidden rounded-full p-[1.5px] ring-2 ring-pink-500">
            <img
              src="/media/walls/mehfil.jpg"
              alt=""
              className="h-full w-full rounded-full object-cover"
            />
          </span>
          <div className="min-w-0 flex-1 leading-tight">
            <span className="flex items-center gap-1">
              <span className="text-sm font-bold text-plum">Hifza</span>
              <BadgeCheck size={12} className="shrink-0 text-[#1d9bf0]" />
            </span>
            <span className="block text-[10px] text-plum/50">6d · 🌐</span>
          </div>
          <Ellipsis size={16} className="shrink-0 text-plum/50" />
        </div>
      </div>

      {/* the photo fills the rest */}
      <div className="relative mt-2 flex-1 overflow-hidden bg-plum">
        <img
          src="/media/themes/catgirl/moment.jpg"
          alt=""
          className="h-full w-full object-cover"
        />
      </div>

      {/* like / comment / share / save */}
      <div className="flex items-center gap-4 px-3 py-2 pb-20 text-[12px] font-semibold text-plum/70">
        <span className="flex items-center gap-1">
          <Heart
            size={17}
            className={liked ? "fill-[#ff2d78] text-[#ff2d78]" : "text-plum/70"}
          />
          {11 + (liked ? 1 : 0)}
        </span>
        <span className="flex items-center gap-1">
          <MessageSquare size={16} />6
        </span>
        <span className="flex items-center gap-1">
          <Share2 size={16} />5
        </span>
        <Bookmark size={16} className="ml-auto" />
      </div>

      {/* floating tab bar */}
      <div className="absolute inset-x-3 bottom-3 z-10 flex items-stretch justify-between rounded-full bg-plum/70 px-1.5 py-2 backdrop-blur-md">
        {dropTabs.map((t) => {
          const Icon = t.icon;
          return (
            <div
              key={t.label}
              className={`flex flex-1 flex-col items-center gap-0.5 ${
                t.active ? "text-[#ff6fae]" : "text-pure/75"
              }`}
            >
              <Icon size={16} />
              <span className="text-[8px] font-semibold">{t.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* --------------------------- CONVO ---------------------------- *
 * A one-to-one thread with the app's newer in-chat touches: the spark
 * rides along the top of the thread, and anything shared into the
 * convo — a Vibe, a photo Drop, a track — carries its own feel/note row, so
 * you react and answer without ever leaving the chat. The heart fills on its
 * own, the way a real tap looks from the other side. */
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
    }
  /** the reader taps the heart on post #on (0-based, counted among posts) */
  | { kind: "like"; on: number }
  /** a note left on post #on — it stays on that post instead of floating loose */
  | { kind: "note"; on: number; quote: string; text: string }
  /** a Spark — a photo that goes for good the moment it has been opened */
  | { kind: "spark"; mine: boolean; src: string; meta: string }
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
  },
  { kind: "note", on: 1, quote: "Night Drive", text: "adding it to the road-trip list" },
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
  },
  // a Spark goes the other way round from everything above: it is sent rather
  // than posted, and it does not keep — "This Spark is gone." once it is opened
  { kind: "spark", mine: true, src: "/media/themes/teddy/moments.jpg", meta: "Goes once it is opened" },
  { kind: "them", text: "a Spark?? okay okay 👀" },
  { kind: "spark", mine: false, src: "/media/themes/alone/moments.jpg", meta: "Tap to open" },
  { kind: "openSpark" },
];

function PostCard({
  type,
  src,
  title,
  meta,
  likes,
  comments,
  liked,
  note,
}: {
  type: ConvoPostKind;
  src: string;
  title: string;
  meta: string;
  likes: number;
  comments: number;
  liked: boolean;
  /** a note left on this post — it renders here, on the post, not in the thread */
  note?: { quote: string; text: string } | null;
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
            <span className="block truncate text-[11px] font-bold">{title}</span>
            <span className="block truncate text-[9px] text-plum/50">{meta}</span>
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
          <p className="truncate px-2.5 pt-1.5 text-[11px] font-bold">{title}</p>
        </>
      )}

      {/* feel / note live on the post itself — inside the convo */}
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
              className={liked ? "fill-[#ff2d78] text-[#ff2d78]" : "text-plum/60"}
            />
          </motion.span>
          {likes + (liked ? 1 : 0)}
        </span>
        <span className="flex items-center gap-1">
          <MessageSquare size={11} />
          {comments + (note ? 1 : 0)}
        </span>
        <span className="ml-auto text-[9px] font-bold text-pink-600">Add a note</span>
      </div>

      {/* the note stays on the post it is about, the way the app keeps it —
          so leaving one never means losing your place in the thread */}
      {note && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="overflow-hidden border-t border-plum/10 bg-[#fff3f8]"
        >
          <div className="px-2.5 py-1.5">
            <span className="flex items-center gap-1 text-[8px] font-semibold text-plum/45">
              <MessageSquare size={8} />
              <span className="truncate">Your note on {note.quote}</span>
            </span>
            <span className="mt-0.5 block text-[11px] font-bold leading-snug">
              {note.text}
            </span>
          </div>
        </motion.div>
      )}
    </div>
  );
}

/**
 * A Spark. The one thing in the app that is *sent* rather than posted, and the
 * one thing that does not keep: it is there until somebody opens it, and then
 * "This Spark is gone." So the card shows the state rather than the picture —
 * waiting to be opened, or already spent.
 */
function SparkCard({
  src,
  meta,
  mine,
  gone,
}: {
  src: string;
  meta: string;
  mine: boolean;
  gone: boolean;
}) {
  // only the Spark that was sent to me can be opened, so only that one goes
  const spent = gone && !mine;
  return (
    <div className="w-[164px] overflow-hidden rounded-2xl bg-pure text-plum shadow-[0_3px_12px_rgba(58,10,36,.12)] ring-1 ring-plum/10">
      <div className="relative aspect-[4/5] bg-plum">
        <img
          src={src}
          alt=""
          className={`h-full w-full object-cover transition-all duration-500 ${
            spent ? "scale-110 opacity-20 blur-[3px]" : ""
          }`}
        />
        <span className="absolute left-1.5 top-1.5 flex items-center gap-1 rounded-full bg-[#ff5a1f] px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wide text-pure">
          <Flame size={8} />
          Spark
        </span>

        {/* the state is the whole point of a Spark, so it sits over the picture */}
        {!mine && (
          <span className="absolute inset-0 grid place-items-center px-3">
            <motion.span
              key={spent ? "gone" : "waiting"}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="rounded-xl bg-black/60 px-2.5 py-1.5 text-center text-[10px] font-bold leading-snug text-pure backdrop-blur-sm"
            >
              {spent ? "This Spark is gone." : "A Spark for you"}
            </motion.span>
          </span>
        )}

        <span className="absolute bottom-1.5 right-1.5 rounded bg-black/55 px-1.5 py-0.5 text-[8px] font-semibold text-pure">
          {spent ? "Gone" : meta}
        </span>
      </div>

      <div className="flex items-center gap-1.5 border-t border-plum/10 px-2.5 py-1.5 text-[9px] font-bold">
        <Flame size={10} className="shrink-0 text-[#ff5a1f]" />
        <span className="truncate text-plum/60">
          {mine ? "Your Spark" : spent ? "Opened" : "Not opened yet"}
        </span>
        <span className="ml-auto shrink-0 text-pink-600">
          {mine ? "Keep a Spark here" : spent ? "Send one back" : "Tap to open"}
        </span>
      </div>
    </div>
  );
}

/**
 * The convo screen: a one-to-one thread with the app's newer in-chat touches —
 * anything shared into the convo carries its own feel/note row, so you react
 * and answer without ever leaving the chat, and a Spark can be sent and spent
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
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [liked, setLiked] = useState<number[]>(reduced ? [0] : []);
  // a Spark is only there until it is opened — then it is gone, for both sides
  const [sparkOpened, setSparkOpened] = useState(reduced);
  // the composer's Spark button lights while one is going out
  const [sparkPulse, setSparkPulse] = useState(false);
  // the app answers a tap with a line of its own — "Felt. Tap to take it back.",
  // "Note up." — so the demo shows the same confirmation at the same moment
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    // With motion off there is no timeline to run, so land on the finished
    // thread: the screen still says what it is for, and the count still goes
    // out so a caller's annotations settle with it.
    if (reduced) {
      setDraft("");
      setTyping(false);
      setReplyTo(null);
      setLiked([0]);
      setSparkOpened(true);
      setSparkPulse(false);
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
    const step = () => {
      if (!alive) return;
      if (i >= convoScript.length) {
        // hold the finished thread, then start the story over
        wait(3400, () => {
          i = 1;
          setCount(1);
          setDraft("");
          setReplyTo(null);
          setLiked([]);
          setTyping(false);
          setSparkOpened(false);
          setSparkPulse(false);
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
      } else if (line.kind === "note") {
        // the composer strip names the post being noted; the note itself then
        // lands on that post, so the strip always has something to point at
        setReplyTo(line.quote);
        compose(line.text, () => {
          setDraft("");
          setReplyTo(null);
          // the app confirms a note the same way it confirms a feel
          setToast("Note up.");
          wait(2400, () => setToast(null));
          i += 1;
          setCount(i);
          wait(950, step);
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
        // sending one lights the button in the composer first, so the thread
        // shows where a Spark comes from as well as what it looks like
        if (line.mine) {
          setSparkPulse(true);
          wait(780, () => setSparkPulse(false));
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
  // Notes address the post they were left on, so they render inside that card
  // rather than as a bubble of their own — the same place the app keeps them.
  const notes: Record<number, { quote: string; text: string }> = {};
  shown.forEach((m) => {
    if (m.kind === "note") notes[m.on] = { quote: m.quote, text: m.text };
  });
  // A day two people talk on is one spark, and it does not matter who of you
  // sent first — John has already spoken here, so it ticks over the moment "I"
  // do. The count itself lives on the convo's own screen, though, not here.

  return (
    <div className="flex h-full flex-col bg-[#f1eff5] text-plum">
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
          <img src="/media/walls/mehfil.jpg" alt="" className="h-full w-full object-cover" />
        </span>
        <span className="flex min-w-0 flex-1 items-center gap-1">
          <span className="truncate text-[15px] font-bold">John</span>
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
                  key={idx}
                  layout
                  {...bubbleMotion}
                  className="flex items-center gap-1.5 self-center rounded-full border border-plum/10 bg-pure px-3.5 py-1 text-[11px] font-semibold text-plum/55 shadow-[0_1px_3px_rgba(58,10,36,.05)]"
                >
                  <Lock size={11} className="text-plum/45" />
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
            if (m.kind === "like" || m.kind === "note" || m.kind === "openSpark")
              return null; // an action on something already in the thread
            if (m.kind === "spark")
              return (
                <motion.div
                  key={idx}
                  layout
                  {...bubbleMotion}
                  className={`w-fit ${m.mine ? "self-end" : "self-start"}`}
                >
                  <SparkCard src={m.src} meta={m.meta} mine={m.mine} gone={sparkOpened} />
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
                  comments={m.comments}
                  liked={liked.includes(postN)}
                  note={notes[postN] ?? null}
                />
              </motion.div>
            );
          })}

          {typing && (
            <motion.div
              key="typing"
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex w-fit items-center gap-1 self-start rounded-[20px] rounded-bl-md bg-pure px-3 py-2 shadow-[0_2px_8px_rgba(58,10,36,.05)]"
            >
              {[0, 1, 2].map((d) => (
                <motion.span
                  key={d}
                  className="h-1.5 w-1.5 rounded-full bg-plum/35"
                  animate={{ opacity: [0.3, 1, 0.3], y: [0, -2, 0] }}
                  transition={{ duration: 0.9, repeat: Infinity, delay: d * 0.15 }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

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
              className="pointer-events-none absolute inset-x-0 bottom-2 z-10 mx-auto w-fit max-w-[92%] truncate rounded-full bg-plum/90 px-3 py-1.5 text-[10px] font-semibold text-pure shadow-[0_4px_14px_rgba(58,10,36,.25)]"
            >
              {toast}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* composer — carries the note strip while a note is being written */}
      <div className="border-t border-plum/10 px-2 pb-2 pt-1.5">
        {replyTo && (
          <div className="mb-1 flex items-center gap-1.5 rounded-lg border-l-2 border-pink-500 bg-pure px-2 py-1">
            <MessageSquare size={9} className="shrink-0 text-plum/45" />
            <span className="truncate text-[9px] font-semibold text-plum/60">
              Note on {replyTo}
            </span>
          </div>
        )}
        <div className="flex items-center gap-1">
          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-plum/25 text-plum/50">
            <FiPlusCircle size={16} />
          </span>
          {/* a Spark goes out from here — the button lights while one is being sent */}
          <motion.span
            animate={sparkPulse ? { scale: [1, 1.3, 1] } : { scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border transition-colors duration-300 ${
              sparkPulse
                ? "border-[#ff5a1f] bg-[#ff5a1f] text-pure"
                : "border-[#ff5a1f]/50 text-[#ff5a1f]"
            }`}
          >
            <Flame size={15} />
          </motion.span>
          <div className="flex-1 truncate rounded-full border border-plum/15 bg-pure px-2.5 py-1.5 text-[12px]">
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
    </div>
  );
}

const demos: Record<DemoKind, (p: { reduced: boolean }) => JSX.Element> = {
  chat: ChatDemo,
  call: CallDemo,
  moments: MomentsDemo,
  live: LiveDemo,
  audio: AudioDemo,
  drops: DropsDemo,
};

export default function PhoneDemo({ kind }: { kind: DemoKind }) {
  const reduced = useReducedMotion();
  const Demo = demos[kind];
  return <Demo reduced={reduced} />;
}

