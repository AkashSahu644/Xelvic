import type { ReactNode } from "react";
import {
  AudioLines,
  BadgeCheck,
  Check,
  ChevronDown,
  ChevronLeft,
  Download,
  Heart,
  LayoutGrid,
  Link2,
  MessageSquare,
  MoreVertical,
  Music2,
  Pause,
  Play,
  Plus,
  Radio,
  Repeat,
  Search,
  Share2,
  Shuffle,
  SkipBack,
  SkipForward,
  Sparkles,
} from "lucide-react";

/**
 * The screens the Audio page draws, one per thing the tab does: the tab you
 * browse, the player a track opens on, a playlist, and the tracks you keep for
 * offline.
 *
 * These are the app's own screens, not an idea of them. The Audio tab is the
 * pale-pink ground with the mark and "Audio" across the top and the four icons
 * beside it, the row of white chips — Trending, Viral, Fresh, Most played — the
 * Trending now covers, and the "Your playlists" tiles underneath. The player is
 * the light one: the artwork with the mint circle behind it, the waveform you
 * can scrub, the pink circle in the middle, Share and Download as pills, and Up
 * next below. A playlist is the cover, the count ("9 tracks · 39:14 · yours"),
 * a pink Play pill, and the tracks in order. The colour, the spacing and the
 * strings are the app's.
 *
 * Two rules hold across all of them:
 *
 *   1. The words are the app's own. A track plays from Trending; Up next queues
 *      what follows; Share and Download sit under the controls. Nothing here
 *      invents a feature the app does not have.
 *   2. Nothing moves. The player is caught part-way through "Piya Aye Na", the
 *      waveform caught where it was left.
 *
 * Anything a screen cannot fit is drawn outside the phone by its escape, in the
 * frame's unclipped layer, and the screen leaves the same place empty so the two
 * read as one screen rather than two drawings.
 */

/** the brand mark the Audio tab carries */
const MARK = "/media/brand/xelvic.png";

/** the faces these screens use */
const FACE_2 = "/media/walls/sheher.jpg";
const FACE_3 = "/media/walls/safar.jpg";
const FACE_4 = "/media/walls/studio.jpg";

/** the covers these screens use */
const ART = "/media/themes/animeblue/audio.jpg";
const ART_2 = "/media/themes/catgirl/audio.jpg";
const ART_3 = "/media/themes/teddy/audio.jpg";
const ART_4 = "/media/themes/alone/audio.jpg";

/* ── the screen's furniture ─────────────────────────────────────────────── */

