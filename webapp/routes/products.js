import express from "express"
import _ from "lodash"
import { products } from "./../models/storage"

const router = express.Router();
router.use(express.json());

router.get('/products', (req, res) => {
  res.json(products);
});

router.post('/products', (req, res) => {
  let product = req.body;
  products.push(product);
  res.json(product);
});

router.get('/products/:id', (req, res) => {
  let foundProduct = _.find(products, {id: req.params.id});
  res.json(foundProduct);
});

export default router;