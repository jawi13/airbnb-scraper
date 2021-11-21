const { isURL } = require("validator");

const isValidAirBnbListing = (url) => {
  const airBnbListingRegex = /airbnb\.\w+\.?\w+?\/rooms\/\w+/;
  if (!isURL(url) || !airBnbListingRegex.test(url)) {
    console.log(`${url} is not a URL for an AirBnB listing.`);
    return false;
  } else {
    return true;
  }
};

const checkForError = async (page, url) => {
  let pageHtml = "";
  try {
    pageHtml = await page.evaluate(() => document.body.innerHTML);
  } catch (e) {
    throw new Error("Something went wrong!");
  }
  const errorSelector = "_1uippt2";
  if (pageHtml.includes(errorSelector)) {
    console.log(`There is a problem with this listing: ${url}`);
    return true;
  } else return false;
};

const getPropertyName = async (page) => {
  const propertyNameSelector = "._fecoyn4";
  const propertyName = await getTextFromElement(page, propertyNameSelector);
  return propertyName;
};

const getPropertyType = async (page) => {
  const hostedBySelector = "._14i3z6h";
  const hostedByLabel = await getTextFromElement(page, hostedBySelector);
  const propertyType = hostedByLabel.substring(
    0,
    hostedByLabel.indexOf(" hosted by")
  );
  return propertyType;
};

const getDetailsList = async (page) => {
  const detailsListSelector = "._194e2vt2 li span";
  let detailsList = await getListOfElementsTextValues(
    page,
    detailsListSelector
  );
  detailsList = detailsList.filter((detail) => detail !== " · ");
  return detailsList;
};

const getAmenitiesModalLink = async (page) => {
  const amenitiesModalLinkSelector = ".b6xigss a";
  const amenitiesModalLink = await page.$eval(
    amenitiesModalLinkSelector,
    (el) => el.href
  );
  return amenitiesModalLink;
};

const getAmenities = async (page) => {
  const amenitiesLabelsSelector = "._gw4xx4";
  const amenitiesLabels = await getListOfElementsTextValues(
    page,
    amenitiesLabelsSelector
  );
  const amenities = amenitiesLabels.filter(
    (amenity) => !amenity.includes("Unavailable:")
  );
  return amenities;
};

const getTextFromElement = (page, selector) =>
  page.$eval(selector, (el) => el.textContent);

const getListOfElementsTextValues = (page, selector) =>
  page.$$eval(selector, (elements) => elements.map((el) => el.textContent));

module.exports = {
  isValidAirBnbListing,
  checkForError,
  getPropertyName,
  getPropertyType,
  getDetailsList,
  getAmenitiesModalLink,
  getAmenities,
  getTextFromElement,
  getListOfElementsTextValues,
};
