import program from "commander"
import readline from "readline"
import reverseString from "reverse-string"
import fs from "fs"
import csv from "csvtojson"
import Deque from "collections/deque";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function reverse() {
  rl.question("Please provide a string for reversing: ", (answer) => {
    console.log(`Reversed: ${reverseString(answer)}`);
    rl.close();
  });
}

function transform() {
  rl.question("Please provide a string for transforming to UPPER case: ", (answer) => {
    console.log(`Transformed to upper case: ${answer.toUpperCase()}`);
    rl.close();
  });
}

function outputFile(filePath) {
  validateFilePath(filePath, 'outputFile');
  fs.createReadStream(filePath)
    .on('error', handleFileReadError)
    .pipe(process.stdout);
}

function convertFromFile(filePath) {
  validateFilePath(filePath, 'convertFromFile');
  fs.createReadStream(filePath)
  .on('error', handleFileReadError)
  .pipe(csv())
  .pipe(process.stdout);
}

function convertToFile(filePath) {
  validateFilePath(filePath, 'convertToFile');
  fs.createReadStream(filePath)
    .on('error', handleFileReadError)
    .pipe(csv())
    .pipe(fs.createWriteStream(filePath.replace(/(.*)\.csv$/, '$1.json')))
}

function cssBundler(dirPath) {
  validateDirPath(dirPath);
  if (!dirPath.endsWith('/')) {
    dirPath += '/';
  }
  fs.readdir(dirPath, (error, filesFromFS) => {
    if (error) {
      console.log(error);
      throw error;
    }
    var cssBundleWriterStream = fs.createWriteStream(dirPath + 'bundle.css');
    var cssFiles = new Deque(filesFromFS)
      .filter(file => file.endsWith('.css'))
      .filter(file => file !== 'bundle.css')
      .map(fileName => {return dirPath + fileName;});
    
    function startWritingNextStream() {
      let currentCss = cssFiles.pop();
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

function validateFilePath(filePath, actionName) {
  if (!filePath) {
    console.log(`Please specify --file option. It's required for ${actionName} action.`);
    process.exit(1);
  }
}

function validateDirPath(dirPath, actionName) {
  if (!dirPath) {
    console.log(`Please specify --path option. It's required for ${actionName} action.`);
    process.exit(1);
  }
}

function handleFileReadError(err) {
  console.log("Error happened during reading a file: ", err.message);
  process.exit(1);
}

/* Should receive an action name as a first argument by ​--action​​ option
   Should process ​--help​​ key. If this option is passed as a first argument, 
   print usage message and ignore other options. 
   Ignore this option if other options were passed before */
const firstArgument = process.argv[2];
if (['-a', '--action'].includes(firstArgument)) {
  process.argv.forEach( (element, index, array) => {
    if (['-h', '--help'].includes(element)) {
      // if first argument is action - remove help argument from array so it won't print help instead of processing action
      array[index] = ''; 
    }
  });
} else if (!['-h', '--help'].includes(firstArgument)) { // if first argument is help - do nothing and continue. it will print a help
  // If module is called without arguments, notify user about wrong input and print a usage message (equal to calling with ​--help​​ option)
  console.error(`\nERROR: >> You haven't specified --action option.\n`);
  process.argv[2] = '--help'
}

program
  .version('0.1.0')
  .option('-a, --action <action>', 'function to run: <reverse|transform|outputFile|convertFromFile|convertToFile|cssBundler>',
    /^(reverse|transform|outputFile|convertFromFile|convertToFile|cssBundler)$/i)
  .option('-f, --file <filePath>', 'full file name to pass to the functions outputFile|convertFromFile|convertToFile')
  .option('-p, --path <dirPath>', 'full dir name to pass to the function cssBundler')
  .parse(process.argv);

// if option doesn't match the regex commander won't reinitialize it in program object and it will remain a function
if (typeof program.action === 'function') {
  console.error(`You've specified wrong --action option. It should be one of the following: 
  - reverse
  - transform
  - outputFile
  - convertFromFile
  - convertToFile
  - cssBundler.
Please fix --action option and retry.`);
  process.exit(1);
}

eval(program.action)(program.file || program.path);
