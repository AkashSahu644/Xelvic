import { useParams, Navigate, Link } from 'react-router-dom'
import { getJob } from '../data/jobs'
import PageHero from '../components/layout/PageHero'
import Reveal from '../components/ui/Reveal'
import MagneticButton from '../components/ui/MagneticButton'
import { Rows, SectionHead, Prose, Note } from '../components/ui/Editorial'
import { NextLinks } from '../components/ui/Explainers'
import { CTABand } from '../components/sections/Bands'
import { useSEO } from '../hooks/usePageMeta'
import { graph, jobPostingLd, webPageLd } from '../data/jsonld'

export default function CareerDetail() {
  const { id } = useParams()
  const job = id ? getJob(id) : undefined

  useSEO({
    title: job ? `${job.title} — Xelvic Careers` : 'Careers — Xelvic',
    description: job?.summary,
    noindex: !job,
    jsonLd: job
      ? graph(
          webPageLd({
            name: `${job.title} — Xelvic Careers`,
            description: job.summary,
            path: `/careers/${job.id}`,
            breadcrumbs: [
              { name: 'Home', path: '/' },
              { name: 'Careers', path: '/careers' },
              { name: job.title, path: `/careers/${job.id}` },
            ],
          }),
          jobPostingLd({
            title: job.title,
            description: job.summary,
            employmentType: job.type,
            location: job.location,
            team: job.team,
          }),
        )
      : undefined,
  })

  if (!job) return <Navigate to="/careers" replace />

  return (
    <>
      <PageHero title={job.title} sub={job.summary} wall="/media/walls/studio.jpg" />

      {/* ————— the role as a set of facts ————— */}
      <section className="pb-20">
        <div className="wrap max-w-3xl">
          <Rows
            items={[
              { k: 'Team', v: job.team, note: 'Who you would sit with, and who you would argue with.' },
              { k: 'Location', v: job.location, note: 'We ask for a few hours of overlap, not for a fixed hour online.' },
              { k: 'Contract', v: job.type, note: 'Salary and equity, for everyone on the team.' },
              {
                k: 'Process',
                v: 'Five steps, and a paid work sample rather than a free weekend',
                note: 'A conversation, a small piece of scoped work we pay for, the team, then an answer either way.',
              },
              {
                k: 'Start',
                v: 'Whenever you are ready',
                note: 'We would rather wait for the right person than fill the seat this month.',
              },
            ]}
          />
        </div>
      </section>

      {/* ————— what you would do ————— */}
      <section className="pb-20">
        <div className="wrap max-w-3xl">
          <SectionHead
            kicker="The job"
            title="What you would do"
            sub="Written as the work rather than as a list of technologies, because the technologies are the easy part to change."
          />
          <Reveal>
            <ul className="mt-8 divide-y divide-plum/10 border-y border-plum/10">
              {job.responsibilities.map((r) => (
                <li key={r} className="flex gap-4 py-4 leading-relaxed text-white/70">
                  <span aria-hidden className="mt-3 h-px w-5 shrink-0 bg-[#ec4899]" />
                  <span className="min-w-0">{r}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ————— what we are looking for ————— */}
      <section className="section bg-ink-800">
        <div className="wrap max-w-3xl">
          <SectionHead
            kicker="The person"
            title="What we are looking for"
            sub="Take this as the shape of the person rather than as a checklist — if you meet most of it and the rest reads like you, write to us."
          />
          <Reveal>
            <ul className="mt-8 divide-y divide-plum/10 border-y border-plum/10">
              {job.requirements.map((r) => (
                <li key={r} className="flex gap-4 py-4 leading-relaxed text-white/70">
                  <span aria-hidden className="mt-3 h-px w-5 shrink-0 bg-plum/25" />
                  <span className="min-w-0">{r}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <div className="mt-12">
            <Prose>
              <p>
                We are not looking for a particular set of logos on a CV, and we are not looking for
                somebody who has already shipped at a certain scale. We are looking for somebody who
                cares how the app feels in the hand of a person who is not technical — and who will
                argue for that when it is inconvenient.
              </p>
              <p>
                Interviews do not involve a whiteboard, and the work sample is a few hours of real
                work that we pay for. The full process, and what the job is like in practice, is on
                the{' '}
                <Link to="/careers" className="font-semibold text-pink-700 underline">
                  Careers page
                </Link>
                .
              </p>
            </Prose>
          </div>
        </div>
      </section>

      {/* ————— apply ————— */}
      <section className="section">
        <div className="wrap max-w-3xl">
          <SectionHead kicker="Apply" title="How to put yourself forward" />

          <Note className="mt-8" title={`${job.title} · ${job.team}`}>
            Send one email with the role in the subject line and something you have made attached or
            linked — a repo, a build, a design file, a piece of writing, anything that shows how you
            think.{' '}
            <a href="mailto:careers@xelvic.app" className="font-semibold text-pink-700 underline">
              careers@xelvic.app
            </a>
            . A CV on its own is fine, but it is the weakest thing you can send us; a link to
            something working is the strongest.
          </Note>

          <div className="mt-10 flex flex-wrap items-center gap-5">
            <MagneticButton to="/contact" variant="glow">
              Ask us a question first
            </MagneticButton>
            <Link
              to="/careers"
              className="text-sm font-semibold text-plum/60 transition-colors hover:text-plum"
            >
              ← All open roles
            </Link>
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="wrap max-w-3xl">
          <NextLinks
            links={[
              { label: 'All roles', to: '/careers' },
              { label: 'About us', to: '/about' },
              { label: 'Contact', to: '/contact' },
            ]}
          />
        </div>
      </section>

      <CTABand />
    </>
  )
}
