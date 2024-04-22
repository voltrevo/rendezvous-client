import Key from "./Key.ts";
import { Keccak256 } from "https://deno.land/std@0.65.0/hash/sha3.ts";

export default class PrivateRoom {
  id: Uint8Array;

  constructor(
    public rendezvousBasePath: string,
    public key: Key,
  ) {
    if (this.rendezvousBasePath.endsWith("/")) {
      this.rendezvousBasePath = this.rendezvousBasePath.slice(0, -1);
    }

    this.id = new Uint8Array(new Keccak256().update(key.data).digest());
  }
}
