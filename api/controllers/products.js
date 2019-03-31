import Product from "../../webapp/models/mongoose/product"

// names of exported functions are either method names (get|post|put|delete) or operationId
module.exports = {
  get: (req, res) => {
    Product.find((err, products) => {
      res.json(products);
    });
  },
  post: (req, res) => {
    let product = new Product(req.body);
    product.save((err, product) => {
      res.json(product);
    });
  },
  getProductById: (req, res) => {
    Product.findOne({'id': req.swagger.params.productId.value}, (err, product) => {
      res.json(product);
    })
  },
  deleteProductById: (req, res) => {
    Product.deleteOne({'id': req.swagger.params.productId.value}, (err, status) => {
      res.json(status);
    });
  }
};
