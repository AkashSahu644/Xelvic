import LegalLayout from '../components/ui/LegalLayout'
import { useSEO } from '../hooks/usePageMeta'
import { graph, breadcrumbLd } from '../data/jsonld'

/**
 * Every quoted line on this page is lifted word-for-word out of the app, and
 * every number matches the build. Where the app says something plainer than a
 * policy normally would, the plainer line is quoted rather than paraphrased.
 */
export default function Privacy() {
  useSEO({
    title: 'Privacy Policy — Xelvic',
    description:
      'What Xelvic collects, how it is used, who can see it, and the control you have — written against the app as it ships.',
    image: '/media/themes/teddy/convo.jpg',
    jsonLd: graph(
      breadcrumbLd([
        { name: 'Home', path: '/' },
        { name: 'Privacy Policy', path: '/privacy' },
      ]),
    ),
  })

  return (
    <LegalLayout
      title="Privacy Policy"
      updated="October 2026"
      minutes={7}
      wall="/media/themes/teddy/convo.jpg"
      intro="This policy explains what we collect, why, and the control you have. In short: your conversations are yours, your address book stays on your phone, and nothing here is sold."
      inShort={[
        'We collect your number, your handle, and what you choose to put up.',
        'Your address book is matched on your phone. It is not uploaded.',
        'Reports are read by a moderator. The person you reported is not told.',
        'You can hide a convo, put it on a disappearing clock, or delete the whole account — with 30 days to change your mind.',
      ]}
      glance={[
        { label: 'Sold to advertisers', value: 'Nothing' },
        { label: 'Contacts uploaded', value: 'None' },
        { label: 'Account deletion', value: '30 days' },
        { label: 'Minimum age', value: '13' },
      ]}
      sections={[
        {
          heading: 'What this policy covers',
          body: [
            'This policy covers the Xelvic app and this website. It explains what information we hold about you, where it comes from, what we do with it, who else sees it, how long it stays, and what you can do about any of it.',
            'It applies from the moment you download the app. If you want the practical version — the controls, in the order you would actually reach for them — the Data page is written for that. This is the same ground with the detail filled in.',
          ],
          points: [
            'The Xelvic app for Android, and every screen inside it.',
            'This website, including the pages you are reading now.',
            'Not other companies’ apps, even where Xelvic links out to one.',
          ],
        },
        {
          heading: 'Information we collect',
          body: [
            'When you create an account we take your phone number and send a one-time code to confirm it. You then choose people see you by — the app puts it plainly: “This is the name people see on your profile. We will make your username later,” followed by the handle itself, because “A handle is how people reach you.”',
            'You may add a picture, a line about yourself, and an email address if you want one on the account. Everything past the number and the handle is optional, and leaving it blank costs you nothing.',
            'To help you find friends, we match your contacts. That match happens on your device: “Numbers never leave your device in readable form.” We are checking for people already on Xelvic, not building a copy of your address book.',
            'As you use Xelvic we process what you send so it reaches the right people. Alongside that there is the thin technical layer any app needs — device type, app version, and whether a connection held — which exists to keep the thing standing up.',
          ],
          points: [
            'Your phone number, and the code that confirms it.',
            'Your handle, and the display name on your profile.',
            'Anything optional you add: picture, bio, email.',
            'Your contacts, matched privately on your device.',
            'What you send, and who you sent it to.',
            'Basic technical data: device type, app version, connection health.',
          ],
          app: 'Numbers never leave your device in readable form.',
        },
        {
          heading: 'How we use your information',
          body: [
            'We use your information to deliver messages and calls, to show you moments, drops, vibes and rooms from the people you follow, to keep your account secure, and to act when somebody reports something.',
            'We use aggregate, non-identifying data to understand what is working and what is not. That data does not carry your name, your number or your handle into any report we look at.',
            'We do not use the content of your conversations to decide what to advertise to you, and we do not pass it to anybody who would.',
          ],
          points: [
            'Delivering your messages, calls, voice notes and media.',
            'Showing you the people and things you follow.',
            'Keeping the account secure — codes, passwords and sign-ins.',
            'Acting on reports, and keeping people who are blocked apart.',
            'Improving the app from aggregate figures with the identifying parts stripped.',
          ],
          app: 'Nothing will interrupt you, in the app or on the phone.',
        },
        {
          heading: 'Messages, calls and the Vault',
          body: [
            'A conversation is encrypted, and the app says so on the convo itself rather than asking you to take it on trust: “This convo is encrypted.”',
            'The Vault is a private, encrypted space for the chats you want out of the way. You move a convo in by holding it in the list and choosing “Move to the vault” — it leaves the list and turns up behind your code. You open it by typing that code where you would normally type a name.',
            'Two things about the Vault are worth knowing before you rely on it. The code cannot be recovered — the app warns you outright that there is no way to recover it — and if you have a lock set, resetting it deletes every chat inside. The vault also closes again on its own after a stretch, so it does not sit open behind you.',
            'Disappearing conversations clear themselves once messages have been seen. Switching the setting on deletes everything already in the chat, for both people, so the app asks before it does it.',
          ],
          points: [
            'Conversations are encrypted, stated on the convo itself.',
            'The Vault hides convos from the list, behind a code only you know.',
            'A vault code cannot be recovered, and a reset with a lock set deletes what is inside.',
            'Disappearing messages clear the chat for both people at once.',
            'Voice notes stop at 30 minutes, and the app says when they do.',
          ],
          app: 'You asked to switch on disappearing messages. Accepting deletes everything in this chat for both of you.',
        },
        {
          heading: 'Contacts and who can find you',
          body: [
            'Finding friends works from your address book, matched on the device. You can also skip contacts entirely and search for someone by handle, and the app offers both routes rather than assuming.',
            'Who can reach you is partly your choice and partly the other person’s. If you keep your account private, your moments stay inside the app — visible to the people you approved rather than to anyone who goes looking. Deleting your account goes further: it hides it straight away, so nobody can find you or message you, and the app confirms that “Nothing happens to the account” beyond the hiding while the 30-day window is open.',
          ],
          app: 'Allow contacts, or hunt someone down by handle.',
        },
        {
          heading: 'What you put up, and who sees it',
          body: [
            'A moment is a day on the feed, and then it is kept in your Memories, on your profile, where who sees it follows your account exactly as your moments do.',
            'A drop is a photo post, and it can carry a place. That place is only read while the location service on your device is switched on and permitted — if it is off, the app tells you so rather than working around you. A drop is found by its words, its tag or its place, and nothing about that search needs to know who you are.',
            'Taking something down does exactly what it says, with one honest nuance the app spells out: a takedown stops the thing being dealt into anybody’s feed, but it stays on the author’s profile, at its own link, and readable by everyone who could read it before. If you want it gone from the world rather than out of the feed, deleting the post itself is the thing to reach for.',
          ],
          points: [
            'Moments: a day on the feed, then kept in your Memories.',
            'Drops: found by word, tag or place — place only while location is on.',
            'Private profiles keep moments inside the app.',
            'A takedown removes it from feeds; it can stay at the author’s own link.',
            'Comments can be switched off under a post.',
          ],
          app: 'This account is private, so their moments stay in the app.',
        },
        {
          heading: 'Blocking, reporting and moderation',
          body: [
            'A block is a wall rather than a filter. Once it is in place, they cannot reach you, and neither of you shows up online to the other — the convo itself stays where it is rather than being deleted out from under either person.',
            'A report goes into a queue and gets read by a human being. The app tells you both halves of that plainly: “Reported. A moderator will look at it,” and then, “A moderator will look at it. Nobody is told you reported this, and nothing happens to them on its own.” Reporting is not an automatic punishment, and it is not anonymous to us — it is anonymous to the person you reported.',
            'You can report a comment as well as a person or a post, and if you report the same thing twice the app tells you it is already in the queue rather than pretending to take it again.',
          ],
          points: [
            'A block cuts both ways and leaves the convo where it is.',
            'Every report is read by a moderator.',
            'The person you reported is not told, and is not punished automatically.',
            'A duplicate report is recognised rather than re-filed.',
          ],
          app: 'A moderator will look at it. Nobody is told you reported this, and nothing happens to them on its own.',
        },
        {
          heading: 'Screenshots, and what we tell you about',
          body: [
            'We would rather be honest about the limit than imply a protection that does not exist. A screenshot cannot be blocked by any app that runs on a normal phone, including this one.',
            'What Xelvic does instead is leave a light on. Take a screenshot of a Spark and the app notes it on your own screen — “Screenshot taken.” — and tells the other person their Spark was captured. Neither side is left guessing.',
            'The same instinct runs through the rest of the app: the camera and microphone show when they are open, the vault states that it closes on its own, and a deleted call record tells you the other person keeps their own copy rather than implying the call vanished for both of you.',
          ],
          points: [
            'Screenshots cannot be blocked, and we do not claim otherwise.',
            'A screenshot of a Spark is announced to both people.',
            'Camera and microphone show when they are open.',
            'Deleting a call record removes it from your log, not theirs.',
          ],
          app: 'It leaves your call log. The other person keeps their own copy.',
        },
        {
          heading: 'What we share',
          body: [
            'We do not sell your personal information. There is no version of this where your convos fund an advertising business, because there is no advertising business pointing back at you.',
            'We share data with service providers who help us run Xelvic — the servers that carry it, and the crash reporting that tells us when a release broke — and only as much as the job needs. Your address book is not among what they receive, because it never left your phone.',
            'We hand information over when the law requires it and the request is valid. We tell you when we are allowed to. We do not hand it over because somebody asked.',
          ],
          points: [
            'No sale of personal information, to anybody, ever.',
            'Service providers get the minimum the job needs.',
            'Your contacts are not shared, because they were never collected.',
            'Legal requests: honoured when valid, disclosed to you when permitted.',
          ],
        },
        {
          heading: 'How long we keep it',
          body: [
            'Different things have different lifetimes, and the app states each one rather than burying it in a table.',
            'A moment lives a day on the feed and then belongs to your Memories, for as long as you keep it there. A room you opened stays in your list whether it is on, coming or over. A reported item stays while the queue works it, and then it does not.',
            'An account that is deleted is hidden at once — nobody can find it or message it — and then kept for 30 days so a change of mind is possible. Sign in once inside that window and it returns exactly as it was. Let it run out and it is gone for good, which the app says in as many words.',
          ],
          points: [
            'Moments: a day on the feed, then your Memories.',
            'Rooms: kept in your list whether on, coming or over.',
            'Reports: kept while the queue is working them.',
            'A deleted account: hidden at once, erased after 30 days.',
          ],
          app: 'After 30 days it is gone for good and cannot be recovered.',
        },
        {
          heading: 'Your choices and rights',
          body: [
            'You can edit or delete your profile details at any time, decide whether the counts on your posts are visible, keep your account private, and manage every device that is signed in. Signing out everywhere else is one press, and the first device the account was set up on deliberately needs your password before it can be removed — that is the safety catch, not an oversight.',
            'Deleting your account hides it straight away, so nobody can find you or message you. It is kept for 30 days in case you change your mind. After that it is deleted permanently, together with your profile and everything you posted, and it cannot be recovered.',
            'Depending on where you live you may have further rights — to a copy of what we hold, to have it corrected, to have it deleted, or to object to a particular use. Write to us and we will help, and we will not make you argue for it.',
          ],
          points: [
            'Edit or clear your profile whenever you want.',
            'Show or hide like counts on your posts.',
            'Sign out of every phone but this one, in one press.',
            'The first device needs your password before it can be removed.',
            'Delete the account, with 30 days to change your mind.',
            'Export and access requests, handled by a person.',
          ],
          app: 'Every phone but this one, in one press.',
        },
        {
          heading: 'Children',
          body: [
            'Xelvic is not for anyone under 13. The age gate is not decorative: an account that does not clear it cannot be finished, and the app refuses the sign-up rather than flagging it for later.',
            'If we learn that an account belongs to a child under 13, we remove it. If you believe one does, write to us and tell us what you saw.',
          ],
          app: 'You need to be over 13',
        },
        {
          heading: 'Changes to this policy',
          body: [
            'If we change how Xelvic handles your information, this page changes and the date at the top moves with it. Where a change genuinely affects you, we tell you inside the app rather than hoping you re-read a page.',
            'We keep the previous wording available on request, so a claim made to you last year can still be checked against what was actually written at the time.',
          ],
        },
        {
          heading: 'Contact us',
          body: [
            'Questions about privacy, a request for your data, or something on this page you think is wrong — write to privacy@xelvic.app and a person will answer. If it is a bug in the app rather than a question about this page, the Help Center will get you there faster.',
          ],
        },
      ]}
      related={[
        { label: 'Your Data', to: '/data' },
        { label: 'Terms', to: '/terms' },
        { label: 'Security', to: '/security' },
        { label: 'Safety', to: '/safety' },
        { label: 'Settings', to: '/settings' },
      ]}
      contact={{
        label: 'Email privacy@xelvic.app',
        href: 'mailto:privacy@xelvic.app',
        note: 'Privacy questions, access and export requests, or a correction to something written here — a person reads this inbox.',
      }}
    />
  )
}
