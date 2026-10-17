/**
 * The questions the Download page answers, kept out of the page so the FAQPage
 * in the structured data is built from the same strings the accordion renders.
 *
 * Google only shows FAQ rich results for answers that are visible on the page,
 * which these are — but only for as long as the two lists are the same list.
 */
import { site } from './site'

/* The host the sign-in answer prints. Derived rather than typed twice, so the
   address in the sentence can never drift from the address in the href. */
const webHost = site.web.replace(/^https?:\/\//, '')

export type DownloadFaq = { q: string; a: string; tag: string }

/* The questions a download page actually gets asked, answered without
   hedging. If an answer here ever stops being true, it has to be deleted
   rather than softened. */
export const downloadFaqs: DownloadFaq[] = [
  {
    q: 'Is it genuinely free, or free for now?',
    a: 'Genuinely free. There is no subscription, no premium tier and no ads in the chat list. Everything the app can do, it does for everyone who installs it.',
    tag: 'Price',
  },
  {
    q: 'Will it run on an old phone?',
    a: 'If the phone runs Android 8 or iOS 15, yes — and those go back to 2017 and 2021 respectively. The app is built light, so a cheap phone is not treated as a second-class one.',
    tag: 'Devices',
  },
  {
    q: 'Do I need a second account for the web app?',
    a: `No. ${webHost} is the same account, reached through a browser. Sign in with your number and you are looking at the same chats you have on your phone.`,
    tag: 'Sign-in',
  },
  {
    q: 'How do I move my chats to a new phone?',
    a: 'Install Xelvic on the new phone, choose the QR sign-in, and scan the code shown on your old phone. The account moves across; you do not have to start again.',
    tag: 'Moving',
  },
  {
    q: 'Why does it want my phone number?',
    a: 'Because a number is the account. It is what your people already have for you, so nobody has to be told a new username, and it is what makes the sign-in code work.',
    tag: 'Privacy',
  },
  {
    q: 'Can I use it on a tablet as well as a phone?',
    a: 'Yes. The same account signs in on a phone, a tablet and a browser at once, and a message you send from one turns up on the others.',
    tag: 'Devices',
  },
]
