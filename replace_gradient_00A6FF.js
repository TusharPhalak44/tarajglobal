const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
    });
}

function processFiles(dir) {
    walkDir(dir, function(filePath) {
        if (filePath.endsWith('.jsx')) {
            let content = fs.readFileSync(filePath, 'utf8');
            let originalContent = content;
            
            content = content.replace(/linear-gradient\([^)]*#00A6FF[^)]*\)/g, match => match.replace(/#00A6FF/g, '#FF6D00'));
            
            if (content !== originalContent) {
                fs.writeFileSync(filePath, content, 'utf8');
                console.log('Updated: ' + filePath);
            }
        }
    });
}

processFiles('./client/src/pages');
processFiles('./client/src/components');
