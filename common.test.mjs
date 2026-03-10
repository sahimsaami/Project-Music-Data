import test from "node:test";
import assert from "node:assert";

import { countUsers, mostListenedSong } from "./common.mjs";
import { getListenEvents } from "./data.mjs";

test("User count is correct", () => {
  assert.equal(countUsers(), 4);
});

test("most listened song exists for user 1", () => {
  const events = getListenEvents("user_1");

  const song = mostListenedSong(events);

  assert.ok(song);
  assert.ok(song.title);
});
