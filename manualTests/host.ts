import * as base58 from "https://deno.land/std@0.170.0/encoding/base58.ts";

import { Key, PrivateRoom } from "../mod.ts";
import { rendezvousBasePath } from "./config.ts";

const room = new PrivateRoom(
  rendezvousBasePath,
  Key.random(),
);

console.log(`key: ${room.key.base58()}`);
console.log(`id: ${base58.encode(room.id)}`);
