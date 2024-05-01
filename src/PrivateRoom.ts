import WebSocket from "isomorphic-ws";

import keccak256 from "keccak256";
import base64url from "base64url";

import Emitter from "./Emitter";
import Key from "./Key";
import Cipher from "./Cipher";

type Events = {
  open(ev: WebSocket.Event): void;
  message(data: unknown): void;
  close(ev: WebSocket.CloseEvent): void;
  error(ev: WebSocket.ErrorEvent): void;
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

    this.id = keccak256(Buffer.from(key.data));

    this.roomPath = `${this.rendezvousBasePath}/rooms/${
      base64url.encode(Buffer.from(this.id))
    }`;

    this.cipher = new Cipher(this.key);

    this.socket = new WebSocket(this.roomPath);

    this.socket.onopen = (ev) => this.emit("open", ev);

    this.socket.onmessage = async (ev) => {
      if (!Buffer.isBuffer(ev.data)) {
        throw new Error("Expected buffer");
      }

      this.emit(
        "message",
        this.cipher.decrypt(new Uint8Array(ev.data)),
      );
    };

    this.socket.onclose = (ev) => this.emit("close", ev);
    this.socket.onerror = (ev) => this.emit("error", ev);
  }

  send(msg: unknown) {
    this.socket.send(this.cipher.encrypt(msg));
  }
}
