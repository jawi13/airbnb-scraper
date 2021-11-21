const puppeteer = require("puppeteer");
const {
  isValidAirBnbListing,
  checkForError,
  getPropertyName,
  getPropertyType,
  getDetailsList,
  getAmenitiesModalLink,
  getAmenities,
} = require("./scrapeListingsHelpers");

const scrapeListingsData = async (listingsUrls) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const listingsData = [];

  for (const url of listingsUrls) {
    if (isValidAirBnbListing(url)) {
      {
        console.log(`Getting data for listing ${url}...`);
        await page.goto(url);
        await page.waitForNetworkIdle();

        let isError = await checkForError(page, url);
        if (isError) {
          const errorMessage = "Could not get data from url.";
          console.log(errorMessage);
          listingsData.push({ url, errorMessage });
        } else {
          const propertyName = await getPropertyName(page);
          const propertyType = await getPropertyType(page);

          const detailsList = await getDetailsList(page);
          const numberOfBedrooms = parseInt(detailsList[1].charAt(0));
          const numberOfBathrooms = parseInt(detailsList[3].charAt(0));

          const amenitiesModalLink = await getAmenitiesModalLink(page);

          await page.goto(amenitiesModalLink);
          await page.waitForNetworkIdle();

          isError = await checkForError(page, url);
          if (isError) {
            const errorMessage = "Could not get data from url.";
            console.log(errorMessage);
            listingsData.push({ url, errorMessage });
          } else {
            const amenities = await getAmenities(page);

            listingsData.push({
              url,
              propertyName,
              propertyType,
              numberOfBedrooms,
              numberOfBathrooms,
              amenities,
            });
            console.log("Data gathered successfully.");
          }
        }
      }
    }
  }
  await browser.close();
  return listingsData;
};

module.exports = { scrapeListingsData };
