import City from "../../webapp/models/mongoose/city"

// names of exported functions are either method names (get|post|put|delete) or operationId
module.exports = {
  get: (req, res) => {
    City.find((err, products) => {
      res.json(products);
    });
  },
  post: (req, res) => {
    let city = new City(req.body);
    city.save((err, city) => {
      res.json(city);
    });
  },
  getRandomCity: (req, res) => {
    City.count().exec(function (err, count) {
      let random = Math.floor(Math.random() * count);
      City.findOne().skip(random).exec((err, result) => {
        res.json(result);
      });
    });
  },
  updateCityByName: (req, res) => {
    City.findOneAndUpdate(
      {'name': req.swagger.params.cityName.value}, // find a document with that filter
      req.body, // document to insert when nothing was found
      {upsert: true, new: true, runValidators: true}, // options
      function (err, doc) { // callback
        res.json(doc);
      });
  },
  deleteCityByName: (req, res) => {
    City.deleteOne({'name': req.swagger.params.cityName.value}, (err, status) => {
      res.json(status);
    });
  }
};