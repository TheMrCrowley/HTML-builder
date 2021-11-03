const { readdir, readFile, writeFile } = require('fs/promises');
const path = require('path');

const stylesFolder = path.join(__dirname, 'styles');
const distDirectory = path.join(__dirname, 'project-dist');

async function mergeStyles(from, dist, fileName) {
  const files = await readdir(from, {withFileTypes: true});
  const styleFiles = files.filter(file => {
    return file.isFile() &&
    path.extname(path.join(from, file.name)) === '.css';
  });
  const styleArr = await Promise.all(styleFiles.map(styleFile => {
    return readFile(path.join(from, styleFile.name), 'utf-8');
  }));
  await writeFile(path.join(dist, fileName), styleArr.join('\n'));
}

mergeStyles(stylesFolder, distDirectory, 'bundle.css');