const { readdir, mkdir, copyFile } = require('fs/promises');
const path = require('path');

const targetFolder = path.join(__dirname, 'files');
const distinationPath = path.join(__dirname, 'files-copy');

function copy(from, to) {
  mkdir(to, {recursive: true})
  .then(() => readdir(from, { withFileTypes: true }))
  .then(files => {
    return Promise.all(files.map(file => {
      return copyFile(path.join(from, file.name), path.join(to, file.name));
    }))
  });
}

copy(targetFolder, distinationPath);