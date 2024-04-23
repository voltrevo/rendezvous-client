#!/usr/bin/env -S deno run --allow-net --no-prompt

import { Key, PrivateRoom } from "../mod.ts";
import { rendezvousBasePath } from "./src/config.ts";
import chat from "./src/chat.ts";

const keyBase58 = prompt("Enter key:") ?? "";

const room = new PrivateRoom(rendezvousBasePath, Key.fromBase58(keyBase58));

await chat(room);
