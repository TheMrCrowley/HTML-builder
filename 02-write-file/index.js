const { stdin, stdout} = process;
const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'text.txt');
const output = fs.createWriteStream(filePath, 'utf-8');

stdout.write('Hello, please write text.\n');
stdin.on('data', data => {
  const str = data.toString();
  if (str.trim() == 'exit') {
    stdout.write('See you soon!\n');
    process.exit();
  } else {
    output.write(data);
  }
});