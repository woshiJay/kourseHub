const fs = require('fs');
const path = require('path');

const copyFile = (src, dest) => {
    fs.copyFile(src, dest, (err) => {
        if (err) throw err;
    });
};

const srcDir = path.resolve(__dirname, '../src/js');
const destDir = path.resolve(__dirname, '../dist/js');

fs.readdir(srcDir, (err, files) => {
    if (err) throw err;

    files.forEach(file => {
        const srcPath = path.join(srcDir, file);
        const destPath = path.join(destDir, file);
        copyFile(srcPath, destPath);
    });
});
