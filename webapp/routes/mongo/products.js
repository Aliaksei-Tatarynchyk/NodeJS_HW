import express from "express"
import Product from "../../models/mongoose/product"

const router = express.Router();

router.route('/')
  .get((req, res) => {
    Product.find((err, products) => {
      res.json(products);
    });
  })
  .post((req, res) => {
    let product = new Product(req.body);
    product.save((err, product) => {
      res.json(product);
    });
  });

router.route('/:productId')
  .get((req, res) => {
    Product.findOne({'id': req.params.productId}, (err, product) => {
      res.json(product);
    })
  })
  .delete((req, res) => {
    Product.deleteOne({'id': req.params.productId}, (err, status) => {
      res.json(status);
    });
  });

export default router;