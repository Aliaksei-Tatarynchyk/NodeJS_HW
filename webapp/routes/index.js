import products from "./products"
import users from "./users"

export default function(app) {
  app.use('/api/products', products); // GET and POST
  app.use('/api/users', users); // GET
  app.get('/', (req, res) => {
    console.log("Cookies: ", req.parsedCookies);
    console.log("Query: ", req.parsedQuery);
    res.status(200).send("Hello");
  });
}