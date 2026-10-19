import { LayoutGrid, PlayCircle, Video } from "lucide-react";
import type { LucideIcon } from "lucide-react";

/**
 * Everything the Drops tab can do, one entry per block on the Drops & Vibes
 * page.
 *
 * The order is the order it happens in the app: the feed you open, the Vibe you
 * tap, and the composer you use to put one up. Each entry names the screen
 * `DropsMockups` draws for it.
 *
 * The wording follows the three screens rather than the marketing: the Vibe
 * rail sits above For you, a Vibe plays edge to edge with the title over the
 * picture and the actions down the right, and a new Vibe is Record, Your clips,
 * the line, Collaborate, Tag people and Sensitive content. Nothing here claims
 * a length or a format the screens do not show.
 */
export type DropsSection = {
  /** matches a screen and an escape in `DropsMockups` */
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

export const dropsSections: DropsSection[] = [
  {
    id: "feed",
    icon: LayoutGrid,
    tag: "The feed",
    title: "Vibes up top, Drops down the feed",
    body: [
      "The Drops tab opens on Vibe: a rail of tall clips, each one carrying the person who posted it and the number of plays, with See all beside it. Tap one and it takes the whole screen; the rest of the rail waits where you left it.",
      "Under the rail is For you — photo Drops one after another, full width, with the person, how long ago they posted and the four things you can do with it: feel it, comment, share it, keep it. The comments sit directly underneath, so the conversation is on the post rather than a tap away.",
    ],
    points: [
      {
        title: "One rail, the clips you missed",
        body: "Every Vibe shows who posted it and how many people have played it, so you can tell what is worth opening before you tap.",
      },
      {
        title: "Drops at their own frame",
        body: "A photo Drop runs the full width of the feed, with the time it was posted in the corner — the grid stays clean because every photo is set at the same frame.",
      },
      {
        title: "The reactions and the replies",
        body: "Feel it, comment, share or keep it from the row under the post, and read what other people said without leaving the feed.",
      },
    ],
    path: ["Drops tab", "Vibe rail · For you"],
    caption: "The Drops tab: the Vibe rail, and a photo Drop in For you.",
  },
  {
    id: "vibe",
    icon: PlayCircle,
    tag: "Full screen",
    title: "A Vibe takes the whole screen",
    body: [
      "Tap a Vibe and it fills the screen edge to edge. The title sits over the picture in the app's own type, with the line underneath it — “Darjeeling”, and “toy train & this song” in gold. Nothing frames it; the clip is the screen.",
      "The handle and the reactions sit over the picture: heart, comment, share, save and mute down the right, Add comment along the foot, and the first comments already waiting as chips. Tap any of them and the Vibe keeps playing underneath.",
    ],
    points: [
      {
        title: "Edge to edge",
        body: "No card, no border, no letterbox — the clip runs to every edge of the screen and the controls sit on top of it.",
      },
      {
        title: "The title over the picture",
        body: "A Vibe says what it is in the middle of the screen, so you know what you are watching without opening anything.",
      },
      {
        title: "Comment without leaving it",
        body: "The note box and the first comments sit along the foot, so replying never stops the clip.",
      },
    ],
    path: ["Drops tab", "Tap a Vibe"],
    caption: "A Vibe, full screen: the title, the rail, and the comments underneath.",
  },
  {
    id: "compose",
    icon: Video,
    tag: "New Vibe",
    title: "Put one up in a minute",
    body: [
      "New Vibe is two ways in — Record, or Your clips — and a box for the line that goes with it. Put it up sits in the corner the whole time, so nothing has to be finished before you can post it.",
      "Collaborate adds the person you made it with, Tag people names who is in it, and Sensitive content keeps adult, violent or graphic posts behind a gate that only opens for people over 18 who ask. At the foot the app says it plainly: a Vibe is public, and it stays up until you take it down.",
    ],
    points: [
      {
        title: "Record it or pick it",
        body: "Shoot it there and then, or choose a clip you already have — the composer does not care which.",
      },
      {
        title: "Post it together",
        body: "Collaborate puts both names on the Vibe, so the person you made it with is on it from the start.",
      },
      {
        title: "Sensitive content, gated",
        body: "Adult, violent or graphic posts only open for people over 18, and only when they ask to see them.",
      },
    ],
    path: ["Drops tab", "Tap +", "New Vibe"],
    caption: "New Vibe: record or choose a clip, then put it up.",
  },
];
