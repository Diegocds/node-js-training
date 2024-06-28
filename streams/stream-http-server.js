import http from "node:http";
import { Transform } from "node:stream";

class InverseNumberStream extends Transform {
  _write(chunck, enconding, callback) {
    const transformed = Number(chunck.toString()) * -1;
    callback(null, Buffer.from(String(transformed)));
  }
}

// req => ReadableStrem (Le dados)
// res => WritableStream (escreve dados dados)

const server = http.createServer(async (req, res) => {
  const buffers = [];

  for await (const chunk of req) {
    buffers.push(chunk);
  }

  const fullStreamContent = Buffer.concat(buffers).toString();

  console.log(fullStreamContent);

  return res.end(fullStreamContent);
});

server.listen(3334);
