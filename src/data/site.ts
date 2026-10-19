// Central site configuration — single source of truth for SEO & brand metadata.
export const site = {
  name: 'Xelvic',
  /* The marketing site's production origin. Every canonical, sitemap entry,
     Open Graph URL and structured-data @id is built from this one string, so
     it is the only place the domain is written down. The app itself lives at
     `web.xelvic.com` and is a separate origin on purpose: the two have
     different jobs, and pointing a canonical at the app would tell Google the
     marketing pages are duplicates of it. */
  url: 'https://xelvic.com',
  tagline: 'Chat, Spark, Vibe & more',
  /* The sitewide description. It shows up in three places that are easy to
     forget about: the Organization, WebSite and SoftwareApplication nodes that
     ride along in every page's structured data, and the fallback description
     for a route that is not in the table. So it names the app's own surfaces
     rather than trailing off into "and more" — an answer engine reading it
     should come away knowing what Xelvic does, not that it does several
     things. */
  description:
    'Xelvic is a free social and messaging app for iOS, Android and the web: chat and group messaging, voice and video calls, Moments, live rooms, Drops and Vibes, music, a daily Spark streak, 33 themes and a private, encrypted Vault.',
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
