import { getUserIDs, getSong } from "./data.mjs";

/*  Utility  */

function ensureArray(events) {
  if (!events) return [];
  return Array.isArray(events) ? events : Object.values(events);
}

function groupBy(keyFn, events) {
  const map = {};
  events.forEach((e) => {
    const key = keyFn(e);
    map[key] = (map[key] || 0) + 1;
  });
  return map;
}

function groupByTime(keyFn, events) {
  const map = {};
  events.forEach((e) => {
    const key = keyFn(e);
    map[key] = (map[key] || 0) + e.ms_played;
  });
  return map;
}

function topKey(map) {
  const entry = Object.entries(map).sort((a, b) => b[1] - a[1])[0];
  return entry ? entry[0] : null;
}

/*  Required for unit test  */

export function countUsers() {
  return getUserIDs().length;
}

/*  Most listened song (count)  */

export function mostListenedSong(events) {
  if (!events || events.length === 0) {
    return null;
  }

  const counts = {};

  for (const event of events) {
    const id = event.song_id;

    if (!counts[id]) {
      counts[id] = 0;
    }
    counts[id]++;
  }
  let topId = null;
  let max = 0;
  for (const id in counts) {
    if (counts[id] > max) {
      max = counts[id];
      topId = id;
    }
  }
  if (!topId) {
    return null;
  }
  return getSong(topId);
}

/*   Most listened artist (count)  */

export function mostListenedArtist(events) {
  events = ensureArray(events);
  if (events.length === 0) return null;

  const artistCounts = {};

  events.forEach((e) => {
    const song = getSong(e.song_id);
    if (!song) return;

    const artist = song.artist;
    artistCounts[artist] = (artistCounts[artist] || 0) + 1;
  });

  return topKey(artistCounts);
}

/*  Friday night listens  */
export function fridayNightSong(events) {
  events = ensureArray(events);

  const fridayEvents = events.filter((e) => {
    const d = new Date(e.timestamp);
    const hour = d.getHours();

    return (d.getDay() === 5 && hour >= 17) || (d.getDay() === 6 && hour < 4);
  });

  if (fridayEvents.length === 0) return null;

  const counts = groupBy((e) => e.song_id, fridayEvents);
  const songId = topKey(counts);

  return getSong(songId);
}

/*  Most listened song (time)  */
export function mostListenedSongByTime(events) {
  events = ensureArray(events);
  if (events.length === 0) return null;
  const timeMap = groupByTime((e) => e.song_id, events);
  const songId = topKey(timeMap);

  return getSong(songId);
}

/*  Most listened artist (time)  */
export function mostListenedArtistByTime(events) {
  events = ensureArray(events);

  const map = {};
  events.forEach((e) => {
    const song = getSong(e.song_id);
    if (!song) return;

    const artist = song.artist;
    map[artist] = (map[artist] || 0) + e.ms_played;
  });

  return topKey(map);
}
/*  Longest streak  */
export function longestStreak(events) {
  events = ensureArray(events);
  if (events.length === 0) return null;
  let bestSong = null;
  let bestCount = 0;
  let currentSong = null;
  let currentCount = 0;
  events.forEach((e) => {
    if (e.song_id === currentSong) {
      currentCount++;
    } else {
      currentSong = e.song_id;
      currentCount = 1;
    }

    if (currentCount > bestCount) {
      bestCount = currentCount;
      bestSong = currentSong;
    }
  });

  const song = getSong(bestSong);
  return {
    song,
    count: bestCount,
  };
}

/*  Songs listened every day  */
export function songsEveryDay(events) {
  events = ensureArray(events);
  if (events.length === 0) return [];

  const days = new Set();
  const songDays = {};

  events.forEach((e) => {
    const day = e.timestamp.split("T")[0];
    days.add(day);

    songDays[e.song_id] ??= new Set();
    songDays[e.song_id].add(day);
  });

  const totalDays = days.size;

  return Object.entries(songDays)
    .filter(([_, set]) => set.size === totalDays)
    .map(([songId]) => getSong(songId));
}

/*  Top genres  */
export function topGenres(events) {
  events = ensureArray(events);
  const map = {};
  events.forEach((e) => {
    const song = getSong(e.song_id);
    if (!song) return;

    const genre = song.genre;
    map[genre] = (map[genre] || 0) + 1;
  });

  return Object.entries(map)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([genre]) => genre);
}
