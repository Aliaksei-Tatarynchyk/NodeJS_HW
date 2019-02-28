import EventEmitter from 'events'
import fs from 'fs'
import {promisify} from 'util'
import difference from 'lodash/difference'

const readdir = promisify(fs.readdir);

export default class DirWatcher extends EventEmitter {

  constructor(path, delay) {
    super();
    this.processedCsvFiles = new Set();
    this.watch(path, delay);
  }
  
  watch(path, delay) {
    if (this.watchInterval) {
      clearInterval(this.watchInterval);
    }
    this.watchInterval = setInterval(() => {
      readdir(path)
        .then((filesFromFS) => {
          const newFiles = difference(filesFromFS, [...this.processedCsvFiles]);
          newFiles
            .filter(file => file.endsWith('.csv'))
            .forEach((newCsvFile) => {
              this.processedCsvFiles.add(newCsvFile);
              this.emit("change", `${path}/${newCsvFile}`);
            });
        })
        .catch((error) => {
          console.log(error);
          throw new Error(error);
        });
    }, delay);
  }
}