const { readdir, mkdir, copyFile, readFile, writeFile } = require('fs/promises');
const path = require('path');

const templatePath = path.join(__dirname, 'template.html');
const distDirectory = path.join(__dirname, 'project-dist');
const componentsPath = path.join(__dirname, 'components');
const stylePath = path.join(__dirname, 'styles');
const assetsPath = path.join(__dirname, 'assets');

async function createIndex() {
  await mkdir(distDirectory, {recursive: true})
  const templateHTML = await readFile(templatePath, 'utf-8');
  const templateMatches = templateHTML.match(/{{[^}]+}}/gm).map(item => {
    return item.replace(/[{}]+/g, '');
  });
  const templateArray = templateHTML.split(/{{[^}]+}}/);
  const componentsArray = await Promise.all(templateMatches.map(match => {
    return readFile(path.join(componentsPath, `${match}.html`), 'utf-8');
  }));
  const result = templateArray.reduce((acc, cur, idx) => {
    acc += cur + (componentsArray[idx] || '');
    return acc;
  }, '');
  await writeFile(path.join(distDirectory, 'index.html'), result);
}

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

async function copyDirectory(from, dist, directoryName) {
  const currentDist = path.join(dist, directoryName);
  await mkdir(path.join(dist, directoryName), {recursive: true});
  const files = await readdir(from, { withFileTypes: true });
  await Promise.all(files.map(file => {
    if (file.isDirectory()) {
      return copyDirectory(path.join(from, file.name), currentDist, file.name);
    }
    return copyFile(path.join(from, file.name), path.join(dist, directoryName, file.name));
  }));
}

createIndex()
  .then(() => mergeStyles(stylePath, distDirectory, 'style.css'))
  .then(() => copyDirectory(assetsPath, distDirectory, 'assets'));