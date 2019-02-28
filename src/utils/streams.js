import program from "commander"
import { validate, postvalidate } from "./validator"
import Utils from "./utils"

program
  .version('0.1.0')
  .option('-a, --action <action>', 'function to run: <reverse|transform|outputFile|convertFromFile|convertToFile|cssBundler>',
    /^(reverse|transform|outputFile|convertFromFile|convertToFile|cssBundler)$/i)
  .option('-f, --file <filePath>', 'full file name to pass to the functions outputFile|convertFromFile|convertToFile')
  .option('-p, --path <dirPath>', 'full dir name to pass to the function cssBundler');

validate(process.argv);

program.parse(process.argv);

postvalidate(program);

Utils[program.action](program.file || program.path);
