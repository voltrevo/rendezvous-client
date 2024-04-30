# rendezvous-client

Client library designed for use with
[rendezvous](https://github.com/voltrevo/rendezvous).

## `PrivateRoom`

Connect to a room while hiding the messages from the rendezvous server.

Supply a key for encryption and decryption. `hash(key)` will be used for the
room id.

Interface is similar to `WebSocket`, but also allows sending & receiving any
plain object (implemented using a msgpack variant).

## `Key`

Models an encryption key. Use `Key.random()` to generate one, or supply 32 bytes
to the constructor.

## Chat Example

### Host: `./node_modules/tsx manualTests/host.ts`

```
$ ./manualTests/host.ts
key: 2QG5MQjXszG3A2ow3bV5HGkAbbp4tp7soXzQFNAXesmr
id: WUnZR3puVjVnYL3SQAJtTqZqZsnrgtctcKX4XRygzgR
opened
received: hello

send: (type here and press enter)
```

### Join: `./node_modules/tsx manualTests/join.ts`

```
$ ./manualTests/join.ts
Enter key: 2QG5MQjXszG3A2ow3bV5HGkAbbp4tp7soXzQFNAXesmr

(screen clear)

key: 2QG5MQjXszG3A2ow3bV5HGkAbbp4tp7soXzQFNAXesmr
id: WUnZR3puVjVnYL3SQAJtTqZqZsnrgtctcKX4XRygzgR
opened
received: hello

send: (type here and press enter)
```
