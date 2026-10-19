import { BellOff, Lock, Mic, Pin, SmilePlus, Timer } from "lucide-react";
import type { LucideIcon } from "lucide-react";

/**
 * Everything a conversation can do, one entry per block on the messaging page.
 *
 * The order is the order they sit in on the page: what you do to a message,
 * then to a convo, then to the words themselves. Each one names the screen
 * `ChatMockups` draws for it, and each one carries the app's own rules rather
 * than a softer version of them — the vault code has no recovery route, and
 * switching on disappearing messages deletes everything already in the chat, for
 * both people. Both are things the app says out loud, so both are said here.
 */
export type MessagingSection = {
  /** matches a screen and an escape in `ChatMockups` */
  id: string;
  icon: LucideIcon;
  /** the short label, for the chip row at the top of the page */
  tag: string;
  title: string;
  /** one paragraph per entry */
  body: string[];
  points: { title: string; body: string }[];
  /** where to find it in the app */
  path: string[];
  /** the line under the phone */
  caption: string;
};

export const messagingSections: MessagingSection[] = [
  {
    id: "pin",
    icon: Pin,
    tag: "Pin a message",
    title: "The one message nobody should have to scroll for: pin it",
    body: [
      "Hold any message in a chat and pin it. It lifts out of the thread and stays at the top of the conversation, above everything else, so the address, the time or the plan is the first thing either of you sees when you open the chat.",
      "A pin belongs to the chat rather than to the message, so it is there for both of you — and tapping it drops you back to where it was said.",
    ],
    points: [
      {
        title: "One pinned message per chat",
        body: "Pin a new one and it takes the place at the top; the last one goes back to being an ordinary message.",
      },
      {
        title: "Tap to jump back",
        body: "The bar is a shortcut rather than a copy — the thread scrolls to the message itself.",
      },
      {
        title: "Unpin from the menu",
        body: "The same hold that pinned it takes it down again, and the bar disappears.",
      },
    ],
    path: ["Open a convo", "Hold a message", "Pin"],
    caption: "Pinned to the head of the chat, until you take it down.",
  },
  {
    id: "mute",
    icon: BellOff,
    tag: "Mute a convo",
    title: "A convo you want quiet, still exactly where it was",
    body: [
      "Muting is not hiding and it is not deleting. The chat keeps its place in the list, the messages keep arriving, and the app simply stops telling you about them — no banner, no sound, no badge demanding to be cleared.",
      "Choose how long: eight hours for a busy afternoon, a week for a group that will not settle down, or always, for the one you will get to when you get to it.",
    ],
    points: [
      {
        title: "Silence, not distance",
        body: "Everything still lands in the chat. You read it when you open it rather than when it interrupts you.",
      },
      {
        title: "A muted row looks muted",
        body: "The chat keeps its place in the list and wears a crossed-out bell, so you can see at a glance where the quiet is coming from.",
      },
      {
        title: "Undo it whenever",
        body: "The same switch turns it back on, and the notifications pick up from the next message.",
      },
    ],
    path: ["Convo tab", "Hold a convo", "Mute notifications"],
    caption: "Muted: no badge, no sound, nothing moved.",
  },
  {
    id: "vault",
    icon: Lock,
    tag: "Move to the vault",
    title: "The conversations you would rather not have on screen: behind your code",
    body: [
      "Hold a convo in the list and choose “Move to the vault”. It leaves the list entirely — nothing about the chat list gives away that it is there — and opens only when you type your code in the place you would normally type a name.",
      "The vault closes itself again after a stretch, so it does not sit open behind you while the phone is on the table.",
    ],
    points: [
      {
        title: "Out of the list, not gone",
        body: "Moving a convo into the vault hides it. It is the same conversation when you open it, with all of its history.",
      },
      {
        title: "The code has no recovery route",
        body: "The app warns you when you set it, and that warning is real. Resetting a code with a lock set deletes every chat inside.",
      },
      {
        title: "Found by code, not by menu",
        body: "There is no vault button to press over your shoulder — the way in is knowing the code.",
      },
    ],
    path: ["Convo tab", "Hold a convo", "Move to the vault"],
    caption: "Hold a convo and the vault is one of the things you can do to it.",
  },
  {
    id: "vanish",
    icon: Timer,
    tag: "Disappearing convo",
    title: "Words that do not stay: a convo that clears itself",
    body: [
      "Turn on a disappearing convo and messages clear themselves once they have been seen, on a timer you pick. What was said stays said for as long as it needs to and then stops existing.",
      "The app asks before it turns it on, because switching it on deletes everything already in that chat — for both of you. That part is not reversible, and it says so rather than doing it quietly.",
    ],
    points: [
      {
        title: "24 hours, 7 days or 90 days",
        body: "The timer starts when the message has been seen rather than when it was sent.",
      },
      {
        title: "Both sides, not just yours",
        body: "A disappearing convo is a fact about the chat, so it applies to what you send and what you are sent.",
      },
      {
        title: "The warning is the honest part",
        body: "Everything already in the chat goes when you switch it on, and there is no undo for that.",
      },
    ],
    path: ["Open a convo", "Tap the name", "Disappearing messages"],
    caption: "On a clock, and the app says so at the top of the chat.",
  },
  {
    id: "react",
    icon: SmilePlus,
    tag: "Reactions",
    title: "Say it without typing: react to any message",
    body: [
      "Hold a message, pick a reaction, and it lands on the message for both of you. Some things do not need a sentence — a heart on a voice note says more than a reply would.",
      "Reactions stack on the same message rather than replacing each other, so a photo can collect a heart, a laugh and a thumbs-up and still be one message.",
    ],
    points: [
      {
        title: "A whole set, one hold away",
        body: "The picker sits right over the message, so you never leave the thread to use it.",
      },
      {
        title: "You can see who felt it",
        body: "A reaction chip carries its count, and opening it names the people behind it.",
      },
      {
        title: "Take it back",
        body: "Tap your own reaction again and it comes off, for both of you.",
      },
    ],
    path: ["Open a convo", "Hold a message", "React"],
    caption: "The picker opens over the message, and the count stays on it.",
  },
  {
    id: "voice",
    icon: Mic,
    tag: "Voice messages",
    title: "Say it out loud: voice notes, up to 30 minutes",
    body: [
      "Hold the mic to record. Let go and it sends. Slide up to lock it and you can put the phone down and keep talking, hands free — slide left instead and it is cancelled, with nothing sent at all.",
      "A recording stops on its own at 30 minutes, and the app tells you when it does rather than cutting you off in the middle of a sentence without saying why.",
    ],
    points: [
      {
        title: "Hold, or lock and keep going",
        body: "Locked, the bar says as much: the clock keeps counting, the wave keeps moving, and the line under it reads “Still recording · send when you are done” — with the bin beside it if you would rather it never existed.",
      },
      {
        title: "They land as notes, not as files",
        body: "A voice note plays in the thread with its wave and its length, like anything else that was said.",
      },
      {
        title: "Recorded, not typed",
        body: "Notes on a post can be recorded too, which is usually faster than writing something long out.",
      },
    ],
    path: ["Open a convo", "Hold the mic", "Slide up to lock"],
    caption: "Holding the mic: the timer, the wave, and both ways out.",
  },
];
