import express from "express"
import _ from "lodash"
import { reviews } from "./../models/storage"

const router = express.Router();

router.get('/products/:productId/reviews', (req, res) => {
  let foundReviews = _.filter(reviews, {productId: req.params.productId});
  res.json(foundReviews);
});

export default router;