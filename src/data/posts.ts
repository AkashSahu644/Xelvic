export type Post = {
  slug: string
  title: string
  excerpt: string
  category: string
  date: string
  readTime: string
  author: string
  cover: string
  body: string[]
}

export const posts: Post[] = [
  {
    slug: 'say-hello-to-xelvic',
    title: 'Say hello to Xelvic',
    excerpt: 'One app for the people you talk to every day — chat, call, go live and vibe, all in one place.',
    category: 'Product',
    date: '2026-09-28',
    readTime: '4 min',
    author: 'The Xelvic Team',
    cover: '/media/walls/xelvic.jpg',
    body: [
      'We built Xelvic around a simple idea: the people you care about should all live in one place that actually feels good to open.',
      'Calls and messages follow you wherever you are in the app. Moments bring the little updates. Live and Rooms are there when you want to hang out out loud. And a wall of themes lets you make the whole thing feel like you.',
      'This is just the start. Over the coming months we will keep adding, polishing and listening. Welcome in.',
    ],
  },
  {
    slug: 'the-story-behind-our-themes',
    title: 'The story behind our 18 themes',
    excerpt: 'From Kitsune to Mecha — how we design a world you can wear on your whole app.',
    category: 'Design',
    date: '2026-09-15',
    readTime: '6 min',
    author: 'Design at Xelvic',
    cover: '/media/themes/catgirl/convo.jpg',
    body: [
      'A theme is more than a color swap. Each one re-skins chat, calls, moments, live and your profile into a single, consistent world.',
      'We start with a mood, build a mascot pose for it, then paint every surface so the moment you switch, the whole app changes character.',
      'Keep a spark going and new themes open up — a small reward for staying close to your people.',
    ],
  },
  {
    slug: 'how-calls-stay-smooth',
    title: 'How Xelvic calls stay smooth on bad networks',
    excerpt: 'A peek under the hood at the WebRTC pipeline powering voice and video.',
    category: 'Engineering',
    date: '2026-08-30',
    readTime: '7 min',
    author: 'Engineering at Xelvic',
    cover: '/media/themes/alone/live.jpg',
    body: [
      'Xelvic calls are peer-to-peer over WebRTC. Our own signaling service sets up the connection and hands out ICE servers so two phones can find each other.',
      'From there, media flows directly and is encrypted in transit. We tune bitrate and recovery hard so a call holds up even when the signal does not.',
      'The result: calls that connect fast and stay clear, wherever you are in the app.',
    ],
  },
  {
    slug: 'building-for-creators',
    title: 'Building for creators from day one',
    excerpt: 'Insights, verification and brand deals with approval-gated payouts — in the open.',
    category: 'Creators',
    date: '2026-08-12',
    readTime: '5 min',
    author: 'The Xelvic Team',
    cover: '/media/themes/animeblue/drops.jpg',
    body: [
      'Creators are not an afterthought on Xelvic. Professional profiles, Insights and a verification mark are built in.',
      'Brands can invite creators to make content and track paid deals in the open. The creator uploads the deliverable for approval, and payment is released only after the company approves.',
      'Public creators with 2k followers or more show up in the directory, so brands can find exactly the right collaborator.',
    ],
  },
]

export const getPost = (slug: string) => posts.find((p) => p.slug === slug)
