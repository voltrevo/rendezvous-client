import { Key, PrivateRoom } from "../mod.ts";
import { rendezvousBasePath } from "./config.ts";

const keyBase58 = prompt("Enter key:") ?? "";

const room = new PrivateRoom(rendezvousBasePath, Key.fromBase58(keyBase58));
