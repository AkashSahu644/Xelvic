import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check } from 'lucide-react'

type Props = {
  topics?: string[]
  cta?: string
}

export default function ContactForm({ topics, cta = 'Send message' }: Props) {
  const [sent, setSent] = useState(false)

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <div className="glass rounded-3xl p-7">
      <AnimatePresence mode="wait">
        {sent ? (
          <motion.div
            key="done"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="grid place-items-center py-12 text-center"
          >
            <span className="grid h-16 w-16 place-items-center rounded-full bg-brand-grad shadow-glow">
              <Check size={30} />
            </span>
            <h3 className="mt-5 text-xl font-bold">Message sent</h3>
            <p className="mt-2 max-w-sm text-white/55">Thanks for reaching out. Our team will get back to you by email soon.</p>
            <button onClick={() => setSent(false)} className="mt-6 text-sm font-semibold text-blue-glow">Send another</button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={submit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Your name"><input required className="field" placeholder="Alex Rivera" /></Field>
              <Field label="Email"><input required type="email" className="field" placeholder="you@email.com" /></Field>
            </div>
            {topics && (
              <Field label="Topic">
                <select className="field">
                  {topics.map((t) => <option key={t}>{t}</option>)}
                </select>
              </Field>
            )}
            <Field label="Message">
              <textarea required rows={5} className="field resize-none" placeholder="How can we help?" />
            </Field>
            <button type="submit" className="btn btn-glow w-full">{cta}</button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold text-white/70">{label}</span>
      {children}
    </label>
  )
}
