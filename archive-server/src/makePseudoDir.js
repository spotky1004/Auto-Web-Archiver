import fs from "fs";
import path from "path";

import createPath from "../util/createPath.js";
import getStorageItem from "./stroage/getStorageItem.js";

/**
 * @param {string} from 
 * @param {string} to 
 */
export default function makePseudoDir(from, to) {
  createPath(to);
  
  const fileNames = fs.readdirSync(from);
  for (const fileName of fileNames) {
    const fromFilePath = path.join(from, fileName);
    const toFilePath = path.join(to, fileName);
    const isDir = fs.statSync(fromFilePath).isDirectory();
    if (!isDir) {
      const storageItem = getStorageItem(fromFilePath);
      fs.linkSync(storageItem, toFilePath, "file");
    } else {
      makePseudoDir(fromFilePath, toFilePath);
    }
  }
  return true;
}
