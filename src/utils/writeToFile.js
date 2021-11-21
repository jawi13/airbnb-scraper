const fs = require("fs");

const writeToFile = (filename, data) => {
  console.log(`Writing data to file...`);
  fs.writeFile(filename, JSON.stringify(data), (error) => {
    if (error) console.log(`Failed to write data to file.`);
  });
  console.log(`Data successfully written to file.`);
};

module.exports = { writeToFile };
