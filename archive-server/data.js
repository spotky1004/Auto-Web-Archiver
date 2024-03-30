import fs from "fs";
import path from "path";

/**
 * @typedef Config 
 * @prop {number} port 
 * @prop {string} archivePath 
 */

/** @type {Config} */
export const config = JSON.parse(fs.readFileSync(path.join("..", "config.json"), "utf8"));
export const port = config.port;
export const archivePath = path.join("..", config.archivePath);
export const archiveTmpPath = path.join(archivePath, "$meta", "tmp");
export const archiveStoragePath = path.join(archivePath, "$meta", "storage");
