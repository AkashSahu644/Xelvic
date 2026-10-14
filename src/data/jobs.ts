export type Job = {
  id: string
  title: string
  team: string
  location: string
  type: string
  summary: string
  responsibilities: string[]
  requirements: string[]
}

export const departments = ['Engineering', 'Design', 'Product', 'Trust & Safety', 'Marketing', 'Operations']

export const jobs: Job[] = [
  {
    id: 'senior-flutter-engineer',
    title: 'Senior Flutter Engineer',
    team: 'Engineering',
    location: 'Remote (IST ±4h)',
    type: 'Full-time',
    summary: 'Own and ship core app surfaces — chat, calls and live — in our Flutter codebase used by people every day.',
    responsibilities: [
      'Build and maintain feature surfaces across chat, calls, moments and live.',
      'Push real-time performance on low-end devices and shaky networks.',
      'Partner with design to make interactions feel effortless.',
    ],
    requirements: [
      '5+ years of mobile engineering, 2+ with Flutter/Dart.',
      'Experience with real-time systems (WebRTC, websockets, offline sync).',
      'A taste for polish and a bias for shipping.',
    ],
  },
  {
    id: 'realtime-infrastructure-engineer',
    title: 'Real-time Infrastructure Engineer',
    team: 'Engineering',
    location: 'Remote',
    type: 'Full-time',
    summary: 'Scale the signaling, presence and media infrastructure behind Xelvic calls, rooms and live.',
    responsibilities: [
      'Design signaling and TURN/STUN infrastructure for millions of calls.',
      'Keep latency low and connections reliable worldwide.',
      'Instrument everything and chase down the long tail.',
    ],
    requirements: [
      'Strong backend background (Go, Rust, or Node).',
      'Hands-on with WebRTC, SFUs, or large real-time systems.',
      'Comfortable with cloud infra and observability.',
    ],
  },
  {
    id: 'product-designer',
    title: 'Product Designer',
    team: 'Design',
    location: 'Remote',
    type: 'Full-time',
    summary: 'Shape how Xelvic feels — from the first hello to going live — with motion-rich, playful design.',
    responsibilities: [
      'Design end-to-end flows across messaging, social and creator tools.',
      'Prototype motion and micro-interactions.',
      'Help evolve our theme and Drip visual systems.',
    ],
    requirements: [
      '4+ years designing consumer mobile products.',
      'A portfolio that shows craft and motion sensibility.',
      'Fluency in Figma and prototyping tools.',
    ],
  },
  {
    id: 'trust-safety-lead',
    title: 'Trust & Safety Lead',
    team: 'Trust & Safety',
    location: 'Remote',
    type: 'Full-time',
    summary: 'Build the policies, tooling and team that keep Xelvic a safe place to hang out.',
    responsibilities: [
      'Own content policy across moments, live, rooms and drops.',
      'Shape moderation tooling in the console with engineering.',
      'Respond to emerging risks quickly and thoughtfully.',
    ],
    requirements: [
      'Experience leading trust & safety at a consumer social app.',
      'Clear judgment under ambiguity.',
      'Care for both users and reviewers.',
    ],
  },
  {
    id: 'growth-marketer',
    title: 'Growth Marketer',
    team: 'Marketing',
    location: 'Remote',
    type: 'Full-time',
    summary: 'Grow Xelvic across the regions that love it, with campaigns that feel native to each community.',
    responsibilities: [
      'Run acquisition and lifecycle campaigns end to end.',
      'Partner with creators to reach new audiences.',
      'Measure, learn and double down on what works.',
    ],
    requirements: [
      '4+ years in consumer growth marketing.',
      'Data-driven, creative, and fast-moving.',
      'Bonus: experience in South Asian markets.',
    ],
  },
  {
    id: 'community-manager',
    title: 'Community Manager',
    team: 'Operations',
    location: 'Remote',
    type: 'Full-time',
    summary: 'Be the voice of Xelvic in our communities, and the voice of our communities inside Xelvic.',
    responsibilities: [
      'Nurture creator and user communities across platforms.',
      'Run programs, events and feedback loops.',
      'Surface what people love and what they need.',
    ],
    requirements: [
      '3+ years in community or social management.',
      'Great writing and a warm, human tone.',
      'Organized and genuinely people-first.',
    ],
  },
]

export const getJob = (id: string) => jobs.find((j) => j.id === id)
