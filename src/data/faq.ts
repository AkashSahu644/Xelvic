/**
 * The Help Center's articles. Answers describe what the app does, so where the
 * app states a rule in its own words — a voice note's 30-minute ceiling, the
 * vault code having no recovery, a tap on a note reaching that one reader —
 * the answer follows the app rather than the other way round.
 */
export type Faq = { q: string; a: string }
export type FaqCategory = { slug: string; title: string; emoji: string; blurb: string; faqs: Faq[] }

export const faqCategories: FaqCategory[] = [
  {
    slug: 'getting-started',
    title: 'Getting started',
    emoji: '🚀',
    blurb: 'Signing up, finding people, and the first five minutes.',
    faqs: [
      {
        q: 'How do I create a Xelvic account?',
        a: 'Download Xelvic, enter your phone number and confirm the one-time code we text you. Pick a username and you are in — the whole thing takes under a minute. Never share that code with anyone; it is the one thing standing between your account and somebody else.',
      },
      {
        q: 'What does Xelvic cost?',
        a: 'Nothing. Chatting, calling, voice notes, moments, drops, vibes, live rooms and music are all free to use. Sparks are the currency for cosmetic extras — themes and looks — and they change how the app looks rather than what it does. You earn Sparks by talking, and you can buy them as well.',
      },
      {
        q: 'What is the minimum age?',
        a: 'Xelvic is not for anyone under 13. Your date of birth is checked when you sign up — the sign-up will not complete below the line — and it stays on your account afterwards, because it is what says you are old enough for the 18+ content and what puts a birthday on your profile. Other people see the day and the month; the year stays yours unless you choose to show it.',
      },
      {
        q: 'How do I find my friends?',
        a: 'Allow contacts and everyone in your phone who is already on Xelvic shows up right away. We keep one row per number: a one-way hash of the number, and the name you saved it under, so the row can read “Bina” rather than a string of digits. Refuse, or turn it off later, and every one of those rows is deleted. If you would rather not share contacts at all, you can search for someone by their handle instead.',
      },
      {
        q: 'What is a handle, and can I change it?',
        a: 'A handle is how people reach you — the name someone types to find you. You choose it at sign-up and you can change it later, but only about once a day, which keeps a handle meaning something rather than being a thing people swap to dodge a block.',
      },
      {
        q: 'Can I use Xelvic on a computer?',
        a: 'You can sign in from a browser, and when you do, the sign-in is confirmed on your phone first — the app asks you to press No if you did not just start it, so nobody gets in by guessing. Once you are in, the browser is yours until you sign it out from sessions.',
      },
      {
        q: 'Somebody already has the handle I wanted. What now?',
        a: 'Handles are first come, first served. If one is taken out from under you while you are choosing, the app offers another rather than leaving you stuck on an error screen. Add a display name on top of the handle if you want people to see something other than the username.',
      },
    ],
  },
  {
    slug: 'messaging-calls',
    title: 'Messaging & calls',
    emoji: '💬',
    blurb: 'Voice notes, channels, calls, and what happens when the signal goes.',
    faqs: [
      {
        q: 'How do voice notes work?',
        a: 'Hold the mic to record. Slide up to lock it so you can let go and keep talking, or slide left to cancel. The recording stops on its own at 30 minutes, and the app tells you when it does rather than cutting you off silently.',
      },
      {
        q: 'What is a channel?',
        a: 'A channel is a room inside a group. Everybody in the group can read it, and whoever runs the group decides who can post: a channel set to announcements is read-only for everyone else, and the app says so on the screen rather than just refusing your message.',
      },
      {
        q: 'Do my messages send if I lose signal?',
        a: 'Yes. Xelvic holds what you sent and delivers it the moment you are back. The one exception is signing a device out: messages and actions still waiting on that phone are discarded rather than delivered later from a device you no longer use.',
      },
      {
        q: 'What happens when I delete a call record?',
        a: 'It leaves your call log, and the other person keeps their own copy. Deleting a record tidies your own list; it is not a way to make a call disappear for both people, and the app says so rather than letting you assume otherwise.',
      },
      {
        q: 'How do I delete a message or a conversation?',
        a: 'Hold the message to remove it for everyone, or clear the convo to empty the thread on your side. If you want it out of your convo list entirely without losing it, move it into the Vault instead — it leaves the list and turns up behind your code.',
      },
      {
        q: 'Can I take a call while already on one?',
        a: 'No. The app tells you that you are already on a call rather than dropping the first one. Missed calls land in the same list as the ones you made, so nothing quietly disappears.',
      },
      {
        q: 'What happens to a group when I leave it?',
        a: 'Everything goes with you: the channels, what was said in them, and your place in the group. Photos and videos sent there stop being reachable on your side. Getting back in is not automatic — somebody still inside has to add you back.',
      },
      {
        q: 'How do I add somebody to a group?',
        a: 'A group is you and at least one other person, and whoever runs it decides who is in. If somebody leaves, they need an invite back rather than being able to walk in — which is the point of the rule.',
      },
    ],
  },
  {
    slug: 'moments-live',
    title: 'Moments, Live & Rooms',
    emoji: '✨',
    blurb: 'Moments, drops, vibes, going live, and holding a room.',
    faqs: [
      {
        q: 'How long do Moments last?',
        a: 'A day. What you post turns up for the people who keep you and is gone from the feed tomorrow — and then it is kept in your Memories, on your profile, where who sees it follows your account exactly as your moments do.',
      },
      {
        q: 'What is the difference between a Drop and a Vibe?',
        a: 'A drop is a photo post and holds up to 10 pieces; it can be found by its words, its tag or its place. A Vibe is a video, and the app is blunt about what that means: a Vibe is public and stays up until you take it down. Post the one you are happy to have found.',
      },
      {
        q: 'Can I save something to come back to?',
        a: 'Yes. Drops, Vibes and songs you put by turn up in one place, along with what you played lately — so a thing you meant to return to does not have to be found again from scratch.',
      },
      {
        q: 'Who sees what I post?',
        a: 'That follows your account. Keep it private and your moments stay inside the app, visible to the people you approved rather than to anyone who goes looking. A private profile also means your posts do not go into anyone else’s feed — make it public again and what you put up shows there.',
      },
      {
        q: 'How do I go live?',
        a: 'Open Live, pick camera or text, and start whenever you are ready. It is announced to the people who keep you the moment you go, so nobody misses it by accident.',
      },
      {
        q: 'Who can talk in a room?',
        a: 'Anybody can walk in, but the host holds the room: they hand out the microphones, decide who speaks, and decide when it closes. A room you opened stays in your list afterwards, whether it was on, coming or over.',
      },
      {
        q: 'What are watch-together games?',
        a: 'In a room you can put a game on the board, and the board becomes the stream, so everyone watching sees the same game at the same time. Two of you can play while the rest of the room watches.',
      },
      {
        q: 'How do I take something down?',
        a: 'Open the post and take it down. It stops being dealt into anybody’s feed, and it comes off the app for the people who were carrying it. If you are taking down a track or a playlist, it also goes off everybody it was sent to, including links that were already handed out — so take it down before you share it around.',
      },
    ],
  },
  {
    slug: 'sparks-themes',
    title: 'Sparks, Drip & themes',
    emoji: '🔥',
    blurb: 'The day counter, Shields, and making the app look like yours.',
    faqs: [
      {
        q: 'What is a Spark?',
        a: 'A day two people talk on is one spark, and it does not matter who of you sent first. Nobody has one until the first line lands, and from then on every day you and a friend actually say something to each other keeps it going.',
      },
      {
        q: 'What is a Shield?',
        a: 'A Shield covers a day you missed. Both of you have to say something before the day is out to keep a spark alive; miss one and a Shield takes the hit instead of the run. One banks each week, up to the cap the app shows you, so they are worth not spending carelessly.',
      },
      {
        q: 'Who can see my Spark?',
        a: 'You can. "Show my sparks" is a setting, and your run stays yours — nobody else gets to watch it. What the other person does see is a screenshot: take one of a Spark and the app notes it on your screen and tells them their Spark was captured.',
      },
      {
        q: 'Does a group count towards a Spark?',
        a: 'No. A one-to-one convo keeps its own spark; a group does not count towards it. That is deliberate — a spark is meant to be the two of you, not a room you happen to both be in.',
      },
      {
        q: 'What are Sparks spent on?',
        a: 'Themes, looks and cosmetics. A theme changes the character in your convos and the colour of the app; anything you buy applies to you rather than changing what anybody else sees. Themes can be changed or removed from Settings whenever you want.',
      },
      {
        q: 'A theme I wanted is not available. Why?',
        a: 'Themes are rotated, and an item can be pulled from sale. When that happens the app tells you rather than leaving a gap where the button was, and anything you already applied stays as it is.',
      },
    ],
  },
  {
    slug: 'privacy-safety',
    title: 'Privacy & safety',
    emoji: '🔒',
    blurb: 'The Vault, disappearing messages, blocking and reporting.',
    faqs: [
      {
        q: 'What is the Vault?',
        a: 'A private, encrypted space for the chats you want out of the way. Hold a convo in the list and choose "Move to the vault" — it leaves the list and turns up behind your code. Open it by typing that code where you would normally type a name, and it closes again on its own after a stretch.',
      },
      {
        q: 'What if I forget my vault code?',
        a: 'There is no way to recover it — the app warns you when you set it, and that warning is real rather than boilerplate. Resetting the code is possible, but if you had a lock set, resetting deletes every chat inside the vault. Choose a code you will not lose.',
      },
      {
        q: 'Are my contacts uploaded?',
        a: 'Only if you allow it, and not in readable form. We keep one row per number — a one-way hash of the number, and the name you saved it under — which is what lets a match come back as “Bina” rather than a string of digits. We never keep the numbers themselves or a copy of the book, and turning contacts off deletes every row.',
      },
      {
        q: 'Can I make messages disappear?',
        a: 'Yes. Turn on a disappearing convo and messages clear themselves once they have been seen. Switching it on deletes everything already in the chat, for both people, so the app asks before it does it — that part is not reversible.',
      },
      {
        q: 'What happens when I block someone?',
        a: 'They cannot reach you, and neither of you sees the other online. The convo stays where it is rather than being deleted out from under either of you, and blocking is not announced — the other person simply stops being able to get through.',
      },
      {
        q: 'How do I report someone?',
        a: 'Open the profile, the message or the comment, choose report, and say what happened. It goes into a queue and a moderator reads it. Reporting the same thing twice is recognised rather than filed again, so you do not need to keep at it.',
      },
      {
        q: 'Does the other person know I reported them?',
        a: 'No. Nobody is told who reported them, and nothing happens to them on its own — a report starts a review, it is not an automatic punishment. Reporting a comment works the same way.',
      },
      {
        q: 'Are screenshots blocked?',
        a: 'No, and no app on a normal phone can block them. What Xelvic does instead is tell the truth about it: take a screenshot of a Spark and the app notes it on your screen and lets the other person know their Spark was captured.',
      },
    ],
  },
  {
    slug: 'comments-notes',
    title: 'Comments & notes',
    emoji: '💭',
    blurb: 'Two tabs under every post, and who gets to read each one.',
    faqs: [
      {
        q: 'What is the difference between a comment and a note?',
        a: 'A comment is public under the post: everyone in the convo reads it, and every comment carries a heart and a Reply so an answer lands on that comment rather than loose in the thread. A note is private — the field says "Write a private note", and what you write goes to whoever put the post up rather than to everybody reading it.',
      },
      {
        q: 'How do I open comments and notes?',
        a: 'Every post in a convo carries its own count. Tap it and the sheet comes up over the conversation with Comments on one tab and Notes on the other, so you never have to leave the thread to say something about what is in it.',
      },
      {
        q: 'Can I turn comments off on my own post?',
        a: 'Yes. Comments can be switched off per post, and the app says so on the post rather than just hiding the button. Existing comments can be removed one at a time as well.',
      },
      {
        q: 'Can I remove a comment somebody left?',
        a: 'Yes, from the comment itself. Removing it takes it off the post for everybody, and reporting it is a separate option if you want it looked at rather than just gone.',
      },
      {
        q: 'Can a note be a voice note?',
        a: 'Yes. A note can be written or recorded — the composer offers both — which is often the faster way to say something longer than a line.',
      },
    ],
  },
  {
    slug: 'account-devices',
    title: 'Account & devices',
    emoji: '📱',
    blurb: 'Multiple phones, passwords, verification and leaving.',
    faqs: [
      {
        q: 'Can I use Xelvic on more than one phone?',
        a: 'Yes. Scan a code to sign in on another device, and manage every phone you use from settings. Each one is listed separately, so you can see where the account is open.',
      },
      {
        q: 'How do I sign out everywhere?',
        a: 'In sessions, sign out of every phone but this one in a single press. The first device the account signed in on stays by design, because removing that one needs your password — it is the safety catch that stops somebody with a borrowed phone locking you out.',
      },
      {
        q: 'How do I change my password?',
        a: 'From settings. If you have forgotten it, the reset asks for your account password first — and the reset only happens if it is correct, so nobody can wipe your account by claiming to be you. Never share a one-time code with anyone, including somebody claiming to be from Xelvic.',
      },
      {
        q: 'How do I get verified?',
        a: 'Request the verification mark from your profile and say why you should be verified. A tick sits beside the handle along with the date it was granted, so people can see it is current rather than something you have always had.',
      },
      {
        q: 'Can verification be taken away?',
        a: 'Yes. It can be taken back if the account stops being what it was verified as — change what the account is and the mark goes with it. It is a statement that the account is who it claims to be, not an endorsement of what it says.',
      },
      {
        q: 'What is the first device?',
        a: 'The first phone the account was ever signed in on. It stays in the list by design, because removing it needs your password — otherwise anybody holding your unlocked phone could lock you out of your own account in one tap. Remove it on its own row, with the password, and it goes too.',
      },
      {
        q: 'What happens when I delete my account?',
        a: 'It is hidden straight away, so nobody can find you or message you, and the account is then kept for 30 days in case you change your mind — sign back in during that window and everything returns exactly as it was. After 30 days it is deleted permanently, along with your profile and everything you posted, and it cannot be recovered.',
      },
      {
        q: 'Can I recover an account I deleted months ago?',
        a: 'No. Past the 30 days there is no route back, for you or for us, which is why the window exists at all — it is the last chance to change your mind rather than a promise that deletion is reversible.',
      },
    ],
  },
  {
    slug: 'creators-deals',
    title: 'Creators & deals',
    emoji: '💼',
    blurb: 'Paid collaborations, deliverables and getting paid.',
    faqs: [
      {
        q: 'What is a deal?',
        a: 'A deal is a paid collaboration between a brand and a creator. You are told what the deal is asking for before you take it on, so you know what you are agreeing to rather than finding out from a brief afterwards.',
      },
      {
        q: 'How do I get paid?',
        a: 'You upload the deliverable, and payment is released once the company approves it. The agreement and the payment sit together in the same place, so what was asked for and what was paid stay visible side by side.',
      },
      {
        q: 'Can I turn a deal down, or cancel one?',
        a: 'Both. You can decline a deal you were invited to, and you can cancel one you have already taken — the app warns you that cancelling is visible to the other side and cannot be undone, so it is a last resort rather than a way to stall.',
      },
      {
        q: 'Where do I see my deals?',
        a: 'Deals you send or receive show up together in one place: what is open, what is waiting on a deliverable, and what has been paid. Brands use the same list to invite creators and follow an agreement through to payment.',
      },
      {
        q: 'Who handles the tax on what I earn?',
        a: 'You do. Amounts you earn through a deal are yours to declare, and if you are earning as a business rather than as an individual that is your side of it to get right.',
      },
    ],
  },
]
