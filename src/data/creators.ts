/**
 * The Creator page's two lists, kept out of the page so the ItemList and the
 * HowTo in the structured data are built from the same arrays the page renders.
 *
 * The brand-deal steps are a sequence, and a sequence written twice is a
 * sequence that ends up in a different order in one of the two places.
 */
import { BadgeCheck, BarChart3, Flame, Handshake, Users, Wallet } from 'lucide-react'

export const creatorTools = [
  { icon: BarChart3, title: 'Insights', body: 'Insights fill in as people find your page — see what lands and who you reach.' },
  { icon: BadgeCheck, title: 'Verification', body: 'Ask for the mark that says this account is really you. Your account carries the mark.' },
  { icon: Handshake, title: 'Brand Deals', body: 'Brands invite you to make content and track paid deals in the open. Payment is released only after the work is approved.' },
  { icon: Users, title: 'Creator Directory', body: 'Public creators with 2k followers or more show up here, so brands can find you.' },
  { icon: Wallet, title: 'Wallet & payouts', body: 'Track what you have earned and get paid for approved deliverables.' },
  { icon: Flame, title: 'Sparks & Circles', body: 'Build sparks with your audience and lead interest Circles of fifty.' },
]

export const dealSteps = [
  { n: '1', t: 'Get invited', d: 'A brand invites you to a paid collaboration.' },
  { n: '2', t: 'Create & upload', d: 'You make the content and upload the deliverable for approval.' },
  { n: '3', t: 'Get approved', d: 'The company reviews and approves the work.' },
  { n: '4', t: 'Get paid', d: 'Payment is released only after approval — fair for everyone.' },
]
