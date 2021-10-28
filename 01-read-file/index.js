const { stdout } = process;
const path = require('path');
const fs = require('fs');
const filePath = path.join(__dirname, 'text.txt');
const stream = fs.createReadStream(filePath, 'utf-8');

let data = '';
stream.on('data', chunk => data += chunk);
stream.on('end', () => stdout.write(data));