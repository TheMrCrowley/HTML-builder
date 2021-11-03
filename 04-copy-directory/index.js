const { readdir, mkdir, copyFile } = require('fs/promises');
const path = require('path');

const targetFolder = path.join(__dirname, 'files');
const distinationPath = path.join(__dirname);

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

copyDirectory(targetFolder, distinationPath, 'files-copy');