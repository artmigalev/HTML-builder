const path = require('path');
const fs = require('fs');

const pathToFolder = path.join(__dirname, 'secret-folder');

fs.readdir(pathToFolder, { withFileTypes: true }, (err, files) => {
  if (err) {
    console.log('Ошибка чтения');
    return;
  }

  files.forEach((file) => {
    if (file.isFile()) {
      const nameFile = file.name.slice(0, file.name.indexOf('.'));
      const extenFile = path.extname(file.name);
      const pathToFile = path.join(__dirname, 'secret-folder', file.name);

      fs.stat(pathToFile, (err, stats) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log(
          `${nameFile} - ${extenFile.replace('.', '')} - ${
            stats.size / 1000
          }kb`,
        );
      });
    }
  });
});
