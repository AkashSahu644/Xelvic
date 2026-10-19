/**
 * The Developer page's reference data, kept out of the page so the ItemList in
 * the structured data can be built from the same rows the table renders.
 *
 * These values are URI schemes rather than site paths, which is why the list
 * carries them as names only — see the note in `routeExtras`.
 */
import { Lock, Radio, ScanLine, Server, Smartphone, WifiOff } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export type DeepLinkGroup = 'People' | 'Content' | 'Live'

export type DeepLink = {
  path: string
  desc: string
  group: DeepLinkGroup
  example: string
}

export const deepLinks: DeepLink[] = [
  {
    path: 'xelvic://u/<username>',
    desc: 'Open a user profile',
    group: 'People',
    example: 'xelvic://u/maya',
  },
  {
    path: 'xelvic://d/<id>',
    desc: 'Open a specific Drop',
    group: 'Content',
    example: 'xelvic://d/91f2',
  },
  {
    path: 'xelvic://v/<id>',
    desc: 'Open a Vibe',
    group: 'Content',
    example: 'xelvic://v/6c1a',
  },
  {
    path: 'xelvic://live/<id>',
    desc: 'Join a live stream',
    group: 'Live',
    example: 'xelvic://live/room-42',
  },
  {
    path: 'xelvic://moments/<id>',
    desc: 'View a Moment',
    group: 'Content',
    example: 'xelvic://moments/24h',
  },
  {
    path: 'xelvic://room/<id>',
    desc: 'Walk into an audio room',
    group: 'Live',
    example: 'xelvic://room/after-hours',
  },
]

/** The pieces the platform is actually made of. */
export const platformFacts: { icon: LucideIcon; title: string; body: string; note: string }[] = [
  {
    icon: Smartphone,
    title: 'Flutter client',
    body: 'One codebase written for Android and iOS, built to feel native on both rather than like a web page in a shell.',
    note: 'Android 8+ · iOS 15+',
  },
  {
    icon: Radio,
    title: 'WebRTC calls',
    body: 'Voice and video go peer-to-peer once the two devices have found each other, so the media never has to pass through us.',
    note: 'Audio and video',
  },
  {
    icon: Server,
    title: 'Signalling',
    body: 'Our own signalling service carries offers, answers and ICE candidates. It introduces the devices and then stays out of the media path.',
    note: 'Connection setup',
  },
  {
    icon: WifiOff,
    title: 'Offline outbox',
    body: 'A message written without signal is queued locally and sent the moment the phone reconnects. Nothing asks you to resend it.',
    note: 'Offline-first',
  },
  {
    icon: ScanLine,
    title: 'Multi-device',
    body: 'Scan a QR code to sign in on another phone. The same account, the same conversations, without typing a code.',
    note: 'QR sign-in',
  },
  {
    icon: Lock,
    title: 'Encryption',
    body: 'Chats and call media are encrypted in transit. The default is the encrypted path, not a switch buried in settings.',
    note: 'Encrypted in transit',
  },
]

export const roadmap: {
  status: 'Available now' | 'In the works' | 'Exploring'
  items: { t: string; d: string }[]
}[] = [
  {
    status: 'Available now',
    items: [
      { t: 'Deep links', d: 'The full xelvic:// scheme, live today.' },
      { t: 'QR sign-in', d: 'Move a session between phones by scanning a code.' },
      { t: 'Flutter client', d: 'One codebase for Android and iOS; both builds are live.' },
      { t: 'WebRTC calls', d: 'Peer-to-peer voice and video, encrypted in transit.' },
    ],
  },
  {
    status: 'In the works',
    items: [
      { t: 'Public API', d: 'Read-only access first, with early access by request.' },
      { t: 'Event webhooks', d: 'Know when a Drop, Vibe or room changes.' },
      { t: 'Creator Insights API', d: 'The numbers a creator sees, in their own tools.' },
    ],
  },
  {
    status: 'Exploring',
    items: [
      { t: 'Embeddable Moments', d: 'Put a Moment on a page without rebuilding it.' },
      { t: 'Partner rooms', d: 'Open a Live room from a partner surface.' },
      { t: 'Official SDKs', d: 'Thin wrappers once the API has settled.' },
    ],
  },
]

export const developerFaqs = [
  {
    q: 'Do deep links need an API key?',
    a: 'No. They are ordinary URI schemes that open a screen in the app. A public API, with keys and rate limits, is a separate thing and is still in the works.',
  },
  {
    q: 'How do I test a deep link?',
    a: 'Open it on a device that has Xelvic installed — from a browser, a QR code or another app. The operating system hands the scheme to Xelvic. If the person is signed out, the app takes them through sign-in and then continues to the destination.',
  },
  {
    q: 'Which platforms are supported?',
    a: 'Android 8.0 Oreo and later, and iOS 15 and later on iPhone and iPad. There is one Flutter codebase behind both, so a link behaves the same on either platform.',
  },
  {
    q: 'Is there an SDK?',
    a: 'Not yet. Deep links do not need one: they are just URLs. We would rather ship a small, stable API and then wrap it than ship a wrapper around an API that is still moving.',
  },
  {
    q: 'Can I embed Xelvic content on my site?',
    a: 'Not today. Embeddable Moments are on the exploring list. If you have a specific surface in mind, tell us about it — the shape of the integration will decide what we build first.',
  },
  {
    q: 'How do I get early access to the API?',
    a: 'Get in touch through the contact page and describe what you are building. Early access is handled in small groups so the first integrations get real support.',
  },
]
