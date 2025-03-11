const { Writable } = require("stream");

class FileWriteStreams extends Writable {
  constructor({ highWaterMark, fileName }) {
    super({ highWaterMark });
    this.fileName = fileName;
    this.fd = null;
  }

  _construct(callback) {
    fs.open(this.fileName, "w", (err, fd) => {
      if (err) {
        return callback(err);
      } else {
        this.fd = fd;
        callback();
      }
    });
  }

  _write(chunk, encoding, callback) {
    callback();
  }

  _final(callback) {
    callback();
  }

  _destroy(error, callback) {
    callback();
  }
}
const stream = new FileWriteStreams({
  highWaterMark: 1800,
  //   fileName: "file.txt",
});

stream.write(Buffer.from("start"));
stream.end(Buffer.from("end"));
