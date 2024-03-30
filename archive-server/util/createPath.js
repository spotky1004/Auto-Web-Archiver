import fs from "fs";

/**
 * @param {string} path 
 */
export default function createPath(path) {
  if (fs.existsSync(path)) return false;

  fs.mkdirSync(path, { recursive: true });
  return true;
}
