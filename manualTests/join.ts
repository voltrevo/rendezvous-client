import * as base58 from "https://deno.land/std@0.170.0/encoding/base58.ts";

import { Key, PrivateRoom } from "../mod.ts";
import { rendezvousBasePath } from "./config.ts";

const keyBase58 = prompt("Enter key:") ?? "";

const room = new PrivateRoom(rendezvousBasePath, Key.fromBase58(keyBase58));

console.log(`id: ${base58.encode(room.id)}`);
