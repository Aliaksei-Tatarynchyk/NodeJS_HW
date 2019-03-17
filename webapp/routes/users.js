import express from "express"
import { users } from "./../models/storage"
import checkAuthToken from "./../middlewares/checkAuthToken"

const router = express.Router();

router.use(checkAuthToken);

router.get('/', (req, res) => {
  res.json(users);
});

export default router;