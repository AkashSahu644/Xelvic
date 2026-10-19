import { Eye, History, PenLine, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";

/**
 * Everything a Moment can do, one entry per block on the Moments page.
 *
 * The order is the order it happens in the app: the circle you tap to begin,
 * the composer that opens, the sheet that shows who answered and who watched,
 * and what becomes of it the next day. Each entry names the screen
 * `MomentsMockups` draws for it.
 *
 * The rules here are the app's own, not a softer retelling. A Moment is up for
 * the people who follow you and nobody else; a Moment can name up to five
 * people; and after its day it tucks itself away into Memories rather than
 * being deleted. The app says each of those outright, so this page says them
 * too and adds nothing.
 */
export type MomentsSection = {
  /** matches a screen and an escape in `MomentsMockups` */
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

export const momentsSections: MomentsSection[] = [
  {
    id: "circle",
    icon: Sparkles,
    tag: "The circle",
    title: "It starts on the Moments tab",
    body: [
      "The Moments tab opens on a pink circle with a + in it, labelled Your moments and first on the rail. Tap it and the composer is in front of you; beside it are the cards of everyone who has put something up today.",
      "The rail only carries the people you follow, because a Moment is for them — not for the whole app, and not for a search box. There is no public side to it and no audience to build.",
    ],
    points: [
      {
        title: "Your circle is the button",
        body: "You do not go looking for a separate screen. The + circle sits first on the rail and is the way in.",
      },
      {
        title: "Only the people you follow",
        body: "Your Moments are for the people who follow you, and the rail shows the people you follow. Nothing here is public.",
      },
      {
        title: "It has a day on it",
        body: "A Moment is up today and gone from the rail tomorrow — the clock starts the moment you post.",
      },
    ],
    path: ["Moments tab", "Tap + on your circle"],
    caption: "The Moments tab: your circle, and everyone who posted today.",
  },
  {
    id: "compose",
    icon: PenLine,
    tag: "Compose",
    title: "A thought, a photo, a track",
    body: [
      "The composer opens on the picture, with the line laid over it and the tools along the bottom. Add text for the thought, a poll for the room or a track to set the mood underneath — or just drop a thought and post it.",
      "A track is part of the Moment rather than a link inside it: the song plays while the Moment is on screen, so the thing you are looking at and the thing you are hearing arrive together.",
    ],
    points: [
      {
        title: "Text, or just a thought",
        body: "The line goes over the picture, where the Moment is already looking.",
      },
      {
        title: "A track sets the mood",
        body: "Add music and the song plays with the Moment, not behind a tap.",
      },
      {
        title: "One post, one day",
        body: "You post it once. The clock runs from there and the rail carries it while the day lasts.",
      },
    ],
    path: ["Moments tab", "Tap + on your circle", "Post"],
    caption: "Compose: the picture, the line, and the track underneath it.",
  },
  {
    id: "watched",
    icon: Eye,
    tag: "Answered & watched",
    title: "See who answered, and who watched",
    body: [
      "Open your own Moment and the count sits along the foot: 14 watched, with the bin beside it. Tap it and a white sheet rises over the picture — Answered at the top, everyone who replied with the heart you left on them, and the full watched list underneath.",
      "Every row is a picture, a name and a @handle, the same way the app writes people everywhere else. It is the whole audience of your Moment in one place, and it is only ever your own Moment that shows it.",
    ],
    points: [
      {
        title: "A count on your Moment",
        body: "The eye and the number sit under your own post, where you already are.",
      },
      {
        title: "Answered first",
        body: "The people who replied come first, so a conversation is not buried under the list.",
      },
      {
        title: "A name and a handle",
        body: "Every row carries the picture, the name and the @handle, so you know exactly who it is.",
      },
    ],
    path: ["Your Moment", "14 watched"],
    caption: "Your own Moment: who answered it, and the 14 who watched.",
  },
  {
    id: "memories",
    icon: History,
    tag: "Memories",
    title: "After its day, it becomes a Memory",
    body: [
      "A Moment leaves the rail when its day is over, but it is not thrown away. It tucks itself into Memories, under your profile, so everything you have ever posted is still there to look back on.",
      "That is the whole arrangement: the rail stays today's, and Memories keeps the rest. Nothing you post quietly disappears just because it stopped being new.",
    ],
    points: [
      {
        title: "A day on the rail",
        body: "Today's Moments are the ones people see. Tomorrow the rail is today again.",
      },
      {
        title: "Kept under Profile",
        body: "Open Profile → Memories to relive everything you have ever posted.",
      },
      {
        title: "Nothing is lost",
        body: "Moving out of the rail is not deleting. The Moment moves into your Memories.",
      },
    ],
    path: ["Profile", "Memories"],
    caption: "Memories: the Moments that have had their day, kept in order.",
  },
];
