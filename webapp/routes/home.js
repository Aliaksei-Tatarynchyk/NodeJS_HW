import express from "express"
import fs from "fs"

const router = express.Router();

router.get('/', (req, res) => {
  console.log("Parsed Cookies: ", req.parsedCookies);
  console.log("Parsed Query: ", req.parsedQuery);
  res.writeHead(200, {
    'Content-Type': 'html'
  });
  fs.createReadStream('./webapp/pages/home.html')
    .pipe(res)
    .on("error", (err) => {
      console.log("HTML server error: ", err);
    });
});

export default router;