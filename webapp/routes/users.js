import express from "express"
import { users } from "./../models/storage"

const router = express.Router();

router.get('/', (req, res) => {
  res.json(users);
});

export default router;