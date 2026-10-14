import {
  MessageCircle,
  Phone,
  Sparkles,
  Radio,
  Image,
  Music,
  Palette,
  Users,
  ShieldCheck,
  Flame,
  BadgeCheck,
  Compass,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export type Feature = {
  slug: string
  icon: LucideIcon
  name: string
  tagline: string
  blurb: string
  color: string
  points: { title: string; body: string }[]
  // real app screen (from extracted theme art) used in mockups
  screen?: string
  quote?: string
}

export const features: Feature[] = [
  {
    slug: 'chat',
    icon: MessageCircle,
    name: 'Messaging',
    tagline: 'Conversations that feel alive',
    blurb:
      'One-to-one and group chat with channels, voice notes, media and documents — delivered reliably, even offline.',
    color: '#ec4899',
    screen: '/media/themes/animeblue/chat.jpg',
    quote: 'Calls and messages, wherever you are in the app.',
    points: [
      { title: 'Groups & channels', body: 'A channel is a room inside your group — everybody reads, admins post.' },
      { title: 'Voice notes', body: 'Hold the mic to record. Slide up to lock it, left to cancel.' },
      { title: 'Offline-first', body: 'Messages queue in an outbox and send themselves the moment you reconnect.' },
      { title: 'Delivery & read receipts', body: 'Know what landed and what was seen, in order.' },
    ],
  },
  {
    slug: 'calls',
    icon: Phone,
    name: 'Voice & Video Calls',
    tagline: 'Crisp calls, powered by WebRTC',
    blurb:
      'Peer-to-peer voice and video built on WebRTC for low-latency calls that hold up even on shaky networks.',
    color: '#ff77b0',
    screen: '/media/themes/catgirl/live.jpg',
    quote: 'Calls you make and calls you miss are kept here.',
    points: [
      { title: 'Add people on the fly', body: 'Pull friends into an ongoing call with a tap.' },
      { title: 'Encrypted media', body: 'Call media is encrypted in transit, so nothing sitting on the network path can listen in.' },
      { title: 'Call history', body: 'Every call you make or miss is kept neatly in one place.' },
      { title: 'Works everywhere', body: 'Calls and messages follow you across every screen in the app.' },
    ],
  },
  {
    slug: 'moments',
    icon: Sparkles,
    name: 'Moments & Memories',
    tagline: "Here today, a memory tomorrow",
    blurb:
      'Share the little things with text, polls and music. After a day they tuck themselves away into Memories.',
    color: '#db2777',
    screen: '/media/themes/animeblue/moments.jpg',
    quote:
      'What the people you follow put up today turns up here, and is gone tomorrow.',
    points: [
      { title: 'Text, polls & music', body: 'Post a thought, ask the room, or set it to a track.' },
      { title: 'Mention your people', body: 'A moment can name up to 5 people.' },
      { title: 'Memories', body: 'Everything you post is kept in a Memory once its day is over.' },
      { title: 'Just for followers', body: 'Only the people you follow see what you put up.' },
    ],
  },
  {
    slug: 'live-rooms',
    icon: Radio,
    name: 'Live & Rooms',
    tagline: 'Go live. Hold the room.',
    blurb:
      'Stream live by camera or text, or open an audio room where you hand out the mics — and even watch a game together.',
    color: '#be185d',
    screen: '/media/themes/catgirl/audio.jpg',
    quote:
      'Anybody can walk in. You hold the room, which means you hand out the microphones.',
    points: [
      { title: 'Go live your way', body: 'Camera live, text live — announced to everyone who follows you.' },
      { title: 'Audio rooms', body: 'You open it, hand out mics, and you are the one who closes it.' },
      { title: 'Watch together', body: 'Pick a game and the board becomes the stream — everyone sees the same thing.' },
      { title: 'Host controls', body: 'Full moderation so your room stays yours.' },
    ],
  },
  {
    slug: 'drops-vibes',
    icon: Image,
    name: 'Drops & Vibes',
    tagline: 'Your feed, your frame',
    blurb:
      'Post photo Drops and short-video Vibes. Feel them, leave notes, and find more of what you are into.',
    color: '#ff5fa2',
    screen: '/media/themes/animeblue/drops.jpg',
    quote: 'Drops from people you follow turn up here.',
    points: [
      { title: 'Drops', body: 'Photo posts — every picture in a drop is posted at this one frame.' },
      { title: 'Vibes', body: 'Short-video reels with voice and music, built for the scroll.' },
      { title: 'Feels & notes', body: 'Feel a post with the heart, and leave a note right on it.' },
      { title: 'Tuned to you', body: 'Pick interests and your feed follows along.' },
    ],
  },
  {
    slug: 'audio',
    icon: Music,
    name: 'Audio & Music',
    tagline: 'A soundtrack for every mood',
    blurb:
      'Stream tracks, build playlists, follow the charts and share a song straight into any chat — online or off.',
    color: '#ff8fc4',
    screen: '/media/themes/alone/audio.jpg',
    quote: 'For later, on every phone you sign in on.',
    points: [
      { title: 'Charts & trending', body: 'See what everyone is playing right now.' },
      { title: 'Playlists', body: 'Line up the tracks that match the moment.' },
      { title: 'Share to chat', body: 'Drop a song straight into a conversation.' },
      { title: 'Offline', body: 'Save tracks for later, on every phone you sign in on.' },
    ],
  },
  {
    slug: 'themes',
    icon: Palette,
    name: 'Themes & Drip',
    tagline: 'A look for every you',
    blurb:
      'Flip your whole app into a new world with 50+ themes, chat wallpapers and wearable "Drip" for your profile.',
    color: '#ec4899',
    screen: '/media/themes/catgirl/convo.jpg',
    quote: 'This is the one you are wearing.',
    points: [
      { title: '50+ themes', body: 'Anime, kitsune, shinobi, unicorn, mecha and more.' },
      { title: 'Chat wallpapers', body: 'Set the scene with hand-painted backdrops.' },
      { title: 'Drip wearables', body: 'Dress your profile in cosmetic looks.' },
      { title: 'Unlocked by Sparks', body: 'Keep the spark going and new looks open up.' },
    ],
  },
]

export const socialFeatures = [
  {
    icon: Flame,
    name: 'Sparks',
    body: 'A day two people talk on is one spark. Keep it alive and unlock new looks.',
  },
  {
    icon: Users,
    name: 'Circles',
    body: 'Land in a circle of fifty who chose the same interest, with a small daily task. Best take goes to the top.',
  },
  {
    icon: BadgeCheck,
    name: 'Verification',
    body: 'Ask for the mark that says this account is really you.',
  },
  {
    icon: ShieldCheck,
    name: 'Private Vault',
    body: 'Move a chat into an encrypted vault. Hidden — type your code where you would type a name.',
  },
  {
    icon: Compass,
    name: 'Explore & Search',
    body: 'Find people, drops, places and trending tags across all of Xelvic.',
  },
  {
    icon: BadgeCheck,
    name: 'QR & Multi-device',
    body: 'Scan to sign in, and manage every phone you use from one place.',
  },
]

export const getFeature = (slug: string) => features.find((f) => f.slug === slug)

/* ------------------------------------------------------------------ *
 * How each feature actually works — the "where do I tap / how do I   *
 * get there" layer that was missing. Keyed by feature slug.          *
 * ------------------------------------------------------------------ */

export type HowStep = { tap: string; detail: string }
export type FeatureGuide = {
  /** breadcrumb-style path to reach the feature in the app */
  path: string[]
  /** the demo animation to show alongside */
  demo: 'chat' | 'call' | 'moments' | 'live' | 'audio' | 'drops'
  /** real screenshots to show in a gallery */
  shots: { src: string; caption: string }[]
  /** tap-by-tap walkthrough */
  steps: HowStep[]
  /** quick gestures / shortcuts */
  tips: string[]
}

export const featureGuides: Record<string, FeatureGuide> = {
  chat: {
    path: ['Open Xelvic', 'Chats tab', 'Tap a conversation'],
    demo: 'chat',
    shots: [
      { src: '/media/themes/animeblue/chat.jpg', caption: 'Your chat list' },
      { src: '/media/themes/animeblue/convo.jpg', caption: 'Inside a conversation' },
      { src: '/media/themes/teddy/convo.jpg', caption: 'Dressed in a theme' },
    ],
    steps: [
      { tap: 'Tap the ✎ compose button', detail: 'Bottom-right of the Chats tab opens a new message. Pick a person or start a group.' },
      { tap: 'Type, or hold the 🎤 mic', detail: 'Hold to record a voice note. Slide up to lock hands-free, slide left to cancel.' },
      { tap: 'Tap + for media & docs', detail: 'Attach photos, videos, files or a song straight from your library.' },
      { tap: 'Long-press any message', detail: 'Reply, react, forward, copy, or move the whole chat into your Private Vault.' },
    ],
    tips: [
      'A single ✓ means sent, ✓✓ means delivered, a highlighted ✓✓ means read.',
      'Lost signal? Messages wait in an outbox and send the moment you reconnect.',
      'Open a group → tap its name → Channels to post admin-only announcements.',
    ],
  },
  calls: {
    path: ['Open a chat', 'Tap the 📞 or 🎥 icon', 'Top-right of the conversation'],
    demo: 'call',
    shots: [
      { src: '/media/themes/catgirl/live.jpg', caption: 'In-call screen' },
      { src: '/media/themes/animeblue/convo.jpg', caption: 'Start from any chat' },
    ],
    steps: [
      { tap: 'Open any conversation', detail: 'The phone 📞 (voice) and camera 🎥 (video) icons sit in the top-right header.' },
      { tap: 'Tap 📞 or 🎥 to ring', detail: 'The call connects peer-to-peer over WebRTC for low-latency, encrypted media.' },
      { tap: 'Tap ＋ during a call', detail: 'Pull more friends into an ongoing call without hanging up.' },
      { tap: 'Check the Calls tab', detail: 'Every call you make or miss is kept neatly, with a tap to call back.' },
    ],
    tips: [
      'Calls hold up on shaky networks — quality adapts automatically.',
      'Flip between front/back camera with the ↺ icon mid-call.',
      'Mute, video-off and speaker controls live along the bottom bar.',
    ],
  },
  moments: {
    path: ['Home feed', 'Tap your avatar ring', 'or swipe to Moments'],
    demo: 'moments',
    shots: [
      { src: '/media/themes/animeblue/moments.jpg', caption: 'A moment playing' },
      { src: '/media/themes/catgirl/moment.jpg', caption: 'Add music & polls' },
    ],
    steps: [
      { tap: 'Tap your avatar with the + ring', detail: 'At the top of the feed — this opens the Moment composer.' },
      { tap: 'Add text, a poll or music', detail: 'Set the mood with a track, ask the room with a poll, or just drop a thought.' },
      { tap: 'Mention up to 5 people', detail: 'Type @ to tag the people who should see themselves in it.' },
      { tap: 'Post — it lasts 24 hours', detail: 'Followers see it today; tomorrow it tucks itself into your Memories.' },
    ],
    tips: [
      'Only people you follow back can see your Moments.',
      'Open Profile → Memories to relive everything you have ever posted.',
      'Tap-and-hold a moment to pause it; swipe sideways to skip.',
    ],
  },
  'live-rooms': {
    path: ['Live tab', 'Tap Go Live', 'Pick camera, text or audio room'],
    demo: 'live',
    shots: [
      { src: '/media/themes/catgirl/audio.jpg', caption: 'An audio room' },
      { src: '/media/themes/catgirl/live.jpg', caption: 'Camera live' },
    ],
    steps: [
      { tap: 'Open the Live tab', detail: 'See who is live right now, or start your own broadcast.' },
      { tap: 'Tap Go Live', detail: 'Choose Camera live, Text live, or open an Audio room. Followers get a ping.' },
      { tap: 'Hand out the mic 🎤', detail: 'In an audio room you are the host — tap a listener to invite them up to speak.' },
      { tap: 'Start Watch Together', detail: 'Pick a game and the board becomes the stream so everyone sees the same thing.' },
    ],
    tips: [
      'You opened the room, so you close it — full host moderation is built in.',
      'Remove or mute anyone with a tap on their avatar.',
      'Comments and reactions float up live along the bottom of the screen.',
    ],
  },
  'drops-vibes': {
    path: ['Home feed', 'Tap ＋', 'Choose Drop or Vibe'],
    demo: 'drops',
    shots: [
      { src: '/media/themes/animeblue/drops.jpg', caption: 'A photo Drop' },
      { src: '/media/themes/catgirl/drops.jpg', caption: 'Short-video Vibes' },
    ],
    steps: [
      { tap: 'Tap ＋ in the feed', detail: 'Choose a Drop (photos) or a Vibe (short video with voice & music).' },
      { tap: 'Pick your frame', detail: 'Every picture in a Drop is pinned at the same frame so your grid stays clean.' },
      { tap: 'Add music to a Vibe', detail: 'Lay a track under your clip and let it loop for the scroll.' },
      { tap: 'Share & get notes', detail: 'People react, reply and leave little notes right on your post.' },
    ],
    tips: [
      'Pick your interests in Explore and your feed tunes itself to you.',
      'Tap the heart to feel a post; long-press to save it for later.',
      'Drops from the people you follow surface at the top of the feed.',
    ],
  },
  audio: {
    path: ['Audio tab', 'Browse charts', 'Tap any track'],
    demo: 'audio',
    shots: [
      { src: '/media/themes/alone/audio.jpg', caption: 'Now playing' },
      { src: '/media/themes/animeblue/audio.jpg', caption: 'Charts & trending' },
    ],
    steps: [
      { tap: 'Open the Audio tab', detail: 'Charts and trending show what everyone is playing right now.' },
      { tap: 'Tap a track to play', detail: 'A mini-player sticks to the bottom so you can keep browsing.' },
      { tap: 'Build a playlist', detail: 'Line up the tracks that match the moment and save them.' },
      { tap: 'Share to a chat', detail: 'Hit share on any song to drop it straight into a conversation.' },
    ],
    tips: [
      'Save tracks offline — they follow you to every phone you sign in on.',
      'Your playlists sync across devices automatically.',
      'Set a Moment to a track so your story has a soundtrack.',
    ],
  },
  themes: {
    path: ['Profile', 'Settings ⚙️', 'Appearance → Themes'],
    demo: 'chat',
    shots: [
      { src: '/media/themes/catgirl/convo.jpg', caption: 'Catgirl theme' },
      { src: '/media/themes/teddy/convo.jpg', caption: 'Teddy theme' },
      { src: '/media/themes/alone/convo.jpg', caption: 'Alone theme' },
    ],
    steps: [
      { tap: 'Open Settings → Appearance', detail: 'Tap your profile, then the ⚙️ gear, then Appearance.' },
      { tap: 'Pick a theme', detail: 'Preview any of the 50+ looks live, then apply to flip your whole app.' },
      { tap: 'Set a chat wallpaper', detail: 'Choose a hand-painted backdrop for your conversations.' },
      { tap: 'Dress your profile in Drip', detail: 'Add cosmetic wearables that show on your avatar and profile.' },
    ],
    tips: [
      'Keep a spark going with a friend to unlock more looks.',
      'Each theme restyles chats, buttons, loaders and the whole UI.',
      'Switch back any time — nothing you post is tied to a theme.',
    ],
  },
}

export const getGuide = (slug: string): FeatureGuide | undefined => featureGuides[slug]
