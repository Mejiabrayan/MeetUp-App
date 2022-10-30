import puppeteer from 'puppeteer';

const SECONDS = 1000;
jest.setTimeout(70 * SECONDS)

describe('show/hide an events details', () => {
  let browser;
  let page;

  beforeAll(async () => {
    jest.setTimeout(30000)
    // browser = await puppeteer.launch({
    //     headless: false,
    //     slowMo: 250,
    //     ignoreDefaultArgs: ['--disable-extensions']
    // });
    browser = await puppeteer.launch()
    page = await browser.newPage();
    await page.goto('http://localhost:3000/');
    await page.waitForSelector('.event');
  });

  afterAll( async () => {
    browser.close();
  })

  test('An event element is collapsed by default', async () => {
    const eventDetails = await page.$('.event .event-details-inner-container');
    let eventDetailsClasses = await (await eventDetails.getProperty('classList')).jsonValue();
    expect(Object.values(eventDetailsClasses)).not.toEqual(expect.objectContaining({"1": "visible"}));
  });

  test('User can expand an event to see its details', async () => {
    await page.click('.event .details-toggle');
    await page.waitForSelector('.event .visible')
    const eventDetails = await page.$('.event .event-details-inner-container');
    let eventDetailsClasses = await (await eventDetails.getProperty('classList')).jsonValue();
    expect(Object.values(eventDetailsClasses)).toEqual(expect.objectContaining({"1": "visible"}));
  });

  test('User can collapse an event to hide its details', async () => {
    await page.click('.event .details-toggle');
    const eventDetails = await page.$('.event .event-details-inner-container');
    let eventDetailsClasses = await (await eventDetails.getProperty('classList')).jsonValue();
    expect(Object.values(eventDetailsClasses)).not.toEqual(expect.objectContaining({"1": "visible"}));
  })

});

describe('filter events by city', () => {
  let browser;
  let page;

  beforeAll(async () => {
    jest.setTimeout(30000)
    browser = await puppeteer.launch();
    page = await browser.newPage();
    await page.goto('http://localhost:3000/');
    await page.waitForSelector('.event');
  });

  afterAll(async () => {
    browser.close();
  });

  test('when user has not searched for a city show upcoming events from all cities', async () => {
    const locationsList = await page.$$('.event-location');
    expect(locationsList.length).toBeGreaterThan(1);
  });
  
  test('user should see a list of suggestions when they search for a city', async () => {
    const citySearch = await page.$('.city');
    await citySearch.type('Berlin');
    const suggestions = await page.$$('.suggestions li');
    expect(suggestions.length).toBe(2);
  });
  
  test('user can select a city from the suggested list', async () => {
    const suggestions = await page.$$('.suggestions li');
    await page.click('.suggestions li');
    const locationsList = await page.$$('.event-location');
    expect(locationsList.length).toEqual(1);;
  });

})