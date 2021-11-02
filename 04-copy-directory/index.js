const { readdir, mkdir, copyFile } = require('fs/promises');
const path = require('path');

const targetFolder = path.join(__dirname, 'files');
const distinationPath = path.join(__dirname, 'files-copy');

mkdir(distinationPath, {recursive: true})
  .then(() => readdir(targetFolder, { withFileTypes: true }))
  .then(files => {
    return Promise.all(files.map(file => {
      return copyFile(path.join(targetFolder, file.name), path.join(distinationPath, file.name));
    }))
  });