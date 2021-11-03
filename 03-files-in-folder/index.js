const { readdir, stat } = require('fs/promises');
const path = require('path');

const secretFolderPath = path.join(__dirname, 'secret-folder');

function readFolder(folderPath) {
  const fileNames = [];

  readdir(folderPath, { withFileTypes: true })
    .then(objects => {
      return Promise.all(objects.filter(obj => obj.isFile()).map(file => {
        const extName = path.extname(path.join(folderPath, file.name));
        const baseName = path.basename(path.join(folderPath, file.name));
        fileNames.push(`${baseName.replace(/.[\w]+$/gmi, '')} - ${extName} - `);
        return stat(path.join(folderPath, file.name));
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
}

readFolder(secretFolderPath);