import http from "http"
import fs from "fs"
import {Transform} from "stream"

class MessageReplacer extends Transform {
  _transform(chunk, encoding, done) {
    done(null, chunk.toString().replace(/{message}/,'HTML server is up and running'));
    // It's analogue of:
    // this.push(chunk.toString().replace(/{message}/,'HTML server is up and running'));
    // done();
    // or in case of error:
    // done(err, chunk); - в этом случае будет вызвано событие error
    // or
    // this.push(chunk);
    // done(err);
  }
}

http.createServer()
  .on('request', (req, res) => {
    res.writeHead(200, {
      'Content-Type': 'html'
    });
    fs.createReadStream('./data/index.html')
      .pipe(new MessageReplacer())
      .pipe(res)
      .on("error", (err) => {
        console.log("HTML server error: ", err);
      });
  })
  .listen(3001);