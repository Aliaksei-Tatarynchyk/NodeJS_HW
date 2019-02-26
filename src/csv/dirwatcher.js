import EventEmitter from 'events'
import Set from 'collections/set'
import fs from 'fs'
import {promisify} from 'util'
const readdir = promisify(fs.readdir);

export default class DirWatcher extends EventEmitter {

  constructor(path, delay) {
    super();
    this.processedFiles = new Set();
    this.watch(path, delay);
  }
  
  watch(path, delay) {
    if (this.watchInterval) {
      clearInterval(this.watchInterval);
    }
    this.watchInterval = setInterval(() => {
      readdir(path)
        .then((filesFromFS) => {
          const newFiles = new Set(filesFromFS).difference(this.processedFiles);
          if (newFiles.any()) {
            this.processedFiles.addEach(newFiles);
            this.emit("change", newFiles.map(fileName => {return path + '/' + fileName;}));
          }
        })
        .catch((error) => {
          console.log(error);
          throw error;
        });

        /*
        fs.readdir(path, (error, filesFromFS) => {
          if (error) {
            console.log(error);
            throw error;
          }
          const newFiles = new Set(filesFromFS).difference(this.processedFiles);
          if (newFiles.any()) {
            this.processedFiles.addEach(newFiles);
            this.emit("change", newFiles.map(fileName => {return path + '/' + fileName;}));
          }
        });
        */
    }, delay);
  }
}