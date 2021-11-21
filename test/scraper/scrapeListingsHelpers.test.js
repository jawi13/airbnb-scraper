const puppeteer = require("puppeteer");
const {
  isValidAirBnbListing,
  checkForError,
  getPropertyName,
  getPropertyType,
  getDetailsList,
  getAmenitiesModalLink,
  getAmenities,
} = require("../../src/scraper/scrapeListingsHelpers");

jest.setTimeout(10000);

var browser;
var page;

beforeAll(async () => {
  browser = await puppeteer.launch();
  page = await browser.newPage();
});

afterAll(async () => {
  await browser.close();
});

describe("tests for scraper helpers", () => {
  test("should return true if valid listing url format", () => {
    const listingUrl = "https://www.airbnb.co.uk/rooms/20669368";
    expect(isValidAirBnbListing(listingUrl)).toBe(true);
  });

  test("should return true if valid listing url format when top level domain is not .co.uk", () => {
    const listingUrl = "https://www.airbnb.com/rooms/20669368";
    expect(isValidAirBnbListing(listingUrl)).toBe(true);
  });

  test("should return false if invalid listing url format", () => {
    const listingUrl = "https://www.airbnb.com/20669368";
    expect(isValidAirBnbListing(listingUrl)).toBe(false);
  });

  test("should return true if valid listing url format", () => {
    const listingUrl = "https://www.airbnb.co.uk/rooms/20669368";
    expect(isValidAirBnbListing(listingUrl)).toBe(true);
  });

  test("should return true if listing has error", async () => {
    const listingUrl = "https://www.airbnb.co.uk/rooms/33571268";
    await page.goto(listingUrl);
    await page.waitForNetworkIdle();
    expect(await checkForError(page, listingUrl)).toBe(true);
  });

  test("should return false if listing does not have error", async () => {
    const listingUrl = "https://www.airbnb.co.uk/rooms/20669368";
    await page.goto(listingUrl);
    await page.waitForNetworkIdle();
    expect(await checkForError(page, listingUrl)).toBe(false);
  });

  test("should return property name from valid listing", async () => {
    const listingUrl = "https://www.airbnb.co.uk/rooms/20669368";
    await page.goto(listingUrl);
    await page.waitForNetworkIdle();
    expect(await getPropertyName(page)).toBe(
      "Little Country Houses - Poppy's Pad"
    );
  });

  test("should return property type from valid listing", async () => {
    const listingUrl = "https://www.airbnb.co.uk/rooms/20669368";
    await page.goto(listingUrl);
    await page.waitForNetworkIdle();
    expect(await getPropertyType(page)).toBe("Tiny house");
  });

  test("should return details list from valid listing", async () => {
    const listingUrl = "https://www.airbnb.co.uk/rooms/20669368";
    await page.goto(listingUrl);
    await page.waitForNetworkIdle();
    const expected = ["4 guests", "1 bedroom", "1 bed", "1 bathroom"];
    expect(await getDetailsList(page)).toEqual(expected);
  });

  test("should return amenities list from valid listing", async () => {
    const listingUrl = "https://www.airbnb.co.uk/rooms/20669368";
    await page.goto(listingUrl);
    await page.waitForNetworkIdle();
    const amenitiesModalLink = await getAmenitiesModalLink(page);
    await page.goto(amenitiesModalLink);
    await page.waitForNetworkIdle();
    const expected = [
      "Suitable for events",
      "Indoor fireplace",
      "Heating",
      "Smoke alarm",
      "Fire extinguisher",
      "First aid kit",
      "Kitchen",
      "Refrigerator",
      "Cooking basics",
      "Oven",
      "Patio or balcony",
      "BBQ grill",
      "Free parking on premises",
      "Hot tub",
      "Host greets you",
    ];
    expect(await getAmenities(page)).toEqual(expected);
  });
});
