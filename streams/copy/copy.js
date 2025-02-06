const fs = require("fs/promises");

// (async () => {
//   const srcFile = await fs.open("src.txt", "r");
//   const destFile = await fs.open("dest.txt", "w");
//   let bytesRead = -1;

//   while (bytesRead !== 0) {
//     const readResult = await srcFile.read();
//     console.log(readResult.buffer);

//     bytesRead = readResult.bytesRead;
//     if (bytesRead !== 16384) {
//       const idxOfNotFilled = readResult.buffer.indexOf(0);
//       const newBuffer = Buffer.alloc(idxOfNotFilled);
//       readResult.buffer.copy(newBuffer, 0, 0, idxOfNotFilled);
//       destFile.write(newBuffer);
//     } else {
//       destFile.write(readResult.buffer);
//     }
//   }
// })();

(async () => {
  console.time("time");
  const srcFile = await fs.open("src.txt", "r");
  const destFile = await fs.open("dest.txt", "w");

  const readStream = srcFile.createReadStream();
  const writeStream = destFile.createWriteStream({});

  readStream.pipe(writeStream);
  readStream.on("end", () => {
    console.timeEnd("time");
  });
})();
