export default function readStdin(buffer: Uint8Array) {
  return new Promise((resolve, reject) => {
    process.stdin.once("readable", () => {
      const data = process.stdin.read(buffer.length);
      if (data === null) {
        resolve(null); // No more data (EOF)
        return;
      }

      buffer.set(Buffer.from(data), 0);
      resolve(data.length);
    });

    process.stdin.once("error", (err) => {
      reject(err);
    });
  });
}

export async function readStdinLine(): Promise<string> {
  const buf = new Uint8Array(1024);
  let len = 0;

  while (true) {
    const c = new Uint8Array(1);

    if (await readStdin(c) === null || c[0] === 10) {
      break;
    }

    if (len < buf.length) {
      buf[len++] = c[0];
    }
  }

  return new TextDecoder().decode(buf.slice(0, len));
}
