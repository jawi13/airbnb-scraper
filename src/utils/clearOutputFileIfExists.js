const fs = require("fs");

const clearOutputFileIfExists = async (filename) => {
  if (await fileExists(filename)) {
    fs.unlink(filename, (err) => {
      if (err) throw err;
    });
  }
};

const fileExists = async (path) =>
  !!(await fs.promises.stat(path).catch((e) => false));

module.exports = { clearOutputFileIfExists, fileExists };
