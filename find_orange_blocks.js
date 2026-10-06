const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
    });
}

walkDir('./client/src/pages/Admin', function(filePath) {
    if (filePath.endsWith('.jsx')) {
        let content = fs.readFileSync(filePath, 'utf8');
        let lines = content.split('\n');
        lines.forEach((line, i) => {
            if (line.includes('text-accent') && line.includes('bg-accent') && !line.includes('bg-accent/')) {
                console.log(filePath + ':' + (i+1) + ': ' + line.trim());
            }
        });
    }
});
