import {
  type LyricsLine,
  LyricsLineSegmentType,
} from "@/shared/schemas/song/lyrics/lyrics-line.schema";
import type { Song } from "@/shared/schemas/song/song.schema";
import { fillSongLyrics } from "@features/song/utils/process/fill-song-lyrics.util";
import { describe, expect, it } from "vitest";

const MOONMEN: Song = {
  version: 1,
  lyrics: [
    {
      type: LyricsLineSegmentType.TEXT,
      startTime: 1000,
      endTime: 2300,
      segments: [{ text: "In the beginning, there was nothing" }],
      by: null,
    },
    {
      type: LyricsLineSegmentType.TEXT,
      startTime: 2500,
      endTime: 4600,
      segments: [{ text: "And then there was the moon" }],
      by: null,
    },
    {
      type: LyricsLineSegmentType.MUSIC,
      startTime: 4600,
      endTime: 6900,
    },
    {
      type: LyricsLineSegmentType.TEXT,
      startTime: 6900,
      endTime: 9200,
      segments: [{ text: "And the moon was made of cheese" }],
      by: null,
    },
  ],
  metadata: {
    genre: "Sci-Fi",
    name: "Moonmen",
    artist: "Flight of the Conchords",
    album: "Flight of the Conchords",
    duration: 9200,
    coverUrl: null,
  },
  notes: [],
};

const SUNMEN: Song = {
  version: 1,
  lyrics: [
    {
      type: LyricsLineSegmentType.TEXT,
      startTime: 1500,
      endTime: 2300,
      segments: [{ text: "In the beginning, there was nothing" }],
      by: null,
    },
    {
      type: LyricsLineSegmentType.TEXT,
      startTime: 2300,
      endTime: 4600,
      segments: [{ text: "And then there was the sun" }],
      by: null,
    },
    {
      type: LyricsLineSegmentType.MUSIC,
      startTime: 4600,
      endTime: 6900,
    },
    {
      type: LyricsLineSegmentType.TEXT,
      startTime: 6900,
      endTime: 9200,
      segments: [{ text: "And the sun was made of fire" }],
      by: null,
    },
  ],
  metadata: {
    genre: "Sci-Fi",
    name: "Sunmen",
    artist: "Flight of the Conchords",
    album: "Flight of the Conchords",
    duration: 10000,
    coverUrl: null,
  },
  notes: [],
};

const SONGS_MOCK = {
  moonmen: {
    raw: MOONMEN,
    filled: [
      {
        type: LyricsLineSegmentType.MUSIC,
        startTime: 0,
        endTime: 1000,
      },
      {
        type: LyricsLineSegmentType.MUSIC,
        startTime: 2300,
        endTime: 2500,
      },
      ...MOONMEN.lyrics,
    ].sort((a, b) => a.startTime - b.startTime) as LyricsLine[],
  },
  sunmen: {
    raw: SUNMEN,
    filled: [
      {
        type: LyricsLineSegmentType.MUSIC,
        startTime: 0,
        endTime: 1500,
      },
      ...SUNMEN.lyrics,
      {
        type: LyricsLineSegmentType.MUSIC,
        startTime: 9200,
        endTime: 10000,
      },
    ],
  },
} satisfies Record<string, { raw: Song; filled: LyricsLine[] }>;

describe("fillSongLyrics(song) should fill with music when", () => {
  it("empty simple spaces are found", () => {
    const filled = fillSongLyrics(SONGS_MOCK.moonmen.raw);

    expect(filled).toEqual(SONGS_MOCK.moonmen.filled);
  });

  it("empty spaces are found at the end", () => {
    const filled = fillSongLyrics(SONGS_MOCK.sunmen.raw);

    expect(filled).toEqual(SONGS_MOCK.sunmen.filled);
  });
});
