import { useParams, Navigate } from 'react-router-dom'
import { getFeature, getGuide } from '../data/features'
import PageHero from '../components/layout/PageHero'
import Reveal from '../components/ui/Reveal'
import PhoneFrame from '../components/ui/PhoneFrame'
import PhoneDemo from '../components/ui/PhoneDemo'
import ScreenshotGallery from '../components/ui/ScreenshotGallery'
import SectionHeading from '../components/ui/SectionHeading'
import FeatureHowItWorks from '../components/sections/FeatureHowItWorks'
import MagneticButton from '../components/ui/MagneticButton'
import { CTABand } from '../components/sections/Bands'
import { useSEO } from '../hooks/usePageMeta'
import { Check } from 'lucide-react'

export default function FeatureDetail() {
  const { slug } = useParams()
  const feature = slug ? getFeature(slug) : undefined
  const guide = slug ? getGuide(slug) : undefined
  /* The only thing this page has to say for itself is that a slug it does not
     recognise is not a page. Everything else — the title, the share card, the
     WebPage node and the HowTo built from this feature's own list of taps —
     comes from the route entry, which is also what the prerenderer wrote into
     this URL's HTML. A feature without a guide emits no HowTo, so there are
     never empty steps. */
  useSEO({ noindex: !feature })

  if (!feature) return <Navigate to="/features" replace />
  const Icon = feature.icon

  return (
    <>
      <PageHero
        title={<>{feature.name}</>}
        sub={feature.blurb}
        wall={feature.screen}
      />

      {/* overview: live demo + key points */}
      <section className="pb-6">
        <div className="wrap grid items-center gap-12 lg:grid-cols-2">
          <Reveal className="flex justify-center">
            <PhoneFrame drift tilt glow={`${feature.color}55`}>
              {guide ? (
                <PhoneDemo kind={guide.demo} />
              ) : (
                <img
                  src={feature.screen || '/media/themes/animeblue/convo.jpg'}
                  alt={feature.name}
                  className="h-full w-full object-cover"
                />
              )}
            </PhoneFrame>
          </Reveal>
          <Reveal delay={0.1}>
            <span
              className="grid h-14 w-14 place-items-center rounded-2xl text-white shadow-glow-sm"
              style={{ background: `linear-gradient(135deg, ${feature.color}, #ff8fc4)` }}
            >
              <Icon size={26} />
            </span>
            {feature.quote && (
              <blockquote className="mt-6 border-l-2 border-blue pl-5 font-display text-2xl font-semibold leading-snug text-white/90">
                “{feature.quote}”
              </blockquote>
            )}
            <ul className="mt-8 space-y-4">
              {feature.points.map((p) => (
                <li key={p.title} className="flex gap-3">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-grad">
                    <Check size={14} />
                  </span>
                  <div>
                    <h4 className="font-bold">{p.title}</h4>
                    <p className="text-sm text-white/55">{p.body}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <MagneticButton to="/download" variant="glow">
                Get Xelvic
              </MagneticButton>
            </div>
          </Reveal>
        </div>
      </section>

      {/* how it works — where to tap, how to get there */}
      {guide && <FeatureHowItWorks guide={guide} color={feature.color} />}

      {/* real screenshots */}
      {guide && guide.shots.length > 0 && (
        <section className="section">
          <div className="wrap">
            <SectionHeading
              title={
                <>
                  Straight from the <span className="text-grad">app</span>
                </>
              }
              sub="Real screens from Xelvic — tap any to view it full-size."
            />
            <ScreenshotGallery shots={guide.shots} className="mt-14" />
          </div>
        </section>
      )}

      <CTABand />
    </>
  )
}
