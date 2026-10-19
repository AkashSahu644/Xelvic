import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  BatteryFull,
  Check,
  RefreshCw,
  Signal,
  Sun,
  Wifi,
  Zap,
} from "lucide-react";
import { themePacks } from "../../data/themes";
/**
 * The Marketplace screen, drawn from the app: Drip (the figures) and Themes
 * (the looks and the colour mixer) are the two shelves behind one header.
 *
 * It replaces the chat demo on the Themes & Drip card, because a conversation
 * was showing what the feature changes rather than the place you change it.
 * The tabs are live — tap Drip or Themes — and the phone opens on Themes.
 */

type Tab = "drip" | "themes";

/** The four looks the app shows first in Light mode, with their app prices. */
const SHOWCASE: { slug: string; price?: string }[] = [
  { slug: "pink" },
  { slug: "teddy", price: "0" },
  { slug: "animeblue", price: "15,000" },
  { slug: "alone", price: "15,000" },
];

const SWATCHES: { name: string; colour: string; active?: boolean }[] = [
  { name: "Pink", colour: "#ec4899", active: true },
  { name: "Red", colour: "#c62828" },
  { name: "Yellow", colour: "#b8860b" },
  { name: "Green", colour: "#2e7d32" },
  { name: "Teal", colour: "#0d7c86" },
  { name: "Blue", colour: "#1565c0" },
  { name: "Violet", colour: "#6a1b9a" },
  { name: "Slate", colour: "#37474f" },
];

const SHELF = [
  { name: "Classic", src: "/media/char/typing.png", price: "Free" },
  { name: "Kitsune", src: "/media/themes/kitsune/typing.png", price: "250" },
  { name: "Catgirl", src: "/media/themes/catgirl/typing.png", price: "250" },
  { name: "Teddy", src: "/media/themes/teddy/typing.png", price: "250" },
];

const themeBySlug = new Map(themePacks.map((t) => [t.slug, t] as const));

function StatusRow() {
  return (
    <div className="flex shrink-0 items-end justify-between px-3 pb-1 pt-4 text-[8px] font-semibold leading-none text-plum/60">
      <span>4:12</span>
      <span className="flex items-center gap-1 text-plum/45">
        <Signal size={8} />
        <Wifi size={8} />
        <BatteryFull size={9} />
      </span>
    </div>
  );
}

function Price({ value }: { value: string }) {
  return (
    <span className="inline-flex items-center gap-0.5 rounded-full bg-plum/55 px-1.5 py-[3px] text-[6.5px] font-bold leading-none text-pure backdrop-blur">
      <Zap size={7} className="fill-current" />
      {value}
    </span>
  );
}

