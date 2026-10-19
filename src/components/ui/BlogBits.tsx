import { BadgeCheck, Heart, Send, Sparkles, StickyNote } from 'lucide-react'

/**
 * The small pieces the blog shares across its index and its article pages.
 *
 * These deliberately use Xelvic's own vocabulary rather than the generic
 * social set: a post can be felt, a note can be left on it, a story can be
 * sent to a Convo, and the good ones can be kept in Memories. The mark next
 * to an author is the verification the app itself shows.
 */

export const BRAND_ICON = '/media/brand/xelvic-icon.png'

const authorArt: Record<string, string> = {
  'The Xelvic Team': BRAND_ICON,
  'Design at Xelvic': '/media/themes/catgirl/convo.jpg',
  'Engineering at Xelvic': '/media/themes/alone/live.jpg',
}

export const authorArtFor = (author: string) => authorArt[author] ?? BRAND_ICON

export function AuthorAvatar({ author, size = 36 }: { author: string; size?: number }) {
  return (
    <span className="shrink-0 rounded-full bg-brand-grad p-[2px]">
      <span className="block rounded-full bg-pure p-[2px]">
        <img
          src={authorArtFor(author)}
          alt=""
          loading="lazy"
          className="rounded-full object-cover"
          style={{ width: size, height: size }}
        />
      </span>
    </span>
  )
}

/** An author's name carrying the verification mark the app uses. */
export function AuthorName({ author, className = '' }: { author: string; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1 ${className}`}>
      {author}
      <BadgeCheck size={14} className="shrink-0 text-pink-500" aria-hidden="true" />
    </span>
  )
}

const actions = [
  { icon: Heart, label: 'Feel' },
  { icon: StickyNote, label: 'Note' },
  { icon: Send, label: 'Convo' },
  { icon: Sparkles, label: 'Memories' },
]

/**
 * A labelled action dock instead of a bare row of icons. It reads as Xelvic
 * because every label is a thing the product already does. Decorative inside
 * a post card, where the whole card is the link.
 */
export function PostActions({ className = '' }: { className?: string }) {
  return (
    <span aria-hidden="true" className={`flex flex-wrap items-center gap-1.5 ${className}`}>
      {actions.map(({ icon: Icon, label }) => (
        <span
          key={label}
          className="inline-flex items-center gap-1.5 rounded-full border border-plum/10 bg-ink-800 px-2.5 py-1 text-[11px] font-semibold text-plum/55"
        >
          <Icon size={13} className="text-pink-500" />
          {label}
        </span>
      ))}
    </span>
  )
}
