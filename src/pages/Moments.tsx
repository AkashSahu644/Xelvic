import { Check } from "lucide-react";
import Reveal from "../components/ui/Reveal";
import PhoneFrame from "../components/ui/PhoneFrame";
import PhoneDemo from "../components/ui/PhoneDemo";
import MockupBlock from "../components/sections/MockupBlock";
import MagneticButton from "../components/ui/MagneticButton";
import { CTABand } from "../components/sections/Bands";
import { MomentsMockup, MomentsEscape } from "../components/ui/MomentsMockups";
import { getFeature, getGuide } from "../data/features";
import { momentsSections } from "../data/moments";
import { useSEO } from "../hooks/usePageMeta";

/**
 * The Moments page, which is the `moments` feature with room to breathe — the
 * messaging, calls and live rooms pages' twin, built the same way out of the
 * same parts.
 *
 * It opens on one hero rather than the two the rest of the site stacks: the
 * words on the left and the app running on the right, in a single section. On a
 * phone the order is title, demo, then the fine print, so the app is on screen
 * before the reading starts.
 *
 * Below that it takes a Moment apart one thing at a time: the circle you tap to
 * start one, the composer that opens, who answered and watched it, and the
 * Memory it becomes the next day. Every one of those blocks is the same section
 * `/whats-new`, the messaging page, the calls page and the live rooms page use,
 * phone and all, so the five pages read as one hand.
 *
 * The screens themselves are the app's own: the Moments tab with its three icons
 * and "Your moments" circle on the rail, the composer, your own Moment with its
 * watched count, the white Answered sheet with its name and @handle rows, and
 * the Memories grid under Profile.
 */
export default function Moments() {
  /* No arguments: the route table already knows what `/features/moments` is,
     and it is also what the prerenderer wrote into this URL's HTML. */
  useSEO();

  const feature = getFeature("moments");
  const guide = getGuide("moments");

  /* A feature page for a feature that is not in the data is a 404 wearing the
     wrong clothes — but the route is built from that same data, so this can
     only happen if the slug is renamed in one place and not the other. */
  if (!feature) return null;

  return (
    <>
      {/* ── the hero ─────────────────────────────────────────────────────────
          One section, not two: the page's own title and the app running beside
          it. The ambient background is the one `PageHero` would have painted —
          the feature's own screen behind a plum wash, plus the aurora — because
          this hero replaces that component rather than sitting under it. */}
      <section className="relative overflow-hidden pb-16 pt-[calc(8.5rem+env(safe-area-inset-top))] md:pb-20 md:pt-[calc(10.5rem+env(safe-area-inset-top))]">
        <div className="pointer-events-none absolute inset-0 -z-10">
          {feature.screen && (
            <>
              <img
                src={feature.screen}
                alt=""
                className="h-full w-full object-cover opacity-25"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-ink-900/70 via-ink-800/85 to-ink-900" />
            </>
          )}
          <div className="absolute left-1/2 top-0 h-[min(420px,62vw)] w-[min(760px,110vw)] -translate-x-1/2 rounded-full bg-blue/20 blur-[120px]" />
        </div>
        <div className="aurora-bg" />

        {/* Three cells in one grid. On a phone they stack in the order they are
            written — title, the app, then the quote and the four things — and
            from `lg` the app moves to the right and spans both rows beside
            them. */}
        <div className="wrap grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          <div className="lg:col-start-1 lg:row-start-1">
            <Reveal delay={0.05}>
              <h1 className="font-display text-[clamp(2.25rem,7vw,3rem)] font-bold leading-[1.05] tracking-tight [text-wrap:balance] md:text-[clamp(3rem,5.5vw,3.75rem)]">
                Moments on <span className="text-grad">Xelvic</span>
              </h1>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/60">
                {feature.blurb}
              </p>
            </Reveal>
          </div>

          <Reveal
            delay={0.15}
            className="flex justify-center lg:col-start-2 lg:row-span-2 lg:row-start-1"
          >
            <PhoneFrame drift tilt size="lg" glow={`${feature.color}55`}>
              {guide ? (
                <PhoneDemo kind={guide.demo} />
              ) : (
                <img
                  src={feature.screen || "/media/themes/animeblue/moments.jpg"}
                  alt={feature.name}
                  className="h-full w-full object-cover"
                />
              )}
            </PhoneFrame>
          </Reveal>

          <div className="lg:col-start-1 lg:row-start-2">
            {feature.quote && (
              <Reveal delay={0.1}>
                <blockquote className="border-l-2 border-blue pl-5 font-display text-xl font-semibold leading-snug text-white/90 md:text-2xl">
                  “{feature.quote}”
                </blockquote>
              </Reveal>
            )}

            <Reveal delay={0.15}>
              <ul className="mt-8 grid gap-2.5 sm:grid-cols-2 sm:gap-3">
                {feature.points.map((p) => (
                  <li
                    key={p.title}
                    className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-3.5"
                  >
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-grad">
                      <Check size={14} />
                    </span>
                    <div>
                      <h3 className="text-sm font-bold leading-snug">
                        {p.title}
                      </h3>
                      <p className="mt-1 text-xs leading-relaxed text-white/55">
                        {p.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <MagneticButton to="/download" variant="glow">
                  Get Xelvic
                </MagneticButton>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* One block each, sides alternating, every one of them the same section
          the messaging page, the calls page, the live rooms page and the What's
          New page use — so the phone, the caption, the fine print and the
          breadcrumb all sit where a reader has already learned to find them. */}
      {momentsSections.map((s, i) => (
        <div key={s.id} id={s.id} className="scroll-mt-28">
          <MockupBlock
            icon={s.icon}
            title={s.title}
            body={s.body}
            points={s.points}
            path={s.path}
            caption={s.caption}
            flip={i % 2 === 1}
            screen={<MomentsMockup id={s.id} />}
            overlay={<MomentsEscape id={s.id} />}
          />
        </div>
      ))}

      <CTABand />
    </>
  );
}
