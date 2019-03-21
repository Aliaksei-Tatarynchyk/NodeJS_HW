import home from "./home"
import products from "./products"
import users from "./users"
import auth from "./auth"
import mongoCities from "./mongo/cities"
import mongoProducts from "./mongo/products"
import mongoUsers from "./mongo/users"

export default function(app) {
  app.use('/', home);
  app.use('/api/products', products);
  app.use('/api/users', users);
  app.use('/api/auth', auth);
  app.use('/mongo/cities', mongoCities);
  app.use('/mongo/products', mongoProducts);
  app.use('/mongo/users', mongoUsers);
}