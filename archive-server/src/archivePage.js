import fs from "fs";
import path from "path";
import url from "url";
import scrape from 'website-scraper';
import PuppeteerPlugin from 'website-scraper-puppeteer';

import { archivePath, archiveTmpPath } from "../data.js";
import dirSize from "../util/dirSize.js";
import fixDirName from "../util/fixDirName.js";
import makePseudoDir from "./makePseudoDir.js";
import isDirEmpty from "../util/isDirEmpty.js"

/**
 * @typedef ArchiveData 
 * @prop {string} url 
 * @prop {number} archiveAt 
 * @prop {number} timeTaken 
 * @prop {number} size 
 */

export default async function archivePage(archiveUrl) {
  const urlData = url.parse(archiveUrl, true);
  const archiveAt = new Date().getTime();
  const tmpDir = path.join(archiveTmpPath, urlData.host, `${archiveAt}_${fixDirName(archiveUrl).slice(0, 80)}`);
  const archiveDir = path.join(archivePath, urlData.host, `${archiveAt}_${fixDirName(archiveUrl).slice(0, 80)}`);

  const result = await scrape({
    urls: [archiveUrl],
    directory: tmpDir,
    request: {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36'
      }
    },
    ignoreErrors: true,
    plugins: [ 
      new PuppeteerPlugin({
        launchOptions: {
          headless: "new",
          args: ["--no-sandbox"]
        },
        gotoOptions: { waitUntil: "networkidle2" },
        scrollToBottom: { timeout: 3000, viewportN: 10 },
        blockNavigation: true,
      })
    ]
  })
    .then(() => true)
    .catch(e => {
      console.error(e);
      return false;
    });
  if (!result) return false;

  const curTime = new Date().getTime();
  /** @type {ArchiveData} */
  const archiveData = {
    url: archiveUrl,
    archiveAt: curTime,
    timeTaken: curTime - archiveAt,
    size: await dirSize(tmpDir)
  };
  fs.writeFileSync(
    path.join(tmpDir, "$ARCHIVE_DATA.txt"),
    JSON.stringify(archiveData, "\t", 2) + "\n"
  );

  makePseudoDir(tmpDir, archiveDir);

  fs.rmSync(tmpDir, { recursive: true, force: true });
  const tmpHostDir = path.join(tmpDir, "..");
  if (isDirEmpty(tmpHostDir)) fs.rmSync(tmpHostDir, { recursive: true, force: true });

  return true;
}
