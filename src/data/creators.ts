/**
 * The Creator page's lists, kept out of the page so the ItemList and the HowTo
 * in the structured data are built from the same arrays the page renders.
 *
 * The brand-deal steps are a sequence, and a sequence written twice is a
 * sequence that ends up in a different order in one of the two places.
 */
import { BadgeCheck, BarChart3, Flame, Handshake, Users, Wallet } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export type CreatorTool = {
  icon: LucideIcon
  title: string
  body: string
  /** the specifics the card shows under the summary */
  points: string[]
}

export const creatorTools: CreatorTool[] = [
  {
    icon: BarChart3,
    title: 'Insights',
    body: 'Insights fill in as people find your page — see what lands and who you reach.',
    points: [
      'Profile visits and reach, without a third-party dashboard.',
      'What each Drop or Vibe did after it went out.',
      'Which interests your audience actually came from.',
    ],
  },
  {
    icon: BadgeCheck,
    title: 'Verification',
    body: 'Ask for the mark that says this account is really you. Your account carries the mark.',
    points: [
      'Request it from Settings, on the account you already use.',
      'The mark follows the account, not a post or a platform.',
      'It is a proof of identity, not a ranking.',
    ],
  },
  {
    icon: Handshake,
    title: 'Brand Deals',
    body: 'Brands invite you to make content and track paid deals in the open. Payment is released only after the work is approved.',
    points: [
      'Brief, draft, approval and payout in one thread.',
      'Both sides see the same state at every step.',
      'Nothing pays out until the brand signs off.',
    ],
  },
  {
    icon: Users,
    title: 'Creator Directory',
    body: 'Public creators with 2k keeps or more show up here, so brands can find you.',
    points: [
      'Search by the work, not only by keep count.',
      'A public profile brands can read before they reach out.',
      'The directory is a listing, not a leaderboard.',
    ],
  },
  {
    icon: Wallet,
    title: 'Wallet & payouts',
    body: 'Track what you have earned and get paid for approved deliverables.',
    points: [
      'See what is available and what has already landed.',
      'Every payout is tied to an approved deliverable.',
      'The full history stays in one list.',
    ],
  },
  {
    icon: Flame,
    title: 'Sparks & Circles',
    body: 'Build sparks with your audience and lead interest Circles of fifty.',
    points: [
      'A day of talking is one spark; keep it going.',
      'Lead a Circle of fifty who chose the same interest.',
      'The day’s best take goes to the top of the Circle.',
    ],
  },
]

export const dealSteps = [
  { n: '1', t: 'Get invited', d: 'A brand invites you to a paid collaboration.' },
  { n: '2', t: 'Create & upload', d: 'You make the content and upload the deliverable for approval.' },
  { n: '3', t: 'Get approved', d: 'The company reviews and approves the work.' },
  { n: '4', t: 'Get paid', d: 'Payment is released only after approval — fair for everyone.' },
]

/** The four honest facts under the hero. */
export const creatorFacts = [
  { value: '6', label: 'creator tools', note: 'All included on a normal account.' },
  { value: '2k+', label: 'keeps for the directory', note: 'Verification and tools are available before that.' },
  { value: '4', label: 'steps from invite to payout', note: 'Each one visible to both sides.' },
  { value: 'One', label: 'account for everything', note: 'The same profile your people already message.' },
]

/** The sample roster in the directory mock-up. Names are illustrative. */
export const directoryCreators = [
  {
    name: 'Maya Brooks',
    handle: '@mayamakes',
    field: 'Music & Moments',
    keeps: '12.8k',
    art: '/media/themes/catgirl/drops.jpg',
  },
  {
    name: 'Jordan Lee',
    handle: '@jordonscreen',
    field: 'Drops & Vibes',
    keeps: '8.4k',
    art: '/media/themes/animeblue/drops.jpg',
  },
  {
    name: 'Sofia Reyes',
    handle: '@sofiareyes',
    field: 'Live & Rooms',
    keeps: '6.1k',
    art: '/media/themes/alone/live.jpg',
  },
]

export const creatorFaqs = [
  {
    q: 'Do I need 2,000 keeps to use the creator tools?',
    a: 'No. Insights, verification and brand deals are part of the account whatever your size. The 2,000-keeps threshold is only for the public Creator Directory, where brands browse for people to work with.',
  },
  {
    q: 'When does a brand deal actually pay out?',
    a: 'After the brand approves the deliverable. You upload the work, the company reviews it, and payment is released only once that approval is recorded. Both sides see the same state in the deal.',
  },
  {
    q: 'What can a brand ask me to make?',
    a: 'A collaboration can cover the things the app already supports — Drops, Vibes, Moments, a live room or a combination. The brief and the deliverable stay attached to the same deal.',
  },
  {
    q: 'Is verification paid or decided by keep count?',
    a: 'It is neither sold nor scored by keep count. You ask for it, and the mark says the account is really the person behind it. It is not a ranking and it does not change your reach.',
  },
  {
    q: 'How does my profile get into the directory?',
    a: 'Public creator profiles with 2,000 keeps or more are eligible to appear. If your account qualifies, ask us to review the profile, and a brand will be able to find the work rather than only a number.',
  },
]
