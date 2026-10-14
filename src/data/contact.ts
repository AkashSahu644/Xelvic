/**
 * The Contact page's two lists, kept out of the page so the structured data can
 * be built from them.
 *
 * `doors` is not decoration: each entry is a real inbox, and `contactPageLd`
 * publishes them as the organization's contact points. If they lived inside
 * Contact.tsx the schema would have to repeat the addresses by hand, and a
 * repeated address is one that can be wrong in only one of the two places.
 */

export type Door = {
  /** What the address is for, in the reader's words. */
  k: string
  address: string
  d: string
  when: string
}

/* One address per reason somebody writes to us. Nine doors rather than one
   inbox, because the address you choose is most of the routing. */
export const doors: Door[] = [
  {
    k: 'Anything at all',
    address: 'hello@xelvic.app',
    d: 'Questions about the app, an idea you think we should build, a correction to something on this site, or a compliment. If you are not sure which address to use, use this one and we will move it.',
    when: 'Answered within two working days',
  },
  {
    k: 'Help and support',
    address: 'support@xelvic.app',
    d: 'Something is not working, or working in a way you did not expect. The Help Center answers most of it instantly; write here when it does not, and tell us the phone and the app version.',
    when: 'Answered within two working days',
  },
  {
    k: 'Safety',
    address: 'safety@xelvic.app',
    d: 'A threat, a person who will not stop, or something that worries you about somebody else on the app. Reports sent from inside the app reach the moderation queue directly; this address is for everything the queue cannot hold.',
    when: 'Triaged the same day',
  },
  {
    k: 'Security',
    address: 'security@xelvic.app',
    d: 'A vulnerability you have found, or a sign-in you do not recognise. If you are reporting a flaw, say how to reproduce it and give us a chance to fix it before you publish — we credit researchers who ask.',
    when: 'Acknowledged within 24 hours',
  },
  {
    k: 'Privacy and data',
    address: 'privacy@xelvic.app',
    d: 'A question about what we hold, a request to see it, or a request to delete it. Deleting the account inside the app is faster than writing to us, but this address exists for anything the app does not cover.',
    when: 'Answered within 30 days',
  },
  {
    k: 'Press',
    address: 'press@xelvic.app',
    d: 'Interviews, assets, briefings, comment and corrections. The Press page already carries the fast facts, the numbers the app enforces and the wording we would ask you to use.',
    when: 'Answered the same working day',
  },
  {
    k: 'Careers',
    address: 'careers@xelvic.app',
    d: 'An application, or an argument for a role we have not advertised. Put the role in the subject line and send something you have made along with it.',
    when: 'Answered within a week of the last interview',
  },
  {
    k: 'Partnerships',
    address: 'partners@xelvic.app',
    d: 'Brands and creators, integrations, and anything involving our name or logo on something we have not seen. If you are a creator already in a deal, your deal page is faster than this address.',
    when: 'Answered within two working days',
  },
  {
    k: 'Legal',
    address: 'legal@xelvic.app',
    d: 'Notices, takedowns, law-enforcement requests and anything contractual. Include the document you are referring to and the jurisdiction you are writing from.',
    when: 'Acknowledged within two working days',
  },
]

/* Four things that get a faster answer, and one thing we will never ask for. */
export const before = [
  {
    t: 'Write from the address on your account',
    d: 'It tells us which account you mean without any back and forth, and it is the only way we can act on a request about your own data. If you must write from another address, say which account it concerns in the first line.',
  },
  {
    t: 'Name the handle, not the display name',
    d: 'Display names repeat and change; the handle is unique and it is what the moderation queue and the search box both work from. One handle saves a round trip.',
  },
  {
    t: 'For a bug, tell us what you did',
    d: 'What you tapped, what you expected, what happened instead, and the phone and app version. A screenshot helps enormously and a screen recording helps more — but send it as an attachment rather than a link that expires.',
  },
  {
    t: 'Say what outcome you want',
    d: '“I want the message deleted”, “I want to know why this happened”, “I want this person to stop being able to reach me”. We can act on a request; we can only guess at a complaint.',
  },
]

/* The topics the form offers. Routed the same way the addresses above are, so
   the two lists have to stay in step — the first four line up with `doors`. */
export const topics = [
  'General question',
  'Help and support',
  'Report a problem',
  'Safety',
  'Security',
  'Privacy and data',
  'Press',
  'Careers',
  'Partnerships',
  'Something else',
]
