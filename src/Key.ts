import * as base58 from "https://deno.land/std@0.170.0/encoding/base58.ts";

export default class Key {
  #nominal: undefined;

  constructor(public data: Uint8Array) {}

  static random() {
    return new Key(crypto.getRandomValues(new Uint8Array(32)));
  }

  base58() {
    return base58.encode(this.data);
  }

  static fromBase58(data: string) {
    return new Key(base58.decode(data));
  }
}
