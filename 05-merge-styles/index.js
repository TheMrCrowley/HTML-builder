const { readdir, readFile, writeFile } = require('fs/promises');
const path = require('path');

const stylesFolder = path.join(__dirname, 'styles');
const dist = path.join(__dirname, 'project-dist', 'bundle.css');

function mergeStyles(from, to) {
  readdir(from, {withFileTypes: true})
    .then(files => {
      const styleFiles = files.filter(file => {
        return file.isFile() &&
        path.extname(path.join(from, file.name)) === '.css';
      });
      return Promise.all(styleFiles.map(styleFile => readFile(path.join(from, styleFile.name), 'utf-8')));
    })
    .then(styles => writeFile(to, styles.join('\n')));
}

mergeStyles(stylesFolder, dist);