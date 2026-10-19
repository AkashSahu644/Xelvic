export type PostSection = { heading: string; body: string[] }

export type Post = {
  slug: string
  title: string
  subtitle?: string
  excerpt: string
  category: string
  date: string
  readTime: string
  author: string
  authorRole?: string
  authorBio?: string
  cover: string
  /** opening paragraphs, shown before the sections */
  body: string[]
  /** the long-form body: one heading and its paragraphs per section */
  sections?: PostSection[]
  takeaways?: string[]
  quote?: string
  tags?: string[]
}

export const posts: Post[] = [
  {
    slug: 'say-hello-to-xelvic',
    title: 'Say hello to Xelvic',
    subtitle:
      'One app for the people you talk to every day — built so the talking, the hanging out and the making-it-yours all live in one place.',
    excerpt:
      'One app for the people you talk to every day — chat, call, go live and vibe, all in one place.',
    category: 'Product',
    date: '2026-09-28',
    readTime: '4 min',
    author: 'The Xelvic Team',
    authorRole: 'The team behind Xelvic',
    authorBio:
      'Product, design and engineering notes from the people building Xelvic. We write when there is something worth showing, roughly every other week.',
    cover: '/media/walls/xelvic.jpg',
    body: [
      'We built Xelvic around a simple idea: the people you care about should all live in one place that actually feels good to open.',
      'This is the short tour — what is in the app today, why it is arranged this way, and what we are working on next.',
    ],
    sections: [
      {
        heading: 'One place for the people you actually talk to',
        body: [
          'Most people juggle three apps to say one thing: a group chat here, a video call there, a photo dump somewhere else. Xelvic starts from the opposite direction — one home for the people you talk to every day.',
          'Messages, calls, Moments and live rooms share the same list of people and the same level of quiet. A conversation can turn into a call, then into a room, without anyone sending a fresh invite.',
        ],
      },
      {
        heading: 'A feed that keeps the small stuff',
        body: [
          'Drops are photo posts with a fixed frame, while Vibes are short videos with voice and music under them. You can feel a post or leave a note right on it; both stay with the post instead of disappearing into a separate inbox.',
          'Moments are the lighter layer: text, a poll, or a track that lasts a day and then settles into Memories. It is the part of the app for saying “this is what today looked like”.',
        ],
      },
      {
        heading: 'Calls that behave like messages',
        body: [
          'Voice and video calls run peer-to-peer over WebRTC, with our own signalling service introducing the two phones and handing out ICE servers. Media is encrypted in transit, and the quality steps down gracefully when the network does.',
          'You can pull another friend into a call already in progress, see every call you made or missed in the Calls tab, and move from a conversation to a call without leaving the thread.',
        ],
      },
      {
        heading: 'The app should look like you',
        body: [
          'Themes re-skin chats, calls, buttons, loaders and your profile as one world, not a colour swap. There are 33 looks now — 17 character packs and 16 colour-only themes — with hand-painted chat wallpapers and Drip for your avatar.',
          'Sparks keep the whole thing moving: one day of talking with someone is one spark, and keeping those going opens new looks. It is a small reward for staying close, not a leaderboard.',
        ],
      },
      {
        heading: 'What comes next',
        body: [
          'The long list is still long: sharper search, better offline behaviour, more tools for creators and a few things we are not naming yet. What matters is the order — the people you talk to first, the surfaces second.',
          'If something in the app feels wrong, tell us. The feedback that shapes this build comes from the same place the app does.',
        ],
      },
    ],
    takeaways: [
      'One home for chats, calls, Drops, Vibes, Moments, live rooms and audio.',
      'Themes, wallpapers and Drip make the whole app feel personal.',
      'Sparks reward the habit of staying close to your people.',
    ],
    quote:
      'The people you care about should all live in one place that actually feels good to open.',
    tags: ['Launch', 'Messaging', 'Calls', 'Drops & Vibes', 'Themes'],
  },
  {
    slug: 'the-story-behind-our-themes',
    title: 'The story behind our 18 themes',
    subtitle:
      'From Kitsune to Mecha — how a mood becomes a mascot, and a mascot becomes a whole app you can wear.',
    excerpt:
      'From Kitsune to Mecha — how we design a world you can wear on your whole app.',
    category: 'Design',
    date: '2026-09-15',
    readTime: '6 min',
    author: 'Design at Xelvic',
    authorRole: 'Design at Xelvic',
    authorBio:
      'Notes from the design team on themes, Drip, Moments and the small details that make the app feel less like software.',
    cover: '/media/themes/catgirl/convo.jpg',
    body: [
      'A theme is more than a colour swap. Each one re-skins chat, calls, Moments, Live and your profile into a single, consistent world.',
      'Here is how a look gets from a mood board to every surface in the app.',
    ],
    sections: [
      {
        heading: 'A theme is a world, not a wallpaper',
        body: [
          'The first version of theming was a colour picker. It worked, and it was cold. A pink bubble in an otherwise untouched app still reads as the same app wearing a filter.',
          'So we set a harder rule: a theme has to change character. The bubble shape, the button corners, the loading dots, the empty states and the profile all have to agree with each other.',
        ],
      },
      {
        heading: 'From mood to mascot',
        body: [
          'Every character pack starts as a sentence, not a drawing — “the one who texts at 2am”, “the one who brings a whole playlist to a call”. The mood board comes next, then a mascot pose that can carry the pack across screens.',
          'Only after the character can hold a conversation do we pick colours. If the palette is doing all the work, the theme is not finished.',
        ],
      },
      {
        heading: 'Painting every surface',
        body: [
          'Chats get their own wallpaper, but the work does not stop at the header. Calls need a background that does not fight the camera. Moments need type that survives a photo. Live rooms need a stage that stays readable with twelve people in it.',
          'Themes are built from the same tokens as the rest of the app, so a change to a button radius moves through every surface at once. That is also why a theme can ship without a second implementation.',
        ],
      },
      {
        heading: 'The first 18, and the 15 after',
        body: [
          'The shelf opened with 18 themes and a promise that each one would be a whole look. It now holds 33: 17 character packs and 16 colour-only themes, most with a light cover.',
          'The colour-only themes exist for the days when you want a different mood without a mascot looking back at you. Same system, different volume.',
        ],
      },
      {
        heading: 'Sparks open the wardrobe',
        body: [
          'Themes unlock through Sparks — the streak you build by talking to someone on a given day. The idea is not scarcity. It is that the app keeps offering you a reason to come back to the same person.',
          'Nothing you post is tied to a theme, and switching back costs nothing. A look should feel like a jacket, not a commitment.',
        ],
      },
    ],
    takeaways: [
      'A theme changes character, not just colour.',
      '17 character packs and 16 colour-only looks share one token system.',
      'Sparks unlock new looks by keeping conversations alive.',
    ],
    quote: 'If the palette is doing all the work, the theme is not finished.',
    tags: ['Design', 'Themes', 'Drip', 'Mascots', 'Sparks'],
  },
  {
    slug: 'how-calls-stay-smooth',
    title: 'How Xelvic calls stay smooth on bad networks',
    subtitle:
      'A peek under the hood at the WebRTC pipeline powering voice and video — and what happens when the signal gives up.',
    excerpt: 'A peek under the hood at the WebRTC pipeline powering voice and video.',
    category: 'Engineering',
    date: '2026-08-30',
    readTime: '7 min',
    author: 'Engineering at Xelvic',
    authorRole: 'Engineering at Xelvic',
    authorBio:
      'How the app is built: the trade-offs behind calls, sync, offline behaviour and the things that have to hold up outside a demo.',
    cover: '/media/themes/alone/live.jpg',
    body: [
      'Xelvic calls are peer-to-peer over WebRTC. Our own signalling service sets up the connection and hands out ICE servers so two phones can find each other.',
      'This is what happens between the tap and the first frame — and what we do when the network stops cooperating.',
    ],
    sections: [
      {
        heading: 'Peer-to-peer first',
        body: [
          'A Xelvic call does not route your voice through our servers. Once the two phones have found each other, audio and video travel directly between them; our job is to introduce them and then get out of the way.',
          'That keeps latency low and means a call costs less to run. It also means the hard part is not the media — it is the introduction.',
        ],
      },
      {
        heading: 'Finding each other',
        body: [
          'Signalling is our own service: it carries offers, answers and ICE candidates between participants, and it stays out of the media path. ICE servers help two devices behind different NATs agree on a route.',
          'When a direct route is not possible, the call can fall back through a relay. The goal is that the person on the other end never has to know which path was chosen.',
        ],
      },
      {
        heading: 'When the network gives up',
        body: [
          'Bad networks do not usually fail all at once. They lose packets, change route, or go quiet for a second. The pipeline watches for those signals and adjusts bitrate, resolution and audio redundancy before the call turns into a slideshow.',
          'Recovery is tuned aggressively: a brief dip should cost a frame or two, not the sentence someone was halfway through. If the connection does drop, the call tries to re-establish rather than starting over.',
        ],
      },
      {
        heading: 'Keeping it private',
        body: [
          'Media is encrypted in transit, so nothing sitting on the network path can listen in. The signalling service sees how to reach a device, not what is said once the route is open.',
          'Encryption is the default rather than a setting, and it applies to group calls the same way it applies to a one-to-one conversation.',
        ],
      },
      {
        heading: 'What we measure',
        body: [
          'We watch join time, time-to-first-frame, packet loss under load, and how often a call has to fall back to relay. Those numbers matter more than a clean demo on office Wi-Fi.',
          'The next round of work is about the edges: switching networks mid-call, very old devices, and calls that start while the app is still waking up.',
        ],
      },
    ],
    takeaways: [
      'Media goes directly between devices; signalling only introduces them.',
      'Bitrate, resolution and audio redundancy adapt before a call breaks.',
      'Encryption is the default, including in group calls.',
    ],
    quote:
      'A brief dip should cost a frame or two, not the sentence someone was halfway through.',
    tags: ['Engineering', 'WebRTC', 'Calls', 'Networks', 'Privacy'],
  },
  {
    slug: 'building-for-creators',
    title: 'Building for creators from day one',
    subtitle:
      'Insights, verification and brand deals with approval-gated payouts — in the open, on the same account you already use.',
    excerpt:
      'Insights, verification and brand deals with approval-gated payouts — in the open.',
    category: 'Creators',
    date: '2026-08-12',
    readTime: '5 min',
    author: 'The Xelvic Team',
    authorRole: 'The team behind Xelvic',
    authorBio:
      'Product, design and engineering notes from the people building Xelvic. We write when there is something worth showing, roughly every other week.',
    cover: '/media/themes/animeblue/drops.jpg',
    body: [
      'Creators are not an afterthought on Xelvic. Professional profiles, Insights and a verification mark are built into the same account people already use to message.',
      'This is what is there on day one, and what we are adding next.',
    ],
    sections: [
      {
        heading: 'A profile that means business',
        body: [
          'A creator should not need a second app to be taken seriously. Professional profiles on Xelvic carry the work, the audience and the proof in one place, with the same account people already message.',
          'That matters most at the hand-off: a brand can look at the profile, watch a Vibe, read the replies and decide without asking for screenshots.',
        ],
      },
      {
        heading: 'Insights, not vanity metrics',
        body: [
          'Insights show what a post actually did — who watched, who felt it, where people dropped off. The point is to make the next post better, not to decorate a media kit.',
          'Numbers are kept in the same place as the work, so a creator can see the arc of a series instead of a pile of disconnected posts.',
        ],
      },
      {
        heading: 'Deals with the payout held',
        body: [
          'Brands can invite a creator to make content and track the deal in the open. The creator uploads the deliverable, the brand approves it, and payment releases only after that approval.',
          'It is deliberately boring. The interesting part is that both sides can see the same state: brief, draft, approval, payout.',
        ],
      },
      {
        heading: 'Verification and the directory',
        body: [
          'Public creators with 2,000 keeps or more can appear in the creator directory, where brands search by the work rather than by keep count alone. Verification says the account is really the person behind it.',
          'The mark is not a ranking. It is a way to make a first message from a stranger feel less like a gamble.',
        ],
      },
      {
        heading: 'What creators get next',
        body: [
          'The next set of tools is about collaboration: shared drafts, clearer rights on a deal, and better ways to show a series as one body of work. We are also listening for the parts that feel like admin.',
          'The rule stays the same: if a feature only helps the platform look busy, it does not ship.',
        ],
      },
    ],
    takeaways: [
      'Professional profiles, Insights and verification ship with the account.',
      'Brand deals are approval-gated: payment releases after the work is signed off.',
      'Creators with 2k+ keeps can be found in the public directory.',
    ],
    quote:
      'The interesting part is that both sides can see the same state: brief, draft, approval, payout.',
    tags: ['Creators', 'Brands', 'Verification', 'Insights', 'Payouts'],
  },
]

export const getPost = (slug: string) => posts.find((p) => p.slug === slug)
