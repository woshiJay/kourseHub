const sh = require('shelljs');
const upath = require('upath');
const fs = require('fs');

const destPath = upath.resolve(upath.dirname(__filename), '../dist');

if (fs.existsSync(destPath)) {
    sh.rm('-rf', `${destPath}/*`);
}
