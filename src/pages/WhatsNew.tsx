import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Reveal from "../components/ui/Reveal";
import NewMockup, {
  NewMockupEscape,
  type NewTab,
} from "../components/ui/NewMockups";
import {
  ConvoBeats,
  ConvoPhone,
  useConvoStory,
} from "../components/ui/ConvoStory";
import MockupBlock from "../components/sections/MockupBlock";
import MagneticButton from "../components/ui/MagneticButton";
import { CTABand } from "../components/sections/Bands";
import { newInXelvic, type NewInXelvic } from "../data/whatsNew";
import { useSEO } from "../hooks/usePageMeta";

/**
 * One new thing, in full. The layout itself lives in `MockupBlock`, which the
 * messaging page uses too — all this adds is which screen this entry drew and
 * the one piece of state that screen has.
 */
function NewBlock({ item, flip }: { item: NewInXelvic; flip: boolean }) {
  /**
   * The Comments/Notes sheet is the one screen here you can work. Its tabs sit
   * in the sheet and the cards that follow them are drawn outside the phone, so
   * the state has to live above both halves of that screen — this is it.
   */
  const [tab, setTab] = useState<NewTab>("comments");

  return (
    <MockupBlock
      icon={item.icon}
      title={item.title}
      body={item.body}
      points={item.points}
      path={item.path}
      caption={item.caption}
      flip={flip}
      screen={<NewMockup id={item.id} tab={tab} onTab={setTab} />}
      overlay={<NewMockupEscape id={item.id} tab={tab} />}
    />
  );
}

export default function WhatsNewPage() {
  useSEO();
  // one timeline for the phone and the beat card, even though they sit in
  // different columns (and swap places on a phone)
  const convo = useConvoStory();

  return (
    <>
      {/* ── new in xelvic ─────────────────────────────────────────────────
          The page heading and the convo it is about used to be two sections:
          a hero that named the release, then a second section that showed it.
          They are one idea, so they are one composition now — the words on
          the left, the thread playing on the right, both on the same ground. */}
      <section className="relative overflow-hidden pb-16 pt-[calc(9rem+env(safe-area-inset-top))] md:pb-24 md:pt-[calc(11rem+env(safe-area-inset-top))]">
        {/* ambient background, the same wash the other page heroes use */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <img
            src="/media/walls/xelvic.jpg"
            alt=""
            className="h-full w-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink-900/60 via-ink-800/80 to-ink-900" />
          <div className="absolute left-1/4 top-0 h-[min(400px,60vw)] w-[min(700px,110vw)] -translate-x-1/2 rounded-full bg-blue/20 blur-[120px]" />
          <div className="absolute bottom-10 right-0 h-[min(340px,52vw)] w-[min(600px,100vw)] translate-x-1/4 rounded-full bg-pink-400/25 blur-[110px]" />
        </div>

        <div className="wrap">
          <div className="grid gap-10 lg:grid-cols-[1.03fr_0.97fr] lg:gap-x-16 lg:gap-y-8">
            {/* ── the words ───────────────────────────────────────────────── */}
            <div className="mx-auto w-full max-w-xl lg:mx-0">
              <Reveal delay={0.05}>
                <h1 className="font-display text-[clamp(2.5rem,8vw,3.25rem)] font-bold leading-[1.02] tracking-tight md:text-[clamp(3.75rem,6.4vw,4.75rem)]">
                  New in <span className="text-grad">Xelvic</span>
                </h1>
              </Reveal>

              <Reveal delay={0.1}>
                <p className="mt-6 font-display text-xl font-bold leading-snug md:text-2xl">
                  Feel it, note it, send a Spark —{" "}
                  <span className="text-grad">all inside one convo</span>
                </p>
              </Reveal>

              <Reveal delay={0.15}>
                <p className="mt-4 text-base leading-relaxed text-plum/55 md:text-lg">
                  Sparks that count the days two people talk, and a thread where
                  every Vibe, photo Drop and track can be felt and noted the
                  moment it lands. Watch the phone — each move lights up as it
                  happens.
                </p>
              </Reveal>
            </div>

            {/* ── the convo, playing ──────────────────────────────────────── */}
            <Reveal
              delay={0.15}
              className="mx-auto w-full max-w-md lg:row-span-2 lg:self-center"
            >
              <ConvoPhone run={convo.run} onCount={convo.setShown} />
            </Reveal>

            {/* ── the beat that is playing, and the way in ────────────────── */}
            <div className="mx-auto w-full max-w-xl lg:mx-0">
              <Reveal delay={0.2}>
                <ConvoBeats shown={convo.shown} onReplay={convo.replay} />
              </Reveal>

              <Reveal delay={0.3}>
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <MagneticButton to="/download" variant="glow">
                    Get Xelvic
                  </MagneticButton>
                  <a
                    href="#sparks"
                    className="group inline-flex items-center gap-1.5 text-sm font-bold text-plum/55 transition-colors hover:text-pink-600"
                  >
                    Read each one in full
                    <ArrowRight
                      size={15}
                      className="transition-transform duration-200 group-hover:translate-x-0.5"
                    />
                  </a>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* every new thing, one long-form block at a time */}
      {newInXelvic.map((item, i) => (
        <div key={item.id} id={item.id} className="scroll-mt-28">
          <NewBlock item={item} flip={i % 2 === 1} />
        </div>
      ))}

      {/* back into the rest of the app */}
      <section className="pb-8">
        <div className="wrap flex flex-wrap justify-center gap-3">
          <Link to="/how-it-works" className="chip">
            How it all works
          </Link>
          <Link to="/features/chat" className="chip">
            Everything a chat can do
          </Link>
          <Link to="/features" className="chip">
            All features
          </Link>
          <Link to="/explore" className="chip">
            Explore the app
          </Link>
          <Link
            to="/download"
            className="chip inline-flex items-center gap-1.5 font-bold text-pink-600"
          >
            Download <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      <CTABand />
    </>
  );
}