function AudioScreen({
  children,
  tone = "#fbe9f1",
}: {
  children: ReactNode;
  tone?: string;
}) {
  return (
    <div
      className="relative flex h-full flex-col text-plum"
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

function AudioStatus() {
  return (
    <div className="flex shrink-0 items-end justify-between px-4 pb-2 pt-4 text-[10px] font-semibold leading-none text-plum/70">
      <span>21:04</span>
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
    { icon: Sparkles, label: "Moments" },
    { icon: MessageSquare, label: "Convo", dot: true },
    { icon: AudioLines, label: "Audio" },
    { icon: Radio, label: "Live" },
  ];

  return (
    <div className="mx-3 mb-2 mt-auto flex shrink-0 items-center justify-between rounded-full bg-pure/70 px-3 py-2 backdrop-blur">
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

/** A cover: the artwork when the track has one, and the app's coloured tile
 *  with a music note when it does not. */
function Cover({
  src,
  tone,
  className = "",
  icon = 20,
}: {
  src?: string;
  tone?: string;
  className?: string;
  icon?: number;
}) {
  if (src) {
    return (
      <span className={`block shrink-0 overflow-hidden ${className}`}>
        <img src={src} alt="" className="h-full w-full object-cover" />
      </span>
    );
  }
  return (
    <span
      className={`grid shrink-0 place-items-center ${className}`}
      style={{ background: tone }}
    >
      <Music2 size={icon} className="text-white/85" />
    </span>
  );
}

/* ── the Audio tab ────────────────────────────────────────────────────────
   The tab itself, screen for screen: the mark and the title, the four icons,
   the sub-line, the chips, Trending now, Your playlists, Playlists, and the
   floating tab bar. The first Trending cover is the piece that leaves the
   phone. */

function TrendingCard({
  title,
  artist,
  src,
  avatar,
}: {
  title: string;
  artist: string;
  src: string;
  avatar: string;
}) {
  return (
    <span className="flex w-[74px] shrink-0 flex-col">
      <span className="h-[74px] w-[74px] overflow-hidden rounded-xl">
        <img src={src} alt="" className="h-full w-full object-cover" />
      </span>
      <span className="mt-1 truncate text-[9px] font-bold leading-none">
        {title}
      </span>
      <span className="mt-1 flex items-center gap-1">
        <span className="h-2.5 w-2.5 shrink-0 overflow-hidden rounded-full">
          <img src={avatar} alt="" className="h-full w-full object-cover" />
        </span>
        <span className="truncate text-[7px] leading-none text-plum/50">
          {artist}
        </span>
      </span>
    </span>
  );
}

function PlaylistTile({
  tone,
  title,
  sub,
  plus,
}: {
  tone?: string;
  title: string;
  sub: string;
  plus?: boolean;
}) {
  return (
    <span className="flex w-[84px] shrink-0 flex-col">
      {plus ? (
        <span className="grid h-[74px] w-[74px] place-items-center rounded-xl bg-plum/[0.07] text-plum/40">
          <Plus size={20} />
        </span>
      ) : (
        <Cover
          tone={tone}
          icon={22}
          className="h-[74px] w-[74px] rounded-xl"
        />
      )}
      <span className="mt-1 truncate text-[8.5px] font-bold leading-none">
        {title}
      </span>
      <span className="mt-0.5 truncate text-[7px] leading-none text-plum/45">
        {sub}
      </span>
    </span>
  );
}

function ChartsScreen() {
  return (
    <AudioScreen>
      <AudioStatus />

      <div className="flex items-center gap-2 px-4 pb-1 pt-1">
        <span className="h-8 w-8 shrink-0 overflow-hidden rounded-full ring-2 ring-white">
          <img src={MARK} alt="" className="h-full w-full object-cover" />
        </span>
        <span className="text-[20px] font-extrabold tracking-tight">Audio</span>
        <span className="ml-auto flex items-center gap-3 text-plum/75">
          <Sparkles size={15} />
          <Plus size={16} />
          <Link2 size={14} />
          <Search size={16} />
        </span>
      </div>

      <span className="text-center text-[7.5px] text-plum/45">
        Playlists · Podcasts · Artists · Trending
      </span>

      <div className="mt-2.5 flex gap-1.5 overflow-hidden px-4">
        {["Trending", "Viral", "Fresh", "Most played", "New"].map((c, i) => (
          <span
            key={c}
            className={`shrink-0 rounded-full bg-pure px-2.5 py-1 text-[8px] font-semibold leading-none ${
              i === 0 ? "text-plum" : "text-plum/55"
            }`}
          >
            {c}
          </span>
        ))}
      </div>

      <div className="mt-3 flex items-center justify-between px-4">
        <span className="text-[12px] font-extrabold">Trending now</span>
        <span className="text-[8px] font-semibold text-[#e11d6b]">See all</span>
      </div>

      <div className="mt-1.5 flex items-start gap-2.5 overflow-hidden px-4">
        {/* the escaped cover lands here */}
        <span className="h-[98px] w-[74px] shrink-0" />
        <TrendingCard
          title="Jhol"
          artist="Ashley 😊😊"
          src={ART_2}
          avatar={FACE_3}
        />
        <TrendingCard
          title="BOYFRIEND"
          artist="Emily Rose"
          src={ART_3}
          avatar={FACE_2}
        />
      </div>

      <div className="mt-3 flex items-center justify-between px-4">
        <span className="text-[12px] font-extrabold">Your playlists</span>
        <span className="text-[8px] font-semibold text-[#e11d6b]">See all</span>
      </div>

      <div className="mt-1.5 flex items-start gap-2.5 overflow-hidden px-4">
        <PlaylistTile plus title="New playlist" sub="Start one" />
        <PlaylistTile
          tone="#5b2ea6"
          title="Aankho se tune"
          sub="0 tracks · 0:00 · yours"
        />
        <PlaylistTile tone="#0f6b66" title="Late night" sub="12 tracks" />
      </div>

      <div className="mt-2.5 flex items-center justify-between px-4">
        <span className="text-[12px] font-extrabold">Playlists</span>
      </div>

      <div className="mt-1.5 flex items-start gap-2.5 overflow-hidden px-4">
        <PlaylistTile tone="#0c7a5b" title="Vibes" sub="9 tracks · 39:14" />
        <PlaylistTile tone="#7d1044" title="Drive" sub="14 tracks" />
      </div>

      <TabBar active="Audio" />
    </AudioScreen>
  );
}

function ChartsEscape() {
  return (
    <Breakout top={148} left={-6} width={60}>
      <div className="flex w-[167px] items-center gap-2.5 rounded-2xl bg-pure p-2 shadow-[0_20px_55px_rgba(58,10,36,.35)] ring-1 ring-black/5">
        <span className="h-[96px] w-[96px] shrink-0 overflow-hidden rounded-xl">
          <img src={ART} alt="" className="h-full w-full object-cover" />
        </span>
        <div className="min-w-0 flex-1">
          <span className="block text-[6.5px] font-bold uppercase tracking-[0.14em] text-[#e11d6b]">
            Trending now
          </span>
          <span className="mt-1 block truncate text-[13px] font-bold leading-none">
            Piya Aye Na
          </span>
          <span className="mt-1.5 flex items-center gap-1">
            <span className="h-3 w-3 shrink-0 overflow-hidden rounded-full">
              <img src={FACE_4} alt="" className="h-full w-full object-cover" />
            </span>
            <span className="truncate text-[8px] leading-none text-plum/55">
              TOTUL SARKER
            </span>
          </span>
          <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-[#fce7f0] px-2 py-0.5 text-[7px] font-semibold leading-none text-[#b3134f]">
            Tap to play
          </span>
        </div>
      </div>
    </Breakout>
  );
}

/* ── the player ───────────────────────────────────────────────────────────
   The light player from the app: PLAYING FROM / Trending, the artwork with the
   mint circle behind it, the title and the artist, a waveform, the pink circle
   in the middle, Share and Download, and Up next. The artwork is the piece
   that leaves the phone. */

const WAVE = [
  10, 16, 7, 20, 13, 8, 22, 12, 17, 9, 24, 14, 7, 19, 11, 16, 8, 21, 13, 9,
  18, 12, 23, 15, 8, 19, 11, 17, 9, 22, 14, 10, 18, 12, 20, 8, 15, 11, 19, 13,
];

function QueueRow({
  src,
  tone,
  title,
  artist,
  time,
}: {
  src?: string;
  tone?: string;
  title: string;
  artist: string;
  time: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <Cover src={src} tone={tone} className="h-8 w-8 rounded-lg" icon={13} />
      <div className="min-w-0 flex-1 leading-tight">
        <span className="block truncate text-[9px] font-bold">{title}</span>
        <span className="block truncate text-[7px] text-plum/50">{artist}</span>
      </div>
      <span className="text-[7.5px] text-plum/40">{time}</span>
      <span className="grid h-5 w-5 place-items-center rounded-full border border-plum/25 text-plum/55">
        <Play size={9} />
      </span>
    </div>
  );
}

function PlayerScreen() {
  return (
    <AudioScreen tone="#f4f1f4">
      <AudioStatus />

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

      {/* the escaped artwork lands here */}
      <div className="h-[196px] shrink-0" />

      <div className="mt-1 flex items-start gap-2 px-4">
        <div className="min-w-0 flex-1">
          <span className="block truncate text-[18px] font-extrabold leading-none">
            Piya Aye Na
          </span>
          <span className="mt-1.5 flex items-center gap-1.5">
            <span className="h-3 w-3 shrink-0 overflow-hidden rounded-full">
              <img src={FACE_4} alt="" className="h-full w-full object-cover" />
            </span>
            <span className="truncate text-[7.5px] font-semibold uppercase tracking-[0.08em] text-plum/45">
              Totul Sarker
            </span>
          </span>
        </div>
        <Heart size={17} className="mt-0.5 shrink-0 text-plum/70" />
      </div>

      <div className="mt-3 px-4">
        <div className="relative flex h-10 items-center gap-[2px]">
          {WAVE.map((h, i) => (
            <span
              key={i}
              className={`min-w-0 flex-1 rounded-full ${
                i < 18 ? "bg-[#e91e63]" : "bg-plum/15"
              }`}
              style={{ height: `${Math.round(h * 1.5)}px` }}
            />
          ))}
          <span
            className="pointer-events-none absolute top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#e91e63] ring-2 ring-[#f4f1f4]"
            style={{ left: `${(18 / WAVE.length) * 100}%` }}
          />
        </div>
        <div className="mt-1 flex justify-between text-[7.5px] font-medium text-plum/45">
          <span>1:45</span>
          <span>4:45</span>
        </div>
      </div>

      <div className="mt-2 flex items-center justify-between px-6 text-plum/70">
        <Shuffle size={15} />
        <SkipBack size={19} />
        <span className="grid h-11 w-11 place-items-center rounded-full bg-[#e91e63] text-pure shadow-[0_6px_18px_rgba(233,30,99,.35)]">
          <Pause size={17} fill="currentColor" />
        </span>
        <SkipForward size={19} />
        <Repeat size={15} />
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
        <QueueRow
          src={ART_4}
          title="Saundebaazi"
          artist="TOTUL SARKER"
          time="6:31"
        />
        <QueueRow
          tone="#3b3bd9"
          title="Kya fitoor dur"
          artist="Ashley 😊😊"
          time="4:08"
        />
      </div>
    </AudioScreen>
  );
}

function PlayerEscape() {
  return (
    <Breakout top={64} left={-10} width={120}>
      <div className="relative mx-auto w-[210px]">
        <span className="absolute -right-2 top-4 h-[164px] w-[164px] rounded-full bg-[radial-gradient(circle_at_32%_28%,#dcf6ee,#a9ddcf)]" />
        <span className="relative ml-[7px] block h-[196px] w-[196px] overflow-hidden rounded-[1.4rem] shadow-[0_26px_70px_rgba(58,10,36,.35)] ring-1 ring-black/5">
          <img src={ART} alt="" className="h-full w-full object-cover" />
        </span>
      </div>
    </Breakout>
  );
}

/* ── a playlist ───────────────────────────────────────────────────────────
   My Playlist the way the app opens it: back, title, share and kebab, the
   cover with the count under it and a pink Play pill, then the tracks with
   their durations and their own play buttons. The header is the piece that
   leaves the phone. */

type Track = {
  title: string;
  artist: string;
  time: string;
  src?: string;
  tone?: string;
};

const TRACKS: Track[] = [
  { title: "Jhol", artist: "Ashley 😊😊", src: ART_2, time: "4:38" },
  { title: "Music", artist: "Shahanshah", tone: "#3b3bd9", time: "8:55" },
  {
    title: "Aj mujhe jail bhi jana pada",
    artist: "Emily Rose",
    src: ART_3,
    time: "0:10",
  },
  { title: "Piya Aye Na", artist: "TOTUL SARKER", src: ART, time: "4:45" },
  { title: "Saundebaazi", artist: "TOTUL SARKER", src: ART_4, time: "6:31" },
  {
    title: "Kya fitoor dur",
    artist: "Ashley 😊😊",
    tone: "#5b2ea6",
    time: "4:08",
  },
  { title: "BOYFRIEND", artist: "Emily Rose", tone: "#7d1044", time: "3:12" },
];

function TrackRow({
  title,
  artist,
  src,
  tone,
  time,
}: {
  title: string;
  artist: string;
  src?: string;
  tone?: string;
  time: string;
}) {
  return (
    <div className="flex items-center gap-2.5 py-[7px]">
      <Cover
        src={src}
        tone={tone}
        className="h-[38px] w-[38px] rounded-lg"
        icon={16}
      />
      <div className="min-w-0 flex-1 leading-tight">
        <span className="block truncate text-[10px] font-bold">{title}</span>
        <span className="block truncate text-[8px] text-plum/50">{artist}</span>
      </div>
      <span className="shrink-0 text-[7.5px] text-plum/40">{time}</span>
      <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full border border-plum/25 text-plum/55">
        <Play size={9} />
      </span>
      <MoreVertical size={12} className="shrink-0 text-plum/35" />
    </div>
  );
}

function PlaylistsScreen() {
  return (
    <AudioScreen tone="#f7f4f7">
      <AudioStatus />

      <div className="flex items-center px-3 py-1.5">
        <ChevronLeft size={18} className="shrink-0 text-plum/70" />
        <span className="flex-1 text-center text-[13px] font-bold">
          My Playlist
        </span>
        <Share2 size={14} className="mr-3 shrink-0 text-plum/60" />
        <MoreVertical size={16} className="shrink-0 text-plum/60" />
      </div>

      {/* the escaped header lands here */}
      <div className="h-[104px] shrink-0" />

      <div className="px-4">
        {TRACKS.map((t) => (
          <TrackRow
            key={t.title}
            title={t.title}
            artist={t.artist}
            src={t.src}
            tone={t.tone}
            time={t.time}
          />
        ))}
      </div>
    </AudioScreen>
  );
}

function PlaylistsEscape() {
  return (
    <Breakout top={78} left={-8} width={116}>
      <div className="flex items-center gap-3 rounded-2xl bg-[#f7f4f7] p-3 shadow-[0_20px_55px_rgba(58,10,36,.3)] ring-1 ring-plum/10">
        <span className="h-[62px] w-[62px] shrink-0 overflow-hidden rounded-xl">
          <img src={ART_2} alt="" className="h-full w-full object-cover" />
        </span>
        <div className="min-w-0 flex-1">
          <span className="block truncate text-[13px] font-bold leading-tight">
            My Playlist
          </span>
          <span className="mt-0.5 block text-[8px] leading-none text-plum/50">
            9 tracks · 39:14 · yours
          </span>
          <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-[#e91e63] px-3 py-1 text-[8px] font-bold leading-none text-pure">
            <Play size={8} fill="currentColor" /> Play
          </span>
        </div>
      </div>
    </Breakout>
  );
}

/* ── downloads ────────────────────────────────────────────────────────────
   The download button's other end: the tracks kept on the phone, what each one
   weighs, and the phone they follow you to. The device card leaves the phone. */

const SAVED: Track[] = [
  { title: "Piya Aye Na", artist: "TOTUL SARKER", src: ART, time: "4:45" },
  { title: "Jhol", artist: "Ashley 😊😊", src: ART_2, time: "4:38" },
  { title: "Music", artist: "Shahanshah", tone: "#3b3bd9", time: "8:55" },
  { title: "Saundebaazi", artist: "TOTUL SARKER", src: ART_4, time: "6:31" },
];

function OfflineScreen() {
  return (
    <AudioScreen tone="#f7f4f7">
      <AudioStatus />

      <div className="flex items-center gap-2 px-3 py-1.5">
        <ChevronLeft size={18} className="shrink-0 text-plum/70" />
        <span className="flex-1 text-center text-[13px] font-bold">
          Downloads
        </span>
        <Search size={14} className="shrink-0 text-plum/60" />
      </div>

      {/* the escaped device card lands here */}
      <div className="h-[112px] shrink-0" />

      <div className="mt-1 flex items-center justify-between px-4">
        <span className="text-[10px] font-bold">Saved tracks</span>
        <span className="text-[7.5px] text-plum/40">4 · 312 MB</span>
      </div>

      <div className="mt-1 px-4">
        {SAVED.map((t) => (
          <div key={t.title} className="flex items-center gap-2.5 py-[6px]">
            <Cover
              src={t.src}
              tone={t.tone}
              className="h-[34px] w-[34px] rounded-lg"
              icon={14}
            />
            <div className="min-w-0 flex-1 leading-tight">
              <span className="block truncate text-[9.5px] font-bold">
                {t.title}
              </span>
              <span className="block truncate text-[7.5px] text-plum/50">
                {t.artist}
              </span>
            </div>
            <span className="text-[7px] text-plum/40">{t.time}</span>
            <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#1d9b62]/10 text-[#1d9b62]">
              <Check size={11} />
            </span>
          </div>
        ))}
      </div>

      <p className="mt-2 px-4 text-[7px] leading-relaxed text-plum/40">
        Saved tracks follow you to every phone you sign in on.
      </p>
    </AudioScreen>
  );
}

function OfflineEscape() {
  return (
    <Breakout top={70} left={-8} width={116}>
      <div className="rounded-2xl bg-[#f7f4f7] p-3 shadow-[0_20px_55px_rgba(58,10,36,.3)] ring-1 ring-plum/10">
        <div className="flex items-center gap-2.5">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#1d9b62]/10 text-[#1d9b62]">
            <Download size={15} />
          </span>
          <div className="min-w-0 flex-1 leading-tight">
            <span className="block truncate text-[11px] font-bold">
              Jordan’s iPhone
            </span>
            <span className="mt-0.5 block text-[8px] text-plum/50">
              4 tracks · 312 MB · offline
            </span>
          </div>
          <BadgeCheck size={14} className="shrink-0 text-[#1d9b62]" />
        </div>
        <div className="mt-2.5 flex items-center gap-1.5">
          {[ART, ART_2, ART_3, ART_4].map((src) => (
            <span
              key={src}
              className="h-8 w-8 overflow-hidden rounded-md ring-2 ring-[#f7f4f7]"
              style={{ marginLeft: -10 }}
            >
              <img src={src} alt="" className="h-full w-full object-cover" />
            </span>
          ))}
          <span className="ml-1 text-[8px] text-plum/45">
            ready with no signal
          </span>
        </div>
      </div>
    </Breakout>
  );
}

/* ── the map ────────────────────────────────────────────────────────────── */

const screens: Record<string, () => JSX.Element> = {
  charts: ChartsScreen,
  player: PlayerScreen,
  playlists: PlaylistsScreen,
  offline: OfflineScreen,
};

const escapes: Record<string, () => JSX.Element> = {
  charts: ChartsEscape,
  player: PlayerEscape,
  playlists: PlaylistsEscape,
  offline: OfflineEscape,
};

export function AudioMockup({ id }: { id: string }) {
  const S = screens[id];
  return S ? <S /> : null;
}

export function AudioEscape({ id }: { id: string }) {
  const E = escapes[id];
  return E ? <E /> : null;
}
