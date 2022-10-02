# Instagram scraper

- Get TikTok information from public webpages <Data Scraping>

## Technology stack

- Node
  - Scraper running node version: 18.1.0
  - Node Version Manager [nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
- [Puppeteer](https://pptr.dev/)
  - Node library which provides a high-level API to control Chrome
- Typescript
  - TypeScript is JavaScript with syntax for types. [Doc](https://www.typescriptlang.org/)
  - [Node.Js With TypeScript](https://nodejs.dev/en/learn/nodejs-with-typescript/)

## Structure

```
  build
    └── index.js
    └── ...
  config
    └── config.json
  src
    └── pages
        ├── index.ts
        ├── identifiers.ts
        ├── userTemplate.ts
    └── environment
        ├── config.ts
    └── utils
        ├── index.ts
    └── index.ts
  types
    └── index.d.ts
```

- `build`: The latest generated javascript code.
- `config`: Deployment and proxy configuration.
- `public`: Public resource files, no need to compile.
- `src`: The main coding part of the scraper, written by typescript.
- `types`: Type or Interface definition.

## Scripts Overview

```NodeJS
npm run start:dev
```

Starts the application in development using nodemon and ts-node to do cold reloading.

```NodeJS
npm run build
```

Builds the app at build, cleaning the folder first.

```NodeJS
npm run start
```

Starts the app in production by first building the project with `npm run build`, and then executing the compiled JavaScript at `build/index.js`.

## Usage Examples

```NodeJS
env TEST_IDS=instagram,google node build/index.js
```

## Data Response

```NodeJS
// Current Page URL: https://www.tiktok.com/@google
// Data: {
  "username": "google",
  "is_verified": true,
  "fullname": "Google",
  "avatar_url": "https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/73c90de9d342041ce02bf9c6fb886e82~c5_100x100.jpeg?x-expires=1664899200&x-signature=9gA7ipAuCtJ%2BJpkc30Jb5me397c%3D",
  "followings": 0,
  "followers": 412400,
  "likes": 719400,
  "bio": "Here to help 🔍\nDo more with the Google app ⬇️",
  "external_url": "goo.gle/3DneWRb"
}
```

## Contributors

- Encore