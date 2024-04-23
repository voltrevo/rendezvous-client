import EventEmitter from "events";
import TypedEmitter from "typed-emitter";

const Emitter = EventEmitter as {
  new <T extends TypedEmitter.EventMap>(): TypedEmitter.default<T>;
};

export default Emitter;
