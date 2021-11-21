# AirBnB Scraper

This program uses Puppeteer to launch a headless browser and sequentially navigate to a specified collection of pages for AirBnb listings, gathering data by scraping their HTML.

The listings are stored in an array of URLs which can be edited by updating the constant variable `listingsUrl` in `/src/app.js`.

Once the program has been executed, the outputted data will be saved to `/listingsData.json`.

## Run

```
npm install
npm run start
```

## Test

```
npm run test
```
