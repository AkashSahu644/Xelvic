import {
  History,
  Phone,
  PhoneCall,
  PhoneOutgoing,
  UserPlus,
  Video,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

/**
 * Everything a call can do, one entry per block on the calls page.
 *
 * The order is the order they sit on the page: how a call starts, what it looks
 * like while it rings, what it is once it connects — voice, then video — then
 * the people you can pull in, then the list of what you have already done.
 *
 * Each entry names the screen `CallMockups` draws for it, and each one carries
 * the app's own facts rather than a softer version of them: the media is
 * peer-to-peer over WebRTC and encrypted in transit, quality adapts on a bad
 * network instead of dropping the call, and a call you miss is not a
 * notification to clear — it is a row in a list with a tap to call back. All of
 * that is what the feature data says about calls, so all of it is said here.
 */
export type CallSection = {
  /** matches a screen and an escape in `CallMockups` */
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

export const callSections: CallSection[] = [
  {
    id: "start",
    icon: PhoneCall,
    tag: "Start a call",
    title: "A call starts inside the conversation you are already having",
    body: [
      "There is no dialler to open and no number to remember. The two icons that start a call — one for voice, one for video — sit in the top-right of every conversation, whether it is one person or a group, so the call begins in the place the two of you were already talking.",
      "No app switch, no “can I call you?” first. You are in the chat, so you call from the chat.",
    ],
    points: [
      {
        title: "Both ways, side by side",
        body: "The phone and the camera sit next to each other in the header. Which one you tap is the only decision the app asks you to make.",
      },
      {
        title: "Groups ring too",
        body: "The same two icons sit on a group conversation, so a call to the whole room is the same tap as a call to one person.",
      },
      {
        title: "From the chat, not from a dialler",
        body: "The conversation you were reading is still there behind the call, and it is still there when you hang up.",
      },
    ],
    path: ["Open a convo", "Tap the phone or camera icon", "Top-right of the header"],
    caption: "Both ways to ring, in the header of every chat.",
  },
  {
    id: "ring",
    icon: PhoneOutgoing,
    tag: "While it rings",
    title: "It rings while it connects — and the connection is already theirs",
    body: [
      "The call goes peer-to-peer over WebRTC, which is what keeps it low-latency and keeps the media encrypted in transit. Nothing about the call is routed through a place that could listen in.",
      "If they do not pick up, the call does not vanish. It lands in the calls list with everything else you have made and missed, one tap from being tried again.",
    ],
    points: [
      {
        title: "Peer-to-peer, not through a middle",
        body: "The call is built on WebRTC, so the two ends talk to each other directly rather than through something in between.",
      },
      {
        title: "Encrypted in transit",
        body: "Call media is encrypted as it travels, so nothing sitting on the network path can hear it.",
      },
      {
        title: "A missed call is not lost",
        body: "It is kept in the calls list, with a tap to ring them back when they are free.",
      },
    ],
    path: ["Open a convo", "Tap the phone or camera icon", "It rings while it connects"],
    caption: "Ringing: their photo, their name, and the red one to stop it.",
  },
  {
    id: "voice",
    icon: Phone,
    tag: "Voice calls",
    title: "On a voice call, the controls are the whole screen",
    body: [
      "An audio call puts their photo and their name on a quiet ground and leaves the bottom of the screen to the controls — video, mute, speaker, add, minimise, and the one red button. Nothing else is on screen, because nothing else is needed while you are talking.",
      "Minimise is the one that earns its place on a long call: it folds the call into a strip so you can keep talking while you read the chat, look something up, or find the thing you were both trying to describe.",
    ],
    points: [
      {
        title: "Mute and speaker",
        body: "The two you reach for most, one tap each, on the bar along the bottom.",
      },
      {
        title: "Minimise, and keep talking",
        body: "Fold the call away and carry on in the app. The call holds while you use everything else.",
      },
      {
        title: "Calls hold up on a bad network",
        body: "Quality adapts on its own rather than dropping the call — which is the point of building on WebRTC.",
      },
    ],
    path: ["In a call", "The bar along the bottom", "Mute, speaker, add, hang up"],
    caption: "The audio call: a quiet ground, and six things you might need.",
  },
  {
    id: "video",
    icon: Video,
    tag: "Video calls",
    title: "On a video call, they fill the screen and you sit in the corner",
    body: [
      "The camera icon opens the same call with the picture on: the person you are talking to takes the whole display, and your own camera sits in a small tile in the corner, ringed so there is never a question about which one is you.",
      "The controls ride over the picture rather than pushing it aside, so the call stays full-screen the whole time. The ↺ control swaps between the front and the back camera mid-call, which is how you show somebody what you are looking at instead of your face.",
    ],
    points: [
      {
        title: "Them full-screen, you in the corner",
        body: "One large feed, one small tile. The tile is the only part of the screen that is ever about you.",
      },
      {
        title: "Swap cameras mid-call",
        body: "The ↺ control flips between front and back. Point the phone at the thing rather than describing it.",
      },
      {
        title: "The controls never cover what matters",
        body: "They sit over the picture along the bottom, half transparent, and the call stays full-screen behind them.",
      },
    ],
    path: ["Open a convo", "Tap the camera icon", "Swap cameras with ↺"],
    caption: "Video: their feed fills the glass, yours waits in the corner.",
  },
  {
    id: "group",
    icon: UserPlus,
    tag: "Add people",
    title: "Pull somebody else in without ending the call you are on",
    body: [
      "The ＋ in the control bar adds another person to the call already in progress. You pick who, they ring, and the conversation you were having carries on underneath while you do it — nobody has to hang up and nobody has to be re-added.",
      "Once there are three of you the call becomes a grid of tiles, one each, which is the same call with more faces in it.",
    ],
    points: [
      {
        title: "The call carries on",
        body: "Adding is something you do during a call, not a reason to end one and start another.",
      },
      {
        title: "A tile each",
        body: "Everybody on the call gets a tile of their own, so a group call reads at a glance.",
      },
      {
        title: "Anyone, not just the caller",
        body: "The ＋ sits in the bar on every call, so it is not a power the person who started it keeps.",
      },
    ],
    path: ["In a call", "Tap ＋ in the bar", "Pick who else to pull in"],
    caption: "A call you add to, rather than one you have to start again.",
  },
  {
    id: "history",
    icon: History,
    tag: "Call history",
    title: "Every call you made and every one you missed, in one list",
    body: [
      "Calls collect in the same place your conversations do, under Calls, in the order they happened: who it was with, whether it came in or went out, how long you spoke, and what time it was.",
      "A missed call is a row you can read at your own pace rather than a banner you have to clear. Every row is a way back in — the glyph on the right of it starts that call again.",
    ],
    points: [
      {
        title: "In and out, told apart at a glance",
        body: "Each row says which way the call went, so a missed call never hides among the ones you had.",
      },
      {
        title: "How long you spoke",
        body: "The length of the call is on the row, so you know before you tap whether it was a sentence or an hour.",
      },
      {
        title: "Tap a row to call back",
        body: "The list is not a record you read and leave. Every row is one tap from ringing them again.",
      },
    ],
    path: ["Convo tab", "Calls", "Tap a row to call back"],
    caption: "Made and missed, in one list, each row a way back in.",
  },
];
