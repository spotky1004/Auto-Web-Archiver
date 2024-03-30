import fs from "fs";
import path from "path";
import sha256File from "sha256-file";

import getStorageItemPath from "./getStorageItemPath.js";
import createPath from "../../util/createPath.js";

/**
 * @param {string} filePath 
 */
export default function createStorageItem(filePath) {
  const storagePath = getStorageItemPath(filePath);
  createPath(storagePath);

  const fileName = sha256File(filePath);
  const storageFilePath = path.join(storagePath, fileName);
  fs.copyFileSync(filePath, storageFilePath);
}
