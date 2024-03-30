import archivePage from "./archivePage.js";

export default class ArchiveQueue {
  /** @type {[toArchive: string, resolver: (result: boolean) => void][]} */
  queue = [];
  #isRunning = false;
  
  constructor() {
  }

  addItem(toArchive) {
    console.log(`Added "${toArchive}" to Queue!`);
    const item = [toArchive];
    /** @type {Promise<boolean>} */
    const promise = new Promise((res) => item.push(res));
    this.queue.push(item);
    this.#run();
    return promise;
  }

  async #run() {
    if (this.#isRunning) return;
    this.#isRunning = true;
    while (this.queue.length > 0) {
      const item = this.queue.shift();
      if (!item) return;
      const [toArchive, resolver] = item;

      console.log(`Archiving "${toArchive}"!`);
      const result = await archivePage(toArchive)
        .then(result => result)
        .catch(() => false);

      if (result) console.log(`Archived "${toArchive}"!`);
      else console.log(`Fail to archive "${toArchive}"!`);

      resolver(result);
    }
    this.#isRunning = false;
  }
}
