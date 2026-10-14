// Central site configuration — single source of truth for SEO & brand metadata.
export const site = {
  name: 'Xelvic',
  // Production origin. Update this to the real domain at launch.
  url: 'https://xelvic.app',
  tagline: 'Chat. Call. Vibe.',
  description:
    'Xelvic — chat, call, go live and vibe. One app for messaging, voice & video calls, moments, live rooms, music and more.',
  // Default social share image (1200×630). Lives in /public/og.
  ogImage: '/og/xelvic-og.png',
  locale: 'en_US',
  twitter: '@xelvic',
  email: 'hello@xelvic.app',
  /* The web app. The header's sign-in pill and the Download page both point
     here, so somebody who already has an account never has to install
     anything to get back into it. */
  web: 'https://web.xelvic.com',
  social: {
    x: 'https://x.com/xelvic',
    instagram: 'https://instagram.com/xelvic',
    youtube: 'https://youtube.com/@xelvic',
    tiktok: 'https://tiktok.com/@xelvic',
    linkedin: 'https://linkedin.com/company/xelvic',
  },
} as const

/** Build an absolute URL from a site-relative path. */
export function absoluteUrl(path = '/'): string {
  if (/^https?:\/\//.test(path)) return path
  return `${site.url}${path.startsWith('/') ? '' : '/'}${path}`
}
