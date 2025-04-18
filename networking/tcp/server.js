const http = require("http");

const port = 3000;
const hostname = "192.168.1.3";

const server = http.createServer((req, res) => {
  const data = { message: "Hello World" };
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(data));
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
