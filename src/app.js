console.info("I'm running...")

import config from "./config/config.json" 
console.log(config.name);

import { User, Product } from "./models/models"
new User();
new Product();
