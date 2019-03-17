import secretStorage from "./../models/secretStorage"
import jwt from "jsonwebtoken"

export default function(req, res, next) {
  let authToken = req.headers['x-acess-token'];

  if (!authToken) {
    res.status(401).json({
      code: 2001,
      message: 'No authentication token is provided. Call \'/api/auth\' to generate an authentication token.'
    });
    return;
  }

  jwt.verify(authToken, secretStorage.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      res.status(401).json({
        code: 2002,
        message: 'Failed to authenticate token. Call \'/api/auth\' to generate a new authentication token.'
      });
      return;
    } 

    next();
  });
}