import DirWatcher from "./csv/dirwatcher"
import Importer from "./csv/importer"

console.log("---> HW2 - Async development");
console.log("Watching for changes in 'data' directory and import CSV files as json:");
const dirwatcher = new DirWatcher("./data", 5e+3);
const importer = new Importer(dirwatcher);
// console.log("importSync: ", importer.importSync("./data/entertainment.csv"));