const { scrapeListingsData } = require("../../src/scraper/scrapeListingsData");
const { expectedListingsData } = require("../resources/expectedListingsData");

jest.setTimeout(60000);

describe("integration tests for scraper", () => {
  test("should scrape data from valid listing URLs", async () => {
    const listingsUrls = [
      "https://www.airbnb.co.uk/rooms/33571268",
      "https://www.airbnb.co.uk/rooms/20669368",
      "https://www.airbnb.co.uk/rooms/50633275",
    ];
    const listingsData = await scrapeListingsData(listingsUrls);
    expect(listingsData).toEqual(expectedListingsData);
  });

  test("should not scrape data from invalid listing URLs", async () => {
    const invalidListingUrls = ["a", "https://www.google.com"];
    const data = await scrapeListingsData(invalidListingUrls);
    expect(data).toEqual([]);
  });
});
