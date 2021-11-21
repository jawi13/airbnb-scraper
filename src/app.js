const { clearOutputFileIfExists } = require("./utils/clearOutputFileIfExists");
const { scrapeListingsData } = require("./scraper/scrapeListingsData");
const { writeToFile } = require("./utils/writeToFile");

const listingsUrls = [
  "https://www.airbnb.co.uk/rooms/33571268",
  "https://www.airbnb.co.uk/rooms/20669368",
  "https://www.airbnb.co.uk/rooms/50633275",
];

const app = async () => {
  clearOutputFileIfExists("./listingsData.json");
  const listingsData = await scrapeListingsData(listingsUrls);
  writeToFile("./listingsData.json", { data: listingsData });
};

app();

module.exports = { app };
