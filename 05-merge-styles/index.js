const fs = require('fs');
const path = require('path');

const bundle = fs.createWriteStream(
  path.join(__dirname, 'project-dist', 'bundle.css'),
);

const pathToReadFolder = path.join(__dirname, 'styles');

fs.readdir(pathToReadFolder, (err, files) => {
  if (err) {
    console.log('Errror!!!!!! Мать твою .... ');
    return;
  }
  files.forEach((file) => {
    const readFile = fs.createReadStream(
      path.join(pathToReadFolder, file),
      'utf-8',
    );
    readFile.on('data', (chunk) => {
      bundle.write(chunk);
    });
  });
});
