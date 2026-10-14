import { Flame, Heart, MessageCircle } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

/**
 * Everything new in the app, described in the app's own words — a Spark is a
 * day two people talked, a Vibe is a short video, a Drop is a photo post, and
 * a "respond" is a comment. One source, so the What's New band on the home page
 * and the full /whats-new page can never drift apart.
 */
export type NewInXelvic = {
  id: string
  icon: LucideIcon
  /** short kicker — the pill above the heading, the chip in the band */
  tag: string
  /** compact heading for the home-page band */
  short: string
  /** one-line summary for the home-page band */
  summary: string
  /** the full heading used on /whats-new */
  title: string
  /** the long description, one paragraph per entry */
  body: string[]
  /** the fine print, in bullets */
  points: { title: string; body: string }[]
  /** where to find it in the app */
  path: string[]
  /** the line under the phone on /whats-new. The screen itself is drawn in
   *  components/ui/NewMockups.tsx, keyed by this entry's id. */
  caption: string
}

export const newInXelvic: NewInXelvic[] = [
  {
    id: 'sparks',
    icon: Flame,
    tag: 'Sparks',
    short: 'Sparks that count the days',
    summary:
      'A day two people talk on is one spark. Keep it going and new looks open up — and it stays yours, nobody else gets to watch it.',
    title: 'A day the two of you talk is one spark',
    body: [
      'Nobody has one until the first line lands — "Your first line starts the spark." After that, every day you and a friend actually say something to each other keeps it going. It does not matter who of you sent first: a day two people talk on is one spark, either way, and the number climbs by one.',
      'The days you talk are counted rather than buried in a menu, and when today already counts the app says so — "You are in today. Nice."',
    ],
    points: [
      { title: 'Counted per friendship', body: 'A one-to-one convo keeps its own spark. A group does not count towards it.' },
      { title: 'Yours to see', body: '"Show my sparks" is a setting. Your run stays yours — nobody else gets to watch it.' },
      { title: 'A day you miss', body: 'Both of you have to say something before the day is out. Miss one and a Shield covers it, once.' },
    ],
    path: ['Open a convo', 'The days you talk add up', 'Tap in to see them'],
    caption: 'The days you two talk are counted, a spark for each one',
  },
  {
    id: 'react',
    icon: Heart,
    tag: 'Feels',
    short: 'Feel anything, right in the chat',
    summary:
      'A Vibe, a photo Drop, a track, a playlist — whatever lands in a convo can be felt on the spot, without digging it back out of a feed.',
    title: 'Feel it right there in the conversation',
    body: [
      'When somebody sends you a Vibe, a photo Drop or a track, the post arrives carrying its own heart. Tap it in the thread and the app answers — "Felt. Tap to take it back." — so you never leave the conversation, and never lose your place trying to find the thing again in a feed.',
      'The count lands on the post, and on the profile of whoever put it up. Whether anyone can see that count is your call.',
    ],
    points: [
      { title: 'Every kind of post', body: 'Vibes, photo Drops, tracks and playlists all carry the same heart and note count.' },
      { title: 'Tap again to undo', body: 'The heart is a toggle. The app tells you which way it went: "Felt." or "Not felt any more."' },
      { title: 'Show it or hide it', body: '"Show like count" or "Hide like count" — a switch in Settings, either way.' },
    ],
    path: ['Any convo', 'A post arrives', 'Tap the heart on the post'],
    caption: 'The heart and the note count sit on the post, inside the conversation',
  },
  {
    id: 'comment',
    icon: MessageCircle,
    tag: 'Comments & notes',
    short: 'Comment on it, or leave a private note',
    summary:
      'Every post opens into two tabs. Comments sit under the post for the whole thread to read; notes are private, and go only to whoever put the post up.',
    title: 'Two tabs under every post: comments, and notes',
    body: [
      'A post in a convo carries its own count. Tap it and the sheet comes up over the conversation with Comments on one tab and Notes on the other, so you never have to leave the thread to say something about what is in it.',
      'Comments are the open half — what you write sits under the post, and every comment carries a heart and a Reply, so you answer the one person you mean instead of the whole room. Notes are the private half: the field says it outright, "Write a private note", and what you write goes to whoever posted the thing rather than to everyone reading the thread.',
    ],
    points: [
      { title: 'Both halves, one sheet', body: 'Comments and notes open over the convo, on the post they are about.' },
      { title: 'Reply to one person', body: 'Every comment carries a heart and a Reply, so an answer lands on that comment instead of loose in the thread.' },
      { title: 'Notes stay private', body: '"Write a private note" — it goes to the person who posted it, not to everyone in the convo.' },
    ],
    path: ['A post in the convo', 'Tap the count on it', 'Comments or Notes — write it and send'],
    caption:
      'Two tabs under the post — tap between them: comments on one side, notes on the other',
  },
]
