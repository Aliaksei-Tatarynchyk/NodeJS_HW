import express from "express"
import { products, reviews } from "./../models/storage"
import checkAuthToken from "./../middlewares/checkAuthToken"

const router = express.Router();

router.use(checkAuthToken);

router.route('/')
  .get((req, res) => {
    res.json(products);
  })
  .post((req, res) => {
    let product = req.body;
    products.push(product);
    res.json(product);
  });

router.get('/:productId', (req, res) => {
  // console.time('lodash');
  // _.find(products, {id: req.params.id});
  // console.timeEnd('lodash');

  // console.time('array'); // array approach is approximately 3 times faster than lodash (0.03ms vs 0.87ms for ~7k records)
  // products.find((item) => item.id === req.params.id);
  // console.timeEnd('array');

  res.json(products.find((product) => product.id === req.params.productId));
});

router.get('/:productId/reviews', (req, res) => {
  res.json(reviews.filter((review) => review.productId === req.params.productId));
});

export default router;