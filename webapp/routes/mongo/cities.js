import express from "express"
import City from "../../models/mongoose/city"

const router = express.Router();

router.get('/random', (req, res) => {
  City.count().exec(function (err, count) {
    let random = Math.floor(Math.random() * count);
    City.findOne().skip(random).exec((err, result) => {
      res.json(result);
    });
  });
});

router.route('/')
  .get((req, res) => {
    City.find((err, products) => {
      res.json(products);
    });
  })
  .post((req, res) => {
    let city = new City(req.body);
    city.save((err, city) => {
      res.json(city);
    });
  });

router.route('/:name')
  .put((req, res) => {
    City.findOneAndUpdate(
      {'name': req.params.id}, // find a document with that filter
      req.body, // document to insert when nothing was found
      {upsert: true, new: true, runValidators: true}, // options
      function (err, doc) { // callback
        res.json(doc);
      });
  })
  .delete((req, res) => {
    City.deleteOne({'name': req.params.name}, (err, status) => {
      res.json(status);
    });
  });

export default router;