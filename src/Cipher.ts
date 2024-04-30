import aes, { Counter } from "aes-js";
import { Packr, Unpackr } from "msgpackr";
import Key from "./Key";

const unpackr = new Unpackr();
const packr = new Packr();

export default class Cipher {
  constructor(public key: Key) {}

  encrypt(plaintext: unknown): Uint8Array {
    const plaintextBytes = packr.pack(plaintext);

    const paddedLen = 16 * (1 + Math.ceil(plaintextBytes.length / 16));
    const plaintextPadded = new Uint8Array(paddedLen);

    plaintextPadded.set(plaintextBytes, 0);

    const iv = crypto.getRandomValues(new Uint8Array(16));
    const cipher = new aes.ModeOfOperation.ctr(this.key.data, new Counter(iv));
    const ciphertext = cipher.encrypt(plaintextPadded);

    const fullCiphertext = new Uint8Array(16 + ciphertext.length);
    fullCiphertext.set(iv, 0);
    fullCiphertext.set(ciphertext, 16);

    return fullCiphertext;
  }

  decrypt(ciphertext: Uint8Array): unknown {
    const iv = ciphertext.slice(0, 16);
    const cipher = new aes.ModeOfOperation.ctr(this.key.data, new Counter(iv));
    const decryptedBytes = cipher.decrypt(ciphertext.slice(16));

    const decryptions = unpackr.unpackMultiple(decryptedBytes) as unknown[];

    const plaintext = decryptions.shift();

    for (let i = 0; i < 16; i++) {
      if (decryptions[i] !== 0) {
        throw new Error("Invalid ciphertext");
      }
    }

    return plaintext;
  }
}
