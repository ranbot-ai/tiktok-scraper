import { scrapeTiktok } from "./pages";
const fs = require("fs-extra");

// import puppeteer library
const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");

puppeteer.use(StealthPlugin());

import { config } from "./environment/config";
import { IQueueItem } from "../types";
import { scrapeIdentifier } from "./pages/identifiers";

const startScrapeTiktok = async () => {
  console.log(`>> Starting ${config.name}......`);

  const userDataDir = `/tmp/chrome-user-data-${Math.floor(
    Math.random() * 100000
  )}`;
  const args = [
    " --user-agent=" + config.user_agent,
    " --disable-background-timer-throttling",
    " --disable-backgrounding-occluded-windows",
    " --disable-renderer-backgrounding",
    " --user-data-dir=" + userDataDir,
    " --no-sandbox",
  ];

  // Start browser
  const browser = await puppeteer.launch({
    headless: config.headless,
    devtools: config.devtools,
    args: args,
  });

  // Fill up queue
  let queue: IQueueItem[] = await scrapeIdentifier();
  console.log(`>> Queue Size: ${queue.length}`);

  // Start to scrape instagram identifiers queues
  if (queue.length === 0) {
    console.log(">> Scraper exiting...");
  } else {
    await scrapeTiktok(browser, queue);
  }

  // Delete user data dir
  try {
    await fs.rmSync(userDataDir, { recursive: true, force: true });
  } catch (error) {
    if (error instanceof Error) {
      console.error(
        " > Error clearing user data dir ",
        (error as Error).message
      );
    }
  }
};

startScrapeTiktok();
