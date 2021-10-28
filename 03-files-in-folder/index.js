const fs = require('fs');
const { readdir } = require('fs/promises');
const path = require('path');
const secretFolderPath = path.join(__dirname, 'secret-folder');
readdir(secretFolderPath, { withFileTypes: true })
  .then(files => {
    console.log(files);
    fs.stat(path.join(secretFolderPath, files[1].name), (err, data) => {
      if (err) return console.error(err.message);
      console.log(data.isDirectory());
    });
  });