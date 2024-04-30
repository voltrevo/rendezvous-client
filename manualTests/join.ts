import { Key, PrivateRoom } from "../mod";
import { rendezvousBasePath } from "./src/config";
import chat from "./src/chat";
import { readStdinLine } from "./src/readStdin";

(async () => {
  process.stdout.write("Enter key: ");
  const keyBase58 = await readStdinLine();

  const room = new PrivateRoom(rendezvousBasePath, Key.fromBase58(keyBase58));

  chat(room);
})();
