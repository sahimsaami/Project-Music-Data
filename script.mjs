import { getUserIDs, getListenEvents } from "./data.mjs";
import {
  mostListenedSong,
  mostListenedArtist,
  fridayNightSong,
  mostListenedSongByTime,
  mostListenedArtistByTime,
  longestStreak,
  songsEveryDay,
  topGenres,
} from "./common.mjs";

const select = document.getElementById("user-select");
const container = document.getElementById("stats-container");
const noDataMsg = document.getElementById("no-data");

/*  populate dropdown  */

getUserIDs().forEach((id) => {
  const option = document.createElement("option");
  option.value = id;
  option.textContent = id;
  select.appendChild(option);
});

select.addEventListener("change", (e) => {
  const userId = e.target.value;

  if (!userId) {
    container.classList.add("hidden");
    return;
  }

  const events = getListenEvents(userId);
  if (!events || events.length === 0) {
    container.classList.add("hidden");
    noDataMsg.classList.remove("hidden");
    return;
  }

  noDataMsg.classList.add("hidden");
  container.classList.remove("hidden");
  const topSong = mostListenedSong(events);
  if (topSong) {
    document.querySelector("#most-song-count p").innerText =
      `${topSong.artist} - ${topSong.title}`;
  }

  const topArtist = mostListenedArtist(events);
  if (topArtist) {
    document.querySelector("#most-artist-count p").innerText = topArtist;
  }

  const fridaySong = fridayNightSong(events);
  const fridaySection = document.getElementById("friday-song");

  if (fridaySong) {
    fridaySection.classList.remove("hidden");
    fridaySection.querySelector("p").innerText =
      `${fridaySong.artist} - ${fridaySong.title}`;
  } else {
    fridaySection.classList.add("hidden");
  }

  const songByTime = mostListenedSongByTime(events);
  if (songByTime) {
    document.querySelector("#most-song-time p").innerText =
      `${songByTime.artist} - ${songByTime.title}`;
  }

  const artistByTime = mostListenedArtistByTime(events);
  if (artistByTime) {
    document.querySelector("#most-artist-time p").innerText = artistByTime;
  }

  const streak = longestStreak(events);
  if (streak) {
    document.querySelector("#longest-streak p").innerText =
      `${streak.song.artist} - ${streak.song.title} (length: ${streak.count})`;
  }

  const everyDay = songsEveryDay(events);
  const everyDaySection = document.getElementById("every-day-songs");

  if (everyDay.length > 0) {
    everyDaySection.classList.remove("hidden");

    everyDaySection.querySelector("p").innerText = everyDay
      .map((s) => `${s.artist} - ${s.title}`)
      .join(", ");
  } else {
    everyDaySection.classList.add("hidden");
  }

  const genres = topGenres(events);

  if (genres.length > 0) {
    document.querySelector("#top-genres p").innerText = genres.join(", ");
  }
});
