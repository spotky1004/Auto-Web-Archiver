import http from "http";
import url from "url";

import { port } from "./data.js";
import ArchiveQueue from "./src/ArchiveQueue.js";

const archiveQueue = new ArchiveQueue();

http.createServer(async (req, res) => {
  try {
    const toArchive = url.parse(req.url, true).query?.url;
    if (!toArchive || toArchive.startsWith("chrome") || toArchive.startsWith("file")) {
      res.writeHead(503, { "Content-Type": "text/plain" });
      res.end("Nothing to archive.");
      return;
    }
    
    const result = await archiveQueue.addItem(toArchive).catch(() => false);
    if (!result) throw new Error("Error occured while archiving.");
  
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end(`Arcive ${toArchive}!`);
  } catch(err) {
    res.writeHead(503, { "Content-Type": "text/plain" });
    res.end(`Error: ${err}.`);
    console.error(err);
  }
})
  .listen(port, () => {
    console.log(`Running archive server on port ${port}!`);
  });

process.addListener("uncaughtException", (e) => console.error(e));
