import url from "url"
import querystring from "querystring"

export default function(req, res, next) {
  const query = url.parse(req.url).query;
  req.parsedQuery = querystring.parse(query);
  next();
}