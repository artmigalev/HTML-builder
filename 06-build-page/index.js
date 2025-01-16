const fs = require('fs');
const path = require('path');

const projectFolder = path.join(__dirname, 'project-dist');

fs.mkdir(projectFolder, { recursive: true }, (err) => {
  if (err) throw err;
});

const pathToAssets = path.join(projectFolder, 'assets');
fs.mkdir(pathToAssets, { recursive: true }, (err) => {
  if (err) throw err;
});

fs.cp(
  path.join(__dirname, 'assets'),
  pathToAssets,
  { recursive: true, force: true },
  (err) => {
    if (err) throw err;
    console.log('copied');
  },
);

const tempPath = path.join(__dirname, 'template.html');
const destPath = path.join(projectFolder, 'index.html');
const pathToComponents = path.join(__dirname, 'components');

fs.readFile(tempPath, 'utf-8', (err, template) => {
  if (err) throw err;

  fs.readdir(pathToComponents, (err, files) => {
    if (err) throw err;

    let countRead = 0;
    files.forEach((file) => {
      const componentName = path.basename(file, '.html');
      const pathToComponent = path.join(pathToComponents, file);

      fs.readFile(pathToComponent, 'utf-8', (err, component) => {
        if (err) throw err;

        template = template.replace(`{{${componentName}}}`, component);
        countRead++;

        if (countRead === files.length) {
          fs.writeFile(destPath, template, (err) => {
            if (err) throw err;
          });
        }
      });
    });
  });
});
const styles = fs.createWriteStream(
  path.join(__dirname, 'project-dist', 'styles.css'),
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
      styles.write(chunk);
    });
  });
});