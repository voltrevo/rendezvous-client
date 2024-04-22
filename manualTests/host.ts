import { Key, PrivateRoom } from "../mod.ts";
import { rendezvousBasePath } from "./config.ts";

const room = new PrivateRoom(
  rendezvousBasePath,
  Key.random(),
);

console.log(`key: ${room.key.base58()}`);
