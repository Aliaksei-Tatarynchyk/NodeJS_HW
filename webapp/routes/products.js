import express from "express"
import db from "./../models/storage"
import checkAuthToken from "./../middlewares/checkAuthToken"

const Product = db.import("./../models/product");
const Review = db.import("./../models/review");

const router = express.Router();

router.use(checkAuthToken);

router.route('/')
  .get((req, res) => {
    Product.findAll().then(products => {
      res.json(products);
    });
  })
  .post((req, res) => {
    let product = req.body;
    Product.create(product).then(() => {
      res.json(product);
    });
  });

router.get('/:productId', (req, res) => {
  // console.time('lodash');
  // _.find(products, {id: req.params.id});
  // console.timeEnd('lodash');

  // console.time('array'); // array approach is approximately 3 times faster than lodash (0.03ms vs 0.87ms for ~7k records)
  // products.find((item) => item.id === req.params.id);
  // console.timeEnd('array');
  Product.findByPk(req.params.productId).then(product => {
    res.json(product.get());
  })
});

router.get('/:productId/reviews', (req, res) => {
  Review.findAll({where: {productId: req.params.productId}}).then(reviews => {
    res.json(reviews);
  });
});

export default router;