import path from "path";
import sha256File from "sha256-file";

import { archiveStoragePath } from "../../data.js";

export default function getStorageItemPath(filePath) {
  const hash = sha256File(filePath);

  const dir1 = hash.slice(0, 3);
  const dir2 = hash.slice(3, 6);

  return path.join(
    archiveStoragePath,
    dir1,
    dir2
  );
}
