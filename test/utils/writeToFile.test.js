const fs = require("fs");
const { writeToFile } = require("../../src/utils/writeToFile");

describe("unit test writing to file", () => {
  test("should write to file", () => {
    writeToFile("test.json", { data: "test" });
    fs.readFile("test.json", (err, data) => {
      if (!err) {
        const text = data.toString();
        expect(text).toBe('{"data":"test"}');
      }
    });
    fs.unlink("test.json", (err) => {
      if (err) throw err;
    });
  });
});
