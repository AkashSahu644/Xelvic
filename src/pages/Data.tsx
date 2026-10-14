import LegalLayout from '../components/ui/LegalLayout'
import { useSEO } from '../hooks/usePageMeta'
import { graph, breadcrumbLd } from '../data/jsonld'

/**
 * The Data page. Everything here is checked against the app itself: the numbers
 * (30 minutes on a voice note, 10 pieces in a drop, 30 days to change your mind)
 * and the quoted lines are lifted from Xelvic as it ships, so the page cannot
 * promise something the build does not do.
 */
export default function Data() {
  useSEO({
    title: 'Your Data — Xelvic',
    description:
      'What Xelvic does with your data, where it is used, how it is used, and what you and Xelvic can each do with it — in the app’s own words.',
    image: '/media/themes/animeblue/moments.jpg',
    jsonLd: graph(
      breadcrumbLd([
        { name: 'Home', path: '/' },
        { name: 'Data', path: '/data' },
      ]),
    ),
  })

  return (
    <LegalLayout
      eyebrow="Your data"
      title="What happens to your data"
      updated="October 2026"
      minutes={8}
      wall="/media/themes/animeblue/moments.jpg"
      intro="Every app takes something from you. This page says exactly what Xelvic takes, what it does with it, where it goes, and what you can do about it — with the app’s own wording quoted where it matters."
      inShort={[
        'Your messages are yours. A convo is encrypted, and the Vault keeps the ones you want out of the convo list entirely.',
        'Your address book is never uploaded. Numbers are matched on your phone and “never leave your device in readable form”.',
        'We do not sell your data, and we do not use the content of your convos to advertise to you.',
        'You can take your data out, hide what you post, switch off the counts, or leave for good — and deleting gives you 30 days to change your mind.',
      ]}
      glance={[
        { label: 'Deletion window', value: '30 days' },
        { label: 'Voice note ceiling', value: '30 minutes' },
        { label: 'Pieces in a drop', value: '10' },
        { label: 'Data sold', value: 'None' },
      ]}
      sections={[
        {
          heading: 'What we collect, and what we do not',
          body: [
            'There are three kinds of thing Xelvic knows, and it is worth keeping them apart. The first is your account: the phone number you signed up with, the handle you chose, and whatever you added on top of that — a name, a picture, a line about yourself.',
            'The second is what you make: the lines you send, the voice notes, the photo drops, the clips, the rooms you open, the people you keep, the songs you put by. This is what the app is for, and it is the part you would expect.',
            'The third is the thin layer that keeps any app standing up: which build you are on, what kind of phone it is, and whether the connection held. That layer exists to keep the thing working, not to build a picture of you.',
          ],
          points: [
            'Your phone number and the one-time code that confirms it.',
            'Your handle, display name, picture and bio, if you filled them in.',
            'What you send in a convo, and who you sent it to.',
            'What you put up — moments, drops, vibes, rooms, playlists.',
            'The marks that keep you safe: who you blocked, who you reported, and the queue that report went into.',
            'Not: your address book, your location history, or the contents of your phone.',
          ],
          app: 'Numbers never leave your device in readable form.',
        },
        {
          heading: 'Where your data is used',
          body: [
            'Data is only ever used in the four places the app itself puts it: in your convo, on your profile, in the queue when something is reported, and in the aggregate when we ask whether a release is working.',
            'In a convo, what you send is addressed to the people in that thread and nobody else. A group carries its own channels, and everyone in the group can read them — which is worth knowing before you type into one.',
            'On your profile, what you put up sits behind your account. Keep the account private and your moments stay inside the app, visible to the people you approved rather than to anyone who goes looking.',
            'When somebody reports something, the thing they reported goes into a queue and a moderator reads it — item by item, without the reporter’s name attached to it.',
          ],
          points: [
            'In the convo it was sent to — the thread, the group, or the channel inside it.',
            'On your profile, seen by exactly whoever your account says can see it.',
            'In the moderation queue, when a person reports something you sent.',
            'In aggregate, with the identifying parts stripped out, when we measure a release.',
          ],
          app: 'This account is private, so their moments stay in the app.',
        },
        {
          heading: 'How your data is used',
          body: [
            'Three jobs, and that is the whole list. It gets your message where it was going. It stands between you and the people you would rather not hear from. And it lets you find the thing you saved six months ago without scrolling for it.',
            'Delivery is the obvious one. What you send is addressed to the people in that thread, and if your signal drops it waits and goes the moment you are back — the app carries its own offline library so nothing is lost in a tunnel.',
            'Safety is the one people underestimate. A block is not a filter over your feed — it is a wall: they cannot reach you, and neither of you shows up online to the other. A report is read by a human being, and the person you reported is not told.',
            'Finding things is the third. A drop is found by its words, its tag or its place. Your shelf reads back a stretch at a time, and taking something off it moves the rest up. Nothing about that needs to know who you are.',
          ],
          points: [
            'To deliver what you send, to the people you sent it to — and to retry it if the signal went.',
            'To place a block, which cuts both directions at once rather than just muting a feed.',
            'To carry a report to a moderator without telling the person who was reported.',
            'To let you search and re-open your own things — by word, tag or place.',
            'Not to build an advertising profile, and not to sell.',
          ],
          app: 'They cannot reach you, and neither of you sees the other online.',
        },
        {
          heading: 'What you can do with your data',
          body: [
            'Most of the control here is not buried in a settings screen — it is the app working the way you would expect it to. Every one of these is a switch you can reach in a couple of taps.',
            'You can hide a whole conversation rather than delete it. Move a convo into the Vault and it comes out of the convo list, behind your code; the vault closes on its own after a stretch, and changing the code needs the old one.',
            'You can put a convo on a clock. Turn on disappearing messages and everything already in the chat is deleted for both of you, for good — the app asks first, because it means it.',
            'You can take something off your own shelf, take down something you put up, or turn the comments off under it. Taking a post down takes it down for everybody who was carrying it, not only for you.',
            'And you can leave. Deleting your account hides it straight away, so nobody can find you or message you, and keeps it for 30 days in case you change your mind. Sign in once inside that window and it is back exactly as it was. After 30 days it is gone for good.',
            'Two of these are worth pausing on because they are one-way. A vault code cannot be recovered — there is no reset that gives it back to you, and if a lock is set, resetting it deletes every chat inside. And when you sign out of an old phone, unsent messages and actions still sitting on that device are discarded rather than delivered later.',
          ],
          points: [
            'Hide a convo in the Vault — out of the list, behind your code.',
            'Put a convo on a disappearing clock, clearing it for both sides.',
            'Take down a post, or switch its comments off.',
            'Switch off the counts so nobody sees how many people felt a thing.',
            'Keep a private profile, so your moments stay inside the app.',
            'Sign out of every phone but this one, in a single press.',
            'Delete the account, with 30 days to change your mind.',
          ],
          app: 'You asked to switch on disappearing messages. Accepting deletes everything in this chat for both of you.',
        },
        {
          heading: 'What Xelvic can and cannot do with your data',
          body: [
            'This half matters more than the first, because it is the half you cannot check by tapping something. So here it is plainly, including the parts that are not flattering.',
            'Xelvic can keep the service running: deliver what you send, carry a report to a moderator, act on a report, and remove an account that is breaking the rules or putting other people at risk.',
            'Xelvic can read what it needs to in order to act on a report. What was written in somebody’s private conversation stays in that conversation in the ordinary course of things, but a reported item, and the context needed to judge it, is read by the person working the queue.',
            'Xelvic cannot sell your data — there is no line of business that does it. It cannot read your convos to decide what to advertise to you, because there is nothing advertising-shaped pointing back at you. And it cannot bring back an account after the 30 days are up, no matter who asks.',
            'One limit worth stating plainly: no system is perfect, and anyone who tells you theirs is has stopped being useful. What we can promise is what the app itself does — a convo that is encrypted and says so, the Vault behind your code, contacts matched on the device — and that we will say so here if any of it changes.',
          ],
          points: [
            'Can: deliver your messages, carry your reports, act on them, and remove accounts that break the rules.',
            'Can: read a reported item, and what is needed to judge it, in order to act on it.',
            'Cannot: sell your personal data, or hand it to advertisers.',
            'Cannot: read your convos to target anything back at you.',
            'Cannot: recover an account that was deleted more than 30 days ago.',
          ],
          app: 'A moderator will look at it. Nobody is told you reported this, and nothing happens to them on its own.',
        },
        {
          heading: 'Who else touches it',
          body: [
            'A handful of service providers do parts of the job we do not do ourselves — the servers that carry the service, and the crash reports that tell us when a release broke on a particular phone. They see what they need in order to do that job, and nothing beyond it.',
            'Two places where the app is more careful than it has to be. Your address book is matched on the device rather than uploaded, so the list of everyone you know never becomes a file on our side. And a convo is encrypted, which is stated on the convo itself rather than only in a policy.',
            'Beyond that, we hand something over when the law requires it and the request is valid, and we tell you when we are allowed to. We do not hand it over because somebody asked.',
          ],
          points: [
            'Service providers: what is needed to run the service, and crash reports when something breaks.',
            'Your address book: matched on your phone, never uploaded.',
            'A convo: encrypted, and the convo says so.',
            'Legal requests: honoured when valid, and disclosed to you when we are allowed to.',
          ],
          app: 'This convo is encrypted',
        },
        {
          heading: 'The things that give you away without asking',
          body: [
            'Screenshots are the honest example. The app tells both sides when a Spark is screenshotted — “Screenshot taken.” on the phone that took it, and a note to the other person that their Spark was captured. It is not a lock; nothing stops the screenshot. It is a light left on, which is more than most apps bother with.',
            'Location follows the same principle. A drop can be found by its place, and that only ever works while the location service is switched on — if it is off, the app says so and asks rather than quietly working around you.',
            'And unsent things do not haunt you. Messages and actions still waiting on a device when you sign it out are discarded, not delivered later from a phone you no longer use.',
          ],
          points: [
            'Screenshots of a Spark are announced to both people.',
            'A place on a drop is only read while location is on and permitted.',
            'Unsent messages on a signed-out device are discarded.',
            'Deleting one side of a call record leaves the other person their copy.',
          ],
          app: 'It leaves your call log. The other person keeps their own copy.',
        },
        {
          heading: 'How long any of it is kept',
          body: [
            'Different things have different lifetimes, and the app says each of them out loud rather than burying it.',
            'A moment is a day: it goes to the people who follow you, and it is gone tomorrow — except that it is kept in your own Memories, on your profile, where who sees it follows your account exactly as your moments do.',
            'A room you opened stays in your list whether it is on, coming or over. A voice note stops at 30 minutes. A drop holds up to 10 pieces. A hidden convo stays hidden until you take it out.',
            'An account that is deleted is hidden at once and erased 30 days later. A reported item stays in the queue while it is worked, and then it does not.',
          ],
          points: [
            'Moments: a day on the feed, then kept in your Memories.',
            'Voice notes: 30 minutes per note, then they stop.',
            'Drops: up to 10 pieces each.',
            'Deleted accounts: hidden at once, erased after 30 days.',
            'Reports: kept while the queue is working them.',
          ],
          app: 'Hidden right away, kept for 30 days, then gone for good.',
        },
        {
          heading: 'Your controls, in one place',
          body: [
            'If you read nothing else on this page, read this list. Each line is a thing you can do today, in the app, without writing to anybody.',
          ],
          points: [
            'Vault — hide a convo out of the list, behind a code only you know.',
            'Disappearing messages — put a convo on a clock that clears both sides.',
            'Private profile — keep your moments inside the app.',
            'Blocked accounts — a wall, and it cuts both ways.',
            'Show or hide like count — decide whether the counts are public.',
            'Sessions — sign out of every phone but this one, in one press.',
            'Memories — keep what you want, take off what you do not.',
            'Delete account — 30 days to change your mind, then it is gone.',
          ],
          app: 'Every phone but this one, in one press.',
        },
        {
          heading: 'Changes to this page',
          body: [
            'If the app starts doing something with your data that it does not do today, this page changes before the release does, and the date at the top of the page moves with it. Significant changes are announced in the app, the same way everything else is.',
            'If you want the fuller wording behind any of this — the contractual side, the rights you have depending on where you live, and the way to exercise them — the Privacy Policy is the document to read next. It says the same things with more teeth.',
          ],
        },
      ]}
      related={[
        { label: 'Privacy Policy', to: '/privacy' },
        { label: 'Terms', to: '/terms' },
        { label: 'Security', to: '/security' },
        { label: 'Safety', to: '/safety' },
        { label: 'Settings', to: '/settings' },
      ]}
      contact={{
        label: 'Email privacy@xelvic.app',
        href: 'mailto:privacy@xelvic.app',
        note: 'Want your data out, or want to know what we hold? Write to us and a person will answer — including the export and access requests that apply where you live.',
      }}
    />
  )
}
