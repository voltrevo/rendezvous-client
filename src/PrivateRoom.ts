import Key from "./Key.ts";

export default class PrivateRoom {
  constructor(
    public rendezvousBasePath: string,
    public key: Key,
  ) {
    if (this.rendezvousBasePath.endsWith("/")) {
      this.rendezvousBasePath = this.rendezvousBasePath.slice(0, -1);
    }
  }
}
