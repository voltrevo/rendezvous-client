import keccak256 from "keccak256";
import base64url from "base64url";

import Emitter from "./Emitter";
import Key from "./Key";
import Cipher from "./Cipher";

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

    this.id = keccak256(key.data);

    this.roomPath = `${this.rendezvousBasePath}/rooms/${
      base64url.toBase64(this.id)
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
