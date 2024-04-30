import { EventEmitter } from "events";
import { default as TypedEmitter, EventMap } from "typed-emitter";

const Emitter = EventEmitter as {
  new <T extends EventMap>(): TypedEmitter<T>;
};

export default Emitter;
