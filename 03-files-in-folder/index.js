const { readdir, stat } = require('fs/promises');
const path = require('path');
const secretFolderPath = path.join(__dirname, 'secret-folder');

const fileNames = [];

readdir(secretFolderPath, { withFileTypes: true })
  .then(objects => {
    return Promise.all(objects.filter(obj => !obj.isDirectory()).map(file => {
      const extName = path.extname(path.join(secretFolderPath, file.name));
      const baseName = path.basename(path.join(secretFolderPath, file.name));
      fileNames.push(`${baseName.replace(/.[\w]+$/gmi, '')} - ${extName} - `);
      return stat(path.join(secretFolderPath, file.name));
    }));
  })
  .then(stats => {
    stats.forEach((stat, idx) => {
      fileNames[idx] += `${(stat.size / 1024).toFixed(1)}kB`;
    });
  })
  .finally(() => {
    console.log(fileNames.join(', '));
  });