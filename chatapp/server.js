const net = require("net");

const server = net.createServer();

const clients = [];

server.on("connection", (socket) => {
  console.log("a new connection");

  const clientId = clients.length + 1;
  socket.write(`id-${clientId}`);

  socket.on("data", (data) => {
    const dataString = data.toString("utf-8");
    const id = dataString.substring(0, dataString.indexOf("-"));
    const message = dataString.substring(dataString.indexOf("-message-") + 9);
    clients.forEach((client) => {
      client.socket.write(`> user ${id} : ${message}`);
    });
  });

  clients.push({ id: clientId.toString(), socket });
});

server.listen(3000, "127.0.0.1", () => {
  console.log("opened server on", server.address());
});
