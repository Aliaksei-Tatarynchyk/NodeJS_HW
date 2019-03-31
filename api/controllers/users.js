import User from "../../webapp/models/mongoose/user"

// names of exported functions are either method names (get|post|put|delete) or operationId
module.exports = {
  get: (req, res) => {
    User.find((err, users) => {
      res.json(users);
    });
  },
  deleteUserByLogin: (req, res) => {
    User.deleteOne({'login': req.swagger.params.login.value}, (err, status) => {
      res.json(status);
    });
  }
};