const dgram = require("dgram");

const receiver = dgram.createSocket("udp4");

receiver.on("message", (message, remoteInfo) => {
  console.log(
    `Received message: ${message} from ${remoteInfo.address}:${remoteInfo.port}`
  );
});

receiver.bind({ address: "localhost", port: 8000 });
receiver.on("listening", () => {
  console.log("UDP server is listening");
  console.log(receiver.address());
});
