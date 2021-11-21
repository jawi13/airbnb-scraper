const { writeToFile } = require("./utils/writeToFile");
const { scrapeListingsData } = require("./scraper/scrapeListingsData");

const listingsUrls = [
  "https://www.airbnb.co.uk/rooms/33571268",
  "https://www.airbnb.co.uk/rooms/20669368",
  "https://www.airbnb.co.uk/rooms/50633275",
];

const app = async () => {
  const listingsData = await scrapeListingsData(listingsUrls);
  writeToFile("./listingsData.json", { data: listingsData });
};

app();

module.exports = { app };
