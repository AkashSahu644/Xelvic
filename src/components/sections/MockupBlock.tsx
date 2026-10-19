import type { ReactNode } from "react";
import { Check, Navigation, ChevronRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import PhoneFrame from "../ui/PhoneFrame";

/**
 * One thing, in full: a drawn screen of the app on one side, and the words on
 * the other — the heading, the long description, the fine print, and the
 * "where to tap" path at the foot. Sides swap on every other block so a scroll
 * down the page reads as a rhythm rather than a list.
 *
 * `/whats-new` and the messaging page are the same section twice over, so they
 * share this rather than each keeping a copy that can drift. Everything that
 * differs between the two — the screen, the words, which side it sits on — is a
 * prop; the layout is not.
 */
export type MockupBlockProps = {
  icon: LucideIcon;
  title: string;
  /** one paragraph per entry */
  body: string[];
  /** the fine print, in bullets */
  points: { title: string; body: string }[];
  /** where to find it in the app */
  path: string[];
  /** the line under the phone */
  caption: string;
  /** sit the phone on the right and the words on the left */
  flip?: boolean;
  /** the screen drawn inside the phone */
  screen: ReactNode;
  /**
   * The frame's unclipped layer. It is what lets a card run off the side of the
   * phone instead of stopping at the glass; screens with nothing to escape pass
   * nothing and the layer stays empty.
   */
  overlay?: ReactNode;
};

export default function MockupBlock({
  icon: Icon,
  title,
  body,
  points,
  path,
  caption,
  flip = false,
  screen,
  overlay,
}: MockupBlockProps) {
  return (
    <section
      className={`section relative overflow-hidden ${flip ? "bg-ink-800" : ""}`}
    >
      {/* The aurora paints at z-index -10, so it only shows on the untinted
          blocks — behind an opaque section background it would never be seen. */}
      {!flip && <div className="aurora-bg" />}
      <div className="wrap grid items-center gap-12 lg:grid-cols-2">
        {/* the screen — drawn for this block, so it shows this block's own thing
            rather than a wallpaper. Deliberately still: no drift, no hover tilt,
            no scroll reveal, nothing that moves on its own. */}
        <div className={`flex flex-col items-center ${flip ? "lg:order-2" : ""}`}>
          <PhoneFrame
            size="lg"
            glow="rgba(236,72,153,.3)"
            overlay={overlay}
          >
            {screen}
          </PhoneFrame>
          <p className="mt-5 max-w-xs text-center text-sm text-white/45">
            {caption}
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
            {title}
          </h2>

          {body.map((p) => (
            <p key={p} className="mt-5 text-lg leading-relaxed text-white/60">
              {p}
            </p>
          ))}

          <ul className="mt-9 space-y-5">
            {points.map((pt) => (
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
            {path.map((p, i) => (
              <span key={p} className="flex items-center gap-2">
                <span className="text-sm font-semibold text-white/80">{p}</span>
                {i < path.length - 1 && (
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
