import {
  Gamepad2,
  Hand,
  ListVideo,
  Mic,
  Plus,
  Video,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

/**
 * Everything a live room can do, one entry per block on the live page.
 *
 * The order is the order these happen in the app: open a room, then the three
 * kinds of room you can open (Stream, Room, Game), then what happens inside a
 * room once it is running — hands up, and the game on the stage — and finally
 * the shelf you found it on.
 *
 * Every entry is written from the app's own words rather than a paraphrase of
 * them. The sheet really does say "Anybody can walk in. You hold the room,
 * which means you hand out the microphones and you are the one who closes it";
 * a Stream really is "You and your stage get a camera"; a Room really is "Voices
 * only. Anybody on the stage can be heard, and the audience can talk in the
 * room's chat and throw emoji"; and the game card really does say "Two of you
 * play and everybody else watches." Nothing here softens or extends those.
 */
export type LiveSection = {
  /** matches a screen and an escape in `LiveMockups` */
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

export const liveSections: LiveSection[] = [
  {
    id: "open",
    icon: Plus,
    tag: "Open a room",
    title: "One sheet, and the room is open",
    body: [
      "A room starts from the + on the Live tab. The sheet asks for a name, a line under it if you have one, the kind of room it is — Room, Stream, Game or AMA — and tags, comma separated. Then it asks whether you want to start now or later.",
      "The sheet also says the arrangement out loud: anybody can walk in, you hold the room, which means you hand out the microphones and you are the one who closes it. There is nothing else to set up and no host dashboard to learn.",
    ],
    points: [
      {
        title: "Anybody can walk in",
        body: "A live room has no guest list. The audience is whoever turns up, and the only door is the room's.",
      },
      {
        title: "You hold the room",
        body: "The person who opens the room hands out the microphones and is the one who closes it.",
      },
      {
        title: "Start it later",
        body: "Switch on Start it later and the room is announced on the shelf with a time on it instead of opening now.",
      },
    ],
    path: ["Live tab", "Tap +", "Open it"],
    caption: "Open a room: a name, a line, a kind and tags — then Open it.",
  },
  {
    id: "stream",
    icon: Video,
    tag: "Stream",
    title: "Stream: you and your stage get a camera",
    body: [
      "A Stream is the room with pictures in it. You and your stage get a camera, everybody's picture sits on the stage, and each of you turns their own on or off from the bottom of the room — nobody reaches over and switches somebody else's off.",
      "Under the stage the room says what is actually on: your microphone is open and how many voices, your camera is on. Below that it counts who is listening, so a room of one is not mistaken for a room of many.",
    ],
    points: [
      {
        title: "Everybody's picture is on the stage",
        body: "The host gets the big tile and the stage sits under it, each person labelled with their own name.",
      },
      {
        title: "Each of you handles their own",
        body: "Mic and camera are on the bottom bar, one set per person. Your switch only ever changes yours.",
      },
      {
        title: "A game under the stage",
        body: "The Go live with a game card sits in the room, so the board can become the stream without leaving it.",
      },
    ],
    path: ["Open a room", "Choose Stream", "Open it"],
    caption: "Stream: the stage gets cameras, and everyone controls their own.",
  },
  {
    id: "room",
    icon: Mic,
    tag: "Room",
    title: "Room: voices only, and the room talks back",
    body: [
      "A Room is voices only. Anybody on the stage can be heard, and the audience can talk in the room's chat and throw emoji — so the people listening are still part of it, they just are not on the microphone.",
      "The stage is the host's avatar at the centre, with the room's name and who is in it along the top. Under the microphone line, a Play something with the room card offers a game without changing the room's kind.",
    ],
    points: [
      {
        title: "The stage is heard",
        body: "Anybody on the stage can be heard. Speaking there is speaking to the whole room, not a side channel.",
      },
      {
        title: "The audience still talks",
        body: "Listeners talk in the room's chat and throw emoji — being in the audience is not being silent.",
      },
      {
        title: "A game on the side",
        body: "Play something with the room sits in the room, one tap from the board, without turning it into a game room.",
      },
    ],
    path: ["Open a room", "Choose Room", "Open it"],
    caption: "Room: voices only, with the audience in the chat.",
  },
  {
    id: "hands",
    icon: Hand,
    tag: "Hands up",
    title: "Hands go up, and the host brings them up",
    body: [
      "Listeners raise a hand and it lands under Hands up, with the person's name, their picture and a Bring up button beside them. The host taps it and that listener is on the stage — no waiting room and no second approval.",
      "Under Hands up the room counts who is only listening. That is the whole queue: who wants to speak, and how many are still just here to hear it.",
    ],
    points: [
      {
        title: "One tap, one voice",
        body: "Bring up is the entire permission flow. The host taps it and the stage has one more person on it.",
      },
      {
        title: "The queue is visible",
        body: "Hands up shows exactly who is waiting, in the order they asked, right above the listening count.",
      },
      {
        title: "Listening is counted",
        body: "The room says how many people are listening, so the host can see the room they are holding.",
      },
    ],
    path: ["In a room", "HANDS UP", "Bring up"],
    caption: "Hands up: the queue the host reads before giving out a mic.",
  },
  {
    id: "game",
    icon: Gamepad2,
    tag: "Game",
    title: "Game: the board becomes the stream",
    body: [
      "A game room puts the board where the stream would be. Two of you play and everybody else watches the same board at the same moment — the names along the top of the card are the two players, and the cell that has just been taken is the one that lights up.",
      "When the board is decided it says so — Ethan Cole won — and offers Play again or Put it away. Putting it away leaves the room standing with the stage underneath it, so the conversation does not end with the game.",
    ],
    points: [
      {
        title: "Two play, everyone watches",
        body: "The players are named on the card. Everybody else in the room sees the same moves as they happen.",
      },
      {
        title: "The board is the stream",
        body: "It replaces the picture rather than sitting beside it, so there is nothing to be out of sync with.",
      },
      {
        title: "Play again, or put it away",
        body: "One ends the game and starts another; the other clears the card and leaves the room as it was.",
      },
    ],
    path: ["Open a room", "Choose Game", "Play again"],
    caption: "Game: the board is the stream, and the room watches it.",
  },
  {
    id: "shelf",
    icon: ListVideo,
    tag: "On air",
    title: "The shelf: On air, Coming up, and Mine",
    body: [
      "The Live tab is a shelf with three sides. On air is who is live right now; Coming up is what has been announced for later; Mine is the rooms you opened, carrying a LIVE badge while they are running.",
      "Every room on the shelf says the same four things in the same places — its kind, that it is live, who is holding it, and how many people are in it. When none of that is true the shelf says so plainly: Nobody is on air. No rooms are open. Start one.",
    ],
    points: [
      {
        title: "On air",
        body: "Rooms that are live now, whoever opened them, each carrying its kind and its host.",
      },
      {
        title: "Coming up",
        body: "Rooms started with Start it later, announced on the shelf with the time they open.",
      },
      {
        title: "Mine",
        body: "The rooms you opened, with a LIVE badge on them while you are holding them.",
      },
    ],
    path: ["Live tab", "On air · Coming up · Mine"],
    caption: "The shelf: what is on air, what is coming, and what is yours.",
  },
];
