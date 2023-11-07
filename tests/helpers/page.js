const puppeteer = require('puppeteer');
const sessionFactory = require('../factories/sessionFactory');
const userFactory = require('../factories/userFactory');

class CustomPage {
  static async build() {
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox'],
    });

    const page = await browser.newPage();
    const customPage = new CustomPage(page);

    return new Proxy(customPage, {
      get: function (target, property) {
        return customPage[property] || browser[property] || page[property];
      },
    });
  }

  constructor(page) {
    this.page = page;
  }

  async login() {
    const user = await userFactory();

    const { session, sig } = sessionFactory(user);

    // set auth cookies
    await this.page.setCookie({ name: 'session', value: session });
    await this.page.setCookie({ name: 'session.sig', value: sig });

    // refresh the page after setting cookies -> redirect to blogs page
    await this.page.goto('http://localhost:3000/blogs');

    // wait till element become available, if not present then test will fail from this point
    await this.page.waitFor('a[href="/auth/logout"]');
  }

  async getContentsOf(selector) {
    return this.page.$eval(selector, el => el.innerHTML);
  }

  async get(url) {
    return await this.page.evaluate(async _url => {
      return fetch(_url, {
        method: 'GET',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(res => res.json());
    }, url);
  }

  async post(url, body) {
    return this.page.evaluate(
      async (_url, _body) => {
        return fetch(_url, {
          method: 'POST',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(_body),
        }).then(res => res.json());
      },
      url,
      body
    );
  }

  async execRequests(actions) {
    return Promise.all(
      actions.map(({ method, url, body }) => {
        return this[method](url, body);
      })
    );
  }
}

module.exports = CustomPage;
