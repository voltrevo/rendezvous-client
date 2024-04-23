#!/usr/bin/env -S deno run --allow-net --no-prompt

import { Key, PrivateRoom } from "../mod.ts";
import { rendezvousBasePath } from "./src/config.ts";
import chat from "./src/chat.ts";

const room = new PrivateRoom(
  rendezvousBasePath,
  Key.random(),
);

await chat(room);
