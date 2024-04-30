import { Key, PrivateRoom } from "../mod";
import { rendezvousBasePath } from "./src/config";
import chat from "./src/chat";

const room = new PrivateRoom(
  rendezvousBasePath,
  Key.random(),
);

chat(room);
