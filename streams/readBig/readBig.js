const fs = require("fs/promises");

(async () => {
  const fileHandleRead = await fs.open("src.txt", "r");
  const writeHandleRead = await fs.open("dest.txt", "w");

  const streamRead = fileHandleRead.createReadStream();
  const streamWrite = writeHandleRead.createWriteStream({
    highWaterMark: 64 * 1024,
  });

  let split = "";

  streamRead.on("data", (chunk) => {
    const numbers = chunk.toString("utf-8").split("  ");

    if (Number(numbers[0]) !== Number(numbers[1]) - 1) {
      if (split) numbers[0] = split.trim() + numbers[0].trim();
    }
    if (
      Number(numbers[numbers.length - 2]) + 1 !==
      Number(numbers[numbers.length - 1])
    ) {
      split = numbers.pop();
    }

    numbers.forEach((number) => {
      let num = Number(number);
      if (num % 2 === 0) {
        if (!streamWrite.write(" " + num + " ")) {
          streamRead.pause();
        }
      }
    });
  });

  streamWrite.on("drain", () => {
    streamRead.resume();
  });
})();
