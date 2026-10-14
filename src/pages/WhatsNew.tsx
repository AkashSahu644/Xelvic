import { useState } from "react";
import { Link } from "react-router-dom";
import { Check, Navigation, ChevronRight, ArrowRight } from "lucide-react";
import PageHero from "../components/layout/PageHero";
import Reveal from "../components/ui/Reveal";
import PhoneFrame from "../components/ui/PhoneFrame";
import NewMockup, {
  NewMockupEscape,
  type NewTab,
} from "../components/ui/NewMockups";
import ConvoStory from "../components/ui/ConvoStory";
import MagneticButton from "../components/ui/MagneticButton";
import { CTABand } from "../components/sections/Bands";
import { newInXelvic, type NewInXelvic } from "../data/whatsNew";
import { useSEO } from "../hooks/usePageMeta";
import { graph, breadcrumbLd } from "../data/jsonld";

/**
 * One new thing, in full: the heading and the long description on one side, a
 * real screen from the build on the other, with the "where to tap" path at the
 * foot of the copy. Sides swap on every other block so a scroll down the page
 * reads as a rhythm rather than a list.
 */
function NewBlock({ item, flip }: { item: NewInXelvic; flip: boolean }) {
  const Icon = item.icon;

  /**
   * The Comments/Notes sheet is the one screen here you can work. Its tabs sit
   * in the sheet and the cards that follow them are drawn outside the phone, so
   * the state has to live above both halves of that screen — this is it.
   */
  const [tab, setTab] = useState<NewTab>("comments");

  return (
    <section
      className={`section relative overflow-hidden ${flip ? "bg-ink-800" : ""}`}
    >
      {/* The aurora paints at z-index -10, so it only shows on the untinted
          blocks — behind an opaque section background it would never be seen. */}
      {!flip && <div className="aurora-bg" />}
      <div className="wrap grid items-center gap-12 lg:grid-cols-2">
        {/* the screen — drawn for this block, so it shows this block's own
            thing rather than a wallpaper. Deliberately still: no drift, no
            hover tilt, no scroll reveal, nothing that moves on its own. The one
            screen with something you can press is the Comments/Notes sheet, and
            tapping a tab only swaps what is drawn — nothing transitions.

            `overlay` is the frame's unclipped layer, and it is what lets the
            post in the Feels thread and the comment cards in the sheet run off
            the side of the phone instead of stopping at the glass. Screens with
            nothing to escape render nothing there. */}
        <div
          className={`flex flex-col items-center ${flip ? "lg:order-2" : ""}`}
        >
          <PhoneFrame
            size="lg"
            glow="rgba(236,72,153,.3)"
            overlay={<NewMockupEscape id={item.id} tab={tab} />}
          >
            <NewMockup id={item.id} tab={tab} onTab={setTab} />
          </PhoneFrame>
          <p className="mt-5 max-w-xs text-center text-sm text-white/45">
            {item.caption}
          </p>
        </div>

        {/* the words */}
        <div className={flip ? "lg:order-1" : ""}>
          <span
            className="grid h-14 w-14 place-items-center rounded-2xl text-pure shadow-glow-sm"
            style={{ background: "linear-gradient(135deg,#ec4899,#ff8fc4)" }}
          >
            <Icon size={26} />
          </span>

          <h2 className="font-display text-3xl font-bold leading-tight md:text-4xl">
            {item.title}
          </h2>

          {item.body.map((p) => (
            <p key={p} className="mt-5 text-lg leading-relaxed text-white/60">
              {p}
            </p>
          ))}

          <ul className="mt-9 space-y-5">
            {item.points.map((pt) => (
              <li key={pt.title} className="flex gap-3">
                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-grad">
                  <Check size={14} />
                </span>
                <div>
                  <h4 className="font-bold">{pt.title}</h4>
                  <p className="text-sm text-white/55">{pt.body}</p>
                </div>
              </li>
            ))}
          </ul>

          {/* where to find it — the same breadcrumb the feature pages use */}
          <div className="mt-9 inline-flex max-w-full flex-wrap items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
            <Navigation size={15} className="shrink-0 text-blue-glow" />
            {item.path.map((p, i) => (
              <span key={p} className="flex items-center gap-2">
                <span className="text-sm font-semibold text-white/80">{p}</span>
                {i < item.path.length - 1 && (
                  <ChevronRight size={15} className="text-white/30" />
                )}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function WhatsNewPage() {
  useSEO({
    title: "What's New — Xelvic",
    description:
      "The spark that counts the days two people talk, feeling and noting a Vibe, a Drop or a track without leaving the chat — everything new in Xelvic, explained in full.",
    image: "/media/themes/teddy/convo.jpg",
    jsonLd: graph(
      breadcrumbLd([
        { name: "Home", path: "/" },
        { name: "What's New", path: "/whats-new" },
      ]),
    ),
  });

  return (
    <>
      <PageHero
        title={
          <>
            New in <span className="text-grad">Xelvic</span>
          </>
        }
        sub="Sparks that count the days two people talk, and a convo where every Vibe, photo Drop and track can be felt and noted the moment it lands. Here is each one, in full."
        wall="/media/walls/xelvic.jpg"
      />

      {/* watch it happen — the convo, playing, with each move called out */}
      <section className="pb-16">
        <div className="wrap">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-display text-3xl font-bold leading-tight md:text-4xl">
                Feel it, note it, send a Spark —{" "}
                <span className="text-grad">all inside one convo</span>
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-white/60">
                Every one of these happens inside the thread. Watch the phone: a
                Vibe lands, you feel it, the note goes on the post, and a Spark
                is sent and spent. The notes beside it light up at the exact
                moment each one does.
              </p>
            </div>
          </Reveal>

          <ConvoStory className="mt-14" />

          <Reveal delay={0.1}>
            <div className="mt-14 flex flex-wrap items-center justify-center gap-2.5">
              {newInXelvic.map((s) => (
                <a key={s.id} href={`#${s.id}`} className="chip">
                  {s.tag}
                </a>
              ))}
            </div>

            <div className="mt-8 flex justify-center">
              <MagneticButton to="/download" variant="glow">
                Get Xelvic
              </MagneticButton>
            </div>
          </Reveal>
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
