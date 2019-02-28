import csv from 'csvtojson'
import csvsync from 'csvjson'
import fs from 'fs'

export default class Importer {
  
  constructor(dirwatcher) {
    dirwatcher.on("change", csvFile => {
      this.import(csvFile)
        .then(jsonData => console.log(`Imported file ${csvFile}: ${JSON.stringify(jsonData)}`));
      // console.log(`Imported file ${csvFile}: ${JSON.stringify(this.importSync(csvFile))}`)
    });
  }

  import(path) {
    return csv().fromFile(path);
  }

  async importPseudoSync(path) {
    return await csv().fromFile(path);;
  }

  importSync(path) {
    const data = fs.readFileSync(path, { encoding : 'utf8'});
    return csvsync.toObject(data, {});
  }
} 