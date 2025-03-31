const dgram = require("dgram");

const sender = dgram.createSocket("udp4");

sender.send("Hello, UDP server!", 8000, "localhost", (error, bytes) => {
  if (error) {
    console.log(error);
  }
  console.log(bytes);
  // sender.close();
});
