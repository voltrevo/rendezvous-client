import * as base58 from "https://deno.land/std@0.170.0/encoding/base58.ts";
import { PrivateRoom } from "../../mod.ts";
import Emitter from "../../src/Emitter.ts";

export default async function chat(room: PrivateRoom) {
  const display = new Display();

  display.log(`key: ${room.key.base58()}`);
  display.log(`id: ${base58.encode(room.id)}`);

  room.on("open", () => display.log("opened"));
  room.on("close", () => display.log("closed"));
  room.on("error", (_ev) => display.log("errored"));

  room.on("message", (msg) => display.log(`received: ${msg}`));

  display.on("message", (msg) => room.send(msg));

  await new Promise<void>((resolve) => {
    display.on("end", () => resolve());
  });

  room.socket.close();
}

class Display extends Emitter<{ message(message: string): void; end(): void }> {
  msgs: string[] = [];
  partialMessage = new Uint8Array(1024);
  partialMessageIndex = 0;

  constructor() {
    super();

    this.render();

    (async () => {
      const decoder = new TextDecoder();

      while (true) {
        const c = new Uint8Array(1);

        if (await Deno.stdin.read(c) === null) {
          this.emit("end");
          break;
        }

        if (c[0] === 10) {
          const len = this.partialMessageIndex;
          this.partialMessageIndex = 0;

          this.emit(
            "message",
            decoder.decode(this.partialMessage.slice(0, len)),
          );

          continue;
        }

        if (this.partialMessageIndex < this.partialMessage.length) {
          this.partialMessage[this.partialMessageIndex++] = c[0];
        }
      }
    })();
  }

  log(msg: string) {
    while (this.msgs.length >= 10) {
      this.msgs.shift();
    }

    this.msgs.push(msg);

    this.render();
  }

  render() {
    console.clear();

    console.log(this.msgs.join("\n"));
    console.log();

    Deno.stdout.write(new TextEncoder().encode("send: "));
    Deno.stdout.write(this.partialMessage.slice(0, this.partialMessageIndex));
  }
}
