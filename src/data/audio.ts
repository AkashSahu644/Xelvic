import { BarChart3, Download, ListMusic, PlayCircle } from "lucide-react";
import type { LucideIcon } from "lucide-react";

/**
 * Everything the audio side of the app can do, one entry per block on the Audio
 * page.
 *
 * The order is the order it happens in the app: the charts you browse, the
 * player a track opens, the playlists you build from it, and the tracks you
 * keep for when you are offline. Each entry names the screen `AudioMockups`
 * draws for it.
 *
 * The limits are the app's own. Charts and trending are what everybody is
 * playing right now; saved tracks follow you to every phone you sign in on; and
 * playlists sync across devices by themselves. Nothing here claims a catalogue
 * size, a bitrate or a download limit the app does not state.
 */
export type AudioSection = {
  /** matches a screen and an escape in `AudioMockups` */
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

export const audioSections: AudioSection[] = [
  {
    id: "charts",
    icon: BarChart3,
    tag: "Trending",
    title: "What everybody is playing, right now",
    body: [
      "The Audio tab opens on Trending now: square covers across the screen, each with the track and the person behind it, and Trending, Viral, Fresh and Most played in the chips across the top.",
      "Under the covers are your playlists and the app's own, and the lists that answer the question the chips ask — Most played takes the week and puts the play count on every row.",
    ],
    points: [
      {
        title: "Trending now",
        body: "The tracks everybody is playing, laid out as covers you can tap rather than a list you have to read.",
      },
      {
        title: "Four ways to look",
        body: "Trending, Viral, Fresh and Most played across the top of the tab, so the question you have picks the list.",
      },
      {
        title: "Most played this week",
        body: "The list says the week it covers and puts the play count on every row, so a position is a fact rather than a ranking.",
      },
    ],
    path: ["Audio tab", "Trending · Viral · Fresh · Most played"],
    caption: "The Audio tab: Trending now, your playlists, and the lists under them.",
  },
  {
    id: "player",
    icon: PlayCircle,
    tag: "Now playing",
    title: "The player, and what it keeps in reach",
    body: [
      "Tap a track and it opens on the player. The artwork has the mint circle behind it, the title and artist sit under it, and the song shows its shape as a waveform you can scrub rather than a plain line. Shuffle, skip, repeat and the pink play/pause are underneath.",
      "Share and Download are the two pills under the controls, and Up next queues what follows with Queue beside it. Leave the player and a mini-player sticks to the foot of the app, so the music carries on while you browse.",
    ],
    points: [
      {
        title: "Scrub the waveform",
        body: "The song shows its shape, so you can drop into the part you want rather than guessing at a line.",
      },
      {
        title: "Share and download, in reach",
        body: "The two things you do with a track you like sit directly under the controls.",
      },
      {
        title: "Up next stays visible",
        body: "The queue tells you what follows before it starts, and the mini-player keeps the music going when you leave.",
      },
    ],
    path: ["Audio tab", "Tap a track"],
    caption: "The player: artwork, waveform, controls and Up next.",
  },
  {
    id: "playlists",
    icon: ListMusic,
    tag: "Playlists",
    title: "Line up the tracks that match the moment",
    body: [
      "A playlist opens on its own screen: the cover, the count and the length, and a pink Play pill. “9 tracks · 39:14 · yours” is the whole summary in one line.",
      "Under it the tracks sit in order, each with its artist, its duration and its own play button, so you can drop into any one. Playlists sync across devices, so the list you made on one phone is waiting on the next one you sign in on.",
    ],
    points: [
      {
        title: "The count and the length",
        body: "A playlist says how many tracks and how long it runs before you start it.",
      },
      {
        title: "Play the whole thing",
        body: "The Play pill takes the list from the top; the play on a row starts there.",
      },
      {
        title: "Synced across phones",
        body: "Playlists sync across devices automatically, so signing in on another phone picks up where you were.",
      },
    ],
    path: ["Audio tab", "Your playlists", "Open one"],
    caption: "My Playlist: the cover, the count and the tracks in order.",
  },
  {
    id: "offline",
    icon: Download,
    tag: "Offline",
    title: "Saved for later, on every phone",
    body: [
      "Download sits beside Share under the player's controls. The downloads screen lists what is kept, how long each track is and how much space the library takes, and says which phone has it.",
      "Saved tracks follow you to every phone you sign in on, so the album you kept for a flight is there when you land and sign into the next device.",
    ],
    points: [
      {
        title: "Save once",
        body: "One tap on a track keeps it for offline listening; nothing has to be re-downloaded each time.",
      },
      {
        title: "Know what it costs",
        body: "The downloads screen counts the tracks and the space they take, so a library is not a mystery.",
      },
      {
        title: "Every phone you sign in on",
        body: "Saved tracks follow your account, not the device you happened to save them on.",
      },
    ],
    path: ["Player", "Download", "Listen offline"],
    caption: "Downloads: what is saved, how big it is, and which phone has it.",
  },
];
