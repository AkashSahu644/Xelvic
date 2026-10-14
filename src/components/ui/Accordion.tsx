import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type Item = { q: string; a: string; tag?: string }

/**
 * The Help Center's article list. Deliberately not a stack of cards: questions
 * are rows on hairlines, the way a settings list reads, and the open/closed
 * marker is typographic rather than a glyph in a tinted circle. The meaning
 * sits in the question, so nothing else has to carry it.
 */
export default function Accordion({ items }: { items: Item[] }) {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <div className="divide-y divide-plum/10 border-y border-plum/10">
      {items.map((it, i) => {
        const active = open === i
        return (
          <div key={it.q}>
            <button
              type="button"
              onClick={() => setOpen(active ? null : i)}
              aria-expanded={active}
              className="flex w-full cursor-pointer items-start justify-between gap-5 py-5 text-left"
            >
              <span className="min-w-0">
                {it.tag && (
                  <span className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.14em] text-pink-600">
                    {it.tag}
                  </span>
                )}
                <span
                  className={`font-display text-[17px] font-bold leading-snug transition-colors ${
                    active ? 'text-pink-700' : 'text-plum'
                  }`}
                >
                  {it.q}
                </span>
              </span>
              <span
                aria-hidden
                className={`mt-0.5 shrink-0 font-display text-xl font-bold leading-none transition-colors ${
                  active ? 'text-pink-600' : 'text-plum/30'
                }`}
              >
                {active ? '−' : '+'}
              </span>
            </button>

            <AnimatePresence initial={false}>
              {active && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.2, 0.7, 0.2, 1] }}
                  className="overflow-hidden"
                >
                  <p className="pb-6 pr-6 leading-relaxed text-plum/65 md:pr-10">{it.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
