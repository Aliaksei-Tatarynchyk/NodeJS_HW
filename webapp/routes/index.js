import home from "./home"
import products from "./products"
import users from "./users"
import auth from "./auth"

export default function(app) {
  app.use('/', home);
  app.use('/api/products', products);
  app.use('/api/users', users);
  app.use('/api/auth', auth);
}