const fs = require("fs/promises");

// without streams
// (async () => {
//   console.time("writeMany");
//   const fileHandle = await fs.open("file.txt", "w");

//   for (let i = 0; i < 1000000; i++) {
//     await fileHandle.write(` ${i} `);
//   }
//   console.timeEnd("writeMany");
// })();

// with streams
// (async () => {
//   console.time("writeMany");
//   const fileHandle = await fs.open("file.txt", "w");
//   const stream = fileHandle.createWriteStream();

//   for (let i = 0; i < 1000000; i++) {
//     const buff = Buffer.from(` ${i} `, "utf-8");
//     stream.write(buff);
//   }
//   console.timeEnd("writeMany");
// })();

// with streams with memory leak fix
(async () => {
  console.time("writeMany");
  const fileHandle = await fs.open("file.txt", "w");
  const stream = fileHandle.createWriteStream();

  let i = 0;
  const writeMany = () => {
    while (i < 1000000) {
      const buff = Buffer.from(` ${i} `, "utf-8");
      i++;
      if (i === 999999) {
        return stream.end();
      }
      if (!stream.write(buff)) break;
    }
  };

  writeMany();

  stream.on("drain", () => {
    writeMany();
  });

  stream.on("finish", () => {
    console.timeEnd("writeMany");
    fileHandle.close();
  });
})();
