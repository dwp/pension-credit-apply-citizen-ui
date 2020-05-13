const fs = require('fs');
const npath = require('path');

const distDir = npath.resolve('dist');

function deleteFolderRecursive(path) {
  if (fs.existsSync(path)) {
    fs.readdirSync(path).forEach((file) => {
      const curPath = npath.join(path, file);
      if (fs.lstatSync(curPath).isDirectory()) {
        deleteFolderRecursive(curPath);
      } else {
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
}

// This will recusiresvely delete all files and folders in in ./dist, cleaning
// it out on build. As static assets such as images are renamed to hashes, this
// prevents the accumulation of assets on each build where they have changed.
//
// The decision was made to do this programatically rather than use rm -r to
// ensure npm scripts work accross different OSs (such as Windows).
deleteFolderRecursive(distDir);
