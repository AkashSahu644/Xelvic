import {
  BookOpen,
  Code,
  Compass,
  Database,
  Globe,
  Image as ImageIcon,
  Layers,
  LayoutGrid,
  Lock,
  MessageCircle,
  Music,
  Newspaper,
  Palette,
  PenTool,
  Phone,
  Radio,
  Settings,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export type NavLink = { label: string; to: string; desc?: string; icon?: LucideIcon }
export type NavGroup = { heading: string; links: NavLink[] }

// Header mega-menu groups. Every link carries an icon — the panel renders
// them as tiles, so a link without one would leave a hole in the grid.
export const productMenu: NavGroup[] = [
  {
    heading: 'Communicate',
    links: [
      { label: 'Messaging', to: '/features/chat', desc: 'Chat, groups & voice notes', icon: MessageCircle },
      { label: 'Voice & Video', to: '/features/calls', desc: 'Calls that just work', icon: Phone },
      { label: 'Live & Rooms', to: '/features/live-rooms', desc: 'Go live, hold the room', icon: Radio },
    ],
  },
  {
    heading: 'Share',
    links: [
      { label: 'Moments', to: '/features/moments', desc: 'Here today, memory tomorrow', icon: Sparkles },
      { label: 'Drops & Vibes', to: '/features/drops-vibes', desc: 'Your feed, your frame', icon: ImageIcon },
      { label: 'Audio & Music', to: '/features/audio', desc: 'A soundtrack for every mood', icon: Music },
    ],
  },
  {
    heading: 'Make it yours',
    links: [
      { label: 'Themes & Drip', to: '/features/themes', desc: '50+ looks & wearables', icon: Palette },
      { label: 'The Cast', to: '/characters', desc: '17 characters, one per theme', icon: Users },
      { label: 'All features', to: '/features', desc: 'The complete tour', icon: LayoutGrid },
      { label: 'How it works', to: '/how-it-works', desc: 'Hello to live in minutes', icon: Compass },
    ],
  },
]

export const resourcesMenu: NavGroup[] = [
  {
    heading: 'Discover',
    links: [
      { label: "What's New", to: '/whats-new', desc: 'The newest in the app', icon: Sparkles },
      { label: 'Explore', to: '/explore', desc: 'What people are doing', icon: Globe },
      { label: 'Overview', to: '/overview', desc: 'The big picture', icon: Layers },
      { label: 'Blog', to: '/blog', desc: 'Stories & updates', icon: Newspaper },
    ],
  },
  {
    heading: 'Build & create',
    links: [
      { label: 'Creators', to: '/creators', desc: 'Grow, collab & get paid', icon: TrendingUp },
      { label: 'Developers', to: '/developers', desc: 'Deep links & platform', icon: Code },
      { label: 'Brand Center', to: '/brand', desc: 'Logos & guidelines', icon: PenTool },
    ],
  },
  {
    heading: 'Help & trust',
    links: [
      { label: 'Help Center', to: '/help', desc: 'Answers & how-tos', icon: BookOpen },
      { label: 'Your Data', to: '/data', desc: 'What we do with it', icon: Database },
      { label: 'Settings', to: '/settings', desc: 'Every switch, explained', icon: Settings },
      { label: 'Safety', to: '/safety', desc: 'Staying safe on Xelvic', icon: ShieldCheck },
      { label: 'Security', to: '/security', desc: 'How we protect you', icon: Lock },
    ],
  },
]

// Footer sitemap
export const footerColumns: NavGroup[] = [
  {
    heading: 'Product',
    links: [
      { label: 'Messaging', to: '/features/chat' },
      { label: 'Calls', to: '/features/calls' },
      { label: 'Live & Rooms', to: '/features/live-rooms' },
      { label: 'Moments', to: '/features/moments' },
      { label: 'Drops & Vibes', to: '/features/drops-vibes' },
      { label: 'Audio', to: '/features/audio' },
      { label: 'Themes', to: '/features/themes' },
      { label: 'Download', to: '/download' },
    ],
  },
  {
    heading: 'Explore',
    links: [
      { label: "What's New", to: '/whats-new' },
      { label: 'Overview', to: '/overview' },
      { label: 'Explore', to: '/explore' },
      { label: 'How it works', to: '/how-it-works' },
      { label: 'The Cast', to: '/characters' },
      { label: 'Creators', to: '/creators' },
      { label: 'Developers', to: '/developers' },
      { label: 'Blog', to: '/blog' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About us', to: '/about' },
      { label: 'Careers', to: '/careers' },
      { label: 'Press', to: '/press' },
      { label: 'Brand Center', to: '/brand' },
      { label: 'Contact', to: '/contact' },
    ],
  },
  {
    heading: 'Support',
    links: [
      { label: 'Help Center', to: '/help' },
      { label: 'Settings', to: '/settings' },
      { label: 'Support', to: '/support' },
      { label: 'Community', to: '/community' },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { label: 'Privacy', to: '/privacy' },
      { label: 'Terms', to: '/terms' },
      { label: 'Your Data', to: '/data' },
      { label: 'Security', to: '/security' },
      { label: 'Safety', to: '/safety' },
    ],
  },
]
