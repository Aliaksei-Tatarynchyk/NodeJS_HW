import cookieParser from "cookie-parser"

export default function(req, res, next) {
  cookieParser()(req, res, () => {});
  req.parsedCookies = req.cookies;
  next();
}