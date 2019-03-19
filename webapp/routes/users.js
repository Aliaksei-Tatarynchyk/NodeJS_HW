import express from "express"
import db from "./../models"
import checkAuthToken from "./../middlewares/checkAuthToken"

const User = db.import("./../models/user");

const router = express.Router();

router.use(checkAuthToken);

router.get('/', (req, res) => {
  User.findAll().then(users => {
    res.json(users);
  });
});

export default router;