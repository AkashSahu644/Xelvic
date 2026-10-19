/**
 * The five-step walkthrough, kept out of the page so the HowTo in the
 * structured data is written from the same array the walkthrough renders.
 *
 * A HowTo whose steps disagree with the visible instructions is worse than no
 * HowTo at all, so there is exactly one copy of them and both sides read it.
 */
import type { DemoKind } from '../components/ui/PhoneDemo'

export type GettingStartedStep = {
  n: string
  title: string
  body: string
  demo: DemoKind
  taps: string[]
}

export const gettingStarted: GettingStartedStep[] = [
  {
    n: '01',
    title: 'Create your account',
    body: 'Your name, your birthday, a number (or an email) and the six-digit code that proves it is you. Set a password and Xelvic rolls your @username — under a minute, no forms after that.',
    demo: 'onboarding',
    taps: ['Your name', 'Verify number', 'Set a password', 'Pick a @username'],
  },
  {
    n: '02',
    title: 'Find your people',
<<<<<<< HEAD
    body: 'Allow contacts and everyone already on Xelvic shows up right away — your numbers never leave your device in readable form. Prefer to search? Find anyone by name or @handle.',
    demo: 'contacts',
=======
    body: 'Allow contacts and everyone already on Xelvic shows up right away — each number is kept only as a one-way hash, with the name you saved it under. Prefer to search? Find anyone by name or @handle.',
    demo: 'chat',
>>>>>>> c5f79246d38c74d32ee2a76b625e4a0354f0285f
    taps: ['Allow contacts', 'See who is on Xelvic', 'or Search by @handle'],
  },
  {
    n: '03',
    title: 'Start talking',
    body: 'Send a message, hold the mic for a voice note, or tap the phone and camera icons to start a voice or video call. Everything is offline-first, so your messages always get there.',
    demo: 'chat',
    taps: ['Open a chat', 'Type or hold 🎤', 'Tap 📞 / 🎥 to call'],
  },
  {
    n: '04',
    title: 'Share your day',
    body: 'Post a Moment, drop a photo, or go Live. What you share with the people you follow turns up today and becomes a Memory tomorrow.',
    demo: 'moments',
    taps: ['Tap your avatar +', 'Add text / music / poll', 'Post — lasts 24h'],
  },
  {
    n: '05',
    title: 'Make it yours',
    body: 'Flip into any of 33 themes, set a chat wallpaper, and dress your profile in Drip. Keep a spark going with a friend — both of you say something before the day is out — to unlock even more.',
    demo: 'marketplace',
    taps: ['Open Marketplace', 'Drip · Themes · Logos', 'Pick a look & apply'],
  },
]
