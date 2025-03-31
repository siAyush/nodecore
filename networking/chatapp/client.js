const net = require("net");
const readline = require("readline/promises");

const rl = new readline.Interface({
  input: process.stdin,
  output: process.stdout,
});

const clearLine = (dir) => {
  return new Promise((resolved, reject) => {
    process.stdout.clearLine(dir, () => {
      resolved();
    });
  });
};

const moveCursor = (dx, dy) => {
  return new Promise((resolved, reject) => {
    process.stdout.moveCursor(dx, dy, () => {
      resolved();
    });
  });
};

let id;

const client = net.createConnection(
  {
    host: "127.0.0.1",
    port: 3000,
  },
  async () => {
    console.log("conneted to server");

    const ask = async () => {
      const message = await rl.question("enter a message >");
      await moveCursor(0, -1);
      await clearLine(0);
      client.write(`${id}-message-${message}`);
    };
    ask();

    client.on("data", async (data) => {
      console.log();
      await moveCursor(0, -1);
      await clearLine(0);

      if (data.toString("utf-8").includes("id-")) {
        id = data.toString("utf-8").replace("id-", "");
        console.log("your id is", id);
      } else {
        console.log(data.toString("utf-8"));
      }
      ask();
    });
  }
);

client.on("end", () => {
  console.log("connection closed");
});
