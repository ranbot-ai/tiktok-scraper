import { IQueueItem } from "../../types";
import { humanize } from "../utils";
import { config } from "./../environment/config";
import {
  usernameSelector,
  isVerifiedSelector,
  fullnameSelector,
  avatarUrlSelector,
  followingCountSelector,
  followersCountSelector,
  likesCountSelector,
  userBioSelector,
  externalUrlSelector,
} from "./userTemplate";

// scrape page details
async function scrapeTiktok(browser: any, queue: IQueueItem[]): Promise<void> {
  // Go through every item in the queue and open page in the browser
  while (queue.length > 0) {
    let queueItem: IQueueItem = queue.shift() as IQueueItem;
    console.log(queueItem);
    let identifier = queueItem.identifier;

    let page = await browser.newPage();

    // Configure the navigation timeout & Interception request
    await page.setDefaultNavigationTimeout(config.timeout);
    // await page.setRequestInterception(true);
    // page.on('request', async(request: any) => {
    //   if (config.ignore_resource_types.indexOf(request.resourceType()) !== -1 ) {
    //     return request.abort();
    //   }

    //   request.continue();
    // });

    let url = config.endpoint + "@" + identifier.identifier;
    console.log(`// Current Page URL: ${url}`);
    await page.goto(url, { waitUntil: "networkidle2" });

    // await page.waitForNavigation();

    let data: any = {};

    // username
    let username = await page.evaluate((selector: string) => {
      let text = document.querySelector(selector);
      if (text instanceof HTMLElement) {
        return text.innerText.trim();
      } else {
        return null;
      }
    }, usernameSelector);
    data.username = username;

    // Verified
    data.is_verified = await page.evaluate((selector: string) => {
      return document.querySelectorAll(selector).length > 0;
    }, isVerifiedSelector);

    // Fullname
    let fullname = await page.evaluate((selector: string) => {
      let text = document.querySelector(selector);
      if (text instanceof HTMLElement) {
        return text.innerText.trim();
      } else {
        return null;
      }
    }, fullnameSelector);
    data.fullname = fullname;

    // Avatar link
    let avatarUrl = await page.evaluate((selector: string) => {
      let img = document.querySelector(selector);
      if (img instanceof HTMLImageElement) {
        return img.src;
      } else {
        return null;
      }
    }, avatarUrlSelector);
    data.avatar_url = avatarUrl;

    // Following Count
    let followings = await page.evaluate((selector: string) => {
      let img = document.querySelector(selector);
      if (img instanceof HTMLElement) {
        return img.innerText.trim();
      } else {
        return null;
      }
    }, followingCountSelector);
    data.followings = humanize(followings);

    // followers Count
    let followers = await page.evaluate((selector: string) => {
      let text = document.querySelector(selector);
      if (text instanceof HTMLElement) {
        return text.innerText.trim();
      } else {
        return null;
      }
    }, followersCountSelector);
    data.followers = humanize(followers);

    // likes Count
    let likes = await page.evaluate((selector: string) => {
      let text = document.querySelector(selector);
      if (text instanceof HTMLElement) {
        return text.innerText.trim();
      } else {
        return null;
      }
    }, likesCountSelector);
    data.likes = humanize(likes);

    let bio = await page.evaluate((selector: string) => {
      let text = document.querySelector(selector);
      if (text instanceof HTMLElement) {
        return text.innerText.trim();
      } else {
        return null;
      }
    }, userBioSelector);
    data.bio = bio;

    let externalLink = await page.evaluate((selector: string) => {
      let text = document.querySelector(selector);
      if (text instanceof HTMLElement) {
        return text.innerText.trim();
      } else {
        return null;
      }
    }, externalUrlSelector);
    data.external_url = externalLink;

    console.log(`// Data: ${JSON.stringify(data, null, 2)}`);

    await page.close();
  }

  await browser.close();
}

export { scrapeTiktok };
