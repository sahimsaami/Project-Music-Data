import test from "node:test";
import assert from "node:assert";

import { countUsers, mostListenedSong } from "./common.mjs";
import { getListenEvents } from "./data.mjs";

test("User count is correct", () => {
  assert.equal(countUsers(), 4);
});
test("most listened song exists for user 1", () => {
  const events = getListenEvents("1");

  const song = mostListenedSong(events);

  assert.ok(song);
  assert.ok(song.title);
});
test("most listened song is null for user with no events", () => {
  const events = getListenEvents("nonexistent_user");

  const song = mostListenedSong(events);

  assert.equal(song, null);
}); 
test("most listened song is null for user with empty events", () => {
  const events = [];

  const song = mostListenedSong(events);

  assert.equal(song, null);
}   );  