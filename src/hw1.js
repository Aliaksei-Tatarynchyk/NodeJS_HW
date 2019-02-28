import config from "./config/config.json" 
import { User, Product } from "./models/models"

console.log("---> HW1 - NodeJS modules. NPM");
console.log(`Logging the name of application (from JSON config file): ${config.name}`);
console.log("Creating instances of User and Product:")
new User();
new Product();