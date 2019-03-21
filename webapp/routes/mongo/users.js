import express from "express"
import User from "../../models/mongoose/user"

const router = express.Router();

router.get('/', (req, res) => {
  User.find((err, users) => {
    res.json(users);
  });
});

router.delete('/:login', (req, res) => {
  User.deleteOne({'login': req.params.login}, (err, status) => {
    res.json(status);
  });
});

export default router;