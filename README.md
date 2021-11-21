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

## With more time I would...

- **Improve Testing**- create mock data to be able to unit test functions independently without the need to use puppeteer to evaluate live pages
- **Build a front end**- to output the data gathered rather than in a .json file
- **Create a build pipeline**- to run automated testing when a commit is pushed and optimise for production
