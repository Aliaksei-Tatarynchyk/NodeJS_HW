console.info("I'm running...")


console.log("---> HW1 - NodeJS modules. NPM");
import config from "./config/config.json" 
console.log(`Logging the name of application (from JSON config file): ${config.name}`);

import { User, Product } from "./models/models"
console.log("Creating instances of User and Product:")
new User();
new Product();


console.log("---> HW2 - Async development");
console.log("Watching for changes in 'data' directory and import CSV files as json:");
import DirWatcher from "./csv/dirwatcher"
import Importer from "./csv/importer"

const dirwatcher = new DirWatcher("./data", 1e+3);
const importer = new Importer(dirwatcher);
// console.log("importSync: ", importer.importSync("./data/entertainment.csv"));


// console.log("---> HW3 - Command line. Debugging. Error handling. File system and streams");
