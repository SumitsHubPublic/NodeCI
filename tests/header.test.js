const Page = require('./helpers/page');

let page;

// execute before each test
beforeEach(async () => {
  // browser = await puppeteer.launch({
  //   headless: false,
  // });

  // page = await browser.newPage();

  page = await Page.build();

  await page.goto('http://localhost:3000');
});

afterEach(async () => {
  // await browser.close();
  await page.close();
});

test('The header has the correct text', async () => {
  const headerText = await page.getContentsOf('a.brand-logo');
  expect(headerText).toEqual('Blogster');
});

test('Clicking login starts oauth flow', async () => {
  // clicking login link
  await page.click('.right a');

  // getting opened url after click
  const url = await page.url();
  // console.log(url);

  // using regex to match "accounts.google.com"
  expect(url).toMatch(/accounts\.google\.com/);
});

test('When signed in, shows logout button', async () => {
  //   const uid = '651f0f08e2fb908340d4e102';
  await page.login();

  const logoutBtnText = await page.$eval(
    'a[href="/auth/logout"]',
    el => el.innerHTML
  );
  // check if logout button is present after login
  expect(logoutBtnText).toEqual('Logout');
});
