const unableChars = ["\\", "/", ":", "*", "?", "<", ">", "|"];

/**
 * @param {string} name 
 */
export default function fixDirName(name) {
  for (const c of unableChars) {
    name = name.replace(new RegExp("\\" + c, "g"), "_");
  }

  return name;
}
