import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import PageHero from "../components/layout/PageHero";
import Reveal from "../components/ui/Reveal";
import NewMockup, {
  NewMockupEscape,
  type NewTab,
} from "../components/ui/NewMockups";
import ConvoStory from "../components/ui/ConvoStory";
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
