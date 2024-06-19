'use strict';
const pug = require('pug');
const fs = require('fs');
const path = require('path');

const srcDir = path.resolve(__dirname, '../src/pug');
const distDir = path.resolve(__dirname, '../dist');

fs.readdir(srcDir, (err, files) => {
    if (err) throw err;

    files.forEach(file => {
        if (path.extname(file) === '.pug') {
            const filePath = path.join(srcDir, file);
            const outputFilePath = path.join(distDir, path.basename(file, '.pug') + '.html');
            const html = pug.renderFile(filePath);
            fs.writeFileSync(outputFilePath, html);
        }
    });
});
