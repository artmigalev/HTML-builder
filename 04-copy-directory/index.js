const fs = require('fs');
const path = require('path');

const pathToFiles = path.join(__dirname, 'files');
const folderToCopy = path.join(__dirname, 'files-copy');
fs.mkdir(folderToCopy, { recursive: true }, (err) => {
  if (err) throw err;
});
fs.readdir(pathToFiles, (err, files) => {
  if (err) {
    console.log('Ошибка для чтения');
    return;
  }

  files.forEach((file) => {
    const pathFile = path.join(pathToFiles, file);
    const sourceToCopy = path.join(folderToCopy, file);
    fs.copyFile(pathFile, sourceToCopy, (err) => {
      if (err) {
        console.log('Error !!!!', err);
        return;
      }
      console.log('good Job!!', 'file copy', file);
    });
  });
});
