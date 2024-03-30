import fs from "fs";

/**
 * @param {string} path 
 */
export default function isDirEmpty(path) {
  return fs.readdirSync(path).length === 0;
}
