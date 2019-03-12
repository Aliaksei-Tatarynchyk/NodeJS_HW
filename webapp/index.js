import app from "./app.js"
import products from "./routes/products"
import reviews from "./routes/reviews"
import users from "./routes/users"

app.use('/api', products); // GET and POST
app.use('/api', reviews); // GET
app.use('/api', users); // GET
app.get('/', (req, res) => {
  console.log("Cookies: ", req.parsedCookies);
  console.log("Query: ", req.parsedQuery);
  res.status(200).send("Hello");
});