function DripPanel() {
  return (
    <div className="px-3 pb-3">
      {/* the figure you start with */}
      <div className="overflow-hidden rounded-2xl border border-plum/10 bg-pure shadow-[0_10px_24px_-18px_rgba(58,10,36,.45)]">
        <div className="grid h-[104px] place-items-center bg-[#fdf0f5]">
          <img
            src="/media/char/wait.png"
            alt="Classic"
            className="h-[86px] w-auto object-contain"
          />
        </div>
        <div className="p-2.5">
          <p className="text-[6.5px] font-bold uppercase tracking-[0.16em] text-plum/35">
            The default
          </p>
          <p className="mt-0.5 text-[13px] font-extrabold leading-none">
            Classic
          </p>
          <p className="mt-1.5 text-[7.5px] leading-relaxed text-plum/55">
            The figure the app has always had. Until you pick one here, your
            theme&apos;s character is the one that stands in your convos.
          </p>
        </div>
      </div>

      <p className="mt-3 text-[11px] font-extrabold leading-none">The shelf</p>
      <p className="mt-1 text-[7.5px] leading-snug text-plum/50">
        Every figure is two pictures — one waiting, one typing.
      </p>

      <div className="mt-2 grid grid-cols-2 gap-2">
        {SHELF.map((f) => (
          <div
            key={f.name}
            className="overflow-hidden rounded-xl border border-plum/10 bg-pure"
          >
            <div className="grid h-[72px] place-items-center bg-[#fdf0f5]">
              <img
                src={f.src}
                alt={f.name}
                className="h-[62px] w-auto object-contain"
                loading="lazy"
              />
            </div>
            <div className="px-2 py-1.5">
              <p className="truncate text-[8.5px] font-extrabold leading-none">
                {f.name}
              </p>
              <span
                className={`mt-1 inline-flex rounded-full px-1.5 py-[3px] text-[6.5px] font-bold leading-none ${
                  f.price === "Free"
                    ? "bg-[#e7f5ec] text-[#1d7a46]"
                    : "bg-pink-50 text-pink-600"
                }`}
              >
                {f.price}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ThemesPanel() {
  return (
    <div className="px-3 pb-3">
      <div className="flex items-center justify-between">
        <span className="text-[9.5px] font-extrabold">Mode</span>
        <span className="flex items-center gap-1.5 rounded-full border border-plum/10 bg-pure px-2.5 py-1 text-[8px] font-bold">
          <Sun size={9} className="text-pink-500" />
          Light
          <RefreshCw size={8} className="text-plum/35" />
        </span>
      </div>

      <div className="mt-2 grid grid-cols-3 gap-2">
        {SHOWCASE.map(({ slug, price }) => {
          const theme = themeBySlug.get(slug);
          if (!theme) return null;
          return (
            <div
              key={slug}
              className="relative aspect-[2/3] overflow-hidden rounded-xl bg-pink-100"
            >
              <img
                src={theme.coverLight ?? theme.cover}
                alt={`${theme.name} theme`}
                className="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
              />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-plum/65 via-plum/20 to-transparent px-1.5 pb-1 pt-4 text-[8px] font-extrabold leading-none text-pure">
                {theme.name}
              </span>
              {price && (
                <span className="absolute right-1.5 top-1.5">
                  <Price value={price} />
                </span>
              )}
            </div>
          );
        })}
      </div>

      <p className="mt-3 text-[9.5px] font-extrabold leading-none">
        Mix your own{" "}
        <span className="font-semibold text-plum/40">
          free, and always has been
        </span>
      </p>

      <div className="mt-1.5 rounded-2xl border border-plum/10 bg-pure p-2.5">
        <div className="grid grid-cols-2 gap-1 rounded-xl bg-[#f1ebef] p-1">
          <span className="rounded-lg bg-pure py-1.5 text-center text-[7.5px] font-bold shadow-sm">
            One colour
          </span>
          <span className="py-1.5 text-center text-[7.5px] font-semibold text-plum/40">
            Mix up to 3
          </span>
        </div>

        <div className="mt-2.5 grid grid-cols-4 gap-y-2">
          {SWATCHES.map((s) => (
            <div key={s.name} className="flex flex-col items-center gap-1">
              <span
                className={`grid h-[22px] w-[22px] place-items-center rounded-full ${
                  s.active ? "ring-2 ring-pink-500 ring-offset-1" : "border border-plum/10"
                }`}
                style={{ background: s.colour }}
              >
                {s.active && <Check size={11} className="text-pure" />}
              </span>
              <span
                className={`text-[6.5px] leading-none ${
                  s.active ? "font-bold text-plum" : "text-plum/50"
                }`}
              >
                {s.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      <p className="mt-2 text-[7px] leading-relaxed text-plum/40">
        Every page of the app — but not inside a chat, which keeps its own
        colour.
      </p>
    </div>
  );
}

export default function ThemeMarketplaceMockup() {
  const [tab, setTab] = useState<Tab>("themes");

  const tabs: { key: Tab | "logos"; label: string }[] = [
    { key: "drip", label: "Drip" },
    { key: "themes", label: "Themes" },
    { key: "logos", label: "Logos" },
  ];

  return (
    <div className="flex h-full flex-col bg-[#fbf7fa] text-plum">
      <StatusRow />

      <div className="flex shrink-0 items-center gap-2 px-3 pb-1.5">
        <ArrowLeft size={16} className="shrink-0 text-plum/75" />
        <span className="flex-1 text-[13px] font-extrabold tracking-tight">
          Marketplace
        </span>
        <span className="inline-flex items-center gap-1 rounded-full bg-pink-50 px-2 py-1 text-[8px] font-extrabold leading-none text-pink-600">
          <Zap size={9} className="fill-current" />
          25
        </span>
      </div>

      <div className="grid shrink-0 grid-cols-3 border-b border-plum/10">
        {tabs.map((t) => {
          const live = t.key !== "logos";
          const active = live && t.key === tab;
          return (
            <button
              key={t.key}
              type="button"
              disabled={!live}
              onClick={() => {
                if (t.key !== "logos") setTab(t.key);
              }}
              aria-pressed={active}
              className={`relative py-2 text-[9px] font-bold leading-none transition-colors ${
                active
                  ? "text-plum"
                  : live
                    ? "text-plum/40"
                    : "cursor-default text-plum/30"
              }`}
            >
              {t.label}
              {active && (
                <span className="absolute bottom-0 left-1/2 h-[2px] w-7 -translate-x-1/2 rounded-full bg-pink-500" />
              )}
            </button>
          );
        })}
      </div>

      <div className="relative flex-1 overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.22 }}
            className="h-full overflow-y-auto pt-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {tab === "themes" ? <ThemesPanel /> : <DripPanel />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
