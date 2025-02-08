# TikTok Scraper | 2025 Activity

- A Nodejs script that scrapes data from TikTok profiles, to get TikTok user information from public webpages.

## Technology

- NodeJS
  - Node Version Manager [nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
  - Scraper running version: 18.1.0
- [Puppeteer](https://pptr.dev/)
  - Node library which provides a high-level API to control Chrome
- Typescript
  - TypeScript is JavaScript with syntax for types. [Doc](https://www.typescriptlang.org/)
  - [Node.Js With TypeScript](https://nodejs.dev/en/learn/nodejs-with-typescript/)

## Structure

```
➜  tiktok-scraper git:(main) tree -I 'node_modules|build'
.
├── README.md
├── config
│   └── config.json
├── nodemon.json
├── package-lock.json
├── package.json
├── src
│   ├── environment
│   │   └── config.ts
│   ├── index.ts
│   ├── pages
│   │   ├── identifiers.ts
│   │   ├── index.ts
│   │   └── userTemplate.ts
│   └── utils
│       └── index.ts
├── tsconfig.json
├── types
│   └── index.d.ts
└── yarn.lock

7 directories, 14 files
```

- `build`: The latest generated javascript code.
- `config`: Deployment and proxy configuration.
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

## Usage Examples without HEADLESS

```NodeJS
env IDS=google node build/index.js
```

## Response

```json
{
  "username": "google",
  "is_verified": true,
  "fullname": "Google",
  "avatar_url": "https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/73c90de9d342041ce02bf9c6fb886e82~c5_100x100.jpeg?x-expires=1664899200&x-signature=9gA7ipAuCtJ%2BJpkc30Jb5me397c%3D",
  "followings": 0,
  "followers": 412400,
  "likes": 719400,
  "bio": "Here to help 🔍\nDo more with the Google app ⬇️",
  "external_url": "goo.gle/3DneWRb",
  "videos": [
    {
      "link": "https://www.tiktok.com/@google/video/7447935899935018270",
      "pic_url": "https://p16-pu-sign-useast8.tiktokcdn-us.com/obj/tos-useast8-p-0068-tx2/oQiqvYm1xAAEBBAAidAAZGDllhZIZEBRcGi8s?lk3s=81f88b70&x-expires=1739192400&x-signature=%2BRUTftVU7dGYo0qsaaS93ZXlWPo%3D&shp=81f88b70&shcp=-",
      "short_description": "2024 was a year of unexpected moments, historic breakthroughs, and rising stars taking center stage. Grab your 🍿 and watch the Breakout Searches of 2024. yearinsearch.google #YearInSearch  created by Google with Google’s original sound",
      "views_count": "2.9M",
      "is_pinned": true
    },
    ...
  ]
}
```

## Usage Examples with HEADLESS

```NodeJS
env IDS=facebook HEADLESS=true node build/index.js
```

## Response

```json
{
  "username": "facebook",
  "is_verified": true,
  "fullname": "Facebook",
  "avatar_url": "https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/c611261958ffccafd6015dea5784255f~c5_100x100.jpeg?lk3s=a5d48078&nonce=9684&refresh_token=717bc9fd9374182c1e15b475c2fd4e50&x-expires=1716638400&x-signature=sDxqgevHiFytQbaq77TDMc69zFA%3D&shp=a5d48078&shcp=81f88b70",
  "followings": 0,
  "followers": 330900,
  "likes": 0,
  "bio": "We believe people can do more together, than alone.",
  "external_url": null
}
```

## Contributors

- [Encore Shao](https://github.com/encoreshao)
