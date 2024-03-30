import fs from "fs";
import path from "path";
import sha256File from "sha256-file";

import getStorageItemPath from "./getStorageItemPath.js";
import createStorageItem from "./createStorageItem.js";

export default function getStorageItem(filePath) {
  const storagePath = getStorageItemPath(filePath);
  const fileName = sha256File(filePath);

  const storageItem = path.join(storagePath, fileName);
  if (!fs.existsSync(storageItem)) createStorageItem(filePath);

  return storageItem;
}
