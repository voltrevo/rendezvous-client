import { Keccak256 } from "https://deno.land/std@0.65.0/hash/sha3.ts";
import { encodeBase64Url } from "https://deno.land/std@0.223.0/encoding/base64url.ts";

import Emitter from "./Emitter.ts";
import Key from "./Key.ts";
import Cipher from "./Cipher.ts";

type Events = {
  open(ev: Event): void;
  message(data: unknown): void;
  close(ev: CloseEvent): void;
  error(ev: Event | ErrorEvent): void;
};

export default class PrivateRoom extends Emitter<Events> {
  id: Uint8Array;
  roomPath: string;
  cipher: Cipher;
  socket: WebSocket;

  constructor(
    public rendezvousBasePath: string,
    public key: Key,
  ) {
    super();

    if (this.rendezvousBasePath.endsWith("/")) {
      this.rendezvousBasePath = this.rendezvousBasePath.slice(0, -1);
    }

    this.id = new Uint8Array(new Keccak256().update(key.data).digest());

    this.roomPath = `${this.rendezvousBasePath}/rooms/${
      encodeBase64Url(this.id)
    }`;

    this.cipher = new Cipher(this.key);

    this.socket = new WebSocket(this.roomPath);

    this.socket.onopen = (ev) => this.emit("open", ev);

    this.socket.onmessage = async (ev) =>
      this.emit(
        "message",
        this.cipher.decrypt(new Uint8Array(await ev.data.arrayBuffer())),
      );

    this.socket.onclose = (ev) => this.emit("close", ev);
    this.socket.onerror = (ev) => this.emit("error", ev);
  }

  send(msg: unknown) {
    this.socket.send(this.cipher.encrypt(msg));
  }
}
