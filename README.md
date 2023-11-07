# AdvancedNodeStarter

Starting project for a course on Advanced Node @ Udemy

### Setup

- Run `npm install` in the root of the project to install server dependencies
- Change into the client directory and run `npm install --legacy-peer-deps`
- Change back into the root of the project and run `npm run dev` to start the server
- Access the application at `localhost:3000` in your browser

## Automated Headless Browser Testing

Testing blogs-app

### Type of Testing

- Unit Testing: Assert that one piece of your app is working as per expections
- Integration Testing: Testing multiple 'units' together

### About packages for testung from dependency list

- jest: for running tests
- puppeteer: for lauching instance of chromium headless browser (browser without UI)


### Chromium Instance using Puppeteer

- Puppeteer -> Browser -> Page
- Puppeteer: Starts up Chrominum
- Browser: Represents an open browser window
- Page: Represents one individual tab

### Chromium Navigation Steps
- Launch Chromium
- Navigate to app
- Click on stuff on screen
- Use a DOM selecter to retrieve the content of an element
- Write assertion to make sure content is correct


### Session Cookie - Google OAuth - Response Header
Set-Cookie:
session.sig=04yFb7l6_Da8IHHAmtFnssguKyM; path=/; expires=Mon, 04 Dec 2023 06:33:53 GMT; httponly
Set-Cookie:
session=eyJwYXNzcG9ydCI6eyJ1c2VyIjoiNjUxZjBmMDhlMmZiOTA4MzQwZDRlMTAyIn19; path=/; expires=Mon, 04 Dec 2023 06:33:53 GMT; httponly

### Factory functions
- Helper functions to generate a resource solely for use in testing


### making post request using fetch API
```js
fetch('/api/blogs', {
  method: 'POST',
  credentials: 'same-origin',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ title: 'My Title', content: 'My Content' }),
});
```

### Continuous Integration (CI)
Process to merge all code changes into a single branch

### CI Server
Server that runs automatic checks (tests) on the codebase to ensure the changes haven't broken anything

### CI Providers
Travis, Circle, Codeship, AWS Codebuild