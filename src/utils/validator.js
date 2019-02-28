export function validate(args) {
  /* Should receive an action name as a first argument by ​--action​​ option
  Should process ​--help​​ key. If this option is passed as a first argument, 
  print usage message and ignore other options. 
  Ignore this option if other options were passed before */
  const firstArgument = args[2];
  if (['-a', '--action'].includes(firstArgument)) {
    args.forEach( (element, index, array) => {
      if (['-h', '--help'].includes(element)) {
        // if first argument is action - remove help argument from array so it won't print help instead of processing action
        array[index] = ''; 
      }
    });
  } else if (!['-h', '--help'].includes(firstArgument)) { // if first argument is help - do nothing and continue. it will print a help
    // If module is called without arguments, notify user about wrong input and print a usage message (equal to calling with ​--help​​ option)
    console.error(`\nERROR: >> You haven't specified --action option.\n`);
    args[2] = '--help'
  }
}

export function postvalidate(program) {
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
}

export function validateFilePath(filePath, actionName) {
  if (!filePath) {
    console.error(`Please specify --file option. It's required for ${actionName} action.`);
    process.exit(1);
  }
}

export function validateDirPath(dirPath, actionName) {
  if (!dirPath) {
    console.error(`Please specify --path option. It's required for ${actionName} action.`);
    process.exit(1);
  }
}

export function handleFileReadError(err) {
  console.error("Error happened during reading a file: ", err.message);
  process.exit(1);
}