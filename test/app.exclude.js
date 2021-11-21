const fs = require("fs");
const { app } = require("../src/app");
const expectedListingsDataJson = require("./resources/expectedListingsDataJson.json");

jest.setTimeout(60000);

describe("test application e2e", () => {
  test("should scrape listings and write data to listingsData.json", async () => {
    await app();
    fs.readFile("listingsData.json", (err, data) => {
      if (!err) {
        const json = data.toString();
        expect(json).toEqual(expectedListingsDataJson);
      }
    });
    fs.unlink("listingsData.json", (err) => {
      if (err) throw err;
    });
  });
});
