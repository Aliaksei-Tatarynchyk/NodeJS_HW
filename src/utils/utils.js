import readline from "readline"
import fs from "fs"
import csv from "csvtojson"
import {validateFilePath, validateDirPath, handleFileReadError} from "./validator"

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const Utils = {
  reverse: function() {
    rl.question("Please provide a string for reversing: ", (answer) => {
      console.log(`Reversed: ${answer.split('').reverse().join('')}`);
      rl.close();
    });
  },

  transform: function() {
    rl.question("Please provide a string for transforming to UPPER case: ", (answer) => {
      console.log(`Transformed to upper case: ${answer.toUpperCase()}`);
      rl.close();
    });
  },

  outputFile: function(filePath) {
    validateFilePath(filePath, 'outputFile');
    fs.createReadStream(filePath)
      .on('error', handleFileReadError)
      .pipe(process.stdout);
  },

  convertFromFile: function(filePath) {
    validateFilePath(filePath, 'convertFromFile');
    fs.createReadStream(filePath)
      .on('error', handleFileReadError)
      .pipe(csv())
      .pipe(process.stdout);
  },

  convertToFile: function(filePath) {
    validateFilePath(filePath, 'convertToFile');
    fs.createReadStream(filePath)
      .on('error', handleFileReadError)
      .pipe(csv())
      .pipe(fs.createWriteStream(filePath.replace(/(.*)\.csv$/, '$1.json')))
  },

  cssBundler: function(dirPath) {
    validateDirPath(dirPath);
    if (!dirPath.endsWith('/')) {
      dirPath += '/';
    }
    fs.readdir(dirPath, (error, filesFromFS) => {
      if (error) {
        console.log(error);
        throw new Error(error);
      }
      const cssBundleWriterStream = fs.createWriteStream(dirPath + 'bundle.css');
      const cssFiles = filesFromFS
        .filter(file => file.endsWith('.css') && file !== 'bundle.css')
        .map(fileName => dirPath + fileName);
      
      function startWritingNextStream() {
        let currentCss = cssFiles.shift();
        if (currentCss) {
          console.log('Start writing next CSS into bundle: ', currentCss);
          fs.createReadStream(currentCss)
          .on('end', startWritingNextStream)
          .pipe(cssBundleWriterStream, {end: false});
        } else {
          console.log('Finish bundle with predefined chunk of data');
          cssBundleWriterStream.write(`
            .ngmp18 {
              background-color: #fff;
              overflow: hidden;
              width: 100%;
              height: 100%;
              position: relative;
            }
      
            .ngmp18__hw3 {
              color: #333;
            }
      
            .ngmp18__hw3--t7 {
              font-weight: bold;
            }
          `);
          cssBundleWriterStream.end();
        }
      }

      startWritingNextStream();
    });
  }
}

export default Utils;