const fs = require('fs');
const path = require('path');

const deleteFiles = (directory) => {
    fs.readdir(directory, (err, files) => {
        if (err) throw err;

        for (const file of files) {
            const filePath = path.join(directory, file);
            fs.unlink(filePath, err => {
                if (err) throw err;
            });
        }
    });
};

const directories = [
    path.resolve(__dirname, '../dist/js'),
    path.resolve(__dirname, '../dist/css'),
    path.resolve(__dirname, '../dist/assets')
];

directories.forEach(deleteFiles);
