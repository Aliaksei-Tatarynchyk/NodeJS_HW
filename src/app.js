console.info("I'm running...")

import config from "./config/config.json" 
console.log(config.name);

import { User, Product } from "./models/models"
const user = new User();
const product = new Product();
